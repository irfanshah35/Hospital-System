'use client';

import { CirclePlus, Download, Home, RotateCw, Trash2, Edit, Clock, Phone, Mail, MapPin } from 'lucide-react';
import React, { useEffect, useState, useRef } from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import Link from 'next/link';

interface BloodDonor {
    id: number;
    donorId: string;
    donorName: string;
    dateOfBirth: string;
    gender: "Male" | "Female";
    bloodType: string;
    phoneNumber: string;
    email: string;
    donorStatus: "Active" | "Inactive" | "Suspended";
    lastDonationDate: string;
    nextEligibleDonationDate: string;
    donorLocation: string;
}

export default function BloodDonorPage() {
    const [detailDropdown, setDetailDropdown] = useState(false);
    const detailref = useRef<HTMLDivElement | null>(null);
    const [selectedIds, setSelectedIds] = useState<number[]>([]);
    const [bloodDonors, setBloodDonors] = useState<BloodDonor[]>([]);
    const [animate, setAnimate] = useState(false);
    const [loading, setLoading] = useState(true);

    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<BloodDonor | null>(null);

    // Blood Donor Data Array
    const bloodDonorData: BloodDonor[] = [
        {
            id: 1,
            donorId: "DNR001",
            donorName: "John Smith",
            dateOfBirth: "1985-03-15",
            gender: "Male",
            bloodType: "O+",
            phoneNumber: "+1-555-0101",
            email: "john.smith@email.com",
            donorStatus: "Active",
            lastDonationDate: "2024-10-15",
            nextEligibleDonationDate: "2024-12-15",
            donorLocation: "New York, NY"
        },
        {
            id: 2,
            donorId: "DNR002",
            donorName: "Sarah Johnson",
            dateOfBirth: "1990-07-22",
            gender: "Female",
            bloodType: "A+",
            phoneNumber: "+1-555-0102",
            email: "sarah.j@email.com",
            donorStatus: "Active",
            lastDonationDate: "2024-10-10",
            nextEligibleDonationDate: "2024-12-10",
            donorLocation: "Los Angeles, CA"
        },
        {
            id: 3,
            donorId: "DNR003",
            donorName: "Michael Brown",
            dateOfBirth: "1982-11-30",
            gender: "Male",
            bloodType: "B-",
            phoneNumber: "+1-555-0103",
            email: "m.brown@email.com",
            donorStatus: "Inactive",
            lastDonationDate: "2024-09-20",
            nextEligibleDonationDate: "2024-11-20",
            donorLocation: "Chicago, IL"
        },
        {
            id: 4,
            donorId: "DNR004",
            donorName: "Emily Davis",
            dateOfBirth: "1995-05-18",
            gender: "Female",
            bloodType: "AB+",
            phoneNumber: "+1-555-0104",
            email: "emily.davis@email.com",
            donorStatus: "Active",
            lastDonationDate: "2024-10-18",
            nextEligibleDonationDate: "2024-12-18",
            donorLocation: "Houston, TX"
        },
        {
            id: 5,
            donorId: "DNR005",
            donorName: "Robert Wilson",
            dateOfBirth: "1978-12-05",
            gender: "Male",
            bloodType: "O-",
            phoneNumber: "+1-555-0105",
            email: "r.wilson@email.com",
            donorStatus: "Suspended",
            lastDonationDate: "2024-08-25",
            nextEligibleDonationDate: "2024-10-25",
            donorLocation: "Phoenix, AZ"
        },
        {
            id: 6,
            donorId: "DNR006",
            donorName: "Lisa Anderson",
            dateOfBirth: "1988-09-14",
            gender: "Female",
            bloodType: "A-",
            phoneNumber: "+1-555-0106",
            email: "lisa.anderson@email.com",
            donorStatus: "Active",
            lastDonationDate: "2024-10-12",
            nextEligibleDonationDate: "2024-12-12",
            donorLocation: "Philadelphia, PA"
        },
        {
            id: 7,
            donorId: "DNR007",
            donorName: "David Miller",
            dateOfBirth: "1992-02-28",
            gender: "Male",
            bloodType: "B+",
            phoneNumber: "+1-555-0107",
            email: "d.miller@email.com",
            donorStatus: "Active",
            lastDonationDate: "2024-10-08",
            nextEligibleDonationDate: "2024-12-08",
            donorLocation: "San Antonio, TX"
        },
        {
            id: 8,
            donorId: "DNR008",
            donorName: "Jennifer Taylor",
            dateOfBirth: "1987-06-11",
            gender: "Female",
            bloodType: "AB-",
            phoneNumber: "+1-555-0108",
            email: "j.taylor@email.com",
            donorStatus: "Inactive",
            lastDonationDate: "2024-09-15",
            nextEligibleDonationDate: "2024-11-15",
            donorLocation: "San Diego, CA"
        }
    ];

    // Fetch data from API (simulated)
    const fetchBloodDonors = async () => {
        setLoading(true);
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            setBloodDonors(bloodDonorData);
        } catch (error) {
            console.error("Failed to fetch blood donors:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBloodDonors();
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
        fetchBloodDonors().then(() => {
            setTimeout(() => setAnimate(false), 300);
        });
    };

    const handleDownloadXLSX = () => {
        const worksheet = XLSX.utils.json_to_sheet(
            bloodDonors.map((item) => ({
                "Donor ID": item.donorId,
                "Donor Name": item.donorName,
                "Date of Birth": item.dateOfBirth,
                "Gender": item.gender,
                "Blood Type": item.bloodType,
                "Phone Number": item.phoneNumber,
                "Email": item.email,
                "Donor Status": item.donorStatus,
                "Last Donation Date": item.lastDonationDate,
                "Next Eligible Donation Date": item.nextEligibleDonationDate,
                "Donor Location": item.donorLocation,
            }))
        );

        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Blood Donors");
        const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
        const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
        saveAs(blob, "blood-donors.xlsx");
    };

    const removeData = () => {
        if (selectedIds.length === 0) {
            alert("Please select at least one donor to delete.");
            return;
        }
        if (window.confirm(`Delete ${selectedIds.length} donor(s)?`)) {
            setBloodDonors(prev => prev.filter(donor => !selectedIds.includes(donor.id)));
            setSelectedIds([]);
        }
    };

    const handleCheckboxChange = (id: number) => {
        setSelectedIds(prev =>
            prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
        );
    };

    const handleSelectAll = (checked: boolean) => {
        setSelectedIds(checked ? bloodDonors.map(donor => donor.id) : []);
    };

    useEffect(() => {
        const selectAllCheckbox = document.getElementById("selectAll") as HTMLInputElement;
        if (selectAllCheckbox) {
            selectAllCheckbox.indeterminate =
                selectedIds.length > 0 && selectedIds.length < bloodDonors.length;
        }
    }, [selectedIds, bloodDonors]);

    const checkboxItems = [
        { label: "Checkbox", checked: true },
        { label: "Donor ID", checked: true },
        { label: "Donor Name", checked: true },
        { label: "Date of Birth", checked: true },
        { label: "Gender", checked: true },
        { label: "Blood Type", checked: true },
        { label: "Phone Number", checked: true },
        { label: "Email", checked: true },
        { label: "Donor Status", checked: true },
        { label: "Last Donation Date", checked: true },
        { label: "Next Eligible Donation Date", checked: true },
        { label: "Donor Location", checked: true },
        { label: "Actions", checked: true },
    ];

    const deleteSelectedItem = async (id: any) => {
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 500));
            setBloodDonors(prev => prev.filter(donor => donor.id !== id));
            console.log("Blood donor deleted:", id);
        } catch (error) {
            console.error("Error deleting blood donor:", error);
        }
    };

    const handleEditClick = (donor: BloodDonor) => {
        setEditingItem(donor);
        setIsEditModalOpen(true);
    };

    const handleUpdateItem = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 500));
            
            setBloodDonors(prev => 
                prev.map(donor => 
                    donor.id === editingItem?.id ? editingItem : donor
                )
            );
            
            alert("Blood donor updated successfully!");
            setIsEditModalOpen(false);
        } catch (error) {
            console.error("Error updating blood donor:", error);
            alert("An unexpected error occurred.");
        }
    };

    return (
        <>
            <div className='px-4 sm:px-6 py-[20px] mt-0'>
                <div className="flex items-center justify-between relative top-[-5px]">
                    <div className="flex items-center flex-wrap space-x-2">
                        <h1 className="text-[20px] font-semibold">Blood Donor</h1>
                        <span className="text-[20px] font-bold">›</span>
                        <Home size={18} />
                        <span>›</span>
                        <span className="text-sm">Blood Bank</span>
                        <span>›</span>
                        <span className="text-sm">Blood Donor</span>
                    </div>
                </div>

                <div className="h-auto mt-3">
                    <div className="max-w-full">
                        <div className="bg-[var(--tableHeaderBg)] rounded-t-xl shadow-md overflow-hidden">
                            {/* Header */}
                            <div className="pr-[15px] pl-[20px] py-[8px] border-b border-gray-200 flex max-[390px]:gap-2 items-center flex-wrap">
                                <div className='flex items-center flex-[35%]'>
                                    <h1 className="m-0 text-[17px] leading-[28px] pr-[10px] font-medium">Blood Donor</h1>
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

                                    <Link href="/add-blood-donor">
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
                                        <div className="p-8 text-center text-gray-500">Loading blood donors...</div>
                                    ) : bloodDonors.length === 0 ? (
                                        <div className="p-8 text-center text-gray-500">No blood donors found</div>
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
                                                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Donor ID</th>
                                                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Donor Name</th>
                                                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Date of Birth</th>
                                                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Gender</th>
                                                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Blood Type</th>
                                                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Phone Number</th>
                                                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Email</th>
                                                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Donor Status</th>
                                                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Last Donation Date</th>
                                                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Next Eligible Donation Date</th>
                                                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Donor Location</th>
                                                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Actions</th>
                                                    </tr>
                                                </thead>

                                                <tbody role='rowgroup' className={`bg-white divide-y divide-gray-200 transition-all duration-500 ${animate ? "animate-slideDown" : ""}`}>
                                                    {bloodDonors.map((donor) => (
                                                        <tr key={donor.id} className="transition-colors duration-150 hover:bg-gray-50">
                                                            <td className="px-4 py-3 pl-[37px]">
                                                                <input
                                                                    type="checkbox"
                                                                    checked={selectedIds.includes(donor.id)}
                                                                    onChange={() => handleCheckboxChange(donor.id)}
                                                                    className="h-[18px] w-[18px] rounded-[2px] border-[2px] border-[#1a1b1f]"
                                                                />
                                                            </td>

                                                            <td className="px-4 py-3 whitespace-nowrap">
                                                                <div className="text-sm font-medium">
                                                                    {donor.donorId}
                                                                </div>
                                                            </td>

                                                            <td className="px-4 py-3 whitespace-nowrap">
                                                                <div className="text-sm font-medium">
                                                                    {donor.donorName}
                                                                </div>
                                                            </td>

                                                            <td className="px-4 py-3 whitespace-nowrap">
                                                                <div className="text-sm">
                                                                    {donor.dateOfBirth}
                                                                </div>
                                                            </td>

                                                            <td className="px-4 py-3 whitespace-nowrap">
                                                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                                                    donor.gender === "Male" ? "bg-blue-100 text-blue-800" : "bg-pink-100 text-pink-800"
                                                                }`}>
                                                                    {donor.gender}
                                                                </span>
                                                            </td>

                                                            <td className="px-4 py-3 whitespace-nowrap">
                                                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                                                    donor.bloodType.includes('O') ? 'bg-red-100 text-red-800' : 
                                                                    donor.bloodType.includes('A') ? 'bg-blue-100 text-blue-800' :
                                                                    donor.bloodType.includes('B') ? 'bg-green-100 text-green-800' :
                                                                    'bg-purple-100 text-purple-800'
                                                                }`}>
                                                                    {donor.bloodType}
                                                                </span>
                                                            </td>

                                                            <td className="px-4 py-3 whitespace-nowrap">
                                                                <div className="text-sm flex items-center gap-2">
                                                                    <Phone className="w-4 h-4 text-green-600" />
                                                                    {donor.phoneNumber}
                                                                </div>
                                                            </td>

                                                            <td className="px-4 py-3 whitespace-nowrap">
                                                                <div className="text-sm flex items-center gap-2">
                                                                    <Mail className="w-4 h-4 text-gray-600" />
                                                                    {donor.email}
                                                                </div>
                                                            </td>

                                                            <td className="px-4 py-3 whitespace-nowrap">
                                                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                                                    donor.donorStatus === "Active" ? "bg-green-100 text-green-800" :
                                                                    donor.donorStatus === "Inactive" ? "bg-yellow-100 text-yellow-800" :
                                                                    "bg-red-100 text-red-800"
                                                                }`}>
                                                                    {donor.donorStatus}
                                                                </span>
                                                            </td>

                                                            <td className="px-4 py-3 whitespace-nowrap">
                                                                <div className="text-sm flex items-center gap-2">
                                                                    <Clock className="w-4 h-4 text-gray-600" />
                                                                    {donor.lastDonationDate}
                                                                </div>
                                                            </td>

                                                            <td className="px-4 py-3 whitespace-nowrap">
                                                                <div className="text-sm">
                                                                    {donor.nextEligibleDonationDate}
                                                                </div>
                                                            </td>

                                                            <td className="px-4 py-3 whitespace-nowrap">
                                                                <div className="text-sm flex items-center gap-2">
                                                                    <MapPin className="w-4 h-4 text-red-600" />
                                                                    {donor.donorLocation}
                                                                </div>
                                                            </td>

                                                            <td className="px-4 py-3 whitespace-nowrap">
                                                                <div className="flex space-x-2">
                                                                    <button 
                                                                        onClick={() => handleEditClick(donor)} 
                                                                        className="text-[#6777ef] hover:bg-[#E0E1E3] p-1 rounded-full cursor-pointer"
                                                                    >
                                                                        <Edit className="w-5 h-5" />
                                                                    </button>
                                                                    <button 
                                                                        onClick={() => deleteSelectedItem(donor.id)} 
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
                                                {bloodDonors.map((donor) => (
                                                    <div key={donor.id} className="border-b border-gray-200 py-4">
                                                        {/* Checkbox Row */}
                                                        <div className="flex items-center justify-between mb-3 border-b border-gray-200 p-2">
                                                            <input
                                                                checked={selectedIds.includes(donor.id)}
                                                                onChange={() => handleCheckboxChange(donor.id)}
                                                                type="checkbox"
                                                                className="w-4 h-4 text-blue-600 rounded"
                                                            />
                                                        </div>

                                                        {/* Donor Info */}
                                                        <div className="space-y-2 text-sm">
                                                            {/* Donor ID */}
                                                            <div className="flex items-center gap-3 pb-2 border-b border-gray-200 p-2">
                                                                <span className="font-semibold w-32">Donor ID:</span>
                                                                <span className="font-medium text-blue-600">{donor.donorId}</span>
                                                            </div>

                                                            {/* Donor Name */}
                                                            <div className="flex items-center gap-3 pb-2 border-b border-gray-200 p-2">
                                                                <span className="font-semibold w-32">Donor Name:</span>
                                                                <span className="font-medium">{donor.donorName}</span>
                                                            </div>

                                                            {/* Date of Birth */}
                                                            <div className="flex items-center gap-3 pb-2 border-b border-gray-200 p-2">
                                                                <span className="font-semibold w-32">Date of Birth:</span>
                                                                <span>{donor.dateOfBirth}</span>
                                                            </div>

                                                            {/* Gender */}
                                                            <div className="flex items-center gap-3 pb-2 border-b border-gray-200 p-2">
                                                                <span className="font-semibold w-32">Gender:</span>
                                                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                                                    donor.gender === "Male" ? "bg-blue-100 text-blue-800" : "bg-pink-100 text-pink-800"
                                                                }`}>
                                                                    {donor.gender}
                                                                </span>
                                                            </div>

                                                            {/* Blood Type */}
                                                            <div className="flex items-center gap-3 pb-2 border-b border-gray-200 p-2">
                                                                <span className="font-semibold w-32">Blood Type:</span>
                                                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                                                    donor.bloodType.includes('O') ? 'bg-red-100 text-red-800' : 
                                                                    donor.bloodType.includes('A') ? 'bg-blue-100 text-blue-800' :
                                                                    donor.bloodType.includes('B') ? 'bg-green-100 text-green-800' :
                                                                    'bg-purple-100 text-purple-800'
                                                                }`}>
                                                                    {donor.bloodType}
                                                                </span>
                                                            </div>

                                                            {/* Phone Number */}
                                                            <div className="flex items-center gap-3 pb-2 border-b border-gray-200 p-2">
                                                                <span className="font-semibold w-32">Phone:</span>
                                                                <div className="flex items-center gap-2">
                                                                    <Phone className="w-4 h-4 text-green-600" />
                                                                    <span>{donor.phoneNumber}</span>
                                                                </div>
                                                            </div>

                                                            {/* Email */}
                                                            <div className="flex items-center gap-3 pb-2 border-b border-gray-200 p-2">
                                                                <span className="font-semibold w-32">Email:</span>
                                                                <div className="flex items-center gap-2">
                                                                    <Mail className="w-4 h-4 text-gray-600" />
                                                                    <span>{donor.email}</span>
                                                                </div>
                                                            </div>

                                                            {/* Donor Status */}
                                                            <div className="flex items-center gap-3 pb-2 border-b border-gray-200 p-2">
                                                                <span className="font-semibold w-32">Status:</span>
                                                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                                                    donor.donorStatus === "Active" ? "bg-green-100 text-green-800" :
                                                                    donor.donorStatus === "Inactive" ? "bg-yellow-100 text-yellow-800" :
                                                                    "bg-red-100 text-red-800"
                                                                }`}>
                                                                    {donor.donorStatus}
                                                                </span>
                                                            </div>

                                                            {/* Last Donation Date */}
                                                            <div className="flex items-center gap-3 pb-2 border-b border-gray-200 p-2">
                                                                <span className="font-semibold w-32">Last Donation:</span>
                                                                <div className="flex items-center gap-2">
                                                                    <Clock className="w-4 h-4 text-gray-600" />
                                                                    <span>{donor.lastDonationDate}</span>
                                                                </div>
                                                            </div>

                                                            {/* Next Eligible Donation Date */}
                                                            <div className="flex items-center gap-3 pb-2 border-b border-gray-200 p-2">
                                                                <span className="font-semibold w-32">Next Eligible:</span>
                                                                <span>{donor.nextEligibleDonationDate}</span>
                                                            </div>

                                                            {/* Donor Location */}
                                                            <div className="flex items-center gap-3 pb-2 border-b border-gray-200 p-2">
                                                                <span className="font-semibold w-32">Location:</span>
                                                                <div className="flex items-center gap-2">
                                                                    <MapPin className="w-4 h-4 text-red-600" />
                                                                    <span>{donor.donorLocation}</span>
                                                                </div>
                                                            </div>

                                                            {/* Actions */}
                                                            <div className="flex items-center gap-3 p-2">
                                                                <div className="flex space-x-2">
                                                                    <button
                                                                        onClick={() => handleEditClick(donor)}
                                                                        className="text-[#6777ef] hover:bg-[#E0E1E3] p-1 rounded-full cursor-pointer"
                                                                    >
                                                                        <Edit className="w-5 h-5" />
                                                                    </button>
                                                                    <button
                                                                        onClick={() => deleteSelectedItem(donor.id)}
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
                    <Paginator totalItems={bloodDonors.length} />
                </div>
            </div>

            {/* Edit Modal */}
            {isEditModalOpen && editingItem && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999]">
                    <div className="bg-white rounded-lg shadow-lg w-[600px] max-w-[90%] max-h-[90vh] overflow-hidden">
                        <div className="flex items-center justify-between border-b !border-gray-300 px-5 py-3">
                            <h2 className="text-lg font-semibold">
                                Edit Blood Donor - {editingItem.donorName}
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
                                {/* Donor ID */}
                                <div className="relative">
                                    <input
                                        type="text"
                                        value={editingItem.donorId}
                                        onChange={(e) => setEditingItem({...editingItem, donorId: e.target.value})}
                                        className="peer w-full rounded-md border bg-white px-3 pt-5 pb-2 text-sm text-gray-800 focus:border-[#005CBB] focus:ring-2 focus:ring-[#005CBB] outline-none transition-all"
                                    />
                                    <label className="absolute left-3 px-1 bg-white transition-all duration-200 -top-2 text-xs text-[#005CBB]">
                                        Donor ID*
                                    </label>
                                </div>

                                {/* Donor Name */}
                                <div className="relative">
                                    <input
                                        type="text"
                                        value={editingItem.donorName}
                                        onChange={(e) => setEditingItem({...editingItem, donorName: e.target.value})}
                                        className="peer w-full rounded-md border bg-white px-3 pt-5 pb-2 text-sm text-gray-800 focus:border-[#005CBB] focus:ring-2 focus:ring-[#005CBB] outline-none transition-all"
                                    />
                                    <label className="absolute left-3 px-1 bg-white transition-all duration-200 -top-2 text-xs text-[#005CBB]">
                                        Donor Name*
                                    </label>
                                </div>

                                {/* Date of Birth */}
                                <div className="relative">
                                    <input
                                        type="date"
                                        value={editingItem.dateOfBirth}
                                        onChange={(e) => setEditingItem({...editingItem, dateOfBirth: e.target.value})}
                                        className="peer w-full rounded-md border bg-white px-3 pt-5 pb-2 text-sm text-gray-800 focus:border-[#005CBB] focus:ring-2 focus:ring-[#005CBB] outline-none transition-all"
                                    />
                                    <label className="absolute left-3 px-1 bg-white transition-all duration-200 -top-2 text-xs text-[#005CBB]">
                                        Date of Birth*
                                    </label>
                                </div>

                                {/* Gender */}
                                <div className="relative">
                                    <select
                                        value={editingItem.gender}
                                        onChange={(e) => setEditingItem({...editingItem, gender: e.target.value as "Male" | "Female"})}
                                        className="peer w-full rounded-md border bg-white px-3 pt-5 pb-2 text-sm text-gray-800 focus:border-[#005CBB] focus:ring-2 focus:ring-[#005CBB] outline-none transition-all"
                                    >
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                    </select>
                                    <label className="absolute left-3 px-1 bg-white transition-all duration-200 -top-2 text-xs text-[#005CBB]">
                                        Gender*
                                    </label>
                                </div>

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

                                {/* Phone Number */}
                                <div className="relative">
                                    <input
                                        type="text"
                                        value={editingItem.phoneNumber}
                                        onChange={(e) => setEditingItem({...editingItem, phoneNumber: e.target.value})}
                                        className="peer w-full rounded-md border bg-white px-3 pt-5 pb-2 text-sm text-gray-800 focus:border-[#005CBB] focus:ring-2 focus:ring-[#005CBB] outline-none transition-all"
                                    />
                                    <label className="absolute left-3 px-1 bg-white transition-all duration-200 -top-2 text-xs text-[#005CBB]">
                                        Phone Number*
                                    </label>
                                </div>
                            </div>

                            {/* Email */}
                            <div className="relative">
                                <input
                                    type="email"
                                    value={editingItem.email}
                                    onChange={(e) => setEditingItem({...editingItem, email: e.target.value})}
                                    className="peer w-full rounded-md border bg-white px-3 pt-5 pb-2 text-sm text-gray-800 focus:border-[#005CBB] focus:ring-2 focus:ring-[#005CBB] outline-none transition-all"
                                />
                                <label className="absolute left-3 px-1 bg-white transition-all duration-200 -top-2 text-xs text-[#005CBB]">
                                    Email*
                                </label>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                {/* Donor Status */}
                                <div className="relative">
                                    <select
                                        value={editingItem.donorStatus}
                                        onChange={(e) => setEditingItem({...editingItem, donorStatus: e.target.value as "Active" | "Inactive" | "Suspended"})}
                                        className="peer w-full rounded-md border bg-white px-3 pt-5 pb-2 text-sm text-gray-800 focus:border-[#005CBB] focus:ring-2 focus:ring-[#005CBB] outline-none transition-all"
                                    >
                                        <option value="Active">Active</option>
                                        <option value="Inactive">Inactive</option>
                                        <option value="Suspended">Suspended</option>
                                    </select>
                                    <label className="absolute left-3 px-1 bg-white transition-all duration-200 -top-2 text-xs text-[#005CBB]">
                                        Donor Status*
                                    </label>
                                </div>

                                {/* Last Donation Date */}
                                <div className="relative">
                                    <input
                                        type="date"
                                        value={editingItem.lastDonationDate}
                                        onChange={(e) => setEditingItem({...editingItem, lastDonationDate: e.target.value})}
                                        className="peer w-full rounded-md border bg-white px-3 pt-5 pb-2 text-sm text-gray-800 focus:border-[#005CBB] focus:ring-2 focus:ring-[#005CBB] outline-none transition-all"
                                    />
                                    <label className="absolute left-3 px-1 bg-white transition-all duration-200 -top-2 text-xs text-[#005CBB]">
                                        Last Donation Date*
                                    </label>
                                </div>

                                {/* Next Eligible Donation Date */}
                                <div className="relative">
                                    <input
                                        type="date"
                                        value={editingItem.nextEligibleDonationDate}
                                        onChange={(e) => setEditingItem({...editingItem, nextEligibleDonationDate: e.target.value})}
                                        className="peer w-full rounded-md border bg-white px-3 pt-5 pb-2 text-sm text-gray-800 focus:border-[#005CBB] focus:ring-2 focus:ring-[#005CBB] outline-none transition-all"
                                    />
                                    <label className="absolute left-3 px-1 bg-white transition-all duration-200 -top-2 text-xs text-[#005CBB]">
                                        Next Eligible Date*
                                    </label>
                                </div>

                                {/* Donor Location */}
                                <div className="relative">
                                    <input
                                        type="text"
                                        value={editingItem.donorLocation}
                                        onChange={(e) => setEditingItem({...editingItem, donorLocation: e.target.value})}
                                        className="peer w-full rounded-md border bg-white px-3 pt-5 pb-2 text-sm text-gray-800 focus:border-[#005CBB] focus:ring-2 focus:ring-[#005CBB] outline-none transition-all"
                                    />
                                    <label className="absolute left-3 px-1 bg-white transition-all duration-200 -top-2 text-xs text-[#005CBB]">
                                        Donor Location*
                                    </label>
                                </div>
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