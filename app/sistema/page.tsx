"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "./lib/supabase";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    async function verificar() {
      const { data } = await supabase.auth.getSession();

      if (data.session) {
        router.replace("/sistema");
      } else {
        router.replace("/login");
      }
    }

    verificar();
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-950 text-white">
      <p>Carregando...</p>
    </div>
  );
}