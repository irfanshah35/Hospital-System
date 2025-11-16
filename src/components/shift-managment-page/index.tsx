'use client';

import { CirclePlus, Download, Home, RotateCw, Trash2, Edit, Clock, Phone, Mail, Calendar, User, Building, AlertCircle, FileText } from 'lucide-react';
import React, { useEffect, useState, useRef } from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import Link from 'next/link';

interface ShiftData {
    id?: number;
    doctorName: string;
    department: string;
    specialty: string;
    shiftStartDate: string;
    shiftEndDate: string;
    workDays: string;
    shiftHours: string;
    shiftType: string;
    availabilityStatus: string;
    overtimeHours: string;
    totalHoursPerWeek: string;
    shiftNotes: string;
}

export default function ShiftManagementPage() {
    const [detailDropdown, setDetailDropdown] = useState(false);
    const detailref = useRef<HTMLDivElement | null>(null);
    const [selectedIds, setSelectedIds] = useState<number[]>([]);
    const [shifts, setShifts] = useState<ShiftData[]>([]);
    const [animate, setAnimate] = useState(false);
    const [loading, setLoading] = useState(true);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingShift, setEditingShift] = useState<ShiftData | null>(null);
    const [isEditMode, setIsEditMode] = useState(false);

    // Sample data
    const sampleShifts: ShiftData[] = [
        {
            id: 1,
            doctorName: "Dr. Chris Wilson",
            department: "ENT",
            specialty: "Breast Cancer",
            shiftStartDate: "2024-02-01",
            shiftEndDate: "2024-02-28",
            workDays: "Mon-Fri",
            shiftHours: "9:00 AM - 5:00 PM",
            shiftType: "Day Shift",
            availabilityStatus: "Available",
            overtimeHours: "2",
            totalHoursPerWeek: "40",
            shiftNotes: "Regular shift schedule"
        },
        {
            id: 2,
            doctorName: "Dr. Sarah Johnson",
            department: "Cardiology",
            specialty: "Heart Surgery",
            shiftStartDate: "2024-02-01",
            shiftEndDate: "2024-02-29",
            workDays: "Mon-Sat",
            shiftHours: "8:00 AM - 4:00 PM",
            shiftType: "Day Shift",
            availabilityStatus: "Available",
            overtimeHours: "5",
            totalHoursPerWeek: "48",
            shiftNotes: "Includes weekend duties"
        }
    ];

    // Fetch data from API
    const fetchShifts = async () => {
        setLoading(true);
        try {
            // Yahan aap actual API call kar sakte hain
            // const res = await fetch("/api/shifts");
            // const data = await res.json();
            // setShifts(data);

            // Temporary sample data
            setTimeout(() => {
                setShifts(sampleShifts);
                setLoading(false);
            }, 1000);
        } catch (error) {
            console.error("Failed to fetch shifts:", error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchShifts();
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
        fetchShifts().then(() => {
            setTimeout(() => setAnimate(false), 300);
        });
    };

    const handleDownloadXLSX = () => {
        const worksheet = XLSX.utils.json_to_sheet(
            shifts.map((item) => ({
                "Doctor Name": item.doctorName,
                "Department": item.department,
                "Specialty": item.specialty,
                "Shift Start Date": item.shiftStartDate,
                "Shift End Date": item.shiftEndDate,
                "Work Days": item.workDays,
                "Shift Hours": item.shiftHours,
                "Shift Type": item.shiftType,
                "Availability Status": item.availabilityStatus,
                "Overtime Hours": item.overtimeHours,
                "Total Hours Per Week": item.totalHoursPerWeek,
            }))
        );

        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Shifts");
        const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
        const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
        saveAs(blob, "shifts.xlsx");
    };

    const removeData = () => {
        if (selectedIds.length === 0) {
            alert("Please select at least one shift to delete.");
            return;
        }
        if (window.confirm(`Delete ${selectedIds.length} shift(s)?`)) {
            setShifts(prev => prev.filter(shift => !selectedIds.includes(shift.id!)));
            setSelectedIds([]);
        }
    };

    const handleCheckboxChange = (id: number) => {
        setSelectedIds(prev =>
            prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
        );
    };

    const handleSelectAll = (checked: boolean) => {
        setSelectedIds(checked ? shifts.map(shift => shift.id!) : []);
    };

    useEffect(() => {
        console.log(shifts);
        const selectAllCheckbox = document.getElementById("selectAll") as HTMLInputElement;
        if (selectAllCheckbox) {
            selectAllCheckbox.indeterminate =
                selectedIds.length > 0 && selectedIds.length < shifts.length;
        }
    }, [selectedIds, shifts]);

    const checkboxItems = [
        { label: "Checkbox", checked: true },
        { label: "Name", checked: true },
        { label: "Department", checked: true },
        { label: "Specialization", checked: true },
        { label: "Shift Start Date", checked: true },
        { label: "Shift End Date", checked: true },
        { label: "Work Days", checked: true },
        { label: "Shift Hours", checked: true },
        { label: "Shift Type", checked: true },
        { label: "Availability Status", checked: true },
        { label: "Actions", checked: true },
    ];

    const deleteSelectedShift = async (id: number) => {
        try {
            // Yahan aap actual API call kar sakte hain
            // const response = await fetch(`/api/shifts/${id}`, {
            //   method: "DELETE",
            // });

            // Temporary: Frontend se delete
            setShifts(prev => prev.filter(shift => shift.id !== id));
            console.log("Shift deleted:", id);
        } catch (error) {
            console.error("Error deleting shift:", error);
        }
    };

    const handleAddClick = () => {
        setEditingShift({
            doctorName: '',
            department: '',
            specialty: '',
            shiftStartDate: new Date().toISOString().split('T')[0],
            shiftEndDate: new Date().toISOString().split('T')[0],
            workDays: '',
            shiftHours: '',
            shiftType: '',
            availabilityStatus: 'Available',
            overtimeHours: '',
            totalHoursPerWeek: '',
            shiftNotes: ''
        });
        setIsEditMode(false);
        setIsModalOpen(true);
    };

    const handleEditClick = (shift: ShiftData) => {
        setEditingShift(shift);
        setIsEditMode(true);
        setIsModalOpen(true);
    };

    const handleModalSubmit = (formData: ShiftData) => {
        if (isEditMode && editingShift?.id) {
            // Edit existing shift
            setShifts(prev =>
                prev.map(shift =>
                    shift.id === editingShift.id ? { ...formData, id: editingShift.id } : shift
                )
            );
        } else {
            // Add new shift
            const newShift = {
                ...formData,
                id: Math.max(0, ...shifts.map(s => s.id!)) + 1
            };
            setShifts(prev => [...prev, newShift]);
        }
        setIsModalOpen(false);
        setEditingShift(null);
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
        setEditingShift(null);
    };

    return (
        <>
            <div className='px-4 sm:px-6 py-[20px] mt-0'>
                <div className="flex items-center justify-between relative top-[-5px]">
                    <div className="flex items-center flex-wrap space-x-2">
                        <h1 className="text-[20px] font-semibold">Shift</h1>
                        <span className="text-[20px] font-bold">›</span>
                        <Home size={18} />
                        <span>›</span>
                        <span className="text-sm">Doctors</span>
                        <span>›</span>
                        <span className="text-sm">Shift</span>
                    </div>
                </div>

                <div className="h-auto mt-3">
                    <div className="max-w-full">
                        <div className="bg-[var(--tableHeaderBg)] rounded-t-xl shadow-md overflow-hidden">
                            {/* Header */}
                            <div className="pr-[15px] pl-[20px] py-[8px] border-b border-gray-200 flex max-[390px]:gap-2 items-center flex-wrap">
                                <div className='flex items-center flex-[35%]'>
                                    <h1 className="m-0 text-[17px] leading-[28px] pr-[10px] font-medium">Shift Management</h1>
                                    <label className='relative'>
                                        <input
                                            type="text"
                                            placeholder="Search"
                                            className="w-full md:w-[212px] h-[45px] rounded-[5px] border-0 bg-white text-[14px] font-medium px-[50px] py-2 focus:outline-none"
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
                                        title="Add New Shift"
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
                                        <div className="p-8 text-center text-gray-500">Loading shifts...</div>
                                    ) : shifts.length === 0 ? (
                                        <div className="p-8 text-center text-gray-500">No shifts found</div>
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
                                                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Name</th>
                                                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Department</th>
                                                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Specialization</th>
                                                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Shift Start Date</th>
                                                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Shift End Date</th>
                                                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Work Days</th>
                                                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Shift Hours</th>
                                                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Shift Type</th>
                                                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Availability Status</th>
                                                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Actions</th>
                                                    </tr>
                                                </thead>

                                                <tbody className={`bg-white divide-y divide-gray-200 transition-all duration-500 ${animate ? "animate-slideDown" : ""}`}>
                                                    {shifts.map((item) => (
                                                        <tr key={item.id} className="transition-colors duration-150">
                                                            <td className="px-4 py-3 pl-[37px]">
                                                                <input
                                                                    type="checkbox"
                                                                    checked={selectedIds.includes(item.id!)}
                                                                    onChange={() => handleCheckboxChange(item.id!)}
                                                                    className="h-[18px] w-[18px] rounded-[2px] border-[2px] border-[#1a1b1f]"
                                                                />
                                                            </td>

                                                            <td className="px-4 py-3 whitespace-nowrap">
                                                                <div className="flex items-center">
                                                                    <div className="h-[30px] w-[30px] rounded-full bg-gray-200 border-2 border-dashed border-gray-400" />
                                                                    <div className="ml-4 w-[110px] overflow-hidden text-ellipsis whitespace-nowrap">
                                                                        <div className="text-sm font-medium">
                                                                            {item.doctorName}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </td>

                                                            <td className="px-4 text-sm whitespace-nowrap">{item.department}</td>

                                                            <td className="px-4 whitespace-nowrap">
                                                                <span className={`px-[10px] py-[2px] inline-flex text-xs leading-5 font-semibold rounded-[6px]`}>
                                                                    {item.specialty}
                                                                </span>
                                                            </td>
                                                            <td className="px-4 text-sm">
                                                                <div className="flex items-center">
                                                                    {item.shiftStartDate}
                                                                </div>
                                                            </td>
                                                            <td className="px-4 text-sm">{item.shiftEndDate}</td>
                                                            <td className="px-4 text-sm">
                                                                <div className={`flex items-center `}>
                                                                    {item.workDays}
                                                                </div>
                                                            </td>

                                                            <td className="px-4 text-sm">{item.shiftHours}</td>
                                                            <td className="px-4 text-sm">{item.shiftType}</td>
                                                            <td className="px-4 text-sm">
                                                                <div className={`flex items-center `}>
                                                                    {item.availabilityStatus}
                                                                </div>
                                                            </td>

                                                            <td className="px-4 text-sm font-medium">
                                                                <div className="flex space-x-2">
                                                                    <button onClick={() => handleEditClick(item)} className="text-[#6777ef] hover:bg-[#E0E1E3] p-1 rounded-full cursor-pointer">
                                                                        <Edit className="w-5 h-5" />
                                                                    </button>
                                                                    <button onClick={() => {
                                                                        deleteSelectedShift(item.id!);
                                                                    }} className="text-[#ff5200] hover:bg-[#E0E1E3] p-1 rounded-full cursor-pointer">
                                                                        <Trash2 className="w-5 h-5" />
                                                                    </button>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>

                                            <div
                                                className={`px-4 md:hidden shadow-sm bg-white transition-all duration-500 ${animate ? "animate-slideDown" : ""
                                                    }`}
                                            >
                                                {shifts.map((item) => (
                                                    <div key={item.id} className="border-b border-gray-200 py-4">
                                                        {/* Checkbox Row */}
                                                        <div className="flex items-center justify-between mb-3">
                                                            <input
                                                                checked={selectedIds.includes(item.id!)}
                                                                onChange={() => handleCheckboxChange(item.id!)}
                                                                type="checkbox"
                                                                className="w-4 h-4 text-blue-600 rounded"
                                                            />
                                                        </div>

                                                        {/* Shift Info */}
                                                        <div className="space-y-2 text-sm text-gray-800">
                                                            {/* Name */}
                                                            <div className="flex items-center gap-3 pb-2 border-b border-gray-200">
                                                                <span className="font-semibold w-36">Name:</span>
                                                                <div className="flex items-center gap-2">
                                                                    <div className="w-8 h-8 rounded-full bg-gray-200 border-2 border-dashed border-gray-400"></div>
                                                                    <span>{item.doctorName || "—"}</span>
                                                                </div>
                                                            </div>

                                                            {/* Department */}
                                                            <div className="flex items-center gap-3 pb-2 border-b border-gray-200">
                                                                <span className="font-semibold w-36">Department:</span>
                                                                <span>{item.department || "—"}</span>
                                                            </div>

                                                            {/* Specialization */}
                                                            <div className="flex items-center gap-3 pb-2 border-b border-gray-200">
                                                                <span className="font-semibold w-36">Specialization:</span>
                                                                <span>{item.specialty || "—"}</span>
                                                            </div>

                                                            {/* Shift Start Date */}
                                                            <div className="flex items-center gap-3 pb-2 border-b border-gray-200">
                                                                <span className="font-semibold w-36">Shift Start Date:</span>
                                                                <div className="flex items-center gap-2">
                                                                    <Calendar className="w-4 h-4 text-gray-600" />
                                                                    <span>{item.shiftStartDate || "—"}</span>
                                                                </div>
                                                            </div>

                                                            {/* Shift End Date */}
                                                            <div className="flex items-center gap-3 pb-2 border-b border-gray-200">
                                                                <span className="font-semibold w-36">Shift End Date:</span>
                                                                <div className="flex items-center gap-2">
                                                                    <Calendar className="w-4 h-4 text-gray-600" />
                                                                    <span>{item.shiftEndDate || "—"}</span>
                                                                </div>
                                                            </div>

                                                            {/* Work Days */}
                                                            <div className="flex items-center gap-3 pb-2 border-b border-gray-200">
                                                                <span className="font-semibold w-36">Work Days:</span>
                                                                <span>{item.workDays || "—"}</span>
                                                            </div>

                                                            {/* Shift Hours */}
                                                            <div className="flex items-center gap-3 pb-2 border-b border-gray-200">
                                                                <span className="font-semibold w-36">Shift Hours:</span>
                                                                <span>{item.shiftHours || "—"}</span>
                                                            </div>

                                                            {/* Shift Type */}
                                                            <div className="flex items-center gap-3 pb-2 border-b border-gray-200">
                                                                <span className="font-semibold w-36">Shift Type:</span>
                                                                <span>{item.shiftType || "—"}</span>
                                                            </div>

                                                            {/* Availability Status */}
                                                            <div className="flex items-center gap-3 pb-2 border-b border-gray-200">
                                                                <span className="font-semibold w-36">Availability Status:</span>
                                                                <span>{item.availabilityStatus || "Available"}</span>
                                                            </div>

                                                            {/* Actions */}
                                                            <div className="flex items-center gap-3 pt-2">
                                                                <div className="flex space-x-2">
                                                                    <button
                                                                        onClick={() => handleEditClick(item)}
                                                                        className="text-[#6777ef] hover:bg-[#E0E1E3] p-1 rounded-full cursor-pointer"
                                                                    >
                                                                        <Edit className="w-5 h-5" />
                                                                    </button>
                                                                    <button
                                                                        onClick={() => deleteSelectedShift(item.id!)}
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
                    <Paginator totalItems={shifts.length} />
                </div>
            </div>

            {/* Shift Modal */}
            {isModalOpen && (
                <ShiftModal
                    isOpen={isModalOpen}
                    onClose={handleModalClose}
                    onSubmit={handleModalSubmit}
                    initialData={editingShift}
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
interface ShiftModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (formData: ShiftData) => void;
    initialData?: ShiftData | null;
    isEditMode?: boolean;
}

// Create a type for form fields only (excluding id)
type FormFieldName = Exclude<keyof ShiftData, 'id'>;


// Floating Input Components (same as aapke paas hain)
function FloatingInput({ label, name, value, onChange, type = "text", icon: Icon, required = false, showPassword, setShowPassword, error }: any) {
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

function FloatingSelect({ label, name, value, onChange, icon: Icon, required = false, children, error }: any) {
    return (
        <div className="relative">
            <select
                name={name}
                value={value}
                onChange={onChange}
                required={required}
                className={`peer w-full appearance-none rounded-md border bg-white px-10 pt-4 pb-4 text-xs md:text-sm focus:border-blue-600 focus:ring-2 focus:ring-blue-600 outline-none transition-all ${error ? 'border-red-500' : 'border-gray-300'}`}
            >
                <option value=""></option>
                {children}
            </select>
            <label className={`absolute left-3 px-1 bg-white transition-all duration-200 text-xs md:text-sm ${value ? "-top-2 text-xs text-blue-600" : "top-3.5 text-gray-500"} peer-focus:-top-2 peer-focus:text-xs peer-focus:text-blue-600`}>
                {label} {required && <span className="text-red-500">*</span>}
            </label>
            {Icon && <Icon className="absolute top-3.5 right-3 w-4 h-4 md:w-5 md:h-5 text-gray-500" />}
            <svg className="absolute top-4 right-10 w-4 h-4 md:w-5 md:h-5 text-gray-500 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
            {error && <span className="text-red-500 text-xs mt-1 block">{error}</span>}
        </div>
    )
}

function FloatingTextarea({ label, name, value, onChange, icon: Icon, required = false, rows = 3, error }: any) {
    return (
        <div className="relative">
            <textarea
                name={name}
                value={value}
                onChange={onChange}
                placeholder=" "
                required={required}
                rows={rows}
                className={`peer w-full rounded-md border bg-white px-3 pt-5 pb-3 text-xs md:text-sm focus:border-blue-600 focus:ring-2 focus:ring-blue-600 outline-none transition-all resize-none ${error ? 'border-red-500' : 'border-gray-300'}`}
            />
            <label className={`absolute left-3 px-1 bg-white transition-all duration-200 text-xs md:text-sm ${value ? "-top-2 text-xs text-blue-600" : "top-3.5 text-gray-500"} peer-focus:-top-2 peer-focus:text-xs peer-focus:text-blue-600`}>
                {label} {required && <span className="text-red-500">*</span>}
            </label>
            {Icon && <Icon className="absolute top-6 right-3 w-4 h-4 md:w-5 md:h-5 text-gray-500" />}
            {error && <span className="text-red-500 text-xs mt-1 block">{error}</span>}
        </div>
    )
}

// Modal Component with Floating Inputs
const ShiftModal: React.FC<ShiftModalProps> = ({
    isOpen,
    onClose,
    onSubmit,
    initialData,
    isEditMode = false
}) => {
    const [formData, setFormData] = useState<ShiftData>({
        doctorName: '',
        department: '',
        specialty: '',
        shiftStartDate: new Date().toISOString().split('T')[0],
        shiftEndDate: new Date().toISOString().split('T')[0],
        workDays: '',
        shiftHours: '',
        shiftType: '',
        availabilityStatus: 'Available',
        overtimeHours: '',
        totalHoursPerWeek: '',
        shiftNotes: ''
    });

    const modalRef = useRef<HTMLDivElement>(null);

    const isFormValid =
        formData.doctorName.trim() !== '' &&
        formData.department.trim() !== '' &&
        formData.shiftStartDate.trim() !== '' &&
        formData.shiftEndDate.trim() !== '' &&
        formData.workDays.trim() !== '' &&
        formData.shiftHours.trim() !== '' &&
        formData.shiftType.trim() !== '' &&
        formData.availabilityStatus.trim() !== '';

    useEffect(() => {
        if (initialData) {
            setFormData(initialData);
        } else {
            // Reset form when adding new
            setFormData({
                doctorName: '',
                department: '',
                specialty: '',
                shiftStartDate: new Date().toISOString().split('T')[0],
                shiftEndDate: new Date().toISOString().split('T')[0],
                workDays: '',
                shiftHours: '',
                shiftType: '',
                availabilityStatus: 'Available',
                overtimeHours: '',
                totalHoursPerWeek: '',
                shiftNotes: ''
            });
        }
    }, [initialData, isOpen]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
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
            <div ref={modalRef} className="bg-white rounded-lg shadow-lg w-full max-w-4xl mx-4 max-h-[90vh] overflow-hidden">
                {/* Modal Header */}
                <div className="flex justify-between items-center p-4 border-b border-gray-300">
                    <div className="flex items-center">
                        {isEditMode && (
                            <div className="relative w-10 h-10 mr-3">
                                <img
                                    src="/assets/images/user/new.jpg"
                                    alt="avatar"
                                    className="w-full h-full rounded-full object-cover"
                                />
                            </div>
                        )}
                        <h2 className="text-xl font-semibold">
                            {isEditMode ? 'Edit Shift' : 'New Shift'}
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
                <div className="py-5 px-6 max-h-[70vh] overflow-y-auto scrollbar-hide">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Doctor Name */}
                            <FloatingInput
                                label="Doctor Name"
                                name="doctorName"
                                value={formData.doctorName}
                                onChange={handleInputChange}
                                icon={User}
                                required
                            />

                            {/* Department */}
                            <FloatingSelect
                                label="Department"
                                name="department"
                                value={formData.department}
                                onChange={handleInputChange}
                                icon={Building}
                                required
                            >
                                <option value="cardiology">Cardiology</option>
                                <option value="neurology">Neurology</option>
                                <option value="orthopedics">Orthopedics</option>
                                <option value="pediatrics">Pediatrics</option>
                                <option value="ent">ENT</option>
                                <option value="surgery">Surgery</option>
                                <option value="radiology">Radiology</option>
                            </FloatingSelect>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Specialty */}
                            <FloatingInput
                                label="Specialty"
                                name="specialty"
                                value={formData.specialty}
                                onChange={handleInputChange}
                                icon={AlertCircle}
                            />

                            {/* Shift Start Date */}
                            <FloatingInput
                                type="date"
                                label="Shift Start Date"
                                name="shiftStartDate"
                                value={formData.shiftStartDate}
                                onChange={handleInputChange}
                                required
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Shift End Date */}
                            <FloatingInput
                                type="date"
                                label="Shift End Date"
                                name="shiftEndDate"
                                value={formData.shiftEndDate}
                                onChange={handleInputChange}
                                required
                            />

                            {/* Work Days */}
                            <FloatingInput
                                label="Work Days"
                                name="workDays"
                                value={formData.workDays}
                                onChange={handleInputChange}
                                icon={Calendar}
                                required
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Shift Hours */}
                            <FloatingInput
                                label="Shift Hours"
                                name="shiftHours"
                                value={formData.shiftHours}
                                onChange={handleInputChange}
                                icon={Clock}
                                required
                            />

                            {/* Shift Type */}
                            <FloatingSelect
                                label="Shift Type"
                                name="shiftType"
                                value={formData.shiftType}
                                onChange={handleInputChange}
                                icon={Clock}
                                required
                            >
                                <option value="Day Shift">Day Shift</option>
                                <option value="Night Shift">Night Shift</option>
                                <option value="Evening Shift">Evening Shift</option>
                                <option value="Rotating Shift">Rotating Shift</option>
                                <option value="Weekend Shift">Weekend Shift</option>
                            </FloatingSelect>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Availability Status */}
                            <FloatingSelect
                                label="Availability Status"
                                name="availabilityStatus"
                                value={formData.availabilityStatus}
                                onChange={handleInputChange}
                                icon={AlertCircle}
                                required
                            >
                                <option value="Available">Available</option>
                                <option value="On Leave">On Leave</option>
                                <option value="Sick Leave">Sick Leave</option>
                                <option value="Vacation">Vacation</option>
                                <option value="Training">Training</option>
                            </FloatingSelect>

                            {/* Overtime Hours */}
                            <FloatingInput
                                type="number"
                                label="Overtime Hours"
                                name="overtimeHours"
                                value={formData.overtimeHours}
                                onChange={handleInputChange}
                                icon={Clock}
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Total Hours Per Week */}
                            <FloatingInput
                                type="number"
                                label="Total Hours Per Week"
                                name="totalHoursPerWeek"
                                value={formData.totalHoursPerWeek}
                                onChange={handleInputChange}
                                icon={Clock}
                            />
                        </div>

                        {/* Shift Notes */}
                        <FloatingTextarea
                            label="Shift Notes"
                            name="shiftNotes"
                            value={formData.shiftNotes}
                            onChange={handleInputChange}
                            icon={FileText}
                            rows={3}
                        />

                        {/* Buttons */}
                        <div className="flex space-x-3 pt-4">
                            <button
                                type="submit"
                                disabled={!isEditMode && !isFormValid}
                                className={`px-4 py-2 rounded-full transition-colors ${isEditMode
                                    ? "bg-blue-600 hover:bg-blue-700 text-white cursor-pointer"
                                    : isFormValid
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