'use client';

import { CirclePlus, Download, Home, RotateCw, Trash2, Edit, Mail, User } from 'lucide-react';
import React, { useState, useRef, useEffect } from "react";
import * as XLSX from "xlsx";

interface EmployeeSalary {
  id: number;
  employeeId: string;
  employeeName: string;
  avatar: string;
  email: string;
  department: string;
  role: string;
  salary: number;
  bonus: number;
  deductions: number;
  netSalary: number;
}

// Reusable Input Component
interface ReusableInputProps {
  label: string;
  type?: "text" | "number" | "email" | "password";
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
        <option value="">Select {label}</option>
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

// Employee Salary Modal Component
interface EmployeeSalaryModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: 'add' | 'edit';
  salary?: EmployeeSalary | null;
  onSubmit: (salary: Omit<EmployeeSalary, 'id'>) => void;
}

const EmployeeSalaryModal: React.FC<EmployeeSalaryModalProps> = ({
  isOpen,
  onClose,
  mode,
  salary,
  onSubmit
}) => {
  const [formData, setFormData] = useState<Omit<EmployeeSalary, 'id'>>({
    employeeId: '',
    employeeName: '',
    avatar: 'https://i.pravatar.cc/150?img=8',
    email: '',
    department: '',
    role: '',
    salary: 0,
    bonus: 0,
    deductions: 0,
    netSalary: 0
  });

  useEffect(() => {
    if (mode === 'edit' && salary) {
      const { id, ...rest } = salary;
      setFormData(rest);
    } else {
      setFormData({
        employeeId: '',
        employeeName: '',
        avatar: 'https://i.pravatar.cc/150?img=8',
        email: '',
        department: '',
        role: '',
        salary: 0,
        bonus: 0,
        deductions: 0,
        netSalary: 0
      });
    }
  }, [mode, salary, isOpen]);

  // Auto-calculate net salary whenever salary, bonus, or deductions change
  useEffect(() => {
    const netSalary = formData.salary + formData.bonus - formData.deductions;
    setFormData(prev => ({ ...prev, netSalary }));
  }, [formData.salary, formData.bonus, formData.deductions]);

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
              {mode === 'add' ? 'Add New Employee Salary' : `Edit Salary - ${salary?.employeeName}`}
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
            />

            {/* Employee ID */}
            <ReusableInput
              label="Employee ID"
              value={formData.employeeId}
              onChange={(value) => setFormData({ ...formData, employeeId: value })}
              required
            />

            {/* Email */}
            <ReusableInput
              label="Email"
              type="email"
              value={formData.email}
              onChange={(value) => setFormData({ ...formData, email: value })}
              required
              className=""
            />

            {/* Department */}
            <ReusableSelect
              label="Department"
              value={formData.department}
              onChange={(value) => setFormData({ ...formData, department: value })}
              options={[
                { value: "Cardiology", label: "Cardiology" },
                { value: "Emergency", label: "Emergency" },
                { value: "Orthopedics", label: "Orthopedics" },
                { value: "Surgery", label: "Surgery" },
                { value: "Pathology", label: "Pathology" },
                { value: "Neurology", label: "Neurology" },
                { value: "Pediatrics", label: "Pediatrics" }
              ]}
              required
            />

            {/* Role */}
            <ReusableSelect
              label="Role"
              value={formData.role}
              onChange={(value) => setFormData({ ...formData, role: value })}
              options={[
                { value: "Doctor", label: "Doctor" },
                { value: "Nurse", label: "Nurse" },
                { value: "Technician", label: "Technician" },
                { value: "Receptionist", label: "Receptionist" },
                { value: "Administrator", label: "Administrator" },
                { value: "Pharmacist", label: "Pharmacist" },
                { value: "Therapist", label: "Therapist" }
              ]}
              required
            />

            {/* Salary */}
            <ReusableInput
              label="Salary"
              type="number"
              value={formData.salary}
              onChange={(value) => setFormData({ ...formData, salary: Number(value) })}
              required
            />

            {/* Bonus */}
            <ReusableInput
              label="Bonus"
              type="number"
              value={formData.bonus}
              onChange={(value) => setFormData({ ...formData, bonus: Number(value) })}
            />

            {/* Deductions */}
            <ReusableInput
              label="Deductions"
              type="number"
              value={formData.deductions}
              onChange={(value) => setFormData({ ...formData, deductions: Number(value) })}
            />
          </div>

          {/* Submit Buttons */}
          <div className="flex gap-2 pt-3">
            <button
              type="submit"
              className="bg-[#005cbb] text-white px-6 py-2 rounded-full text-sm font-medium transition hover:bg-[#004a99]"
            >
              {mode === 'add' ? 'Add Salary' : 'Save Changes'}
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

export default function EmployeeSalaryComponent() {
  const [detailDropdown, setDetailDropdown] = useState(false);
  const detailref = useRef<HTMLDivElement | null>(null);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [animate, setAnimate] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'add' | 'edit'>('add');
  const [editingSalary, setEditingSalary] = useState<EmployeeSalary | null>(null);

  const [employeeSalaries, setEmployeeSalaries] = useState<EmployeeSalary[]>([
    {
      id: 1,
      employeeId: "EMP001",
      employeeName: "John Doe",
      avatar: "https://i.pravatar.cc/150?img=1",
      email: "john.doe@example.com",
      department: "Cardiology",
      role: "Doctor",
      salary: 2574,
      bonus: 200,
      deductions: 100,
      netSalary: 2674
    },
    {
      id: 2,
      employeeId: "EMP002",
      employeeName: "Sarah Smith",
      avatar: "https://i.pravatar.cc/150?img=2",
      email: "sarah.smith@example.com",
      department: "Emergency",
      role: "Nurse",
      salary: 3587,
      bonus: 300,
      deductions: 150,
      netSalary: 3737
    },
    {
      id: 3,
      employeeId: "EMP003",
      employeeName: "Rajesh Kumar",
      avatar: "https://i.pravatar.cc/150?img=3",
      email: "rajesh.kumar@example.com",
      department: "Orthopedics",
      role: "Doctor",
      salary: 7897,
      bonus: 500,
      deductions: 200,
      netSalary: 8197
    },
    {
      id: 4,
      employeeId: "EMP004",
      employeeName: "Jay Soni",
      avatar: "https://i.pravatar.cc/150?img=4",
      email: "jay.soni@example.com",
      department: "Surgery",
      role: "Technician",
      salary: 2697,
      bonus: 150,
      deductions: 80,
      netSalary: 2767
    },
    {
      id: 5,
      employeeId: "EMP005",
      employeeName: "Priya Patel",
      avatar: "https://i.pravatar.cc/150?img=5",
      email: "priya.patel@example.com",
      department: "Pathology",
      role: "Technician",
      salary: 6587,
      bonus: 400,
      deductions: 200,
      netSalary: 6787
    },
    {
      id: 6,
      employeeId: "EMP006",
      employeeName: "Mike Johnson",
      avatar: "https://i.pravatar.cc/150?img=6",
      email: "mike.johnson@example.com",
      department: "Neurology",
      role: "Doctor",
      salary: 8256,
      bonus: 600,
      deductions: 250,
      netSalary: 8606
    },
    {
      id: 7,
      employeeId: "EMP007",
      employeeName: "Cara Stevens",
      avatar: "https://i.pravatar.cc/150?img=7",
      email: "cara.stevens@example.com",
      department: "Pediatrics",
      role: "Nurse",
      salary: 7112,
      bonus: 350,
      deductions: 150,
      netSalary: 7312
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
      employeeSalaries.map((item) => ({
        "Employee ID": item.employeeId,
        "Employee Name": item.employeeName,
        "Email": item.email,
        "Department": item.department,
        "Role": item.role,
        "Salary": item.salary,
        "Bonus": item.bonus,
        "Deductions": item.deductions,
        "Net Salary": item.netSalary,
      }))
    );

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Employee Salary");
    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = "employee_salary.xlsx";
    link.click();
    URL.revokeObjectURL(url);
  };

  const removeData = () => {
    if (selectedIds.length === 0) {
      alert("Please select at least one employee to delete.");
      return;
    }
    if (window.confirm(`Delete ${selectedIds.length} employee(s)?`)) {
      setEmployeeSalaries(prev => prev.filter(p => !selectedIds.includes(p.id)));
      setSelectedIds([]);
    }
  };

  const handleCheckboxChange = (id: number) => {
    setSelectedIds(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const handleSelectAll = (checked: boolean) => {
    setSelectedIds(checked ? employeeSalaries.map(p => p.id) : []);
  };

  useEffect(() => {
    const selectAllCheckbox = document.getElementById("selectAll") as HTMLInputElement;
    if (selectAllCheckbox) {
      selectAllCheckbox.indeterminate =
        selectedIds.length > 0 && selectedIds.length < employeeSalaries.length;
    }
  }, [selectedIds, employeeSalaries]);

  const checkboxItems = [
    { label: "Checkbox", checked: true },
    { label: "Employee ID", checked: true },
    { label: "Employee Name", checked: true },
    { label: "Email", checked: true },
    { label: "Department", checked: true },
    { label: "Role", checked: true },
    { label: "Salary", checked: true },
    { label: "Bonus", checked: true },
    { label: "Deductions", checked: true },
    { label: "Net Salary", checked: true },
    { label: "Payslip", checked: true },
    { label: "Actions", checked: true },
  ];

  const deleteSalary = (id: number) => {
    if (window.confirm("Are you sure you want to delete this record?")) {
      setEmployeeSalaries(prev => prev.filter(r => r.id !== id));
    }
  };

  const handleAddClick = () => {
    setModalMode('add');
    setEditingSalary(null);
    setIsModalOpen(true);
  };

  const handleEditClick = (salary: EmployeeSalary) => {
    setModalMode('edit');
    setEditingSalary(salary);
    setIsModalOpen(true);
  };

  const handleModalSubmit = (salaryData: Omit<EmployeeSalary, 'id'>) => {
    if (modalMode === 'add') {
      const newSalary: EmployeeSalary = {
        ...salaryData,
        id: Math.max(...employeeSalaries.map(s => s.id), 0) + 1
      };
      setEmployeeSalaries(prev => [...prev, newSalary]);
      alert("Employee salary added successfully!");
    } else if (modalMode === 'edit' && editingSalary) {
      setEmployeeSalaries(prev =>
        prev.map(s => s.id === editingSalary.id ? { ...salaryData, id: editingSalary.id } : s)
      );
      alert("Employee salary updated successfully!");
    }
    setIsModalOpen(false);
  };

  const handleDownloadPayslip = (employee: EmployeeSalary) => {
    alert(`Downloading payslip for ${employee.employeeName}`);
    // Actual implementation would generate PDF here
  };

  return (
    <>
      <div className='px-4 sm:px-6 py-[20px] mt-0'>
        <div className="flex items-center justify-between relative top-[-5px]">
          <div className="flex items-center flex-wrap space-x-2">
            <h1 className="text-[20px] font-semibold">Employee Salary</h1>
            <span className="text-[20px] font-bold">›</span>
            <Home size={18} />
            <span>›</span>
            <span className="text-sm">Payroll</span>
            <span>›</span>
            <span className="text-sm">Employee Salary</span>
          </div>
        </div>

        <div className="h-auto mt-3">
          <div className="max-w-full">
            <div className="bg-[#e8eaf6] rounded-t-xl shadow-md overflow-hidden">
              {/* Header */}
              <div className="pr-[15px] pl-[20px] py-[8px] border-b border-gray-200 flex max-[390px]:gap-2 items-center flex-wrap">
                <div className='flex items-center flex-[35%]'>
                  <h1 className="m-0 text-[17px] leading-[28px] pr-[10px] font-medium">Employee Salary</h1>
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
                  {employeeSalaries.length === 0 ? (
                    <div className="p-8 text-center text-gray-500">No employee salary records found</div>
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
                            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Employee ID</th>
                            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Employee Name</th>
                            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Email</th>
                            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Department</th>
                            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Role</th>
                            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Salary</th>
                            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Bonus</th>
                            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Deductions</th>
                            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Net Salary</th>
                            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Payslip</th>
                            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Actions</th>
                          </tr>
                        </thead>

                        <tbody className={`bg-white divide-y divide-gray-200 transition-all duration-500 ${animate ? "animate-slideDown" : ""}`}>
                          {employeeSalaries.map((item) => (
                            <tr key={item.id} className="transition-colors duration-150 hover:bg-gray-50">
                              <td className="px-4 py-3 pl-[37px]">
                                <input
                                  type="checkbox"
                                  checked={selectedIds.includes(item.id)}
                                  onChange={() => handleCheckboxChange(item.id)}
                                  className="h-[18px] w-[18px] rounded-[2px] border-[2px] border-[#1a1b1f]"
                                />
                              </td>

                              <td className="px-4 py-3 text-sm font-medium text-gray-900">{item.employeeId}</td>

                              <td className="px-4 py-3 whitespace-nowrap">
                                <div className="flex items-center">
                                  <div className="h-[40px] w-[40px] rounded-full flex-shrink-0">
                                    <img className="h-[40px] w-[40px] rounded-full object-cover" src={item.avatar} alt={item.employeeName} />
                                  </div>
                                  <div className="ml-3">
                                    <div className="text-sm font-medium text-gray-900">{item.employeeName}</div>
                                  </div>
                                </div>
                              </td>

                              <td className="px-4 py-3 whitespace-nowrap">
                                <div className="flex items-center text-sm text-gray-900">
                                  <Mail className="w-4 h-4 mr-2 text-red-500" />
                                  {item.email}
                                </div>
                              </td>

                              <td className="px-4 py-3 text-sm text-gray-900">{item.department}</td>
                              <td className="px-4 py-3 text-sm text-gray-900">{item.role}</td>
                              <td className="px-4 py-3 text-sm text-gray-900">${item.salary.toLocaleString()}</td>
                              <td className="px-4 py-3 text-sm text-gray-900">${item.bonus}</td>
                              <td className="px-4 py-3 text-sm text-gray-900">${item.deductions}</td>
                              <td className="px-4 py-3 text-sm font-semibold text-gray-900">${item.netSalary.toLocaleString()}</td>

                              <td className="px-4 py-3">
                                <button
                                  onClick={() => handleDownloadPayslip(item)}
                                  className="text-[#4caf50] hover:bg-[#E0E1E3] p-2 rounded-full cursor-pointer"
                                  title="Download Payslip"
                                >
                                  <Download className="w-5 h-5" />
                                </button>
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
                                    onClick={() => deleteSalary(item.id)}
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
                      <div className={`px-4 md:hidden shadow-sm bg-white transition-all duration-500 ${animate ? "animate-slideDown" : ""}`}>
                        {employeeSalaries.map((item) => (
                          <div key={item.id} className="border-b border-gray-200 py-4">
                            <div className="flex items-center h-13 justify-start py-2 border-b border-[#dadada]">
                              <input
                                checked={selectedIds.includes(item.id)}
                                onChange={() => handleCheckboxChange(item.id)}
                                type="checkbox"
                                className="w-4 h-4 text-blue-600 rounded"
                              />
                            </div>

                            <div className="text-sm text-gray-800">
                              <div className="flex items-center h-13 space-x-3 border-b border-[#dadada] gap-4 py-3">
                                <span className="font-semibold w-40">Employee ID:</span>
                                <span className="font-medium">{item.employeeId}</span>
                              </div>

                              <div className="flex items-center h-13 space-x-3 border-b border-[#dadada] gap-4 py-3">
                                <span className="font-semibold w-40">Employee:</span>
                                <div className="flex items-center">
                                  <img className="w-10 h-10 rounded-full object-cover" src={item.avatar} alt={item.employeeName} />
                                  <span className="ml-2 font-medium">{item.employeeName}</span>
                                </div>
                              </div>

                              <div className="flex items-center h-13 space-x-3 border-b border-[#dadada] gap-4">
                                <span className="font-semibold w-40">Email:</span>
                                <div className="flex items-center">
                                  <Mail className="w-4 h-4 mr-2 text-red-500" />
                                  <span className="ml-1">{item.email}</span>
                                </div>
                              </div>

                              <div className="flex items-center h-13 space-x-3 border-b border-[#dadada] gap-4">
                                <span className="font-semibold w-40">Department:</span>
                                <span className="ml-1">{item.department}</span>
                              </div>

                              <div className="flex items-center h-13 space-x-3 border-b border-[#dadada] gap-4">
                                <span className="font-semibold w-40">Role:</span>
                                <span className="ml-1">{item.role}</span>
                              </div>

                              <div className="flex items-center h-13 space-x-3 border-b border-[#dadada] gap-4">
                                <span className="font-semibold w-40">Salary:</span>
                                <span className="ml-1">${item.salary.toLocaleString()}</span>
                              </div>

                              <div className="flex items-center h-13 space-x-3 border-b border-[#dadada] gap-4">
                                <span className="font-semibold w-40">Bonus:</span>
                                <span className="ml-1">${item.bonus}</span>
                              </div>

                              <div className="flex items-center h-13 space-x-3 border-b border-[#dadada] gap-4">
                                <span className="font-semibold w-40">Deductions:</span>
                                <span className="ml-1">${item.deductions}</span>
                              </div>

                              <div className="flex items-center h-13 space-x-3 border-b border-[#dadada] gap-4">
                                <span className="font-semibold w-40">Net Salary:</span>
                                <span className="ml-1 font-semibold">${item.netSalary.toLocaleString()}</span>
                              </div>

                              <div className="flex items-center h-13 space-x-3 border-b border-[#dadada] gap-4">
                                <span className="font-semibold w-40">Payslip:</span>
                                <button
                                  onClick={() => handleDownloadPayslip(item)}
                                  className="text-[#4caf50] hover:bg-[#E0E1E3] p-2 rounded-full cursor-pointer"
                                >
                                  <Download className="w-5 h-5" />
                                </button>
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
                                    onClick={() => deleteSalary(item.id)}
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
          <Paginator totalItems={employeeSalaries.length} />
        </div>
      </div>

      {/* Employee Salary Modal */}
      <EmployeeSalaryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        mode={modalMode}
        salary={editingSalary}
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