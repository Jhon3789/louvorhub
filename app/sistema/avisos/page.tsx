"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import AdminOnly from "@/components/AdminOnly";

type Aviso = {
  id: number;
  titulo: string;
  mensagem: string;
  criado_em: string;
};



export default function AvisosPage() {


  const [avisos, setAvisos] = useState<Aviso[]>([]);

  const [titulo, setTitulo] = useState("");
  const [mensagem, setMensagem] = useState("");



  useEffect(() => {

    carregarAvisos();

  }, []);





  async function carregarAvisos() {


    const { data, error } = await supabase
      .from("avisos")
      .select("*")
      .order("id", { ascending:false });



    if(error){

      console.log(error);
      return;

    }



    setAvisos(data || []);


  }








  async function criarAviso() {


    if(!titulo || !mensagem){

      alert("Preencha todos os campos");
      return;

    }




    const { error } = await supabase
      .from("avisos")
      .insert({

        titulo,
        mensagem

      });





    if(error){

      alert(error.message);
      return;

    }




    setTitulo("");
    setMensagem("");

    carregarAvisos();


  }








  async function removerAviso(id:number) {


    const confirmar = window.confirm(
      "Deseja remover este aviso?"
    );



    if(!confirmar){

      return;

    }




    const {error} = await supabase
      .from("avisos")
      .delete()
      .eq("id",id);





    if(error){

      alert(error.message);
      return;

    }



    carregarAvisos();


  }








  return (

    <div className="p-6 text-white">


      <h1 className="text-3xl font-bold mb-6">
        📢 Avisos do Ministério
      </h1>





      <AdminOnly>


        <div className="bg-zinc-900 p-5 rounded-xl mb-6">


          <h2 className="font-bold mb-4">
            Novo aviso
          </h2>



          <input

            className="w-full p-3 bg-zinc-800 rounded mb-3"

            placeholder="Título do aviso"

            value={titulo}

            onChange={(e)=>setTitulo(e.target.value)}

          />





          <textarea

            className="w-full p-3 bg-zinc-800 rounded mb-3"

            placeholder="Mensagem"

            rows={4}

            value={mensagem}

            onChange={(e)=>setMensagem(e.target.value)}

          />





          <button

            onClick={criarAviso}

            className="bg-blue-600 px-5 py-3 rounded-xl"

          >

            📢 Publicar aviso

          </button>



        </div>


      </AdminOnly>









      <div className="space-y-4">



        {avisos.length === 0 && (

          <p className="text-zinc-400">
            Nenhum aviso publicado.
          </p>

        )}







        {avisos.map((aviso)=>(


          <div

            key={aviso.id}

            className="bg-zinc-900 p-5 rounded-xl"

          >



            <h2 className="text-xl font-bold">
              {aviso.titulo}
            </h2>




            <p className="mt-2 text-zinc-300 whitespace-pre-line">
              {aviso.mensagem}
            </p>






            {aviso.criado_em && (

              <p className="text-sm text-zinc-500 mt-3">

                📅 {new Date(aviso.criado_em).toLocaleDateString("pt-BR")}

              </p>

            )}







            <AdminOnly>


              <button

                onClick={()=>removerAviso(aviso.id)}

                className="bg-red-600 px-4 py-2 rounded mt-4"

              >

                ❌ Remover

              </button>


            </AdminOnly>





          </div>


        ))}



      </div>



    </div>


  );


}