"use client";
import React, { useState } from "react";
import { Home, User } from "lucide-react";

interface FormErrors {
  firstName?: string;
  gender?: string;
  dateOfBirth?: string;
  mobile?: string;
  email?: string;
  department?: string;
  consultingDoctor?: string;
  appointmentType?: string;
  appointmentDate?: string;
  reasonForVisit?: string;
}

interface FormState {
  success: boolean;
  errors: FormErrors;
  message: string;
}

// Reusable Input Component
const FloatingInput = ({
  name,
  label,
  type = "text",
  required = false,
  error,
  focused,
  onFocus,
  onBlur,
  rows,
  options,
  icon
}: any) => {
  const isTextarea = type === "textarea";
  const isSelect = type === "select";
  const hasError = !!error;

  const inputClasses = `w-full px-3 py-3 border rounded-md focus:outline-none peer ${isSelect ? "appearance-none bg-white" : ""
    } ${isTextarea ? "resize-none" : ""} ${hasError ? "border-red-500 focus:border-red-500" : "border-gray-500 focus:border-blue-500"
    }`;

  const labelClasses = `absolute left-3 transition-all duration-200 pointer-events-none ${focused ? "text-xs -top-2 bg-white px-1 text-blue-500" : "text-gray-500 top-3"
    }`;

  const commonProps = {
    name,
    id: name,
    className: inputClasses,
    onFocus: () => onFocus(name),
    onBlur: (e: any) => onBlur(name, e.target.value),
    onChange: (e: any) => e.target.value && onFocus(name)
  };

  return (
    <div className="relative">
      {isTextarea ? (
        <textarea {...commonProps} rows={rows || 3} />
      ) : isSelect ? (
        <select {...commonProps}>
          <option value=""></option>
          {options?.map((opt: any) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
      ) : (
        <input {...commonProps} type={type} />
      )}

      <label htmlFor={name} className={labelClasses}>
        {label}{required && <span className="text-red-500">*</span>}
      </label>

      {isSelect && (
        <div className="absolute right-3 top-3 pointer-events-none">
          <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      )}

      {icon && <div className="absolute left-3 top-3">{icon}</div>}

      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
};

// Section Header Component
const SectionHeader = ({ icon, title }: { icon: React.ReactNode; title: string }) => (
  <div className="flex items-center mb-4">
    {icon}
    <h3 className="text-lg font-medium text-blue-500">{title}</h3>
  </div>
);

export default function BookAppointmentComponent() {
  const [formState, setFormState] = useState<FormState>({
    success: false,
    errors: {},
    message: "",
  });
  const [isPending, setIsPending] = useState(false);
  const [selectedTime, setSelectedTime] = useState("06:00 PM");
  const [fieldStates, setFieldStates] = useState<Record<string, boolean>>({});

  const handleFieldFocus = (field: string) => {
    setFieldStates((prev) => ({ ...prev, [field]: true }));
  };

  const handleFieldBlur = (field: string, value: string) => {
    if (!value) setFieldStates((prev) => ({ ...prev, [field]: false }));
  };

  const resetForm = () => {
    const form = document.querySelector("form") as HTMLFormElement;
    if (form) form.reset();
    setFieldStates({});
    setFormState({ success: false, errors: {}, message: "" });
    setSelectedTime("06:00 PM");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsPending(true);

    const formData = new FormData(e.currentTarget);
    const payloadData = Object.fromEntries(
      Array.from(formData.entries()).map(([key, value]) => [
        key.toLowerCase().replace(/([A-Z])/g, (m) => m.toLowerCase()),
        value
      ])
    );

    payloadData.appointmenttime = selectedTime;

    const errors: FormErrors = {};
    const { firstname, gender, dateofbirth, mobile, email, department, consultingdoctor, appointmenttype, appointmentdate, reasonforvisit } = payloadData as any;

    if (!firstname?.trim()) errors.firstName = "First name is required";
    if (!gender) errors.gender = "Gender is required";
    if (!dateofbirth) errors.dateOfBirth = "Date of birth is required";
    if (!mobile?.trim()) {
      errors.mobile = "Mobile number is required";
    } else if (!/^\d{10}$/.test(mobile.trim())) {
      errors.mobile = "Mobile number must be 10 digits";
    }
    if (!email?.trim()) {
      errors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = "Invalid email format";
    }
    if (!department) errors.department = "Department is required";
    if (!consultingdoctor) errors.consultingDoctor = "Consulting doctor is required";
    if (!appointmenttype) errors.appointmentType = "Appointment type is required";
    if (!appointmentdate) errors.appointmentDate = "Appointment date is required";
    if (!reasonforvisit?.trim()) errors.reasonForVisit = "Reason for visit is required";

    if (Object.keys(errors).length > 0) {
      setFormState({ success: false, errors, message: "⚠️ Please fix the errors below" });
      setIsPending(false);
      return;
    }

    try {
      await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payloadData),
      });

      setFormState({ success: true, errors: {}, message: "✅ Appointment booked successfully!" });
      resetForm();
    } catch (error) {
      console.error("Appointment creation error:", error);
      setFormState({ success: false, errors: {}, message: "" });
    } finally {
      setIsPending(false);
    }
  };

  const TimeSlot = ({ time }: { time: string }) => (
    <div
      className={`flex items-center justify-center w-full py-2 px-3 border rounded-md cursor-pointer transition-all duration-200 relative ${selectedTime === time ? "bg-blue-50 border-blue-500 text-blue-700" : "border-gray-300 hover:bg-gray-50"
        }`}
      onClick={() => setSelectedTime(time)}
    >
      <span className="text-sm">{time}</span>
      {selectedTime === time && (
        <div className="absolute right-2">
          <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        </div>
      )}
    </div>
  );

  return (
    <div className="px-4 sm:px-6 py-5 bg-gray-50 min-h-screen">
      <div className="flex items-center space-x-2 mb-6">
        <h1 className="text-[20px] font-semibold">Book Appointment</h1>
        <span className="text-[20px] font-bold">›</span>
        <Home size={18} />
        <span>›</span>
        <span className="text-sm">Appointment</span>
        <span>›</span>
        <span className="text-sm">Book</span>
      </div>

      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-1">Book Appointment</h2>
          <p className="text-gray-500 text-sm mb-6">
            Fill in the details to schedule a patient appointment
          </p>

          {formState.message && (
            <div className={`mb-6 p-3 rounded-md text-sm ${formState.success ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`}>
              {formState.message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Patient Information */}
            <div>
              <SectionHeader
                icon={<User className="w-5 h-5 text-blue-500 mr-2" />}
                title="Patient Information"
              />

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <FloatingInput name="firstName" label="First name" required error={formState.errors.firstName} focused={fieldStates.firstName} onFocus={handleFieldFocus} onBlur={handleFieldBlur} />
                <FloatingInput name="middleName" label="Middle name" focused={fieldStates.middleName} onFocus={handleFieldFocus} onBlur={handleFieldBlur} />
                <FloatingInput name="lastName" label="Last name" focused={fieldStates.lastName} onFocus={handleFieldFocus} onBlur={handleFieldBlur} />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <FloatingInput name="gender" label="Gender" type="select" required error={formState.errors.gender} focused={fieldStates.gender} onFocus={handleFieldFocus} onBlur={handleFieldBlur} options={["Male", "Female", "Other"]} />
                <FloatingInput name="dateOfBirth" label="Date Of Birth" type="date" required error={formState.errors.dateOfBirth} focused={fieldStates.dateOfBirth} onFocus={handleFieldFocus} onBlur={handleFieldBlur} />
                <FloatingInput name="bloodGroup" label="Blood Group" type="select" focused={fieldStates.bloodGroup} onFocus={handleFieldFocus} onBlur={handleFieldBlur} options={["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]} />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <FloatingInput name="mobile" label="Mobile" type="tel" required error={formState.errors.mobile} focused={fieldStates.mobile} onFocus={handleFieldFocus} onBlur={handleFieldBlur} />
                <FloatingInput name="email" label="Email" type="email" required error={formState.errors.email} focused={fieldStates.email} onFocus={handleFieldFocus} onBlur={handleFieldBlur} />
                <FloatingInput name="patientId" label="Patient ID (if existing)" focused={fieldStates.patientId} onFocus={handleFieldFocus} onBlur={handleFieldBlur} />
              </div>

              <FloatingInput name="address" label="Address" type="textarea" rows={3} focused={fieldStates.address} onFocus={handleFieldFocus} onBlur={handleFieldBlur} />
            </div>

            {/* Insurance Information */}
            <div>
              <SectionHeader
                icon={<svg className="w-5 h-5 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>}
                title="Insurance Information"
              />

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <FloatingInput name="insuranceProvider" label="Insurance Provider" focused={fieldStates.insuranceProvider} onFocus={handleFieldFocus} onBlur={handleFieldBlur} />
                <FloatingInput name="policyNumber" label="Policy Number" focused={fieldStates.policyNumber} onFocus={handleFieldFocus} onBlur={handleFieldBlur} />
                <FloatingInput name="groupNumber" label="Group Number" focused={fieldStates.groupNumber} onFocus={handleFieldFocus} onBlur={handleFieldBlur} />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FloatingInput name="insuranceHolderName" label="Insurance Holder Name (if not patient)" focused={fieldStates.insuranceHolderName} onFocus={handleFieldFocus} onBlur={handleFieldBlur} />
                <FloatingInput name="relationshipToPatient" label="Relationship to Patient" type="select" focused={fieldStates.relationshipToPatient} onFocus={handleFieldFocus} onBlur={handleFieldBlur} options={["Self", "Spouse", "Parent", "Child", "Other"]} />
              </div>
            </div>

            {/* Medical History */}
            <div>
              <SectionHeader
                icon={<svg className="w-5 h-5 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>}
                title="Medical History"
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <FloatingInput name="existingConditions" label="Existing Medical Conditions" type="textarea" focused={fieldStates.existingConditions} onFocus={handleFieldFocus} onBlur={handleFieldBlur} />
                <FloatingInput name="currentMedications" label="Current Medications" type="textarea" focused={fieldStates.currentMedications} onFocus={handleFieldFocus} onBlur={handleFieldBlur} />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FloatingInput name="allergies" label="Allergies" type="textarea" focused={fieldStates.allergies} onFocus={handleFieldFocus} onBlur={handleFieldBlur} />
                <FloatingInput name="previousSurgeries" label="Previous Surgeries" type="textarea" focused={fieldStates.previousSurgeries} onFocus={handleFieldFocus} onBlur={handleFieldBlur} />
              </div>
            </div>

            {/* Emergency Contact */}
            <div>
              <SectionHeader
                icon={<svg className="w-5 h-5 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>}
                title="Emergency Contact"
              />

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <FloatingInput name="contactName" label="Contact Name" focused={fieldStates.contactName} onFocus={handleFieldFocus} onBlur={handleFieldBlur} />
                <FloatingInput name="contactRelationship" label="Relationship" type="select" focused={fieldStates.contactRelationship} onFocus={handleFieldFocus} onBlur={handleFieldBlur} options={["Spouse", "Parent", "Sibling", "Friend", "Other"]} />
                <FloatingInput name="contactPhone" label="Contact Phone" type="tel" focused={fieldStates.contactPhone} onFocus={handleFieldFocus} onBlur={handleFieldBlur} />
              </div>
            </div>

            {/* Appointment Details */}
            <div>
              <SectionHeader
                icon={<svg className="w-5 h-5 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>}
                title="Appointment Details"
              />

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <FloatingInput name="department" label="Department" type="select" required error={formState.errors.department} focused={fieldStates.department} onFocus={handleFieldFocus} onBlur={handleFieldBlur} options={["Cardiology", "Neurology", "Orthopedics", "Pediatrics", "General Medicine"]} />
                <FloatingInput name="consultingDoctor" label="Consulting Doctor" type="select" required error={formState.errors.consultingDoctor} focused={fieldStates.consultingDoctor} onFocus={handleFieldFocus} onBlur={handleFieldBlur} options={["Dr. Smith", "Dr. Johnson", "Dr. Williams", "Dr. Brown"]} />
                <FloatingInput name="appointmentType" label="Appointment Type" type="select" required error={formState.errors.appointmentType} focused={fieldStates.appointmentType} onFocus={handleFieldFocus} onBlur={handleFieldBlur} options={["New Patient", "Follow-Up", "Consultation", "Emergency"]} />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <FloatingInput name="appointmentDate" label="Date Of Appointment" type="date" required error={formState.errors.appointmentDate} focused={fieldStates.appointmentDate} onFocus={handleFieldFocus} onBlur={handleFieldBlur} />
                <FloatingInput name="reasonForVisit" label="Reason for Visit" type="textarea" rows={2} required error={formState.errors.reasonForVisit} focused={fieldStates.reasonForVisit} onFocus={handleFieldFocus} onBlur={handleFieldBlur} />
              </div>

              {/* Time Selection */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-3">Time Of Appointment:</label>
                <div className="border border-gray-500 rounded-lg p-4">
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <h4 className="font-semibold text-blue-600 mb-3 text-center">Morning</h4>
                      <div className="space-y-2">
                        {["09:00 AM", "10:00 AM", "11:00 AM"].map((time) => <TimeSlot key={time} time={time} />)}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-blue-600 mb-3 text-center">Afternoon</h4>
                      <div className="space-y-2">
                        {["01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM"].map((time) => <TimeSlot key={time} time={time} />)}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-blue-600 mb-3 text-center">Evening</h4>
                      <div className="space-y-2">
                        {["05:00 PM", "06:00 PM", "07:00 PM"].map((time) => <TimeSlot key={time} time={time} />)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Additional Information */}
            <div className="grid grid-cols-1 gap-4 mb-4">
              <FloatingInput name="symptoms" label="Symptoms/Condition" type="textarea" focused={fieldStates.symptoms} onFocus={handleFieldFocus} onBlur={handleFieldBlur} />
              <FloatingInput name="additionalNotes" label="Additional Notes" type="textarea" focused={fieldStates.additionalNotes} onFocus={handleFieldFocus} onBlur={handleFieldBlur} />
            </div>

            {/* File Upload */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Upload Previous Medical Reports</label>
              <div className="border border-dashed border-gray-500 rounded-lg p-8 text-center hover:border-blue-400 transition">
                <input type="file" id="fileUpload" name="medicalReports" multiple accept=".pdf,.jpg,.jpeg,.png" className="hidden" onChange={(e) => {
                  const files = e.target.files;
                  if (files && files.length > 0) {
                    const fileNames = Array.from(files).map((f) => f.name).join(", ");
                    const label = document.getElementById("fileLabel");
                    if (label) label.textContent = `Selected: ${fileNames}`;
                  }
                }} />
                <label htmlFor="fileUpload" className="cursor-pointer">
                  <div className="flex flex-col items-center">
                    <button type="button" className="px-4 py-2 bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100 transition mb-2" onClick={() => document.getElementById("fileUpload")?.click()}>
                      Choose file
                    </button>
                    <p id="fileLabel" className="text-sm text-gray-500">or drag and drop file here</p>
                  </div>
                </label>
              </div>
            </div>

            {/* Submit Buttons */}
            <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4 border-t border-gray-200">
              <button type="button" className="flex items-center justify-center gap-2 px-4 md:px-6 py-2.5 border border-gray-500 rounded-md text-blue-600 hover:bg-blue-50 transition" disabled={isPending} onClick={resetForm}>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Reset Form
              </button>
              <button type="submit" disabled={isPending} className="flex items-center justify-center gap-2 px-4 md:px-6 py-2.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                {isPending ? "Submitting..." : "Submit Appointment"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}