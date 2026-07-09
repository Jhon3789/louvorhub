"use client";

import { useEffect, useState } from "react";
import { supabase } from "./lib/supabase";

export default function Home() {
  const [louvores, setLouvores] = useState(0);
  const [membros, setMembros] = useState(0);
  const [cultos, setCultos] = useState<any[]>([]);

  useEffect(() => {
    async function carregarDados() {
      
      const { count: totalLouvores } = await supabase
        .from("louvores")
        .select("*", { count: "exact", head: true });

      setLouvores(totalLouvores || 0);


      const { count: totalMembros } = await supabase
        .from("membros")
        .select("*", { count: "exact", head: true });

      setMembros(totalMembros || 0);


      const { data } = await supabase
        .from("cultos")
        .select("*")
        .order("id")
        .limit(1);

      setCultos(data || []);
    }


    carregarDados();

  }, []);


  return (
    <div className="min-h-screen bg-zinc-950 text-white p-8">

      <h1 className="text-3xl font-bold">
        ✝️ LouvorHub
      </h1>

      <p className="mt-2 text-zinc-400">
        Painel do Ministério de Louvor
      </p>


      <div className="grid md:grid-cols-3 gap-5 mt-8">


        <div className="bg-zinc-900 p-6 rounded-xl">
          <h2 className="text-xl font-bold">
            🎵 Louvores
          </h2>
          <p className="text-3xl mt-3">
            {louvores}
          </p>
        </div>


        <div className="bg-zinc-900 p-6 rounded-xl">
          <h2 className="text-xl font-bold">
            👥 Membros
          </h2>
          <p className="text-3xl mt-3">
            {membros}
          </p>
        </div>


        <div className="bg-zinc-900 p-6 rounded-xl">
          <h2 className="text-xl font-bold">
            ⛪ Próximo culto
          </h2>

          {cultos.length > 0 ? (
            <p className="mt-3">
              {cultos[0].nome}
              <br />
              {cultos[0].data}
              <br />
              {cultos[0].horario}
            </p>
          ) : (
            <p className="mt-3">
              Nenhum culto cadastrado
            </p>
          )}

        </div>


      </div>

    </div>
  );
}