"use client";

import { useRef, useState } from "react";
import { useActionState } from "react";
import { Asterisk, BriefcaseMedical, Contact, File, Home, ShieldPlus, User } from "lucide-react";
import Link from "next/link";

async function updatePatient(prevState: any, formData: FormData) {

  console.log("Form Data:", Object.fromEntries(formData));
  
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  return {
    success: true,
    message: "Patient updated successfully!",
    errors: {}
  };
}

export default function EditPatientPage() {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [state, formAction, isPending] = useActionState(updatePatient, null);
  
  // State for all form fields
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    gender: "",
    dob: "",
    age: "",
    maritalStatus: "",
    nationalId: "",
    patientId: "",
    mobile: "",
    email: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    contactName: "",
    relationship: "",
    phoneNumber: "",
    bloodGroup: "",
    bloodPressure: "",
    sugarLevel: "",
    allergies: "",
    chronicDiseases: "",
    currentMedications: "",
    injuryCondition: "",
    insuranceProvider: "",
    policyNumber: "",
    coverageInformation: ""
  });

  // State for focused fields
  const [focusedFields, setFocusedFields] = useState<Set<string>>(new Set());

  const handleFileClick = () => {
    fileInputRef.current?.click();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
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
    return formData[fieldName] !== "" || focusedFields.has(fieldName);
  };

  return (
    <div>
      <div className="flex items-center space-x-2 px-4 sm:px-6 lg:px-8 pt-2">
        <h1 className="text-lg font-semibold">Edit Patient</h1>
        <span className="">›</span>
        <Link href="/">
          <Home size={18} className="" />
        </Link>
        <span className="">›</span>
        <span className="">Patients</span>
        <span className="">›</span>
        <span className="">Edit Patient</span>
      </div>
      <div className="min-h-screen  px-4 sm:px-6 lg:px-8 py-3">
        <div className="bg-white rounded-xl shadow-lg ">
          <div className="p-4">
            <h1 className="text-[17x] font-bold mb-1">
              Edit Patient
            </h1>
          </div>

          <form action={formAction} className="px-8">
            <div className="mb-4">
              <div className="flex items-center gap-2  text-blue-600 text-lg font-semibold">
                <User className="w-5 h-5" />
                <span>Personal Information</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-[101px]">
              {/* First Name */}
              <div className="relative h-[57px]">
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  required
                  value={formData.firstName}
                  onChange={handleInputChange}
                  onFocus={() => handleFocus('firstName')}
                  onBlur={() => handleBlur('firstName')}
                  className="peer w-full px-4 pt-6 pb-2 border border-gray-300 rounded-lg outline-none focus:border-blue-500 transition-all placeholder-transparent"
                  placeholder="First name"
                />
                <label
                  htmlFor="firstName"
                  className={`absolute left-4 transition-all duration-200 bg-white px-1
                    ${shouldLabelFloat('firstName') ? '-top-2 text-xs text-blue-600' : 'top-4  text-base'}`}
                >
                  First name<span className="text-red-500">*</span>
                </label>
              </div>

              {/* Last Name */}
              <div className="relative h-[57px]">
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  required
                  value={formData.lastName}
                  onChange={handleInputChange}
                  onFocus={() => handleFocus('lastName')}
                  onBlur={() => handleBlur('lastName')}
                  className="peer w-full px-4 pt-6 pb-2 border border-gray-300 rounded-lg outline-none focus:border-blue-500 transition-all placeholder-transparent"
                  placeholder="Last name"
                />
                <label
                  htmlFor="lastName"
                  className={`absolute left-4 transition-all duration-200 bg-white px-1
                    ${shouldLabelFloat('lastName') ? '-top-2 text-xs text-blue-600' : 'top-4  text-base'}`}
                >
                  Last name<span className="text-red-500">*</span>
                </label>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-[101px]">
              {/* Gender */}
              <div className="relative">
                <select
                  id="gender"
                  name="gender"
                  required
                  value={formData.gender}
                  onChange={handleInputChange}
                  onFocus={() => handleFocus('gender')}
                  onBlur={() => handleBlur('gender')}
                  className="peer w-full px-4 pt-6 pb-2 border border-gray-300 rounded-lg outline-none focus:border-blue-500 transition-all appearance-none bg-transparent "
                >
                  <option value="" disabled hidden></option>
                  <option value="Male" className="text-gray-700">Male</option>
                  <option value="Female" className="text-gray-700">Female</option>
                  <option value="Other" className="text-gray-700">Other</option>
                </select>
                <label
                  htmlFor="gender"
                  className={`absolute left-4 transition-all duration-200 bg-white px-1
                    ${shouldLabelFloat('gender') ? '-top-2 text-xs text-blue-600' : 'top-4  text-base'}`}
                >
                  Gender<span className="text-red-500">*</span>
                </label>
              </div>

              {/* Date of Birth */}
              <div className="relative">
                <input
                  type="date"
                  id="dob"
                  name="dob"
                  required
                  value={formData.dob}
                  onChange={handleInputChange}
                  onFocus={() => handleFocus('dob')}
                  onBlur={() => handleBlur('dob')}
                  className="peer w-full px-4 pt-6 pb-2 border border-gray-300 rounded-lg outline-none focus:border-blue-500 transition-all placeholder-transparent text-gray-700"
                  placeholder="Date of Birth"
                />
                <label
                  htmlFor="dob"
                  className={`absolute left-4 py-1 transition-all duration-200 bg-white px-1
                    ${shouldLabelFloat('dob') ? '-top-2 text-xs text-blue-600' : 'top-4  text-base'}`}
                >
                  Date of Birth<span className="text-red-500">*</span>
                </label>
              </div>

              {/* Age */}
              <div className="relative">
                <input
                  type="number"
                  id="age"
                  name="age"
                  required
                  value={formData.age}
                  onChange={handleInputChange}
                  onFocus={() => handleFocus('age')}
                  onBlur={() => handleBlur('age')}
                  className="peer w-full px-4 pt-6 pb-2 border border-gray-300 rounded-lg outline-none focus:border-blue-500 transition-all placeholder-transparent text-gray-700"
                  placeholder="Age"
                />
                <label
                  htmlFor="age"
                  className={`absolute left-4 transition-all duration-200 bg-white px-1
                    ${shouldLabelFloat('age') ? '-top-2 text-xs text-blue-600' : 'top-4  text-base'}`}
                >
                  Age<span className="text-red-500">*</span>
                </label>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-[101px]">
              {/* Marital Status */}
              <div className="relative h-[57px]">
                <select
                  id="maritalStatus"
                  name="maritalStatus"
                  required
                  value={formData.maritalStatus}
                  onChange={handleInputChange}
                  onFocus={() => handleFocus('maritalStatus')}
                  onBlur={() => handleBlur('maritalStatus')}
                  className="peer w-full px-4 pt-6 pb-2 border border-gray-300 rounded-lg outline-none focus:border-blue-500 transition-all bg-transparent appearance-none"
                >
                  <option value="" disabled hidden></option>
                  <option value="Single">Single</option>
                  <option value="Married">Married</option>
                  <option value="Divorced">Divorced</option>
                  <option value="Widowed">Widowed</option>
                </select>
                <label
                  htmlFor="maritalStatus"
                  className={`absolute left-4 transition-all duration-200 bg-white px-1
                    ${shouldLabelFloat('maritalStatus') ? '-top-2 text-xs text-blue-600' : 'top-4  text-base'}`}
                >
                  Marital Status<span className="text-red-500">*</span>
                </label>
              </div>

              {/* National ID */}
              <div className="relative h-[57px]">
                <input
                  type="text"
                  id="nationalId"
                  name="nationalId"
                  required
                  value={formData.nationalId}
                  onChange={handleInputChange}
                  onFocus={() => handleFocus('nationalId')}
                  onBlur={() => handleBlur('nationalId')}
                  placeholder="National ID"
                  className="peer w-full px-4 pt-6 pb-2 border border-gray-300 rounded-lg outline-none focus:border-blue-500 transition-all placeholder-transparent"
                />
                <label
                  htmlFor="nationalId"
                  className={`absolute left-4 transition-all duration-200 bg-white px-1
                    ${shouldLabelFloat('nationalId') ? '-top-2 text-xs text-blue-600' : 'top-4  text-base'}`}
                >
                  National ID<span className="text-red-500">*</span>
                </label>
              </div>

              {/* Patient ID */}
              <div className="relative h-[57px]">
                <input
                  type="text"
                  id="patientId"
                  name="patientId"
                  value={formData.patientId}
                  onChange={handleInputChange}
                  onFocus={() => handleFocus('patientId')}
                  onBlur={() => handleBlur('patientId')}
                  placeholder="Patient ID"
                  className="peer w-full px-4 pt-6 pb-2 border border-gray-300 rounded-lg outline-none focus:border-blue-500 transition-all placeholder-transparent"
                />
                <label
                  htmlFor="patientId"
                  className={`absolute left-4 transition-all duration-200 bg-white px-1
                    ${shouldLabelFloat('patientId') ? '-top-2 text-xs text-blue-600' : 'top-4  text-base'}`}
                >
                  Patient ID
                </label>
              </div>
            </div>

            {/* second part */}

            <div className="mb-4">
              <div className="flex items-center gap-2 text-blue-600 font-semibold text-lg">
                <Contact className="w-5 h-5" />
                <span>Contact Information</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-[101px]">
              {/* Mobile */}
              <div className="relative h-[57px]">
                <input
                  type="text"
                  id="mobile"
                  name="mobile"
                  required
                  value={formData.mobile}
                  onChange={handleInputChange}
                  onFocus={() => handleFocus('mobile')}
                  onBlur={() => handleBlur('mobile')}
                  className="peer w-full px-4 pt-6 pb-2 border border-gray-300 rounded-lg outline-none focus:border-blue-500 transition-all placeholder-transparent"
                  placeholder="Mobile"
                />
                <label
                  htmlFor="mobile"
                  className={`absolute left-4 transition-all duration-200 bg-white px-1
                    ${shouldLabelFloat('mobile') ? '-top-2 text-xs text-blue-600' : 'top-4  text-base'}`}
                >
                  Mobile <span className="text-red-500">*</span>
                </label>
              </div>

              {/* Email */}
              <div className="relative h-[57px]">
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  onFocus={() => handleFocus('email')}
                  onBlur={() => handleBlur('email')}
                  className="peer w-full px-4 pt-6 pb-2 border border-gray-300 rounded-lg outline-none focus:border-blue-500 transition-all placeholder-transparent"
                  placeholder="Email"
                />
                <label
                  htmlFor="email"
                  className={`absolute left-4 transition-all duration-200 bg-white px-1
                    ${shouldLabelFloat('email') ? '-top-2 text-xs text-blue-600' : 'top-4  text-base'}`}
                >
                  Email <span className="text-red-500">*</span>
                </label>
              </div>
            </div>

            <div className="grid grid-cols-1 h-[124px]">
              {/* Address */}
              <div className="relative h-[101px]">
                <textarea
                  id="address"
                  name="address"
                  required
                  value={formData.address}
                  onChange={handleInputChange}
                  onFocus={() => handleFocus('address')}
                  onBlur={() => handleBlur('address')}
                  className="peer w-full h-full px-4 pt-6 pb-2 border border-gray-300 rounded-lg outline-none resize-none focus:border-blue-500 transition-all placeholder-transparent"
                  placeholder="Address"
                ></textarea>
                <label
                  htmlFor="address"
                  className={`absolute left-4 transition-all duration-200 bg-white px-1
                    ${shouldLabelFloat('address') ? '-top-2 text-xs text-blue-600' : 'top-4  text-base'}`}
                >
                  Address <span className="text-red-500">*</span>
                </label>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-[101px]">
              {/* City */}
              <div className="relative h-[57px]">
                <input
                  type="text"
                  id="city"
                  name="city"
                  required
                  value={formData.city}
                  onChange={handleInputChange}
                  onFocus={() => handleFocus('city')}
                  onBlur={() => handleBlur('city')}
                  className="peer w-full px-4 pt-6 pb-2 border border-gray-300 rounded-lg outline-none focus:border-blue-500 transition-all placeholder-transparent"
                  placeholder="City"
                />
                <label
                  htmlFor="city"
                  className={`absolute left-4 transition-all duration-200 bg-white px-1
                    ${shouldLabelFloat('city') ? '-top-2 text-xs text-blue-600' : 'top-4  text-base'}`}
                >
                  City <span className="text-red-500">*</span>
                </label>
              </div>

              {/* State */}
              <div className="relative h-[57px]">
                <input
                  type="text"
                  id="state"
                  name="state"
                  required
                  value={formData.state}
                  onChange={handleInputChange}
                  onFocus={() => handleFocus('state')}
                  onBlur={() => handleBlur('state')}
                  className="peer w-full px-4 pt-6 pb-2 border border-gray-300 rounded-lg outline-none focus:border-blue-500 transition-all placeholder-transparent"
                  placeholder="State"
                />
                <label
                  htmlFor="state"
                  className={`absolute left-4 transition-all duration-200 bg-white px-1
                    ${shouldLabelFloat('state') ? '-top-2 text-xs text-blue-600' : 'top-4  text-base'}`}
                >
                  State <span className="text-red-500">*</span>
                </label>
              </div>

              {/* Zip Code */}
              <div className="relative h-[57px]">
                <input
                  type="text"
                  id="zipCode"
                  name="zipCode"
                  required
                  value={formData.zipCode}
                  onChange={handleInputChange}
                  onFocus={() => handleFocus('zipCode')}
                  onBlur={() => handleBlur('zipCode')}
                  className="peer w-full px-4 pt-6 pb-2 border border-gray-300 rounded-lg outline-none focus:border-blue-500 transition-all placeholder-transparent"
                  placeholder="Zip Code"
                />
                <label
                  htmlFor="zipCode"
                  className={`absolute left-4 transition-all duration-200 bg-white px-1
                    ${shouldLabelFloat('zipCode') ? '-top-2 text-xs text-blue-600' : 'top-4  text-base'}`}
                >
                  Zip Code <span className="text-red-500">*</span>
                </label>
              </div>
            </div>

            {/* THIRD part */}

            <div className="mb-4">
              <div className="flex items-center gap-2 text-blue-600 font-semibold text-lg">
                <Asterisk className="w-5 h-5" />
                <span>Emergency Contact</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-[101px]">
              {/* Contact Name */}
              <div className="relative h-[57px]">
                <input
                  type="text"
                  id="contactName"
                  name="contactName"
                  required
                  value={formData.contactName}
                  onChange={handleInputChange}
                  onFocus={() => handleFocus('contactName')}
                  onBlur={() => handleBlur('contactName')}
                  className="peer w-full px-4 pt-6 pb-2 border border-gray-300 rounded-lg outline-none focus:border-blue-500 transition-all placeholder-transparent"
                  placeholder="Contact Name"
                />
                <label
                  htmlFor="contactName"
                  className={`absolute left-4 transition-all duration-200 bg-white px-1
                    ${shouldLabelFloat('contactName') ? '-top-2 text-xs text-blue-600' : 'top-4  text-base'}`}
                >
                  Contact Name <span className="text-red-500">*</span>
                </label>
              </div>

              {/* Relationship */}
              <div className="relative h-[57px]">
                <input
                  type="text"
                  id="relationship"
                  name="relationship"
                  required
                  value={formData.relationship}
                  onChange={handleInputChange}
                  onFocus={() => handleFocus('relationship')}
                  onBlur={() => handleBlur('relationship')}
                  className="peer w-full px-4 pt-6 pb-2 border border-gray-300 rounded-lg outline-none focus:border-blue-500 transition-all placeholder-transparent"
                  placeholder="Relationship"
                />
                <label
                  htmlFor="relationship"
                  className={`absolute left-4 transition-all duration-200 bg-white px-1
                    ${shouldLabelFloat('relationship') ? '-top-2 text-xs text-blue-600' : 'top-4  text-base'}`}
                >
                  Relationship <span className="text-red-500">*</span>
                </label>
              </div>

              {/* Phone Number */}
              <div className="relative h-[57px]">
                <input
                  type="text"
                  id="phoneNumber"
                  name="phoneNumber"
                  required
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  onFocus={() => handleFocus('phoneNumber')}
                  onBlur={() => handleBlur('phoneNumber')}
                  className="peer w-full px-4 pt-6 pb-2 border border-gray-300 rounded-lg outline-none focus:border-blue-500 transition-all placeholder-transparent"
                  placeholder="Phone Number"
                />
                <label
                  htmlFor="phoneNumber"
                  className={`absolute left-4 transition-all duration-200 bg-white px-1
                    ${shouldLabelFloat('phoneNumber') ? '-top-2 text-xs text-blue-600' : 'top-4  text-base'}`}
                >
                  Phone Number <span className="text-red-500">*</span>
                </label>
              </div>
            </div>

            {/* 4th part */}

            <div className="mb-4">
              <div className="flex items-center gap-2 text-blue-600 font-semibold text-lg">
                <BriefcaseMedical className="w-5 h-5" />
                <span>Medical Information</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-[101px]">
              {/* Blood Group */}
              <div className="relative h-[57px]">
                <select
                  id="bloodGroup"
                  name="bloodGroup"
                  required
                  value={formData.bloodGroup}
                  onChange={handleInputChange}
                  onFocus={() => handleFocus('bloodGroup')}
                  onBlur={() => handleBlur('bloodGroup')}
                  className="peer w-full px-4 pt-6 pb-2 border border-gray-300 rounded-lg outline-none focus:border-blue-500 transition-all bg-white text-gray-800 appearance-none"
                >
                  <option value="" disabled hidden></option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                </select>
                <label
                  htmlFor="bloodGroup"
                  className={`absolute left-4 transition-all duration-200 bg-white px-1
                    ${shouldLabelFloat('bloodGroup') ? '-top-2 text-xs text-blue-600' : 'top-4  text-base'}`}
                >
                  Blood Group <span className="text-red-500">*</span>
                </label>
              </div>

              {/* Blood Pressure */}
              <div className="relative h-[57px]">
                <input
                  type="text"
                  id="bloodPressure"
                  name="bloodPressure"
                  value={formData.bloodPressure}
                  onChange={handleInputChange}
                  onFocus={() => handleFocus('bloodPressure')}
                  onBlur={() => handleBlur('bloodPressure')}
                  placeholder="Blood Pressure"
                  className="peer w-full px-4 pt-6 pb-2 border border-gray-300 rounded-lg outline-none focus:border-blue-500 transition-all placeholder-transparent"
                />
                <label
                  htmlFor="bloodPressure"
                  className={`absolute left-4 transition-all duration-200 bg-white px-1
                    ${shouldLabelFloat('bloodPressure') ? '-top-2 text-xs text-blue-600' : 'top-4  text-base'}`}
                >
                  Blood Pressure
                </label>
              </div>

              {/* Sugar Level */}
              <div className="relative h-[57px]">
                <input
                  type="text"
                  id="sugarLevel"
                  name="sugarLevel"
                  value={formData.sugarLevel}
                  onChange={handleInputChange}
                  onFocus={() => handleFocus('sugarLevel')}
                  onBlur={() => handleBlur('sugarLevel')}
                  placeholder="Sugar Level"
                  className="peer w-full px-4 pt-6 pb-2 border border-gray-300 rounded-lg outline-none focus:border-blue-500 transition-all placeholder-transparent"
                />
                <label
                  htmlFor="sugarLevel"
                  className={`absolute left-4 transition-all duration-200 bg-white px-1
                    ${shouldLabelFloat('sugarLevel') ? '-top-2 text-xs text-blue-600' : 'top-4  text-base'}`}
                >
                  Sugar Level
                </label>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              {/* Allergies */}
              <div className="relative">
                <textarea
                  id="allergies"
                  name="allergies"
                  rows={2}
                  value={formData.allergies}
                  onChange={handleInputChange}
                  onFocus={() => handleFocus('allergies')}
                  onBlur={() => handleBlur('allergies')}
                  className="peer w-full px-4 pt-6 pb-2 border border-gray-300 rounded-lg outline-none focus:border-blue-500 transition-all placeholder-transparent"
                  placeholder="Allergies"
                ></textarea>
                <label
                  htmlFor="allergies"
                  className={`absolute left-4 transition-all duration-200 bg-white px-1
                    ${shouldLabelFloat('allergies') ? '-top-2 text-xs text-blue-600' : 'top-4  text-base'}`}
                >
                  Allergies
                </label>
              </div>

              {/* Chronic Diseases */}
              <div className="relative">
                <textarea
                  id="chronicDiseases"
                  name="chronicDiseases"
                  value={formData.chronicDiseases}
                  onChange={handleInputChange}
                  onFocus={() => handleFocus('chronicDiseases')}
                  onBlur={() => handleBlur('chronicDiseases')}
                  className="peer w-full px-4 pt-6 pb-2 border border-gray-300 rounded-lg outline-none focus:border-blue-500 transition-all placeholder-transparent"
                  placeholder="Chronic Diseases"
                ></textarea>
                <label
                  htmlFor="chronicDiseases"
                  className={`absolute left-4 transition-all duration-200 bg-white px-1
                    ${shouldLabelFloat('chronicDiseases') ? '-top-2 text-xs text-blue-600' : 'top-4  text-base'}`}
                >
                  Chronic Diseases
                </label>
              </div>

              {/* Current Medications */}
              <div className="relative">
                <textarea
                  id="currentMedications"
                  name="currentMedications"
                  value={formData.currentMedications}
                  onChange={handleInputChange}
                  onFocus={() => handleFocus('currentMedications')}
                  onBlur={() => handleBlur('currentMedications')}
                  className="peer w-full px-4 pt-6 pb-2 border border-gray-300 rounded-lg outline-none focus:border-blue-500 transition-all placeholder-transparent"
                  placeholder="Current Medications"
                ></textarea>
                <label
                  htmlFor="currentMedications"
                  className={`absolute left-4 transition-all duration-200 bg-white px-1
                    ${shouldLabelFloat('currentMedications') ? '-top-2 text-xs text-blue-600' : 'top-4  text-base'}`}
                >
                  Current Medications
                </label>
              </div>
            </div>

            <div className="grid grid-cols-1 mb-8">
              {/* Injury / Condition */}
              <div className="relative">
                <textarea
                  id="injuryCondition"
                  name="injuryCondition"
                  value={formData.injuryCondition}
                  onChange={handleInputChange}
                  onFocus={() => handleFocus('injuryCondition')}
                  onBlur={() => handleBlur('injuryCondition')}
                  className="peer w-full px-4 pt-6 pb-2 border border-gray-300 rounded-lg outline-none focus:border-blue-500 transition-all placeholder-transparent"
                  placeholder="Injury/Condition"
                ></textarea>
                <label
                  htmlFor="injuryCondition"
                  className={`absolute left-4 transition-all duration-200 bg-white px-1
                    ${shouldLabelFloat('injuryCondition') ? '-top-2 text-xs text-blue-600' : 'top-4  text-base'}`}
                >
                  Injury / Condition
                </label>
              </div>
            </div>

            {/* 5th part */}

            <div className="mb-4">
              <div className="flex items-center gap-2 text-blue-600 font-semibold text-lg">
                <ShieldPlus className="w-5 h-5" />
                <span>Insurance Information</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-[101px]">
              {/* Insurance Provider */}
              <div className="relative">
                <input
                  type="text"
                  id="insuranceProvider"
                  name="insuranceProvider"
                  value={formData.insuranceProvider}
                  onChange={handleInputChange}
                  onFocus={() => handleFocus('insuranceProvider')}
                  onBlur={() => handleBlur('insuranceProvider')}
                  className="peer w-full h-[58px] px-4 pt-4 pb-1 border border-gray-300 rounded-lg outline-none focus:border-blue-500 transition-all placeholder-transparent"
                  placeholder="Insurance Provider"
                />
                <label
                  htmlFor="insuranceProvider"
                  className={`absolute left-4 transition-all duration-200 bg-white px-1
                    ${shouldLabelFloat('insuranceProvider') ? '-top-2 text-xs text-blue-600' : 'top-4  text-base'}`}
                >
                  Insurance Provider
                </label>
              </div>

              {/* Policy Number */}
              <div className="relative">
                <input
                  type="text"
                  id="policyNumber"
                  name="policyNumber"
                  value={formData.policyNumber}
                  onChange={handleInputChange}
                  onFocus={() => handleFocus('policyNumber')}
                  onBlur={() => handleBlur('policyNumber')}
                  className="peer w-full h-[58px] px-4 pt-4 pb-1 border border-gray-300 rounded-lg outline-none focus:border-blue-500 transition-all placeholder-transparent"
                  placeholder="Policy Number"
                />
                <label
                  htmlFor="policyNumber"
                  className={`absolute left-4 transition-all duration-200 bg-white px-1
                    ${shouldLabelFloat('policyNumber') ? '-top-2 text-xs text-blue-600' : 'top-4  text-base'}`}
                >
                  Policy Number
                </label>
              </div>

              {/* Coverage Information */}
              <div className="relative">
                <input
                  type="text"
                  id="coverageInformation"
                  name="coverageInformation"
                  value={formData.coverageInformation}
                  onChange={handleInputChange}
                  onFocus={() => handleFocus('coverageInformation')}
                  onBlur={() => handleBlur('coverageInformation')}
                  className="peer w-full h-[58px] px-4 pt-4 pb-1 border border-gray-300 rounded-lg outline-none focus:border-blue-500 transition-all placeholder-transparent"
                  placeholder="Coverage Information"
                />
                <label
                  htmlFor="coverageInformation"
                  className={`absolute left-4 transition-all duration-200 bg-white px-1
                    ${shouldLabelFloat('coverageInformation') ? '-top-2 text-xs text-blue-600' : 'top-4  text-base'}`}
                >
                  Coverage Information
                </label>
              </div>
            </div>

            {/* 6th part */}

            <div className="mb-4">
              <div className="flex items-center gap-2 text-blue-600 font-semibold text-lg">
                <File className="w-5 h-5" />
                <span>Documents</span>
              </div>
            </div>

            <div className="mb-6 h-[140px]">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Upload Image
              </label>

              <div
                onClick={handleFileClick}
                className="border border-dashed border-gray-300 rounded-md p-5 flex items-center justify-center cursor-pointer hover:border-blue-500 transition h-[96px]"
              >
                <button
                  type="button"
                  className="bg-white border border-gray-300 rounded-full px-4 py-1.5 text-sm text-[#1447e6] shadow-sm hover:bg-blue-50 font-medium"
                >
                  Choose file
                </button>
                <span className="ml-1 text-sm ">
                  or drag and drop file here
                </span>
                <input
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  accept="image/*"
                  name="patientImage"
                />
              </div>
            </div>

            {/* Form Status Message */}
            {state?.message && (
              <div className={`p-4 rounded-lg mb-4 ${
                state.success ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
              }`}>
                {state.message}
              </div>
            )}

            <div className="flex justify-end space-x-3 pb-6">
              <button
                type="button"
                className="bg-[#ba1a1a] text-white font-medium py-2 px-5 rounded-full transition"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={isPending}
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-5 rounded-full shadow transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isPending ? 'Updating...' : 'Update Patient'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
