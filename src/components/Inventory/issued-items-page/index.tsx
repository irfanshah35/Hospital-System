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

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<IssuedItem | null>(null);
    const [isEditMode, setIsEditMode] = useState(false);

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

    const handleAddClick = () => {
        setEditingItem({
            id: 0,
            itemName: '',
            category: 'Medical Devices',
            issueDate: new Date().toISOString().split('T')[0],
            returnDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            issuedTo: '',
            quantity: 1,
            status: 'Issued'
        });
        setIsEditMode(false);
        setIsModalOpen(true);
    };

    const handleEditClick = (item: IssuedItem) => {
        setEditingItem(item);
        setIsEditMode(true);
        setIsModalOpen(true);
    };

    const handleModalSubmit = (formData: IssuedItem) => {
        if (isEditMode && editingItem?.id) {
            // Edit existing record
            setIssuedItems(prev =>
                prev.map(item =>
                    item.id === editingItem.id ? { ...formData, id: editingItem.id } : item
                )
            );
        } else {
            // Add new record
            const newItem = {
                ...formData,
                id: Math.max(0, ...issuedItems.map(item => item.id)) + 1
            };
            setIssuedItems(prev => [...prev, newItem]);
        }
        setIsModalOpen(false);
        setEditingItem(null);
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
        setEditingItem(null);
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

                                    <button
                                        onClick={handleAddClick}
                                        className="flex justify-center items-center w-10 h-10 rounded-full text-[#4caf50] hover:bg-[#CED5E6] transition cursor-pointer"
                                        title="Add New Issued Item"
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
                                                                <span className={`px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${item.status === "Returned" ? "bg-green-100 text-green-800" :
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
                                                                <span className={`px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${item.status === "Returned" ? "bg-green-100 text-green-800" :
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

            {/* Add/Edit Modal */}
            {isModalOpen && (
                <IssuedItemModal
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

// Modal Component
interface IssuedItemModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (formData: IssuedItem) => void;
    initialData?: IssuedItem | null;
    isEditMode?: boolean;
}

const IssuedItemModal: React.FC<IssuedItemModalProps> = ({
    isOpen,
    onClose,
    onSubmit,
    initialData,
    isEditMode = false
}) => {
    const [formData, setFormData] = useState<IssuedItem>({
        id: 0,
        itemName: '',
        category: 'Medical Devices',
        issueDate: new Date().toISOString().split('T')[0],
        returnDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        issuedTo: '',
        quantity: 1,
        status: 'Issued'
    });

    const modalRef = useRef<HTMLDivElement>(null);

    const isFormValid =
        formData.itemName.trim() !== '' &&
        formData.category.trim() !== '' &&
        formData.issueDate.trim() !== '' &&
        formData.returnDate.trim() !== '' &&
        formData.issuedTo.trim() !== '' &&
        formData.quantity > 0;

    useEffect(() => {
        if (initialData) {
            setFormData(initialData);
        } else {
            // Reset form when adding new
            setFormData({
                id: 0,
                itemName: '',
                category: 'Medical Devices',
                issueDate: new Date().toISOString().split('T')[0],
                returnDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
                issuedTo: '',
                quantity: 1,
                status: 'Issued'
            });
        }
    }, [initialData, isOpen]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'quantity' ? parseInt(value) : value
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
            <div ref={modalRef} className="bg-white rounded-lg shadow-lg w-full max-w-[600px] mx-4 max-h-[90vh] overflow-hidden">
                {/* Modal Header */}
                <div className="flex justify-between items-center p-4 border-b border-gray-300">
                    <div className="flex items-center">
                        <h2 className="font-semibold leading-[35px]">
                            {isEditMode ? `Edit Issued Item - ${formData.itemName}` : 'New Item Issue'}
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
                            {/* Item Name */}
                            <FloatingInput
                                label="Item Name"
                                name="itemName"
                                value={formData.itemName}
                                onChange={handleInputChange}
                                icon={Package}
                                required
                            />

                            {/* Category */}
                            <FloatingSelect
                                label="Category"
                                name="category"
                                value={formData.category}
                                onChange={handleInputChange}
                                options={['Medical Devices', 'Medical Supplies', 'Diagnostic Tools', 'Medical Equipment', 'Emergency', 'Life Support', 'Mobility Aids', 'Emergency Equipment', 'Monitoring Devices']}
                                required
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Issue Date */}
                            <FloatingInput
                                type="date"
                                label="Issue Date"
                                name="issueDate"
                                value={formData.issueDate}
                                onChange={handleInputChange}
                                required
                            />

                            {/* Return Date */}
                            <FloatingInput
                                type="date"
                                label="Return Date"
                                name="returnDate"
                                value={formData.returnDate}
                                onChange={handleInputChange}
                                required
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Issued To */}
                            <FloatingInput
                                label="Issued To"
                                name="issuedTo"
                                value={formData.issuedTo}
                                onChange={handleInputChange}
                                icon={User}
                                required
                            />

                            {/* Quantity */}
                            <FloatingInput
                                label="Quantity"
                                name="quantity"
                                value={formData.quantity}
                                onChange={handleInputChange}
                                type="number"
                                required
                            />
                        </div>

                        {/* Status */}
                        <FloatingSelect
                            label="Status"
                            name="status"
                            value={formData.status}
                            onChange={handleInputChange}
                            options={['Issued', 'Returned', 'Overdue']}
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