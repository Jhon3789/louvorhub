"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";


export default function Protecao({
  children,
}: {
  children: React.ReactNode;
}) {


  const router = useRouter();

  const [carregando, setCarregando] = useState(true);



  useEffect(() => {


    const usuario = localStorage.getItem("usuario");


    if (!usuario) {

      router.push("/login");

    } else {

      setCarregando(false);

    }


  }, [router]);




  if (carregando) {

    return (
      <div className="min-h-screen bg-zinc-900 text-white flex items-center justify-center">
        Carregando...
      </div>
    );

  }



  return children;


}