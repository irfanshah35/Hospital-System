"use client";

import { useState } from "react";
import { Home } from "lucide-react";
import Link from "next/link";
import { number } from "zod";

// Define interface for form data
interface DepartmentForm {
  departmentno: number;
  departmentname: string;
  departmentdate: string;
  departmenthead: string;
  status: string;
  description: string;
}

// Base form state
const baseFormState: DepartmentForm = {
  departmentno: 1,
  departmentname: "",
  departmentdate: "",
  departmenthead: "",
  status: "",
  description: "",
};

export default function AddDepartmentPage() {
  const [formData, setFormData] = useState<DepartmentForm>({ ...baseFormState });
  const [focusedFields, setFocusedFields] = useState<Set<string>>(new Set());
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
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

  const shouldLabelFloat = (fieldName: keyof DepartmentForm) => {
    return formData[fieldName] !== "" || focusedFields.has(fieldName);
  };

  const resetForm = () => {
    setFormData({ ...baseFormState });
    setFocusedFields(new Set());
    setMessage(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage(null);

    try {
      const res = await fetch("/api/departments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to add department");

      setMessage({ type: "success", text: "Department added successfully!" });
      resetForm();
    } catch (error) {
      setMessage({
        type: "error",
        text: error instanceof Error ? error.message : "Failed to add department",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      {/* Breadcrumb */}
      <div className="flex items-center space-x-2 px-4 sm:px-6 lg:px-8 pt-3">
        <h1 className="text-lg font-semibold">Add Department</h1>
        <span>›</span>
        <Link href="/"><Home size={18} /></Link>
        <span>›</span>
        <span>Departments</span>
        <span>›</span>
        <span>Add Department</span>
      </div>

      <div className="min-h-screen px-4 sm:px-6 lg:px-8 py-3">
        <div className="bg-white rounded-xl shadow-lg border border-gray-200">
          <div>
            <h1 className="text-[20px] font-bold mb-6 py-2 px-4">Add Department</h1>

            <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4 px-10 py-5">
              {/* Department No */}
              <div className="relative mb-6">
                <input
                  type="text"
                  id="departmentno"
                  name="departmentno"
                  required
                  value={formData.departmentno}
                  onChange={handleInputChange}
                  onFocus={() => handleFocus("departmentno")}
                  onBlur={() => handleBlur("departmentno")}
                  className="peer w-full px-4 pt-6 pb-2 border border-gray-300 rounded-lg outline-none focus:border-blue-500 transition-all placeholder-transparent"
                  placeholder="Department No"
                />
                <label
                  htmlFor="departmentno"
                  className={`absolute left-4 transition-all duration-200 bg-white px-1 ${shouldLabelFloat("departmentno")
                      ? "-top-2 text-xs text-blue-600"
                      : "top-4 text-base text-gray-600"
                    }`}
                >
                  Department No<span className="text-red-500">*</span>
                </label>
              </div>

              {/* Department Name */}
              <div className="relative mb-6">
                <input
                  type="text"
                  id="departmentname"
                  name="departmentname"
                  required
                  value={formData.departmentname}
                  onChange={handleInputChange}
                  onFocus={() => handleFocus("departmentname")}
                  onBlur={() => handleBlur("departmentname")}
                  className="peer w-full px-4 pt-6 pb-2 border border-gray-300 rounded-lg outline-none focus:border-blue-500 transition-all placeholder-transparent"
                  placeholder="Department Name"
                />
                <label
                  htmlFor="departmentname"
                  className={`absolute left-4 transition-all duration-200 bg-white px-1 ${shouldLabelFloat("departmentname")
                      ? "-top-2 text-xs text-blue-600"
                      : "top-4 text-base text-gray-600"
                    }`}
                >
                  Department Name<span className="text-red-500">*</span>
                </label>
              </div>

              {/* Department Date */}
              <div className="relative mb-6">
                <input
                  type="date"
                  id="departmentdate"
                  name="departmentdate"
                  required
                  value={formData.departmentdate}
                  onChange={handleInputChange}
                  onFocus={() => handleFocus("departmentdate")}
                  onBlur={() => handleBlur("departmentdate")}
                  className="peer w-full px-4 pt-6 pb-2 border border-gray-300 rounded-lg outline-none focus:border-blue-500 transition-all placeholder-transparent text-gray-700"
                  placeholder="Department Date"
                />
                <label
                  htmlFor="departmentdate"
                  className={`absolute left-4 py-1 transition-all duration-200 bg-white px-1 ${shouldLabelFloat("departmentdate")
                      ? "-top-2 text-xs text-blue-600"
                      : "top-4 text-base text-gray-600"
                    }`}
                >
                  Department Date<span className="text-red-500">*</span>
                </label>
              </div>

              {/* Department Head */}
              <div className="relative mb-8">
                <input
                  type="text"
                  id="departmenthead"
                  name="departmenthead"
                  required
                  value={formData.departmenthead}
                  onChange={handleInputChange}
                  onFocus={() => handleFocus("departmenthead")}
                  onBlur={() => handleBlur("departmenthead")}
                  className="peer w-full px-4 pt-6 pb-2 border border-gray-300 rounded-lg outline-none focus:border-blue-500 transition-all placeholder-transparent"
                  placeholder="Department Head"
                />
                <label
                  htmlFor="departmenthead"
                  className={`absolute left-4 transition-all duration-200 bg-white px-1 ${shouldLabelFloat("departmenthead")
                      ? "-top-2 text-xs text-blue-600"
                      : "top-4 text-base text-gray-600"
                    }`}
                >
                  Department Head<span className="text-red-500">*</span>
                </label>
              </div>

              {/* Status */}
              <div className="relative mb-8">
                <select
                  id="status"
                  name="status"
                  required
                  value={formData.status}
                  onChange={handleInputChange}
                  onFocus={() => handleFocus("status")}
                  onBlur={() => handleBlur("status")}
                  className="peer w-full px-4 pt-6 pb-2 border border-gray-300 rounded-lg outline-none focus:border-blue-500 transition-all bg-white text-gray-800 appearance-none"
                >
                  <option value="" disabled hidden></option>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                  <option value="Pending">Pending</option>
                </select>
                <label
                  htmlFor="status"
                  className={`absolute left-4 transition-all duration-200 bg-white px-1 ${shouldLabelFloat("status")
                      ? "-top-2 text-xs text-blue-600"
                      : "top-4 text-base text-gray-500"
                    }`}
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
                  value={formData.description}
                  onChange={handleInputChange}
                  onFocus={() => handleFocus("description")}
                  onBlur={() => handleBlur("description")}
                  placeholder="Description"
                  rows={3}
                  className="peer w-full px-4 pt-6 pb-2 border border-gray-300 rounded-lg outline-none focus:border-blue-500 transition-all placeholder-transparent resize-none"
                />
                <label
                  htmlFor="description"
                  className={`absolute left-4 transition-all duration-200 bg-white px-1 ${shouldLabelFloat("description")
                      ? "-top-2 text-xs text-blue-600"
                      : "top-4 text-base text-gray-600"
                    }`}
                >
                  Description <span className="text-red-500">*</span>
                </label>
              </div>

              {/* Message */}
              {message && (
                <div
                  className={`p-4 rounded-lg mb-4 ${message.type === "success"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                    }`}
                >
                  {message.text}
                </div>
              )}

              {/* Buttons */}
              <div className="flex space-x-3">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-5 rounded-full shadow transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Adding..." : "Submit"}
                </button>
                <button
                  type="button"
                  className="bg-[#ba1a1a] text-white font-medium py-2 px-5 rounded-full transition hover:bg-red-700"
                  onClick={resetForm}
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
