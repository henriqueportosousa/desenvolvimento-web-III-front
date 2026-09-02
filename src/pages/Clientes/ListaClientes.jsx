import { Link } from "react-router";

function ListaClientes() {
    const clientes = [
        {
            id: 1,
            nome: 'Ana Souza',
            cpf: '12345678901',
            email: 'ana@email.com',
            telefone: '(11) 97125-8231'
        },
        {
            id: 2,
            nome: 'Bruno Lima',
            cpf: '23456789012',
            email: 'bruno@email.com',
            telefone: '(21) 91407-9021'
        },
        {
            id: 3,
            nome: 'Carla Mendes',
            cpf: '34567890123',
            email: 'carla@email.com',
            telefone: '(17) 98281-3693'
        },
    ]
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