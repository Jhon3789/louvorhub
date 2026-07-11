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



export default function CultosPage(){


  const [cultos,setCultos] = useState<Culto[]>([]);

  const [nome,setNome] = useState("");
  const [data,setData] = useState("");
  const [horario,setHorario] = useState("");
  const [status,setStatus] = useState("Agendado");





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







  async function cadastrarCulto(){



    if(!nome || !data || !horario){

      alert("Preencha todos os campos");
      return;

    }





    const {error} = await supabase

      .from("cultos")

      .insert({

        nome,

        data,

        horario,

        status

      });





    if(error){

      alert(error.message);
      return;

    }





    setNome("");
    setData("");
    setHorario("");
    setStatus("Agendado");


    carregarCultos();


  }







  async function excluirCulto(id:number){



    const confirmar = confirm(
      "Deseja excluir este culto?"
    );



    if(!confirmar) return;






    await supabase

      .from("culto_louvores")

      .delete()

      .eq("culto_id",id);







    await supabase

      .from("escala")

      .delete()

      .eq("culto_id",id);







    const {error} = await supabase

      .from("cultos")

      .delete()

      .eq("id",id);





    if(error){

      alert(error.message);
      return;

    }




    carregarCultos();


  }







  return(


    <div className="text-white">


      <h1 className="text-3xl font-bold mb-6">

        ⛪ Cultos

      </h1>







      <div className="bg-zinc-900 p-5 rounded-xl mb-8">


        <h2 className="text-xl font-bold mb-4">

          ➕ Novo Culto

        </h2>






        <input

          className="w-full bg-zinc-800 p-3 rounded mb-3"

          placeholder="Nome do culto"

          value={nome}

          onChange={(e)=>setNome(e.target.value)}

        />





        <input

          type="date"

          className="w-full bg-zinc-800 p-3 rounded mb-3"

          value={data}

          onChange={(e)=>setData(e.target.value)}

        />




<div className="mb-3">

  <label className="block text-sm text-zinc-400 mb-2">
    🕒 Horário do culto
  </label>

  <input

    type="time"

    className="w-full bg-zinc-800 p-3 rounded"

    value={horario}

    onChange={(e)=>setHorario(e.target.value)}

  />

</div>






        <select

          className="w-full bg-zinc-800 p-3 rounded mb-3"

          value={status}

          onChange={(e)=>setStatus(e.target.value)}

        >

          <option>Agendado</option>

          <option>Confirmado</option>

          <option>Realizado</option>

          <option>Cancelado</option>


        </select>






        <button

          onClick={cadastrarCulto}

          className="bg-blue-600 px-5 py-3 rounded"

        >

          Cadastrar Culto

        </button>



      </div>









      <div className="space-y-6">



        {cultos.map((culto)=>(



          <div

            key={culto.id}

            className="bg-zinc-900 p-5 rounded-xl"

          >



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





            <CultoDetalhes cultoId={culto.id}/>






            <button

              onClick={()=>excluirCulto(culto.id)}

              className="bg-red-600 px-4 py-2 rounded mt-5"

            >

              🗑 Excluir culto

            </button>






          </div>



        ))}



      </div>





    </div>


  );


}








function CultoDetalhes({cultoId}:{cultoId:number}){


  const [louvores,setLouvores] = useState<any[]>([]);
  const [escala,setEscala] = useState<any[]>([]);






  useEffect(()=>{

    carregarDetalhes();

  },[]);







  async function carregarDetalhes(){





    const {data:ligacoes} = await supabase

      .from("culto_louvores")

      .select("louvor_id")

      .eq("culto_id",cultoId);






    if(ligacoes && ligacoes.length){



      const ids = ligacoes.map((item:any)=>item.louvor_id);




      const {data} = await supabase

        .from("louvores")

        .select("*")

        .in("id",ids);




      setLouvores(data || []);



    }







    const {data:listaEscala} = await supabase

      .from("escala")

      .select("*")

      .eq("culto_id",cultoId);





    setEscala(listaEscala || []);




  }







  return(


    <div className="mt-5">



      <h3 className="text-xl font-bold">

        🎵 Louvores

      </h3>




      {louvores.length === 0 && (

        <p className="text-zinc-400">

          Nenhum louvor selecionado.

        </p>

      )}




      {louvores.map((l)=>(


        <p key={l.id}>

          🎶 {l.nome} - {l.artista}

          {l.tom && ` (Tom ${l.tom})`}

        </p>


      ))}








      <h3 className="text-xl font-bold mt-5">

        👥 Escala

      </h3>





      {escala.length === 0 && (

        <p className="text-zinc-400">

          Nenhuma escala cadastrada.

        </p>

      )}





      {escala.map((p)=>(


        <p key={p.id}>

          👤 {p.membro} - {p.funcao}

          {p.confirmado ? " ✅" : " ⏳"}

        </p>


      ))}





    </div>


  );


}