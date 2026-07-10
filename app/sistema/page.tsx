"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";


type Aviso = {
  id:number;
  titulo:string;
  mensagem:string;
};


type Louvor = {
  id:number;
  nome:string;
  artista:string;
  tom:string;
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
  status:string;
  repertorio:Louvor[];
  equipe:{
    membros:Membro;
    funcao:string;
    confirmado:boolean;
  }[];
};



export default function SistemaPage(){


const [usuario,setUsuario] = useState<any>(null);

const [avisos,setAvisos] = useState<Aviso[]>([]);

const [culto,setCulto] = useState<Culto|null>(null);




useEffect(()=>{

carregarUsuario();
carregarAvisos();
carregarCulto();

},[]);





async function carregarUsuario(){


const {
data:{user}
}=await supabase.auth.getUser();


setUsuario(user);


}







async function carregarAvisos(){


const {data,error}=await supabase
.from("avisos")
.select("*")
.order("id",{ascending:false})
.limit(5);



if(error){

console.log(error);
return;

}


setAvisos(data || []);


}







async function carregarCulto(){


const {data,error}=await supabase
.from("cultos")
.select("*")
.order("id",{ascending:false})
.limit(1)
.single();



if(error){

console.log(error);
return;

}




const {data:repertorio}=await supabase
.from("culto_louvores")
.select(`
louvores(*)
`)
.eq("culto_id",data.id);





const {data:equipe}=await supabase
.from("escala")
.select(`
funcao,
confirmado,
membros(*)
`)
.eq("culto_id",data.id);





setCulto({

...data,

repertorio:
repertorio?.map((r:any)=>r.louvores) || [],

equipe:equipe || []

});


}






return (


<div className="text-white space-y-6">



<div className="bg-zinc-900 p-6 rounded-2xl">


<h1 className="text-3xl font-bold">
🙏 Bem-vindo ao LouvorHub
</h1>


<p className="text-zinc-400 mt-2">
Organização do Ministério de Louvor
</p>



{usuario && (

<p className="text-blue-400 mt-3">
Logado como: {usuario.email}
</p>

)}


</div>






{culto && (

<div className="bg-zinc-900 p-6 rounded-2xl">


<h2 className="text-2xl font-bold">
⛪ Próximo Culto
</h2>


<p className="mt-2">
{culto.nome}
</p>


<p>
📅 {culto.data} - ⏰ {culto.horario}
</p>




<h3 className="font-bold mt-5">
🎵 Repertório
</h3>


{culto.repertorio.map((l)=>(

<p key={l.id}>
🎵 {l.nome} - {l.tom}
</p>

))}






<h3 className="font-bold mt-5">
👥 Escala
</h3>



{culto.equipe.map((e:any)=>(

<p key={e.membros.id}>
👤 {e.membros.nome} - {e.funcao}
{e.confirmado ? " ✅":" ⏳"}
</p>

))}



</div>

)}





<div className="bg-blue-950 p-6 rounded-2xl">


<h2 className="text-2xl font-bold">
📢 Avisos
</h2>



{avisos.length === 0 && (

<p className="mt-3 text-zinc-300">
Nenhum aviso publicado.
</p>

)}



{avisos.map((a)=>(

<div key={a.id} className="mt-4 bg-zinc-900 p-4 rounded-xl">


<h3 className="font-bold">
{a.titulo}
</h3>


<p className="text-zinc-300">
{a.mensagem}
</p>


</div>

))}



</div>




</div>


);


}