// app/api/patients/route.ts
import { patientCreateSchema } from "@/lib/schema/patient-schema";
import { supabaseServer } from "@/lib/supabase-server";
import { Patient } from "@/types/interface";
import { NextResponse } from "next/server";

export async function GET() {
  const { data, error } = await supabaseServer
    .from("patients")
    .select("*")
    .order("id", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json(data ?? [], { status: 200 });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = patientCreateSchema.parse(body);

    // map camelCase -> snake_case (DB columns)
    const row = {
      first_name: parsed.firstName,
      last_name: parsed.lastName,
      gender: parsed.gender,
      date_of_birth: parsed.dateOfBirth,
      age: parsed.age,
      marital_status: parsed.maritalStatus,
      national_id: parsed.nationalId,
      patient_id: parsed.patientId ?? null,
      mobile: parsed.mobile,
      email: parsed.email,
      address: parsed.address,
      city: parsed.city,
      state_province: parsed.stateProvince,
      zip_postal_code: parsed.zipPostalCode,
      contact_name: parsed.contactName,
      relationship: parsed.relationship,
      phone_number: parsed.phoneNumber,
      blood_group: parsed.bloodGroup,

      blood_pressure: parsed.bloodPressure ?? null,
      sugar_level: parsed.sugarLevel ?? null,
      injury_condition: parsed.injuryCondition ?? null,
      allergies: parsed.allergies ?? null,
      chronic_diseases: parsed.chronicDiseases ?? null,
      current_medications: parsed.currentMedications ?? null,

      insurance_provider: parsed.insuranceProvider ?? null,
      policy_number: parsed.policyNumber ?? null,
      coverage_details: parsed.coverageDetails ?? null,

      admission_date: parsed.admissionDate ?? null,
      assigned_doctor: parsed.assignedDoctor ?? null,
      ward_number: parsed.wardNumber ?? null,
      room_number: parsed.roomNumber ?? null,
      reason_for_admission: parsed.reasonForAdmission ?? null,

      document: parsed.document ?? null,
    };

    console.log("📌 Insert Row:", row);

    const { data, error } = await supabaseServer
      .from("patients")
      .insert(row)
      .select()
      .single();

    console.log("✅ Supabase Response:", data);
    console.log("❌ Supabase Error:", error);

    if (error) {
      return NextResponse.json(
        { error: error.message, details: error },
        { status: 500 }
      );
    }

    return NextResponse.json(data as Patient, { status: 201 });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message ?? "Invalid request" },
      { status: 400 }
    );
  }
}
