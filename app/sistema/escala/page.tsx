"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../../lib/supabase";


type Usuario = {
  id: string;
  nome: string;
  funcao: string;
};


type Culto = {
  id: number;
  nome: string;
  data: string;
  horario: string;
};


type Escala = {
  id: number;
  culto_id: number;
  membro_id: string;
  funcao: string;
  confirmado: boolean;
  usuarios: Usuario;
  cultos: Culto;
};



export default function EscalaPage() {


  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [cultos, setCultos] = useState<Culto[]>([]);
  const [escala, setEscala] = useState<Escala[]>([]);


  const [cultoId, setCultoId] = useState("");
  const [membroId, setMembroId] = useState("");



  useEffect(() => {

    carregarUsuarios();
    carregarCultos();
    carregarEscala();

  }, []);





  async function carregarUsuarios() {

    const { data, error } = await supabase
      .from("usuarios")
      .select("*")
      .order("nome");


    if(error){
      console.log(error);
      return;
    }


    setUsuarios(data || []);

  }







  async function carregarCultos() {

    const { data, error } = await supabase
      .from("cultos")
      .select("*")
      .order("id");


    if(error){
      console.log(error);
      return;
    }


    setCultos(data || []);

  }








  async function carregarEscala() {


    const { data, error } = await supabase
      .from("escala")
      .select(`
        *,
        usuarios(*),
        cultos(*)
      `)
      .order("id");



    if(error){

      console.log(error);
      return;

    }



    setEscala(data || []);

  }








  async function adicionarEscala() {


    if(!cultoId || !membroId){
      return;
    }



    const usuario = usuarios.find(
      u => u.id === membroId
    );



    const { error } = await supabase
      .from("escala")
      .insert({

        culto_id: Number(cultoId),
        membro_id: membroId,
        funcao: usuario?.funcao || ""

      });




    if(error){

      alert(error.message);
      return;

    }



    carregarEscala();


  }








  async function confirmar(id:number, valor:boolean){


    await supabase
      .from("escala")
      .update({

        confirmado: !valor

      })
      .eq("id", id);



    carregarEscala();


  }








  return (

    <div className="p-6 text-white">


      <h1 className="text-3xl font-bold mb-6">
        👥 Escala do Ministério
      </h1>





      <div className="bg-zinc-900 p-5 rounded-xl mb-6">


        <h2 className="font-bold mb-3">
          Criar escala
        </h2>





        <select
          className="w-full p-3 bg-zinc-800 rounded mb-3"
          onChange={(e)=>setCultoId(e.target.value)}
        >

          <option>
            Escolha o culto
          </option>


          {cultos.map(c=>(

            <option
              key={c.id}
              value={c.id}
            >

              {c.nome} - {c.data}

            </option>

          ))}


        </select>






        <select
          className="w-full p-3 bg-zinc-800 rounded mb-3"
          onChange={(e)=>setMembroId(e.target.value)}
        >

          <option>
            Escolha integrante
          </option>



          {usuarios.map(u=>(

            <option
              key={u.id}
              value={u.id}
            >

              {u.nome} - {u.funcao}

            </option>

          ))}


        </select>






        <button
          onClick={adicionarEscala}
          className="bg-green-600 px-5 py-3 rounded"
        >
          Adicionar na escala
        </button>


      </div>








      <div className="space-y-4">


        {escala.map(e=>(


          <div
            key={e.id}
            className="bg-zinc-900 p-5 rounded-xl"
          >


            <h2 className="text-xl font-bold">
              {e.usuarios?.nome}
            </h2>


            <p>
              🎤 {e.funcao}
            </p>


            <p>
              ⛪ {e.cultos?.nome}
            </p>



            <button
              onClick={()=>confirmar(e.id,e.confirmado)}
              className="bg-blue-600 px-4 py-2 rounded mt-3"
            >

              {e.confirmado
                ? "✅ Confirmado"
                : "Confirmar presença"}

            </button>



          </div>


        ))}


      </div>


    </div>

  );

}