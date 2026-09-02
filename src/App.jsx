import "./App.css";

import { useState } from "react";
import { Routes, Route } from 'react-router'

import Cabecalho from "./components/Cabecalho";
import CardModulo from "./components/CardModulo";

import Clientes from './pages/Clientes/Clientes';
import ListaClientes from "./pages/Clientes/ListaClientes";
import CadastroCliente from "./pages/Clientes/CadastroClientes";

import Funcionarios from "./pages/Funcionarios/Funcionaris";
import ListaFuncionarios from "./pages/Funcionarios/ListaFuncionarios";
import CadastroFuncionario from "./pages/Funcionarios/CadastroFuncionarios";


function App() {
  const [mostrarModulos, setMostrarModulos] = useState(true);

  // const [titulo, setTitulo] = useState('');
  // const [descricao, setDescricao] = useState('');

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
        element={<ListaClientes />}
      />

      <Route
        path="/clientes/cadastrar"
        element={<CadastroCliente />}
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
        element={<CadastroFuncionario />}
      />


    </Routes>
  );
}
export default App;
