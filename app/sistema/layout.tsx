import Link from "next/link";
import AuthGuard from "../components/AuthGuard";
import LogoutButton from "../components/LogoutButton";


export default function SistemaLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (

    <AuthGuard>

      <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-zinc-900 to-blue-950 text-white flex">


        <aside className="w-72 bg-zinc-900 p-6 border-r border-zinc-800">


          <div className="text-center mb-8">


            <div className="w-20 h-20 mx-auto rounded-full bg-blue-600 flex items-center justify-center text-4xl">
              ✝️
            </div>


            <h1 className="text-2xl font-bold mt-4">
              ✝️ LouvorHub
            </h1>


            <p className="text-sm text-zinc-400">
              Igreja Quadrangular
            </p>


          </div>





          <nav className="flex flex-col gap-2">


            <Link
              href="/sistema"
              className="p-3 rounded-xl hover:bg-blue-600 transition"
            >
              🏠 Início
            </Link>



            <Link
              href="/sistema/louvores"
              className="p-3 rounded-xl hover:bg-blue-600 transition"
            >
              🎵 Louvores
            </Link>



            <Link
              href="/sistema/cultos"
              className="p-3 rounded-xl hover:bg-blue-600 transition"
            >
              ⛪ Cultos
            </Link>



            <Link
              href="/sistema/repertorio"
              className="p-3 rounded-xl hover:bg-blue-600 transition"
            >
              🎶 Repertório
            </Link>



            <Link
              href="/sistema/escala"
              className="p-3 rounded-xl hover:bg-blue-600 transition"
            >
              👥 Escala
            </Link>



            <Link
              href="/sistema/avisos"
              className="p-3 rounded-xl hover:bg-blue-600 transition"
            >
              📢 Avisos
            </Link>



            <Link
              href="/sistema/sugestoes"
              className="p-3 rounded-xl hover:bg-blue-600 transition"
            >
              💡 Sugestões
            </Link>



          </nav>




          <div className="mt-8">

            <LogoutButton />

          </div>



        </aside>







        <main className="flex-1 p-8">


          <div className="bg-zinc-900 p-6 rounded-2xl border border-zinc-800 mb-8">


            <h2 className="text-3xl font-bold">
              🙏 Bem-vindo ao LouvorHub
            </h2>


            <p className="text-zinc-400 mt-2">
              Organização do Ministério de Louvor
            </p>


          </div>



          {children}



        </main>



      </div>


    </AuthGuard>

  );

}