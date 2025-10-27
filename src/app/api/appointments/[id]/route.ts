import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase-server";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { data, error } = await supabaseServer
    .from("appointments")
    .select("*")
    .eq("id", params.id)
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 404 });
  }

  return NextResponse.json(data, { status: 200 });
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const body = await request.json();

  const { data, error } = await supabaseServer
    .from("appointments")
    .update(body)
    .eq("id", params.id)
    .select()
    .single();

  if (error) {
    return NextResponse.json(
      { error: error.message, details: error },
      { status: 500 }
    );
  }

  return NextResponse.json(data, { status: 200 });
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { error } = await supabaseServer
    .from("appointments")
    .delete()
    .eq("id", params.id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(
    { message: "Appointment deleted successfully" },
    { status: 200 }
  );
}
