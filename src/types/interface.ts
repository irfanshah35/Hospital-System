// types/patient.ts
export interface Patient {
  id?: number;
  firstName: string;
  lastName: string;
  gender: string;
  dateOfBirth: string; // ISO date
  age: string;
  maritalStatus: string;
  nationalId: string;
  patientId?: string;
  mobile: string;
  email: string;
  address: string;
  city: string;
  stateProvince: string;
  zipPostalCode: string;
  contactName: string;
  relationship: string;
  phoneNumber: string;
  bloodGroup: string;

  // optional
  bloodPressure?: string | null;
  sugarLevel?: string | null;
  injuryCondition?: string | null;
  allergies?: string | null;
  chronicDiseases?: string | null;
  currentMedications?: string | null;

  insuranceProvider?: string | null;
  policyNumber?: string | null;
  coverageDetails?: string | null;

  admissionDate?: string | null;
  assignedDoctor?: string | null;
  wardNumber?: string | null;
  roomNumber?: string | null;
  reasonForAdmission?: string | null;

  document?: string | null;
  createdAt?: string;
}
