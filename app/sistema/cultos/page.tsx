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




export default function CultosPage(){


  const [cultos,setCultos] = useState<Culto[]>([]);



  useEffect(()=>{

    carregarCultos();

  },[]);







  async function carregarCultos(){


    const {data,error} = await supabase

      .from("cultos")

      .select("*")

      .order("data",{ascending:true});





    if(error){

      console.log(error);
      return;

    }



    setCultos(data || []);


  }







  return(


    <div className="text-white">


      <h1 className="text-3xl font-bold mb-6">

        ⛪ Cultos

      </h1>






      {cultos.length === 0 && (

        <p className="text-zinc-400">

          Nenhum culto cadastrado.

        </p>

      )}







      <div className="space-y-6">



        {cultos.map((culto)=>(


          <CultoCard

            key={culto.id}

            culto={culto}

          />


        ))}




      </div>



    </div>


  );


}









function CultoCard({culto}:{culto:Culto}){


  const [louvores,setLouvores] = useState<Louvor[]>([]);
  const [escala,setEscala] = useState<Escala[]>([]);





  useEffect(()=>{


    carregarDetalhes();


  },[]);






  async function carregarDetalhes(){



    const {data:ligacoes} = await supabase

      .from("culto_louvores")

      .select("louvor_id")

      .eq("culto_id",culto.id);






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

      .eq("culto_id",culto.id);





    setEscala(listaEscala || []);





  }








  return(


    <div className="bg-zinc-900 p-6 rounded-xl">



      <h2 className="text-2xl font-bold">

        {culto.nome}

      </h2>




      <p>

        📅 {culto.data}

      </p>




      <p>

        🕒 {culto.horario}

      </p>




      <p>

        📌 {culto.status}

      </p>








      <div className="mt-5">


        <h3 className="text-xl font-bold">

          🎵 Louvores

        </h3>



        {louvores.length === 0 && (

          <p className="text-zinc-400">

            Nenhum louvor selecionado.

          </p>

        )}




        {louvores.map((louvor)=>(


          <div key={louvor.id} className="mt-2">


            🎶 {louvor.nome}

            <br />

            <span className="text-zinc-400">

              {louvor.artista} - Tom {louvor.tom}

            </span>


          </div>


        ))}



      </div>








      <div className="mt-5">


        <h3 className="text-xl font-bold">

          👥 Escala

        </h3>




        {escala.length === 0 && (

          <p className="text-zinc-400">

            Nenhuma escala cadastrada.

          </p>

        )}






        {escala.map((pessoa)=>(


          <div key={pessoa.id} className="mt-2">


            👤 {pessoa.membro}

            {" - "}

            {pessoa.funcao}

            {" "}

            {pessoa.confirmado ? "✅" : "⏳"}


          </div>


        ))}




      </div>






    </div>


  );


}