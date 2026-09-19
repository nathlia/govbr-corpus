import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// Mesma posição na cascata da tela de identificação: Font Awesome empacotado, depois o DS.
// Nenhum CDN — a medida roda sem saída de rede e a tela tem de ser servível sozinha.
import "@fortawesome/fontawesome-free/css/all.min.css";
import "@govbr-ds/core/dist/core.min.css";
import SolicitacaoPage from "./pages/SolicitacaoPage";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <SolicitacaoPage />
  </StrictMode>,
);
