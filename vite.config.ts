import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: { port: 3000 },
  build: {
    rollupOptions: {
      // Páginas independentes de propósito: a suíte de casos TC-*, a tela de fluxo e a tela de
      // solicitação. Entradas separadas garantem que o bundle de uma tela não carregue nada das
      // outras — um agente que abre /fluxo.html ou /solicitacao.html não tem como topar com a
      // grade TC-*.
      input: { main: "index.html", fluxo: "fluxo.html", solicitacao: "solicitacao.html" },
    },
  },
});
