"use client";

import { useEffect, useState } from "react";

type Aviso = {
  id: number;
  titulo: string;
  mensagem: string;
};

export default function AvisosPage() {
  const [avisos, setAvisos] = useState<Aviso[]>([]);
  const [titulo, setTitulo] = useState("");
  const [mensagem, setMensagem] = useState("");

  useEffect(() => {
    const dados = localStorage.getItem("avisos");

    if (dados) {
      setAvisos(JSON.parse(dados));
    }
  }, []);


  function adicionarAviso() {
    if (!titulo || !mensagem) return;

    const novoAviso: Aviso = {
      id: Date.now(),
      titulo,
      mensagem,
    };

    const lista = [...avisos, novoAviso];

    setAvisos(lista);
    localStorage.setItem(
      "avisos",
      JSON.stringify(lista)
    );

    setTitulo("");
    setMensagem("");
  }


  function removerAviso(id: number) {
    const lista = avisos.filter(
      (aviso) => aviso.id !== id
    );

    setAvisos(lista);
    localStorage.setItem(
      "avisos",
      JSON.stringify(lista)
    );
  }


  return (
    <div className="p-6 text-white">

      <h1 className="text-3xl font-bold mb-6">
        📢 Avisos
      </h1>


      <div className="bg-zinc-900 p-5 rounded-xl mb-6">

        <input
          className="w-full p-3 mb-3 rounded bg-zinc-800"
          placeholder="Título do aviso"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
        />


        <textarea
          className="w-full p-3 mb-3 rounded bg-zinc-800"
          placeholder="Mensagem"
          value={mensagem}
          onChange={(e) => setMensagem(e.target.value)}
        />


        <button
          onClick={adicionarAviso}
          className="bg-blue-600 px-5 py-3 rounded-lg"
        >
          Publicar Aviso
        </button>

      </div>


      <div className="space-y-4">

        {avisos.map((aviso) => (

          <div
            key={aviso.id}
            className="bg-zinc-900 p-4 rounded-xl"
          >

            <h2 className="text-xl font-bold">
              {aviso.titulo}
            </h2>

            <p className="mt-2">
              {aviso.mensagem}
            </p>


            <button
              onClick={() => removerAviso(aviso.id)}
              className="text-red-500 mt-3"
            >
              Excluir
            </button>

          </div>

        ))}

      </div>

    </div>
  );
}