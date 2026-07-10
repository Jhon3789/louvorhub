"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";


export default function LoginPage() {


  const router = useRouter();


  const [email,setEmail] = useState("");
  const [senha,setSenha] = useState("");
  const [erro,setErro] = useState("");





  async function entrar(){


    setErro("");



    const { data, error } = await supabase.auth.signInWithPassword({

      email,
      password: senha

    });





    if(error){

      setErro(error.message);
      return;

    }




    if(data.user){

      router.push("/sistema");

    }



  }







  return (

    <div className="min-h-screen bg-black text-white flex items-center justify-center">



      <div className="bg-zinc-900 p-8 rounded-xl w-full max-w-md">



        <h1 className="text-3xl font-bold text-center mb-6">

          🙏 LouvorHub

        </h1>





        <h2 className="text-xl font-bold mb-4">

          🔐 Login

        </h2>







        <input

          className="w-full p-3 bg-zinc-800 rounded mb-3"

          placeholder="Email"

          type="email"

          value={email}

          onChange={(e)=>setEmail(e.target.value)}

        />







        <input

          className="w-full p-3 bg-zinc-800 rounded mb-3"

          placeholder="Senha"

          type="password"

          value={senha}

          onChange={(e)=>setSenha(e.target.value)}

        />







        {erro && (

          <p className="text-red-500 mb-3">

            {erro}

          </p>

        )}







        <button

          onClick={entrar}

          className="w-full bg-blue-600 p-3 rounded-xl"

        >

          Entrar

        </button>





      </div>



    </div>


  );


}