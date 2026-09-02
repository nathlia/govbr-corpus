# Ala real — telas congeladas da aplicação PNIP

Terceira ala do corpus, ao lado da suíte injetada (`TC-*`) e da orgânica (`TC-O-*`). Aqui as
páginas não foram escritas para o experimento: são telas de uma aplicação gov.br de verdade
(`pnip-clientes-web`, Angular 15, `@govbr-ds/core` 3.4.1 + `@govbr-ds/webcomponents` 1.16.0),
capturadas de uma execução **local e autorizada** e congeladas como HTML estático.

Servidas em `/real/<slug>.html` pelo mesmo servidor do corpus (:3000).

## Como são geradas

`govbr-eval`: `npm run snapshot:real` (script `scripts/snapshot-real.ts`), com a aplicação rodando
localmente. O script grava as páginas, copia os ativos do DS **da própria aplicação** para
`assets/`, e escreve `manifesto.json` com origem, commit da aplicação, versões do DS, estado
capturado e sha256 de cada arquivo.

## Por que congelar em vez de medir a aplicação rodando

D-06: a superfície medida tem de ser a mesma em todas as execuções. Uma aplicação viva muda embaixo
da medida — outro dado do backend, um deploy, uma sessão que expira. Congelada, a mesma página é
medida hoje e daqui a três meses, e o sha256 prova que é a mesma.

## O que a captura preserva — e o que não preserva

Os componentes do gov.br usados pela aplicação real são **web components com shadow root aberto**
(`<br-header>`, `<br-button>`, `<br-input>`). O conteúdo renderizado mora dentro do shadow root e
não aparece em `outerHTML`. Por isso a captura guarda o **light DOM como veio** — as tags `<br-*>`
com seus atributos — e recarrega o mesmo bundle de webcomponents da aplicação de origem: os
componentes voltam a hidratar e a página estática reconstrói a árvore real, shadow DOM incluído.

**Fidelidade verificada** (2026-09-01), instrumentos rodados contra a aplicação viva e contra a
captura, com resultado idêntico:

| Tela | Vivo | Congelado |
|---|---|---|
| `pnip-login` | axe 1 (`page-has-heading-one`), 28 passes | axe 1 (`page-has-heading-one`), 28 passes |
| `pnip-privacidade` | axe 1 (`heading-order` em `h3:nth-child(6)`), 32 passes; estrutura 2, 4 elementos | idêntico |

**Não preserva** os bindings do Angular: botões não navegam, formulários não submetem. Estados que
dependem de interação são **capturas separadas** (campo `estado` no manifesto), uma por estado,
nunca simulados depois da captura.

## Regras

- Estas páginas **não carregam gabarito** — vale aqui a mesma regra do resto do corpus. O que se
  espera encontrar nelas mora em `govbr-eval`.
- Os números desta ala **nunca** se somam nem se promediam com os da suíte `TC-*` nem com os da
  orgânica (D-13): instrumento diferente, página diferente, origem diferente.
- Só rotas públicas, sem sessão: nenhuma captura contém dado de produção ou informação de usuário.
- Ao recapturar, gere um arquivo novo em vez de sobrescrever um já medido — um sha256 que muda
  invalida silenciosamente as execuções que apontavam para ele.
