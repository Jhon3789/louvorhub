"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

type Usuario = {
  id: string;
  nome: string;
  email: string;
  funcao: string;
  nivel: string;
};

export default function EquipePage() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [funcao, setFuncao] = useState("");
  const [nivel, setNivel] = useState("membro");


  useEffect(() => {
    carregarUsuarios();
  }, []);


  async function carregarUsuarios() {
    const { data, error } = await supabase
      .from("usuarios")
      .select("*")
      .order("nome");


    if (error) {
      console.log(error);
      return;
    }

    setUsuarios(data || []);
  }



  async function adicionarUsuario() {

    if (!nome || !funcao) return;


    const { error } = await supabase
      .from("usuarios")
      .insert({
        nome,
        email,
        funcao,
        nivel,
      });


    if (error) {
      alert(error.message);
      return;
    }


    setNome("");
    setEmail("");
    setFuncao("");

    carregarUsuarios();

  }



  return (
    <div className="p-6 text-white">

      <h1 className="text-3xl font-bold mb-6">
        👥 Equipe do Ministério
      </h1>


      <div className="bg-zinc-900 p-5 rounded-xl mb-6">

        <h2 className="font-bold mb-4">
          Adicionar integrante
        </h2>


        <input
          className="w-full p-3 bg-zinc-800 rounded mb-3"
          placeholder="Nome"
          value={nome}
          onChange={(e)=>setNome(e.target.value)}
        />


        <input
          className="w-full p-3 bg-zinc-800 rounded mb-3"
          placeholder="Email"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
        />


        <input
          className="w-full p-3 bg-zinc-800 rounded mb-3"
          placeholder="Função (Vocal, Teclado...)"
          value={funcao}
          onChange={(e)=>setFuncao(e.target.value)}
        />


        <select
          className="w-full p-3 bg-zinc-800 rounded mb-3"
          value={nivel}
          onChange={(e)=>setNivel(e.target.value)}
        >
          <option value="membro">
            Membro
          </option>

          <option value="admin">
            Administrador
          </option>

        </select>


        <button
          onClick={adicionarUsuario}
          className="bg-blue-600 px-5 py-3 rounded"
        >
          Adicionar
        </button>


      </div>



      <div className="space-y-4">

        {usuarios.map((u)=>(

          <div
            key={u.id}
            className="bg-zinc-900 p-5 rounded-xl"
          >

            <h2 className="text-xl font-bold">
              {u.nome}
            </h2>

            <p>
              🎤 {u.funcao}
            </p>

            <p>
              📧 {u.email}
            </p>

            <p>
              🔑 {u.nivel}
            </p>

          </div>

        ))}

      </div>


    </div>
  );
}