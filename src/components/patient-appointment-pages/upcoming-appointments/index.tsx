'use client';

import { CirclePlus, Download, Home, RotateCw, Trash2, Edit, Clock, Phone, Mail, MapPin } from 'lucide-react';
import React, { useEffect, useState, useRef } from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import Link from 'next/link';

interface Appointment {
    id: number;
    patientName: string;
    doctor: string;
    date: string;
    time: string;
    injury: string;
    location: string;
    status: "Scheduled" | "Confirmed" | "Cancelled" | "Completed";
    notes: string;
    mobile: string;
    email: string;
}

export default function UpcomingAppointments() {
    const [detailDropdown, setDetailDropdown] = useState(false);
    const detailref = useRef<HTMLDivElement | null>(null);
    const [selectedIds, setSelectedIds] = useState<number[]>([]);
    const [appointments, setAppointments] = useState<Appointment[]>([]);
    const [animate, setAnimate] = useState(false);
    const [loading, setLoading] = useState(true);

    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editingAppointment, setEditingAppointment] = useState<Appointment | null>(null);

    // Sample data for appointments
    const sampleAppointments: Appointment[] = [
        {
            id: 1,
            patientName: "John Smith",
            doctor: "Dr. Sarah Wilson",
            date: "2024-01-15",
            time: "10:00 AM",
            injury: "Knee Pain",
            location: "Main Clinic",
            status: "Scheduled",
            notes: "Follow-up visit",
            mobile: "+1-555-0101",
            email: "john.smith@email.com"
        },
        {
            id: 2,
            patientName: "Emma Johnson",
            doctor: "Dr. Michael Brown",
            date: "2024-01-16",
            time: "2:30 PM",
            injury: "Back Pain",
            location: "Downtown Branch",
            status: "Confirmed",
            notes: "Initial consultation",
            mobile: "+1-555-0102",
            email: "emma.j@email.com"
        },
        {
            id: 3,
            patientName: "Robert Davis",
            doctor: "Dr. Sarah Wilson",
            date: "2024-01-17",
            time: "9:15 AM",
            injury: "Sports Injury",
            location: "Main Clinic",
            status: "Scheduled",
            notes: "Physical therapy session",
            mobile: "+1-555-0103",
            email: "robert.d@email.com"
        },
        {
            id: 4,
            patientName: "Lisa Anderson",
            doctor: "Dr. James Miller",
            date: "2024-01-18",
            time: "11:45 AM",
            injury: "Headache",
            location: "North Clinic",
            status: "Confirmed",
            notes: "Migraine treatment",
            mobile: "+1-555-0104",
            email: "lisa.a@email.com"
        },
        {
            id: 5,
            patientName: "David Wilson",
            doctor: "Dr. Michael Brown",
            date: "2024-01-19",
            time: "3:00 PM",
            injury: "Fractured Arm",
            location: "Main Clinic",
            status: "Scheduled",
            notes: "Cast removal",
            mobile: "+1-555-0105",
            email: "david.w@email.com"
        }
    ];

    // Fetch data from API
    const fetchAppointments = async () => {
        setLoading(true);
        try {
            // For demo purposes, using sample data
            // In real application, you would fetch from your API
            setAppointments(sampleAppointments);
            
            // Uncomment below for actual API call
            // const res = await fetch("/api/appointments");
            // const data = await res.json();
            // setAppointments(data);

        } catch (error) {
            console.error("Failed to fetch appointments:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAppointments();
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
        fetchAppointments().then(() => {
            setTimeout(() => setAnimate(false), 300);
        });
    };

    const handleDownloadXLSX = () => {
        const worksheet = XLSX.utils.json_to_sheet(
            appointments.map((item) => ({
                "Patient Name": item.patientName,
                "Doctor": item.doctor,
                "Date": item.date,
                "Time": item.time,
                "Injury": item.injury,
                "Location": item.location,
                "Status": item.status,
                "Notes": item.notes,
                "Mobile": item.mobile,
                "Email": item.email,
            }))
        );

        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Appointments");
        const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
        const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
        saveAs(blob, "appointments.xlsx");
    };

    const removeData = () => {
        if (selectedIds.length === 0) {
            alert("Please select at least one appointment to delete.");
            return;
        }
        if (window.confirm(`Delete ${selectedIds.length} appointment(s)?`)) {
            setAppointments(prev => prev.filter(a => !selectedIds.includes(a.id)));
            setSelectedIds([]);
        }
    };

    const handleCheckboxChange = (id: number) => {
        setSelectedIds(prev =>
            prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
        );
    };

    const handleSelectAll = (checked: boolean) => {
        setSelectedIds(checked ? appointments.map(a => a.id) : []);
    };

    useEffect(() => {
        const selectAllCheckbox = document.getElementById("selectAll") as HTMLInputElement;
        if (selectAllCheckbox) {
            selectAllCheckbox.indeterminate =
                selectedIds.length > 0 && selectedIds.length < appointments.length;
        }
    }, [selectedIds, appointments]);

    const checkboxItems = [
        { label: "Checkbox", checked: true },
        { label: "Doctor", checked: true },
        { label: "Date", checked: true },
        { label: "Time", checked: true },
        { label: "Injury", checked: true },
        { label: "Location", checked: true },
        { label: "Status", checked: true },
        { label: "Notes", checked: true },
        { label: "Actions", checked: true },
    ];

    const deleteSelectedAppointments = async (id: number) => {
        try {
            setAppointments(prev => prev.filter(a => a.id !== id));
            
            // In real application, you would call your API
            // const response = await fetch(`/api/appointments/${id}`, {
            //     method: "DELETE",
            // });
            // const result = await response.json();
            console.log("Appointment deleted:", id);
        } catch (error) {
            console.error("Error deleting appointment:", error);
        }
    };

    const handleEditClick = (appointment: Appointment) => {
        setEditingAppointment(appointment);
        setIsEditModalOpen(true);
    };

    const handleUpdateAppointment = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!editingAppointment) return;

        try {
            setAppointments(prev => 
                prev.map(a => a.id === editingAppointment.id ? editingAppointment : a)
            );
            
            // In real application, you would call your API
            // const response = await fetch(`/api/appointments/${editingAppointment.id}`, {
            //     method: "PUT",
            //     headers: { "Content-Type": "application/json" },
            //     body: JSON.stringify(editingAppointment),
            // });

            alert("Appointment updated successfully!");
            setIsEditModalOpen(false);
        } catch (error) {
            console.error("Error updating appointment:", error);
            alert("An unexpected error occurred.");
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case "Scheduled": return "bg-blue-100 text-blue-800";
            case "Confirmed": return "bg-green-100 text-green-800";
            case "Cancelled": return "bg-red-100 text-red-800";
            case "Completed": return "bg-gray-100 text-[#6f42c1]";
            default: return "bg-gray-100 text-gray-800";
        }
    };

    return (
        <>
            <div className='px-4 sm:px-6 py-[20px] mt-0'>
                <div className="flex items-center justify-between relative top-[-5px]">
                    <div className="flex items-center flex-wrap space-x-2">
                        <h1 className="text-[20px] font-semibold">Upcoming</h1>
                        <span className="text-[20px] font-bold">›</span>
                        <Home size={18} />
                        <span>›</span>
                        <span className="text-sm">Appointments</span>
                        <span>›</span>
                        <span className="text-sm">Upcoming</span>
                    </div>
                </div>

                <div className="h-auto mt-3">
                    <div className="max-w-full">
                        <div className="bg-[var(--tableHeaderBg)] rounded-t-xl shadow-md overflow-hidden">
                            {/* Header */}
                            <div className="pr-[15px] pl-[20px] py-[8px] border-b border-gray-200 flex max-[390px]:gap-2 items-center flex-wrap">
                                <div className='flex items-center flex-[35%]'>
                                    <h1 className="m-0 text-[17px] leading-[28px] pr-[10px] font-medium">Appointments</h1>
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

                                    <Link href="/add-appointment">
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
                                        <div className="p-8 text-center text-gray-500">Loading appointments...</div>
                                    ) : appointments.length === 0 ? (
                                        <div className="p-8 text-center text-gray-500">No appointments found</div>
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
                                                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Doctor</th>
                                                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Date</th>
                                                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Time</th>
                                                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Injury</th>
                                                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Location</th>
                                                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Status</th>
                                                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Notes</th>
                                                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Actions</th>
                                                    </tr>
                                                </thead>

                                                <tbody role='rowgroup' className={`bg-white divide-y divide-gray-200 transition-all duration-500 ${animate ? "animate-slideDown" : ""}`}>
                                                    {appointments.map((item) => (
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
                                                                <div className="flex items-center">
                                                                    <div className="text-sm font-medium text-gray-900">
                                                                        {item.doctor}
                                                                    </div>
                                                                </div>
                                                            </td>

                                                            <td className="px-4 text-sm whitespace-nowrap">{item.date}</td>

                                                            <td className="px-4 text-sm whitespace-nowrap">
                                                                <div className="flex items-center gap-2">
                                                                    <Clock className="w-4 h-4 text-[#6f42c1]" />
                                                                    {item.time}
                                                                </div>
                                                            </td>

                                                            <td className="px-4 text-sm whitespace-nowrap">{item.injury}</td>

                                                            <td className="px-4 text-sm whitespace-nowrap">
                                                                <div className="flex items-center gap-2">
                                                                    <MapPin className="w-4 h-4 text-[#2196f3]" />
                                                                    {item.location}
                                                                </div>
                                                            </td>

                                                            <td className="px-4 whitespace-nowrap">
                                                                <span className={`px-[10px] py-[2px] inline-flex text-xs leading-5 font-semibold rounded-[6px] ${getStatusColor(item.status)}`}>
                                                                    {item.status}
                                                                </span>
                                                            </td>

                                                            <td className="px-4 text-sm">
                                                                <div className="max-w-[200px] truncate" title={item.notes}>
                                                                    {item.notes}
                                                                </div>
                                                            </td>

                                                            <td className="px-4 text-sm font-medium">
                                                                <div className="flex space-x-2">
                                                                    <button 
                                                                        onClick={() => handleEditClick(item)} 
                                                                        className="text-[#6777ef] hover:bg-[#E0E1E3] p-1 rounded-full cursor-pointer"
                                                                    >
                                                                        <Edit className="w-5 h-5" />
                                                                    </button>
                                                                    <button 
                                                                        onClick={() => deleteSelectedAppointments(item.id)} 
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
                                                {appointments.map((item) => (
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

                                                        {/* Appointment Info */}
                                                        <div className="space-y-2 text-sm">
                                                            <div className="flex items-center gap-3 pb-2 border-b border-gray-200 p-2">
                                                                <span className="font-semibold w-28">Doctor:</span>
                                                                <span>{item.doctor}</span>
                                                            </div>

                                                            <div className="flex items-center gap-3 pb-2 border-b border-gray-200 p-2">
                                                                <span className="font-semibold w-28">Date:</span>
                                                                <span>{item.date}</span>
                                                            </div>

                                                            <div className="flex items-center gap-3 pb-2 border-b border-gray-200 p-2">
                                                                <span className="font-semibold w-28">Time:</span>
                                                                <div className="flex items-center gap-1">
                                                                    <Clock className="w-4 h-4 text-[#6f42c1]" />
                                                                    <span>{item.time}</span>
                                                                </div>
                                                            </div>

                                                            <div className="flex items-center gap-3 pb-2 border-b border-gray-200 p-2">
                                                                <span className="font-semibold w-28">Injury:</span>
                                                                <span>{item.injury}</span>
                                                            </div>

                                                            <div className="flex items-center gap-3 pb-2 border-b border-gray-200 p-2">
                                                                <span className="font-semibold w-28">Location:</span>
                                                                <div className="flex items-center gap-1">
                                                                    <MapPin className="w-4 h-4 text-[#2196f3]" />
                                                                    <span>{item.location}</span>
                                                                </div>
                                                            </div>

                                                            <div className="flex items-center gap-3 pb-2 border-b border-gray-200 p-2">
                                                                <span className="font-semibold w-28">Status:</span>
                                                                <span className={`px-2 py-1 text-xs font-semibold rounded ${getStatusColor(item.status)}`}>
                                                                    {item.status}
                                                                </span>
                                                            </div>

                                                            <div className="flex items-center gap-3 pb-2 border-b border-gray-200 p-2">
                                                                <span className="font-semibold w-28">Notes:</span>
                                                                <span>{item.notes}</span>
                                                            </div>

                                                            {/* Contact Info */}
                                                            <div className="flex items-center gap-3 pb-2 border-b border-gray-200 p-2">
                                                                <span className="font-semibold w-28">Contact:</span>
                                                                <div className="flex flex-col gap-1">
                                                                    <div className="flex items-center gap-1">
                                                                        <Phone className="w-3 h-3" />
                                                                        <span className="text-xs">{item.mobile}</span>
                                                                    </div>
                                                                    <div className="flex items-center gap-1">
                                                                        <Mail className="w-3 h-3" />
                                                                        <span className="text-xs">{item.email}</span>
                                                                    </div>
                                                                </div>
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
                                                                        onClick={() => deleteSelectedAppointments(item.id)}
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
                    <Paginator totalItems={appointments.length} />
                </div>
            </div>

            {/* Edit Modal */}
            {isEditModalOpen && editingAppointment && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999]">
                    <div className="bg-white rounded-lg shadow-lg w-[600px] max-w-[90%] max-h-[90vh] overflow-hidden">
                        <div className="flex items-center justify-between border-b !border-gray-300 px-5 py-3">
                            <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                                    <Edit className="w-5 h-5 text-blue-600" />
                                </div>
                                <h2 className="text-lg font-semibold">
                                    Edit Appointment
                                </h2>
                            </div>
                            <button
                                onClick={() => setIsEditModalOpen(false)}
                                className="text-gray-600 hover:text-gray-900 text-xl font-bold"
                            >
                                ×
                            </button>
                        </div>

                        <form onSubmit={handleUpdateAppointment} className="p-6 space-y-6 max-h-[60vh] overflow-y-auto scrollbar-hide">
                            <div className="grid grid-cols-2 gap-4">
                                {/* Patient Name */}
                                <div className="relative">
                                    <input
                                        type="text"
                                        value={editingAppointment.patientName}
                                        onChange={(e) => setEditingAppointment({...editingAppointment, patientName: e.target.value})}
                                        placeholder=" "
                                        required
                                        className="peer w-full rounded-md border bg-white px-3 pt-5 pb-2 text-sm text-gray-800 focus:border-[#005CBB] focus:ring-2 focus:ring-[#005CBB] outline-none transition-all"
                                    />
                                    <label className="absolute left-3 px-[4px] bg-white transition-all duration-200 peer-focus:-top-2 peer-focus:text-xs peer-focus:text-[#005CBB] -top-2 text-xs text-[#005CBB]">
                                        Patient Name*
                                    </label>
                                </div>

                                {/* Doctor */}
                                <div className="relative">
                                    <input
                                        type="text"
                                        value={editingAppointment.doctor}
                                        onChange={(e) => setEditingAppointment({...editingAppointment, doctor: e.target.value})}
                                        placeholder=" "
                                        required
                                        className="peer w-full rounded-md border bg-white px-3 pt-5 pb-2 text-sm text-gray-800 focus:border-[#005CBB] focus:ring-2 focus:ring-[#005CBB] outline-none transition-all"
                                    />
                                    <label className="absolute left-3 px-[4px] bg-white transition-all duration-200 peer-focus:-top-2 peer-focus:text-xs peer-focus:text-[#005CBB] -top-2 text-xs text-[#005CBB]">
                                        Doctor*
                                    </label>
                                </div>

                                {/* Date */}
                                <div className="relative">
                                    <input
                                        type="date"
                                        value={editingAppointment.date}
                                        onChange={(e) => setEditingAppointment({...editingAppointment, date: e.target.value})}
                                        placeholder=" "
                                        required
                                        className="peer w-full rounded-md border bg-white px-3 pt-5 pb-2 text-sm text-gray-800 focus:border-[#005CBB] focus:ring-2 focus:ring-[#005CBB] outline-none transition-all"
                                    />
                                    <label className="absolute left-3 px-[4px] bg-white transition-all duration-200 peer-focus:-top-2 peer-focus:text-xs peer-focus:text-[#005CBB] -top-2 text-xs text-[#005CBB]">
                                        Date*
                                    </label>
                                </div>

                                {/* Time */}
                                <div className="relative">
                                    <input
                                        type="time"
                                        value={editingAppointment.time}
                                        onChange={(e) => setEditingAppointment({...editingAppointment, time: e.target.value})}
                                        placeholder=" "
                                        required
                                        className="peer w-full rounded-md border bg-white px-3 pt-5 pb-2 text-sm text-gray-800 focus:border-[#005CBB] focus:ring-2 focus:ring-[#005CBB] outline-none transition-all"
                                    />
                                    <label className="absolute left-3 px-[4px] bg-white transition-all duration-200 peer-focus:-top-2 peer-focus:text-xs peer-focus:text-[#005CBB] -top-2 text-xs text-[#005CBB]">
                                        Time*
                                    </label>
                                </div>

                                {/* Injury */}
                                <div className="relative">
                                    <input
                                        type="text"
                                        value={editingAppointment.injury}
                                        onChange={(e) => setEditingAppointment({...editingAppointment, injury: e.target.value})}
                                        placeholder=" "
                                        required
                                        className="peer w-full rounded-md border bg-white px-3 pt-5 pb-2 text-sm text-gray-800 focus:border-[#005CBB] focus:ring-2 focus:ring-[#005CBB] outline-none transition-all"
                                    />
                                    <label className="absolute left-3 px-[4px] bg-white transition-all duration-200 peer-focus:-top-2 peer-focus:text-xs peer-focus:text-[#005CBB] -top-2 text-xs text-[#005CBB]">
                                        Injury*
                                    </label>
                                </div>

                                {/* Location */}
                                <div className="relative">
                                    <input
                                        type="text"
                                        value={editingAppointment.location}
                                        onChange={(e) => setEditingAppointment({...editingAppointment, location: e.target.value})}
                                        placeholder=" "
                                        required
                                        className="peer w-full rounded-md border bg-white px-3 pt-5 pb-2 text-sm text-gray-800 focus:border-[#005CBB] focus:ring-2 focus:ring-[#005CBB] outline-none transition-all"
                                    />
                                    <label className="absolute left-3 px-[4px] bg-white transition-all duration-200 peer-focus:-top-2 peer-focus:text-xs peer-focus:text-[#005CBB] -top-2 text-xs text-[#005CBB]">
                                        Location*
                                    </label>
                                </div>

                                {/* Status */}
                                <div className="relative">
                                    <select
                                        value={editingAppointment.status}
                                        onChange={(e) => setEditingAppointment({...editingAppointment, status: e.target.value as any})}
                                        className="peer w-full rounded-md border bg-white px-3 pt-5 pb-2 text-sm text-gray-800 focus:border-[#005CBB] focus:ring-2 focus:ring-[#005CBB] outline-none transition-all appearance-none"
                                    >
                                        <option value="Scheduled">Scheduled</option>
                                        <option value="Confirmed">Confirmed</option>
                                        <option value="Cancelled">Cancelled</option>
                                        <option value="Completed">Completed</option>
                                    </select>
                                    <label className="absolute left-3 px-[4px] bg-white transition-all duration-200 peer-focus:-top-2 peer-focus:text-xs peer-focus:text-[#005CBB] -top-2 text-xs text-[#005CBB]">
                                        Status*
                                    </label>
                                </div>
                            </div>

                            {/* Notes */}
                            <div className="relative">
                                <textarea
                                    rows={3}
                                    value={editingAppointment.notes}
                                    onChange={(e) => setEditingAppointment({...editingAppointment, notes: e.target.value})}
                                    placeholder=" "
                                    className="peer w-full rounded-md border bg-white px-3 pt-5 pb-2 text-sm resize-none text-gray-800 focus:border-[#005CBB] focus:ring-2 focus:ring-[#005CBB] outline-none transition-all"
                                ></textarea>
                                <label className="absolute left-3 px-[4px] bg-white transition-all duration-200 peer-focus:-top-2 peer-focus:text-xs peer-focus:text-[#005CBB] -top-2 text-xs text-[#005CBB]">
                                    Notes
                                </label>
                            </div>

                            {/* Submit */}
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
                                    className="bg-[#ba1a1a] text-white px-6 py-2 rounded-full text-sm font-medium transition hover:bg-[#a01515]"
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