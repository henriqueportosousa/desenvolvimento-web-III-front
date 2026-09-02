import { useState } from "react";
import { Link } from "react-router";

function CadastroCliente() {
    const [nome, setNome] = useState('')
    const [cpf, setCpf] = useState('')
    const [telefone, setTelefone] = useState('')
    const [email, setEmail] = useState('')

    function cadastrarCliente(evento) {
        evento.preventDefault()

        const novoCliente = {
            nome,
            cpf,
            telefone,
            email
        }
        console.log(novoCliente)
        alert('Cliente cadastrado com sucesso!')
    }

    return (
        <main className="pagina-clientes">
            <h1>Cadastrar novo cliente</h1>
            <form className="formulario-cliente"
                onSubmit={cadastrarCliente}>
                <label htmlFor="nome">Nome</label>
                <input
                    id="nome"
                    type="text"
                    value={nome}
                    onChange={(evento) =>
                        setNome(evento.target.value)}
                    required
                />
                <label htmlFor="cpf">CPF</label>
                <input
                    id="cpf"
                    type="text"
                    value={cpf}
                    onChange={(evento) =>
                        setCpf(evento.target.value)}
                    maxLength="11"
                    required
                />

                <label htmlFor="telefone">Telefone</label>
                <input
                    id="telefone"
                    type="text"
                    value={telefone}
                    onChange={(evento) =>
                        setTelefone(evento.target.value)}
                />
                <label htmlFor="email">E-mail</label>
                <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(evento) =>
                        setEmail(evento.target.value)}
                />
                <button type="submit">Cadastrar cliente</button>
            </form>
            <Link to="/clientes">Voltar para Gerenciamento de
                Clientes</Link>
        </main>
    )
}

export default CadastroCliente
