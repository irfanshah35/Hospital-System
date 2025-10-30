import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase-server";

export async function POST(request: Request) {
  const { email, password } = await request.json();

  const { data, error } = await supabaseServer.auth.signInWithPassword({
    email,
    password,
  });

  if (error) return NextResponse.json({ error: error.message }, { status: 401 });

  return NextResponse.json({
    message: "Login successful",
    access_token: data.session?.access_token,
    user: data.user
  });
}
