"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";


export default function SistemaLayout({

  children,

}: {

  children: React.ReactNode;

}) {


  const [usuario,setUsuario] = useState<any>(null);
  const [perfil,setPerfil] = useState<any>(null);




  useEffect(()=>{

    carregarUsuario();

  },[]);






  async function carregarUsuario(){


    const {
      data:{user}

    } = await supabase.auth.getUser();



    setUsuario(user);




    if(user){


      const {data} = await supabase

        .from("usuarios")

        .select("*")

        .eq("email", user.email)

        .single();




      setPerfil(data);


    }


  }







  return (


    <div className="min-h-screen bg-black text-white flex">





      <aside className="w-64 bg-zinc-900 p-5">





        <h1 className="text-2xl font-bold mb-6">

          🙏 LouvorHub

        </h1>






        {usuario && (

          <div className="text-sm text-zinc-400 mb-6">


            <p>
              📧 {usuario.email}
            </p>




            {perfil && (

              <p className="mt-2">


                {perfil.tipo === "admin"

                  ? "👑 Administrador"

                  : "👤 Membro"

                }


              </p>

            )}



          </div>


        )}







        <nav className="space-y-3">



          <Link
            href="/sistema"
            className="block bg-zinc-800 p-3 rounded"
          >
            🏠 Dashboard
          </Link>




          <Link
            href="/sistema/louvores"
            className="block bg-zinc-800 p-3 rounded"
          >
            🎵 Louvores
          </Link>





          <Link
            href="/sistema/cultos"
            className="block bg-zinc-800 p-3 rounded"
          >
            ⛪ Cultos
          </Link>





          <Link
            href="/sistema/escala"
            className="block bg-zinc-800 p-3 rounded"
          >
            👥 Escala
          </Link>





          <Link
            href="/sistema/avisos"
            className="block bg-zinc-800 p-3 rounded"
          >
            📢 Avisos
          </Link>





          <Link
            href="/sistema/equipe"
            className="block bg-zinc-800 p-3 rounded"
          >
            👤 Equipe
          </Link>





          <Link
            href="/login"
            className="block bg-blue-600 p-3 rounded"
          >
            🔐 Login
          </Link>




        </nav>



      </aside>






      <main className="flex-1 p-6">

        {children}

      </main>





    </div>


  );


}