"use client";

import { useEffect, useState } from "react";
import AdminOnly from "@/components/AdminOnly";

type Usuario = {
  id: string;
  nome: string;
  email: string;
  funcao: string;
  tipo: string;
  status: string;
};



export default function EquipePage() {


  const [usuarios, setUsuarios] = useState<Usuario[]>([]);

  const [nome,setNome] = useState("");
  const [email,setEmail] = useState("");
  const [senha,setSenha] = useState("");
  const [funcao,setFuncao] = useState("");
  const [tipo,setTipo] = useState("membro");
  const [status] = useState("ativo");





  useEffect(()=>{

    carregarUsuarios();

  },[]);






  async function carregarUsuarios(){


    const resposta = await fetch("/api/usuarios");

    const dados = await resposta.json();

    setUsuarios(dados || []);


  }







  async function criarUsuario(){



    if(!nome || !email || !senha){

      alert("Preencha nome, email e senha");
      return;

    }





    const resposta = await fetch("/api/usuarios",{

      method:"POST",

      headers:{
        "Content-Type":"application/json"
      },

      body:JSON.stringify({

        nome,
        email,
        senha,
        funcao,
        tipo,
        status

      })

    });





    const dados = await resposta.json();





    if(dados.error){

      alert(dados.error);
      return;

    }





    alert("Usuário criado com sucesso!");



    setNome("");
    setEmail("");
    setSenha("");
    setFuncao("");



    carregarUsuarios();


  }








  return (


    <AdminOnly>


      <div className="p-6 text-white">



        <h1 className="text-3xl font-bold mb-6">
          👥 Gerenciar Usuários
        </h1>







        <div className="bg-zinc-900 p-6 rounded-xl space-y-3">



          <h2 className="text-xl font-bold">
            Novo usuário
          </h2>






          <input

            className="w-full p-3 bg-zinc-800 rounded"

            placeholder="Nome"

            value={nome}

            onChange={(e)=>setNome(e.target.value)}

          />






          <input

            className="w-full p-3 bg-zinc-800 rounded"

            placeholder="Email"

            value={email}

            onChange={(e)=>setEmail(e.target.value)}

          />






          <input

            type="password"

            className="w-full p-3 bg-zinc-800 rounded"

            placeholder="Senha"

            value={senha}

            onChange={(e)=>setSenha(e.target.value)}

          />






          <input

            className="w-full p-3 bg-zinc-800 rounded"

            placeholder="Função"

            value={funcao}

            onChange={(e)=>setFuncao(e.target.value)}

          />








          <select

            className="w-full p-3 bg-zinc-800 rounded"

            value={tipo}

            onChange={(e)=>setTipo(e.target.value)}

          >


            <option value="membro">
              Membro
            </option>



            <option value="admin">
              Administrador
            </option>



          </select>







          <button

            onClick={criarUsuario}

            className="bg-blue-600 px-5 py-3 rounded"

          >

            Criar usuário

          </button>





        </div>









        <div className="mt-6 space-y-4">



          <h2 className="text-2xl font-bold">
            Lista de usuários
          </h2>








          {usuarios.map((usuario)=>(



            <div

              key={usuario.id}

              className="bg-zinc-900 p-5 rounded-xl"

            >



              <h3 className="text-xl font-bold">
                👤 {usuario.nome}
              </h3>





              <p>
                📧 {usuario.email}
              </p>





              <p>
                🎤 {usuario.funcao}
              </p>





              <p>
                👑 Tipo: {usuario.tipo}
              </p>





              <p>
                🟢 Status: {usuario.status}
              </p>





            </div>



          ))}






        </div>





      </div>



    </AdminOnly>


  );


}