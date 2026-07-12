"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";


type Escala = {
  id:number;
  membro:string;
  funcao:string;
  confirmado:boolean;
};


export default function DashboardPage(){


const [escala,setEscala] = useState<Escala[]>([]);
const [culto,setCulto] = useState<any>(null);
const [totalLouvores,setTotalLouvores] = useState(0);



useEffect(()=>{

carregar();

},[]);



async function carregar(){


const {data:cultoAtual}= await supabase

.from("cultos")

.select("*")

.order("data",{ascending:true})

.limit(1)

.single();



setCulto(cultoAtual);





const {count}= await supabase

.from("louvores")

.select("*",{count:"exact",head:true});


setTotalLouvores(count || 0);






if(cultoAtual){


const {data}= await supabase

.from("escala")

.select(`
id,
confirmado,
membros(
nome,
funcao
)
`)

.eq("culto_id",cultoAtual.id);





const lista = (data || []).map((item:any)=>({


id:item.id,

membro:item.membros?.nome || "Sem nome",

funcao:item.membros?.funcao || "Sem função",

confirmado:item.confirmado


}));



setEscala(lista);


}



}



return (

<div className="space-y-6">


<h1 className="text-4xl font-bold text-yellow-400">

🎵 LouvorHub

</h1>


<p className="text-zinc-400">

Ministério de Louvor

</p>





<div className="grid md:grid-cols-3 gap-5">


<div className="bg-white/5 p-5 rounded-xl">

<p>🎶 Louvores</p>

<h2 className="text-3xl font-bold text-yellow-400">

{totalLouvores}

</h2>

</div>





<div className="bg-white/5 p-5 rounded-xl">

<p>⛪ Próximo Culto</p>

<h2 className="font-bold">

{culto?.nome || "Nenhum"}

</h2>

<p>

{culto?.horario}

</p>

</div>






<div className="bg-white/5 p-5 rounded-xl">

<p>👥 Escala</p>

<h2 className="text-3xl font-bold text-yellow-400">

{escala.length}

</h2>

</div>



</div>







<div className="bg-[#111827] p-6 rounded-xl">


<h2 className="text-xl text-yellow-400 font-bold mb-4">

👥 Equipe escalada

</h2>



{escala.length === 0 && (

<p className="text-zinc-400">

Nenhuma pessoa escalada

</p>

)}



{escala.map((p)=>(


<div 
key={p.id}
className="bg-white/5 p-3 rounded-lg mb-3"
>


👤 <b>{p.membro}</b>

<span className="text-zinc-400">

{" "}• {p.funcao}

</span>


<span className="ml-3">

{p.confirmado ? "✅" : "⏳"}

</span>


</div>


))}



</div>




</div>

);


}