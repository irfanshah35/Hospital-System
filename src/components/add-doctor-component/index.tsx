"use client";
import React, { useRef, useState } from "react";
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
  EyeOff,
  ChevronDown,
  Eye,
  Users,
} from "lucide-react";

interface FormErrors {
  [key: string]: string;
}

interface FieldState {
  [key: string]: boolean;
}

interface FormData {
  firstName: string;
  middleName: string;
  lastName: string;
  gender: string;
  dateOfBirth: string;
  bloodGroup: string;
  email: string;
  mobile: string;
  alternativeContact: string;
  address: string;
  city: string;
  state: string;
  postalCode: string;
  password: string;
  reEnterPassword: string;
  designation: string;
  department: string;
  specialization: string;
  experience: string;
  licenseNumber: string;
  licenseExpiryDate: string;
  education: string;
  certifications: string;
  joiningDate: string;
  employeeId: string;
  roomCabinNumber: string;
  availableDays: string;
  startTime: string;
  endTime: string;
  emergencyContactName: string;
  emergencyContactNumber: string;
  relationship: string;
  profilePhoto: File | null;
  licenseDocument: File | null;
  educationCertificates: File | null;
  additionalDocuments: File | null;
}

export default function AddDoctorComponent() {
  const [fieldStates, setFieldStates] = useState<FieldState>({});
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    middleName: "",
    lastName: "",
    gender: "",
    dateOfBirth: "",
    bloodGroup: "",
    email: "",
    mobile: "",
    alternativeContact: "",
    address: "",
    city: "",
    state: "",
    postalCode: "",
    password: "",
    reEnterPassword: "",
    designation: "",
    department: "",
    specialization: "",
    experience: "",
    licenseNumber: "",
    licenseExpiryDate: "",
    education: "",
    certifications: "",
    joiningDate: "",
    employeeId: "",
    roomCabinNumber: "",
    availableDays: "",
    startTime: "",
    endTime: "",
    emergencyContactName: "",
    emergencyContactNumber: "",
    relationship: "",
    profilePhoto: null,
    licenseDocument: null,
    educationCertificates: null,
    additionalDocuments: null,
  });

  const handleFieldFocus = (field: string) => {
    setFieldStates((prev) => ({ ...prev, [field]: true }));
  };

  const handleFieldBlur = (field: string) => {
    setFieldStates((prev) => {
      const value = formData[field as keyof FormData];
      if (value instanceof File) {
        return { ...prev, [field]: true }; // Files are always considered "filled"
      }
      return { ...prev, [field]: String(value).length > 0 };
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setFieldStates((prev) => ({
      ...prev,
      [name]: value.trim().length > 0 || prev[name],
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  // File upload handler - ab yeh bhi formData ko update karega
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      setFormData((prev) => ({
        ...prev,
        [name]: files[0],
      }));

      setFieldStates((prev) => ({
        ...prev,
        [name]: true, // File selected, so field is filled
      }));
    }
  };

  const FileUpload = ({ label, name, accept }: any) => (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition cursor-pointer flex items-center gap-2" onClick={() => document.getElementById(name)?.click()}>
        <input
          type="file"
          id={name}
          name={name}
          accept={accept}
          className="hidden"
          onChange={handleFileChange}
        />
        <button
          type="button"
          className="px-4 py-2 bg-[#faf9fd] text-[#005cbb] hover:bg-[#E6ECF8] font-semibold rounded-full text-sm cursor-pointer shadow-md transition mb-2"

        >
          Choose file
        </button>
        <p className="text-sm text-gray-500">or drag and drop file here</p>
        {formData[name as keyof FormData] && (
          <p className="text-sm text-green-600 mt-2">
            {(formData[name as keyof FormData] as File)?.name}
          </p>
        )}
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

    const submitFormData = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value instanceof File) {
        if (value) submitFormData.append(key, value);
      } else {
        submitFormData.append(key, String(value));
      }
    });

    const newErrors: FormErrors = {};
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
      const value = formData[field as keyof typeof formData];
      if (!value || String(value).trim().length === 0) {
        newErrors[field] = message;
      }
    });
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (formData.mobile) {
      const digitsOnly = formData.mobile.replace(/\D/g, "");
      if (digitsOnly.length < 8 || digitsOnly.length > 20) {
        newErrors.mobile = "Mobile number must contain 8-20 digits";
      }
    }
    if (formData.password && formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (formData.password !== formData.reEnterPassword) {
      newErrors.reEnterPassword = "Passwords do not match";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setMessage({ type: "error", text: "⚠️ Please fix the errors below" });
      setIsSubmitting(false);
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    setTimeout(() => {
      console.log("🎯 COMPLETE DOCTOR DATA:");

      const logData: any = {};
      Object.entries(formData).forEach(([key, value]) => {
        if (value instanceof File) {
          logData[key] = `FILE: ${value.name} (${value.size} bytes)`;
        } else {
          logData[key] = value;
        }
      });
      console.table(logData);

      setMessage({ type: "success", text: "✅ Doctor registered successfully!" });
      setIsSubmitting(false);

      // Reset form
      setFormData({
        firstName: "",
        middleName: "",
        lastName: "",
        gender: "",
        dateOfBirth: "",
        bloodGroup: "",
        email: "",
        mobile: "",
        alternativeContact: "",
        address: "",
        city: "",
        state: "",
        postalCode: "",
        password: "",
        reEnterPassword: "",
        designation: "",
        department: "",
        specialization: "",
        experience: "",
        licenseNumber: "",
        licenseExpiryDate: "",
        education: "",
        certifications: "",
        joiningDate: "",
        employeeId: "",
        roomCabinNumber: "",
        availableDays: "",
        startTime: "",
        endTime: "",
        emergencyContactName: "",
        emergencyContactNumber: "",
        relationship: "",
        profilePhoto: null,
        licenseDocument: null,
        educationCertificates: null,
        additionalDocuments: null,
      });

      setFieldStates({});
      setShowPassword(false);
      setShowConfirmPassword(false);
      setErrors({});
      window.scrollTo({ top: 0, behavior: "smooth" });
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

          <form onSubmit={handleSubmit} className="space-y-6" encType="multipart/form-data">
            {/* Personal Information */}
            <div>
              <SectionHeader icon={User} title="Personal Information" />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <FloatingInput
                  label="First Name"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  icon={User}
                  required
                  error={errors.firstName}
                />
                <FloatingInput
                  label="Middle Name"
                  name="middleName"
                  value={formData.middleName}
                  onChange={handleChange}
                  icon={User}
                />
                <FloatingInput
                  label="Last Name"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  icon={User}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <FloatingSelect
                  label="Gender"
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  required
                  error={errors.gender}
                >
                  <option value=""></option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </FloatingSelect>
                <FloatingInput
                  label="Date of Birth"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                  type="date"
                  required
                  error={errors.dateOfBirth}
                />
                <FloatingSelect
                  label="Blood Group"
                  name="bloodGroup"
                  value={formData.bloodGroup}
                  onChange={handleChange}
                  required
                  error={errors.bloodGroup}
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
                </FloatingSelect>
              </div>
            </div>

            {/* Contact Information */}
            <div>
              <SectionHeader icon={MapPin} title="Contact Information" />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <FloatingInput
                  label="Email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  error={errors.email}
                />
                <FloatingInput
                  label="Mobile"
                  name="mobile"
                  type="tel"
                  value={formData.mobile}
                  onChange={handleChange}
                  required
                  error={errors.mobile}
                />
                <FloatingInput
                  label="Alternative Contact"
                  name="alternativeContact"
                  type="tel"
                  value={formData.alternativeContact}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-6">
                <FloatingTextarea
                  label="Address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  error={errors.address}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <FloatingInput
                  label="City"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                />
                <FloatingInput
                  label="State"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                />
                <FloatingInput
                  label="Postal Code"
                  name="postalCode"
                  value={formData.postalCode}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Account Information */}
            <div>
              <SectionHeader icon={Key} title="Account Information" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FloatingInput
                  label="Password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleChange}
                  required
                  error={errors.password}
                  showPassword={showPassword}
                  setShowPassword={setShowPassword}
                />
                <FloatingInput
                  label="Re-Enter Password"
                  name="reEnterPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={formData.reEnterPassword}
                  onChange={handleChange}
                  required
                  error={errors.reEnterPassword}
                  showPassword={showConfirmPassword}
                  setShowPassword={setShowConfirmPassword}
                />
              </div>
            </div>

            {/* Professional Information */}
            <div>
              <SectionHeader icon={Briefcase} title="Professional Information" />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <FloatingInput
                  label="Designation"
                  name="designation"
                  value={formData.designation}
                  onChange={handleChange}
                  required
                  error={errors.designation}
                />
                <FloatingSelect
                  label="Department"
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  required
                  error={errors.department}
                >
                  <option value=""></option>
                  <option value="Cardiology">Cardiology</option>
                  <option value="Neurology">Neurology</option>
                  <option value="Orthopedics">Orthopedics</option>
                  <option value="Pediatrics">Pediatrics</option>
                  <option value="General Medicine">General Medicine</option>
                </FloatingSelect>
                <FloatingInput
                  label="Specialization"
                  name="specialization"
                  value={formData.specialization}
                  onChange={handleChange}
                  required
                  error={errors.specialization}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <FloatingInput
                  label="Experience (Years)"
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                  required
                  error={errors.experience}
                />
                <FloatingInput
                  label="License Number"
                  name="licenseNumber"
                  value={formData.licenseNumber}
                  onChange={handleChange}
                  required
                  error={errors.licenseNumber}
                />
                <FloatingInput
                  label="License Expiry Date"
                  name="licenseExpiryDate"
                  type="date"
                  value={formData.licenseExpiryDate}
                  onChange={handleChange}
                  required
                  error={errors.licenseExpiryDate}
                />
              </div>
              <div className="mb-6">
                <FloatingTextarea
                  label="Education"
                  name="education"
                  value={formData.education}
                  onChange={handleChange}
                  required
                  error={errors.education}
                />
              </div>
              <div>
                <FloatingTextarea
                  label="Certifications"
                  name="certifications"
                  value={formData.certifications}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Hospital Information */}
            <div>
              <SectionHeader icon={Building2} title="Hospital Specific Information" />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <FloatingInput
                  label="Joining Date"
                  name="joiningDate"
                  type="date"
                  value={formData.joiningDate}
                  onChange={handleChange}
                  required
                  error={errors.joiningDate}
                />
                <FloatingInput
                  label="Employee ID"
                  name="employeeId"
                  value={formData.employeeId}
                  onChange={handleChange}
                  required
                  error={errors.employeeId}
                />
                <FloatingInput
                  label="Room/Cabin Number"
                  name="roomCabinNumber"
                  value={formData.roomCabinNumber}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Availability Information */}
            <div>
              <SectionHeader icon={Clock} title="Availability Information" />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <FloatingSelect
                  label="Available Days"
                  name="availableDays"
                  value={formData.availableDays}
                  onChange={handleChange}
                  required
                  error={errors.availableDays}
                >
                  <option value=""></option>
                  <option value="Monday-Friday">Monday-Friday</option>
                  <option value="Monday-Saturday">Monday-Saturday</option>
                  <option value="All Days">All Days</option>
                  <option value="Weekends Only">Weekends Only</option>
                </FloatingSelect>
                <FloatingInput
                  label="Start Time"
                  name="startTime"
                  type="time"
                  value={formData.startTime}
                  onChange={handleChange}
                  required
                  error={errors.startTime}
                />
                <FloatingInput
                  label="End Time"
                  name="endTime"
                  type="time"
                  value={formData.endTime}
                  onChange={handleChange}
                  required
                  error={errors.endTime}
                />
              </div>
            </div>

            {/* Emergency Contact */}
            <div>
              <SectionHeader icon={Phone} title="Emergency Contact Information" />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <FloatingInput
                  label="Emergency Contact Name"
                  name="emergencyContactName"
                  value={formData.emergencyContactName}
                  onChange={handleChange}
                />
                <FloatingInput
                  label="Emergency Contact Number"
                  name="emergencyContactNumber"
                  type="tel"
                  value={formData.emergencyContactNumber}
                  onChange={handleChange}
                />
                <FloatingInput
                  label="Relationship"
                  name="relationship"
                  value={formData.relationship}
                  onChange={handleChange}
                />
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
                className="px-8 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition disabled:opacity-50"
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

function FloatingInput({
  label,
  name,
  value,
  onChange,
  type = "text",
  icon: Icon,
  required = false,
  showPassword,
  setShowPassword,
  error,
}: any) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const isDate = type === "date";
  const isTime = type === "time";

  const handleContainerClick = () => {
    inputRef.current?.focus();
  };

  return (
    <div
      className="relative cursor-text"
      onClick={handleContainerClick} // Focus input when anywhere in container is clicked
    >
      <input
        ref={inputRef}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder=" "
        required={required}
        className={`peer w-full rounded-md border px-3 bg-white pt-4 pb-4 text-xs md:text-sm focus:border-blue-600 focus:ring-2 focus:ring-blue-600 outline-none transition-all ${error ? "border-red-500" : "border-gray-300"
          }`}
      />
      <label
        className={`absolute left-3 px-1 bg-white transition-all duration-200 text-xs md:text-sm ${value ? "-top-2 text-xs text-blue-600" : "top-3.5 text-gray-500"
          } peer-focus:-top-2 peer-focus:text-xs peer-focus:text-blue-600`}
      >
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      {Icon && !isDate && !isTime && (
        <Icon className="absolute top-3.5 right-3 w-4 h-4 md:w-5 md:h-5 text-gray-500" />
      )}

      {type === "password" && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation(); // prevent container click
            setShowPassword(!showPassword);
          }}
          className="absolute top-3.5 right-3 text-gray-500"
        >
          {showPassword ? (
            <EyeOff className="w-4 h-4 md:w-5 md:h-5" />
          ) : (
            <Eye className="w-4 h-4 md:w-5 md:h-5" />
          )}
        </button>
      )}

      {error && <span className="text-red-500 text-xs mt-1 block">{error}</span>}
    </div>
  );
}


