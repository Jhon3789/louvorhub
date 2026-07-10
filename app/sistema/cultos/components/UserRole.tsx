"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";


export default function UserRole(){

const [usuario,setUsuario] = useState<any>(null);



useEffect(()=>{

buscarUsuario();

},[]);




async function buscarUsuario(){


const {
data:{user}
}=await supabase.auth.getUser();



if(!user) return;




const {data}=await supabase
.from("membros")
.select("*")
.eq("email",user.email)
.single();



setUsuario(data);



}



if(!usuario){

return null;

}



return (

<div className="text-sm text-zinc-400">

{usuario.nome} • {usuario.tipo}

</div>

);


}