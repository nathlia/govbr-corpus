import { useState } from "react";
import type { CSSProperties } from "react";

const CASE_STYLE: CSSProperties = {
  margin: "1.5rem 0",
  borderLeft: "3px solid #dee2e6",
  paddingLeft: "1rem",
};

const ID_STYLE: CSSProperties = {
  fontSize: "11px",
  color: "#767676",
  fontFamily: "monospace",
  display: "block",
  marginBottom: "0.5rem",
};

const PANEL_STYLE: CSSProperties = { padding: "0.75rem 1rem", border: "1px solid #dee2e6", borderTop: "none" };

const HEADER_ROW: CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  width: "100%",
  padding: "0.75rem 1rem",
  border: "1px solid #dee2e6",
  background: "#f8f8f8",
};

function CaseI01() {
  const [open, setOpen] = useState(false);
  return (
    <section id="TC-I-01" data-testid="TC-I-01" style={CASE_STYLE}>
      <span aria-hidden="true" style={ID_STYLE}>TC-I-01</span>
      <div className="br-accordion">
        <div aria-expanded="false" onClick={() => setOpen(!open)} style={{ ...HEADER_ROW, cursor: "pointer" }}>
          <span>Documentos necessários</span>
          <i className={open ? "fas fa-chevron-up" : "fas fa-chevron-down"} aria-hidden="true"></i>
        </div>
        {open && (
          <div style={PANEL_STYLE}>
            <p>Documento de identificação com foto e comprovante de residência atualizado.</p>
          </div>
        )}
      </div>
    </section>
  );
}

function CaseI02() {
  const [open, setOpen] = useState(false);
  return (
    <section id="TC-I-02" data-testid="TC-I-02" style={CASE_STYLE}>
      <span aria-hidden="true" style={ID_STYLE}>TC-I-02</span>
      <button className="br-button primary" type="button" onClick={() => setOpen(true)}>
        Ver termos de uso
      </button>
      {open && (
        <div
          className="br-scrim"
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.4)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 50,
          }}
        >
          <div className="br-modal" style={{ background: "#fff", padding: "1.5rem", maxWidth: "420px" }}>
            <h2 style={{ fontSize: "16px", marginBottom: "0.75rem" }}>Termos de uso</h2>
            <p style={{ marginBottom: "1rem" }}>
              O uso deste serviço implica a aceitação integral das condições descritas neste documento.
            </p>
            <div onClick={() => setOpen(false)} style={{ cursor: "pointer", color: "#1351b4", fontWeight: 600 }}>
              Fechar
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

function CaseI03() {
  const [active, setActive] = useState(0);
  const labels = ["Dados pessoais", "Endereço", "Contato"];
  const contents = [
    "Informe nome completo e data de nascimento.",
    "Informe CEP, logradouro e número.",
    "Informe e-mail e telefone para retorno.",
  ];
  return (
    <section id="TC-I-03" data-testid="TC-I-03" style={CASE_STYLE}>
      <span aria-hidden="true" style={ID_STYLE}>TC-I-03</span>
      <div className="br-tab">
        <div role="tablist" style={{ display: "flex", gap: "0.25rem", borderBottom: "1px solid #dee2e6" }}>
          {labels.map((label, i) => (
            <div
              key={label}
              role="tab"
              aria-selected={active === i}
              onClick={() => setActive(i)}
              style={{
                padding: "0.5rem 1rem",
                cursor: "pointer",
                fontWeight: active === i ? 700 : 400,
                borderBottom: active === i ? "2px solid #1351b4" : "2px solid transparent",
              }}
            >
              {label}
            </div>
          ))}
        </div>
        <div role="tabpanel" style={{ padding: "0.75rem 0" }}>
          <p>{contents[active]}</p>
        </div>
      </div>
    </section>
  );
}

function CaseI04() {
  const [open, setOpen] = useState(false);
  return (
    <section id="TC-I-04" data-testid="TC-I-04" style={CASE_STYLE}>
      <span aria-hidden="true" style={ID_STYLE}>TC-I-04</span>
      <div className="br-accordion">
        <button
          type="button"
          aria-expanded={open}
          aria-controls="i04-panel"
          onClick={() => setOpen(!open)}
          style={{ ...HEADER_ROW, cursor: "pointer", font: "inherit", textAlign: "left" }}
        >
          <span>Documentos necessários</span>
          <i className={open ? "fas fa-chevron-up" : "fas fa-chevron-down"} aria-hidden="true"></i>
        </button>
        <div id="i04-panel" hidden={!open} style={PANEL_STYLE}>
          <p>Documento de identificação com foto e comprovante de residência atualizado.</p>
        </div>
      </div>
    </section>
  );
}

export default function InteractivePage() {
  return (
    <main style={{ padding: "2rem", fontFamily: "Rawline, Raleway, sans-serif", maxWidth: "720px" }}>
      <h1 style={{ marginBottom: "2rem" }}>Componentes interativos</h1>
      <CaseI01 />
      <CaseI02 />
      <CaseI03 />
      <CaseI04 />
    </main>
  );
}
