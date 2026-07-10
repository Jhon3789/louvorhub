"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";


export default function SistemaLayout({

  children,

}: {

  children: React.ReactNode;

}) {


  const [usuario, setUsuario] = useState<any>(null);



  useEffect(() => {

    carregarUsuario();

  }, []);





  async function carregarUsuario() {


    const {
      data: { user }

    } = await supabase.auth.getUser();



    setUsuario(user);


  }






  return (

    <div className="min-h-screen bg-black text-white">


      <header className="bg-zinc-900 p-5">

        <h1 className="text-2xl font-bold">
          🙏 LouvorHub
        </h1>



        {usuario && (

          <p className="text-zinc-400 mt-2">
            Logado como: {usuario.email}
          </p>

        )}

      </header>





      <main>

        {children}

      </main>





    </div>

  );


}