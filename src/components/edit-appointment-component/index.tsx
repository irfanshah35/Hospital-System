"use client";
import React, { useState, useEffect } from "react";
import { Home, User } from "lucide-react";
import { useSearchParams, useRouter } from "next/navigation";

// Types for form state
interface FormErrors {
  firstname?: string;
  gender?: string;
  dateofbirth?: string;
  mobile?: string;
  email?: string;
  department?: string;
  consultingdoctor?: string;
  appointmenttype?: string;
  appointmentdate?: string;
  reasonforvisit?: string;
}

interface FormState {
  success: boolean;
  errors: FormErrors;
  message: string;
}

interface AppointmentData {
  id: string;
  firstname: string;
  middlename: string;
  lastname: string;
  gender: string;
  dateofbirth: string;
  bloodgroup: string;
  mobile: string;
  email: string;
  patientid: string;
  address: string;
  insuranceprovider: string;
  policynumber: string;
  groupnumber: string;
  insuranceholdername: string;
  relationshiptopatient: string;
  existingconditions: string;
  currentmedications: string;
  allergies: string;
  previoussurgeries: string;
  contactname: string;
  contactrelationship: string;
  contactphone: string;
  department: string;
  consultingdoctor: string;
  appointmenttype: string;
  appointmentdate: string;
  appointmenttime: string;
  reasonforvisit: string;
  symptoms: string;
  additionalnotes: string;
}

