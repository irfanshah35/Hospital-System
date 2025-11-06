'use client';

import { CirclePlus, Download, Home, RotateCw, Trash2, Edit, Clock, Phone, Mail, MapPin, User, MoreVertical, XCircle, Check } from 'lucide-react';
import React, { useEffect, useState, useRef } from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import Link from 'next/link';

interface Appointment {
    id: number;
    patientName: string;
    appointmentDate: string;
    time: string;
    email: string;
    mobile: string;
    gender: "Male" | "Female" | "Other";
    status: "Scheduled" | "Completed" | "Cancelled" | "No Show";
    address: string;
    disease: string;
    lastVisitDate: string;
}

export default function AppointmentsPage() {
    const [detailDropdown, setDetailDropdown] = useState(false);
    const detailref = useRef<HTMLDivElement | null>(null);
    const [selectedIds, setSelectedIds] = useState<number[]>([]);
    const [appointments, setAppointments] = useState<Appointment[]>([]);
    const [animate, setAnimate] = useState(false);
    const [loading, setLoading] = useState(true);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editingAppointment, setEditingAppointment] = useState<Appointment | null>(null);
    const [openRowId, setOpenRowId] = useState<number | null>(null);
    const menuRef = useRef<HTMLDivElement | null>(null);

    const toggleMenu = (id: number) => {
        setOpenRowId((prev) => (prev === id ? null : id));
    };



    const sampleAppointmentData: Appointment[] = [
        {
            id: 1,
            patientName: "John Smith",
            appointmentDate: "2024-01-15",
            time: "10:00 AM",
            email: "john.smith@email.com",
            mobile: "+1-555-0101",
            gender: "Male",
            status: "Scheduled",
            address: "123 Main Street, New York, NY 10001",
            disease: "Hypertension",
            lastVisitDate: "2023-12-10"
        },
        {
            id: 2,
            patientName: "Sarah Johnson",
            appointmentDate: "2024-01-15",
            time: "11:30 AM",
            email: "sarah.j@email.com",
            mobile: "+1-555-0102",
            gender: "Female",
            status: "Completed",
            address: "456 Oak Avenue, Los Angeles, CA 90210",
            disease: "Diabetes",
            lastVisitDate: "2024-01-15"
        },
        {
            id: 3,
            patientName: "Michael Brown",
            appointmentDate: "2024-01-16",
            time: "09:00 AM",
            email: "m.brown@email.com",
            mobile: "+1-555-0103",
            gender: "Male",
            status: "Cancelled",
            address: "789 Pine Road, Chicago, IL 60601",
            disease: "Asthma",
            lastVisitDate: "2023-11-20"
        },
        {
            id: 4,
            patientName: "Emily Davis",
            appointmentDate: "2024-01-16",
            time: "02:15 PM",
            email: "emily.davis@email.com",
            mobile: "+1-555-0104",
            gender: "Female",
            status: "Scheduled",
            address: "321 Elm Street, Houston, TX 77001",
            disease: "Migraine",
            lastVisitDate: "2023-10-15"
        },
        {
            id: 5,
            patientName: "Robert Wilson",
            appointmentDate: "2024-01-17",
            time: "03:45 PM",
            email: "r.wilson@email.com",
            mobile: "+1-555-0105",
            gender: "Male",
            status: "No Show",
            address: "654 Maple Drive, Phoenix, AZ 85001",
            disease: "Arthritis",
            lastVisitDate: "2023-09-25"
        },
        {
            id: 6,
            patientName: "Lisa Anderson",
            appointmentDate: "2024-01-17",
            time: "01:30 PM",
            email: "lisa.a@email.com",
            mobile: "+1-555-0106",
            gender: "Female",
            status: "Completed",
            address: "987 Cedar Lane, Philadelphia, PA 19101",
            disease: "Allergies",
            lastVisitDate: "2024-01-17"
        }
    ];


    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                menuRef.current &&
                !menuRef.current.contains(event.target as Node)
            ) {
                setOpenRowId(null);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    // Fetch data from API
    const fetchAppointments = async () => {
        setLoading(true);
        try {
            // Simulate API call
            setTimeout(() => {
                setAppointments(sampleAppointmentData);
                setLoading(false);
            }, 1000);
        } catch (error) {
            console.error("Failed to fetch appointments:", error);
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
                "Appointment Date": item.appointmentDate,
                "Time": item.time,
                "Email": item.email,
                "Mobile": item.mobile,
                "Gender": item.gender,
                "Status": item.status,
                "Address": item.address,
                "Disease": item.disease,
                "Last Visit Date": item.lastVisitDate,
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
            setAppointments(prev => prev.filter(p => !selectedIds.includes(p.id)));
            setSelectedIds([]);
        }
    };

    const handleCheckboxChange = (id: number) => {
        setSelectedIds(prev =>
            prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
        );
    };

    const handleSelectAll = (checked: boolean) => {
        setSelectedIds(checked ? appointments.map(p => p.id) : []);
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
        { label: "Patient Name", checked: true },
        { label: "Appointment Date", checked: true },
        { label: "Time", checked: true },
        { label: "Email", checked: true },
        { label: "Mobile", checked: true },
        { label: "Gender", checked: true },
        { label: "Status", checked: true },
        { label: "Address", checked: true },
        { label: "Disease", checked: true },
        { label: "Last Visit Date", checked: true },
        { label: "Actions", checked: true },
    ];

    const handleUpdateAppointment = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!editingAppointment) return;

        try {
            // Simulate API call
            setAppointments(prev =>
                prev.map(appointment =>
                    appointment.id === editingAppointment.id ? editingAppointment : appointment
                )
            );
            alert("Appointment updated successfully!");
            setIsEditModalOpen(false);
        } catch (error) {
            console.error("Error updating appointment:", error);
            alert("An unexpected error occurred.");
        }
    };
    return (
        <>
            <div className='px-4 sm:px-6 py-[20px] mt-0'>
                <div className="flex items-center justify-between relative top-[-5px]">
                    <div className="flex items-center flex-wrap space-x-2">
                        <h1 className="text-[20px] font-semibold">View Appointment</h1>
                        <span className="text-[20px] font-bold">›</span>
                        <Home size={18} />
                        <span>›</span>
                        <span className="text-sm">Appointment</span>
                        <span>›</span>
                        <span className="text-sm">View Appointment</span>
                    </div>
                </div>

                <div className="h-auto mt-3">
                    <div className="max-w-full">
                        <div className="bg-[var(--tableHeaderBg)] rounded-t-xl shadow-md overflow-hidden">
                            {/* Header */}
                            <div className="pr-[15px] pl-[20px] py-[8px] border-b border-gray-200 flex max-[390px]:gap-2 items-center flex-wrap">
                                <div className='flex items-center flex-[35%]'>
                                    <h1 className="m-0 text-[17px] leading-[28px] pr-[10px] font-medium">View Appointment</h1>
                                    <label className='relative'>
                                        <input
                                            type="text"
                                            placeholder="Search appointments..."
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
                                        <button className="flex justify-center items-center w-10 h-10 rounded-full text-[#4caf50] hover:bg-[#CED5E6] transition cursor-pointer" title="Add Appointment">
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
                                                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Patient Name</th>
                                                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Appointment Date</th>
                                                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Time</th>
                                                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Email</th>
                                                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Mobile</th>
                                                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Gender</th>
                                                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Status</th>
                                                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Address</th>
                                                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Disease</th>
                                                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Last Visit Date</th>
                                                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Actions</th>
                                                    </tr>
                                                </thead>

                                                <tbody role='rowgroup' className={`bg-white divide-y divide-gray-200 transition-all duration-500 ${animate ? "animate-slideDown" : ""}`}>
                                                    {appointments.map((item) => (
                                                        <tr key={item.id} className="transition-colors duration-150 hover:bg-gray-50">

                                                            <td className="px-4 py-3 whitespace-nowrap text-sm font-medium">
                                                                {item.patientName}
                                                            </td>

                                                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                                                                {new Date(item.appointmentDate).toLocaleDateString()}
                                                            </td>

                                                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                                                                <div className="flex items-center gap-2">
                                                                    <Clock className="w-4 h-4 text-blue-400" />
                                                                    {item.time}
                                                                </div>
                                                            </td>

                                                            <td className="px-4 py-3 whitespace-nowrap text-sm">
                                                                <div className="flex items-center gap-2">
                                                                    <Mail className="w-4 h-4 text-red-400" />
                                                                    <a href={`mailto:${item.email}`} className="text-blue-600 hover:underline">
                                                                        {item.email}
                                                                    </a>
                                                                </div>
                                                            </td>

                                                            <td className="px-4 py-3 whitespace-nowrap text-sm">
                                                                <div className="flex items-center gap-2">
                                                                    <Phone className="w-4 h-4 text-green-400" />
                                                                    <a href={`tel:${item.mobile}`} className=" hover:text-blue-600">
                                                                        {item.mobile}
                                                                    </a>
                                                                </div>
                                                            </td>

                                                            <td className="px-4 py-3 whitespace-nowrap text-sm">
                                                                <span className={`px-[10px] py-[2px] inline-flex text-xs leading-5 font-semibold rounded-[6px] ${item.gender === "Female" ? "bg-[#6f42c126] text-[#6f42c1]" : "bg-[#19875426] text-[#198754]"}`}>
                                                                    {item.gender}
                                                                </span>
                                                            </td>

                                                            <td className="px-4 py-3 whitespace-nowrap">
                                                                <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full`}>
                                                                    {item.status}
                                                                </span>
                                                            </td>

                                                            <td className="px-4 py-3 text-sm text-gray-500 max-w-[200px] truncate">
                                                                <div className="flex items-center gap-2">
                                                                    <MapPin className="w-4 h-4 text-purple-400 flex-shrink-0" />
                                                                    {item.address}
                                                                </div>
                                                            </td>

                                                            <td className="px-4 py-3 whitespace-nowrap text-sm">
                                                                {item.disease}
                                                            </td>

                                                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                                                                {new Date(item.lastVisitDate).toLocaleDateString()}
                                                            </td>

                                                            <td className="px-4 py-3 whitespace-nowrap text-sm font-medium">
                                                                <button
                                                                    onClick={() => toggleMenu(item.id)}
                                                                    className="cursor-pointer hover:bg-[#E0E1E3] p-1 rounded-full"
                                                                >
                                                                    <MoreVertical className="w-5 h-5" aria-hidden="true" />
                                                                </button>

                                                                {openRowId === item.id && (
                                                                    <div ref={menuRef} className="absolute right-0 mt-2 w-[112px] bg-white border border-gray-200 rounded-lg shadow-lg z-50 mr-2">
                                                                        <button
                                                                            className="flex items-center w-full px-3 h-[48px] py-2 text-sm hover:bg-gray-100 rounded-t-lg transition cursor-pointer"
                                                                        >
                                                                            <Check className="w-5 h-5 mr-2" />
                                                                            Approve
                                                                        </button>
                                                                        <button
                                                                            className="flex items-center w-full px-3 h-[48px] py-2 text-sm  hover:bg-gray-100 rounded-b-lg transition cursor-pointer"
                                                                        >
                                                                            <XCircle className="w-5 h-5 mr-2" />
                                                                            Cancel
                                                                        </button>
                                                                    </div>
                                                                )}
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>

                                            {/* Mobile View */}
                                            <div className={`px-4 md:hidden shadow-sm bg-white transition-all duration-500 ${animate ? "animate-slideDown" : ""}`}>
                                                {appointments.map((item) => (
                                                    <div key={item.id} className="border-b border-gray-200 py-4">

                                                        {/* Appointment Info */}
                                                        <div className="space-y-2 text-sm">
                                                            <div className="flex items-center gap-3 pb-2 border-b border-gray-200 p-2">
                                                                <span className="font-semibold w-32">Patient Name:</span>
                                                                <span className="font-medium text-gray-900">{item.patientName}</span>
                                                            </div>

                                                            <div className="flex items-center gap-3 pb-2 border-b border-gray-200 p-2">
                                                                <span className="font-semibold w-32">Appointment Date:</span>
                                                                <span>{new Date(item.appointmentDate).toLocaleDateString()}</span>
                                                            </div>

                                                            <div className="flex items-center gap-3 pb-2 border-b border-gray-200 p-2">
                                                                <span className="font-semibold w-32">Time:</span>
                                                                <div className="flex items-center gap-2">
                                                                    <Clock className="w-4 h-4 text-blue-400" />
                                                                    <span>{item.time}</span>
                                                                </div>
                                                            </div>

                                                            <div className="flex items-center gap-3 pb-2 border-b border-gray-200 p-2">
                                                                <span className="font-semibold w-32">Email:</span>
                                                                <div className="flex items-center gap-2">
                                                                    <Mail className="w-4 h-4 text-red-400" />
                                                                    <a href={`mailto:${item.email}`} className="text-blue-600 hover:underline">
                                                                        {item.email}
                                                                    </a>
                                                                </div>
                                                            </div>

                                                            <div className="flex items-center gap-3 pb-2 border-b border-gray-200 p-2">
                                                                <span className="font-semibold w-32">Mobile:</span>
                                                                <div className="flex items-center gap-2">
                                                                    <Phone className="w-4 h-4 text-green-400" />
                                                                    <a href={`tel:${item.mobile}`} className="text-gray-900">
                                                                        {item.mobile}
                                                                    </a>
                                                                </div>
                                                            </div>

                                                            <div className="flex items-center gap-3 pb-2 border-b border-gray-200 p-2">
                                                                <span className="font-semibold w-32">Gender:</span>
                                                                <span className="flex items-center gap-1">
                                                                    {item.gender}
                                                                </span>
                                                            </div>

                                                            <div className="flex items-center gap-3 pb-2 border-b border-gray-200 p-2">
                                                                <span className="font-semibold w-32">Status:</span>
                                                                <span className={`px-2 py-1 text-xs font-semibold rounded-full`}>
                                                                    {item.status}
                                                                </span>
                                                            </div>

                                                            <div className="flex items-center gap-3 pb-2 border-b border-gray-200 p-2">
                                                                <span className="font-semibold w-32">Address:</span>
                                                                <div className="flex items-center gap-2">
                                                                    <MapPin className="w-4 h-4 text-purple-400 flex-shrink-0" />
                                                                    <span className="text-gray-500">{item.address}</span>
                                                                </div>
                                                            </div>

                                                            <div className="flex items-center gap-3 pb-2 border-b border-gray-200 p-2">
                                                                <span className="font-semibold w-32">Disease:</span>
                                                                <span className="text-gray-900">{item.disease}</span>
                                                            </div>

                                                            <div className="flex items-center gap-3 pb-2 border-b border-gray-200 p-2">
                                                                <span className="font-semibold w-32">Last Visit:</span>
                                                                <span className="text-gray-500">{new Date(item.lastVisitDate).toLocaleDateString()}</span>
                                                            </div>

                                                            {/* Actions */}
                                                            <div className="flex items-center gap-3 p-2 relative">
                                                                <button
                                                                    onClick={() => toggleMenu(item.id)}
                                                                    className="cursor-pointer hover:bg-[#E0E1E3] p-1 rounded-full"
                                                                >
                                                                    <MoreVertical className="w-5 h-5" aria-hidden="true" />
                                                                </button>

                                                                {openRowId === item.id && (
                                                                    <div ref={menuRef} className="absolute left-0 mt-30 w-[112px] bg-white border border-gray-200 rounded-lg shadow-lg z-50 mr-2">
                                                                        <button
                                                                            className="flex items-center w-full px-3 h-[48px] py-2 text-sm  hover:bg-gray-100 rounded-t-lg transition cursor-pointer"
                                                                        >
                                                                            <Check className="w-5 h-5 mr-2" />
                                                                            Approve
                                                                        </button>
                                                                        <button
                                                                            className="flex items-center w-full px-3 h-[48px] py-2 text-sm  hover:bg-gray-100 rounded-b-lg transition cursor-pointer"
                                                                        >
                                                                            <XCircle className="w-5 h-5 mr-2" />
                                                                            Cancel
                                                                        </button>
                                                                    </div>
                                                                )}
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
            </div >

            {/* Edit Modal */}
            {
                isEditModalOpen && editingAppointment && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999]">
                        <div className="bg-white rounded-lg shadow-lg w-[800px] max-w-[90%] max-h-[90vh] overflow-hidden">
                            <div className="flex items-center justify-between border-b !border-gray-300 px-5 py-3">
                                <div className="flex items-center space-x-3">
                                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                                        <User className="w-6 h-6 text-blue-600" />
                                    </div>
                                    <h2 className="text-lg font-semibold">
                                        Edit Appointment - {editingAppointment.patientName}
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
                                            onChange={(e) => setEditingAppointment({ ...editingAppointment, patientName: e.target.value })}
                                            className="peer w-full rounded-md border bg-white px-3 pt-5 pb-2 text-sm text-gray-800 focus:border-[#005CBB] focus:ring-2 focus:ring-[#005CBB] outline-none transition-all"
                                        />
                                        <label className="absolute left-3 px-[4px] bg-white transition-all duration-200 -top-2 text-xs text-[#005CBB]">
                                            Patient Name*
                                        </label>
                                    </div>

                                    {/* Appointment Date */}
                                    <div className="relative">
                                        <input
                                            type="date"
                                            value={editingAppointment.appointmentDate}
                                            onChange={(e) => setEditingAppointment({ ...editingAppointment, appointmentDate: e.target.value })}
                                            className="peer w-full rounded-md border bg-white px-3 pt-5 pb-2 text-sm text-gray-800 focus:border-[#005CBB] focus:ring-2 focus:ring-[#005CBB] outline-none transition-all"
                                        />
                                        <label className="absolute left-3 px-[4px] bg-white transition-all duration-200 -top-2 text-xs text-[#005CBB]">
                                            Appointment Date*
                                        </label>
                                    </div>

                                    {/* Time */}
                                    <div className="relative">
                                        <input
                                            type="time"
                                            value={editingAppointment.time}
                                            onChange={(e) => setEditingAppointment({ ...editingAppointment, time: e.target.value })}
                                            className="peer w-full rounded-md border bg-white px-3 pt-5 pb-2 text-sm text-gray-800 focus:border-[#005CBB] focus:ring-2 focus:ring-[#005CBB] outline-none transition-all"
                                        />
                                        <label className="absolute left-3 px-[4px] bg-white transition-all duration-200 -top-2 text-xs text-[#005CBB]">
                                            Time*
                                        </label>
                                    </div>

                                    {/* Email */}
                                    <div className="relative">
                                        <input
                                            type="email"
                                            value={editingAppointment.email}
                                            onChange={(e) => setEditingAppointment({ ...editingAppointment, email: e.target.value })}
                                            className="peer w-full rounded-md border bg-white px-3 pt-5 pb-2 text-sm text-gray-800 focus:border-[#005CBB] focus:ring-2 focus:ring-[#005CBB] outline-none transition-all"
                                        />
                                        <label className="absolute left-3 px-[4px] bg-white transition-all duration-200 -top-2 text-xs text-[#005CBB]">
                                            Email*
                                        </label>
                                    </div>

                                    {/* Mobile */}
                                    <div className="relative">
                                        <input
                                            type="tel"
                                            value={editingAppointment.mobile}
                                            onChange={(e) => setEditingAppointment({ ...editingAppointment, mobile: e.target.value })}
                                            className="peer w-full rounded-md border bg-white px-3 pt-5 pb-2 text-sm text-gray-800 focus:border-[#005CBB] focus:ring-2 focus:ring-[#005CBB] outline-none transition-all"
                                        />
                                        <label className="absolute left-3 px-[4px] bg-white transition-all duration-200 -top-2 text-xs text-[#005CBB]">
                                            Mobile*
                                        </label>
                                    </div>

                                    {/* Gender */}
                                    <div className="relative">
                                        <select
                                            value={editingAppointment.gender}
                                            onChange={(e) => setEditingAppointment({ ...editingAppointment, gender: e.target.value as any })}
                                            className="peer w-full rounded-md border bg-white px-3 pt-5 pb-2 text-sm text-gray-800 focus:border-[#005CBB] focus:ring-2 focus:ring-[#005CBB] outline-none transition-all"
                                        >
                                            <option value="Male">Male</option>
                                            <option value="Female">Female</option>
                                            <option value="Other">Other</option>
                                        </select>
                                        <label className="absolute left-3 px-[4px] bg-white transition-all duration-200 -top-2 text-xs text-[#005CBB]">
                                            Gender*
                                        </label>
                                    </div>

                                    {/* Status */}
                                    <div className="relative">
                                        <select
                                            value={editingAppointment.status}
                                            onChange={(e) => setEditingAppointment({ ...editingAppointment, status: e.target.value as any })}
                                            className="peer w-full rounded-md border bg-white px-3 pt-5 pb-2 text-sm text-gray-800 focus:border-[#005CBB] focus:ring-2 focus:ring-[#005CBB] outline-none transition-all"
                                        >
                                            <option value="Scheduled">Scheduled</option>
                                            <option value="Completed">Completed</option>
                                            <option value="Cancelled">Cancelled</option>
                                            <option value="No Show">No Show</option>
                                        </select>
                                        <label className="absolute left-3 px-[4px] bg-white transition-all duration-200 -top-2 text-xs text-[#005CBB]">
                                            Status*
                                        </label>
                                    </div>

                                    {/* Disease */}
                                    <div className="relative">
                                        <input
                                            type="text"
                                            value={editingAppointment.disease}
                                            onChange={(e) => setEditingAppointment({ ...editingAppointment, disease: e.target.value })}
                                            className="peer w-full rounded-md border bg-white px-3 pt-5 pb-2 text-sm text-gray-800 focus:border-[#005CBB] focus:ring-2 focus:ring-[#005CBB] outline-none transition-all"
                                        />
                                        <label className="absolute left-3 px-[4px] bg-white transition-all duration-200 -top-2 text-xs text-[#005CBB]">
                                            Disease*
                                        </label>
                                    </div>

                                    {/* Last Visit Date */}
                                    <div className="relative">
                                        <input
                                            type="date"
                                            value={editingAppointment.lastVisitDate}
                                            onChange={(e) => setEditingAppointment({ ...editingAppointment, lastVisitDate: e.target.value })}
                                            className="peer w-full rounded-md border bg-white px-3 pt-5 pb-2 text-sm text-gray-800 focus:border-[#005CBB] focus:ring-2 focus:ring-[#005CBB] outline-none transition-all"
                                        />
                                        <label className="absolute left-3 px-[4px] bg-white transition-all duration-200 -top-2 text-xs text-[#005CBB]">
                                            Last Visit Date*
                                        </label>
                                    </div>
                                </div>

                                {/* Address */}
                                <div className="relative">
                                    <textarea
                                        value={editingAppointment.address}
                                        onChange={(e) => setEditingAppointment({ ...editingAppointment, address: e.target.value })}
                                        placeholder=" "
                                        rows={3}
                                        className="peer w-full rounded-md border bg-white px-3 pt-5 pb-2 text-sm resize-none text-gray-800 focus:border-[#005CBB] focus:ring-2 focus:ring-[#005CBB] outline-none transition-all"
                                    ></textarea>
                                    <label className="absolute left-3 px-[4px] bg-white transition-all duration-200 -top-2 text-xs text-[#005CBB]">
                                        Address*
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
                )
            }

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
        <div className="flex items-center justify-end gap-8 border-t border-gray-200 bg-white px-4 py-3 text-sm  rounded-b-xl shadow-sm">
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