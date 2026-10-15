// Ala controles/ — confere public/controles/ contra os manifestos (sha256 por arquivo).
//
//   node scripts/conferir-controles.mjs
//
// Cada subpasta (recursos/, a/, b/) tem o seu manifesto.json. Falha se algum arquivo faltar, sobrar
// ou tiver outro sha256. As páginas são geradas fora deste repositório e nunca editadas à mão.
import { createHash } from "node:crypto";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const RAIZ = resolve(dirname(fileURLToPath(import.meta.url)), "..", "public", "controles");
const sha256 = (buf) => createHash("sha256").update(buf).digest("hex");

function listar(raiz, prefixo = "") {
  const out = [];
  for (const e of readdirSync(join(raiz, prefixo), { withFileTypes: true })) {
    const rel = prefixo ? `${prefixo}/${e.name}` : e.name;
    if (e.isDirectory()) out.push(...listar(raiz, rel));
    else if (e.name !== "manifesto.json") out.push(rel);
  }
  return out.sort();
}

const erros = [];
let total = 0;
const pastas = readdirSync(RAIZ, { withFileTypes: true }).filter((e) => e.isDirectory()).map((e) => e.name);
for (const nome of pastas) {
  const pasta = join(RAIZ, nome);
  const caminho = join(pasta, "manifesto.json");
  if (!existsSync(caminho)) {
    erros.push(`${nome}/: sem manifesto.json`);
    continue;
  }
  const { arquivos } = JSON.parse(readFileSync(caminho, "utf8"));
  const presentes = listar(pasta);
  for (const f of Object.keys(arquivos)) if (!presentes.includes(f)) erros.push(`falta ${nome}/${f}`);
  for (const f of presentes) {
    if (!(f in arquivos)) erros.push(`sobra ${nome}/${f}`);
    else if (sha256(readFileSync(join(pasta, f))) !== arquivos[f]) erros.push(`sha256 diferente: ${nome}/${f}`);
  }
  total += presentes.length;
}
const soltos = readdirSync(RAIZ, { withFileTypes: true }).filter((e) => !e.isDirectory());
for (const s of soltos) erros.push(`arquivo fora das subpastas: ${s.name}`);

if (erros.length) {
  console.error(erros.join("\n"));
  process.exit(1);
}
console.log(`public/controles/: ${total} arquivos em ${pastas.length} pastas conferem com os manifestos`);
