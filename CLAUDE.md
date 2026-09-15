# govbr-corpus

React app (Vite + `@govbr-ds/core` 3.7.0) used as the system under test in the thesis evaluation.

- Dev server: `npm run dev` → http://localhost:3000 (Node 18+; use `nvm use 25`)
- Measured runs never use the dev server (v02, D-40): the battery builds `dist/` and
  `govbr-eval/scripts/measurement-surface.ts` serves only the files `fluxo.html` references, with no
  network egress. So the flow page must be servable from its own build: Font Awesome 6.6.0 is the
  pinned `@fortawesome/fontawesome-free` package imported in `src/fluxo.tsx` (render checked
  pixel-identical to the former CDN link). Never add a CDN link to the flow page.
- Tabs: Botões (`TC-B-*`) and Formulário (`TC-F-*`); hash deep links supported (`/#TC-F-04`)

Rules:
- **Never add comments, class names, or text that describe a case's violation** — the answer key
  lives only in `../govbr-eval/ground-truth.json`. Corpus and gabarito must stay separated.
- When adding a case: neutral `TC-X-NN` section id + `data-testid`, one deviation max, then record
  it in `govbr-eval/ground-truth.json` (categories + expected detection per tool).
- Style-based violations go in `src/pages/portal.css`. Name every class by the **place it occupies
  in the application** (`.acao-cancelar`, `.item-mensagem`), never by the deviation it applies.
  A name like `v-radius-a` states the answer key in the DOM — see D-24 in the decision log.
- `portal.css` classes must also sit on **conforming** elements, in comparable number. The oracle
  reports non-canonical classes on `br-*` components as a finding, so if only violating elements
  carried an extra class, that rule would become a defect detector by construction. Declarations
  at conforming points must be inert or conformant, so the measured baselines do not move (D-06).
