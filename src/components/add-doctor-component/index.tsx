"use client";
import React, { useState } from "react";
import { Home, User, MapPin, Key, Briefcase, Building2, Clock, Phone, FileText } from "lucide-react";

interface FormErrors {
  firstName?: string;
  gender?: string;
  dateOfBirth?: string;
  email?: string;
  mobile?: string;
  password?: string;
  reEnterPassword?: string;
  designation?: string;
  department?: string;
  specialization?: string;
  experience?: string;
  licenseNumber?: string;
  licenseExpiryDate?: string;
  education?: string;
  joiningDate?: string;
  employeeId?: string;
  availableDays?: string;
  startTime?: string;
  endTime?: string;
}

interface FormState {
  success: boolean;
  errors: FormErrors;
  message: string;
}

export default function AddDoctorComponent() {
  const [formState, setFormState] = useState<FormState>({
    success: false,
    errors: {},
    message: "",
  });
  const [isPending, setIsPending] = useState(false);

  const [fieldStates, setFieldStates] = useState<Record<string, boolean>>({
    firstName: false,
    middleName: false,
    lastName: false,
    gender: false,
    dateOfBirth: false,
    bloodGroup: false,
    email: false,
    mobile: false,
    alternativeContact: false,
    address: false,
    city: false,
    state: false,
    postalCode: false,
    password: false,
    reEnterPassword: false,
    designation: false,
    department: false,
    specialization: false,
    experience: false,
    licenseNumber: false,
    licenseExpiryDate: false,
    education: false,
    certifications: false,
    joiningDate: false,
    employeeId: false,
    roomCabinNumber: false,
    availableDays: false,
    startTime: false,
    endTime: false,
    emergencyContactName: false,
    emergencyContactNumber: false,
    relationship: false,
  });

  const handleFieldFocus = (field: string) => {
    setFieldStates((prev) => ({ ...prev, [field]: true }));
  };

  const handleFieldBlur = (field: string, value: string) => {
    if (!value) {
      setFieldStates((prev) => ({ ...prev, [field]: false }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsPending(true);

    const formElement = e.target as HTMLFormElement;
    const formData = new FormData(formElement);

    const data: any = {};
    formData.forEach((value, key) => {
      data[key] = value;
    });

    const errors: FormErrors = {};

    if (!data.firstName || data.firstName.trim().length === 0) {
      errors.firstName = "First name is required";
    }

    if (!data.gender) {
      errors.gender = "Gender is required";
    }

    if (!data.dateOfBirth) {
      errors.dateOfBirth = "Date of birth is required";
    }

    if (!data.email || data.email.trim().length === 0) {
      errors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      errors.email = "Invalid email format";
    }

    if (!data.mobile || data.mobile.trim().length === 0) {
      errors.mobile = "Mobile number is required";
    } else if (!/^\d{10}$/.test(data.mobile.trim())) {
      errors.mobile = "Mobile number must be 10 digits";
    }

    if (!data.password || data.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }

    if (data.password !== data.reEnterPassword) {
      errors.reEnterPassword = "Passwords do not match";
    }

    if (!data.designation || data.designation.trim().length === 0) {
      errors.designation = "Designation is required";
    }

    if (!data.department) {
      errors.department = "Department is required";
    }

    if (!data.specialization || data.specialization.trim().length === 0) {
      errors.specialization = "Specialization is required";
    }

    if (!data.experience || data.experience.trim().length === 0) {
      errors.experience = "Experience is required";
    }

    if (!data.licenseNumber || data.licenseNumber.trim().length === 0) {
      errors.licenseNumber = "License number is required";
    }

    if (!data.licenseExpiryDate) {
      errors.licenseExpiryDate = "License expiry date is required";
    }

    if (!data.education || data.education.trim().length === 0) {
      errors.education = "Education is required";
    }

    if (!data.joiningDate) {
      errors.joiningDate = "Joining date is required";
    }

    if (!data.employeeId || data.employeeId.trim().length === 0) {
      errors.employeeId = "Employee ID is required";
    }

    if (!data.availableDays) {
      errors.availableDays = "Available days is required";
    }

    if (!data.startTime) {
      errors.startTime = "Start time is required";
    }

    if (!data.endTime) {
      errors.endTime = "End time is required";
    }

    setTimeout(() => {
      if (Object.keys(errors).length > 0) {
        setFormState({
          success: false,
          errors,
          message: "⚠️ Please fix the errors below",
        });
        setIsPending(false);
        return;
      }

      console.log("Doctor Form Data:", data);

      setFormState({
        success: true,
        errors: {},
        message: "✅ Doctor registered successfully!",
      });
      setIsPending(false);

      formElement.reset();
      setFieldStates({
        firstName: false,
        middleName: false,
        lastName: false,
        gender: false,
        dateOfBirth: false,
        bloodGroup: false,
        email: false,
        mobile: false,
        alternativeContact: false,
        address: false,
        city: false,
        state: false,
        postalCode: false,
        password: false,
        reEnterPassword: false,
        designation: false,
        department: false,
        specialization: false,
        experience: false,
        licenseNumber: false,
        licenseExpiryDate: false,
        education: false,
        certifications: false,
        joiningDate: false,
        employeeId: false,
        roomCabinNumber: false,
        availableDays: false,
        startTime: false,
        endTime: false,
        emergencyContactName: false,
        emergencyContactNumber: false,
        relationship: false,
      });
    }, 500);
  };

  return (
    <div className="px-4 sm:px-6 py-5 bg-gray-50 min-h-screen">
      <div className="flex items-center space-x-2 mb-6">
        <h1 className="text-[20px] font-semibold">Add Doctor</h1>
        <span className="text-[20px] font-bold">›</span>
        <Home size={18} />
        <span>›</span>
        <span className="text-sm">Doctors</span>
        <span>›</span>
        <span className="text-sm">Add Doctor</span>
      </div>

      <div className="bg-white rounded-xl shadow-sm">
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-1">Add Doctor</h2>
          <p className="text-gray-500 text-sm mb-6">
            Fill all the required information to register a new doctor
          </p>

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

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <div className="flex items-center mb-4">
                <User className="w-5 h-5 text-blue-500 mr-2" />
                <h3 className="text-lg font-medium text-blue-500">
                  Personal Information
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
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
                    onBlur={(e) => handleFieldBlur("firstName", e.target.value)}
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

                <div className="relative">
                  <input
                    type="text"
                    name="middleName"
                    id="middleName"
                    className="w-full px-3 py-3 border border-gray-500 rounded-md focus:outline-none focus:border-blue-500 peer"
                    onFocus={() => handleFieldFocus("middleName")}
                    onBlur={(e) => handleFieldBlur("middleName", e.target.value)}
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

                <div className="relative">
                  <input
                    type="text"
                    name="lastName"
                    id="lastName"
                    className="w-full px-3 py-3 border border-gray-500 rounded-md focus:outline-none focus:border-blue-500 peer"
                    onFocus={() => handleFieldFocus("lastName")}
                    onBlur={(e) => handleFieldBlur("lastName", e.target.value)}
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

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
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
                    <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                  {formState.errors.gender && (
                    <p className="text-red-500 text-xs mt-1">{formState.errors.gender}</p>
                  )}
                </div>

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
                    <p className="text-red-500 text-xs mt-1">{formState.errors.dateOfBirth}</p>
                  )}
                </div>

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
                    <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div className="flex items-center mb-4">
                <MapPin className="w-5 h-5 text-blue-500 mr-2" />
                <h3 className="text-lg font-medium text-blue-500">Contact Information</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className={`w-full px-3 py-3 border rounded-md focus:outline-none peer ${
                      formState.errors.email
                        ? "border-red-500 focus:border-red-500"
                        : "border-gray-500 focus:border-blue-500"
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
                    <p className="text-red-500 text-xs mt-1">{formState.errors.email}</p>
                  )}
                </div>

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
                    <p className="text-red-500 text-xs mt-1">{formState.errors.mobile}</p>
                  )}
                </div>

                <div className="relative">
                  <input
                    type="tel"
                    name="alternativeContact"
                    id="alternativeContact"
                    className="w-full px-3 py-3 border border-gray-500 rounded-md focus:outline-none focus:border-blue-500 peer"
                    onFocus={() => handleFieldFocus("alternativeContact")}
                    onBlur={(e) => handleFieldBlur("alternativeContact", e.target.value)}
                    onChange={(e) => {
                      if (e.target.value) handleFieldFocus("alternativeContact");
                    }}
                  />
                  <label
                    htmlFor="alternativeContact"
                    className={`absolute left-3 transition-all duration-200 pointer-events-none ${
                      fieldStates.alternativeContact
                        ? "text-xs -top-2 bg-white px-1 text-blue-500"
                        : "text-gray-500 top-3"
                    }`}
                  >
                    Alternative Contact
                  </label>
                </div>
              </div>

              <div className="relative mb-4">
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

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="relative">
                  <input
                    type="text"
                    name="city"
                    id="city"
                    className="w-full px-3 py-3 border border-gray-500 rounded-md focus:outline-none focus:border-blue-500 peer"
                    onFocus={() => handleFieldFocus("city")}
                    onBlur={(e) => handleFieldBlur("city", e.target.value)}
                    onChange={(e) => {
                      if (e.target.value) handleFieldFocus("city");
                    }}
                  />
                  <label
                    htmlFor="city"
                    className={`absolute left-3 transition-all duration-200 pointer-events-none ${
                      fieldStates.city
                        ? "text-xs -top-2 bg-white px-1 text-blue-500"
                        : "text-gray-500 top-3"
                    }`}
                  >
                    City
                  </label>
                </div>

                <div className="relative">
                  <input
                    type="text"
                    name="state"
                    id="state"
                    className="w-full px-3 py-3 border border-gray-500 rounded-md focus:outline-none focus:border-blue-500 peer"
                    onFocus={() => handleFieldFocus("state")}
                    onBlur={(e) => handleFieldBlur("state", e.target.value)}
                    onChange={(e) => {
                      if (e.target.value) handleFieldFocus("state");
                    }}
                  />
                  <label
                    htmlFor="state"
                    className={`absolute left-3 transition-all duration-200 pointer-events-none ${
                      fieldStates.state
                        ? "text-xs -top-2 bg-white px-1 text-blue-500"
                        : "text-gray-500 top-3"
                    }`}
                  >
                    State
                  </label>
                </div>

                <div className="relative">
                  <input
                    type="text"
                    name="postalCode"
                    id="postalCode"
                    className="w-full px-3 py-3 border border-gray-500 rounded-md focus:outline-none focus:border-blue-500 peer"
                    onFocus={() => handleFieldFocus("postalCode")}
                    onBlur={(e) => handleFieldBlur("postalCode", e.target.value)}
                    onChange={(e) => {
                      if (e.target.value) handleFieldFocus("postalCode");
                    }}
                  />
                  <label
                    htmlFor="postalCode"
                    className={`absolute left-3 transition-all duration-200 pointer-events-none ${
                      fieldStates.postalCode
                        ? "text-xs -top-2 bg-white px-1 text-blue-500"
                        : "text-gray-500 top-3"
                    }`}
                  >
                    Postal Code
                  </label>
                </div>
              </div>
            </div>

            <div>
              <div className="flex items-center mb-4">
                <Key className="w-5 h-5 text-blue-500 mr-2" />
                <h3 className="text-lg font-medium text-blue-500">Account Information</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="relative">
                  <input
                    type="password"
                    name="password"
                    id="password"
                    className={`w-full px-3 py-3 border rounded-md focus:outline-none peer ${
                      formState.errors.password
                        ? "border-red-500 focus:border-red-500"
                        : "border-gray-500 focus:border-blue-500"
                    }`}
                    onFocus={() => handleFieldFocus("password")}
                    onBlur={(e) => handleFieldBlur("password", e.target.value)}
                    onChange={(e) => {
                      if (e.target.value) handleFieldFocus("password");
                    }}
                  />
                  <label
                    htmlFor="password"
                    className={`absolute left-3 transition-all duration-200 pointer-events-none ${
                      fieldStates.password
                        ? "text-xs -top-2 bg-white px-1 text-blue-500"
                        : "text-gray-500 top-3"
                    }`}
                  >
                    Password<span className="text-red-500">*</span>
                  </label>
                  {formState.errors.password && (
                    <p className="text-red-500 text-xs mt-1">{formState.errors.password}</p>
                  )}
                </div>

                <div className="relative">
                  <input
                    type="password"
                    name="reEnterPassword"
                    id="reEnterPassword"
                    className={`w-full px-3 py-3 border rounded-md focus:outline-none peer ${
                      formState.errors.reEnterPassword
                        ? "border-red-500 focus:border-red-500"
                        : "border-gray-500 focus:border-blue-500"
                    }`}
                    onFocus={() => handleFieldFocus("reEnterPassword")}
                    onBlur={(e) => handleFieldBlur("reEnterPassword", e.target.value)}
                    onChange={(e) => {
                      if (e.target.value) handleFieldFocus("reEnterPassword");
                    }}
                  />
                  <label
                    htmlFor="reEnterPassword"
                    className={`absolute left-3 transition-all duration-200 pointer-events-none ${
                      fieldStates.reEnterPassword
                        ? "text-xs -top-2 bg-white px-1 text-blue-500"
                        : "text-gray-500 top-3"
                    }`}
                  >
                    Re-Enter Password<span className="text-red-500">*</span>
                  </label>
                  {formState.errors.reEnterPassword && (
                    <p className="text-red-500 text-xs mt-1">{formState.errors.reEnterPassword}</p>
                  )}
                </div>
              </div>
            </div>

            <div>
              <div className="flex items-center mb-4">
                <Briefcase className="w-5 h-5 text-blue-500 mr-2" />
                <h3 className="text-lg font-medium text-blue-500">Professional Information</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div className="relative">
                  <input
                    type="text"
                    name="designation"
                    id="designation"
                    className={`w-full px-3 py-3 border rounded-md focus:outline-none peer ${
                      formState.errors.designation
                        ? "border-red-500 focus:border-red-500"
                        : "border-gray-500 focus:border-blue-500"
                    }`}
                    onFocus={() => handleFieldFocus("designation")}
                    onBlur={(e) => handleFieldBlur("designation", e.target.value)}
                    onChange={(e) => {
                      if (e.target.value) handleFieldFocus("designation");
                    }}
                  />
                  <label
                    htmlFor="designation"
                    className={`absolute left-3 transition-all duration-200 pointer-events-none ${
                      fieldStates.designation
                        ? "text-xs -top-2 bg-white px-1 text-blue-500"
                        : "text-gray-500 top-3"
                    }`}
                  >
                    Designation<span className="text-red-500">*</span>
                  </label>
                  {formState.errors.designation && (
                    <p className="text-red-500 text-xs mt-1">{formState.errors.designation}</p>
                  )}
                </div>

                <div className="relative">
                  <select
                    name="department"
                    id="department"
                    className={`w-full px-3 py-3 border rounded-md focus:outline-none appearance-none bg-white peer ${
                      formState.errors.department
                        ? "border-red-500 focus:border-red-500"
                        : "border-gray-500 focus:border-blue-500"
                    }`}
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
                    Select Department<span className="text-red-500">*</span>
                  </label>
                  <div className="absolute right-3 top-3 pointer-events-none">
                    <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                  {formState.errors.department && (
                    <p className="text-red-500 text-xs mt-1">{formState.errors.department}</p>
                  )}
                </div>

                <div className="relative">
                  <input
                    type="text"
                    name="specialization"
                    id="specialization"
                    className={`w-full px-3 py-3 border rounded-md focus:outline-none peer ${
                      formState.errors.specialization
                        ? "border-red-500 focus:border-red-500"
                        : "border-gray-500 focus:border-blue-500"
                    }`}
                    onFocus={() => handleFieldFocus("specialization")}
                    onBlur={(e) => handleFieldBlur("specialization", e.target.value)}
                    onChange={(e) => {
                      if (e.target.value) handleFieldFocus("specialization");
                    }}
                  />
                  <label
                    htmlFor="specialization"
                    className={`absolute left-3 transition-all duration-200 pointer-events-none ${
                      fieldStates.specialization
                        ? "text-xs -top-2 bg-white px-1 text-blue-500"
                        : "text-gray-500 top-3"
                    }`}
                  >
                    Specialization<span className="text-red-500">*</span>
                  </label>
                  {formState.errors.specialization && (
                    <p className="text-red-500 text-xs mt-1">{formState.errors.specialization}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div className="relative">
                  <input
                    type="text"
                    name="experience"
                    id="experience"
                    className={`w-full px-3 py-3 border rounded-md focus:outline-none peer ${
                      formState.errors.experience
                        ? "border-red-500 focus:border-red-500"
                        : "border-gray-500 focus:border-blue-500"
                    }`}
                    onFocus={() => handleFieldFocus("experience")}
                    onBlur={(e) => handleFieldBlur("experience", e.target.value)}
                    onChange={(e) => {
                      if (e.target.value) handleFieldFocus("experience");
                    }}
                  />
                  <label
                    htmlFor="experience"
                    className={`absolute left-3 transition-all duration-200 pointer-events-none ${
                      fieldStates.experience
                        ? "text-xs -top-2 bg-white px-1 text-blue-500"
                        : "text-gray-500 top-3"
                    }`}
                  >
                    Experience (Years)<span className="text-red-500">*</span>
                  </label>
                  {formState.errors.experience && (
                    <p className="text-red-500 text-xs mt-1">{formState.errors.experience}</p>
                  )}
                </div>

                <div className="relative">
                  <input
                    type="text"
                    name="licenseNumber"
                    id="licenseNumber"
                    className={`w-full px-3 py-3 border rounded-md focus:outline-none peer ${
                      formState.errors.licenseNumber
                        ? "border-red-500 focus:border-red-500"
                        : "border-gray-500 focus:border-blue-500"
                    }`}
                    onFocus={() => handleFieldFocus("licenseNumber")}
                    onBlur={(e) => handleFieldBlur("licenseNumber", e.target.value)}
                    onChange={(e) => {
                      if (e.target.value) handleFieldFocus("licenseNumber");
                    }}
                  />
                  <label
                    htmlFor="licenseNumber"
                    className={`absolute left-3 transition-all duration-200 pointer-events-none ${
                      fieldStates.licenseNumber
                        ? "text-xs -top-2 bg-white px-1 text-blue-500"
                        : "text-gray-500 top-3"
                    }`}
                  >
                    License Number<span className="text-red-500">*</span>
                  </label>
                  {formState.errors.licenseNumber && (
                    <p className="text-red-500 text-xs mt-1">{formState.errors.licenseNumber}</p>
                  )}
                </div>

                <div className="relative">
                  <input
                    type="date"
                    name="licenseExpiryDate"
                    id="licenseExpiryDate"
                    className={`w-full px-3 py-3 border rounded-md focus:outline-none peer ${
                      formState.errors.licenseExpiryDate
                        ? "border-red-500 focus:border-red-500"
                        : "border-gray-500 focus:border-blue-500"
                    }`}
                    onFocus={() => handleFieldFocus("licenseExpiryDate")}
                    onChange={(e) => {
                      if (e.target.value) handleFieldFocus("licenseExpiryDate");
                      else handleFieldBlur("licenseExpiryDate", "");
                    }}
                  />
                  <label
                    htmlFor="licenseExpiryDate"
                    className={`absolute left-3 transition-all duration-200 pointer-events-none ${
                      fieldStates.licenseExpiryDate
                        ? "text-xs -top-2 bg-white px-1 text-blue-500"
                        : "text-gray-500 top-3"
                    }`}
                  >
                    License Expiry Date<span className="text-red-500">*</span>
                  </label>
                  {formState.errors.licenseExpiryDate && (
                    <p className="text-red-500 text-xs mt-1">{formState.errors.licenseExpiryDate}</p>
                  )}
                </div>
              </div>

              <div className="relative mb-4">
                <textarea
                  name="education"
                  id="education"
                  rows={3}
                  className={`w-full px-3 py-3 border rounded-md focus:outline-none resize-none peer ${
                    formState.errors.education
                      ? "border-red-500 focus:border-red-500"
                      : "border-gray-500 focus:border-blue-500"
                  }`}
                  onFocus={() => handleFieldFocus("education")}
                  onBlur={(e) => handleFieldBlur("education", e.target.value)}
                  onChange={(e) => {
                    if (e.target.value) handleFieldFocus("education");
                  }}
                />
                <label
                  htmlFor="education"
                  className={`absolute left-3 transition-all duration-200 pointer-events-none ${
                    fieldStates.education
                      ? "text-xs -top-2 bg-white px-1 text-blue-500"
                      : "text-gray-500 top-3"
                  }`}
                >
                  Education<span className="text-red-500">*</span>
                </label>
                {formState.errors.education && (
                  <p className="text-red-500 text-xs mt-1">{formState.errors.education}</p>
                )}
              </div>

              <div className="relative">
                <textarea
                  name="certifications"
                  id="certifications"
                  rows={3}
                  className="w-full px-3 py-3 border border-gray-500 rounded-md focus:outline-none focus:border-blue-500 resize-none peer"
                  onFocus={() => handleFieldFocus("certifications")}
                  onBlur={(e) => handleFieldBlur("certifications", e.target.value)}
                  onChange={(e) => {
                    if (e.target.value) handleFieldFocus("certifications");
                  }}
                />
                <label
                  htmlFor="certifications"
                  className={`absolute left-3 transition-all duration-200 pointer-events-none ${
                    fieldStates.certifications
                      ? "text-xs -top-2 bg-white px-1 text-blue-500"
                      : "text-gray-500 top-3"
                  }`}
                >
                  Certifications
                </label>
              </div>
            </div>

            <div>
              <div className="flex items-center mb-4">
                <Building2 className="w-5 h-5 text-blue-500 mr-2" />
                <h3 className="text-lg font-medium text-blue-500">Hospital Specific Information</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="relative">
                  <input
                    type="date"
                    name="joiningDate"
                    id="joiningDate"
                    className={`w-full px-3 py-3 border rounded-md focus:outline-none peer ${
                      formState.errors.joiningDate
                        ? "border-red-500 focus:border-red-500"
                        : "border-gray-500 focus:border-blue-500"
                    }`}
                    onFocus={() => handleFieldFocus("joiningDate")}
                    onChange={(e) => {
                      if (e.target.value) handleFieldFocus("joiningDate");
                      else handleFieldBlur("joiningDate", "");
                    }}
                  />
                  <label
                    htmlFor="joiningDate"
                    className={`absolute left-3 transition-all duration-200 pointer-events-none ${
                      fieldStates.joiningDate
                        ? "text-xs -top-2 bg-white px-1 text-blue-500"
                        : "text-gray-500 top-3"
                    }`}
                  >
                    Joining Date<span className="text-red-500">*</span>
                  </label>
                  {formState.errors.joiningDate && (
                    <p className="text-red-500 text-xs mt-1">{formState.errors.joiningDate}</p>
                  )}
                </div>

                <div className="relative">
                  <input
                    type="text"
                    name="employeeId"
                    id="employeeId"
                    className={`w-full px-3 py-3 border rounded-md focus:outline-none peer ${
                      formState.errors.employeeId
                        ? "border-red-500 focus:border-red-500"
                        : "border-gray-500 focus:border-blue-500"
                    }`}
                    onFocus={() => handleFieldFocus("employeeId")}
                    onBlur={(e) => handleFieldBlur("employeeId", e.target.value)}
                    onChange={(e) => {
                      if (e.target.value) handleFieldFocus("employeeId");
                    }}
                  />
                  <label
                    htmlFor="employeeId"
                    className={`absolute left-3 transition-all duration-200 pointer-events-none ${
                      fieldStates.employeeId
                        ? "text-xs -top-2 bg-white px-1 text-blue-500"
                        : "text-gray-500 top-3"
                    }`}
                  >
                    Employee ID<span className="text-red-500">*</span>
                  </label>
                  {formState.errors.employeeId && (
                    <p className="text-red-500 text-xs mt-1">{formState.errors.employeeId}</p>
                  )}
                </div>

                <div className="relative">
                  <input
                    type="text"
                    name="roomCabinNumber"
                    id="roomCabinNumber"
                    className="w-full px-3 py-3 border border-gray-500 rounded-md focus:outline-none focus:border-blue-500 peer"
                    onFocus={() => handleFieldFocus("roomCabinNumber")}
                    onBlur={(e) => handleFieldBlur("roomCabinNumber", e.target.value)}
                    onChange={(e) => {
                      if (e.target.value) handleFieldFocus("roomCabinNumber");
                    }}
                  />
                  <label
                    htmlFor="roomCabinNumber"
                    className={`absolute left-3 transition-all duration-200 pointer-events-none ${
                      fieldStates.roomCabinNumber
                        ? "text-xs -top-2 bg-white px-1 text-blue-500"
                        : "text-gray-500 top-3"
                    }`}
                  >
                    Room/Cabin Number
                  </label>
                </div>
              </div>
            </div>

            <div>
              <div className="flex items-center mb-4">
                <Clock className="w-5 h-5 text-blue-500 mr-2" />
                <h3 className="text-lg font-medium text-blue-500">Availability Information</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="relative">
                  <select
                    name="availableDays"
                    id="availableDays"
                    className={`w-full px-3 py-3 border rounded-md focus:outline-none appearance-none bg-white peer ${
                      formState.errors.availableDays
                        ? "border-red-500 focus:border-red-500"
                        : "border-gray-500 focus:border-blue-500"
                    }`}
                    onFocus={() => handleFieldFocus("availableDays")}
                    onChange={(e) => {
                      if (e.target.value) handleFieldFocus("availableDays");
                      else handleFieldBlur("availableDays", "");
                    }}
                  >
                    <option value=""></option>
                    <option value="Monday-Friday">Monday - Friday</option>
                    <option value="Monday-Saturday">Monday - Saturday</option>
                    <option value="All Days">All Days</option>
                    <option value="Weekends Only">Weekends Only</option>
                  </select>
                  <label
                    htmlFor="availableDays"
                    className={`absolute left-3 transition-all duration-200 pointer-events-none ${
                      fieldStates.availableDays
                        ? "text-xs -top-2 bg-white px-1 text-blue-500"
                        : "text-gray-500 top-3"
                    }`}
                  >
                    Available Days<span className="text-red-500">*</span>
                  </label>
                  <div className="absolute right-3 top-3 pointer-events-none">
                    <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                  {formState.errors.availableDays && (
                    <p className="text-red-500 text-xs mt-1">{formState.errors.availableDays}</p>
                  )}
                </div>

                <div className="relative">
                  <input
                    type="time"
                    name="startTime"
                    id="startTime"
                    className={`w-full px-3 py-3 border rounded-md focus:outline-none peer ${
                      formState.errors.startTime
                        ? "border-red-500 focus:border-red-500"
                        : "border-gray-500 focus:border-blue-500"
                    }`}
                    onFocus={() => handleFieldFocus("startTime")}
                    onChange={(e) => {
                      if (e.target.value) handleFieldFocus("startTime");
                      else handleFieldBlur("startTime", "");
                    }}
                  />
                  <label
                    htmlFor="startTime"
                    className={`absolute left-3 transition-all duration-200 pointer-events-none ${
                      fieldStates.startTime
                        ? "text-xs -top-2 bg-white px-1 text-blue-500"
                        : "text-gray-500 top-3"
                    }`}
                  >
                    Start Time<span className="text-red-500">*</span>
                  </label>
                  {formState.errors.startTime && (
                    <p className="text-red-500 text-xs mt-1">{formState.errors.startTime}</p>
                  )}
                </div>

                <div className="relative">
                  <input
                    type="time"
                    name="endTime"
                    id="endTime"
                    className={`w-full px-3 py-3 border rounded-md focus:outline-none peer ${
                      formState.errors.endTime
                        ? "border-red-500 focus:border-red-500"
                        : "border-gray-500 focus:border-blue-500"
                    }`}
                    onFocus={() => handleFieldFocus("endTime")}
                    onChange={(e) => {
                      if (e.target.value) handleFieldFocus("endTime");
                      else handleFieldBlur("endTime", "");
                    }}
                  />
                  <label
                    htmlFor="endTime"
                    className={`absolute left-3 transition-all duration-200 pointer-events-none ${
                      fieldStates.endTime
                        ? "text-xs -top-2 bg-white px-1 text-blue-500"
                        : "text-gray-500 top-3"
                    }`}
                  >
                    End Time<span className="text-red-500">*</span>
                  </label>
                  {formState.errors.endTime && (
                    <p className="text-red-500 text-xs mt-1">{formState.errors.endTime}</p>
                  )}
                </div>
              </div>
            </div>

            <div>
              <div className="flex items-center mb-4">
                <Phone className="w-5 h-5 text-blue-500 mr-2" />
                <h3 className="text-lg font-medium text-blue-500">Emergency Contact Information</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="relative">
                  <input
                    type="text"
                    name="emergencyContactName"
                    id="emergencyContactName"
                    className="w-full px-3 py-3 border border-gray-500 rounded-md focus:outline-none focus:border-blue-500 peer"
                    onFocus={() => handleFieldFocus("emergencyContactName")}
                    onBlur={(e) => handleFieldBlur("emergencyContactName", e.target.value)}
                    onChange={(e) => {
                      if (e.target.value) handleFieldFocus("emergencyContactName");
                    }}
                  />
                  <label
                    htmlFor="emergencyContactName"
                    className={`absolute left-3 transition-all duration-200 pointer-events-none ${
                      fieldStates.emergencyContactName
                        ? "text-xs -top-2 bg-white px-1 text-blue-500"
                        : "text-gray-500 top-3"
                    }`}
                  >
                    Emergency Contact Name
                  </label>
                </div>

                <div className="relative">
                  <input
                    type="tel"
                    name="emergencyContactNumber"
                    id="emergencyContactNumber"
                    className="w-full px-3 py-3 border border-gray-500 rounded-md focus:outline-none focus:border-blue-500 peer"
                    onFocus={() => handleFieldFocus("emergencyContactNumber")}
                    onBlur={(e) => handleFieldBlur("emergencyContactNumber", e.target.value)}
                    onChange={(e) => {
                      if (e.target.value) handleFieldFocus("emergencyContactNumber");
                    }}
                  />
                  <label
                    htmlFor="emergencyContactNumber"
                    className={`absolute left-3 transition-all duration-200 pointer-events-none ${
                      fieldStates.emergencyContactNumber
                        ? "text-xs -top-2 bg-white px-1 text-blue-500"
                        : "text-gray-500 top-3"
                    }`}
                  >
                    Emergency Contact Number
                  </label>
                </div>

                <div className="relative">
                  <input
                    type="text"
                    name="relationship"
                    id="relationship"
                    className="w-full px-3 py-3 border border-gray-500 rounded-md focus:outline-none focus:border-blue-500 peer"
                    onFocus={() => handleFieldFocus("relationship")}
                    onBlur={(e) => handleFieldBlur("relationship", e.target.value)}
                    onChange={(e) => {
                      if (e.target.value) handleFieldFocus("relationship");
                    }}
                  />
                  <label
                    htmlFor="relationship"
                    className={`absolute left-3 transition-all duration-200 pointer-events-none ${
                      fieldStates.relationship
                        ? "text-xs -top-2 bg-white px-1 text-blue-500"
                        : "text-gray-500 top-3"
                    }`}
                  >
                    Relationship
                  </label>
                </div>
              </div>
            </div>

            <div>
              <div className="flex items-center mb-4">
                <FileText className="w-5 h-5 text-blue-500 mr-2" />
                <h3 className="text-lg font-medium text-blue-500">Documents</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Profile Photo</label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition">
                    <input type="file" id="profilePhoto" name="profilePhoto" accept="image/*" className="hidden" />
                    <button
                      type="button"
                      className="px-4 py-2 bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100 transition mb-2"
                      onClick={() => document.getElementById("profilePhoto")?.click()}
                    >
                      Choose file
                    </button>
                    <p className="text-sm text-gray-500">or drag and drop file here</p>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">License Document</label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition">
                    <input type="file" id="licenseDocument" name="licenseDocument" accept=".pdf,.jpg,.jpeg,.png" className="hidden" />
                    <button
                      type="button"
                      className="px-4 py-2 bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100 transition mb-2"
                      onClick={() => document.getElementById("licenseDocument")?.click()}
                    >
                      Choose file
                    </button>
                    <p className="text-sm text-gray-500">or drag and drop file here</p>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Education Certificates</label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition">
                    <input type="file" id="educationCertificates" name="educationCertificates" multiple accept=".pdf,.jpg,.jpeg,.png" className="hidden" />
                    <button
                      type="button"
                      className="px-4 py-2 bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100 transition mb-2"
                      onClick={() => document.getElementById("educationCertificates")?.click()}
                    >
                      Choose file
                    </button>
                    <p className="text-sm text-gray-500">or drag and drop file here</p>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Additional Documents</label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition">
                    <input type="file" id="additionalDocuments" name="additionalDocuments" multiple accept=".pdf,.jpg,.jpeg,.png" className="hidden" />
                    <button
                      type="button"
                      className="px-4 py-2 bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100 transition mb-2"
                      onClick={() => document.getElementById("additionalDocuments")?.click()}
                    >
                      Choose file
                    </button>
                    <p className="text-sm text-gray-500">or drag and drop file here</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
              <button
                type="button"
                className="px-8 py-3 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
                disabled={isPending}
                onClick={() => {
                  if (window.confirm("Are you sure you want to cancel?")) {
                    window.location.reload();
                  }
                }}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isPending}
                className="px-8 py-3 bg-gray-400 text-white rounded-md hover:bg-gray-500 transition disabled:opacity-50"
              >
                {isPending ? "Submitting..." : "Submit"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}