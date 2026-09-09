import { Link } from "react-router";

function ListaClientes({ clientes, aoExcluir }) {

    function confirmarExclusao(cliente) {
        const confirmacao = window.confirm(
            `Deseja realmente excluir o cliente ${cliente.nome}?`
        )

        if (confirmacao) {
            aoExcluir(cliente.id);
        }
    }


    return (
        <main className="pagina">
            <h1>Lista de Clientes</h1>
            <ul className="lista">
                {clientes.map((cliente) => (
                    <li key={cliente.id}>
                        <strong>{cliente.nome}</strong>
                        <span>CPF: {cliente.cpf}</span>
                        <span>E-mail: {cliente.email}</span>
                        <span>Telefone: {cliente.telefone}</span>

                        <div className="acoes">
                            <Link to={`/clientes/editar/${cliente.id}`} className="botao-alterar">Alterar</Link>
                            <button onClick={() => confirmarExclusao(cliente)} className="botao-excluir">Excluir</button>
                        </div>
                        
                    </li>
                ))}
            </ul>
            
            <Link to="/clientes">Voltar para Gerenciamento de
                Clientes</Link>
        </main>
    )

}

export default ListaClientes