"use client";

import { useEffect, useState } from "react";


type Integrante = {
  id:number;
  nome:string;
  funcao:string;
  presenca:string;
};



export default function Escala(){


  const [integrantes,setIntegrantes] = useState<Integrante[]>([]);




  useEffect(()=>{


    const salvo = localStorage.getItem("integrantes");



    if(salvo){


      const lista = JSON.parse(salvo).map((p:any)=>({


        id:p.id,

        nome:p.nome,

        funcao:p.funcao,

        presenca:p.presenca || "Aguardando"


      }));



      setIntegrantes(lista);



    }else{



      const lista:Integrante[]=[


        {
          id:1,
          nome:"Jhonny",
          funcao:"Vocal",
          presenca:"Aguardando"
        },


        {
          id:2,
          nome:"Mariam",
          funcao:"Vocal",
          presenca:"Aguardando"
        },


        {
          id:3,
          nome:"Andrea",
          funcao:"Vocal",
          presenca:"Aguardando"
        },


        {
          id:4,
          nome:"Angelica",
          funcao:"Vocal",
          presenca:"Aguardando"
        },


        {
          id:5,
          nome:"Darwin",
          funcao:"Teclado",
          presenca:"Aguardando"
        },


        {
          id:6,
          nome:"Jhean",
          funcao:"Bateria",
          presenca:"Aguardando"
        },


        {
          id:7,
          nome:"Jhonnielys",
          funcao:"Violão",
          presenca:"Aguardando"
        }


      ];



      salvar(lista);


    }



  },[]);







  function salvar(lista:Integrante[]){


    setIntegrantes(lista);


    localStorage.setItem(

      "integrantes",

      JSON.stringify(lista)

    );


  }







  function mudarPresenca(

    id:number,

    status:string

  ){


    const lista = integrantes.map((p)=>{


      if(p.id===id){


        return {


          ...p,

          presenca:status


        };


      }



      return p;


    });



    salvar(lista);


  }







  function icone(funcao:string){


    if(funcao==="Vocal")
      return "🎤";


    if(funcao==="Teclado")
      return "🎹";


    if(funcao==="Bateria")
      return "🥁";


    if(funcao==="Violão")
      return "🎸";


    return "🎵";


  }








  return (


    <main className="p-10 text-white">


      <h1 className="text-3xl font-bold">

        👥 Escala do Ministério

      </h1>



      <p className="mt-2 text-zinc-400">

        Confirmação de presença dos integrantes.

      </p>






      <div className="mt-8 space-y-4">



      {integrantes.map((p)=>(


        <div

          key={p.id}

          className="rounded-xl bg-zinc-800 p-5 flex justify-between items-center"

        >



          <div>


            <h2 className="text-xl font-bold">

              👤 {p.nome}

            </h2>



            <p className="mt-2">

              {icone(p.funcao)} {p.funcao}

            </p>



            <p className="mt-2 text-zinc-400">

              Presença: {p.presenca}

            </p>



          </div>







          <div className="flex gap-2">


            <button

              onClick={()=>mudarPresenca(

                p.id,

                "Confirmado"

              )}

              className="rounded-lg bg-green-600 px-3 py-2"

            >

              ✅ Vou

            </button>





            <button

              onClick={()=>mudarPresenca(

                p.id,

                "Não vou"

              )}

              className="rounded-lg bg-red-600 px-3 py-2"

            >

              ❌ Não vou

            </button>



          </div>



        </div>


      ))}



      </div>



    </main>


  );


}