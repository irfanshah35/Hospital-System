'use client';

import { CirclePlus, Download, Home, RotateCw, Trash2, Edit, Calendar, User } from 'lucide-react';
import React, { useState, useRef, useEffect } from "react";
import * as XLSX from "xlsx";

interface LeaveRequest {
  id: number;
  employeeName: string;
  leaveType: string;
  startDate: string;
  endDate: string;
  days: number;
  reason: string;
  status: "Pending" | "Approved" | "Rejected";
  appliedDate: string;
}

export default function LeaveRequestComponent() {
  const [detailDropdown, setDetailDropdown] = useState(false);
  const detailref = useRef<HTMLDivElement | null>(null);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [animate, setAnimate] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingRequest, setEditingRequest] = useState<LeaveRequest | null>(null);

  const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>([
    {
      id: 1,
      employeeName: "John Smith",
      leaveType: "Sick Leave",
      startDate: "2024-11-05",
      endDate: "2024-11-07",
      days: 3,
      reason: "Medical appointment and recovery",
      status: "Pending",
      appliedDate: "2024-11-01"
    },
    {
      id: 2,
      employeeName: "Sarah Johnson",
      leaveType: "Annual Leave",
      startDate: "2024-11-10",
      endDate: "2024-11-15",
      days: 6,
      reason: "Family vacation",
      status: "Approved",
      appliedDate: "2024-10-28"
    },
    {
      id: 3,
      employeeName: "Michael Brown",
      leaveType: "Casual Leave",
      startDate: "2024-11-08",
      endDate: "2024-11-08",
      days: 1,
      reason: "Personal work",
      status: "Rejected",
      appliedDate: "2024-11-03"
    },
    {
      id: 4,
      employeeName: "Emily Davis",
      leaveType: "Maternity Leave",
      startDate: "2024-12-01",
      endDate: "2025-02-28",
      days: 90,
      reason: "Maternity leave",
      status: "Approved",
      appliedDate: "2024-10-15"
    },
    {
      id: 5,
      employeeName: "David Wilson",
      leaveType: "Sick Leave",
      startDate: "2024-11-12",
      endDate: "2024-11-13",
      days: 2,
      reason: "Flu symptoms",
      status: "Pending",
      appliedDate: "2024-11-04"
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
      leaveRequests.map((item) => ({
        "Employee Name": item.employeeName,
        "Leave Type": item.leaveType,
        "Start Date": item.startDate,
        "End Date": item.endDate,
        "Days": item.days,
        "Reason": item.reason,
        "Status": item.status,
        "Applied Date": item.appliedDate,
      }))
    );

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Leave Requests");
    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = "leave_requests.xlsx";
    link.click();
    URL.revokeObjectURL(url);
  };

  const removeData = () => {
    if (selectedIds.length === 0) {
      alert("Please select at least one request to delete.");
      return;
    }
    if (window.confirm(`Delete ${selectedIds.length} request(s)?`)) {
      setLeaveRequests(prev => prev.filter(p => !selectedIds.includes(p.id)));
      setSelectedIds([]);
    }
  };

  const handleCheckboxChange = (id: number) => {
    setSelectedIds(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const handleSelectAll = (checked: boolean) => {
    setSelectedIds(checked ? leaveRequests.map(p => p.id) : []);
  };

  useEffect(() => {
    const selectAllCheckbox = document.getElementById("selectAll") as HTMLInputElement;
    if (selectAllCheckbox) {
      selectAllCheckbox.indeterminate =
        selectedIds.length > 0 && selectedIds.length < leaveRequests.length;
    }
  }, [selectedIds, leaveRequests]);

  const checkboxItems = [
    { label: "Checkbox", checked: true },
    { label: "Employee Name", checked: true },
    { label: "Leave Type", checked: true },
    { label: "Start Date", checked: true },
    { label: "End Date", checked: true },
    { label: "Days", checked: true },
    { label: "Reason", checked: true },
    { label: "Status", checked: true },
    { label: "Applied Date", checked: true },
    { label: "Actions", checked: true },
  ];

  const deleteRequest = (id: number) => {
    if (window.confirm("Are you sure you want to delete this request?")) {
      setLeaveRequests(prev => prev.filter(r => r.id !== id));
    }
  };

  const handleEditClick = (request: LeaveRequest) => {
    setEditingRequest(request);
    setIsEditModalOpen(true);
  };

  const handleUpdateRequest = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingRequest) {
      setLeaveRequests(prev =>
        prev.map(r => (r.id === editingRequest.id ? editingRequest : r))
      );
      setIsEditModalOpen(false);
      alert("Leave request updated successfully!");
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Approved":
        return "bg-[#19875426] text-[#198754]";
      case "Rejected":
        return "bg-[#dc354526] text-[#dc3545]";
      default:
        return "bg-[#ffc10726] text-[#ffc107]";
    }
  };

  return (
    <>
      <div className='px-4 sm:px-6 py-[20px] mt-0'>
        <div className="flex items-center justify-between relative top-[-5px]">
          <div className="flex items-center flex-wrap space-x-2">
            <h1 className="text-[20px] font-semibold">Leave Requests</h1>
            <span className="text-[20px] font-bold">›</span>
            <Home size={18} />
            <span>›</span>
            <span className="text-sm">HR</span>
            <span>›</span>
            <span className="text-sm">Leave Requests</span>
          </div>
        </div>

        <div className="h-auto mt-3">
          <div className="max-w-full">
            <div className="bg-[#f8f9fa] rounded-t-xl shadow-md overflow-hidden">
              {/* Header */}
              <div className="pr-[15px] pl-[20px] py-[8px] border-b border-gray-200 flex max-[390px]:gap-2 items-center flex-wrap">
                <div className='flex items-center flex-[35%]'>
                  <h1 className="m-0 text-[17px] leading-[28px] pr-[10px] font-medium">Leave Requests</h1>
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
                  {leaveRequests.length === 0 ? (
                    <div className="p-8 text-center text-gray-500">No leave requests found</div>
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
                            <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Employee Name</th>
                            <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Leave Type</th>
                            <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Start Date</th>
                            <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">End Date</th>
                            <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Days</th>
                            <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Reason</th>
                            <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Status</th>
                            <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Applied Date</th>
                            <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Actions</th>
                          </tr>
                        </thead>

                        <tbody className={`bg-white divide-y divide-gray-200 transition-all duration-500 ${animate ? "animate-slideDown" : ""}`}>
                          {leaveRequests.map((item) => (
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
                                  <div className="h-[30px] w-[30px] rounded-full bg-gray-200 border-2 border-dashed border-gray-400 flex items-center justify-center">
                                    <User className="w-4 h-4 text-gray-500" />
                                  </div>
                                  <div className="ml-4">
                                    <div className="text-sm font-medium">{item.employeeName}</div>
                                  </div>
                                </div>
                              </td>

                              <td className="px-4 text-sm whitespace-nowrap">{item.leaveType}</td>

                              <td className="px-4 text-sm">
                                <div className="flex items-center">
                                  <Calendar className="w-4 h-4 text-[#198754] mr-2" />
                                  <span>{new Date(item.startDate).toLocaleDateString()}</span>
                                </div>
                              </td>

                              <td className="px-4 text-sm">
                                <div className="flex items-center">
                                  <Calendar className="w-4 h-4 text-[#dc3545] mr-2" />
                                  <span>{new Date(item.endDate).toLocaleDateString()}</span>
                                </div>
                              </td>

                              <td className="px-4 text-sm font-semibold">{item.days}</td>

                              <td className="px-4 text-sm max-w-[200px] truncate">{item.reason}</td>

                              <td className="px-4 whitespace-nowrap">
                                <span className={`px-[10px] py-[2px] inline-flex text-xs leading-5 font-semibold rounded-[6px] ${getStatusColor(item.status)}`}>
                                  {item.status}
                                </span>
                              </td>

                              <td className="px-4 text-sm">{new Date(item.appliedDate).toLocaleDateString()}</td>

                              <td className="px-4 text-sm font-medium">
                                <div className="flex space-x-2">
                                  <button onClick={() => handleEditClick(item)} className="text-[#6777ef] hover:bg-[#E0E1E3] p-1 rounded-full cursor-pointer">
                                    <Edit className="w-5 h-5" />
                                  </button>
                                  <button onClick={() => deleteRequest(item.id)} className="text-[#ff5200] hover:bg-[#E0E1E3] p-1 rounded-full cursor-pointer">
                                    <Trash2 className="w-5 h-5" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>

                      <div className={`px-4 md:hidden shadow-sm bg-white transition-all duration-500 ${animate ? "animate-slideDown" : ""}`}>
                        {leaveRequests.map((item) => (
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

                            {/* Request Info */}
                            <div className="text-sm text-gray-800">
                              {/* Employee Name */}
                              <div className="flex items-center h-13 space-x-3 border-b border-[#dadada] gap-4">
                                <span className="font-semibold w-32">Employee:</span>
                                <div className="flex items-center">
                                  <div className="w-10 h-10 rounded-full bg-gray-200 border flex items-center justify-center">
                                    <User className="w-5 h-5 text-gray-500" />
                                  </div>
                                  <span className="ml-2">{item.employeeName}</span>
                                </div>
                              </div>

                              {/* Leave Type */}
                              <div className="flex items-center h-13 space-x-3 border-b border-[#dadada] gap-4">
                                <span className="font-semibold w-32">Leave Type:</span>
                                <span className="ml-1">{item.leaveType}</span>
                              </div>

                              {/* Start Date */}
                              <div className="flex items-center h-13 space-x-3 border-b border-[#dadada] gap-4">
                                <span className="font-semibold w-32">Start Date:</span>
                                <div className="flex items-center">
                                  <Calendar className="w-4 h-4 text-[#198754] mr-2" />
                                  <span>{new Date(item.startDate).toLocaleDateString()}</span>
                                </div>
                              </div>

                              {/* End Date */}
                              <div className="flex items-center h-13 space-x-3 border-b border-[#dadada] gap-4">
                                <span className="font-semibold w-32">End Date:</span>
                                <div className="flex items-center">
                                  <Calendar className="w-4 h-4 text-[#dc3545] mr-2" />
                                  <span>{new Date(item.endDate).toLocaleDateString()}</span>
                                </div>
                              </div>

                              {/* Days */}
                              <div className="flex items-center h-13 space-x-3 border-b border-[#dadada] gap-4">
                                <span className="font-semibold w-32">Days:</span>
                                <span className="ml-1 font-semibold">{item.days}</span>
                              </div>

                              {/* Reason */}
                              <div className="flex items-center h-13 space-x-3 border-b border-[#dadada] gap-4">
                                <span className="font-semibold w-32">Reason:</span>
                                <span className="ml-1">{item.reason}</span>
                              </div>

                              {/* Status */}
                              <div className="flex items-center h-13 space-x-3 border-b border-[#dadada] gap-4">
                                <span className="font-semibold w-32">Status:</span>
                                <span className={`ml-1 py-1 px-2 rounded-[4px] text-xs font-semibold ${getStatusColor(item.status)}`}>
                                  {item.status}
                                </span>
                              </div>

                              {/* Applied Date */}
                              <div className="flex items-center h-13 space-x-3 border-b border-[#dadada] gap-4">
                                <span className="font-semibold w-32">Applied:</span>
                                <span className="ml-1">{new Date(item.appliedDate).toLocaleDateString()}</span>
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
                                    onClick={() => deleteRequest(item.id)}
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
          <Paginator totalItems={leaveRequests.length} />
        </div>
      </div>

      {isEditModalOpen && editingRequest && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999]">
          <div className="bg-white rounded-lg shadow-lg w-[600px] max-w-[90%]">
            <div className="flex items-center justify-between border-b !border-gray-300 px-5 py-3">
              <div className="flex items-center space-x-3">
                <User className="w-10 h-10 p-2 rounded-full bg-gray-200" />
                <h2 className="text-lg font-semibold">
                  Edit Leave Request - {editingRequest.employeeName}
                </h2>
              </div>
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="text-gray-600 hover:text-gray-900 text-xl font-bold"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleUpdateRequest} className="p-6 space-y-6 h-[450px] overflow-y-auto scrollbar-hide">
              <div className="grid grid-cols-2 gap-4">
                {/* Employee Name */}
                <div className="relative">
                  <input
                    type="text"
                    id="employeeName"
                    value={editingRequest.employeeName}
                    onChange={(e) => setEditingRequest({ ...editingRequest, employeeName: e.target.value })}
                    placeholder=" "
                    required
                    className="peer w-full rounded-md border bg-white px-3 pt-5 pb-2 text-sm text-gray-800 focus:border-[#005CBB] focus:ring-2 focus:ring-[#005CBB] outline-none transition-all"
                  />
                  <label
                    htmlFor="employeeName"
                    className={`absolute left-3 px-[4px] bg-white transition-all duration-200 ${editingRequest.employeeName ? "-top-2 text-xs text-[#005CBB]" : "top-3 text-gray-500"} peer-focus:-top-2 peer-focus:text-xs peer-focus:text-[#005CBB]`}
                  >
                    Employee Name*
                  </label>
                </div>

                {/* Leave Type */}
                <div className="relative">
                  <select
                    id="leaveType"
                    value={editingRequest.leaveType}
                    onChange={(e) => setEditingRequest({ ...editingRequest, leaveType: e.target.value })}
                    className="peer w-full rounded-md border bg-white px-3 pt-5 pb-2 text-sm text-gray-800 focus:border-[#005CBB] focus:ring-2 focus:ring-[#005CBB] outline-none transition-all appearance-none"
                  >
                    <option value="Sick Leave">Sick Leave</option>
                    <option value="Annual Leave">Annual Leave</option>
                    <option value="Casual Leave">Casual Leave</option>
                    <option value="Maternity Leave">Maternity Leave</option>
                    <option value="Paternity Leave">Paternity Leave</option>
                  </select>
                  <label
                    htmlFor="leaveType"
                    className="absolute left-3 px-[4px] bg-white -top-2 text-xs text-[#005CBB]"
                  >
                    Leave Type*
                  </label>
                </div>

                {/* Start Date */}
                <div className="relative">
                  <input
                    type="date"
                    id="startDate"
                    value={editingRequest.startDate}
                    onChange={(e) => setEditingRequest({ ...editingRequest, startDate: e.target.value })}
                    placeholder=" "
                    required
                    className="peer w-full rounded-md border bg-white px-3 pt-5 pb-2 text-sm text-gray-800 focus:border-[#005CBB] focus:ring-2 focus:ring-[#005CBB] outline-none transition-all"
                  />
                  <label
                    htmlFor="startDate"
                    className="absolute left-3 px-[4px] bg-white -top-2 text-xs text-[#005CBB]"
                  >
                    Start Date*
                  </label>
                </div>

                {/* End Date */}
                <div className="relative">
                  <input
                    type="date"
                    id="endDate"
                    value={editingRequest.endDate}
                    onChange={(e) => setEditingRequest({ ...editingRequest, endDate: e.target.value })}
                    placeholder=" "
                    required
                    className="peer w-full rounded-md border bg-white px-3 pt-5 pb-2 text-sm text-gray-800 focus:border-[#005CBB] focus:ring-2 focus:ring-[#005CBB] outline-none transition-all"
                  />
                  <label
                    htmlFor="endDate"
                    className="absolute left-3 px-[4px] bg-white -top-2 text-xs text-[#005CBB]"
                  >
                    End Date*
                  </label>
                </div>

                {/* Days */}
                <div className="relative">
                  <input
                    type="number"
                    id="days"
                    value={editingRequest.days}
                    onChange={(e) => setEditingRequest({ ...editingRequest, days: parseInt(e.target.value) })}
                    placeholder=" "
                    required
                    className="peer w-full rounded-md border bg-white px-3 pt-5 pb-2 text-sm text-gray-800 focus:border-[#005CBB] focus:ring-2 focus:ring-[#005CBB] outline-none transition-all"
                  />
                  <label
                    htmlFor="days"
                    className={`absolute left-3 px-[4px] bg-white transition-all duration-200 ${editingRequest.days ? "-top-2 text-xs text-[#005CBB]" : "top-3 text-gray-500"} peer-focus:-top-2 peer-focus:text-xs peer-focus:text-[#005CBB]`}
                  >
                    Days*
                  </label>
                </div>

                {/* Status */}
                <div className="relative">
                  <select
                    id="status"
                    value={editingRequest.status}
                    onChange={(e) => setEditingRequest({ ...editingRequest, status: e.target.value as "Pending" | "Approved" | "Rejected" })}
                    className="peer w-full rounded-md border bg-white px-3 pt-5 pb-2 text-sm text-gray-800 focus:border-[#005CBB] focus:ring-2 focus:ring-[#005CBB] outline-none transition-all appearance-none"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Approved">Approved</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                  <label
                    htmlFor="status"
                    className="absolute left-3 px-[4px] bg-white -top-2 text-xs text-[#005CBB]"
                  >
                    Status*
                  </label>
                </div>
              </div>

              {/* Reason */}
              <div className="relative">
                <textarea
                  id="reason"
                  rows={4}
                  value={editingRequest.reason}
                  onChange={(e) => setEditingRequest({ ...editingRequest, reason: e.target.value })}
                  placeholder=" "
                  className="peer w-full rounded-md border bg-white px-3 pt-5 pb-2 text-sm resize-none text-gray-800 focus:border-[#005CBB] focus:ring-2 focus:ring-[#005CBB] outline-none transition-all"
                ></textarea>
                <label
                  htmlFor="reason"
                  className={`absolute left-3 px-[4px] bg-white transition-all duration-200 ${editingRequest.reason ? "-top-2 text-xs text-[#005CBB]" : "top-3 text-gray-500"} peer-focus:-top-2 peer-focus:text-xs peer-focus:text-[#005CBB]`}
                >
                  Reason
                </label>
              </div>

              {/* Submit */}
              <div className="flex gap-2 pt-3">
                <button
                  type="submit"
                  className="bg-[#005cbb] text-white px-6 py-2 rounded-full text-sm font-medium transition hover:bg-[#004a99]"
                >
                  Save
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