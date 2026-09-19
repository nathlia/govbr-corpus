/**
 * Comportamento da tela de solicitação de serviço.
 *
 * Os componentes do DS são ligados pelas classes do `core.js` do próprio pacote, uma vez, sobre a
 * marcação estática que o React entregou. O que o pacote não traz — envio do formulário, troca de
 * página do histórico e o diálogo de descarte — fica aqui, em DOM direto, para não disputar os
 * mesmos nós com o `core.js`.
 */
import * as core from "@govbr-ds/core/dist/core.js";

interface Anterior {
  protocolo: string;
  servico: string;
  data: string;
  situacao: string;
}

const ANTERIORES: Anterior[][] = [
  [
    { protocolo: "2026.0918.004417", servico: "Emissão de certidão", data: "02/09/2026", situacao: "Em análise" },
    { protocolo: "2026.0811.003102", servico: "Atualização cadastral", data: "11/08/2026", situacao: "Concluída" },
    { protocolo: "2026.0703.002876", servico: "Segunda via de documento", data: "03/07/2026", situacao: "Concluída" },
    { protocolo: "2026.0522.001954", servico: "Agendamento de perícia", data: "22/05/2026", situacao: "Cancelada" },
    { protocolo: "2026.0409.001220", servico: "Emissão de certidão", data: "09/04/2026", situacao: "Concluída" },
  ],
  [
    { protocolo: "2026.0217.000731", servico: "Atualização cadastral", data: "17/02/2026", situacao: "Concluída" },
    { protocolo: "2026.0108.000045", servico: "Segunda via de documento", data: "08/01/2026", situacao: "Concluída" },
    { protocolo: "2025.1124.009812", servico: "Agendamento de perícia", data: "24/11/2025", situacao: "Concluída" },
    { protocolo: "2025.1002.008340", servico: "Emissão de certidão", data: "02/10/2025", situacao: "Indeferida" },
    { protocolo: "2025.0815.006998", servico: "Atualização cadastral", data: "15/08/2025", situacao: "Concluída" },
  ],
  [
    { protocolo: "2025.0630.005127", servico: "Emissão de certidão", data: "30/06/2025", situacao: "Concluída" },
    { protocolo: "2025.0512.003984", servico: "Segunda via de documento", data: "12/05/2025", situacao: "Concluída" },
    { protocolo: "2025.0320.002215", servico: "Agendamento de perícia", data: "20/03/2025", situacao: "Cancelada" },
    { protocolo: "2025.0204.000903", servico: "Atualização cadastral", data: "04/02/2025", situacao: "Concluída" },
    { protocolo: "2025.0109.000112", servico: "Emissão de certidão", data: "09/01/2025", situacao: "Concluída" },
  ],
];

interface Exigencia {
  /** Elemento que recebe o estado de erro (a caixa do componente). */
  caixa: string;
  /** Controle consultado para saber se há valor. */
  controle: string;
  mensagem: string;
  /** Id do texto de retorno, quando o controle o referencia. */
  retorno?: string;
}

const EXIGENCIAS: Exigencia[] = [
  { caixa: ".campo-nome .br-input", controle: "#nome", mensagem: "Informe o nome completo.", retorno: "nome-retorno" },
  { caixa: ".campo-cpf .br-input", controle: "#cpf", mensagem: "Informe o CPF.", retorno: "cpf-retorno" },
  { caixa: ".campo-servico .br-input", controle: "#servico", mensagem: "Selecione o tipo de serviço." },
  { caixa: ".campo-unidade .br-input", controle: "#unidade", mensagem: "Selecione a unidade de atendimento." },
  { caixa: ".grupo-forma", controle: "input[name=forma]", mensagem: "Escolha a forma de atendimento.", retorno: "forma-retorno" },
  { caixa: ".campo-data .br-input", controle: "#data-preferencial", mensagem: "Informe a data preferencial.", retorno: "data-retorno" },
  { caixa: ".campo-descricao .br-textarea", controle: "#descricao", mensagem: "Descreva a solicitação.", retorno: "descricao-retorno" },
  { caixa: ".campo-declaracao", controle: "#declaracao", mensagem: "Confirme a declaração para enviar.", retorno: "declaracao-retorno" },
];

function preenchido(tela: HTMLElement, seletor: string): boolean {
  const controles = [...tela.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>(seletor)];
  return controles.some(c => (c instanceof HTMLInputElement && (c.type === "radio" || c.type === "checkbox") ? c.checked : c.value.trim() !== ""));
}

