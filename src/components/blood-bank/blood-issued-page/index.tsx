'use client';

import { CirclePlus, Download, Home, RotateCw, Trash2, Edit, Clock, Phone, Mail, MapPin, User, Calendar } from 'lucide-react';
import React, { useEffect, useState, useRef } from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import Link from 'next/link';

interface BloodIssued {
    id: number;
    issueId: string;
    patientId: string;
    patientName: string;
    patientAge: number;
    patientGender: "Male" | "Female";
    bloodProductId: string;
    bloodType: string;
    componentType: string;
    quantityIssued: number;
    issueDate: string;
    issuedBy: string;
    issueReason: string;
    patientBloodGroup: string;
    doctorName: string;
}

export default function BloodIssuedPage() {
    const [detailDropdown, setDetailDropdown] = useState(false);
    const detailref = useRef<HTMLDivElement | null>(null);
    const [selectedIds, setSelectedIds] = useState<number[]>([]);
    const [bloodIssued, setBloodIssued] = useState<BloodIssued[]>([]);
    const [animate, setAnimate] = useState(false);
    const [loading, setLoading] = useState(true);

    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<BloodIssued | null>(null);

    // Blood Issued Data Array
    const bloodIssuedData: BloodIssued[] = [
        {
            id: 1,
            issueId: "ISS001",
            patientId: "PAT001",
            patientName: "John Smith",
            patientAge: 45,
            patientGender: "Male",
            bloodProductId: "BP001",
            bloodType: "O+",
            componentType: "Red Blood Cells",
            quantityIssued: 2,
            issueDate: "2024-10-15",
            issuedBy: "Dr. Sarah Wilson",
            issueReason: "Surgery - Coronary Bypass",
            patientBloodGroup: "O+",
            doctorName: "Dr. Michael Brown"
        },
        {
            id: 2,
            issueId: "ISS002",
            patientId: "PAT002",
            patientName: "Emily Johnson",
            patientAge: 32,
            patientGender: "Female",
            bloodProductId: "BP002",
            bloodType: "A+",
            componentType: "Platelets",
            quantityIssued: 1,
            issueDate: "2024-10-16",
            issuedBy: "Dr. Robert Davis",
            issueReason: "Chemotherapy Support",
            patientBloodGroup: "A+",
            doctorName: "Dr. Lisa Anderson"
        },
        {
            id: 3,
            issueId: "ISS003",
            patientId: "PAT003",
            patientName: "Michael Brown",
            patientAge: 58,
            patientGender: "Male",
            bloodProductId: "BP003",
            bloodType: "B-",
            componentType: "Plasma",
            quantityIssued: 3,
            issueDate: "2024-10-17",
            issuedBy: "Dr. Jennifer Miller",
            issueReason: "Liver Transplant",
            patientBloodGroup: "B-",
            doctorName: "Dr. David Wilson"
        },
        {
            id: 4,
            issueId: "ISS004",
            patientId: "PAT004",
            patientName: "Sarah Davis",
            patientAge: 28,
            patientGender: "Female",
            bloodProductId: "BP004",
            bloodType: "AB+",
            componentType: "Whole Blood",
            quantityIssued: 1,
            issueDate: "2024-10-18",
            issuedBy: "Dr. James Taylor",
            issueReason: "Accident - Blood Loss",
            patientBloodGroup: "AB+",
            doctorName: "Dr. Amanda Clark"
        },
        {
            id: 5,
            issueId: "ISS005",
            patientId: "PAT005",
            patientName: "Robert Wilson",
            patientAge: 65,
            patientGender: "Male",
            bloodProductId: "BP005",
            bloodType: "O-",
            componentType: "Cryoprecipitate",
            quantityIssued: 2,
            issueDate: "2024-10-19",
            issuedBy: "Dr. Patricia Moore",
            issueReason: "Hemophilia Treatment",
            patientBloodGroup: "O-",
            doctorName: "Dr. Richard Lee"
        },
        {
            id: 6,
            issueId: "ISS006",
            patientId: "PAT006",
            patientName: "Lisa Anderson",
            patientAge: 42,
            patientGender: "Female",
            bloodProductId: "BP006",
            bloodType: "A-",
            componentType: "Red Blood Cells",
            quantityIssued: 2,
            issueDate: "2024-10-20",
            issuedBy: "Dr. Kevin Martin",
            issueReason: "Anemia Treatment",
            patientBloodGroup: "A-",
            doctorName: "Dr. Susan White"
        },
        {
            id: 7,
            issueId: "ISS007",
            patientId: "PAT007",
            patientName: "David Miller",
            patientAge: 35,
            patientGender: "Male",
            bloodProductId: "BP007",
            bloodType: "B+",
            componentType: "Platelets",
            quantityIssued: 1,
            issueDate: "2024-10-21",
            issuedBy: "Dr. Nancy Harris",
            issueReason: "Dengue Fever",
            patientBloodGroup: "B+",
            doctorName: "Dr. Thomas Young"
        },
        {
            id: 8,
            issueId: "ISS008",
            patientId: "PAT008",
            patientName: "Jennifer Taylor",
            patientAge: 50,
            patientGender: "Female",
            bloodProductId: "BP008",
            bloodType: "AB-",
            componentType: "Plasma",
            quantityIssued: 2,
            issueDate: "2024-10-22",
            issuedBy: "Dr. Paul Walker",
            issueReason: "Burn Treatment",
            patientBloodGroup: "AB-",
            doctorName: "Dr. Karen King"
        }
    ];

    // Fetch data from API (simulated)
    const fetchBloodIssued = async () => {
        setLoading(true);
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            setBloodIssued(bloodIssuedData);
        } catch (error) {
            console.error("Failed to fetch blood issued records:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBloodIssued();
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
        fetchBloodIssued().then(() => {
            setTimeout(() => setAnimate(false), 300);
        });
    };

    const handleDownloadXLSX = () => {
        const worksheet = XLSX.utils.json_to_sheet(
            bloodIssued.map((item) => ({
                "Issue ID": item.issueId,
                "Patient ID": item.patientId,
                "Patient Name": item.patientName,
                "Patient Age": item.patientAge,
                "Patient Gender": item.patientGender,
                "Blood Product ID": item.bloodProductId,
                "Blood Type": item.bloodType,
                "Component Type": item.componentType,
                "Quantity Issued": item.quantityIssued,
                "Issue Date": item.issueDate,
                "Issued By": item.issuedBy,
                "Issue Reason": item.issueReason,
                "Patient Blood Group": item.patientBloodGroup,
                "Doctor Name": item.doctorName,
            }))
        );

        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Blood Issued");
        const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
        const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
        saveAs(blob, "blood-issued.xlsx");
    };

    const removeData = () => {
        if (selectedIds.length === 0) {
            alert("Please select at least one record to delete.");
            return;
        }
        if (window.confirm(`Delete ${selectedIds.length} record(s)?`)) {
            setBloodIssued(prev => prev.filter(item => !selectedIds.includes(item.id)));
            setSelectedIds([]);
        }
    };

    const handleCheckboxChange = (id: number) => {
        setSelectedIds(prev =>
            prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
        );
    };

    const handleSelectAll = (checked: boolean) => {
        setSelectedIds(checked ? bloodIssued.map(item => item.id) : []);
    };

    useEffect(() => {
        const selectAllCheckbox = document.getElementById("selectAll") as HTMLInputElement;
        if (selectAllCheckbox) {
            selectAllCheckbox.indeterminate =
                selectedIds.length > 0 && selectedIds.length < bloodIssued.length;
        }
    }, [selectedIds, bloodIssued]);

    const checkboxItems = [
        { label: "Checkbox", checked: true },
        { label: "Issue ID", checked: true },
        { label: "Patient ID", checked: true },
        { label: "Patient Name", checked: true },
        { label: "Patient Age", checked: true },
        { label: "Patient Gender", checked: true },
        { label: "Blood Product ID", checked: true },
        { label: "Blood Type", checked: true },
        { label: "Component Type", checked: true },
        { label: "Quantity Issued", checked: true },
        { label: "Issue Date", checked: true },
        { label: "Issued By", checked: true },
        { label: "Issue Reason", checked: true },
        { label: "Patient Blood Group", checked: true },
        { label: "Doctor Name", checked: true },
        { label: "Actions", checked: true },
    ];

    const deleteSelectedItem = async (id: any) => {
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 500));
            setBloodIssued(prev => prev.filter(item => item.id !== id));
            console.log("Blood issued record deleted:", id);
        } catch (error) {
            console.error("Error deleting blood issued record:", error);
        }
    };

    const handleEditClick = (item: BloodIssued) => {
        setEditingItem(item);
        setIsEditModalOpen(true);
    };

    const handleUpdateItem = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 500));
            
            setBloodIssued(prev => 
                prev.map(item => 
                    item.id === editingItem?.id ? editingItem : item
                )
            );
            
            alert("Blood issued record updated successfully!");
            setIsEditModalOpen(false);
        } catch (error) {
            console.error("Error updating blood issued record:", error);
            alert("An unexpected error occurred.");
        }
    };

    return (
        <>
            <div className='px-4 sm:px-6 py-[20px] mt-0'>
                <div className="flex items-center justify-between relative top-[-5px]">
                    <div className="flex items-center flex-wrap space-x-2">
                        <h1 className="text-[20px] font-semibold">Blood Issued</h1>
                        <span className="text-[20px] font-bold">›</span>
                        <Home size={18} />
                        <span>›</span>
                        <span className="text-sm">Blood Bank</span>
                        <span>›</span>
                        <span className="text-sm">Blood Issued</span>
                    </div>
                </div>

                <div className="h-auto mt-3">
                    <div className="max-w-full">
                        <div className="bg-[var(--tableHeaderBg)] rounded-t-xl shadow-md overflow-hidden">
                            {/* Header */}
                            <div className="pr-[15px] pl-[20px] py-[8px] border-b border-gray-200 flex max-[390px]:gap-2 items-center flex-wrap">
                                <div className='flex items-center flex-[35%]'>
                                    <h1 className="m-0 text-[17px] leading-[28px] pr-[10px] font-medium">Blood Issued</h1>
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

                                    <Link href="/add-blood-issued">
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
                                        <div className="p-8 text-center text-gray-500">Loading blood issued records...</div>
                                    ) : bloodIssued.length === 0 ? (
                                        <div className="p-8 text-center text-gray-500">No blood issued records found</div>
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
                                                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Issue ID</th>
                                                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Patient ID</th>
                                                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Patient Name</th>
                                                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Patient Age</th>
                                                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Patient Gender</th>
                                                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Blood Product ID</th>
                                                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Blood Type</th>
                                                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Component Type</th>
                                                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Quantity Issued</th>
                                                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Issue Date</th>
                                                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Issued By</th>
                                                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Issue Reason</th>
                                                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Patient Blood Group</th>
                                                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Doctor Name</th>
                                                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Actions</th>
                                                    </tr>
                                                </thead>

                                                <tbody role='rowgroup' className={`bg-white divide-y divide-gray-200 transition-all duration-500 ${animate ? "animate-slideDown" : ""}`}>
                                                    {bloodIssued.map((item) => (
                                                        <tr key={item.id} className="transition-colors duration-150 hover:bg-gray-50">
                                                            <td className="px-4 py-3 pl-[37px]">
                                                                <input
                                                                    type="checkbox"
                                                                    checked={selectedIds.includes(item.id)}
                                                                    onChange={() => handleCheckboxChange(item.id)}
                                                                    className="h-[18px] w-[18px] rounded-[2px] border-[2px] border-[#1a1b1f]"
                                                                />
                                                            </td>

                                                            <td className="px-4 py-3 whitespace-nowrap">
                                                                <div className="text-sm font-medium">
                                                                    {item.issueId}
                                                                </div>
                                                            </td>

                                                            <td className="px-4 py-3 whitespace-nowrap">
                                                                <div className="text-sm font-medium">
                                                                    {item.patientId}
                                                                </div>
                                                            </td>

                                                            <td className="px-4 py-3 whitespace-nowrap">
                                                                <div className="text-sm font-medium flex items-center gap-2">
                                                                    <User className="w-4 h-4 text-gray-600" />
                                                                    {item.patientName}
                                                                </div>
                                                            </td>

                                                            <td className="px-4 py-3 whitespace-nowrap">
                                                                <div className="text-sm">
                                                                    {item.patientAge} years
                                                                </div>
                                                            </td>

                                                            <td className="px-4 py-3 whitespace-nowrap">
                                                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                                                    item.patientGender === "Male" ? "bg-blue-100 text-blue-800" : "bg-pink-100 text-pink-800"
                                                                }`}>
                                                                    {item.patientGender}
                                                                </span>
                                                            </td>

                                                            <td className="px-4 py-3 whitespace-nowrap">
                                                                <div className="text-sm font-medium">
                                                                    {item.bloodProductId}
                                                                </div>
                                                            </td>

                                                            <td className="px-4 py-3 whitespace-nowrap">
                                                                <span className={`px-2 py-1 rounded-full text-xs font-medium `}>
                                                                    {item.bloodType}
                                                                </span>
                                                            </td>

                                                            <td className="px-4 py-3 whitespace-nowrap">
                                                                <div className="text-sm">
                                                                    {item.componentType}
                                                                </div>
                                                            </td>

                                                            <td className="px-4 py-3 whitespace-nowrap">
                                                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                                                    item.quantityIssued > 2 ? 'bg-red-100 text-red-800' : 
                                                                    item.quantityIssued > 1 ? 'bg-yellow-100 text-yellow-800' :
                                                                    'bg-green-100 text-green-800'
                                                                }`}>
                                                                    {item.quantityIssued} units
                                                                </span>
                                                            </td>

                                                            <td className="px-4 py-3 whitespace-nowrap">
                                                                <div className="text-sm flex items-center gap-2">
                                                                    <Calendar className="w-4 h-4 text-gray-600" />
                                                                    {item.issueDate}
                                                                </div>
                                                            </td>

                                                            <td className="px-4 py-3 whitespace-nowrap">
                                                                <div className="text-sm">
                                                                    {item.issuedBy}
                                                                </div>
                                                            </td>

                                                            <td className="px-4 py-3 whitespace-nowrap">
                                                                <div className="text-sm max-w-[200px] truncate" title={item.issueReason}>
                                                                    {item.issueReason}
                                                                </div>
                                                            </td>

                                                            <td className="px-4 py-3 whitespace-nowrap">
                                                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                                                    item.patientBloodGroup.includes('O') ? 'bg-red-100 text-red-800' : 
                                                                    item.patientBloodGroup.includes('A') ? 'bg-blue-100 text-blue-800' :
                                                                    item.patientBloodGroup.includes('B') ? 'bg-green-100 text-green-800' :
                                                                    'bg-purple-100 text-purple-800'
                                                                }`}>
                                                                    {item.patientBloodGroup}
                                                                </span>
                                                            </td>

                                                            <td className="px-4 py-3 whitespace-nowrap">
                                                                <div className="text-sm">
                                                                    {item.doctorName}
                                                                </div>
                                                            </td>

                                                            <td className="px-4 py-3 whitespace-nowrap">
                                                                <div className="flex space-x-2">
                                                                    <button 
                                                                        onClick={() => handleEditClick(item)} 
                                                                        className="text-[#6777ef] hover:bg-[#E0E1E3] p-1 rounded-full cursor-pointer"
                                                                    >
                                                                        <Edit className="w-5 h-5" />
                                                                    </button>
                                                                    <button 
                                                                        onClick={() => deleteSelectedItem(item.id)} 
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
                                                {bloodIssued.map((item) => (
                                                    <div key={item.id} className="border-b border-gray-200 py-4">
                                                        {/* Checkbox Row */}
                                                        <div className="flex items-center justify-between mb-3 border-b border-gray-200 p-2">
                                                            <input
                                                                checked={selectedIds.includes(item.id)}
                                                                onChange={() => handleCheckboxChange(item.id)}
                                                                type="checkbox"
                                                                className="w-4 h-4 text-blue-600 rounded"
                                                            />
                                                        </div>

                                                        {/* Blood Issued Info */}
                                                        <div className="space-y-2 text-sm">
                                                            {/* Issue ID */}
                                                            <div className="flex items-center gap-3 pb-2 border-b border-gray-200 p-2">
                                                                <span className="font-semibold w-32">Issue ID:</span>
                                                                <span className="font-medium text-blue-600">{item.issueId}</span>
                                                            </div>

                                                            {/* Patient ID */}
                                                            <div className="flex items-center gap-3 pb-2 border-b border-gray-200 p-2">
                                                                <span className="font-semibold w-32">Patient ID:</span>
                                                                <span className="font-medium text-green-600">{item.patientId}</span>
                                                            </div>

                                                            {/* Patient Name */}
                                                            <div className="flex items-center gap-3 pb-2 border-b border-gray-200 p-2">
                                                                <span className="font-semibold w-32">Patient Name:</span>
                                                                <div className="flex items-center gap-2">
                                                                    <User className="w-4 h-4 text-gray-600" />
                                                                    <span className="font-medium">{item.patientName}</span>
                                                                </div>
                                                            </div>

                                                            {/* Patient Age */}
                                                            <div className="flex items-center gap-3 pb-2 border-b border-gray-200 p-2">
                                                                <span className="font-semibold w-32">Patient Age:</span>
                                                                <span>{item.patientAge} years</span>
                                                            </div>

                                                            {/* Patient Gender */}
                                                            <div className="flex items-center gap-3 pb-2 border-b border-gray-200 p-2">
                                                                <span className="font-semibold w-32">Gender:</span>
                                                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                                                    item.patientGender === "Male" ? "bg-blue-100 text-blue-800" : "bg-pink-100 text-pink-800"
                                                                }`}>
                                                                    {item.patientGender}
                                                                </span>
                                                            </div>

                                                            {/* Blood Product ID */}
                                                            <div className="flex items-center gap-3 pb-2 border-b border-gray-200 p-2">
                                                                <span className="font-semibold w-32">Blood Product ID:</span>
                                                                <span className="font-medium text-purple-600">{item.bloodProductId}</span>
                                                            </div>

                                                            {/* Blood Type */}
                                                            <div className="flex items-center gap-3 pb-2 border-b border-gray-200 p-2">
                                                                <span className="font-semibold w-32">Blood Type:</span>
                                                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                                                    item.bloodType.includes('O') ? 'bg-red-100 text-red-800' : 
                                                                    item.bloodType.includes('A') ? 'bg-blue-100 text-blue-800' :
                                                                    item.bloodType.includes('B') ? 'bg-green-100 text-green-800' :
                                                                    'bg-purple-100 text-purple-800'
                                                                }`}>
                                                                    {item.bloodType}
                                                                </span>
                                                            </div>

                                                            {/* Component Type */}
                                                            <div className="flex items-center gap-3 pb-2 border-b border-gray-200 p-2">
                                                                <span className="font-semibold w-32">Component Type:</span>
                                                                <span>{item.componentType}</span>
                                                            </div>

                                                            {/* Quantity Issued */}
                                                            <div className="flex items-center gap-3 pb-2 border-b border-gray-200 p-2">
                                                                <span className="font-semibold w-32">Quantity Issued:</span>
                                                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                                                    item.quantityIssued > 2 ? 'bg-red-100 text-red-800' : 
                                                                    item.quantityIssued > 1 ? 'bg-yellow-100 text-yellow-800' :
                                                                    'bg-green-100 text-green-800'
                                                                }`}>
                                                                    {item.quantityIssued} units
                                                                </span>
                                                            </div>

                                                            {/* Issue Date */}
                                                            <div className="flex items-center gap-3 pb-2 border-b border-gray-200 p-2">
                                                                <span className="font-semibold w-32">Issue Date:</span>
                                                                <div className="flex items-center gap-2">
                                                                    <Calendar className="w-4 h-4 text-gray-600" />
                                                                    <span>{item.issueDate}</span>
                                                                </div>
                                                            </div>

                                                            {/* Issued By */}
                                                            <div className="flex items-center gap-3 pb-2 border-b border-gray-200 p-2">
                                                                <span className="font-semibold w-32">Issued By:</span>
                                                                <span>{item.issuedBy}</span>
                                                            </div>

                                                            {/* Issue Reason */}
                                                            <div className="flex items-center gap-3 pb-2 border-b border-gray-200 p-2">
                                                                <span className="font-semibold w-32">Issue Reason:</span>
                                                                <span>{item.issueReason}</span>
                                                            </div>

                                                            {/* Patient Blood Group */}
                                                            <div className="flex items-center gap-3 pb-2 border-b border-gray-200 p-2">
                                                                <span className="font-semibold w-32">Patient Blood Group:</span>
                                                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                                                    item.patientBloodGroup.includes('O') ? 'bg-red-100 text-red-800' : 
                                                                    item.patientBloodGroup.includes('A') ? 'bg-blue-100 text-blue-800' :
                                                                    item.patientBloodGroup.includes('B') ? 'bg-green-100 text-green-800' :
                                                                    'bg-purple-100 text-purple-800'
                                                                }`}>
                                                                    {item.patientBloodGroup}
                                                                </span>
                                                            </div>

                                                            {/* Doctor Name */}
                                                            <div className="flex items-center gap-3 pb-2 border-b border-gray-200 p-2">
                                                                <span className="font-semibold w-32">Doctor Name:</span>
                                                                <span>{item.doctorName}</span>
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
                                                                        onClick={() => deleteSelectedItem(item.id)}
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
                    <Paginator totalItems={bloodIssued.length} />
                </div>
            </div>

            {/* Edit Modal */}
            {isEditModalOpen && editingItem && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999]">
                    <div className="bg-white rounded-lg shadow-lg w-[600px] max-w-[90%] max-h-[90vh] overflow-hidden">
                        <div className="flex items-center justify-between border-b !border-gray-300 px-5 py-3">
                            <h2 className="text-lg font-semibold">
                                Edit Blood Issued - {editingItem.issueId}
                            </h2>
                            <button
                                onClick={() => setIsEditModalOpen(false)}
                                className="text-gray-600 hover:text-gray-900 text-xl font-bold"
                            >
                                ×
                            </button>
                        </div>

                        <form onSubmit={handleUpdateItem} className="p-6 space-y-4 max-h-[60vh] overflow-y-auto scrollbar-hide">
                            <div className="grid grid-cols-2 gap-4">
                                {/* Issue ID */}
                                <div className="relative">
                                    <input
                                        type="text"
                                        value={editingItem.issueId}
                                        onChange={(e) => setEditingItem({...editingItem, issueId: e.target.value})}
                                        className="peer w-full rounded-md border bg-white px-3 pt-5 pb-2 text-sm text-gray-800 focus:border-[#005CBB] focus:ring-2 focus:ring-[#005CBB] outline-none transition-all"
                                    />
                                    <label className="absolute left-3 px-1 bg-white transition-all duration-200 -top-2 text-xs text-[#005CBB]">
                                        Issue ID*
                                    </label>
                                </div>

                                {/* Patient ID */}
                                <div className="relative">
                                    <input
                                        type="text"
                                        value={editingItem.patientId}
                                        onChange={(e) => setEditingItem({...editingItem, patientId: e.target.value})}
                                        className="peer w-full rounded-md border bg-white px-3 pt-5 pb-2 text-sm text-gray-800 focus:border-[#005CBB] focus:ring-2 focus:ring-[#005CBB] outline-none transition-all"
                                    />
                                    <label className="absolute left-3 px-1 bg-white transition-all duration-200 -top-2 text-xs text-[#005CBB]">
                                        Patient ID*
                                    </label>
                                </div>

                                {/* Patient Name */}
                                <div className="relative">
                                    <input
                                        type="text"
                                        value={editingItem.patientName}
                                        onChange={(e) => setEditingItem({...editingItem, patientName: e.target.value})}
                                        className="peer w-full rounded-md border bg-white px-3 pt-5 pb-2 text-sm text-gray-800 focus:border-[#005CBB] focus:ring-2 focus:ring-[#005CBB] outline-none transition-all"
                                    />
                                    <label className="absolute left-3 px-1 bg-white transition-all duration-200 -top-2 text-xs text-[#005CBB]">
                                        Patient Name*
                                    </label>
                                </div>

                                {/* Patient Age */}
                                <div className="relative">
                                    <input
                                        type="number"
                                        value={editingItem.patientAge}
                                        onChange={(e) => setEditingItem({...editingItem, patientAge: parseInt(e.target.value)})}
                                        className="peer w-full rounded-md border bg-white px-3 pt-5 pb-2 text-sm text-gray-800 focus:border-[#005CBB] focus:ring-2 focus:ring-[#005CBB] outline-none transition-all"
                                    />
                                    <label className="absolute left-3 px-1 bg-white transition-all duration-200 -top-2 text-xs text-[#005CBB]">
                                        Patient Age*
                                    </label>
                                </div>

                                {/* Patient Gender */}
                                <div className="relative">
                                    <select
                                        value={editingItem.patientGender}
                                        onChange={(e) => setEditingItem({...editingItem, patientGender: e.target.value as "Male" | "Female"})}
                                        className="peer w-full rounded-md border bg-white px-3 pt-5 pb-2 text-sm text-gray-800 focus:border-[#005CBB] focus:ring-2 focus:ring-[#005CBB] outline-none transition-all"
                                    >
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                    </select>
                                    <label className="absolute left-3 px-1 bg-white transition-all duration-200 -top-2 text-xs text-[#005CBB]">
                                        Patient Gender*
                                    </label>
                                </div>

                                {/* Blood Product ID */}
                                <div className="relative">
                                    <input
                                        type="text"
                                        value={editingItem.bloodProductId}
                                        onChange={(e) => setEditingItem({...editingItem, bloodProductId: e.target.value})}
                                        className="peer w-full rounded-md border bg-white px-3 pt-5 pb-2 text-sm text-gray-800 focus:border-[#005CBB] focus:ring-2 focus:ring-[#005CBB] outline-none transition-all"
                                    />
                                    <label className="absolute left-3 px-1 bg-white transition-all duration-200 -top-2 text-xs text-[#005CBB]">
                                        Blood Product ID*
                                    </label>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                {/* Blood Type */}
                                <div className="relative">
                                    <select
                                        value={editingItem.bloodType}
                                        onChange={(e) => setEditingItem({...editingItem, bloodType: e.target.value})}
                                        className="peer w-full rounded-md border bg-white px-3 pt-5 pb-2 text-sm text-gray-800 focus:border-[#005CBB] focus:ring-2 focus:ring-[#005CBB] outline-none transition-all"
                                    >
                                        <option value="O+">O+</option>
                                        <option value="O-">O-</option>
                                        <option value="A+">A+</option>
                                        <option value="A-">A-</option>
                                        <option value="B+">B+</option>
                                        <option value="B-">B-</option>
                                        <option value="AB+">AB+</option>
                                        <option value="AB-">AB-</option>
                                    </select>
                                    <label className="absolute left-3 px-1 bg-white transition-all duration-200 -top-2 text-xs text-[#005CBB]">
                                        Blood Type*
                                    </label>
                                </div>

                                {/* Component Type */}
                                <div className="relative">
                                    <select
                                        value={editingItem.componentType}
                                        onChange={(e) => setEditingItem({...editingItem, componentType: e.target.value})}
                                        className="peer w-full rounded-md border bg-white px-3 pt-5 pb-2 text-sm text-gray-800 focus:border-[#005CBB] focus:ring-2 focus:ring-[#005CBB] outline-none transition-all"
                                    >
                                        <option value="Whole Blood">Whole Blood</option>
                                        <option value="Red Blood Cells">Red Blood Cells</option>
                                        <option value="Platelets">Platelets</option>
                                        <option value="Plasma">Plasma</option>
                                        <option value="Cryoprecipitate">Cryoprecipitate</option>
                                    </select>
                                    <label className="absolute left-3 px-1 bg-white transition-all duration-200 -top-2 text-xs text-[#005CBB]">
                                        Component Type*
                                    </label>
                                </div>

                                {/* Quantity Issued */}
                                <div className="relative">
                                    <input
                                        type="number"
                                        value={editingItem.quantityIssued}
                                        onChange={(e) => setEditingItem({...editingItem, quantityIssued: parseInt(e.target.value)})}
                                        className="peer w-full rounded-md border bg-white px-3 pt-5 pb-2 text-sm text-gray-800 focus:border-[#005CBB] focus:ring-2 focus:ring-[#005CBB] outline-none transition-all"
                                    />
                                    <label className="absolute left-3 px-1 bg-white transition-all duration-200 -top-2 text-xs text-[#005CBB]">
                                        Quantity Issued*
                                    </label>
                                </div>

                                {/* Issue Date */}
                                <div className="relative">
                                    <input
                                        type="date"
                                        value={editingItem.issueDate}
                                        onChange={(e) => setEditingItem({...editingItem, issueDate: e.target.value})}
                                        className="peer w-full rounded-md border bg-white px-3 pt-5 pb-2 text-sm text-gray-800 focus:border-[#005CBB] focus:ring-2 focus:ring-[#005CBB] outline-none transition-all"
                                    />
                                    <label className="absolute left-3 px-1 bg-white transition-all duration-200 -top-2 text-xs text-[#005CBB]">
                                        Issue Date*
                                    </label>
                                </div>

                                {/* Issued By */}
                                <div className="relative">
                                    <input
                                        type="text"
                                        value={editingItem.issuedBy}
                                        onChange={(e) => setEditingItem({...editingItem, issuedBy: e.target.value})}
                                        className="peer w-full rounded-md border bg-white px-3 pt-5 pb-2 text-sm text-gray-800 focus:border-[#005CBB] focus:ring-2 focus:ring-[#005CBB] outline-none transition-all"
                                    />
                                    <label className="absolute left-3 px-1 bg-white transition-all duration-200 -top-2 text-xs text-[#005CBB]">
                                        Issued By*
                                    </label>
                                </div>

                                {/* Patient Blood Group */}
                                <div className="relative">
                                    <select
                                        value={editingItem.patientBloodGroup}
                                        onChange={(e) => setEditingItem({...editingItem, patientBloodGroup: e.target.value})}
                                        className="peer w-full rounded-md border bg-white px-3 pt-5 pb-2 text-sm text-gray-800 focus:border-[#005CBB] focus:ring-2 focus:ring-[#005CBB] outline-none transition-all"
                                    >
                                        <option value="O+">O+</option>
                                        <option value="O-">O-</option>
                                        <option value="A+">A+</option>
                                        <option value="A-">A-</option>
                                        <option value="B+">B+</option>
                                        <option value="B-">B-</option>
                                        <option value="AB+">AB+</option>
                                        <option value="AB-">AB-</option>
                                    </select>
                                    <label className="absolute left-3 px-1 bg-white transition-all duration-200 -top-2 text-xs text-[#005CBB]">
                                        Patient Blood Group*
                                    </label>
                                </div>
                            </div>

                            {/* Issue Reason */}
                            <div className="relative">
                                <input
                                    type="text"
                                    value={editingItem.issueReason}
                                    onChange={(e) => setEditingItem({...editingItem, issueReason: e.target.value})}
                                    className="peer w-full rounded-md border bg-white px-3 pt-5 pb-2 text-sm text-gray-800 focus:border-[#005CBB] focus:ring-2 focus:ring-[#005CBB] outline-none transition-all"
                                />
                                <label className="absolute left-3 px-1 bg-white transition-all duration-200 -top-2 text-xs text-[#005CBB]">
                                    Issue Reason*
                                </label>
                            </div>

                            {/* Doctor Name */}
                            <div className="relative">
                                <input
                                    type="text"
                                    value={editingItem.doctorName}
                                    onChange={(e) => setEditingItem({...editingItem, doctorName: e.target.value})}
                                    className="peer w-full rounded-md border bg-white px-3 pt-5 pb-2 text-sm text-gray-800 focus:border-[#005CBB] focus:ring-2 focus:ring-[#005CBB] outline-none transition-all"
                                />
                                <label className="absolute left-3 px-1 bg-white transition-all duration-200 -top-2 text-xs text-[#005CBB]">
                                    Doctor Name*
                                </label>
                            </div>

                            {/* Submit Buttons */}
                            <div className="flex gap-2 pt-4">
                                <button
                                    type="submit"
                                    className="bg-[#005cbb] text-white px-6 py-2 rounded-full text-sm font-medium transition"
                                >
                                    Save Changes
                                </button>
                                <button
                                    onClick={() => setIsEditModalOpen(false)}
                                    type="button"
                                    className="bg-[#ba1a1a] text-white px-6 py-2 rounded-full text-sm font-medium transition"
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