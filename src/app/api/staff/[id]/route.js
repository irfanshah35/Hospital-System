// app/api/staff/[id]/route.js
import { supabaseServer } from "@/lib/supabase-server";
import { NextResponse } from "next/server";

// ==========================
//        GET STAFF
// ==========================
export async function GET(_, { params }) {
  const { id } = params;

  const { data, error } = await supabaseServer
    .from("staff")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 404 });
  }

  return NextResponse.json(data);
}

// ==========================
//        UPDATE STAFF
// ==========================
export async function PUT(req, { params }) {
  const { id } = params;
  const body = await req.json();

  const { data, error } = await supabaseServer
    .from("staff")
    .update(body)
    .eq("id", id)
    .select();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

// ==========================
//        DELETE STAFF
// ==========================
export async function DELETE(_, { params }) {
  const { id } = params;

  const { error } = await supabaseServer
    .from("staff")
    .delete()
    .eq("id", id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ message: "Deleted Successfully ✅" });
}
