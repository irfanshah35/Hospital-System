"use client";

import { useState } from "react";
import { useActionState } from "react";
import { Home } from "lucide-react";
import Link from "next/link";

async function addDepartment(prevState: any, formData: FormData) {
    console.log("Form Data:", Object.fromEntries(formData));

    await new Promise(resolve => setTimeout(resolve, 1000));

    return {
        success: true,
        message: "Department added successfully!",
        errors: {}
    };
}

export default function AddDepartmentPage() {
    const [state, formAction, isPending] = useActionState(addDepartment, null);

    // State for form fields
    const [formData, setFormData] = useState({
        departmentNo: "",
        departmentName: "",
        departmentDate: "",
        departmentHead: "",
        status: "",
        description: "",
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
            <div className="flex items-center space-x-2 px-4 sm:px-6 lg:px-8 pt-3">
                <h1 className="text-lg font-semibold">Add Department</h1>
                <span className="">›</span>
                <Link href="/">
                    <Home size={18} className="" />
                </Link>
                <span className="">›</span>
                <span className="">Departments</span>
                <span className="">›</span>
                <span className="">Add Department</span>
            </div>

            <div className="min-h-screen px-4 sm:px-6 lg:px-8 py-3">
                <div className="bg-white rounded-xl shadow-lg border border-gray-200">
                    <div className="">
                        <h1 className="text-[20px] font-bold mb-6 py-2 px-4">
                            Add Department
                        </h1>

                        <form action={formAction} className="w-full flex flex-col gap-4 px-10 py-5">
                            {/* Department No */}
                            <div className="relative mb-6">
                                <input
                                    type="text"
                                    id="departmentNo"
                                    name="departmentNo"
                                    required
                                    value={formData.departmentNo}
                                    onChange={handleInputChange}
                                    onFocus={() => handleFocus('departmentNo')}
                                    onBlur={() => handleBlur('departmentNo')}
                                    className="peer w-full px-4 pt-6 pb-2 border border-gray-300 rounded-lg outline-none focus:border-blue-500 transition-all placeholder-transparent"
                                    placeholder="Department No"
                                />
                                <label
                                    htmlFor="departmentNo"
                                    className={`absolute left-4 transition-all duration-200 bg-white px-1
                    ${shouldLabelFloat('departmentNo') ? '-top-2 text-xs text-blue-600' : 'top-4 text-base text-gray-600'}`}
                                >
                                    Department No<span className="text-red-500">*</span>
                                </label>
                            </div>

                            {/* Department Name */}
                            <div className="relative mb-6">
                                <input
                                    type="text"
                                    id="departmentName"
                                    name="departmentName"
                                    required
                                    value={formData.departmentName}
                                    onChange={handleInputChange}
                                    onFocus={() => handleFocus('departmentName')}
                                    onBlur={() => handleBlur('departmentName')}
                                    className="peer w-full px-4 pt-6 pb-2 border border-gray-300 rounded-lg outline-none focus:border-blue-500 transition-all placeholder-transparent"
                                    placeholder="Department Name"
                                />
                                <label
                                    htmlFor="departmentName"
                                    className={`absolute left-4 transition-all duration-200 bg-white px-1
                    ${shouldLabelFloat('departmentName') ? '-top-2 text-xs text-blue-600' : 'top-4 text-base text-gray-600'}`}
                                >
                                    Department Name<span className="text-red-500">*</span>
                                </label>
                            </div>

                            {/* Department Date */}
                            <div className="relative mb-6">
                                <input
                                    type="date"
                                    id="departmentDate"
                                    name="departmentDate"
                                    required
                                    value={formData.departmentDate}
                                    onChange={handleInputChange}
                                    onFocus={() => handleFocus('departmentDate')}
                                    onBlur={() => handleBlur('departmentDate')}
                                    className="peer w-full px-4 pt-6 pb-2 border border-gray-300 rounded-lg outline-none focus:border-blue-500 transition-all placeholder-transparent text-gray-700"
                                    placeholder="Department Date"
                                />
                                <label
                                    htmlFor="departmentDate"
                                    className={`absolute left-4 py-1 transition-all duration-200 bg-white px-1
                    ${shouldLabelFloat('departmentDate') ? '-top-2 text-xs text-blue-600' : 'top-4 text-base text-gray-600'}`}
                                >
                                    Department Date<span className="text-red-500">*</span>
                                </label>
                            </div>

                            {/* Department Head */}
                            <div className="relative mb-8">
                                <input
                                    type="text"
                                    id="departmentHead"
                                    name="departmentHead"
                                    required
                                    value={formData.departmentHead}
                                    onChange={handleInputChange}
                                    onFocus={() => handleFocus('departmentHead')}
                                    onBlur={() => handleBlur('departmentHead')}
                                    className="peer w-full px-4 pt-6 pb-2 border border-gray-300 rounded-lg outline-none focus:border-blue-500 transition-all placeholder-transparent"
                                    placeholder="Department Head"
                                />
                                <label
                                    htmlFor="departmentHead"
                                    className={`absolute left-4 transition-all duration-200 bg-white px-1
                    ${shouldLabelFloat('departmentHead') ? '-top-2 text-xs text-blue-600' : 'top-4 text-base text-gray-600'}`}
                                >
                                    Department Head<span className="text-red-500">*</span>
                                </label>
                            </div>


                            {/* Status Field */}
                            <div className="relative mb-8">
                                <select
                                    id="status"
                                    name="status"
                                    required
                                    value={formData.status}
                                    onChange={handleInputChange}
                                    onFocus={() => handleFocus('status')}
                                    onBlur={() => handleBlur('status')}
                                    className="peer w-full px-4 pt-6 pb-2 border border-gray-300 rounded-lg outline-none focus:border-blue-500 transition-all bg-white text-gray-800 appearance-none"
                                >
                                    <option value="" disabled hidden></option>
                                    <option value="Active">Active</option>
                                    <option value="Inactive">Inactive</option>
                                    <option value="Pending">Pending</option>
                                </select>

                                <label
                                    htmlFor="status"
                                    className={`absolute left-4 transition-all duration-200 bg-white px-1
      ${shouldLabelFloat('status') ? '-top-2 text-xs text-blue-600' : 'top-4 text-base text-gray-500'}`}
                                >
                                    Status <span className="text-red-500">*</span>
                                </label>
                            </div>


                            {/* Description */}
                            <div className="relative mb-8">
                                <textarea
                                    id="description"
                                    name="description"
                                    required
                                    value={formData.description || ""}
                                    onChange={handleInputChange}
                                    onFocus={() => handleFocus("description")}
                                    onBlur={() => handleBlur("description")}
                                    placeholder="Description"
                                    rows={3}
                                    className="peer w-full px-4 pt-6 pb-2 border border-gray-300 rounded-lg outline-none 
               focus:border-blue-500 transition-all placeholder-transparent resize-none"
                                ></textarea>

                                <label
                                    htmlFor="description"
                                    className={`absolute left-4 transition-all duration-200 bg-white px-1
      ${shouldLabelFloat("description")
                                            ? "-top-2 text-xs text-blue-600"
                                            : "top-4 text-base text-gray-600"}`}
                                >
                                    Description <span className="text-red-500">*</span>
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
                                    {isPending ? 'Adding...' : 'Submit'}
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