import { supabaseServer } from "@/lib/supabase-server";
import { NextResponse } from "next/server";

export async function GET(_: Request, { params }: any) {
  const { id } = params;

  const { data, error } = await supabaseServer.from("staff").select("*").eq("id", id).single();

  if (error) return NextResponse.json({ error: error.message }, { status: 404 });

  return NextResponse.json(data);
}

export async function PUT(req: Request, { params }: any) {
  const { id } = params;
  const body = await req.json();

  const { data, error } = await supabaseServer
    .from("staff")
    .update(body)
    .eq("id", id)
    .select();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json(data);
}

export async function DELETE(_: Request, { params }: any) {
  const { id } = params;

  const { error } = await supabaseServer.from("staff").delete().eq("id", id);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ message: "Deleted Successfully ✅" });
}
