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



      <header className="bg-zinc-900 p-5 flex justify-between items-center">


        <h1 className="text-xl font-bold">
          🙏 LouvorHub
        </h1>




        {usuario && (

          <p className="text-sm text-zinc-400">
            {usuario.email}
          </p>

        )}



      </header>





      <main>

        {children}

      </main>





    </div>

  );


}