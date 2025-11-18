"use client";
import React, { useState } from "react";
import { Home, Building2, Bed } from "lucide-react";

interface FormErrors {
  [key: string]: string;
}

export default function AddRoomComponent() {
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<any>({});

  const handleInputChange = (name: string, value: string) => {
    setFormData((prev: any) => ({ ...prev, [name]: value }));
    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const InputField = ({
    label,
    name,
    type = "text",
    required = false,
    icon: Icon,
    placeholder = "",
    options = [],
  }: any) => (
    <div className="relative">
      <div className="relative">
        {Icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
            <Icon size={20} />
          </div>
        )}
        {type === "select" ? (
          <>
            <select
              name={name}
              value={formData[name] || ""}
              onChange={(e) => handleInputChange(name, e.target.value)}
              className={`w-full ${Icon ? 'pl-12' : 'pl-3'} pr-10 py-3 border rounded-md focus:outline-none focus:border-blue-500 appearance-none bg-white ${errors[name] ? "border-red-500" : "border-gray-300"
                }`}
            >
              <option value="">{label}{required && "*"}</option>
              {options.map((opt: string) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
              <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </>
        ) : type === "textarea" ? (
          <textarea
            name={name}
            value={formData[name] || ""}
            onChange={(e) => handleInputChange(name, e.target.value)}
            placeholder={label + (required ? "*" : "")}
            rows={4}
            className={`w-full ${Icon ? 'pl-12' : 'pl-3'} pr-3 pt-3 pb-3 border rounded-md focus:outline-none focus:border-blue-500 resize-none ${errors[name] ? "border-red-500" : "border-gray-300"
              }`}
          />
        ) : (
          <input
            type={type}
            name={name}
            value={formData[name] || ""}
            onChange={(e) => handleInputChange(name, e.target.value)}
            placeholder={label + (required ? "*" : "")}
            className={`w-full ${Icon ? 'pl-12' : 'pl-3'} pr-3 py-3 border rounded-md focus:outline-none focus:border-blue-500 ${errors[name] ? "border-red-500" : "border-gray-300"
              }`}
          />
        )}
      </div>
      {placeholder && (
        <p className="text-xs text-gray-500 mt-1">{placeholder}</p>
      )}
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

    // Required fields validation
    const requiredFields = {
      roomNumber: "Room number is required",
      departmentName: "Department name is required",
      roomType: "Room type is required",
      floor: "Floor is required",
      bedCapacity: "Bed capacity is required",
      roomStatus: "Room status is required",
      roomCategory: "Room category is required",
      assignedStaff: "Assigned staff is required",
      roomFeatures: "Room features are required",
      roomRate: "Room rate is required",
    };

    Object.entries(requiredFields).forEach(([field, message]) => {
      if (!formData[field] || String(formData[field]).trim().length === 0) {
        newErrors[field] = message;
      }
    });

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      setIsSubmitting(false);
      return;
    }

    // Console log the submitted data
    console.log("Room Data:", formData);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      alert("Room added successfully!");
      setFormData({});
    }, 500);
  };

  const handleReset = () => {
    setFormData({});
    setErrors({});
  };

  return (
    <div className="px-4 sm:px-6 py-5 bg-gray-50 min-h-screen">
      <div className="flex items-center space-x-2 mb-6 text-gray-700">
        <h1 className="text-[20px] font-semibold text-gray-800">Add Room</h1>
        <span>›</span>
        <Home size={18} />
        <span>›</span>
        <span className="text-sm">Room</span>
        <span>›</span>
        <span className="text-sm">Add Room</span>
      </div>

      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-6 text-gray-700">
            Add New Room
          </h2>

          <div className="space-y-6">
            {/* Room Information */}
            <div>
              <SectionHeader icon={Building2} title="Room Information" />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <InputField
                  label="Room Number"
                  name="roomNumber"
                  required
                  icon={({ size }: any) => (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
                    </svg>
                  )}
                  placeholder="Enter a unique room identifier"
                />
                <InputField
                  label="Department Name"
                  name="departmentName"
                  required
                  icon={Building2}
                  placeholder="Department this room belongs to"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <InputField
                  label="Room Type"
                  name="roomType"
                  type="select"
                  required
                  icon={({ size }: any) => (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                  )}
                  placeholder="Select the type of room"
                  options={["General Ward", "Semi-Private", "Private", "ICU", "Deluxe", "Suite"]}
                />
                <InputField
                  label="Floor"
                  name="floor"
                  required
                  icon={({ size }: any) => (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                    </svg>
                  )}
                  placeholder="Floor number where room is located"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InputField
                  label="Bed Capacity"
                  name="bedCapacity"
                  type="number"
                  required
                  icon={Bed}
                  placeholder="Number of beds in this room"
                />
                <InputField
                  label="Room Status"
                  name="roomStatus"
                  type="select"
                  required
                  icon={({ size }: any) => (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  )}
                  placeholder="Current availability status"
                  options={["Available", "Occupied", "Under Maintenance", "Reserved"]}
                />
              </div>
            </div>

            {/* Room Facilities */}
            <div>
              <SectionHeader icon={Bed} title="Room Facilities" />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <InputField
                  label="Room Category"
                  name="roomCategory"
                  type="select"
                  required
                  icon={({ size }: any) => (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  )}
                  placeholder="Select the category of room"
                  options={["Standard", "Premium", "VIP", "Economy", "Luxury"]}
                />
                <InputField
                  label="Assigned Staff"
                  name="assignedStaff"
                  required
                  icon={({ size }: any) => (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  )}
                  placeholder="Staff responsible for this room"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <InputField
                  label="Room Features"
                  name="roomFeatures"
                  required
                  icon={({ size }: any) => (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                    </svg>
                  )}
                  placeholder="List key features (e.g., TV, AC, etc.)"
                />
                <InputField
                  label="Room Rate"
                  name="roomRate"
                  type="number"
                  required
                  icon={({ size }: any) => (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  )}
                  placeholder="Daily rate for this room"
                />
              </div>

              <div>
                <InputField
                  label="Special Instructions"
                  name="specialInstructions"
                  type="textarea"
                  icon={({ size }: any) => (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  )}
                  placeholder="Any special notes or instructions for this room"
                />
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