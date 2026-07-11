"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../../lib/supabase";


type Louvor = {
  id: number;
  nome: string;
  artista: string;
  tom: string;
  letra: string;
  cifra: string;
  link: string;
};



export default function LouvoresPage() {


  const [louvores, setLouvores] = useState<Louvor[]>([]);


  const [nome,setNome] = useState("");
  const [artista,setArtista] = useState("");
  const [tom,setTom] = useState("");
  const [letra,setLetra] = useState("");
  const [cifra,setCifra] = useState("");
  const [link,setLink] = useState("");




  async function carregarLouvores(){


    const {data,error} = await supabase
      .from("louvores")
      .select("*")
      .order("id",{ascending:false});



    if(error){

      alert(error.message);
      return;

    }



    setLouvores(data || []);

  }





  useEffect(()=>{

    carregarLouvores();

  },[]);







  async function adicionarLouvor(){


    if(!nome.trim()){

      alert("Digite o nome do louvor");
      return;

    }




    const {data,error} = await supabase
      .from("louvores")
      .insert({

        nome,
        artista,
        tom,
        letra,
        cifra,
        link

      })
      .select();




    if(error){

      alert(error.message);
      console.log(error);
      return;

    }





    if(data){


      setLouvores([

        data[0],
        ...louvores

      ]);


    }




    setNome("");
    setArtista("");
    setTom("");
    setLetra("");
    setCifra("");
    setLink("");



    alert("🎵 Louvor cadastrado com sucesso!");

  }








  async function excluir(id:number){



    const confirmar = confirm(
      "Deseja realmente excluir este louvor?"
    );



    if(!confirmar) return;





    const {error} = await supabase
      .from("louvores")
      .delete()
      .eq("id",id);




    if(error){

      alert(error.message);
      return;

    }





    setLouvores(

      louvores.filter(
        (l)=>l.id !== id
      )

    );



  }







  return (


    <div className="p-6 text-white">


      <h1 className="text-3xl font-bold mb-6">
        🎵 Louvores
      </h1>





      <div className="bg-zinc-900 p-5 rounded-xl space-y-3">



        <input

          className="w-full p-3 bg-zinc-800 rounded"

          placeholder="Nome do louvor"

          value={nome}

          onChange={(e)=>setNome(e.target.value)}

        />




        <input

          className="w-full p-3 bg-zinc-800 rounded"

          placeholder="Artista"

          value={artista}

          onChange={(e)=>setArtista(e.target.value)}

        />





        <input

          className="w-full p-3 bg-zinc-800 rounded"

          placeholder="Tom"

          value={tom}

          onChange={(e)=>setTom(e.target.value)}

        />





        <textarea

          className="w-full p-3 bg-zinc-800 rounded"

          placeholder="Letra"

          value={letra}

          onChange={(e)=>setLetra(e.target.value)}

        />





        <textarea

          className="w-full p-3 bg-zinc-800 rounded"

          placeholder="Cifra"

          value={cifra}

          onChange={(e)=>setCifra(e.target.value)}

        />





        <input

          className="w-full p-3 bg-zinc-800 rounded"

          placeholder="Link YouTube"

          value={link}

          onChange={(e)=>setLink(e.target.value)}

        />






        <button

          onClick={adicionarLouvor}

          className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-xl"

        >

          ➕ Adicionar Louvor

        </button>



      </div>








      <div className="mt-6 space-y-4">



        {louvores.map((l)=>(




          <div

            key={l.id}

            className="bg-zinc-900 p-5 rounded-xl"

          >




            <h2 className="text-2xl font-bold">

              {l.nome}

            </h2>





            <p>

              🎤 {l.artista}

            </p>





            <p>

              🎸 Tom: {l.tom}

            </p>







            <details className="mt-4">


              <summary className="cursor-pointer">

                📖 Ver letra e cifra

              </summary>





              <p className="whitespace-pre-line mt-3">

                {l.letra}

              </p>





              <p className="whitespace-pre-line mt-3">

                {l.cifra}

              </p>



            </details>








            {l.link && (



              <a

                href={l.link}

                target="_blank"

                rel="noopener noreferrer"

                className="block bg-red-600 hover:bg-red-700 p-3 rounded-xl mt-4 text-center"

              >

                ▶ Ouvir no YouTube

              </a>



            )}







            <button

              onClick={()=>excluir(l.id)}

              className="text-red-500 mt-4"

            >

              🗑 Excluir

            </button>






          </div>



        ))}



      </div>





    </div>


  );


}