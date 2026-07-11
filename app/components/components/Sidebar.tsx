"use client";

import Link from "next/link";


export default function Sidebar() {


  return (

    <aside className="w-64 min-h-screen bg-zinc-900 text-white p-5">


      <h1 className="text-2xl font-bold mb-8">
        🎵 LouvorHub
      </h1>



      <nav className="space-y-3">


        <Link
          href="/sistema"
          className="block p-3 rounded hover:bg-zinc-800"
        >
          🏠 Dashboard
        </Link>



        <Link
          href="/sistema/louvores"
          className="block p-3 rounded hover:bg-zinc-800"
        >
          🎵 Louvores
        </Link>



        <Link
          href="/sistema/cultos"
          className="block p-3 rounded hover:bg-zinc-800"
        >
          ⛪ Cultos
        </Link>



        <Link
          href="/sistema/escala"
          className="block p-3 rounded hover:bg-zinc-800"
        >
          📅 Escala
        </Link>



        <Link
          href="/sistema/membros"
          className="block p-3 rounded hover:bg-zinc-800"
        >
          👥 Equipe
        </Link>



        <Link
          href="/sistema/sugestoes"
          className="block p-3 rounded hover:bg-zinc-800"
        >
          💡 Sugestões
        </Link>



      </nav>


    </aside>

  );

}