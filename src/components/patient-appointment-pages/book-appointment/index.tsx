'use client';

import { useActionState, useState } from 'react';
import { Home, Calendar, Upload, Check } from 'lucide-react';
import Link from 'next/link';

interface FormState {
    errors?: {
        first?: string[];
        last?: string[];
        gender?: string[];
        mobile?: string[];
        email?: string[];
        dob?: string[];
        doctor?: string[];
        doa?: string[];
        timeSlot?: string[];
        injury?: string[];
        note?: string[];
        uploadFile?: string[];
    };
    success?: boolean;
    message?: string;
}
// ✅ Fix: initialize with a non-optional structure
const initialState: FormState = {
    errors: {},
    success: false,
    message: '',
};

export default function BookAppointment() {
    const [state, formAction, isPending] = useActionState(
        async (prevState: FormState, formData: FormData): Promise<FormState> => {
            await new Promise(resolve => setTimeout(resolve, 1000));

            const first = formData.get('first') as string;
            const email = formData.get('email') as string;

            if (!first) {
                return { ...prevState, success: false, errors: { first: ['First name is required'] } };
            }

            if (!email) {
                return { ...prevState, success: false, errors: { email: ['Email is required'] } };
            }

            return { success: true, message: 'Appointment booked successfully!', errors: {} };
        },
        initialState
    );

    const timeSlots = [
        '10:30-11:00', '11:00-11:30', '11:30-12:00',
        '12:00-12:30', '12:30-01:00', '03:30-04:00',
        '04:00-04:30', '04:30-05:00', '05:00-05:30', '05:30-06:00'
    ];

    const doctors = [
        'Dr. Sarah Wilson',
        'Dr. Michael Brown',
        'Dr. James Miller',
        'Dr. Emily Chen',
        'Dr. Robert Taylor'
    ];
    const [selected, setSelected] = useState("11:00-11:30");
    const disabledSlots = ["11:30-12:00"];

    return (
        <div className="min-h-screen">
            {/* Breadcrumb */}
            <div className="flex items-center flex-wrap space-x-2 px-4 sm:px-6 lg:px-8 pt-3">
                <h1 className="text-lg font-semibold">Book Appointment</h1>
                <span>›</span>
                <Link href="/">
                    <Home size={18} />
                </Link>
                <span>›</span>
                <span>Appointments</span>
                <span>›</span>
                <span>Book Appointment</span>
            </div>

            {/* Main Form */}
            <div className="container mx-auto px-6 py-8">
                <div className="bg-white rounded-lg border border-gray-200">
                    <div className=" px-4 py-2">
                        <h2 className="text-xl font-semibold text-gray-800">Book Appointment</h2>
                    </div>

                    <form action={formAction} className="p-6">
                        {/* Personal Information */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            {/* First Name */}
                            <div className="relative">
                                <input
                                    type="text"
                                    name="first"
                                    required
                                    className="peer w-full px-4 pt-6 pb-2 border border-gray-300 rounded-lg outline-none focus:border-blue-500 transition-all placeholder-transparent"
                                    placeholder="First name"
                                />
                                <label
                                    className="absolute left-4 transition-all duration-200 bg-white px-1
                  peer-focus:-top-2 peer-focus:text-xs peer-focus:text-blue-600
                  peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-600
                  -top-2 text-xs text-blue-600"
                                >
                                    First name<span className="text-red-500">*</span>
                                </label>
                                {state.errors?.first && (
                                    <p className="text-red-500 text-xs mt-1">{state.errors.first[0]}</p>
                                )}
                            </div>

                            {/* Last Name */}
                            <div className="relative">
                                <input
                                    type="text"
                                    name="last"
                                    className="peer w-full px-4 pt-6 pb-2 border border-gray-300 rounded-lg outline-none focus:border-blue-500 transition-all placeholder-transparent"
                                    placeholder="Last name"
                                />
                                <label
                                    className="absolute left-4 transition-all duration-200 bg-white px-1
                  peer-focus:-top-2 peer-focus:text-xs peer-focus:text-blue-600
                  peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-600
                  -top-2 text-xs text-blue-600"
                                >
                                    Last name
                                </label>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            {/* Gender */}
                            <div className="relative">
                                <select
                                    name="gender"
                                    required
                                    className="peer w-full px-4 pt-6 pb-2 border border-gray-300 rounded-lg outline-none focus:border-blue-500 transition-all appearance-none bg-white"
                                >
                                    <option value=""></option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                    <option value="other">Other</option>
                                </select>
                                <label
                                    className="absolute left-4 transition-all duration-200 bg-white px-1
                  peer-focus:-top-2 peer-focus:text-xs peer-focus:text-blue-600
                  peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-600
                  -top-2 text-xs text-blue-600"
                                >
                                    Gender<span className="text-red-500">*</span>
                                </label>
                                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </div>
                            </div>

                            {/* Mobile */}
                            <div className="relative">
                                <input
                                    type="tel"
                                    name="mobile"
                                    required
                                    className="peer w-full px-4 pt-6 pb-2 border border-gray-300 rounded-lg outline-none focus:border-blue-500 transition-all placeholder-transparent"
                                    placeholder="Mobile"
                                />
                                <label
                                    className="absolute left-4 transition-all duration-200 bg-white px-1
                  peer-focus:-top-2 peer-focus:text-xs peer-focus:text-blue-600
                  peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-600
                  -top-2 text-xs text-blue-600"
                                >
                                    Mobile<span className="text-red-500">*</span>
                                </label>
                            </div>
                        </div>

                        {/* Address */}
                        <div className="relative mb-6">
                            <textarea
                                name="address"
                                rows={3}
                                className="peer w-full px-4 pt-6 pb-2 border border-gray-300 rounded-lg outline-none focus:border-blue-500 transition-all placeholder-transparent resize-none"
                                placeholder="Address"
                            />
                            <label
                                className="absolute left-4 transition-all duration-200 bg-white px-1
                  peer-focus:-top-2 peer-focus:text-xs peer-focus:text-blue-600
                  peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-600
                  -top-2 text-xs text-blue-600"
                            >
                                Address
                            </label>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            {/* Email */}
                            <div className="relative">
                                <input
                                    type="email"
                                    name="email"
                                    required
                                    className="peer w-full px-4 pt-6 pb-2 border border-gray-300 rounded-lg outline-none focus:border-blue-500 transition-all placeholder-transparent"
                                    placeholder="Email"
                                />
                                <label
                                    className="absolute left-4 transition-all duration-200 bg-white px-1
                  peer-focus:-top-2 peer-focus:text-xs peer-focus:text-blue-600
                  peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-600
                  -top-2 text-xs text-blue-600"
                                >
                                    Email<span className="text-red-500">*</span>
                                </label>
                                {state.errors?.email && (
                                    <p className="text-red-500 text-xs mt-1">{state.errors.email[0]}</p>
                                )}
                            </div>

                            {/* Date of Birth */}
                            <div className="relative">
                                <input
                                    type="date"
                                    name="dob"
                                    required
                                    className="peer w-full px-4 pt-6 pb-2 border border-gray-300 rounded-lg outline-none focus:border-blue-500 transition-all"
                                />
                                <label
                                    className="absolute left-4 transition-all duration-200 bg-white px-1
                  peer-focus:-top-2 peer-focus:text-xs peer-focus:text-blue-600
                  peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-600
                  -top-2 text-xs text-blue-600"
                                >
                                    Date Of Birth<span className="text-red-500">*</span>
                                </label>
                            </div>
                        </div>

                        {/* Divider */}
                        <div className="border-t border-gray-200 my-8"></div>

                        {/* Appointment Details */}
                        <div className="mb-6">
                            <h3 className="text-lg font-semibold text-gray-800 mb-6">Appointment Details</h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                {/* Consulting Doctor */}
                                <div className="relative">
                                    <select
                                        name="doctor"
                                        required
                                        className="peer w-full px-4 pt-6 pb-2 border border-gray-300 rounded-lg outline-none focus:border-blue-500 transition-all appearance-none bg-white"
                                    >
                                        <option value=""></option>
                                        {doctors.map((doctor, index) => (
                                            <option key={index} value={doctor}>{doctor}</option>
                                        ))}
                                    </select>
                                    <label
                                        className="absolute left-4 transition-all duration-200 bg-white px-1
                  peer-focus:-top-2 peer-focus:text-xs peer-focus:text-blue-600
                  peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-600
                  -top-2 text-xs text-blue-600"
                                    >
                                        Consulting Doctor<span className="text-red-500">*</span>
                                    </label>
                                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </div>
                                </div>

                                {/* Date of Appointment */}
                                <div className="relative">
                                    <input
                                        type="date"
                                        name="doa"
                                        required
                                        className="peer w-full px-4 pt-6 pb-2 border border-gray-300 rounded-lg outline-none focus:border-blue-500 transition-all"
                                    />
                                    <label
                                        className="absolute left-4 transition-all duration-200 bg-white px-1
                  peer-focus:-top-2 peer-focus:text-xs peer-focus:text-blue-600
                  peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-600
                  -top-2 text-xs text-blue-600"
                                    >
                                        Date Of Appointment<span className="text-red-500">*</span>
                                    </label>
                                </div>
                            </div>

                            {/* Time Slots */}
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 mb-3">
                                    Time Of Appointment:
                                </label>

                                <div className="flex overflow-x-auto pb-2 scrollbar-hide">
                                    <div className="flex bg-gray-50 border border-gray-200 rounded-full overflow-auto scrollbar-hide">
                                        {timeSlots.map((slot, index) => {
                                            const isDisabled = disabledSlots.includes(slot);
                                            const isSelected = selected === slot;

                                            return (
                                                <button
                                                    type='button'
                                                    key={slot}
                                                    disabled={isDisabled}
                                                    onClick={() => !isDisabled && setSelected(slot)}
                                                    className={`relative flex items-center justify-center px-5 py-2 text-sm border-r font-medium transition-all whitespace-nowrap duration-300 cursor-pointer 
                  ${isDisabled
                                                            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                                                            : isSelected
                                                                ? "bg-[#dae2f9] px-7 hover:bg-[#EDEDED]"
                                                                : "text-gray-700 hover:bg-[#EDEDED]"
                                                        } 
                  ${index === 0 ? "rounded-l-full" : ""}
                  ${index === timeSlots.length - 1 ? "rounded-r-full" : ""}
                `}
                                                >
                                                    {isSelected && (
                                                        <Check className="absolute left-2 w-5 h-5  transition-all duration-300" />
                                                    )}
                                                    <span className="pl-3">{slot}</span>
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>


                            {/* Injury/Condition */}
                            <div className="relative mb-6">
                                <textarea
                                    name="injury"
                                    rows={3}
                                    className="peer w-full px-4 pt-6 pb-2 border border-gray-300 rounded-lg outline-none focus:border-blue-500 transition-all placeholder-transparent resize-none"
                                    placeholder="Injury/Condition"
                                />
                                <label
                                    className="absolute left-4 transition-all duration-200 bg-white px-1
                  peer-focus:-top-2 peer-focus:text-xs peer-focus:text-blue-600
                  peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-600
                  -top-2 text-xs text-blue-600"
                                >
                                    Injury/Condition
                                </label>
                            </div>

                            {/* Note */}
                            <div className="relative mb-6">
                                <textarea
                                    name="note"
                                    rows={3}
                                    className="peer w-full px-4 pt-6 pb-2 border border-gray-300 rounded-lg outline-none focus:border-blue-500 transition-all placeholder-transparent resize-none"
                                    placeholder="Note"
                                />
                                <label
                                    className="absolute left-4 transition-all duration-200 bg-white px-1
                  peer-focus:-top-2 peer-focus:text-xs peer-focus:text-blue-600
                  peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-600
                  -top-2 text-xs text-blue-600"
                                >
                                    Note
                                </label>
                            </div>

                            {/* File Upload */}
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 mb-3">Upload Reports</label>
                                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                                    <input
                                        type="file"
                                        name="uploadFile"
                                        className="hidden"
                                        id="file-upload"
                                    />
                                    <label htmlFor="file-upload" className="cursor-pointer flex gap-2">
                                        <button
                                            type="button"
                                            className="shadow text-gray-700 px-4 py-2 rounded-full hover:bg-gray-200 transition-colors"
                                        >
                                            Choose file
                                        </button>
                                        <p className="text-gray-500 mt-2 text-sm">or drag and drop file here</p>
                                    </label>
                                </div>
                            </div>
                        </div>

                        {/* Success Message */}
                        {state.success && (
                            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                                <p className="text-green-800">{state.message}</p>
                            </div>
                        )}

                        {/* Submit Buttons */}
                        <div className="flex space-x-3">
                            <button
                                type="submit"
                                disabled={isPending}
                                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isPending ? 'Submitting...' : 'Submit'}
                            </button>
                            <button
                                type="button"
                                className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition-colors"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}