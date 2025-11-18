'use client';

import { Download, Home, RotateCw, Trash2, Edit, User, CirclePlus } from 'lucide-react';
import React, { useState, useRef, useEffect } from "react";
import * as XLSX from "xlsx";

interface AttendanceRecord {
  id: number;
  employeeName: string;
  firstIn: string;
  break: string;
  lastOut: string;
  totalHours: string;
  status: "present" | "absent";
  shift: "Day Shift" | "Night Shift";
}

// Reusable Input Component
interface ReusableInputProps {
  label: string;
  type?: "text" | "number" | "email" | "password" | "time";
  value: string | number;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  className?: string;
}

const ReusableInput: React.FC<ReusableInputProps> = ({
  label,
  type = "text",
  value,
  onChange,
  placeholder = " ",
  required = false,
  className = ""
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className={`relative ${className}`}>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder={placeholder}
        required={required}
        className="peer w-full rounded-md border bg-white px-3 pt-5 pb-2 text-sm text-gray-800 focus:border-[#005CBB] focus:ring-2 focus:ring-[#005CBB] outline-none transition-all"
      />
      <label
        className={`absolute left-3 px-[4px] bg-white transition-all duration-200 ${value || isFocused ? "-top-2 text-xs text-[#005CBB]" : "top-3 text-gray-500"
          } peer-focus:-top-2 peer-focus:text-xs peer-focus:text-[#005CBB]`}
      >
        {label}{required && "*"}
      </label>
    </div>
  );
};

// Reusable Select Component
interface ReusableSelectProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
  required?: boolean;
  className?: string;
}

const ReusableSelect: React.FC<ReusableSelectProps> = ({
  label,
  value,
  onChange,
  options,
  required = false,
  className = ""
}) => {
  return (
    <div className={`relative ${className}`}>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        className="peer w-full rounded-md border bg-white px-3 pt-5 pb-2 text-sm text-gray-800 focus:border-[#005CBB] focus:ring-2 focus:ring-[#005CBB] outline-none transition-all appearance-none"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <label
        className="absolute left-3 px-[4px] bg-white -top-2 text-xs text-[#005CBB]"
      >
        {label}{required && "*"}
      </label>
    </div>
  );
};

// Reusable Modal Component
interface AttendanceModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: 'add' | 'edit';
  attendance?: AttendanceRecord | null;
  onSubmit: (attendance: Omit<AttendanceRecord, 'id'>) => void;
}