function FloatingSelect({
  label,
  name,
  value,
  onChange,
  icon: Icon,
  required = false,
  children,
  error
}: any) {
  return (
    <div className="relative">
      <select
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className={`peer w-full appearance-none rounded-md border bg-white px-3 pt-4 pb-4 text-xs md:text-sm focus:border-blue-600 focus:ring-2 focus:ring-blue-600 outline-none transition-all ${error ? 'border-red-500' : 'border-gray-300'}`}
      >
        {children}
      </select>
      <label className={`absolute left-3 px-1 bg-white transition-all duration-200 text-xs md:text-sm ${value ? "-top-2 text-xs text-blue-600" : "top-3.5 text-gray-500"} peer-focus:-top-2 peer-focus:text-xs peer-focus:text-blue-600`}>
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {Icon && <Icon className="absolute top-3.5 left-3 w-4 h-4 md:w-5 md:h-5 text-gray-500" />}
      <ChevronDown className="absolute top-4 right-3 w-4 h-4 md:w-5 md:h-5 text-gray-500" />
      {error && <span className="text-red-500 text-xs mt-1 block">{error}</span>}
    </div>
  );
}

function FloatingTextarea({
  label,
  name,
  value,
  onChange,
  icon: Icon,
  required = false,
  rows = 3,
  error
}: any) {
  return (
    <div className="relative">
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        placeholder=" "
        required={required}
        rows={rows}
        className={`peer w-full rounded-md border bg-white px-3 pt-5 pb-3 text-xs md:text-sm focus:border-blue-600 focus:ring-2 focus:ring-blue-600 outline-none transition-all resize-none ${error ? 'border-red-500' : 'border-gray-300'}`}
      />
      <label className={`absolute left-3 px-1 bg-white transition-all duration-200 text-xs md:text-sm ${value ? "-top-2 text-xs text-blue-600" : "top-3.5 text-gray-500"} peer-focus:-top-2 peer-focus:text-xs peer-focus:text-blue-600`}>
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {Icon && <Icon className="absolute top-6 right-3 w-4 h-4 md:w-5 md:h-5 text-gray-500" />}
      {error && <span className="text-red-500 text-xs mt-1 block">{error}</span>}
    </div>
  );
}