"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";


type Culto = {
  id:number;
  nome:string;
  data:string;
  horario:string;
};


type Aviso = {
  id:number;
  titulo:string;
  mensagem:string;
  criado_em:string;
};



export default function DashboardPage(){


  const [louvores,setLouvores] = useState(0);
  const [usuarios,setUsuarios] = useState(0);
  const [avisosTotal,setAvisosTotal] = useState(0);

  const [cultos,setCultos] = useState<Culto[]>([]);
  const [avisos,setAvisos] = useState<Aviso[]>([]);





  useEffect(()=>{

    carregarDashboard();

  },[]);







  async function carregarDashboard(){



    const {count:totalLouvores} = await supabase

      .from("louvores")

      .select("*",{count:"exact",head:true});




    const {count:totalUsuarios} = await supabase

      .from("usuarios")

      .select("*",{count:"exact",head:true});





    const {count:totalAvisos} = await supabase

      .from("avisos")

      .select("*",{count:"exact",head:true});







    const {data:listaCultos} = await supabase

      .from("cultos")

      .select("*")

      .order("data",{ascending:true})

      .limit(3);






    const {data:listaAvisos} = await supabase

      .from("avisos")

      .select("*")

      .order("id",{ascending:false})

      .limit(3);







    setLouvores(totalLouvores || 0);

    setUsuarios(totalUsuarios || 0);

    setAvisosTotal(totalAvisos || 0);


    setCultos(listaCultos || []);

    setAvisos(listaAvisos || []);



  }








  return(


    <div>


      <h1 className="text-3xl font-bold mb-2">

        🙏 Bem-vindo ao LouvorHub

      </h1>


      <p className="text-zinc-400 mb-8">

        Organização do Ministério de Louvor

      </p>






      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">



        <div className="bg-zinc-900 p-6 rounded-xl">

          🎵 Louvores

          <p className="text-4xl font-bold mt-2">

            {louvores}

          </p>

        </div>





        <div className="bg-zinc-900 p-6 rounded-xl">

          👥 Integrantes

          <p className="text-4xl font-bold mt-2">

            {usuarios}

          </p>

        </div>





        <div className="bg-zinc-900 p-6 rounded-xl">

          📢 Avisos

          <p className="text-4xl font-bold mt-2">

            {avisosTotal}

          </p>

        </div>



      </div>








      <div className="grid md:grid-cols-2 gap-6">






        <div className="bg-zinc-900 p-5 rounded-xl">


          <h2 className="text-xl font-bold mb-4">

            ⛪ Próximos Cultos

          </h2>




          {cultos.length === 0 && (

            <p className="text-zinc-400">

              Nenhum culto cadastrado.

            </p>

          )}






          {cultos.map((culto)=>(

            <div

              key={culto.id}

              className="border-b border-zinc-700 py-3"

            >

              <p className="font-bold">

                {culto.nome}

              </p>


              <p>

                📅 {culto.data}

              </p>


              <p>

                🕒 {culto.horario}

              </p>


            </div>


          ))}





        </div>









        <div className="bg-zinc-900 p-5 rounded-xl">


          <h2 className="text-xl font-bold mb-4">

            📢 Últimos Avisos

          </h2>





          {avisos.length === 0 && (

            <p className="text-zinc-400">

              Nenhum aviso publicado.

            </p>

          )}






          {avisos.map((aviso)=>(

            <div

              key={aviso.id}

              className="border-b border-zinc-700 py-3"

            >

              <p className="font-bold">

                {aviso.titulo}

              </p>


              <p className="text-zinc-300">

                {aviso.mensagem}

              </p>


            </div>


          ))}





        </div>






      </div>



    </div>


  );


}