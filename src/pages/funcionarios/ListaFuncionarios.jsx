import { Link } from "react-router";
import { formatarDataBrasileira } from "../../utils/formatadores";

function ListaFuncionarios({ funcionarios, aoExcluir }) {

  function confirmarExclusao(funcionario) {
    if (window.confirm(`Deseja realmente excluir o funcionário ${funcionario.nome}?`)) {
      aoExcluir(funcionario.id_funcionario);
    }

  }

  return (
    <main className="pagina">
      <h1>Lista de Funcionários</h1>
      <ul className="lista">
        {funcionarios.map((funcionario) => (
          <li key={funcionario.id_funcionario}>
            <strong>{funcionario.nome}</strong>
            <span>CPF: {funcionario.cpf}</span>
            <span>Cargo: {funcionario.cargo}</span>
            <span>Salário: {Number(funcionario.salario).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</span>
            <span>Data de admissão: {formatarDataBrasileira(funcionario.data_admissao)}</span>
            <span>E-mail: {funcionario.email}</span>
            <span>Login: {funcionario.login}</span>
            <span>Perfil: {funcionario.perfil}</span>
            <span>Status: {funcionario.status}</span>
            <div className="acoes">
              <Link to={`/funcionarios/editar/${funcionario.id_funcionario}`} className="botao-alterar">Alterar</Link>
              <button onClick={() => confirmarExclusao(funcionario)} className="botao-excluir">Excluir</button>
            </div>
          </li>
        ))}
      </ul>
      <Link to="/funcionarios">Voltar para Gerenciamento de Funcionários</Link>
    </main>
  );
}

export default ListaFuncionarios;
