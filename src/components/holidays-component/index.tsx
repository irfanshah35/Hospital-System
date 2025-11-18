'use client';

import { CirclePlus, Download, Home, RotateCw, Trash2, Edit } from 'lucide-react';
import React, { useState, useRef, useEffect } from "react";
import * as XLSX from "xlsx";

interface Holiday {
  id: number;
  holidayName: string;
  shift: string;
  date: string;
  holidayType: string;
  createdBy: string;
  creationDate: string;
  approvalStatus: 'Approved' | 'Rejected' | 'Pending';
  details: string;
  location: string;
}

// Reusable Input Component
interface ReusableInputProps {
  label: string;
  type?: "text" | "number" | "email" | "password" | "date";
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

// Reusable Textarea Component
interface ReusableTextareaProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  className?: string;
  rows?: number;
}

const ReusableTextarea: React.FC<ReusableTextareaProps> = ({
  label,
  value,
  onChange,
  placeholder = " ",
  required = false,
  className = "",
  rows = 3
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className={`relative ${className}`}>
      <textarea
        rows={rows}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder={placeholder}
        required={required}
        className="peer w-full rounded-md border bg-white px-3 pt-5 pb-2 text-sm text-gray-800 focus:border-[#005CBB] focus:ring-2 focus:ring-[#005CBB] outline-none transition-all resize-none"
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
interface HolidayModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: 'add' | 'edit';
  holiday?: Holiday | null;
  onSubmit: (holiday: Omit<Holiday, 'id'>) => void;
}

const HolidayModal: React.FC<HolidayModalProps> = ({
  isOpen,
  onClose,
  mode,
  holiday,
  onSubmit
}) => {
  const [formData, setFormData] = useState<Omit<Holiday, 'id'>>({
    holidayName: '',
    shift: 'All Shifts',
    date: '',
    holidayType: 'National',
    createdBy: '',
    creationDate: '',
    approvalStatus: 'Pending',
    details: '',
    location: ''
  });

  useEffect(() => {
    if (mode === 'edit' && holiday) {
      const { id, ...rest } = holiday;
      setFormData(rest);
    } else {
      setFormData({
        holidayName: '',
        shift: 'All Shifts',
        date: '',
        holidayType: 'National',
        createdBy: '',
        creationDate: '',
        approvalStatus: 'Pending',
        details: '',
        location: ''
      });
    }
  }, [mode, holiday, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999]">
      <div className="bg-white rounded-lg shadow-lg w-[800px] max-w-[90%] max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between border-b !border-gray-300 px-5 py-3">
          <div className="flex items-center space-x-3">

            <h2 className="text-lg font-semibold">
              {mode === 'add' ? 'Add New Holiday' : `Edit Holiday - ${holiday?.holidayName}`}
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
            {/* Holiday Name */}
            <ReusableInput
              label="Holiday Name"
              value={formData.holidayName}
              onChange={(value) => setFormData({ ...formData, holidayName: value })}
              required
              className=""
            />

            {/* Date */}
            <ReusableInput
              label="Date"
              type="date"
              value={formData.date}
              onChange={(value) => setFormData({ ...formData, date: value })}
              required
            />

            {/* Location */}
            <ReusableInput
              label="Location"
              value={formData.location}
              onChange={(value) => setFormData({ ...formData, location: value })}
            />

            {/* Shift */}
            <ReusableSelect
              label="Shift"
              value={formData.shift}
              onChange={(value) => setFormData({ ...formData, shift: value })}
              options={[
                { value: "All Shifts", label: "All Shifts" },
                { value: "Day Shifts", label: "Day Shifts" },
                { value: "Night Shifts", label: "Night Shifts" }
              ]}
            />

            {/* Details - Full Width */}
            <ReusableTextarea
              label="Details"
              value={formData.details}
              onChange={(value) => setFormData({ ...formData, details: value })}
              className="col-span-2"
              rows={4}
            />

            {/* Holiday Type */}
            <ReusableSelect
              label="Holiday Type"
              value={formData.holidayType}
              onChange={(value) => setFormData({ ...formData, holidayType: value })}
              options={[
                { value: "National", label: "National" },
                { value: "Religious", label: "Religious" },
                { value: "Cultural", label: "Cultural" },
                { value: "Awareness", label: "Awareness" },
                { value: "Environmental", label: "Environmental" }
              ]}
            />

            {/* Created By */}
            <ReusableInput
              label="Created By"
              value={formData.createdBy}
              onChange={(value) => setFormData({ ...formData, createdBy: value })}
            />

            {/* Creation Date */}
            <ReusableInput
              label="Creation Date"
              type="date"
              value={formData.creationDate}
              onChange={(value) => setFormData({ ...formData, creationDate: value })}
            />

            {/* Approval Status */}
            <ReusableSelect
              label="Approval Status"
              value={formData.approvalStatus}
              onChange={(value) => setFormData({ ...formData, approvalStatus: value as 'Approved' | 'Rejected' | 'Pending' })}
              options={[
                { value: "Approved", label: "Approved" },
                { value: "Rejected", label: "Rejected" },
                { value: "Pending", label: "Pending" }
              ]}
            />

            
          </div>

          {/* Submit Buttons */}
          <div className="flex gap-2 pt-3">
            <button
              type="submit"
              className="bg-[#005cbb] text-white px-6 py-2 rounded-full text-sm font-medium transition hover:bg-[#004a99]"
            >
              {mode === 'add' ? 'Add Holiday' : 'Save Changes'}
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

export default function HolidaysComponent() {
  const [detailDropdown, setDetailDropdown] = useState(false);
  const detailref = useRef<HTMLDivElement | null>(null);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [animate, setAnimate] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'add' | 'edit'>('add');
  const [editingHoliday, setEditingHoliday] = useState<Holiday | null>(null);

  const [holidays, setHolidays] = useState<Holiday[]>([
    {
      id: 1,
      holidayName: "New Year",
      shift: "All Shifts",
      date: "2021-12-31",
      holidayType: "National",
      createdBy: "Admin",
      creationDate: "2021-11-01",
      approvalStatus: "Approved",
      details: "New Year celebration holiday",
      location: "All Locations"
    },
    {
      id: 2,
      holidayName: "World Aids Day",
      shift: "Day Shifts",
      date: "2021-12-10",
      holidayType: "Awareness",
      createdBy: "Admin",
      creationDate: "2021-11-01",
      approvalStatus: "Approved",
      details: "World AIDS Day awareness holiday",
      location: "All Locations"
    },
    {
      id: 3,
      holidayName: "World Milk Day",
      shift: "Night Shifts",
      date: "2021-06-01",
      holidayType: "Awareness",
      createdBy: "Admin",
      creationDate: "2021-11-01",
      approvalStatus: "Approved",
      details: "World Milk Day celebration",
      location: "All Locations"
    },
    {
      id: 4,
      holidayName: "Diwali",
      shift: "All Shifts",
      date: "2021-11-04",
      holidayType: "Religious",
      createdBy: "Admin",
      creationDate: "2021-11-01",
      approvalStatus: "Approved",
      details: "Diwali festival celebration",
      location: "All Locations"
    },
    {
      id: 5,
      holidayName: "Global Family Day",
      shift: "Night Shifts",
      date: "2021-01-01",
      holidayType: "Cultural",
      createdBy: "Admin",
      creationDate: "2021-11-01",
      approvalStatus: "Rejected",
      details: "Global Family Day celebration",
      location: "All Locations"
    },
    {
      id: 6,
      holidayName: "Earth Hour",
      shift: "All Shifts",
      date: "2021-03-27",
      holidayType: "Environmental",
      createdBy: "Admin",
      creationDate: "2021-11-01",
      approvalStatus: "Approved",
      details: "Earth Hour environmental awareness",
      location: "All Locations"
    },
    {
      id: 7,
      holidayName: "Independence Day",
      shift: "All Shifts",
      date: "2021-08-14",
      holidayType: "National",
      createdBy: "Admin",
      creationDate: "2021-11-01",
      approvalStatus: "Approved",
      details: "Independence Day national holiday",
      location: "All Locations"
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
      holidays.map((item) => ({
        "Holiday Name": item.holidayName,
        "Shift": item.shift,
        "Date": item.date,
        "Location": item.location,
        "Holiday Type": item.holidayType,
        "Created By": item.createdBy,
        "Creation Date": item.creationDate,
        "Approval Status": item.approvalStatus,
        "Details": item.details,
      }))
    );

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Holidays");
    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = "holidays.xlsx";
    link.click();
    URL.revokeObjectURL(url);
  };

  const removeData = () => {
    if (selectedIds.length === 0) {
      alert("Please select at least one holiday to delete.");
      return;
    }
    if (window.confirm(`Delete ${selectedIds.length} holiday(s)?`)) {
      setHolidays(prev => prev.filter(p => !selectedIds.includes(p.id)));
      setSelectedIds([]);
    }
  };

  const handleCheckboxChange = (id: number) => {
    setSelectedIds(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const handleSelectAll = (checked: boolean) => {
    setSelectedIds(checked ? holidays.map(p => p.id) : []);
  };

  useEffect(() => {
    const selectAllCheckbox = document.getElementById("selectAll") as HTMLInputElement;
    if (selectAllCheckbox) {
      selectAllCheckbox.indeterminate =
        selectedIds.length > 0 && selectedIds.length < holidays.length;
    }
  }, [selectedIds, holidays]);

  const checkboxItems = [
    { label: "Checkbox", checked: true },
    { label: "Holiday Name", checked: true },
    { label: "Shift", checked: true },
    { label: "Date", checked: true },
    { label: "Location", checked: true },
    { label: "Holiday Type", checked: true },
    { label: "Created By", checked: true },
    { label: "Creation Date", checked: true },
    { label: "Approval Status", checked: true },
    { label: "Details", checked: true },
    { label: "Actions", checked: true },
  ];

  const deleteHoliday = (id: number) => {
    if (window.confirm("Are you sure you want to delete this holiday?")) {
      setHolidays(prev => prev.filter(r => r.id !== id));
    }
  };

  const handleAddClick = () => {
    setModalMode('add');
    setEditingHoliday(null);
    setIsModalOpen(true);
  };

  const handleEditClick = (holiday: Holiday) => {
    setModalMode('edit');
    setEditingHoliday(holiday);
    setIsModalOpen(true);
  };

  const handleModalSubmit = (holidayData: Omit<Holiday, 'id'>) => {
    if (modalMode === 'add') {
      const newHoliday: Holiday = {
        ...holidayData,
        id: Math.max(...holidays.map(h => h.id), 0) + 1
      };
      setHolidays(prev => [...prev, newHoliday]);
      alert("Holiday added successfully!");
    } else if (modalMode === 'edit' && editingHoliday) {
      setHolidays(prev =>
        prev.map(r => r.id === editingHoliday.id ? { ...holidayData, id: editingHoliday.id } : r)
      );
      alert("Holiday updated successfully!");
    }
    setIsModalOpen(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Approved':
        return 'bg-green-100 text-green-800';
      case 'Rejected':
        return 'bg-orange-100 text-orange-800';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric'
    });
  };

  return (
    <>
      <div className='px-4 sm:px-6 py-[20px] mt-0'>
        <div className="flex items-center justify-between relative top-[-5px]">
          <div className="flex items-center flex-wrap space-x-2">
            <h1 className="text-[20px] font-semibold">All Holiday</h1>
            <span className="text-[20px] font-bold">›</span>
            <Home size={18} />
            <span>›</span>
            <span className="text-sm">HR</span>
            <span>›</span>
            <span className="text-sm">All Holiday</span>
          </div>
        </div>

        <div className="h-auto mt-3">
          <div className="max-w-full">
            <div className="bg-[#e8eaf6] rounded-t-xl shadow-md overflow-hidden">
              {/* Header */}
              <div className="pr-[15px] pl-[20px] py-[8px] border-b border-gray-200 flex max-[390px]:gap-2 items-center flex-wrap">
                <div className='flex items-center flex-[35%]'>
                  <h1 className="m-0 text-[17px] leading-[28px] pr-[10px] font-medium">Holidays</h1>
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
                  {holidays.length === 0 ? (
                    <div className="p-8 text-center text-gray-500">No holiday records found</div>
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
                            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Holiday Name</th>
                            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Shift</th>
                            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Date</th>
                            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Location</th>
                            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Holiday Type</th>
                            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Created By</th>
                            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Creation Date</th>
                            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Approval Status</th>
                            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Details</th>
                            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Actions</th>
                          </tr>
                        </thead>

                        <tbody className={`bg-white divide-y divide-gray-200 transition-all duration-500 ${animate ? "animate-slideDown" : ""}`}>
                          {holidays.map((item) => (
                            <tr key={item.id} className="transition-colors duration-150 hover:bg-gray-50">
                              <td className="px-4 py-3 pl-[37px]">
                                <input
                                  type="checkbox"
                                  checked={selectedIds.includes(item.id)}
                                  onChange={() => handleCheckboxChange(item.id)}
                                  className="h-[18px] w-[18px] rounded-[2px] border-[2px] border-[#1a1b1f]"
                                />
                              </td>

                              <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">{item.holidayName}</td>
                              <td className="px-4 py-3 text-sm text-gray-900">{item.shift}</td>
                              <td className="px-4 py-3 text-sm text-gray-900">{formatDate(item.date)}</td>
                              <td className="px-4 py-3 text-sm text-gray-900">{item.location}</td>
                              <td className="px-4 py-3 text-sm text-gray-900">{item.holidayType}</td>
                              <td className="px-4 py-3 text-sm text-gray-900">{item.createdBy}</td>
                              <td className="px-4 py-3 text-sm text-gray-900">{formatDate(item.creationDate)}</td>
                              <td className="px-4 py-3 whitespace-nowrap">
                                <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(item.approvalStatus)}`}>
                                  {item.approvalStatus}
                                </span>
                              </td>
                              <td className="px-4 py-3 text-sm text-gray-900 max-w-xs truncate">{item.details}</td>

                              <td className="px-4 py-3 text-sm font-medium">
                                <div className="flex space-x-2">
                                  <button onClick={() => handleEditClick(item)} className="text-[#6777ef] hover:bg-[#E0E1E3] p-1 rounded-full cursor-pointer" title="Edit">
                                    <Edit className="w-5 h-5" />
                                  </button>
                                  <button onClick={() => deleteHoliday(item.id)} className="text-[#ff5200] hover:bg-[#E0E1E3] p-1 rounded-full cursor-pointer" title="Delete">
                                    <Trash2 className="w-5 h-5" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>

                      <div className={`px-4 md:hidden shadow-sm bg-white transition-all duration-500 ${animate ? "animate-slideDown" : ""}`}>
                        {holidays.map((item) => (
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

                            {/* Holiday Info */}
                            <div className="text-sm text-gray-800">
                              <div className="flex items-center h-13 space-x-3 border-b border-[#dadada] gap-4 py-3">
                                <span className="font-semibold w-40">Holiday Name:</span>
                                <span className="ml-1 font-medium">{item.holidayName}</span>
                              </div>

                              <div className="flex items-center h-13 space-x-3 border-b border-[#dadada] gap-4">
                                <span className="font-semibold w-40">Shift:</span>
                                <span className="ml-1">{item.shift}</span>
                              </div>

                              <div className="flex items-center h-13 space-x-3 border-b border-[#dadada] gap-4">
                                <span className="font-semibold w-40">Date:</span>
                                <span className="ml-1">{formatDate(item.date)}</span>
                              </div>

                              <div className="flex items-center h-13 space-x-3 border-b border-[#dadada] gap-4">
                                <span className="font-semibold w-40">Location:</span>
                                <span className="ml-1">{item.location}</span>
                              </div>

                              <div className="flex items-center h-13 space-x-3 border-b border-[#dadada] gap-4">
                                <span className="font-semibold w-40">Holiday Type:</span>
                                <span className="ml-1">{item.holidayType}</span>
                              </div>

                              <div className="flex items-center h-13 space-x-3 border-b border-[#dadada] gap-4">
                                <span className="font-semibold w-40">Created By:</span>
                                <span className="ml-1">{item.createdBy}</span>
                              </div>

                              <div className="flex items-center h-13 space-x-3 border-b border-[#dadada] gap-4">
                                <span className="font-semibold w-40">Creation Date:</span>
                                <span className="ml-1">{formatDate(item.creationDate)}</span>
                              </div>

                              <div className="flex items-center h-13 space-x-3 border-b border-[#dadada] gap-4">
                                <span className="font-semibold w-40">Approval Status:</span>
                                <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(item.approvalStatus)}`}>
                                  {item.approvalStatus}
                                </span>
                              </div>

                              <div className="flex items-center h-13 space-x-3 border-b border-[#dadada] gap-4">
                                <span className="font-semibold w-40">Details:</span>
                                <span className="ml-1">{item.details}</span>
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
                                    onClick={() => deleteHoliday(item.id)}
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
          <Paginator totalItems={holidays.length} />
        </div>
      </div>

      {/* Reusable Modal */}
      <HolidayModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        mode={modalMode}
        holiday={editingHoliday}
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