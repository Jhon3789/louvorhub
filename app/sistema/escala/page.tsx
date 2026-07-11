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
  status:string;
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








  useEffect(()=>{


    carregarCultos();
    async function carregarMembros(){


  const {data,error}= await supabase

    .from("membros")
    .select("*")
    .order("nome");



  if(error){

    alert(error.message);
    return;

  }



  console.log("Membros encontrados:", data);


  setMembros(data || []);


}
    carregarEscala();


  },[]);









  async function carregarCultos(){


    const {data,error}= await supabase

      .from("cultos")
      .select("*")
      .order("data",{ascending:true});



    if(error){

      alert(error.message);
      return;

    }


    setCultos(data || []);


  }








  async function carregarMembros(){



    const {data,error}= await supabase

      .from("membros")
      .select("*")
      .eq("status","Ativo")
      .order("nome");




    if(error){

      alert(error.message);
      return;

    }



    setMembros(data || []);


  }








  async function carregarEscala(){



    const {data,error}= await supabase

      .from("escala")
      .select("*")
      .order("id",{ascending:false});



    if(error){

      alert(error.message);
      return;

    }



    setEscala(data || []);



  }









  async function adicionarEscala(){



    if(!cultoId || !membroId){

      alert("Escolha o culto e o membro");
      return;

    }





    const membroEscolhido = membros.find(

      (m)=>m.id === Number(membroId)

    );





    if(!membroEscolhido){

      alert("Membro não encontrado");
      return;

    }







    const {error}= await supabase

      .from("escala")

      .insert({

        culto_id:Number(cultoId),

        membro:membroEscolhido.nome,

        funcao:membroEscolhido.funcao,

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



    const confirmar = confirm(
      "Deseja excluir este membro da escala?"
    );



    if(!confirmar)return;






    await supabase

      .from("escala")

      .delete()

      .eq("id",id);





    carregarEscala();



  }









  function nomeCulto(id:number){



    const culto = cultos.find(

      (c)=>c.id===id

    );



    if(!culto)return "";



    return `${culto.nome} - ${culto.data}`;


  }









  return(


    <div className="text-white">


      <h1 className="text-3xl font-bold mb-6">

        👥 Escala

      </h1>








      <div className="bg-zinc-900 p-5 rounded-xl mb-8">


        <h2 className="text-xl font-bold mb-4">

          ➕ Nova escala

        </h2>








        <select

          className="w-full bg-zinc-800 p-3 rounded mb-3"

          value={cultoId}

          onChange={(e)=>setCultoId(e.target.value)}

        >


          <option value="">

            Escolha o culto

          </option>




          {cultos.map((c)=>(


            <option

              key={c.id}

              value={c.id}

            >

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

            Escolha o membro

          </option>





          {membros.map((m)=>(


            <option

              key={m.id}

              value={m.id}

            >

              {m.nome} - {m.funcao}

            </option>


          ))}



        </select>








        <button

          onClick={adicionarEscala}

          className="bg-blue-600 px-5 py-3 rounded-xl"

        >

          Cadastrar escala

        </button>





      </div>









      <div className="space-y-5">



        {escala.map((p)=>(



          <div

            key={p.id}

            className="bg-zinc-900 p-5 rounded-xl"

          >




            <h2 className="text-xl font-bold">

              👤 {p.membro}

            </h2>





            <p>

              🎯 {p.funcao}

            </p>





            <p>

              ⛪ {nomeCulto(p.culto_id)}

            </p>






            <button

              onClick={()=>confirmar(
                p.id,
                p.confirmado
              )}

              className="mt-3"

            >

              {p.confirmado

              ? "✅ Confirmado"

              : "⏳ Aguardando"}

            </button>







            <button

              onClick={()=>excluir(p.id)}

              className="block text-red-500 mt-4"

            >

              🗑 Excluir

            </button>





          </div>


        ))}



      </div>





    </div>


  );


}