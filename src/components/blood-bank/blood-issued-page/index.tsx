'use client';

import { CirclePlus, Download, Home, RotateCw, Trash2, Edit, Calendar, User, Tag, Stethoscope, Droplets } from 'lucide-react';
import React, { useEffect, useState, useRef } from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

interface BloodIssued {
    id: string;
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
    batchNumber: string;
    doctorId: string;
}

export default function BloodIssuedPage() {
    const [detailDropdown, setDetailDropdown] = useState(false);
    const detailref = useRef<HTMLDivElement | null>(null);
    const [selectedIds, setSelectedIds] = useState<string[]>([]);
    const [bloodIssued, setBloodIssued] = useState<BloodIssued[]>([]);
    const [animate, setAnimate] = useState(false);
    const [loading, setLoading] = useState(true);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<BloodIssued | null>(null);
    const [isEditMode, setIsEditMode] = useState(false);

    // Blood Issued Data Array
    const bloodIssuedData: BloodIssued[] = [
        {
            id: "1",
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
            doctorName: "Dr. Michael Brown",
            batchNumber: "BATCH12345",
            doctorId: "DOC001"
        },
        {
            id: "2",
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
            doctorName: "Dr. Lisa Anderson",
            batchNumber: "BATCH12346",
            doctorId: "DOC002"
        },
        {
            id: "3",
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
            doctorName: "Dr. David Wilson",
            batchNumber: "BATCH12347",
            doctorId: "DOC003"
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
                "Batch Number": item.batchNumber,
                "Doctor ID": item.doctorId,
            }))
        );

        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Blood Issued");
        const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
        const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
        saveAs(blob, "blood-issued.xlsx");
    };

    const removeData = (id: string) => {
        if (window.confirm("Are you sure you want to delete this blood issued record?")) {
            try {
                setBloodIssued(prev => prev.filter(item => item.id !== id));
                setSelectedIds(prev => prev.filter(selectedId => selectedId !== id));
            } catch (error) {
                console.error("Delete error:", error);
                alert("Error deleting blood issued record");
            }
        }
    };

    const handleDeleteSelected = async () => {
        if (selectedIds.length === 0) {
            alert("Please select at least one record to delete.");
            return;
        }
        if (window.confirm(`Delete ${selectedIds.length} record(s)?`)) {
            try {
                setBloodIssued(prev => prev.filter(item => !selectedIds.includes(item.id)));
                setSelectedIds([]);
            } catch (error) {
                console.error("Delete error:", error);
                alert("Error deleting blood issued records");
            }
        }
    };

    const handleAddClick = () => {
        setEditingItem({
            id: '',
            issueId: '',
            patientId: '',
            patientName: '',
            patientAge: 0,
            patientGender: 'Male',
            bloodProductId: '',
            bloodType: 'O+',
            componentType: 'Whole Blood',
            quantityIssued: 0,
            issueDate: new Date().toISOString().split('T')[0],
            issuedBy: '',
            issueReason: '',
            patientBloodGroup: 'O+',
            doctorName: '',
            batchNumber: '',
            doctorId: ''
        });
        setIsEditMode(false);
        setIsModalOpen(true);
    };

    const handleEditClick = (item: BloodIssued) => {
        setEditingItem(item);
        setIsEditMode(true);
        setIsModalOpen(true);
    };

    const handleModalSubmit = (formData: BloodIssued) => {
        if (isEditMode && editingItem?.id) {
            // Edit existing record
            setBloodIssued(prev =>
                prev.map(item =>
                    item.id === editingItem.id ? { ...formData, id: editingItem.id } : item
                )
            );
        } else {
            // Add new record
            const newItem = {
                ...formData,
                id: Math.random().toString(36).substr(2, 9)
            };
            setBloodIssued(prev => [...prev, newItem]);
        }
        setIsModalOpen(false);
        setEditingItem(null);
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
        setEditingItem(null);
    };

    const handleCheckboxChange = (id: string) => {
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
                                            onClick={handleDeleteSelected}
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
                                        title="Add New Blood Issued Record"
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
                                        <div className="p-8 text-center text-gray-500">Loading blood issued records...</div>
                                    ) : bloodIssued.length === 0 ? (
                                        <div className="p-8 text-center text-gray-500">No blood issued records found</div>
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

                                                <tbody className={`bg-white divide-y divide-gray-200 transition-all duration-500 ${animate ? "animate-slideDown" : ""}`}>
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
                                                                <div className="text-sm font-medium text-gray-900">
                                                                    {item.issueId}
                                                                </div>
                                                            </td>

                                                            <td className="px-4 py-3 whitespace-nowrap">
                                                                <div className="text-sm font-medium text-gray-900">
                                                                    {item.patientId}
                                                                </div>
                                                            </td>

                                                            <td className="px-4 py-3 whitespace-nowrap">
                                                                <div className="text-sm font-medium text-gray-900 flex items-center gap-2">
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
                                                                <span className={`px-[10px] py-[2px] inline-flex text-xs leading-5 font-semibold rounded-[6px] ${
                                                                    item.patientGender === "Male" ? "bg-blue-100 text-blue-800" : "bg-pink-100 text-pink-800"
                                                                }`}>
                                                                    {item.patientGender}
                                                                </span>
                                                            </td>

                                                            <td className="px-4 py-3 whitespace-nowrap">
                                                                <div className="text-sm font-medium text-gray-900">
                                                                    {item.bloodProductId}
                                                                </div>
                                                            </td>

                                                            <td className="px-4 py-3 whitespace-nowrap">
                                                                <span className={`px-[10px] py-[2px] inline-flex text-xs leading-5 font-semibold rounded-[6px] ${
                                                                    item.bloodType.includes('O') ? 'bg-red-100 text-red-800' : 
                                                                    item.bloodType.includes('A') ? 'bg-blue-100 text-blue-800' :
                                                                    item.bloodType.includes('B') ? 'bg-green-100 text-green-800' :
                                                                    'bg-purple-100 text-purple-800'
                                                                }`}>
                                                                    {item.bloodType}
                                                                </span>
                                                            </td>

                                                            <td className="px-4 py-3 whitespace-nowrap">
                                                                <div className="text-sm">
                                                                    {item.componentType}
                                                                </div>
                                                            </td>

                                                            <td className="px-4 py-3 whitespace-nowrap">
                                                                <span className={`px-[10px] py-[2px] inline-flex text-xs leading-5 font-semibold rounded-[6px] ${
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
                                                                <span className={`px-[10px] py-[2px] inline-flex text-xs leading-5 font-semibold rounded-[6px] ${
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

                                                            <td className="px-4 py-3 text-sm font-medium">
                                                                <div className="flex space-x-2">
                                                                    <button
                                                                        onClick={() => handleEditClick(item)}
                                                                    <button
                                                                        onClick={() => handleEditClick(item)}
                                                                        className="text-[#6777ef] hover:bg-[#E0E1E3] p-1 rounded-full cursor-pointer"
                                                                        title="Edit"
                                                                    >
                                                                        <Edit className="w-5 h-5" />
                                                                    </button>
                                                                    <button
                                                                        onClick={() => removeData(item.id)}
                                                                        className="text-[#ff5200] hover:bg-[#E0E1E3] p-1 rounded-full cursor-pointer"
                                                                        title="Delete"
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
                                            <div className={`px-6 md:hidden shadow-sm bg-white transition-all duration-500 ${animate ? "animate-slideDown" : ""}`}>
                                                {bloodIssued.map((item) => (
                                                    <div key={item.id} className="border-b border-gray-200 py-4">
                                                        <div className="flex items-center h-13 justify-start py-2 border-b border-[#dadada]">
                                                            <input
                                                                checked={selectedIds.includes(item.id)}
                                                                onChange={() => handleCheckboxChange(item.id)}
                                                                type="checkbox" className="w-4 h-4 text-blue-600 rounded" />
                                                        </div>
                                                        <div className="text-sm text-gray-800">
                                                            <div className="flex items-center h-13 space-x-3 border-b border-[#dadada] gap-4">
                                                                <span className="font-semibold">Issue ID:</span>
                                                                <div className='flex items-center'>
                                                                    <Tag className='w-5 h-5 text-blue-500' />
                                                                    <span className="ml-1">{item.issueId}</span>
                                                                </div>
                                                            </div>
                                                            <div className="flex items-center h-13 space-x-3 border-b border-[#dadada] gap-4">
                                                                <span className="font-semibold">Patient ID:</span>
                                                                <div className='flex items-center'>
                                                                    <User className='w-5 h-5 text-green-500' />
                                                                    <span className="ml-1">{item.patientId}</span>
                                                                </div>
                                                            </div>
                                                            <div className="flex items-center h-13 space-x-3 border-b border-[#dadada] gap-4">
                                                                <span className="font-semibold">Patient Name:</span>
                                                                <div className='flex items-center'>
                                                                    <User className='w-5 h-5 text-purple-500' />
                                                                    <span className="ml-1">{item.patientName}</span>
                                                                </div>
                                                            </div>
                                                            <div className="flex items-center h-13 space-x-3 border-b border-[#dadada] gap-4">
                                                                <span className="font-semibold">Patient Age:</span>
                                                                <div className='flex items-center'>
                                                                    <span className="ml-1">{item.patientAge} years</span>
                                                                </div>
                                                            </div>
                                                            <div className="flex items-center h-13 space-x-3 border-b border-[#dadada] gap-4">
                                                                <span className="font-semibold">Gender:</span>
                                                                <div className='flex items-center'>
                                                                    <span className={`px-2 py-1 rounded-full text-xs ${item.patientGender === "Male" ? "bg-blue-100 text-blue-800" : "bg-pink-100 text-pink-800"}`}>
                                                                        {item.patientGender}
                                                                    </span>
                                                                </div>
                                                            </div>
                                                            <div className="flex items-center h-13 space-x-3 border-b border-[#dadada] gap-4">
                                                                <span className="font-semibold">Blood Product ID:</span>
                                                                <div className='flex items-center'>
                                                                    <Droplets className='w-5 h-5 text-red-500' />
                                                                    <span className="ml-1">{item.bloodProductId}</span>
                                                                </div>
                                                            </div>
                                                            <div className="flex items-center h-13 space-x-3 border-b border-[#dadada] gap-4">
                                                                <span className="font-semibold">Blood Type:</span>
                                                                <div className='flex items-center'>
                                                                    <span className={`px-2 py-1 rounded-full text-xs ${item.bloodType.includes('O') ? 'bg-red-100 text-red-800' : 
                                                                        item.bloodType.includes('A') ? 'bg-blue-100 text-blue-800' :
                                                                        item.bloodType.includes('B') ? 'bg-green-100 text-green-800' :
                                                                        'bg-purple-100 text-purple-800'}`}>
                                                                        {item.bloodType}
                                                                    </span>
                                                                </div>
                                                            </div>
                                                            <div className="flex items-center h-13 space-x-3 border-b border-[#dadada] gap-4">
                                                                <span className="font-semibold">Component Type:</span>
                                                                <div className='flex items-center'>
                                                                    <span className="ml-1">{item.componentType}</span>
                                                                </div>
                                                            </div>
                                                            <div className="flex items-center h-13 space-x-3 border-b border-[#dadada] gap-4">
                                                                <span className="font-semibold">Quantity Issued:</span>
                                                                <div className='flex items-center'>
                                                                    <span className={`px-2 py-1 rounded-full text-xs ${item.quantityIssued > 2 ? 'bg-red-100 text-red-800' : 
                                                                        item.quantityIssued > 1 ? 'bg-yellow-100 text-yellow-800' :
                                                                        'bg-green-100 text-green-800'}`}>
                                                                        {item.quantityIssued} units
                                                                    </span>
                                                                </div>
                                                            </div>
                                                            <div className="flex items-center h-13 space-x-3 border-b border-[#dadada] gap-4">
                                                                <span className="font-semibold">Issue Date:</span>
                                                                <div className='flex items-center'>
                                                                    <Calendar className='w-5 h-5 text-blue-500' />
                                                                    <span className="ml-1">{item.issueDate}</span>
                                                                </div>
                                                            </div>
                                                            <div className="flex items-center h-13 space-x-3 border-b border-[#dadada] gap-4">
                                                                <span className="font-semibold">Issued By:</span>
                                                                <div className='flex items-center'>
                                                                    <span className="ml-1">{item.issuedBy}</span>
                                                                </div>
                                                            </div>
                                                            <div className="flex items-center h-13 space-x-3 border-b border-[#dadada] gap-4">
                                                                <span className="font-semibold">Issue Reason:</span>
                                                                <div className='flex items-center'>
                                                                    <span className="ml-1">{item.issueReason}</span>
                                                                </div>
                                                            </div>
                                                            <div className="flex items-center h-13 space-x-3 border-b border-[#dadada] gap-4">
                                                                <span className="font-semibold">Patient Blood Group:</span>
                                                                <div className='flex items-center'>
                                                                    <span className={`px-2 py-1 rounded-full text-xs ${item.patientBloodGroup.includes('O') ? 'bg-red-100 text-red-800' : 
                                                                        item.patientBloodGroup.includes('A') ? 'bg-blue-100 text-blue-800' :
                                                                        item.patientBloodGroup.includes('B') ? 'bg-green-100 text-green-800' :
                                                                        'bg-purple-100 text-purple-800'}`}>
                                                                        {item.patientBloodGroup}
                                                                    </span>
                                                                </div>
                                                            </div>
                                                            <div className="flex items-center h-13 space-x-3 border-b border-[#dadada] gap-4">
                                                                <span className="font-semibold">Doctor Name:</span>
                                                                <div className='flex items-center'>
                                                                    <Stethoscope className='w-5 h-5 text-green-500' />
                                                                    <span className="ml-1">{item.doctorName}</span>
                                                                </div>
                                                            </div>
                                                            <div className="flex items-center h-13 space-x-3 border-b border-[#dadada] gap-4">
                                                                <div className="flex space-x-2">
                                                                    <button
                                                                        onClick={() => handleEditClick(item)}
                                                                        className="text-[#6777ef] hover:bg-[#E0E1E3] p-1 rounded-full cursor-pointer"
                                                                    >
                                                                        <Edit className="w-5 h-5" />
                                                                    </button>
                                                                    <button
                                                                        onClick={() => removeData(item.id)}
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

            {/* Blood Issued Modal */}
            {isModalOpen && (
                <BloodIssuedModal
                    isOpen={isModalOpen}
                    onClose={handleModalClose}
                    onSubmit={handleModalSubmit}
                    initialData={editingItem}
                    isEditMode={isEditMode}
                />
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

// Reusable Floating Input Components
function FloatingInput({ label, name, value, onChange, type = "text", icon: Icon, required = false, error }: any) {
    const isDate = type === "date";
    return (
        <div className="relative">
            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                placeholder=" "
                required={required}
                className={`peer w-full rounded-md border bg-white px-3 pt-4 pb-4 text-xs md:text-sm focus:border-blue-600 focus:ring-2 focus:ring-blue-600 outline-none transition-all ${isDate ? '!px-3' : 'px-10'} ${error ? 'border-red-500' : 'border-gray-300'}`}
            />
            <label className={`absolute left-3 px-1 bg-white transition-all duration-200 text-xs md:text-sm ${value ? "-top-2 text-xs text-blue-600" : "top-3.5 text-gray-500"} peer-focus:-top-2 peer-focus:text-xs peer-focus:text-blue-600`}>
                {label} {required && <span className="text-red-500">*</span>}
            </label>
            {Icon && !isDate && <Icon className="absolute top-3.5 right-3 w-4 h-4 md:w-5 md:h-5 text-gray-500" />}
            {error && <span className="text-red-500 text-xs mt-1 block">{error}</span>}
        </div>
    )
}

function FloatingSelect({ label, name, value, onChange, options, required = false, error }: any) {
    return (
        <div className="relative">
            <select
                name={name}
                value={value}
                onChange={onChange}
                required={required}
                className={`peer w-full rounded-md border bg-white px-3 pt-4 pb-4 text-xs md:text-sm focus:border-blue-600 focus:ring-2 focus:ring-blue-600 outline-none transition-all appearance-none ${error ? 'border-red-500' : 'border-gray-300'}`}
            >
                <option value="">Select {label}</option>
                {options.map((option: string) => (
                    <option key={option} value={option}>{option}</option>
                ))}
            </select>
            <label className={`absolute left-3 px-1 bg-white transition-all duration-200 text-xs md:text-sm ${value ? "-top-2 text-xs text-blue-600" : "top-3.5 text-gray-500"} peer-focus:-top-2 peer-focus:text-xs peer-focus:text-blue-600`}>
                {label} {required && <span className="text-red-500">*</span>}
            </label>
            <div className="absolute right-3 top-3.5 pointer-events-none">
                <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </div>
            {error && <span className="text-red-500 text-xs mt-1 block">{error}</span>}
        </div>
    )
}

// Modal Component
interface BloodIssuedModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (formData: BloodIssued) => void;
    initialData?: BloodIssued | null;
    isEditMode?: boolean;
}

const BloodIssuedModal: React.FC<BloodIssuedModalProps> = ({
    isOpen,
    onClose,
    onSubmit,
    initialData,
    isEditMode = false
}) => {
    const [formData, setFormData] = useState<BloodIssued>({
        id: '',
        issueId: '',
        patientId: '',
        patientName: '',
        patientAge: 0,
        patientGender: 'Male',
        bloodProductId: '',
        bloodType: 'O+',
        componentType: 'Whole Blood',
        quantityIssued: 0,
        issueDate: new Date().toISOString().split('T')[0],
        issuedBy: '',
        issueReason: '',
        patientBloodGroup: 'O+',
        doctorName: '',
        batchNumber: '',
        doctorId: ''
    });

    const modalRef = useRef<HTMLDivElement>(null);

    const isFormValid =
        formData.issueId.trim() !== '' &&
        formData.patientId.trim() !== '' &&
        formData.patientName.trim() !== '' &&
        formData.patientAge > 0 &&
        formData.patientGender.trim() !== '' &&
        formData.bloodProductId.trim() !== '' &&
        formData.bloodType.trim() !== '' &&
        formData.componentType.trim() !== '' &&
        formData.quantityIssued > 0 &&
        formData.issueDate.trim() !== '' &&
        formData.issuedBy.trim() !== '' &&
        formData.issueReason.trim() !== '' &&
        formData.patientBloodGroup.trim() !== '' &&
        formData.doctorName.trim() !== '' &&
        formData.batchNumber.trim() !== '' &&
        formData.doctorId.trim() !== '';

    useEffect(() => {
        if (initialData) {
            setFormData(initialData);
        } else {
            // Reset form when adding new
            setFormData({
                id: '',
                issueId: '',
                patientId: '',
                patientName: '',
                patientAge: 0,
                patientGender: 'Male',
                bloodProductId: '',
                bloodType: 'O+',
                componentType: 'Whole Blood',
                quantityIssued: 0,
                issueDate: new Date().toISOString().split('T')[0],
                issuedBy: '',
                issueReason: '',
                patientBloodGroup: 'O+',
                doctorName: '',
                batchNumber: '',
                doctorId: ''
            });
        }
    }, [initialData, isOpen]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'patientAge' || name === 'quantityIssued' ? parseInt(value) : value
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (isFormValid) {
            onSubmit(formData);
        }
    };

    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
                onClose();
            }
        }

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-[#00000073] flex items-center justify-center z-[99999]">
            <div ref={modalRef} className="bg-white rounded-lg shadow-lg w-full max-w-[800px] mx-4 max-h-[90vh] overflow-hidden">
                {/* Modal Header */}
                <div className="flex justify-between items-center p-4 border-b border-gray-300">
                    <div className="flex items-center">
                        <h2 className="font-semibold leading-[35px]">
                            {isEditMode ? `${formData.issueId}` : 'New Blood Issued Record'}
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

                {/* Modal Content */}
                <div className="py-5 px-6 max-h-[75vh] overflow-y-auto scrollbar-hide">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Issue ID */}
                            <FloatingInput
                                label="Issue ID"
                                name="issueId"
                                value={formData.issueId}
                                onChange={handleInputChange}
                                icon={Tag}
                                required
                            />

                            {/* Patient ID */}
                            <FloatingInput
                                label="Patient ID"
                                name="patientId"
                                value={formData.patientId}
                                onChange={handleInputChange}
                                icon={User}
                                required
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Patient Name */}
                            <FloatingInput
                                label="Patient Name"
                                name="patientName"
                                value={formData.patientName}
                                onChange={handleInputChange}
                                required
                            />

                            {/* Patient Age */}
                            <FloatingInput
                                label="Patient Age"
                                name="patientAge"
                                value={formData.patientAge}
                                onChange={handleInputChange}
                                type="number"
                                required
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Patient Gender */}
                            <FloatingSelect
                                label="Patient Gender"
                                name="patientGender"
                                value={formData.patientGender}
                                onChange={handleInputChange}
                                options={['Male', 'Female']}
                                required
                            />

                            {/* Blood Product ID */}
                            <FloatingInput
                                label="Blood Product ID"
                                name="bloodProductId"
                                value={formData.bloodProductId}
                                onChange={handleInputChange}
                                required
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Blood Type */}
                            <FloatingSelect
                                label="Blood Type"
                                name="bloodType"
                                value={formData.bloodType}
                                onChange={handleInputChange}
                                options={['O+', 'O-', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-']}
                                required
                            />

                            {/* Component Type */}
                            <FloatingSelect
                                label="Component Type"
                                name="componentType"
                                value={formData.componentType}
                                onChange={handleInputChange}
                                options={['Whole Blood', 'Red Blood Cells', 'Platelets', 'Plasma', 'Cryoprecipitate']}
                                required
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Quantity Issued */}
                            <FloatingInput
                                label="Quantity Issued (units)"
                                name="quantityIssued"
                                value={formData.quantityIssued}
                                onChange={handleInputChange}
                                type="number"
                                required
                            />

                            {/* Issue Date */}
                            <FloatingInput
                                type="date"
                                label="Issue Date"
                                name="issueDate"
                                value={formData.issueDate}
                                onChange={handleInputChange}
                                required
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Batch Number */}
                            <FloatingInput
                                label="Batch Number"
                                name="batchNumber"
                                value={formData.batchNumber}
                                onChange={handleInputChange}
                                required
                            />

                            {/* Issued By */}
                            <FloatingInput
                                label="Issued By"
                                name="issuedBy"
                                value={formData.issuedBy}
                                onChange={handleInputChange}
                                required
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Patient Blood Group */}
                            <FloatingSelect
                                label="Patient Blood Group"
                                name="patientBloodGroup"
                                value={formData.patientBloodGroup}
                                onChange={handleInputChange}
                                options={['O+', 'O-', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-']}
                                required
                            />

                            {/* Doctor ID */}
                            <FloatingInput
                                label="Doctor ID"
                                name="doctorId"
                                value={formData.doctorId}
                                onChange={handleInputChange}
                                icon={Stethoscope}
                                required
                            />
                        </div>

                        {/* Issue Reason */}
                        <FloatingInput
                            label="Issue Reason"
                            name="issueReason"
                            value={formData.issueReason}
                            onChange={handleInputChange}
                            required
                        />

                        {/* Doctor Name */}
                        <FloatingInput
                            label="Doctor Name"
                            name="doctorName"
                            value={formData.doctorName}
                            onChange={handleInputChange}
                            required
                        />

                        {/* Buttons */}
                        <div className="flex space-x-3 pt-4">
                            <button
                                type="submit"
                                disabled={!isFormValid}
                                className={`px-4 py-2 rounded-full transition-colors ${isFormValid
                                    ? "bg-blue-600 hover:bg-blue-700 text-white cursor-pointer"
                                    : "bg-gray-300 text-[#44474e] cursor-not-allowed"
                                    }`}
                            >
                                {isEditMode ? 'Update' : 'Save'}
                            </button>
                            <button
                                type="button"
                                onClick={onClose}
                                className="px-4 py-2 rounded-full text-white bg-[#ba1a1a] transition-colors text-sm font-semibold cursor-pointer"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

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