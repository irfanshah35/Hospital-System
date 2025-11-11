'use client';

import { CirclePlus, Download, Home, RotateCw, Trash2, Edit } from 'lucide-react';
import React, { useEffect, useState, useRef } from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import Link from 'next/link';

interface Department {
  id: number;
  departmentno: number;
  departmentname: string;
  departmentdate: string;
  departmenthead: string;
  status: string;
  description: string;
}

export default function DepartmentListPage() {
  const [detailDropdown, setDetailDropdown] = useState(false);
  const detailref = useRef<HTMLDivElement | null>(null);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [animate, setAnimate] = useState(false);
  const [loading, setLoading] = useState(true);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingDepartment, setEditingDepartment] = useState<Department | null>(null);

  const fetchDepartments = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/departments");
      if (!res.ok) throw new Error("Failed to fetch departments");
      const data = await res.json();
      setDepartments(data);
      console.log("Departments data:", data);
    } catch (error) {
      console.error("Error fetching departments:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDepartments();
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
    fetchDepartments().then(() => {
      setTimeout(() => setAnimate(false), 300);
    });
  };

  const handleDownloadXLSX = () => {
    const worksheet = XLSX.utils.json_to_sheet(
      departments.map((item) => ({
        "Department No": item.departmentno,
        "Department Name": item.departmentname,
        "Description": item.description,
        "Date": item.departmentdate,
        "Department Head": item.departmenthead,
        "Status": item.status,
      }))
    );

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Departments");
    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(blob, "departments.xlsx");
  };

  const removeData = () => {
    if (selectedIds.length === 0) {
      alert("Please select at least one department to delete.");
      return;
    }
    if (window.confirm(`Delete ${selectedIds.length} department(s)?`)) {
      setDepartments(prev => prev.filter(d => !selectedIds.includes(d.id)));
      setSelectedIds([]);
    }
  };

  const handleCheckboxChange = (id: number) => {
    setSelectedIds(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const handleSelectAll = (checked: boolean) => {
    setSelectedIds(checked ? departments.map(d => d.id) : []);
  };

  useEffect(() => {
    console.log(departments);
    const selectAllCheckbox = document.getElementById("selectAll") as HTMLInputElement;
    if (selectAllCheckbox) {
      selectAllCheckbox.indeterminate =
        selectedIds.length > 0 && selectedIds.length < departments.length;
    }
  }, [selectedIds, departments]);

  const checkboxItems = [
    { label: "Department No", checked: true },
    { label: "Department Name", checked: true },
    { label: "Description", checked: true },
    { label: "Date", checked: true },
    { label: "Department Head", checked: true },
    { label: "Status", checked: true },
    { label: "Actions", checked: true },
  ];

  const deleteDepartment = async (id: number) => {
    try {
      const response = await fetch(`/api/departments/${id}`, {
        method: "DELETE",
      });
      const result = await response.json();
      console.log("Department deleted:", result);
      fetchDepartments();
    } catch (error) {
      console.error("Error deleting department:", error);
    }
  };

  const handleEditClick = (department: Department) => {
    setEditingDepartment(department);
    setIsEditModalOpen(true);
  };

  const handleUpdateDepartment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingDepartment) return;

    try {
      const payload = {
        departmentno: editingDepartment.departmentno,
        departmentname: editingDepartment.departmentname,
        departmentdate: editingDepartment.departmentdate,
        departmenthead: editingDepartment.departmenthead,
        status: editingDepartment.status,
        description: editingDepartment.description,
      };

      console.log("Update Payload:", payload);

      const response = await fetch(`/api/departments/${editingDepartment.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        alert("Department updated successfully!");
        setIsEditModalOpen(false);
        fetchDepartments();
      } else {
        const err = await response.json();
        alert(`Update failed: ${err.error || "Unknown error"}`);
      }
    } catch (error) {
      console.error("Error updating department:", error);
      alert("An unexpected error occurred.");
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB');
  };

  return (
    <>
      <div className='px-4 sm:px-6 py-[20px] mt-0'>
        <div className="flex items-center justify-between relative top-[-5px]">
          <div className="flex items-center flex-wrap space-x-2">
            <h1 className="text-[20px] font-semibold">Department List</h1>
            <span className="text-[20px] font-bold">›</span>
            <Home size={18} />
            <span>›</span>
            <span className="text-sm">Departments</span>
            <span>›</span>
            <span className="text-sm">Department List</span>
          </div>
        </div>

        <div className="h-auto mt-3">
          <div className="max-w-full">
            <div className="bg-[var(--tableHeaderBg)] rounded-t-xl shadow-md overflow-hidden">
              {/* Header */}
              <div className="pr-[15px] pl-[20px] py-[8px] border-b border-gray-200 flex max-[390px]:gap-2 items-center flex-wrap">
                <div className='flex items-center flex-[35%]'>
                  <h1 className="m-0 text-[17px] leading-[28px] pr-[10px] font-medium">Departments</h1>
                  <label className='relative'>
                    <input
                      type="text"
                      placeholder="Search departments..."
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

                  <Link href="/add-department">
                    <button className="flex justify-center items-center w-10 h-10 rounded-full text-[#4caf50] hover:bg-[#CED5E6] transition cursor-pointer" title="Add Department">
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
                    <div className="p-8 text-center text-gray-500">Loading departments...</div>
                  ) : departments.length === 0 ? (
                    <div className="p-8 text-center text-gray-500">No departments found</div>
                  ) : (
                    <>
                      <table className="min-w-full divide-y divide-gray-200 hidden md:table">
                        <thead className="bg-white w-full">
                          <tr>
                            <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Department No</th>
                            <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Department Name</th>
                            <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Description</th>
                            <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Date</th>
                            <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Department Head</th>
                            <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Status</th>
                            <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Actions</th>
                          </tr>
                        </thead>

                        <tbody className={`bg-white divide-y divide-gray-200 transition-all duration-500 ${animate ? "animate-slideDown" : ""}`}>
                          {departments.map((item) => (
                            <tr key={item.departmentno} className="transition-colors duration-150">
                              <td className="px-4 text-sm whitespace-nowrap">{item.departmentno}</td>

                              <td className="px-4 py-3 whitespace-nowrap">
                                <div className="flex items-center">
                                  <div className="h-[30px] w-[30px] rounded-full bg-gray-200 border-2 border-dashed border-gray-400 flex items-center justify-center text-xs font-bold">
                                    {item.departmentname.charAt(0).toUpperCase()}
                                  </div>
                                  <div className="ml-4 w-[110px] overflow-hidden text-ellipsis whitespace-nowrap">
                                    <div className="text-sm font-medium">
                                      {item.departmentname}
                                    </div>
                                  </div>
                                </div>
                              </td>

                              <td className="px-4 whitespace-nowrap">
                                <span className="text-sm">
                                  {item.description || '-'}
                                </span>
                              </td>

                              <td className="px-4 text-sm">{formatDate(item.departmentdate)}</td>

                              <td className="px-4 text-sm">
                                <div className="flex items-center">
                                  {item.departmenthead}
                                </div>
                              </td>

                              <td className="px-4 text-sm">
                                <span className={`px-[10px] py-[2px] inline-flex text-xs leading-5 font-semibold rounded-[6px] ${
                                  item.status === 'Active' ? 'bg-green-100 text-green-800' :
                                  item.status === 'Inactive' ? 'bg-red-100 text-red-800' :
                                  'bg-yellow-100 text-yellow-800'
                                }`}>
                                  {item.status}
                                </span>
                              </td>

                              <td className="px-4 text-sm font-medium">
                                <div className="flex space-x-2">
                                  <button onClick={() => handleEditClick(item)} className="text-[#6777ef] hover:bg-[#E0E1E3] p-1 rounded-full cursor-pointer">
                                    <Edit className="w-5 h-5" />
                                  </button>
                                  <button onClick={() => deleteDepartment(item.id)} className="text-[#ff5200] hover:bg-[#E0E1E3] p-1 rounded-full cursor-pointer">
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
                        {departments.map((item) => (
                          <div key={item.id} className="border-b border-[#dadada] py-4">
                            <div className="text-sm text-gray-800 space-y-3">
                              <div className="flex items-center justify-between">
                                <span className="font-semibold">Department No:</span>
                                <span>{item.departmentno}</span>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="font-semibold">Department Name:</span>
                                <span>{item.departmentname}</span>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="font-semibold">Description:</span>
                                <span className="text-right">{item.description || '-'}</span>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="font-semibold">Date:</span>
                                <span>{formatDate(item.departmentdate)}</span>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="font-semibold">Department Head:</span>
                                <span>{item.departmenthead}</span>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="font-semibold">Status:</span>
                                <span className={`px-2 py-1 text-xs rounded ${
                                  item.status === 'Active' ? 'bg-green-100 text-green-800' :
                                  item.status === 'Inactive' ? 'bg-red-100 text-red-800' :
                                  'bg-yellow-100 text-yellow-800'
                                }`}>
                                  {item.status}
                                </span>
                              </div>
                              <div className="flex items-center justify-between pt-2">
                                <span className="font-semibold">Actions:</span>
                                <div className="flex space-x-2">
                                  <button onClick={() => handleEditClick(item)} className="text-[#6777ef] hover:bg-[#E0E1E3] p-1 rounded-full cursor-pointer">
                                    <Edit className="w-5 h-5" />
                                  </button>
                                  <button onClick={() => deleteDepartment(item.id)} className="text-[#ff5200] hover:bg-[#E0E1E3] p-1 rounded-full cursor-pointer">
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

      {/* Edit Department Modal */}
      {isEditModalOpen && editingDepartment && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999]">
          <div className="bg-white rounded-lg shadow-lg w-[600px] max-w-[90%] max-h-[90vh] overflow-hidden">
            <div className="flex items-center justify-between border-b !border-gray-300 px-5 py-3">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-blue-100 border-2 border-blue-300 flex items-center justify-center">
                  <span className="text-blue-600 font-bold text-sm">
                    {editingDepartment.departmentname.charAt(0).toUpperCase()}
                  </span>
                </div>
                <h2 className="text-lg font-semibold">
                  Edit {editingDepartment.departmentname}
                </h2>
              </div>
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="text-gray-600 hover:text-gray-900 text-xl font-bold"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleUpdateDepartment} className="p-6 space-y-6 max-h-[60vh] overflow-y-auto scrollbar-hide">
              <div className="grid grid-cols-2 gap-4">
                {/* Department No */}
                <div className="relative">
                  <input
                    type="number"
                    id="departmentno"
                    value={editingDepartment.departmentno}
                    onChange={(e) => setEditingDepartment({...editingDepartment, departmentno: parseInt(e.target.value)})}
                    placeholder=" "
                    required
                    className={`peer w-full rounded-md border bg-white px-3 pt-5 pb-2 text-sm 
                      text-gray-800 focus:border-[#005CBB] focus:ring-2 focus:ring-[#005CBB] outline-none transition-all`}
                  />
                  <label
                    htmlFor="departmentno"
                    className={`absolute left-3 px-[4px] bg-white transition-all duration-200
                      ${editingDepartment.departmentno ? "-top-2 text-xs text-[#005CBB]" : "top-3 text-gray-500"}
                      peer-focus:-top-2 peer-focus:text-xs peer-focus:text-[#005CBB]`}
                  >
                    Department No*
                  </label>
                </div>

                {/* Department Name */}
                <div className="relative">
                  <input
                    type="text"
                    id="departmentname"
                    value={editingDepartment.departmentname}
                    onChange={(e) => setEditingDepartment({...editingDepartment, departmentname: e.target.value})}
                    placeholder=" "
                    required
                    className={`peer w-full rounded-md border bg-white px-3 pt-5 pb-2 text-sm 
                      text-gray-800 focus:border-[#005CBB] focus:ring-2 focus:ring-[#005CBB] outline-none transition-all`}
                  />
                  <label
                    htmlFor="departmentname"
                    className={`absolute left-3 px-[4px] bg-white transition-all duration-200
                      ${editingDepartment.departmentname ? "-top-2 text-xs text-[#005CBB]" : "top-3 text-gray-500"}
                      peer-focus:-top-2 peer-focus:text-xs peer-focus:text-[#005CBB]`}
                  >
                    Department Name*
                  </label>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {/* Department Date */}
                <div className="relative">
                  <input
                    type="date"
                    id="departmentdate"
                    value={editingDepartment.departmentdate}
                    onChange={(e) => setEditingDepartment({...editingDepartment, departmentdate: e.target.value})}
                    placeholder=" "
                    className={`peer w-full rounded-md border bg-white px-3 pt-5 pb-2 text-sm 
                      text-gray-800 focus:border-[#005CBB] focus:ring-2 focus:ring-[#005CBB] outline-none transition-all`}
                  />
                  <label
                    htmlFor="departmentdate"
                    className={`absolute left-3 p-[4px] bg-white transition-all duration-200
                      ${editingDepartment.departmentdate ? "-top-2 text-xs text-[#005CBB]" : "top-3 text-gray-500"}
                      peer-focus:-top-2 peer-focus:text-xs peer-focus:text-[#005CBB]`}
                  >
                    Department Date
                  </label>
                </div>

                {/* Department Head */}
                <div className="relative">
                  <input
                    type="text"
                    id="departmenthead"
                    value={editingDepartment.departmenthead}
                    onChange={(e) => setEditingDepartment({...editingDepartment, departmenthead: e.target.value})}
                    placeholder=" "
                    required
                    className={`peer w-full rounded-md border bg-white px-3 pt-5 pb-2 text-sm 
                      text-gray-800 focus:border-[#005CBB] focus:ring-2 focus:ring-[#005CBB] outline-none transition-all`}
                  />
                  <label
                    htmlFor="departmenthead"
                    className={`absolute left-3 px-[4px] bg-white transition-all duration-200
                      ${editingDepartment.departmenthead ? "-top-2 text-xs text-[#005CBB]" : "top-3 text-gray-500"}
                      peer-focus:-top-2 peer-focus:text-xs peer-focus:text-[#005CBB]`}
                  >
                    Department Head*
                  </label>
                </div>
              </div>

              {/* Status */}
              <div className="relative">
                <select
                  id="status"
                  value={editingDepartment.status}
                  onChange={(e) => setEditingDepartment({...editingDepartment, status: e.target.value})}
                  className="peer w-full rounded-md border bg-white px-3 pt-5 pb-2 text-sm text-gray-800 focus:border-[#005CBB] focus:ring-2 focus:ring-[#005CBB] outline-none transition-all appearance-none"
                >
                  <option value="" disabled hidden></option>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                  <option value="Pending">Pending</option>
                </select>
                <label
                  htmlFor="status"
                  className={`absolute left-3 px-[4px] bg-white transition-all duration-200
                    ${editingDepartment.status ? "-top-2 text-xs text-[#005CBB]" : "top-3 text-gray-500"}
                    peer-focus:-top-2 peer-focus:text-xs peer-focus:text-[#005CBB]`}
                >
                  Status*
                </label>
              </div>

              {/* Description */}
              <div className="relative">
                <textarea
                  id="description"
                  rows={3}
                  value={editingDepartment.description}
                  onChange={(e) => setEditingDepartment({...editingDepartment, description: e.target.value})}
                  placeholder=" "
                  className={`peer w-full rounded-md border bg-white px-3 pt-5 pb-2 text-sm resize-none
                    text-gray-800 focus:border-[#005CBB] focus:ring-2 focus:ring-[#005CBB] outline-none transition-all`}
                ></textarea>
                <label
                  htmlFor="description"
                  className={`absolute left-3 px-[4px] bg-white transition-all duration-200
                    ${editingDepartment.description ? "-top-2 text-xs text-[#005CBB]" : "top-3 text-gray-500"}
                    peer-focus:-top-2 peer-focus:text-xs peer-focus:text-[#005CBB]`}
                >
                  Description
                </label>
              </div>

              {/* Submit */}
              <div className="flex gap-2 pt-3">
                <button
                  type="submit"
                  className="bg-[#005cbb] text-white px-6 py-2 rounded-full text-sm font-medium transition hover:bg-[#004a9b]"
                >
                  Save
                </button>
                <button
                  onClick={() => setIsEditModalOpen(false)}
                  type="button"
                  className="bg-[#ba1a1a] text-white px-6 py-2 rounded-full text-sm font-medium transition hover:bg-[#a01515]"
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