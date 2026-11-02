/*
 * Comportamento da tela de acompanhamento de requerimento.
 *
 * Os componentes do DS são ligados pelas classes do core.js do próprio pacote, uma vez, sobre a
 * marcação estática da página. O que o pacote não traz (envio do formulário, retorno do envio,
 * aviso de preferência salva, Esc nos balões e o destino do foco ao fechar uma mensagem) fica aqui.
 */
(function () {
  var core = window.core;
  var formulario = document.querySelector('.formulario-documento');
  var enviar = document.querySelector('.acao-enviar');
  var retorno = document.querySelector('.retorno-formulario');

  // a posição do balão é refeita a cada abertura, com o layout do momento
  function ligarBaloes(raiz) {
    raiz.querySelectorAll('.br-tooltip').forEach(function (balao) {
      var instancia = new core.BRTooltip('br-tooltip', balao);
      instancia.showEvents.forEach(function (evento) {
        instancia.activator.addEventListener(evento, function () { instancia.popperInstance.update(); });
      });
    });
  }

  function ligarMensagem(mensagem, destinoDoFoco) {
    new core.BRAlert('br-message', mensagem);
    var fechar = mensagem.querySelector('.close');
    fechar.addEventListener('click', function () {
      var destino = destinoDoFoco();
      if (destino) destino.focus();
    });
    var controle = fechar.querySelector('[role="button"]');
    if (controle) {
      controle.addEventListener('keydown', function (evento) {
        if (evento.key === 'Enter' || evento.key === ' ') {
          evento.preventDefault();
          controle.click();
        }
      });
    }
  }

  // Componentes do DS
  document.querySelectorAll('.br-breadcrumb').forEach(function (no) { new core.BRBreadcrumb('br-breadcrumb', no); });
  document.querySelectorAll('.br-tab').forEach(function (no) { new core.BRTab('br-tab', no); });
  document.querySelectorAll('.br-step').forEach(function (no) { new core.BRStep('br-step', no); });
  document.querySelectorAll('.br-select').forEach(function (no) {
    new core.BRSelect('br-select', no);
    // o BRSelect remonta o campo e põe o botão no fim; o balão do botão volta para logo depois dele
    var botao = no.querySelector('[data-trigger]');
    var balao = no.querySelector('.br-input > .br-tooltip');
    if (botao && balao) botao.after(document.createTextNode('\n'), balao);
  });
  document.querySelectorAll('.br-checkbox').forEach(function (no) { new core.BRCheckbox('br-checkbox', no); });
  document.querySelectorAll('.br-accordion').forEach(function (no) { new core.BRAccordion('br-accordion', no); });
  document.querySelectorAll('.br-upload').forEach(function (no) {
    new core.BRUpload('br-upload', no, function () { return Promise.resolve(); });
  });
  ligarBaloes(document);
  document.querySelectorAll('.br-message').forEach(function (mensagem) {
    ligarMensagem(mensagem, function () { return document.querySelector('.titulo-pagina'); });
  });

  // Esc fecha o balão aberto
  document.addEventListener('keydown', function (evento) {
    if (evento.key !== 'Escape') return;
    document.querySelectorAll('.br-tooltip[data-show]').forEach(function (balao) {
      balao.removeAttribute('data-show');
      balao.style.zIndex = -1;
      balao.style.visibility = 'hidden';
    });
  });

  // Avisos: a preferência vale assim que muda
  var situacaoAvisos = document.querySelector('.situacao-avisos');
  document.querySelectorAll('.grupo-avisos input').forEach(function (controle) {
    controle.addEventListener('change', function () {
      situacaoAvisos.textContent = 'Preferência salva.';
    });
  });

  // Envio do documento
  var FORMATOS = /\.(pdf|jpe?g|png)$/i;
  var LIMITE = 5 * 1024 * 1024;
  var EXIGENCIAS = [
    {
      caixa: '.campo-tipo-documento .br-input',
      vazio: function () { return document.getElementById('tipo-documento').value.trim() === ''; },
    },
    {
      caixa: '.campo-arquivo .br-upload',
      controle: '#arquivo-documento',
      retorno: 'arquivo-retorno',
      vazio: function () { return document.getElementById('arquivo-documento').files.length === 0 && !document.querySelector('.campo-arquivo .upload-list .br-item'); },
      mensagem: 'Selecione o arquivo do documento.',
    },
  ];

  function limparRetorno() {
    retorno.replaceChildren();
    document.querySelectorAll('.retorno-campo').forEach(function (no) { no.remove(); });
    document.querySelectorAll('.campo .danger').forEach(function (no) { no.classList.remove('danger'); });
    document.querySelectorAll('.campo [data-danger]').forEach(function (no) { no.removeAttribute('data-danger'); });
    document.querySelectorAll('.campo [aria-describedby]').forEach(function (no) {
      var ids = no.getAttribute('aria-describedby').split(' ').filter(function (id) { return id && !/-retorno$/.test(id); });
      no.setAttribute('aria-describedby', ids.join(' '));
    });
  }

  function marcarCampo(exigencia, texto) {
    var caixa = document.querySelector(exigencia.caixa);
    if (caixa.classList.contains('br-upload')) caixa.setAttribute('data-danger', 'data-danger');
    else caixa.classList.add('danger');
    if (!exigencia.retorno) return;
    var aviso = document.createElement('span');
    aviso.className = 'feedback danger mt-1 retorno-campo';
    aviso.id = exigencia.retorno;
    aviso.setAttribute('role', 'alert');
    aviso.innerHTML = '<i class="fas fa-times-circle" aria-hidden="true"></i>' + texto;
    caixa.after(aviso);
    var controle = document.querySelector(exigencia.controle);
    var ids = (controle.getAttribute('aria-describedby') || '').split(' ').filter(Boolean);
    controle.setAttribute('aria-describedby', ids.concat(exigencia.retorno).join(' '));
  }

  function exibir(mensagem) {
    retorno.append(mensagem);
    ligarBaloes(mensagem);
    ligarMensagem(mensagem, function () { return enviar; });
    mensagem.querySelector('.fechar-mensagem').focus();
  }

  function mostrarErro() {
    var mensagem = document.createElement('div');
    mensagem.className = 'br-message danger retorno-envio';
    mensagem.id = 'msg-retorno';
    mensagem.innerHTML =
      '<div class="icon"><i class="fas fa-times-circle fa-lg" aria-hidden="true"></i>\n</div>' +
      '<div class="content" role="alert"><span class="message-title">Erro: documento não enviado.</span><span class="message-body"> Há campos obrigatórios sem preenchimento ou com problema. Corrija os campos indicados e envie novamente.</span></div>' +
      '<div class="close">\n<div class="br-button circle small fechar-mensagem" role="button" tabindex="0" aria-label="Fechar"><i class="fas fa-times" aria-hidden="true"></i><span class="rotulo-botao sr-only">Fechar</span></div>\n' +
      '<div class="br-tooltip" role="tooltip" info="info" place="top"><span class="text" role="tooltip">Fechar</span></div>\n</div>';
    exibir(mensagem);
  }

  function mostrarSucesso() {
    var mensagem = document.createElement('div');
    mensagem.className = 'br-message success retorno-envio';
    mensagem.innerHTML =
      '<div class="icon"><i class="fas fa-check-circle fa-lg" aria-hidden="true"></i><span class="sr-only">Sucesso</span>\n</div>' +
      '<div class="content" role="alert"><span class="message-title">Documento enviado.</span><span class="message-body"> A análise continua no prazo informado no resumo.</span></div>' +
      '<div class="close">\n<button class="br-button circle small fechar-mensagem" type="button" aria-label="Fechar"><i class="fas fa-times" aria-hidden="true"></i><span class="rotulo-botao sr-only">Fechar</span></button>\n' +
      '<div class="br-tooltip" role="tooltip" info="info" place="top"><span class="text" role="tooltip">Fechar</span></div>\n</div>';
    exibir(mensagem);
  }

  formulario.addEventListener('submit', function (evento) {
    evento.preventDefault();
    limparRetorno();
    var pendentes = EXIGENCIAS.filter(function (exigencia) { return exigencia.vazio(); });
    var arquivo = document.getElementById('arquivo-documento').files[0];
    var arquivoInvalido = !pendentes.some(function (e) { return e.retorno; }) && arquivo && (!FORMATOS.test(arquivo.name) || arquivo.size > LIMITE);
    if (pendentes.length > 0 || arquivoInvalido) {
      pendentes.forEach(function (exigencia) { marcarCampo(exigencia, exigencia.mensagem); });
      if (arquivoInvalido) marcarCampo(EXIGENCIAS[1], 'O arquivo deve estar em PDF, JPG ou PNG e ter até 5 MB.');
      mostrarErro();
      return;
    }
    mostrarSucesso();
  });
})();
