import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: { port: 3000 },
  build: {
    rollupOptions: {
      // Duas páginas independentes de propósito: a suíte de casos TC-* e a tela de fluxo.
      // Entradas separadas garantem que o bundle da tela de fluxo não carregue nada do corpus de
      // casos — um agente que abre /fluxo.html não tem como topar com a grade TC-*.
      input: { main: "index.html", fluxo: "fluxo.html" },
    },
  },
});
