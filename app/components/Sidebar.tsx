"use client";

import Link from "next/link";


export default function Sidebar(){


  const links=[

    {
      nome:"Início",
      icone:"🏠",
      rota:"/sistema"
    },

    {
      nome:"Louvores",
      icone:"🎵",
      rota:"/sistema/louvores"
    },

    {
      nome:"Cultos",
      icone:"📅",
      rota:"/sistema/cultos"
    },

    {
      nome:"Escala",
      icone:"👥",
      rota:"/sistema/escala"
    },

    {
      nome:"Sugestões",
      icone:"💡",
      rota:"/sistema/sugestoes"
    },

    {
      nome:"Avisos",
      icone:"📢",
      rota:"/sistema/avisos"
    }

  ];





  return (

    <aside

      className="
      hidden md:flex
      w-72
      min-h-screen
      flex-col
      bg-gradient-to-b
      from-blue-900
      to-zinc-950
      p-6
      text-white
      "

    >




      <div className="mb-10">


        <h1 className="text-3xl font-bold">

          ✝️ Quadrangular

        </h1>


        <p className="mt-2 text-blue-200">

          Ministério de Louvor

        </p>


      </div>







      <nav className="space-y-3">


        {links.map((link)=>(


          <Link

            key={link.rota}

            href={link.rota}

            className="
            flex
            items-center
            gap-3
            rounded-xl
            bg-white/10
            p-3
            transition
            hover:bg-white/20
            hover:translate-x-1
            "

          >


            <span className="text-xl">

              {link.icone}

            </span>


            <span>

              {link.nome}

            </span>


          </Link>


        ))}



      </nav>





      <div className="mt-auto text-sm text-blue-200">


        Sistema do Ministério


        <br />


        LouvorHub


      </div>



    </aside>


  );


}