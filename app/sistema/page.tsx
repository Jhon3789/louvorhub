"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    console.log("Página inicial carregou");

    setTimeout(() => {
      console.log("Indo para login");
      router.replace("/login");
    }, 2000);
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-950 text-white">
      <p>Carregando...</p>
    </div>
  );
}