import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router";

import { converterSalarioParaNumero } from "../../utils/formatadores";
import FormularioFuncionario from "../../components/FormularioFuncionario";

function EditarFuncionarios({ funcionarios, aoAlterar }) {
    const { id } = useParams();
    const navegar = useNavigate();
    const funcionarioEncontrado = funcionarios.find((funcionario) => funcionario.id === Number(id));
    const [funcionario, setFuncionario] = useState(() => ({
        ...funcionarioEncontrado,
        salario: funcionarioEncontrado?.salario?.toString() ?? "",
    }));

    function alterarFuncionario(evento) {
        evento.preventDefault();
        aoAlterar({ ...funcionario, id: Number(id), salario: converterSalarioParaNumero(funcionario.salario) });
        alert("Funcionário alterado com sucesso!");
        navegar("/funcionarios/listar");
    }

    if (!funcionarioEncontrado) {
        return <main className="pagina"><h1>Funcionário não encontrado</h1><Link to="/funcionarios/listar">Voltar para a lista de funcionários</Link></main>;
    }

    return (
        <main className="pagina">
            <h1>Alterar funcionário</h1>
            <FormularioFuncionario valores={funcionario} aoAlterarCampo={setFuncionario} aoEnviar={alterarFuncionario} textoBotao="Alterar funcionário" />
            <Link to="/funcionarios/listar">Voltar para a lista de funcionários</Link>
        </main>
    );
}

export default EditarFuncionarios;
