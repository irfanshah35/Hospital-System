// app/api/doctors/[id]/route.ts
import { supabaseServer } from "@/lib/supabase-server";
import { NextRequest, NextResponse } from "next/server";

// 🟢 GET single doctor
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { data, error } = await supabaseServer
    .from("doctors")
    .select("*")
    .eq("id", params.id)
    .single();
  if (error)
    return NextResponse.json({ error: error.message }, { status: 404 });
  return NextResponse.json(data);
}

// 🟢 PUT update doctor
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const body = await req.json();
  const { data, error } = await supabaseServer
    .from("doctors")
    .update(body)
    .eq("id", params.id)
    .select();
  if (error)
    return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data[0]);
}

// 🟢 DELETE doctor
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { error } = await supabaseServer.from("doctors").delete().eq("id", params.id);
  if (error)
    return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ message: "Doctor deleted successfully" });
}
