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







  return (

    <div className="space-y-8">


      <div>

        <h1 className="text-4xl font-bold text-yellow-400">

          🎵 LouvorHub

        </h1>


        <p className="text-zinc-400 mt-2">

          Organização do Ministério de Louvor

        </p>

      </div>





      <div className="grid md:grid-cols-3 gap-6">



        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">

          <p className="text-zinc-400">
            🎶 Louvores
          </p>


          <h2 className="text-3xl font-bold mt-3 text-yellow-400">

            {totalLouvores}

          </h2>


          <p className="text-sm text-zinc-500">

            músicas cadastradas

          </p>


        </div>






        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">


          <p className="text-zinc-400">

            ⛪ Próximo Culto

          </p>


          <h2 className="text-xl font-bold mt-3">

            {culto?.nome || "Nenhum"}

          </h2>


          <p className="text-zinc-400 mt-2">

            {culto?.horario}

          </p>


        </div>






        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">


          <p className="text-zinc-400">

            👥 Escala

          </p>


          <h2 className="text-3xl font-bold mt-3 text-yellow-400">

            {escala.length}

          </h2>


          <p className="text-sm text-zinc-500">

            participantes

          </p>


        </div>


      </div>








      <div className="grid md:grid-cols-2 gap-6">



        <div className="bg-[#111827] border border-white/10 rounded-2xl p-6">


          <h2 className="text-xl font-bold mb-5 text-yellow-400">

            🎵 Repertório do Culto

          </h2>




          {louvores.length === 0 && (

            <p className="text-zinc-400">

              Nenhum louvor selecionado.

            </p>

          )}





          {louvores.map((l)=>(


            <div

              key={l.id}

              className="p-3 mb-3 rounded-xl bg-white/5"

            >


              <p className="font-bold">

                🎶 {l.nome}

              </p>


              <p className="text-sm text-zinc-400">

                {l.artista} • Tom {l.tom}

              </p>


            </div>


          ))}



        </div>








        <div className="bg-[#111827] border border-white/10 rounded-2xl p-6">



          <h2 className="text-xl font-bold mb-5 text-yellow-400">

            👥 Equipe escalada

          </h2>





          {escala.map((p)=>(


            <div

              key={p.id}

              className="p-3 mb-3 rounded-xl bg-white/5"

            >

              👤 {p.membro}

              <span className="text-zinc-400">

                {" "}• {p.funcao}

              </span>


              <span className="ml-2">

                {p.confirmado ? "✅" : "⏳"}

              </span>


            </div>


          ))}



        </div>



      </div>








      <div className="bg-[#111827] border border-white/10 rounded-2xl p-6">


        <h2 className="text-xl font-bold mb-5 text-yellow-400">

          📢 Últimos Avisos

        </h2>




        {avisos.map((a)=>(


          <div

            key={a.id}

            className="mb-4 p-4 rounded-xl bg-white/5"

          >

            <b>

              {a.titulo}

            </b>


            <p className="text-zinc-300 mt-1">

              {a.mensagem}

            </p>


          </div>


        ))}



      </div>





    </div>

  );


}