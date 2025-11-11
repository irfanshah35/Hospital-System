// app/api/departments/route.ts
import { supabaseServer } from "@/lib/supabase-server";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const { data, error } = await supabaseServer.from("departments").select("*");
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { data, error } = await supabaseServer.from("departments").insert([body]).select();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data[0]);
}
