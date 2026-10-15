# govbr-corpus

React app (Vite + `@govbr-ds/core` 3.7.0) used as the system under test in the thesis evaluation.

- Dev server: `npm run dev` → http://localhost:3000 (Node 18+; use `nvm use 25`)
- Measured runs never use the dev server (v02, D-40): the battery builds `dist/` and
  `govbr-eval/scripts/measurement-surface.ts` serves only the files `fluxo.html` references, with no
  network egress. So the flow page must be servable from its own build: Font Awesome 6.6.0 is the
  pinned `@fortawesome/fontawesome-free` package imported in `src/fluxo.tsx` (render checked
  pixel-identical to the former CDN link). Never add a CDN link to the flow page.
- `solicitacao.html` — second realistic screen (slice 8, D-49), its own Vite entry like `fluxo.html`
  and under the same rules: no CDN, nothing shared with the `TC-*` bundle. Its answer key, the
  draw that produced it and the build record live only in `../govbr-eval/tela-a/`.
- `public/pnip/` — build congelado do modo mock do PNIP (tela B do instrumento, D-57). Nunca edite
  arquivo dessa pasta: refaça o build no `pnip-mock` e rode `npm run pnip:congelar`; confira com
  `npm run pnip:conferir`. O fallback de SPA sob `/pnip/` e o alias do ícone "Sair" moram no
  `vite.config.ts`. README › "Ala `pnip/`".
- `public/controles/` — páginas estáticas da Biblioteca Municipal (alas `a/` e `b/` + `recursos/`),
  geradas fora deste repositório e conferidas por sha256: `npm run controles:conferir`. Nunca edite
  à mão; o que cada página exercita mora só no `govbr-eval`.
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
