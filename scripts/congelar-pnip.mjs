// Ala pnip/ — congela o build mock do PNIP em public/pnip/ e confere contra o manifesto.
//
//   node scripts/congelar-pnip.mjs congelar [--origem ../pnip-mock/dist/pnip-mock] [--ala pnip]
//   node scripts/congelar-pnip.mjs conferir [--ala pnip]
//
// `--ala` escolhe a pasta de public/ e o base href (/<ala>/). Padrão `pnip` (tela B, D-57). A tela C
// (D-134) tem ala própria, `pnip-c`, para não mudar um byte da tela B:
//   (pnip-mock) node mock-tools/build-mock.mjs --base-href /pnip-c/ --output-path dist/pnip-c
//   node scripts/congelar-pnip.mjs congelar --origem ../pnip-mock/dist/pnip-c --ala pnip-c
//
// `congelar` copia a árvore inteira do build (chunks lazy incluídos) e reescreve
// public/pnip/manifesto.json com a proveniência e o sha256 de cada arquivo. O build tem de ter sido
// feito antes, no pnip-mock, com `node mock-tools/build-mock.mjs` (Node 16.20.2), a partir de uma
// árvore limpa: o commit gravado no manifesto só prova algo se não houver alteração local.
// `conferir` falha se algum arquivo de public/pnip/ faltar, sobrar ou tiver outro sha256.
import { createHash } from "node:crypto";
import { execFileSync } from "node:child_process";
import { copyFileSync, existsSync, mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const RAIZ = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const MANIFESTO = "manifesto.json";
const ARGS = process.argv.slice(3);
const ALA = ARGS.includes("--ala") ? ARGS[ARGS.indexOf("--ala") + 1] : "pnip";
if (!/^pnip(-[a-z0-9]+)?$/.test(ALA)) throw new Error(`--ala inválida: ${ALA}`);
const DESTINO = join(RAIZ, "public", ALA);

const sha256 = (buf) => createHash("sha256").update(buf).digest("hex");

function listar(raiz, prefixo = "") {
  const out = [];
  for (const e of readdirSync(join(raiz, prefixo), { withFileTypes: true })) {
    const rel = prefixo ? `${prefixo}/${e.name}` : e.name;
    if (e.isDirectory()) out.push(...listar(raiz, rel));
    else out.push(rel);
  }
  return out.sort();
}

function git(dir, ...args) {
  return execFileSync("git", ["-C", dir, ...args], { encoding: "utf8" }).trim();
}

function congelar(origem) {
  if (!existsSync(join(origem, "index.html"))) throw new Error(`Build ausente em ${origem}. Rode 'node mock-tools/build-mock.mjs' no pnip-mock.`);
  const repo = resolve(origem, "..", "..");
  const commit = git(repo, "rev-parse", "HEAD");
  if (git(repo, "status", "--porcelain")) throw new Error(`pnip-mock com alterações locais: o commit ${commit} não descreveria o build.`);
  const arquivos = listar(origem);
  const mapas = arquivos.filter((f) => f.endsWith(".map"));
  const base = readFileSync(join(origem, "index.html"), "utf8").match(/<base href="([^"]+)"/)?.[1];
  if (base !== `/${ALA}/`) throw new Error(`O build tem base href ${base}, e a ala ${ALA} pede /${ALA}/.`);
  if (mapas.length) throw new Error(`O build traz source maps (${mapas.join(", ")}): o código-fonte do mock iria junto.`);
  const pacote = (nome) => JSON.parse(readFileSync(join(repo, "node_modules", nome, "package.json"), "utf8")).version;

  rmSync(DESTINO, { recursive: true, force: true });
  const hashes = {};
  for (const rel of arquivos) {
    const alvo = join(DESTINO, rel);
    mkdirSync(dirname(alvo), { recursive: true });
    copyFileSync(join(origem, rel), alvo);
    hashes[rel] = sha256(readFileSync(alvo));
  }
  const manifesto = {
    _meta: {
      o_que_e: `Build estático do modo mock da aplicação PNIP (Angular 15), servido em /${ALA}/. O código de produção roda de verdade: roteamento, guards, componentes e web components do gov.br DS. Só a sessão, o backend HTTP e os recursos externos são substituídos, dentro do navegador.`,
      dados: "Somente dados fictícios: usuária, CPFs, CNPJs, embarcações, e-mails e endereços são inventados. Nenhum dado de produção.",
      uso: "Uso autorizado pela equipe do projeto para execução local. Sem requisições externas.",
      regra: "Reproduzir, nunca reparar: a árvore é o build como saiu, byte a byte. Nada aqui é editado à mão; mudar a tela é refazer o build no pnip-mock e congelar de novo.",
      estado: "Interações reais (Angular + armazenamento em memória no navegador). Recarregar a página volta ao estado inicial.",
      nunca_agregar_com: "ground-truth.json (TC-*), ground-truth-fluxo.json, a tela de solicitação e a ala orgânica (D-13)",
    },
    origem: {
      app: "pnip-clientes-web",
      commit: "c41f45281ca6251b8a8a70562a83b57a5e70c682",
      fork: "pnip-mock",
      forkCommit: commit,
    },
    build: {
      comando: "node mock-tools/build-mock.mjs",
      configuracao: "ng build --configuration mock",
      node: process.env.PNIP_BUILD_NODE ?? "16.20.2",
      angular: pacote("@angular/core"),
      baseHref: `/${ALA}/`,
      sourceMaps: false,
    },
    ds: { core: pacote("@govbr-ds/core"), webcomponents: pacote("@govbr-ds/webcomponents") },
    hojeCongelado: "2026-03-16T09:30:00 (hora local)",
    congeladoEm: new Date().toISOString(),
    arquivos: hashes,
  };
  writeFileSync(join(DESTINO, MANIFESTO), JSON.stringify(manifesto, null, 2) + "\n");
  console.log(`public/${ALA}/: ${arquivos.length} arquivos congelados de pnip-mock@${commit.slice(0, 7)}`);
}

function conferir() {
  const manifesto = JSON.parse(readFileSync(join(DESTINO, MANIFESTO), "utf8"));
  const presentes = listar(DESTINO).filter((f) => f !== MANIFESTO);
  const esperados = Object.keys(manifesto.arquivos);
  const erros = [
    ...esperados.filter((f) => !presentes.includes(f)).map((f) => `falta ${f}`),
    ...presentes.filter((f) => !(f in manifesto.arquivos)).map((f) => `sobra ${f}`),
    ...esperados.filter((f) => presentes.includes(f) && sha256(readFileSync(join(DESTINO, f))) !== manifesto.arquivos[f]).map((f) => `sha256 diferente: ${f}`),
  ];
  if (erros.length) {
    console.error(erros.join("\n"));
    process.exit(1);
  }
  console.log(`public/${ALA}/: ${esperados.length} arquivos conferem com o manifesto`);
}

const [comando, ...args] = process.argv.slice(2);
if (comando === "congelar") {
  const i = args.indexOf("--origem");
  congelar(resolve(RAIZ, i >= 0 ? args[i + 1] : "../pnip-mock/dist/pnip-mock"));
} else if (comando === "conferir") {
  conferir();
} else {
  console.error("Uso: node scripts/congelar-pnip.mjs congelar [--origem DIR] [--ala pnip] | conferir [--ala pnip]");
  process.exit(1);
}
