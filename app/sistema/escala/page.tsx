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
  repertorio:any[];
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


const [membros,setMembros]=useState<Membro[]>([]);
const [cultos,setCultos]=useState<Culto[]>([]);
const [escala,setEscala]=useState<Escala[]>([]);


const [cultoId,setCultoId]=useState("");
const [membroId,setMembroId]=useState("");





useEffect(()=>{

carregarMembros();
carregarCultos();
carregarEscala();

},[]);







async function carregarMembros(){


const {data,error}=await supabase
.from("membros")
.select("*")
.order("nome");


if(error){

console.log(error);
return;

}


setMembros(data || []);


}








async function carregarCultos(){


const {data,error}=await supabase
.from("cultos")
.select("*")
.order("id");


if(error){

console.log(error);
return;

}


const lista = await Promise.all(

(data || []).map(async(culto:any)=>{


const {data:repertorio}=await supabase
.from("culto_louvores")
.select("louvores(*)")
.eq("culto_id",culto.id);



return {

...culto,

repertorio:
repertorio?.map((r:any)=>r.louvores) || []

};


})

);



setCultos(lista);


}









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




const lista = await Promise.all(

(data || []).map(async(item:any)=>{


const {data:repertorio}=await supabase
.from("culto_louvores")
.select("louvores(*)")
.eq("culto_id",item.culto_id);



return {

...item,

cultos:{

...item.cultos,

repertorio:
repertorio?.map((r:any)=>r.louvores) || []

}

};


})

);



setEscala(lista);


}









async function adicionarEscala(){


if(!cultoId || !membroId)
return;



const membro = membros.find(
m=>m.id === Number(membroId)
);



const {error}=await supabase
.from("escala")
.insert({

culto_id:Number(cultoId),
membro_id:Number(membroId),
funcao:membro?.funcao || "",
confirmado:false

});



if(error){

alert(error.message);
return;

}



carregarEscala();


}









async function confirmar(id:number,valor:boolean){


await supabase
.from("escala")
.update({

confirmado:!valor

})
.eq("id",id);



carregarEscala();


}








const grupos = cultos.map(culto=>({


culto,


membros:

escala.filter(
e=>e.culto_id === culto.id
)


}));









return (

<div className="p-6 text-white">


<h1 className="text-3xl font-bold mb-6">
👥 Escala do Ministério
</h1>






<div className="bg-zinc-900 p-5 rounded-xl mb-6">


<h2 className="font-bold mb-3">
Adicionar na escala
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
Escolha o membro
</option>


{membros.map(m=>(

<option
key={m.id}
value={m.id}
>

{m.nome} - {m.funcao}

</option>

))}


</select>





<button
onClick={adicionarEscala}
className="bg-green-600 px-5 py-3 rounded"
>

Adicionar

</button>



</div>









{grupos.map(g=>(


<div
key={g.culto.id}
className="bg-zinc-900 p-6 rounded-xl mb-6"
>


<h2 className="text-2xl font-bold">
⛪ {g.culto.nome}
</h2>


<p className="text-zinc-400">
📅 {g.culto.data} - ⏰ {g.culto.horario}
</p>





<h3 className="font-bold mt-5">
👥 Equipe
</h3>




{g.membros.map(e=>(


<div
key={e.id}
className="bg-zinc-800 p-4 rounded mt-3"
>


<h3 className="font-bold">
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
?"✅ Confirmado"
:"⏳ Confirmar presença"}

</button>



</div>


))}








<h3 className="font-bold mt-6">
🎵 Repertório
</h3>




{g.culto.repertorio?.map((l:any)=>(


<div
key={l.id}
className="bg-zinc-800 p-3 rounded mt-2"
>


<p>
🎶 {l.nome}
</p>


<p>
🎤 {l.artista}
</p>


<p>
🎸 Tom: {l.tom}
</p>


</div>


))}





</div>


))}





</div>

);


}