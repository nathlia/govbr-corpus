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

const ITEM_STYLE: CSSProperties = { padding: "16px", borderBottom: "1px solid #dee2e6" };

export default function ListPage() {
  return (
    <main style={{ padding: "2rem", fontFamily: "Rawline, Raleway, sans-serif", maxWidth: "720px" }}>
      <h1 style={{ marginBottom: "2rem" }}>Listas</h1>

      {/* TC-L-01 */}
      <section id="TC-L-01" data-testid="TC-L-01" style={CASE_STYLE}>
        <span aria-hidden="true" style={ID_STYLE}>TC-L-01</span>
        <div className="br-list" role="list" style={{ border: "1px solid #dee2e6" }}>
          <div className="br-item item-solicitacao" role="listitem" style={ITEM_STYLE}>
            <div className="content">Certidão negativa de débitos</div>
          </div>
          <div className="br-item" role="listitem" style={ITEM_STYLE}>
            <div className="content" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span>Agendamento de atendimento</span>
              <button className="br-button primary" type="button">Cadastrar</button>
            </div>
          </div>
          <div className="br-item" role="listitem" style={ITEM_STYLE}>
            <div className="content">Consulta de processos</div>
          </div>
        </div>
      </section>

      {/* TC-L-02 */}
      <section id="TC-L-02" data-testid="TC-L-02" style={CASE_STYLE}>
        <span aria-hidden="true" style={ID_STYLE}>TC-L-02</span>
        <div className="br-list" role="list" style={{ border: "1px solid #dee2e6" }}>
          <div className="br-item" role="listitem" style={ITEM_STYLE}>
            <div className="content">Meus dados cadastrais</div>
          </div>
          <div className="br-item item-notificacao" role="listitem" style={{ borderBottom: "1px solid #dee2e6" }}>
            <div className="content">Notificações e alertas</div>
          </div>
          <div className="br-item" role="listitem" style={ITEM_STYLE}>
            <div className="content">Privacidade e segurança</div>
          </div>
        </div>
      </section>

      {/* TC-L-03 */}
      <section id="TC-L-03" data-testid="TC-L-03" style={CASE_STYLE}>
        <span aria-hidden="true" style={ID_STYLE}>TC-L-03</span>
        <div className="br-list" role="list" style={{ border: "1px solid #dee2e6" }}>
          <div className="br-item item-mensagem" role="listitem" style={{ borderBottom: "1px solid #dee2e6" }}>
            <div className="content">Solicitações em andamento</div>
          </div>
        </div>
      </section>

      {/* TC-L-04 */}
      <section id="TC-L-04" data-testid="TC-L-04" style={CASE_STYLE}>
        <span aria-hidden="true" style={ID_STYLE}>TC-L-04</span>
        <h2 style={{ fontSize: "16px", marginBottom: "0.5rem" }}>Resultados da busca</h2>
        <div style={{ minHeight: "64px", border: "1px solid #dee2e6" }}></div>
      </section>

      {/* TC-L-05 */}
      <section id="TC-L-05" data-testid="TC-L-05" style={CASE_STYLE}>
        <span aria-hidden="true" style={ID_STYLE}>TC-L-05</span>
        <button className="br-button primary acao-enviar" type="button">Confirmar solicitação</button>
      </section>

      {/* TC-L-06 */}
      <section id="TC-L-06" data-testid="TC-L-06" style={CASE_STYLE}>
        <span aria-hidden="true" style={ID_STYLE}>TC-L-06</span>
        <div className="br-list" role="list" style={{ border: "1px solid #dee2e6" }}>
          <div className="br-item" role="listitem" style={ITEM_STYLE}>
            <div className="content">
              <span style={{ display: "block", fontWeight: 600 }}>Certidão negativa de débitos</span>
              <p className="resumo-servico" style={{ margin: 0, color: "#555" }}>
                Documento que comprova a inexistência de débitos junto à administração pública federal
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* TC-L-07 */}
      <section id="TC-L-07" data-testid="TC-L-07" style={CASE_STYLE}>
        <span aria-hidden="true" style={ID_STYLE}>TC-L-07</span>
        <div>
          <p style={{ margin: "0 0 0.5rem" }}>Documentos emitidos</p>
          <hr className="br-divider" tabIndex={0} />
          <p style={{ margin: "0.5rem 0 0" }}>Documentos pendentes</p>
        </div>
      </section>

      {/* TC-L-08 */}
      <section id="TC-L-08" data-testid="TC-L-08" style={CASE_STYLE}>
        <span aria-hidden="true" style={ID_STYLE}>TC-L-08</span>
        <div className="br-list" role="list" style={{ border: "1px solid #dee2e6" }}>
          <div className="br-item item-historico" role="listitem" style={ITEM_STYLE}>
            <div className="content">Meus dados cadastrais</div>
          </div>
          <hr className="br-divider" role="presentation" style={{ margin: 0 }} />
          <div className="br-item" role="listitem" style={ITEM_STYLE}>
            <div className="content">Notificações e alertas</div>
          </div>
          <hr className="br-divider" role="presentation" style={{ margin: 0 }} />
          <div className="br-item" role="listitem" style={ITEM_STYLE}>
            <div className="content">Privacidade e segurança</div>
          </div>
        </div>
      </section>
    </main>
  );
}
