"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../../lib/supabase";


type Sugestao = {
  id:number;
  nome:string;
  artista:string;
  link:string;
  votos:number;
  status:string;
};



export default function SugestoesPage(){


const [sugestoes,setSugestoes] = useState<Sugestao[]>([]);


const [nome,setNome] = useState("");
const [artista,setArtista] = useState("");
const [link,setLink] = useState("");





useEffect(()=>{

carregarSugestoes();

},[]);







async function carregarSugestoes(){


const {data,error}=await supabase
.from("sugestoes")
.select("*")
.order("votos",{ascending:false});



if(error){

console.log(error);
return;

}



setSugestoes(data || []);


}









async function enviarSugestao(){


if(!nome){

alert("Digite o nome do louvor");
return;

}



const {error}=await supabase
.from("sugestoes")
.insert({

nome,
artista,
link,
votos:0,
status:"aguardando"

});



if(error){

alert(error.message);
return;

}



setNome("");
setArtista("");
setLink("");

carregarSugestoes();


}









async function votar(
id:number,
votos:number
){



const {error}=await supabase
.from("sugestoes")
.update({

votos:votos+1

})
.eq("id",id);



if(error){

alert(error.message);
return;

}



carregarSugestoes();


}









async function aprovarSugestao(
sugestao:Sugestao
){



const {error:erroLouvor}=await supabase
.from("louvores")
.insert({

nome:sugestao.nome,
artista:sugestao.artista,
link:sugestao.link,
tom:"",
letra:"",
cifra:""

});



if(erroLouvor){

alert(erroLouvor.message);
return;

}






const {error}=await supabase
.from("sugestoes")
.update({

status:"aprovado"

})
.eq("id",sugestao.id);




if(error){

alert(error.message);
return;

}



carregarSugestoes();


}










return (

<div className="p-6 text-white">


<h1 className="text-3xl font-bold mb-6">
💡 Sugestões de Louvores
</h1>






<div className="bg-zinc-900 p-5 rounded-xl space-y-3">



<input
className="w-full p-3 bg-zinc-800 rounded"
placeholder="Nome do louvor"
value={nome}
onChange={(e)=>setNome(e.target.value)}
/>





<input
className="w-full p-3 bg-zinc-800 rounded"
placeholder="Artista"
value={artista}
onChange={(e)=>setArtista(e.target.value)}
/>





<input
className="w-full p-3 bg-zinc-800 rounded"
placeholder="Link YouTube"
value={link}
onChange={(e)=>setLink(e.target.value)}
/>





<button
onClick={enviarSugestao}
className="bg-blue-600 px-5 py-3 rounded"
>

Enviar sugestão

</button>



</div>









{["aguardando","aprovado"].map((statusAtual)=>(


<div key={statusAtual} className="mt-8">


<h2 className="text-2xl font-bold mb-4">

{statusAtual === "aguardando"
? "⏳ Sugestões pendentes"
: "✅ Louvores aprovados"}

</h2>





{sugestoes
.filter((s)=>s.status === statusAtual)
.map((s)=>(



<div
key={s.id}
className="bg-zinc-900 p-5 rounded-xl mb-4"
>



<h3 className="text-xl font-bold">
🎵 {s.nome}
</h3>



<p>
🎤 {s.artista}
</p>



<p>
👍 Votos: {s.votos}
</p>



<p>
Status: {s.status}
</p>







{s.status === "aguardando" && (

<>


<button
onClick={()=>votar(s.id,s.votos)}
className="bg-green-600 px-4 py-2 rounded mt-3"
>

👍 Votar

</button>





<button
onClick={()=>aprovarSugestao(s)}
className="bg-blue-600 px-4 py-2 rounded mt-3 ml-2"
>

✅ Aprovar

</button>


</>

)}







{s.link && (

<a
href={s.link}
target="_blank"
className="block bg-red-600 px-4 py-2 rounded mt-3 text-center"
>

▶ Ouvir

</a>

)}





</div>


))}





</div>


))}





</div>

);


}