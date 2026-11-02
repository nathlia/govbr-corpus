# govbr-corpus

Evaluation corpus of the thesis *"Um Framework de Validação de Interfaces Baseado em Agentes de
IA e Protocolo MCP"* (UFSM): a React application built with the official `@govbr-ds/core` package,
serving as the **system under test** for interface-validation experiments.

**The answer key is not in this repository.** The violation manifests (`ground-truth.json`,
`ground-truth-fluxo.json`, `organic-ground-truth.json`) live in the separate `govbr-eval` harness,
so tools and agents evaluated against this app cannot read the expected results from the code they
are shown. Cases carry no comments naming what (if anything) is wrong, and **class names describe
the place of use, never the defect** — see "Ground-truth hygiene" below.

## Running

```bash
npm install
npm run dev     # http://localhost:3000
```

Deep links: `http://localhost:3000/#TC-F-04` opens the right tab and scrolls to the case.

## The wings

They are separate instruments over different pages. Their numbers are **never pooled or averaged**
with each other (D-13) — the harness keeps a separate gabarito and scorer block per wing.

### 1. Injected suite (`TC-*`) — 52 cases

Labeled sections across six tabs plus three static routes. Each section either conforms to the gov.br Design System /
e-MAG or carries **one deliberate, injected deviation**; ground truth is defined by construction
(E1/E2 in the thesis requirements). Every violation case has a conformant twin, and the set
includes false-positive traps.

| Tab | Prefix | Page |
|---|---|---|
| Botões | `TC-B-*` | `src/pages/ButtonPage.tsx` |
| Formulário | `TC-F-*` | `src/pages/FormPage.tsx` |
| Navegação | `TC-N-*` | `src/pages/NavPage.tsx` |
| Tabelas | `TC-T-*` | `src/pages/TablePage.tsx` |
| Listas | `TC-L-*` | `src/pages/ListPage.tsx` |
| Interativos | `TC-I-*` | `src/pages/InteractivePage.tsx` |
| Orgânico | `TC-O-*` | `src/pages/OrganicPage.tsx` (wing 2, below) |

Three static routes under `public/static/` (`protocolo.html`, `confirmacao.html`,
`atualizacao.html`) carry the cases that need a plain document rather than a React tab.

### 2. Organic wing — `TC-O-01…06`

The six accessibility anomalies found in the **official package's own examples**, rendered verbatim
(`?raw` fragments, sha256-verified) on the Orgânico tab. These are not injected: they are defects
the gov.br DS ships. Provenance lives in the *eval* docs, never in this repo.

### 3. Flow screen — `/fluxo.html`

A reconstruction of the gov.br identification screen (`src/pages/LoginPage.tsx` +
`src/pages/fluxo.css`), served as its **own Vite entry** so its bundle loads nothing from the
`TC-*` suite — an agent that opens the flow screen cannot stumble onto the case grid.

Unlike the `TC-*` grid, this is a coherent screen: it carries a **shared violation** that hits every
one of the four options and every one of the four option links, plus single-instance violations,
composition, a conditional rule, and a state-dependent violation that only exists after submitting
an empty CPF. It is the page the element-anchored suite (D-23/D-25) scores against — the unit of
evaluation there is (element × rule), which forces *enumerating* the instances rather than pointing
at one.

### 4. Real wing — `public/real/`

Two public routes of the PNIP application (`/login`, `/privacidade`) captured and **frozen** as
static pages, with per-file sha256, origin commit, and the DS versions the real app uses
(`@govbr-ds/core` 3.4.1, webcomponents 1.16.0) recorded in `public/real/manifesto.json`. Freezing
is a D-06 requirement: the measured surface must be identical across runs. Line endings are pinned
in `.gitattributes` because the sha256 is the point.

Declared limit, also in the manifesto: Angular bindings do not survive capture, so **each
interaction state is its own capture**, never a later simulation. This wing has no gabarito —
over a real screen, adjudication is the instrument.

### 5. Ala `pnip/` — a aplicação PNIP rodando, em modo mock

`public/pnip/` é o build estático do **modo mock** da aplicação PNIP (fork controlado
`pnip-mock` de `pnip-clientes-web` no commit `c41f4528`; Angular 15, `@govbr-ds/core` 3.4.1 +
`@govbr-ds/webcomponents` 1.16.0), servido em `http://localhost:3000/pnip/`. Ao contrário da ala
real, aqui o código de produção **roda**: roteamento, guards, componentes e web components do DS.
Só a sessão, o backend HTTP e os recursos externos são substituídos, dentro do navegador: dados
todos fictícios, hoje congelado em 2026-03-16 09:30, nenhuma requisição externa. As interações são
reais e o estado vive em memória — recarregar a página volta ao início. Uso autorizado pela equipe
do projeto para execução local.

