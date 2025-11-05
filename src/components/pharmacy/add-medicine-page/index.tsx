"use client";

import { useState } from "react";
import { useActionState } from "react";
import { Home } from "lucide-react";
import Link from "next/link";

async function addMedicine(prevState: any, formData: FormData) {
  console.log("Form Data:", Object.fromEntries(formData));

  await new Promise((resolve) => setTimeout(resolve, 1000));

  return {
    success: true,
    message: "Medicine added successfully!",
    errors: {},
  };
}

export default function AddMedicinePage() {
  const [state, formAction, isPending] = useActionState(addMedicine, null);

  // Medicine form fields
  const [formData, setFormData] = useState({
    no: "",
    medicineName: "",
    categoty: "",
    CompanyName: "",
    PpurchaseDate: "",
    price: "",
    expiredDate: "",
    stock: "",
  });

  const [focusedFields, setFocusedFields] = useState<Set<string>>(new Set());

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFocus = (fieldName: string) => {
    setFocusedFields((prev) => new Set(prev).add(fieldName));
  };

  const handleBlur = (fieldName: string) => {
    setFocusedFields((prev) => {
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
      <div className="flex items-center flex-wrap space-x-2 px-4 sm:px-6 lg:px-8 pt-3">
        <h1 className="text-lg font-semibold">Add Medicine</h1>
        <span>›</span>
        <Link href="/">
          <Home size={18} />
        </Link>
        <span>›</span>
        <span>Pharmacy</span>
        <span>›</span>
        <span>Add Medicine</span>
      </div>

      <div className="min-h-screen px-4 sm:px-6 lg:px-8 py-3">
        <div className="bg-white rounded-xl shadow-lg border border-gray-200">
          <h1 className="text-[20px] font-bold mb-6 py-2 px-4">Add Medicine</h1>

          <form
            action={formAction}
            className="w-full flex flex-col gap-4 md:gap-0 px-10 py-5"
          >
            {/* Medicine No */}
            <div className="relative mb-6">
              <input
                type="number"
                id="no"
                name="no"
                required
                value={formData.no}
                onChange={handleInputChange}
                onFocus={() => handleFocus("no")}
                onBlur={() => handleBlur("no")}
                className="peer w-full px-4 pr-12 pt-6 pb-2 border border-gray-300 rounded-lg outline-none focus:border-blue-500 transition-all placeholder-transparent"
                placeholder="Medicine No"
              />
              <label
                htmlFor="no"
                className={`absolute left-4 transition-all duration-200 bg-white px-1
                ${shouldLabelFloat("no")
                    ? "-top-2 text-xs text-blue-600"
                    : "top-4 text-base text-gray-600"
                  }`}
              >
                Medicine No<span className="text-red-500">*</span>
              </label>
            </div>

            {/* Medicine Name */}
            <div className="relative mb-6">
              <input
                type="text"
                id="medicineName"
                name="medicineName"
                required
                value={formData.medicineName}
                onChange={handleInputChange}
                onFocus={() => handleFocus("medicineName")}
                onBlur={() => handleBlur("medicineName")}
                className="peer w-full px-4 pt-6 pb-2 border border-gray-300 rounded-lg outline-none focus:border-blue-500 transition-all placeholder-transparent"
                placeholder="Medicine Name"
              />
              <label
                htmlFor="medicineName"
                className={`absolute left-4 transition-all duration-200 bg-white px-1
                ${shouldLabelFloat("medicineName")
                    ? "-top-2 text-xs text-blue-600"
                    : "top-4 text-base text-gray-600"
                  }`}
              >
                Medicine Name<span className="text-red-500">*</span>
              </label>
            </div>

            {/* Category */}
            <div className="relative mb-6">
              <input
                type="text"
                id="categoty"
                name="categoty"
                required
                value={formData.categoty}
                onChange={handleInputChange}
                onFocus={() => handleFocus("categoty")}
                onBlur={() => handleBlur("categoty")}
                className="peer w-full px-4 pt-6 pb-2 border border-gray-300 rounded-lg outline-none focus:border-blue-500 transition-all placeholder-transparent"
                placeholder="Category"
              />
              <label
                htmlFor="categoty"
                className={`absolute left-4 transition-all duration-200 bg-white px-1
                ${shouldLabelFloat("categoty")
                    ? "-top-2 text-xs text-blue-600"
                    : "top-4 text-base text-gray-600"
                  }`}
              >
                Category<span className="text-red-500">*</span>
              </label>
            </div>

            {/* Company Name */}
            <div className="relative mb-6">
              <input
                type="text"
                id="CompanyName"
                name="CompanyName"
                required
                value={formData.CompanyName}
                onChange={handleInputChange}
                onFocus={() => handleFocus("CompanyName")}
                onBlur={() => handleBlur("CompanyName")}
                className="peer w-full px-4 pt-6 pb-2 border border-gray-300 rounded-lg outline-none focus:border-blue-500 transition-all placeholder-transparent"
                placeholder="Company Name"
              />
              <label
                htmlFor="CompanyName"
                className={`absolute left-4 transition-all duration-200 bg-white px-1
                ${shouldLabelFloat("CompanyName")
                    ? "-top-2 text-xs text-blue-600"
                    : "top-4 text-base text-gray-600"
                  }`}
              >
                Company Name<span className="text-red-500">*</span>
              </label>
            </div>

            {/* Purchase Date */}
            <div className="relative mb-6">
              <input
                type="date"
                id="PpurchaseDate"
                name="PpurchaseDate"
                required
                value={formData.PpurchaseDate}
                onChange={handleInputChange}
                onFocus={() => handleFocus("PpurchaseDate")}
                onBlur={() => handleBlur("PpurchaseDate")}
                className="peer w-full px-4 pt-6 pb-2 border border-gray-300 rounded-lg outline-none focus:border-blue-500 transition-all text-gray-700"
              />
              <label
                htmlFor="PpurchaseDate"
                className={`absolute left-4 transition-all duration-200 bg-white px-1
                ${shouldLabelFloat("PpurchaseDate")
                    ? "-top-2 text-xs text-blue-600"
                    : "top-4 text-base text-gray-600"
                  }`}
              >
                Purchase Date<span className="text-red-500">*</span>
              </label>
            </div>

            {/* Price */}
            <div className="relative mb-6">
              <input
                type="number"
                id="price"
                name="price"
                required
                value={formData.price}
                onChange={handleInputChange}
                onFocus={() => handleFocus("price")}
                onBlur={() => handleBlur("price")}
                className="peer w-full px-4 pt-6 pb-2 border border-gray-300 rounded-lg outline-none focus:border-blue-500 transition-all placeholder-transparent"
                placeholder="Price"
              />
              <label
                htmlFor="price"
                className={`absolute left-4 transition-all duration-200 bg-white px-1
                ${shouldLabelFloat("price")
                    ? "-top-2 text-xs text-blue-600"
                    : "top-4 text-base text-gray-600"
                  }`}
              >
                Price<span className="text-red-500">*</span>
              </label>
            </div>

            {/* Expired Date */}
            <div className="relative mb-6">
              <input
                type="date"
                id="expiredDate"
                name="expiredDate"
                required
                value={formData.expiredDate}
                onChange={handleInputChange}
                onFocus={() => handleFocus("expiredDate")}
                onBlur={() => handleBlur("expiredDate")}
                className="peer w-full px-4 pt-6 pb-2 border border-gray-300 rounded-lg outline-none focus:border-blue-500 transition-all text-gray-700"
              />
              <label
                htmlFor="expiredDate"
                className={`absolute left-4 transition-all duration-200 bg-white px-1
                ${shouldLabelFloat("expiredDate")
                    ? "-top-2 text-xs text-blue-600"
                    : "top-4 text-base text-gray-600"
                  }`}
              >
                Expired Date<span className="text-red-500">*</span>
              </label>
            </div>

            {/* Stock */}
            <div className="relative mb-8">
              <input
                type="number"
                id="stock"
                name="stock"
                required
                value={formData.stock}
                onChange={handleInputChange}
                onFocus={() => handleFocus("stock")}
                onBlur={() => handleBlur("stock")}
                className="peer w-full px-4 pt-6 pb-2 border border-gray-300 rounded-lg outline-none focus:border-blue-500 transition-all placeholder-transparent"
                placeholder="Stock"
              />
              <label
                htmlFor="stock"
                className={`absolute left-4 transition-all duration-200 bg-white px-1
                ${shouldLabelFloat("stock")
                    ? "-top-2 text-xs text-blue-600"
                    : "top-4 text-base text-gray-600"
                  }`}
              >
                Stock<span className="text-red-500">*</span>
              </label>
            </div>

            {/* Success / Error Message */}
            {state?.message && (
              <div
                className={`p-4 rounded-lg mb-4 ${state.success
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
                  }`}
              >
                {state.message}
              </div>
            )}

            {/* Buttons */}
            <div className="flex space-x-3">
              <button
                type="submit"
                disabled={isPending}
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-5 rounded-full shadow transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isPending ? "Adding..." : "Submit"}
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
  );
}
