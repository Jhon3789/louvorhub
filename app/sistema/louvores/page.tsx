"use client";

import { useEffect, useState } from "react";

type Louvor = {
  id: number;
  nome: string;
  artista: string;
  tom: string;
  letra: string;
  cifra: string;
  link: string;
};

export default function LouvoresPage() {

  const [louvores, setLouvores] = useState<Louvor[]>([]);

  const [nome, setNome] = useState("");
  const [artista, setArtista] = useState("");
  const [tom, setTom] = useState("");
  const [letra, setLetra] = useState("");
  const [cifra, setCifra] = useState("");
  const [link, setLink] = useState("");


  useEffect(() => {

    const dados = localStorage.getItem("louvores");

    if (dados) {
      setLouvores(JSON.parse(dados));
    }

  }, []);



  function adicionarLouvor() {

    if (!nome) return;


    const novo: Louvor = {

      id: Date.now(),
      nome,
      artista,
      tom,
      letra,
      cifra,
      link,

    };


    const lista = [...louvores, novo];


    setLouvores(lista);

    localStorage.setItem(
      "louvores",
      JSON.stringify(lista)
    );


    setNome("");
    setArtista("");
    setTom("");
    setLetra("");
    setCifra("");
    setLink("");

  }



  function removerLouvor(id:number){

    const lista = louvores.filter(
      (l)=>l.id !== id
    );


    setLouvores(lista);

    localStorage.setItem(
      "louvores",
      JSON.stringify(lista)
    );

  }



  return (

    <div className="p-6 text-white">


      <h1 className="text-3xl font-bold mb-6">
        🎵 Louvores
      </h1>



      <div className="bg-zinc-900 p-5 rounded-xl space-y-3">


        <input
          className="w-full p-3 bg-zinc-800 rounded"
          placeholder="Nome do louvor"
          value={nome}
          onChange={(e)=>setNome(e.target.value)}
        />


        <input
          className="w-full p-3 bg-zinc-800 rounded"
          placeholder="Artista"
          value={artista}
          onChange={(e)=>setArtista(e.target.value)}
        />


        <input
          className="w-full p-3 bg-zinc-800 rounded"
          placeholder="Tom (ex: G, C, D)"
          value={tom}
          onChange={(e)=>setTom(e.target.value)}
        />


        <textarea
          className="w-full p-3 bg-zinc-800 rounded"
          placeholder="Letra"
          value={letra}
          onChange={(e)=>setLetra(e.target.value)}
        />


        <textarea
          className="w-full p-3 bg-zinc-800 rounded"
          placeholder="Cifra"
          value={cifra}
          onChange={(e)=>setCifra(e.target.value)}
        />


        <input
          className="w-full p-3 bg-zinc-800 rounded"
          placeholder="Link do YouTube"
          value={link}
          onChange={(e)=>setLink(e.target.value)}
        />


        <button
          onClick={adicionarLouvor}
          className="bg-blue-600 px-5 py-3 rounded-lg"
        >
          Adicionar Louvor
        </button>


      </div>




      <div className="mt-6 space-y-4">


        {louvores.map((louvor)=>(


          <div
            key={louvor.id}
            className="bg-zinc-900 p-5 rounded-xl"
          >

            <h2 className="text-2xl font-bold">
              {louvor.nome}
            </h2>


            <p>
              🎤 {louvor.artista}
            </p>

            <p>
              🎸 Tom: {louvor.tom}
            </p>


            <details className="mt-3">

              <summary className="cursor-pointer">
                Ver letra e cifra
              </summary>


              <p className="mt-3 whitespace-pre-line">
                {louvor.letra}
              </p>


              <p className="mt-3 whitespace-pre-line">
                {louvor.cifra}
              </p>


            </details>



            {louvor.link && (

              <a
                href={louvor.link}
                target="_blank"
                className="text-blue-400 block mt-3"
              >
                ▶ Ouvir louvor
              </a>

            )}



            <button
              onClick={()=>removerLouvor(louvor.id)}
              className="text-red-500 mt-4"
            >
              Excluir
            </button>


          </div>


        ))}


      </div>


    </div>

  );

}