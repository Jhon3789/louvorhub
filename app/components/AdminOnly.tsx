"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";


export default function AdminOnly({

children

}:{

children: React.ReactNode;

}){


const [admin,setAdmin] = useState(false);

const [carregando,setCarregando] = useState(true);



useEffect(()=>{

verificarAdmin();

},[]);





async function verificarAdmin(){


const {
data:{user}

}=await supabase.auth.getUser();



if(!user){

setCarregando(false);
return;

}




const {data,error}=await supabase
.from("membros")
.select("tipo")
.eq("email",user.email)
.single();




if(!error && data?.tipo==="admin"){

setAdmin(true);

}



setCarregando(false);


}





if(carregando){

return null;

}





if(!admin){

return null;

}




return (

<>

{children}

</>

);


}