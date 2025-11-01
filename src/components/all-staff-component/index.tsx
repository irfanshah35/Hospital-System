'use client';

import { CirclePlus, Download, Home, RotateCw, Trash2, Edit, Phone, Mail } from 'lucide-react';
import React, { useEffect, useState, useRef } from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface Staff {
  id: number;
  firstname: string;
  lastname: string;
  gender: "Male" | "Female" | "Other";
  dob: string;
  mobile: string;
  email: string;
  staffid: string;
  designation: string;
  department: string;
  created_at: string;
}

export default function AllStaffComponent() {
  const router = useRouter();
  const [detailDropdown, setDetailDropdown] = useState(false);
  const detailref = useRef<HTMLDivElement | null>(null);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [staffs, setStaffs] = useState<Staff[]>([]);
  const [animate, setAnimate] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchStaffs = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/staff");
      const data = await res.json();
      setStaffs(data);
    } catch (error) {
      console.error("Failed to fetch staff:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStaffs();
  }, []);

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
    fetchStaffs().then(() => {
      setTimeout(() => setAnimate(false), 300);
    });
  };

  const handleDownloadXLSX = () => {
    const worksheet = XLSX.utils.json_to_sheet(
      staffs.map((item) => ({
        "Staff ID": item.staffid,
        "Name": `${item.firstname} ${item.lastname}`,
        "Designation": item.designation,
        "Department": item.department,
        "Gender": item.gender,
        "Date of Birth": item.dob,
        "Mobile": item.mobile,
        "Email": item.email,
        "Join Date": item.created_at,
      }))
    );

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Staff");
    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(blob, "staff.xlsx");
  };

  const removeData = () => {
    if (selectedIds.length === 0) {
      alert("Please select at least one staff to delete.");
      return;
    }
    if (window.confirm(`Delete ${selectedIds.length} staff member(s)?`)) {
      setStaffs(prev => prev.filter(p => !selectedIds.includes(p.id)));
      setSelectedIds([]);
    }
  };

  const handleCheckboxChange = (id: number) => {
    setSelectedIds(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const handleSelectAll = (checked: boolean) => {
    setSelectedIds(checked ? staffs.map(p => p.id) : []);
  };

  useEffect(() => {
    const selectAllCheckbox = document.getElementById("selectAll") as HTMLInputElement;
    if (selectAllCheckbox) {
      selectAllCheckbox.indeterminate =
        selectedIds.length > 0 && selectedIds.length < staffs.length;
    }
  }, [selectedIds, staffs]);

  const checkboxItems = [
    { label: "Checkbox", checked: true },
    { label: "Name", checked: true },
    { label: "Staff ID", checked: true },
    { label: "Designation", checked: true },
    { label: "Department", checked: true },
    { label: "Gender", checked: true },
    { label: "Date of Birth", checked: true },
    { label: "Mobile", checked: true },
    { label: "Email", checked: true },
    { label: "Join Date", checked: true },
    { label: "Actions", checked: true },
  ];

  const deleteStaff = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this staff member?")) {
      try {
        const response = await fetch(`/api/staff/${id}`, {
          method: "DELETE",
        });
        
        if (response.ok) {
          setStaffs(prev => prev.filter(staff => staff.id !== id));
          setSelectedIds(prev => prev.filter(selectedId => selectedId !== id));
        } else {
          const result = await response.json();
          alert(`Failed to delete staff: ${result.error || "Unknown error"}`);
        }
      } catch (error) {
        console.error("Error deleting staff:", error);
        alert("An error occurred while deleting staff member");
      }
    }
  };

  const handleEditClick = (staff: Staff) => {
    router.push(`/admin/staff/edit-staff?id=${staff.id}`);
  };

  return (
    <>
      <div className='px-4 sm:px-6 py-[20px] mt-0'>
        {/* Breadcrumb */}
        <div className="flex items-center justify-between relative top-[-5px]">
          <div className="flex items-center space-x-2 flex-wrap text-sm md:text-base">
            <h1 className="text-base md:text-[20px] font-semibold">All Staff</h1>
            <span className="hidden sm:inline text-[20px] font-bold">›</span>
            <Home size={18} className="hidden sm:block" />
            <span className="hidden sm:inline">›</span>
            <span className="hidden sm:inline text-sm">Staffs</span>
            <span className="hidden sm:inline">›</span>
            <span className="hidden sm:inline text-sm">All Staff</span>
          </div>
        </div>

        <div className="h-auto mt-3">
          <div className="max-w-full">
            <div className="bg-[var(--tableHeaderBg)] rounded-t-xl shadow-md overflow-hidden">
              {/* Header */}
              <div className="pr-[15px] pl-[20px] py-[8px] border-b border-gray-200 flex items-center flex-wrap gap-2">
                <div className='flex items-center flex-1 min-w-[200px]'>
                  <h1 className="m-0 text-sm md:text-[17px] leading-[28px] pr-[10px] font-medium">Staff</h1>
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

                  <div ref={detailref} className='relative hidden md:block'>
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

                  <Link href="/add-staff">
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
                    <div className="p-8 text-center text-gray-500">Loading staff...</div>
                  ) : staffs.length === 0 ? (
                    <div className="p-8 text-center text-gray-500">No staff members found</div>
                  ) : (
                    <>
                      {/* Desktop Table */}
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
                            <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Staff ID</th>
                            <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Designation</th>
                            <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Department</th>
                            <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Gender</th>
                            <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Date of Birth</th>
                            <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Mobile</th>
                            <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Email</th>
                            <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Join Date</th>
                            <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Actions</th>
                          </tr>
                        </thead>

                        <tbody className={`bg-white divide-y divide-gray-200 transition-all duration-500 ${animate ? "animate-slideDown" : ""}`}>
                          {staffs.map((item) => (
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
                                <div className="flex items-center">
                                  <div className="h-[30px] w-[30px] rounded-full bg-gray-200 border-2 border-dashed border-gray-400" />
                                  <div className="ml-4 w-[110px] overflow-hidden text-ellipsis whitespace-nowrap">
                                    <div className="text-sm font-medium">
                                      {item.firstname} {item.lastname}
                                    </div>
                                  </div>
                                </div>
                              </td>

                              <td className="px-4 text-sm whitespace-nowrap">{item.staffid}</td>
                              <td className="px-4 text-sm whitespace-nowrap">{item.designation}</td>
                              <td className="px-4 text-sm whitespace-nowrap">{item.department}</td>

                              <td className="px-4 whitespace-nowrap">
                                <span className={`px-[10px] py-[2px] inline-flex text-xs leading-5 font-semibold rounded-[6px] ${
                                  item.gender === "Female" ? "bg-[#6f42c126] text-[#6f42c1]" : 
                                  item.gender === "Male" ? "bg-[#19875426] text-[#198754]" : 
                                  "bg-[#ffc10726] text-[#ffc107]"
                                }`}>
                                  {item.gender}
                                </span>
                              </td>

                              <td className="px-4 text-sm whitespace-nowrap">
                                {item.dob ? new Date(item.dob).toLocaleDateString() : "-"}
                              </td>

                              <td className="px-4 text-sm">
                                <div className="flex items-center">
                                  <Phone className="w-4 h-4 text-[#198754] mr-2" />
                                  <span>{item.mobile}</span>
                                </div>
                              </td>

                              <td className="px-4 text-sm">
                                <div className="flex items-center">
                                  <Mail className="w-4 h-4 text-red-500 mr-2" />
                                  <span>{item.email}</span>
                                </div>
                              </td>

                              <td className="px-4 text-sm whitespace-nowrap">
                                {item.created_at ? new Date(item.created_at).toLocaleDateString() : "-"}
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
                                    onClick={() => deleteStaff(item.id)} 
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

                      {/* Mobile Cards */}
                      <div className={`px-4 md:hidden shadow-sm bg-white transition-all duration-500 ${animate ? "animate-slideDown" : ""}`}>
                        {staffs.map((item) => (
                          <div key={item.id} className="border-b border-gray-200 py-4">
                            <div className="flex items-center justify-between mb-3">
                              <input
                                checked={selectedIds.includes(item.id)}
                                onChange={() => handleCheckboxChange(item.id)}
                                type="checkbox" 
                                className="w-4 h-4 text-blue-600 rounded" 
                              />
                            </div>
                            
                            <div className="space-y-2 text-sm">
                              <div className="flex items-center gap-3 pb-2 border-b border-gray-200">
                                <span className="font-semibold w-24">Name:</span>
                                <div className='flex items-center gap-2'>
                                  <div className="w-8 h-8 rounded-full bg-gray-200 border-2 border-dashed border-gray-400" />
                                  <span>{item.firstname} {item.lastname}</span>
                                </div>
                              </div>

                              <div className="flex items-center gap-3 pb-2 border-b border-gray-200">
                                <span className="font-semibold w-24">Staff ID:</span>
                                <span>{item.staffid}</span>
                              </div>

                              <div className="flex items-center gap-3 pb-2 border-b border-gray-200">
                                <span className="font-semibold w-24">Designation:</span>
                                <span>{item.designation}</span>
                              </div>

                              <div className="flex items-center gap-3 pb-2 border-b border-gray-200">
                                <span className="font-semibold w-24">Department:</span>
                                <span>{item.department}</span>
                              </div>

                              <div className="flex items-center gap-3 pb-2 border-b border-gray-200">
                                <span className="font-semibold w-24">Gender:</span>
                                <span className={`px-2 py-1 text-xs font-semibold rounded ${
                                  item.gender === "Female" ? "bg-[#6f42c126] text-[#6f42c1]" : 
                                  item.gender === "Male" ? "bg-[#19875426] text-[#198754]" : 
                                  "bg-[#ffc10726] text-[#ffc107]"
                                }`}>
                                  {item.gender}
                                </span>
                              </div>

                              <div className="flex items-center gap-3 pb-2 border-b border-gray-200">
                                <span className="font-semibold w-24">DOB:</span>
                                <span>{item.dob ? new Date(item.dob).toLocaleDateString() : "-"}</span>
                              </div>

                              <div className="flex items-center gap-3 pb-2 border-b border-gray-200">
                                <span className="font-semibold w-24">Mobile:</span>
                                <div className='flex items-center gap-1'>
                                  <Phone className="w-4 h-4 text-[#198754]" />
                                  <span>{item.mobile}</span>
                                </div>
                              </div>

                              <div className="flex items-center gap-3 pb-2 border-b border-gray-200">
                                <span className="font-semibold w-24">Email:</span>
                                <div className='flex items-center gap-1'>
                                  <Mail className="w-4 h-4 text-red-500" />
                                  <span className="truncate">{item.email}</span>
                                </div>
                              </div>

                              <div className="flex items-center gap-3 pb-2 border-b border-gray-200">
                                <span className="font-semibold w-24">Join Date:</span>
                                <span>{item.created_at ? new Date(item.created_at).toLocaleDateString() : "-"}</span>
                              </div>

                              <div className="flex items-center gap-3 pt-2">
                                <span className="font-semibold w-24">Actions:</span>
                                <div className="flex space-x-2">
                                  <button 
                                    onClick={() => handleEditClick(item)} 
                                    className="text-[#6777ef] hover:bg-[#E0E1E3] p-1 rounded-full"
                                  >
                                    <Edit className="w-5 h-5" />
                                  </button>
                                  <button 
                                    onClick={() => deleteStaff(item.id)} 
                                    className="text-[#ff5200] hover:bg-[#E0E1E3] p-1 rounded-full"
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
          <Paginator totalItems={staffs.length} />
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

function Paginator({ totalItems = 0 }: { totalItems: number }) {
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startItem = (page - 1) * itemsPerPage + 1;
  const endItem = Math.min(page * itemsPerPage, totalItems);

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between sm:justify-end gap-4 sm:gap-8 border-t border-gray-200 bg-white px-4 py-3 text-sm text-gray-700 rounded-b-xl shadow-sm">
      <div className="font-medium text-xs sm:text-sm">
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