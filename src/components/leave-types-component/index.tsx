'use client';

import { CirclePlus, Download, Home, RotateCw, Trash2, Edit } from 'lucide-react';
import React, { useState, useRef, useEffect } from "react";
import * as XLSX from "xlsx";

interface LeaveType {
  id: number;
  leaveName: string;
  leaveType: "Paid" | "Unpaid";
  leaveUnit: "Days" | "Hours";
  status: "Active" | "Deactive";
  duration: number;
  createdBy: string;
  notificationPeriod: string;
}

export default function LeaveTypesComponent() {
  const [detailDropdown, setDetailDropdown] = useState(false);
  const detailref = useRef<HTMLDivElement | null>(null);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [animate, setAnimate] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingLeaveType, setEditingLeaveType] = useState<LeaveType | null>(null);

  const [leaveTypes, setLeaveTypes] = useState<LeaveType[]>([
    {
      id: 1,
      leaveName: "Work From Home",
      leaveType: "Paid",
      leaveUnit: "Days",
      status: "Deactive",
      duration: 5,
      createdBy: "HR Department",
      notificationPeriod: "48 hours prior"
    },
    {
      id: 2,
      leaveName: "Casual Leave",
      leaveType: "Unpaid",
      leaveUnit: "Hours",
      status: "Active",
      duration: 8,
      createdBy: "HR Department",
      notificationPeriod: "24 hours prior"
    },
    {
      id: 3,
      leaveName: "Emergency Leave",
      leaveType: "Unpaid",
      leaveUnit: "Days",
      status: "Active",
      duration: 3,
      createdBy: "HR Department",
      notificationPeriod: "Immediate"
    },
    {
      id: 4,
      leaveName: "Family Leave",
      leaveType: "Unpaid",
      leaveUnit: "Hours",
      status: "Deactive",
      duration: 12,
      createdBy: "HR Department",
      notificationPeriod: "48 hours prior"
    },
    {
      id: 5,
      leaveName: "Sick Leave",
      leaveType: "Unpaid",
      leaveUnit: "Days",
      status: "Active",
      duration: 10,
      createdBy: "HR Department",
      notificationPeriod: "48 hours prior"
    },
    {
      id: 6,
      leaveName: "Casual Leave",
      leaveType: "Unpaid",
      leaveUnit: "Days",
      status: "Active",
      duration: 8,
      createdBy: "HR Department",
      notificationPeriod: "24 hours prior"
    },
    {
      id: 7,
      leaveName: "Maternity Leave",
      leaveType: "Paid",
      leaveUnit: "Days",
      status: "Deactive",
      duration: 90,
      createdBy: "HR Department",
      notificationPeriod: "1 month prior"
    }
  ]);

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
    setTimeout(() => setAnimate(false), 300);
  };

  const handleDownloadXLSX = () => {
    const worksheet = XLSX.utils.json_to_sheet(
      leaveTypes.map((item) => ({
        "Leave Name": item.leaveName,
        "Leave Type": item.leaveType,
        "Leave Unit": item.leaveUnit,
        "Status": item.status,
        "Duration (Days)": item.duration,
        "Created By": item.createdBy,
        "Notification Period": item.notificationPeriod,
      }))
    );

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Leave Types");
    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = "leave_types.xlsx";
    link.click();
    URL.revokeObjectURL(url);
  };

  const removeData = () => {
    if (selectedIds.length === 0) {
      alert("Please select at least one leave type to delete.");
      return;
    }
    if (window.confirm(`Delete ${selectedIds.length} leave type(s)?`)) {
      setLeaveTypes(prev => prev.filter(p => !selectedIds.includes(p.id)));
      setSelectedIds([]);
    }
  };

  const handleCheckboxChange = (id: number) => {
    setSelectedIds(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const handleSelectAll = (checked: boolean) => {
    setSelectedIds(checked ? leaveTypes.map(p => p.id) : []);
  };

  useEffect(() => {
    const selectAllCheckbox = document.getElementById("selectAll") as HTMLInputElement;
    if (selectAllCheckbox) {
      selectAllCheckbox.indeterminate =
        selectedIds.length > 0 && selectedIds.length < leaveTypes.length;
    }
  }, [selectedIds, leaveTypes]);

  const checkboxItems = [
    { label: "Checkbox", checked: true },
    { label: "Leave Name", checked: true },
    { label: "Leave Type", checked: true },
    { label: "Leave Unit", checked: true },
    { label: "Status", checked: true },
    { label: "Duration", checked: true },
    { label: "Created By", checked: true },
    { label: "Notification Period", checked: true },
    { label: "Actions", checked: true },
  ];

  const deleteLeaveType = (id: number) => {
    if (window.confirm("Are you sure you want to delete this leave type?")) {
      setLeaveTypes(prev => prev.filter(r => r.id !== id));
    }
  };

  const handleEditClick = (leaveType: LeaveType) => {
    setEditingLeaveType(leaveType);
    setIsEditModalOpen(true);
  };

  const handleUpdateLeaveType = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingLeaveType) {
      setLeaveTypes(prev =>
        prev.map(r => (r.id === editingLeaveType.id ? editingLeaveType : r))
      );
      setIsEditModalOpen(false);
      alert("Leave type updated successfully!");
    }
  };

  const getStatusColor = (status: string) => {
    return status === "Active" 
      ? "bg-[#19875426] text-[#198754]" 
      : "bg-[#ff990026] text-[#ff9900]";
  };

  return (
    <>
      <div className='px-4 sm:px-6 py-[20px] mt-0'>
        <div className="flex items-center justify-between relative top-[-5px]">
          <div className="flex items-center flex-wrap space-x-2">
            <h1 className="text-[20px] font-semibold">Leave Types</h1>
            <span className="text-[20px] font-bold">›</span>
            <Home size={18} />
            <span>›</span>
            <span className="text-sm">HR</span>
            <span>›</span>
            <span className="text-sm">Leave Types</span>
          </div>
        </div>

        <div className="h-auto mt-3">
          <div className="max-w-full">
            <div className="bg-[#d3dce6] rounded-t-xl shadow-md overflow-hidden">
              {/* Header */}
              <div className="pr-[15px] pl-[20px] py-[8px] border-b border-gray-200 flex max-[390px]:gap-2 items-center flex-wrap">
                <div className='flex items-center flex-[35%]'>
                  <h1 className="m-0 text-[17px] leading-[28px] pr-[10px] font-medium">Leave Types</h1>
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

                  <button className="flex justify-center items-center w-10 h-10 rounded-full text-[#4caf50] hover:bg-[#CED5E6] transition cursor-pointer" title="Add">
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
                  {leaveTypes.length === 0 ? (
                    <div className="p-8 text-center text-gray-500">No leave types found</div>
                  ) : (
                    <>
                      <table className="min-w-full divide-y divide-gray-200 hidden md:table">
                        <thead className="bg-white">
                          <tr>
                            <th scope="col" className="px-4 py-3 pl-[37px] text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                              <input
                                type="checkbox"
                                id="selectAll"
                                onChange={(e) => handleSelectAll(e.target.checked)}
                                className="h-[18px] w-[18px] rounded-[2px] border-[2px] border-[#1a1b1f]"
                              />
                            </th>
                            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Leave Name</th>
                            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Leave Type</th>
                            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Leave Unit</th>
                            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Status</th>
                            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Duration (Days)</th>
                            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Created By</th>
                            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Notification Period</th>
                            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Actions</th>
                          </tr>
                        </thead>

                        <tbody className={`bg-white divide-y divide-gray-200 transition-all duration-500 ${animate ? "animate-slideDown" : ""}`}>
                          {leaveTypes.map((item) => (
                            <tr key={item.id} className="transition-colors duration-150 hover:bg-gray-50">
                              <td className="px-4 py-3 pl-[37px]">
                                <input
                                  type="checkbox"
                                  checked={selectedIds.includes(item.id)}
                                  onChange={() => handleCheckboxChange(item.id)}
                                  className="h-[18px] w-[18px] rounded-[2px] border-[2px] border-[#1a1b1f]"
                                />
                              </td>

                              <td className="px-4 py-3 text-sm font-medium text-gray-900">{item.leaveName}</td>
                              <td className="px-4 py-3 text-sm text-gray-900">{item.leaveType}</td>
                              <td className="px-4 py-3 text-sm text-gray-900">{item.leaveUnit}</td>

                              <td className="px-4 py-3 whitespace-nowrap">
                                <span className={`px-[10px] py-[2px] inline-flex text-xs leading-5 font-semibold rounded-[6px] ${getStatusColor(item.status)}`}>
                                  {item.status}
                                </span>
                              </td>

                              <td className="px-4 py-3 text-sm text-gray-900 text-center">{item.duration}</td>
                              <td className="px-4 py-3 text-sm text-gray-900">{item.createdBy}</td>
                              <td className="px-4 py-3 text-sm text-gray-900">{item.notificationPeriod}</td>

                              <td className="px-4 py-3 text-sm font-medium">
                                <div className="flex space-x-2">
                                  <button onClick={() => handleEditClick(item)} className="text-[#6777ef] hover:bg-[#E0E1E3] p-1 rounded-full cursor-pointer" title="Edit">
                                    <Edit className="w-5 h-5" />
                                  </button>
                                  <button onClick={() => deleteLeaveType(item.id)} className="text-[#ff5200] hover:bg-[#E0E1E3] p-1 rounded-full cursor-pointer" title="Delete">
                                    <Trash2 className="w-5 h-5" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>

                      <div className={`px-4 md:hidden shadow-sm bg-white transition-all duration-500 ${animate ? "animate-slideDown" : ""}`}>
                        {leaveTypes.map((item) => (
                          <div key={item.id} className="border-b border-gray-200 py-4">
                            {/* Checkbox Row */}
                            <div className="flex items-center h-13 justify-start py-2 border-b border-[#dadada]">
                              <input
                                checked={selectedIds.includes(item.id)}
                                onChange={() => handleCheckboxChange(item.id)}
                                type="checkbox"
                                className="w-4 h-4 text-blue-600 rounded"
                              />
                            </div>

                            {/* Leave Type Info */}
                            <div className="text-sm text-gray-800">
                              {/* Leave Name */}
                              <div className="flex items-center h-13 space-x-3 border-b border-[#dadada] gap-4">
                                <span className="font-semibold w-40">Leave Name:</span>
                                <span className="ml-1 font-medium">{item.leaveName}</span>
                              </div>

                              {/* Leave Type */}
                              <div className="flex items-center h-13 space-x-3 border-b border-[#dadada] gap-4">
                                <span className="font-semibold w-40">Leave Type:</span>
                                <span className="ml-1">{item.leaveType}</span>
                              </div>

                              {/* Leave Unit */}
                              <div className="flex items-center h-13 space-x-3 border-b border-[#dadada] gap-4">
                                <span className="font-semibold w-40">Leave Unit:</span>
                                <span className="ml-1">{item.leaveUnit}</span>
                              </div>

                              {/* Status */}
                              <div className="flex items-center h-13 space-x-3 border-b border-[#dadada] gap-4">
                                <span className="font-semibold w-40">Status:</span>
                                <span className={`ml-1 py-1 px-2 rounded-[4px] text-xs font-semibold ${getStatusColor(item.status)}`}>
                                  {item.status}
                                </span>
                              </div>

                              {/* Duration */}
                              <div className="flex items-center h-13 space-x-3 border-b border-[#dadada] gap-4">
                                <span className="font-semibold w-40">Duration:</span>
                                <span className="ml-1">{item.duration} days</span>
                              </div>

                              {/* Created By */}
                              <div className="flex items-center h-13 space-x-3 border-b border-[#dadada] gap-4">
                                <span className="font-semibold w-40">Created By:</span>
                                <span className="ml-1">{item.createdBy}</span>
                              </div>

                              {/* Notification Period */}
                              <div className="flex items-center h-13 space-x-3 border-b border-[#dadada] gap-4">
                                <span className="font-semibold w-40">Notification:</span>
                                <span className="ml-1">{item.notificationPeriod}</span>
                              </div>

                              {/* Actions */}
                              <div className="flex items-center h-13 space-x-3 border-b border-[#dadada] gap-4">
                                <div className="flex space-x-2">
                                  <button
                                    onClick={() => handleEditClick(item)}
                                    className="text-[#6777ef] hover:bg-[#E0E1E3] p-1 rounded-full cursor-pointer"
                                  >
                                    <Edit className="w-5 h-5" />
                                  </button>
                                  <button
                                    onClick={() => deleteLeaveType(item.id)}
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
          <Paginator totalItems={leaveTypes.length} />
        </div>
      </div>

      {isEditModalOpen && editingLeaveType && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999]">
          <div className="bg-white rounded-lg shadow-lg w-[600px] max-w-[90%]">
            <div className="flex items-center justify-between border-b !border-gray-300 px-5 py-3">
              <h2 className="text-lg font-semibold">
                Edit Leave Type - {editingLeaveType.leaveName}
              </h2>
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="text-gray-600 hover:text-gray-900 text-xl font-bold"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleUpdateLeaveType} className="p-6 space-y-6 h-[500px] overflow-y-auto scrollbar-hide">
              <div className="grid grid-cols-2 gap-4">
                {/* Leave Name */}
                <div className="relative col-span-2">
                  <input
                    type="text"
                    id="leaveName"
                    value={editingLeaveType.leaveName}
                    onChange={(e) => setEditingLeaveType({ ...editingLeaveType, leaveName: e.target.value })}
                    placeholder=" "
                    required
                    className="peer w-full rounded-md border bg-white px-3 pt-5 pb-2 text-sm text-gray-800 focus:border-[#005CBB] focus:ring-2 focus:ring-[#005CBB] outline-none transition-all"
                  />
                  <label
                    htmlFor="leaveName"
                    className={`absolute left-3 px-[4px] bg-white transition-all duration-200 ${editingLeaveType.leaveName ? "-top-2 text-xs text-[#005CBB]" : "top-3 text-gray-500"} peer-focus:-top-2 peer-focus:text-xs peer-focus:text-[#005CBB]`}
                  >
                    Leave Name*
                  </label>
                </div>

                {/* Leave Type */}
                <div className="relative">
                  <select
                    id="leaveType"
                    value={editingLeaveType.leaveType}
                    onChange={(e) => setEditingLeaveType({ ...editingLeaveType, leaveType: e.target.value as "Paid" | "Unpaid" })}
                    className="peer w-full rounded-md border bg-white px-3 pt-5 pb-2 text-sm text-gray-800 focus:border-[#005CBB] focus:ring-2 focus:ring-[#005CBB] outline-none transition-all appearance-none"
                  >
                    <option value="Paid">Paid</option>
                    <option value="Unpaid">Unpaid</option>
                  </select>
                  <label
                    htmlFor="leaveType"
                    className="absolute left-3 px-[4px] bg-white -top-2 text-xs text-[#005CBB]"
                  >
                    Leave Type*
                  </label>
                </div>

                {/* Leave Unit */}
                <div className="relative">
                  <select
                    id="leaveUnit"
                    value={editingLeaveType.leaveUnit}
                    onChange={(e) => setEditingLeaveType({ ...editingLeaveType, leaveUnit: e.target.value as "Days" | "Hours" })}
                    className="peer w-full rounded-md border bg-white px-3 pt-5 pb-2 text-sm text-gray-800 focus:border-[#005CBB] focus:ring-2 focus:ring-[#005CBB] outline-none transition-all appearance-none"
                  >
                    <option value="Days">Days</option>
                    <option value="Hours">Hours</option>
                  </select>
                  <label
                    htmlFor="leaveUnit"
                    className="absolute left-3 px-[4px] bg-white -top-2 text-xs text-[#005CBB]"
                  >
                    Leave Unit*
                  </label>
                </div>

                {/* Status */}
                <div className="relative">
                  <select
                    id="status"
                    value={editingLeaveType.status}
                    onChange={(e) => setEditingLeaveType({ ...editingLeaveType, status: e.target.value as "Active" | "Deactive" })}
                    className="peer w-full rounded-md border bg-white px-3 pt-5 pb-2 text-sm text-gray-800 focus:border-[#005CBB] focus:ring-2 focus:ring-[#005CBB] outline-none transition-all appearance-none"
                  >
                    <option value="Active">Active</option>
                    <option value="Deactive">Deactive</option>
                  </select>
                  <label
                    htmlFor="status"
                    className="absolute left-3 px-[4px] bg-white -top-2 text-xs text-[#005CBB]"
                  >
                    Status*
                  </label>
                </div>

                {/* Duration */}
                <div className="relative">
                  <input
                    type="number"
                    id="duration"
                    value={editingLeaveType.duration}
                    onChange={(e) => setEditingLeaveType({ ...editingLeaveType, duration: parseInt(e.target.value) })}
                    placeholder=" "
                    required
                    className="peer w-full rounded-md border bg-white px-3 pt-5 pb-2 text-sm text-gray-800 focus:border-[#005CBB] focus:ring-2 focus:ring-[#005CBB] outline-none transition-all"
                  />
                  <label
                    htmlFor="duration"
                    className="absolute left-3 px-[4px] bg-white -top-2 text-xs text-[#005CBB]"
                  >
                    Duration*
                  </label>
                </div>

                {/* Created By */}
                <div className="relative col-span-2">
                  <input
                    type="text"
                    id="createdBy"
                    value={editingLeaveType.createdBy}
                    onChange={(e) => setEditingLeaveType({ ...editingLeaveType, createdBy: e.target.value })}
                    placeholder=" "
                    required
                    className="peer w-full rounded-md border bg-white px-3 pt-5 pb-2 text-sm text-gray-800 focus:border-[#005CBB] focus:ring-2 focus:ring-[#005CBB] outline-none transition-all"
                  />
                  <label
                    htmlFor="createdBy"
                    className={`absolute left-3 px-[4px] bg-white transition-all duration-200 ${editingLeaveType.createdBy ? "-top-2 text-xs text-[#005CBB]" : "top-3 text-gray-500"} peer-focus:-top-2 peer-focus:text-xs peer-focus:text-[#005CBB]`}
                  >
                    Created By*
                  </label>
                </div>

                {/* Notification Period */}
                <div className="relative col-span-2">
                  <input
                    type="text"
                    id="notificationPeriod"
                    value={editingLeaveType.notificationPeriod}
                    onChange={(e) => setEditingLeaveType({ ...editingLeaveType, notificationPeriod: e.target.value })}
                    placeholder=" "
                    required
                    className="peer w-full rounded-md border bg-white px-3 pt-5 pb-2 text-sm text-gray-800 focus:border-[#005CBB] focus:ring-2 focus:ring-[#005CBB] outline-none transition-all"
                  />
                  <label
                    htmlFor="notificationPeriod"
                    className={`absolute left-3 px-[4px] bg-white transition-all duration-200 ${editingLeaveType.notificationPeriod ? "-top-2 text-xs text-[#005CBB]" : "top-3 text-gray-500"} peer-focus:-top-2 peer-focus:text-xs peer-focus:text-[#005CBB]`}
                  >
                    Notification Period*
                  </label>
                </div>
              </div>

              {/* Submit */}
              <div className="flex gap-2 pt-3">
                <button
                  type="submit"
                  className="bg-[#005cbb] text-white px-6 py-2 rounded-full text-sm font-medium transition hover:bg-[#004a99]"
                >
                  Save Changes
                </button>
                <button
                  onClick={() => setIsEditModalOpen(false)}
                  type="button"
                  className="bg-[#ba1a1a] text-white px-6 py-2 rounded-full text-sm font-medium transition hover:bg-[#9a1515]"
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
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
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