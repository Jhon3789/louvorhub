"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Louvor = {
  id: number;
  nome: string;
  artista: string;
  tom: string;
  letra?: string;
  cifra?: string;
  link?: string;
};

type Culto = {
  id: number;
  tipo: string;
  dia: string;
  horario: string;
  repertorio: Louvor[];
};


export default function RepertorioPage() {

  const [culto, setCulto] = useState<Culto | null>(null);


  useEffect(() => {

    const dados = localStorage.getItem("cultos");


    if (dados) {

      const cultos: Culto[] = JSON.parse(dados);


      const cultoComRepertorio = cultos.find(
        (c) => c.repertorio && c.repertorio.length > 0
      );


      if (cultoComRepertorio) {
        setCulto(cultoComRepertorio);
      } 
      else if (cultos.length > 0) {
        setCulto(cultos[0]);
      }

    }

  }, []);



  return (

    <div className="p-6 text-white">


      <h1 className="text-3xl font-bold mb-6">
        🎶 Repertório do Culto
      </h1>



      {culto ? (

        <>


          <div className="bg-zinc-900 p-5 rounded-xl mb-6">

            <h2 className="text-2xl font-bold">
              {culto.tipo}
            </h2>

            <p>
              📅 {culto.dia} - ⏰ {culto.horario}
            </p>

          </div>



          {culto.repertorio.length > 0 ? (

            culto.repertorio.map((louvor,index)=>(


              <div
                key={louvor.id}
                className="bg-zinc-900 p-5 rounded-xl mb-4"
              >


                <Link
                  href={`/sistema/louvor/${louvor.id}`}
                  className="text-2xl font-bold text-blue-400"
                >
                  {index + 1}. 🎵 {louvor.nome}
                </Link>


                <p className="mt-2">
                  🎤 {louvor.artista}
                </p>


                <p>
                  🎸 Tom: {louvor.tom}
                </p>


                {louvor.link && (

                  <a
                    href={louvor.link}
                    target="_blank"
                    className="text-green-400 block mt-3"
                  >
                    ▶ Ouvir louvor
                  </a>

                )}


              </div>


            ))


          ) : (

            <p>
              Nenhum louvor escolhido para este culto.
            </p>

          )}



        </>


      ) : (

        <p>
          Nenhum culto cadastrado.
        </p>

      )}



    </div>

  );

}