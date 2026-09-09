import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { IMaskInput } from "react-imask";

function EditarClientes({ clientes, aoAlterar }) {
    const { id } = useParams();
    const navegar = useNavigate();
    const clienteEncontrado = clientes.find(
        (cliente) => cliente.id === Number(id)
    );

    const [nome, setNome] = useState(clienteEncontrado?.nome ?? '');
    const [cpf, setCpf] = useState(clienteEncontrado?.cpf ?? '');
    const [email, setEmail] = useState(clienteEncontrado?.email ?? '');
    const [telefone, setTelefone] = useState(clienteEncontrado?.telefone ?? '');

    function alterarCliente(evento) {
        evento.preventDefault();
        const clienteAtualizado = {
            id: Number(id),
            nome,
            cpf,
            email,
            telefone
        };
        aoAlterar(clienteAtualizado);
        alert('Cliente alterado com sucesso!');
        navegar('/clientes/listar');
    }

    if (!clienteEncontrado) {
        return (
            <main className="pagina">
                <h1>Cliente não encontrado</h1>
                <Link to="/clientes/listar">Voltar para Lista de Clientes</Link>
            </main>
        );
    }

    return (
        <main className="pagina">
            <h1>Alterar Cliente</h1>
            <form
                className="formulario"
                onSubmit={alterarCliente}>

                <label htmlFor="nome">Nome</label>
                <input
                    type="text"
                    id="nome"
                    value={nome}
                    onChange={(evento) => setNome(evento.target.value)}
                    required
                />


                <label htmlFor="cpf">CPF</label>
                <IMaskInput
                    id="cpf"
                    mask="000.000.000-00"
                    type="text"
                    value={cpf}
                    onChange={(evento) => setCpf(evento.target.value)}
                    required
                />

                <label htmlFor="telefone">Telefone</label>
                <IMaskInput
                    mask="(00) 00000-0000"
                    type="text"
                    id="telefone"
                    value={telefone}
                    onChange={(evento) => setTelefone(evento.target.value)}
                    placeholder="(00) 00000-0000"
                    required
                />

                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(evento) => setEmail(evento.target.value)}
                    required
                />

                <button type="submit">Alterar Cliente</button>
            </form>
            <Link to="/clientes/listar">
                Voltar para a lista de clientes
            </Link>
        </main>
    );
}

export default EditarClientes;