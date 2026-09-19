// O pacote do DS não publica tipos. Só o que a tela de solicitação instancia é declarado.
declare module "@govbr-ds/core/dist/core.js" {
  type Componente = new (nome: string, raiz: HTMLElement, ...opcoes: unknown[]) => unknown;
  export const BRSelect: Componente;
  export const BRDateTimePicker: Componente;
  export const BRUpload: Componente;
  export const BRBreadcrumb: Componente;
}
