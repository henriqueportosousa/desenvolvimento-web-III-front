import { useState } from "react";
import { Link } from "react-router";
import { IMaskInput } from "react-imask";

function CadastroCliente({ clientes, aoCadastrar }) {
    const [nome, setNome] = useState('')
    const [cpf, setCpf] = useState('')
    const [telefone, setTelefone] = useState('')
    const [email, setEmail] = useState('')
    const [erros, setErros] = useState({})
    const [mensagemSucesso, setMensagemSucesso] = useState('')

    function limparErro(campo) {
        setErros((errosAtuais) => ({
            ...errosAtuais,
            [campo]: '',
        }))
    }

    function validarFormulario() {
        const novosErros = {}
        const nomeTratado = nome.trim()
        const emailTratado = email.trim()

        if (nomeTratado.length < 5) {
            novosErros.nome = 'O nome deve possuir no mínimo 5 caracteres.'
        } else if (/\d/.test(nomeTratado)) {
            novosErros.nome = 'O nome não pode conter números.'
        }

        if (!/^\d{11}$/.test(cpf.replace(/\D/g, ''))) {
            novosErros.cpf = 'O CPF deve possuir exatamente 11 números.'
        }

        const cpfDuplicado = clientes.some(
            (cliente) => cliente.cpf === cpf
        )
        if (cpfDuplicado) {
            novosErros.cpf =
                'Já existe um cliente cadastrado com este CPF.'
        }

        if (!/^\(\d{2}\)\s\d{5}-\d{4}$/.test(telefone)) {
            novosErros.telefone = 'Informe o telefone no formato (DDD) 9XXXX-XXXX.'
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailTratado)) {
            novosErros.email = 'Informe um endereço de e-mail válido.'
        }

        const emailDuplicado = clientes.some(
            (cliente) =>
                cliente.email.toLowerCase() === emailTratado.toLowerCase()
        )
        if (emailDuplicado) {
            novosErros.email =
                'Já existe um cliente cadastrado com este e-mail.'
        }

        setErros(novosErros)
        return Object.keys(novosErros).length === 0
    }

    function cadastrarCliente(evento) {
        evento.preventDefault()

        setMensagemSucesso('')

        if (!validarFormulario()) {
            return
        }

        const novoCliente = {
            nome: nome.trim(),
            cpf,
            telefone,
            email: email.trim().toLowerCase()
        }

        aoCadastrar(novoCliente)

        setMensagemSucesso('Cliente cadastrado com sucesso!')

        setErros({})
        setNome('')
        setCpf('')
        setTelefone('')
        setEmail('')
    }

    return (
        <main className="pagina">
            <h1>Cadastrar novo cliente</h1>
            {mensagemSucesso && (
                <p className="mensagem-sucesso">
                    {mensagemSucesso}
                </p>
            )}
            <form
                className="formulario"
                onSubmit={cadastrarCliente}
                noValidate
            >
                <label htmlFor="nome">Nome</label>
                <input
                    id="nome"
                    type="text"
                    value={nome}
                    onChange={(evento) => {
                        const valorSemNumeros = evento.target.value.replace(/[0-9]/g, '');
                        setNome(valorSemNumeros)
                        limparErro('nome')
                    }}
                    className={erros.nome ? 'campo-invalido' : ''}
                    placeholder="Digite o nome completo"
                    required
                />

                {erros.nome && (
                    <span className="mensagem-erro">
                        {erros.nome}
                    </span>
                )}

                <label htmlFor="cpf">CPF</label>
                <IMaskInput
                    id="cpf"
                    mask="000.000.000-00"
                    value={cpf}
                    onAccept={(valor) => {
                        setCpf(valor)
                        limparErro('cpf')
                    }}
                    placeholder="000.000.000-00"
                    className={erros.cpf ? 'campo-invalido' : ''}
                    maxLength="14"
                    required
                />

                {erros.cpf && (
                    <span className="mensagem-erro">
                        {erros.cpf}
                    </span>
                )}

                <label htmlFor="telefone">Telefone</label>
                <IMaskInput
                    id="telefone"
                    mask="(00) 00000-0000"
                    value={telefone}
                    onAccept={(valor) => {
                        setTelefone(valor)
                        limparErro('telefone')
                    }}
                    className={erros.telefone ? 'campo-invalido' : ''}
                    placeholder="(11) 99999-9999"
                    required
                />

                {erros.telefone && (
                    <span className="mensagem-erro">
                        {erros.telefone}
                    </span>
                )}

                <label htmlFor="email">E-mail</label>
                <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(evento) => {
                        setEmail(evento.target.value)
                        limparErro('email')
                    }}
                    className={erros.email ? 'campo-invalido' : ''}
                    placeholder="funcionario@email.com"
                    required
                />

                {erros.email && (
                    <span className="mensagem-erro">
                        {erros.email}
                    </span>
                )}

                <button type="submit">Cadastrar cliente</button>
            </form>
            <Link to="/clientes">Voltar para Gerenciamento de Clientes</Link>
        </main>
    )
}

export default CadastroCliente