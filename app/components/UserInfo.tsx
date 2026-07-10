"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";


type Membro = {
  nome: string;
  funcao: string;
  tipo: string;
};


export default function UserInfo() {

  const [membro, setMembro] = useState<Membro | null>(null);


  useEffect(() => {

    carregarUsuario();

  }, []);



  async function carregarUsuario() {


    const {
      data: { user }
    } = await supabase.auth.getUser();



    if(!user){
      return;
    }



    const { data, error } = await supabase
      .from("membros")
      .select("*")
      .eq("auth_id", user.id)
      .single();



    if(error){

      console.log(error);
      return;

    }



    setMembro(data);

  }



  if(!membro){

    return null;

  }



  return (

    <div className="bg-zinc-900 p-4 rounded-xl mb-5">

      <p className="font-bold">
        👤 {membro.nome}
      </p>


      <p className="text-zinc-400">
        🎤 {membro.funcao}
      </p>


      <p className="text-zinc-400">
        {membro.tipo === "admin"
          ? "👑 Administrador"
          : "👤 Membro"
        }
      </p>


    </div>

  );

}