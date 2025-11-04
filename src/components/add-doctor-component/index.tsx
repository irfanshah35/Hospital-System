"use client";
import React, { useState } from "react";
import { Home, User, MapPin, Key, Briefcase, Building2, Clock, Phone, FileText, Mail } from "lucide-react";

interface FormErrors {
  [key: string]: string;
}

interface FieldState {
  [key: string]: boolean;
}

export default function NewClaimComponent() {
  const [fieldStates, setFieldStates] = useState<FieldState>({});
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleFieldFocus = (field: string) => {
    setFieldStates(prev => ({ ...prev, [field]: true }));
  };

  const handleFieldBlur = (field: string, value: string) => {
    if (!value) {
      setFieldStates(prev => ({ ...prev, [field]: false }));
    }
  };

  const FloatingInput = ({
    label, name, type = "text", required = false, options = [], icon: Icon
  }: any) => (
    <div className="relative">
      {type === 'select' ? (
        <>
          <select
            name={name}
            className={`w-full px-4 py-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white peer ${
              errors[name] ? "border-red-500" : "border-gray-300"
            }`}
            onFocus={() => handleFieldFocus(name)}
            onChange={(e) => e.target.value ? handleFieldFocus(name) : handleFieldBlur(name, "")}
          >
            <option value=""></option>
            {options.map((opt: string) => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
          <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </>
      ) : type === 'textarea' ? (
        <textarea
          name={name}
          rows={3}
          className={`w-full px-4 py-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none peer ${
            errors[name] ? "border-red-500" : "border-gray-300"
          }`}
          onFocus={() => handleFieldFocus(name)}
          onBlur={(e) => handleFieldBlur(name, e.target.value)}
          onChange={(e) => e.target.value && handleFieldFocus(name)}
        />
      ) : (
        <div className="relative">
          {Icon && (
            <Icon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          )}
          <input
            type={type}
            name={name}
            className={`w-full px-4 py-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 peer ${
              errors[name] ? "border-red-500" : "border-gray-300"
            } ${Icon ? 'pl-10' : 'pl-4'}`}
            onFocus={() => handleFieldFocus(name)}
            onBlur={(e) => handleFieldBlur(name, e.target.value)}
            onChange={(e) => e.target.value && handleFieldFocus(name)}
          />
        </div>
      )}
      <label className={`absolute left-4 transition-all duration-200 pointer-events-none bg-white px-1 ${
        fieldStates[name]
          ? "text-xs -top-2 text-blue-600"
          : "text-gray-500 top-4"
      } ${Icon && type !== 'select' && type !== 'textarea' ? 'left-10' : 'left-4'}`}>
        {label}{required && <span className="text-red-500 ml-1">*</span>}
      </label>
      {errors[name] && <p className="text-red-500 text-xs mt-1">{errors[name]}</p>}
    </div>
  );

  const FileUpload = ({ label, name, accept }: any) => (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-3">{label}</label>
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
        <input type="file" id={name} name={name} accept={accept} className="hidden" />
        <div className="flex flex-col items-center">
          <svg className="w-8 h-8 text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
          </svg>
          <button
            type="button"
            className="text-blue-600 hover:text-blue-700 text-sm font-medium mb-1"
            onClick={() => document.getElementById(name)?.click()}
          >
            Click to upload
          </button>
          <p className="text-xs text-gray-500">PNG, JPG, PDF up to 10MB</p>
        </div>
      </div>
    </div>
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(e.target as HTMLFormElement);
    const data = Object.fromEntries(formData);
    const newErrors: FormErrors = {};
    // Required fields validation
    const requiredFields = {
      claimNumber: "Claim number is required",
      patient: "Patient is required",
      doctor: "Doctor is required",
      admissionDate: "Admission date is required",
      dischargeDate: "Discharge date is required",
      insuranceProvider: "Insurance provider is required",
      policyNumber: "Policy number is required",
      claimAmount: "Claim amount is required",
      description: "Description is required",
    };
    Object.entries(requiredFields).forEach(([field, message]) => {
      if (!data[field] || String(data[field]).trim().length === 0) {
        newErrors[field] = message;
      }
    });
    // Additional validations if needed
    if (data.claimAmount && isNaN(Number(data.claimAmount))) {
      newErrors.claimAmount = "Claim amount must be a number";
    }
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) {
      setMessage({ type: 'error', text: 'Please fix the errors below' });
      setIsSubmitting(false);
      return;
    }
    // Simulate API call
    setTimeout(() => {
      console.log("Claim Data:", data);
      setMessage({ type: 'success', text: 'Claim submitted successfully!' });
      setIsSubmitting(false);
      (e.target as HTMLFormElement).reset();
      setFieldStates({});
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gray-50/30 py-6">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center space-x-2 text-sm text-gray-600 mb-2">
            <Home className="w-4 h-4" />
            <span>›</span>
            <span>Insurance</span>
            <span>›</span>
            <span className="text-gray-800 font-medium">New Claim</span>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">New Claim</h1>
              <p className="text-gray-600 mt-1">Add new insurance claim to the system</p>
            </div>
          </div>
        </div>
        {/* Form */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200/80">
          <div className="p-6">
            {message.text && (
              <div className={`mb-6 p-4 rounded-lg ${
                message.type === 'success'
                  ? "bg-green-50 border border-green-200 text-green-700"
                  : "bg-red-50 border border-red-200 text-red-700"
              }`}>
                {message.text}
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <FloatingInput label="Claim Number" name="claimNumber" required />
                <FloatingInput 
                  label="Patient" 
                  name="patient" 
                  type="select" 
                  required 
                  options={["John Doe", "Jane Smith", "Michael Johnson"]} 
                />
                <FloatingInput 
                  label="Doctor" 
                  name="doctor" 
                  type="select" 
                  required 
                  options={["Dr. Alice Brown", "Dr. Bob White", "Dr. Carol Green"]} 
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <FloatingInput label="Admission Date" name="admissionDate" type="date" required />
                <FloatingInput label="Discharge Date" name="dischargeDate" type="date" required />
                <FloatingInput 
                  label="Insurance Provider" 
                  name="insuranceProvider" 
                  type="select" 
                  required 
                  options={["Provider A", "Provider B", "Provider C"]} 
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <FloatingInput label="Policy Number" name="policyNumber" required />
                <FloatingInput label="Claim Amount" name="claimAmount" type="number" required />
              </div>
              <FloatingInput label="Description" name="description" type="textarea" required />
              <FileUpload name="documents" accept=".pdf,.jpg,.jpeg,.png" />
              {/* Form Actions */}
              <div className="flex justify-end gap-3 pt-6 border-t border-gray-200">
                <button
                  type="button"
                  className="px-8 py-3 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                  onClick={() => window.confirm("Are you sure? All data will be lost.") && setFieldStates({})}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Submitting...
                    </span>
                  ) : (
                    "Submit"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}