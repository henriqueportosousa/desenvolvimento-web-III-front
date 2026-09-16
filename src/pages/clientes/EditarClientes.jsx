import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { IMaskInput } from "react-imask";

function EditarClientes({ clientes, aoAlterar }) {
    const { id } = useParams();
    const navegar = useNavigate();

    // Converte ambos para Number para garantir que encontre o cliente corretamente
    const clienteEncontrado = clientes.find(
        (cliente) => Number(cliente.id) === Number(id)
    );

    const [nome, setNome] = useState(clienteEncontrado?.nome ?? '');
    const [cpf, setCpf] = useState(clienteEncontrado?.cpf ?? '');
    const [email, setEmail] = useState(clienteEncontrado?.email ?? '');
    const [telefone, setTelefone] = useState(clienteEncontrado?.telefone ?? '');
    const [erros, setErros] = useState({});
    const [mensagemSucesso, setMensagemSucesso] = useState('')

    function limparErro(campo) {
        setErros((errosAtuais) => ({
            ...errosAtuais,
            [campo]: '',
        }));
    }

    function validarFormulario() {
        const novosErros = {};
        const nomeTratado = nome.trim();
        const emailTratado = email.trim();
        const cpfApenasDigitos = cpf.replace(/\D/g, '');

        if (nomeTratado.length < 5) {
            novosErros.nome = 'O nome deve possuir no mínimo 5 caracteres.';
        } else if (/\d/.test(nomeTratado)) {
            novosErros.nome = 'O nome não pode conter números.';
        }

        if (!/^\d{11}$/.test(cpfApenasDigitos)) {
            novosErros.cpf = 'O CPF deve possuir exatamente 11 números.';
        }

        const cpfDuplicado = clientes.some(
            (cliente) =>
                cliente.cpf.replace(/\D/g, '') === cpfApenasDigitos &&
                Number(cliente.id) !== Number(id)
        );
        if (cpfDuplicado) {
            novosErros.cpf = 'Já existe outro cliente cadastrado com este CPF.';
        }

        if (!/^\(\d{2}\)\s\d{5}-\d{4}$/.test(telefone)) {
            novosErros.telefone = 'Informe o telefone no formato (DDD) 9XXXX-XXXX.';
        }

        const telefoneTratado = telefone.replace(/\D/g, '');

        const telefoneDuplicado = clientes.some(
            (cliente) =>
                cliente.telefone.replace(/\D/g, '') === telefoneTratado &&
                Number(cliente.id) !== Number(id) // (No caso da edição)
        );

        if (telefoneDuplicado) {
            novosErros.telefone = 'Já existe um cliente cadastrado com este telefone.';
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailTratado)) {
            novosErros.email = 'Informe um endereço de e-mail válido.';
        }

        const emailDuplicado = clientes.some(
            (cliente) =>
                cliente.email.toLowerCase() === emailTratado.toLowerCase() &&
                Number(cliente.id) !== Number(id)
        );
        if (emailDuplicado) {
            novosErros.email = 'Já existe outro cliente cadastrado com este e-mail.';
        }

        setErros(novosErros);
        return Object.keys(novosErros).length === 0;
    }

    function alterarCliente(evento) {
        evento.preventDefault();

        if (!validarFormulario()) {
            return;
        }

        const clienteAtualizado = {
            id: Number(id),
            nome: nome.trim(),
            cpf,
            email: email.trim().toLowerCase(),
            telefone
        };

        aoAlterar(clienteAtualizado);
        setMensagemSucesso('Cliente alterado com sucesso!')
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
            {mensagemSucesso && (
                <p className="mensagem-sucesso">
                    {mensagemSucesso}
                </p>
            )}
            <form
                className="formulario"
                onSubmit={alterarCliente}
                noValidate
            >
                <label htmlFor="nome">Nome</label>
                <input
                    type="text"
                    id="nome"
                    value={nome}
                    onChange={(evento) => {
                        const valorSemNumeros = evento.target.value.replace(/[0-9]/g, '');
                        setNome(valorSemNumeros);
                        limparErro('nome');
                    }}
                    className={erros.nome ? 'campo-invalido' : ''}
                    placeholder="Digite o nome completo"
                    required
                />
                {erros.nome && (
                    <span className="mensagem-erro">{erros.nome}</span>
                )}

                <label htmlFor="cpf">CPF</label>
                <IMaskInput
                    id="cpf"
                    mask="000.000.000-00"
                    value={cpf}
                    onAccept={(valor) => {
                        setCpf(valor);
                        limparErro('cpf');
                    }}
                    placeholder="000.000.000-00"
                    className={erros.cpf ? 'campo-invalido' : ''}
                    maxLength="14"
                    required
                />
                {erros.cpf && (
                    <span className="mensagem-erro">{erros.cpf}</span>
                )}

                <label htmlFor="telefone">Telefone</label>
                <IMaskInput
                    mask="(00) 00000-0000"
                    id="telefone"
                    value={telefone}
                    onAccept={(valor) => {
                        setTelefone(valor);
                        limparErro('telefone');
                    }}
                    className={erros.telefone ? 'campo-invalido' : ''}
                    placeholder="(00) 00000-0000"
                    required
                />
                {erros.telefone && (
                    <span className="mensagem-erro">{erros.telefone}</span>
                )}

                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(evento) => {
                        setEmail(evento.target.value);
                        limparErro('email');
                    }}
                    className={erros.email ? 'campo-invalido' : ''}
                    placeholder="funcionario@email.com"
                    required
                />
                {erros.email && (
                    <span className="mensagem-erro">{erros.email}</span>
                )}

                <button type="submit">Alterar Cliente</button>
            </form>
            <Link to="/clientes/listar">
                Voltar para a lista de clientes
            </Link>
        </main>
    );
}

export default EditarClientes;