const AttendanceModal: React.FC<AttendanceModalProps> = ({
  isOpen,
  onClose,
  mode,
  attendance,
  onSubmit
}) => {
  const [formData, setFormData] = useState<Omit<AttendanceRecord, 'id'>>({
    employeeName: '',
    firstIn: '',
    break: '',
    lastOut: '',
    totalHours: '',
    status: 'present',
    shift: 'Day Shift'
  });

  useEffect(() => {
    if (mode === 'edit' && attendance) {
      const { id, ...rest } = attendance;
      setFormData(rest);
    } else {
      setFormData({
        employeeName: '',
        firstIn: '',
        break: '',
        lastOut: '',
        totalHours: '',
        status: 'present',
        shift: 'Day Shift'
      });
    }
  }, [mode, attendance, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999]">
      <div className="bg-white rounded-lg shadow-lg w-[700px] max-w-[90%] max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between border-b !border-gray-300 px-5 py-3">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-gray-200 border flex items-center justify-center">
              <User className="w-5 h-5 text-gray-500" />
            </div>
            <h2 className="text-lg font-semibold">
              {mode === 'add' ? 'Add New Attendance' : `Edit Attendance - ${attendance?.employeeName}`}
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

        <form onSubmit={handleSubmit} className="p-6 space-y-6 max-h-[75vh] overflow-y-auto scrollbar-hide">
          <div className="grid grid-cols-2 gap-8">
            {/* Employee Name */}
            <ReusableInput
              label="Employee Name"
              value={formData.employeeName}
              onChange={(value) => setFormData({ ...formData, employeeName: value })}
              required
              className=""
            />

            {/* First In */}
            <ReusableInput
              label="First In"
              type="time"
              value={formData.firstIn}
              onChange={(value) => setFormData({ ...formData, firstIn: value })}
              required
            />

            {/* Break */}
            <ReusableInput
              label="Break"
              type="time"
              value={formData.break}
              onChange={(value) => setFormData({ ...formData, break: value })}
              required
            />

            {/* Last Out */}
            <ReusableInput
              label="Last Out"
              type="time"
              value={formData.lastOut}
              onChange={(value) => setFormData({ ...formData, lastOut: value })}
              required
            />

            {/* Total Hours */}
            <ReusableInput
              label="Total Hours"
              type="time"
              value={formData.totalHours}
              onChange={(value) => setFormData({ ...formData, totalHours: value })}
            />

            {/* Status */}
            <ReusableSelect
              label="Status"
              value={formData.status}
              onChange={(value) => setFormData({ ...formData, status: value as "present" | "absent" })}
              options={[
                { value: "present", label: "Present" },
                { value: "absent", label: "Absent" }
              ]}
              required
            />

            {/* Shift */}
            <ReusableSelect
              label="Shift"
              value={formData.shift}
              onChange={(value) => setFormData({ ...formData, shift: value as "Day Shift" | "Night Shift" })}
              options={[
                { value: "Day Shift", label: "Day Shift" },
                { value: "Night Shift", label: "Night Shift" }
              ]}
              required
            />
          </div>

          {/* Submit Buttons */}
          <div className="flex gap-2 pt-3">
            <button
              type="submit"
              className="bg-[#005cbb] text-white px-6 py-2 rounded-full text-sm font-medium transition hover:bg-[#004a99]"
            >
              {mode === 'add' ? 'Add Attendance' : 'Save Changes'}
            </button>
            <button
              onClick={onClose}
              type="button"
              className="bg-[#ba1a1a] text-white px-6 py-2 rounded-full text-sm font-medium transition hover:bg-[#9a1515]"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default function TodaysAttendanceComponent() {
  const [detailDropdown, setDetailDropdown] = useState(false);
  const detailref = useRef<HTMLDivElement | null>(null);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [animate, setAnimate] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'add' | 'edit'>('add');
  const [editingAttendance, setEditingAttendance] = useState<AttendanceRecord | null>(null);

  const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>([
    {
      id: 1,
      employeeName: "John Deo",
      firstIn: "10:30",
      break: "01:15",
      lastOut: "19:37",
      totalHours: "08:02",
      status: "present",
      shift: "Night Shift"
    },
    {
      id: 2,
      employeeName: "Sarah Smith",
      firstIn: "10:32",
      break: "01:00",
      lastOut: "19:30",
      totalHours: "08:10",
      status: "absent",
      shift: "Day Shift"
    },
    {
      id: 3,
      employeeName: "Edna Gilbert",
      firstIn: "10:42",
      break: "01:10",
      lastOut: "19:32",
      totalHours: "08:08",
      status: "absent",
      shift: "Day Shift"
    },
    {
      id: 4,
      employeeName: "Sheila Oster",
      firstIn: "10:38",
      break: "01:07",
      lastOut: "19:40",
      totalHours: "08:00",
      status: "present",
      shift: "Night Shift"
    },
    {
      id: 5,
      employeeName: "Barbara Gomez",
      firstIn: "10:33",
      break: "01:15",
      lastOut: "19:30",
      totalHours: "08:01",
      status: "present",
      shift: "Night Shift"
    },
    {
      id: 6,
      employeeName: "Sarah Smith",
      firstIn: "10:30",
      break: "01:10",
      lastOut: "19:37",
      totalHours: "08:10",
      status: "absent",
      shift: "Day Shift"
    },
    {
      id: 7,
      employeeName: "Marie Brown",
      firstIn: "10:32",
      break: "01:05",
      lastOut: "19:40",
      totalHours: "08:00",
      status: "absent",
      shift: "Day Shift"
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
      attendanceRecords.map((item) => ({
        "Employee Name": item.employeeName,
        "First In": item.firstIn,
        "Break": item.break,
        "Last Out": item.lastOut,
        "Total Hours": item.totalHours,
        "Status": item.status,
        "Shift": item.shift,
      }))
    );

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Today's Attendance");
    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = "todays_attendance.xlsx";
    link.click();
    URL.revokeObjectURL(url);
  };

  const removeData = () => {
    if (selectedIds.length === 0) {
      alert("Please select at least one record to delete.");
      return;
    }
    if (window.confirm(`Delete ${selectedIds.length} record(s)?`)) {
      setAttendanceRecords(prev => prev.filter(p => !selectedIds.includes(p.id)));
      setSelectedIds([]);
    }
  };

  const handleCheckboxChange = (id: number) => {
    setSelectedIds(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const handleSelectAll = (checked: boolean) => {
    setSelectedIds(checked ? attendanceRecords.map(p => p.id) : []);
  };

  useEffect(() => {
    const selectAllCheckbox = document.getElementById("selectAll") as HTMLInputElement;
    if (selectAllCheckbox) {
      selectAllCheckbox.indeterminate =
        selectedIds.length > 0 && selectedIds.length < attendanceRecords.length;
    }
  }, [selectedIds, attendanceRecords]);

  const checkboxItems = [
    { label: "Checkbox", checked: true },
    { label: "Employee Name", checked: true },
    { label: "First In", checked: true },
    { label: "Break", checked: true },
    { label: "Last Out", checked: true },
    { label: "Total Hours", checked: true },
    { label: "Status", checked: true },
    { label: "Shift", checked: true },
    { label: "Actions", checked: true },
  ];

  const deleteRecord = (id: number) => {
    if (window.confirm("Are you sure you want to delete this attendance record?")) {
      setAttendanceRecords(prev => prev.filter(r => r.id !== id));
    }
  };

  const handleAddClick = () => {
    setModalMode('add');
    setEditingAttendance(null);
    setIsModalOpen(true);
  };

  const handleEditClick = (attendance: AttendanceRecord) => {
    setModalMode('edit');
    setEditingAttendance(attendance);
    setIsModalOpen(true);
  };

  const handleModalSubmit = (attendanceData: Omit<AttendanceRecord, 'id'>) => {
    if (modalMode === 'add') {
      const newAttendance: AttendanceRecord = {
        ...attendanceData,
        id: Math.max(...attendanceRecords.map(a => a.id), 0) + 1
      };
      setAttendanceRecords(prev => [...prev, newAttendance]);
      alert("Attendance record added successfully!");
    } else if (modalMode === 'edit' && editingAttendance) {
      setAttendanceRecords(prev =>
        prev.map(r => r.id === editingAttendance.id ? { ...attendanceData, id: editingAttendance.id } : r)
      );
      alert("Attendance record updated successfully!");
    }
    setIsModalOpen(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "present":
        return "bg-[#19875426] text-[#198754]";
      case "absent":
        return "bg-[#dc354526] text-[#dc3545]";
      default:
        return "bg-[#ffc10726] text-[#ffc107]";
    }
  };

  const getShiftColor = (shift: string) => {
    switch (shift) {
      case "Day Shift":
        return "bg-[#e3f2fd] text-[#1976d2]";
      case "Night Shift":
        return "bg-[#f3e5f5] text-[#7b1fa2]";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <>
      <div className='px-4 sm:px-6 py-[20px] mt-0'>
        <div className="flex items-center justify-between relative top-[-5px]">
          <div className="flex items-center flex-wrap space-x-2">
            <h1 className="text-[20px] font-semibold">Today's Attendance</h1>
            <span className="text-[20px] font-bold">›</span>
            <Home size={18} />
            <span>›</span>
            <span className="text-sm">HR</span>
            <span>›</span>
            <span className="text-sm">Attendance</span>
          </div>
        </div>

        <div className="h-auto mt-3">
          <div className="max-w-full">
            <div className="bg-[#f8f9fa] rounded-t-xl shadow-md overflow-hidden">
              {/* Header */}
              <div className="pr-[15px] pl-[20px] py-[8px] border-b border-gray-200 flex max-[390px]:gap-2 items-center flex-wrap">
                <div className='flex items-center flex-[35%]'>
                  <h1 className="m-0 text-[17px] leading-[28px] pr-[10px] font-medium">Today's Attendance</h1>
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
                    title="Add"
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
                  {attendanceRecords.length === 0 ? (
                    <div className="p-8 text-center text-gray-500">No attendance records found</div>
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
                            <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">First In</th>
                            <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Break</th>
                            <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Last Out</th>
                            <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Total Hours</th>
                            <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Status</th>
                            <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Shift</th>
                            <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Actions</th>
                          </tr>
                        </thead>

                        <tbody className={`bg-white divide-y divide-gray-200 transition-all duration-500 ${animate ? "animate-slideDown" : ""}`}>
                          {attendanceRecords.map((item) => (
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

                              <td className="px-4 text-sm whitespace-nowrap font-medium">{item.firstIn}</td>
                              <td className="px-4 text-sm whitespace-nowrap">{item.break}</td>
                              <td className="px-4 text-sm whitespace-nowrap font-medium">{item.lastOut}</td>
                              <td className="px-4 text-sm font-semibold text-[#005CBB]">{item.totalHours}</td>

                              <td className="px-4 whitespace-nowrap">
                                <span className={`px-[10px] py-[2px] inline-flex text-xs leading-5 font-semibold rounded-[6px] ${getStatusColor(item.status)}`}>
                                  {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                                </span>
                              </td>

                              <td className="px-4 whitespace-nowrap">
                                <span className={`px-[10px] py-[2px] inline-flex text-xs leading-5 font-semibold rounded-[6px] ${getShiftColor(item.shift)}`}>
                                  {item.shift}
                                </span>
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
                                    onClick={() => deleteRecord(item.id)}
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

                      <div className={`px-4 md:hidden shadow-sm bg-white transition-all duration-500 ${animate ? "animate-slideDown" : ""}`}>
                        {attendanceRecords.map((item) => (
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

                            {/* Attendance Info */}
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

                              {/* First In */}
                              <div className="flex items-center h-13 space-x-3 border-b border-[#dadada] gap-4">
                                <span className="font-semibold w-32">First In:</span>
                                <span className="ml-1 font-medium">{item.firstIn}</span>
                              </div>

                              {/* Break */}
                              <div className="flex items-center h-13 space-x-3 border-b border-[#dadada] gap-4">
                                <span className="font-semibold w-32">Break:</span>
                                <span className="ml-1">{item.break}</span>
                              </div>

                              {/* Last Out */}
                              <div className="flex items-center h-13 space-x-3 border-b border-[#dadada] gap-4">
                                <span className="font-semibold w-32">Last Out:</span>
                                <span className="ml-1 font-medium">{item.lastOut}</span>
                              </div>

                              {/* Total Hours */}
                              <div className="flex items-center h-13 space-x-3 border-b border-[#dadada] gap-4">
                                <span className="font-semibold w-32">Total Hours:</span>
                                <span className="ml-1 font-semibold text-[#005CBB]">{item.totalHours}</span>
                              </div>

                              {/* Status */}
                              <div className="flex items-center h-13 space-x-3 border-b border-[#dadada] gap-4">
                                <span className="font-semibold w-32">Status:</span>
                                <span className={`ml-1 py-1 px-2 rounded-[4px] text-xs font-semibold ${getStatusColor(item.status)}`}>
                                  {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                                </span>
                              </div>

                              {/* Shift */}
                              <div className="flex items-center h-13 space-x-3 border-b border-[#dadada] gap-4">
                                <span className="font-semibold w-32">Shift:</span>
                                <span className={`ml-1 py-1 px-2 rounded-[4px] text-xs font-semibold ${getShiftColor(item.shift)}`}>
                                  {item.shift}
                                </span>
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
                                    onClick={() => deleteRecord(item.id)}
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
          <Paginator totalItems={attendanceRecords.length} />
        </div>
      </div>

      {/* Reusable Modal */}
      <AttendanceModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        mode={modalMode}
        attendance={editingAttendance}
        onSubmit={handleModalSubmit}
      />

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