"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";


type Sugestao = {
  id: number;
  nome: string;
  artista: string;
  status: string;
  votos: number;
  link: string;
};



export default function SugestoesPage() {


  const [sugestoes, setSugestoes] = useState<Sugestao[]>([]);

  const [nome, setNome] = useState("");
  const [artista, setArtista] = useState("");
  const [link, setLink] = useState("");

  const [admin, setAdmin] = useState(false);





  useEffect(() => {

    carregarSugestoes();
    verificarAdmin();

  }, []);







  async function verificarAdmin() {


    const {
      data: { user }

    } = await supabase.auth.getUser();




    if (!user) return;






    const { data, error } = await supabase

      .from("usuarios")

      .select("nivel")

      .eq("email", user.email)

      .single();





    console.log("PERFIL:", data);
    console.log("ERRO:", error);





    if (data?.nivel === "admin") {

      setAdmin(true);

    }


  }







  async function carregarSugestoes() {


    const { data, error } = await supabase

      .from("sugestoes")

      .select("*")

      .order("id", { ascending: false });





    if (error) {

      console.log(error);
      return;

    }




    setSugestoes(data || []);


  }







  async function criarSugestao() {


    if (!nome || !artista) {

      alert("Preencha nome e artista");
      return;

    }






    const { error } = await supabase

      .from("sugestoes")

      .insert({

        nome,

        artista,

        link,

        status: "aguardando",

        votos: 0

      });





    if (error) {

      alert(error.message);
      return;

    }





    setNome("");
    setArtista("");
    setLink("");

    carregarSugestoes();


  }







  async function votar(id:number, votos:number) {


    const { error } = await supabase

      .from("sugestoes")

      .update({

        votos: votos + 1

      })

      .eq("id", id);





    if(error){

      alert(error.message);
      return;

    }



    carregarSugestoes();


  }








  async function aprovar(sugestao:Sugestao) {



    const { error: erroStatus } = await supabase

      .from("sugestoes")

      .update({

        status: "aprovada"

      })

      .eq("id", sugestao.id);






    if(erroStatus){

      alert(erroStatus.message);
      return;

    }







    const { error: erroLouvor } = await supabase

      .from("louvores")

      .insert({

        nome: sugestao.nome,

        artista: sugestao.artista,

        link: sugestao.link,

        tom: "",

        letra: ""

      });






    if(erroLouvor){

      alert(erroLouvor.message);
      return;

    }




    carregarSugestoes();


  }









  return (


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

          📤 Enviar sugestão

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

              className="bg-green-600 px-4 py-2 rounded mt-4"

            >

              👍 Votar

            </button>








            {admin && s.status !== "aprovada" && (



              <button

                onClick={()=>aprovar(s)}

                className="bg-blue-600 px-4 py-2 rounded mt-4 ml-3"

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