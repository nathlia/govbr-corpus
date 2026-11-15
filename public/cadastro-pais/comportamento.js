/*
 * Comportamento da tela de cadastro de país importador.
 *
 * Os componentes do DS são ligados pelas classes do core.js do próprio pacote, uma vez, sobre a
 * marcação estática da página. O que o pacote não traz (envio do formulário e retorno, estado do
 * switch na árvore de acessibilidade, aviso de configuração aplicada, reexibição da mensagem pela
 * ajuda e o destino do foco ao fechá-la) fica aqui.
 */
(function () {
  var core = window.core;
  var formulario = document.getElementById('form-pais');
  var titulo = document.querySelector('.titulo-pagina');
  var ajuda = document.getElementById('btn-ajuda');

  // Componentes do DS
  document.querySelectorAll('.br-breadcrumb').forEach(function (no) { new core.BRBreadcrumb('br-breadcrumb', no); });
  document.querySelectorAll('.br-select').forEach(function (no) {
    new core.BRSelect('br-select', no);
    // o gatilho abre ou fecha a lista e devolve o foco ao campo, que é quem tem o estado de foco do select e responde ao Esc
    var campo = no.querySelector('.br-input input');
    no.querySelector('[data-trigger]').addEventListener('click', function () { campo.focus(); });
  });

  // Mensagem de orientação: o Fechar a remove (BRAlert); a ajuda a traz de volta no mesmo lugar
  var orientacao = document.getElementById('msg-orientacao');
  var lugar = orientacao.parentNode;
  var depois = orientacao.nextSibling;
  var aberturaPelaAjuda = false;
  new core.BRAlert('br-message', orientacao);
  orientacao.querySelector('.close').addEventListener('click', function () {
    (aberturaPelaAjuda ? ajuda : titulo).focus();
    aberturaPelaAjuda = false;
  });
  ajuda.addEventListener('click', function () {
    if (!orientacao.isConnected) lugar.insertBefore(orientacao, depois);
    aberturaPelaAjuda = true;
    orientacao.querySelector('.fechar-mensagem').focus();
  });

  // Nome do país
  var nome = document.getElementById('nome-pais');
  nome.addEventListener('click', function () { nome.readOnly = false; });

  // Configuração do serviço: vale assim que muda
  var certificado = document.getElementById('certificado-automatico');
  var situacaoConfiguracao = document.querySelector('.situacao-configuracao');
  certificado.addEventListener('change', function () {
    certificado.setAttribute('aria-checked', certificado.checked ? 'true' : 'false');
    situacaoConfiguracao.textContent = certificado.checked
      ? 'Emissão automática ligada.'
      : 'Emissão automática desligada.';
  });

  // Envio do cadastro
  var retorno = document.getElementById('msg-erro');
  var EXIGENCIAS = [
    {
      caixa: '#inp-nome-pais',
      controles: ['#nome-pais'],
      depoisDe: '#nome-pais',
      id: 'nome-pais-erro',
      texto: 'Informe o nome do país.',
      vazio: function () { return nome.value.trim() === ''; },
    },
    {
      caixa: '#sel-continente .br-input',
      controles: ['#continente'],
      depoisDe: '#sel-continente .br-input',
      id: 'continente-erro',
      texto: 'Selecione o continente.',
      vazio: function () { return document.getElementById('continente').value.trim() === ''; },
    },
    {
      caixa: null,
      controles: ['#situacao-habilitado', '#situacao-suspenso', '#situacao-analise'],
      depoisDe: '.opcoes-situacao',
      grupo: '.opcoes-situacao .br-radio',
      id: 'situacao-erro',
      texto: 'Selecione a situação do cadastro.',
      vazio: function () { return !document.querySelector('input[name="situacao"]:checked'); },
    },
  ];

  function limparRetorno() {
    retorno.hidden = true;
    var confirmacao = document.querySelector('.confirmacao-envio');
    if (confirmacao) confirmacao.remove();
    EXIGENCIAS.forEach(function (exigencia) {
      var aviso = document.getElementById(exigencia.id);
      if (aviso) aviso.remove();
      if (exigencia.caixa) document.querySelector(exigencia.caixa).classList.remove('danger');
      if (exigencia.grupo) document.querySelectorAll(exigencia.grupo).forEach(function (no) { no.classList.remove('invalid'); });
      exigencia.controles.forEach(function (seletor) {
        var controle = document.querySelector(seletor);
        controle.removeAttribute('aria-invalid');
        var ids = (controle.getAttribute('aria-describedby') || '').split(' ').filter(function (id) { return id && id !== exigencia.id; });
        if (ids.length) controle.setAttribute('aria-describedby', ids.join(' '));
        else controle.removeAttribute('aria-describedby');
      });
    });
  }

  function marcarCampo(exigencia) {
    if (exigencia.caixa) document.querySelector(exigencia.caixa).classList.add('danger');
    if (exigencia.grupo) document.querySelectorAll(exigencia.grupo).forEach(function (no) { no.classList.add('invalid'); });
    var aviso = document.createElement('span');
    aviso.className = 'feedback danger mt-1 retorno-campo';
    aviso.id = exigencia.id;
    aviso.innerHTML = '<i class="fas fa-times-circle" aria-hidden="true"></i>' + exigencia.texto;
    var ancora = document.querySelector(exigencia.depoisDe);
    ancora.after(aviso);
    exigencia.controles.forEach(function (seletor) {
      var controle = document.querySelector(seletor);
      controle.setAttribute('aria-invalid', 'true');
      var ids = (controle.getAttribute('aria-describedby') || '').split(' ').filter(Boolean);
      controle.setAttribute('aria-describedby', ids.concat(exigencia.id).join(' '));
    });
  }

  function confirmar() {
    var anterior = document.querySelector('.confirmacao-envio');
    if (anterior) anterior.remove();
    var mensagem = document.createElement('div');
    mensagem.className = 'br-message success confirmacao-envio';
    mensagem.innerHTML =
      '<div class="icon"><i class="fas fa-check-circle fa-lg" aria-hidden="true"></i><span class="sr-only">Sucesso</span>\n</div>' +
      '<div class="content" role="status"><span class="message-title">País salvo.</span><span class="message-body"> Os dados do país foram registrados.</span></div>';
    retorno.after(mensagem);
  }

  formulario.addEventListener('submit', function (evento) {
    evento.preventDefault();
    limparRetorno();
    var pendentes = EXIGENCIAS.filter(function (exigencia) { return exigencia.vazio(); });
    if (pendentes.length === 0) {
      confirmar();
      return;
    }
    pendentes.forEach(marcarCampo);
    retorno.hidden = false;
  });

  formulario.addEventListener('reset', function () { limparRetorno(); });

  document.getElementById('btn-cancelar').addEventListener('click', function () {
    window.location.href = 'paises-importadores.html';
  });
})();
