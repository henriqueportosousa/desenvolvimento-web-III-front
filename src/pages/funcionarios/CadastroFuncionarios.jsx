import { useState } from "react";
import { Link, useNavigate } from "react-router";

import { FUNCIONARIO_INICIAL } from "../../constants/funcionarios";
import { converterSalarioParaNumero } from "../../utils/formatadores";
import FormularioFuncionario from "../../components/FormularioFuncionario";

function CadastroFuncionario({ aoCadastrar }) {
  const [funcionario, setFuncionario] = useState(FUNCIONARIO_INICIAL);
  const navegar = useNavigate();

  function cadastrarFuncionario(evento) {
    evento.preventDefault();
    aoCadastrar({ ...funcionario, salario: converterSalarioParaNumero(funcionario.salario) });
    alert("Funcionário cadastrado com sucesso!");
    navegar("/funcionarios/listar");
  }

  return (
    <main className="pagina">
      <h1>Cadastrar novo funcionário</h1>
      <FormularioFuncionario valores={funcionario} aoAlterarCampo={setFuncionario} aoEnviar={cadastrarFuncionario} textoBotao="Cadastrar funcionário" />
      <Link to="/funcionarios">Voltar para Gerenciamento de Funcionários</Link>
    </main>
  );
}

export default CadastroFuncionario;
