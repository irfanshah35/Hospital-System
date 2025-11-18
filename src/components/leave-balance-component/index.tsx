'use client';

import { CirclePlus, Download, Home, RotateCw, Trash2, Edit } from 'lucide-react';
import React, { useState, useRef, useEffect } from "react";
import * as XLSX from "xlsx";

interface LeaveBalance {
  id: number;
  employeeName: string;
  avatar: string;
  previousBalance: number;
  currentBalance: number;
  totalBalance: number;
  usedLeave: number;
  acceptedLeave: number;
  rejectedLeave: number;
  expiredLeave: number;
  carryOverBalance: number;
}

export default function LeaveBalanceComponent() {
  const [detailDropdown, setDetailDropdown] = useState(false);
  const detailref = useRef<HTMLDivElement | null>(null);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [animate, setAnimate] = useState(false);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBalance, setEditingBalance] = useState<LeaveBalance | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);

  const [leaveBalances, setLeaveBalances] = useState<LeaveBalance[]>([
    {
      id: 1,
      employeeName: "John Deo",
      avatar: "JD",
      previousBalance: 10,
      currentBalance: 15,
      totalBalance: 25,
      usedLeave: 15,
      acceptedLeave: 10,
      rejectedLeave: 2,
      expiredLeave: 5,
      carryOverBalance: 5
    },
    {
      id: 2,
      employeeName: "Sarah Smith",
      avatar: "SS",
      previousBalance: 10,
      currentBalance: 15,
      totalBalance: 25,
      usedLeave: 15,
      acceptedLeave: 10,
      rejectedLeave: 2,
      expiredLeave: 5,
      carryOverBalance: 5
    },
    {
      id: 3,
      employeeName: "Edna Gilbert",
      avatar: "EG",
      previousBalance: 10,
      currentBalance: 15,
      totalBalance: 25,
      usedLeave: 15,
      acceptedLeave: 10,
      rejectedLeave: 2,
      expiredLeave: 5,
      carryOverBalance: 5
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
      leaveBalances.map((item) => ({
        "Employee Name": item.employeeName,
        "Previous Balance": item.previousBalance,
        "Current Balance": item.currentBalance,
        "Total Balance": item.totalBalance,
        "Used Leave": item.usedLeave,
        "Accepted Leave": item.acceptedLeave,
        "Rejected Leave": item.rejectedLeave,
        "Expired Leave": item.expiredLeave,
        "Carry Over Balance": item.carryOverBalance,
      }))
    );

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Leave Balance");
    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = "leave_balance.xlsx";
    link.click();
    URL.revokeObjectURL(url);
  };

  const removeData = () => {
    if (selectedIds.length === 0) {
      alert("Please select at least one employee to delete.");
      return;
    }
    if (window.confirm(`Delete ${selectedIds.length} employee(s)?`)) {
      setLeaveBalances(prev => prev.filter(p => !selectedIds.includes(p.id)));
      setSelectedIds([]);
    }
  };

  const handleAddClick = () => {
    setEditingBalance({
      id: 0,
      employeeName: '',
      avatar: '',
      previousBalance: 0,
      currentBalance: 0,
      totalBalance: 0,
      usedLeave: 0,
      acceptedLeave: 0,
      rejectedLeave: 0,
      expiredLeave: 0,
      carryOverBalance: 0
    });
    setIsEditMode(false);
    setIsModalOpen(true);
  };

  const handleEditClick = (balance: LeaveBalance) => {
    setEditingBalance(balance);
    setIsEditMode(true);
    setIsModalOpen(true);
  };

  const handleModalSubmit = (formData: LeaveBalance) => {
    if (isEditMode && editingBalance?.id) {
      // Edit existing record
      setLeaveBalances(prev =>
        prev.map(item =>
          item.id === editingBalance.id ? { ...formData, id: editingBalance.id } : item
        )
      );
    } else {
      // Add new record
      const newItem = {
        ...formData,
        id: Math.max(0, ...leaveBalances.map(item => item.id)) + 1,
        avatar: formData.employeeName.split(' ').map(n => n[0]).join('').toUpperCase()
      };
      setLeaveBalances(prev => [...prev, newItem]);
    }
    setIsModalOpen(false);
    setEditingBalance(null);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditingBalance(null);
  };

  const handleCheckboxChange = (id: number) => {
    setSelectedIds(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const handleSelectAll = (checked: boolean) => {
    setSelectedIds(checked ? leaveBalances.map(p => p.id) : []);
  };

  useEffect(() => {
    const selectAllCheckbox = document.getElementById("selectAll") as HTMLInputElement;
    if (selectAllCheckbox) {
      selectAllCheckbox.indeterminate =
        selectedIds.length > 0 && selectedIds.length < leaveBalances.length;
    }
  }, [selectedIds, leaveBalances]);

  const deleteBalance = (id: number) => {
    if (window.confirm("Are you sure you want to delete this record?")) {
      setLeaveBalances(prev => prev.filter(r => r.id !== id));
    }
  };

  const getAvatarColor = (index: number) => {
    const colors = [
      "bg-blue-500",
      "bg-orange-500",
      "bg-teal-500",
      "bg-purple-500",
      "bg-pink-500",
      "bg-green-500",
      "bg-red-500"
    ];
    return colors[index % colors.length];
  };

  const checkboxItems = [
    { label: "Checkbox", checked: true },
    { label: "Employee Name", checked: true },
    { label: "Previous Balance", checked: true },
    { label: "Current Balance", checked: true },
    { label: "Total Balance", checked: true },
    { label: "Used Leave", checked: true },
    { label: "Accepted Leave", checked: true },
    { label: "Rejected Leave", checked: true },
    { label: "Expired Leave", checked: true },
    { label: "Carry Over Balance", checked: true },
    { label: "Actions", checked: true },
  ];

  return (
    <>
      <div className='px-4 sm:px-6 py-[20px] mt-0'>
        <div className="flex items-center justify-between relative top-[-5px]">
          <div className="flex items-center flex-wrap space-x-2">
            <h1 className="text-[20px] font-semibold">Leave Balance</h1>
            <span className="text-[20px] font-bold">›</span>
            <Home size={18} />
            <span>›</span>
            <span className="text-sm">HR</span>
            <span>›</span>
            <span className="text-sm">Leave Balance</span>
          </div>
        </div>

        <div className="h-auto mt-3">
          <div className="max-w-full">
            <div className="bg-[#e8eaf6] rounded-t-xl shadow-md overflow-hidden">
              {/* Header */}
              <div className="pr-[15px] pl-[20px] py-[8px] border-b border-gray-200 flex max-[390px]:gap-2 items-center flex-wrap">
                <div className='flex items-center flex-[35%]'>
                  <h1 className="m-0 text-[17px] leading-[28px] pr-[10px] font-medium">Leave Balance</h1>
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

                  <button
                    onClick={handleAddClick}
                    className="flex justify-center items-center w-10 h-10 rounded-full text-[#4caf50] hover:bg-[#CED5E6] transition cursor-pointer"
                    title="Add New Leave Balance"
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
                  {leaveBalances.length === 0 ? (
                    <div className="p-8 text-center text-gray-500">No leave balance records found</div>
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
                            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Employee Name</th>
                            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Previous Balance</th>
                            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Current Balance</th>
                            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Total Balance</th>
                            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Used Leave</th>
                            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Accepted Leave</th>
                            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Rejected Leave</th>
                            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Expired Leave</th>
                            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Carry Over Balance</th>
                            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Actions</th>
                          </tr>
                        </thead>

                        <tbody className={`bg-white divide-y divide-gray-200 transition-all duration-500 ${animate ? "animate-slideDown" : ""}`}>
                          {leaveBalances.map((item, index) => (
                            <tr key={item.id} className="transition-colors duration-150 hover:bg-gray-50">
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
                                  <div className={`h-[40px] w-[40px] rounded-full ${getAvatarColor(index)} flex items-center justify-center text-white font-semibold text-sm`}>
                                    {item.avatar}
                                  </div>
                                  <div className="ml-3">
                                    <div className="text-sm font-medium text-gray-900">{item.employeeName}</div>
                                  </div>
                                </div>
                              </td>

                              <td className="px-4 py-3 text-sm text-gray-900 text-center">{item.previousBalance}</td>
                              <td className="px-4 py-3 text-sm text-gray-900 text-center">{item.currentBalance}</td>
                              <td className="px-4 py-3 text-sm text-gray-900 text-center">{item.totalBalance}</td>
                              <td className="px-4 py-3 text-sm text-gray-900 text-center">{item.usedLeave}</td>
                              <td className="px-4 py-3 text-sm text-gray-900 text-center">{item.acceptedLeave}</td>
                              <td className="px-4 py-3 text-sm text-gray-900 text-center">{item.rejectedLeave}</td>
                              <td className="px-4 py-3 text-sm text-gray-900 text-center">{item.expiredLeave}</td>
                              <td className="px-4 py-3 text-sm text-gray-900 text-center">{item.carryOverBalance}</td>

                              <td className="px-4 py-3 text-sm font-medium">
                                <div className="flex space-x-2">
                                  <button onClick={() => handleEditClick(item)} className="text-[#6777ef] hover:bg-[#E0E1E3] p-1 rounded-full cursor-pointer" title="Edit">
                                    <Edit className="w-5 h-5" />
                                  </button>
                                  <button onClick={() => deleteBalance(item.id)} className="text-[#ff5200] hover:bg-[#E0E1E3] p-1 rounded-full cursor-pointer" title="Delete">
                                    <Trash2 className="w-5 h-5" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>

                      <div className={`px-4 md:hidden shadow-sm bg-white transition-all duration-500 ${animate ? "animate-slideDown" : ""}`}>
                        {leaveBalances.map((item, index) => (
                          <div key={item.id} className="border-b border-gray-200 py-4">
                            {/* Checkbox Row */}
                            <div className="flex items-center justify-between mb-3 border-b border-gray-200 p-2">
                              <input
                                checked={selectedIds.includes(item.id)}
                                onChange={() => handleCheckboxChange(item.id)}
                                type="checkbox"
                                className="w-4 h-4 text-blue-600 rounded"
                              />
                            </div>

                            {/* Employee Info */}
                            <div className="space-y-2 text-sm">
                              {/* Employee Name */}
                              <div className="flex items-center gap-3 pb-2 border-b border-gray-200 p-2">
                                <span className="font-semibold w-40">Employee:</span>
                                <div className="flex items-center">
                                  <div className={`w-10 h-10 rounded-full ${getAvatarColor(index)} flex items-center justify-center text-white font-semibold text-sm`}>
                                    {item.avatar}
                                  </div>
                                  <span className="ml-2 font-medium">{item.employeeName}</span>
                                </div>
                              </div>

                              {/* Previous Balance */}
                              <div className="flex items-center gap-3 pb-2 border-b border-gray-200 p-2">
                                <span className="font-semibold w-40">Previous Balance:</span>
                                <span className="ml-1">{item.previousBalance}</span>
                              </div>

                              {/* Current Balance */}
                              <div className="flex items-center gap-3 pb-2 border-b border-gray-200 p-2">
                                <span className="font-semibold w-40">Current Balance:</span>
                                <span className="ml-1">{item.currentBalance}</span>
                              </div>

                              {/* Total Balance */}
                              <div className="flex items-center gap-3 pb-2 border-b border-gray-200 p-2">
                                <span className="font-semibold w-40">Total Balance:</span>
                                <span className="ml-1 font-semibold">{item.totalBalance}</span>
                              </div>

                              {/* Used Leave */}
                              <div className="flex items-center gap-3 pb-2 border-b border-gray-200 p-2">
                                <span className="font-semibold w-40">Used Leave:</span>
                                <span className="ml-1">{item.usedLeave}</span>
                              </div>

                              {/* Accepted Leave */}
                              <div className="flex items-center gap-3 pb-2 border-b border-gray-200 p-2">
                                <span className="font-semibold w-40">Accepted Leave:</span>
                                <span className="ml-1">{item.acceptedLeave}</span>
                              </div>

                              {/* Rejected Leave */}
                              <div className="flex items-center gap-3 pb-2 border-b border-gray-200 p-2">
                                <span className="font-semibold w-40">Rejected Leave:</span>
                                <span className="ml-1">{item.rejectedLeave}</span>
                              </div>

                              {/* Expired Leave */}
                              <div className="flex items-center gap-3 pb-2 border-b border-gray-200 p-2">
                                <span className="font-semibold w-40">Expired Leave:</span>
                                <span className="ml-1">{item.expiredLeave}</span>
                              </div>

                              {/* Carry Over Balance */}
                              <div className="flex items-center gap-3 pb-2 border-b border-gray-200 p-2">
                                <span className="font-semibold w-40">Carry Over:</span>
                                <span className="ml-1">{item.carryOverBalance}</span>
                              </div>

                              {/* Actions */}
                              <div className="flex items-center gap-3 p-2">
                                <div className="flex space-x-2">
                                  <button
                                    onClick={() => handleEditClick(item)}
                                    className="text-[#6777ef] hover:bg-[#E0E1E3] p-1 rounded-full cursor-pointer"
                                  >
                                    <Edit className="w-5 h-5" />
                                  </button>
                                  <button
                                    onClick={() => deleteBalance(item.id)}
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
          <Paginator totalItems={leaveBalances.length} />
        </div>
      </div>

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <LeaveBalanceModal
          isOpen={isModalOpen}
          onClose={handleModalClose}
          onSubmit={handleModalSubmit}
          initialData={editingBalance}
          isEditMode={isEditMode}
        />
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

// Modal Component
interface LeaveBalanceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (formData: LeaveBalance) => void;
  initialData?: LeaveBalance | null;
  isEditMode?: boolean;
}

const LeaveBalanceModal: React.FC<LeaveBalanceModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  isEditMode = false
}) => {
  const [formData, setFormData] = useState<LeaveBalance>({
    id: 0,
    employeeName: '',
    avatar: '',
    previousBalance: 0,
    currentBalance: 0,
    totalBalance: 0,
    usedLeave: 0,
    acceptedLeave: 0,
    rejectedLeave: 0,
    expiredLeave: 0,
    carryOverBalance: 0
  });

  const modalRef = useRef<HTMLDivElement>(null);

  const isFormValid = formData.employeeName.trim() !== '';

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      // Reset form when adding new
      setFormData({
        id: 0,
        employeeName: '',
        avatar: '',
        previousBalance: 0,
        currentBalance: 0,
        totalBalance: 0,
        usedLeave: 0,
        acceptedLeave: 0,
        rejectedLeave: 0,
        expiredLeave: 0,
        carryOverBalance: 0
      });
    }
  }, [initialData, isOpen]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'employeeName' ? value : parseInt(value) || 0
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
      <div ref={modalRef} className="bg-white rounded-lg shadow-lg w-full max-w-[700px] mx-4 max-h-[90vh] overflow-hidden">
        {/* Modal Header */}
        <div className="flex justify-between items-center p-4 border-b border-gray-300">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-gray-200 border flex items-center justify-center">
              <span className="text-gray-500 font-semibold">
                {formData.employeeName ? formData.employeeName.split(' ').map(n => n[0]).join('').toUpperCase() : 'NB'}
              </span>
            </div>
            <h2 className="font-semibold text-lg">
              {isEditMode ? `Edit Leave Balance - ${formData.employeeName}` : 'New Leave Balance'}
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
        <div className="p-6 max-h-[75vh] overflow-y-auto">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              {/* Employee Name */}
              <div className="relative col-span-2">
                <input
                  type="text"
                  name="employeeName"
                  value={formData.employeeName}
                  onChange={handleInputChange}
                  placeholder=" "
                  required
                  className="peer w-full rounded-md border bg-white px-3 pt-5 pb-2 text-sm focus:border-[#005CBB] focus:ring-2 focus:ring-[#005CBB] outline-none transition-all border-gray-300"
                />
                <label className="absolute left-3 px-1 bg-white -top-2 text-xs text-[#005CBB]">
                  Employee Name*
                </label>
              </div>

              {/* Previous Balance */}
              <div className="relative">
                <input
                  type="number"
                  name="previousBalance"
                  value={formData.previousBalance}
                  onChange={handleInputChange}
                  placeholder=" "
                  className="peer w-full rounded-md border bg-white px-3 pt-5 pb-2 text-sm focus:border-[#005CBB] focus:ring-2 focus:ring-[#005CBB] outline-none transition-all border-gray-300"
                />
                <label className={`absolute left-3 px-1 bg-white transition-all duration-200 ${formData.previousBalance ? "-top-2 text-xs text-[#005CBB]" : "top-3 text-gray-500"} peer-focus:-top-2 peer-focus:text-xs peer-focus:text-[#005CBB]`}>
                  Previous Balance
                </label>
              </div>

              {/* Current Balance */}
              <div className="relative">
                <input
                  type="number"
                  name="currentBalance"
                  value={formData.currentBalance}
                  onChange={handleInputChange}
                  placeholder=" "
                  className="peer w-full rounded-md border bg-white px-3 pt-5 pb-2 text-sm focus:border-[#005CBB] focus:ring-2 focus:ring-[#005CBB] outline-none transition-all border-gray-300"
                />
                <label className={`absolute left-3 px-1 bg-white transition-all duration-200 ${formData.currentBalance ? "-top-2 text-xs text-[#005CBB]" : "top-3 text-gray-500"} peer-focus:-top-2 peer-focus:text-xs peer-focus:text-[#005CBB]`}>
                  Current Balance
                </label>
              </div>

              {/* Total Balance */}
              <div className="relative">
                <input
                  type="number"
                  name="totalBalance"
                  value={formData.totalBalance}
                  onChange={handleInputChange}
                  placeholder=" "
                  className="peer w-full rounded-md border bg-white px-3 pt-5 pb-2 text-sm focus:border-[#005CBB] focus:ring-2 focus:ring-[#005CBB] outline-none transition-all border-gray-300"
                />
                <label className={`absolute left-3 px-1 bg-white transition-all duration-200 ${formData.totalBalance ? "-top-2 text-xs text-[#005CBB]" : "top-3 text-gray-500"} peer-focus:-top-2 peer-focus:text-xs peer-focus:text-[#005CBB]`}>
                  Total Balance
                </label>
              </div>

              {/* Used Leave */}
              <div className="relative">
                <input
                  type="number"
                  name="usedLeave"
                  value={formData.usedLeave}
                  onChange={handleInputChange}
                  placeholder=" "
                  className="peer w-full rounded-md border bg-white px-3 pt-5 pb-2 text-sm focus:border-[#005CBB] focus:ring-2 focus:ring-[#005CBB] outline-none transition-all border-gray-300"
                />
                <label className={`absolute left-3 px-1 bg-white transition-all duration-200 ${formData.usedLeave ? "-top-2 text-xs text-[#005CBB]" : "top-3 text-gray-500"} peer-focus:-top-2 peer-focus:text-xs peer-focus:text-[#005CBB]`}>
                  Used Leave
                </label>
              </div>

              {/* Accepted Leave */}
              <div className="relative">
                <input
                  type="number"
                  name="acceptedLeave"
                  value={formData.acceptedLeave}
                  onChange={handleInputChange}
                  placeholder=" "
                  className="peer w-full rounded-md border bg-white px-3 pt-5 pb-2 text-sm focus:border-[#005CBB] focus:ring-2 focus:ring-[#005CBB] outline-none transition-all border-gray-300"
                />
                <label className={`absolute left-3 px-1 bg-white transition-all duration-200 ${formData.acceptedLeave ? "-top-2 text-xs text-[#005CBB]" : "top-3 text-gray-500"} peer-focus:-top-2 peer-focus:text-xs peer-focus:text-[#005CBB]`}>
                  Accepted Leave
                </label>
              </div>

              {/* Rejected Leave */}
              <div className="relative">
                <input
                  type="number"
                  name="rejectedLeave"
                  value={formData.rejectedLeave}
                  onChange={handleInputChange}
                  placeholder=" "
                  className="peer w-full rounded-md border bg-white px-3 pt-5 pb-2 text-sm focus:border-[#005CBB] focus:ring-2 focus:ring-[#005CBB] outline-none transition-all border-gray-300"
                />
                <label className={`absolute left-3 px-1 bg-white transition-all duration-200 ${formData.rejectedLeave ? "-top-2 text-xs text-[#005CBB]" : "top-3 text-gray-500"} peer-focus:-top-2 peer-focus:text-xs peer-focus:text-[#005CBB]`}>
                  Rejected Leave
                </label>
              </div>

              {/* Expired Leave */}
              <div className="relative">
                <input
                  type="number"
                  name="expiredLeave"
                  value={formData.expiredLeave}
                  onChange={handleInputChange}
                  placeholder=" "
                  className="peer w-full rounded-md border bg-white px-3 pt-5 pb-2 text-sm focus:border-[#005CBB] focus:ring-2 focus:ring-[#005CBB] outline-none transition-all border-gray-300"
                />
                <label className={`absolute left-3 px-1 bg-white transition-all duration-200 ${formData.expiredLeave ? "-top-2 text-xs text-[#005CBB]" : "top-3 text-gray-500"} peer-focus:-top-2 peer-focus:text-xs peer-focus:text-[#005CBB]`}>
                  Expired Leave
                </label>
              </div>

              {/* Carry Over Balance */}
              <div className="relative">
                <input
                  type="number"
                  name="carryOverBalance"
                  value={formData.carryOverBalance}
                  onChange={handleInputChange}
                  placeholder=" "
                  className="peer w-full rounded-md border bg-white px-3 pt-5 pb-2 text-sm focus:border-[#005CBB] focus:ring-2 focus:ring-[#005CBB] outline-none transition-all border-gray-300"
                />
                <label className={`absolute left-3 px-1 bg-white transition-all duration-200 ${formData.carryOverBalance ? "-top-2 text-xs text-[#005CBB]" : "top-3 text-gray-500"} peer-focus:-top-2 peer-focus:text-xs peer-focus:text-[#005CBB]`}>
                  Carry Over Balance
                </label>
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