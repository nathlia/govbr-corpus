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

const CELL: CSSProperties = { padding: "0.5rem 0.75rem", borderBottom: "1px solid #dee2e6", textAlign: "left" };

export default function TablePage() {
  return (
    <main style={{ padding: "2rem", fontFamily: "Rawline, Raleway, sans-serif", maxWidth: "760px" }}>
      <h1 style={{ marginBottom: "2rem" }}>Tabelas</h1>

      {/* TC-T-01 */}
      <section id="TC-T-01" data-testid="TC-T-01" style={CASE_STYLE}>
        <span aria-hidden="true" style={ID_STYLE}>TC-T-01</span>
        <table className="br-table" style={{ borderCollapse: "collapse", width: "100%" }}>
          <tbody>
            <tr>
              <td style={CELL}><strong>Serviço</strong></td>
              <td style={CELL}><strong>Prazo</strong></td>
              <td style={CELL}><strong>Situação</strong></td>
            </tr>
            <tr>
              <td style={CELL}>Emissão de certidão negativa</td>
              <td style={CELL}>5 dias úteis</td>
              <td style={CELL}>Disponível</td>
            </tr>
            <tr>
              <td style={CELL}>Consulta de processos</td>
              <td style={CELL}>Imediato</td>
              <td style={CELL}>Disponível</td>
            </tr>
          </tbody>
        </table>
      </section>

      {/* TC-T-02 */}
      <section id="TC-T-02" data-testid="TC-T-02" style={CASE_STYLE}>
        <span aria-hidden="true" style={ID_STYLE}>TC-T-02</span>
        <table style={{ width: "100%" }}>
          <tbody>
            <tr>
              <td style={{ width: "60%", verticalAlign: "top", padding: "0.5rem" }}>
                <h2 style={{ fontSize: "16px", marginBottom: "0.5rem" }}>Sobre o serviço</h2>
                <p>
                  A emissão de certidões pode ser feita integralmente pela internet, sem
                  necessidade de comparecimento presencial.
                </p>
              </td>
              <td style={{ verticalAlign: "top", padding: "0.5rem" }}>
                <h2 style={{ fontSize: "16px", marginBottom: "0.5rem" }}>Atendimento</h2>
                <p>Segunda a sexta, das 8h às 18h.</p>
              </td>
            </tr>
          </tbody>
        </table>
      </section>

      {/* TC-T-03 */}
      <section id="TC-T-03" data-testid="TC-T-03" style={CASE_STYLE}>
        <span aria-hidden="true" style={ID_STYLE}>TC-T-03</span>
        <table className="br-table" style={{ borderCollapse: "collapse", width: "100%" }}>
          <caption style={{ textAlign: "left", marginBottom: "0.5rem", fontWeight: 600 }}>
            Serviços disponíveis por canal
          </caption>
          <thead>
            <tr>
              <th scope="col" style={CELL}>Serviço</th>
              <th scope="col" style={CELL}>Prazo</th>
              <th scope="col" style={CELL}>Situação</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={CELL}>Emissão de certidão negativa</td>
              <td style={CELL}>5 dias úteis</td>
              <td style={CELL}>Disponível</td>
            </tr>
            <tr>
              <td style={CELL}>Consulta de processos</td>
              <td style={CELL}>Imediato</td>
              <td style={CELL}>Disponível</td>
            </tr>
          </tbody>
        </table>
      </section>
    </main>
  );
}
