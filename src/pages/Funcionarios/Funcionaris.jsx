import { Link } from "react-router";

function Funcionarios() {
    return (
        <div className="pagina">
            <h1>Gerenciamento de Funcionario</h1>
            <p>Escolha uma das opções:</p>
            <div className="opcoes">
                <Link to="/funcionarios/listar">
                    Listar funcionarios
                </Link>
                <Link to="/funcionarios/cadastrar">
                    Cadastrar novo funcionario
                </Link>
            </div>
            <Link to="/">
                Voltar para a página inicial
            </Link>
        </div>
    )
}

export default Funcionarios