"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../../lib/supabase";


type Membro = {
  id:number;
  nome:string;
  funcao:string;
};


type Culto = {
  id:number;
  nome:string;
  data:string;
  horario:string;
};


type Escala = {
  id:number;
  culto_id:number;
  membro_id:number;
  funcao:string;
  confirmado:boolean;
  membros:Membro;
  cultos:Culto;
};



export default function EscalaPage(){


const [escala,setEscala]=useState<Escala[]>([]);




useEffect(()=>{

 carregarEscala();

},[]);





async function carregarEscala(){


const {data,error}=await supabase
.from("escala")
.select(`
 *,
 membros(*),
 cultos(*)
`)
.order("culto_id");



if(error){

console.log(error);
return;

}


setEscala(data || []);

}





async function confirmar(id:number,valor:boolean){


await supabase
.from("escala")
.update({

confirmado: !valor

})
.eq("id",id);



carregarEscala();


}





const cultos = Array.from(
  new Map(
    escala.map(e=>[
      e.cultos.id,
      e.cultos
    ])
  ).values()
);






return (

<div className="p-6 text-white">


<h1 className="text-3xl font-bold mb-6">
👥 Escala do Ministério
</h1>




<div className="space-y-6">



{cultos.map(culto=>(


<div
key={culto.id}
className="bg-zinc-900 p-6 rounded-xl"
>


<h2 className="text-2xl font-bold">
⛪ {culto.nome}
</h2>


<p className="text-zinc-400 mb-4">
📅 {culto.data} - {culto.horario}
</p>




<div className="space-y-3">



{escala
.filter(e=>e.culto_id === culto.id)
.map(e=>(


<div
key={e.id}
className="bg-zinc-800 p-4 rounded-lg"
>


<h3 className="font-bold text-lg">
{e.membros?.nome}
</h3>


<p>
🎤 {e.funcao}
</p>



<button
onClick={()=>confirmar(e.id,e.confirmado)}
className="bg-blue-600 px-4 py-2 rounded mt-3"
>

{e.confirmado
? "✅ Confirmado"
: "⏳ Confirmar presença"}

</button>


</div>


))}



</div>



</div>


))}



</div>



</div>

);


}