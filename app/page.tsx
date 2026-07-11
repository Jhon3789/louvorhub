"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";


type Escala = {
  id:number;
  culto_id:number;
  membro_id:number;
  confirmado:boolean;
};


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




export default function Home(){


const [cultos,setCultos]=useState<Culto[]>([]);
const [escala,setEscala]=useState<Escala[]>([]);
const [membros,setMembros]=useState<Membro[]>([]);






useEffect(()=>{

carregar();

},[]);







async function carregar(){


const c=await supabase

.from("cultos")
.select("*")
.order("data")
.limit(5);



setCultos(c.data||[]);





const e=await supabase

.from("escala")
.select("*");


setEscala(e.data||[]);






const m=await supabase

.from("membros")
.select("id,nome,funcao");


setMembros(m.data||[]);



}







function buscarMembro(id:number){


return membros.find(

(m)=>m.id===id

);


}







return(


<div className="text-white p-6">



<h1 className="text-3xl font-bold mb-6">

🎵 LouvorHub

</h1>







<div className="grid md:grid-cols-3 gap-4 mb-8">



<div className="bg-zinc-900 p-5 rounded-xl">

<h2 className="text-xl">

⛪ Cultos

</h2>

<p className="text-3xl font-bold">

{cultos.length}

</p>

</div>






<div className="bg-zinc-900 p-5 rounded-xl">

<h2 className="text-xl">

👥 Escala

</h2>

<p className="text-3xl font-bold">

{escala.length}

</p>

</div>







<div className="bg-zinc-900 p-5 rounded-xl">

<h2 className="text-xl">

🎶 Louvor

</h2>

<p className="text-3xl font-bold">

--

</p>

</div>




</div>









<div className="bg-zinc-900 p-5 rounded-xl mb-6">


<h2 className="text-2xl font-bold mb-4">

📅 Próximos Cultos

</h2>




{cultos.map(c=>(


<div key={c.id} className="mb-3">


<p className="font-bold">

⛪ {c.nome}

</p>


<p>

📅 {c.data} 🕒 {c.horario}

</p>



<h3 className="font-bold mt-3">

👥 Escala

</h3>



{escala

.filter(e=>e.culto_id===c.id)

.map(e=>{


const m=buscarMembro(e.membro_id);



return(

<p key={e.id}>

👤 {m?.nome}

- {m?.funcao}

{e.confirmado
? " ✅"
: " ⏳"}

</p>


)



})}



</div>


))}



</div>






</div>


);


}