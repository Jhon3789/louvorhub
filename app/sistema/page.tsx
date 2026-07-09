"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "./lib/supabase";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    let ativo = true;

    async function verificar() {
      try {
        const { data } = await supabase.auth.getSession();

        if (!ativo) return;

        if (data.session) {
          router.replace("/sistema");
        } else {
          router.replace("/login");
        }
      } catch (error) {
        console.error(error);
        router.replace("/login");
      }
    }

    verificar();

    return () => {
      ativo = false;
    };
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-950 text-white">
      <p>Carregando...</p>
    </div>
  );
}