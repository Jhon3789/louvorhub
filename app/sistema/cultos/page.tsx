"use client";

import { useEffect, useState } from "react";

type Louvor = {
  id: number;
  nome: string;
  artista: string;
  tom: string;
};

type Culto = {
  id: number;
  tipo: string;
  dia: string;
  horario: string;
  repertorio: Louvor[];
};

export default function CultosPage() {

  const [cultos, setCultos] = useState<Culto[]>([]);
  const [louvores, setLouvores] = useState<Louvor[]>([]);

  const [tipo, setTipo] = useState("");
  const [dia, setDia] = useState("");
  const [horario, setHorario] = useState("");


  useEffect(() => {

    const cultosSalvos = localStorage.getItem("cultos");
    const louvoresSalvos = localStorage.getItem("louvores");


    if (cultosSalvos) {

      const dados = JSON.parse(cultosSalvos);

      const corrigidos = dados.map((culto:any)=>({
        ...culto,
        repertorio: culto.repertorio || []
      }));

      setCultos(corrigidos);

    }


    if (louvoresSalvos) {
      setLouvores(JSON.parse(louvoresSalvos));
    }


  }, []);



  function salvar(lista:Culto[]) {

    setCultos(lista);

    localStorage.setItem(
      "cultos",
      JSON.stringify(lista)
    );

  }



  function criarCulto(){

    if(!tipo || !dia || !horario) return;


    const novo:Culto = {

      id: Date.now(),
      tipo,
      dia,
      horario,
      repertorio:[]

    };


    salvar([
      ...cultos,
      novo
    ]);


    setTipo("");
    setDia("");
    setHorario("");

  }




  function adicionarLouvor(
    cultoId:number,
    louvor:Louvor
  ){

    const lista = cultos.map((culto)=>{

      if(culto.id === cultoId){

        const existe =
          culto.repertorio.some(
            (l)=>l.id === louvor.id
          );


        if(existe) return culto;


        return {

          ...culto,

          repertorio:[
            ...culto.repertorio,
            louvor
          ]

        };

      }


      return culto;

    });


    salvar(lista);

  }




  function removerLouvor(
    cultoId:number,
    louvorId:number
  ){

    const lista = cultos.map((culto)=>{

      if(culto.id === cultoId){

        return {

          ...culto,

          repertorio:
          culto.repertorio.filter(
            (l)=>l.id !== louvorId
          )

        };

      }


      return culto;

    });


    salvar(lista);

  }





  function moverLouvor(
    cultoId:number,
    index:number,
    direcao:number
  ){

    const lista = cultos.map((culto)=>{

      if(culto.id === cultoId){

        const repertorio = [
          ...culto.repertorio
        ];


        const novoIndex =
          index + direcao;


        if(
          novoIndex < 0 ||
          novoIndex >= repertorio.length
        ){
          return culto;
        }


        const temp =
          repertorio[index];


        repertorio[index] =
          repertorio[novoIndex];


        repertorio[novoIndex] =
          temp;



        return {
          ...culto,
          repertorio
        };

      }


      return culto;

    });


    salvar(lista);

  }




  return (

    <div className="p-6 text-white">


      <h1 className="text-3xl font-bold mb-6">
        ⛪ Cultos
      </h1>



      <div className="bg-zinc-900 p-5 rounded-xl mb-6">


        <input
          className="w-full p-3 mb-3 bg-zinc-800 rounded"
          placeholder="Nome do culto"
          value={tipo}
          onChange={(e)=>setTipo(e.target.value)}
        />


        <input
          className="w-full p-3 mb-3 bg-zinc-800 rounded"
          placeholder="Dia"
          value={dia}
          onChange={(e)=>setDia(e.target.value)}
        />


        <input
          className="w-full p-3 mb-3 bg-zinc-800 rounded"
          placeholder="Horário"
          value={horario}
          onChange={(e)=>setHorario(e.target.value)}
        />


        <button
          onClick={criarCulto}
          className="bg-blue-600 px-5 py-3 rounded"
        >
          Criar Culto
        </button>


      </div>





      {cultos.map((culto)=>(

        <div
          key={culto.id}
          className="bg-zinc-900 p-5 rounded-xl mb-6"
        >

          <h2 className="text-2xl font-bold">
            {culto.tipo}
          </h2>


          <p>
            📅 {culto.dia} - ⏰ {culto.horario}
          </p>




          <h3 className="font-bold mt-5">
            🎵 Repertório
          </h3>



          {culto.repertorio.map((l,index)=>(

            <div
              key={l.id}
              className="bg-zinc-800 p-3 rounded mt-2"
            >

              <p>
                {index+1}. 🎵 {l.nome}
              </p>

              <p>
                Tom: {l.tom}
              </p>



              <div className="flex gap-2 mt-3">


                <button
                  onClick={()=>
                    moverLouvor(
                      culto.id,
                      index,
                      -1
                    )
                  }
                  className="bg-blue-600 px-3 py-1 rounded"
                >
                  ⬆️
                </button>


                <button
                  onClick={()=>
                    moverLouvor(
                      culto.id,
                      index,
                      1
                    )
                  }
                  className="bg-green-600 px-3 py-1 rounded"
                >
                  ⬇️
                </button>


                <button
                  onClick={()=>
                    removerLouvor(
                      culto.id,
                      l.id
                    )
                  }
                  className="bg-red-600 px-3 py-1 rounded"
                >
                  ❌
                </button>


              </div>


            </div>

          ))}





          <h3 className="font-bold mt-6">
            Adicionar louvor
          </h3>


          {louvores.map((l)=>(

            <button
              key={l.id}
              onClick={()=>
                adicionarLouvor(
                  culto.id,
                  l
                )
              }
              className="block w-full text-left bg-zinc-800 p-3 rounded mt-2"
            >

              🎵 {l.nome}

            </button>

          ))}



        </div>

      ))}


    </div>

  );

}