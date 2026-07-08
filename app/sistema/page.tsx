"use client";

import { useEffect, useState } from "react";

export default function SistemaPage() {

  const [louvores, setLouvores] = useState(0);
  const [avisos, setAvisos] = useState(0);
  const [sugestoes, setSugestoes] = useState(0);
  const [culto, setCulto] = useState<any>(null);


  useEffect(() => {

    const l = localStorage.getItem("louvores");
    const a = localStorage.getItem("avisos");
    const s = localStorage.getItem("sugestoes");
    const c = localStorage.getItem("cultos");


    if(l){
      setLouvores(JSON.parse(l).length);
    }


    if(a){
      setAvisos(JSON.parse(a).length);
    }


    if(s){
      setSugestoes(JSON.parse(s).length);
    }


    if(c){

      const lista = JSON.parse(c);

      if(lista.length > 0){
        setCulto(lista[0]);
      }

    }


  },[]);



  return (

    <div>


      <div className="mb-8">

        <h1 className="text-4xl font-bold">
          🙏 Bem-vindo, equipe de louvor!
        </h1>


        <p className="text-zinc-400 mt-2">
          Tudo organizado para o próximo culto.
        </p>

      </div>





      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">


        <div className="bg-blue-600 p-5 rounded-2xl">

          <h2 className="text-lg">
            🎵 Louvores
          </h2>

          <p className="text-4xl font-bold mt-3">
            {louvores}
          </p>

          <p>
            cadastrados
          </p>

        </div>




        <div className="bg-zinc-800 p-5 rounded-2xl">

          <h2 className="text-lg">
            📢 Avisos
          </h2>

          <p className="text-4xl font-bold mt-3">
            {avisos}
          </p>

          <p>
            publicados
          </p>

        </div>





        <div className="bg-zinc-800 p-5 rounded-2xl">

          <h2 className="text-lg">
            💡 Sugestões
          </h2>

          <p className="text-4xl font-bold mt-3">
            {sugestoes}
          </p>

          <p>
            recebidas
          </p>

        </div>





        <div className="bg-zinc-800 p-5 rounded-2xl">

          <h2 className="text-lg">
            👥 Equipe
          </h2>

          <p className="text-4xl font-bold mt-3">
            7
          </p>

          <p>
            membros
          </p>

        </div>


      </div>





      <div className="mt-8 bg-zinc-900 p-6 rounded-2xl">


        <h2 className="text-2xl font-bold mb-4">
          ⛪ Próximo Culto
        </h2>



        {culto ? (

          <>

          <p className="text-xl">
            {culto.tipo}
          </p>


          <p className="text-zinc-400">
            📅 {culto.dia} - ⏰ {culto.horario}
          </p>


          </>

        ) : (

          <p>
            Nenhum culto cadastrado.
          </p>

        )}


      </div>





      {culto?.repertorio?.length > 0 && (

        <div className="mt-6 bg-zinc-900 p-6 rounded-2xl">


          <h2 className="text-2xl font-bold mb-4">
            🎶 Repertório
          </h2>



          {culto.repertorio.map(
            (l:any,index:number)=>(

              <p key={l.id} className="mt-2">

                {index+1}. 🎵 {l.nome}

              </p>

            )
          )}



        </div>

      )}




    </div>

  );
}