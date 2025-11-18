'use client';

import { CirclePlus, Download, Home, RotateCw, Trash2, Edit, User } from 'lucide-react';
import React, { useState, useRef, useEffect } from "react";
import * as XLSX from "xlsx";

interface Claim {
    id: number;
    claimId: string;
    patientName: string;
    claimType: string;
    claimStatus: "Pending" | "Approved" | "Rejected" | "Under Review" | "Paid";
    doctorName: string;
    hospitalName: string;
    claimAmount: string;
    approvedAmount: string;
    claimDate: string;
    rejectionReason: string;
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

// Claim Modal Component
interface ClaimModalProps {
    isOpen: boolean;
    onClose: () => void;
    mode: 'add' | 'edit';
    claim?: Claim | null;
    onSubmit: (claim: Omit<Claim, 'id'>) => void;
}

const ClaimModal: React.FC<ClaimModalProps> = ({
    isOpen,
    onClose,
    mode,
    claim,
    onSubmit
}) => {
    const [formData, setFormData] = useState<Omit<Claim, 'id'>>({
        claimId: '',
        patientName: '',
        claimType: '',
        claimStatus: 'Pending',
        doctorName: '',
        hospitalName: '',
        claimAmount: '',
        approvedAmount: '',
        claimDate: '',
        rejectionReason: ''
    });

    useEffect(() => {
        if (mode === 'edit' && claim) {
            const { id, ...rest } = claim;
            setFormData(rest);
        } else {
            setFormData({
                claimId: '',
                patientName: '',
                claimType: '',
                claimStatus: 'Pending',
                doctorName: '',
                hospitalName: '',
                claimAmount: '',
                approvedAmount: '',
                claimDate: '',
                rejectionReason: ''
            });
        }
    }, [mode, claim, isOpen]);

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
                            {mode === 'add' ? 'New Patient' : ` ${claim?.patientName}`}
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
                    <div className="grid grid-cols-2 gap-6">
                        {/* Claim ID */}
                        <ReusableInput
                            label="Claim ID"
                            value={formData.claimId}
                            onChange={(value) => setFormData({ ...formData, claimId: value })}
                            required
                        />

                        {/* Patient Name */}
                        <ReusableInput
                            label="Patient Name"
                            value={formData.patientName}
                            onChange={(value) => setFormData({ ...formData, patientName: value })}
                            required
                        />

                        {/* Claim Type */}
                        <ReusableSelect
                            label="Claim Type"
                            value={formData.claimType}
                            onChange={(value) => setFormData({ ...formData, claimType: value })}
                            options={[
                                { value: "Medical Treatment", label: "Medical Treatment" },
                                { value: "Surgery", label: "Surgery" },
                                { value: "Emergency Care", label: "Emergency Care" },
                                { value: "Diagnostic Tests", label: "Diagnostic Tests" },
                                { value: "Hospital Stay", label: "Hospital Stay" },
                                { value: "Medication", label: "Medication" }
                            ]}
                            required
                        />

                        {/* Status */}
                        <ReusableSelect
                            label="Status"
                            value={formData.claimStatus}
                            onChange={(value) => setFormData({ ...formData, claimStatus: value as "Pending" | "Approved" | "Rejected" | "Under Review" | "Paid" })}
                            options={[
                                { value: "Pending", label: "Pending" },
                                { value: "Approved", label: "Approved" },
                                { value: "Rejected", label: "Rejected" },
                                { value: "Under Review", label: "Under Review" },
                                { value: "Paid", label: "Paid" }
                            ]}
                            required
                        />

                        {/* Doctor Name */}
                        <ReusableInput
                            label="Doctor Name"
                            value={formData.doctorName}
                            onChange={(value) => setFormData({ ...formData, doctorName: value })}
                            required
                        />

                        {/* Hospital Name */}
                        <ReusableInput
                            label="Hospital Name"
                            value={formData.hospitalName}
                            onChange={(value) => setFormData({ ...formData, hospitalName: value })}
                            required
                        />

                        {/* Amount */}
                        <ReusableInput
                            label="Amount"
                            type="text"
                            value={formData.claimAmount}
                            onChange={(value) => setFormData({ ...formData, claimAmount: value })}
                            required
                        />

                        {/* Approved Amount */}
                        <ReusableInput
                            label="Approved Amount"
                            type="text"
                            value={formData.approvedAmount}
                            onChange={(value) => setFormData({ ...formData, approvedAmount: value })}
                            required
                        />

                        {/* Claim Date */}
                        <ReusableInput
                            label="Claim Date"
                            type="date"
                            value={formData.claimDate}
                            onChange={(value) => setFormData({ ...formData, claimDate: value })}
                            required
                        />
                    </div>

                    {/* Rejection Reason */}
                    <ReusableInput
                        label="Rejection Reason"
                        type="textarea"
                        value={formData.rejectionReason}
                        onChange={(value) => setFormData({ ...formData, rejectionReason: value })}
                        className="col-span-2"
                    />

                    {/* Submit Buttons */}
                    <div className="flex gap-2 pt-3">
                        <button
                            type="submit"
                            className="bg-[#005cbb] text-white px-6 py-2 rounded-full text-sm font-medium transition hover:bg-[#004a99]"
                        >
                            {mode === 'add' ? 'Add Claim' : 'Save Changes'}
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

export default function ClaimStatusPage() {
    const [detailDropdown, setDetailDropdown] = useState(false);
    const detailref = useRef<HTMLDivElement | null>(null);
    const [selectedIds, setSelectedIds] = useState<number[]>([]);
    const [claims, setClaims] = useState<Claim[]>([]);
    const [animate, setAnimate] = useState(false);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState<'add' | 'edit'>('add');
    const [editingClaim, setEditingClaim] = useState<Claim | null>(null);

    // Sample claim data
    const sampleClaimData: Claim[] = [
        {
            id: 1,
            claimId: "CLM2024001",
            patientName: "John Doe",
            claimType: "Medical Treatment",
            claimStatus: "Approved",
            doctorName: "Dr. Sarah Wilson",
            hospitalName: "City General Hospital",
            claimAmount: "$2,500.00",
            approvedAmount: "$2,300.00",
            claimDate: "2024-01-15",
            rejectionReason: ""
        },
        {
            id: 2,
            claimId: "CLM2024002",
            patientName: "Jane Smith",
            claimType: "Surgery",
            claimStatus: "Pending",
            doctorName: "Dr. Michael Brown",
            hospitalName: "Metro Medical Center",
            claimAmount: "$8,750.00",
            approvedAmount: "$0.00",
            claimDate: "2024-01-18",
            rejectionReason: ""
        },
        {
            id: 3,
            claimId: "CLM2024003",
            patientName: "Robert Johnson",
            claimType: "Emergency Care",
            claimStatus: "Rejected",
            doctorName: "Dr. Emily Chen",
            hospitalName: "Unity Hospital",
            claimAmount: "$1,200.00",
            approvedAmount: "$0.00",
            claimDate: "2024-01-10",
            rejectionReason: "Pre-existing condition not covered"
        },
        {
            id: 4,
            claimId: "CLM2024004",
            patientName: "Maria Garcia",
            claimType: "Diagnostic Tests",
            claimStatus: "Under Review",
            doctorName: "Dr. James Wilson",
            hospitalName: "Regional Medical Center",
            claimAmount: "$850.00",
            approvedAmount: "$0.00",
            claimDate: "2024-01-20",
            rejectionReason: ""
        },
        {
            id: 5,
            claimId: "CLM2024005",
            patientName: "David Lee",
            claimType: "Hospital Stay",
            claimStatus: "Paid",
            doctorName: "Dr. Amanda Taylor",
            hospitalName: "Sunrise Hospital",
            claimAmount: "$3,200.00",
            approvedAmount: "$2,800.00",
            claimDate: "2024-01-05",
            rejectionReason: ""
        },
        {
            id: 6,
            claimId: "CLM2024006",
            patientName: "Sarah Williams",
            claimType: "Medication",
            claimStatus: "Approved",
            doctorName: "Dr. Kevin Martin",
            hospitalName: "Community Health Center",
            claimAmount: "$450.00",
            approvedAmount: "$420.00",
            claimDate: "2024-01-22",
            rejectionReason: ""
        }
    ];

    // Fetch data from API
    const fetchClaims = async () => {
        setLoading(true);
        try {
            // Simulate API call
            setTimeout(() => {
                setClaims(sampleClaimData);
                setLoading(false);
            }, 1000);
        } catch (error) {
            console.error("Failed to fetch claims:", error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchClaims();
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
        fetchClaims().then(() => {
            setTimeout(() => setAnimate(false), 300);
        });
    };

    const handleDownloadXLSX = () => {
        const worksheet = XLSX.utils.json_to_sheet(
            claims.map((item) => ({
                "Claim ID": item.claimId,
                "Patient Name": item.patientName,
                "Claim Type": item.claimType,
                "Claim Status": item.claimStatus,
                "Doctor Name": item.doctorName,
                "Hospital Name": item.hospitalName,
                "Claim Amount": item.claimAmount,
                "Approved Amount": item.approvedAmount,
                "Claim Date": item.claimDate,
                "Rejection Reason": item.rejectionReason,
            }))
        );

        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Claim Status");
        const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
        const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = "claim_status.xlsx";
        link.click();
        URL.revokeObjectURL(url);
    };

    const removeData = () => {
        if (selectedIds.length === 0) {
            alert("Please select at least one claim to delete.");
            return;
        }
        if (window.confirm(`Delete ${selectedIds.length} claim(s)?`)) {
            setClaims(prev => prev.filter(p => !selectedIds.includes(p.id)));
            setSelectedIds([]);
        }
    };

    const handleCheckboxChange = (id: number) => {
        setSelectedIds(prev =>
            prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
        );
    };

    const handleSelectAll = (checked: boolean) => {
        setSelectedIds(checked ? claims.map(p => p.id) : []);
    };

    useEffect(() => {
        const selectAllCheckbox = document.getElementById("selectAll") as HTMLInputElement;
        if (selectAllCheckbox) {
            selectAllCheckbox.indeterminate =
                selectedIds.length > 0 && selectedIds.length < claims.length;
        }
    }, [selectedIds, claims]);

    const checkboxItems = [
        { label: "Checkbox", checked: true },
        { label: "Claim ID", checked: true },
        { label: "Patient Name", checked: true },
        { label: "Claim Type", checked: true },
        { label: "Claim Status", checked: true },
        { label: "Doctor Name", checked: true },
        { label: "Hospital Name", checked: true },
        { label: "Claim Amount", checked: true },
        { label: "Approved Amount", checked: true },
        { label: "Claim Date", checked: true },
        { label: "Rejection Reason", checked: true },
        { label: "Actions", checked: true },
    ];

    const deleteClaim = (id: number) => {
        if (window.confirm("Are you sure you want to delete this claim?")) {
            setClaims(prev => prev.filter(claim => claim.id !== id));
        }
    };

    const handleAddClick = () => {
        setModalMode('add');
        setEditingClaim(null);
        setIsModalOpen(true);
    };

    const handleEditClick = (claim: Claim) => {
        setModalMode('edit');
        setEditingClaim(claim);
        setIsModalOpen(true);
    };

    const handleModalSubmit = (claimData: Omit<Claim, 'id'>) => {
        if (modalMode === 'add') {
            const newClaim: Claim = {
                ...claimData,
                id: Math.max(...claims.map(c => c.id), 0) + 1
            };
            setClaims(prev => [...prev, newClaim]);
            alert("Claim added successfully!");
        } else if (modalMode === 'edit' && editingClaim) {
            setClaims(prev =>
                prev.map(c => c.id === editingClaim.id ? { ...claimData, id: editingClaim.id } : c)
            );
            alert("Claim updated successfully!");
        }
        setIsModalOpen(false);
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case "Approved": return "bg-green-100 text-green-800";
            case "Pending": return "bg-yellow-100 text-yellow-800";
            case "Rejected": return "bg-red-100 text-red-800";
            case "Under Review": return "bg-blue-100 text-blue-800";
            case "Paid": return "bg-purple-100 text-purple-800";
            default: return "bg-gray-100 text-gray-800";
        }
    };

    return (
        <>
            <div className='px-4 sm:px-6 py-[20px] mt-0'>
                <div className="flex items-center justify-between relative top-[-5px]">
                    <div className="flex items-center flex-wrap space-x-2">
                        <h1 className="text-[20px] font-semibold">Claim Status</h1>
                        <span className="text-[20px] font-bold">›</span>
                        <Home size={18} />
                        <span>›</span>
                        <span className="text-sm">Insurance</span>
                        <span>›</span>
                        <span className="text-sm">Claim Status</span>
                    </div>
                </div>

                <div className="h-auto mt-3">
                    <div className="max-w-full">
                        <div className="bg-[#f8f9fa] rounded-t-xl shadow-md overflow-hidden">
                            {/* Header */}
                            <div className="pr-[15px] pl-[20px] py-[8px] border-b border-gray-200 flex max-[390px]:gap-2 items-center flex-wrap">
                                <div className='flex items-center flex-[35%]'>
                                    <h1 className="m-0 text-[17px] leading-[28px] pr-[10px] font-medium">Claim Status</h1>
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
                                        <div className="p-8 text-center text-gray-500">Loading claims...</div>
                                    ) : claims.length === 0 ? (
                                        <div className="p-8 text-center text-gray-500">No claims found</div>
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
                                                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Claim ID</th>
                                                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Patient Name</th>
                                                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Claim Type</th>
                                                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Claim Status</th>
                                                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Doctor Name</th>
                                                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Hospital Name</th>
                                                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Claim Amount</th>
                                                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Approved Amount</th>
                                                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Claim Date</th>
                                                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Rejection Reason</th>
                                                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Actions</th>
                                                    </tr>
                                                </thead>

                                                <tbody className={`bg-white divide-y divide-gray-200 transition-all duration-500 ${animate ? "animate-slideDown" : ""}`}>
                                                    {claims.map((item) => (
                                                        <tr key={item.id} className="transition-colors duration-150 hover:bg-gray-50">
                                                            <td className="px-4 py-3 pl-[37px]">
                                                                <input
                                                                    type="checkbox"
                                                                    checked={selectedIds.includes(item.id)}
                                                                    onChange={() => handleCheckboxChange(item.id)}
                                                                    className="h-[18px] w-[18px] rounded-[2px] border-[2px] border-[#1a1b1f]"
                                                                />
                                                            </td>

                                                            <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-blue-600">
                                                                {item.claimId}
                                                            </td>

                                                            <td className="px-4 py-3 whitespace-nowrap text-sm">
                                                                {item.patientName}
                                                            </td>

                                                            <td className="px-4 py-3 whitespace-nowrap text-sm">
                                                                {item.claimType}
                                                            </td>

                                                            <td className="px-4 py-3 whitespace-nowrap">
                                                                <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(item.claimStatus)}`}>
                                                                    {item.claimStatus}
                                                                </span>
                                                            </td>

                                                            <td className="px-4 py-3 whitespace-nowrap text-sm">
                                                                {item.doctorName}
                                                            </td>

                                                            <td className="px-4 py-3 whitespace-nowrap text-sm">
                                                                {item.hospitalName}
                                                            </td>

                                                            <td className="px-4 py-3 whitespace-nowrap text-sm font-semibold">
                                                                {item.claimAmount}
                                                            </td>

                                                            <td className="px-4 py-3 whitespace-nowrap text-sm font-semibold text-green-600">
                                                                {item.approvedAmount}
                                                            </td>

                                                            <td className="px-4 py-3 whitespace-nowrap text-sm">
                                                                {item.claimDate}
                                                            </td>

                                                            <td className="px-4 py-3 whitespace-nowrap text-sm text-red-600 max-w-[200px] truncate">
                                                                {item.rejectionReason || "-"}
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
                                                                        onClick={() => deleteClaim(item.id)}
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
                                                {claims.map((item) => (
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
                                                                <span className="font-semibold w-40">Claim ID:</span>
                                                                <span className="text-blue-600 font-medium">{item.claimId}</span>
                                                            </div>

                                                            <div className="flex items-center h-13 space-x-3 border-b border-[#dadada] gap-4">
                                                                <span className="font-semibold w-40">Patient Name:</span>
                                                                <span>{item.patientName}</span>
                                                            </div>

                                                            <div className="flex items-center h-13 space-x-3 border-b border-[#dadada] gap-4">
                                                                <span className="font-semibold w-40">Claim Type:</span>
                                                                <span>{item.claimType}</span>
                                                            </div>

                                                            <div className="flex items-center h-13 space-x-3 border-b border-[#dadada] gap-4">
                                                                <span className="font-semibold w-40">Claim Status:</span>
                                                                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(item.claimStatus)}`}>
                                                                    {item.claimStatus}
                                                                </span>
                                                            </div>

                                                            <div className="flex items-center h-13 space-x-3 border-b border-[#dadada] gap-4">
                                                                <span className="font-semibold w-40">Doctor Name:</span>
                                                                <span>{item.doctorName}</span>
                                                            </div>

                                                            <div className="flex items-center h-13 space-x-3 border-b border-[#dadada] gap-4">
                                                                <span className="font-semibold w-40">Hospital Name:</span>
                                                                <span>{item.hospitalName}</span>
                                                            </div>

                                                            <div className="flex items-center h-13 space-x-3 border-b border-[#dadada] gap-4">
                                                                <span className="font-semibold w-40">Claim Amount:</span>
                                                                <span className="font-semibold">{item.claimAmount}</span>
                                                            </div>

                                                            <div className="flex items-center h-13 space-x-3 border-b border-[#dadada] gap-4">
                                                                <span className="font-semibold w-40">Approved Amount:</span>
                                                                <span className="font-semibold text-green-600">{item.approvedAmount}</span>
                                                            </div>

                                                            <div className="flex items-center h-13 space-x-3 border-b border-[#dadada] gap-4">
                                                                <span className="font-semibold w-40">Claim Date:</span>
                                                                <span>{item.claimDate}</span>
                                                            </div>

                                                            <div className="flex items-center h-13 space-x-3 border-b border-[#dadada] gap-4">
                                                                <span className="font-semibold w-40">Rejection Reason:</span>
                                                                <span className="text-red-600">{item.rejectionReason || "-"}</span>
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
                                                                        onClick={() => deleteClaim(item.id)}
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
                    <Paginator totalItems={claims.length} />
                </div>
            </div>

            {/* Claim Modal */}
            <ClaimModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                mode={modalMode}
                claim={editingClaim}
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