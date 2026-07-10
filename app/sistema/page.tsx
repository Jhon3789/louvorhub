"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";


type Culto = {
  id:number;
  nome:string;
  data:string;
  horario:string;
  status:string;
};


type Louvor = {
  id:number;
  nome:string;
  artista:string;
  tom:string;
};


type Escala = {
  id:number;
  membro:string;
  funcao:string;
  confirmado:boolean;
};


type Aviso = {
  id:number;
  titulo:string;
  mensagem:string;
};



export default function DashboardPage(){


  const [culto,setCulto] = useState<Culto | null>(null);

  const [louvores,setLouvores] = useState<Louvor[]>([]);

  const [escala,setEscala] = useState<Escala[]>([]);

  const [avisos,setAvisos] = useState<Aviso[]>([]);

  const [totalLouvores,setTotalLouvores] = useState(0);





  useEffect(()=>{

    carregarDashboard();

  },[]);







  async function carregarDashboard(){



    const {data:proximoCulto} = await supabase

      .from("cultos")

      .select("*")

      .order("data",{ascending:true})

      .limit(1)

      .single();





    if(proximoCulto){


      setCulto(proximoCulto);





      const {data:ligacoes} = await supabase

        .from("culto_louvores")

        .select("louvor_id")

        .eq("culto_id",proximoCulto.id);





      if(ligacoes && ligacoes.length > 0){


        const ids = ligacoes.map((item:any)=>item.louvor_id);




        const {data:listaLouvores} = await supabase

          .from("louvores")

          .select("*")

          .in("id",ids);




        setLouvores(listaLouvores || []);


      }






      const {data:listaEscala} = await supabase

        .from("escala")

        .select("*")

        .eq("culto_id",proximoCulto.id);




      setEscala(listaEscala || []);



    }








    const {data:listaAvisos} = await supabase

      .from("avisos")

      .select("*")

      .order("id",{ascending:false})

      .limit(3);



    setAvisos(listaAvisos || []);







    const {count} = await supabase

      .from("louvores")

      .select("*",{count:"exact",head:true});



    setTotalLouvores(count || 0);



  }








  return(


    <div>


      <h1 className="text-3xl font-bold mb-2">

        🙏 Bem-vindo ao LouvorHub

      </h1>


      <p className="text-zinc-400 mb-8">

        Organização do Ministério de Louvor

      </p>







      <div className="bg-zinc-900 p-6 rounded-xl mb-6">


        <h2 className="text-2xl font-bold mb-4">

          ⛪ Próximo Culto

        </h2>




        {culto ? (

          <>

            <h3 className="text-xl font-bold">

              {culto.nome}

            </h3>


            <p>
              📅 {culto.data}
            </p>


            <p>
              🕒 {culto.horario}
            </p>


            <p>
              📌 {culto.status}
            </p>

          </>

        ) : (

          <p className="text-zinc-400">

            Nenhum culto encontrado.

          </p>

        )}



      </div>








      <div className="grid md:grid-cols-2 gap-6">





        <div className="bg-zinc-900 p-5 rounded-xl">


          <h2 className="text-xl font-bold mb-4">

            🎵 Louvores do Culto

          </h2>



          {louvores.length === 0 && (

            <p className="text-zinc-400">

              Nenhum louvor selecionado.

            </p>

          )}




          {louvores.map((l)=>(

            <div key={l.id} className="mb-3">

              🎶 {l.nome}

              <br />

              <span className="text-zinc-400">

                {l.artista} - Tom {l.tom}

              </span>


            </div>

          ))}



        </div>








        <div className="bg-zinc-900 p-5 rounded-xl">


          <h2 className="text-xl font-bold mb-4">

            👥 Escala

          </h2>



          {escala.length === 0 && (

            <p className="text-zinc-400">

              Nenhuma escala encontrada.

            </p>

          )}





          {escala.map((p)=>(


            <div key={p.id} className="mb-3">

              👤 {p.membro}

              {" - "}

              {p.funcao}

              {" "}

              {p.confirmado ? "✅" : "⏳"}


            </div>


          ))}





        </div>





      </div>









      <div className="bg-zinc-900 p-5 rounded-xl mt-6">


        <h2 className="text-xl font-bold mb-4">

          📢 Últimos Avisos

        </h2>




        {avisos.map((a)=>(

          <div key={a.id} className="mb-3">

            <b>{a.titulo}</b>

            <p className="text-zinc-300">

              {a.mensagem}

            </p>

          </div>


        ))}



      </div>








      <div className="mt-6 bg-zinc-900 p-5 rounded-xl">

        🎵 Total de louvores cadastrados:

        <span className="font-bold ml-2">

          {totalLouvores}

        </span>

      </div>





    </div>


  );


}