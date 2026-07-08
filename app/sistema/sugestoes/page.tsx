"use client";

import { useEffect, useState } from "react";


type Sugestao = {
  id:number;
  nome:string;
  artista:string;
  link:string;
  votos:number;
  aprovado:boolean;
};



export default function SugestoesPage(){


  const [sugestoes,setSugestoes] = useState<Sugestao[]>([]);

  const [nome,setNome] = useState("");
  const [artista,setArtista] = useState("");
  const [link,setLink] = useState("");



  useEffect(()=>{

    const dados = localStorage.getItem("sugestoes");

    if(dados){
      setSugestoes(JSON.parse(dados));
    }

  },[]);



  function salvar(lista:Sugestao[]){

    setSugestoes(lista);

    localStorage.setItem(
      "sugestoes",
      JSON.stringify(lista)
    );

  }




  function adicionar(){


    if(!nome) return;


    const nova:Sugestao = {

      id:Date.now(),
      nome,
      artista,
      link,
      votos:0,
      aprovado:false

    };


    salvar([
      ...sugestoes,
      nova
    ]);


    setNome("");
    setArtista("");
    setLink("");

  }





  function votar(id:number){


    const lista = sugestoes.map((s)=>{


      if(s.id === id){

        return {

          ...s,
          votos:s.votos+1

        };

      }


      return s;

    });


    salvar(lista);


  }




  function aprovar(id:number){


    const sugestao =
      sugestoes.find(
        (s)=>s.id===id
      );


    if(!sugestao) return;



    const louvoresSalvos =
      localStorage.getItem("louvores");


    const louvores =
      louvoresSalvos
      ? JSON.parse(louvoresSalvos)
      : [];



    const novoLouvor = {

      id:Date.now(),

      nome:sugestao.nome,

      artista:sugestao.artista,

      tom:"",

      letra:"",

      cifra:"",

      link:sugestao.link

    };



    localStorage.setItem(

      "louvores",

      JSON.stringify([
        ...louvores,
        novoLouvor
      ])

    );




    const lista = sugestoes.map((s)=>

      s.id===id
      ? {...s, aprovado:true}
      : s

    );


    salvar(lista);


  }




  return(

    <div className="p-6 text-white">


      <h1 className="text-3xl font-bold mb-6">
        💡 Sugestões de Louvores
      </h1>




      <div className="bg-zinc-900 p-5 rounded-xl mb-6">


        <input
          className="w-full p-3 mb-3 bg-zinc-800 rounded"
          placeholder="Nome do louvor"
          value={nome}
          onChange={(e)=>setNome(e.target.value)}
        />


        <input
          className="w-full p-3 mb-3 bg-zinc-800 rounded"
          placeholder="Artista"
          value={artista}
          onChange={(e)=>setArtista(e.target.value)}
        />


        <input
          className="w-full p-3 mb-3 bg-zinc-800 rounded"
          placeholder="Link"
          value={link}
          onChange={(e)=>setLink(e.target.value)}
        />


        <button
          onClick={adicionar}
          className="bg-blue-600 px-5 py-3 rounded"
        >
          Enviar sugestão
        </button>


      </div>





      {sugestoes.map((s)=>(


        <div
          key={s.id}
          className="bg-zinc-900 p-5 rounded-xl mb-4"
        >


          <h2 className="text-xl font-bold">
            🎵 {s.nome}
          </h2>


          <p>
            🎤 {s.artista}
          </p>



          <p className="mt-2">
            👍 {s.votos} votos
          </p>



          <button
            onClick={()=>votar(s.id)}
            className="bg-green-600 px-4 py-2 rounded mt-3 mr-3"
          >
            👍 Votar
          </button>



          {!s.aprovado && (

            <button
              onClick={()=>aprovar(s.id)}
              className="bg-blue-600 px-4 py-2 rounded"
            >
              ✅ Aprovar
            </button>

          )}



          {s.aprovado && (

            <p className="text-green-400 mt-3">
              ✅ Enviado para Louvores
            </p>

          )}



        </div>


      ))}



    </div>

  );

}