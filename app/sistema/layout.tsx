"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";


export default function SistemaLayout({

  children,

}: {

  children: React.ReactNode;

}) {


  const router = useRouter();

  const [usuario, setUsuario] = useState<any>(null);
  const [perfil, setPerfil] = useState<any>(null);



  useEffect(() => {

    carregarUsuario();

  }, []);





  async function carregarUsuario() {


    const {
      data: { user }

    } = await supabase.auth.getUser();




    if (!user) {

      router.push("/login");
      return;

    }




    setUsuario(user);





    const { data } = await supabase

      .from("usuarios")

      .select("*")

      .eq("email", user.email)

      .single();





    setPerfil(data);


  }






  async function sair() {


    await supabase.auth.signOut();

    router.push("/login");


  }






  return (

    <div className="min-h-screen bg-[#080b16] text-white flex">


      <aside className="w-72 bg-[#111827] p-6 border-r border-white/10">


        <h1 className="text-2xl font-bold mb-8 text-yellow-400">

          🎵 LouvorHub

        </h1>





        {usuario && (

          <div className="mb-8 p-4 rounded-2xl bg-white/5 border border-white/10">


            <p className="text-sm text-zinc-300 truncate">

              📧 {usuario.email}

            </p>





            {perfil && (

              <p className="mt-3 text-sm text-yellow-400">


                {perfil.nivel === "admin"

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

            className="block p-3 rounded-xl bg-white/5 hover:bg-yellow-400 hover:text-black transition"

          >

            🏠 Início

          </Link>






          <Link

            href="/sistema/louvores"

            className="block p-3 rounded-xl bg-white/5 hover:bg-yellow-400 hover:text-black transition"

          >

            🎶 Louvores

          </Link>






          <Link

            href="/sistema/cultos"

            className="block p-3 rounded-xl bg-white/5 hover:bg-yellow-400 hover:text-black transition"

          >

            ⛪ Cultos

          </Link>






          <Link

            href="/sistema/escala"

            className="block p-3 rounded-xl bg-white/5 hover:bg-yellow-400 hover:text-black transition"

          >

            👥 Escala

          </Link>






          <Link

            href="/sistema/avisos"

            className="block p-3 rounded-xl bg-white/5 hover:bg-yellow-400 hover:text-black transition"

          >

            📜 Avisos

          </Link>






          <Link

            href="/sistema/equipe"

            className="block p-3 rounded-xl bg-white/5 hover:bg-yellow-400 hover:text-black transition"

          >

            👤 Equipe

          </Link>






          <Link

            href="/sistema/sugestoes"

            className="block p-3 rounded-xl bg-white/5 hover:bg-yellow-400 hover:text-black transition"

          >

            💡 Sugestões

          </Link>







          <button

            onClick={sair}

            className="w-full p-3 rounded-xl bg-red-600 hover:bg-red-700 transition text-left"

          >

            🚪 Sair

          </button>





        </nav>


      </aside>







      <main className="flex-1 p-8">


        {children}


      </main>





    </div>


  );


}