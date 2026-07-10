import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";

export async function GET() {
  const { data, error } = await supabaseAdmin
    .from("membros")
    .select("*")
    .order("nome");

  if (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 400 }
    );
  }

  return NextResponse.json(data);
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      nome,
      email,
      senha,
      funcao,
      tipo,
      status,
    } = body;

    if (!nome || !email || !senha) {
      return NextResponse.json(
        { error: "Preencha todos os campos obrigatórios." },
        { status: 400 }
      );
    }

    const { data: usuario, error: erroAuth } =
      await supabaseAdmin.auth.admin.createUser({
        email,
        password: senha,
        email_confirm: true,
      });

    if (erroAuth) {
      return NextResponse.json(
        { error: erroAuth.message },
        { status: 400 }
      );
    }

    const { error: erroBanco } = await supabaseAdmin
      .from("membros")
      .insert({
        nome,
        email,
        funcao,
        tipo,
        status,
        auth_id: usuario.user.id,
      });

    if (erroBanco) {
      return NextResponse.json(
        { error: erroBanco.message },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
    });

  } catch {
    return NextResponse.json(
      { error: "Erro interno." },
      { status: 500 }
    );
  }
}