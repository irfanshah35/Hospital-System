import { CirclePlus, Download, Home, RotateCw } from 'lucide-react'
import React from 'react'
import { Clock, Phone, Mail, Edit, Trash2 } from "lucide-react";

interface Appointment {
    id: number;
    name: string;
    doctor: string;
    gender: "Male" | "Female";
    date: string;
    time: string;
    phone: string;
    email: string;
    status: "Completed" | "Cancelled" | "Confirmed";
    visitType: string;
    image: string;
}

export default function ViewAppointments() {

    const appointments: Appointment[] = [
        {
            id: 1,
            name: "Cara Stevens",
            doctor: "Dr. Rajesh",
            gender: "Female",
            date: "11/18/2025",
            time: "09:00",
            phone: "1234567890",
            email: "cara.stevens@email.com",
            status: "Completed",
            visitType: "New Patient",
            image:
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWcoY3z1q3i7fyiX5wMAE7pxRFoAAWySeQWIZE2U_rG1sdbqQcK8Eci_QvIn-YxmccpBw&usqp=CAU",
        },
        {
            id: 2,
            name: "John Doe",
            doctor: "Dr. Sarah Smith",
            gender: "Male",
            date: "11/22/2025",
            time: "11:30",
            phone: "9876543210",
            email: "john.doe@email.com",
            status: "Cancelled",
            visitType: "New Patient",
            image:
                "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        },
        {
            id: 3,
            name: "Alice Johnson",
            doctor: "Dr. Jay Soni",
            gender: "Female",
            date: "11/14/2025",
            time: "09:45",
            phone: "2345678901",
            email: "alice.j@email.com",
            status: "Confirmed",
            visitType: "New Patient",
            image:
                "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        },
        {
            id: 4,
            name: "Bob Brown",
            doctor: "Dr. Pooja Patel",
            gender: "Male",
            date: "11/19/2025",
            time: "13:15",
            phone: "3456789012",
            email: "bob.brown@email.com",
            status: "Cancelled",
            visitType: "New Patient",
            image:
                "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        },
        {
            id: 5,
            name: "Sara Lee",
            doctor: "Dr. Jayesh Shah",
            gender: "Female",
            date: "11/21/2025",
            time: "10:30",
            phone: "4567890123",
            email: "sara.lee@email.com",
            status: "Completed",
            visitType: "Follow-Up",
            image:
                "https://images.unsplash.com/photo-1534751516642-a1af1ef26a56?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        },
    ];
    return (
        <>
            <div className='px-4 sm:px-6 py-[20px] bg-[#ECF0F9] mt-0'>
                <div className="flex items-center justify-between bg-[#ECF0F9] relative top-[-5px]">
                    <div className="flex items-center space-x-2 text-gray-700">
                        <h1 className="text-[20px] font-semibold text-gray-900">View Appointment</h1>
                        <span className="text-[20px] text-black font-bold">›</span>
                        <Home size={18} className="text-gray-500" />
                        <span className="text-gray-500">›</span>
                        <span className="text-gray-600 text-sm">Appointment</span>
                        <span className="text-gray-500">›</span>
                        <span className="text-gray-600 text-sm">View</span>
                    </div>
                </div>



                <div className="min-h-screen mt-3">
                    <div className="max-w-full ">
                        <div className="bg-white rounded-xl shadow-md overflow-hidden">
                            {/* Header */}
                            <div className="pr-[15px] pl-[20px] py-[8px] bg-[#DAE1F3] border-b border-gray-200 flex items-center">
                                <div className='flex items-center flex-[35%]'>
                                    <h1 className="m-0 text-[17px] leading-[28px] pr-[10px] font-medium">Appointment</h1>
                                    <label className='relative'>
                                        <input
                                            id="search-input"
                                            type="text"
                                            placeholder="Search"
                                            aria-label="Search box"
                                            className="w-[212px] h-[45px] rounded-[5px] border-0 bg-white text-[14px] font-medium text-[#0000008a] px-[50px] py-2 focus:outline-none"
                                        ></input>
                                        <span className='absolute left-2 top-2'>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-search-icon lucide-search w-6 h-6"><path d="m21 21-4.34-4.34" /><circle cx="11" cy="11" r="8" /></svg>
                                        </span>
                                    </label>
                                </div>

                                <div className="flex items-center">

                                    <button
                                        className="flex justify-center items-center w-10 h-10 rounded-full text-[#f44336] hover:bg-[#CED5E6] transition"
                                        title="Show/Hide Columns cursor-pointer"
                                    >
                                        <svg className='w-[22px] h-[22px]' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M17 6H22V8H20V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V8H2V6H7V3C7 2.44772 7.44772 2 8 2H16C16.5523 2 17 2.44772 17 3V6ZM18 8H6V20H18V8ZM9 4V6H15V4H9Z"></path></svg>
                                    </button>

                                    <button
                                        className="flex justify-center items-center w-10 h-10 rounded-full text-indigo-500 hover:bg-[#CED5E6] transition"
                                        title="Show/Hide Columns cursor-pointer"
                                    >
                                        <svg className="w-[22px] h-[22px]" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M3 5h18v2H3V5zm0 6h12v2H3v-2zm0 6h18v2H3v-2z" />
                                        </svg>
                                    </button>


                                    <button
                                        className="flex justify-center items-center w-10 h-10 rounded-full text-[#4caf50] hover:bg-[#CED5E6] transition cursor-pointer"
                                        title="Add"
                                    >
                                        <CirclePlus className='w-[22px] h-[22px]' />
                                    </button>

                                    <button
                                        className="flex justify-center items-center w-10 h-10 rounded-full text-[#795548] hover:bg-[#CED5E6] transition cursor-pointer"
                                        title="Refresh"
                                    >
                                        <RotateCw className='w-[20px] h-[20px]' />
                                    </button>

                                    <button
                                        className="flex justify-center items-center w-10 h-10 rounded-full text-[#2196f3] hover:bg-[#CED5E6] transition cursor-pointer"
                                        title="XLSX Download"
                                    >
                                        <Download className='w-[20px] h-[20px]' />
                                    </button>
                                </div>

                            </div>


                            <div className='overflow-auto scrollbar-hide'>
                                <div className="overflow-x-auto scrollbar-hide">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                            <tr className='ml-[24px]'>
                                                <th scope="col" className="px-4 py-3 pl-[37px] text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    <div className="flex items-center">
                                                        <input type="checkbox" className="h-[18px] w-[18px] rounded-[2px] border-[2px] border-[#1a1b1f]" />
                                                    </div>
                                                </th>
                                                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Doctor</th>
                                                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Gender</th>
                                                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                                                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mobile</th>
                                                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                                                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Appointment Status</th>
                                                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Visit Type</th>
                                                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                            </tr>
                                        </thead>

                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {appointments.map((item) => (
                                                <tr key={item.id} className="hover:bg-gray-50 transition-colors duration-150">
                                                    <td className="px-4 py-3 pl-[37px]">
                                                        <input
                                                            type="checkbox"
                                                            className="h-[18px] w-[18px] rounded-[2px]  border-[2px] border-[#1a1b1f] checked:bg-red"
                                                        />
                                                    </td>

                                                    {/* Name + Image */}
                                                    <td className="px-4 py-3 whitespace-nowrap">
                                                        <div className="flex items-center">
                                                            <img
                                                                className="h-[30px] w-[30px] rounded-full object-cover"
                                                                src={item.image}
                                                                alt={item.name}
                                                            />
                                                            <div className="ml-4 w-[110px] overflow-hidden text-ellipsis whitespace-nowrap">
                                                                <div className="text-sm font-medium text-gray-900">
                                                                    {item.name}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </td>

                                                    <td className="px-4 text-sm whitespace-nowrap text-gray-900">{item.doctor}</td>

                                                    <td className="px-4 whitespace-nowrap">
                                                        <span
                                                            className={`px-[10px] py-[2px] inline-flex text-xs leading-5 font-semibold rounded-[6px] ${item.gender === "Female"
                                                                ? "bg-[#6f42c126] text-[#6f42c1]"
                                                                : "bg-[#19875426] text-[#198754]"
                                                                }`}
                                                        >
                                                            {item.gender}
                                                        </span>
                                                    </td>

                                                    <td className="px-4 text-sm text-gray-500">{item.date}</td>

                                                    <td className="px-4 text-sm text-gray-500">
                                                        <div className="flex items-center">
                                                            <Clock className="w-4 h-4 text-[#6f42c1] mr-2" />
                                                            <span>{item.time}</span>
                                                        </div>
                                                    </td>

                                                    <td className="px-4 text-sm text-gray-500">
                                                        <div className="flex items-center">
                                                            <Phone className="w-4 h-4 text-[#198754] mr-2" />
                                                            <span>{item.phone}</span>
                                                        </div>
                                                    </td>

                                                    <td className="px-4 text-sm text-gray-500">
                                                        <div className="flex items-center">
                                                            <Mail className="w-4 h-4 text-red-500 mr-2" />
                                                            <span>{item.email}</span>
                                                        </div>
                                                    </td>

                                                    <td className="px-4 whitespace-nowrap">
                                                        <span
                                                            className={`px-2 inline-flex text-sm leading-5  rounded-full`}
                                                        >
                                                            {item.status}
                                                        </span>
                                                    </td>

                                                    <td className="px-4 text-sm text-gray-500">{item.visitType}</td>

                                                    <td className="px-4 text-sm font-medium">
                                                        <div className="flex space-x-2">
                                                            <button className="text-[#6777ef] hover:bg-[#E0E1E3] p-1 rounded-full cursor-pointer">
                                                                <Edit className="w-5 h-5" />
                                                            </button>
                                                            <button className="text-[#ff5200] hover:bg-[#E0E1E3] p-1 rounded-full cursor-pointer">
                                                                <Trash2 className="w-5 h-5" />
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
