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

    <div className="text-white space-y-6">


      <div className="bg-zinc-900 p-6 rounded-2xl border border-zinc-800">

        <h1 className="text-3xl font-bold">
          🙏 Bem-vindo ao LouvorHub
        </h1>


        <p className="text-zinc-400 mt-2">
          Organização do Ministério de Louvor
        </p>


        {usuario && (

          <p className="mt-4 text-sm text-blue-400">
            Logado como: {usuario.email}
          </p>

        )}

      </div>




      <div className="grid md:grid-cols-3 gap-5">


        <div className="bg-zinc-900 p-6 rounded-xl border border-zinc-800">

          <h2 className="text-xl font-bold">
            🎵 Louvores
          </h2>

          <p className="text-zinc-400 mt-2">
            Organize letras, cifras e tons.
          </p>

        </div>




        <div className="bg-zinc-900 p-6 rounded-xl border border-zinc-800">

          <h2 className="text-xl font-bold">
            ⛪ Cultos
          </h2>

          <p className="text-zinc-400 mt-2">
            Planeje os próximos cultos.
          </p>

        </div>




        <div className="bg-zinc-900 p-6 rounded-xl border border-zinc-800">

          <h2 className="text-xl font-bold">
            👥 Escala
          </h2>

          <p className="text-zinc-400 mt-2">
            Organize os integrantes.
          </p>

        </div>


      </div>




      <div className="bg-blue-950 p-6 rounded-2xl border border-blue-900">

        <h2 className="text-2xl font-bold">
          📢 Próximos passos
        </h2>

        <ul className="mt-3 text-zinc-300 space-y-2">

          <li>✅ Usuários cadastrados</li>
          <li>✅ Login funcionando</li>
          <li>✅ Supabase conectado</li>
          <li>🚀 Melhorar permissões</li>

        </ul>


      </div>



    </div>

  );

}