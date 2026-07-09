"use client";

import { useState } from "react";
import { supabase } from "../../lib/supabase";
import { useRouter } from "next/navigation";


export default function LoginPage(){

const router = useRouter();


const [email,setEmail] = useState("");
const [senha,setSenha] = useState("");



async function entrar(){


const {error}=await supabase.auth.signInWithPassword({

email,
password:senha

});



if(error){

alert(error.message);
return;

}


router.push("/");


}




return (

<div className="min-h-screen flex items-center justify-center p-6 text-white">


<div className="bg-zinc-900 p-8 rounded-xl w-full max-w-md">


<h1 className="text-3xl font-bold mb-6 text-center">
✝️ LouvorHub
</h1>



<input

className="w-full p-3 bg-zinc-800 rounded mb-3"

placeholder="Email"

value={email}

onChange={(e)=>setEmail(e.target.value)}

/>



<input

type="password"

className="w-full p-3 bg-zinc-800 rounded mb-3"

placeholder="Senha"

value={senha}

onChange={(e)=>setSenha(e.target.value)}

/>



<button

onClick={entrar}

className="w-full bg-blue-600 p-3 rounded"

>

Entrar

</button>



</div>


</div>

);


}