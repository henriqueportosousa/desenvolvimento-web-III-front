import { Link } from "react-router";

function ListaClientes({clientes}) {
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
                    </li>
                ))}
            </ul>
            <Link to="/clientes">Voltar para Gerenciamento de
                Clientes</Link>
        </main>
    )

}

export default ListaClientes