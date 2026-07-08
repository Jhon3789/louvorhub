"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";


export default function LoginPage(){

  const router = useRouter();

  const [nome,setNome] = useState("");



  function entrar(){

    if(!nome) return;


    localStorage.setItem(
      "usuario",
      nome
    );


    router.push("/sistema");

  }



  return (

    <div className="min-h-screen bg-gradient-to-br from-blue-950 to-zinc-950 flex items-center justify-center text-white">


      <div className="bg-zinc-900 p-8 rounded-2xl w-96">


        <div className="text-center">


          <div className="text-5xl">
            🎵
          </div>


          <h1 className="text-3xl font-bold mt-4">
            LouvorHub
          </h1>


          <p className="text-zinc-400">
            Igreja Quadrangular
          </p>


        </div>




        <input

          className="w-full mt-6 p-3 bg-zinc-800 rounded-xl"

          placeholder="Seu nome"

          value={nome}

          onChange={(e)=>setNome(e.target.value)}

        />



        <button

          onClick={entrar}

          className="w-full mt-4 bg-blue-600 p-3 rounded-xl"

        >

          Entrar

        </button>



      </div>


    </div>

  );

}