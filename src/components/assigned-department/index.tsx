'use client';

import { CirclePlus, Download, Home, RotateCw, Trash2, Edit, Clock, Phone, Mail, Calendar, User, ChevronDown, Flag, Building, Award, BadgeCheck } from 'lucide-react';
import React, { useEffect, useState, useRef } from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import Link from 'next/link';

interface Doctor {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  department: string;
  specialization: string;
  profilephoto: string | null;
}

interface Department {
  id: number;
  departmentname: string;
  description: string;
}

interface DepartmentData {
  id?: number;
  doctorid: number;
  departmentid: number;
  specialty: string;
  assigneddate: string;
  shiftschedule: string;
  experiencelevel: string;
  currentassignmentstatus: string;
  doctors?: Doctor;
  departments?: Department;
}

export default function AssignedDepartment() {
  const [detailDropdown, setDetailDropdown] = useState(false);
  const detailref = useRef<HTMLDivElement | null>(null);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [departments, setDepartments] = useState<DepartmentData[]>([]);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [allDepartments, setAllDepartments] = useState<Department[]>([]);
  const [animate, setAnimate] = useState(false);
  const [loading, setLoading] = useState(true);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingDepartment, setEditingDepartment] = useState<DepartmentData | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);

  // Fetch data from APIs
  const fetchData = async () => {
    setLoading(true);
    try {
      // Fetch assigned departments
      const res = await fetch("/api/assigned-departments");
      if (!res.ok) throw new Error("Failed to fetch assigned departments");
      const data = await res.json();
      setDepartments(data);
      console.log('Fetched departments:', data);

      // Fetch doctors
      const doctorsRes = await fetch("/api/doctors");
      if (!doctorsRes.ok) throw new Error("Failed to fetch doctors");
      const doctorsData = await doctorsRes.json();
      setDoctors(doctorsData);

      // Fetch departments
      const deptRes = await fetch("/api/departments");
      if (!deptRes.ok) throw new Error("Failed to fetch departments");
      const deptData = await deptRes.json();
      setAllDepartments(deptData);

    } catch (error) {
      console.error("Failed to fetch data:", error);
      alert("Failed to load data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
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
    fetchData().then(() => {
      setTimeout(() => setAnimate(false), 300);
    });
  };

  const handleDownloadXLSX = () => {
    const worksheet = XLSX.utils.json_to_sheet(
      departments.map((item) => ({
        "Doctor Name": `${item.doctors?.firstname || ''} ${item.doctors?.lastname || ''}`,
        "Department": item.departments?.departmentname || '',
        "Specialty": item.specialty,
        "Shift Schedule": item.shiftschedule,
        "Experience Level": item.experiencelevel,
        "Assignment Status": item.currentassignmentstatus,
        "Assigned Date": item.assigneddate,
      }))
    );

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Departments");
    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(blob, "departments.xlsx");
  };

  const removeData = async () => {
    if (selectedIds.length === 0) {
      alert("Please select at least one department to delete.");
      return;
    }

    if (window.confirm(`Delete ${selectedIds.length} department(s)?`)) {
      try {
        // Delete multiple departments
        const deletePromises = selectedIds.map(id =>
          fetch(`/api/assigned-departments/${id}`, {
            method: "DELETE",
          })
        );

        await Promise.all(deletePromises);

        // Refresh the data
        await fetchData();
        setSelectedIds([]);
        alert("Departments deleted successfully!");
      } catch (error) {
        console.error("Error deleting departments:", error);
        alert("Failed to delete departments. Please try again.");
      }
    }
  };

  const deleteSelectedDepartment = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this department assignment?")) {
      try {
        const response = await fetch(`/api/assigned-departments/${id}`, {
          method: "DELETE",
        });

        if (response.ok) {
          // Remove from local state
          setDepartments(prev => prev.filter(dept => dept.id !== id));
          // Also remove from selected IDs if it's there
          setSelectedIds(prev => prev.filter(selectedId => selectedId !== id));
          alert("Department assignment deleted successfully!");
        } else {
          throw new Error("Failed to delete department");
        }
      } catch (error) {
        console.error("Error deleting department:", error);
        alert("Failed to delete department. Please try again.");
      }
    }
  };

  const handleCheckboxChange = (id: number) => {
    setSelectedIds(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const handleSelectAll = (checked: boolean) => {
    setSelectedIds(checked ? departments.map(dept => dept.id!) : []);
  };

  useEffect(() => {
    const selectAllCheckbox = document.getElementById("selectAll") as HTMLInputElement;
    if (selectAllCheckbox) {
      selectAllCheckbox.indeterminate =
        selectedIds.length > 0 && selectedIds.length < departments.length;
    }
  }, [selectedIds, departments]);

  const checkboxItems = [
    { label: "Checkbox", checked: true },
    { label: "Name", checked: true },
    { label: "Department", checked: true },
    { label: "Specialization", checked: true },
    { label: "Shift Schedule", checked: true },
    { label: "Experience Level", checked: true },
    { label: "Assignment Status", checked: true },
    { label: "Assigned Date", checked: true },
    { label: "Actions", checked: true },
  ];

  const handleAddClick = () => {
    setEditingDepartment({
      doctorid: 0,
      departmentid: 0,
      specialty: '',
      assigneddate: new Date().toISOString().split('T')[0],
      shiftschedule: '',
      experiencelevel: '',
      currentassignmentstatus: 'Active'
    });
    setIsEditMode(false);
    setIsModalOpen(true);
  };

  const handleEditClick = (department: DepartmentData) => {
    setEditingDepartment(department);
    setIsEditMode(true);
    setIsModalOpen(true);
  };

  const handleModalSubmit = async (formData: any) => {
    try {
      if (isEditMode && editingDepartment?.id) {
        // Edit existing department
        const response = await fetch(`/api/assigned-departments/${editingDepartment.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            doctorid: formData.doctorid,
            departmentid: formData.departmentid,
            specialty: formData.specialty,
            assigneddate: formData.assigneddate,
            shiftschedule: formData.shiftschedule,
            experiencelevel: formData.experiencelevel,
            currentassignmentstatus: formData.currentassignmentstatus
          })
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
        }

        const updatedDepartment = await response.json();
        setDepartments(prev =>
          prev.map(dept =>
            dept.id === editingDepartment.id ? updatedDepartment : dept
          )
        );
        console.log("Department updated successfully!");
      } else {
        // Add new department
        console.log('Sending data to API:', {
          doctorid: formData.doctorid,
          departmentid: formData.departmentid,
          specialty: formData.specialty,
          assigneddate: formData.assigneddate,
          shiftschedule: formData.shiftschedule,
          experiencelevel: formData.experiencelevel,
          currentassignmentstatus: formData.currentassignmentstatus
        });

        const response = await fetch("/api/assigned-departments", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            doctorid: formData.doctorid,
            departmentid: formData.departmentid,
            specialty: formData.specialty,
            assigneddate: formData.assigneddate,
            shiftschedule: formData.shiftschedule,
            experiencelevel: formData.experiencelevel,
            currentassignmentstatus: formData.currentassignmentstatus
          })
        });

        console.log('Response status:', response.status);

        if (!response.ok) {
          const errorText = await response.text();
          console.error('Error response:', errorText);
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const newDepartment = await response.json();
        console.log('Success response:', newDepartment);

        setDepartments(prev => [...prev, newDepartment]);
        console.log("Department assigned successfully!");
      }
      setIsModalOpen(false);
      setEditingDepartment(null);
      handleRefresh()
    } catch (error: any) {
      console.error("Error submitting department:", error);
      alert(`Error: ${error.message}`);
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditingDepartment(null);
  };

  return (
    <>
      <div className='px-4 sm:px-6 py-[20px] mt-0'>
        <div className="flex items-center justify-between relative top-[-5px]">
          <div className="flex items-center flex-wrap space-x-2">
            <h1 className="text-[20px] font-semibold">Assign Department</h1>
            <span className="text-[20px] font-bold">›</span>
            <Home size={18} />
            <span>›</span>
            <span className="text-sm">Doctors</span>
            <span>›</span>
            <span className="text-sm">Assign Department</span>
          </div>
        </div>

        <div className="h-auto mt-3">
          <div className="max-w-full">
            <div className="bg-[var(--tableHeaderBg)] rounded-t-xl shadow-md overflow-hidden">
              {/* Header */}
              <div className="pr-[15px] pl-[20px] py-[8px] border-b border-gray-200 flex max-[390px]:gap-2 items-center flex-wrap">
                <div className='flex items-center flex-[35%]'>
                  <h1 className="m-0 text-[17px] leading-[28px] pr-[10px] font-medium">Assign Department</h1>
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
                    title="Add New Department"
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
                    <div className="p-8 text-center text-gray-500">Loading departments...</div>
                  ) : departments.length === 0 ? (
                    <div className="p-8 text-center text-gray-500">No departments found</div>
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
                            <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Department</th>
                            <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Specialization</th>
                            <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Shift Schedule</th>
                            <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Experience Level</th>
                            <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Assignment Status</th>
                            <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Assigned Date</th>
                            <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Actions</th>
                          </tr>
                        </thead>

                        <tbody className={`bg-white divide-y divide-gray-200 transition-all duration-500 ${animate ? "animate-slideDown" : ""}`}>
                          {departments.map((item: DepartmentData) => (
                            <tr key={item.id} className="transition-colors duration-150">
                              <td className="px-4 py-3 pl-[37px]">
                                <input
                                  type="checkbox"
                                  checked={selectedIds.includes(item.id!)}
                                  onChange={() => handleCheckboxChange(item.id!)}
                                  className="h-[18px] w-[18px] rounded-[2px] border-[2px] border-[#1a1b1f]"
                                />
                              </td>

                              <td className="px-4 py-3 whitespace-nowrap">
                                <div className="flex items-center">
                                  <img className='h-[30px] w-[30px] rounded-full' src={item?.doctors?.profilephoto &&
                                    item.doctors.profilephoto !== "null" &&
                                    item.doctors.profilephoto !== "{}"
                                    ? item.doctors.profilephoto
                                    : "/default-avatar.png"
                                  } alt="" />
                                  <div className="ml-4 w-[110px] overflow-hidden text-ellipsis whitespace-nowrap">
                                    <div className="text-sm font-medium">
                                      {item.doctors?.firstname} {item.doctors?.lastname}
                                    </div>
                                  </div>
                                </div>
                              </td>

                              <td className="px-4 text-sm whitespace-nowrap">{item.departments?.departmentname}</td>

                              <td className="px-4 whitespace-nowrap">
                                <span className={`px-[10px] py-[2px] inline-flex text-xs leading-5 font-semibold rounded-[6px]`}>
                                  {item.specialty}
                                </span>
                              </td>
                              <td className="px-4 text-sm">
                                <div className="flex items-center">
                                  {item.shiftschedule}
                                </div>
                              </td>
                              <td className="px-4 text-sm">{item.experiencelevel}</td>
                              <td className="px-4 text-sm">
                                <div className={`flex items-center`}>
                                  {item.currentassignmentstatus}
                                </div>
                              </td>

                              <td className="px-4 text-sm">{item.assigneddate}</td>

                              <td className="px-4 text-sm font-medium">
                                <div className="flex space-x-2">
                                  <button onClick={() => handleEditClick(item)} className="text-[#6777ef] hover:bg-[#E0E1E3] p-1 rounded-full cursor-pointer">
                                    <Edit className="w-5 h-5" />
                                  </button>
                                  <button onClick={() => {
                                    deleteSelectedDepartment(item.id!);
                                  }} className="text-[#ff5200] hover:bg-[#E0E1E3] p-1 rounded-full cursor-pointer">
                                    <Trash2 className="w-5 h-5" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>

                      <div
                        className={`px-4 md:hidden shadow-sm bg-white transition-all duration-500 ${animate ? "animate-slideDown" : ""
                          }`}
                      >
                        {departments.map((item: DepartmentData) => (
                          <div key={item.id} className="border-b border-gray-200 py-4">
                            {/* Checkbox Row */}
                            <div className="flex items-center justify-between mb-3">
                              <input
                                checked={selectedIds.includes(item.id!)}
                                onChange={() => handleCheckboxChange(item.id!)}
                                type="checkbox"
                                className="w-4 h-4 text-blue-600 rounded"
                              />
                            </div>

                            {/* Department Info */}
                            <div className="space-y-2 text-sm text-gray-800">
                              {/* Name */}
                              <div className="flex items-center gap-3 pb-2 border-b border-gray-200">
                                <span className="font-semibold w-32">Name:</span>
                                <div className="flex items-center gap-2">
                                  <div className="w-8 h-8 rounded-full bg-gray-200 border-2 border-dashed border-gray-400"></div>
                                  <span>{item.doctors?.firstname} {item.doctors?.lastname}</span>
                                </div>
                              </div>

                              {/* Department */}
                              <div className="flex items-center gap-3 pb-2 border-b border-gray-200">
                                <span className="font-semibold w-32">Department:</span>
                                <span>{item.departments?.departmentname}</span>
                              </div>

                              {/* Specialization */}
                              <div className="flex items-center gap-3 pb-2 border-b border-gray-200">
                                <span className="font-semibold w-32">Specialization:</span>
                                <span>{item.specialty || "—"}</span>
                              </div>

                              {/* Experience Level */}
                              <div className="flex items-center gap-3 pb-2 border-b border-gray-200">
                                <span className="font-semibold w-32">Experience Level:</span>
                                <span>{item.experiencelevel}</span>
                              </div>

                              {/* Assignment Status */}
                              <div className="flex items-center gap-3 pb-2 border-b border-gray-200">
                                <span className="font-semibold w-32">Assignment Status:</span>
                                <div className="flex items-center gap-2">
                                  <Phone className="w-4 h-4 text-green-600" />
                                  <span>{item.currentassignmentstatus}</span>
                                </div>
                              </div>

                              {/* Assigned Date */}
                              <div className="flex items-center gap-3 pb-2 border-b border-gray-200">
                                <span className="font-semibold w-32">Assigned Date:</span>
                                <div className="flex items-center gap-2">
                                  <Calendar className="w-4 h-4 text-gray-500" />
                                  <span>{item.assigneddate}</span>
                                </div>
                              </div>

                              {/* Actions */}
                              <div className="flex items-center gap-3 pt-2">
                                <div className="flex space-x-2">
                                  <button
                                    onClick={() => handleEditClick(item)}
                                    className="text-[#6777ef] hover:bg-[#E0E1E3] p-1 rounded-full cursor-pointer"
                                  >
                                    <Edit className="w-5 h-5" />
                                  </button>
                                  <button
                                    onClick={() => deleteSelectedDepartment(item.id!)}
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
          <Paginator totalItems={departments.length} />
        </div>
      </div>

      {/* Department Modal */}
      {isModalOpen && (
        <NewDepartmentModal
          isOpen={isModalOpen}
          onClose={handleModalClose}
          onSubmit={handleModalSubmit}
          initialData={editingDepartment}
          isEditMode={isEditMode}
          doctors={doctors}
          allDepartments={allDepartments}
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

interface NewDepartmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (formData: any) => void;
  initialData?: DepartmentData | null;
  isEditMode?: boolean;
  doctors: Doctor[];
  allDepartments: Department[];
}

interface FormData {
  doctorid: number;
  departmentid: number;
  specialty: string;
  assigneddate: string;
  shiftschedule: string;
  experiencelevel: string;
  currentassignmentstatus: string;
}

type FormFieldName = keyof FormData;

const NewDepartmentModal: React.FC<NewDepartmentModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  isEditMode = false,
  doctors,
  allDepartments
}) => {
  const [formData, setFormData] = useState<FormData>({
    doctorid: 0,
    departmentid: 0,
    specialty: '',
    assigneddate: new Date().toISOString().split('T')[0],
    shiftschedule: '',
    experiencelevel: '',
    currentassignmentstatus: 'Active'
  });

  const [focusedFields, setFocusedFields] = useState<Record<FormFieldName, boolean>>({
    doctorid: false,
    departmentid: false,
    specialty: false,
    assigneddate: false,
    shiftschedule: false,
    experiencelevel: false,
    currentassignmentstatus: false
  });

  const modalRef = useRef<HTMLDivElement>(null);
  const isFormValid =
    formData.doctorid !== 0 &&
    formData.departmentid !== 0 &&
    (formData.assigneddate || '').trim() !== ''

  useEffect(() => {
    if (initialData) {
      setFormData({
        doctorid: initialData.doctorid || 0,
        departmentid: initialData.departmentid || 0,
        specialty: initialData.specialty || '',
        assigneddate: initialData.assigneddate || new Date().toISOString().split('T')[0],
        shiftschedule: initialData.shiftschedule || '',
        experiencelevel: initialData.experiencelevel || '',
        currentassignmentstatus: initialData.currentassignmentstatus || 'Active'
      });

      const newFocusedFields = { ...focusedFields };
      (Object.keys(initialData) as FormFieldName[]).forEach(key => {
        if (initialData[key as keyof DepartmentData]) {
          newFocusedFields[key as FormFieldName] = true;
        }
      });
      setFocusedFields(newFocusedFields);
    } else {
      // Reset form when adding new
      setFormData({
        doctorid: 0,
        departmentid: 0,
        specialty: '',
        assigneddate: new Date().toISOString().split('T')[0],
        shiftschedule: '',
        experiencelevel: '',
        currentassignmentstatus: 'Active'
      });
      setFocusedFields({
        doctorid: false,
        departmentid: false,
        specialty: false,
        assigneddate: false,
        shiftschedule: false,
        experiencelevel: false,
        currentassignmentstatus: false
      });
    }
  }, [initialData, isOpen]);

  const handleBlur = (fieldName: FormFieldName) => {
    setFocusedFields(prev => ({
      ...prev,
      [fieldName]: formData[fieldName] !== '' && formData[fieldName] !== 0
    }));
  };

  const handleFocus = (fieldName: FormFieldName) => {
    setFocusedFields(prev => ({
      ...prev,
      [fieldName]: true
    }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'doctorid' || name === 'departmentid' ? parseInt(value) || 0 : value
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
      <div ref={modalRef} className="bg-white rounded-lg shadow-lg w-full max-w-2xl mx-4">
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
            <h2 className="text-xl font-semibold">
              {isEditMode ? 'Edit Department' : 'New Department'}
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
        <div className="py-5 px-6 max-h-[394px] overflow-y-auto scrollbar-hide">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Doctor Name */}
              <div className="relative">
                <select
                  id="doctorid"
                  name="doctorid"
                  required
                  value={formData.doctorid}
                  onChange={handleInputChange}
                  onFocus={() => handleFocus("doctorid")}
                  onBlur={() => handleBlur("doctorid")}
                  className="peer w-full px-4 pt-6 pb-2 border border-gray-300 rounded-lg outline-none 
                            focus:border-blue-500 transition-all appearance-none bg-white"
                >
                  <option value="0" hidden></option>
                  {doctors.map((doctor: Doctor) => (
                    <option key={doctor.id} value={doctor.id}>
                      {doctor.firstname} {doctor.lastname}
                    </option>
                  ))}
                </select>
                <label
                  htmlFor="doctorid"
                  className={`absolute left-4 transition-all duration-200 bg-white px-1
                              ${focusedFields.doctorid || formData.doctorid !== 0
                      ? "-top-2 text-xs text-blue-600"
                      : "top-4 text-base text-gray-600"}`}
                >
                  Doctor Name<span className="text-red-500">*</span>
                </label>
                <div className="absolute right-3 top-4 text-gray-400">
                  <User />
                </div>
              </div>

              {/* Department */}
              <div className="relative">
                <select
                  id="departmentid"
                  name="departmentid"
                  required
                  value={formData.departmentid}
                  onChange={handleInputChange}
                  onFocus={() => handleFocus("departmentid")}
                  onBlur={() => handleBlur("departmentid")}
                  className="peer w-full px-4 pt-6 pb-2 border border-gray-300 rounded-lg outline-none 
                            focus:border-blue-500 transition-all appearance-none bg-white"
                >
                  <option value="0" hidden></option>
                  {allDepartments.map((dept: Department) => (
                    <option key={dept.id} value={dept.id}>
                      {dept.departmentname}
                    </option>
                  ))}
                </select>
                <label
                  htmlFor="departmentid"
                  className={`absolute left-4 transition-all duration-200 bg-white px-1
                              ${focusedFields.departmentid || formData.departmentid !== 0
                      ? "-top-2 text-xs text-blue-600"
                      : "top-4 text-base text-gray-600"}`}
                >
                  Department<span className="text-red-500">*</span>
                </label>
                <div className="absolute right-3 top-4 text-gray-400 pointer-events-none">
                  <Building />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Specialty */}
              <div className="relative">
                <input
                  type="text"
                  id="specialty"
                  name="specialty"
                  value={formData.specialty}
                  onChange={handleInputChange}
                  onFocus={() => handleFocus("specialty")}
                  onBlur={() => handleBlur("specialty")}
                  className="peer w-full px-4 pt-6 pb-2 border border-gray-300 rounded-lg outline-none 
                            focus:border-blue-500 transition-all placeholder-transparent"
                />
                <label
                  htmlFor="specialty"
                  className={`absolute left-4 transition-all duration-200 bg-white px-1
                              ${focusedFields.specialty || formData.specialty
                      ? "-top-2 text-xs text-blue-600"
                      : "top-4 text-base text-gray-600"}`}
                >
                  Specialty
                </label>
                <div className="absolute right-3 top-4 text-gray-400">
                  <Award />
                </div>
              </div>

              {/* Assigned Date */}
              <div className="relative">
                <input
                  type="date"
                  id="assigneddate"
                  name="assigneddate"
                  required
                  value={formData.assigneddate}
                  onChange={handleInputChange}
                  onFocus={() => handleFocus("assigneddate")}
                  onBlur={() => handleBlur("assigneddate")}
                  className="peer w-full px-4 pt-6 pb-2 border border-gray-300 rounded-lg outline-none 
                            focus:border-blue-500 transition-all"
                />
                <label
                  htmlFor="assigneddate"
                  className={`absolute left-4 transition-all duration-200 bg-white px-1
                              ${focusedFields.assigneddate || formData.assigneddate
                      ? "-top-2 text-xs text-blue-600"
                      : "top-4 text-base text-gray-600"}`}
                >
                  Assigned Date<span className="text-red-500">*</span>
                </label>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Shift Schedule */}
              <div className="relative">
                <input
                  type="text"
                  id="shiftschedule"
                  name="shiftschedule"
                  value={formData.shiftschedule}
                  onChange={handleInputChange}
                  onFocus={() => handleFocus("shiftschedule")}
                  onBlur={() => handleBlur("shiftschedule")}
                  className="peer w-full px-4 pt-6 pb-2 border border-gray-300 rounded-lg outline-none 
                            focus:border-blue-500 transition-all placeholder-transparent"
                />
                <label
                  htmlFor="shiftschedule"
                  className={`absolute left-4 transition-all duration-200 bg-white px-1
                              ${focusedFields.shiftschedule || formData.shiftschedule
                      ? "-top-2 text-xs text-blue-600"
                      : "top-4 text-base text-gray-600"}`}
                >
                  Shift Schedule
                </label>
                <div className="absolute right-3 top-4 text-gray-400">
                  <Clock />
                </div>
              </div>

              {/* Experience Level */}
              <div className="relative">
                <select
                  id="experiencelevel"
                  name="experiencelevel"
                  value={formData.experiencelevel}
                  onChange={handleInputChange}
                  onFocus={() => handleFocus("experiencelevel")}
                  onBlur={() => handleBlur("experiencelevel")}
                  className="peer w-full px-4 pt-6 pb-2 border border-gray-300 rounded-lg outline-none 
                            focus:border-blue-500 transition-all appearance-none bg-white"
                >
                  <option value=""></option>
                  <option value="junior">Junior</option>
                  <option value="mid-level">Mid-Level</option>
                  <option value="senior">Senior</option>
                  <option value="consultant">Consultant</option>
                  <option value="expert">Expert</option>
                </select>
                <label
                  htmlFor="experiencelevel"
                  className={`absolute left-4 transition-all duration-200 bg-white px-1
                              ${focusedFields.experiencelevel || formData.experiencelevel
                      ? "-top-2 text-xs text-blue-600"
                      : "top-4 text-base text-gray-600"}`}
                >
                  Experience Level
                </label>
                <div className="absolute right-3 top-4 text-gray-400 pointer-events-none">
                  <BadgeCheck />
                </div>
              </div>
            </div>

            {/* Current Assignment Status */}
            <div className="relative">
              <select
                id="currentassignmentstatus"
                name="currentassignmentstatus"
                value={formData.currentassignmentstatus}
                onChange={handleInputChange}
                onFocus={() => handleFocus("currentassignmentstatus")}
                onBlur={() => handleBlur("currentassignmentstatus")}
                className="peer w-full px-4 pt-6 pb-2 border border-gray-300 rounded-lg outline-none 
                          focus:border-blue-500 transition-all appearance-none bg-white"
              >
                <option value="Active">Active</option>
                <option value="Pending">Pending</option>
                <option value="Inactive">Inactive</option>
              </select>
              <label
                htmlFor="currentassignmentstatus"
                className={`absolute left-4 transition-all duration-200 bg-white px-1
                            ${focusedFields.currentassignmentstatus || formData.currentassignmentstatus
                    ? "-top-2 text-xs text-blue-600"
                    : "top-4 text-base text-gray-600"}`}
              >
                Current Assignment Status
              </label>
              <div className="absolute right-3 top-4 text-gray-400 pointer-events-none">
                <Flag />
              </div>
            </div>

            {/* Buttons */}
            <div className="flex space-x-3 pt-4">
              <button
                type="submit"
                disabled={!isFormValid}
                className={`px-4 py-2 rounded-full transition-colors ${isFormValid
                  ? "bg-blue-600 hover:bg-blue-700 text-white cursor-pointer"
                  : "bg-gray-300 text-[#44474e] cursor-not-allowed"
                  }`}>
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