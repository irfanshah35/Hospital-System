'use client';

import { CirclePlus, Download, Home, RotateCw, Trash2, Edit, Phone, MessageCircle, MapPin, User, Receipt, Calendar, PhoneCall, CircleUserRound } from 'lucide-react';
import React, { useEffect, useState, useRef } from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import Link from 'next/link';

interface DeathRecord {
  id: string;
  caseNumber: string;
  patientName: string;
  gender: "Male" | "Female" | "Other";
  deathDate: string;
  guardianName: string;
  mobile: string;
  address: string;
  notes: string;
}

export default function DeathRecordsComponent() {
  const [detailDropdown, setDetailDropdown] = useState(false);
  const detailref = useRef<HTMLDivElement | null>(null);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [deathRecords, setDeathRecords] = useState<DeathRecord[]>([]);
  const [animate, setAnimate] = useState(false);
  const [loading, setLoading] = useState(true);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRecord, setEditingRecord] = useState<DeathRecord | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);

  // Static death records data matching the design
  const staticDeathRecords: DeathRecord[] = [
    {
      id: "1",
      caseNumber: "3453",
      patientName: "Eva Willis",
      gender: "Female",
      deathDate: "2021-02-25",
      guardianName: "Laurel Max...",
      mobile: "1234567890",
      address: "76 E. Lo...",
      notes: "Heart Attack"
    },
    {
      id: "2",
      caseNumber: "3276",
      patientName: "Camille McK...",
      gender: "Female",
      deathDate: "2021-02-22",
      guardianName: "Terry Ball",
      mobile: "1234567891",
      address: "36 Addi...",
      notes: "Heart Attack"
    },
    {
      id: "3",
      caseNumber: "6823",
      patientName: "Ramona Fre...",
      gender: "Male",
      deathDate: "2021-02-12",
      guardianName: "Johnny Mack",
      mobile: "1234567892",
      address: "374 HiC...",
      notes: "Heart Attack"
    },
    {
      id: "4",
      caseNumber: "1563",
      patientName: "Serena Bond",
      gender: "Male",
      deathDate: "2021-02-15",
      guardianName: "Marvin Miller",
      mobile: "1234567893",
      address: "8108 Co...",
      notes: "Heart Attack"
    },
    {
      id: "5",
      caseNumber: "342",
      patientName: "Mia Howell",
      gender: "Female",
      deathDate: "2021-02-05",
      guardianName: "Woody Robi...",
      mobile: "1234567894",
      address: "43 St M...",
      notes: "Heart Attack"
    },
    {
      id: "6",
      caseNumber: "78",
      patientName: "Vania Jacks...",
      gender: "Male",
      deathDate: "2021-02-02",
      guardianName: "Baxter Burg...",
      mobile: "1234567895",
      address: "8642 Gr...",
      notes: "Heart Attack"
    }
  ];

  // Fetch data (using static data for now)
  const fetchDeathRecords = async () => {
    setLoading(true);
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));
      setDeathRecords(staticDeathRecords);
    } catch (error) {
      console.error("Failed to fetch death records:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDeathRecords();
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
    fetchDeathRecords().then(() => {
      setTimeout(() => setAnimate(false), 300);
    });
  };

  const handleDownloadXLSX = () => {
    const worksheet = XLSX.utils.json_to_sheet(
      deathRecords.map((item) => ({
        "Case Number": item.caseNumber,
        "Patient Name": item.patientName,
        "Gender": item.gender,
        "Death Date": item.deathDate,
        "Guardian Name": item.guardianName,
        "Mobile": item.mobile,
        "Address": item.address,
        "Notes": item.notes,
      }))
    );

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Death Records");
    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(blob, "death-records.xlsx");
  };

  const removeData = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this death record?")) {
      try {
        setDeathRecords(prev => prev.filter(p => p.id !== id));
        setSelectedIds(prev => prev.filter(selectedId => selectedId !== id));
      } catch (error) {
        console.error("Delete error:", error);
        alert("Error deleting death record");
      }
    }
  };

  const handleDeleteSelected = async () => {
    if (selectedIds.length === 0) {
      alert("Please select at least one death record to delete.");
      return;
    }
    if (window.confirm(`Delete ${selectedIds.length} death record(s)?`)) {
      try {
        setDeathRecords(prev => prev.filter(p => !selectedIds.includes(p.id)));
        setSelectedIds([]);
      } catch (error) {
        console.error("Delete error:", error);
        alert("Error deleting death records");
      }
    }
  };

  const handleAddClick = () => {
    setEditingRecord({
      id: '',
      caseNumber: '',
      patientName: '',
      gender: "Male",
      deathDate: new Date().toISOString().split('T')[0],
      guardianName: '',
      mobile: '',
      address: '',
      notes: ''
    });
    setIsEditMode(false);
    setIsModalOpen(true);
  };

  const handleEditClick = (record: DeathRecord) => {
    setEditingRecord(record);
    setIsEditMode(true);
    setIsModalOpen(true);
  };

  const handleModalSubmit = (formData: DeathRecord) => {
    if (isEditMode && editingRecord?.id) {
      // Edit existing record
      setDeathRecords(prev =>
        prev.map(record =>
          record.id === editingRecord.id ? { ...formData, id: editingRecord.id } : record
        )
      );
    } else {
      // Add new record
      const newRecord = {
        ...formData,
        id: Math.random().toString(36).substr(2, 9)
      };
      setDeathRecords(prev => [...prev, newRecord]);
    }
    setIsModalOpen(false);
    setEditingRecord(null);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditingRecord(null);
  };

  const handleCheckboxChange = (id: string) => {
    setSelectedIds(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const handleSelectAll = (checked: boolean) => {
    setSelectedIds(checked ? deathRecords.map(record => record.id) : []);
  };

  useEffect(() => {
    const selectAllCheckbox = document.getElementById("selectAll") as HTMLInputElement;
    if (selectAllCheckbox) {
      selectAllCheckbox.indeterminate =
        selectedIds.length > 0 && selectedIds.length < deathRecords.length;
    }
  }, [selectedIds, deathRecords]);

  const checkboxItems = [
    { label: "Checkbox", checked: true },
    { label: "Case Number", checked: true },
    { label: "Patient Name", checked: true },
    { label: "Gender", checked: true },
    { label: "Death Date", checked: true },
    { label: "Guardian Name", checked: true },
    { label: "Mobile", checked: true },
    { label: "Address", checked: true },
    { label: "Notes", checked: true },
    { label: "Actions", checked: true },
  ];

  return (
    <>
      <div className='px-4 sm:px-6 py-[20px] mt-0'>
        <div className="flex items-center justify-between relative top-[-5px]">
          <div className="flex items-center flex-wrap space-x-2">
            <h1 className="text-[20px] font-semibold">Death Records</h1>
            <span className="text-[20px] font-bold">›</span>
            <Home size={18} />
            <span>›</span>
            <span className="text-sm">Records</span>
            <span>›</span>
            <span className="text-sm">Death Records</span>
          </div>
        </div>

        <div className="h-auto mt-3">
          <div className="max-w-full">
            <div className="bg-[var(--tableHeaderBg)] rounded-t-xl shadow-md overflow-hidden">
              {/* Header */}
              <div className="pr-[15px] pl-[20px] py-[8px] border-b border-gray-200 flex max-[390px]:gap-2 items-center flex-wrap">
                <div className='flex items-center flex-[35%]'>
                  <h1 className="m-0 text-[17px] leading-[28px] pr-[10px] font-medium">Death Records</h1>
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
                      onClick={handleDeleteSelected}
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
                    title="Add New Death Record"
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
                    <div className="p-8 text-center text-gray-500">Loading death records...</div>
                  ) : deathRecords.length === 0 ? (
                    <div className="p-8 text-center text-gray-500">No death records found</div>
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
                            <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Case Number</th>
                            <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Patient Name</th>
                            <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Gender</th>
                            <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Death Date</th>
                            <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Guardian Name</th>
                            <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Mobile</th>
                            <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Address</th>
                            <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Notes</th>
                            <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Actions</th>
                          </tr>
                        </thead>

                        <tbody className={`bg-white divide-y divide-gray-200 transition-all duration-500 ${animate ? "animate-slideDown" : ""}`}>
                          {deathRecords.map((item) => (
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
                                  {item.caseNumber}
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

                              <td className="px-4 py-3 whitespace-nowrap">
                                <span className={`px-[10px] py-[2px] inline-flex text-xs leading-5 font-semibold rounded-[6px] ${item.gender === "Female" ? "bg-[#6f42c126] text-[#6f42c1]" : item.gender === "Male" ? "bg-[#19875426] text-[#198754]" : "bg-[#fd7e1426] text-[#fd7e14]"
                                  }`}>
                                  {item.gender}
                                </span>
                              </td>

                              <td className="px-4 py-3 text-sm whitespace-nowrap">
                                {item.deathDate}
                              </td>

                              <td className="px-4 py-3 text-sm whitespace-nowrap">
                                {item.guardianName}
                              </td>

                              <td className="px-4 py-3 text-sm whitespace-nowrap">
                                <div className="flex items-center">
                                  <Phone className="w-4 h-4 mr-1 text-gray-500" />
                                  {item.mobile}
                                </div>
                              </td>

                              <td className="px-4 py-3 text-sm whitespace-nowrap">
                                {item.address}
                              </td>

                              <td className="px-4 py-3 text-sm whitespace-nowrap">
                                {item.notes}
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
                                    onClick={() => removeData(item.id)}
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

                      {/* Mobile View */}
                      <div className={`px-6 md:hidden shadow-sm bg-white transition-all duration-500 ${animate ? "animate-slideDown" : ""}`}>
                        {deathRecords.map((item) => (
                          <div key={item.id} className="border-b border-gray-200 py-4">
                            <div className="flex items-center h-13 justify-start py-2 border-b border-[#dadada]">
                              <input
                                checked={selectedIds.includes(item.id)}
                                onChange={() => handleCheckboxChange(item.id)}
                                type="checkbox" className="w-4 h-4 text-blue-600 rounded" />
                            </div>
                            <div className="text-sm text-gray-800">
                              <div className="flex items-center h-13 space-x-3 border-b border-[#dadada] gap-4">
                                <span className="font-semibold">Case Number:</span>
                                <div className='flex items-center'>
                                  <Receipt className='w-5 h-5 text-blue-500' />
                                  <span className="ml-1">{item.caseNumber}</span>
                                </div>
                              </div>
                              <div className="flex items-center h-13 space-x-3 border-b border-[#dadada] gap-4">
                                <span className="font-semibold">Patient Name:</span>
                                <div className='flex items-center'>
                                  <User className='w-5 h-5 text-green-500' />
                                  <span className="ml-1">{item.patientName}</span>
                                </div>
                              </div>
                              <div className="flex items-center h-13 space-x-3 border-b border-[#dadada] gap-4">
                                <span className="font-semibold">Gender:</span>
                                <div className='flex items-center'>
                                  <span className={`px-2 py-1 rounded-full text-xs ${item.gender === "Female" ? "bg-pink-100 text-pink-800" : item.gender === "Male" ? "bg-blue-100 text-blue-800" : "bg-orange-100 text-orange-800"}`}>
                                    {item.gender}
                                  </span>
                                </div>
                              </div>
                              <div className="flex items-center h-13 space-x-3 border-b border-[#dadada] gap-4">
                                <span className="font-semibold">Death Date:</span>
                                <div className='flex items-center'>
                                  <Calendar className='w-5 h-5 text-purple-500' />
                                  <span className="ml-1">{item.deathDate}</span>
                                </div>
                              </div>
                              <div className="flex items-center h-13 space-x-3 border-b border-[#dadada] gap-4">
                                <span className="font-semibold">Guardian Name:</span>
                                <div className='flex items-center'>
                                  <User className='w-5 h-5 text-red-500' />
                                  <span className="ml-1">{item.guardianName}</span>
                                </div>
                              </div>
                              <div className="flex items-center h-13 space-x-3 border-b border-[#dadada] gap-4">
                                <span className="font-semibold">Mobile:</span>
                                <div className='flex items-center'>
                                  <Phone className='w-5 h-5 text-green-500' />
                                  <span className="ml-1">{item.mobile}</span>
                                </div>
                              </div>
                              <div className="flex items-center h-13 space-x-3 border-b border-[#dadada] gap-4">
                                <span className="font-semibold">Address:</span>
                                <div className='flex items-center'>
                                  <MapPin className='w-5 h-5 text-blue-500' />
                                  <span className="ml-1">{item.address}</span>
                                </div>
                              </div>
                              <div className="flex items-center h-13 space-x-3 border-b border-[#dadada] gap-4">
                                <span className="font-semibold">Notes:</span>
                                <div className='flex items-center'>
                                  <span className="ml-1">{item.notes}</span>
                                </div>
                              </div>
                              <div className="flex items-center h-13 space-x-3 border-b border-[#dadada] gap-4">
                                <div className="flex space-x-2">
                                  <button
                                    onClick={() => handleEditClick(item)}
                                    className="text-[#6777ef] hover:bg-[#E0E1E3] p-1 rounded-full cursor-pointer"
                                  >
                                    <Edit className="w-5 h-5" />
                                  </button>
                                  <button
                                    onClick={() => removeData(item.id)}
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
          <Paginator totalItems={deathRecords.length} />
        </div>
      </div>

      {/* Death Record Modal */}
      {isModalOpen && (
        <DeathRecordModal
          isOpen={isModalOpen}
          onClose={handleModalClose}
          onSubmit={handleModalSubmit}
          initialData={editingRecord}
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

// Modal Component
interface DeathRecordModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (formData: DeathRecord) => void;
  initialData?: DeathRecord | null;
  isEditMode?: boolean;
}

const DeathRecordModal: React.FC<DeathRecordModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  isEditMode = false
}) => {
  const [formData, setFormData] = useState<DeathRecord>({
    id: '',
    caseNumber: '',
    patientName: '',
    gender: "Male",
    deathDate: new Date().toISOString().split('T')[0],
    guardianName: '',
    mobile: '',
    address: '',
    notes: ''
  });

  const modalRef = useRef<HTMLDivElement>(null);

  const isFormValid =
    formData.caseNumber.trim() !== '' &&
    formData.patientName.trim() !== '' &&
    formData.deathDate.trim() !== '' &&
    formData.guardianName.trim() !== '';

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      // Reset form when adding new
      setFormData({
        id: '',
        caseNumber: '',
        patientName: '',
        gender: "Male",
        deathDate: new Date().toISOString().split('T')[0],
        guardianName: '',
        mobile: '',
        address: '',
        notes: ''
      });
    }
  }, [initialData, isOpen]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
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
      <div ref={modalRef} className="bg-white rounded-lg shadow-lg w-full max-w-[646.8px] mx-4 max-h-[80vh] overflow-hidden">
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
            <h2 className="font-semibold leading-[35px]">
              {isEditMode ? 'Edit Death Record' : 'New Death Record'}
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
        <div className="py-5 px-6 max-h-[65vh] overflow-y-auto scrollbar-hide">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Case No */}
              <FloatingInput
                label="Case No"
                name="caseNumber"
                value={formData.caseNumber}
                onChange={handleInputChange}
                icon={Receipt}
                required
              />

              {/* Patient Name */}
              <FloatingInput
                label="Patient Name"
                name="patientName"
                value={formData.patientName}
                onChange={handleInputChange}
                icon={User}
                required
              />
            </div>

            {/* Gender */}
            <div className="flex items-center gap-8">
              <label className="text-sm font-medium text-gray-700">Gender <span className="text-red-500">*</span></label>
              <div className="flex space-x-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="gender"
                    value="Male"
                    checked={formData.gender === "Male"}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-blue-600 accent-blue-600 focus:ring-blue-500 border-gray-300"
                  />
                  <span className="ml-2 text-sm text-gray-700">Male</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="gender"
                    value="Female"
                    checked={formData.gender === "Female"}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-blue-600 accent-blue-600 focus:ring-blue-500 border-gray-300"
                  />
                  <span className="ml-2 text-sm text-gray-700">Female</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="gender"
                    value="Other"
                    checked={formData.gender === "Other"}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-blue-600 accent-blue-600 focus:ring-blue-500 border-gray-300"
                  />
                  <span className="ml-2 text-sm text-gray-700">Other</span>
                </label>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Death Date */}
              <FloatingInput
                type="date"
                label="Death Date"
                name="deathDate"
                value={formData.deathDate}
                onChange={handleInputChange}
                required
              />

              {/* Guardian Name */}
              <FloatingInput
                label="Guardian Name"
                name="guardianName"
                value={formData.guardianName}
                onChange={handleInputChange}
                icon={CircleUserRound}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Mobile */}
              <FloatingInput
                label="Mobile"
                name="mobile"
                value={formData.mobile}
                onChange={handleInputChange}
                icon={Phone}
                type="tel"
              />

              {/* Empty column for alignment */}
              <div></div>
            </div>

            {/* Address */}
            <FloatingTextarea
              label="Address"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              icon={MapPin}
              rows={2}
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