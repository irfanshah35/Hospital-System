"use client";
import React, { useState } from "react";
import { Home, User } from "lucide-react";

// Types for form state
interface FormErrors {
  firstName?: string;
  gender?: string;
  dateOfBirth?: string;
  mobile?: string;
  email?: string;
}

interface FormState {
  success: boolean;
  errors: FormErrors;
  message: string;
}

export default function EditAppointmentComponent() {
  const [formState, setFormState] = useState<FormState>({
    success: false,
    errors: {},
    message: "",
  });
  const [isPending, setIsPending] = useState(false);

  // Track focused/filled state for floating labels
  const [fieldStates, setFieldStates] = useState<Record<string, boolean>>({
    firstName: false,
    middleName: false,
    lastName: false,
    gender: false,
    dateOfBirth: false,
    bloodGroup: false,
    mobile: false,
    email: false,
    patientId: false,
    address: false,
    insuranceProvider: false,
    policyNumber: false,
    groupNumber: false,
    insuranceHolderName: false,
    relationshipToPatient: false,
    existingConditions: false,
    currentMedications: false,
    allergies: false,
    previousSurgeries: false,
    contactName: false,
    contactRelationship: false,
    contactPhone: false,
    department: false,
    consultingDoctor: false,
    appointmentType: false,
    appointmentDate: false,
    reasonForVisit: false,
    symptoms: false,
    additionalNotes: false,
  });

  const [selectedTime, setSelectedTime] = useState("06:00 PM");

  const handleFieldFocus = (field: string) => {
    setFieldStates((prev) => ({ ...prev, [field]: true }));
  };

  const handleFieldBlur = (field: string, value: string) => {
    if (!value) {
      setFieldStates((prev) => ({ ...prev, [field]: false }));
    }
  };

  // Function to reset the entire form
 // Function to reset the entire form
  const resetForm = () => {
    const form = document.querySelector("form");
    if (form) form.reset();

    // Reset all field states to false (moves labels back to placeholder position)
    setFieldStates({
      firstName: false,
      middleName: false,
      lastName: false,
      gender: false,
      dateOfBirth: false,
      bloodGroup: false,
      mobile: false,
      email: false,
      patientId: false,
      address: false,
      insuranceProvider: false,
      policyNumber: false,
      groupNumber: false,
      insuranceHolderName: false,
      relationshipToPatient: false,
      existingConditions: false,
      currentMedications: false,
      allergies: false,
      previousSurgeries: false,
      contactName: false,
      contactRelationship: false,
      contactPhone: false,
      department: false,
      consultingDoctor: false,
      appointmentType: false,
      appointmentDate: false,
      reasonForVisit: false,
      symptoms: false,
      additionalNotes: false,
    });

    setSelectedTime("06:00 PM"); // Reset to default time
    
    // Reset file upload label
    const fileLabel = document.getElementById("fileLabel");
    if (fileLabel) {
      fileLabel.textContent = "or drag and drop file here";
    }
    
    // Clear the file input
    const fileInput = document.getElementById("fileUpload") as HTMLInputElement;
    if (fileInput) {
      fileInput.value = "";
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsPending(true);

    const formData = new FormData(e.currentTarget);
    const firstName = formData.get("firstName") as string;
    const gender = formData.get("gender") as string;
    const dateOfBirth = formData.get("dateOfBirth") as string;
    const mobile = formData.get("mobile") as string;
    const email = formData.get("email") as string;

    const errors: FormErrors = {};

    // Validation
    if (!firstName || firstName.trim().length === 0) {
      errors.firstName = "First name is required";
    }

    if (!dateOfBirth) {
      errors.dateOfBirth = "Date of birth is required";
    }

    if (!mobile || mobile.trim().length === 0) {
      errors.mobile = "Mobile number is required";
    } else if (!/^\d{11}$/.test(mobile.trim())) {
      errors.mobile = "Mobile number must be 11 digits";
    }

    if (!email || email.trim().length === 0) {
      errors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = "Invalid email format";
    }

    await new Promise((resolve) => setTimeout(resolve, 500));

    if (Object.keys(errors).length > 0) {
      setFormState({
        success: false,
        errors,
        message: "⚠️ Please fix the errors below",
      });
      setIsPending(false);
      return;
    }

    // Success - reset form and show success message
    setFormState({
      success: true,
      errors: {},
      message: "✅ Appointment Edited successfully!",
    });
    setIsPending(false);

    // Reset the form after successful submission
    resetForm();
  };

  return (
    <div className="px-4 sm:px-6 py-5 bg-gray-50 min-h-screen">
      {/* Breadcrumb */}
      <div className="flex items-center space-x-2 mb-6">
        <h1 className="text-[20px] font-semibold">Edit Appointment</h1>
        <span className="text-[20px] font-bold">›</span>
        <Home size={18} />
        <span>›</span>
        <span className="text-sm">Appointment</span>
        <span>›</span>
        <span className="text-sm">Edit</span>
      </div>

      {/* Form Container */}
      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-1">Edit Appointment</h2>
          <p className="text-gray-500 text-sm mb-6">
            Fill in the details to schedule a patient appointment
          </p>

          {/* Success/Error Message */}
          {formState.message && (
            <div
              className={`mb-6 p-3 rounded-md text-sm ${
                formState.success
                  ? "bg-green-50 text-green-700"
                  : "bg-red-50 text-red-700"
              }`}
            >
              {formState.message}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              {/* Patient Information Section */}
              <div>
                <div className="flex items-center mb-4">
                  <User className="w-5 h-5 text-blue-500 mr-2" />
                  <h3 className="text-lg font-medium text-blue-500">
                    Patient Information
                  </h3>
                </div>

                {/* Row 1: Names */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  {/* First Name */}
                  <div className="relative">
                    <input
                      type="text"
                      name="firstName"
                      id="firstName"
                      className={`w-full px-3 py-3 border rounded-md focus:outline-none peer ${
                        formState.errors.firstName
                          ? "border-red-500 focus:border-red-500"
                          : "border-gray-500 focus:border-blue-500"
                      }`}
                      onFocus={() => handleFieldFocus("firstName")}
                      onBlur={(e) =>
                        handleFieldBlur("firstName", e.target.value)
                      }
                      onChange={(e) => {
                        if (e.target.value) handleFieldFocus("firstName");
                      }}
                    />
                    <label
                      htmlFor="firstName"
                      className={`absolute left-3 transition-all duration-200 pointer-events-none ${
                        fieldStates.firstName
                          ? "text-xs -top-2 bg-white px-1 text-blue-500"
                          : "text-gray-500 top-3"
                      }`}
                    >
                      First name<span className="text-red-500">*</span>
                    </label>
                    {formState.errors.firstName && (
                      <p className="text-red-500 text-xs mt-1">
                        {formState.errors.firstName}
                      </p>
                    )}
                  </div>

                  {/* Middle Name */}
                  <div className="relative">
                    <input
                      type="text"
                      name="middleName"
                      id="middleName"
                      className="w-full px-3 py-3 border border-gray-500 rounded-md focus:outline-none focus:border-blue-500 peer"
                      onFocus={() => handleFieldFocus("middleName")}
                      onBlur={(e) =>
                        handleFieldBlur("middleName", e.target.value)
                      }
                      onChange={(e) => {
                        if (e.target.value) handleFieldFocus("middleName");
                      }}
                    />
                    <label
                      htmlFor="middleName"
                      className={`absolute left-3 transition-all duration-200 pointer-events-none ${
                        fieldStates.middleName
                          ? "text-xs -top-2 bg-white px-1 text-blue-500"
                          : "text-gray-500 top-3"
                      }`}
                    >
                      Middle name
                    </label>
                  </div>

                  {/* Last Name */}
                  <div className="relative">
                    <input
                      type="text"
                      name="lastName"
                      id="lastName"
                      className="w-full px-3 py-3 border border-gray-500 rounded-md focus:outline-none focus:border-blue-500 peer"
                      onFocus={() => handleFieldFocus("lastName")}
                      onBlur={(e) =>
                        handleFieldBlur("lastName", e.target.value)
                      }
                      onChange={(e) => {
                        if (e.target.value) handleFieldFocus("lastName");
                      }}
                    />
                    <label
                      htmlFor="lastName"
                      className={`absolute left-3 transition-all duration-200 pointer-events-none ${
                        fieldStates.lastName
                          ? "text-xs -top-2 bg-white px-1 text-blue-500"
                          : "text-gray-500 top-3"
                      }`}
                    >
                      Last name
                    </label>
                  </div>
                </div>

                {/* Row 2: Gender, DOB, Blood Group */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  {/* Gender */}
                  <div className="relative">
                    <select
                      name="gender"
                      id="gender"
                      className={`w-full px-3 py-3 border rounded-md focus:outline-none appearance-none bg-white peer ${
                        formState.errors.gender
                          ? "border-red-500 focus:border-red-500"
                          : "border-gray-500 focus:border-blue-500"
                      }`}
                      onFocus={() => handleFieldFocus("gender")}
                      onChange={(e) => {
                        if (e.target.value) handleFieldFocus("gender");
                        else handleFieldBlur("gender", "");
                      }}
                    >
                      <option value=""></option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                    <label
                      htmlFor="gender"
                      className={`absolute left-3 transition-all duration-200 pointer-events-none ${
                        fieldStates.gender
                          ? "text-xs -top-2 bg-white px-1 text-blue-500"
                          : "text-gray-500 top-3"
                      }`}
                    >
                      Gender<span className="text-red-500">*</span>
                    </label>
                    <div className="absolute right-3 top-3 pointer-events-none">
                      <svg
                        className="w-5 h-5 text-blue-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>
                    {formState.errors.gender && (
                      <p className="text-red-500 text-xs mt-1">
                        {formState.errors.gender}
                      </p>
                    )}
                  </div>

                  {/* Date of Birth */}
                  <div className="relative">
                    <input
                      type="date"
                      name="dateOfBirth"
                      id="dateOfBirth"
                      className={`w-full px-3 py-3 border rounded-md focus:outline-none peer ${
                        formState.errors.dateOfBirth
                          ? "border-red-500 focus:border-red-500"
                          : "border-gray-500 focus:border-blue-500"
                      }`}
                      onFocus={() => handleFieldFocus("dateOfBirth")}
                      onChange={(e) => {
                        if (e.target.value) handleFieldFocus("dateOfBirth");
                        else handleFieldBlur("dateOfBirth", "");
                      }}
                    />
                    <label
                      htmlFor="dateOfBirth"
                      className={`absolute left-3 transition-all duration-200 pointer-events-none ${
                        fieldStates.dateOfBirth
                          ? "text-xs -top-2 bg-white px-1 text-blue-500"
                          : "text-gray-500 top-3"
                      }`}
                    >
                      Date Of Birth<span className="text-red-500">*</span>
                    </label>
                    {formState.errors.dateOfBirth && (
                      <p className="text-red-500 text-xs mt-1">
                        {formState.errors.dateOfBirth}
                      </p>
                    )}
                  </div>

                  {/* Blood Group */}
                  <div className="relative">
                    <select
                      name="bloodGroup"
                      id="bloodGroup"
                      className="w-full px-3 py-3 border border-gray-500 rounded-md focus:outline-none focus:border-blue-500 appearance-none bg-white peer"
                      onFocus={() => handleFieldFocus("bloodGroup")}
                      onChange={(e) => {
                        if (e.target.value) handleFieldFocus("bloodGroup");
                        else handleFieldBlur("bloodGroup", "");
                      }}
                    >
                      <option value=""></option>
                      <option value="A+">A+</option>
                      <option value="A-">A-</option>
                      <option value="B+">B+</option>
                      <option value="B-">B-</option>
                      <option value="AB+">AB+</option>
                      <option value="AB-">AB-</option>
                      <option value="O+">O+</option>
                      <option value="O-">O-</option>
                    </select>
                    <label
                      htmlFor="bloodGroup"
                      className={`absolute left-3 transition-all duration-200 pointer-events-none ${
                        fieldStates.bloodGroup
                          ? "text-xs -top-2 bg-white px-1 text-blue-500"
                          : "text-gray-500 top-3"
                      }`}
                    >
                      Blood Group
                    </label>
                    <div className="absolute right-3 top-3 pointer-events-none">
                      <svg
                        className="w-5 h-5 text-blue-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Row 3: Mobile, Email, Patient ID */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  {/* Mobile */}
                  <div className="relative">
                    <input
                      type="tel"
                      name="mobile"
                      id="mobile"
                      className={`w-full px-3 py-3 border rounded-md focus:outline-none peer ${
                        formState.errors.mobile
                          ? "border-red-500 focus:border-red-500"
                          : "border-gray-500 focus:border-blue-500"
                      }`}
                      onFocus={() => handleFieldFocus("mobile")}
                      onBlur={(e) => handleFieldBlur("mobile", e.target.value)}
                      onChange={(e) => {
                        if (e.target.value) handleFieldFocus("mobile");
                      }}
                    />
                    <label
                      htmlFor="mobile"
                      className={`absolute left-3 transition-all duration-200 pointer-events-none ${
                        fieldStates.mobile
                          ? "text-xs -top-2 bg-white px-1 text-blue-500"
                          : "text-gray-500 top-3"
                      }`}
                    >
                      Mobile<span className="text-red-500">*</span>
                    </label>
                    {formState.errors.mobile && (
                      <p className="text-red-500 text-xs mt-1">
                        {formState.errors.mobile}
                      </p>
                    )}
                  </div>

                  {/* Email */}
                  <div className="relative">
                    <input
                      type="email"
                      name="email"
                      id="email"
                      className={`w-full px-3 py-3 border rounded-md focus:outline-none peer ${
                        formState.errors.email
                          ? "border-red-500 focus:border-red-500"
                          : "border-gray-200 focus:border-blue-500"
                      }`}
                      onFocus={() => handleFieldFocus("email")}
                      onBlur={(e) => handleFieldBlur("email", e.target.value)}
                      onChange={(e) => {
                        if (e.target.value) handleFieldFocus("email");
                      }}
                    />
                    <label
                      htmlFor="email"
                      className={`absolute left-3 transition-all duration-200 pointer-events-none ${
                        fieldStates.email
                          ? "text-xs -top-2 bg-white px-1 text-blue-500"
                          : "text-gray-500 top-3"
                      }`}
                    >
                      Email<span className="text-red-500">*</span>
                    </label>
                    {formState.errors.email && (
                      <p className="text-red-500 text-xs mt-1">
                        {formState.errors.email}
                      </p>
                    )}
                  </div>

                  {/* Patient ID */}
                  <div className="relative">
                    <input
                      type="text"
                      name="patientId"
                      id="patientId"
                      className="w-full px-3 py-3 border border-gray-500 rounded-md focus:outline-none focus:border-blue-500 peer"
                      onFocus={() => handleFieldFocus("patientId")}
                      onBlur={(e) =>
                        handleFieldBlur("patientId", e.target.value)
                      }
                      onChange={(e) => {
                        if (e.target.value) handleFieldFocus("patientId");
                      }}
                    />
                    <label
                      htmlFor="patientId"
                      className={`absolute left-3 transition-all duration-200 pointer-events-none ${
                        fieldStates.patientId
                          ? "text-xs -top-2 bg-white px-1 text-blue-500"
                          : "text-gray-500 top-3"
                      }`}
                    >
                      Patient ID (if existing)
                    </label>
                  </div>
                </div>

                {/* Row 4: Address */}
                <div className="relative">
                  <textarea
                    name="address"
                    id="address"
                    rows={3}
                    className="w-full px-3 py-3 border border-gray-500 rounded-md focus:outline-none focus:border-blue-500 resize-none peer"
                    onFocus={() => handleFieldFocus("address")}
                    onBlur={(e) => handleFieldBlur("address", e.target.value)}
                    onChange={(e) => {
                      if (e.target.value) handleFieldFocus("address");
                    }}
                  />
                  <label
                    htmlFor="address"
                    className={`absolute left-3 transition-all duration-200 pointer-events-none ${
                      fieldStates.address
                        ? "text-xs -top-2 bg-white px-1 text-blue-500"
                        : "text-gray-500 top-3"
                    }`}
                  >
                    Address
                  </label>
                </div>
              </div>

              {/* Insurance Information Section */}
              <div>
                <div className="flex items-center mb-4">
                  <svg
                    className="w-5 h-5 text-blue-500 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                  <h3 className="text-lg font-medium text-blue-500">
                    Insurance Information
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div className="relative">
                    <input
                      type="text"
                      name="insuranceProvider"
                      id="insuranceProvider"
                      className="w-full px-3 py-3 border border-gray-500 rounded-md focus:outline-none focus:border-blue-500 peer"
                      onFocus={() => handleFieldFocus("insuranceProvider")}
                      onBlur={(e) =>
                        handleFieldBlur("insuranceProvider", e.target.value)
                      }
                      onChange={(e) => {
                        if (e.target.value)
                          handleFieldFocus("insuranceProvider");
                      }}
                    />
                    <label
                      htmlFor="insuranceProvider"
                      className={`absolute left-3 transition-all duration-200 pointer-events-none ${
                        fieldStates.insuranceProvider
                          ? "text-xs -top-2 bg-white px-1 text-blue-500"
                          : "text-gray-500 top-3"
                      }`}
                    >
                      Insurance Provider
                    </label>
                  </div>

                  <div className="relative">
                    <input
                      type="text"
                      name="policyNumber"
                      id="policyNumber"
                      className="w-full px-3 py-3 border border-gray-500 rounded-md focus:outline-none focus:border-blue-500 peer"
                      onFocus={() => handleFieldFocus("policyNumber")}
                      onBlur={(e) =>
                        handleFieldBlur("policyNumber", e.target.value)
                      }
                      onChange={(e) => {
                        if (e.target.value) handleFieldFocus("policyNumber");
                      }}
                    />
                    <label
                      htmlFor="policyNumber"
                      className={`absolute left-3 transition-all duration-200 pointer-events-none ${
                        fieldStates.policyNumber
                          ? "text-xs -top-2 bg-white px-1 text-blue-500"
                          : "text-gray-500 top-3"
                      }`}
                    >
                      Policy Number
                    </label>
                  </div>

                  <div className="relative">
                    <input
                      type="text"
                      name="groupNumber"
                      id="groupNumber"
                      className="w-full px-3 py-3 border border-gray-500 rounded-md focus:outline-none focus:border-blue-500 peer"
                      onFocus={() => handleFieldFocus("groupNumber")}
                      onBlur={(e) =>
                        handleFieldBlur("groupNumber", e.target.value)
                      }
                      onChange={(e) => {
                        if (e.target.value) handleFieldFocus("groupNumber");
                      }}
                    />
                    <label
                      htmlFor="groupNumber"
                      className={`absolute left-3 transition-all duration-200 pointer-events-none ${
                        fieldStates.groupNumber
                          ? "text-xs -top-2 bg-white px-1 text-blue-500"
                          : "text-gray-500 top-3"
                      }`}
                    >
                      Group Number
                    </label>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="relative">
                    <input
                      type="text"
                      name="insuranceHolderName"
                      id="insuranceHolderName"
                      className="w-full px-3 py-3 border border-gray-500 rounded-md focus:outline-none focus:border-blue-500 peer"
                      onFocus={() => handleFieldFocus("insuranceHolderName")}
                      onBlur={(e) =>
                        handleFieldBlur("insuranceHolderName", e.target.value)
                      }
                      onChange={(e) => {
                        if (e.target.value)
                          handleFieldFocus("insuranceHolderName");
                      }}
                    />
                    <label
                      htmlFor="insuranceHolderName"
                      className={`absolute left-3 transition-all duration-200 pointer-events-none ${
                        fieldStates.insuranceHolderName
                          ? "text-xs -top-2 bg-white px-1 text-blue-500"
                          : "text-gray-500 top-3"
                      }`}
                    >
                      Insurance Holder Name (if not patient)
                    </label>
                  </div>

                  <div className="relative">
                    <select
                      name="relationshipToPatient"
                      id="relationshipToPatient"
                      className="w-full px-3 py-3 border border-gray-500 rounded-md focus:outline-none focus:border-blue-500 appearance-none bg-white peer"
                      onFocus={() => handleFieldFocus("relationshipToPatient")}
                      onChange={(e) => {
                        if (e.target.value)
                          handleFieldFocus("relationshipToPatient");
                        else handleFieldBlur("relationshipToPatient", "");
                      }}
                    >
                      <option value=""></option>
                      <option value="Self">Self</option>
                      <option value="Spouse">Spouse</option>
                      <option value="Parent">Parent</option>
                      <option value="Child">Child</option>
                      <option value="Other">Other</option>
                    </select>
                    <label
                      htmlFor="relationshipToPatient"
                      className={`absolute left-3 transition-all duration-200 pointer-events-none ${
                        fieldStates.relationshipToPatient
                          ? "text-xs -top-2 bg-white px-1 text-blue-500"
                          : "text-gray-500 top-3"
                      }`}
                    >
                      Relationship to Patient
                    </label>
                    <div className="absolute right-3 top-3 pointer-events-none">
                      <svg
                        className="w-5 h-5 text-blue-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              {/* Medical History Section */}
              <div>
                <div className="flex items-center mb-4">
                  <svg
                    className="w-5 h-5 text-blue-500 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  <h3 className="text-lg font-medium text-blue-500">
                    Medical History
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="relative">
                    <textarea
                      name="existingConditions"
                      id="existingConditions"
                      rows={3}
                      className="w-full px-3 py-3 border border-gray-500 rounded-md focus:outline-none focus:border-blue-500 resize-none peer"
                      onFocus={() => handleFieldFocus("existingConditions")}
                      onBlur={(e) =>
                        handleFieldBlur("existingConditions", e.target.value)
                      }
                      onChange={(e) => {
                        if (e.target.value)
                          handleFieldFocus("existingConditions");
                      }}
                    />
                    <label
                      htmlFor="existingConditions"
                      className={`absolute left-3 transition-all duration-200 pointer-events-none ${
                        fieldStates.existingConditions
                          ? "text-xs -top-2 bg-white px-1 text-blue-500"
                          : "text-gray-500 top-3"
                      }`}
                    >
                      Existing Medical Conditions
                    </label>
                  </div>

                  <div className="relative">
                    <textarea
                      name="currentMedications"
                      id="currentMedications"
                      rows={3}
                      className="w-full px-3 py-3 border border-gray-500 rounded-md focus:outline-none focus:border-blue-500 resize-none peer"
                      onFocus={() => handleFieldFocus("currentMedications")}
                      onBlur={(e) =>
                        handleFieldBlur("currentMedications", e.target.value)
                      }
                      onChange={(e) => {
                        if (e.target.value)
                          handleFieldFocus("currentMedications");
                      }}
                    />
                    <label
                      htmlFor="currentMedications"
                      className={`absolute left-3 transition-all duration-200 pointer-events-none ${
                        fieldStates.currentMedications
                          ? "text-xs -top-2 bg-white px-1 text-blue-500"
                          : "text-gray-500 top-3"
                      }`}
                    >
                      Current Medications
                    </label>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="relative">
                    <textarea
                      name="allergies"
                      id="allergies"
                      rows={3}
                      className="w-full px-3 py-3 border border-gray-500 rounded-md focus:outline-none focus:border-blue-500 resize-none peer"
                      onFocus={() => handleFieldFocus("allergies")}
                      onBlur={(e) =>
                        handleFieldBlur("allergies", e.target.value)
                      }
                      onChange={(e) => {
                        if (e.target.value) handleFieldFocus("allergies");
                      }}
                    />
                    <label
                      htmlFor="allergies"
                      className={`absolute left-3 transition-all duration-200 pointer-events-none ${
                        fieldStates.allergies
                          ? "text-xs -top-2 bg-white px-1 text-blue-500"
                          : "text-gray-500 top-3"
                      }`}
                    >
                      Allergies
                    </label>
                  </div>

                  <div className="relative">
                    <textarea
                      name="previousSurgeries"
                      id="previousSurgeries"
                      rows={3}
                      className="w-full px-3 py-3 border border-gray-500 rounded-md focus:outline-none focus:border-blue-500 resize-none peer"
                      onFocus={() => handleFieldFocus("previousSurgeries")}
                      onBlur={(e) =>
                        handleFieldBlur("previousSurgeries", e.target.value)
                      }
                      onChange={(e) => {
                        if (e.target.value)
                          handleFieldFocus("previousSurgeries");
                      }}
                    />
                    <label
                      htmlFor="previousSurgeries"
                      className={`absolute left-3 transition-all duration-200 pointer-events-none ${
                        fieldStates.previousSurgeries
                          ? "text-xs -top-2 bg-white px-1 text-blue-500"
                          : "text-gray-500 top-3"
                      }`}
                    >
                      Previous Surgeries
                    </label>
                  </div>
                </div>
              </div>

              {/* Emergency Contact Section */}
              <div>
                <div className="flex items-center mb-4">
                  <svg
                    className="w-5 h-5 text-blue-500 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    />
                  </svg>
                  <h3 className="text-lg font-medium text-blue-500">
                    Emergency Contact
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="relative">
                    <input
                      type="text"
                      name="contactName"
                      id="contactName"
                      className="w-full px-3 py-3 border border-gray-500 rounded-md focus:outline-none focus:border-blue-500 peer"
                      onFocus={() => handleFieldFocus("contactName")}
                      onBlur={(e) =>
                        handleFieldBlur("contactName", e.target.value)
                      }
                      onChange={(e) => {
                        if (e.target.value) handleFieldFocus("contactName");
                      }}
                    />
                    <label
                      htmlFor="contactName"
                      className={`absolute left-3 transition-all duration-200 pointer-events-none ${
                        fieldStates.contactName
                          ? "text-xs -top-2 bg-white px-1 text-blue-500"
                          : "text-gray-500 top-3"
                      }`}
                    >
                      Contact Name
                    </label>
                  </div>

                  <div className="relative">
                    <select
                      name="contactRelationship"
                      id="contactRelationship"
                      className="w-full px-3 py-3 border border-gray-500 rounded-md focus:outline-none focus:border-blue-500 appearance-none bg-white peer"
                      onFocus={() => handleFieldFocus("contactRelationship")}
                      onChange={(e) => {
                        if (e.target.value)
                          handleFieldFocus("contactRelationship");
                        else handleFieldBlur("contactRelationship", "");
                      }}
                    >
                      <option value=""></option>
                      <option value="Spouse">Spouse</option>
                      <option value="Parent">Parent</option>
                      <option value="Sibling">Sibling</option>
                      <option value="Friend">Friend</option>
                      <option value="Other">Other</option>
                    </select>
                    <label
                      htmlFor="contactRelationship"
                      className={`absolute left-3 transition-all duration-200 pointer-events-none ${
                        fieldStates.contactRelationship
                          ? "text-xs -top-2 bg-white px-1 text-blue-500"
                          : "text-gray-500 top-3"
                      }`}
                    >
                      Relationship
                    </label>
                    <div className="absolute right-3 top-3 pointer-events-none">
                      <svg
                        className="w-5 h-5 text-blue-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>
                  </div>

                  <div className="relative">
                    <input
                      type="tel"
                      name="contactPhone"
                      id="contactPhone"
                      className="w-full px-3 py-3 border border-gray-500 rounded-md focus:outline-none focus:border-blue-500 peer"
                      onFocus={() => handleFieldFocus("contactPhone")}
                      onBlur={(e) =>
                        handleFieldBlur("contactPhone", e.target.value)
                      }
                      onChange={(e) => {
                        if (e.target.value) handleFieldFocus("contactPhone");
                      }}
                    />
                    <label
                      htmlFor="contactPhone"
                      className={`absolute left-3 transition-all duration-200 pointer-events-none ${
                        fieldStates.contactPhone
                          ? "text-xs -top-2 bg-white px-1 text-blue-500"
                          : "text-gray-500 top-3"
                      }`}
                    >
                      Contact Phone
                    </label>
                  </div>
                </div>
              </div>

              {/* Appointment Details Section */}
              <div>
                <div className="flex items-center mb-4">
                  <svg
                    className="w-5 h-5 text-blue-500 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <h3 className="text-lg font-medium text-blue-500">
                    Appointment Details
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div className="relative">
                    <select
                      name="department"
                      id="department"
                      className="w-full px-3 py-3 border border-gray-500 rounded-md focus:outline-none focus:border-blue-500 appearance-none bg-white peer"
                      onFocus={() => handleFieldFocus("department")}
                      onChange={(e) => {
                        if (e.target.value) handleFieldFocus("department");
                        else handleFieldBlur("department", "");
                      }}
                    >
                      <option value=""></option>
                      <option value="Cardiology">Cardiology</option>
                      <option value="Neurology">Neurology</option>
                      <option value="Orthopedics">Orthopedics</option>
                      <option value="Pediatrics">Pediatrics</option>
                      <option value="General Medicine">General Medicine</option>
                    </select>
                    <label
                      htmlFor="department"
                      className={`absolute left-3 transition-all duration-200 pointer-events-none ${
                        fieldStates.department
                          ? "text-xs -top-2 bg-white px-1 text-blue-500"
                          : "text-gray-500 top-3"
                      }`}
                    >
                      Department<span className="text-red-500">*</span>
                    </label>
                    <div className="absolute right-3 top-3 pointer-events-none">
                      <svg
                        className="w-5 h-5 text-blue-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>
                  </div>

                  <div className="relative">
                    <select
                      name="consultingDoctor"
                      id="consultingDoctor"
                      className="w-full px-3 py-3 border border-gray-500 rounded-md focus:outline-none focus:border-blue-500 appearance-none bg-white peer"
                      onFocus={() => handleFieldFocus("consultingDoctor")}
                      onChange={(e) => {
                        if (e.target.value)
                          handleFieldFocus("consultingDoctor");
                        else handleFieldBlur("consultingDoctor", "");
                      }}
                    >
                      <option value=""></option>
                      <option value="Dr. Smith">Dr. Smith</option>
                      <option value="Dr. Johnson">Dr. Johnson</option>
                      <option value="Dr. Williams">Dr. Williams</option>
                      <option value="Dr. Brown">Dr. Brown</option>
                    </select>
                    <label
                      htmlFor="consultingDoctor"
                      className={`absolute left-3 transition-all duration-200 pointer-events-none ${
                        fieldStates.consultingDoctor
                          ? "text-xs -top-2 bg-white px-1 text-blue-500"
                          : "text-gray-500 top-3"
                      }`}
                    >
                      Consulting Doctor<span className="text-red-500">*</span>
                    </label>
                    <div className="absolute right-3 top-3 pointer-events-none">
                      <svg
                        className="w-5 h-5 text-blue-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>
                  </div>

                  <div className="relative">
                    <select
                      name="appointmentType"
                      id="appointmentType"
                      className="w-full px-3 py-3 border border-gray-500 rounded-md focus:outline-none focus:border-blue-500 appearance-none bg-white peer"
                      onFocus={() => handleFieldFocus("appointmentType")}
                      onChange={(e) => {
                        if (e.target.value) handleFieldFocus("appointmentType");
                        else handleFieldBlur("appointmentType", "");
                      }}
                    >
                      <option value=""></option>
                      <option value="New Patient">New Patient</option>
                      <option value="Follow-Up">Follow-Up</option>
                      <option value="Consultation">Consultation</option>
                      <option value="Emergency">Emergency</option>
                    </select>
                    <label
                      htmlFor="appointmentType"
                      className={`absolute left-3 transition-all duration-200 pointer-events-none ${
                        fieldStates.appointmentType
                          ? "text-xs -top-2 bg-white px-1 text-blue-500"
                          : "text-gray-500 top-3"
                      }`}
                    >
                      Appointment Type<span className="text-red-500">*</span>
                    </label>
                    <div className="absolute right-3 top-3 pointer-events-none">
                      <svg
                        className="w-5 h-5 text-blue-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="relative">
                    <input
                      type="date"
                      name="appointmentDate"
                      id="appointmentDate"
                      className="w-full px-3 py-3 border border-gray-500 rounded-md focus:outline-none focus:border-blue-500 peer"
                      onFocus={() => handleFieldFocus("appointmentDate")}
                      onChange={(e) => {
                        if (e.target.value) handleFieldFocus("appointmentDate");
                        else handleFieldBlur("appointmentDate", "");
                      }}
                    />
                    <label
                      htmlFor="appointmentDate"
                      className={`absolute left-3 transition-all duration-200 pointer-events-none ${
                        fieldStates.appointmentDate
                          ? "text-xs -top-2 bg-white px-1 text-blue-500"
                          : "text-gray-500 top-3"
                      }`}
                    >
                      Date Of Appointment<span className="text-red-500">*</span>
                    </label>
                  </div>

                  <div className="relative">
                    <textarea
                      name="reasonForVisit"
                      id="reasonForVisit"
                      rows={2}
                      className="w-full px-3 py-3 border border-gray-500 rounded-md focus:outline-none focus:border-blue-500 resize-none peer"
                      onFocus={() => handleFieldFocus("reasonForVisit")}
                      onBlur={(e) =>
                        handleFieldBlur("reasonForVisit", e.target.value)
                      }
                      onChange={(e) => {
                        if (e.target.value) handleFieldFocus("reasonForVisit");
                      }}
                    />
                    <label
                      htmlFor="reasonForVisit"
                      className={`absolute left-3 transition-all duration-200 pointer-events-none ${
                        fieldStates.reasonForVisit
                          ? "text-xs -top-2 bg-white px-1 text-blue-500"
                          : "text-gray-500 top-3"
                      }`}
                    >
                      Reason for Visit<span className="text-red-500">*</span>
                    </label>
                  </div>
                </div>

                {/* Time Selection */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Time Of Appointment:
                  </label>
                  <div className="border border-gray-500 rounded-lg p-4">
                    <div className="grid grid-cols-3 gap-4">
                      {/* Morning Column */}
                      <div>
                        <h4 className="font-semibold text-blue-600 mb-3 text-center">
                          Morning
                        </h4>
                        <div className="space-y-2">
                          {["09:00 AM", "10:00 AM", "11:00 AM"].map((time) => (
                            <div
                              key={time}
                              className={`flex items-center justify-center w-full py-2 px-3 border rounded-md cursor-pointer transition-all duration-200 ${
                                selectedTime === time
                                  ? "bg-blue-50 border-blue-500 text-blue-700"
                                  : "border-gray-300 hover:bg-gray-50"
                              }`}
                              onClick={() => setSelectedTime(time)}
                            >
                              <span className="text-sm">{time}</span>
                              {selectedTime === time && (
                                <div className="absolute right-2">
                                  <svg
                                    className="w-4 h-4 text-blue-500"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                  >
                                    <path
                                      fillRule="evenodd"
                                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                      clipRule="evenodd"
                                    />
                                  </svg>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Afternoon Column */}
                      <div>
                        <h4 className="font-semibold text-blue-600 mb-3 text-center">
                          Afternoon
                        </h4>
                        <div className="space-y-2">
                          {["01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM"].map(
                            (time) => (
                              <div
                                key={time}
                                className={`flex items-center justify-center w-full py-2 px-3 border rounded-md cursor-pointer transition-all duration-200 ${
                                  selectedTime === time
                                    ? "bg-blue-50 border-blue-500 text-blue-700"
                                    : "border-gray-300 hover:bg-gray-50"
                                }`}
                                onClick={() => setSelectedTime(time)}
                              >
                                <span className="text-sm">{time}</span>
                                {selectedTime === time && (
                                  <div className="absolute right-2">
                                    <svg
                                      className="w-4 h-4 text-blue-500"
                                      fill="currentColor"
                                      viewBox="0 0 20 20"
                                    >
                                      <path
                                        fillRule="evenodd"
                                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                        clipRule="evenodd"
                                      />
                                    </svg>
                                  </div>
                                )}
                              </div>
                            )
                          )}
                        </div>
                      </div>

                      {/* Evening Column */}
                      <div>
                        <h4 className="font-semibold text-blue-600 mb-3 text-center">
                          Evening
                        </h4>
                        <div className="space-y-2">
                          {["05:00 PM", "06:00 PM", "07:00 PM"].map((time) => (
                            <div
                              key={time}
                              className={`flex items-center justify-center w-full py-2 px-3 border rounded-md cursor-pointer transition-all duration-200 ${
                                selectedTime === time
                                  ? "bg-blue-50 border-blue-500 text-blue-700"
                                  : "border-gray-300 hover:bg-gray-50"
                              }`}
                              onClick={() => setSelectedTime(time)}
                            >
                              <span className="text-sm">{time}</span>
                              {selectedTime === time && (
                                <div className="absolute right-2">
                                  <svg
                                    className="w-4 h-4 text-blue-500"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                  >
                                    <path
                                      fillRule="evenodd"
                                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                      clipRule="evenodd"
                                    />
                                  </svg>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Hidden input to include in form submission */}
                    <input
                      type="hidden"
                      name="appointmentTime"
                      value={selectedTime}
                    />
                  </div>
                </div>
              </div>

              {/* Additional Information */}
              <div>
                <div className="grid grid-cols-1 gap-4 mb-4">
                  <div className="relative">
                    <textarea
                      name="symptoms"
                      id="symptoms"
                      rows={3}
                      className="w-full px-3 py-3 border border-gray-500 rounded-md focus:outline-none focus:border-blue-500 resize-none peer"
                      onFocus={() => handleFieldFocus("symptoms")}
                      onBlur={(e) =>
                        handleFieldBlur("symptoms", e.target.value)
                      }
                      onChange={(e) => {
                        if (e.target.value) handleFieldFocus("symptoms");
                      }}
                    />
                    <label
                      htmlFor="symptoms"
                      className={`absolute left-3 transition-all duration-200 pointer-events-none ${
                        fieldStates.symptoms
                          ? "text-xs -top-2 bg-white px-1 text-blue-500"
                          : "text-gray-500 top-3"
                      }`}
                    >
                      Symptoms/Condition
                    </label>
                  </div>

                  <div className="relative">
                    <textarea
                      name="additionalNotes"
                      id="additionalNotes"
                      rows={3}
                      className="w-full px-3 py-3 border border-gray-500 rounded-md focus:outline-none focus:border-blue-500 resize-none peer"
                      onFocus={() => handleFieldFocus("additionalNotes")}
                      onBlur={(e) =>
                        handleFieldBlur("additionalNotes", e.target.value)
                      }
                      onChange={(e) => {
                        if (e.target.value) handleFieldFocus("additionalNotes");
                      }}
                    />
                    <label
                      htmlFor="additionalNotes"
                      className={`absolute left-3 transition-all duration-200 pointer-events-none ${
                        fieldStates.additionalNotes
                          ? "text-xs -top-2 bg-white px-1 text-blue-500"
                          : "text-gray-500 top-3"
                      }`}
                    >
                      Additional Notes
                    </label>
                  </div>
                </div>

                {/* File Upload */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Upload Previous Medical Reports
                  </label>
                  <div className="border border-dashed border-gray-500 rounded-lg p-8 text-center hover:border-blue-400 transition">
                    <input
                      type="file"
                      id="fileUpload"
                      name="medicalReports"
                      multiple
                      accept=".pdf,.jpg,.jpeg,.png"
                      className="hidden"
                      onChange={(e) => {
                        const files = e.target.files;
                        if (files && files.length > 0) {
                          const fileNames = Array.from(files)
                            .map((f) => f.name)
                            .join(", ");
                          const label = document.getElementById("fileLabel");
                          if (label) {
                            label.textContent = `Selected: ${fileNames}`;
                          }
                        }
                      }}
                    />
                    <label htmlFor="fileUpload" className="cursor-pointer">
                      <div className="flex flex-col items-center">
                        <button
                          type="button"
                          className="px-4 py-2 bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100 transition mb-2"
                          onClick={() =>
                            document.getElementById("fileUpload")?.click()
                          }
                        >
                          Choose file
                        </button>
                        <p id="fileLabel" className="text-sm text-gray-500">
                          or drag and drop file here
                        </p>
                      </div>
                    </label>
                  </div>
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
                <button
                  type="button"
                  className="flex items-center gap-2 px-6 py-2.5 border border-gray-500 rounded-md text-blue-600 hover:bg-blue-50 transition"
                  disabled={isPending}
                  onClick={() => {
                    if (
                      window.confirm("Are you sure you want to reset the form?")
                    ) {
                      resetForm();
                      setFormState({ success: false, errors: {}, message: "" });
                    }
                  }}
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
                  Reset Form
                </button>
                <button
                  type="submit"
                  disabled={isPending}
                  className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
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
                  {isPending ? "Submitting..." : "Submit Appointment"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
