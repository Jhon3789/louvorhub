"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";


type Culto = {
  id:number;
  nome:string;
  data:string;
  horario:string;
};


type Membro = {
  id:number;
  nome:string;
  funcao:string;
};


type Escala = {
  id:number;
  culto_id:number;
  membro:string;
  funcao:string;
  confirmado:boolean;
};



export default function EscalaPage(){


  const [cultos,setCultos] = useState<Culto[]>([]);
  const [membros,setMembros] = useState<Membro[]>([]);
  const [escala,setEscala] = useState<Escala[]>([]);


  const [cultoId,setCultoId] = useState("");
  const [membroId,setMembroId] = useState("");

  const [erro,setErro] = useState("");







  useEffect(()=>{

    carregarTudo();

  },[]);






  async function carregarTudo(){

    await carregarCultos();

    await carregarMembros();

    await carregarEscala();

  }







  async function carregarCultos(){


    const {data,error}=await supabase

      .from("cultos")
      .select("*")
      .order("data");



    if(error){

      setErro(error.message);
      return;

    }



    setCultos(data || []);


  }








  async function carregarMembros(){



    const {data,error}=await supabase

      .from("membros")
      .select("id,nome,funcao")
      .order("nome");



    if(error){

      setErro(
        "Erro ao carregar membros: "
        + error.message
      );

      return;

    }



    console.log("MEMBROS:",data);



    setMembros(data || []);


  }








  async function carregarEscala(){



    const {data,error}=await supabase

      .from("escala")
      .select("*")
      .order("id",{ascending:false});



    if(error){

      setErro(error.message);
      return;

    }



    setEscala(data || []);


  }









  async function adicionar(){



    if(!cultoId || !membroId){

      alert("Escolha o culto e o membro");
      return;

    }





    const membro = membros.find(

      m=>m.id === Number(membroId)

    );





    if(!membro){

      alert("Membro não encontrado");
      return;

    }






    const {error}=await supabase

      .from("escala")

      .insert({

        culto_id:Number(cultoId),

        membro:membro.nome,

        funcao:membro.funcao,

        confirmado:false

      });






    if(error){

      alert(error.message);
      return;

    }




    setMembroId("");

    carregarEscala();



  }









  async function confirmar(id:number,valor:boolean){


    await supabase

      .from("escala")

      .update({

        confirmado:!valor

      })

      .eq("id",id);



    carregarEscala();


  }










  async function excluir(id:number){


    await supabase

      .from("escala")

      .delete()

      .eq("id",id);



    carregarEscala();


  }








  function cultoNome(id:number){


    const c=cultos.find(

      x=>x.id===id

    );


    return c
      ? c.nome
      : "";

  }








  return(

    <div className="text-white">


      <h1 className="text-3xl font-bold mb-6">

        👥 Escala

      </h1>





      {erro && (

        <div className="bg-red-600 p-3 rounded-xl mb-5">

          {erro}

        </div>

      )}







      <div className="bg-zinc-900 p-5 rounded-xl">


        <h2 className="text-xl font-bold mb-4">

          ➕ Adicionar membro

        </h2>





        <select

          className="w-full bg-zinc-800 p-3 rounded mb-3"

          value={cultoId}

          onChange={(e)=>setCultoId(e.target.value)}

        >

          <option value="">

            Escolha o culto

          </option>


          {cultos.map(c=>(

            <option key={c.id} value={c.id}>

              {c.nome} - {c.data}

            </option>

          ))}


        </select>






        <select

          className="w-full bg-zinc-800 p-3 rounded mb-3"

          value={membroId}

          onChange={(e)=>setMembroId(e.target.value)}

        >

          <option value="">

            {membros.length
            ? "Escolha o membro"
            : "Nenhum membro encontrado"}

          </option>


          {membros.map(m=>(

            <option key={m.id} value={m.id}>

              {m.nome} - {m.funcao}

            </option>

          ))}


        </select>






        <button

          onClick={adicionar}

          className="bg-blue-600 px-5 py-3 rounded-xl"

        >

          Cadastrar escala

        </button>



      </div>









      <div className="mt-6 space-y-4">


        {escala.map(e=>(


          <div

            key={e.id}

            className="bg-zinc-900 p-5 rounded-xl"

          >


            <h2 className="text-xl font-bold">

              👤 {e.membro}

            </h2>


            <p>

              🎵 {e.funcao}

            </p>


            <p>

              ⛪ {cultoNome(e.culto_id)}

            </p>


            <button

              onClick={()=>confirmar(
                e.id,
                e.confirmado
              )}

              className="mt-3"

            >

              {e.confirmado
              ? "✅ Confirmado"
              : "⏳ Pendente"}

            </button>


            <button

              onClick={()=>excluir(e.id)}

              className="block text-red-500 mt-3"

            >

              🗑 Excluir

            </button>


          </div>


        ))}


      </div>


    </div>

  );


}