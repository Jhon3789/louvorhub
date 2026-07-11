"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";


type Culto={
  id:number;
  nome:string;
  data:string;
  horario:string;
  status:string;
};


type Louvor={
  id:number;
  nome:string;
  artista:string;
  tom:string;
};


type Membro={
  id:number;
  nome:string;
  funcao:string;
};


type Escala={
  id:number;
  culto_id:number;
  membro_id:number;
  confirmado:boolean;
};


type CultoLouvor={
  id:number;
  culto_id:number;
  louvor_id:number;
};




export default function CultosPage(){


const [cultos,setCultos]=useState<Culto[]>([]);
const [louvores,setLouvores]=useState<Louvor[]>([]);
const [membros,setMembros]=useState<Membro[]>([]);
const [escala,setEscala]=useState<Escala[]>([]);
const [cultoLouvores,setCultoLouvores]=useState<CultoLouvor[]>([]);


const [nome,setNome]=useState("");
const [data,setData]=useState("");
const [horario,setHorario]=useState("");
const [status,setStatus]=useState("Agendado");


const [cultoId,setCultoId]=useState<number|null>(null);
const [selecionados,setSelecionados]=useState<number[]>([]);





useEffect(()=>{

carregar();

},[]);






async function carregar(){


const c=await supabase
.from("cultos")
.select("*")
.order("data");


setCultos(c.data||[]);





const l=await supabase
.from("louvores")
.select("*")
.order("nome");


setLouvores(l.data||[]);





const m=await supabase
.from("membros")
.select("id,nome,funcao")
.order("nome");


setMembros(m.data||[]);





const e=await supabase
.from("escala")
.select("*");


setEscala(e.data||[]);





const cl=await supabase
.from("culto_louvores")
.select("*");


setCultoLouvores(cl.data||[]);



}






async function criarCulto(){


if(!nome || !data || !horario){

alert("Preencha os campos");
return;

}


const {error}=await supabase
.from("cultos")
.insert({

nome,
data,
horario,
status

});



if(error){

alert(error.message);
return;

}



setNome("");
setData("");
setHorario("");

carregar();


}





function marcarLouvor(id:number){


if(selecionados.includes(id)){


setSelecionados(
selecionados.filter(x=>x!==id)
);


}else{


setSelecionados([
...selecionados,
id
]);


}


}





async function salvarRepertorio(){


if(!cultoId || selecionados.length===0){

alert("Escolha o culto e os louvores");
return;

}



const lista=selecionados.map(id=>({

culto_id:cultoId,
louvor_id:id

}));



const {error}=await supabase
.from("culto_louvores")
.insert(lista);



if(error){

alert(error.message);
return;

}


alert("Repertório salvo");

setSelecionados([]);

carregar();


}
function nomeMembro(id:number){


const m=membros.find(

(x)=>x.id===id

);


return m;


}







function repertorioCulto(id:number){


return cultoLouvores

.filter(

(c)=>c.culto_id===id

)

.map(c=>

louvores.find(

(l)=>l.id===c.louvor_id

)

)

.filter(Boolean);


}








return(


<div className="text-white">



<h1 className="text-3xl font-bold mb-6">

⛪ Cultos

</h1>







<div className="bg-zinc-900 p-5 rounded-xl mb-6">



<h2 className="text-xl font-bold mb-4">

➕ Novo Culto

</h2>




<input

className="w-full bg-zinc-800 p-3 rounded mb-3"

placeholder="Nome do culto"

value={nome}

onChange={e=>setNome(e.target.value)}

/>




<input

type="date"

className="w-full bg-zinc-800 p-3 rounded mb-3"

value={data}

onChange={e=>setData(e.target.value)}

/>




<input

type="time"

className="w-full bg-zinc-800 p-3 rounded mb-3"

value={horario}

onChange={e=>setHorario(e.target.value)}

/>





<select

className="w-full bg-zinc-800 p-3 rounded mb-3"

value={status}

onChange={e=>setStatus(e.target.value)}

>


<option>

Agendado

</option>


<option>

Confirmado

</option>


<option>

Realizado

</option>


<option>

Cancelado

</option>


</select>





<button

onClick={criarCulto}

className="bg-blue-600 px-5 py-3 rounded-xl"

>

Cadastrar Culto

</button>



</div>









<div className="bg-zinc-900 p-5 rounded-xl mb-6">



<h2 className="text-xl font-bold">

🎵 Escolher Repertório

</h2>





<select

className="w-full bg-zinc-800 p-3 rounded my-3"

onChange={e=>setCultoId(Number(e.target.value))}

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







<div className="space-y-2">


{louvores.map(l=>(


<label

key={l.id}

className="block"

>


<input

type="checkbox"

checked={
selecionados.includes(l.id)
}

onChange={()=>marcarLouvor(l.id)}

/>


{" "}

🎵 {l.nome} - {l.artista}

{l.tom && ` (Tom ${l.tom})`}



</label>



))}


</div>






<button

onClick={salvarRepertorio}

className="bg-green-600 px-5 py-3 rounded-xl mt-4"

>

Salvar Repertório

</button>




</div>









<div className="space-y-5">



{cultos.map(c=>(


<div

key={c.id}

className="bg-zinc-900 p-5 rounded-xl"

>





<h2 className="text-2xl font-bold">

⛪ {c.nome}

</h2>




<p>

📅 {c.data}

</p>




<p>

🕒 {c.horario}

</p>








<h3 className="font-bold mt-5">

🎵 Repertório

</h3>





{repertorioCulto(c.id).map((l:any)=>(


<p key={l.id}>

🎶 {l.nome}

- {l.artista}

{l.tom && ` (Tom ${l.tom})`}


</p>



))}






{repertorioCulto(c.id).length===0 && (

<p className="text-zinc-400">

Nenhum louvor selecionado.

</p>

)}








<h3 className="font-bold mt-5">

👥 Escala

</h3>





{escala

.filter(e=>e.culto_id===c.id)

.map(e=>{


const m=nomeMembro(e.membro_id);



return(


<p key={e.id}>


👤 {m?.nome}

- {m?.funcao}


{e.confirmado

? " ✅"

: " ⏳"

}



</p>


)



})}






</div>



))}



</div>






</div>


);


}