"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";


export default function DashboardPage() {


  const [louvores,setLouvores] = useState(0);
  const [cultos,setCultos] = useState(0);
  const [usuarios,setUsuarios] = useState(0);
  const [avisos,setAvisos] = useState(0);




  useEffect(()=>{

    carregarDados();

  },[]);






  async function carregarDados(){


    const {count:totalLouvores} = await supabase

      .from("louvores")

      .select("*",{count:"exact", head:true});



    const {count:totalCultos} = await supabase

      .from("cultos")

      .select("*",{count:"exact", head:true});




    const {count:totalUsuarios} = await supabase

      .from("usuarios")

      .select("*",{count:"exact", head:true});




    const {count:totalAvisos} = await supabase

      .from("avisos")

      .select("*",{count:"exact", head:true});





    setLouvores(totalLouvores || 0);

    setCultos(totalCultos || 0);

    setUsuarios(totalUsuarios || 0);

    setAvisos(totalAvisos || 0);



  }







  return (

    <div>


      <h1 className="text-3xl font-bold mb-2">

        🙏 Bem-vindo ao LouvorHub

      </h1>



      <p className="text-zinc-400 mb-8">

        Organização do Ministério de Louvor

      </p>







      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">





        <div className="bg-zinc-900 p-6 rounded-xl">

          <h2 className="text-xl">

            🎵 Louvores

          </h2>

          <p className="text-4xl font-bold mt-3">

            {louvores}

          </p>

        </div>







        <div className="bg-zinc-900 p-6 rounded-xl">

          <h2 className="text-xl">

            ⛪ Cultos

          </h2>

          <p className="text-4xl font-bold mt-3">

            {cultos}

          </p>

        </div>







        <div className="bg-zinc-900 p-6 rounded-xl">

          <h2 className="text-xl">

            👥 Integrantes

          </h2>

          <p className="text-4xl font-bold mt-3">

            {usuarios}

          </p>

        </div>







        <div className="bg-zinc-900 p-6 rounded-xl">

          <h2 className="text-xl">

            📢 Avisos

          </h2>

          <p className="text-4xl font-bold mt-3">

            {avisos}

          </p>

        </div>





      </div>






    </div>

  );


}