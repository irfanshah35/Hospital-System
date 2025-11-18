"use client";
import React, { useState } from "react";
import { Home, User, Building2 } from "lucide-react";

interface FormErrors {
  [key: string]: string;
}

interface FieldState {
  [key: string]: boolean;
}

export default function AddAllotmentComponent() {
  const [formData, setFormData] = useState<any>({});
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fieldStates, setFieldStates] = useState<FieldState>({});

  const handleInputChange = (name: string, value: string) => {
    setFormData((prev: any) => ({ ...prev, [name]: value }));
    setFieldStates((prev) => ({ ...prev, [name]: value.trim() !== "" }));
  };

  const handleFieldFocus = (name: string) => {
    setFieldStates((prev) => ({ ...prev, [name]: true }));
  };

  const handleFieldBlur = (name: string, value: string) => {
    setFieldStates((prev) => ({ ...prev, [name]: value.trim() !== "" }));
  };

  const FloatingInput = ({
    label,
    name,
    type = "text",
    required = false,
    options = [],
  }: any) => (
    <div className="relative">
      {type === "select" ? (
        <select
          name={name}
          value={formData[name] || ""}
          className={`w-full px-3 py-3 border rounded-md bg-white focus:outline-none appearance-none peer ${errors[name]
              ? "border-red-500"
              : "border-gray-400 focus:border-blue-500"
            }`}
          onFocus={() => handleFieldFocus(name)}
          onChange={(e) => handleInputChange(name, e.target.value)}
        >
          <option value=""></option>
          {options.map((opt: string) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      ) : type === "textarea" ? (
        <textarea
          name={name}
          value={formData[name] || ""}
          rows={4}
          className={`w-full px-3 py-3 border rounded-md resize-none focus:outline-none peer ${errors[name]
              ? "border-red-500"
              : "border-gray-400 focus:border-blue-500"
            }`}
          onFocus={() => handleFieldFocus(name)}
          onBlur={(e) => handleFieldBlur(name, e.target.value)}
          onChange={(e) => handleInputChange(name, e.target.value)}
        />
      ) : (
        <input
          type={type}
          name={name}
          value={formData[name] || ""}
          className={`w-full px-3 py-3 border rounded-md focus:outline-none peer ${errors[name]
              ? "border-red-500"
              : "border-gray-400 focus:border-blue-500"
            }`}
          onFocus={() => handleFieldFocus(name)}
          onBlur={(e) => handleFieldBlur(name, e.target.value)}
          onChange={(e) => handleInputChange(name, e.target.value)}
        />
      )}
      <label
        className={`absolute left-3 transition-all duration-200 pointer-events-none ${fieldStates[name]
            ? "text-xs -top-2 bg-white px-1 text-blue-500"
            : "text-gray-600 top-3"
          }`}
      >
        {label}
        {required && <span className="text-red-500">*</span>}
      </label>
      {errors[name] && (
        <p className="text-red-500 text-xs mt-1">{errors[name]}</p>
      )}
    </div>
  );

  const SectionHeader = ({ icon: Icon, title }: any) => (
    <div className="flex items-center mb-4 mt-6">
      <Icon className="w-5 h-5 text-blue-500 mr-2" />
      <h3 className="text-lg font-medium text-blue-500">{title}</h3>
    </div>
  );

  const handleSubmit = async () => {
    setIsSubmitting(true);
    const newErrors: FormErrors = {};

    const requiredFields = {
      patientName: "Patient name is required",
      patientId: "Patient ID is required",
      age: "Age is required",
      gender: "Gender is required",
      mobile: "Mobile number is required",
      email: "Email is required",
      roomNo: "Room number is required",
      roomType: "Room type is required",
      admissionDate: "Admission date is required",
      dischargeDate: "Discharge date is required",
      doctorAssigned: "Doctor assigned is required",
      amountCharged: "Amount charged is required",
      status: "Status is required",
    };

    Object.entries(requiredFields).forEach(([field, message]) => {
      if (!formData[field] || String(formData[field]).trim().length === 0) {
        newErrors[field] = message;
      }
    });

    if (
      formData.email &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(formData.email))
    ) {
      newErrors.email = "Invalid email format";
    }

    if (formData.mobile && !/^\d{10}$/.test(String(formData.mobile).trim())) {
      newErrors.mobile = "Mobile number must be 10 digits";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      setIsSubmitting(false);
      return;
    }

    console.log("Allotment Data:", formData);
    alert("Room allotment submitted successfully!");
    setFormData({});
    setFieldStates({});
    setIsSubmitting(false);
  };

  const handleReset = () => {
    setFormData({});
    setFieldStates({});
    setErrors({});
  };

  return (
    <div className="px-4 sm:px-6 py-5 bg-gray-50 min-h-screen">
      <div className="flex items-center space-x-2 mb-6 text-gray-700">
        <h1 className="text-[20px] font-semibold text-gray-800">
          New Allotment
        </h1>
        <span>›</span>
        <Home size={18} />
        <span>›</span>
        <span className="text-sm">Room</span>
        <span>›</span>
        <span className="text-sm">New Allotment</span>
      </div>

      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-6 text-gray-700">
            New Room Allotment
          </h2>

          <div className="space-y-6">
            {/* Patient Details */}
            <div>
              <SectionHeader icon={User} title="Patient Details" />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <FloatingInput
                  label="Patient Name"
                  name="patientName"
                  required
                />
                <FloatingInput label="Patient ID" name="patientId" required />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <FloatingInput label="Age" name="age" type="number" required />
                <FloatingInput
                  label="Gender"
                  name="gender"
                  type="select"
                  required
                  options={["Male", "Female", "Other"]}
                />
                <FloatingInput
                  label="Mobile"
                  name="mobile"
                  type="tel"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <FloatingInput
                  label="Email"
                  name="email"
                  type="email"
                  required
                />
                <FloatingInput
                  label="Emergency Contact"
                  name="emergencyContact"
                  type="tel"
                />
              </div>

              <div className="mb-4">
                <FloatingInput
                  label="Medical History"
                  name="medicalHistory"
                  type="textarea"
                />
              </div>

              <div>
                <FloatingInput
                  label="Allergies"
                  name="allergies"
                  type="textarea"
                />
              </div>
            </div>

            {/* Room Details */}
            <div>
              <SectionHeader icon={Building2} title="Room Details" />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <FloatingInput label="Room No" name="roomNo" required />
                <FloatingInput
                  label="Room Type"
                  name="roomType"
                  type="select"
                  required
                  options={[
                    "General Ward",
                    "Semi-Private",
                    "Private",
                    "ICU",
                    "Deluxe",
                  ]}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <FloatingInput
                  label="Admission Date"
                  name="admissionDate"
                  type="date"
                  required
                />
                <FloatingInput
                  label="Discharge Date"
                  name="dischargeDate"
                  type="date"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <FloatingInput
                  label="Doctor Assigned"
                  name="doctorAssigned"
                  required
                />
                <FloatingInput
                  label="Status"
                  name="status"
                  type="select"
                  required
                  options={["Admitted", "Discharged"]}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FloatingInput
                  label="Amount Charged"
                  name="amountCharged"
                  type="number"
                  required
                />
                <FloatingInput label="Notes" name="notes" type="textarea" />
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <button
                type="button"
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="w-full sm:w-auto px-6 sm:px-8 py-2.5 sm:py-2 bg-gray-400 text-white rounded-md hover:bg-gray-500 transition disabled:opacity-50 flex items-center justify-center gap-2 text-sm sm:text-base"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                {isSubmitting ? "Submitting..." : "Submit"}
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="w-full sm:w-auto px-6 sm:px-8 py-2.5 sm:py-2 bg-white border border-blue-500 text-blue-500 rounded-md hover:bg-blue-50 transition flex items-center justify-center gap-2 text-sm sm:text-base"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
                Reset
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
