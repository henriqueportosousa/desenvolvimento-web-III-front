import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { IMaskInput } from "react-imask";

function EditarFuncionarios({ funcionarios, aoAlterar }) {
    const { id } = useParams();
    const navegar = useNavigate();

    const funcionarioEncontrado = funcionarios.find(
        (funcionario) => funcionario.id === Number(id)
    );

    const [nome, setNome] = useState(funcionarioEncontrado?.nome ?? '');
    const [cpf, setCpf] = useState(funcionarioEncontrado?.cpf ?? '');
    const [email, setEmail] = useState(funcionarioEncontrado?.email ?? '');
    const [telefone, setTelefone] = useState(funcionarioEncontrado?.telefone ?? '');
    const [dataNascimento, setDataNascimento] = useState(funcionarioEncontrado?.dataNascimento ?? '');
    const [cargo, setCargo] = useState(funcionarioEncontrado?.cargo ?? '');
    const [salario, setSalario] = useState(
        funcionarioEncontrado?.salario?.toString() ?? ''
    );
    const [departamento, setDepartamento] = useState(funcionarioEncontrado?.departamento ?? '');
    const [cidade, setCidade] = useState(funcionarioEncontrado?.cidade ?? '');
    const [status, setStatus] = useState(funcionarioEncontrado?.status ?? 'Ativo');

    function alterarFuncionario(evento) {
        evento.preventDefault();
        const funcionarioAtualizado = {
            id: Number(id),
            nome,
            cpf,
            email,
            telefone,
            dataNascimento,
            cargo,
            salario,
            departamento,
            cidade,
            status
        };
        aoAlterar(funcionarioAtualizado)
        alert('Funcionario alterado com sucesso!');
        navegar('/funcionarios/listar');
    }


    if (!funcionarioEncontrado) {
        return (
            <main className="pagina">
                <h1>Funcionario não encontrado</h1>
                <Link to="/funcionarios/listar">Voltar para Lista de Funcionarios</Link>
            </main>
        );
    }

    return (
        <main className="pagina">
            <h1>Alterar funcionário</h1>
            <form
                className="formulario"
                onSubmit={alterarFuncionario}
            >

                <label htmlFor="nome">Nome</label>
                <input
                    id="nome"
                    type="text"
                    value={nome}
                    onChange={(evento) =>
                        setNome(evento.target.value)
                    }
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

                <label htmlFor="email">E-mail</label>
                <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(evento) =>
                        setEmail(evento.target.value)
                    }
                    placeholder="funcionario@email.com"
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


                <label htmlFor="dataNascimento">
                    Data de nascimento
                </label>
                <input
                    id="dataNascimento"
                    type="date"
                    value={dataNascimento}
                    onChange={(evento) =>
                        setDataNascimento(evento.target.value)
                    }
                    required
                />

                <label htmlFor="cargo">Cargo</label>
                <input
                    id="cargo"
                    type="text"
                    value={cargo}
                    onChange={(evento) =>
                        setCargo(evento.target.value)
                    }
                    placeholder="Ex: Desenvolvedor Front-end"
                    required
                />

                <label htmlFor="salario">Salário</label>
                <IMaskInput
                    id="salario"
                    mask={Number}
                    scale={2}
                    thousandsSeparator="."
                    radix=","
                    padFractionalZeros={true}
                    normalizeZeros={true}
                    prefix="R$ "
                    value={salario}
                    onAccept={(valor) => setSalario(valor)}
                    placeholder="R$ 0,00"
                    required
                />

                <label htmlFor="departamento">
                    Departamento
                </label>
                <select
                    id="departamento"
                    value={departamento}
                    onChange={(evento) =>
                        setDepartamento(evento.target.value)
                    }
                    required
                >
                    <option value="">
                        Selecione um departamento
                    </option>
                    <option value="Recursos Humanos">
                        Recursos Humanos
                    </option>
                    <option value="Tecnologia">
                        Tecnologia
                    </option>
                    <option value="Financeiro">
                        Financeiro
                    </option>
                    <option value="Administrativo">
                        Administrativo
                    </option>
                    <option value="Comercial">
                        Comercial
                    </option>
                    <option value="Marketing">
                        Marketing
                    </option>
                    <option value="Design">
                        Design
                    </option>
                </select>

                <label htmlFor="cidade">Cidade</label>
                <input
                    id="cidade"
                    type="text"
                    value={cidade}
                    onChange={(evento) =>
                        setCidade(evento.target.value)
                    }
                    placeholder="Ex: São Paulo"
                    required
                />

                <label htmlFor="status">Status</label>
                <select
                    id="status"
                    value={status}
                    onChange={(evento) =>
                        setStatus(evento.target.value)
                    }
                    required
                >
                    <option value="Ativo">Ativo</option>
                    <option value="Férias">Férias</option>
                    <option value="Afastado">Afastado</option>
                </select>

                <button type="submit">
                    Alterar funcionário
                </button>

            </form>
            <Link to="/funcionarios/listar">
                Voltar para a lista de funcionarios
            </Link>
        </main>
    );
}

export default EditarFuncionarios