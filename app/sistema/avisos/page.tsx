"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";


type Aviso = {
  id: number;
  titulo: string;
  mensagem: string;
};


export default function SistemaPage() {


  const [usuario, setUsuario] = useState<any>(null);
  const [avisos, setAvisos] = useState<Aviso[]>([]);



  useEffect(() => {

    carregarUsuario();
    carregarAvisos();

  }, []);




  async function carregarUsuario(){

    const {
      data:{user}
    } = await supabase.auth.getUser();


    setUsuario(user);

  }





  async function carregarAvisos(){


    const {data,error}= await supabase
      .from("avisos")
      .select("*")
      .order("id",{ascending:false})
      .limit(5);



    if(error){

      console.log(error);
      return;

    }



    setAvisos(data || []);


  }






  return (

    <div className="text-white space-y-6">


      <div className="bg-zinc-900 p-6 rounded-2xl border border-zinc-800">


        <h1 className="text-3xl font-bold">
          🙏 Bem-vindo ao LouvorHub
        </h1>


        <p className="text-zinc-400 mt-2">
          Organização do Ministério de Louvor
        </p>



        {usuario && (

          <p className="mt-4 text-sm text-blue-400">
            Logado como: {usuario.email}
          </p>

        )}


      </div>





      <div className="grid md:grid-cols-3 gap-5">


        <div className="bg-zinc-900 p-6 rounded-xl">
          <h2 className="text-xl font-bold">
            🎵 Louvores
          </h2>
          <p className="text-zinc-400 mt-2">
            Letras, cifras e tons.
          </p>
        </div>



        <div className="bg-zinc-900 p-6 rounded-xl">
          <h2 className="text-xl font-bold">
            ⛪ Cultos
          </h2>
          <p className="text-zinc-400 mt-2">
            Organização dos cultos.
          </p>
        </div>



        <div className="bg-zinc-900 p-6 rounded-xl">
          <h2 className="text-xl font-bold">
            👥 Escala
          </h2>
          <p className="text-zinc-400 mt-2">
            Equipe do ministério.
          </p>
        </div>


      </div>







      <div className="bg-blue-950 p-6 rounded-2xl border border-blue-900">


        <h2 className="text-2xl font-bold mb-4">
          📢 Avisos do Ministério
        </h2>



        {avisos.length === 0 ? (

          <p className="text-zinc-400">
            Nenhum aviso publicado.
          </p>

        ) : (


          <div className="space-y-4">


            {avisos.map((aviso)=>(

              <div 
                key={aviso.id}
                className="bg-zinc-900 p-4 rounded-xl"
              >

                <h3 className="font-bold text-lg">
                  {aviso.titulo}
                </h3>


                <p className="text-zinc-300 mt-2">
                  {aviso.mensagem}
                </p>


              </div>

            ))}


          </div>


        )}


      </div>




    </div>

  );

}