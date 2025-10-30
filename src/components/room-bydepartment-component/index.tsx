'use client';

import { CirclePlus, Download, Home, RotateCw, Trash2, Edit, Phone } from 'lucide-react';
import React, { useEffect, useState, useRef } from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import Link from 'next/link';

interface RoomAllotment {
  id: number;
  roomNo: string;
  patientName: string;
  roomType: string;
  bedNo: string;
  admissionDate: string;
  gender: "Male" | "Female";
  mobile: string;
  doctorAssigned: string;
  status: "Available" | "Occupied" | "Reserved" | "Maintenance" | "Discharged";
  amountCharged: number;
}

export default function RoomByDepartmentComponent() {
  const [detailDropdown, setDetailDropdown] = useState(false);
  const detailref = useRef<HTMLDivElement | null>(null);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [roomAllotments, setRoomAllotments] = useState<RoomAllotment[]>([]);
  const [animate, setAnimate] = useState(false);
  const [loading, setLoading] = useState(true);

  // Static data matching the design
  const staticRoomData: RoomAllotment[] = [
    {
      id: 1,
      roomNo: "101",
      patientName: "John Doe",
      roomType: "Delux",
      bedNo: "1",
      admissionDate: "02/25/2024",
      gender: "Male",
      mobile: "1234567890",
      doctorAssigned: "Dr. Jane Smith",
      status: "Discharged",
      amountCharged: 15000
    },
    {
      id: 2,
      roomNo: "102",
      patientName: "Alice Johnson",
      roomType: "Standard",
      bedNo: "5",
      admissionDate: "03/01/2024",
      gender: "Female",
      mobile: "2345678901",
      doctorAssigned: "Dr. Mark Wilson",
      status: "Reserved",
      amountCharged: 8000
    },
    {
      id: 3,
      roomNo: "103",
      patientName: "Robert Brown",
      roomType: "Delux",
      bedNo: "7",
      admissionDate: "03/10/2024",
      gender: "Male",
      mobile: "3456789012",
      doctorAssigned: "Dr. Emily Davis",
      status: "Available",
      amountCharged: 20000
    },
    {
      id: 4,
      roomNo: "104",
      patientName: "Emily Davis",
      roomType: "Standard",
      bedNo: "5",
      admissionDate: "03/20/2024",
      gender: "Female",
      mobile: "4567890123",
      doctorAssigned: "Dr. James Miller",
      status: "Maintenance",
      amountCharged: 9000
    },
    {
      id: 5,
      roomNo: "105",
      patientName: "Michael Garcia",
      roomType: "Delux",
      bedNo: "6",
      admissionDate: "03/25/2024",
      gender: "Male",
      mobile: "5678901234",
      doctorAssigned: "Dr. Sarah Johnson",
      status: "Discharged",
      amountCharged: 25000
    },
    {
      id: 6,
      roomNo: "106",
      patientName: "Sophia Williams",
      roomType: "Standard",
      bedNo: "3",
      admissionDate: "04/01/2024",
      gender: "Female",
      mobile: "6789012345",
      doctorAssigned: "Dr. John Anderson",
      status: "Available",
      amountCharged: 12000
    }
  ];

  // Fetch data (using static data for now)
  const fetchRoomAllotments = async () => {
    setLoading(true);
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));
      setRoomAllotments(staticRoomData);
    } catch (error) {
      console.error("Failed to fetch room allotments:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRoomAllotments();
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
    fetchRoomAllotments().then(() => {
      setTimeout(() => setAnimate(false), 300);
    });
  };

  const handleDownloadXLSX = () => {
    const worksheet = XLSX.utils.json_to_sheet(
      roomAllotments.map((item) => ({
        "Room No": item.roomNo,
        "Patient Name": item.patientName,
        "Room Type": item.roomType,
        "Bed No": item.bedNo,
        "Admission Date": item.admissionDate,
        "Gender": item.gender,
        "Mobile": item.mobile,
        "Doctor Assigned": item.doctorAssigned,
        "Status": item.status,
        "Amount Charged": item.amountCharged,
      }))
    );

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Room Allotments");
    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(blob, "room-allotments.xlsx");
  };

  const removeData = () => {
    if (selectedIds.length === 0) {
      alert("Please select at least one room allotment to delete.");
      return;
    }
    if (window.confirm(`Delete ${selectedIds.length} room allotment(s)?`)) {
      setRoomAllotments(prev => prev.filter(p => !selectedIds.includes(p.id)));
      setSelectedIds([]);
    }
  };

  const handleCheckboxChange = (id: number) => {
    setSelectedIds(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const handleSelectAll = (checked: boolean) => {
    setSelectedIds(checked ? roomAllotments.map(p => p.id) : []);
  };

  useEffect(() => {
    const selectAllCheckbox = document.getElementById("selectAll") as HTMLInputElement;
    if (selectAllCheckbox) {
      selectAllCheckbox.indeterminate =
        selectedIds.length > 0 && selectedIds.length < roomAllotments.length;
    }
  }, [selectedIds, roomAllotments]);

  const checkboxItems = [
    { label: "Checkbox", checked: true },
    { label: "Room No", checked: true },
    { label: "Patient Name", checked: true },
    { label: "Room Type", checked: true },
    { label: "Bed No", checked: true },
    { label: "Admission Date", checked: true },
    { label: "Gender", checked: true },
    { label: "Mobile", checked: true },
    { label: "Doctor Assigned", checked: true },
    { label: "Status", checked: true },
    { label: "Amount Charged", checked: true },
    { label: "Actions", checked: true },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Available":
        return "bg-[#19875426] text-[#198754]";
      case "Occupied":
        return "bg-[#fd7e1426] text-[#fd7e14]";
      case "Reserved":
        return "bg-[#ffc10726] text-[#ffc107]";
      case "Maintenance":
        return "bg-[#6f42c126] text-[#6f42c1]";
      case "Discharged":
        return "bg-[#6c757d26] text-[#6c757d]";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleEditClick = (allotment: RoomAllotment) => {
    console.log("Edit room allotment:", allotment);
    // Add edit modal logic here if needed
  };

  const deleteSelectedAllotments = async (id: number) => {
    try {
      console.log("Deleting room allotment:", id);
      setRoomAllotments(prev => prev.filter(item => item.id !== id));
    } catch (error) {
      console.error("Error deleting room allotment:", error);
    }
  };

  return (
    <>
      <div className='px-4 sm:px-6 py-[20px] mt-0'>
        <div className="flex items-center justify-between relative top-[-5px]">
          <div className="flex items-center space-x-2">
            <h1 className="text-[20px] font-semibold">All Allotment</h1>
            <span className="text-[20px] font-bold">›</span>
            <Home size={18} />
            <span>›</span>
            <span className="text-sm">Room</span>
            <span>›</span>
            <span className="text-sm">All Allotment</span>
          </div>
        </div>

        <div className="h-auto mt-3">
          <div className="max-w-full">
            <div className="bg-[var(--tableHeaderBg)] rounded-t-xl shadow-md overflow-hidden">
              {/* Header */}
              <div className="pr-[15px] pl-[20px] py-[8px] border-b border-gray-200 flex items-center">
                <div className='flex items-center flex-[35%]'>
                  <h1 className="m-0 text-[17px] leading-[28px] pr-[10px] font-medium">Allotment List</h1>
                  <label className='relative'>
                    <input
                      type="text"
                      placeholder="Search"
                      className="w-[212px] h-[45px] rounded-[5px] border-0 bg-white text-[14px] font-medium px-[50px] py-2 focus:outline-none"
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

                  <Link href="/add-room-allotment">
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
                    <div className="p-8 text-center text-gray-500">Loading room allotments...</div>
                  ) : roomAllotments.length === 0 ? (
                    <div className="p-8 text-center text-gray-500">No room allotments found</div>
                  ) : (
                    <table className="min-w-full divide-y divide-gray-200">
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
                          <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Room No</th>
                          <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Patient Name</th>
                          <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Room Type</th>
                          <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Bed No</th>
                          <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Admission Date</th>
                          <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Gender</th>
                          <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Mobile</th>
                          <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Doctor Assigned</th>
                          <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Status</th>
                          <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Amount Charged</th>
                          <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Actions</th>
                        </tr>
                      </thead>

                      <tbody className={`bg-white divide-y divide-gray-200 transition-all duration-500 ${animate ? "animate-slideDown" : ""}`}>
                        {roomAllotments.map((item) => (
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
                                {item.roomNo}
                              </div>
                            </td>

                            <td className="px-4 py-3 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="h-[30px] w-[30px] rounded-full bg-gray-200 border-2 border-dashed border-gray-400" />
                                <div className="ml-4">
                                  <div className="text-sm font-medium text-gray-900">
                                    {item.patientName}
                                  </div>
                                </div>
                              </div>
                            </td>

                            <td className="px-4 py-3 text-sm whitespace-nowrap">
                              {item.roomType}
                            </td>

                            <td className="px-4 py-3 text-sm whitespace-nowrap">
                              {item.bedNo}
                            </td>

                            <td className="px-4 py-3 text-sm whitespace-nowrap">
                              {item.admissionDate}
                            </td>

                            <td className="px-4 py-3 whitespace-nowrap">
                              <span className={`px-[10px] py-[2px] inline-flex text-xs leading-5 font-semibold rounded-[6px] ${
                                item.gender === "Female" ? "bg-[#6f42c126] text-[#6f42c1]" : "bg-[#19875426] text-[#198754]"
                              }`}>
                                {item.gender}
                              </span>
                            </td>

                            <td className="px-4 py-3 text-sm whitespace-nowrap">
                              <div className="flex items-center">
                                <Phone className="w-4 h-4 mr-1 text-gray-500" />
                                {item.mobile}
                              </div>
                            </td>

                            <td className="px-4 py-3 text-sm whitespace-nowrap">
                              {item.doctorAssigned}
                            </td>

                            <td className="px-4 py-3 whitespace-nowrap">
                              <span className={`px-[10px] py-[2px] inline-flex text-xs leading-5 font-semibold rounded-[6px] ${getStatusColor(item.status)}`}>
                                {item.status}
                              </span>
                            </td>

                            <td className="px-4 py-3 text-sm whitespace-nowrap">
                              ₹{item.amountCharged.toLocaleString()}
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
                                  onClick={() => deleteSelectedAllotments(item.id)} 
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
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <Paginator totalItems={roomAllotments.length} />
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