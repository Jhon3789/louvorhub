"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

type Louvor = {
  id: number;
  nome: string;
  artista: string;
  tom: string;
  letra: string;
  cifra: string;
  link: string;
};


export default function LouvorPage() {

  const params = useParams();

  const [louvor, setLouvor] = useState<Louvor | null>(null);


  useEffect(() => {

    const dados = localStorage.getItem("louvores");


    if(dados){

      const lista:Louvor[] = JSON.parse(dados);


      const encontrado = lista.find(
        (l)=>l.id === Number(params.id)
      );


      if(encontrado){
        setLouvor(encontrado);
      }

    }


  },[params.id]);



  if(!louvor){

    return (
      <div className="p-6 text-white">
        Louvor não encontrado.
      </div>
    );

  }



  return (

    <div className="p-6 text-white">


      <h1 className="text-3xl font-bold">
        🎵 {louvor.nome}
      </h1>


      <p className="mt-2">
        🎤 {louvor.artista}
      </p>


      <p>
        🎸 Tom: {louvor.tom}
      </p>



      {louvor.link && (

        <a
          href={louvor.link}
          target="_blank"
          className="text-blue-400 block mt-4"
        >
          ▶ Ouvir louvor
        </a>

      )}




      <div className="bg-zinc-900 p-5 rounded-xl mt-6">

        <h2 className="text-2xl font-bold mb-3">
          📄 Letra
        </h2>

        <p className="whitespace-pre-line">
          {louvor.letra}
        </p>

      </div>




      <div className="bg-zinc-900 p-5 rounded-xl mt-6">

        <h2 className="text-2xl font-bold mb-3">
          🎸 Cifra
        </h2>

        <p className="whitespace-pre-line">
          {louvor.cifra}
        </p>

      </div>



    </div>

  );

}