- **Servir.** É uma SPA com base href `/pnip/`: o `vite.config.ts` (dev e `preview`) responde com
  `public/pnip/index.html` a toda rota sem extensão sob `/pnip/` (a raiz continua com o fallback
  do app React), e serve `/assets/images/exit-icon.png` — o ícone do "Sair", que o template do app
  pede fora do prefixo — a partir da árvore `pnip/`. O build copiado nunca é editado.
- **Refazer.** No `pnip-mock` (Node 16.20.2, árvore limpa): `node mock-tools/build-mock.mjs`. Aqui:
  `npm run pnip:congelar`, que copia `dist/pnip-mock/` inteiro (chunks lazy incluídos), recusa
  source maps e reescreve `public/pnip/manifesto.json` com origem, commit do fork, comando de
  build, versão do Node, versões do DS, hoje congelado e o sha256 de cada arquivo.
- **Conferir.** `npm run pnip:conferir`: a árvore tem de bater com o manifesto, arquivo por arquivo
  — nada faltando, nada sobrando, nenhum sha256 diferente. Reproduzir, nunca reparar: mudar a tela
  é refazer o build e congelar de novo, não editar arquivo desta pasta.

### 6. Ala `controles/` — Biblioteca Municipal

`public/controles/` são páginas estáticas de um serviço fictício (reservas e renovação de
empréstimos de uma biblioteca municipal), escritas com a marcação do `@govbr-ds/core` 3.7.0 e
servidas sem rede: `recursos/` traz as folhas e fontes copiadas dos pacotes do corpus; `a/` e `b/`
trazem as páginas, com nomes opacos. Cada pasta tem um `manifesto.json` com o sha256 de cada
arquivo; `npm run controles:conferir` falha se algo faltar, sobrar ou mudar. As páginas são geradas
no `govbr-eval` e nunca editadas aqui.

`c/` é a extensão de desenvolvimento do validator 3.7.0 (gerada por `govbr-eval/controles/extensao-370/construir.mjs`,
que escreve também a cópia idêntica em `dist/controles/c/`): fora do catálogo congelado que produz `a/` e `b/`, com
nomes opacos e o mesmo `manifesto.json` com sha256, conferido pelo mesmo `npm run controles:conferir`.

## Structure

```
src/
├── App.tsx              seven tabs + hash deep-linking (TC-* suite)
├── main.tsx             entry for the TC-* suite (index.html)
├── fluxo.tsx            entry for the flow screen (fluxo.html) — separate bundle on purpose
└── pages/
    ├── ButtonPage.tsx · FormPage.tsx · NavPage.tsx · TablePage.tsx
    ├── ListPage.tsx · InteractivePage.tsx · OrganicPage.tsx
    ├── LoginPage.tsx    the flow screen
    ├── portal.css       folha do portal — classes nomeadas pelo lugar de uso, nunca pelo efeito
    └── fluxo.css        folha da tela de fluxo — mesma regra
public/
├── static/              three plain-document cases
├── real/                frozen PNIP captures + manifesto.json
└── pnip/                PNIP mock-mode build (SPA under /pnip/) + manifesto.json
scripts/
└── congelar-pnip.mjs    freezes ../pnip-mock/dist/pnip-mock into public/pnip/ and checks it
```

## Ground-truth hygiene

Until 2026-08-31 the CSS classes on defective elements **named the violated rule**
(`overrides.css`), and the run logs show the agent citing the class as its first evidence — the
corpus was leaking its own answer key. The sheet became `portal.css`, classes are now named by
where they are used, and each appears on conformant elements too (13 violators against 12
conformant sharing a class). Baselines were re-measured after the fix and came back **identical**
(axe 9 cases, eslint 5 cases): the deterministic tools never read the class. The agent did.

When adding a case, the rule is: no comment describing the defect, no id or class naming it, and
the conformant twin uses the same vocabulary as the violator.

## Related repositories

- `govbr-ds-validator` — the MCP oracle server (the thesis artifact)
- `govbr-eval` — ground truth, measured baselines, scoring, adjudication, and the results dashboard
- `thesis-workspace/tcc2-decisions-log.md` — why any of this is shaped the way it is
