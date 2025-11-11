"use client";
import React, { useState } from "react";
import {
  Home,
  User,
  MapPin,
  Key,
  Briefcase,
  Building2,
  Clock,
  Phone,
  FileText,
} from "lucide-react";

interface FormErrors {
  [key: string]: string;
}

interface FieldState {
  [key: string]: boolean;
}

export default function AddDoctorComponent() {
  const [fieldStates, setFieldStates] = useState<FieldState>({});
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [formValues, setFormValues] = useState<Record<string, any>>({});

const handleFieldFocus = (field: string) => {
  setFieldStates((prev) => ({ ...prev, [field]: true }));
};

const handleFieldBlur = (field: string) => {
  setFieldStates((prev) => {
    const value = formValues[field] ?? "";
    return { ...prev, [field]: value.length > 0 };
  });
};

const handleInputChange = (
  e:
    | React.ChangeEvent<HTMLInputElement>
    | React.ChangeEvent<HTMLTextAreaElement>
    | React.ChangeEvent<HTMLSelectElement>
) => {
  const { name, value } = e.target;

  // Always update the value
  setFormValues((prev) => ({ ...prev, [name]: value }));

  // Keep fieldState true if user typed something OR field is focused
  setFieldStates((prev) => ({
    ...prev,
    [name]: value.length > 0 || prev[name] === true,
  }));
};



  const FloatingInput = ({
    id,
    label,
    name,
    type = "text",
    required = false,
    options = [],
  }: any) => (
    <div className="relative">
      {type === "select" ? (
        <>
          <select
            id={id || name}
            name={name}
            value={formValues[name] ?? ""}
            className={`w-full px-3 py-3 border rounded-md focus:outline-none appearance-none bg-white peer ${errors[name]
                ? "border-red-500"
                : "border-gray-500 focus:border-blue-500"
              }`}
            // onFocus={() => handleFieldFocus(name)}
            onChange={handleInputChange}
          >
            <option value=""></option>
            {options.map((opt: string) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
          <div className="absolute right-3 top-3 pointer-events-none">
            <svg
              className="w-5 h-5 text-gray-500"
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
        </>
      ) : type === "textarea" ? (
        <textarea
          id={id || name}
          name={name}
          rows={3}
          value={formValues[name] ?? ""}
          className={`w-full px-3 py-3 border rounded-md focus:outline-none resize-none peer ${errors[name]
              ? "border-red-500"
              : "border-gray-500 focus:border-blue-500"
            }`}
          // onFocus={() => handleFieldFocus(name)}
          onBlur={(e) => handleFieldBlur( e.target.value)}
          onChange={handleInputChange}
        />
      ) : (
        <input
          id={id || name}
          type={type}
          name={name}
          value={formValues[name] ?? ""}
          className={`w-full px-3 py-3 border rounded-md focus:outline-none peer ${errors[name]
              ? "border-red-500"
              : "border-gray-500 focus:border-blue-500"
            }`}
          // onFocus={() => handleFieldFocus(name)}
          onBlur={(e) => handleFieldBlur( e.target.value)}
          onChange={handleInputChange}
        />
      )}

      <label
        htmlFor={id || name}
        className={`absolute left-3 transition-all duration-200 pointer-events-none ${fieldStates[name]
            ? "text-xs -top-2 bg-white px-1 text-blue-500"
            : "text-gray-500 top-3"
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

  const FileUpload = ({ label, name, accept }: any) => (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition">
        <input type="file" id={name} name={name} accept={accept} className="hidden" />
        <button
          type="button"
          className="px-4 py-2 bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100 transition mb-2"
          onClick={() => document.getElementById(name)?.click()}
        >
          Choose file
        </button>
        <p className="text-sm text-gray-500">or drag and drop file here</p>
      </div>
    </div>
  );

  const SectionHeader = ({ icon: Icon, title }: any) => (
    <div className="flex items-center mb-4">
      <Icon className="w-5 h-5 text-blue-500 mr-2" />
      <h3 className="text-lg font-medium text-blue-500">{title}</h3>
    </div>
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.target as HTMLFormElement);
    const data = Object.fromEntries(formData);
    const newErrors: FormErrors = {};

    // Required fields validation
    const requiredFields: Record<string, string> = {
      firstName: "First name is required",
      gender: "Gender is required",
      dateOfBirth: "Date of birth is required",
      email: "Email is required",
      mobile: "Mobile number is required",
      password: "Password must be at least 6 characters",
      designation: "Designation is required",
      department: "Department is required",
      specialization: "Specialization is required",
      experience: "Experience is required",
      licenseNumber: "License number is required",
      licenseExpiryDate: "License expiry date is required",
      education: "Education is required",
      joiningDate: "Joining date is required",
      employeeId: "Employee ID is required",
      availableDays: "Available days is required",
      startTime: "Start time is required",
      endTime: "End time is required",
    };

    Object.entries(requiredFields).forEach(([field, message]) => {
      if (!data[field] || String(data[field]).trim().length === 0) {
        newErrors[field] = message;
      }
    });

    // Email validation
    if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(data.email))) {
      newErrors.email = "Invalid email format";
    }

    // Mobile validation
    if (data.mobile && !/^\d{10}$/.test(String(data.mobile).trim())) {
      newErrors.mobile = "Mobile number must be 10 digits";
    }

    // Password validation
    if (data.password && String(data.password).length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (data.password !== data.reEnterPassword) {
      newErrors.reEnterPassword = "Passwords do not match";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      setMessage({ type: "error", text: "⚠️ Please fix the errors below" });
      setIsSubmitting(false);
      return;
    }

    // Simulate API call
    setTimeout(() => {
      console.log("Doctor Data:", data);
      setMessage({ type: "success", text: "✅ Doctor registered successfully!" });
      setIsSubmitting(false);
      (e.target as HTMLFormElement).reset();
      setFieldStates({});
      setFormValues({});
    }, 500);
  };

  return (
    <div className="px-4 sm:px-6 py-5 bg-gray-50 min-h-screen">
      <div className="flex items-center flex-wrap space-x-2 mb-6">
        <h1 className="text-[20px] font-semibold">Add Doctor</h1>
        <span>›</span>
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

          {message.text && (
            <div
              className={`mb-6 p-3 rounded-md text-sm ${message.type === "success" ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"
                }`}
            >
              {message.text}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Information */}
            <div>
              <SectionHeader icon={User} title="Personal Information" />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
                <FloatingInput label="First name" name="firstName" id="firstName" required />
                <FloatingInput label="Middle name" id="middleName" name="middleName" />
                <FloatingInput label="Last name" name="lastName" id="lastName" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                <FloatingInput label="Gender" name="gender" type="select" id="gender" required
                  options={["Male", "Female", "Other"]} />
                <FloatingInput label="Date Of Birth" name="dateOfBirth" id="dob" type="date" required />
                <FloatingInput label="Blood Group" name="bloodGroup" id="bloodGroup" type="select"
                  options={["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]} />
              </div>
            </div>

            {/* Contact Information */}
            <div>
              <SectionHeader icon={MapPin} title="Contact Information" />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
                <FloatingInput label="Email" name="email" type="email" required id="email" />
                <FloatingInput label="Mobile" name="mobile" type="tel" required id="mob" />
                <FloatingInput label="Alternative Contact" name="alternativeContact" id="alternativeContact" type="tel" />
              </div>
              <div className="relative mb-12">
                <FloatingInput label="Address" name="address" id="address" type="textarea" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                <FloatingInput label="City" name="city" />
                <FloatingInput label="State" name="state" />
                <FloatingInput label="Postal Code" name="postalCode" />
              </div>
            </div>

            {/* Account Information */}
            <div>
              <SectionHeader icon={Key} title="Account Information" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <FloatingInput label="Password" name="password" type="password" required />
                <FloatingInput label="Re-Enter Password" name="reEnterPassword" type="password" required />
              </div>
            </div>

            {/* Professional Information */}
            <div>
              <SectionHeader icon={Briefcase} title="Professional Information" />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
                <FloatingInput label="Designation" name="designation" required />
                <FloatingInput label="Select Department" name="department" type="select" required
                  options={["Cardiology", "Neurology", "Orthopedics", "Pediatrics", "General Medicine"]} />
                <FloatingInput label="Specialization" name="specialization" required />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
                <FloatingInput label="Experience (Years)" name="experience" required />
                <FloatingInput label="License Number" name="licenseNumber" required />
                <FloatingInput label="License Expiry Date" name="licenseExpiryDate" type="date" required />
              </div>
              <div className="relative mb-12">
                <FloatingInput label="Education" name="education" type="textarea" required />
              </div>
              <div className="relative">
                <FloatingInput label="Certifications" name="certifications" type="textarea" />
              </div>
            </div>

            {/* Hospital Information */}
            <div>
              <SectionHeader icon={Building2} title="Hospital Specific Information" />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                <FloatingInput label="Joining Date" name="joiningDate" type="date" required />
                <FloatingInput label="Employee ID" name="employeeId" required />
                <FloatingInput label="Room/Cabin Number" name="roomCabinNumber" />
              </div>
            </div>

            {/* Availability Information */}
            <div>
              <SectionHeader icon={Clock} title="Availability Information" />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                <FloatingInput label="Available Days" name="availableDays" type="select" required
                  options={["Monday-Friday", "Monday-Saturday", "All Days", "Weekends Only"]} />
                <FloatingInput label="Start Time" name="startTime" type="time" required />
                <FloatingInput label="End Time" name="endTime" type="time" required />
              </div>
            </div>

            {/* Emergency Contact */}
            <div>
              <SectionHeader icon={Phone} title="Emergency Contact Information" />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                <FloatingInput label="Emergency Contact Name" name="emergencyContactName" />
                <FloatingInput label="Emergency Contact Number" name="emergencyContactNumber" type="tel" />
                <FloatingInput label="Relationship" name="relationship" />
              </div>
            </div>

            {/* Documents */}
            <div>
              <SectionHeader icon={FileText} title="Documents" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FileUpload label="Profile Photo" name="profilePhoto" accept="image/*" />
                <FileUpload label="License Document" name="licenseDocument" accept=".pdf,.jpg,.jpeg,.png" />
                <FileUpload label="Education Certificates" name="educationCertificates" accept=".pdf,.jpg,.jpeg,.png" />
                <FileUpload label="Additional Documents" name="additionalDocuments" accept=".pdf,.jpg,.jpeg,.png" />
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
              <button
                type="button"
                className="px-8 py-3 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
                onClick={() => window.confirm("Are you sure?") && window.location.reload()}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-8 py-3 bg-gray-400 text-white rounded-md hover:bg-gray-500 transition disabled:opacity-50"
              >
                {isSubmitting ? "Submitting..." : "Submit"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
