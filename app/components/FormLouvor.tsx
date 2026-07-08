"use client";

import { useEffect, useState } from "react";


export default function FormLouvor({
  adicionarLouvor,
  louvorEditar,
  atualizarLouvor,
}: {
  adicionarLouvor: (louvor:any)=>void;
  louvorEditar?: any;
  atualizarLouvor?: (louvor:any)=>void;
}) {


  const [nome, setNome] = useState("");
  const [artista, setArtista] = useState("");
  const [tom, setTom] = useState("");
  const [link, setLink] = useState("");
  const [letra, setLetra] = useState("");
  const [cifra, setCifra] = useState("");





  useEffect(()=>{


    if(louvorEditar){

      setNome(louvorEditar.nome || "");
      setArtista(louvorEditar.artista || "");
      setTom(louvorEditar.tom || "");
      setLink(louvorEditar.link || "");
      setLetra(louvorEditar.letra || "");
      setCifra(louvorEditar.cifra || "");

    }


  },[louvorEditar]);







  function salvar(){


    const louvor = {

      nome,
      artista,
      tom,
      link,
      letra,
      cifra

    };




    if(louvorEditar && atualizarLouvor){

      atualizarLouvor(louvor);

    }else{

      adicionarLouvor(louvor);

    }





    setNome("");
    setArtista("");
    setTom("");
    setLink("");
    setLetra("");
    setCifra("");

  }





  return (

    <div className="rounded-xl bg-white p-6 shadow">


      <h2 className="text-xl font-bold">

        {louvorEditar ? "✏️ Editar Louvor" : "🎵 Novo Louvor"}

      </h2>





      <input
        className="mt-4 w-full rounded-lg border p-3"
        placeholder="Nome do louvor"
        value={nome}
        onChange={(e)=>setNome(e.target.value)}
      />



      <input
        className="mt-4 w-full rounded-lg border p-3"
        placeholder="Artista ou Ministério"
        value={artista}
        onChange={(e)=>setArtista(e.target.value)}
      />



      <input
        className="mt-4 w-full rounded-lg border p-3"
        placeholder="Tom"
        value={tom}
        onChange={(e)=>setTom(e.target.value)}
      />



      <input
        className="mt-4 w-full rounded-lg border p-3"
        placeholder="Link YouTube"
        value={link}
        onChange={(e)=>setLink(e.target.value)}
      />



      <textarea
        className="mt-4 w-full rounded-lg border p-3"
        placeholder="Letra"
        rows={6}
        value={letra}
        onChange={(e)=>setLetra(e.target.value)}
      />



      <textarea
        className="mt-4 w-full rounded-lg border p-3"
        placeholder="Cifra"
        rows={6}
        value={cifra}
        onChange={(e)=>setCifra(e.target.value)}
      />





      <button

        onClick={salvar}

        className="mt-4 rounded-lg bg-zinc-900 px-5 py-3 text-white"

      >

        {louvorEditar ? "Salvar alteração" : "Cadastrar Louvor"}

      </button>


    </div>

  );

}