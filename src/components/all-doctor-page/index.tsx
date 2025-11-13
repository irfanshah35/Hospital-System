'use client';

import { CirclePlus, Download, Home, RotateCw, Trash2, Edit } from 'lucide-react';
import React, { useEffect, useState, useRef } from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface Doctor {
  id: number;
  firstname: string;
  middlename: string;
  lastname: string;
  gender: string;
  dateofbirth: string;
  mobile: string;
  email: string;
  department: string;
  specialization: string;
  availabledays: string;
  experience: string;
  education: string;
  designation: string;
  licensenumber: string;
  employeeid: string;
  roomcabinnumber: string;
  starttime: string;
  endtime: string;
  profilephoto: string;
  // Add more fields as needed
}

export default function AllDoctorPage() {
  const [detailDropdown, setDetailDropdown] = useState(false);
  const detailref = useRef<HTMLDivElement | null>(null);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [animate, setAnimate] = useState(false);
  const [loading, setLoading] = useState(true);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingDoctor, setEditingDoctor] = useState<any | null>(null);


  const router = useRouter();

  const handleEdit = (doctor:any) => {
    router.push(`/admin/doctors/${doctor.id}`);
  };


  // Fetch data from API
  const fetchDoctors = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/doctors");
      const data = await res.json();
      setDoctors(data);
      console.log(data, "api data");
    } catch (error) {
      console.error("Failed to fetch doctors:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDoctors();
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
    fetchDoctors().then(() => {
      setTimeout(() => setAnimate(false), 300);
    });
  };

  const handleDownloadXLSX = () => {
    const worksheet = XLSX.utils.json_to_sheet(
      doctors.map((item) => ({
        Name: `Dr. ${item.firstname} ${item.lastname}`,
        Department: item.department || "-",
        Specialization: item.specialization || "-",
        Availability: item.availabledays || "-",
        Mobile: item.mobile || "-",
        Degree: item.education || "-",
        Experience: item.experience ? `${item.experience} years` : "-",
        "Consultation Fee": "-", // Not in API
        Email: item.email || "-",
        Rating: "-", // Not in API
        "Clinic Location": "-", // Not in API
      }))
    );

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Doctors");
    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(blob, "doctors.xlsx");
  };

  const removeData = () => {
    if (selectedIds.length === 0) {
      alert("Please select at least one doctor to delete.");
      return;
    }
    if (window.confirm(`Delete ${selectedIds.length} doctor(s)?`)) {
      setDoctors(prev => prev.filter(d => !selectedIds.includes(d.id)));
      setSelectedIds([]);
    }
  };

  const handleCheckboxChange = (id: number) => {
    setSelectedIds(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const handleSelectAll = (checked: boolean) => {
    setSelectedIds(checked ? doctors.map(d => d.id) : []);
  };

  useEffect(() => {
    console.log(doctors);
    const selectAllCheckbox = document.getElementById("selectAll") as HTMLInputElement;
    if (selectAllCheckbox) {
      selectAllCheckbox.indeterminate =
        selectedIds.length > 0 && selectedIds.length < doctors.length;
    }
  }, [selectedIds, doctors]);

  const checkboxItems = [
    { label: "Checkbox", checked: true },
    { label: "Name", checked: true },
    { label: "Department", checked: true },
    { label: "Specialization", checked: true },
    { label: "Availability", checked: true },
    { label: "Mobile", checked: true },
    { label: "Degree", checked: true },
    { label: "Experience (Years)", checked: true },
    { label: "Consultation Fee", checked: false },
    { label: "Email", checked: true },
    { label: "Rating", checked: false },
    { label: "Clinic Location", checked: false },
    { label: "Actions", checked: true },
  ];

  const deleteSelectedDoctors = async (id: any) => {
    try {
      const response = await fetch(`/api/doctors/${id}`, {
        method: "DELETE",
      });
      const result = await response.json();
      console.log("Doctor deleted:", result);
      fetchDoctors(); // Refresh list after delete
    } catch (error) {
      console.error("Error deleting doctor:", error);
    }
  };

  const handleEditClick = (doctor: any) => {
    setEditingDoctor(doctor);
    setIsEditModalOpen(true);
  };

  const handleUpdateDoctor = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = {
        firstname: editingDoctor.firstname,
        middlename: editingDoctor.middlename,
        lastname: editingDoctor.lastname,
        gender: editingDoctor.gender,
        dateofbirth: editingDoctor.dateofbirth,
        mobile: editingDoctor.mobile,
        email: editingDoctor.email,
        department: editingDoctor.department,
        specialization: editingDoctor.specialization,
        experience: editingDoctor.experience,
        education: editingDoctor.education,
        availabledays: editingDoctor.availabledays,
        designation: editingDoctor.designation,
        employeeid: editingDoctor.employeeid,
      };
      console.log("Update Doctor Payload:", payload);

      const response = await fetch(`/api/doctors/${editingDoctor.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        alert("Doctor updated successfully!");
        setIsEditModalOpen(false);
        fetchDoctors(); // Refresh list after update
      } else {
        const err = await response.json();
        alert(`Update failed: ${err.error || "Unknown error"}`);
      }
    } catch (error) {
      console.error("Error updating doctor:", error);
      alert("An unexpected error occurred.");
    }
  };

  // Format time from "HH:MM:SS" to "HH:MM"
  const formatTime = (timeString: string) => {
    if (!timeString) return "N/A";
    return timeString.substring(0, 5);
  };



  return (
    <>
      <div className='px-4 sm:px-6 py-[20px] mt-0'>
        <div className="flex items-center justify-between relative top-[-5px]">
          <div className="flex items-center space-x-2">
            <h1 className="text-[20px] font-semibold">All Doctors</h1>
            <span className="text-[20px] font-bold">›</span>
            <Home size={18} />
            <span>›</span>
            <span className="text-sm">Doctors</span>
            <span>›</span>
            <span className="text-sm">All Doctors</span>
          </div>
        </div>

        <div className="h-auto mt-3">
          <div className="max-w-full">
            <div className="bg-[var(--tableHeaderBg)] rounded-t-xl shadow-md overflow-hidden">
              {/* Header */}
              <div className="pr-[15px] pl-[20px] py-[8px] border-b border-gray-200 flex max-[390px]:gap-2 items-center flex-wrap">
                <div className='flex items-center flex-[35%]'>
                  <h1 className="m-0 text-[17px] leading-[28px] pr-[10px] font-medium">Doctors</h1>
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

                  <Link href="/admin/doctors/add-doctor">
                    <button className="flex justify-center items-center w-10 h-10 rounded-full text-[#4caf50] hover:bg-[#CED5E6] transition cursor-pointer" title="Add Doctor">
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
                    <div className="p-8 text-center text-gray-500">Loading doctors...</div>
                  ) : doctors.length === 0 ? (
                    <div className="p-8 text-center text-gray-500">No doctors found</div>
                  ) : (
                    <>
                      <table className="min-w-full divide-y divide-gray-200 hidden min-[601px]:table">
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
                            <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Name</th>
                            <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Department</th>
                            <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Specialization</th>
                            <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Availability</th>
                            <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Mobile</th>
                            <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Degree</th>
                            <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Experience (Years)</th>
                            <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Consultation Fee</th>
                            <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Email</th>
                            <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Rating</th>
                            <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Clinic Location</th>
                            <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Actions</th>
                          </tr>
                        </thead>

                        <tbody role='rowgroup' className={`bg-white divide-y divide-gray-200 transition-all duration-500 ${animate ? "animate-slideDown" : ""}`}>
                          {doctors.map((doctor) => (
                            <tr key={doctor.id} className="transition-colors duration-150">
                              <td className="px-4 py-3 pl-[37px]">
                                <input
                                  type="checkbox"
                                  checked={selectedIds.includes(doctor.id)}
                                  onChange={() => handleCheckboxChange(doctor.id)}
                                  className="h-[18px] w-[18px] rounded-[2px] border-[2px] border-[#1a1b1f]"
                                />
                              </td>

                              <td className="px-4 py-3 whitespace-nowrap">
                                <div className="flex items-center">
                                  {/* <div className="h-[30px] w-[30px] rounded-full bg-gray-200 border-2 border-dashed border-gray-400" /> */}
                                  <img className='h-[30px] w-[30px] rounded-full' src={doctor.profilephoto} alt="" />
                                  <div className="ml-4 w-[110px] overflow-hidden text-ellipsis whitespace-nowrap">
                                    <div className="text-sm font-medium">
                                      Dr. {doctor.firstname} {doctor.lastname}
                                    </div>
                                  </div>
                                </div>
                              </td>

                              <td className="px-4 text-sm whitespace-nowrap">{doctor.department || "N/A"}</td>

                              <td className="px-4 text-sm whitespace-nowrap">{doctor.specialization || "N/A"}</td>

                              <td className="px-4 text-sm whitespace-nowrap">
                                {doctor.availabledays || "N/A"}
                                {doctor.starttime && doctor.endtime && (
                                  <div className="text-xs text-gray-500">
                                    {formatTime(doctor.starttime)} - {formatTime(doctor.endtime)}
                                  </div>
                                )}
                              </td>

                              <td className="px-4 text-sm whitespace-nowrap">{doctor.mobile || "N/A"}</td>

                              <td className="px-4 text-sm whitespace-nowrap">{doctor.education || "N/A"}</td>

                              <td className="px-4 text-sm whitespace-nowrap">
                                {doctor.experience ? `${doctor.experience} years` : "N/A"}
                              </td>

                              <td className="px-4 text-sm whitespace-nowrap">-</td>

                              <td className="px-4 text-sm whitespace-nowrap">
                                <div className="flex items-center">
                                  {doctor.email || "N/A"}
                                </div>
                              </td>

                              <td className="px-4 text-sm whitespace-nowrap">-</td>

                              <td className="px-4 text-sm whitespace-nowrap">-</td>

                              <td className="px-4 text-sm font-medium">
                                <div className="flex space-x-2">
                                  <button onClick={()=> handleEdit(doctor)} className="text-[#6777ef] hover:bg-[#E0E1E3] p-1 rounded-full cursor-pointer">
                                    <Edit className="w-5 h-5" />
                                  </button>
                                  
                                  <button onClick={() => deleteSelectedDoctors(doctor.id)} className="text-[#ff5200] hover:bg-[#E0E1E3] p-1 rounded-full cursor-pointer">
                                    <Trash2 className="w-5 h-5" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>

                      {/* Mobile View */}
                      <div className={`px-6 min-[601px]:hidden shadow-sm bg-white transition-all duration-500 ${animate ? "animate-slideDown" : ""}`}>
                        {doctors.map((doctor, i) => (
                          <div key={i} className="border-b border-[#dadada] py-4">
                            <div className="flex items-center h-13 justify-start py-2">
                              <input
                                checked={selectedIds.includes(doctor.id)}
                                onChange={() => handleCheckboxChange(doctor.id)}
                                type="checkbox" className="w-4 h-4 text-blue-600 rounded" />
                            </div>
                            <div className="space-y-3 text-sm text-gray-800">
                              <div className="flex items-center h-13 space-x-3 border-b border-[#dadada] gap-4">
                                <span className="font-semibold">Name:</span>{" "}
                                <div className='flex items-center'>
                                  <div className="w-10 h-10 rounded-full bg-gray-200 border-2 border-dashed border-gray-400" />
                                  <span className="ml-2">Dr. {doctor.firstname} {doctor.lastname}</span>
                                </div>
                              </div>
                              <div className="flex items-center h-13 space-x-3 border-b border-[#dadada] gap-4">
                                <span className="font-semibold">Department:</span>{" "}
                                <span>{doctor.department || "N/A"}</span>
                              </div>
                              <div className="flex items-center h-13 space-x-3 border-b border-[#dadada] gap-4">
                                <span className="font-semibold">Specialization:</span>{" "}
                                <span>{doctor.specialization || "N/A"}</span>
                              </div>
                              <div className="flex items-center h-13 space-x-3 border-b border-[#dadada] gap-4">
                                <span className="font-semibold">Availability:</span>{" "}
                                <span>
                                  {doctor.availabledays || "N/A"}
                                  {doctor.starttime && doctor.endtime && (
                                    <div className="text-xs text-gray-500">
                                      {formatTime(doctor.starttime)} - {formatTime(doctor.endtime)}
                                    </div>
                                  )}
                                </span>
                              </div>
                              <div className="flex items-center h-13 space-x-3 border-b border-[#dadada] gap-4">
                                <span className="font-semibold">Mobile:</span>{" "}
                                <div className='flex items-center'>
                                  <span className="ml-1">{doctor.mobile || "N/A"}</span>
                                </div>
                              </div>
                              <div className="flex items-center h-13 space-x-3 border-b border-[#dadada] gap-4">
                                <span className="font-semibold">Degree:</span>{" "}
                                <span>{doctor.education || "N/A"}</span>
                              </div>
                              <div className="flex items-center h-13 space-x-3 border-b border-[#dadada] gap-4">
                                <span className="font-semibold">Experience:</span>{" "}
                                <span>{doctor.experience ? `${doctor.experience} years` : "N/A"}</span>
                              </div>
                              <div className="flex items-center h-13 space-x-3 border-b border-[#dadada] gap-4">
                                <span className="font-semibold">Consultation Fee:</span>{" "}
                                <span>-</span>
                              </div>
                              <div className="flex items-center h-13 space-x-3 border-b border-[#dadada] gap-4">
                                <span className="font-semibold">Email:</span>{" "}
                                <span>{doctor.email || "N/A"}</span>
                              </div>
                              <div className="flex items-center h-13 space-x-3 border-b border-[#dadada] gap-4">
                                <span className="font-semibold">Rating:</span>{" "}
                                <span>-</span>
                              </div>
                              <div className="flex items-center h-13 space-x-3 border-b border-[#dadada] gap-4">
                                <span className="font-semibold">Clinic Location:</span>{" "}
                                <span>-</span>
                              </div>
                              <div className="flex items-center h-13 space-x-3 border-b border-[#dadada] gap-4">
                                <div className="flex space-x-2">
                                  <button onClick={() => handleEditClick(doctor)} className="text-[#6777ef] hover:bg-[#E0E1E3] p-1 rounded-full cursor-pointer">
                                    <Edit className="w-5 h-5" />
                                  </button>
                                  <button onClick={() => deleteSelectedDoctors(doctor.id)} className="text-[#ff5200] hover:bg-[#E0E1E3] p-1 rounded-full cursor-pointer">
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
          <Paginator totalItems={doctors.length} />
        </div>
      </div>

      {/* Edit Modal for Doctors */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999]">
          <div className="bg-white rounded-lg shadow-lg w-[600px] max-w-[90%]">
            {/* Header */}
            <div className="flex items-center justify-between border-b !border-gray-300 px-5 py-3">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-gray-200 border-2 border-dashed border-gray-400 flex items-center justify-center text-gray-400">
                  <img className='w-10 h-10 rounded-full' src={editingDoctor.profilePhoto} alt="" />
                </div>
                <h2 className="text-lg font-semibold">
                  {editingDoctor?.firstname} {editingDoctor?.lastname}
                </h2>
              </div>
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="text-gray-600 hover:text-gray-900 text-xl font-bold"
              >
                ×
              </button>
            </div>

            {/* Form */}
            <form
              onSubmit={handleUpdateDoctor}
              className="p-6 space-y-6 max-h-[500px] overflow-y-auto scrollbar-hide"
            >
              <div className="grid grid-cols-2 gap-4">
                {[
                  { name: "firstname", type: "text", label: "First Name*" },
                  { name: "lastname", type: "text", label: "Last Name*" },
                  { name: "specialization", type: "text", label: "Specialization*" },
                  { name: "mobile", type: "text", label: "Mobile*" },
                  { name: "email", type: "email", label: "Email*" },
                  { name: "joiningdate", type: "date", label: "Joining Date*" },
                  { name: "experience", type: "number", label: "Experience (Years)*" },
                  { name: "consultationFee", type: "number", label: "Consultation Fee*" },
                  { name: "availability", type: "text", label: "Availability*" },
                  { name: "rating", type: "number", label: "Rating" },
                  { name: "clinicLocation", type: "text", label: "Clinic Location*" },
                ].map((field) => (
                  <div className="relative mb-6" key={field.name}>
                    <input
                      type={field.type}
                      value={editingDoctor?.[field.name as keyof typeof editingDoctor] || ""}
                      onChange={(e) =>
                        setEditingDoctor({
                          ...editingDoctor,
                          [field.name]: e.target.value,
                        })
                      }
                      placeholder={field.label}
                      className="peer w-full px-4 pt-6 pb-2 border border-gray-300 rounded-lg outline-none focus:border-blue-500 transition-all placeholder-transparent"
                    />
                    <label
                      className={`absolute left-4 transition-all duration-200 bg-white px-1 
      ${editingDoctor?.[field.name as keyof typeof editingDoctor] || false ? "-top-2 text-xs text-blue-600" : "top-4 text-base text-gray-600"} 
      peer-focus:-top-2 peer-focus:text-xs peer-focus:text-blue-600`}
                    >
                      {field.label}
                    </label>
                  </div>

                ))}

                {/* Department select */}
                <div className="relative mb-6">
                  <select
                    value={editingDoctor?.department || ""}
                    onChange={(e) =>
                      setEditingDoctor({ ...editingDoctor, department: e.target.value })
                    }
                    className="peer w-full px-4 pt-6 pb-2 border border-gray-300 rounded-lg outline-none focus:border-blue-500 transition-all bg-white"
                  >
                    <option value="" disabled>
                      Select Department
                    </option>
                    <option value="Urology">Urology</option>
                    <option value="Cardiology">Cardiology</option>
                    <option value="Neurology">Neurology</option>
                  </select>
                  <label
                    className={`absolute left-4 transition-all duration-200 bg-white px-1 ${editingDoctor?.department ? "-top-2 text-xs text-blue-600" : "top-4 text-base text-gray-600"
                      }`}
                  >
                    Department*
                  </label>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex gap-2 pt-3">
                <button
                  type="submit"
                  className="bg-[#005cbb] text-white px-6 py-2 rounded-full text-sm font-medium transition"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="bg-[#ba1a1a] text-white px-6 py-2 rounded-full text-sm font-medium transition"
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