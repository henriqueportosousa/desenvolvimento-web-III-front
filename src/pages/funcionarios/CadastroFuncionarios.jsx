import { useState } from "react";
import { Link } from "react-router";
import { IMaskInput } from "react-imask";
import {
  FUNCIONARIO_INICIAL,
  PERFIL,
  STATUS_FUNCIONARIO,
} from "../../constants/funcionarios";

import { converterSalarioParaNumero } from "../../utils/formatadores";

function CadastroFuncionarios({ funcionarios, aoCadastrar }) {
  const [nome, setNome] = useState(FUNCIONARIO_INICIAL.nome);
  const [cpf, setCpf] = useState(FUNCIONARIO_INICIAL.cpf);
  const [cargo, setCargo] = useState(FUNCIONARIO_INICIAL.cargo);
  const [salario, setSalario] = useState(FUNCIONARIO_INICIAL.salario);
  const [dataAdmissao, setDataAdmissao] = useState(
    FUNCIONARIO_INICIAL.data_admissao,
  );
  const [email, setEmail] = useState(FUNCIONARIO_INICIAL.email);
  const [login, setLogin] = useState(FUNCIONARIO_INICIAL.login);
  const [senhaHash, setSenhaHash] = useState(FUNCIONARIO_INICIAL.senha_hash);
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [perfil, setPerfil] = useState(FUNCIONARIO_INICIAL.perfil);
  const [status, setStatus] = useState(FUNCIONARIO_INICIAL.status);
  const [erros, setErros] = useState({});
  const [mensagemSucesso, setMensagemSucesso] = useState("");

  function limparErro(campo) {
    setErros((errosAtuais) => ({ ...errosAtuais, [campo]: "" }));
  }

  function validarFormulario() {
    const novosErros = {};
    const nomeTratado = nome.trim();
    const cargoTratado = cargo.trim();
    const emailTratado = email.trim().toLowerCase();
    const loginTratado = login.trim().toLowerCase();
    const cpfApenasDigitos = cpf.replace(/\D/g, "");

    if (nomeTratado.length < 5)
      novosErros.nome = "O nome deve possuir no mínimo 5 caracteres.";
    else if (/\d/.test(nomeTratado))
      novosErros.nome = "O nome não pode conter números.";
    if (!/^\d{11}$/.test(cpfApenasDigitos))
      novosErros.cpf = "O CPF deve possuir exatamente 11 números.";
    else if (
      funcionarios.some(
        (funcionario) =>
          funcionario.cpf.replace(/\D/g, "") === cpfApenasDigitos,
      )
    )
      novosErros.cpf = "Já existe um funcionário cadastrado com este CPF.";

    if (cargoTratado.length < 3)
      novosErros.cargo = "Informe um cargo com pelo menos 3 caracteres.";

    if (converterSalarioParaNumero(salario) <= 0)
      novosErros.salario = "Informe um salário maior que zero.";

    if (!dataAdmissao)
      novosErros.data_admissao = "Informe a data de admissão.";

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailTratado))
      novosErros.email = "Informe um endereço de e-mail válido.";
    else if (
      funcionarios.some(
        (funcionario) => funcionario.email.toLowerCase() === emailTratado,
      )
    )
      novosErros.email = "Já existe um funcionário cadastrado com este e-mail.";

    if (!/^[a-zA-Z0-9._-]{3,}$/.test(loginTratado))
      novosErros.login =
        "O login deve ter ao menos 3 caracteres e não pode conter espaços.";
    else if (funcionarios.some((funcionario) =>
      funcionario.login.toLowerCase() === loginTratado,
    )
    )
      novosErros.login = "Já existe um funcionário cadastrado com este login.";

    if (senhaHash.length < 6)
      novosErros.senha_hash = "A senha deve possuir no mínimo 6 caracteres.";
    if (!perfil) novosErros.perfil = "Selecione um perfil.";

    if (!status) novosErros.status = "Selecione um status.";

    setErros(novosErros);
    return Object.keys(novosErros).length === 0;
  }

  function cadastrarFuncionario(evento) {
    evento.preventDefault();

    setMensagemSucesso("");

    if (!validarFormulario()) return;

    aoCadastrar({
      nome: nome.trim(),
      cpf,
      cargo: cargo.trim(),
      salario: converterSalarioParaNumero(salario),
      data_admissao: dataAdmissao,
      email: email.trim().toLowerCase(),
      login: login.trim().toLowerCase(),
      senha_hash: senhaHash,
      perfil,
      status,
    });
    setMensagemSucesso("Funcionário cadastrado com sucesso!");
    setErros({});
    setNome("");
    setCpf("");
    setCargo("");
    setSalario("");
    setDataAdmissao("");
    setEmail("");
    setLogin("");
    setSenhaHash("");
    setPerfil("");
    setStatus("Ativo");
  }

  return (
    <main className="pagina">
      <h1>Cadastrar novo funcionário</h1>
      {mensagemSucesso && <p className="mensagem-sucesso">{mensagemSucesso}</p>}
      <form className="formulario" onSubmit={cadastrarFuncionario} noValidate>
        <label htmlFor="nome">Nome</label>
        <input
          id="nome"
          type="text"
          value={nome}
          onChange={(evento) => {
            setNome(evento.target.value.replace(/[0-9]/g, ""));
            limparErro("nome");
          }}
          className={erros.nome ? "campo-invalido" : ""}
          placeholder="Digite o nome completo"
          required
        />

        {erros.nome && <span className="mensagem-erro">{erros.nome}</span>}

        <label htmlFor="cpf">CPF</label>
        <IMaskInput
          id="cpf"
          mask="000.000.000-00"
          value={cpf}
          onAccept={(valor) => {
            setCpf(valor);
            limparErro("cpf");
          }}
          className={erros.cpf ? "campo-invalido" : ""}
          placeholder="000.000.000-00"
          required
        />

        {erros.cpf && <span className="mensagem-erro">{erros.cpf}</span>}

        <label htmlFor="cargo">Cargo</label>
        <input
          id="cargo"
          type="text"
          value={cargo}
          onChange={(evento) => {
            setCargo(evento.target.value);
            limparErro("cargo");
          }}
          className={erros.cargo ? "campo-invalido" : ""}
          placeholder="Ex.: Desenvolvedor Front-end"
          required
        />
        {erros.cargo && <span className="mensagem-erro">{erros.cargo}</span>}

        <label htmlFor="salario">Salário</label>

        <IMaskInput
          id="salario"
          mask={Number}
          scale={2}
          thousandsSeparator="."
          radix=","
          padFractionalZeros
          normalizeZeros
          prefix="R$ "
          value={salario}
          onAccept={(valor) => {
            setSalario(valor);
            limparErro("salario");
          }}
          className={erros.salario ? "campo-invalido" : ""}
          placeholder="R$ 0,00"
          required
        />

        {erros.salario && (
          <span className="mensagem-erro">{erros.salario}</span>
        )}

        <label htmlFor="data_admissao">Data de admissão</label>
        <input
          id="data_admissao"
          type="date"
          value={dataAdmissao}
          onChange={(evento) => {
            setDataAdmissao(evento.target.value);
            limparErro("data_admissao");
          }}
          className={erros.data_admissao ? "campo-invalido" : ""}
          required
        />

        {erros.data_admissao && (
          <span className="mensagem-erro">{erros.data_admissao}</span>
        )}

        <label htmlFor="email">E-mail</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(evento) => {
            setEmail(evento.target.value);
            limparErro("email");
          }}
          className={erros.email ? "campo-invalido" : ""}
          placeholder="funcionario@email.com"
          required
        />

        {erros.email && <span className="mensagem-erro">{erros.email}</span>}

        <label htmlFor="login">Login</label>
        <input
          id="login"
          type="text"
          value={login}
          onChange={(evento) => {
            setLogin(evento.target.value);
            limparErro("login");
          }}
          className={erros.login ? "campo-invalido" : ""}
          placeholder="Digite o login"
          required
        />

        {erros.login && <span className="mensagem-erro">{erros.login}</span>}

        <label htmlFor="senha_hash">Senha</label>
        <div className="campo-senha">
          <input
            id="senha_hash"
            type={mostrarSenha ? "text" : "password"}
            value={senhaHash}
            onChange={(evento) => {
              setSenhaHash(evento.target.value);
              limparErro("senha_hash");
            }}
            className={erros.senha_hash ? "campo-invalido" : ""}
            placeholder="Digite a senha"
            required
          />
          <button
            type="button"
            className="botao-mostrar-senha"
            onClick={() => setMostrarSenha(!mostrarSenha)}
            aria-label={mostrarSenha ? "Ocultar senha" : "Mostrar senha"}
            title={mostrarSenha ? "Ocultar senha" : "Mostrar senha"}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              {mostrarSenha ? (
                <>
                  <path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12Z" />
                  <circle cx="12" cy="12" r="3" />
                </>
              ) : (
                <>
                  <path d="M3 3l18 18" />
                  <path d="M10.6 6.2A10.7 10.7 0 0 1 12 6c6.5 0 10 6 10 6a18.1 18.1 0 0 1-3.1 3.8M6.2 6.2A18.4 18.4 0 0 0 2 12s3.5 6 10 6c1.2 0 2.3-.2 3.3-.6" />
                  <path d="M9.9 9.9a3 3 0 0 0 4.2 4.2" />
                </>
              )}
            </svg>
          </button>
        </div>

        {erros.senha_hash && (
          <span className="mensagem-erro">{erros.senha_hash}</span>
        )}

        <label htmlFor="perfil">Perfil</label>
        <select
          id="perfil"
          value={perfil}
          onChange={(evento) => {
            setPerfil(evento.target.value);
            limparErro("perfil");
          }}
          className={erros.perfil ? "campo-invalido" : ""}
          required
        >
          <option value="">Selecione um perfil</option>
          {PERFIL.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>

        {erros.perfil && <span className="mensagem-erro">{erros.perfil}</span>}

        <label htmlFor="status">Status</label>
        <select
          id="status"
          value={status}
          onChange={(evento) => {
            setStatus(evento.target.value);
            limparErro("status");
          }}
          className={erros.status ? "campo-invalido" : ""}
          required
        >
          {STATUS_FUNCIONARIO.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>

        {erros.status && <span className="mensagem-erro">{erros.status}</span>}

        <button type="submit">Cadastrar funcionário</button>
      </form>
      <Link to="/funcionarios">Voltar para Gerenciamento de Funcionários</Link>
    </main>
  );
}

export default CadastroFuncionarios;
