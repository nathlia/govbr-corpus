import { useEffect, useState } from "react";
import ButtonPage from "./pages/ButtonPage.jsx";
import FormPage from "./pages/FormPage.jsx";

const PAGES = {
  buttons: { label: "Botões", component: ButtonPage },
  form:    { label: "Formulário", component: FormPage },
};

// TC-B-xx → buttons, TC-F-xx → form
const tabForCase = (id) => (id.startsWith("TC-F") ? "form" : "buttons");

export default function App() {
  const [current, setCurrent] = useState(() => {
    const hash = window.location.hash.slice(1);
    return hash ? tabForCase(hash) : "buttons";
  });
  const Page = PAGES[current].component;

  // Deep links (#TC-B-04): open on the right tab and scroll to the section
  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (!hash) return;
    const el = document.getElementById(hash);
    if (el) el.scrollIntoView({ block: "center" });
  }, [current]);

  return (
    <>
      <nav style={{
        background: "#1351b4",
        padding: "0 2rem",
        display: "flex",
        gap: "0.25rem",
        alignItems: "center",
      }}>
        <span style={{ color: "#fff", fontFamily: "Rawline, Raleway, sans-serif", fontWeight: 700, marginRight: "2rem" }}>
          Portal de Demonstração — gov.br DS
        </span>
        {Object.entries(PAGES).map(([key, { label }]) => (
          <button
            key={key}
            onClick={() => setCurrent(key)}
            style={{
              background: current === key ? "#fff" : "transparent",
              color: current === key ? "#1351b4" : "#fff",
              border: "none",
              padding: "0.75rem 1.25rem",
              cursor: "pointer",
              fontFamily: "Rawline, Raleway, sans-serif",
              fontWeight: current === key ? 700 : 400,
              fontSize: "14px",
            }}
          >
            {label}
          </button>
        ))}
      </nav>
      <Page />
    </>
  );
}
