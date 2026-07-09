"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import { useRouter } from "next/navigation";


export default function AuthGuard({
 children
}:{
 children:React.ReactNode
}){


const router = useRouter();

const [carregando,setCarregando]=useState(true);



useEffect(()=>{


verificar();


},[]);




async function verificar(){


const {data}=await supabase.auth.getSession();



if(!data.session){

router.push("/login");

return;

}



setCarregando(false);


}





if(carregando){

return (

<div className="text-white p-10">
Carregando...
</div>

)

}




return children;


}