import { Link } from "react-router";

function Clientes() {
    return (
        <div className="pagina">
            <h1>Gerenciamento de Clientes</h1>
            <p>Escolha uma das opções:</p>
            <div className="opcoes">
                <Link to="/clientes/listar">
                    Listar clientes
                </Link>
                <Link to="/clientes/cadastrar">
                    Cadastrar novo cliente
                </Link>
            </div>
            <Link to="/">
                Voltar para a página inicial
            </Link>
        </div>
    )
}

export default Clientes