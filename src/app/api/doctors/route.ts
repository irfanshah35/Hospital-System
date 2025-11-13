// app/api/doctors/route.ts
import { supabaseServer } from "@/lib/supabase-server";
import { NextRequest, NextResponse } from "next/server";

// 🟢 GET all doctors
export async function GET() {
  const { data, error } = await supabaseServer.from("doctors").select("*");
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

// 🟢 POST create doctor
export async function POST(req: NextRequest) {
  const body = await req.json();
  const { data, error } = await supabaseServer.from("doctors").insert([body]).select();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data[0]);
}
