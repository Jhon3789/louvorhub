import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="w-64 min-h-screen bg-zinc-900 text-white p-6">
      <h1 className="text-2xl font-bold mb-8">
        LouvorHub 🎵
      </h1>

      <nav className="flex flex-col gap-4">

        <Link
          href="/sistema"
          className="hover:text-blue-400"
        >
          🏠 Início
        </Link>


        <Link
          href="/sistema/louvores"
          className="hover:text-blue-400"
        >
          🎶 Louvores
        </Link>


        <Link
          href="/sistema/cultos"
          className="hover:text-blue-400"
        >
          ⛪ Cultos
        </Link>


        <Link
          href="/sistema/escala"
          className="hover:text-blue-400"
        >
          👥 Escala
        </Link>


        <Link
          href="/sistema/equipe"
          className="hover:text-blue-400"
        >
          👤 Equipe
        </Link>


        <Link
          href="/sistema/sugestoes"
          className="hover:text-blue-400"
        >
          💡 Sugestões
        </Link>


        <Link
          href="/login"
          className="hover:text-red-400 mt-8"
        >
          🚪 Sair
        </Link>

      </nav>
    </aside>
  );
}