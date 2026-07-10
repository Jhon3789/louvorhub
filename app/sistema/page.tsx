"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";


export default function SistemaPage() {


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

    <div className="text-white">

      <h1 className="text-3xl font-bold">
        🙏 Bem-vindo ao LouvorHub
      </h1>


      {usuario && (

        <p className="mt-4 text-zinc-400">
          Logado como: {usuario.email}
        </p>

      )}


    </div>

  );

}