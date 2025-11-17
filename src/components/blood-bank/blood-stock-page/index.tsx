'use client';

import { CirclePlus, Download, Home, RotateCw, Trash2, Edit, Clock, Phone, Mail, MapPin } from 'lucide-react';
import React, { useEffect, useState, useRef } from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import Link from 'next/link';

interface BloodStock {
    id: number;
    bloodProductId: string;
    bloodType: string;
    componentType: string;
    quantityInStock: number;
    expiryDate: string;
    collectionDate: string;
    storageLocation: string;
    donationStatus: string;
    batchNumber: string;
    conditionStatus: string;
    temperatureRange: string;
    dateLastUpdated: string;
}

export default function BloodStockPage() {
    const [detailDropdown, setDetailDropdown] = useState(false);
    const detailref = useRef<HTMLDivElement | null>(null);
    const [selectedIds, setSelectedIds] = useState<number[]>([]);
    const [bloodStock, setBloodStock] = useState<BloodStock[]>([]);
    const [animate, setAnimate] = useState(false);
    const [loading, setLoading] = useState(true);

    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<BloodStock | null>(null);

    // Blood Stock Data Array
    const bloodStockData: BloodStock[] = [
        {
            id: 1,
            bloodProductId: "BP001",
            bloodType: "O+",
            componentType: "Red Blood Cells",
            quantityInStock: 25,
            expiryDate: "2024-11-01",
            collectionDate: "2024-10-01",
            storageLocation: "Blood Bank Freezer A",
            donationStatus: "Fresh",
            batchNumber: "BATCH12345",
            conditionStatus: "Good",
            temperatureRange: "2-6°C",
            dateLastUpdated: "2024-10-15"
        },
        {
            id: 2,
            bloodProductId: "BP002",
            bloodType: "A+",
            componentType: "Platelets",
            quantityInStock: 15,
            expiryDate: "2024-10-25",
            collectionDate: "2024-10-05",
            storageLocation: "Platelet Agitator B",
            donationStatus: "Processed",
            batchNumber: "BATCH12346",
            conditionStatus: "Excellent",
            temperatureRange: "20-24°C",
            dateLastUpdated: "2024-10-16"
        },
        {
            id: 3,
            bloodProductId: "BP003",
            bloodType: "B-",
            componentType: "Plasma",
            quantityInStock: 30,
            expiryDate: "2025-01-15",
            collectionDate: "2024-10-10",
            storageLocation: "Plasma Freezer C",
            donationStatus: "Frozen",
            batchNumber: "BATCH12347",
            conditionStatus: "Good",
            temperatureRange: "-18°C",
            dateLastUpdated: "2024-10-17"
        },
        {
            id: 4,
            bloodProductId: "BP004",
            bloodType: "AB+",
            componentType: "Whole Blood",
            quantityInStock: 8,
            expiryDate: "2024-10-30",
            collectionDate: "2024-10-12",
            storageLocation: "Blood Bank Refrigerator D",
            donationStatus: "Fresh",
            batchNumber: "BATCH12348",
            conditionStatus: "Fair",
            temperatureRange: "1-6°C",
            dateLastUpdated: "2024-10-18"
        },
        {
            id: 5,
            bloodProductId: "BP005",
            bloodType: "O-",
            componentType: "Cryoprecipitate",
            quantityInStock: 12,
            expiryDate: "2024-12-20",
            collectionDate: "2024-10-08",
            storageLocation: "Freezer E",
            donationStatus: "Frozen",
            batchNumber: "BATCH12349",
            conditionStatus: "Excellent",
            temperatureRange: "-30°C",
            dateLastUpdated: "2024-10-19"
        }
    ];

    // Fetch data from API (simulated)
    const fetchBloodStock = async () => {
        setLoading(true);
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            setBloodStock(bloodStockData);
        } catch (error) {
            console.error("Failed to fetch blood stock:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBloodStock();
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
        fetchBloodStock().then(() => {
            setTimeout(() => setAnimate(false), 300);
        });
    };

    const handleDownloadXLSX = () => {
        const worksheet = XLSX.utils.json_to_sheet(
            bloodStock.map((item) => ({
                "Blood Product ID": item.bloodProductId,
                "Blood Type": item.bloodType,
                "Component Type": item.componentType,
                "Quantity In Stock": item.quantityInStock,
                "Expiry Date": item.expiryDate,
                "Collection Date": item.collectionDate,
                "Storage Location": item.storageLocation,
                "Donation Status": item.donationStatus,
                "Batch Number": item.batchNumber,
                "Condition Status": item.conditionStatus,
                "Temperature Range": item.temperatureRange,
                "Date Last Updated": item.dateLastUpdated,
            }))
        );

        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Blood Stock");
        const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
        const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
        saveAs(blob, "blood-stock.xlsx");
    };

    const removeData = () => {
        if (selectedIds.length === 0) {
            alert("Please select at least one item to delete.");
            return;
        }
        if (window.confirm(`Delete ${selectedIds.length} item(s)?`)) {
            setBloodStock(prev => prev.filter(item => !selectedIds.includes(item.id)));
            setSelectedIds([]);
        }
    };

    const handleCheckboxChange = (id: number) => {
        setSelectedIds(prev =>
            prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
        );
    };

    const handleSelectAll = (checked: boolean) => {
        setSelectedIds(checked ? bloodStock.map(item => item.id) : []);
    };

    useEffect(() => {
        const selectAllCheckbox = document.getElementById("selectAll") as HTMLInputElement;
        if (selectAllCheckbox) {
            selectAllCheckbox.indeterminate =
                selectedIds.length > 0 && selectedIds.length < bloodStock.length;
        }
    }, [selectedIds, bloodStock]);

    const checkboxItems = [
        { label: "Checkbox", checked: true },
        { label: "Blood Product ID", checked: true },
        { label: "Blood Type", checked: true },
        { label: "Component Type", checked: true },
        { label: "Quantity In Stock", checked: true },
        { label: "Expiry Date", checked: true },
        { label: "Collection Date", checked: true },
        { label: "Storage Location", checked: true },
        { label: "Donation Status", checked: true },
        { label: "Batch Number", checked: true },
        { label: "Condition Status", checked: true },
        { label: "Temperature Range", checked: true },
        { label: "Date Last Updated", checked: true },
        { label: "Actions", checked: true },
    ];

    const deleteSelectedItem = async (id: any) => {
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 500));
            setBloodStock(prev => prev.filter(item => item.id !== id));
            console.log("Blood stock item deleted:", id);
        } catch (error) {
            console.error("Error deleting blood stock item:", error);
        }
    };

    const handleEditClick = (item: BloodStock) => {
        setEditingItem(item);
        setIsEditModalOpen(true);
    };

    const handleUpdateItem = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 500));

            setBloodStock(prev =>
                prev.map(item =>
                    item.id === editingItem?.id ? editingItem : item
                )
            );

            alert("Blood stock updated successfully!");
            setIsEditModalOpen(false);
        } catch (error) {
            console.error("Error updating blood stock:", error);
            alert("An unexpected error occurred.");
        }
    };

    return (
        <>
            <div className='px-4 sm:px-6 py-[20px] mt-0'>
                <div className="flex items-center justify-between relative top-[-5px]">
                    <div className="flex items-center flex-wrap space-x-2">
                        <h1 className="text-[20px] font-semibold">Blood Stock</h1>
                        <span className="text-[20px] font-bold">›</span>
                        <Home size={18} />
                        <span>›</span>
                        <span className="text-sm">Blood Bank</span>
                        <span>›</span>
                        <span className="text-sm">Blood Stock</span>
                    </div>
                </div>

                <div className="h-auto mt-3">
                    <div className="max-w-full">
                        <div className="bg-[var(--tableHeaderBg)] rounded-t-xl shadow-md overflow-hidden">
                            {/* Header */}
                            <div className="pr-[15px] pl-[20px] py-[8px] border-b border-gray-200 flex max-[390px]:gap-2 items-center flex-wrap">
                                <div className='flex items-center flex-[35%]'>
                                    <h1 className="m-0 text-[17px] leading-[28px] pr-[10px] font-medium">Blood Stock</h1>
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

                                    <Link href="/add-blood-stock">
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
                                        <div className="p-8 text-center text-gray-500">Loading blood stock...</div>
                                    ) : bloodStock.length === 0 ? (
                                        <div className="p-8 text-center text-gray-500">No blood stock found</div>
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
                                                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Blood Product ID</th>
                                                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Blood Type</th>
                                                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Component Type</th>
                                                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Quantity In Stock</th>
                                                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Expiry Date</th>
                                                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Collection Date</th>
                                                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Storage Location</th>
                                                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Donation Status</th>
                                                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Batch Number</th>
                                                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Condition Status</th>
                                                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Temperature Range</th>
                                                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Date Last Updated</th>
                                                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Actions</th>
                                                    </tr>
                                                </thead>

                                                <tbody role='rowgroup' className={`bg-white divide-y divide-gray-200 transition-all duration-500 ${animate ? "animate-slideDown" : ""}`}>
                                                    {bloodStock.map((item) => (
                                                        <tr key={item.id} className="transition-colors duration-150 ">
                                                            <td className="px-4 py-3 pl-[37px]">
                                                                <input
                                                                    type="checkbox"
                                                                    checked={selectedIds.includes(item.id)}
                                                                    onChange={() => handleCheckboxChange(item.id)}
                                                                    className="h-[18px] w-[18px] rounded-[2px] border-[2px] border-[#1a1b1f]"
                                                                />
                                                            </td>

                                                            <td className="px-4 py-3 whitespace-nowrap">
                                                                <div className="flex items-center">
                                                                    <div className="w-[110px] overflow-hidden text-ellipsis whitespace-nowrap">
                                                                        <div className="text-sm font-medium">
                                                                            {item.bloodProductId}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </td>

                                                            <td className="px-4 text-sm whitespace-nowrap">
                                                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${item.bloodType.includes('O') ? 'bg-red-100 text-red-800' :
                                                                        item.bloodType.includes('A') ? 'bg-blue-100 text-blue-800' :
                                                                            item.bloodType.includes('B') ? 'bg-green-100 text-green-800' :
                                                                                'bg-purple-100 text-purple-800'
                                                                    }`}>
                                                                    {item.bloodType}
                                                                </span>
                                                            </td>

                                                            <td className="px-4 text-sm">
                                                                <div className="flex items-center gap-2">
                                                                    {item.componentType}
                                                                </div>
                                                            </td>

                                                            <td className="px-4 whitespace-nowrap">
                                                                <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${item.quantityInStock > 20 ? 'bg-green-100 text-green-800' :
                                                                        item.quantityInStock > 10 ? 'bg-yellow-100 text-yellow-800' :
                                                                            'bg-red-100 text-red-800'
                                                                    }`}>
                                                                    {item.quantityInStock} units
                                                                </span>
                                                            </td>

                                                            <td className="px-4 text-sm whitespace-nowrap">
                                                                {item.expiryDate}
                                                            </td>

                                                            <td className="px-4 text-sm whitespace-nowrap">
                                                                {item.collectionDate}
                                                            </td>

                                                            <td className="px-4 text-sm">
                                                                {item.storageLocation}
                                                            </td>

                                                            <td className="px-4 text-sm">
                                                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${item.donationStatus === 'Fresh' ? 'bg-green-100 text-green-800' :
                                                                        item.donationStatus === 'Processed' ? 'bg-blue-100 text-blue-800' :
                                                                            'bg-gray-100 text-gray-800'
                                                                    }`}>
                                                                    {item.donationStatus}
                                                                </span>
                                                            </td>

                                                            <td className="px-4 text-sm font-mono">
                                                                {item.batchNumber}
                                                            </td>

                                                            <td className="px-4 text-sm">
                                                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${item.conditionStatus === 'Excellent' ? 'bg-green-100 text-green-800' :
                                                                        item.conditionStatus === 'Good' ? 'bg-blue-100 text-blue-800' :
                                                                            'bg-yellow-100 text-yellow-800'
                                                                    }`}>
                                                                    {item.conditionStatus}
                                                                </span>
                                                            </td>

                                                            <td className="px-4 text-sm">
                                                                {item.temperatureRange}
                                                            </td>

                                                            <td className="px-4 text-sm whitespace-nowrap">
                                                                {item.dateLastUpdated}
                                                            </td>

                                                            <td className="px-4 text-sm font-medium">
                                                                <div className="flex space-x-2">
                                                                    <button onClick={() => handleEditClick(item)} className="text-[#6777ef] hover:bg-[#E0E1E3] p-1 rounded-full cursor-pointer">
                                                                        <Edit className="w-5 h-5" />
                                                                    </button>
                                                                    <button onClick={() => {
                                                                        deleteSelectedItem(item.id);
                                                                    }} className="text-[#ff5200] hover:bg-[#E0E1E3] p-1 rounded-full cursor-pointer">
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
                                                {bloodStock.map((item) => (
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

                                                        {/* Blood Stock Info */}
                                                        <div className="space-y-2 text-sm">
                                                            {/* Blood Product ID */}
                                                            <div className="flex items-center gap-3 pb-2 border-b border-gray-200 p-2">
                                                                <span className="font-semibold w-32">Product ID:</span>
                                                                <span className="font-medium">{item.bloodProductId}</span>
                                                            </div>

                                                            {/* Blood Type */}
                                                            <div className="flex items-center gap-3 pb-2 border-b border-gray-200 p-2">
                                                                <span className="font-semibold w-32">Blood Type:</span>
                                                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${item.bloodType.includes('O') ? 'bg-red-100 text-red-800' :
                                                                        item.bloodType.includes('A') ? 'bg-blue-100 text-blue-800' :
                                                                            item.bloodType.includes('B') ? 'bg-green-100 text-green-800' :
                                                                                'bg-purple-100 text-purple-800'
                                                                    }`}>
                                                                    {item.bloodType}
                                                                </span>
                                                            </div>

                                                            {/* Component Type */}
                                                            <div className="flex items-center gap-3 pb-2 border-b border-gray-200 p-2">
                                                                <span className="font-semibold w-32">Component:</span>
                                                                <span>{item.componentType}</span>
                                                            </div>

                                                            {/* Quantity */}
                                                            <div className="flex items-center gap-3 pb-2 border-b border-gray-200 p-2">
                                                                <span className="font-semibold w-32">Quantity:</span>
                                                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${item.quantityInStock > 20 ? 'bg-green-100 text-green-800' :
                                                                        item.quantityInStock > 10 ? 'bg-yellow-100 text-yellow-800' :
                                                                            'bg-red-100 text-red-800'
                                                                    }`}>
                                                                    {item.quantityInStock} units
                                                                </span>
                                                            </div>

                                                            {/* Expiry Date */}
                                                            <div className="flex items-center gap-3 pb-2 border-b border-gray-200 p-2">
                                                                <span className="font-semibold w-32">Expiry Date:</span>
                                                                <span>{item.expiryDate}</span>
                                                            </div>

                                                            {/* Collection Date */}
                                                            <div className="flex items-center gap-3 pb-2 border-b border-gray-200 p-2">
                                                                <span className="font-semibold w-32">Collection Date:</span>
                                                                <span>{item.collectionDate}</span>
                                                            </div>

                                                            {/* Storage Location */}
                                                            <div className="flex items-center gap-3 pb-2 border-b border-gray-200 p-2">
                                                                <span className="font-semibold w-32">Storage:</span>
                                                                <span>{item.storageLocation}</span>
                                                            </div>

                                                            {/* Donation Status */}
                                                            <div className="flex items-center gap-3 pb-2 border-b border-gray-200 p-2">
                                                                <span className="font-semibold w-32">Status:</span>
                                                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${item.donationStatus === 'Fresh' ? 'bg-green-100 text-green-800' :
                                                                        item.donationStatus === 'Processed' ? 'bg-blue-100 text-blue-800' :
                                                                            'bg-gray-100 text-gray-800'
                                                                    }`}>
                                                                    {item.donationStatus}
                                                                </span>
                                                            </div>

                                                            {/* Batch Number */}
                                                            <div className="flex items-center gap-3 pb-2 border-b border-gray-200 p-2">
                                                                <span className="font-semibold w-32">Batch No:</span>
                                                                <span className="font-mono">{item.batchNumber}</span>
                                                            </div>

                                                            {/* Condition Status */}
                                                            <div className="flex items-center gap-3 pb-2 border-b border-gray-200 p-2">
                                                                <span className="font-semibold w-32">Condition:</span>
                                                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${item.conditionStatus === 'Excellent' ? 'bg-green-100 text-green-800' :
                                                                        item.conditionStatus === 'Good' ? 'bg-blue-100 text-blue-800' :
                                                                            'bg-yellow-100 text-yellow-800'
                                                                    }`}>
                                                                    {item.conditionStatus}
                                                                </span>
                                                            </div>

                                                            {/* Temperature Range */}
                                                            <div className="flex items-center gap-3 pb-2 border-b border-gray-200 p-2">
                                                                <span className="font-semibold w-32">Temperature:</span>
                                                                <span>{item.temperatureRange}</span>
                                                            </div>

                                                            {/* Last Updated */}
                                                            <div className="flex items-center gap-3 pb-2 border-b border-gray-200 p-2">
                                                                <span className="font-semibold w-32">Last Updated:</span>
                                                                <span>{item.dateLastUpdated}</span>
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
                    <Paginator totalItems={bloodStock.length} />
                </div>
            </div>

            {/* Edit Modal */}
            {isEditModalOpen && editingItem && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999]">
                    <div className="bg-white rounded-lg shadow-lg w-[600px] max-w-[90%] max-h-[90vh] overflow-hidden">
                        <div className="flex items-center justify-between border-b !border-gray-300 px-5 py-3">
                            <h2 className="text-lg font-semibold">
                                Edit Blood Stock - {editingItem.bloodProductId}
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
                                {/* Blood Product ID */}
                                <div className="relative">
                                    <input
                                        type="text"
                                        value={editingItem.bloodProductId}
                                        onChange={(e) => setEditingItem({ ...editingItem, bloodProductId: e.target.value })}
                                        className="peer w-full rounded-md border bg-white px-3 pt-5 pb-2 text-sm text-gray-800 focus:border-[#005CBB] focus:ring-2 focus:ring-[#005CBB] outline-none transition-all"
                                    />
                                    <label className="absolute left-3 px-1 bg-white transition-all duration-200 -top-2 text-xs text-[#005CBB]">
                                        Blood Product ID*
                                    </label>
                                </div>

                                {/* Blood Type */}
                                <div className="relative">
                                    <select
                                        value={editingItem.bloodType}
                                        onChange={(e) => setEditingItem({ ...editingItem, bloodType: e.target.value })}
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
                                        onChange={(e) => setEditingItem({ ...editingItem, componentType: e.target.value })}
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

                                {/* Quantity In Stock */}
                                <div className="relative">
                                    <input
                                        type="number"
                                        value={editingItem.quantityInStock}
                                        onChange={(e) => setEditingItem({ ...editingItem, quantityInStock: parseInt(e.target.value) })}
                                        className="peer w-full rounded-md border bg-white px-3 pt-5 pb-2 text-sm text-gray-800 focus:border-[#005CBB] focus:ring-2 focus:ring-[#005CBB] outline-none transition-all"
                                    />
                                    <label className="absolute left-3 px-1 bg-white transition-all duration-200 -top-2 text-xs text-[#005CBB]">
                                        Quantity*
                                    </label>
                                </div>

                                {/* Expiry Date */}
                                <div className="relative">
                                    <input
                                        type="date"
                                        value={editingItem.expiryDate}
                                        onChange={(e) => setEditingItem({ ...editingItem, expiryDate: e.target.value })}
                                        className="peer w-full rounded-md border bg-white px-3 pt-5 pb-2 text-sm text-gray-800 focus:border-[#005CBB] focus:ring-2 focus:ring-[#005CBB] outline-none transition-all"
                                    />
                                    <label className="absolute left-3 px-1 bg-white transition-all duration-200 -top-2 text-xs text-[#005CBB]">
                                        Expiry Date*
                                    </label>
                                </div>

                                {/* Collection Date */}
                                <div className="relative">
                                    <input
                                        type="date"
                                        value={editingItem.collectionDate}
                                        onChange={(e) => setEditingItem({ ...editingItem, collectionDate: e.target.value })}
                                        className="peer w-full rounded-md border bg-white px-3 pt-5 pb-2 text-sm text-gray-800 focus:border-[#005CBB] focus:ring-2 focus:ring-[#005CBB] outline-none transition-all"
                                    />
                                    <label className="absolute left-3 px-1 bg-white transition-all duration-200 -top-2 text-xs text-[#005CBB]">
                                        Collection Date*
                                    </label>
                                </div>
                            </div>

                            {/* Storage Location */}
                            <div className="relative">
                                <input
                                    type="text"
                                    value={editingItem.storageLocation}
                                    onChange={(e) => setEditingItem({ ...editingItem, storageLocation: e.target.value })}
                                    className="peer w-full rounded-md border bg-white px-3 pt-5 pb-2 text-sm text-gray-800 focus:border-[#005CBB] focus:ring-2 focus:ring-[#005CBB] outline-none transition-all"
                                />
                                <label className="absolute left-3 px-1 bg-white transition-all duration-200 -top-2 text-xs text-[#005CBB]">
                                    Storage Location*
                                </label>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                {/* Donation Status */}
                                <div className="relative">
                                    <select
                                        value={editingItem.donationStatus}
                                        onChange={(e) => setEditingItem({ ...editingItem, donationStatus: e.target.value })}
                                        className="peer w-full rounded-md border bg-white px-3 pt-5 pb-2 text-sm text-gray-800 focus:border-[#005CBB] focus:ring-2 focus:ring-[#005CBB] outline-none transition-all"
                                    >
                                        <option value="Fresh">Fresh</option>
                                        <option value="Processed">Processed</option>
                                        <option value="Frozen">Frozen</option>
                                    </select>
                                    <label className="absolute left-3 px-1 bg-white transition-all duration-200 -top-2 text-xs text-[#005CBB]">
                                        Donation Status*
                                    </label>
                                </div>

                                {/* Batch Number */}
                                <div className="relative">
                                    <input
                                        type="text"
                                        value={editingItem.batchNumber}
                                        onChange={(e) => setEditingItem({ ...editingItem, batchNumber: e.target.value })}
                                        className="peer w-full rounded-md border bg-white px-3 pt-5 pb-2 text-sm text-gray-800 focus:border-[#005CBB] focus:ring-2 focus:ring-[#005CBB] outline-none transition-all"
                                    />
                                    <label className="absolute left-3 px-1 bg-white transition-all duration-200 -top-2 text-xs text-[#005CBB]">
                                        Batch Number*
                                    </label>
                                </div>

                                {/* Condition Status */}
                                <div className="relative">
                                    <select
                                        value={editingItem.conditionStatus}
                                        onChange={(e) => setEditingItem({ ...editingItem, conditionStatus: e.target.value })}
                                        className="peer w-full rounded-md border bg-white px-3 pt-5 pb-2 text-sm text-gray-800 focus:border-[#005CBB] focus:ring-2 focus:ring-[#005CBB] outline-none transition-all"
                                    >
                                        <option value="Excellent">Excellent</option>
                                        <option value="Good">Good</option>
                                        <option value="Fair">Fair</option>
                                    </select>
                                    <label className="absolute left-3 px-1 bg-white transition-all duration-200 -top-2 text-xs text-[#005CBB]">
                                        Condition Status*
                                    </label>
                                </div>

                                {/* Temperature Range */}
                                <div className="relative">
                                    <input
                                        type="text"
                                        value={editingItem.temperatureRange}
                                        onChange={(e) => setEditingItem({ ...editingItem, temperatureRange: e.target.value })}
                                        className="peer w-full rounded-md border bg-white px-3 pt-5 pb-2 text-sm text-gray-800 focus:border-[#005CBB] focus:ring-2 focus:ring-[#005CBB] outline-none transition-all"
                                    />
                                    <label className="absolute left-3 px-1 bg-white transition-all duration-200 -top-2 text-xs text-[#005CBB]">
                                        Temperature Range*
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