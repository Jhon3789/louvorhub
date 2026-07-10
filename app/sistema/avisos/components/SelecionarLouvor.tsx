"use client";

import { useEffect, useState } from "react";


type Louvor = {
  id:number;
  nome:string;
  link:string;
};


type Props = {

  adicionar:(louvor:Louvor)=>void;

};



export default function SelecionarLouvor({
  adicionar
}:Props){


  const [louvores,setLouvores] = useState<Louvor[]>([]);



  useEffect(()=>{


    const dados = localStorage.getItem("louvores");


    if(dados){

      setLouvores(JSON.parse(dados));

    }


  },[]);





  return (

    <select

      className="mt-3 w-full rounded bg-zinc-700 p-3"

      onChange={(e)=>{


        const escolhido = louvores.find(

          (l)=>l.id === Number(e.target.value)

        );


        if(escolhido){

          adicionar(escolhido);

        }


      }}

    >


      <option>

        Escolher louvor

      </option>



      {louvores.map((l)=>(


        <option

          key={l.id}

          value={l.id}

        >

          {l.nome}

        </option>


      ))}



    </select>

  );

}