import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";

/**
 * Ala pnip/: build Angular congelado em public/pnip/, com base href /pnip/. É uma SPA: rota sem
 * extensão sob /pnip/ recebe o index.html DELA, não o da raiz (que é o app React do corpus e
 * continua com o fallback do próprio Vite). O ícone "Sair" do cabeçalho é pedido em
 * /assets/images/exit-icon.png — o template sobe três níveis e sai do prefixo sob o base href —,
 * então esse caminho, e só ele, é servido da árvore pnip/. O build congelado nunca é editado: o
 * middleware só reescreve a URL, e quem entrega os bytes é o servidor estático do próprio Vite.
 *
 * Ala pnip-c/ (tela C, D-134): outro build do mesmo pnip-mock, base href /pnip-c/, com as mesmas
 * regras. O alias do "Sair" continua servido pela ala pnip/ (o arquivo é o mesmo nas duas; a
 * superfície de medida serve cada tela com o alias da própria árvore, telas.json).
 *
 * Ala pnip-d/ (tela D, `processos`, substituta da C abaixo do piso): mesmo fork, base href /pnip-d/,
 * mesmas regras.
 */
const PNIP_PREFIXOS = ["/pnip/", "/pnip-c/", "/pnip-d/"];
const PNIP_ALIASES: Record<string, string> = { "/assets/images/exit-icon.png": "/pnip/assets/images/exit-icon.png" };

/** Destino da reescrita, ou `null` quando o pedido não é de uma das alas pnip/, pnip-c/ e pnip-d/. */
function pnipRota(path: string): string | null {
  if (PNIP_ALIASES[path]) return PNIP_ALIASES[path];
  const prefixo = PNIP_PREFIXOS.find((p) => path.startsWith(p));
  if (!prefixo) return null;
  const ultimo = path.slice(path.lastIndexOf("/") + 1);
  return ultimo.includes(".") ? null : `${prefixo}index.html`;
}

interface Pedido { url?: string; method?: string }
interface Resposta { statusCode: number; setHeader(nome: string, valor: string): void; end(): void }

function pnipSpa(): Plugin {
  // Sem @types/node no corpus, o IncomingMessage do connect chega vazio para o tsc: os dois lados
  // são descritos só pelo que este middleware usa.
  const middleware = (req: Pedido, res: Resposta, next: () => void): void => {
    if (req.method !== "GET" && req.method !== "HEAD") return next();
    const url = new URL(req.url ?? "/", "http://corpus");
    const path = decodeURIComponent(url.pathname);
    const semBarra = PNIP_PREFIXOS.find((p) => path === p.slice(0, -1));
    if (semBarra) {
      res.statusCode = 302;
      res.setHeader("location", semBarra + url.search);
      return res.end();
    }
    const destino = pnipRota(path);
    if (destino) req.url = destino + url.search;
    next();
  };
  return {
    name: "pnip-spa",
    // Sem retornar função: o middleware entra ANTES dos do Vite, inclusive do fallback de HTML.
    configureServer(server) {
      server.middlewares.use((req, res, next) => middleware(req as unknown as Pedido, res as unknown as Resposta, next));
    },
    configurePreviewServer(server) {
      server.middlewares.use((req, res, next) => middleware(req as unknown as Pedido, res as unknown as Resposta, next));
    },
  };
}

export default defineConfig({
  plugins: [react(), pnipSpa()],
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
