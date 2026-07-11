# govbr-corpus

React app (Vite + `@govbr-ds/core` 3.7.0) used as the system under test in the thesis evaluation.

- Dev server: `npm run dev` → http://localhost:3000 (Node 18+; use `nvm use 25`)
- Tabs: Botões (`TC-B-*`) and Formulário (`TC-F-*`); hash deep links supported (`/#TC-F-04`)

Rules:
- **Never add comments, class names, or text that describe a case's violation** — the answer key
  lives only in `../govbr-eval/ground-truth.json`. Corpus and gabarito must stay separated.
- When adding a case: neutral `TC-X-NN` section id + `data-testid`, one deviation max, then record
  it in `govbr-eval/ground-truth.json` (categories + expected detection per tool).
- Style-based violations go in `src/pages/overrides.css` with opaque names (`v-token-a`, …).
