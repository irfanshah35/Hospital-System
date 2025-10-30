import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase-server";

export async function POST(request: Request) {
  const { name, email, password } = await request.json();

  const { data, error } = await supabaseServer.auth.signUp({
    email,
    password,
    options: { data: { name } }
  });

  if (error) return NextResponse.json({ error: error.message }, { status: 400 });

  return NextResponse.json({ message: "User registered successfully!", data });
}
