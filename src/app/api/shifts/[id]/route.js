// app/api/doctor-shifts/[id]/route.js
import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase-server";

// ==========================
//        GET SHIFT
// ==========================
export async function GET(req, { params }) {
  const { data, error } = await supabaseServer
    .from("doctor_shift_management")
    .select("*, doctors(*), departments(*)")
    .eq("id", params.id)
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 404 });
  }

  return NextResponse.json(data);
}

// ==========================
//       UPDATE SHIFT
// ==========================
export async function PUT(req, { params }) {
  const body = await req.json();

  const { data, error } = await supabaseServer
    .from("doctor_shift_management")
    .update(body)
    .eq("id", params.id)
    .select();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data?.[0] || null);
}

// ==========================
//       DELETE SHIFT
// ==========================
export async function DELETE(req, { params }) {
  const { error } = await supabaseServer
    .from("doctor_shift_management")
    .delete()
    .eq("id", params.id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ message: "Shift deleted successfully" });
}
