'use client';

import { CirclePlus, Download, Home, RotateCw, Trash2, Edit, Phone, Mail, MapPin } from 'lucide-react';
import React, { useEffect, useState, useRef } from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import Link from 'next/link';

interface InsuranceProvider {
    id: number;
    providerName: string;
    providerCode: string;
    contactPhone: string;
    contactEmail: string;
    address: string;
    websiteUrl: string;
    customerSupportNumber: string;
    contractStartDate: string;
    reimbursementRate: string;
    coverageTypes: string;
    status: "Active" | "Inactive" | "Pending" | "Suspended";
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
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
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

// Insurance Provider Modal Component
interface InsuranceProviderModalProps {
    isOpen: boolean;
    onClose: () => void;
    mode: 'add' | 'edit';
    provider?: InsuranceProvider | null;
    onSubmit: (provider: Omit<InsuranceProvider, 'id'>) => void;
}

const InsuranceProviderModal: React.FC<InsuranceProviderModalProps> = ({
    isOpen,
    onClose,
    mode,
    provider,
    onSubmit
}) => {
    const [formData, setFormData] = useState<Omit<InsuranceProvider, 'id'>>({
        providerName: '',
        providerCode: '',
        contactPhone: '',
        contactEmail: '',
        address: '',
        websiteUrl: '',
        customerSupportNumber: '',
        contractStartDate: '',
        reimbursementRate: '',
        coverageTypes: '',
        status: 'Active'
    });

    const [coverageTypeInput, setCoverageTypeInput] = useState('');

    useEffect(() => {
        if (mode === 'edit' && provider) {
            const { id, ...rest } = provider;
            setFormData(rest);
        } else {
            setFormData({
                providerName: '',
                providerCode: '',
                contactPhone: '',
                contactEmail: '',
                address: '',
                websiteUrl: '',
                customerSupportNumber: '',
                contractStartDate: '',
                reimbursementRate: '',
                coverageTypes: '',
                status: 'Active'
            });
        }
    }, [mode, provider, isOpen]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            e.preventDefault();
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999]">
            <div className="bg-white rounded-lg shadow-lg w-[800px] max-w-[90%] max-h-[90vh] overflow-hidden">
                <div className="flex items-center justify-between border-b !border-gray-300 px-5 py-3">
                    <div className="flex items-center space-x-3">
                        
                        <h2 className="text-lg font-semibold">
                            {mode === 'add' ? 'New Provider' : `Edit Provider - ${provider?.providerName}`}
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
                        {/* Provider Name */}
                        <ReusableInput
                            label="Provider Name"
                            value={formData.providerName}
                            onChange={(value) => setFormData({ ...formData, providerName: value })}
                            required
                        />

                        {/* Provider Code */}
                        <ReusableInput
                            label="Provider Code"
                            value={formData.providerCode}
                            onChange={(value) => setFormData({ ...formData, providerCode: value })}
                            required
                        />

                        {/* Contact Phone */}
                        <ReusableInput
                            label="Contact Phone"
                            value={formData.contactPhone}
                            onChange={(value) => setFormData({ ...formData, contactPhone: value })}
                            required
                        />

                        {/* Contact Email */}
                        <ReusableInput
                            label="Contact Email"
                            type="email"
                            value={formData.contactEmail}
                            onChange={(value) => setFormData({ ...formData, contactEmail: value })}
                            required
                        />

                        {/* Website URL */}
                        <ReusableInput
                            label="Website URL"
                            value={formData.websiteUrl}
                            onChange={(value) => setFormData({ ...formData, websiteUrl: value })}
                            required
                        />

                        {/* Customer Support Number */}
                        <ReusableInput
                            label="Customer Support Number"
                            value={formData.customerSupportNumber}
                            onChange={(value) => setFormData({ ...formData, customerSupportNumber: value })}
                            required
                        />

                        {/* Contract Start Date */}
                        <ReusableInput
                            label="Contract Start Date"
                            type="date"
                            value={formData.contractStartDate}
                            onChange={(value) => setFormData({ ...formData, contractStartDate: value })}
                            required
                        />

                        {/* Reimbursement Rate */}
                        <ReusableInput
                            label="Reimbursement Rate"
                            value={formData.reimbursementRate}
                            onChange={(value) => setFormData({ ...formData, reimbursementRate: value })}
                            required
                        />

                        {/* Status */}
                        <ReusableSelect
                            label="Status"
                            value={formData.status}
                            onChange={(value) => setFormData({ ...formData, status: value as "Active" | "Inactive" | "Pending" | "Suspended" })}
                            options={[
                                { value: "Active", label: "Active" },
                                { value: "Inactive", label: "Inactive" },
                                { value: "Pending", label: "Pending" },
                                { value: "Suspended", label: "Suspended" }
                            ]}
                            required
                        />

                        <ReusableInput
                            label="Coverage Types"
                            value={formData.coverageTypes}
                            onChange={(value) => setFormData({ ...formData, coverageTypes: value })}
                            required
                        />
                    </div>

                    {/* Address */}
                    <ReusableInput
                        label="Address"
                        type="textarea"
                        value={formData.address}
                        onChange={(value) => setFormData({ ...formData, address: value })}
                        required
                    />

                    {/* Submit Buttons */}
                    <div className="flex gap-2 pt-3">
                        <button
                            type="submit"
                            className="bg-[#005cbb] text-white px-6 py-2 rounded-full text-sm font-medium transition hover:bg-[#004a99]"
                        >
                            {mode === 'add' ? 'Add Provider' : 'Save Changes'}
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

export default function InsuranceProviderPage() {
    const [detailDropdown, setDetailDropdown] = useState(false);
    const detailref = useRef<HTMLDivElement | null>(null);
    const [selectedIds, setSelectedIds] = useState<number[]>([]);
    const [providers, setProviders] = useState<InsuranceProvider[]>([]);
    const [animate, setAnimate] = useState(false);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState<'add' | 'edit'>('add');
    const [editingProvider, setEditingProvider] = useState<InsuranceProvider | null>(null);

    // Sample insurance provider data
    const sampleProviderData: InsuranceProvider[] = [
        {
            id: 1,
            providerName: "Blue Cross Blue Shield",
            providerCode: "BCBS001",
            contactPhone: "+1-800-555-1234",
            contactEmail: "support@bcbs.com",
            address: "123 Health Street, New York, NY 10001",
            websiteUrl: "www.bcbs.com",
            customerSupportNumber: "+1-800-555-5678",
            contractStartDate: "2023-01-15",
            reimbursementRate: "85%",
            coverageTypes: 'Health',
            status: "Active"
        },
        {
            id: 2,
            providerName: "Aetna Health",
            providerCode: "AET002",
            contactPhone: "+1-800-555-2345",
            contactEmail: "contact@aetna.com",
            address: "456 Insurance Ave, Chicago, IL 60601",
            websiteUrl: "www.aetna.com",
            customerSupportNumber: "+1-800-555-6789",
            contractStartDate: "2023-03-20",
            reimbursementRate: "80%",
            coverageTypes: 'Health',
            status: "Active"
        },
        {
            id: 3,
            providerName: "UnitedHealthcare",
            providerCode: "UHC003",
            contactPhone: "+1-800-555-3456",
            contactEmail: "info@uhc.com",
            address: "789 Care Blvd, Los Angeles, CA 90001",
            websiteUrl: "www.uhc.com",
            customerSupportNumber: "+1-800-555-7890",
            contractStartDate: "2022-11-10",
            reimbursementRate: "82%",
            coverageTypes: 'Health',
            status: "Pending"
        },
        {
            id: 4,
            providerName: "Cigna Healthcare",
            providerCode: "CIG004",
            contactPhone: "+1-800-555-4567",
            contactEmail: "service@cigna.com",
            address: "321 Wellness Road, Houston, TX 77001",
            websiteUrl: "www.cigna.com",
            customerSupportNumber: "+1-800-555-8901",
            contractStartDate: "2023-06-05",
            reimbursementRate: "78%",
            coverageTypes: 'Health',
            status: "Inactive"
        },
        {
            id: 5,
            providerName: "Kaiser Permanente",
            providerCode: "KP005",
            contactPhone: "+1-800-555-5678",
            contactEmail: "help@kaiser.org",
            address: "654 Medical Center, San Francisco, CA 94101",
            websiteUrl: "www.kaiserpermanente.org",
            customerSupportNumber: "+1-800-555-9012",
            contractStartDate: "2023-02-28",
            reimbursementRate: "88%",
            coverageTypes: 'Health',
            status: "Active"
        },
        {
            id: 6,
            providerName: "Humana Health",
            providerCode: "HUM006",
            contactPhone: "+1-800-555-6789",
            contactEmail: "assistance@humana.com",
            address: "987 Benefit Lane, Miami, FL 33101",
            websiteUrl: "www.humana.com",
            customerSupportNumber: "+1-800-555-0123",
            contractStartDate: "2023-04-15",
            reimbursementRate: "75%",
            coverageTypes: 'Health',
            status: "Suspended"
        }
    ];

    // Fetch data from API
    const fetchProviders = async () => {
        setLoading(true);
        try {
            // Simulate API call
            setTimeout(() => {
                setProviders(sampleProviderData);
                setLoading(false);
            }, 1000);
        } catch (error) {
            console.error("Failed to fetch insurance providers:", error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProviders();
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
        fetchProviders().then(() => {
            setTimeout(() => setAnimate(false), 300);
        });
    };

    const handleDownloadXLSX = () => {
        const worksheet = XLSX.utils.json_to_sheet(
            providers.map((item) => ({
                "Provider Name": item.providerName,
                "Provider Code": item.providerCode,
                "Contact Phone": item.contactPhone,
                "Contact Email": item.contactEmail,
                "Address": item.address,
                "Website URL": item.websiteUrl,
                "Customer Support": item.customerSupportNumber,
                "Contract Start Date": item.contractStartDate,
                "Reimbursement Rate": item.reimbursementRate,
                "Coverage Types": item.coverageTypes,
                "Status": item.status,
            }))
        );

        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Insurance Providers");
        const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
        const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
        saveAs(blob, "insurance_providers.xlsx");
    };

    const removeData = () => {
        if (selectedIds.length === 0) {
            alert("Please select at least one provider to delete.");
            return;
        }
        if (window.confirm(`Delete ${selectedIds.length} provider(s)?`)) {
            setProviders(prev => prev.filter(p => !selectedIds.includes(p.id)));
            setSelectedIds([]);
        }
    };

    const handleCheckboxChange = (id: number) => {
        setSelectedIds(prev =>
            prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
        );
    };

    const handleSelectAll = (checked: boolean) => {
        setSelectedIds(checked ? providers.map(p => p.id) : []);
    };

    useEffect(() => {
        const selectAllCheckbox = document.getElementById("selectAll") as HTMLInputElement;
        if (selectAllCheckbox) {
            selectAllCheckbox.indeterminate =
                selectedIds.length > 0 && selectedIds.length < providers.length;
        }
    }, [selectedIds, providers]);

    const checkboxItems = [
        { label: "Checkbox", checked: true },
        { label: "Provider Name", checked: true },
        { label: "Provider Code", checked: true },
        { label: "Contact Phone", checked: true },
        { label: "Contact Email", checked: true },
        { label: "Address", checked: true },
        { label: "Website URL", checked: true },
        { label: "Customer Support Number", checked: true },
        { label: "Contract Start Date", checked: true },
        { label: "Reimbursement Rate", checked: true },
        { label: "Coverage Types", checked: true },
        { label: "Status", checked: true },
        { label: "Actions", checked: true },
    ];

    const deleteProvider = (id: number) => {
        if (window.confirm("Are you sure you want to delete this provider?")) {
            setProviders(prev => prev.filter(provider => provider.id !== id));
        }
    };

    const handleAddClick = () => {
        setModalMode('add');
        setEditingProvider(null);
        setIsModalOpen(true);
    };

    const handleEditClick = (provider: InsuranceProvider) => {
        setModalMode('edit');
        setEditingProvider(provider);
        setIsModalOpen(true);
    };

    const handleModalSubmit = (providerData: Omit<InsuranceProvider, 'id'>) => {
        if (modalMode === 'add') {
            const newProvider: InsuranceProvider = {
                ...providerData,
                id: Math.max(...providers.map(p => p.id), 0) + 1
            };
            setProviders(prev => [...prev, newProvider]);
            alert("Provider added successfully!");
        } else if (modalMode === 'edit' && editingProvider) {
            setProviders(prev =>
                prev.map(p => p.id === editingProvider.id ? { ...providerData, id: editingProvider.id } : p)
            );
            alert("Provider updated successfully!");
        }
        setIsModalOpen(false);
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case "Active": return "bg-green-100 text-green-800";
            case "Inactive": return "bg-gray-100 text-gray-800";
            case "Pending": return "bg-yellow-100 text-yellow-800";
            case "Suspended": return "bg-red-100 text-red-800";
            default: return "bg-gray-100 text-gray-800";
        }
    };

    return (
        <>
            <div className='px-4 sm:px-6 py-[20px] mt-0'>
                <div className="flex items-center justify-between relative top-[-5px]">
                    <div className="flex items-center flex-wrap space-x-2">
                        <h1 className="text-[20px] font-semibold">Insurance Providers</h1>
                        <span className="text-[20px] font-bold">›</span>
                        <Home size={18} />
                        <span>›</span>
                        <span className="text-sm">Insurance</span>
                        <span>›</span>
                        <span className="text-sm">Insurance Providers</span>
                    </div>
                </div>

                <div className="h-auto mt-3">
                    <div className="max-w-full">
                        <div className="bg-[#f8f9fa] rounded-t-xl shadow-md overflow-hidden">
                            {/* Header */}
                            <div className="pr-[15px] pl-[20px] py-[8px] border-b border-gray-200 flex max-[390px]:gap-2 items-center flex-wrap">
                                <div className='flex items-center flex-[35%]'>
                                    <h1 className="m-0 text-[17px] leading-[28px] pr-[10px] font-medium">Insurance Providers</h1>
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
                                        <div className="p-8 text-center text-gray-500">Loading providers...</div>
                                    ) : providers.length === 0 ? (
                                        <div className="p-8 text-center text-gray-500">No providers found</div>
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
                                                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Provider Name</th>
                                                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Provider Code</th>
                                                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Contact Phone</th>
                                                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Contact Email</th>
                                                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Address</th>
                                                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Website URL</th>
                                                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Customer Support Number</th>
                                                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Contract Start Date</th>
                                                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Reimbursement Rate</th>
                                                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Coverage Types</th>
                                                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Status</th>
                                                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Actions</th>
                                                    </tr>
                                                </thead>

                                                <tbody className={`bg-white divide-y divide-gray-200 transition-all duration-500 ${animate ? "animate-slideDown" : ""}`}>
                                                    {providers.map((item) => (
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
                                                                {item.providerName}
                                                            </td>

                                                            <td className="px-4 py-3 whitespace-nowrap text-sm font-mono">
                                                                {item.providerCode}
                                                            </td>

                                                            <td className="px-4 py-3 whitespace-nowrap text-sm">
                                                                <div className="flex items-center gap-2">
                                                                    <Phone className="w-4 h-4 text-green-400" />
                                                                    {item.contactPhone}
                                                                </div>
                                                            </td>

                                                            <td className="px-4 py-3 whitespace-nowrap text-sm">
                                                                <div className="flex items-center gap-2">
                                                                    <Mail className="w-4 h-4 text-red-400" />
                                                                    <a href={`mailto:${item.contactEmail}`} className="hover:underline">
                                                                        {item.contactEmail}
                                                                    </a>
                                                                </div>
                                                            </td>

                                                            <td className="px-4 py-3 text-sm max-w-[200px] truncate">
                                                                <div className="flex items-center gap-2">
                                                                    <MapPin className="w-4 h-4 text-blue-400" />
                                                                    {item.address}
                                                                </div>
                                                            </td>

                                                            <td className="px-4 py-3 whitespace-nowrap text-sm">
                                                                <a href={`https://${item.websiteUrl}`} target="_blank" rel="noopener noreferrer" className="hover:underline">
                                                                    {item.websiteUrl}
                                                                </a>
                                                            </td>

                                                            <td className="px-4 py-3 flex items-center gap-2 whitespace-nowrap text-sm">
                                                                <Phone className="w-4 h-4 text-green-400" />
                                                                {item.customerSupportNumber}
                                                            </td>

                                                            <td className="px-4 py-3 whitespace-nowrap text-sm">
                                                                {item.contractStartDate}
                                                            </td>

                                                            <td className="px-4 py-3 whitespace-nowrap text-sm font-semibold">
                                                                {item.reimbursementRate}
                                                            </td>

                                                            <td className="px-4 py-3 text-sm">
                                                                <div className="flex flex-wrap gap-1">
                                                                    <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                                                                        {item.coverageTypes}
                                                                    </span>
                                                                </div>
                                                            </td>

                                                            <td className="px-4 py-3 whitespace-nowrap">
                                                                <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(item.status)}`}>
                                                                    {item.status}
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
                                                                        onClick={() => deleteProvider(item.id)}
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
                                                {providers.map((item) => (
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
                                                                <span className="font-semibold w-40">Provider Name:</span>
                                                                <span className="font-medium text-blue-600">{item.providerName}</span>
                                                            </div>

                                                            <div className="flex items-center h-13 space-x-3 border-b border-[#dadada] gap-4">
                                                                <span className="font-semibold w-40">Provider Code:</span>
                                                                <span className="font-mono">{item.providerCode}</span>
                                                            </div>

                                                            <div className="flex items-center h-13 space-x-3 border-b border-[#dadada] gap-4">
                                                                <span className="font-semibold w-40">Contact Phone:</span>
                                                                <div className="flex items-center gap-2">
                                                                    <Phone className="w-4 h-4 text-gray-400" />
                                                                    <span>{item.contactPhone}</span>
                                                                </div>
                                                            </div>

                                                            <div className="flex items-center h-13 space-x-3 border-b border-[#dadada] gap-4">
                                                                <span className="font-semibold w-40">Contact Email:</span>
                                                                <div className="flex items-center gap-2">
                                                                    <Mail className="w-4 h-4 text-gray-400" />
                                                                    <a href={`mailto:${item.contactEmail}`} className="text-blue-600 hover:underline">
                                                                        {item.contactEmail}
                                                                    </a>
                                                                </div>
                                                            </div>

                                                            <div className="flex items-center h-13 space-x-3 border-b border-[#dadada] gap-4">
                                                                <span className="font-semibold w-40">Address:</span>
                                                                <div className="flex items-center gap-2">
                                                                    <MapPin className="w-4 h-4 text-gray-400" />
                                                                    <span>{item.address}</span>
                                                                </div>
                                                            </div>

                                                            <div className="flex items-center h-13 space-x-3 border-b border-[#dadada] gap-4">
                                                                <span className="font-semibold w-40">Website:</span>
                                                                <a href={`https://${item.websiteUrl}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                                                                    {item.websiteUrl}
                                                                </a>
                                                            </div>

                                                            <div className="flex items-center h-13 space-x-3 border-b border-[#dadada] gap-4">
                                                                <span className="font-semibold w-40">Support Number:</span>
                                                                <span>{item.customerSupportNumber}</span>
                                                            </div>

                                                            <div className="flex items-center h-13 space-x-3 border-b border-[#dadada] gap-4">
                                                                <span className="font-semibold w-40">Contract Start:</span>
                                                                <span>{item.contractStartDate}</span>
                                                            </div>

                                                            <div className="flex items-center h-13 space-x-3 border-b border-[#dadada] gap-4">
                                                                <span className="font-semibold w-40">Reimbursement Rate:</span>
                                                                <span className="text-green-600 font-semibold">{item.reimbursementRate}</span>
                                                            </div>

                                                            <div className="flex items-center h-13 space-x-3 border-b border-[#dadada] gap-4">
                                                                <span className="font-semibold w-40">Coverage Types:</span>
                                                                <div className="flex flex-wrap gap-1">

                                                                    <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                                                                        {item.coverageTypes}
                                                                    </span>
                                                                </div>
                                                            </div>

                                                            <div className="flex items-center h-13 space-x-3 border-b border-[#dadada] gap-4">
                                                                <span className="font-semibold w-40">Status:</span>
                                                                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(item.status)}`}>
                                                                    {item.status}
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
                                                                        onClick={() => deleteProvider(item.id)}
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
                    <Paginator totalItems={providers.length} />
                </div>
            </div>

            {/* Insurance Provider Modal */}
            <InsuranceProviderModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                mode={modalMode}
                provider={editingProvider}
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