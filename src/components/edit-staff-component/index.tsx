'use client';
import { Home, UserPlus, Eye, EyeOff, ChevronLeft, Check, User, Users, ChevronDown, Droplet, Flag, Mail, Phone, Contact, IdCard, Calendar, Building2, Brain, Clock, BriefcaseBusiness, TrendingUp, UserRoundCog, GraduationCap, FileBadge, MoveRight, Pencil } from 'lucide-react'
import React, { useActionState, useRef, useState } from 'react'

export default function EditStaffComponent() {

    const [step, setStep] = useState(1);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [agreed, setAgreed] = useState(false);

    const totalSteps = 5;

    const steps = [
        "Personal Information",
        "Contact Information",
        "Professional Details",
        "Qualifications",
        "Account Setup",
    ];

    const nextStep = () => setStep(prev => Math.min(prev + 1, totalSteps));
    const prevStep = () => setStep(prev => Math.max(prev - 1, 1));


    const handleStepClick = (index: number) => {
        setStep(index + 1);
    };
    return (
        <>
            <div>
                <div className={`px-6 py-3  mt-1`}>
                    <div className="flex items-center space-x-2 ">
                        <h1 className="text-lg font-semibold ">Edit Staffs</h1>
                        <span className="">›</span>
                        <Home size={18} className="text-gray-500" />
                        <span className="">›</span>
                        <span className="">Staffs</span>
                        <span className="">›</span>
                        <span className="">Edit Staffs</span>
                    </div>


                    <div className="card mt-4 bg-[var(--background)] text-[var(--text-primary)] p-[15px] rounded-xl shadow-sm border border-[var(--border-color)]">
                        <div>
                            <div className="flex flex-col">

                                <div className='flex'>
                                    <UserPlus className=" mr-2 w-5 h-5" />
                                    <h2 className="text-lg font-semibold">
                                        Edit Staff Member
                                    </h2>

                                </div>
                               
                            </div>
                        </div>

                        <div className="">
                            <div className="p-6">
                                {/* Progress Bar */}
                                <div className="flex items-center justify-between w-full mb-6">
                                    {steps.map((label, index) => (
                                        <React.Fragment key={index}>
                                            <div
                                                onClick={() => handleStepClick(index)}
                                                className="flex items-center cursor-pointer select-none"
                                            >
                                                <div
                                                    className={`flex items-center justify-center w-8 h-8 rounded-full font-semibold transition-colors duration-300 
                    ${index + 1 === step
                                                            ? "bg-blue-600 text-white"
                                                            : index + 1 < step
                                                                ? "bg-blue-100 text-blue-600"
                                                                : "bg-gray-200 text-gray-600"
                                                        }`}
                                                >
                                                    {/* {index + 1} */}

                                                    {index + 1 < step ? (
                                                        <Pencil className="w-4 h-4 text-blue-600" />
                                                    ) : (
                                                        index + 1
                                                    )}
                                                </div>
                                                <span
                                                    className={`ml-2 text-sm font-medium text-gray-600 $`}
                                                >
                                                    {label}
                                                </span>
                                            </div>

                                            {index < steps.length - 1 && (
                                                <div
                                                    className={`flex-1 h-[2px] mx-2 transition-colors duration-300 bg-gray-200`}
                                                ></div>
                                            )}
                                        </React.Fragment>
                                    ))}
                                </div>

                                {/* Step Forms */}
                                <form className="space-y-6">
                                    {step === 1 && (
                                        <div className="space-y-6">
                                            <PersonalInfo />
                                            <div className="flex justify-end">
                                                <button
                                                    type="button"
                                                    onClick={nextStep}
                                                    className="border border-[#1447e6] text-white bg-[#1447e6] px-6 py-2 rounded-full flex items-center gap-2 hover:bg-blue-700 transition"
                                                >
                                                    <MoveRight className="w-5 h-5" /> Next
                                                </button>
                                            </div>
                                        </div>
                                    )}

                                    {step === 2 && (
                                        <div className="space-y-6">
                                            <ContactInfoForm />
                                            <div className="flex justify-between">
                                                <button
                                                    type="button"
                                                    onClick={prevStep}
                                                    className="border border-gray-300 text-[#1447e6] px-6 py-2 rounded-full flex items-center gap-2 hover:bg-gray-50 transition"
                                                >
                                                    <ChevronLeft className="w-5 h-5" /> Back
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={nextStep}
                                                    className="border border-[#1447e6] text-white bg-[#1447e6] px-6 py-2 rounded-full flex items-center gap-2 hover:bg-blue-700 transition"
                                                >
                                                    <MoveRight className="w-5 h-5" /> Next
                                                </button>
                                            </div>
                                        </div>
                                    )}

                                    {step === 3 && (
                                        <div className="space-y-5">
                                            <ProfessionalInfo />
                                            <div className="flex justify-between">
                                                <button
                                                    type="button"
                                                    onClick={prevStep}
                                                    className="border border-gray-300 text-[#1447e6] px-6 py-2 rounded-full flex items-center gap-2 hover:bg-gray-50 transition"
                                                >
                                                    <ChevronLeft className="w-5 h-5" /> Back
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={nextStep}
                                                    className="border border-[#1447e6] text-white bg-[#1447e6] px-6 py-2 rounded-full flex items-center gap-2 hover:bg-blue-700 transition"
                                                >
                                                    <MoveRight className="w-5 h-5" /> Next
                                                </button>
                                            </div>
                                        </div>
                                    )}

                                    {step === 4 && (
                                        <div className="space-y-5">
                                            <Qualifications />
                                            <div className="flex justify-between">
                                                <button
                                                    type="button"
                                                    onClick={prevStep}
                                                    className="border border-gray-300 text-[#1447e6] px-6 py-2 rounded-full flex items-center gap-2 hover:bg-gray-50 transition"
                                                >
                                                    <ChevronLeft className="w-5 h-5" /> Back
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={nextStep}
                                                    className="border border-[#1447e6] text-white bg-[#1447e6] px-6 py-2 rounded-full flex items-center gap-2 hover:bg-blue-700 transition"
                                                >
                                                    <MoveRight className="w-5 h-5" /> Next
                                                </button>
                                            </div>
                                        </div>
                                    )}

                                    {step === 5 && (
                                        <div className="space-y-5">
                                            <AccountInfo />
                                            <div className="flex justify-between">
                                                <button
                                                    type="button"
                                                    onClick={prevStep}
                                                    className="border border-gray-300 text-[#1447e6] px-6 py-2 rounded-full flex items-center gap-2 hover:bg-gray-50 transition"
                                                >
                                                    <ChevronLeft className="w-5 h-5" /> Back
                                                </button>
                                                <button
                                                    type="submit"
                                                    disabled={!agreed}
                                                    className={`px-8 py-2 rounded-full flex items-center gap-2 transition ${agreed
                                                        ? "bg-green-600 text-white hover:bg-green-700"
                                                        : "bg-gray-400 text-gray-600 cursor-not-allowed"
                                                        }`}
                                                >
                                                    <Check className="w-5 h-5" /> Submit
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </form>
                            </div>
                        </div>

                    </div>

                </div>
            </div >
        </>
    )
}

function PersonalInfo() {
    const updateForm = (prevState: any, payload: any) => {
        return { ...prevState, ...payload };
    };


    const [formData, updateAction] = useActionState(updateForm, {
        firstName: "",
        lastName: "",
        gender: "",
        dob: "",
        bloodGroup: "",
        maritalStatus: "",
        nationality: "",
    });

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        updateAction({ [name]: value });
    };

    return (
        <>
            <h3 className="text-xl font-semibold text-gray-800">Personal Information</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
                {/* First Name */}
                <div className="relative mb-8">
                    <input
                        type="text"
                        name="firstName"
                        autoComplete="off"
                        value={formData.firstName}
                        onChange={handleChange}
                        placeholder=" "
                        className="peer w-full rounded-md border bg-white px-3 pt-4 pb-4 text-sm  focus:border-blue-600 focus:ring-2 focus:ring-blue-600 outline-none transition-all"
                    />
                    <span className="absolute top-3.5 right-2">
                        <User className="w-5 h-5" />
                    </span>
                    <label
                        className={`absolute left-3 px-1 bg-white transition-all duration-200
              ${formData.firstName ? "-top-2 text-xs text-blue-600" : "top-3.5 text-gray-500"} 
              peer-focus:-top-2 peer-focus:text-xs peer-focus:text-blue-600`}
                    >
                        First Name <span className="text-red-500">*</span>
                    </label>
                </div>

                {/* Last Name */}
                <div className="relative">
                    <input
                        type="text"
                        name="lastName"
                        autoComplete="off"
                        value={formData.lastName}
                        onChange={handleChange}
                        placeholder=" "
                        className="peer w-full rounded-md border bg-white px-3 pt-4 pb-4 text-sm  focus:border-blue-600 focus:ring-2 focus:ring-blue-600 outline-none transition-all"
                    />
                    <span className="absolute top-3.5 right-2">
                        <User className="w-5 h-5" />
                    </span>
                    <label
                        className={`absolute left-3 px-1 bg-white transition-all duration-200
              ${formData.lastName ? "-top-2 text-xs text-blue-600" : "top-3.5 text-gray-500"} 
              peer-focus:-top-2 peer-focus:text-xs peer-focus:text-blue-600`}
                    >
                        Last Name <span className="text-red-500">*</span>
                    </label>
                </div>

                {/* Gender */}
                <div className="relative">
                    <select
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                        className="peer w-full rounded-md border bg-white px-3 pt-4 pb-4 text-sm focus:border-blue-600 focus:ring-2 focus:ring-blue-600 outline-none transition-all appearance-none"
                    >
                        <option value=""></option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                    </select>
                    <span className="absolute top-3.5 right-2">
                        <Users className="w-5 h-5" />
                    </span>
                    <span className="absolute top-4 right-10">
                        <ChevronDown className="w-5 h-5" />
                    </span>
                    <label
                        className={`absolute left-3 px-1 bg-white transition-all duration-200
              ${formData.gender ? "-top-2 text-xs text-blue-600" : "top-3.5 text-gray-500"} 
              peer-focus:-top-2 peer-focus:text-xs peer-focus:text-blue-600`}
                    >
                        Gender <span className="text-red-500">*</span>
                    </label>
                </div>

                {/* Date of Birth */}
                <div className="relative">
                    <input
                        type="date"
                        name="dob"
                        value={formData.dob}
                        onChange={handleChange}
                        className="peer w-full rounded-md border bg-white px-3 pt-4 pb-4 text-sm  focus:border-blue-600 focus:ring-2 focus:ring-blue-600 outline-none transition-all"
                    />
                    <label
                        className={`absolute left-3 px-1 bg-white transition-all duration-200
              ${formData.dob ? "-top-2 text-xs text-blue-600" : "top-3.5 text-gray-500"} 
              peer-focus:-top-2 peer-focus:text-xs peer-focus:text-blue-600`}
                    >
                        Date of Birth <span className="text-red-500">*</span>
                    </label>
                </div>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-5 my-12'>
                {/* Blood Group */}
                <div className="relative">
                    <select
                        name="bloodGroup"
                        value={formData.bloodGroup}
                        onChange={handleChange}
                        className="peer w-full rounded-md border bg-white px-3 pt-4 pb-4 text-sm  focus:border-blue-600 focus:ring-2 focus:ring-blue-600 outline-none transition-all appearance-none"
                    >
                        <option value="">Select</option>
                        <option value="A+">A+</option>
                        <option value="A-">A-</option>
                        <option value="B+">B+</option>
                        <option value="O+">O+</option>
                    </select>
                    <span className="absolute top-3.5 right-2">
                        <Droplet className="w-5 h-5" />
                    </span>
                    <span className="absolute top-4 right-10">
                        <ChevronDown className="w-5 h-5" />
                    </span>
                    <label
                        className={`absolute left-3 px-1 bg-white transition-all duration-200
              ${formData.bloodGroup ? "-top-2 text-xs text-blue-600" : "top-3.5 text-gray-500"} 
              peer-focus:-top-2 peer-focus:text-xs peer-focus:text-blue-600`}
                    >
                        Blood Group
                    </label>
                </div>

                {/* Marital Status */}
                <div className="relative">
                    <select
                        name="maritalStatus"
                        value={formData.maritalStatus}
                        onChange={handleChange}
                        className="peer w-full rounded-md border bg-white px-3 pt-4 pb-4 text-sm  focus:border-blue-600 focus:ring-2 focus:ring-blue-600 outline-none transition-all appearance-none"
                    >
                        <option value="">Select</option>
                        <option value="Single">Single</option>
                        <option value="Married">Married</option>
                    </select>
                    <span className="absolute top-3.5 right-2">
                        <ChevronDown className="w-5 h-5" />
                    </span>
                    <label
                        className={`absolute left-3 px-1 bg-white transition-all duration-200
              ${formData.maritalStatus ? "-top-2 text-xs text-blue-600" : "top-3.5 text-gray-500"} 
              peer-focus:-top-2 peer-focus:text-xs peer-focus:text-blue-600`}
                    >
                        Marital Status
                    </label>
                </div>

                {/* Nationality */}
                <div className="relative md:col-span-1">
                    <input
                        type="text"
                        name="nationality"
                        autoComplete="off"
                        value={formData.nationality}
                        onChange={handleChange}
                        placeholder=" "
                        className="peer w-full rounded-md border bg-white px-3 pt-4 pb-4 text-sm  focus:border-blue-600 focus:ring-2 focus:ring-blue-600 outline-none transition-all"
                    />
                    <span className="absolute top-3.5 right-2">
                        <Flag className="w-5 h-5" />
                    </span>
                    <span className="absolute top-4 right-10">
                        <ChevronDown className="w-5 h-5" />
                    </span>
                    <label
                        className={`absolute left-3 px-1 bg-white transition-all duration-200
              ${formData.nationality ? "-top-2 text-xs text-blue-600" : "top-3.5 text-gray-500"} 
              peer-focus:-top-2 peer-focus:text-xs peer-focus:text-blue-600`}
                    >
                        Nationality
                    </label>
                </div>
            </div>
        </>
    )
}

function ContactInfoForm() {

    const [formData, setFormData] = useActionState(
        (prevState: any, newState: any) => ({ ...prevState, ...newState }),
        {
            email: "",
            mobile: "",
            emergencyName: "",
            emergencyContact: "",
            address: "",
            city: "",
            state: "",
            postalCode: "",
            country: "",
        }
    );

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({ [name]: value });
    };
    return (
        <>
            <h3 className="text-xl font-semibold text-gray-800">Contact Information</h3>


            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Email */}
                <div className="relative mb-8">
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder=" "
                        className="peer w-full rounded-md border bg-white px-3 pt-4 pb-4 text-sm 
          text-[var(--text-primary)] focus:border-[#005cbb] focus:ring-2 focus:ring-[#005cbb] 
          outline-none transition-all"
                    />
                    <label
                        htmlFor="email"
                        className={`absolute left-3 px-[4px] bg-[var(--background)] transition-all duration-200
            ${formData.email ? "-top-2 text-xs text-blue-600" : "top-3.5 text-[var(--text-secondary)]"} 
            peer-focus:-top-2 peer-focus:text-xs peer-focus:text-blue-600`}
                    >
                        Email <span className="text-red-500">*</span>
                    </label>
                    <span className="absolute top-4 right-3">
                        <Mail className="w-5 h-5" />
                    </span>
                </div>

                {/* Mobile */}
                <div className="relative mb-8">
                    <input
                        type="tel"
                        id="mobile"
                        name="mobile"
                        value={formData.mobile}
                        onChange={handleChange}
                        placeholder=" "
                        className="peer w-full rounded-md border bg-white px-10 pt-4 pb-4 text-sm 
          text-[var(--text-primary)] focus:border-[#005cbb] focus:ring-2 focus:ring-[#005cbb] 
          outline-none transition-all"
                    />
                    <label
                        htmlFor="mobile"
                        className={`absolute left-3 px-[4px] bg-[var(--background)] transition-all duration-200
            ${formData.mobile ? "-top-2 text-xs text-blue-600" : "top-3.5 text-[var(--text-secondary)]"} 
            peer-focus:-top-2 peer-focus:text-xs peer-focus:text-blue-600`}
                    >
                        Mobile <span className="text-red-500">*</span>
                    </label>
                    <span className="absolute top-4 right-3">
                        <Phone className="w-5 h-5" />
                    </span>
                </div>

                {/* Emergency Contact Name */}
                <div className="relative mb-8">
                    <input
                        type="text"
                        id="emergencyName"
                        name="emergencyName"
                        value={formData.emergencyName}
                        onChange={handleChange}
                        placeholder=" "
                        className="peer w-full rounded-md border bg-white px-10 pt-4 pb-4 text-sm 
          text-[var(--text-primary)] focus:border-[#005cbb] focus:ring-2 focus:ring-[#005cbb] 
          outline-none transition-all"
                    />
                    <label
                        htmlFor="emergencyName"
                        className={`absolute left-3 px-[4px] bg-[var(--background)] transition-all duration-200
            ${formData.emergencyName ? "-top-2 text-xs text-blue-600" : "top-3.5 text-[var(--text-secondary)]"} 
            peer-focus:-top-2 peer-focus:text-xs peer-focus:text-blue-600`}
                    >
                        Emergency Contact Name
                    </label>
                    <span className="absolute top-4 right-3">
                        <Contact className="w-5 h-5" />
                    </span>
                </div>

                {/* Emergency Contact Number */}
                <div className="relative mb-8">
                    <input
                        type="tel"
                        id="emergencyContact"
                        name="emergencyContact"
                        value={formData.emergencyContact}
                        onChange={handleChange}
                        placeholder=" "
                        className="peer w-full rounded-md border bg-white px-10 pt-4 pb-4 text-sm 
          text-[var(--text-primary)] focus:border-[#005cbb] focus:ring-2 focus:ring-[#005cbb] 
          outline-none transition-all"
                    />
                    <label
                        htmlFor="emergencyContact"
                        className={`absolute left-3 px-[4px] bg-[var(--background)] transition-all duration-200
            ${formData.emergencyContact ? "-top-2 text-xs text-blue-600" : "top-3.5 text-[var(--text-secondary)]"} 
            peer-focus:-top-2 peer-focus:text-xs peer-focus:text-blue-600`}
                    >
                        Emergency Contact Number
                    </label>
                    <span className="absolute top-4 right-3">
                        <Phone className="w-5 h-5" />
                    </span>
                </div>

                {/* Address */}
                <div className="md:col-span-2 relative mb-8">
                    <textarea
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        placeholder=" "
                        rows={3}
                        className="peer w-full rounded-md border bg-white px-2 pt-4 pb-4 text-sm 
          text-[var(--text-primary)] focus:border-[#005cbb] focus:ring-2 focus:ring-[#005cbb] 
          outline-none transition-all resize-none"
                    />
                    <label
                        htmlFor="address"
                        className={`absolute left-3 px-[4px] bg-[var(--background)] transition-all duration-200
            ${formData.address ? "-top-2 text-xs text-blue-600" : "top-3.5 text-[var(--text-secondary)]"} 
            peer-focus:-top-2 peer-focus:text-xs peer-focus:text-blue-600`}
                    >
                        Address <span className="text-red-500">*</span>
                    </label>
                    <span className="absolute top-8 right-3">
                        <Home className="w-5 h-5" />
                    </span>
                </div>


            </div>

            <div className='grid grid-cols-1 md:grid-cols-4 gap-5'>
                {/* City */}
                <div className="relative mb-8">
                    <input
                        type="text"
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        placeholder=" "
                        className="peer w-full rounded-md border bg-white px-10 pt-4 pb-4 text-sm 
          text-[var(--text-primary)] focus:border-[#005cbb] focus:ring-2 focus:ring-[#005cbb] 
          outline-none transition-all"
                    />
                    <label
                        htmlFor="city"
                        className={`absolute left-3 px-[4px] bg-[var(--background)] transition-all duration-200
            ${formData.city ? "-top-2 text-xs text-blue-600" : "top-3.5 text-[var(--text-secondary)]"} 
            peer-focus:-top-2 peer-focus:text-xs peer-focus:text-blue-600`}
                    >
                        City
                    </label>
                </div>

                {/* State/Province */}
                <div className="relative mb-8">
                    <input
                        type="text"
                        id="state"
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        placeholder=" "
                        className="peer w-full rounded-md border bg-white px-10 pt-4 pb-4 text-sm 
          text-[var(--text-primary)] focus:border-[#005cbb] focus:ring-2 focus:ring-[#005cbb] 
          outline-none transition-all"
                    />
                    <label
                        htmlFor="state"
                        className={`absolute left-3 px-[4px] bg-[var(--background)] transition-all duration-200
            ${formData.state ? "-top-2 text-xs text-blue-600" : "top-3.5 text-[var(--text-secondary)]"} 
            peer-focus:-top-2 peer-focus:text-xs peer-focus:text-blue-600`}
                    >
                        State/Province
                    </label>
                </div>

                {/* Postal Code */}
                <div className="relative mb-8">
                    <input
                        type="text"
                        id="postalCode"
                        name="postalCode"
                        value={formData.postalCode}
                        onChange={handleChange}
                        placeholder=" "
                        className="peer w-full rounded-md border bg-white px-10 pt-4 pb-4 text-sm 
          text-[var(--text-primary)] focus:border-[#005cbb] focus:ring-2 focus:ring-[#005cbb] 
          outline-none transition-all"
                    />
                    <label
                        htmlFor="postalCode"
                        className={`absolute left-3 px-[4px] bg-[var(--background)] transition-all duration-200
            ${formData.postalCode ? "-top-2 text-xs text-blue-600" : "top-3.5 text-[var(--text-secondary)]"} 
            peer-focus:-top-2 peer-focus:text-xs peer-focus:text-blue-600`}
                    >
                        Postal Code
                    </label>
                </div>

                {/* Country */}
                <div className="relative mb-8">
                    <input
                        type="text"
                        id="country"
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                        placeholder=" "
                        className="peer w-full rounded-md border bg-white px-10 pt-4 pb-4 text-sm 
          text-[var(--text-primary)] focus:border-[#005cbb] focus:ring-2 focus:ring-[#005cbb] 
          outline-none transition-all"
                    />
                    <label
                        htmlFor="country"
                        className={`absolute left-3 px-[4px] bg-[var(--background)] transition-all duration-200
            ${formData.country ? "-top-2 text-xs text-blue-600" : "top-3.5 text-[var(--text-secondary)]"} 
            peer-focus:-top-2 peer-focus:text-xs peer-focus:text-blue-600`}
                    >
                        Country
                    </label>
                </div>
            </div>

        </>
    )
}

function ProfessionalInfo() {

    const [formData, setFormData] = useActionState(
        (prev: any, next: any) => ({ ...prev, ...next }),
        {
            staffId: "",
            joinDate: "",
            designation: "",
            department: "",
            specialization: "",
            experience: "",
            employmentType: "",
            shift: "",
        }
    );

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFormData({ [name]: value });
    };
    return (
        <>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Professional Details
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Staff ID */}
                <div className="relative mb-8">
                    <input
                        type="text"
                        id="staffId"
                        name="staffId"
                        value={formData.staffId}
                        onChange={handleChange}
                        placeholder=" "
                        className="peer w-full rounded-md border bg-white px-10 pt-4 pb-4 text-sm 
            text-[var(--text-primary)] focus:border-[#005cbb] focus:ring-2 focus:ring-[#005cbb] 
            outline-none transition-all"
                    />
                    <label
                        htmlFor="staffId"
                        className={`absolute left-3 px-[4px] bg-[var(--background)] transition-all duration-200
              ${formData.staffId
                                ? "-top-2 text-xs text-blue-600"
                                : "top-3.5 text-[var(--text-secondary)]"
                            } 
              peer-focus:-top-2 peer-focus:text-xs peer-focus:text-blue-600`}
                    >
                        Staff ID <span className="text-red-500">*</span>
                    </label>
                    <span className="absolute top-4 right-3">
                        <IdCard className="w-5 h-5" />
                    </span>
                </div>

                {/* Join Date */}
                <div className="relative mb-8">
                    <input
                        type="date"
                        id="joinDate"
                        name="joinDate"
                        value={formData.joinDate}
                        onChange={handleChange}
                        placeholder=" "
                        className="peer w-full rounded-md border bg-white !px-3 pt-4 pb-4 text-sm 
            text-[var(--text-primary)] focus:border-[#005cbb] focus:ring-2 focus:ring-[#005cbb] 
            outline-none transition-all"
                    />
                    <label
                        // htmlFor="joinDate"
                        className={`absolute left-3 px-[4px] pr-[14px] bg-[var(--background)] transition-all duration-200
              ${formData.joinDate
                                ? "-top-2 text-xs text-blue-600"
                                : "top-3.5 text-[var(--text-secondary)]"
                            } 
              peer-focus:-top-2 peer-focus:text-xs peer-focus:text-blue-600`}
                    >
                        Join Date
                    </label>
                </div>

                {/* Designation */}
                <div className="relative mb-8">
                    <input
                        type="text"
                        id="designation"
                        name="designation"
                        value={formData.designation}
                        onChange={handleChange}
                        placeholder=" "
                        className="peer w-full rounded-md border bg-white px-10 pt-4 pb-4 text-sm 
            text-[var(--text-primary)] focus:border-[#005cbb] focus:ring-2 focus:ring-[#005cbb] 
            outline-none transition-all"
                    />
                    <label
                        htmlFor="designation"
                        className={`absolute left-3 px-[4px] bg-[var(--background)] transition-all duration-200
              ${formData.designation
                                ? "-top-2 text-xs text-blue-600"
                                : "top-3.5 text-[var(--text-secondary)]"
                            } 
              peer-focus:-top-2 peer-focus:text-xs peer-focus:text-blue-600`}
                    >
                        Designation <span className="text-red-500">*</span>
                    </label>
                    <span className="absolute top-4 right-3">
                        <BriefcaseBusiness className="w-5 h-5" />
                    </span>
                </div>

                {/* Department */}
                <div className="relative mb-8">
                    <select
                        id="department"
                        name="department"
                        value={formData.department}
                        onChange={handleChange}
                        className="peer w-full appearance-none rounded-md border bg-white px-10 pt-4 pb-4 text-sm 
            text-[var(--text-primary)] focus:border-[#005cbb] focus:ring-2 focus:ring-[#005cbb] 
            outline-none transition-all"
                    >
                        <option value=""></option>
                        <option value="Cardiology">Cardiology</option>
                        <option value="Neurology">Neurology</option>
                        <option value="Pediatrics">Pediatrics</option>
                    </select>
                    <label
                        htmlFor="department"
                        className={`absolute left-3 px-[4px] bg-[var(--background)] transition-all duration-200
              ${formData.department
                                ? "-top-2 text-xs text-blue-600"
                                : "top-3.5 text-[var(--text-secondary)]"
                            } 
              peer-focus:-top-2 peer-focus:text-xs peer-focus:text-blue-600`}
                    >
                        Department <span className="text-red-500">*</span>
                    </label>
                    <span className="absolute top-4 right-3">
                        <Building2 className="w-5 h-5" />
                    </span>
                </div>

                {/* Specialization */}
                <div className="relative mb-8">
                    <input
                        type="text"
                        id="specialization"
                        name="specialization"
                        value={formData.specialization}
                        onChange={handleChange}
                        placeholder=" "
                        className="peer w-full rounded-md border bg-white px-10 pt-4 pb-4 text-sm 
            text-[var(--text-primary)] focus:border-[#005cbb] focus:ring-2 focus:ring-[#005cbb] 
            outline-none transition-all"
                    />
                    <label
                        htmlFor="specialization"
                        className={`absolute left-3 px-[4px] bg-[var(--background)] transition-all duration-200
              ${formData.specialization
                                ? "-top-2 text-xs text-blue-600"
                                : "top-3.5 text-[var(--text-secondary)]"
                            } 
              peer-focus:-top-2 peer-focus:text-xs peer-focus:text-blue-600`}
                    >
                        Specialization
                    </label>
                    <span className="absolute top-4 right-3">
                        <Brain className="w-5 h-5" />
                    </span>
                </div>

                {/* Experience */}
                <div className="relative mb-8">
                    <input
                        type="number"
                        id="experience"
                        name="experience"
                        value={formData.experience}
                        onChange={handleChange}
                        placeholder=" "
                        className="peer w-full rounded-md border bg-white px-10 pt-4 pb-4 text-sm 
            text-[var(--text-primary)] focus:border-[#005cbb] focus:ring-2 focus:ring-[#005cbb] 
            outline-none transition-all"
                    />
                    <label
                        htmlFor="experience"
                        className={`absolute left-3 px-[4px] bg-[var(--background)] transition-all duration-200
              ${formData.experience
                                ? "-top-2 text-xs text-blue-600"
                                : "top-3.5 text-[var(--text-secondary)]"
                            } 
              peer-focus:-top-2 peer-focus:text-xs peer-focus:text-blue-600`}
                    >
                        Experience (years)
                    </label>
                    <span className="absolute top-4 right-3">
                        <TrendingUp className="w-5 h-5" />
                    </span>
                </div>

                {/* Employment Type */}
                <div className="relative mb-8">
                    <select
                        id="employmentType"
                        name="employmentType"
                        value={formData.employmentType}
                        onChange={handleChange}
                        className="peer w-full appearance-none rounded-md border bg-white px-10 pt-4 pb-4 text-sm 
            text-[var(--text-primary)] focus:border-[#005cbb] focus:ring-2 focus:ring-[#005cbb] 
            outline-none transition-all"
                    >
                        <option value="">Select Type</option>
                        <option value="Full-Time">Full-Time</option>
                        <option value="Part-Time">Part-Time</option>
                        <option value="Contract">Contract</option>
                        <option value="Contract">Intern</option>
                    </select>
                    <label
                        htmlFor="employmentType"
                        className={`absolute left-3 px-[4px] bg-[var(--background)] transition-all duration-200
              ${formData.employmentType
                                ? "-top-2 text-xs text-blue-600"
                                : "top-3.5 text-[var(--text-secondary)]"
                            } 
              peer-focus:-top-2 peer-focus:text-xs peer-focus:text-blue-600`}
                    >
                        Employment Type
                    </label>
                    <span className="absolute top-4 right-3">
                        <UserRoundCog className="w-5 h-5" />
                    </span>
                </div>

                {/* Shift */}
                <div className="relative mb-8">
                    <select
                        id="shift"
                        name="shift"
                        value={formData.shift}
                        onChange={handleChange}
                        className="peer w-full appearance-none rounded-md border bg-white px-10 pt-4 pb-4 text-sm 
            text-[var(--text-primary)] focus:border-[#005cbb] focus:ring-2 focus:ring-[#005cbb] 
            outline-none transition-all"
                    >
                        <option value=""></option>
                        <option value="Morning">Morning</option>
                        <option value="Evening">Evening</option>
                        <option value="Night">Night</option>
                    </select>
                    <label
                        htmlFor="shift"
                        className={`absolute left-3 px-[4px] bg-[var(--background)] transition-all duration-200
              ${formData.shift
                                ? "-top-2 text-xs text-blue-600"
                                : "top-3.5 text-[var(--text-secondary)]"
                            } 
              peer-focus:-top-2 peer-focus:text-xs peer-focus:text-blue-600`}
                    >
                        Shift
                    </label>
                    <span className="absolute top-4 right-3">
                        <Clock className="w-5 h-5" />
                    </span>
                </div>
            </div>
        </>
    )
}
function Qualifications() {

    const [formData, setFormData] = useActionState(
        (prev: any, next: any) => ({ ...prev, ...next }),
        {
            education: "",
            certifications: "",
            licenseNumber: "",
            licenseExpiry: "",
            skills: "",
        }
    );

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData({ [name]: value });
    };
    return (
        <>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Qualifications & Certifications
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Education */}
                <div className="relative mb-8 md:col-span-2">
                    <textarea
                        id="education"
                        name="education"
                        rows={3}
                        value={formData.education}
                        onChange={handleChange}
                        placeholder=" "
                        className="peer w-full rounded-md border bg-white px-10 pt-5 pb-3 text-sm 
                        text-[var(--text-primary)] focus:border-[#005cbb] focus:ring-2 
                        focus:ring-[#005cbb] outline-none transition-all resize-none"
                    />
                    <label
                        htmlFor="education"
                        className={`absolute left-3 px-[4px] bg-[var(--background)] transition-all duration-200
                        ${formData.education
                                ? "-top-2 text-xs text-blue-600"
                                : "top-3.5 text-[var(--text-secondary)]"
                            } 
                        peer-focus:-top-2 peer-focus:text-xs peer-focus:text-blue-600`}
                    >
                        Education <span className="text-red-500">*</span>
                    </label>
                    <span className="absolute top-8 right-3 text-gray-500">
                        <GraduationCap className="w-5 h-5" />
                    </span>
                </div>

                {/* Certifications */}
                <div className="relative mb-8 md:col-span-2">
                    <textarea
                        id="certifications"
                        name="certifications"
                        rows={2}
                        value={formData.certifications}
                        onChange={handleChange}
                        placeholder=" "
                        className="peer w-full rounded-md border bg-white px-10 pt-5 pb-3 text-sm 
                        text-[var(--text-primary)] focus:border-[#005cbb] focus:ring-2 
                        focus:ring-[#005cbb] outline-none transition-all resize-none"
                    />
                    <label
                        htmlFor="certifications"
                        className={`absolute left-3 px-[4px] bg-[var(--background)] transition-all duration-200
                        ${formData.certifications
                                ? "-top-2 text-xs text-blue-600"
                                : "top-3.5 text-[var(--text-secondary)]"
                            } 
                        peer-focus:-top-2 peer-focus:text-xs peer-focus:text-blue-600`}
                    >
                        Certifications
                    </label>
                    <span className="absolute top-6 right-3 text-gray-500">
                        <FileBadge className="w-5 h-5" />
                    </span>
                </div>

                {/* License Number */}
                <div className="relative mb-8">
                    <input
                        type="text"
                        id="licenseNumber"
                        name="licenseNumber"
                        value={formData.licenseNumber}
                        onChange={handleChange}
                        placeholder=" "
                        className="peer w-full rounded-md border bg-white px-10 pt-4 pb-4 text-sm 
                        text-[var(--text-primary)] focus:border-[#005cbb] focus:ring-2 
                        focus:ring-[#005cbb] outline-none transition-all"
                    />
                    <label
                        htmlFor="licenseNumber"
                        className={`absolute left-3 px-[4px] bg-[var(--background)] transition-all duration-200
                        ${formData.licenseNumber
                                ? "-top-2 text-xs text-blue-600"
                                : "top-3.5 text-[var(--text-secondary)]"
                            } 
                        peer-focus:-top-2 peer-focus:text-xs peer-focus:text-blue-600`}
                    >
                        License Number
                    </label>
                    <span className="absolute top-4 right-3 text-gray-500">
                        <IdCard className="w-5 h-5" />
                    </span>
                </div>

                {/* License Expiry */}
                <div className="relative mb-8">
                    <input
                        type="date"
                        id="licenseExpiry"
                        name="licenseExpiry"
                        value={formData.licenseExpiry}
                        onChange={handleChange}
                        placeholder=" "
                        className="peer w-full rounded-md border bg-white !px-3 pt-4 pb-4 text-sm 
                        text-[var(--text-primary)] focus:border-[#005cbb] focus:ring-2 
                        focus:ring-[#005cbb] outline-none transition-all"
                    />
                    <label
                        htmlFor="licenseExpiry"
                        className={`absolute left-3 px-[4px] pr-[14px] bg-[var(--background)] transition-all duration-200
                        ${formData.licenseExpiry
                                ? "-top-2 text-xs text-blue-600"
                                : "top-3.5 text-[var(--text-secondary)]"
                            } 
                        peer-focus:-top-2 peer-focus:text-xs peer-focus:text-blue-600`}
                    >
                        License Expiry
                    </label>
                    <span className="absolute top-4 right-3 text-gray-500">
                        <Calendar className="w-5 h-5" />
                    </span>
                </div>

                {/* Skills */}
                <div className="relative mb-8 md:col-span-2">
                    <textarea
                        id="skills"
                        name="skills"
                        rows={2}
                        value={formData.skills}
                        onChange={handleChange}
                        placeholder=" "
                        className="peer w-full rounded-md border bg-white px-10 pt-5 pb-3 text-sm 
                        text-[var(--text-primary)] focus:border-[#005cbb] focus:ring-2 
                        focus:ring-[#005cbb] outline-none transition-all resize-none"
                    />
                    <label
                        htmlFor="skills"
                        className={`absolute left-3 px-[4px] bg-[var(--background)] transition-all duration-200
                        ${formData.skills
                                ? "-top-2 text-xs text-blue-600"
                                : "top-3.5 text-[var(--text-secondary)]"
                            } 
                        peer-focus:-top-2 peer-focus:text-xs peer-focus:text-blue-600`}
                    >
                        Skills
                    </label>
                    <span className="absolute top-6 right-3 text-gray-500">
                        <Brain className="w-5 h-5" />
                    </span>
                </div>
            </div>
        </>
    )
}

function AccountInfo() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [preview, setPreview] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const [formData, setFormData] = useActionState(
        (prev: any, next: any) => ({ ...prev, ...next }),
        {
            username: "",
            password: "",
            confirmPassword: "",
            bio: "",
            photo: null,
            agreed: false,
        }
    );

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value, type, checked, files } = e.target as any;
        if (type === "checkbox") {
            setFormData({ [name]: checked });
        } else if (type === "file" && files?.[0]) {
            const file = files[0];
            setPreview(URL.createObjectURL(file));
            setFormData({ photo: file });
        } else {
            setFormData({ [name]: value });
        }
    };

    const handleFileClick = () => {
        fileInputRef.current?.click();
    };

    return (
        <>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Account Setup
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Username */}
                <div className="relative mb-8 md:col-span-2">
                    <input
                        id="username"
                        name="username"
                        type="text"
                        value={formData.username}
                        onChange={handleChange}
                        placeholder=" "
                        className="peer w-full rounded-md border bg-white px-3 pt-5 pb-3 text-sm 
              text-[var(--text-primary)] focus:border-[#005cbb] focus:ring-2 
              focus:ring-[#005cbb] outline-none transition-all"
                    />
                    <label
                        htmlFor="username"
                        className={`absolute left-3 px-[4px] bg-[var(--background)] transition-all duration-200
              ${formData.username
                                ? "-top-2 text-xs text-blue-600"
                                : "top-3.5 text-[var(--text-secondary)]"
                            }
              peer-focus:-top-2 peer-focus:text-xs peer-focus:text-blue-600`}
                    >
                        Username <span className="text-red-500">*</span>
                    </label>
                    <span className="absolute top-4 right-3 text-gray-500">
                        <User className="w-5 h-5" />
                    </span>
                </div>

                {/* Password */}
                <div className="relative mb-8">
                    <input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        value={formData.password}
                        onChange={handleChange}
                        placeholder=" "
                        className="peer w-full rounded-md border bg-white px-3 pt-5 pb-3 text-sm 
              text-[var(--text-primary)] focus:border-[#005cbb] focus:ring-2 
              focus:ring-[#005cbb] outline-none transition-all"
                    />
                    <label
                        htmlFor="password"
                        className={`absolute left-3 px-[4px] bg-[var(--background)] transition-all duration-200
              ${formData.password
                                ? "-top-2 text-xs text-blue-600"
                                : "top-3.5 text-[var(--text-secondary)]"
                            }
              peer-focus:-top-2 peer-focus:text-xs peer-focus:text-blue-600`}
                    >
                        Password <span className="text-red-500">*</span>
                    </label>
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute top-4 right-3 text-gray-500"
                    >
                        {showPassword ? (
                            <EyeOff className="w-5 h-5" />
                        ) : (
                            <Eye className="w-5 h-5" />
                        )}
                    </button>
                </div>

                {/* Confirm Password */}
                <div className="relative mb-8">
                    <input
                        id="confirmPassword"
                        name="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        placeholder=" "
                        className="peer w-full rounded-md border bg-white px-3 pt-5 pb-3 text-sm 
              text-[var(--text-primary)] focus:border-[#005cbb] focus:ring-2 
              focus:ring-[#005cbb] outline-none transition-all"
                    />
                    <label
                        htmlFor="confirmPassword"
                        className={`absolute left-3 px-[4px] bg-[var(--background)] transition-all duration-200
              ${formData.confirmPassword
                                ? "-top-2 text-xs text-blue-600"
                                : "top-3.5 text-[var(--text-secondary)]"
                            }
              peer-focus:-top-2 peer-focus:text-xs peer-focus:text-blue-600`}
                    >
                        Confirm Password <span className="text-red-500">*</span>
                    </label>
                    <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute top-4 right-3 text-gray-500"
                    >
                        {showConfirmPassword ? (
                            <EyeOff className="w-5 h-5" />
                        ) : (
                            <Eye className="w-5 h-5" />
                        )}
                    </button>
                </div>


                {/* ✅ Profile Photo — Custom design (matches screenshot) */}
                <div className="relative mb-8 md:col-span-2">
                    <label className="block text-sm font-medium  mb-2">
                        Profile Photo
                    </label>

                    <div
                        onClick={handleFileClick}
                        className="border border-dashed border-gray-300 rounded-md p-5 flex items-center cursor-pointer hover:border-blue-500 transition h-[96px]"
                    >
                        <button
                            type="button"
                            className="bg-white border border-gray-300 rounded-full px-4 py-1.5 text-sm text-[#1447e6] shadow-sm hover:bg-blue-50 font-medium"
                        >
                            Choose file
                        </button>
                        <span className="ml-1 text-sm text-gray-600">
                            or drag and drop file here
                        </span>
                    </div>

                    <input
                        ref={fileInputRef}
                        id="photo"
                        name="photo"
                        type="file"
                        accept="image/*"
                        onChange={handleChange}
                        className="hidden"
                    />
                </div>

                {/* Bio */}
                <div className="relative mb-8 md:col-span-2">
                    <textarea
                        id="bio"
                        name="bio"
                        rows={3}
                        value={formData.bio}
                        onChange={handleChange}
                        placeholder=" "
                        className="peer w-full rounded-md border bg-white px-3 pt-5 pb-3 text-sm 
              text-[var(--text-primary)] focus:border-[#005cbb] focus:ring-2 
              focus:ring-[#005cbb] outline-none transition-all resize-none"
                    />
                    <label
                        htmlFor="bio"
                        className={`absolute left-3 px-[4px] bg-[var(--background)] transition-all duration-200
              ${formData.bio
                                ? "-top-2 text-xs text-blue-600"
                                : "top-3.5 text-[var(--text-secondary)]"
                            }
              peer-focus:-top-2 peer-focus:text-xs peer-focus:text-blue-600`}
                    >
                        Bio
                    </label>
                </div>



                {/* Terms */}
                <div className="md:col-span-2 flex items-center gap-2">
                    <input
                        type="checkbox"
                        id="agreed"
                        name="agreed"
                        checked={formData.agreed}
                        onChange={handleChange}
                        className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500 border-gray-300"
                    />
                    <label htmlFor="agreed" className="text-sm">
                        I agree to the{" "}
                        <a href="#" className=" underline-none">
                            terms and conditions
                        </a>
                    </label>
                </div>
            </div>
        </>
    );
}