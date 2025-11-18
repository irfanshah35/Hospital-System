// app/api/departments/[id]/route.js
import { supabaseServer } from "@/lib/supabase-server";
import { NextResponse } from "next/server";

// =========================
//            GET
// =========================
export async function GET(req, { params }) {
  const { id } = params;

  const { data, error } = await supabaseServer
    .from("departments")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 404 });
  }

  return NextResponse.json(data);
}

// =========================
//            UPDATE
// =========================
export async function PUT(req, { params }) {
  const { id } = params;
  const body = await req.json();

  const { data, error } = await supabaseServer
    .from("departments")
    .update(body)
    .eq("id", id)
    .select();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data?.[0]);
}

// =========================
//            DELETE
// =========================
export async function DELETE(req, { params }) {
  const { id } = params;

  const { error } = await supabaseServer
    .from("departments")
    .delete()
    .eq("id", id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ message: "Deleted successfully" });
}
