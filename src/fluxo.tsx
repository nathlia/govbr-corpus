import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@govbr-ds/core/dist/core.min.css";
import LoginPage from "./pages/LoginPage";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <LoginPage />
  </StrictMode>,
);
