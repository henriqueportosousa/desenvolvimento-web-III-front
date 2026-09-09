import { IMaskInput } from "react-imask";

import {
  DEPARTAMENTOS,
  STATUS_FUNCIONARIO,
} from "../constants/funcionarios";

function FormularioFuncionario({
  valores,
  aoAlterarCampo,
  aoEnviar,
  textoBotao,
}) {
  function atualizarCampo(campo, valor) {
    aoAlterarCampo((valoresAtuais) => ({
      ...valoresAtuais,
      [campo]: valor,
    }));
  }

  return (
    <form className="formulario" onSubmit={aoEnviar}>
      <label htmlFor="nome">Nome</label>
      <input
        id="nome"
        type="text"
        value={valores.nome}
        onChange={(evento) => atualizarCampo("nome", evento.target.value)}
        placeholder="Digite o nome completo"
        required
      />

      <label htmlFor="cpf">CPF</label>
      <IMaskInput
        id="cpf"
        mask="000.000.000-00"
        value={valores.cpf}
        onAccept={(valor) => atualizarCampo("cpf", valor)}
        placeholder="000.000.000-00"
        required
      />

      <label htmlFor="email">E-mail</label>
      <input
        id="email"
        type="email"
        value={valores.email}
        onChange={(evento) => atualizarCampo("email", evento.target.value)}
        placeholder="funcionario@email.com"
        required
      />

      <label htmlFor="telefone">Telefone</label>
      <IMaskInput
        id="telefone"
        mask="(00) 00000-0000"
        value={valores.telefone}
        onAccept={(valor) => atualizarCampo("telefone", valor)}
        placeholder="(11) 99999-9999"
        required
      />

      <label htmlFor="dataNascimento">Data de nascimento</label>
      <input
        id="dataNascimento"
        type="date"
        value={valores.dataNascimento}
        onChange={(evento) =>
          atualizarCampo("dataNascimento", evento.target.value)
        }
        required
      />

      <label htmlFor="cargo">Cargo</label>
      <input
        id="cargo"
        type="text"
        value={valores.cargo}
        onChange={(evento) => atualizarCampo("cargo", evento.target.value)}
        placeholder="Ex.: Desenvolvedor Front-end"
        required
      />

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
        value={valores.salario}
        onAccept={(valor) => atualizarCampo("salario", valor)}
        placeholder="R$ 0,00"
        required
      />

      <label htmlFor="departamento">Departamento</label>
      <select
        id="departamento"
        value={valores.departamento}
        onChange={(evento) =>
          atualizarCampo("departamento", evento.target.value)
        }
        required
      >
        <option value="">Selecione um departamento</option>
        {DEPARTAMENTOS.map((departamento) => (
          <option key={departamento} value={departamento}>
            {departamento}
          </option>
        ))}
      </select>

      <label htmlFor="cidade">Cidade</label>
      <input
        id="cidade"
        type="text"
        value={valores.cidade}
        onChange={(evento) => atualizarCampo("cidade", evento.target.value)}
        placeholder="Ex.: São Paulo"
        required
      />

      <label htmlFor="status">Status</label>
      <select
        id="status"
        value={valores.status}
        onChange={(evento) => atualizarCampo("status", evento.target.value)}
        required
      >
        {STATUS_FUNCIONARIO.map((status) => (
          <option key={status} value={status}>
            {status}
          </option>
        ))}
      </select>

      <button type="submit">{textoBotao}</button>
    </form>
  );
}

export default FormularioFuncionario;
