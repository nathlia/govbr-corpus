import "./portal.css";
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

const HEADER_STYLE: CSSProperties = {
  background: "#f8f8f8",
  padding: "0.75rem 1rem",
  display: "flex",
  gap: "1.5rem",
  alignItems: "center",
};

function Breadcrumb({ children }: { children: React.ReactNode }) {
  return (
    <div className="br-breadcrumb">
      <ul className="crumb-list" style={{ display: "flex", gap: "0.5rem", listStyle: "none", padding: 0, alignItems: "center" }}>
        {children}
      </ul>
    </div>
  );
}

const CRUMB_STYLE: CSSProperties = { display: "flex", alignItems: "center", gap: "0.5rem" };

export default function NavPage() {
  return (
    <main style={{ padding: "2rem", fontFamily: "Rawline, Raleway, sans-serif", maxWidth: "760px" }}>
      <h1 style={{ marginBottom: "2rem" }}>Navegação</h1>

      {/* TC-N-01 */}
      <section id="TC-N-01" data-testid="TC-N-01" style={CASE_STYLE}>
        <span aria-hidden="true" style={ID_STYLE}>TC-N-01</span>
        <div style={HEADER_STYLE}>
          <a href="#TC-N-01" style={{ fontWeight: 700, color: "#1351b4" }}>gov.br</a>
          <a href="#n01-conteudo" className="br-skiplink link-atalho" style={{ position: "static" }}>Ir para o conteúdo</a>
        </div>
        <div id="n01-conteudo" style={{ padding: "0.75rem 1rem" }}>
          <p>Conteúdo principal da página de consulta.</p>
        </div>
      </section>

      {/* TC-N-02 */}
      <section id="TC-N-02" data-testid="TC-N-02" style={CASE_STYLE}>
        <span aria-hidden="true" style={ID_STYLE}>TC-N-02</span>
        <Breadcrumb>
          <li className="crumb home" style={CRUMB_STYLE}>
            <a href="#TC-N-02"><i className="fas fa-home" aria-hidden="true"></i><span className="sr-only">Página inicial</span></a>
          </li>
          <li className="crumb" style={CRUMB_STYLE}>
            <i className="fas fa-chevron-right" aria-hidden="true"></i>
            <a href="#TC-N-02">Serviços</a>
          </li>
          <li className="crumb" style={CRUMB_STYLE}>
            <i className="fas fa-chevron-right" aria-hidden="true"></i>
            <a href="#TC-N-02">Consulta de processos</a>
          </li>
        </Breadcrumb>
      </section>

      {/* TC-N-03 */}
      <section id="TC-N-03" data-testid="TC-N-03" style={CASE_STYLE}>
        <span aria-hidden="true" style={ID_STYLE}>TC-N-03</span>
        <div style={HEADER_STYLE}>
          <a href="#n03-conteudo" className="br-skiplink link-atalho" style={{ position: "static" }}>Ir para o conteúdo</a>
          <a href="#TC-N-03" style={{ fontWeight: 700, color: "#1351b4" }}>gov.br</a>
        </div>
        <Breadcrumb>
          <li className="crumb home" style={CRUMB_STYLE}>
            <a href="#TC-N-03"><i className="fas fa-home" aria-hidden="true"></i><span className="sr-only">Página inicial</span></a>
          </li>
          <li className="crumb" style={CRUMB_STYLE}>
            <i className="fas fa-chevron-right" aria-hidden="true"></i>
            <a href="#TC-N-03">Serviços</a>
          </li>
          <li className="crumb" style={CRUMB_STYLE}>
            <i className="fas fa-chevron-right" aria-hidden="true"></i>
            <span aria-current="page">Consulta de processos</span>
          </li>
        </Breadcrumb>
        <div id="n03-conteudo" style={{ padding: "0.75rem 1rem" }}>
          <p>Conteúdo principal da página de consulta.</p>
        </div>
      </section>

      {/* TC-N-04 */}
      <section id="TC-N-04" data-testid="TC-N-04" style={CASE_STYLE}>
        <span aria-hidden="true" style={ID_STYLE}>TC-N-04</span>
        <Breadcrumb>
          <li className="crumb home" style={CRUMB_STYLE}>
            <a href="#TC-N-04"><i className="fas fa-home" aria-hidden="true"></i><span className="sr-only">Página inicial</span></a>
          </li>
          <li className="crumb" style={CRUMB_STYLE}>
            <i className="fas fa-chevron-right" aria-hidden="true"></i>
            <a href="#TC-N-04" tabIndex={-1}>Serviços</a>
          </li>
          <li className="crumb" style={CRUMB_STYLE}>
            <i className="fas fa-chevron-right" aria-hidden="true"></i>
            <span aria-current="page">Agendamento</span>
          </li>
        </Breadcrumb>
      </section>

      {/* TC-N-05 */}
      <section id="TC-N-05" data-testid="TC-N-05" style={CASE_STYLE}>
        <span aria-hidden="true" style={ID_STYLE}>TC-N-05</span>
        <p style={{ marginBottom: "0.5rem" }}>Princípio adotado pelo programa de transformação digital:</p>
        <blockquote style={{ borderLeft: "3px solid #1351b4", paddingLeft: "0.75rem", fontStyle: "italic" }}>
          Government services should be digital by default, designed around user needs.
        </blockquote>
      </section>

      {/* TC-N-06 */}
      <section id="TC-N-06" data-testid="TC-N-06" style={CASE_STYLE}>
        <span aria-hidden="true" style={ID_STYLE}>TC-N-06</span>
        <p style={{ marginBottom: "0.5rem" }}>Definição de referência internacional:</p>
        <blockquote lang="en" className="trilha-navegacao" style={{ borderLeft: "3px solid #1351b4", paddingLeft: "0.75rem", fontStyle: "italic" }}>
          Digital government is the use of digital technologies as an integrated part of governments&apos; modernisation strategies.
        </blockquote>
      </section>
    </main>
  );
}
