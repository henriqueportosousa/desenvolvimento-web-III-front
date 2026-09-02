import { Link } from "react-router";

function ListaFuncionarios() {
    const funcionarios = [
    {
      id: 1,
      nome: 'Ana Souza',
      cpf: '123.456.789-01',
      email: 'ana@email.com',
      telefone: '(11) 99999-1111',
      dataNascimento: '15/03/1992',
      cargo: 'Analista de RH',
      salario: 4500,
      departamento: 'Recursos Humanos',
      cidade: 'São Paulo',
      status: 'Ativo',
    },
    {
      id: 2,
      nome: 'Bruno Lima',
      cpf: '234.567.890-12',
      email: 'bruno@email.com',
      telefone: '(21) 98888-2222',
      dataNascimento: '22/07/1988',
      cargo: 'Desenvolvedor Front-end',
      salario: 6500,
      departamento: 'Tecnologia',
      cidade: 'Rio de Janeiro',
      status: 'Ativo',
    },
    {
      id: 3,
      nome: 'Carla Mendes',
      cpf: '345.678.901-23',
      email: 'carla@email.com',
      telefone: '(31) 97777-3333',
      dataNascimento: '10/11/1995',
      cargo: 'Assistente Administrativo',
      salario: 3200,
      departamento: 'Administrativo',
      cidade: 'Belo Horizonte',
      status: 'Férias',
    },
    {
      id: 4,
      nome: 'Daniel Oliveira',
      cpf: '456.789.012-34',
      email: 'daniel@email.com',
      telefone: '(41) 96666-4444',
      dataNascimento: '05/01/1985',
      cargo: 'Gerente Comercial',
      salario: 8500,
      departamento: 'Comercial',
      cidade: 'Curitiba',
      status: 'Ativo',
    },
    {
      id: 5,
      nome: 'Eduarda Santos',
      cpf: '567.890.123-45',
      email: 'eduarda@email.com',
      telefone: '(51) 95555-5555',
      dataNascimento: '18/09/1990',
      cargo: 'Analista Financeiro',
      salario: 5200,
      departamento: 'Financeiro',
      cidade: 'Porto Alegre',
      status: 'Ativo',
    },
  ];
   return (
        <main className="pagina">
            <h1>Lista de Funcionarios</h1>
            <ul className="lista">
                {funcionarios.map((funcionario) => (
                    <li key={funcionario.id}>
                        <strong>{funcionario.nome}</strong>
                        <span>CPF: {funcionario.cpf}</span>
                        <span>E-mail: {funcionario.email}</span>
                        <span>Telefone: {funcionario.telefone}</span>
                        <span>Data de Nascimento: {funcionario.dataNascimento}</span>
                        <span>Cargo: {funcionario.cargo}</span>
                        <span>Salario: {funcionario.salario}</span>
                        <span>Departamento: {funcionario.departamento}</span>
                        <span>Cidade: {funcionario.cidade}</span>
                        <span>Status: {funcionario.status}</span>
                    </li>
                ))}
            </ul>
            <Link to="/funcionarios">Voltar para Gerenciamento de
                Funcionarios</Link>
        </main>
    )
}

export default ListaFuncionarios