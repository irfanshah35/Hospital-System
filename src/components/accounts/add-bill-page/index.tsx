"use client";

import { useState } from "react";
import { useActionState } from "react";
import { ChevronDown, Home, } from "lucide-react";
import Link from "next/link";

async function addBill(prevState: any, formData: FormData) {
    console.log("Form Data:", Object.fromEntries(formData));

    await new Promise(resolve => setTimeout(resolve, 1000));

    return {
        success: true,
        message: "Bill added successfully!",
        errors: {}
    };
}

export default function AddBillPage() {
    const [state, formAction, isPending] = useActionState(addBill, null);

    // State for form fields
    const [formData, setFormData] = useState({
        billNo: "",
        admissionID: "",
        patientName: "",
        doctorName: "",
        admitDate: "",
        dischargeDate: "",
        discount: "",
        totalAmount: "",
        paymentMethod: "",
        paymentStatus: ""
    });

    // State for focused fields
    const [focusedFields, setFocusedFields] = useState<Set<string>>(new Set());

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
    ) => {
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
            {/* Breadcrumb */}
            <div className="flex items-center space-x-2 px-4 sm:px-6 lg:px-8 pt-4">
                <h1 className="text-lg font-semibold">Add Bill</h1>
                <span className="">›</span>
                <Link href="/">
                    <Home size={18} className="" />
                </Link>
                <span className="">›</span>
                <span className="">Billing</span>
                <span className="">›</span>
                <span className="">Add Bill</span>
            </div>

            <div className="min-h-screen px-4 sm:px-6 lg:px-8 py-4">
                <div className="bg-white rounded-xl shadow-lg border border-gray-200">
                    <div className="px-4 py-2">
                        <h1 className="text-[17px] font-medium text-[#5b626b]">
                            Add Bill
                        </h1>
                    </div>

                    <div className="py-6 px-10 mt-3">
                        <form action={formAction} className="w-full">
                            <div className="grid grid-cols-1 gap-10">
                                {/* Bill No */}
                                <div className="relative mb-4">
                                    <input
                                        type="text"
                                        id="billNo"
                                        name="billNo"
                                        required
                                        value={formData.billNo}
                                        onChange={handleInputChange}
                                        onFocus={() => handleFocus('billNo')}
                                        onBlur={() => handleBlur('billNo')}
                                        className="peer w-full px-4 pt-6 pb-2 border-2 border-gray-300 rounded-lg outline-none focus:border-[#005cbb] transition-all placeholder-transparent"
                                        placeholder="Bill No"
                                    />
                                    <label
                                        htmlFor="billNo"
                                        className={`absolute left-4 transition-all duration-200 bg-white px-1
                                            ${shouldLabelFloat('billNo') ? '-top-2 text-xs text-blue-600' : 'top-4 text-base text-gray-600'}`}
                                    >
                                        Bill No<span className="text-red-500">*</span>
                                    </label>
                                </div>

                                {/* Admission ID */}
                                <div className="relative mb-4">
                                    <input
                                        type="text"
                                        id="admissionID"
                                        name="admissionID"
                                        required
                                        value={formData.admissionID}
                                        onChange={handleInputChange}
                                        onFocus={() => handleFocus('admissionID')}
                                        onBlur={() => handleBlur('admissionID')}
                                        className="peer w-full px-4 pt-6 pb-2 border-2 border-gray-300 rounded-lg outline-none focus:border-[#005cbb] transition-all placeholder-transparent"
                                        placeholder="Admission ID"
                                    />
                                    <label
                                        htmlFor="admissionID"
                                        className={`absolute left-4 transition-all duration-200 bg-white px-1
                                            ${shouldLabelFloat('admissionID') ? '-top-2 text-xs text-blue-600' : 'top-4 text-base text-gray-600'}`}
                                    >
                                        Admission ID<span className="text-red-500">*</span>
                                    </label>
                                </div>

                                {/* Patient Name */}
                                <div className="relative mb-4">
                                    <input
                                        type="text"
                                        id="patientName"
                                        name="patientName"
                                        required
                                        value={formData.patientName}
                                        onChange={handleInputChange}
                                        onFocus={() => handleFocus('patientName')}
                                        onBlur={() => handleBlur('patientName')}
                                        className="peer w-full px-4 pt-6 pb-2 border-2 border-gray-300 rounded-lg outline-none focus:border-[#005cbb] transition-all placeholder-transparent"
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

                                {/* Doctor Name */}
                                <div className="relative mb-4">
                                    <select
                                        id="doctorName"
                                        name="doctorName"
                                        required
                                        value={formData.doctorName}
                                        onChange={handleInputChange}
                                        onFocus={() => handleFocus('doctorName')}
                                        onBlur={() => handleBlur('doctorName')}
                                        className="peer w-full px-4 pt-6 pb-2 border-2 border-gray-300 rounded-lg outline-none focus:border-[#005cbb] transition-all bg-white text-gray-800 appearance-none"
                                    >
                                        <option value="" disabled hidden></option>
                                        <option value="Dr. Smith">Dr. Smith</option>
                                        <option value="Dr. Johnson">Dr. Johnson</option>
                                        <option value="Dr. Williams">Dr. Williams</option>
                                        <option value="Dr. Brown">Dr. Brown</option>
                                        <option value="Dr. Davis">Dr. Davis</option>
                                    </select>
                                    <label
                                        htmlFor="doctorName"
                                        className={`absolute left-4 transition-all duration-200 bg-white px-1
                                            ${shouldLabelFloat('doctorName') ? '-top-2 text-xs text-blue-600' : 'top-4 text-base text-gray-600'}`}
                                    >
                                        Doctor Name<span className="text-red-500">*</span>
                                    </label>
                                    <span className="absolute top-4 right-4">
                                        <ChevronDown className="w-5 h-5"/>
                                    </span>
                                </div>

                                {/* Admit Date */}
                                <div className="relative mb-4">
                                    <div className="relative">
                                        <input
                                            type="date"
                                            id="admitDate"
                                            name="admitDate"
                                            required
                                            value={formData.admitDate}
                                            onChange={handleInputChange}
                                            onFocus={() => handleFocus('admitDate')}
                                            onBlur={() => handleBlur('admitDate')}
                                            className="peer w-full px-4 pt-6 pb-3 border-2 border-gray-300 rounded-lg outline-none focus:border-[#005cbb] transition-all placeholder-transparent text-gray-700 pr-2"
                                            placeholder="Admit Date"
                                        />
                                        <label
                                            htmlFor="admitDate"
                                            className={`absolute left-4 py-1 transition-all duration-200 bg-white px-1
                                                ${shouldLabelFloat('admitDate') ? '-top-2 text-xs text-blue-600' : 'top-4 text-base text-gray-600'}`}
                                        >
                                            Admit Date<span className="text-red-500">*</span>
                                        </label>
                                        
                                    </div>
                                </div>

                                {/* Discharge Date */}
                                <div className="relative mb-4">
                                    <div className="relative">
                                        <input
                                            type="date"
                                            id="dischargeDate"
                                            name="dischargeDate"
                                            required
                                            value={formData.dischargeDate}
                                            onChange={handleInputChange}
                                            onFocus={() => handleFocus('dischargeDate')}
                                            onBlur={() => handleBlur('dischargeDate')}
                                            className="peer w-full px-4 pt-6 pb-3 border-2 border-gray-300 rounded-lg outline-none focus:border-[#005cbb] transition-all placeholder-transparent text-gray-700 pr-3"
                                            placeholder="Discharge Date"
                                        />
                                        <label
                                            htmlFor="dischargeDate"
                                            className={`absolute left-4 py-1 transition-all duration-200 bg-white px-1
                                                ${shouldLabelFloat('dischargeDate') ? '-top-2 text-xs text-blue-600' : 'top-4 text-base text-gray-600'}`}
                                        >
                                            Discharge Date<span className="text-red-500">*</span>
                                        </label>
                                    </div>
                                </div>

                                {/* Discount */}
                                <div className="relative mb-4">
                                    <input
                                        type="number"
                                        id="discount"
                                        name="discount"
                                        value={formData.discount}
                                        onChange={handleInputChange}
                                        onFocus={() => handleFocus('discount')}
                                        onBlur={() => handleBlur('discount')}
                                        className="peer w-full px-4 pt-6 pb-2 border-2 border-gray-300 rounded-lg outline-none focus:border-[#005cbb] transition-all placeholder-transparent"
                                        placeholder="Discount"
                                    />
                                    <label
                                        htmlFor="discount"
                                        className={`absolute left-4 transition-all duration-200 bg-white px-1
                                            ${shouldLabelFloat('discount') ? '-top-2 text-xs text-blue-600' : 'top-4 text-base text-gray-600'}`}
                                    >
                                        Discount
                                    </label>
                                </div>

                                {/* Total Amount */}
                                <div className="relative mb-4">
                                    <input
                                        type="number"
                                        id="totalAmount"
                                        name="totalAmount"
                                        value={formData.totalAmount}
                                        onChange={handleInputChange}
                                        onFocus={() => handleFocus('totalAmount')}
                                        onBlur={() => handleBlur('totalAmount')}
                                        className="peer w-full px-4 pt-6 pb-2 border-2 border-gray-300 rounded-lg outline-none focus:border-[#005cbb] transition-all placeholder-transparent"
                                        placeholder="Total Amount"
                                    />
                                    <label
                                        htmlFor="totalAmount"
                                        className={`absolute left-4 transition-all duration-200 bg-white px-1
                                            ${shouldLabelFloat('totalAmount') ? '-top-2 text-xs text-blue-600' : 'top-4 text-base text-gray-600'}`}
                                    >
                                        Total Amount
                                    </label>
                                </div>

                                {/* Payment Method */}
                                <div className="relative mb-4">
                                    <select
                                        id="paymentMethod"
                                        name="paymentMethod"
                                        required
                                        value={formData.paymentMethod}
                                        onChange={handleInputChange}
                                        onFocus={() => handleFocus('paymentMethod')}
                                        onBlur={() => handleBlur('paymentMethod')}
                                        className="peer w-full px-4 pt-6 pb-2 border-2 border-gray-300 rounded-lg outline-none focus:border-[#005cbb] transition-all bg-white text-gray-800 appearance-none"
                                    >
                                        <option value="" disabled hidden></option>
                                        <option value="Cash">Cash</option>
                                        <option value="Credit Card">Credit Card</option>
                                        <option value="Debit Card">Debit Card</option>
                                        <option value="Bank Transfer">Bank Transfer</option>
                                        <option value="Online Payment">Online Payment</option>
                                    </select>
                                    <label
                                        htmlFor="paymentMethod"
                                        className={`absolute left-4 transition-all duration-200 bg-white px-1
                                            ${shouldLabelFloat('paymentMethod') ? '-top-2 text-xs text-blue-600' : 'top-4 text-base text-gray-600'}`}
                                    >
                                        Payment Method<span className="text-red-500">*</span>
                                    </label>
                                    <span className="absolute top-4 right-4">
                                        <ChevronDown className="w-5 h-5"/>
                                    </span>
                                </div>

                                {/* Payment Status */}
                                <div className="relative mb-4">
                                    <select
                                        id="paymentStatus"
                                        name="paymentStatus"
                                        required
                                        value={formData.paymentStatus}
                                        onChange={handleInputChange}
                                        onFocus={() => handleFocus('paymentStatus')}
                                        onBlur={() => handleBlur('paymentStatus')}
                                        className="peer w-full px-4 pt-6 pb-2 border-2 border-gray-300 rounded-lg outline-none focus:border-[#005cbb] transition-all bg-white text-gray-800 appearance-none"
                                    >
                                        <option value="" disabled hidden></option>
                                        <option value="Paid">Paid</option>
                                        <option value="Pending">Pending</option>
                                        <option value="Partially Paid">Partially Paid</option>
                                        <option value="Due">Due</option>
                                    </select>
                                    <label
                                        htmlFor="paymentStatus"
                                        className={`absolute left-4 transition-all duration-200 bg-white px-1
                                            ${shouldLabelFloat('paymentStatus') ? '-top-2 text-xs text-blue-600' : 'top-4 text-base text-gray-600'}`}
                                    >
                                        Payment Status<span className="text-red-500">*</span>
                                    </label>

                                    <span className="absolute top-4 right-4">
                                        <ChevronDown className="w-5 h-5"/>
                                    </span>
                                </div>
                            </div>

                            {/* Form Status Message */}
                            {state?.message && (
                                <div className={`p-4 rounded-lg mb-4 mt-6 ${state.success ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                                    }`}>
                                    {state.message}
                                </div>
                            )}

                            <div className="flex space-x-3 mt-8">
                                <button
                                    type="submit"
                                    disabled={isPending}
                                    className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-5 rounded-full shadow transition disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isPending ? 'Submitting...' : 'Submit'}
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