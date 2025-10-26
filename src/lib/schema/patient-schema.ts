// lib/schemas/patientSchema.ts
import { z } from "zod";

export const patientCreateSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  gender: z.string().min(1),
  dateOfBirth: z.string().min(1),
  age: z.string().min(1),
  maritalStatus: z.string().min(1),
  nationalId: z.string().min(1),
  patientId: z.string().optional(),
  mobile: z.string().min(1),
  email: z.string().email(),
  address: z.string().min(1),
  city: z.string().min(1),
  stateProvince: z.string().min(1),
  zipPostalCode: z.string().min(1),
  contactName: z.string().min(1),
  relationship: z.string().min(1),
  phoneNumber: z.string().min(1),
  bloodGroup: z.string().min(1),

  bloodPressure: z.string().optional().nullable(),
  sugarLevel: z.string().optional().nullable(),
  injuryCondition: z.string().optional().nullable(),
  allergies: z.string().optional().nullable(),
  chronicDiseases: z.string().optional().nullable(),
  currentMedications: z.string().optional().nullable(),

  insuranceProvider: z.string().optional().nullable(),
  policyNumber: z.string().optional().nullable(),
  coverageDetails: z.string().optional().nullable(),

  admissionDate: z.string().optional().nullable(),
  assignedDoctor: z.string().optional().nullable(),
  wardNumber: z.string().optional().nullable(),
  roomNumber: z.string().optional().nullable(),
  reasonForAdmission: z.string().optional().nullable(),

  document: z.string().optional().nullable(),
});
