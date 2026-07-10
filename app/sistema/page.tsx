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
};



export default function SistemaPage(){


const [usuario,setUsuario] = useState<any>(null);

const [avisos,setAvisos] = useState<Aviso[]>([]);

const [culto,setCulto] = useState<any>(null);


const [totalLouvores,setTotalLouvores] = useState(0);
const [totalCultos,setTotalCultos] = useState(0);
const [totalMembros,setTotalMembros] = useState(0);
const [totalAvisos,setTotalAvisos] = useState(0);






useEffect(()=>{

carregarUsuario();
carregarDashboard();

},[]);






async function carregarUsuario(){

const {
data:{user}
}=await supabase.auth.getUser();

setUsuario(user);

}








async function carregarDashboard(){


carregarContadores();
carregarAvisos();
carregarCulto();


}









async function carregarContadores(){


const louvores = await supabase
.from("louvores")
.select("*",{count:"exact",head:true});


const cultos = await supabase
.from("cultos")
.select("*",{count:"exact",head:true});


const membros = await supabase
.from("membros")
.select("*",{count:"exact",head:true});


const avisos = await supabase
.from("avisos")
.select("*",{count:"exact",head:true});



setTotalLouvores(louvores.count || 0);
setTotalCultos(cultos.count || 0);
setTotalMembros(membros.count || 0);
setTotalAvisos(avisos.count || 0);


}









async function carregarAvisos(){


const {data}=await supabase
.from("avisos")
.select("*")
.order("id",{ascending:false})
.limit(5);


setAvisos(data || []);


}









async function carregarCulto(){



const {data}=await supabase
.from("cultos")
.select("*")
.order("id",{ascending:false})
.limit(1)
.single();



if(!data) return;




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
{usuario.email}
</p>

)}


</div>








<div className="grid md:grid-cols-4 gap-4">



<div className="bg-zinc-900 p-5 rounded-xl">
<h2 className="text-3xl font-bold">
{totalLouvores}
</h2>
<p>🎵 Louvores</p>
</div>



<div className="bg-zinc-900 p-5 rounded-xl">
<h2 className="text-3xl font-bold">
{totalCultos}
</h2>
<p>⛪ Cultos</p>
</div>




<div className="bg-zinc-900 p-5 rounded-xl">
<h2 className="text-3xl font-bold">
{totalMembros}
</h2>
<p>👥 Integrantes</p>
</div>



<div className="bg-zinc-900 p-5 rounded-xl">
<h2 className="text-3xl font-bold">
{totalAvisos}
</h2>
<p>📢 Avisos</p>
</div>



</div>








{culto && (

<div className="bg-zinc-900 p-6 rounded-xl">


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


{culto.repertorio.map((l:Louvor)=>(

<p key={l.id}>
🎵 {l.nome} - Tom {l.tom}
</p>

))}






<h3 className="font-bold mt-5">
👥 Escala
</h3>


{culto.equipe.map((e:any)=>(

<p key={e.membros.id}>
👤 {e.membros.nome} - {e.funcao}
</p>

))}


</div>

)}









<div className="bg-blue-950 p-6 rounded-xl">


<h2 className="text-2xl font-bold">
📢 Últimos Avisos
</h2>



{avisos.map((a)=>(

<div key={a.id} className="mt-3">

<p className="font-bold">
{a.titulo}
</p>

<p>
{a.mensagem}
</p>

</div>

))}



</div>






</div>

);


}