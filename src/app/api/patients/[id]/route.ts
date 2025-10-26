// app/api/patients/[id]/route.ts
import { patientCreateSchema } from "@/lib/schema/patient-schema";
import { supabaseServer } from "@/lib/supabase-server";
import { Patient } from "@/types/interface";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = Number(params.id);
  const { data, error } = await supabaseServer
    .from("patients")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 404 });
  }
  return NextResponse.json(data as Patient, { status: 200 });
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = Number(params.id);
    const body = await request.json();
    const parsed = patientCreateSchema.partial().parse(body); // allow partial updates

    // map fields from parsed to DB column names (only provided)
    const updateRow: Record<string, any> = {};
    const map: Record<string, string> = {
      firstName: "first_name",
      lastName: "last_name",
      gender: "gender",
      dateOfBirth: "date_of_birth",
      age: "age",
      maritalStatus: "marital_status",
      nationalId: "national_id",
      patientId: "patient_id",
      mobile: "mobile",
      email: "email",
      address: "address",
      city: "city",
      stateProvince: "state_province",
      zipPostalCode: "zip_postal_code",
      contactName: "contact_name",
      relationship: "relationship",
      phoneNumber: "phone_number",
      bloodGroup: "blood_group",
      bloodPressure: "blood_pressure",
      sugarLevel: "sugar_level",
      injuryCondition: "injury_condition",
      allergies: "allergies",
      chronicDiseases: "chronic_diseases",
      currentMedications: "current_medications",
      insuranceProvider: "insurance_provider",
      policyNumber: "policy_number",
      coverageDetails: "coverage_details",
      admissionDate: "admission_date",
      assignedDoctor: "assigned_doctor",
      wardNumber: "ward_number",
      roomNumber: "room_number",
      reasonForAdmission: "reason_for_admission",
      document: "document",
    };

    for (const key of Object.keys(parsed)) {
      if (map[key]) updateRow[map[key]] = (parsed as any)[key];
    }

    const { data, error } = await supabaseServer
      .from("patients")
      .update(updateRow)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json(data as Patient, { status: 200 });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message ?? "Invalid data" },
      { status: 400 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = Number(params.id);
  const { data, error } = await supabaseServer
    .from("patients")
    .delete()
    .eq("id", id)
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ message: "Deleted", data }, { status: 200 });
}
