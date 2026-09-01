import "./portal.css";
import "./fluxo.css";
import { useState, type FormEvent } from "react";

/**
 * Identificação no gov.br — reconstrução de uma tela de serviço real.
 *
 * Não há seções `TC-*`, ids de caso nem rótulos de correção: a tela existe para autenticar o
 * cidadão e é lida como tal. A unidade de avaliação é o elemento, resolvido por seletor contra a
 * página viva (ver `govbr-eval/docs/ancoragem.md`).
 */
export default function LoginPage() {
  const [cpf, setCpf] = useState("");
  const [erro, setErro] = useState<string | null>(null);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    setErro(cpf.trim() ? null : "Informe um CPF para continuar.");
  };

  return (
    <>
      <header className="barra-superior">
        <a href="/fluxo" className="marca-govbr" aria-label="gov.br — página inicial">
          <span aria-hidden="true">gov</span>
          <strong>.br</strong>
        </a>
        <div className="barra-recursos">
          <button className="br-button recurso-contraste" type="button">
            <i className="fas fa-adjust" aria-hidden="true"></i>
            Alto Contraste
          </button>
          <button className="br-button recurso-libras" type="button">
            <i className="fas fa-sign-language" aria-hidden="true"></i>
            VLibras
          </button>
        </div>
      </header>

      <main className="area-identificacao">
        <section className="painel-institucional" aria-labelledby="titulo-institucional">
          <p id="titulo-institucional" className="titulo-institucional">
            Uma <strong>conta gov.br</strong> garante a identificação de cada cidadão que acessa os
            serviços digitais públicos.
          </p>
          <p className="texto-institucional">
            Com uma única conta você acessa os serviços de todos os órgãos participantes, sem
            precisar de um cadastro novo a cada solicitação.
          </p>
        </section>

        <section className="cartao-identificacao" aria-labelledby="titulo-identificacao">
          <h1 id="titulo-identificacao" className="titulo-identificacao">Identifique-se no gov.br com:</h1>

          <div className="cabecalho-metodo">
            <i className="fas fa-id-card" aria-hidden="true"></i>
            <h2 className="nome-metodo">Número do CPF</h2>
          </div>
          <p className="apoio-metodo">
            Digite seu CPF para <strong>criar</strong> ou <strong>acessar</strong> sua conta gov.br
          </p>

          <form noValidate onSubmit={onSubmit} className="formulario-cpf">
            <div className="br-input campo-cpf-fluxo">
              <label htmlFor="cpf">CPF</label>
              <input
                id="cpf"
                className="br-input"
                type="text"
                inputMode="numeric"
                placeholder="Digite seu CPF"
                aria-required="true"
                value={cpf}
                onChange={e => setCpf(e.target.value)}
              />
            </div>
            {erro && <p className="mensagem-erro-cpf">{erro}</p>}
            <button className="br-button primary acao-continuar" type="submit">Continuar</button>
          </form>

          <h2 className="titulo-outras-opcoes">Outras opções de identificação:</h2>

          <div className="br-list lista-opcoes">
            <div className="br-item opcao-identificacao">
              <i className="fas fa-university icone-opcao" aria-hidden="true"></i>
              <a href="/fluxo" className="link-opcao">Login com seu banco</a>
              <span className="br-tag selo-conta">SUA CONTA SERÁ PRATA</span>
            </div>
            <div className="br-item opcao-identificacao">
              <i className="fas fa-qrcode icone-opcao" aria-hidden="true"></i>
              <a href="/fluxo" className="link-opcao">Login com QR code</a>
            </div>
            <div className="br-item opcao-identificacao">
              <i className="fas fa-key icone-opcao" aria-hidden="true"></i>
              <a href="/fluxo" className="link-opcao">Seu certificado digital</a>
            </div>
            <div className="br-item opcao-identificacao">
              <i className="fas fa-cloud icone-opcao" aria-hidden="true"></i>
              <a href="/fluxo" className="link-opcao">Seu certificado digital em nuvem</a>
            </div>
          </div>

          <hr className="br-divider divisor-rodape" role="presentation" />

          <p className="linha-ajuda">
            <i className="fas fa-question-circle" aria-hidden="true"></i>
            <a href="/fluxo" className="link-ajuda">Está com dúvidas e precisa de ajuda?</a>
          </p>
          <p className="linha-termo">
            <a href="/fluxo" className="link-termo">Termo de Uso e Aviso de Privacidade</a>
          </p>
        </section>
      </main>
    </>
  );
}
