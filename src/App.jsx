import "./App.css";

import { useState } from "react";

import Cabecalho from "./components/Cabecalho";
import CardModulo from "./components/CardModulo";

function App() {
  const [mostrarModulos, setMostrarModulos] = useState(true);

  // const [titulo, setTitulo] = useState('');
  // const [descricao, setDescricao] = useState('');

  const [modulos] = useState([
    {
      id: 1,
      titulo: "Gerenciamento de Produtos",
      descricao: "Cadastre e consulte os produtos disponíveis.",
    },
    {
      id: 2,
      titulo: "Gerenciamento de Clientes",
      descricao: "Cadastre e consulte os clientes da empresa.",
    },
    {
      id: 3,
      titulo: "Gerenciamento de Funcionários",
      descricao: "Cadastre e consulte os funcionários da empresa.",
    },
    {
      id: 4,
      titulo: "Gerenciamento de Vendas",
      descricao: "Registre e consulte as vendas realizadas.",
    },
  ]);

  return (
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
              />
            ))}
          </section>
        )}
      </main>
    </div>
  );
}
export default App;
