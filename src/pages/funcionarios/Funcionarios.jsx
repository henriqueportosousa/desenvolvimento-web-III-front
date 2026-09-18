import { Link } from "react-router";

function Funcionarios() {
    return (
        <div className="pagina">
            <h1>Gerenciamento de Funcionários</h1>
            <p>Escolha uma das opções:</p>
            <div className="opcoes">
                <Link to="/funcionarios/listar">
                    Listar funcionários
                </Link>
                <Link to="/funcionarios/cadastrar">
                    Cadastrar novo funcionário
                </Link>
            </div>
            <Link to="/">
                Voltar para a página inicial
            </Link>
        </div>
    )
}

export default Funcionarios
