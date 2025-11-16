import { NextRequest, NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase-server";

// =========================
//     GET single assignment
// =========================
export async function GET(
  req: NextRequest,
  context: { params: { id: string } }
) {
  const { id } = context.params;

  const { data, error } = await supabaseServer
    .from("assigned_departments")
    .select("*, doctors(*), departments(*)")
    .eq("id", id)
    .single();

  if (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 404 }
    );
  }

  return NextResponse.json(data);
}

// =========================
//         UPDATE
// =========================
export async function PUT(
  req: NextRequest,
  context: { params: { id: string } }
) {
  const { id } = context.params;
  const body = await req.json();

  const { data, error } = await supabaseServer
    .from("assigned_departments")
    .update(body)
    .eq("id", id)
    .select();

  if (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }

  return NextResponse.json(data?.[0]);
}

// =========================
//         DELETE
// =========================
export async function DELETE(
  req: NextRequest,
  context: { params: { id: string } }
) {
  const { id } = context.params;

  const { error } = await supabaseServer
    .from("assigned_departments")
    .delete()
    .eq("id", id);

  if (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }

  return NextResponse.json({
    message: "Assignment deleted successfully",
  });
}
