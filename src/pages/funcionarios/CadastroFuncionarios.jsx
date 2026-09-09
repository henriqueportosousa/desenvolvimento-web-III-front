import { useState } from "react";
import { Link } from "react-router";
import { IMaskInput } from "react-imask";

function CadastroFuncionario() {
    const [nome, setNome] = useState("");
    const [cpf, setCpf] = useState("");
    const [email, setEmail] = useState("");
    const [telefone, setTelefone] = useState("");
    const [dataNascimento, setDataNascimento] = useState("");
    const [cargo, setCargo] = useState("");
    const [salario, setSalario] = useState("");
    const [departamento, setDepartamento] = useState("");
    const [cidade, setCidade] = useState("");
    const [status, setStatus] = useState("Ativo");

    function cadastrarFuncionario(evento) {
        evento.preventDefault();

        const novoFuncionario = {
            id: Date.now(),
            nome,
            cpf,
            email,
            telefone,
            dataNascimento,
            cargo,
            salario: Number(salario),
            departamento,
            cidade,
            status
        };

        console.log(novoFuncionario);

        alert("Funcionário cadastrado com sucesso!");

        // // Limpa o formulário
        // setNome("");
        // setCpf("");
        // setEmail("");
        // setTelefone("");
        // setDataNascimento("");
        // setCargo("");
        // setSalario("");
        // setDepartamento("");
        // setCidade("");
        // setStatus("Ativo");
    }

    return (
        <main className="pagina">

            <h1>Cadastrar novo funcionário</h1>

            <form
                className="formulario"
                onSubmit={cadastrarFuncionario}
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
                    Cadastrar funcionário
                </button>

            </form>

            <Link to="/funcionarios">
                Voltar para Gerenciamento de Funcionários
            </Link>

        </main>
    );
}

export default CadastroFuncionario;
