import "./App.css";

import { useState } from "react";;
import { Routes, Route } from 'react-router';

import Cabecalho from "./components/Cabecalho";
import CardModulo from "./components/CardModulo";

import Clientes from './pages/clientes/Clientes';
import ListaClientes from "./pages/clientes/ListaClientes";
import CadastroClientes from "./pages/clientes/CadastroClientes";
import EditarClientes from "./pages/clientes/EditarClientes";
import clientesInicias from './data/clientes';

import Funcionarios from "./pages/funcionarios/Funcionaris";
import ListaFuncionarios from "./pages/funcionarios/ListaFuncionarios";
import CadastroFuncionarios from "./pages/funcionarios/CadastroFuncionarios";


function App() {
  const [mostrarModulos, setMostrarModulos] = useState(true);
  const [clientes, setClientes] = useState(clientesInicias);

  // const [titulo, setTitulo] = useState('');
  // const [descricao, setDescricao] = useState('');

  function adicionarCliente(novoCliente) {
    const clienteComId = {
      id: Date.now(),
      ...novoCliente,
    }
    setClientes((listaAtual) => [
      ...listaAtual,
      clienteComId,
    ])
  }

  function exluirCliente(id) {
    setClientes((listaAtual) =>
      listaAtual.filter((cliente) => cliente.id !== id)
    );
  }

  function alterarCliente(clienteAtualizado) {
    setClientes((listaAtual) =>
      listaAtual.map((cliente) =>
        cliente.id === clienteAtualizado.id
          ? clienteAtualizado
          : cliente
      )
    );
  }

  const [modulos, setModulos] = useState([
    {
      id: 1,
      titulo: "Gerenciamento de Produtos",
      descricao: "Cadastre e consulte os produtos disponíveis.",
    },
    {
      id: 2,
      titulo: "Gerenciamento de Clientes",
      descricao: "Cadastre e consulte os clientes da empresa.",
      rota: '/clientes',
    },
    {
      id: 3,
      titulo: "Gerenciamento de Funcionários",
      descricao: "Cadastre e consulte os funcionários da empresa.",
      rota: '/funcionarios'
    },
    {
      id: 4,
      titulo: "Gerenciamento de Vendas",
      descricao: "Registre e consulte as vendas realizadas.",
    },
  ]);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <div className="aplicacao">
            <Cabecalho />
            <main className="conteudo-principal">

              <p className="introducao">
                Aplicação desenvolvida nas disciplinas de Desenvolvimento Web III e
                Tópicos de Programação II.
              </p>

              <button
                type="button"
                className="botao-alternar"
                onClick={() => setMostrarModulos(!mostrarModulos)}
              >
                {mostrarModulos ? "Ocultar módulos" : "Exibir módulos"}
              </button>


              {mostrarModulos && (
                <section className="modulos">
                  {modulos.map((modulo) => (
                    <CardModulo
                      key={modulo.id}
                      titulo={modulo.titulo}
                      descricao={modulo.descricao}
                      rota={modulo.rota}
                    />
                  ))}
                </section>
              )}
            </main>
          </div>
        }
      />

      {/* Clientes */}
      <Route
        path="/clientes"
        element={<Clientes />}
      />

      <Route
        path="/clientes/listar"
        element={
          <ListaClientes
            clientes={clientes}
            aoExcluir={exluirCliente}
          />
        }
      />

      <Route
        path="/clientes/cadastrar"
        element={<CadastroClientes aoCadastrar={adicionarCliente} />}
      />

      <Route
        path="/clientes/editar/:id"
        element={
          <EditarClientes
            clientes={clientes}
            aoAlterar={alterarCliente}
          />
        }
      />

      {/* Funcionarios */}

      <Route
        path="/funcionarios"
        element={<Funcionarios />}
      />

      <Route
        path="/funcionarios/listar"
        element={<ListaFuncionarios />}
      />

      <Route
        path="/funcionarios/cadastrar"
        element={<CadastroFuncionarios />}
      />


    </Routes>
  );
}
export default App;