function mostrarPagina(tela: HTMLElement, pagina: number) {
  const corpo = tela.querySelector<HTMLElement>(".linhas-anteriores")!;
  corpo.replaceChildren(...ANTERIORES[pagina].map(linha => {
    const tr = document.createElement("tr");
    for (const valor of [linha.protocolo, linha.servico, linha.data, linha.situacao]) {
      const td = document.createElement("td");
      td.textContent = valor;
      tr.append(td);
    }
    return tr;
  }));
  const paginacao = tela.querySelector<HTMLElement>(".paginacao-anteriores")!;
  paginacao.dataset.current = String(pagina + 1);
  paginacao.querySelectorAll(".page").forEach((link, i) => link.classList.toggle("active", i === pagina));
  paginacao.querySelector<HTMLButtonElement>("[data-previous-page]")!.disabled = pagina === 0;
  paginacao.querySelector<HTMLButtonElement>("[data-next-page]")!.disabled = pagina === ANTERIORES.length - 1;
}

function ligarPaginacao(tela: HTMLElement) {
  const paginacao = tela.querySelector<HTMLElement>(".paginacao-anteriores")!;
  const atual = () => Number(paginacao.dataset.current) - 1;
  paginacao.querySelectorAll(".page").forEach((link, i) => link.addEventListener("click", evento => {
    evento.preventDefault();
    mostrarPagina(tela, i);
  }));
  paginacao.querySelector("[data-previous-page]")!.addEventListener("click", () => mostrarPagina(tela, Math.max(0, atual() - 1)));
  paginacao.querySelector("[data-next-page]")!.addEventListener("click", () => mostrarPagina(tela, Math.min(ANTERIORES.length - 1, atual() + 1)));
  mostrarPagina(tela, 0);
}

function limparRetorno(tela: HTMLElement) {
  tela.querySelector(".retorno-envio")!.replaceChildren();
  tela.querySelectorAll(".retorno-campo").forEach(no => no.remove());
  tela.querySelectorAll(".danger").forEach(no => no.classList.remove("danger"));
  tela.querySelectorAll("[aria-invalid]").forEach(no => no.removeAttribute("aria-invalid"));
}

function mostrarRetorno(tela: HTMLElement, pendentes: Exigencia[]) {
  const mensagem = document.createElement("div");
  mensagem.className = "br-message danger mensagem-retorno";
  mensagem.innerHTML = `
    <div class="close">
      <div class="br-button circle small" role="button" tabindex="0" aria-label="Fechar a mensagem"><i class="fas fa-times" aria-hidden="true"></i></div>
    </div>
    <div class="content" role="alert" tabindex="-1"><span class="message-title">Não foi possível enviar.</span><span class="message-body"> Há ${pendentes.length} campo(s) obrigatório(s) sem preenchimento.</span></div>
    <div class="icon"><i class="fas fa-times-circle fa-lg" aria-hidden="true"></i></div>`;
  const fechar = mensagem.querySelector<HTMLElement>(".close [role=button]")!;
  fechar.addEventListener("click", () => mensagem.remove());
  fechar.addEventListener("keydown", evento => {
    if (evento.key === "Enter" || evento.key === " ") {
      evento.preventDefault();
      mensagem.remove();
    }
  });
  tela.querySelector(".retorno-envio")!.append(mensagem);

  for (const exigencia of pendentes) {
    const caixa = tela.querySelector<HTMLElement>(exigencia.caixa)!;
    caixa.classList.add("danger");
    const retorno = document.createElement("span");
    retorno.className = "feedback danger retorno-campo";
    retorno.setAttribute("role", "alert");
    retorno.innerHTML = `<i class="fas fa-times-circle" aria-hidden="true"></i>${exigencia.mensagem}`;
    caixa.append(retorno);
    for (const controle of tela.querySelectorAll<HTMLElement>(exigencia.controle)) {
      controle.setAttribute("aria-invalid", "true");
      if (exigencia.retorno) {
        retorno.id = exigencia.retorno;
        const apoio = (controle.getAttribute("aria-describedby") ?? "").split(" ").filter(id => id && !id.endsWith("-retorno"));
        controle.setAttribute("aria-describedby", [...apoio, exigencia.retorno].join(" "));
      }
    }
  }
  mensagem.querySelector<HTMLElement>(".content")!.focus();
}