export default function EditAppointmentComponent() {
  const [formState, setFormState] = useState<FormState>({
    success: false,
    errors: {},
    message: "",
  });
  const [isPending, setIsPending] = useState(false);
  const [appointmentData, setAppointmentData] =
    useState<AppointmentData | null>(null);
  const [loading, setLoading] = useState(true);

  const searchParams = useSearchParams();
  const router = useRouter();
  const appointmentId = searchParams.get("id");

  // Track focused/filled state for floating labels
  const [fieldStates, setFieldStates] = useState<Record<string, boolean>>({
    firstname: false,
    middlename: false,
    lastname: false,
    gender: false,
    dateofbirth: false,
    bloodgroup: false,
    mobile: false,
    email: false,
    patientid: false,
    address: false,
    insuranceprovider: false,
    policynumber: false,
    groupnumber: false,
    insuranceholdername: false,
    relationshiptopatient: false,
    existingconditions: false,
    currentmedications: false,
    allergies: false,
    previoussurgeries: false,
    contactname: false,
    contactrelationship: false,
    contactphone: false,
    department: false,
    consultingdoctor: false,
    appointmenttype: false,
    appointmentdate: false,
    reasonforvisit: false,
    symptoms: false,
    additionalnotes: false,
  });

  const [selectedTime, setSelectedTime] = useState("06:00 PM");

  // Fetch appointment data
  useEffect(() => {
    const fetchAppointment = async () => {
      if (!appointmentId) return;

      setLoading(true);
      try {
        const res = await fetch(`/api/appointments/${appointmentId}`);
        const data = await res.json();
        setAppointmentData(data);

        // Set all field states to true since data will be prefilled
        const allFieldsTrue = Object.keys(fieldStates).reduce((acc, key) => {
          acc[key] = true;
          return acc;
        }, {} as Record<string, boolean>);
        setFieldStates(allFieldsTrue);

        // Set selected time
        if (data.appointmenttime) {
          setSelectedTime(data.appointmenttime);
        }
      } catch (error) {
        console.error("Failed to fetch appointment:", error);
        setFormState({
          success: false,
          errors: {},
          message: "❌ Failed to load appointment data",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchAppointment();
  }, [appointmentId]);

  const handleFieldFocus = (field: string) => {
    setFieldStates((prev) => ({ ...prev, [field]: true }));
  };

  const handleFieldBlur = (field: string, value: string) => {
    if (!value) {
      setFieldStates((prev) => ({ ...prev, [field]: false }));
    }
  };

  // Function to reset the entire form
  const resetForm = () => {
    const form = document.querySelector("form");
    if (form) form.reset();

    // Reset all field states to false (moves labels back to placeholder position)
    setFieldStates({
      firstname: false,
      middlename: false,
      lastname: false,
      gender: false,
      dateofbirth: false,
      bloodgroup: false,
      mobile: false,
      email: false,
      patientid: false,
      address: false,
      insuranceprovider: false,
      policynumber: false,
      groupnumber: false,
      insuranceholdername: false,
      relationshiptopatient: false,
      existingconditions: false,
      currentmedications: false,
      allergies: false,
      previoussurgeries: false,
      contactname: false,
      contactrelationship: false,
      contactphone: false,
      department: false,
      consultingdoctor: false,
      appointmenttype: false,
      appointmentdate: false,
      reasonforvisit: false,
      symptoms: false,
      additionalnotes: false,
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
    if (!appointmentId) return;

    setIsPending(true);

    const formData = new FormData(e.currentTarget);

    // Extract form data with lowercase field names
    const payloadData = {
      firstname: formData.get("firstname") as string,
      middlename: formData.get("middlename") as string,
      lastname: formData.get("lastname") as string,
      gender: formData.get("gender") as string,
      dateofbirth: formData.get("dateofbirth") as string,
      bloodgroup: formData.get("bloodgroup") as string,
      mobile: formData.get("mobile") as string,
      email: formData.get("email") as string,
      patientid: formData.get("patientid") as string,
      address: formData.get("address") as string,
      insuranceprovider: formData.get("insuranceprovider") as string,
      policynumber: formData.get("policynumber") as string,
      groupnumber: formData.get("groupnumber") as string,
      insuranceholdername: formData.get("insuranceholdername") as string,
      relationshiptopatient: formData.get("relationshiptopatient") as string,
      existingconditions: formData.get("existingconditions") as string,
      currentmedications: formData.get("currentmedications") as string,
      allergies: formData.get("allergies") as string,
      previoussurgeries: formData.get("previoussurgeries") as string,
      contactname: formData.get("contactname") as string,
      contactrelationship: formData.get("contactrelationship") as string,
      contactphone: formData.get("contactphone") as string,
      department: formData.get("department") as string,
      consultingdoctor: formData.get("consultingdoctor") as string,
      appointmenttype: formData.get("appointmenttype") as string,
      appointmentdate: formData.get("appointmentdate") as string,
      appointmenttime: selectedTime,
      reasonforvisit: formData.get("reasonforvisit") as string,
      symptoms: formData.get("symptoms") as string,
      additionalnotes: formData.get("additionalnotes") as string,
    };

    const {
      firstname,
      gender,
      dateofbirth,
      mobile,
      email,
      department,
      consultingdoctor,
      appointmenttype,
      appointmentdate,
      reasonforvisit,
    } = payloadData;

    const errors: FormErrors = {};

    // Validation
    if (!firstname || firstname.trim().length === 0) {
      errors.firstname = "First name is required";
    }

    if (!gender) {
      errors.gender = "Gender is required";
    }

    if (!dateofbirth) {
      errors.dateofbirth = "Date of birth is required";
    }

    if (!mobile || mobile.trim().length === 0) {
      errors.mobile = "Mobile number is required";
    } else if (!/^\d{10}$/.test(mobile.trim())) {
      errors.mobile = "Mobile number must be 10 digits";
    }

    if (!email || email.trim().length === 0) {
      errors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = "Invalid email format";
    }

    if (!department) {
      errors.department = "Department is required";
    }

    if (!consultingdoctor) {
      errors.consultingdoctor = "Consulting doctor is required";
    }

    if (!appointmenttype) {
      errors.appointmenttype = "Appointment type is required";
    }

    if (!appointmentdate) {
      errors.appointmentdate = "Appointment date is required";
    }

    if (!reasonforvisit || reasonforvisit.trim().length === 0) {
      errors.reasonforvisit = "Reason for visit is required";
    }

    if (Object.keys(errors).length > 0) {
      setFormState({
        success: false,
        errors,
        message: "⚠️ Please fix the errors below",
      });
      setIsPending(false);
      return;
    }

    try {
      // API call to update appointment
      console.log("Sending update payload:", payloadData);

      const response = await fetch(`/api/appointments/${appointmentId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payloadData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to update appointment");
      }

      // Success
      setFormState({
        success: true,
        errors: {},
        message: "✅ Appointment updated successfully!",
      });

      // Redirect back to appointments list after 2 seconds
      setTimeout(() => {
        router.push("/admin/appointment/view-appointment");
      }, 2000);
    } catch (error) {
      console.error("Appointment update error:", error);
      setFormState({
        success: false,
        errors: {},
        message: "❌ Failed to update appointment. Please try again.",
      });
    } finally {
      setIsPending(false);
    }
  };

  if (loading) {
    return (
      <div className="px-4 sm:px-6 py-5 bg-gray-50 min-h-screen">
        <div className="flex items-center space-x-2 mb-6">
          <h1 className="text-[20px] font-semibold">Edit Appointment</h1>
          <span className="text-[20px] font-bold">›</span>
          <Home size={18} />
          <span>›</span>
          <span className="text-sm">Appointment</span>
          <span>›</span>
          <span className="text-sm">Edit</span>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-8 text-center">
          <div className="text-gray-500">Loading appointment data...</div>
        </div>
      </div>
    );
  }

  if (!appointmentData) {
    return (
      <div className="px-4 sm:px-6 py-5 bg-gray-50 min-h-screen">
        <div className="flex items-center space-x-2 mb-6">
          <h1 className="text-[20px] font-semibold">Edit Appointment</h1>
          <span className="text-[20px] font-bold">›</span>
          <Home size={18} />
          <span>›</span>
          <span className="text-sm">Appointment</span>
          <span>›</span>
          <span className="text-sm">Edit</span>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-8 text-center">
          <div className="text-red-500">Appointment not found</div>
        </div>
      </div>
    );
  }

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
            Update the details of the patient appointment
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
                      name="firstname"
                      id="firstname"
                      defaultValue={appointmentData.firstname}
                      className={`w-full px-3 py-3 border rounded-md focus:outline-none peer ${
                        formState.errors.firstname
                          ? "border-red-500 focus:border-red-500"
                          : "border-gray-500 focus:border-blue-500"
                      }`}
                      onFocus={() => handleFieldFocus("firstname")}
                      onBlur={(e) =>
                        handleFieldBlur("firstname", e.target.value)
                      }
                      onChange={(e) => {
                        if (e.target.value) handleFieldFocus("firstname");
                      }}
                    />
                    <label
                      htmlFor="firstname"
                      className={`absolute left-3 transition-all duration-200 pointer-events-none ${
                        fieldStates.firstname
                          ? "text-xs -top-2 bg-white px-1 text-blue-500"
                          : "text-gray-500 top-3"
                      }`}
                    >
                      First name<span className="text-red-500">*</span>
                    </label>
                    {formState.errors.firstname && (
                      <p className="text-red-500 text-xs mt-1">
                        {formState.errors.firstname}
                      </p>
                    )}
                  </div>

                  {/* Middle Name */}
                  <div className="relative">
                    <input
                      type="text"
                      name="middlename"
                      id="middlename"
                      defaultValue={appointmentData.middlename}
                      className="w-full px-3 py-3 border border-gray-500 rounded-md focus:outline-none focus:border-blue-500 peer"
                      onFocus={() => handleFieldFocus("middlename")}
                      onBlur={(e) =>
                        handleFieldBlur("middlename", e.target.value)
                      }
                      onChange={(e) => {
                        if (e.target.value) handleFieldFocus("middlename");
                      }}
                    />
                    <label
                      htmlFor="middlename"
                      className={`absolute left-3 transition-all duration-200 pointer-events-none ${
                        fieldStates.middlename
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
                      name="lastname"
                      id="lastname"
                      defaultValue={appointmentData.lastname}
                      className="w-full px-3 py-3 border border-gray-500 rounded-md focus:outline-none focus:border-blue-500 peer"
                      onFocus={() => handleFieldFocus("lastname")}
                      onBlur={(e) =>
                        handleFieldBlur("lastname", e.target.value)
                      }
                      onChange={(e) => {
                        if (e.target.value) handleFieldFocus("lastname");
                      }}
                    />
                    <label
                      htmlFor="lastname"
                      className={`absolute left-3 transition-all duration-200 pointer-events-none ${
                        fieldStates.lastname
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
                      defaultValue={appointmentData.gender}
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
                      name="dateofbirth"
                      id="dateofbirth"
                      defaultValue={appointmentData.dateofbirth}
                      className={`w-full px-3 py-3 border rounded-md focus:outline-none peer ${
                        formState.errors.dateofbirth
                          ? "border-red-500 focus:border-red-500"
                          : "border-gray-500 focus:border-blue-500"
                      }`}
                      onFocus={() => handleFieldFocus("dateofbirth")}
                      onChange={(e) => {
                        if (e.target.value) handleFieldFocus("dateofbirth");
                        else handleFieldBlur("dateofbirth", "");
                      }}
                    />
                    <label
                      htmlFor="dateofbirth"
                      className={`absolute left-3 transition-all duration-200 pointer-events-none ${
                        fieldStates.dateofbirth
                          ? "text-xs -top-2 bg-white px-1 text-blue-500"
                          : "text-gray-500 top-3"
                      }`}
                    >
                      Date Of Birth<span className="text-red-500">*</span>
                    </label>
                    {formState.errors.dateofbirth && (
                      <p className="text-red-500 text-xs mt-1">
                        {formState.errors.dateofbirth}
                      </p>
                    )}
                  </div>

                  {/* Blood Group */}
                  <div className="relative">
                    <select
                      name="bloodgroup"
                      id="bloodgroup"
                      defaultValue={appointmentData.bloodgroup}
                      className="w-full px-3 py-3 border border-gray-500 rounded-md focus:outline-none focus:border-blue-500 appearance-none bg-white peer"
                      onFocus={() => handleFieldFocus("bloodgroup")}
                      onChange={(e) => {
                        if (e.target.value) handleFieldFocus("bloodgroup");
                        else handleFieldBlur("bloodgroup", "");
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
                      htmlFor="bloodgroup"
                      className={`absolute left-3 transition-all duration-200 pointer-events-none ${
                        fieldStates.bloodgroup
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
                      defaultValue={appointmentData.mobile}
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
                      defaultValue={appointmentData.email}
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
                      name="patientid"
                      id="patientid"
                      defaultValue={appointmentData.patientid}
                      className="w-full px-3 py-3 border border-gray-500 rounded-md focus:outline-none focus:border-blue-500 peer"
                      onFocus={() => handleFieldFocus("patientid")}
                      onBlur={(e) =>
                        handleFieldBlur("patientid", e.target.value)
                      }
                      onChange={(e) => {
                        if (e.target.value) handleFieldFocus("patientid");
                      }}
                    />
                    <label
                      htmlFor="patientid"
                      className={`absolute left-3 transition-all duration-200 pointer-events-none ${
                        fieldStates.patientid
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
                    defaultValue={appointmentData.address}
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
                      name="insuranceprovider"
                      id="insuranceprovider"
                      defaultValue={appointmentData.insuranceprovider}
                      className="w-full px-3 py-3 border border-gray-500 rounded-md focus:outline-none focus:border-blue-500 peer"
                      onFocus={() => handleFieldFocus("insuranceprovider")}
                      onBlur={(e) =>
                        handleFieldBlur("insuranceprovider", e.target.value)
                      }
                      onChange={(e) => {
                        if (e.target.value)
                          handleFieldFocus("insuranceprovider");
                      }}
                    />
                    <label
                      htmlFor="insuranceprovider"
                      className={`absolute left-3 transition-all duration-200 pointer-events-none ${
                        fieldStates.insuranceprovider
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
                      name="policynumber"
                      id="policynumber"
                      defaultValue={appointmentData.policynumber}
                      className="w-full px-3 py-3 border border-gray-500 rounded-md focus:outline-none focus:border-blue-500 peer"
                      onFocus={() => handleFieldFocus("policynumber")}
                      onBlur={(e) =>
                        handleFieldBlur("policynumber", e.target.value)
                      }
                      onChange={(e) => {
                        if (e.target.value) handleFieldFocus("policynumber");
                      }}
                    />
                    <label
                      htmlFor="policynumber"
                      className={`absolute left-3 transition-all duration-200 pointer-events-none ${
                        fieldStates.policynumber
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
                      name="groupnumber"
                      id="groupnumber"
                      defaultValue={appointmentData.groupnumber}
                      className="w-full px-3 py-3 border border-gray-500 rounded-md focus:outline-none focus:border-blue-500 peer"
                      onFocus={() => handleFieldFocus("groupnumber")}
                      onBlur={(e) =>
                        handleFieldBlur("groupnumber", e.target.value)
                      }
                      onChange={(e) => {
                        if (e.target.value) handleFieldFocus("groupnumber");
                      }}
                    />
                    <label
                      htmlFor="groupnumber"
                      className={`absolute left-3 transition-all duration-200 pointer-events-none ${
                        fieldStates.groupnumber
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
                      name="insuranceholdername"
                      id="insuranceholdername"
                      defaultValue={appointmentData.insuranceholdername}
                      className="w-full px-3 py-3 border border-gray-500 rounded-md focus:outline-none focus:border-blue-500 peer"
                      onFocus={() => handleFieldFocus("insuranceholdername")}
                      onBlur={(e) =>
                        handleFieldBlur("insuranceholdername", e.target.value)
                      }
                      onChange={(e) => {
                        if (e.target.value)
                          handleFieldFocus("insuranceholdername");
                      }}
                    />
                    <label
                      htmlFor="insuranceholdername"
                      className={`absolute left-3 transition-all duration-200 pointer-events-none ${
                        fieldStates.insuranceholdername
                          ? "text-xs -top-2 bg-white px-1 text-blue-500"
                          : "text-gray-500 top-3"
                      }`}
                    >
                      Insurance Holder Name (if not patient)
                    </label>
                  </div>

                  <div className="relative">
                    <select
                      name="relationshiptopatient"
                      id="relationshiptopatient"
                      defaultValue={appointmentData.relationshiptopatient}
                      className="w-full px-3 py-3 border border-gray-500 rounded-md focus:outline-none focus:border-blue-500 appearance-none bg-white peer"
                      onFocus={() => handleFieldFocus("relationshiptopatient")}
                      onChange={(e) => {
                        if (e.target.value)
                          handleFieldFocus("relationshiptopatient");
                        else handleFieldBlur("relationshiptopatient", "");
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
                      htmlFor="relationshiptopatient"
                      className={`absolute left-3 transition-all duration-200 pointer-events-none ${
                        fieldStates.relationshiptopatient
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
                      name="existingconditions"
                      id="existingconditions"
                      rows={3}
                      defaultValue={appointmentData.existingconditions}
                      className="w-full px-3 py-3 border border-gray-500 rounded-md focus:outline-none focus:border-blue-500 resize-none peer"
                      onFocus={() => handleFieldFocus("existingconditions")}
                      onBlur={(e) =>
                        handleFieldBlur("existingconditions", e.target.value)
                      }
                      onChange={(e) => {
                        if (e.target.value)
                          handleFieldFocus("existingconditions");
                      }}
                    />
                    <label
                      htmlFor="existingconditions"
                      className={`absolute left-3 transition-all duration-200 pointer-events-none ${
                        fieldStates.existingconditions
                          ? "text-xs -top-2 bg-white px-1 text-blue-500"
                          : "text-gray-500 top-3"
                      }`}
                    >
                      Existing Medical Conditions
                    </label>
                  </div>

                  <div className="relative">
                    <textarea
                      name="currentmedications"
                      id="currentmedications"
                      rows={3}
                      defaultValue={appointmentData.currentmedications}
                      className="w-full px-3 py-3 border border-gray-500 rounded-md focus:outline-none focus:border-blue-500 resize-none peer"
                      onFocus={() => handleFieldFocus("currentmedications")}
                      onBlur={(e) =>
                        handleFieldBlur("currentmedications", e.target.value)
                      }
                      onChange={(e) => {
                        if (e.target.value)
                          handleFieldFocus("currentmedications");
                      }}
                    />
                    <label
                      htmlFor="currentmedications"
                      className={`absolute left-3 transition-all duration-200 pointer-events-none ${
                        fieldStates.currentmedications
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
                      defaultValue={appointmentData.allergies}
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
                      name="previoussurgeries"
                      id="previoussurgeries"
                      rows={3}
                      defaultValue={appointmentData.previoussurgeries}
                      className="w-full px-3 py-3 border border-gray-500 rounded-md focus:outline-none focus:border-blue-500 resize-none peer"
                      onFocus={() => handleFieldFocus("previoussurgeries")}
                      onBlur={(e) =>
                        handleFieldBlur("previoussurgeries", e.target.value)
                      }
                      onChange={(e) => {
                        if (e.target.value)
                          handleFieldFocus("previoussurgeries");
                      }}
                    />
                    <label
                      htmlFor="previoussurgeries"
                      className={`absolute left-3 transition-all duration-200 pointer-events-none ${
                        fieldStates.previoussurgeries
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
                      name="contactname"
                      id="contactname"
                      defaultValue={appointmentData.contactname}
                      className="w-full px-3 py-3 border border-gray-500 rounded-md focus:outline-none focus:border-blue-500 peer"
                      onFocus={() => handleFieldFocus("contactname")}
                      onBlur={(e) =>
                        handleFieldBlur("contactname", e.target.value)
                      }
                      onChange={(e) => {
                        if (e.target.value) handleFieldFocus("contactname");
                      }}
                    />
                    <label
                      htmlFor="contactname"
                      className={`absolute left-3 transition-all duration-200 pointer-events-none ${
                        fieldStates.contactname
                          ? "text-xs -top-2 bg-white px-1 text-blue-500"
                          : "text-gray-500 top-3"
                      }`}
                    >
                      Contact Name
                    </label>
                  </div>

                  <div className="relative">
                    <select
                      name="contactrelationship"
                      id="contactrelationship"
                      defaultValue={appointmentData.contactrelationship}
                      className="w-full px-3 py-3 border border-gray-500 rounded-md focus:outline-none focus:border-blue-500 appearance-none bg-white peer"
                      onFocus={() => handleFieldFocus("contactrelationship")}
                      onChange={(e) => {
                        if (e.target.value)
                          handleFieldFocus("contactrelationship");
                        else handleFieldBlur("contactrelationship", "");
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
                      htmlFor="contactrelationship"
                      className={`absolute left-3 transition-all duration-200 pointer-events-none ${
                        fieldStates.contactrelationship
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
                      name="contactphone"
                      id="contactphone"
                      defaultValue={appointmentData.contactphone}
                      className="w-full px-3 py-3 border border-gray-500 rounded-md focus:outline-none focus:border-blue-500 peer"
                      onFocus={() => handleFieldFocus("contactphone")}
                      onBlur={(e) =>
                        handleFieldBlur("contactphone", e.target.value)
                      }
                      onChange={(e) => {
                        if (e.target.value) handleFieldFocus("contactphone");
                      }}
                    />
                    <label
                      htmlFor="contactphone"
                      className={`absolute left-3 transition-all duration-200 pointer-events-none ${
                        fieldStates.contactphone
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
                      defaultValue={appointmentData.department}
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
                    {formState.errors.department && (
                      <p className="text-red-500 text-xs mt-1">
                        {formState.errors.department}
                      </p>
                    )}
                  </div>

                  <div className="relative">
                    <select
                      name="consultingdoctor"
                      id="consultingdoctor"
                      defaultValue={appointmentData.consultingdoctor}
                      className={`w-full px-3 py-3 border rounded-md focus:outline-none appearance-none bg-white peer ${
                        formState.errors.consultingdoctor
                          ? "border-red-500 focus:border-red-500"
                          : "border-gray-500 focus:border-blue-500"
                      }`}
                      onFocus={() => handleFieldFocus("consultingdoctor")}
                      onChange={(e) => {
                        if (e.target.value)
                          handleFieldFocus("consultingdoctor");
                        else handleFieldBlur("consultingdoctor", "");
                      }}
                    >
                      <option value=""></option>
                      <option value="Dr. Smith">Dr. Smith</option>
                      <option value="Dr. Johnson">Dr. Johnson</option>
                      <option value="Dr. Williams">Dr. Williams</option>
                      <option value="Dr. Brown">Dr. Brown</option>
                    </select>
                    <label
                      htmlFor="consultingdoctor"
                      className={`absolute left-3 transition-all duration-200 pointer-events-none ${
                        fieldStates.consultingdoctor
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
                    {formState.errors.consultingdoctor && (
                      <p className="text-red-500 text-xs mt-1">
                        {formState.errors.consultingdoctor}
                      </p>
                    )}
                  </div>

                  <div className="relative">
                    <select
                      name="appointmenttype"
                      id="appointmenttype"
                      defaultValue={appointmentData.appointmenttype}
                      className={`w-full px-3 py-3 border rounded-md focus:outline-none appearance-none bg-white peer ${
                        formState.errors.appointmenttype
                          ? "border-red-500 focus:border-red-500"
                          : "border-gray-500 focus:border-blue-500"
                      }`}
                      onFocus={() => handleFieldFocus("appointmenttype")}
                      onChange={(e) => {
                        if (e.target.value) handleFieldFocus("appointmenttype");
                        else handleFieldBlur("appointmenttype", "");
                      }}
                    >
                      <option value=""></option>
                      <option value="New Patient">New Patient</option>
                      <option value="Follow-Up">Follow-Up</option>
                      <option value="Consultation">Consultation</option>
                      <option value="Emergency">Emergency</option>
                    </select>
                    <label
                      htmlFor="appointmenttype"
                      className={`absolute left-3 transition-all duration-200 pointer-events-none ${
                        fieldStates.appointmenttype
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
                    {formState.errors.appointmenttype && (
                      <p className="text-red-500 text-xs mt-1">
                        {formState.errors.appointmenttype}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="relative">
                    <input
                      type="date"
                      name="appointmentdate"
                      id="appointmentdate"
                      defaultValue={appointmentData.appointmentdate}
                      className={`w-full px-3 py-3 border rounded-md focus:outline-none peer ${
                        formState.errors.appointmentdate
                          ? "border-red-500 focus:border-red-500"
                          : "border-gray-500 focus:border-blue-500"
                      }`}
                      onFocus={() => handleFieldFocus("appointmentdate")}
                      onChange={(e) => {
                        if (e.target.value) handleFieldFocus("appointmentdate");
                        else handleFieldBlur("appointmentdate", "");
                      }}
                    />
                    <label
                      htmlFor="appointmentdate"
                      className={`absolute left-3 transition-all duration-200 pointer-events-none ${
                        fieldStates.appointmentdate
                          ? "text-xs -top-2 bg-white px-1 text-blue-500"
                          : "text-gray-500 top-3"
                      }`}
                    >
                      Date Of Appointment<span className="text-red-500">*</span>
                    </label>
                    {formState.errors.appointmentdate && (
                      <p className="text-red-500 text-xs mt-1">
                        {formState.errors.appointmentdate}
                      </p>
                    )}
                  </div>

                  <div className="relative">
                    <textarea
                      name="reasonforvisit"
                      id="reasonforvisit"
                      rows={2}
                      defaultValue={appointmentData.reasonforvisit}
                      className={`w-full px-3 py-3 border rounded-md focus:outline-none focus:border-blue-500 resize-none peer ${
                        formState.errors.reasonforvisit
                          ? "border-red-500 focus:border-red-500"
                          : "border-gray-500"
                      }`}
                      onFocus={() => handleFieldFocus("reasonforvisit")}
                      onBlur={(e) =>
                        handleFieldBlur("reasonforvisit", e.target.value)
                      }
                      onChange={(e) => {
                        if (e.target.value) handleFieldFocus("reasonforvisit");
                      }}
                    />
                    <label
                      htmlFor="reasonforvisit"
                      className={`absolute left-3 transition-all duration-200 pointer-events-none ${
                        fieldStates.reasonforvisit
                          ? "text-xs -top-2 bg-white px-1 text-blue-500"
                          : "text-gray-500 top-3"
                      }`}
                    >
                      Reason for Visit<span className="text-red-500">*</span>
                    </label>
                    {formState.errors.reasonforvisit && (
                      <p className="text-red-500 text-xs mt-1">
                        {formState.errors.reasonforvisit}
                      </p>
                    )}
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
                      defaultValue={appointmentData.symptoms}
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
                      name="additionalnotes"
                      id="additionalnotes"
                      rows={3}
                      defaultValue={appointmentData.additionalnotes}
                      className="w-full px-3 py-3 border border-gray-500 rounded-md focus:outline-none focus:border-blue-500 resize-none peer"
                      onFocus={() => handleFieldFocus("additionalnotes")}
                      onBlur={(e) =>
                        handleFieldBlur("additionalnotes", e.target.value)
                      }
                      onChange={(e) => {
                        if (e.target.value) handleFieldFocus("additionalnotes");
                      }}
                    />
                    <label
                      htmlFor="additionalnotes"
                      className={`absolute left-3 transition-all duration-200 pointer-events-none ${
                        fieldStates.additionalnotes
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
                  {isPending ? "Updating..." : "Update Appointment"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
