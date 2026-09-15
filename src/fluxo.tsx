import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// Font Awesome 6.6.0 empacotado localmente, na mesma posição da cascata que o <link> do CDN
// ocupava (antes do DS): a medida roda sem saída de rede, e a tela tem de ser servível sozinha.
import "@fortawesome/fontawesome-free/css/all.min.css";
import "@govbr-ds/core/dist/core.min.css";
import LoginPage from "./pages/LoginPage";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <LoginPage />
  </StrictMode>,
);
