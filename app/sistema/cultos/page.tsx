"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../../lib/supabase";


type Louvor = {
  id:number;
  nome:string;
  artista:string;
  tom:string;
  link?:string;
};


type Equipe = {
  id:number;
  confirmado:boolean;
  membros:{
    id:number;
    nome:string;
    funcao:string;
  };
};


type Culto = {
  id:number;
  nome:string;
  data:string;
  horario:string;
  status:string;
  repertorio:Louvor[];
  equipe:Equipe[];
};



export default function CultosPage(){


const [cultos,setCultos] = useState<Culto[]>([]);
const [louvores,setLouvores] = useState<Louvor[]>([]);


const [nome,setNome] = useState("");
const [data,setData] = useState("");
const [horario,setHorario] = useState("");




useEffect(()=>{

carregarLouvores();
carregarCultos();

},[]);





async function carregarLouvores(){


const {data,error}=await supabase
.from("louvores")
.select("*")
.order("id");


if(error){

console.log(error);
return;

}


setLouvores(data || []);

}






async function buscarEquipe(cultoId:number){


const {data,error}=await supabase
.from("escala")
.select(`
 id,
 confirmado,
 membros(
 id,
 nome,
 funcao
 )
`)
.eq("culto_id",cultoId);



if(error){

console.log(error);
return [];

}


return data || [];

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
repertorio?.map((item:any)=>item.louvores) || [],

equipe:
await buscarEquipe(culto.id)

};


})

);



setCultos(lista);


}








async function criarCulto(){


if(!nome || !data || !horario){

alert("Preencha todos os campos");
return;

}



const {data:novo,error}=await supabase
.from("cultos")
.insert({

nome,
data,
horario,
status:"planejado"

})
.select()
.single();



if(error){

alert(error.message);
return;

}



setCultos([

...cultos,

{
...novo,
repertorio:[],
equipe:[]
}

]);



setNome("");
setData("");
setHorario("");

}
async function removerCulto(id:number){


const confirmar = window.confirm(
"Tem certeza que deseja remover este culto?"
);



if(!confirmar){

return;

}



// remove repertório do culto
await supabase
.from("culto_louvores")
.delete()
.eq("culto_id",id);




// remove escala do culto
await supabase
.from("escala")
.delete()
.eq("culto_id",id);




// remove culto
const {error}=await supabase
.from("cultos")
.delete()
.eq("id",id);



if(error){

alert(error.message);
return;

}



carregarCultos();


}









async function adicionarLouvor(
cultoId:number,
louvor:Louvor
){



const {error}=await supabase
.from("culto_louvores")
.insert({

culto_id:cultoId,
louvor_id:louvor.id

});



if(error){

alert(error.message);
return;

}



carregarCultos();


}









async function removerLouvor(
cultoId:number,
louvorId:number
){



const {error}=await supabase
.from("culto_louvores")
.delete()
.eq("culto_id",cultoId)
.eq("louvor_id",louvorId);



if(error){

alert(error.message);
return;

}



carregarCultos();


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
value={nome}
onChange={(e)=>setNome(e.target.value)}
/>



<input
className="w-full p-3 mb-3 bg-zinc-800 rounded"
placeholder="Data"
value={data}
onChange={(e)=>setData(e.target.value)}
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
{culto.nome}
</h2>


<p>
📅 {culto.data} - ⏰ {culto.horario}
</p>


<p>
Status: {culto.status}
</p>





<button
onClick={()=>removerCulto(culto.id)}
className="bg-red-600 px-4 py-2 rounded mt-4"
>

❌ Remover culto

</button>







<h3 className="font-bold mt-5">
🎵 Repertório
</h3>





{culto.repertorio.map((l)=>(


<div
key={l.id}
className="bg-zinc-800 p-3 rounded mt-3"
>


<p className="font-bold">
🎵 {l.nome}
</p>


<p>
🎤 {l.artista}
</p>


<p>
🎸 Tom: {l.tom}
</p>



<button
onClick={()=>removerLouvor(culto.id,l.id)}
className="text-red-500 mt-2"
>

❌ Remover

</button>


</div>


))}









<h3 className="font-bold mt-6">
👥 Escala
</h3>





{culto.equipe.map((e)=>(


<div
key={e.id}
className="bg-zinc-800 p-3 rounded mt-2"
>


<p>
👤 {e.membros.nome}
</p>


<p>
🎤 {e.membros.funcao}
</p>


<p>
{e.confirmado
? "✅ Confirmado"
: "⏳ Aguardando"}

</p>


</div>


))}









<h3 className="font-bold mt-6">
Adicionar louvor
</h3>





{louvores.map((l)=>(


<button

key={l.id}

onClick={()=>adicionarLouvor(culto.id,l)}

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