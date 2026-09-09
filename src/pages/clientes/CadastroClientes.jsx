import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { IMaskInput } from "react-imask";

function CadastroCliente({ aoCadastrar }) {
    const [nome, setNome] = useState('')
    const [cpf, setCpf] = useState('')
    const [telefone, setTelefone] = useState('')
    const [email, setEmail] = useState('')
    const navegar = useNavigate();

    function cadastrarCliente(evento) {
        evento.preventDefault()

        const novoCliente = {
            nome,
            cpf,
            telefone,
            email
        }

        aoCadastrar(novoCliente)

        alert('Cliente cadastrado com sucesso!')

        setNome('')
        setCpf('')
        setTelefone('')
        setEmail('')

        navegar('/clientes/listar');

    }

    return (
        <main className="pagina">
            <h1>Cadastrar novo cliente</h1>
            <form className="formulario"
                onSubmit={cadastrarCliente}>

                <label htmlFor="nome">Nome</label>
                <input
                    id="nome"
                    type="text"
                    value={nome}
                    onChange={(evento) =>
                        setNome(evento.target.value)}
                    placeholder="Digite o nome completo"
                    required
                />

                <label htmlFor="CPF">CPF</label>
                <IMaskInput
                    id="cpf"
                    mask="000.000.000-00"
                    value={cpf}
                    onAccept={(valor) => setCpf(valor)}
                    placeholder="000.000.000-00"
                    required
                />

                <label htmlFor="telefone">Telefone</label>
                <IMaskInput
                    id="telefone"
                    mask="(00) 00000-0000"
                    value={telefone}
                    onAccept={(valor) => setTelefone(valor)}
                    placeholder="(11) 99999-9999"
                    required
                />

                <label htmlFor="email">E-mail</label>
                <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(evento) =>
                        setEmail(evento.target.value)}
                    placeholder="funcionario@email.com"
                    required
                />

                <button type="submit">Cadastrar cliente</button>
            </form>
            <Link to="/clientes">Voltar para Gerenciamento de
                Clientes</Link>
        </main>
    )
}

export default CadastroCliente
