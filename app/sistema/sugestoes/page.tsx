"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";


type Sugestao = {
  id:number;
  nome:string;
  artista:string;
  status:string;
  votos:number;
  link:string;
};



export default function SugestoesPage(){


  const [sugestoes,setSugestoes] = useState<Sugestao[]>([]);

  const [nome,setNome] = useState("");
  const [artista,setArtista] = useState("");
  const [link,setLink] = useState("");

  const [admin,setAdmin] = useState(false);





  useEffect(()=>{

    carregar();

    verificarAdmin();

  },[]);






  async function verificarAdmin(){


    const {

      data:{user}

    } = await supabase.auth.getUser();



    if(!user) return;



    const {data} = await supabase

      .from("usuarios")

      .select("tipo")

      .eq("email",user.email)

      .single();



    if(data?.tipo === "admin"){

      setAdmin(true);

    }


  }







  async function carregar(){


    const {data} = await supabase

      .from("sugestoes")

      .select("*")

      .order("id",{ascending:false});



    setSugestoes(data || []);


  }







  async function criarSugestao(){


    if(!nome || !artista){

      alert("Preencha nome e artista");

      return;

    }



    await supabase

      .from("sugestoes")

      .insert({

        nome,
        artista,
        link,
        status:"aguardando",
        votos:0

      });



    setNome("");
    setArtista("");
    setLink("");

    carregar();


  }







  async function votar(id:number, votos:number){



    await supabase

      .from("sugestoes")

      .update({

        votos:votos + 1

      })

      .eq("id",id);



    carregar();


  }







  async function aprovar(sugestao:Sugestao){



    await supabase

      .from("sugestoes")

      .update({

        status:"aprovada"

      })

      .eq("id",sugestao.id);






    await supabase

      .from("louvores")

      .insert({

        nome:sugestao.nome,

        artista:sugestao.artista,

        link:sugestao.link,

        tom:"",

        letra:""

      });



    carregar();


  }







  return(


    <div className="text-white">


      <h1 className="text-3xl font-bold mb-6">

        🎵 Sugestões de Louvores

      </h1>







      <div className="bg-zinc-900 p-5 rounded-xl mb-6">


        <h2 className="text-xl font-bold mb-4">

          Nova sugestão

        </h2>





        <input

          className="w-full bg-zinc-800 p-3 rounded mb-3"

          placeholder="Nome do louvor"

          value={nome}

          onChange={(e)=>setNome(e.target.value)}

        />





        <input

          className="w-full bg-zinc-800 p-3 rounded mb-3"

          placeholder="Artista"

          value={artista}

          onChange={(e)=>setArtista(e.target.value)}

        />





        <input

          className="w-full bg-zinc-800 p-3 rounded mb-3"

          placeholder="Link"

          value={link}

          onChange={(e)=>setLink(e.target.value)}

        />





        <button

          onClick={criarSugestao}

          className="bg-blue-600 px-5 py-3 rounded"

        >

          Enviar sugestão

        </button>



      </div>







      <div className="space-y-4">



      {sugestoes.map((s)=>(


        <div

          key={s.id}

          className="bg-zinc-900 p-5 rounded-xl"

        >



          <h2 className="text-xl font-bold">

            {s.nome}

          </h2>



          <p>

            {s.artista}

          </p>



          <p>

            👥 Votos: {s.votos}

          </p>



          <p>

            Status: {s.status}

          </p>





          <button

            onClick={()=>votar(s.id,s.votos)}

            className="bg-green-600 px-4 py-2 rounded mt-3"

          >

            👍 Votar

          </button>






          {admin && s.status !== "aprovada" && (

            <button

              onClick={()=>aprovar(s)}

              className="bg-blue-600 px-4 py-2 rounded mt-3 ml-3"

            >

              ✅ Aprovar

            </button>

          )}





        </div>


      ))}



      </div>




    </div>


  );


}