function abrirDescarte(tela: HTMLElement, formulario: HTMLFormElement) {
  const fundo = document.createElement("div");
  fundo.className = "br-scrim-util foco active fundo-descarte";
  fundo.dataset.scrim = "true";
  fundo.innerHTML = `
    <div class="br-modal medium dialogo-descarte" role="dialog" aria-modal="true" aria-labelledby="titulo-descarte">
      <div class="br-modal-header">
        <div class="modal-title" id="titulo-descarte">Descartar solicitação?</div>
        <button class="br-button close circle" type="button" data-dismiss="br-modal" aria-label="Fechar"><i class="fas fa-times" aria-hidden="true"></i></button>
      </div>
      <div class="br-modal-body">
        <p>Os dados preenchidos nesta página serão apagados. Esta ação não pode ser desfeita.</p>
      </div>
      <div class="br-modal-footer justify-content-end">
        <button class="br-button secondary acao-manter" type="button">Continuar preenchendo</button>
        <button class="br-button primary ml-2 acao-descartar" type="button">Descartar</button>
      </div>
    </div>`;
  tela.append(fundo);

  const controles = () => [...fundo.querySelectorAll<HTMLElement>("button")];
  const fechar = () => {
    fundo.remove();
    (document.activeElement as HTMLElement | null)?.blur();
  };
  fundo.addEventListener("keydown", evento => {
    if (evento.key === "Escape") return fechar();
    if (evento.key !== "Tab") return;
    const lista = controles();
    const indice = lista.indexOf(document.activeElement as HTMLElement);
    evento.preventDefault();
    lista[(indice + (evento.shiftKey ? -1 : 1) + lista.length) % lista.length].focus();
  });
  fundo.querySelector("[data-dismiss]")!.addEventListener("click", fechar);
  fundo.querySelector(".acao-manter")!.addEventListener("click", fechar);
  fundo.querySelector(".acao-descartar")!.addEventListener("click", () => {
    formulario.reset();
    limparRetorno(tela);
    fechar();
  });
  fundo.querySelector<HTMLElement>(".acao-manter")!.focus();
}

export function iniciarSolicitacao(tela: HTMLElement) {
  if (tela.dataset.iniciada) return;
  tela.dataset.iniciada = "true";

  tela.querySelectorAll<HTMLElement>(".br-select").forEach(no => new core.BRSelect("br-select", no));
  tela.querySelectorAll<HTMLElement>(".br-datetimepicker").forEach(no => new core.BRDateTimePicker("br-datetimepicker", no, {}));
  tela.querySelectorAll<HTMLElement>(".br-upload").forEach(no => {
    new core.BRUpload("br-upload", no, () => Promise.resolve());
    no.querySelector<HTMLElement>(".upload-button")!.tabIndex = 1;
  });
  tela.querySelectorAll<HTMLElement>(".br-breadcrumb").forEach(no => new core.BRBreadcrumb("br-breadcrumb", no));
  ligarPaginacao(tela);

  const formulario = tela.querySelector<HTMLFormElement>(".formulario-solicitacao")!;
  formulario.addEventListener("submit", evento => {
    evento.preventDefault();
    limparRetorno(tela);
    const pendentes = EXIGENCIAS.filter(exigencia => !preenchido(tela, exigencia.controle));
    if (pendentes.length > 0) return mostrarRetorno(tela, pendentes);
    const sucesso = document.createElement("div");
    sucesso.className = "br-message success mensagem-retorno";
    sucesso.innerHTML = `
      <div class="icon"><i class="fas fa-check-circle fa-lg" aria-hidden="true"></i></div>
      <div class="content" role="alert" tabindex="-1"><span class="message-title">Solicitação enviada.</span><span class="message-body"> Acompanhe o andamento em Solicitações anteriores.</span></div>
      <div class="close">
        <button class="br-button circle small" type="button" aria-label="Fechar a mensagem"><i class="fas fa-times" aria-hidden="true"></i></button>
      </div>`;
    sucesso.querySelector(".close button")!.addEventListener("click", () => sucesso.remove());
    tela.querySelector(".retorno-envio")!.append(sucesso);
    sucesso.querySelector<HTMLElement>(".content")!.focus();
  });
  tela.querySelector(".acao-cancelar")!.addEventListener("click", () => abrirDescarte(tela, formulario));
}
