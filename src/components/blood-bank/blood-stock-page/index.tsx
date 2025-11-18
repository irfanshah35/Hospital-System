'use client';

import { CirclePlus, Download, Home, RotateCw, Trash2, Edit, Calendar, MapPin, Thermometer, Tag } from 'lucide-react';
import React, { useEffect, useState, useRef } from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

interface BloodStock {
    id: string;
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
    const [selectedIds, setSelectedIds] = useState<string[]>([]);
    const [bloodStock, setBloodStock] = useState<BloodStock[]>([]);
    const [animate, setAnimate] = useState(false);
    const [loading, setLoading] = useState(true);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<BloodStock | null>(null);
    const [isEditMode, setIsEditMode] = useState(false);

    // Blood Stock Data Array
    const bloodStockData: BloodStock[] = [
        {
            id: "1",
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
            id: "2",
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
            id: "3",
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

    const removeData = (id: string) => {
        if (window.confirm("Are you sure you want to delete this blood stock item?")) {
            try {
                setBloodStock(prev => prev.filter(item => item.id !== id));
                setSelectedIds(prev => prev.filter(selectedId => selectedId !== id));
            } catch (error) {
                console.error("Delete error:", error);
                alert("Error deleting blood stock item");
            }
        }
    };

    const handleDeleteSelected = async () => {
        if (selectedIds.length === 0) {
            alert("Please select at least one blood stock item to delete.");
            return;
        }
        if (window.confirm(`Delete ${selectedIds.length} blood stock item(s)?`)) {
            try {
                setBloodStock(prev => prev.filter(item => !selectedIds.includes(item.id)));
                setSelectedIds([]);
            } catch (error) {
                console.error("Delete error:", error);
                alert("Error deleting blood stock items");
            }
        }
    };

    const handleAddClick = () => {
        setEditingItem({
            id: '',
            bloodProductId: '',
            bloodType: 'O+',
            componentType: 'Whole Blood',
            quantityInStock: 0,
            expiryDate: new Date().toISOString().split('T')[0],
            collectionDate: new Date().toISOString().split('T')[0],
            storageLocation: '',
            donationStatus: 'Fresh',
            batchNumber: '',
            conditionStatus: 'Good',
            temperatureRange: '',
            dateLastUpdated: new Date().toISOString().split('T')[0]
        });
        setIsEditMode(false);
        setIsModalOpen(true);
    };

    const handleEditClick = (item: BloodStock) => {
        setEditingItem(item);
        setIsEditMode(true);
        setIsModalOpen(true);
    };

    const handleModalSubmit = (formData: BloodStock) => {
        if (isEditMode && editingItem?.id) {
            // Edit existing record
            setBloodStock(prev =>
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
            setBloodStock(prev => [...prev, newItem]);
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
                                        title="Add New Blood Stock"
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
                                        <div className="p-8 text-center text-gray-500">Loading blood stock...</div>
                                    ) : bloodStock.length === 0 ? (
                                        <div className="p-8 text-center text-gray-500">No blood stock found</div>
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

                                                <tbody className={`bg-white divide-y divide-gray-200 transition-all duration-500 ${animate ? "animate-slideDown" : ""}`}>
                                                    {bloodStock.map((item) => (
                                                        <tr key={item.id} className="transition-colors duration-150">
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
                                                                    {item.bloodProductId}
                                                                </div>
                                                            </td>

                                                            <td className="px-4 py-3 whitespace-nowrap">
                                                                <span className={`px-[10px] py-[2px] inline-flex text-xs leading-5 font-semibold rounded-[6px] ${
                                                                    item.bloodType.includes('O') ? 'bg-[#f4433626] text-[#f44336]' : 
                                                                    item.bloodType.includes('A') ? 'bg-[#2196f326] text-[#2196f3]' :
                                                                    item.bloodType.includes('B') ? 'bg-[#4caf5026] text-[#4caf50]' :
                                                                    'bg-[#9c27b026] text-[#9c27b0]'
                                                                }`}>
                                                                    {item.bloodType}
                                                                </span>
                                                            </td>

                                                            <td className="px-4 py-3 text-sm whitespace-nowrap">
                                                                {item.componentType}
                                                            </td>

                                                            <td className="px-4 py-3 whitespace-nowrap">
                                                                <span className={`px-[10px] py-[2px] inline-flex text-xs leading-5 font-semibold rounded-[6px] ${
                                                                    item.quantityInStock > 20 ? 'bg-[#4caf5026] text-[#4caf50]' :
                                                                    item.quantityInStock > 10 ? 'bg-[#ff980026] text-[#ff9800]' :
                                                                    'bg-[#f4433626] text-[#f44336]'
                                                                }`}>
                                                                    {item.quantityInStock} units
                                                                </span>
                                                            </td>

                                                            <td className="px-4 py-3 text-sm whitespace-nowrap">
                                                                {item.expiryDate}
                                                            </td>

                                                            <td className="px-4 py-3 text-sm whitespace-nowrap">
                                                                {item.collectionDate}
                                                            </td>

                                                            <td className="px-4 py-3 text-sm whitespace-nowrap">
                                                                {item.storageLocation}
                                                            </td>

                                                            <td className="px-4 py-3 whitespace-nowrap">
                                                                <span className={`px-[10px] py-[2px] inline-flex text-xs leading-5 font-semibold rounded-[6px] ${
                                                                    item.donationStatus === 'Fresh' ? 'bg-[#4caf5026] text-[#4caf50]' :
                                                                    item.donationStatus === 'Processed' ? 'bg-[#2196f326] text-[#2196f3]' :
                                                                    'bg-[#607d8b26] text-[#607d8b]'
                                                                }`}>
                                                                    {item.donationStatus}
                                                                </span>
                                                            </td>

                                                            <td className="px-4 py-3 text-sm whitespace-nowrap font-mono">
                                                                {item.batchNumber}
                                                            </td>

                                                            <td className="px-4 py-3 whitespace-nowrap">
                                                                <span className={`px-[10px] py-[2px] inline-flex text-xs leading-5 font-semibold rounded-[6px] ${
                                                                    item.conditionStatus === 'Excellent' ? 'bg-[#4caf5026] text-[#4caf50]' :
                                                                    item.conditionStatus === 'Good' ? 'bg-[#2196f326] text-[#2196f3]' :
                                                                    'bg-[#ff980026] text-[#ff9800]'
                                                                }`}>
                                                                    {item.conditionStatus}
                                                                </span>
                                                            </td>

                                                            <td className="px-4 py-3 text-sm whitespace-nowrap">
                                                                {item.temperatureRange}
                                                            </td>

                                                            <td className="px-4 py-3 text-sm whitespace-nowrap">
                                                                {item.dateLastUpdated}
                                                            </td>

                                                            <td className="px-4 py-3 text-sm font-medium">
                                                                <div className="flex space-x-2">
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
                                                {bloodStock.map((item) => (
                                                    <div key={item.id} className="border-b border-gray-200 py-4">
                                                        <div className="flex items-center h-13 justify-start py-2 border-b border-[#dadada]">
                                                            <input
                                                                checked={selectedIds.includes(item.id)}
                                                                onChange={() => handleCheckboxChange(item.id)}
                                                                type="checkbox" className="w-4 h-4 text-blue-600 rounded" />
                                                        </div>
                                                        <div className="text-sm text-gray-800">
                                                            <div className="flex items-center h-13 space-x-3 border-b border-[#dadada] gap-4">
                                                                <span className="font-semibold">Blood Product ID:</span>
                                                                <div className='flex items-center'>
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
                                                                <span className="font-semibold">Quantity:</span>
                                                                <div className='flex items-center'>
                                                                    <span className={`px-2 py-1 rounded-full text-xs ${item.quantityInStock > 20 ? 'bg-green-100 text-green-800' :
                                                                        item.quantityInStock > 10 ? 'bg-yellow-100 text-yellow-800' :
                                                                        'bg-red-100 text-red-800'}`}>
                                                                        {item.quantityInStock} units
                                                                    </span>
                                                                </div>
                                                            </div>
                                                            <div className="flex items-center h-13 space-x-3 border-b border-[#dadada] gap-4">
                                                                <span className="font-semibold">Expiry Date:</span>
                                                                <div className='flex items-center'>
                                                                    <Calendar className='w-5 h-5 text-purple-500' />
                                                                    <span className="ml-1">{item.expiryDate}</span>
                                                                </div>
                                                            </div>
                                                            <div className="flex items-center h-13 space-x-3 border-b border-[#dadada] gap-4">
                                                                <span className="font-semibold">Collection Date:</span>
                                                                <div className='flex items-center'>
                                                                    <Calendar className='w-5 h-5 text-blue-500' />
                                                                    <span className="ml-1">{item.collectionDate}</span>
                                                                </div>
                                                            </div>
                                                            <div className="flex items-center h-13 space-x-3 border-b border-[#dadada] gap-4">
                                                                <span className="font-semibold">Storage Location:</span>
                                                                <div className='flex items-center'>
                                                                    <MapPin className='w-5 h-5 text-green-500' />
                                                                    <span className="ml-1">{item.storageLocation}</span>
                                                                </div>
                                                            </div>
                                                            <div className="flex items-center h-13 space-x-3 border-b border-[#dadada] gap-4">
                                                                <span className="font-semibold">Donation Status:</span>
                                                                <div className='flex items-center'>
                                                                    <span className={`px-2 py-1 rounded-full text-xs ${item.donationStatus === 'Fresh' ? 'bg-green-100 text-green-800' :
                                                                        item.donationStatus === 'Processed' ? 'bg-blue-100 text-blue-800' :
                                                                        'bg-gray-100 text-gray-800'}`}>
                                                                        {item.donationStatus}
                                                                    </span>
                                                                </div>
                                                            </div>
                                                            <div className="flex items-center h-13 space-x-3 border-b border-[#dadada] gap-4">
                                                                <span className="font-semibold">Batch Number:</span>
                                                                <div className='flex items-center'>
                                                                    <Tag className='w-5 h-5 text-orange-500' />
                                                                    <span className="ml-1">{item.batchNumber}</span>
                                                                </div>
                                                            </div>
                                                            <div className="flex items-center h-13 space-x-3 border-b border-[#dadada] gap-4">
                                                                <span className="font-semibold">Condition Status:</span>
                                                                <div className='flex items-center'>
                                                                    <span className={`px-2 py-1 rounded-full text-xs ${item.conditionStatus === 'Excellent' ? 'bg-green-100 text-green-800' :
                                                                        item.conditionStatus === 'Good' ? 'bg-blue-100 text-blue-800' :
                                                                        'bg-yellow-100 text-yellow-800'}`}>
                                                                        {item.conditionStatus}
                                                                    </span>
                                                                </div>
                                                            </div>
                                                            <div className="flex items-center h-13 space-x-3 border-b border-[#dadada] gap-4">
                                                                <span className="font-semibold">Temperature Range:</span>
                                                                <div className='flex items-center'>
                                                                    <Thermometer className='w-5 h-5 text-red-500' />
                                                                    <span className="ml-1">{item.temperatureRange}</span>
                                                                </div>
                                                            </div>
                                                            <div className="flex items-center h-13 space-x-3 border-b border-[#dadada] gap-4">
                                                                <span className="font-semibold">Last Updated:</span>
                                                                <div className='flex items-center'>
                                                                    <Calendar className='w-5 h-5 text-gray-500' />
                                                                    <span className="ml-1">{item.dateLastUpdated}</span>
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
                    <Paginator totalItems={bloodStock.length} />
                </div>
            </div>

            {/* Blood Stock Modal */}
            {isModalOpen && (
                <BloodStockModal
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
                <option hidden></option>
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
interface BloodStockModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (formData: BloodStock) => void;
    initialData?: BloodStock | null;
    isEditMode?: boolean;
}

const BloodStockModal: React.FC<BloodStockModalProps> = ({
    isOpen,
    onClose,
    onSubmit,
    initialData,
    isEditMode = false
}) => {
    const [formData, setFormData] = useState<BloodStock>({
        id: '',
        bloodProductId: '',
        bloodType: 'O+',
        componentType: 'Whole Blood',
        quantityInStock: 0,
        expiryDate: new Date().toISOString().split('T')[0],
        collectionDate: new Date().toISOString().split('T')[0],
        storageLocation: '',
        donationStatus: 'Fresh',
        batchNumber: '',
        conditionStatus: 'Good',
        temperatureRange: '',
        dateLastUpdated: new Date().toISOString().split('T')[0]
    });

    const modalRef = useRef<HTMLDivElement>(null);

    const isFormValid =
        formData.bloodProductId.trim() !== '' &&
        formData.bloodType.trim() !== '' &&
        formData.componentType.trim() !== '' &&
        formData.quantityInStock > 0 &&
        formData.expiryDate.trim() !== '' &&
        formData.collectionDate.trim() !== '' &&
        formData.storageLocation.trim() !== '' &&
        formData.donationStatus.trim() !== '' &&
        formData.batchNumber.trim() !== '' &&
        formData.conditionStatus.trim() !== '' &&
        formData.temperatureRange.trim() !== '';

    useEffect(() => {
        if (initialData) {
            setFormData(initialData);
        } else {
            // Reset form when adding new
            setFormData({
                id: '',
                bloodProductId: '',
                bloodType: 'O+',
                componentType: 'Whole Blood',
                quantityInStock: 0,
                expiryDate: new Date().toISOString().split('T')[0],
                collectionDate: new Date().toISOString().split('T')[0],
                storageLocation: '',
                donationStatus: 'Fresh',
                batchNumber: '',
                conditionStatus: 'Good',
                temperatureRange: '',
                dateLastUpdated: new Date().toISOString().split('T')[0]
            });
        }
    }, [initialData, isOpen]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'quantityInStock' ? parseInt(value) : value
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
            <div ref={modalRef} className="bg-white rounded-lg shadow-lg w-full max-w-[646.8px] mx-4 max-h-[80vh] overflow-hidden">
                {/* Modal Header */}
                <div className="flex justify-between items-center p-4 border-b border-gray-300">
                    <div className="flex items-center">
                        <h2 className="font-semibold leading-[35px]">
                            {isEditMode ? `${formData.bloodType}` : 'New Blood Stock'}
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
                <div className="py-5 px-6 max-h-[65vh] overflow-y-auto scrollbar-hide">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Blood Product ID */}
                            <FloatingInput
                                label="Blood Product ID"
                                name="bloodProductId"
                                value={formData.bloodProductId}
                                onChange={handleInputChange}
                                required
                            />

                            {/* Blood Type */}
                            <FloatingSelect
                                label="Blood Type"
                                name="bloodType"
                                value={formData.bloodType}
                                onChange={handleInputChange}
                                options={['O+', 'O-', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-']}
                                required
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Component Type */}
                            <FloatingSelect
                                label="Component Type"
                                name="componentType"
                                value={formData.componentType}
                                onChange={handleInputChange}
                                options={['Whole Blood', 'Red Blood Cells', 'Platelets', 'Plasma', 'Cryoprecipitate']}
                                required
                            />

                            {/* Quantity In Stock */}
                            <FloatingInput
                                label="Quantity In Stock"
                                name="quantityInStock"
                                value={formData.quantityInStock}
                                onChange={handleInputChange}
                                type="number"
                                required
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Collection Date */}
                            <FloatingInput
                                type="date"
                                label="Collection Date"
                                name="collectionDate"
                                value={formData.collectionDate}
                                onChange={handleInputChange}
                                required
                            />

                            {/* Expiry Date */}
                            <FloatingInput
                                type="date"
                                label="Expiry Date"
                                name="expiryDate"
                                value={formData.expiryDate}
                                onChange={handleInputChange}
                                required
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Storage Location */}
                            <FloatingInput
                                label="Storage Location"
                                name="storageLocation"
                                value={formData.storageLocation}
                                onChange={handleInputChange}
                                icon={MapPin}
                                required
                            />

                            {/* Donation Status */}
                            <FloatingSelect
                                label="Donation Status"
                                name="donationStatus"
                                value={formData.donationStatus}
                                onChange={handleInputChange}
                                options={['Fresh', 'Processed', 'Frozen']}
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
                                icon={Tag}
                                required
                            />

                            {/* Condition Status */}
                            <FloatingSelect
                                label="Condition Status"
                                name="conditionStatus"
                                value={formData.conditionStatus}
                                onChange={handleInputChange}
                                options={['Excellent', 'Good', 'Fair']}
                                required
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Temperature Range */}
                            <FloatingInput
                                label="Temperature Range"
                                name="temperatureRange"
                                value={formData.temperatureRange}
                                onChange={handleInputChange}
                                icon={Thermometer}
                                required
                            />

                            {/* Date Last Updated */}
                            <FloatingInput
                                type="date"
                                label="Date Last Updated"
                                name="dateLastUpdated"
                                value={formData.dateLastUpdated}
                                onChange={handleInputChange}
                                required
                            />
                        </div>

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