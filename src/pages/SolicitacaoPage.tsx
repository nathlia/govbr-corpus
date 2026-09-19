import "./solicitacao.css";
import { useEffect, useRef } from "react";
import { iniciarSolicitacao } from "./solicitacao-comportamento";

/**
 * Solicitação de serviço — formulário de atendimento com o histórico do cidadão.
 *
 * Como a tela de identificação, não há seções `TC-*`, ids de caso nem rótulos de correção: a
 * unidade de avaliação é o elemento, resolvido por seletor contra a página viva. A marcação é a dos
 * exemplos oficiais do DS; o comportamento dos componentes vem do `core.js` do próprio pacote e é
 * ligado uma única vez em `solicitacao-comportamento.ts` — por isso o JSX é estático e nada aqui
 * depende de estado do React.
 */

const SERVICOS = ["Emissão de certidão", "Atualização cadastral", "Agendamento de perícia", "Segunda via de documento"];
const UNIDADES = ["Agência Centro", "Agência Norte", "Agência Sul", "Posto de atendimento móvel"];

function CampoSelecao({ id, rotulo, opcoes, lugar }: { id: string; rotulo: string; opcoes: string[]; lugar: string }) {
  return (
    <div className={`campo ${lugar}`}>
      <div className="br-select">
        <div className="br-input">
          <label htmlFor={id}>{rotulo}</label>
          <input id={id} type="text" placeholder="Selecione uma opção" aria-required="true" />
          <button className="br-button" type="button" aria-label="Exibir lista" tabIndex={-1} data-trigger="data-trigger">
            <i className="fas fa-angle-down" aria-hidden="true"></i>
          </button>
        </div>
        <div className="br-list" tabIndex={0}>
          {opcoes.map((opcao, i) => (
            <div className="br-item" tabIndex={-1} key={opcao}>
              <div className="br-radio">
                <input id={`${id}-op${i}`} type="radio" name={`${id}-opcoes`} value={opcao} />
                <label htmlFor={`${id}-op${i}`}>{opcao}</label>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function SolicitacaoPage() {
  const raiz = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (raiz.current) iniciarSolicitacao(raiz.current);
  }, []);

  return (
    <div ref={raiz}>
      <nav className="br-skiplink atalho-conteudo" role="menubar">
        <a className="br-item" href="#main-content" role="menuitem" accessKey="1">
          Ir para o conteúdo <span aria-hidden="true">(1/1)</span>{" "}
          <span aria-hidden="true" className="br-tag text ml-1">1</span>
        </a>
      </nav>

      <header className="barra-superior">
        <a href="/solicitacao" className="marca-govbr" aria-label="gov.br — página inicial">
          <span aria-hidden="true">gov</span>
          <strong>.br</strong>
        </a>
      </header>

      <nav className="br-breadcrumb trilha-servico" aria-label="Breadcrumbs">
        <ol className="crumb-list" role="list">
          <li className="crumb home">
            <a className="br-button circle" href="/solicitacao">
              <span className="sr-only">Página inicial</span>
              <i className="fas fa-home" aria-hidden="true"></i>
            </a>
          </li>
          <li className="crumb">
            <i className="icon fas fa-chevron-right" aria-hidden="true"></i>
            <a href="/solicitacao">Serviços</a>
          </li>
          <li className="crumb" data-active="active">
            <i className="icon fas fa-chevron-right" aria-hidden="true"></i>
            <span tabIndex={0} aria-current="page">Solicitar serviço</span>
          </li>
        </ol>
      </nav>

      <main id="main-content" className="area-solicitacao">
        <h1 className="titulo-solicitacao">Solicitar serviço</h1>
        <p className="apoio-solicitacao">
          Todos os campos são de preenchimento obrigatório, exceto os indicados como opcionais.
        </p>

        <form noValidate className="formulario-solicitacao">
          <div className="retorno-envio"></div>

          <div className="linha-campos">
            <div className="campo campo-nome">
              <div className="br-input">
                <label htmlFor="nome">Nome completo</label>
                <input id="nome" type="text" autoComplete="name" aria-required="true" />
              </div>
            </div>
            <div className="campo campo-cpf">
              <div className="br-input">
                <label htmlFor="cpf">CPF</label>
                <input id="cpf" type="text" inputMode="numeric" placeholder="00000000000" aria-required="true" aria-describedby="cpf-apoio" />
                <p id="cpf-apoio" className="text-base mt-1">Somente números, 11 dígitos.</p>
              </div>
            </div>
          </div>

          <div className="linha-campos">
            <CampoSelecao id="servico" rotulo="Tipo de serviço" opcoes={SERVICOS} lugar="campo-servico" />
            <CampoSelecao id="unidade" rotulo="Unidade de atendimento" opcoes={UNIDADES} lugar="campo-unidade" />
          </div>

          <fieldset className="campo grupo-forma">
            <legend className="label">Forma de atendimento</legend>
            <div className="br-radio">
              <input id="forma-presencial" type="radio" name="forma" value="presencial" />
              <label>Presencial</label>
            </div>
            <div className="br-radio">
              <input id="forma-video" type="radio" name="forma" value="video" />
              <label htmlFor="forma-video">Por videochamada</label>
            </div>
            <div className="br-radio">
              <input id="forma-telefone" type="radio" name="forma" value="telefone" />
              <label htmlFor="forma-telefone">Por telefone</label>
            </div>
          </fieldset>

          <div className="linha-campos">
            <div className="campo campo-data">
              <div className="br-datetimepicker" data-mode="single" data-type="text">
                <div className="br-input has-icon">
                  <label htmlFor="data-preferencial">Data preferencial</label>
                  <input id="data-preferencial" type="text" placeholder="exemplo: 02/02/2027" data-input="data-input" aria-required="true" aria-describedby="data-apoio" />
                  <button className="br-button circle small" type="button" aria-label="Abrir calendário" data-toggle="data-toggle" id="data-preferencial-btn" tabIndex={-1} aria-hidden="true">
                    <i className="fas fa-calendar-alt" aria-hidden="true"></i>
                  </button>
                  <p id="data-apoio" className="text-base mt-1">Informe no formato dd/mm/aaaa.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="campo campo-descricao">
            <div className="br-textarea">
              <label htmlFor="descricao">Descrição da solicitação</label>
              <textarea id="descricao" rows={4} aria-required="true" aria-describedby="descricao-apoio"></textarea>
              <p id="descricao-apoio" className="text-base mt-1">Descreva o que você precisa, em até 500 caracteres.</p>
            </div>
          </div>

          <div className="campo campo-documentos">
            <div className="br-upload">
              <label className="upload-label" htmlFor="documentos"><span>Documentos comprobatórios (opcional)</span></label>
              <input className="upload-input" id="documentos" type="file" aria-describedby="documentos-apoio" />
              <div className="upload-list"></div>
            </div>
            <p id="documentos-apoio" className="text-base mt-1">Um arquivo PDF, JPG ou PNG de até 5 MB.</p>
          </div>

          <fieldset className="campo grupo-recursos">
            <legend className="label">Recursos de acessibilidade no atendimento (opcional)</legend>
            <div className="br-checkbox">
              <input id="recurso-libras" name="recurso-libras" type="checkbox" />
              <label htmlFor="recurso-libras">Intérprete de Libras</label>
            </div>
            <div className="br-checkbox">
              <input id="recurso-mobilidade" name="recurso-mobilidade" type="checkbox" />
              <label htmlFor="recurso-mobilidade">Atendimento em local sem degraus</label>
            </div>
          </fieldset>

          <div className="campo campo-declaracao">
            <div className="br-checkbox">
              <input id="declaracao" name="declaracao" type="checkbox" aria-required="true" />
              <label htmlFor="declaracao">Declaro que as informações prestadas são verdadeiras.</label>
            </div>
          </div>

          <div className="acoes-formulario">
            <button className="br-button secondary acao-cancelar" type="button">Cancelar</button>
            <button className="br-button primary acao-enviar" type="submit">Enviar</button>
          </div>
        </form>

        <section className="historico" aria-labelledby="titulo-historico">
          <h2 id="titulo-historico" className="titulo-historico">Solicitações anteriores</h2>
          <div className="br-table tabela-anteriores">
            <div className="table-header">
              <div className="top-bar">
                <div className="table-title">Solicitações anteriores</div>
              </div>
            </div>
            <table>
              <thead>
                <tr>
                  <th scope="col">Protocolo</th>
                  <th scope="col">Serviço</th>
                  <th scope="col">Data</th>
                  <th scope="col">Situação</th>
                </tr>
              </thead>
              <tbody className="linhas-anteriores"></tbody>
            </table>
            <div className="table-footer">
              <nav className="br-pagination paginacao-anteriores" aria-label="Paginação de solicitações anteriores" data-total="3" data-current="1">
                <button className="br-button circle" type="button" data-previous-page="data-previous-page" aria-label="Página anterior">
                  <i className="fas fa-angle-left" aria-hidden="true"></i>
                </button>
                <a className="page active" aria-label="Página 1" href="#titulo-historico">1</a>
                <a className="page" aria-label="Página 2" href="#titulo-historico">2</a>
                <a className="page" aria-label="Página 3" href="#titulo-historico">3</a>
                <button className="br-button circle" type="button" data-next-page="data-next-page" aria-label="Página seguinte">
                  <i className="fas fa-angle-right" aria-hidden="true"></i>
                </button>
              </nav>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
