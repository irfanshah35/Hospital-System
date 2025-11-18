'use client';

import { CirclePlus, Download, Home, RotateCw, Trash2, Edit, User } from 'lucide-react';
import React, { useState, useRef, useEffect } from "react";
import * as XLSX from "xlsx";

interface Insurance {
    id: number;
    insuranceId: string;
    patientId: string;
    insuranceCompanyName: string;
    insurancePolicyNumber: string;
    policyType: string;
    coverageStartDate: string;
    coverageEndDate: string;
    coverageAmount: string;
    coPayment: string;
    policyHolderName: string;
    planType: string;
    benefits: string;
    claimLimit: string;
    remarks: string;
    insuranceStatus: "Active" | "Inactive" | "Pending" | "Expired";
}

// Reusable Input Component
interface ReusableInputProps {
    label: string;
    type?: "text" | "number" | "email" | "password" | "date" | "textarea";
    value: string | number;
    onChange: (value: string) => void;
    placeholder?: string;
    required?: boolean;
    className?: string;
}

const ReusableInput: React.FC<ReusableInputProps> = ({
    label,
    type = "text",
    value,
    onChange,
    placeholder = " ",
    required = false,
    className = ""
}) => {
    const [isFocused, setIsFocused] = useState(false);

    if (type === "textarea") {
        return (
            <div className={`relative ${className}`}>
                <textarea
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    placeholder={placeholder}
                    required={required}
                    rows={3}
                    className="peer w-full rounded-md border bg-white px-3 pt-5 pb-2 text-sm text-gray-800 focus:border-[#005CBB] focus:ring-2 focus:ring-[#005CBB] outline-none transition-all resize-none"
                />
                <label
                    className={`absolute left-3 px-[4px] bg-white transition-all duration-200 ${value || isFocused ? "-top-2 text-xs text-[#005CBB]" : "top-3 text-gray-500"
                        } peer-focus:-top-2 peer-focus:text-xs peer-focus:text-[#005CBB]`}
                >
                    {label}{required && "*"}
                </label>
            </div>
        );
    }

    return (
        <div className={`relative ${className}`}>
            <input
                type={type}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                placeholder={placeholder}
                required={required}
                className="peer w-full rounded-md border bg-white px-3 pt-5 pb-2 text-sm text-gray-800 focus:border-[#005CBB] focus:ring-2 focus:ring-[#005CBB] outline-none transition-all"
            />
            <label
                className={`absolute left-3 px-[4px] bg-white transition-all duration-200 ${value || isFocused ? "-top-2 text-xs text-[#005CBB]" : "top-3 text-gray-500"
                    } peer-focus:-top-2 peer-focus:text-xs peer-focus:text-[#005CBB]`}
            >
                {label}{required && "*"}
            </label>
        </div>
    );
};

// Reusable Select Component
interface ReusableSelectProps {
    label: string;
    value: string;
    onChange: (value: string) => void;
    options: { value: string; label: string }[];
    required?: boolean;
    className?: string;
}

const ReusableSelect: React.FC<ReusableSelectProps> = ({
    label,
    value,
    onChange,
    options,
    required = false,
    className = ""
}) => {
    const [isFocused, setIsFocused] = useState(false);
    return (
        <div className={`relative ${className}`}>
            <select
                value={value}
                onChange={(e) => onChange(e.target.value)}
                required={required}
                className="peer w-full rounded-md border bg-white px-3 pt-5 pb-2 text-sm text-gray-800 focus:border-[#005CBB] focus:ring-2 focus:ring-[#005CBB] outline-none transition-all appearance-none"
            >
                <option hidden></option>
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
            <label className={`absolute left-3 px-[4px] bg-white transition-all duration-200 ${value || isFocused ? "-top-2 text-xs text-[#005CBB]" : "top-3 text-gray-500"
                } peer-focus:-top-2 peer-focus:text-xs peer-focus:text-[#005CBB]`}
            >
                {label}{required && "*"}
            </label>
        </div>
    );
};

// Insurance Modal Component
interface InsuranceModalProps {
    isOpen: boolean;
    onClose: () => void;
    mode: 'add' | 'edit';
    insurance?: Insurance | null;
    onSubmit: (insurance: Omit<Insurance, 'id'>) => void;
}

