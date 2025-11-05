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
    email: string;
    mobile: string;
    injury: string;
    appointmentType: "Consultation" | "Follow-up" | "Emergency" | "Routine Checkup";
    nextAppointment: string;
    status: "Scheduled" | "Confirmed" | "Cancelled" | "Completed";
    notes: string;
    location: string;
}

export default function PastAppointments() {
    const [detailDropdown, setDetailDropdown] = useState(false);
    const detailref = useRef<HTMLDivElement | null>(null);
    const [selectedIds, setSelectedIds] = useState<number[]>([]);
    const [appointments, setAppointments] = useState<Appointment[]>([]);
    const [animate, setAnimate] = useState(false);
    const [loading, setLoading] = useState(true);

    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editingAppointment, setEditingAppointment] = useState<Appointment | null>(null);

    const sampleAppointments: Appointment[] = [
        {
            id: 1,
            patientName: "John Smith",
            doctor: "Dr. Sarah Wilson",
            date: "2024-01-10",
            time: "10:00 AM",
            email: "john.smith@email.com",
            mobile: "+1-555-0101",
            injury: "Knee Pain",
            appointmentType: "Follow-up",
            nextAppointment: "2024-02-15",
            status: "Completed",
            notes: "Physical therapy session completed",
            location: "Main Clinic"
        },
        {
            id: 2,
            patientName: "Emma Johnson",
            doctor: "Dr. Michael Brown",
            date: "2024-01-08",
            time: "2:30 PM",
            email: "emma.j@email.com",
            mobile: "+1-555-0102",
            injury: "Back Pain",
            appointmentType: "Consultation",
            nextAppointment: "2024-02-10",
            status: "Completed",
            notes: "Initial diagnosis completed",
            location: "Downtown Branch"
        },
        {
            id: 3,
            patientName: "Robert Davis",
            doctor: "Dr. Sarah Wilson",
            date: "2024-01-05",
            time: "9:15 AM",
            email: "robert.d@email.com",
            mobile: "+1-555-0103",
            injury: "Sports Injury",
            appointmentType: "Emergency",
            nextAppointment: "2024-01-20",
            status: "Completed",
            notes: "Emergency treatment provided",
            location: "Main Clinic"
        },
        {
            id: 4,
            patientName: "Lisa Anderson",
            doctor: "Dr. James Miller",
            date: "2024-01-03",
            time: "11:45 AM",
            email: "lisa.a@email.com",
            mobile: "+1-555-0104",
            injury: "Headache",
            appointmentType: "Routine Checkup",
            nextAppointment: "2024-04-03",
            status: "Completed",
            notes: "Routine checkup completed",
            location: "North Clinic"
        },
        {
            id: 5,
            patientName: "David Wilson",
            doctor: "Dr. Michael Brown",
            date: "2023-12-28",
            time: "3:00 PM",
            email: "david.w@email.com",
            mobile: "+1-555-0105",
            injury: "Fractured Arm",
            appointmentType: "Follow-up",
            nextAppointment: "2024-01-25",
            status: "Completed",
            notes: "Cast removal successful",
            location: "Main Clinic"
        },
        {
            id: 6,
            patientName: "Sarah Thompson",
            doctor: "Dr. Emily Chen",
            date: "2023-12-20",
            time: "1:30 PM",
            email: "sarah.t@email.com",
            mobile: "+1-555-0106",
            injury: "Allergy Test",
            appointmentType: "Routine Checkup",
            nextAppointment: "2024-06-20",
            status: "Completed",
            notes: "Allergy testing completed",
            location: "South Clinic"
        },
        {
            id: 7,
            patientName: "Mike Rodriguez",
            doctor: "Dr. James Miller",
            date: "2023-12-15",
            time: "4:15 PM",
            email: "mike.r@email.com",
            mobile: "+1-555-0107",
            injury: "Dental Checkup",
            appointmentType: "Consultation",
            nextAppointment: "2024-03-15",
            status: "Completed",
            notes: "Regular dental examination",
            location: "North Clinic"
        }
    ];

    const fetchAppointments = async () => {
        setLoading(true);
        try {
            setAppointments(sampleAppointments);
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
                "Doctor": item.doctor,
                "Date": item.date,
                "Time": item.time,
                "Email": item.email,
                "Mobile": item.mobile,
                "Injury": item.injury,
                "Appointment Type": item.appointmentType,
                "Next Appointment": item.nextAppointment,
                "Status": item.status,
                "Notes": item.notes,
                "Location": item.location,
            }))
        );

        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Past Appointments");
        const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
        const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
        saveAs(blob, "past-appointments.xlsx");
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
        { label: "Email", checked: true },
        { label: "Mobile", checked: true },
        { label: "Injury", checked: true },
        { label: "Appointment Type", checked: true },
        { label: "Next Appointment", checked: true },
        { label: "Actions", checked: true },
    ];

    const deleteSelectedAppointments = async (id: number) => {
        try {
            setAppointments(prev => prev.filter(a => a.id !== id));
            console.log("Appointment deleted:", id);
        } catch (error) {
            console.error("Error deleting appointment:", error);
        }
    };

    return (
        <>
            <div className='px-4 sm:px-6 py-[20px] mt-0'>
                <div className="flex items-center justify-between relative top-[-5px]">
                    <div className="flex items-center flex-wrap space-x-2">
                        <h1 className="text-[20px] font-semibold">Past</h1>
                        <span className="text-[20px] font-bold">›</span>
                        <Home size={18} />
                        <span>›</span>
                        <span className="text-sm">Appointments</span>
                        <span>›</span>
                        <span className="text-sm">Past Appointments</span>
                    </div>
                </div>

                <div className="h-auto mt-3">
                    <div className="max-w-full">
                        <div className="bg-[var(--tableHeaderBg)] rounded-t-xl shadow-md overflow-hidden">
                            {/* Header */}
                            <div className="pr-[15px] pl-[20px] py-[8px] border-b border-gray-200 flex max-[390px]:gap-2 items-center flex-wrap">
                                <div className='flex items-center flex-[35%]'>
                                    <h1 className="m-0 text-[17px] leading-[28px] pr-[10px] font-medium">Past Appointments</h1>
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
                                        <button className="flex justify-center items-center w-10 h-10 rounded-full text-[#4caf50] hover:bg-[#CED5E6] transition cursor-pointer" title="Add New Appointment">
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
                                        <div className="p-8 text-center text-gray-500">Loading past appointments...</div>
                                    ) : appointments.length === 0 ? (
                                        <div className="p-8 text-center text-gray-500">No past appointments found</div>
                                    ) : (
                                        <>
                                            {/* Desktop Table */}
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
                                                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Email</th>
                                                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Mobile</th>
                                                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Injury</th>
                                                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Appointment Type</th>
                                                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Next Appointment</th>
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

                                                            <td className="px-4 text-sm whitespace-nowrap">
                                                                <div className="flex items-center gap-2">
                                                                    {item.date}
                                                                </div>
                                                            </td>

                                                            <td className="px-4 text-sm whitespace-nowrap">
                                                                <div className="flex items-center gap-2">
                                                                    <Clock className="w-4 h-4 text-[#6f42c1]" />
                                                                    {item.time}
                                                                </div>
                                                            </td>

                                                            <td className="px-4 text-sm whitespace-nowrap">
                                                                <div className="flex items-center gap-2">
                                                                    <Mail className="w-4 h-4 text-[#2196f3]" />
                                                                    {item.email}
                                                                </div>
                                                            </td>

                                                            <td className="px-4 text-sm whitespace-nowrap">
                                                                <div className="flex items-center gap-2">
                                                                    <Phone className="w-4 h-4 text-[#4caf50]" />
                                                                    {item.mobile}
                                                                </div>
                                                            </td>

                                                            <td className="px-4 text-sm whitespace-nowrap">
                                                                <span className="px-2 py-1 text-xs ">
                                                                    {item.injury}
                                                                </span>
                                                            </td>

                                                            <td className="px-4 whitespace-nowrap">
                                                                <span className={`px-2 py-1 text-xs font-medium rounded `}>
                                                                    {item.appointmentType}
                                                                </span>
                                                            </td>

                                                            <td className="px-4 text-sm whitespace-nowrap">
                                                                <div className="flex items-center gap-2">
                                                                    <Clock className="w-4 h-4 text-green-500" />
                                                                    {item.nextAppointment}
                                                                </div>
                                                            </td>

                                                            <td className="px-4 text-sm font-medium">
                                                                <div className="flex space-x-2">
                                                                    <button 
                                                                        onClick={() => deleteSelectedAppointments(item.id)} 
                                                                        className="text-[#ff5200] hover:bg-[#E0E1E3] p-1 rounded-full cursor-pointer"
                                                                        title="Delete Appointment"
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
                                                                <span className="font-semibold w-28">Email:</span>
                                                                <div className="flex items-center gap-1">
                                                                    <Mail className="w-4 h-4 text-[#2196f3]" />
                                                                    <span className="text-xs">{item.email}</span>
                                                                </div>
                                                            </div>

                                                            <div className="flex items-center gap-3 pb-2 border-b border-gray-200 p-2">
                                                                <span className="font-semibold w-28">Mobile:</span>
                                                                <div className="flex items-center gap-1">
                                                                    <Phone className="w-4 h-4 text-[#4caf50]" />
                                                                    <span>{item.mobile}</span>
                                                                </div>
                                                            </div>

                                                            <div className="flex items-center gap-3 pb-2 border-b border-gray-200 p-2">
                                                                <span className="font-semibold w-28">Injury:</span>
                                                                <span className="px-2 py-1 text-xs bg-orange-50 text-orange-700 rounded border border-orange-200">
                                                                    {item.injury}
                                                                </span>
                                                            </div>

                                                            <div className="flex items-center gap-3 pb-2 border-b border-gray-200 p-2">
                                                                <span className="font-semibold w-28">Appointment Type:</span>
                                                                <span className={`px-2 py-1 text-xs font-medium rounded`}>
                                                                    {item.appointmentType}
                                                                </span>
                                                            </div>

                                                            <div className="flex items-center gap-3 pb-2 border-b border-gray-200 p-2">
                                                                <span className="font-semibold w-28">Next Appointment:</span>
                                                                <div className="flex items-center gap-1">
                                                                    <Clock className="w-4 h-4 text-green-500" />
                                                                    <span>{item.nextAppointment}</span>
                                                                </div>
                                                            </div>

                                                            <div className="flex items-center gap-3 pb-2 border-b border-gray-200 p-2">
                                                                <span className="font-semibold w-28">Location:</span>
                                                                <div className="flex items-center gap-1">
                                                                    <MapPin className="w-4 h-4 text-red-500" />
                                                                    <span>{item.location}</span>
                                                                </div>
                                                            </div>

                                                            {/* Actions */}
                                                            <div className="flex items-center gap-3 p-2">
                                                                <div className="flex space-x-2">
                                                                    <button
                                                                        onClick={() => deleteSelectedAppointments(item.id)}
                                                                        className="text-[#ff5200] hover:bg-[#E0E1E3] p-1 rounded-full cursor-pointer"
                                                                        title="Delete Appointment"
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