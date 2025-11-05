"use client";

import { useState } from "react";
import { useActionState } from "react";
import { Home } from "lucide-react";
import Link from "next/link";

async function submitClaim(prevState: any, formData: FormData) {
  console.log("Form Data:", Object.fromEntries(formData));

  await new Promise(resolve => setTimeout(resolve, 1000));

  return {
    success: true,
    message: "Claim submitted successfully!",
    errors: {}
  };
}

export default function NewClaimPage() {
  const [state, formAction, isPending] = useActionState(submitClaim, null);

  // State for form fields
  const [formData, setFormData] = useState({
    patientName: "",
    dateOfBirth: "",
    policyNumber: "",
    claimType: "",
    patientID: "",
    insuranceProvider: "",
    policyHolderName: "",
    claimAmount: "",
    claimDescription: "",
    claimDate: "",
    hospitalName: "",
    admissionDate: "",
    dischargeDate: "",
    diagnosis: "",
    treatmentProvided: "",
    medicalReport: "",
    invoiceReceipt: "",
    contactNumber: "",
    emailAddress: "",
    consent: false,
    signature: ""
  });

  // State for focused fields
  const [focusedFields, setFocusedFields] = useState<Set<string>>(new Set());

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleFocus = (fieldName: string) => {
    setFocusedFields(prev => new Set(prev).add(fieldName));
  };

  const handleBlur = (fieldName: string) => {
    setFocusedFields(prev => {
      const newSet = new Set(prev);
      newSet.delete(fieldName);
      return newSet;
    });
  };

  const shouldLabelFloat = (fieldName: keyof typeof formData) => {
    const value = formData[fieldName];
    if (typeof value === 'boolean') {
      return focusedFields.has(fieldName);
    }
    return value !== "" || focusedFields.has(fieldName);
  };

  return (
    <div>
      {/* Breadcrumb */}
      <div className="flex items-center space-x-2 px-4 sm:px-6 lg:px-8 pt-3">
        <h1 className="text-lg font-semibold">New Claim</h1>
        <span className="">›</span>
        <Link href="/">
          <Home size={18} className="" />
        </Link>
        <span className="">›</span>
        <span className="">Insurance</span>
        <span className="">›</span>
        <span className="">New Claim</span>
      </div>

      <div className="min-h-screen px-4 sm:px-6 lg:px-8 py-3">
        <div className="bg-white rounded-xl shadow-lg border border-gray-200">
          <div className="">
            <h1 className="text-[20px] font-bold mb-6 py-2 px-4">
              New Claim
            </h1>

            <form action={formAction} className="w-full flex flex-col gap-4 px-10 py-5">
              {/* First Row - 2 columns */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                <div className="relative mb-6">
                  <input
                    type="text"
                    id="patientID"
                    name="patientID"
                    required
                    value={formData.patientID}
                    onChange={handleInputChange}
                    onFocus={() => handleFocus('patientID')}
                    onBlur={() => handleBlur('patientID')}
                    className="peer w-full px-4 pt-6 pb-2 border border-gray-300 rounded-lg outline-none focus:border-blue-500 transition-all placeholder-transparent"
                    placeholder="Patient ID"
                  />
                  <label
                    htmlFor="patientID"
                    className={`absolute left-4 transition-all duration-200 bg-white px-1
                                        ${shouldLabelFloat('patientID') ? '-top-2 text-xs text-blue-600' : 'top-4 text-base text-gray-600'}`}
                  >
                    Patient ID<span className="text-red-500">*</span>
                  </label>
                </div>
                {/* Patient Name */}
                <div className="relative mb-6">
                  <input
                    type="text"
                    id="patientName"
                    name="patientName"
                    required
                    value={formData.patientName}
                    onChange={handleInputChange}
                    onFocus={() => handleFocus('patientName')}
                    onBlur={() => handleBlur('patientName')}
                    className="peer w-full px-4 pt-6 pb-2 border border-gray-300 rounded-lg outline-none focus:border-blue-500 transition-all placeholder-transparent"
                    placeholder="Patient Name"
                  />
                  <label
                    htmlFor="patientName"
                    className={`absolute left-4 transition-all duration-200 bg-white px-1
                                        ${shouldLabelFloat('patientName') ? '-top-2 text-xs text-blue-600' : 'top-4 text-base text-gray-600'}`}
                  >
                    Patient Name<span className="text-red-500">*</span>
                  </label>
                </div>



                {/* Date of Birth */}
                <div className="relative mb-6">
                  <input
                    type="date"
                    id="dateOfBirth"
                    name="dateOfBirth"
                    required
                    value={formData.dateOfBirth}
                    onChange={handleInputChange}
                    onFocus={() => handleFocus('dateOfBirth')}
                    onBlur={() => handleBlur('dateOfBirth')}
                    className="peer w-full px-4 pt-6 pb-2 border border-gray-300 rounded-lg outline-none focus:border-blue-500 transition-all placeholder-transparent text-gray-700"
                    placeholder="Date of Birth"
                  />
                  <label
                    htmlFor="dateOfBirth"
                    className={`absolute left-4 py-1 transition-all duration-200 bg-white px-1
                                        ${shouldLabelFloat('dateOfBirth') ? '-top-2 text-xs text-blue-600' : 'top-4 text-base text-gray-600'}`}
                  >
                    Date of Birth<span className="text-red-500">*</span>
                  </label>
                </div>


                {/* Insurance Provider */}
                <div className="relative mb-6">
                  <select
                    id="insuranceProvider"
                    name="insuranceProvider"
                    required
                    value={formData.insuranceProvider}
                    onChange={handleInputChange}
                    onFocus={() => handleFocus('insuranceProvider')}
                    onBlur={() => handleBlur('insuranceProvider')}
                    className="peer w-full px-4 pt-6 pb-2 border border-gray-300 rounded-lg outline-none focus:border-blue-500 transition-all bg-white text-gray-800 appearance-none"
                  >
                    <option value="" disabled hidden></option>
                    <option value="Provider A">Provider A</option>
                    <option value="Provider B">Provider B</option>
                    <option value="Provider C">Provider C</option>
                    <option value="Provider D">Provider D</option>
                  </select>
                  <label
                    htmlFor="insuranceProvider"
                    className={`absolute left-4 transition-all duration-200 bg-white px-1
                                        ${shouldLabelFloat('insuranceProvider') ? '-top-2 text-xs text-blue-600' : 'top-4 text-base text-gray-500'}`}
                  >
                    Insurance Provider<span className="text-red-500">*</span>
                  </label>
                </div>

                {/* Policy Number */}
                <div className="relative mb-6">
                  <input
                    type="text"
                    id="policyNumber"
                    name="policyNumber"
                    required
                    value={formData.policyNumber}
                    onChange={handleInputChange}
                    onFocus={() => handleFocus('policyNumber')}
                    onBlur={() => handleBlur('policyNumber')}
                    className="peer w-full px-4 pt-6 pb-2 border border-gray-300 rounded-lg outline-none focus:border-blue-500 transition-all placeholder-transparent"
                    placeholder="Policy Number"
                  />
                  <label
                    htmlFor="policyNumber"
                    className={`absolute left-4 transition-all duration-200 bg-white px-1
                                        ${shouldLabelFloat('policyNumber') ? '-top-2 text-xs text-blue-600' : 'top-4 text-base text-gray-600'}`}
                  >
                    Policy Number<span className="text-red-500">*</span>
                  </label>
                </div>

                <div className="relative mb-6">
                  <input
                    type="text"
                    id="policyHolderName"
                    name="policyHolderName"
                    value={formData.policyHolderName}
                    onChange={handleInputChange}
                    onFocus={() => handleFocus('policyHolderName')}
                    onBlur={() => handleBlur('policyHolderName')}
                    className="peer w-full px-4 pt-6 pb-2 border border-gray-300 rounded-lg outline-none focus:border-blue-500 transition-all placeholder-transparent"
                    placeholder="Policy Holder Name"
                  />
                  <label
                    htmlFor="policyHolderName"
                    className={`absolute left-4 transition-all duration-200 bg-white px-1
                                        ${shouldLabelFloat('policyHolderName') ? '-top-2 text-xs text-blue-600' : 'top-4 text-base text-gray-600'}`}
                  >
                    Policy Holder Name
                  </label>
                </div>

                {/* Claim Type */}
                <div className="relative mb-6">
                  <select
                    id="claimType"
                    name="claimType"
                    required
                    value={formData.claimType}
                    onChange={handleInputChange}
                    onFocus={() => handleFocus('claimType')}
                    onBlur={() => handleBlur('claimType')}
                    className="peer w-full px-4 pt-6 pb-2 border border-gray-300 rounded-lg outline-none focus:border-blue-500 transition-all bg-white text-gray-800 appearance-none"
                  >
                    <option value="" disabled hidden></option>
                    <option value="Medical">Medical</option>
                    <option value="Dental">Dental</option>
                    <option value="Vision">Vision</option>
                    <option value="Hospital">Hospital</option>
                  </select>
                  <label
                    htmlFor="claimType"
                    className={`absolute left-4 transition-all duration-200 bg-white px-1
                                        ${shouldLabelFloat('claimType') ? '-top-2 text-xs text-blue-600' : 'top-4 text-base text-gray-500'}`}
                  >
                    Claim Type<span className="text-red-500">*</span>
                  </label>
                </div>

                {/* Claim Amount */}
                <div className="relative mb-6">
                  <input
                    type="number"
                    id="claimAmount"
                    name="claimAmount"
                    required
                    value={formData.claimAmount}
                    onChange={handleInputChange}
                    onFocus={() => handleFocus('claimAmount')}
                    onBlur={() => handleBlur('claimAmount')}
                    className="peer w-full px-4 pt-6 pb-2 border border-gray-300 rounded-lg outline-none focus:border-blue-500 transition-all placeholder-transparent"
                    placeholder="Claim Amount"
                  />
                  <label
                    htmlFor="claimAmount"
                    className={`absolute left-4 transition-all duration-200 bg-white px-1
                                        ${shouldLabelFloat('claimAmount') ? '-top-2 text-xs text-blue-600' : 'top-4 text-base text-gray-600'}`}
                  >
                    Claim Amount<span className="text-red-500">*</span>
                  </label>
                </div>
              </div>


              {/* Claim Description */}
              <div className="relative mb-6">
                <textarea
                  id="claimDescription"
                  name="claimDescription"
                  required
                  value={formData.claimDescription}
                  onChange={handleInputChange}
                  onFocus={() => handleFocus("claimDescription")}
                  onBlur={() => handleBlur("claimDescription")}
                  placeholder="Claim Description"
                  rows={3}
                  className="peer w-full px-4 pt-6 pb-2 border border-gray-300 rounded-lg outline-none 
                                    focus:border-blue-500 transition-all placeholder-transparent resize-none"
                ></textarea>
                <label
                  htmlFor="claimDescription"
                  className={`absolute left-4 transition-all duration-200 bg-white px-1
                                    ${shouldLabelFloat("claimDescription")
                      ? "-top-2 text-xs text-blue-600"
                      : "top-4 text-base text-gray-600"}`}
                >
                  Claim Description<span className="text-red-500">*</span>
                </label>
              </div>

              {/* Fifth Row - 2 columns */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Claim Date */}
                <div className="relative mb-6">
                  <input
                    type="date"
                    id="claimDate"
                    name="claimDate"
                    required
                    value={formData.claimDate}
                    onChange={handleInputChange}
                    onFocus={() => handleFocus('claimDate')}
                    onBlur={() => handleBlur('claimDate')}
                    className="peer w-full px-4 pt-6 pb-2 border border-gray-300 rounded-lg outline-none focus:border-blue-500 transition-all placeholder-transparent text-gray-700"
                    placeholder="Claim Date"
                  />
                  <label
                    htmlFor="claimDate"
                    className={`absolute left-4 py-1 transition-all duration-200 bg-white px-1
                                        ${shouldLabelFloat('claimDate') ? '-top-2 text-xs text-blue-600' : 'top-4 text-base text-gray-600'}`}
                  >
                    Claim Date<span className="text-red-500">*</span>
                  </label>
                </div>

                {/* Hospital Name */}
                <div className="relative mb-6 col-span-2">
                  <input
                    type="text"
                    id="hospitalName"
                    name="hospitalName"
                    required
                    value={formData.hospitalName}
                    onChange={handleInputChange}
                    onFocus={() => handleFocus('hospitalName')}
                    onBlur={() => handleBlur('hospitalName')}
                    className="peer w-full px-4 pt-6 pb-2 border border-gray-300 rounded-lg outline-none focus:border-blue-500 transition-all placeholder-transparent"
                    placeholder="Hospital Name"
                  />
                  <label
                    htmlFor="hospitalName"
                    className={`absolute left-4 transition-all duration-200 bg-white px-1
                                        ${shouldLabelFloat('hospitalName') ? '-top-2 text-xs text-blue-600' : 'top-4 text-base text-gray-600'}`}
                  >
                    Hospital Name<span className="text-red-500">*</span>
                  </label>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Admission Date */}
                <div className="relative mb-6">
                  <input
                    type="date"
                    id="admissionDate"
                    name="admissionDate"
                    required
                    value={formData.admissionDate}
                    onChange={handleInputChange}
                    onFocus={() => handleFocus('admissionDate')}
                    onBlur={() => handleBlur('admissionDate')}
                    className="peer w-full px-4 pt-6 pb-2 border border-gray-300 rounded-lg outline-none focus:border-blue-500 transition-all placeholder-transparent text-gray-700"
                    placeholder="Admission Date"
                  />
                  <label
                    htmlFor="admissionDate"
                    className={`absolute left-4 py-1 transition-all duration-200 bg-white px-1
                                        ${shouldLabelFloat('admissionDate') ? '-top-2 text-xs text-blue-600' : 'top-4 text-base text-gray-600'}`}
                  >
                    Admission Date<span className="text-red-500">*</span>
                  </label>
                </div>

                {/* Discharge Date */}
                <div className="relative mb-6">
                  <input
                    type="date"
                    id="dischargeDate"
                    name="dischargeDate"
                    value={formData.dischargeDate}
                    onChange={handleInputChange}
                    onFocus={() => handleFocus('dischargeDate')}
                    onBlur={() => handleBlur('dischargeDate')}
                    className="peer w-full px-4 pt-6 pb-2 border border-gray-300 rounded-lg outline-none focus:border-blue-500 transition-all placeholder-transparent text-gray-700"
                    placeholder="Discharge Date"
                  />
                  <label
                    htmlFor="dischargeDate"
                    className={`absolute left-4 py-1 transition-all duration-200 bg-white px-1
                                        ${shouldLabelFloat('dischargeDate') ? '-top-2 text-xs text-blue-600' : 'top-4 text-base text-gray-600'}`}
                  >
                    Discharge Date
                  </label>
                </div>
              </div>


              <div className="relative mb-6 col-span-2">
                <input
                  type="text"
                  id="diagnosis"
                  name="diagnosis"
                  value={formData.diagnosis}
                  onChange={handleInputChange}
                  onFocus={() => handleFocus("diagnosis")}
                  onBlur={() => handleBlur("diagnosis")}
                  placeholder="Diagnosis"
                  className="peer w-full px-4 pt-6 pb-2 border border-gray-300 rounded-lg outline-none focus:border-blue-500 transition-all placeholder-transparent"
                />
                <label
                  htmlFor="diagnosis"
                  className={`absolute left-4 transition-all duration-200 bg-white px-1
                                        ${shouldLabelFloat('diagnosis') ? '-top-2 text-xs text-blue-600' : 'top-4 text-base text-gray-600'}`}
                >
                  Diagnosis
                </label>
              </div>


              <div className="relative mb-6 col-span-2">
                <input
                  type="text"
                  id="treatmentProvided"
                  name="treatmentProvided"
                  value={formData.treatmentProvided}
                  onChange={handleInputChange}
                  onFocus={() => handleFocus("treatmentProvided")}
                  onBlur={() => handleBlur("treatmentProvided")}
                  placeholder="Treatment Provided"
                  className="peer w-full px-4 pt-6 pb-2 border border-gray-300 rounded-lg outline-none focus:border-blue-500 transition-all placeholder-transparent"
                />
                <label
                  htmlFor="treatmentProvided"
                  className={`absolute left-4 transition-all duration-200 bg-white px-1
                                        ${shouldLabelFloat('treatmentProvided') ? '-top-2 text-xs text-blue-600' : 'top-4 text-base text-gray-600'}`}
                >
                  Treatment Provided
                </label>
              </div>

              {/* File Upload Sections */}
              <div className="grid grid-cols-1 gap-6">
                {/* Medical Report Upload */}
                <div className="relative mb-6">
                  <h3 className="text-sm mb-1">Upload Medical Report</h3>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex items-center gap-2">
                    <input
                      type="file"
                      id="medicalReport"
                      name="medicalReport"
                      className="hidden"
                      onChange={handleInputChange}
                    />
                    <label
                      htmlFor="medicalReport"
                      className="px-4 py-2 rounded-full br-[#faf9fd] hover:bg-[#E6ECF8] text-blue-500 cursor-pointer shadow-[0px_2px_1px_-1px_rgba(0,0,0,0.2),0px_1px_1px_0px_rgba(0,0,0,0.14),0px_1px_3px_0px_rgba(0,0,0,0.12)]"
                    >
                      Choose file
                    </label>
                    <p className="text-sm text-gray-500">Choose file or drag and drop file here</p>
                  </div>
                </div>

                {/* Invoice Receipt Upload */}
                <div className="relative mb-6">
                  <h3 className="text-sm mb-1">Upload Invoice Receipt</h3>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex items-center gap-2">

                    <input
                      type="file"
                      id="invoiceReceipt"
                      name="invoiceReceipt"
                      className="hidden"
                      onChange={handleInputChange}
                    />
                    <label
                      htmlFor="invoiceReceipt"
                      className="px-4 py-2 rounded-full br-[#faf9fd] hover:bg-[#E6ECF8] text-blue-500 cursor-pointer shadow-[0px_2px_1px_-1px_rgba(0,0,0,0.2),0px_1px_1px_0px_rgba(0,0,0,0.14),0px_1px_3px_0px_rgba(0,0,0,0.12)]"
                    >
                      Choose file
                    </label>
                    <p className="text-sm text-gray-500">Choose file or drag and drop file here</p>
                  </div>
                </div>
              </div>

              {/* Contact Information - 2 columns */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Contact Number */}
                <div className="relative mb-6">
                  <input
                    type="tel"
                    id="contactNumber"
                    name="contactNumber"
                    value={formData.contactNumber}
                    onChange={handleInputChange}
                    onFocus={() => handleFocus('contactNumber')}
                    onBlur={() => handleBlur('contactNumber')}
                    className="peer w-full px-4 pt-6 pb-2 border border-gray-300 rounded-lg outline-none focus:border-blue-500 transition-all placeholder-transparent"
                    placeholder="Contact Number"
                  />
                  <label
                    htmlFor="contactNumber"
                    className={`absolute left-4 transition-all duration-200 bg-white px-1
                                        ${shouldLabelFloat('contactNumber') ? '-top-2 text-xs text-blue-600' : 'top-4 text-base text-gray-600'}`}
                  >
                    Contact Number
                  </label>
                </div>

                {/* Email Address */}
                <div className="relative mb-6">
                  <input
                    type="email"
                    id="emailAddress"
                    name="emailAddress"
                    value={formData.emailAddress}
                    onChange={handleInputChange}
                    onFocus={() => handleFocus('emailAddress')}
                    onBlur={() => handleBlur('emailAddress')}
                    className="peer w-full px-4 pt-6 pb-2 border border-gray-300 rounded-lg outline-none focus:border-blue-500 transition-all placeholder-transparent"
                    placeholder="Email Address"
                  />
                  <label
                    htmlFor="emailAddress"
                    className={`absolute left-4 transition-all duration-200 bg-white px-1
                                        ${shouldLabelFloat('emailAddress') ? '-top-2 text-xs text-blue-600' : 'top-4 text-base text-gray-600'}`}
                  >
                    Email Address
                  </label>
                </div>
              </div>

              {/* Consent Checkbox */}
              <div className="relative mb-6">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="consent"
                    name="consent"
                    required
                    checked={formData.consent}
                    onChange={handleInputChange}
                    onFocus={() => handleFocus('consent')}
                    onBlur={() => handleBlur('consent')}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label
                    htmlFor="consent"
                    className="ml-2 text-sm text-gray-700"
                  >
                    I consent to the processing of my claim<span className="text-red-500">*</span>
                  </label>
                </div>
              </div>

              {/* Signature */}
              <div className="relative mb-6">
                <input
                  type="text"
                  id="signature"
                  name="signature"
                  required
                  value={formData.signature}
                  onChange={handleInputChange}
                  onFocus={() => handleFocus('signature')}
                  onBlur={() => handleBlur('signature')}
                  className="peer w-full px-4 pt-6 pb-2 border border-gray-300 rounded-lg outline-none focus:border-blue-500 transition-all placeholder-transparent"
                  placeholder="Signature"
                />
                <label
                  htmlFor="signature"
                  className={`absolute left-4 transition-all duration-200 bg-white px-1
                                    ${shouldLabelFloat('signature') ? '-top-2 text-xs text-blue-600' : 'top-4 text-base text-gray-600'}`}
                >
                  Signature<span className="text-red-500">*</span>
                </label>
              </div>

              {/* Form Status Message */}
              {state?.message && (
                <div className={`p-4 rounded-lg mb-4 ${state.success ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                  }`}>
                  {state.message}
                </div>
              )}

              <div className="flex space-x-3">
                <button
                  type="submit"
                  disabled={isPending}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-5 rounded-full shadow transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isPending ? 'Submitting...' : 'Submit Claim'}
                </button>
                <button
                  type="button"
                  className="bg-[#ba1a1a] text-white font-medium py-2 px-5 rounded-full transition hover:bg-red-700"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}