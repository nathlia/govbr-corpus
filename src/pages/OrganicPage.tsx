import { useState } from "react";
import type { CSSProperties } from "react";
import cardCollapse from "@govbr-ds/core/dist/components/card/examples/card-collapse.html?raw";
import cardDisabled from "@govbr-ds/core/dist/components/card/examples/card-disabled.html?raw";
import cardExamples from "@govbr-ds/core/dist/components/card/examples/card-examples.html?raw";
import cardScroll from "@govbr-ds/core/dist/components/card/examples/card-scroll.html?raw";
import wizardHorizontal from "@govbr-ds/core/dist/components/wizard/examples/wizard-horizontal.html?raw";
import wizardVertical from "@govbr-ds/core/dist/components/wizard/examples/wizard-vertical.html?raw";

const ID_STYLE: CSSProperties = {
  fontSize: "11px",
  color: "#767676",
  fontFamily: "monospace",
  display: "block",
  marginBottom: "0.5rem",
};

interface Fragment {
  caseId: string;
  file: string;
  html: string;
}

// Official example fragments from the installed @govbr-ds/core package,
// rendered without modification. One fragment is mounted at a time: the
// examples were authored as standalone files and reuse element ids, so
// mounting several at once would create duplicate-id artifacts that do not
// exist in the package.
const FRAGMENTS: Fragment[] = [
  { caseId: "TC-O-01", file: "card/examples/card-collapse.html", html: cardCollapse },
  { caseId: "TC-O-02", file: "card/examples/card-disabled.html", html: cardDisabled },
  { caseId: "TC-O-03", file: "card/examples/card-examples.html", html: cardExamples },
  { caseId: "TC-O-04", file: "card/examples/card-scroll.html", html: cardScroll },
  { caseId: "TC-O-05", file: "wizard/examples/wizard-horizontal.html", html: wizardHorizontal },
  { caseId: "TC-O-06", file: "wizard/examples/wizard-vertical.html", html: wizardVertical },
];

export default function OrganicPage() {
  const [current, setCurrent] = useState(0);
  const fragment = FRAGMENTS[current];

  return (
    <main style={{ padding: "2rem", fontFamily: "Rawline, Raleway, sans-serif", maxWidth: "860px" }}>
      <h1 style={{ marginBottom: "0.5rem" }}>Ala orgânica</h1>
      <p style={{ marginBottom: "1.5rem", color: "#555" }}>
        Fragmentos de exemplos canônicos do pacote oficial <code>@govbr-ds/core</code> 3.7.0,
        renderizados sem modificação. Um fragmento é montado por vez.
      </p>

      <div role="group" aria-label="Selecionar fragmento" style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginBottom: "1.5rem" }}>
        {FRAGMENTS.map((f, i) => (
          <button
            key={f.caseId}
            className={`br-button ${i === current ? "primary" : "secondary"}`}
            type="button"
            onClick={() => setCurrent(i)}
          >
            {f.file.split("/").pop()}
          </button>
        ))}
      </div>

      <section
        id={fragment.caseId}
        data-testid={fragment.caseId}
        style={{ margin: "1.5rem 0", borderLeft: "3px solid #dee2e6", paddingLeft: "1rem" }}
      >
        <span aria-hidden="true" style={ID_STYLE}>
          {fragment.caseId} · {fragment.file}
        </span>
        <div dangerouslySetInnerHTML={{ __html: fragment.html }} />
      </section>
    </main>
  );
}
