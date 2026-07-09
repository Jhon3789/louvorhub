"use client";

import { supabase } from "../../lib/supabase";
import { useRouter } from "next/navigation";


export default function LogoutButton(){


const router = useRouter();



async function sair(){

await supabase.auth.signOut();

router.push("/login");

}



return (

<button

onClick={sair}

className="w-full p-3 rounded-xl bg-red-600 hover:bg-red-700 transition"

>

🚪 Sair

</button>

);


}