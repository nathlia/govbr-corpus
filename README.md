# govbr-corpus

Evaluation corpus of the thesis *"Um Framework de Validação de Interfaces Baseado em Agentes de
IA e Protocolo MCP"* (UFSM): a React application built with the official `@govbr-ds/core` package,
serving as the **system under test** for interface-validation experiments.

The app renders labeled sections (`TC-B-*` on the Botões tab, `TC-F-*` on the Formulário tab).
Each section either conforms to the gov.br Design System / e-MAG or carries **one deliberate,
injected deviation** — ground truth is defined by construction (E1/E2 in the thesis requirements).

**The answer key is not in this repository.** The violation manifest (`ground-truth.json`) lives in
the separate `govbr-eval` harness, so tools and agents evaluated against this app cannot read the
expected results from the code they are shown. Case sections deliberately carry no comments or
class names describing what (if anything) is wrong.

## Running

```bash
npm install
npm run dev     # http://localhost:3000
```

Deep links: `http://localhost:3000/#TC-F-04` opens the right tab and scrolls to the case.

## Structure

```
src/
├── App.jsx              two tabs (Botões, Formulário) + hash deep-linking
└── pages/
    ├── ButtonPage.jsx   TC-B-01 … TC-B-13
    ├── FormPage.jsx     TC-F-01 … TC-F-13
    └── portal.css       folha do portal — classes nomeadas pelo lugar de uso, nunca pelo efeito
```

## Related repositories

- `govbr-ds-validator` — the MCP oracle server (the thesis artifact)
- `govbr-eval` — ground truth, baselines (axe-core), scoring, and the results dashboard
