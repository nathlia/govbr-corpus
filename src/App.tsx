import { useEffect, useState, type ComponentType } from "react";
import ButtonPage from "./pages/ButtonPage";
import FormPage from "./pages/FormPage";
import NavPage from "./pages/NavPage";
import TablePage from "./pages/TablePage";
import ListPage from "./pages/ListPage";
import InteractivePage from "./pages/InteractivePage";

type PageKey = "buttons" | "form" | "nav" | "table" | "list" | "interactive";

const PAGES: Record<PageKey, { label: string; component: ComponentType }> = {
  buttons:     { label: "Botões", component: ButtonPage },
  form:        { label: "Formulário", component: FormPage },
  nav:         { label: "Navegação", component: NavPage },
  table:       { label: "Tabelas", component: TablePage },
  list:        { label: "Listas", component: ListPage },
  interactive: { label: "Interativos", component: InteractivePage },
};

// TC-<letter>-xx → tab
const TAB_BY_PREFIX: Record<string, PageKey> = {
  B: "buttons", F: "form", N: "nav", T: "table", L: "list", I: "interactive",
};
const tabForCase = (id: string): PageKey => TAB_BY_PREFIX[id.split("-")[1] ?? ""] ?? "buttons";

export default function App() {
  const [current, setCurrent] = useState<PageKey>(() => {
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
        {(Object.entries(PAGES) as [PageKey, { label: string }][]).map(([key, { label }]) => (
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
