import { Link } from "react-router";
import { formatarDataBrasileira } from "../../utils/formatadores";

function ListaFuncionarios({ funcionarios, aoExcluir }) {

    function confirmarExclusao(funcionario) {
        const confirmacao = window.confirm(
            `Deseja realmente excluir o funcionario ${funcionario.nome}?`
        )

        if (confirmacao) {
            aoExcluir(funcionario.id);
        }
    }

    return (
        <main className="pagina">
            <h1>Lista de Funcionarios</h1>
            <ul className="lista">
                {funcionarios.map((funcionario) => (
                    <li key={funcionario.id}>
                        <strong>{funcionario.nome}</strong>
                        <span>CPF: {funcionario.cpf}</span>
                        <span>E-mail: {funcionario.email}</span>
                        <span>Telefone: {funcionario.telefone}</span>
                        <span>Data de Nascimento: {formatarDataBrasileira(funcionario.dataNascimento)}</span>
                        <span>Cargo: {funcionario.cargo}</span>
                        <span>Salario: {funcionario.salario}</span>
                        <span>Departamento: {funcionario.departamento}</span>
                        <span>Cidade: {funcionario.cidade}</span>
                        <span>Status: {funcionario.status}</span>

                        <div className="acoes">
                            <Link to={`/funcionarios/editar/${funcionario.id}`} className="botao-alterar">Alterar</Link>
                            <button onClick={() => confirmarExclusao(funcionario)} className="botao-excluir">Excluir</button>
                        </div>
                    </li>
                ))}
            </ul>
            <Link to="/funcionarios">Voltar para Gerenciamento de
                Funcionarios</Link>
        </main>
    )
}

export default ListaFuncionarios