const InsuranceModal: React.FC<InsuranceModalProps> = ({
    isOpen,
    onClose,
    mode,
    insurance,
    onSubmit
}) => {
    const [formData, setFormData] = useState<Omit<Insurance, 'id'>>({
        insuranceId: '',
        patientId: '',
        insuranceCompanyName: '',
        insurancePolicyNumber: '',
        policyType: '',
        coverageStartDate: '',
        coverageEndDate: '',
        coverageAmount: '',
        coPayment: '',
        policyHolderName: '',
        planType: '',
        benefits: '',
        claimLimit: '',
        remarks: '',
        insuranceStatus: 'Active'
    });

    useEffect(() => {
        if (mode === 'edit' && insurance) {
            const { id, ...rest } = insurance;
            setFormData(rest);
        } else {
            setFormData({
                insuranceId: '',
                patientId: '',
                insuranceCompanyName: '',
                insurancePolicyNumber: '',
                policyType: '',
                coverageStartDate: '',
                coverageEndDate: '',
                coverageAmount: '',
                coPayment: '',
                policyHolderName: '',
                planType: '',
                benefits: '',
                claimLimit: '',
                remarks: '',
                insuranceStatus: 'Active'
            });
        }
    }, [mode, insurance, isOpen]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999]">
            <div className="bg-white rounded-lg shadow-lg w-[800px] max-w-[90%] max-h-[90vh] overflow-hidden">
                <div className="flex items-center justify-between border-b !border-gray-300 px-5 py-3">
                    <div className="flex items-center space-x-3">
                        <h2 className="text-lg font-semibold">
                            {mode === 'add' ? 'New Patient' : `${insurance?.policyHolderName}`}
                        </h2>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700 transition-colors cursor-pointer"
                        type="button"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-6 max-h-[75vh] overflow-y-auto scrollbar-hide">
                    <div className="grid grid-cols-2 gap-8">
                        {/* Insurance ID */}
                        <ReusableInput
                            label="Insurance ID"
                            value={formData.insuranceId}
                            onChange={(value) => setFormData({ ...formData, insuranceId: value })}
                            required
                        />

                        {/* Patient ID */}
                        <ReusableInput
                            label="Patient ID"
                            value={formData.patientId}
                            onChange={(value) => setFormData({ ...formData, patientId: value })}
                            required
                        />

                        {/* Insurance Company Name */}
                        <ReusableInput
                            label="Insurance Company Name"
                            value={formData.insuranceCompanyName}
                            onChange={(value) => setFormData({ ...formData, insuranceCompanyName: value })}
                            required
                            className=""
                        />

                        {/* Insurance Policy Number */}
                        <ReusableInput
                            label="Insurance Policy Number"
                            value={formData.insurancePolicyNumber}
                            onChange={(value) => setFormData({ ...formData, insurancePolicyNumber: value })}
                            required
                            className=""
                        />

                        {/* Policy Type */}
                        <ReusableSelect
                            label="Policy Type"
                            value={formData.policyType}
                            onChange={(value) => setFormData({ ...formData, policyType: value })}
                            options={[
                                { value: "Health Insurance", label: "Health Insurance" },
                                { value: "Medicare Advantage", label: "Medicare Advantage" },
                                { value: "HMO", label: "HMO" },
                                { value: "PPO", label: "PPO" },
                                { value: "EPO", label: "EPO" }
                            ]}
                            required
                        />

                        {/* Plan Type */}
                        <ReusableSelect
                            label="Plan Type"
                            value={formData.planType}
                            onChange={(value) => setFormData({ ...formData, planType: value })}
                            options={[
                                { value: "Gold Plan", label: "Gold Plan" },
                                { value: "Silver Plan", label: "Silver Plan" },
                                { value: "Platinum Plan", label: "Platinum Plan" },
                                { value: "Bronze Plan", label: "Bronze Plan" },
                                { value: "Medicare Plan", label: "Medicare Plan" },
                                { value: "HMO Plan", label: "HMO Plan" }
                            ]}
                            required
                        />

                        {/* Coverage Start Date */}
                        <ReusableInput
                            label="Coverage Start Date"
                            type="date"
                            value={formData.coverageStartDate}
                            onChange={(value) => setFormData({ ...formData, coverageStartDate: value })}
                            required
                        />

                        {/* Coverage End Date */}
                        <ReusableInput
                            label="Coverage End Date"
                            type="date"
                            value={formData.coverageEndDate}
                            onChange={(value) => setFormData({ ...formData, coverageEndDate: value })}
                            required
                        />

                        {/* Coverage Amount */}
                        <ReusableInput
                            label="Coverage Amount"
                            type="text"
                            value={formData.coverageAmount}
                            onChange={(value) => setFormData({ ...formData, coverageAmount: value })}
                            required
                        />

                        {/* Co-payment */}
                        <ReusableInput
                            label="Co-payment"
                            type="text"
                            value={formData.coPayment}
                            onChange={(value) => setFormData({ ...formData, coPayment: value })}
                            required
                        />

                        {/* Policy Holder Name */}
                        <ReusableInput
                            label="Policy Holder Name"
                            value={formData.policyHolderName}
                            onChange={(value) => setFormData({ ...formData, policyHolderName: value })}
                            required
                            className=""
                        />

                        {/* Benefits */}
                        <ReusableInput
                            label="Benefits"
                            value={formData.benefits}
                            onChange={(value) => setFormData({ ...formData, benefits: value })}
                            required
                            className=""
                        />

                        {/* Claim Limit */}
                        <ReusableInput
                            label="Claim Limit"
                            type="text"
                            value={formData.claimLimit}
                            onChange={(value) => setFormData({ ...formData, claimLimit: value })}
                            required
                        />

                        {/* Insurance Status */}
                        <ReusableSelect
                            label="Insurance Status"
                            value={formData.insuranceStatus}
                            onChange={(value) => setFormData({ ...formData, insuranceStatus: value as "Active" | "Inactive" | "Pending" | "Expired" })}
                            options={[
                                { value: "Active", label: "Active" },
                                { value: "Inactive", label: "Inactive" },
                                { value: "Pending", label: "Pending" },
                                { value: "Expired", label: "Expired" }
                            ]}
                            required
                        />

                        {/* Remarks */}
                        <ReusableInput
                            label="Remarks"
                            type="textarea"
                            value={formData.remarks}
                            onChange={(value) => setFormData({ ...formData, remarks: value })}
                            className="col-span-2"
                        />
                    </div>

                    {/* Submit Buttons */}
                    <div className="flex gap-2 pt-3">
                        <button
                            type="submit"
                            className="bg-[#005cbb] text-white px-6 py-2 rounded-full text-sm font-medium transition hover:bg-[#004a99]"
                        >
                            {mode === 'add' ? 'Add Insurance' : 'Save Changes'}
                        </button>
                        <button
                            onClick={onClose}
                            type="button"
                            className="bg-[#ba1a1a] text-white px-6 py-2 rounded-full text-sm font-medium transition hover:bg-[#9a1515]"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default function PatientInsurancePage() {
    const [detailDropdown, setDetailDropdown] = useState(false);
    const detailref = useRef<HTMLDivElement | null>(null);
    const [selectedIds, setSelectedIds] = useState<number[]>([]);
    const [insurances, setInsurances] = useState<Insurance[]>([]);
    const [animate, setAnimate] = useState(false);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState<'add' | 'edit'>('add');
    const [editingInsurance, setEditingInsurance] = useState<Insurance | null>(null);

    // Sample insurance data
    const sampleInsuranceData: Insurance[] = [
        {
            id: 1,
            insuranceId: "INS001",
            patientId: "PAT001",
            insuranceCompanyName: "Blue Cross Blue Shield",
            insurancePolicyNumber: "BCBS2024001",
            policyType: "Health Insurance",
            coverageStartDate: "2024-01-01",
            coverageEndDate: "2024-12-31",
            coverageAmount: "$500,000",
            coPayment: "$50",
            policyHolderName: "John Doe",
            planType: "Gold Plan",
            benefits: "Comprehensive medical coverage",
            claimLimit: "$1,000,000",
            remarks: "Primary insurance",
            insuranceStatus: "Active"
        },
        {
            id: 2,
            insuranceId: "INS002",
            patientId: "PAT002",
            insuranceCompanyName: "Aetna",
            insurancePolicyNumber: "AET2024002",
            policyType: "Health Insurance",
            coverageStartDate: "2024-02-15",
            coverageEndDate: "2025-02-14",
            coverageAmount: "$250,000",
            coPayment: "$30",
            policyHolderName: "Jane Smith",
            planType: "Silver Plan",
            benefits: "Basic medical coverage",
            claimLimit: "$500,000",
            remarks: "Secondary insurance",
            insuranceStatus: "Active"
        },
        {
            id: 3,
            insuranceId: "INS003",
            patientId: "PAT003",
            insuranceCompanyName: "UnitedHealthcare",
            insurancePolicyNumber: "UHC2024003",
            policyType: "Medicare Advantage",
            coverageStartDate: "2023-11-01",
            coverageEndDate: "2024-10-31",
            coverageAmount: "$300,000",
            coPayment: "$20",
            policyHolderName: "Robert Johnson",
            planType: "Medicare Plan",
            benefits: "Senior medical coverage",
            claimLimit: "$750,000",
            remarks: "Medicare plan",
            insuranceStatus: "Pending"
        },
        {
            id: 4,
            insuranceId: "INS004",
            patientId: "PAT004",
            insuranceCompanyName: "Cigna",
            insurancePolicyNumber: "CIG2024004",
            policyType: "Health Insurance",
            coverageStartDate: "2023-06-01",
            coverageEndDate: "2024-05-31",
            coverageAmount: "$400,000",
            coPayment: "$40",
            policyHolderName: "Sarah Wilson",
            planType: "Platinum Plan",
            benefits: "Premium medical coverage",
            claimLimit: "$2,000,000",
            remarks: "Expired policy",
            insuranceStatus: "Expired"
        },
        {
            id: 5,
            insuranceId: "INS005",
            patientId: "PAT005",
            insuranceCompanyName: "Kaiser Permanente",
            insurancePolicyNumber: "KP2024005",
            policyType: "HMO",
            coverageStartDate: "2024-03-01",
            coverageEndDate: "2025-02-28",
            coverageAmount: "$350,000",
            coPayment: "$25",
            policyHolderName: "Michael Brown",
            planType: "HMO Plan",
            benefits: "HMO network coverage",
            claimLimit: "$800,000",
            remarks: "HMO plan",
            insuranceStatus: "Active"
        }
    ];

    // Fetch data from API
    const fetchInsurances = async () => {
        setLoading(true);
        try {
            // Simulate API call
            setTimeout(() => {
                setInsurances(sampleInsuranceData);
                setLoading(false);
            }, 1000);
        } catch (error) {
            console.error("Failed to fetch insurance data:", error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchInsurances();
    }, []);

    // Click outside dropdown
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as Node;
            if (detailref.current && !detailref.current.contains(target)) {
                setDetailDropdown(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleRefresh = () => {
        setAnimate(true);
        fetchInsurances().then(() => {
            setTimeout(() => setAnimate(false), 300);
        });
    };

    const handleDownloadXLSX = () => {
        const worksheet = XLSX.utils.json_to_sheet(
            insurances.map((item) => ({
                "Insurance ID": item.insuranceId,
                "Patient ID": item.patientId,
                "Insurance Company": item.insuranceCompanyName,
                "Policy Number": item.insurancePolicyNumber,
                "Policy Type": item.policyType,
                "Coverage Start": item.coverageStartDate,
                "Coverage End": item.coverageEndDate,
                "Coverage Amount": item.coverageAmount,
                "Co-payment": item.coPayment,
                "Policy Holder": item.policyHolderName,
                "Plan Type": item.planType,
                "Benefits": item.benefits,
                "Claim Limit": item.claimLimit,
                "Remarks": item.remarks,
                "Status": item.insuranceStatus,
            }))
        );

        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Insurance Data");
        const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
        const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = "patient_insurance.xlsx";
        link.click();
        URL.revokeObjectURL(url);
    };

    const removeData = () => {
        if (selectedIds.length === 0) {
            alert("Please select at least one insurance record to delete.");
            return;
        }
        if (window.confirm(`Delete ${selectedIds.length} insurance record(s)?`)) {
            setInsurances(prev => prev.filter(p => !selectedIds.includes(p.id)));
            setSelectedIds([]);
        }
    };

    const handleCheckboxChange = (id: number) => {
        setSelectedIds(prev =>
            prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
        );
    };

    const handleSelectAll = (checked: boolean) => {
        setSelectedIds(checked ? insurances.map(p => p.id) : []);
    };

    useEffect(() => {
        const selectAllCheckbox = document.getElementById("selectAll") as HTMLInputElement;
        if (selectAllCheckbox) {
            selectAllCheckbox.indeterminate =
                selectedIds.length > 0 && selectedIds.length < insurances.length;
        }
    }, [selectedIds, insurances]);

    const checkboxItems = [
        { label: "Checkbox", checked: true },
        { label: "Insurance ID", checked: true },
        { label: "Patient ID", checked: true },
        { label: "Insurance Company Name", checked: true },
        { label: "Insurance Policy Number", checked: true },
        { label: "Policy Type", checked: true },
        { label: "Coverage Start Date", checked: true },
        { label: "Coverage End Date", checked: true },
        { label: "Coverage Amount", checked: true },
        { label: "Co-payment", checked: true },
        { label: "Policy Holder Name", checked: true },
        { label: "Plan Type", checked: true },
        { label: "Benefits", checked: true },
        { label: "Claim Limit", checked: true },
        { label: "Remarks", checked: true },
        { label: "Insurance Status", checked: true },
        { label: "Actions", checked: true },
    ];

    const deleteInsurance = (id: number) => {
        if (window.confirm("Are you sure you want to delete this insurance record?")) {
            setInsurances(prev => prev.filter(insurance => insurance.id !== id));
        }
    };

    const handleAddClick = () => {
        setModalMode('add');
        setEditingInsurance(null);
        setIsModalOpen(true);
    };

    const handleEditClick = (insurance: Insurance) => {
        setModalMode('edit');
        setEditingInsurance(insurance);
        setIsModalOpen(true);
    };

    const handleModalSubmit = (insuranceData: Omit<Insurance, 'id'>) => {
        if (modalMode === 'add') {
            const newInsurance: Insurance = {
                ...insuranceData,
                id: Math.max(...insurances.map(i => i.id), 0) + 1
            };
            setInsurances(prev => [...prev, newInsurance]);
            alert("Insurance record added successfully!");
        } else if (modalMode === 'edit' && editingInsurance) {
            setInsurances(prev =>
                prev.map(i => i.id === editingInsurance.id ? { ...insuranceData, id: editingInsurance.id } : i)
            );
            alert("Insurance record updated successfully!");
        }
        setIsModalOpen(false);
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case "Active": return "bg-green-100 text-green-800";
            case "Inactive": return "bg-gray-100 text-gray-800";
            case "Pending": return "bg-yellow-100 text-yellow-800";
            case "Expired": return "bg-red-100 text-red-800";
            default: return "bg-gray-100 text-gray-800";
        }
    };

    return (
        <>
            <div className='px-4 sm:px-6 py-[20px] mt-0'>
                <div className="flex items-center justify-between relative top-[-5px]">
                    <div className="flex items-center flex-wrap space-x-2">
                        <h1 className="text-[20px] font-semibold">Patient Insurance</h1>
                        <span className="text-[20px] font-bold">›</span>
                        <Home size={18} />
                        <span>›</span>
                        <span className="text-sm">Insurance</span>
                        <span>›</span>
                        <span className="text-sm">Patient Insurance</span>
                    </div>
                </div>

                <div className="h-auto mt-3">
                    <div className="max-w-full">
                        <div className="bg-[#f8f9fa] rounded-t-xl shadow-md overflow-hidden">
                            {/* Header */}
                            <div className="pr-[15px] pl-[20px] py-[8px] border-b border-gray-200 flex max-[390px]:gap-2 items-center flex-wrap">
                                <div className='flex items-center flex-[35%]'>
                                    <h1 className="m-0 text-[17px] leading-[28px] pr-[10px] font-medium">Patient Insurance</h1>
                                    <label className='relative'>
                                        <input
                                            type="text"
                                            placeholder="Search"
                                            className="w-full max-w-[212px] h-[45px] rounded-[5px] border-0 bg-white text-[14px] font-medium px-[50px] py-2 focus:outline-none"
                                        />
                                        <span className='absolute left-2 top-2'>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                                                <path d="m21 21-4.34-4.34" /><circle cx="11" cy="11" r="8" />
                                            </svg>
                                        </span>
                                    </label>
                                </div>

                                <div className="flex items-center gap-1">
                                    {selectedIds.length > 0 && (
                                        <button
                                            onClick={removeData}
                                            className="flex justify-center items-center w-10 h-10 rounded-full text-[#f44336] hover:bg-[#CED5E6] transition cursor-pointer"
                                            title="Delete Selected"
                                        >
                                            <Trash2 className="w-[20px] h-[20px]" />
                                        </button>
                                    )}

                                    <div ref={detailref} className='relative'>
                                        <button
                                            onClick={() => setDetailDropdown(!detailDropdown)}
                                            className="flex justify-center items-center w-10 h-10 rounded-full text-indigo-500 cursor-pointer hover:bg-[#CED5E6] transition"
                                            title="Show/Hide Columns"
                                        >
                                            <svg className="w-[22px] h-[22px]" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M3 5h18v2H3V5zm0 6h12v2H3v-2zm0 6h18v2H3v-2z" />
                                            </svg>
                                        </button>

                                        {detailDropdown && (
                                            <div className="absolute top-[40px] right-0 z-10 origin-top-right transform transition-all duration-300 ease-out overflow-x-hidden">
                                                <div className="px-[15px] h-[300px] max-h-[320px] overflow-y-auto min-w-[218px] bg-[#efedf0] rounded-[6px] overflow-x-hidden">
                                                    <span className="block text-sm px-[25px] pt-2 font-semibold text-[#212529] leading-[40px]">Show/Hide Column</span>
                                                    <hr className="border-gray-300 my-2" />
                                                    <div className="pr-2 pl-[12px]">
                                                        {checkboxItems.map((item, index) => (
                                                            <label key={index} className="flex items-center space-x-4 h-[40px] cursor-pointer">
                                                                <input
                                                                    type="checkbox"
                                                                    defaultChecked={item.checked}
                                                                    className="appearance-none h-[18px] w-[18px] ml-[20px] rounded-[2px] bg-white border border-gray-400 checked:bg-[#005CBB] checked:border-[#005CBB] checked:[&:after]:block relative after:hidden after:content-[''] after:absolute after:top-[1px] after:left-[5px] after:w-[6px] after:h-[12px] after:border-r-[2px] after:border-b-[2px] after:border-white after:rotate-45"
                                                                />
                                                                <span className="text-[13px] text-[#1e2939]">{item.label}</span>
                                                            </label>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    <button
                                        onClick={handleAddClick}
                                        className="flex justify-center items-center w-10 h-10 rounded-full text-[#4caf50] hover:bg-[#CED5E6] transition cursor-pointer"
                                        title="Add"
                                    >
                                        <CirclePlus className='w-[22px] h-[22px]' />
                                    </button>

                                    <button onClick={handleRefresh} className="flex justify-center items-center w-10 h-10 rounded-full text-[#795548] hover:bg-[#CED5E6] transition cursor-pointer" title="Refresh">
                                        <RotateCw className='w-[20px] h-[20px]' />
                                    </button>

                                    <button onClick={handleDownloadXLSX} className="flex justify-center items-center w-10 h-10 rounded-full text-[#2196f3] hover:bg-[#CED5E6] transition cursor-pointer" title="XLSX Download">
                                        <Download className='w-[20px] h-[20px]' />
                                    </button>
                                </div>
                            </div>

                            {/* Table */}
                            <div className='overflow-auto scrollbar-hide'>
                                <div className="overflow-x-auto scrollbar-hide">
                                    {loading ? (
                                        <div className="p-8 text-center text-gray-500">Loading insurance records...</div>
                                    ) : insurances.length === 0 ? (
                                        <div className="p-8 text-center text-gray-500">No insurance records found</div>
                                    ) : (
                                        <>
                                            <table className="min-w-full divide-y divide-gray-200 hidden md:table">
                                                <thead className="bg-white">
                                                    <tr>
                                                        <th scope="col" className="px-4 py-3 pl-[37px] text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                            <input
                                                                type="checkbox"
                                                                id="selectAll"
                                                                onChange={(e) => handleSelectAll(e.target.checked)}
                                                                className="h-[18px] w-[18px] rounded-[2px] border-[2px] border-[#1a1b1f]"
                                                            />
                                                        </th>
                                                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Insurance ID</th>
                                                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Patient ID</th>
                                                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Insurance Company</th>
                                                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Policy Number</th>
                                                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Policy Type</th>
                                                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Coverage Start</th>
                                                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Coverage End</th>
                                                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Coverage Amount</th>
                                                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Co-payment</th>
                                                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Policy Holder</th>
                                                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Plan Type</th>
                                                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Status</th>
                                                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Actions</th>
                                                    </tr>
                                                </thead>

                                                <tbody className={`bg-white divide-y divide-gray-200 transition-all duration-500 ${animate ? "animate-slideDown" : ""}`}>
                                                    {insurances.map((item) => (
                                                        <tr key={item.id} className="transition-colors duration-150 hover:bg-gray-50">
                                                            <td className="px-4 py-3 pl-[37px]">
                                                                <input
                                                                    type="checkbox"
                                                                    checked={selectedIds.includes(item.id)}
                                                                    onChange={() => handleCheckboxChange(item.id)}
                                                                    className="h-[18px] w-[18px] rounded-[2px] border-[2px] border-[#1a1b1f]"
                                                                />
                                                            </td>

                                                            <td className="px-4 py-3 whitespace-nowrap text-sm font-medium">
                                                                {item.insuranceId}
                                                            </td>

                                                            <td className="px-4 py-3 whitespace-nowrap text-sm">
                                                                {item.patientId}
                                                            </td>

                                                            <td className="px-4 py-3 whitespace-nowrap text-sm">
                                                                {item.insuranceCompanyName}
                                                            </td>

                                                            <td className="px-4 py-3 whitespace-nowrap text-sm font-mono">
                                                                {item.insurancePolicyNumber}
                                                            </td>

                                                            <td className="px-4 py-3 whitespace-nowrap text-sm">
                                                                {item.policyType}
                                                            </td>

                                                            <td className="px-4 py-3 whitespace-nowrap text-sm">
                                                                {item.coverageStartDate}
                                                            </td>

                                                            <td className="px-4 py-3 whitespace-nowrap text-sm">
                                                                {item.coverageEndDate}
                                                            </td>

                                                            <td className="px-4 py-3 whitespace-nowrap text-sm font-semibold">
                                                                {item.coverageAmount}
                                                            </td>

                                                            <td className="px-4 py-3 whitespace-nowrap text-sm">
                                                                {item.coPayment}
                                                            </td>

                                                            <td className="px-4 py-3 whitespace-nowrap text-sm">
                                                                {item.policyHolderName}
                                                            </td>

                                                            <td className="px-4 py-3 whitespace-nowrap text-sm">
                                                                {item.planType}
                                                            </td>

                                                            <td className="px-4 py-3 whitespace-nowrap">
                                                                <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(item.insuranceStatus)}`}>
                                                                    {item.insuranceStatus}
                                                                </span>
                                                            </td>

                                                            <td className="px-4 py-3 whitespace-nowrap text-sm font-medium">
                                                                <div className="flex space-x-2">
                                                                    <button
                                                                        onClick={() => handleEditClick(item)}
                                                                        className="text-[#6777ef] hover:bg-[#E0E1E3] p-1 rounded-full cursor-pointer"
                                                                    >
                                                                        <Edit className="w-5 h-5" />
                                                                    </button>
                                                                    <button
                                                                        onClick={() => deleteInsurance(item.id)}
                                                                        className="text-[#ff5200] hover:bg-[#E0E1E3] p-1 rounded-full cursor-pointer"
                                                                    >
                                                                        <Trash2 className="w-5 h-5" />
                                                                    </button>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>

                                            {/* Mobile View */}
                                            <div className={`px-4 md:hidden shadow-sm bg-white transition-all duration-500 ${animate ? "animate-slideDown" : ""}`}>
                                                {insurances.map((item) => (
                                                    <div key={item.id} className="border-b border-gray-200 py-4">
                                                        <div className="flex items-center h-13 justify-start py-2 border-b border-[#dadada]">
                                                            <input
                                                                checked={selectedIds.includes(item.id)}
                                                                onChange={() => handleCheckboxChange(item.id)}
                                                                type="checkbox"
                                                                className="w-4 h-4 text-blue-600 rounded"
                                                            />
                                                        </div>

                                                        <div className="text-sm text-gray-800">
                                                            <div className="flex items-center h-13 space-x-3 border-b border-[#dadada] gap-4 py-3">
                                                                <span className="font-semibold w-40">Insurance ID:</span>
                                                                <span className="font-medium">{item.insuranceId}</span>
                                                            </div>

                                                            <div className="flex items-center h-13 space-x-3 border-b border-[#dadada] gap-4">
                                                                <span className="font-semibold w-40">Patient ID:</span>
                                                                <span>{item.patientId}</span>
                                                            </div>

                                                            <div className="flex items-center h-13 space-x-3 border-b border-[#dadada] gap-4">
                                                                <span className="font-semibold w-40">Company:</span>
                                                                <span>{item.insuranceCompanyName}</span>
                                                            </div>

                                                            <div className="flex items-center h-13 space-x-3 border-b border-[#dadada] gap-4">
                                                                <span className="font-semibold w-40">Policy Number:</span>
                                                                <span className="font-mono">{item.insurancePolicyNumber}</span>
                                                            </div>

                                                            <div className="flex items-center h-13 space-x-3 border-b border-[#dadada] gap-4">
                                                                <span className="font-semibold w-40">Policy Type:</span>
                                                                <span>{item.policyType}</span>
                                                            </div>

                                                            <div className="flex items-center h-13 space-x-3 border-b border-[#dadada] gap-4">
                                                                <span className="font-semibold w-40">Coverage Start:</span>
                                                                <span>{item.coverageStartDate}</span>
                                                            </div>

                                                            <div className="flex items-center h-13 space-x-3 border-b border-[#dadada] gap-4">
                                                                <span className="font-semibold w-40">Coverage End:</span>
                                                                <span>{item.coverageEndDate}</span>
                                                            </div>

                                                            <div className="flex items-center h-13 space-x-3 border-b border-[#dadada] gap-4">
                                                                <span className="font-semibold w-40">Coverage Amount:</span>
                                                                <span className="font-semibold">{item.coverageAmount}</span>
                                                            </div>

                                                            <div className="flex items-center h-13 space-x-3 border-b border-[#dadada] gap-4">
                                                                <span className="font-semibold w-40">Co-payment:</span>
                                                                <span>{item.coPayment}</span>
                                                            </div>

                                                            <div className="flex items-center h-13 space-x-3 border-b border-[#dadada] gap-4">
                                                                <span className="font-semibold w-40">Policy Holder:</span>
                                                                <span>{item.policyHolderName}</span>
                                                            </div>

                                                            <div className="flex items-center h-13 space-x-3 border-b border-[#dadada] gap-4">
                                                                <span className="font-semibold w-40">Plan Type:</span>
                                                                <span>{item.planType}</span>
                                                            </div>

                                                            <div className="flex items-center h-13 space-x-3 border-b border-[#dadada] gap-4">
                                                                <span className="font-semibold w-40">Status:</span>
                                                                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(item.insuranceStatus)}`}>
                                                                    {item.insuranceStatus}
                                                                </span>
                                                            </div>

                                                            {/* Actions */}
                                                            <div className="flex items-center h-13 space-x-3 border-b border-[#dadada] gap-4">
                                                                <div className="flex space-x-2">
                                                                    <button
                                                                        onClick={() => handleEditClick(item)}
                                                                        className="text-[#6777ef] hover:bg-[#E0E1E3] p-1 rounded-full cursor-pointer"
                                                                    >
                                                                        <Edit className="w-5 h-5" />
                                                                    </button>
                                                                    <button
                                                                        onClick={() => deleteInsurance(item.id)}
                                                                        className="text-[#ff5200] hover:bg-[#E0E1E3] p-1 rounded-full cursor-pointer"
                                                                    >
                                                                        <Trash2 className="w-5 h-5" />
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div>
                    <Paginator totalItems={insurances.length} />
                </div>
            </div>

            {/* Insurance Modal */}
            <InsuranceModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                mode={modalMode}
                insurance={editingInsurance}
                onSubmit={handleModalSubmit}
            />

            <style jsx>{`
                @keyframes slideDown {
                    0% { transform: translateY(-20px); opacity: 0; }
                    100% { transform: translateY(0); opacity: 1; }
                }
                .animate-slideDown { animation: slideDown 0.4s ease-in-out; }
                .scrollbar-hide::-webkit-scrollbar { display: none; }
                .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
            `}</style>
        </>
    );
}

// Paginator Component
function Paginator({ totalItems = 0 }: { totalItems: number }) {
    const [page, setPage] = useState(1);
    const itemsPerPage = 10;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const startItem = (page - 1) * itemsPerPage + 1;
    const endItem = Math.min(page * itemsPerPage, totalItems);

    return (
        <div className="flex items-center justify-end gap-8 border-t border-gray-200 bg-white px-4 py-3 text-sm text-gray-700 rounded-b-xl shadow-sm">
            <div className="font-medium">
                {totalItems > 0 ? `${startItem} – ${endItem} of ${totalItems}` : "0 – 0 of 0"}
            </div>
            <div className="flex items-center space-x-2">
                <button
                    onClick={() => setPage(p => Math.max(1, p - 1))}
                    disabled={page === 1}
                    className={`w-9 h-9 rounded-full flex items-center justify-center ${page === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100'}`}
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                </button>
                <button
                    onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                    disabled={page === totalPages}
                    className={`w-9 h-9 rounded-full flex items-center justify-center ${page === totalPages ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100'}`}
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                </button>
            </div>
        </div>
    );
}