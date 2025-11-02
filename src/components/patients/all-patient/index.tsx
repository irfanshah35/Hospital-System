'use client';

import { CirclePlus, Download, Home, RotateCw, Trash2, Edit, Clock, Phone, Mail } from 'lucide-react';
import React, { useEffect, useState, useRef } from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import Link from 'next/link';

interface Patient {
  id: number;
  firstName: string;
  lastName: string;
  gender: "Male" | "Female";
  dateOfBirth: string;
  mobile: string;
  email: string;
  assignedDoctor: string;
  admissionDate: string;
  bloodGroup: string;
  // Add more if needed
}

export default function AllPatient() {
  const [detailDropdown, setDetailDropdown] = useState(false);
  const detailref = useRef<HTMLDivElement | null>(null);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [patients, setPatients] = useState<any[]>([]);
  const [animate, setAnimate] = useState(false);
  const [loading, setLoading] = useState(true);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingPatient, setEditingPatient] = useState<any | null>(null);

  // Fetch data from API
  const fetchPatients = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/patients");
      const data = await res.json();
      setPatients(data);
      console.log(data,"dsa");
      

    } catch (error) {
      console.error("Failed to fetch patients:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPatients();
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
    fetchPatients().then(() => {
      setTimeout(() => setAnimate(false), 300);
    });
  };

  const handleDownloadXLSX = () => {
    const worksheet = XLSX.utils.json_to_sheet(
      patients.map((item) => ({
        Name: `${item.first_name} ${item.last_name}`,
        Doctor: item.assigned_doctor || "-",
        Gender: item.gender,
        Date: item.created_at || "-",
        Time: "-",
        Mobile: item.mobile,
        Email: item.email,
        "Appointment Status": "Confirmed",
        "Visit Type": "General",
      }))
    );

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Patients");
    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(blob, "patients.xlsx");
  };

  const removeData = () => {
    if (selectedIds.length === 0) {
      alert("Please select at least one patient to delete.");
      return;
    }
    if (window.confirm(`Delete ${selectedIds.length} patient(s)?`)) {
      setPatients(prev => prev.filter(p => !selectedIds.includes(p.id)));
      setSelectedIds([]);
    }
  };

  const handleCheckboxChange = (id: number) => {
    setSelectedIds(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const handleSelectAll = (checked: boolean) => {
    setSelectedIds(checked ? patients.map(p => p.id) : []);
  };

  useEffect(() => {
    console.log(patients);
    const selectAllCheckbox = document.getElementById("selectAll") as HTMLInputElement;
    if (selectAllCheckbox) {
      selectAllCheckbox.indeterminate =
        selectedIds.length > 0 && selectedIds.length < patients.length;
    }
  }, [selectedIds, patients]);

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

  const deleteSelectedPatients = async (id: any) => {
    try {
      const response = await fetch(`/api/patients/${id}`, {
        method: "DELETE",
      });
      const result = await response.json();
      console.log(" Patient deleted:", result);
    } catch (error) {
      console.error(" Error deleting patient:", error);
    }
  };


  const handleEditClick = (patient: any) => {
    setEditingPatient(patient);
    setIsEditModalOpen(true);
  };

  const handleUpdatePatient = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // 🧩 Map frontend snake_case -> backend camelCase
      const payload = {
        firstName: editingPatient.first_name,
        lastName: editingPatient.last_name,
        gender: editingPatient.gender,
        age: editingPatient.age,
        mobile: editingPatient.mobile,
        email: editingPatient.email,
        address: editingPatient.address,
        admissionDate: editingPatient.admission_date,
        assignedDoctor: editingPatient.assigned_doctor,
        // optional fields (only if exist)
        dischargeDate: editingPatient.discharge_date || null,
        status: editingPatient.status,
        treatment: editingPatient.treatment,
      };
      console.log("📌 Update Payload:", payload);

      const response = await fetch(`/api/patients/${editingPatient.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        alert("Patient updated successfully!");
        setIsEditModalOpen(false);
        fetchPatients(); // Refresh list after update
      } else {
        const err = await response.json();
        alert(` Update failed: ${err.error || "Unknown error"}`);
      }
    } catch (error) {
      console.error("Error updating patient:", error);
      alert("An unexpected error occurred.");
    }
  };



  return (
    <>
      <div className='px-4 sm:px-6 py-[20px] mt-0'>
        <div className="flex items-center justify-between relative top-[-5px]">
          <div className="flex items-center flex-wrap space-x-2">
            <h1 className="text-[20px] font-semibold">All Patient</h1>
            <span className="text-[20px] font-bold">›</span>
            <Home size={18} />
            <span>›</span>
            <span className="text-sm">Patients</span>
            <span>›</span>
            <span className="text-sm">All Patient</span>
          </div>
        </div>

        <div className="h-auto mt-3">
          <div className="max-w-full">
            <div className="bg-[var(--tableHeaderBg)] rounded-t-xl shadow-md overflow-hidden">
              {/* Header */}
              <div className="pr-[15px] pl-[20px] py-[8px] border-b border-gray-200 flex max-[390px]:gap-2 items-center flex-wrap">
                <div className='flex items-center flex-[35%]'>
                  <h1 className="m-0 text-[17px] leading-[28px] pr-[10px] font-medium">Patients</h1>
                  <label className='relative'>
                    <input
                      type="text"
                      placeholder="Search"
                      className="w-full max-w-[212px] h-[45px] rounded-[5px] border-0 bg-white text-[14px] font-medium px-[50px] py-2 focus:outline-none"
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

                  <Link href="/add-patient">
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
                    <div className="p-8 text-center text-gray-500">Loading patients...</div>
                  ) : patients.length === 0 ? (
                    <div className="p-8 text-center text-gray-500">No patients found</div>
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
                            <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Treatment</th>
                            <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Gender</th>
                            <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Mobile</th>
                            <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Admission Date</th>
                            <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Doctor Assigned</th>
                            <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Address</th>
                            <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Blood Group</th>
                            <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Discharge Date</th>
                            <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Status</th>
                            <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Actions</th>
                          </tr>
                        </thead>

                        <tbody className={`bg-white divide-y divide-gray-200 transition-all duration-500 ${animate ? "animate-slideDown" : ""}`}>
                          {patients.map((item) => (
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
                                      {item.first_name} {item.last_name}
                                    </div>
                                  </div>
                                </div>
                              </td>

                              <td className="px-4 text-sm whitespace-nowrap">Malaria</td>                              

                              <td className="px-4 whitespace-nowrap">
                                <span className={`px-[10px] py-[2px] inline-flex text-xs leading-5 font-semibold rounded-[6px] ${item.gender === "Female" ? "bg-[#6f42c126] text-[#6f42c1]" : "bg-[#19875426] text-[#198754]"
                                  }`}>
                                  {item.gender}
                                </span>
                              </td>

                              <td className="px-4 text-sm">
                                <div className="flex items-center">
                                  <Phone className="w-4 h-4 text-[#198754] mr-2" />
                                  <span>{item.mobile}</span>
                                </div>
                              </td>

                              <td className="px-4 text-sm">{new Date(item.admission_date).toLocaleDateString()}</td>

                              <td className="px-4 text-sm whitespace-nowrap">{item.assigned_doctor || "-"}</td>

                              <td className="px-4 text-sm">
                                <div className="flex items-center">
                                  <span>{item.address}</span>
                                </div>
                              </td>

                              

                              <td className="px-4 text-sm">
                                <div className="flex items-center">
                                  <span>{item.blood_group}</span>
                                </div>
                              </td>

                              <td className="px-4 whitespace-nowrap">
                                <span className="px-2 inline-flex text-sm leading-5 ">
                                   01/20/2024 
                                </span>
                              </td>

                              <td className="px-4 text-sm">Recovered</td>

                              <td className="px-4 text-sm font-medium">
                                <div className="flex space-x-2">
                                  <button onClick={() => handleEditClick(item)} className="text-[#6777ef] hover:bg-[#E0E1E3] p-1 rounded-full cursor-pointer">
                                    <Edit className="w-5 h-5" />
                                  </button>
                                  <button onClick={() => {
                                    deleteSelectedPatients(item.id);
                                  }} className="text-[#ff5200] hover:bg-[#E0E1E3] p-1 rounded-full cursor-pointer">
                                    <Trash2 className="w-5 h-5" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>

                      <div className={`px-6 md:hidden shadow-sm bg-white transition-all duration-500 ${animate ? "animate-slideDown" : ""}`}>

                        {patients.map((item) => (
                          <div className={``}>
                            <div className="flex items-center h-13 justify-start py-2 border-b border-[#dadada]">
                              <input
                                checked={selectedIds.includes(item.id)}
                                onChange={() => handleCheckboxChange(item.id)}
                                type="checkbox" className="w-4 h-4 text-blue-600 rounded" />
                            </div>
                            <div className="text-sm text-gray-800">
                              <div className=" flex items-center h-13 space-x-3 border-b border-[#dadada] gap-4">
                                <span className="font-semibold">Name:</span>{" "}
                                <div className='flex items-center'>
                                  <img src="https://via.placeholder.com/40" className="w-10 h-10 rounded-full object-cover"
                                  />
                                  <span className="ml-1">{item.first_name} {item.last_name}</span>
                                </div>
                              </div>
                              <div className=" flex items-center h-13 space-x-3 border-b border-[#dadada] gap-4">
                                <span className="font-semibold">Treatment:</span>{" "}
                                <div className='flex items-center'>
                                  <span className="ml-1">Malaria</span>
                                </div>
                              </div>
                              <div className=" flex items-center h-13 space-x-3 border-b border-[#dadada] gap-4">
                                <span className="font-semibold">Gender::</span>{" "}
                                <div className='flex items-center'>
                                  <span className={`ml-1 py-1 px-2 rounded-[4px] ${item.gender === "Female" ? "bg-[#6f42c126] text-[#6f42c1]" : "bg-[#19875426] text-[#198754]"
                                  }`}>{item.gender}</span>
                                </div>
                              </div>
                              <div className=" flex items-center h-13 space-x-3 border-b border-[#dadada] gap-4">
                                <span className="font-semibold">Phone</span>{" "}
                                <div className='flex items-center'>
                                  <Phone className="w-4 h-4 text-[#198754] mr-2" />
                                  <span>{item.mobile}</span>
                                </div>
                              </div>
                              <div className=" flex items-center h-13 space-x-3 border-b border-[#dadada] gap-4">
                                <span className="font-semibold">Admission Date::</span>{" "}
                                <div className='flex items-center'>
                                  <Phone className="w-5 h-5 text-gray-500" />
                                  <span className="ml-1">{new Date(item.created_at).toLocaleDateString()}</span>
                                </div>
                              </div>
                              <div className=" flex items-center h-13 space-x-3 border-b border-[#dadada] gap-4">
                                <span className="font-semibold">Doctor Assigned:</span>{" "}
                                <div className='flex items-center'>
                                  <span className="ml-1">{item.assigned_doctor}</span>
                                </div>
                              </div>
                              <div className=" flex items-center h-13 space-x-3 border-b border-[#dadada] gap-4">
                                <span className="font-semibold">Address:</span>{" "}
                                <div className='flex items-center'>
                                  <span className="ml-1">{item.address}</span>
                                </div>
                              </div>
                              <div className=" flex items-center h-13 space-x-3 border-b border-[#dadada] gap-4">
                                <span className="font-semibold">Blood Group:</span>{" "}
                                <div className='flex items-center'>
                                  <span className="ml-1">{item.blood_group}</span>
                                </div>
                              </div>
                              <div className=" flex items-center h-13 space-x-3 border-b border-[#dadada] gap-4">
                                <span className="font-semibold">Discharge Date:</span>{" "}
                                <div className='flex items-center'>
                                  <span className="ml-1">  01/20/2024 </span>
                                </div>
                              </div>
                              <div className=" flex items-center h-13 space-x-3 border-b border-[#dadada] gap-4">
                                <span className="font-semibold">Status:</span>{" "}
                                <div className='flex items-center'>
                                  <span className="ml-1">Recovered</span>
                                </div>
                              </div>
                              <div className=" flex items-center h-13 space-x-3 border-b border-[#dadada] gap-4">
                                <div className="flex space-x-2">
                                  <button onClick={() => handleEditClick(item)} className="text-[#6777ef] hover:bg-[#E0E1E3] p-1 rounded-full cursor-pointer">
                                    <Edit className="w-5 h-5" />
                                  </button>
                                  <button onClick={() => {
                                    deleteSelectedPatients(item.id);
                                  }} className="text-[#ff5200] hover:bg-[#E0E1E3] p-1 rounded-full cursor-pointer">
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
          <Paginator totalItems={patients.length} />
        </div>
      </div>

      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999]">
          <div className="bg-white rounded-lg shadow-lg w-[600px] max-w-[90%]">
            <div className="flex items-center justify-between border-b !border-gray-300 px-5 py-3">
              <div className="flex items-center space-x-3">
                <img
                  src="/default-avatar.png"
                  alt="Patient"
                  className="w-10 h-10 rounded-full border"
                />
                <h2 className="text-lg font-semibold">
                  Edit {editingPatient?.first_name} {editingPatient?.last_name}
                </h2>
              </div>
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="text-gray-600 hover:text-gray-900 text-xl font-bold"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleUpdatePatient} className="p-6 space-y-6 h-[450px] overflow-y-auto scrollbar-hide">
              <div className="grid grid-cols-2 gap-4">
                {/* Name */}
                <div className="relative">
                  <input
                    type="text"
                    id="first_name"
                    name='first_name'
                    value={`${editingPatient?.first_name || ""} ${editingPatient?.last_name || ""}`}
                    onChange={(e) => {
                      const [first, ...last] = e.target.value.split(" ");
                      setEditingPatient({ ...editingPatient, first_name: first, last_name: last.join(" ") });
                    }}
                    placeholder=" "
                    required
                    className={`peer w-full rounded-md border bg-white px-3 pt-5 pb-2 text-sm 
      text-gray-800 focus:border-[#005CBB] focus:ring-2 focus:ring-[#005CBB] outline-none transition-all`}
                  />
                  <label
                    htmlFor="name"
                    className={`absolute left-3 px-[4px] bg-white transition-all duration-200
      ${editingPatient?.first_name || editingPatient?.last_name ? "-top-2 text-xs text-[#005CBB]" : "top-3 text-gray-500"}
      peer-focus:-top-2 peer-focus:text-xs peer-focus:text-[#005CBB]`}
                  >
                    Name*
                  </label>
                </div>

                {/* Mobile */}
                <div className="relative">
                  <input
                    type="text"
                    id="mobile"
                    value={editingPatient?.mobile || ""}
                    onChange={(e) => setEditingPatient({ ...editingPatient, mobile: e.target.value })}
                    placeholder=" "
                    required
                    className={`peer w-full rounded-md border bg-white px-3 pt-5 pb-2 text-sm 
      text-gray-800 focus:border-[#005CBB] focus:ring-2 focus:ring-[#005CBB] outline-none transition-all`}
                  />
                  <label
                    htmlFor="mobile"
                    className={`absolute left-3 px-[4px] bg-white transition-all duration-200
      ${editingPatient?.mobile ? "-top-2 text-xs text-[#005CBB]" : "top-3 text-gray-500"}
      peer-focus:-top-2 peer-focus:text-xs peer-focus:text-[#005CBB]`}
                  >
                    Mobile*
                  </label>
                </div>
              </div>

              {/* Gender */}
              <div className="flex items-center gap-6">
                <span className="text-sm font-medium">Gender:</span>
                <label className="flex items-center gap-1 text-sm">
                  <input
                    type="radio"
                    name="gender"
                    checked={editingPatient?.gender === "Male"}
                    onChange={() => setEditingPatient({ ...editingPatient, gender: "Male" })}
                  />
                  Male
                </label>
                <label className="flex items-center gap-1 text-sm">
                  <input
                    type="radio"
                    name="gender"
                    checked={editingPatient?.gender === "Female"}
                    onChange={() => setEditingPatient({ ...editingPatient, gender: "Female" })}
                  />
                  Female
                </label>
              </div>

              {/* Treatment */}
              <div className="relative">
                <input
                  type="text"
                  id="treatment"
                  value={editingPatient?.treatment || ""}
                  onChange={(e) => setEditingPatient({ ...editingPatient, treatment: e.target.value })}
                  placeholder=" "
                  className={`peer w-full rounded-md border bg-white px-3 pt-5 pb-2 text-sm 
      text-gray-800 focus:border-[#005CBB] focus:ring-2 h-[80px] focus:ring-[#005CBB] outline-none transition-all`}
                />
                <label
                  htmlFor="treatment"
                  className={`absolute left-3 px-[4px] bg-white transition-all duration-200
      ${editingPatient?.treatment ? "-top-2 text-xs text-[#005CBB]" : "top-3 text-gray-500"}
      peer-focus:-top-2 peer-focus:text-xs peer-focus:text-[#005CBB]`}
                >
                  Treatment
                </label>
              </div>


              <div className="grid grid-cols-2 gap-4">
                {/* Age */}
                <div className="relative">
                  <input
                    type="number"
                    id="age"
                    value={editingPatient?.age || ""}
                    onChange={(e) => setEditingPatient({ ...editingPatient, age: e.target.value })}
                    placeholder=" "
                    className={`peer w-full rounded-md border bg-white px-3 pt-5 pb-2 text-sm 
      text-gray-800 focus:border-[#005CBB] focus:ring-2 focus:ring-[#005CBB] outline-none transition-all`}
                  />
                  <label
                    htmlFor="age"
                    className={`absolute left-3 px-[4px] bg-white transition-all duration-200
      ${editingPatient?.age ? "-top-2 text-xs text-[#005CBB]" : "top-3 text-gray-500"}
      peer-focus:-top-2 peer-focus:text-xs peer-focus:text-[#005CBB]`}
                  >
                    Age*
                  </label>
                </div>

                {/* Email */}
                <div className="relative">
                  <input
                    type="email"
                    id="email"
                    value={editingPatient?.email || ""}
                    onChange={(e) => setEditingPatient({ ...editingPatient, email: e.target.value })}
                    placeholder=" "
                    className={`peer w-full rounded-md border bg-white px-3 pt-5 pb-2 text-sm 
      text-gray-800 focus:border-[#005CBB] focus:ring-2 focus:ring-[#005CBB] outline-none transition-all`}
                  />
                  <label
                    htmlFor="email"
                    className={`absolute left-3 px-[4px] bg-white transition-all duration-200
      ${editingPatient?.email ? "-top-2 text-xs text-[#005CBB]" : "top-3 text-gray-500"}
      peer-focus:-top-2 peer-focus:text-xs peer-focus:text-[#005CBB]`}
                  >
                    Email*
                  </label>
                </div>

                {/* Admission Date */}
                <div className="relative">
                  <input
                    type="date"
                    id="admission_date"
                    value={editingPatient?.admission_date || ""}
                    onChange={(e) => setEditingPatient({ ...editingPatient, admission_date: e.target.value })}
                    placeholder=" "
                    className={`peer w-full rounded-md border bg-white px-3 pt-5 pb-2 text-sm 
      text-gray-800 focus:border-[#005CBB] focus:ring-2 focus:ring-[#005CBB] outline-none transition-all`}
                  />
                  <label
                    htmlFor="admission_date"
                    className={`absolute left-3 p-[4px] bg-white transition-all duration-200
      ${editingPatient?.admission_date ? "-top-2 text-xs text-[#005CBB]" : "top-3 text-gray-500"}
      peer-focus:-top-2 peer-focus:text-xs peer-focus:text-[#005CBB]`}
                  >
                    Admission Date*
                  </label>
                </div>

                {/* Discharge Date */}
                <div className="relative">
                  <input
                    type="date"
                    id="discharge_date"
                    value={editingPatient?.discharge_date || ""}
                    onChange={(e) => setEditingPatient({ ...editingPatient, discharge_date: e.target.value })}
                    placeholder=" "
                    className={`peer w-full rounded-md border bg-white px-3 pt-5 pb-2 text-sm 
      text-gray-800 focus:border-[#005CBB] focus:ring-2 focus:ring-[#005CBB] outline-none transition-all`}
                  />
                  <label
                    htmlFor="discharge_date"
                    className={`absolute left-3 p-[4px] bg-white transition-all duration-200
      ${editingPatient?.discharge_date ? "-top-2 text-xs text-[#005CBB]" : "top-3 text-gray-500"}
      peer-focus:-top-2 peer-focus:text-xs peer-focus:text-[#005CBB]`}
                  >
                    Discharge Date*
                  </label>
                </div>

                {/* Doctor Assigned */}
                <div className="relative">
                  <input
                    type="text"
                    id="doctor_assigned"
                    value={editingPatient?.assigned_doctor || ""}
                    onChange={(e) => setEditingPatient({ ...editingPatient, assigned_doctor: e.target.value })}
                    placeholder=" "
                    required
                    className="peer w-full rounded-md border bg-white px-3 pt-5 pb-2 text-sm text-gray-800 focus:border-[#005CBB] focus:ring-2 focus:ring-[#005CBB] outline-none transition-all"
                  />
                  <label
                    htmlFor="doctor_assigned"
                    className={`absolute left-3 px-[4px] bg-white transition-all duration-200
          ${editingPatient?.assigned_doctor ? "-top-2 text-xs text-[#005CBB]" : "top-3 text-gray-500"}
          peer-focus:-top-2 peer-focus:text-xs peer-focus:text-[#005CBB]"`}
                  >
                    Doctor Assigned*
                  </label>
                </div>

                {/* Status */}
                <div className="relative">
                  <select
                    id="status"
                    value={editingPatient?.status || ""}
                    onChange={(e) => setEditingPatient({ ...editingPatient, status: e.target.value })}
                    className="peer w-full rounded-md border bg-white px-3 pt-5 pb-2 text-sm text-gray-800 focus:border-[#005CBB] focus:ring-2 focus:ring-[#005CBB] outline-none transition-all appearance-none"
                  >
                    <option value="" disabled hidden></option>
                    <option value="Admitted">Admitted</option>
                    <option value="Under Treatment">Under Treatment</option>
                    <option value="Recovered">Recovered</option>
                    <option value="Discharged">Discharged</option>
                  </select>
                  <label
                    htmlFor="status"
                    className={`absolute left-3 px-[4px] bg-white transition-all duration-200
          ${editingPatient?.status ? "-top-2 text-xs text-[#005CBB]" : "top-3 text-gray-500"}
          peer-focus:-top-2 peer-focus:text-xs peer-focus:text-[#005CBB]"`}
                  >
                    Status*
                  </label>
                </div>
              </div>

              <div className="relative">
                <textarea
                  id="address"
                  rows={3}
                  value={editingPatient?.address || ""}
                  onChange={(e) => setEditingPatient({ ...editingPatient, address: e.target.value })}
                  placeholder=" "
                  className={`peer w-full rounded-md border bg-white px-3 pt-5 pb-2 text-sm resize-none
      text-gray-800 focus:border-[#005CBB] focus:ring-2 focus:ring-[#005CBB] outline-none transition-all`}
                ></textarea>
                <label
                  htmlFor="address"
                  className={`absolute left-3 px-[4px] bg-white transition-all duration-200
      ${editingPatient?.address ? "-top-2 text-xs text-[#005CBB]" : "top-3 text-gray-500"}
      peer-focus:-top-2 peer-focus:text-xs peer-focus:text-[#005CBB]`}
                >
                  Address
                </label>
              </div>

              {/* Submit */}
              <div className="flex gap-2 pt-3">
                <button
                  type="submit"
                  className="bg-[#005cbb] text-white px-6 py-2 rounded-full text-sm font-medium transition"
                >
                  Save
                </button>
                <button
                  onClick={() => setIsEditModalOpen(false)}
                  type="button"
                  className="bg-[#ba1a1a] text-white px-6 py-2 rounded-full text-sm font-medium  transition"
                >
                  cancel
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