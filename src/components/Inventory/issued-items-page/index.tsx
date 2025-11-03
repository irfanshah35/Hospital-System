'use client';

import { CirclePlus, Download, Home, RotateCw, Trash2, Edit, Package, Calendar, User, CheckCircle, XCircle } from 'lucide-react';
import React, { useEffect, useState, useRef } from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import Link from 'next/link';

interface IssuedItem {
    id: number;
    itemName: string;
    category: string;
    issueDate: string;
    returnDate: string;
    issuedTo: string;
    quantity: number;
    status: "Issued" | "Returned" | "Overdue";
}

export default function IssuedItemsPage() {
    const [detailDropdown, setDetailDropdown] = useState(false);
    const detailref = useRef<HTMLDivElement | null>(null);
    const [selectedIds, setSelectedIds] = useState<number[]>([]);
    const [issuedItems, setIssuedItems] = useState<IssuedItem[]>([]);
    const [animate, setAnimate] = useState(false);
    const [loading, setLoading] = useState(true);

    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<IssuedItem | null>(null);

    // Issued Items Data Array
    const issuedItemsData: IssuedItem[] = [
        {
            id: 1,
            itemName: "Blood Pressure Monitor",
            category: "Medical Devices",
            issueDate: "2024-10-15",
            returnDate: "2024-10-22",
            issuedTo: "Dr. Sarah Wilson",
            quantity: 1,
            status: "Returned"
        },
        {
            id: 2,
            itemName: "Surgical Gloves",
            category: "Medical Supplies",
            issueDate: "2024-10-16",
            returnDate: "2024-10-23",
            issuedTo: "Nurse Emily Johnson",
            quantity: 50,
            status: "Issued"
        },
        {
            id: 3,
            itemName: "Stethoscope",
            category: "Diagnostic Tools",
            issueDate: "2024-10-17",
            returnDate: "2024-10-24",
            issuedTo: "Dr. Michael Brown",
            quantity: 2,
            status: "Issued"
        },
        {
            id: 4,
            itemName: "IV Stand",
            category: "Medical Equipment",
            issueDate: "2024-10-18",
            returnDate: "2024-10-25",
            issuedTo: "Ward A - Floor 2",
            quantity: 3,
            status: "Overdue"
        },
        {
            id: 5,
            itemName: "Thermometer Digital",
            category: "Medical Devices",
            issueDate: "2024-10-19",
            returnDate: "2024-10-26",
            issuedTo: "Emergency Department",
            quantity: 5,
            status: "Returned"
        },
        {
            id: 6,
            itemName: "First Aid Kit",
            category: "Emergency",
            issueDate: "2024-10-20",
            returnDate: "2024-10-27",
            issuedTo: "Ambulance #5",
            quantity: 2,
            status: "Issued"
        },
        {
            id: 7,
            itemName: "Oxygen Cylinder",
            category: "Life Support",
            issueDate: "2024-10-21",
            returnDate: "2024-10-28",
            issuedTo: "ICU Ward",
            quantity: 1,
            status: "Overdue"
        },
        {
            id: 8,
            itemName: "Wheelchair",
            category: "Mobility Aids",
            issueDate: "2024-10-22",
            returnDate: "2024-10-29",
            issuedTo: "Patient Transport",
            quantity: 1,
            status: "Returned"
        },
        {
            id: 9,
            itemName: "Defibrillator",
            category: "Emergency Equipment",
            issueDate: "2024-10-23",
            returnDate: "2024-10-30",
            issuedTo: "Cardiac Unit",
            quantity: 1,
            status: "Issued"
        },
        {
            id: 10,
            itemName: "Patient Monitor",
            category: "Monitoring Devices",
            issueDate: "2024-10-24",
            returnDate: "2024-10-31",
            issuedTo: "Surgery Ward",
            quantity: 2,
            status: "Overdue"
        }
    ];

    // Fetch data from API (simulated)
    const fetchIssuedItems = async () => {
        setLoading(true);
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            setIssuedItems(issuedItemsData);
        } catch (error) {
            console.error("Failed to fetch issued items:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchIssuedItems();
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
        fetchIssuedItems().then(() => {
            setTimeout(() => setAnimate(false), 300);
        });
    };

    const handleDownloadXLSX = () => {
        const worksheet = XLSX.utils.json_to_sheet(
            issuedItems.map((item) => ({
                "Item Name": item.itemName,
                "Category": item.category,
                "Issue Date": item.issueDate,
                "Return Date": item.returnDate,
                "Issued To": item.issuedTo,
                "Quantity": item.quantity,
                "Status": item.status,
            }))
        );

        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Issued Items");
        const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
        const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
        saveAs(blob, "issued-items.xlsx");
    };

    const removeData = () => {
        if (selectedIds.length === 0) {
            alert("Please select at least one item to delete.");
            return;
        }
        if (window.confirm(`Delete ${selectedIds.length} item(s)?`)) {
            setIssuedItems(prev => prev.filter(item => !selectedIds.includes(item.id)));
            setSelectedIds([]);
        }
    };

    const handleCheckboxChange = (id: number) => {
        setSelectedIds(prev =>
            prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
        );
    };

    const handleSelectAll = (checked: boolean) => {
        setSelectedIds(checked ? issuedItems.map(item => item.id) : []);
    };

    useEffect(() => {
        const selectAllCheckbox = document.getElementById("selectAll") as HTMLInputElement;
        if (selectAllCheckbox) {
            selectAllCheckbox.indeterminate =
                selectedIds.length > 0 && selectedIds.length < issuedItems.length;
        }
    }, [selectedIds, issuedItems]);

    const checkboxItems = [
        { label: "Checkbox", checked: true },
        { label: "Item Name", checked: true },
        { label: "Category", checked: true },
        { label: "Issue Date", checked: true },
        { label: "Return Date", checked: true },
        { label: "Issued To", checked: true },
        { label: "Quantity", checked: true },
        { label: "Status", checked: true },
        { label: "Actions", checked: true },
    ];

    const deleteSelectedItem = async (id: any) => {
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 500));
            setIssuedItems(prev => prev.filter(item => item.id !== id));
            console.log("Issued item deleted:", id);
        } catch (error) {
            console.error("Error deleting issued item:", error);
        }
    };

    const handleEditClick = (item: IssuedItem) => {
        setEditingItem(item);
        setIsEditModalOpen(true);
    };

    const handleUpdateItem = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 500));
            
            setIssuedItems(prev => 
                prev.map(item => 
                    item.id === editingItem?.id ? editingItem : item
                )
            );
            
            alert("Issued item updated successfully!");
            setIsEditModalOpen(false);
        } catch (error) {
            console.error("Error updating issued item:", error);
            alert("An unexpected error occurred.");
        }
    };

    return (
        <>
            <div className='px-4 sm:px-6 py-[20px] mt-0'>
                <div className="flex items-center justify-between relative top-[-5px]">
                    <div className="flex items-center flex-wrap space-x-2">
                        <h1 className="text-[20px] font-semibold">Issued Items</h1>
                        <span className="text-[20px] font-bold">›</span>
                        <Home size={18} />
                        <span>›</span>
                        <span className="text-sm">Inventory</span>
                        <span>›</span>
                        <span className="text-sm">Issued Items</span>
                    </div>
                </div>

                <div className="h-auto mt-3">
                    <div className="max-w-full">
                        <div className="bg-[var(--tableHeaderBg)] rounded-t-xl shadow-md overflow-hidden">
                            {/* Header */}
                            <div className="pr-[15px] pl-[20px] py-[8px] border-b border-gray-200 flex max-[390px]:gap-2 items-center flex-wrap">
                                <div className='flex items-center flex-[35%]'>
                                    <h1 className="m-0 text-[17px] leading-[28px] pr-[10px] font-medium">Issued Items</h1>
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

                                    <Link href="/add-issued-item">
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
                                        <div className="p-8 text-center text-gray-500">Loading issued items...</div>
                                    ) : issuedItems.length === 0 ? (
                                        <div className="p-8 text-center text-gray-500">No issued items found</div>
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
                                                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Item Name</th>
                                                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Category</th>
                                                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Issue Date</th>
                                                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Return Date</th>
                                                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Issued To</th>
                                                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Quantity</th>
                                                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Status</th>
                                                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Actions</th>
                                                    </tr>
                                                </thead>

                                                <tbody role='rowgroup' className={`bg-white divide-y divide-gray-200 transition-all duration-500 ${animate ? "animate-slideDown" : ""}`}>
                                                    {issuedItems.map((item) => (
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
                                                                <div className="flex items-center gap-3">
                                                                    <div className="text-sm font-medium">
                                                                        {item.itemName}
                                                                    </div>
                                                                </div>
                                                            </td>

                                                            <td className="px-4 py-3 whitespace-nowrap">
                                                                <span className={`px-2 py-1 rounded-full text-xs font-medium `}>
                                                                    {item.category}
                                                                </span>
                                                            </td>

                                                            <td className="px-4 py-3 whitespace-nowrap">
                                                                <div className="flex items-center gap-2">
                                                                    <Calendar className="w-4 h-4 text-gray-600" />
                                                                    <span className="text-sm">{item.issueDate}</span>
                                                                </div>
                                                            </td>

                                                            <td className="px-4 py-3 whitespace-nowrap">
                                                                <div className="flex items-center gap-2">
                                                                    <Calendar className="w-4 h-4 text-gray-600" />
                                                                    <span className="text-sm">{item.returnDate}</span>
                                                                </div>
                                                            </td>

                                                            <td className="px-4 py-3 whitespace-nowrap">
                                                                <div className="flex items-center gap-2">
                                                                    <span className="text-sm">{item.issuedTo}</span>
                                                                </div>
                                                            </td>

                                                            <td className="px-4 py-3 whitespace-nowrap">
                                                                <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full `}>
                                                                    {item.quantity} pcs
                                                                </span>
                                                            </td>

                                                            <td className="px-4 py-3 whitespace-nowrap">
                                                                <span className={`px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${
                                                                    item.status === "Returned" ? "bg-green-100 text-green-800" :
                                                                    item.status === "Issued" ? "bg-blue-100 text-blue-800" :
                                                                    "bg-red-100 text-red-800"
                                                                }`}>
                                                                    {item.status === "Returned" ? (
                                                                        <CheckCircle className="w-3 h-3" />
                                                                    ) : item.status === "Issued" ? (
                                                                        <Package className="w-3 h-3" />
                                                                    ) : (
                                                                        <XCircle className="w-3 h-3" />
                                                                    )}
                                                                    {item.status}
                                                                </span>
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
                                                {issuedItems.map((item) => (
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

                                                        {/* Issued Item Info */}
                                                        <div className="space-y-2 text-sm">
                                                            {/* Item Name */}
                                                            <div className="flex items-center gap-3 pb-2 border-b border-gray-200 p-2">
                                                                <span className="font-semibold w-28">Item Name:</span>
                                                                <div className="flex items-center gap-2">
                                                                    <span className="font-medium">{item.itemName}</span>
                                                                </div>
                                                            </div>

                                                            {/* Category */}
                                                            <div className="flex items-center gap-3 pb-2 border-b border-gray-200 p-2">
                                                                <span className="font-semibold w-28">Category:</span>
                                                                <span className={`px-2 py-1 rounded-full text-xs font-medium `}>
                                                                    {item.category}
                                                                </span>
                                                            </div>

                                                            {/* Issue Date */}
                                                            <div className="flex items-center gap-3 pb-2 border-b border-gray-200 p-2">
                                                                <span className="font-semibold w-28">Issue Date:</span>
                                                                <div className="flex items-center gap-2">
                                                                    <Calendar className="w-4 h-4 text-gray-600" />
                                                                    <span>{item.issueDate}</span>
                                                                </div>
                                                            </div>

                                                            {/* Return Date */}
                                                            <div className="flex items-center gap-3 pb-2 border-b border-gray-200 p-2">
                                                                <span className="font-semibold w-28">Return Date:</span>
                                                                <div className="flex items-center gap-2">
                                                                    <Calendar className="w-4 h-4 text-gray-600" />
                                                                    <span>{item.returnDate}</span>
                                                                </div>
                                                            </div>

                                                            {/* Issued To */}
                                                            <div className="flex items-center gap-3 pb-2 border-b border-gray-200 p-2">
                                                                <span className="font-semibold w-28">Issued To:</span>
                                                                <div className="flex items-center gap-2">
                                                                    <span>{item.issuedTo}</span>
                                                                </div>
                                                            </div>

                                                            {/* Quantity */}
                                                            <div className="flex items-center gap-3 pb-2 border-b border-gray-200 p-2">
                                                                <span className="font-semibold w-28">Quantity:</span>
                                                                <span className={`px-2 py-1 rounded-full text-xs font-medium `}>
                                                                    {item.quantity} pcs
                                                                </span>
                                                            </div>

                                                            {/* Status */}
                                                            <div className="flex items-center gap-3 pb-2 border-b border-gray-200 p-2">
                                                                <span className="font-semibold w-28">Status:</span>
                                                                <span className={`px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${
                                                                    item.status === "Returned" ? "bg-green-100 text-green-800" :
                                                                    item.status === "Issued" ? "bg-blue-100 text-blue-800" :
                                                                    "bg-red-100 text-red-800"
                                                                }`}>
                                                                    {item.status === "Returned" ? (
                                                                        <CheckCircle className="w-3 h-3" />
                                                                    ) : item.status === "Issued" ? (
                                                                        <Package className="w-3 h-3" />
                                                                    ) : (
                                                                        <XCircle className="w-3 h-3" />
                                                                    )}
                                                                    {item.status}
                                                                </span>
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
                    <Paginator totalItems={issuedItems.length} />
                </div>
            </div>

            {/* Edit Modal */}
            {isEditModalOpen && editingItem && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999]">
                    <div className="bg-white rounded-lg shadow-lg w-[600px] max-w-[90%] max-h-[90vh] overflow-hidden">
                        <div className="flex items-center justify-between border-b !border-gray-300 px-5 py-3">
                            <h2 className="text-lg font-semibold">
                                Edit Issued Item - {editingItem.itemName}
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
                                {/* Item Name */}
                                <div className="relative">
                                    <input
                                        type="text"
                                        value={editingItem.itemName}
                                        onChange={(e) => setEditingItem({...editingItem, itemName: e.target.value})}
                                        className="peer w-full rounded-md border bg-white px-3 pt-5 pb-2 text-sm text-gray-800 focus:border-[#005CBB] focus:ring-2 focus:ring-[#005CBB] outline-none transition-all"
                                    />
                                    <label className="absolute left-3 px-1 bg-white transition-all duration-200 -top-2 text-xs text-[#005CBB]">
                                        Item Name*
                                    </label>
                                </div>

                                {/* Category */}
                                <div className="relative">
                                    <select
                                        value={editingItem.category}
                                        onChange={(e) => setEditingItem({...editingItem, category: e.target.value})}
                                        className="peer w-full rounded-md border bg-white px-3 pt-5 pb-2 text-sm text-gray-800 focus:border-[#005CBB] focus:ring-2 focus:ring-[#005CBB] outline-none transition-all"
                                    >
                                        <option value="Medical Devices">Medical Devices</option>
                                        <option value="Medical Supplies">Medical Supplies</option>
                                        <option value="Diagnostic Tools">Diagnostic Tools</option>
                                        <option value="Medical Equipment">Medical Equipment</option>
                                        <option value="Emergency">Emergency</option>
                                        <option value="Life Support">Life Support</option>
                                        <option value="Mobility Aids">Mobility Aids</option>
                                        <option value="Emergency Equipment">Emergency Equipment</option>
                                        <option value="Monitoring Devices">Monitoring Devices</option>
                                    </select>
                                    <label className="absolute left-3 px-1 bg-white transition-all duration-200 -top-2 text-xs text-[#005CBB]">
                                        Category*
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

                                {/* Return Date */}
                                <div className="relative">
                                    <input
                                        type="date"
                                        value={editingItem.returnDate}
                                        onChange={(e) => setEditingItem({...editingItem, returnDate: e.target.value})}
                                        className="peer w-full rounded-md border bg-white px-3 pt-5 pb-2 text-sm text-gray-800 focus:border-[#005CBB] focus:ring-2 focus:ring-[#005CBB] outline-none transition-all"
                                    />
                                    <label className="absolute left-3 px-1 bg-white transition-all duration-200 -top-2 text-xs text-[#005CBB]">
                                        Return Date*
                                    </label>
                                </div>

                                {/* Issued To */}
                                <div className="relative">
                                    <input
                                        type="text"
                                        value={editingItem.issuedTo}
                                        onChange={(e) => setEditingItem({...editingItem, issuedTo: e.target.value})}
                                        className="peer w-full rounded-md border bg-white px-3 pt-5 pb-2 text-sm text-gray-800 focus:border-[#005CBB] focus:ring-2 focus:ring-[#005CBB] outline-none transition-all"
                                    />
                                    <label className="absolute left-3 px-1 bg-white transition-all duration-200 -top-2 text-xs text-[#005CBB]">
                                        Issued To*
                                    </label>
                                </div>

                                {/* Quantity */}
                                <div className="relative">
                                    <input
                                        type="number"
                                        value={editingItem.quantity}
                                        onChange={(e) => setEditingItem({...editingItem, quantity: parseInt(e.target.value)})}
                                        className="peer w-full rounded-md border bg-white px-3 pt-5 pb-2 text-sm text-gray-800 focus:border-[#005CBB] focus:ring-2 focus:ring-[#005CBB] outline-none transition-all"
                                    />
                                    <label className="absolute left-3 px-1 bg-white transition-all duration-200 -top-2 text-xs text-[#005CBB]">
                                        Quantity*
                                    </label>
                                </div>
                            </div>

                            {/* Status */}
                            <div className="relative">
                                <select
                                    value={editingItem.status}
                                    onChange={(e) => setEditingItem({...editingItem, status: e.target.value as "Issued" | "Returned" | "Overdue"})}
                                    className="peer w-full rounded-md border bg-white px-3 pt-5 pb-2 text-sm text-gray-800 focus:border-[#005CBB] focus:ring-2 focus:ring-[#005CBB] outline-none transition-all"
                                >
                                    <option value="Issued">Issued</option>
                                    <option value="Returned">Returned</option>
                                    <option value="Overdue">Overdue</option>
                                </select>
                                <label className="absolute left-3 px-1 bg-white transition-all duration-200 -top-2 text-xs text-[#005CBB]">
                                    Status*
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