"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../../lib/supabase";


type Membro = {
  id:number;
  nome:string;
  funcao:string;
  status:string;
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


const [membros,setMembros]=useState<Membro[]>([]);
const [cultos,setCultos]=useState<Culto[]>([]);
const [escala,setEscala]=useState<Escala[]>([]);



const [nome,setNome]=useState("");
const [funcao,setFuncao]=useState("");

const [cultoId,setCultoId]=useState("");
const [membroId,setMembroId]=useState("");




useEffect(()=>{

carregarMembros();
carregarCultos();
carregarEscala();

},[]);






async function carregarMembros(){


const {data}=await supabase
.from("membros")
.select("*")
.order("nome");


setMembros(data || []);

}






async function carregarCultos(){


const {data}=await supabase
.from("cultos")
.select("*")
.order("id");


setCultos(data || []);

}







async function carregarEscala(){


const {data,error}=await supabase
.from("escala")
.select(`
*,
membros(*),
cultos(*)
`)
.order("id");



if(error){

console.log(error);
return;

}



setEscala(data || []);


}






async function criarMembro(){


if(!nome || !funcao){

return;

}



const {error}=await supabase
.from("membros")
.insert({

nome,
funcao,
status:"ativo"

});



if(error){

alert(error.message);
return;

}



setNome("");
setFuncao("");

carregarMembros();


}

async function adicionarEscala(){


if(!cultoId || !membroId){

return;

}



const membro =
membros.find(
(m)=>m.id === Number(membroId)
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








async function confirmar(
id:number,
valor:boolean
){



const {error}=await supabase
.from("escala")
.update({

confirmado:!valor

})
.eq("id",id);



if(error){

alert(error.message);
return;

}



carregarEscala();


}








async function removerEscala(id:number){



const confirmarRemover = window.confirm(
"Remover este integrante da escala?"
);



if(!confirmarRemover){

return;

}



const {error}=await supabase
.from("escala")
.delete()
.eq("id",id);



if(error){

alert(error.message);
return;

}



carregarEscala();


}









return (

<div className="p-6 text-white">


<h1 className="text-3xl font-bold mb-6">
👥 Escala do Ministério
</h1>







<div className="bg-zinc-900 p-5 rounded-xl mb-6">


<h2 className="font-bold mb-3">
Cadastrar membro
</h2>



<input
className="w-full p-3 bg-zinc-800 rounded mb-3"
placeholder="Nome"
value={nome}
onChange={(e)=>setNome(e.target.value)}
/>




<input
className="w-full p-3 bg-zinc-800 rounded mb-3"
placeholder="Função (Vocal, Violão...)"
value={funcao}
onChange={(e)=>setFuncao(e.target.value)}
/>




<button
onClick={criarMembro}
className="bg-blue-600 px-5 py-3 rounded"
>

Adicionar membro

</button>


</div>









<div className="bg-zinc-900 p-5 rounded-xl mb-6">


<h2 className="font-bold mb-3">
Criar escala
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

Adicionar na escala

</button>



</div>









<div className="space-y-4">


{escala.map((e)=>(



<div
key={e.id}
className="bg-zinc-900 p-5 rounded-xl"
>



<h2 className="font-bold text-xl">
{e.membros?.nome}
</h2>



<p>
🎤 {e.funcao}
</p>



<p>
⛪ {e.cultos?.nome}
</p>





<button
onClick={()=>confirmar(e.id,e.confirmado)}
className="bg-blue-600 px-4 py-2 rounded mt-3"
>

{e.confirmado
? "✅ Confirmado"
: "Confirmar presença"}

</button>





<button
onClick={()=>removerEscala(e.id)}
className="bg-red-600 px-4 py-2 rounded mt-3 ml-3"
>

❌ Remover

</button>



</div>


))}



</div>



</div>

);


}