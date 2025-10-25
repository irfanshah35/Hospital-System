import { CirclePlus, Download, Home, RotateCw } from 'lucide-react'
import React, { useEffect, useState, useRef } from "react";
import { Clock, Phone, Mail, Edit, Trash2 } from "lucide-react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

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

    const [detailDropdown, setDetailDropdown] = useState(false)
    const detailref = useRef<HTMLDivElement | null>(null);
    const [selectedIds, setSelectedIds] = useState<number[]>([]);


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

    const checkboxItems = [
        { label: "Checkbox", checked: true },
        { label: "Name", checked: true },
        { label: "Doctor", checked: true },
        { label: "Gender", checked: true },
        { label: "Date", checked: true },
        { label: "Time", checked: true },
        { label: "Mobile", checked: true },
        { label: "Injury", checked: false },
        { label: "Email", checked: true },
        { label: "Appointment Status", checked: true },
        { label: "Visit Type", checked: true },
        { label: "Payment Status", checked: false },
        { label: "Insurance Provider", checked: false },
        { label: "Notes", checked: false },
        { label: "Actions", checked: true },
    ];

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            const target = event.target as Node;
            if (
                detailref.current &&
                !detailref.current.contains(target)
            ) {
                setDetailDropdown(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const [data, setData] = useState(appointments);
    const [animate, setAnimate] = useState(false);

    const handleRefresh = () => {
        setAnimate(true);

        setTimeout(() => {
            setData([...appointments]);
            setAnimate(false);
        }, 300);
    };


    const handleDownloadXLSX = () => {
        // Table data ko Excel format me convert karna
        const worksheet = XLSX.utils.json_to_sheet(
            appointments.map((item) => ({
                Name: item.name,
                Doctor: item.doctor,
                Gender: item.gender,
                Date: item.date,
                Time: item.time,
                Mobile: item.phone,
                Email: item.email,
                "Appointment Status": item.status,
                "Visit Type": item.visitType,
            }))
        );

        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Appointments");

        // Excel file generate & download
        const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
        const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
        saveAs(blob, "appointments.xlsx");
    };
    const removeData = () => {
        if (selectedIds.length === 0) {
            alert("Please select at least one appointment to delete.");
            return;
        }
        const confirmDelete = window.confirm(
            `Are you sure you want to delete ${selectedIds.length} appointment(s)?`
        );
        if (confirmDelete) {
            setData(data.filter((item) => !selectedIds.includes(item.id)));
            setSelectedIds([]); // clear selection
        }
    }
    const handleCheckboxChange = (id: number) => {
        setSelectedIds((prev) =>
            prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
        );
    };
    const handleSelectAll = (checked: boolean) => {
        if (checked) {
            setSelectedIds(data.map((item) => item.id)); // sab IDs add karo
        } else {
            setSelectedIds([]); // sab unselect karo
        }
    };
    useEffect(() => {
        const selectAllCheckbox = document.getElementById("selectAll") as HTMLInputElement;
        if (selectAllCheckbox) {
            selectAllCheckbox.indeterminate =
                selectedIds.length > 0 && selectedIds.length < data.length;
        }
    }, [selectedIds, data]);

    return (
        <>
            <div className='px-4 sm:px-6 py-[20px] mt-0'>
                <div className="flex items-center justify-between relative top-[-5px]">
                    <div className="flex items-center space-x-2 ">
                        <h1 className="text-[20px] font-semibold">View Appointment</h1>
                        <span className="text-[20px]  font-bold">›</span>
                        <Home size={18} className="" />
                        <span className="">›</span>
                        <span className=" text-sm">Appointment</span>
                        <span className="">›</span>
                        <span className=" text-sm">View</span>
                    </div>
                </div>



                <div className="h-auto mt-3">
                    <div className="max-w-full ">
                        <div className="bg-[var(--tableHeaderBg)] rounded-t-xl shadow-md overflow-hidden">
                            {/* Header */}
                            <div className="pr-[15px] pl-[20px] py-[8px] border-b border-gray-200 flex items-center">
                                <div className='flex items-center flex-[35%] bg-'>
                                    <h1 className="m-0 text-[17px] leading-[28px] pr-[10px] font-medium">Appointment</h1>
                                    <label className='relative'>
                                        <input
                                            id="search-input"
                                            type="text"
                                            placeholder="Search"
                                            aria-label="Search box"
                                            className="w-[212px] h-[45px] rounded-[5px] border-0 bg-white text-[14px] font-medium  px-[50px] py-2 focus:outline-none"
                                        ></input>
                                        <span className='absolute left-2 top-2'>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-search-icon lucide-search w-6 h-6"><path d="m21 21-4.34-4.34" /><circle cx="11" cy="11" r="8" /></svg>
                                        </span>
                                    </label>
                                </div>

                                <div className="flex items-center">


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
                                        <button onClick={() => setDetailDropdown(!detailDropdown)}
                                            className="flex justify-center items-center w-10 h-10 rounded-full text-indigo-500 cursor-pointer hover:bg-[#CED5E6] transition"
                                            title="Show/Hide Columns"
                                        >
                                            <svg className="w-[22px] h-[22px]" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M3 5h18v2H3V5zm0 6h12v2H3v-2zm0 6h18v2H3v-2z" />
                                            </svg>
                                        </button>


                                        {/* Dropdown  */}
                                        {detailDropdown && (

                                            <div className="absolute top-[40px] right-0 z-10 origin-top-right transform transition-all duration-300 ease-out overflow-x-hidden">
                                                <div className="px-[15px] h-[300px] max-h-[320px] overflow-y-auto min-w-[218px] bg-[#efedf0] rounded-[6px] overflow-x-hidden">

                                                    <span className="block text-sm px-[25px] pt-2 font-semibold text-[#212529] leading-[40px]">Show/Hide Column</span>
                                                    <hr className="border-gray-300 my-2" />

                                                    <div className="pr-2 pl-[12px]">
                                                        {checkboxItems.map((item, index) => (
                                                            <label
                                                                key={index}
                                                                className="flex items-center space-x-4 h-[40px] cursor-pointer"
                                                            >
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
                                        className="flex justify-center items-center w-10 h-10 rounded-full text-[#4caf50] hover:bg-[#CED5E6] transition cursor-pointer"
                                        title="Add"
                                    >
                                        <CirclePlus className='w-[22px] h-[22px]' />
                                    </button>

                                    <button
                                        onClick={handleRefresh}
                                        className="flex justify-center items-center w-10 h-10 rounded-full text-[#795548] hover:bg-[#CED5E6] transition cursor-pointer"
                                        title="Refresh"
                                    >
                                        <RotateCw className='w-[20px] h-[20px]' />
                                    </button>

                                    <button onClick={handleDownloadXLSX}
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
                                        <thead className="bg-white">
                                            <tr className='ml-[24px]'>
                                                <th scope="col" className="px-4 py-3 pl-[37px] text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    <div className="flex items-center">
                                                        <input type="checkbox" id="selectAll" className="h-[18px] w-[18px] rounded-[2px] border-[2px] border-[#1a1b1f]" onChange={(e) => handleSelectAll(e.target.checked)} />
                                                    </div>
                                                </th>
                                                <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Name</th>
                                                <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Doctor</th>
                                                <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Gender</th>
                                                <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Date</th>
                                                <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Time</th>
                                                <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Mobile</th>
                                                <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Email</th>
                                                <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Appointment Status</th>
                                                <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Visit Type</th>
                                                <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Actions</th>
                                            </tr>
                                        </thead>

                                        <tbody className={`bg-white divide-y divide-gray-200 transition-all duration-500 ${animate ? "animate-slideDown" : ""
                                            }`}>
                                            {data.map((item) => (
                                                <tr key={item.id} className="transition-colors duration-150">
                                                    <td className="px-4 py-3 pl-[37px]">
                                                        <input
                                                            type="checkbox"
                                                            checked={selectedIds.includes(item.id)}
                                                            onChange={() => handleCheckboxChange(item.id)}
                                                            className="h-[18px] w-[18px] rounded-[2px] border-[2px] border-[#1a1b1f]"
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
                                                                <div className="text-sm font-medium">
                                                                    {item.name}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </td>

                                                    <td className="px-4 text-sm whitespace-nowrap">{item.doctor}</td>

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

                                                    <td className="px-4 text-sm">{item.date}</td>

                                                    <td className="px-4 text-sm">
                                                        <div className="flex items-center">
                                                            <Clock className="w-4 h-4 text-[#6f42c1] mr-2" />
                                                            <span>{item.time}</span>
                                                        </div>
                                                    </td>

                                                    <td className="px-4 text-sm">
                                                        <div className="flex items-center">
                                                            <Phone className="w-4 h-4 text-[#198754] mr-2" />
                                                            <span>{item.phone}</span>
                                                        </div>
                                                    </td>

                                                    <td className="px-4 text-sm">
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

                                                    <td className="px-4 text-sm">{item.visitType}</td>

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

                <div>
                    <Paginator />
                </div>

            </div>

            <style jsx>{`
                @keyframes slideDown {
                    0% {
                        transform: translateY(-20px);
                        opacity: 0;
                    }
                    100% {
                        transform: translateY(0);
                        opacity: 1;
                    }
                }

                .animate-slideDown {
                    animation: slideDown 0.4s ease-in-out;
                }
            `}</style>
        </>
    )
}




import { ChevronLeft, ChevronRight, ChevronDown } from "lucide-react";

const Paginator = ({ totalItems = 80, itemsPerPageOptions = [10, 25, 50] }) => {
    const [page, setPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(itemsPerPageOptions[0]);

    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const startItem = (page - 1) * itemsPerPage + 1;
    const endItem = Math.min(page * itemsPerPage, totalItems);

    const handlePrev = () => {
        if (page > 1) setPage(page - 1);
    };

    const handleNext = () => {
        if (page < totalPages) setPage(page + 1);
    };

    return (
        <div className="flex flex-wrap items-center justify-end gap-8 border-t border-gray-200 bg-white px-4 py-3 text-sm text-gray-700 rounded-b-xl shadow-sm ">
            <div className="flex items-center space-x-2 ">
                <span className="text-white text-[12px] font-medium">Items per page:</span>


                <div className="relative w-[84px]">
                    <select
                        value={itemsPerPage}
                        onChange={(e) => {
                            setItemsPerPage(Number(e.target.value));
                            setPage(1);
                        }}
                        className="appearance-none border border-[#44474e] rounded-md text-sm px-4 w-full py-3 focus:ring-1 focus:ring-[#005CBB] focus:border-[#005CBB] outline-none cursor-pointer pr-8"
                    >
                        {itemsPerPageOptions.map((option, i) => (
                            <option key={i} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>


                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4  pointer-events-none" />
                </div>
            </div>


            <div className=" font-medium">
                {startItem} – {endItem} of {totalItems}
            </div>


            <div className="flex items-center space-x-2">
                <button
                    onClick={handlePrev}
                    disabled={page === 1}
                    className={`flex items-center justify-center w-9 h-9 rounded-full transition cursor-pointer ${page === 1
                        ? "opacity-50 cursor-not-allowed hover:bg-[#EBEBEF]"
                        : "hover:bg-[#EBEBEF] text-[#44474e]"
                        }`}
                    title="Previous page"
                >
                    <ChevronLeft className="w-5 h-5" />
                </button>

                <button
                    onClick={handleNext}
                    disabled={page === totalPages}
                    className={`flex items-center justify-center w-9 h-9 rounded-full transition cursor-pointer ${page === totalPages
                        ? "opacity-50 cursor-not-allowed hover:bg-[#EBEBEF]"
                        : "hover:bg-[#EBEBEF] text-[#44474e]"
                        }`}
                    title="Next page"
                >
                    <ChevronRight className="w-5 h-5" />
                </button>
            </div>
        </div>
    );
};

