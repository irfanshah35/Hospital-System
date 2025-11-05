'use client';

import { CirclePlus, Download, Home, RotateCw, Trash2, Edit, Clock, Phone, Mail, MapPin } from 'lucide-react';
import React, { useEffect, useState, useRef } from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import Link from 'next/link';

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

export default function ClaimStatusPage() {
    const [detailDropdown, setDetailDropdown] = useState(false);
    const detailref = useRef<HTMLDivElement | null>(null);
    const [selectedIds, setSelectedIds] = useState<number[]>([]);
    const [claims, setClaims] = useState<Claim[]>([]);
    const [animate, setAnimate] = useState(false);
    const [loading, setLoading] = useState(true);

    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
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
        saveAs(blob, "claim_status.xlsx");
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

    const deleteClaim = async (id: number) => {
        try {
            // Simulate API call
            setClaims(prev => prev.filter(claim => claim.id !== id));
            console.log("Claim deleted:", id);
        } catch (error) {
            console.error("Error deleting claim:", error);
        }
    };

    const handleEditClick = (claim: Claim) => {
        setEditingClaim(claim);
        setIsEditModalOpen(true);
    };

    const handleUpdateClaim = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!editingClaim) return;

        try {
            // Simulate API call
            setClaims(prev =>
                prev.map(claim =>
                    claim.id === editingClaim.id ? editingClaim : claim
                )
            );
            alert("Claim updated successfully!");
            setIsEditModalOpen(false);
        } catch (error) {
            console.error("Error updating claim:", error);
            alert("An unexpected error occurred.");
        }
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
                        <div className="bg-[var(--tableHeaderBg)] rounded-t-xl shadow-md overflow-hidden">
                            {/* Header */}
                            <div className="pr-[15px] pl-[20px] py-[8px] border-b border-gray-200 flex max-[390px]:gap-2 items-center flex-wrap">
                                <div className='flex items-center flex-[35%]'>
                                    <h1 className="m-0 text-[17px] leading-[28px] pr-[10px] font-medium">Claim Status</h1>
                                    <label className='relative'>
                                        <input
                                            type="text"
                                            placeholder="Search"
                                            className="w-full md:w-[212px] h-[45px] rounded-[5px] border-0 bg-white text-[14px] font-medium px-[50px] pr-0 py-2 focus:outline-none"
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

                                    <Link href="/add-claim">
                                        <button className="flex justify-center items-center w-10 h-10 rounded-full text-[#4caf50] hover:bg-[#CED5E6] transition cursor-pointer" title="Add">
                                            <CirclePlus className='w-[22px] h-[22px]' />
                                        </button>
                                    </Link>

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
                                                <thead role="rowgroup" className="bg-white">
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

                                                <tbody role='rowgroup' className={`bg-white divide-y divide-gray-200 transition-all duration-500 ${animate ? "animate-slideDown" : ""}`}>
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

                                                            <td className="px-4 py-3 whitespace-nowrap text-sm font-medium ">
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

                                                            <td className="px-4 py-3 whitespace-nowrap text-sm font-semibold ">
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
                                                        {/* Checkbox Row */}
                                                        <div className="flex items-center justify-between mb-3 border-b border-gray-200 p-2">
                                                            <input
                                                                checked={selectedIds.includes(item.id)}
                                                                onChange={() => handleCheckboxChange(item.id)}
                                                                type="checkbox"
                                                                className="w-4 h-4  rounded"
                                                            />
                                                        </div>

                                                        {/* Claim Info */}
                                                        <div className="space-y-2 text-sm">
                                                            <div className="flex items-center gap-3 pb-2 border-b border-gray-200 p-2">
                                                                <span className="font-semibold w-32">Claim ID:</span>
                                                                <span className="text-blue-600 font-medium">{item.claimId}</span>
                                                            </div>

                                                            <div className="flex items-center gap-3 pb-2 border-b border-gray-200 p-2">
                                                                <span className="font-semibold w-32">Patient Name:</span>
                                                                <span>{item.patientName}</span>
                                                            </div>

                                                            <div className="flex items-center gap-3 pb-2 border-b border-gray-200 p-2">
                                                                <span className="font-semibold w-32">Claim Type:</span>
                                                                <span>{item.claimType}</span>
                                                            </div>

                                                            <div className="flex items-center gap-3 pb-2 border-b border-gray-200 p-2">
                                                                <span className="font-semibold w-32">Claim Status:</span>
                                                                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(item.claimStatus)}`}>
                                                                    {item.claimStatus}
                                                                </span>
                                                            </div>

                                                            <div className="flex items-center gap-3 pb-2 border-b border-gray-200 p-2">
                                                                <span className="font-semibold w-32">Doctor Name:</span>
                                                                <span>{item.doctorName}</span>
                                                            </div>

                                                            <div className="flex items-center gap-3 pb-2 border-b border-gray-200 p-2">
                                                                <span className="font-semibold w-32">Hospital Name:</span>
                                                                <span>{item.hospitalName}</span>
                                                            </div>

                                                            <div className="flex items-center gap-3 pb-2 border-b border-gray-200 p-2">
                                                                <span className="font-semibold w-32">Claim Amount:</span>
                                                                <span className="font-semibold">{item.claimAmount}</span>
                                                            </div>

                                                            <div className="flex items-center gap-3 pb-2 border-b border-gray-200 p-2">
                                                                <span className="font-semibold w-32">Approved Amount:</span>
                                                                <span className=" font-semibold">{item.approvedAmount}</span>
                                                            </div>

                                                            <div className="flex items-center gap-3 pb-2 border-b border-gray-200 p-2">
                                                                <span className="font-semibold w-32">Claim Date:</span>
                                                                <span>{item.claimDate}</span>
                                                            </div>

                                                            <div className="flex items-center gap-3 pb-2 border-b border-gray-200 p-2">
                                                                <span className="font-semibold w-32">Rejection Reason:</span>
                                                                <span className="text-red-600">{item.rejectionReason || "-"}</span>
                                                            </div>

                                                            {/* Actions */}
                                                            <div className="flex items-center gap-3 p-2">
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

            {/* Edit Modal */}
            {isEditModalOpen && editingClaim && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999]">
                    <div className="bg-white rounded-lg shadow-lg w-[800px] max-w-[90%] max-h-[90vh] overflow-hidden">
                        <div className="flex items-center justify-between border-b !border-gray-300 px-5 py-3">
                            <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                    </svg>
                                </div>
                                <h2 className="text-lg font-semibold">
                                    Edit Claim - {editingClaim.claimId}
                                </h2>
                            </div>
                            <button
                                onClick={() => setIsEditModalOpen(false)}
                                className="text-gray-600 hover:text-gray-900 text-xl font-bold"
                            >
                                ×
                            </button>
                        </div>

                        <form onSubmit={handleUpdateClaim} className="p-6 space-y-6 max-h-[60vh] overflow-y-auto scrollbar-hide">
                            <div className="grid grid-cols-2 gap-4">
                                {/* Claim ID */}
                                <div className="relative">
                                    <input
                                        type="text"
                                        value={editingClaim.claimId}
                                        onChange={(e) => setEditingClaim({ ...editingClaim, claimId: e.target.value })}
                                        className="peer w-full rounded-md border bg-white px-3 pt-5 pb-2 text-sm text-gray-800 focus:border-[#005CBB] focus:ring-2 focus:ring-[#005CBB] outline-none transition-all"
                                    />
                                    <label className="absolute left-3 px-[4px] bg-white transition-all duration-200 -top-2 text-xs text-[#005CBB]">
                                        Claim ID*
                                    </label>
                                </div>

                                {/* Patient Name */}
                                <div className="relative">
                                    <input
                                        type="text"
                                        value={editingClaim.patientName}
                                        onChange={(e) => setEditingClaim({ ...editingClaim, patientName: e.target.value })}
                                        className="peer w-full rounded-md border bg-white px-3 pt-5 pb-2 text-sm text-gray-800 focus:border-[#005CBB] focus:ring-2 focus:ring-[#005CBB] outline-none transition-all"
                                    />
                                    <label className="absolute left-3 px-[4px] bg-white transition-all duration-200 -top-2 text-xs text-[#005CBB]">
                                        Patient Name*
                                    </label>
                                </div>

                                {/* Claim Type */}
                                <div className="relative">
                                    <select
                                        value={editingClaim.claimType}
                                        onChange={(e) => setEditingClaim({ ...editingClaim, claimType: e.target.value })}
                                        className="peer w-full rounded-md border bg-white px-3 pt-5 pb-2 text-sm text-gray-800 focus:border-[#005CBB] focus:ring-2 focus:ring-[#005CBB] outline-none transition-all"
                                    >
                                        <option value="Medical Treatment">Medical Treatment</option>
                                        <option value="Surgery">Surgery</option>
                                        <option value="Emergency Care">Emergency Care</option>
                                        <option value="Diagnostic Tests">Diagnostic Tests</option>
                                        <option value="Hospital Stay">Hospital Stay</option>
                                        <option value="Medication">Medication</option>
                                    </select>
                                    <label className="absolute left-3 px-[4px] bg-white transition-all duration-200 -top-2 text-xs text-[#005CBB]">
                                        Claim Type*
                                    </label>
                                </div>

                                {/* Claim Status */}
                                <div className="relative">
                                    <select
                                        value={editingClaim.claimStatus}
                                        onChange={(e) => setEditingClaim({ ...editingClaim, claimStatus: e.target.value as any })}
                                        className="peer w-full rounded-md border bg-white px-3 pt-5 pb-2 text-sm text-gray-800 focus:border-[#005CBB] focus:ring-2 focus:ring-[#005CBB] outline-none transition-all"
                                    >
                                        <option value="Pending">Pending</option>
                                        <option value="Approved">Approved</option>
                                        <option value="Rejected">Rejected</option>
                                        <option value="Under Review">Under Review</option>
                                        <option value="Paid">Paid</option>
                                    </select>
                                    <label className="absolute left-3 px-[4px] bg-white transition-all duration-200 -top-2 text-xs text-[#005CBB]">
                                        Claim Status*
                                    </label>
                                </div>

                                {/* Doctor Name */}
                                <div className="relative">
                                    <input
                                        type="text"
                                        value={editingClaim.doctorName}
                                        onChange={(e) => setEditingClaim({ ...editingClaim, doctorName: e.target.value })}
                                        className="peer w-full rounded-md border bg-white px-3 pt-5 pb-2 text-sm text-gray-800 focus:border-[#005CBB] focus:ring-2 focus:ring-[#005CBB] outline-none transition-all"
                                    />
                                    <label className="absolute left-3 px-[4px] bg-white transition-all duration-200 -top-2 text-xs text-[#005CBB]">
                                        Doctor Name*
                                    </label>
                                </div>

                                {/* Hospital Name */}
                                <div className="relative">
                                    <input
                                        type="text"
                                        value={editingClaim.hospitalName}
                                        onChange={(e) => setEditingClaim({ ...editingClaim, hospitalName: e.target.value })}
                                        className="peer w-full rounded-md border bg-white px-3 pt-5 pb-2 text-sm text-gray-800 focus:border-[#005CBB] focus:ring-2 focus:ring-[#005CBB] outline-none transition-all"
                                    />
                                    <label className="absolute left-3 px-[4px] bg-white transition-all duration-200 -top-2 text-xs text-[#005CBB]">
                                        Hospital Name*
                                    </label>
                                </div>

                                {/* Claim Amount */}
                                <div className="relative">
                                    <input
                                        type="text"
                                        value={editingClaim.claimAmount}
                                        onChange={(e) => setEditingClaim({ ...editingClaim, claimAmount: e.target.value })}
                                        className="peer w-full rounded-md border bg-white px-3 pt-5 pb-2 text-sm text-gray-800 focus:border-[#005CBB] focus:ring-2 focus:ring-[#005CBB] outline-none transition-all"
                                    />
                                    <label className="absolute left-3 px-[4px] bg-white transition-all duration-200 -top-2 text-xs text-[#005CBB]">
                                        Claim Amount*
                                    </label>
                                </div>

                                {/* Approved Amount */}
                                <div className="relative">
                                    <input
                                        type="text"
                                        value={editingClaim.approvedAmount}
                                        onChange={(e) => setEditingClaim({ ...editingClaim, approvedAmount: e.target.value })}
                                        className="peer w-full rounded-md border bg-white px-3 pt-5 pb-2 text-sm text-gray-800 focus:border-[#005CBB] focus:ring-2 focus:ring-[#005CBB] outline-none transition-all"
                                    />
                                    <label className="absolute left-3 px-[4px] bg-white transition-all duration-200 -top-2 text-xs text-[#005CBB]">
                                        Approved Amount*
                                    </label>
                                </div>

                                {/* Claim Date */}
                                <div className="relative">
                                    <input
                                        type="date"
                                        value={editingClaim.claimDate}
                                        onChange={(e) => setEditingClaim({ ...editingClaim, claimDate: e.target.value })}
                                        className="peer w-full rounded-md border bg-white px-3 pt-5 pb-2 text-sm text-gray-800 focus:border-[#005CBB] focus:ring-2 focus:ring-[#005CBB] outline-none transition-all"
                                    />
                                    <label className="absolute left-3 px-[4px] bg-white transition-all duration-200 -top-2 text-xs text-[#005CBB]">
                                        Claim Date*
                                    </label>
                                </div>
                            </div>

                            {/* Rejection Reason */}
                            <div className="relative">
                                <textarea
                                    value={editingClaim.rejectionReason}
                                    onChange={(e) => setEditingClaim({ ...editingClaim, rejectionReason: e.target.value })}
                                    placeholder=" "
                                    rows={3}
                                    className="peer w-full rounded-md border bg-white px-3 pt-5 pb-2 text-sm resize-none text-gray-800 focus:border-[#005CBB] focus:ring-2 focus:ring-[#005CBB] outline-none transition-all"
                                ></textarea>
                                <label className="absolute left-3 px-[4px] bg-white transition-all duration-200 -top-2 text-xs text-[#005CBB]">
                                    Rejection Reason
                                </label>
                            </div>

                            {/* Submit Buttons */}
                            <div className="flex gap-2 pt-3">
                                <button
                                    type="submit"
                                    className="bg-[#005cbb] text-white px-6 py-2 rounded-full text-sm font-medium transition hover:bg-[#004a9b]"
                                >
                                    Save Changes
                                </button>
                                <button
                                    onClick={() => setIsEditModalOpen(false)}
                                    type="button"
                                    className="bg-[#ba1a1a] text-white px-6 py-2 rounded-full text-sm font-medium transition hover:bg-[#9b1515]"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <style jsx>{`
                @keyframes slideDown {
                    0% { transform: translateY(-20px); opacity: 0; }
                    100% { transform: translateY(0); opacity: 1; }
                }
                .animate-slideDown { animation: slideDown 0.4s ease-in-out; }
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