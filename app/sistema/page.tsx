"use client";

import { useEffect, useState } from "react";
import { supabase } from "./lib/supabase";

export default function Home() {
  const [usuario, setUsuario] = useState<string>("");

  useEffect(() => {
    async function carregar() {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session?.user?.email) {
        setUsuario(session.user.email);
      }
    }

    carregar();
  }, []);

  return (
    <div className="min-h-screen bg-zinc-950 text-white p-8">
      <h1 className="text-3xl font-bold">
        ✝️ LouvorHub
      </h1>

      <p className="mt-4 text-zinc-300">
        Bem-vindo {usuario}
      </p>

      <div className="grid md:grid-cols-3 gap-4 mt-8">

        <div className="bg-zinc-900 p-6 rounded-xl">
          <h2 className="text-xl font-bold">
            🎵 Louvores
          </h2>
          <p className="mt-2">
            Organize seu repertório.
          </p>
        </div>

        <div className="bg-zinc-900 p-6 rounded-xl">
          <h2 className="text-xl font-bold">
            ⛪ Cultos
          </h2>
          <p className="mt-2">
            Quinta 20:00 e Domingo 19:00.
          </p>
        </div>

        <div className="bg-zinc-900 p-6 rounded-xl">
          <h2 className="text-xl font-bold">
            🎤 Escala
          </h2>
          <p className="mt-2">
            Organize os integrantes.
          </p>
        </div>

      </div>
    </div>
  );
}