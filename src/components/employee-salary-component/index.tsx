'use client';

import { CirclePlus, Download, Home, RotateCw, Trash2, Edit, Mail } from 'lucide-react';
import React, { useState, useRef, useEffect } from "react";
import * as XLSX from "xlsx";

interface EmployeeSalary {
  id: number;
  employeeName: string;
  avatar: string;
  email: string;
  department: string;
  salary: number;
  bonus: number;
  deductions: number;
  netSalary: number;
}

export default function EmployeeSalaryComponent() {
  const [detailDropdown, setDetailDropdown] = useState(false);
  const detailref = useRef<HTMLDivElement | null>(null);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [animate, setAnimate] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingSalary, setEditingSalary] = useState<EmployeeSalary | null>(null);

  const [employeeSalaries, setEmployeeSalaries] = useState<EmployeeSalary[]>([
    {
      id: 1,
      employeeName: "John Doe",
      avatar: "https://i.pravatar.cc/150?img=1",
      email: "test@example.com",
      department: "Cardiology",
      salary: 2574,
      bonus: 200,
      deductions: 100,
      netSalary: 2674
    },
    {
      id: 2,
      employeeName: "Sarah Smith",
      avatar: "https://i.pravatar.cc/150?img=2",
      email: "test@example.com",
      department: "Emergency",
      salary: 3587,
      bonus: 300,
      deductions: 150,
      netSalary: 3737
    },
    {
      id: 3,
      employeeName: "Rajesh",
      avatar: "https://i.pravatar.cc/150?img=3",
      email: "test@example.com",
      department: "Orthopedics",
      salary: 7897,
      bonus: 500,
      deductions: 200,
      netSalary: 8197
    },
    {
      id: 4,
      employeeName: "Jay Soni",
      avatar: "https://i.pravatar.cc/150?img=4",
      email: "test@example.com",
      department: "Surgery",
      salary: 2697,
      bonus: 150,
      deductions: 80,
      netSalary: 2767
    },
    {
      id: 5,
      employeeName: "Rajesh",
      avatar: "https://i.pravatar.cc/150?img=5",
      email: "test@example.com",
      department: "Pathology",
      salary: 6587,
      bonus: 400,
      deductions: 200,
      netSalary: 6787
    },
    {
      id: 6,
      employeeName: "John Doe",
      avatar: "https://i.pravatar.cc/150?img=6",
      email: "test@example.com",
      department: "Neurology",
      salary: 8256,
      bonus: 600,
      deductions: 250,
      netSalary: 8606
    },
    {
      id: 7,
      employeeName: "Cara Stevens",
      avatar: "https://i.pravatar.cc/150?img=7",
      email: "test@example.com",
      department: "Pediatrics",
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
        "Employee Name": item.employeeName,
        "Email": item.email,
        "Department": item.department,
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
    { label: "Employee Name", checked: true },
    { label: "Email", checked: true },
    { label: "Department", checked: true },
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

  const handleEditClick = (salary: EmployeeSalary) => {
    setEditingSalary(salary);
    setIsEditModalOpen(true);
  };

  const handleUpdateSalary = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingSalary) {
      const updatedSalary = {
        ...editingSalary,
        netSalary: editingSalary.salary + editingSalary.bonus - editingSalary.deductions
      };
      setEmployeeSalaries(prev =>
        prev.map(r => (r.id === updatedSalary.id ? updatedSalary : r))
      );
      setIsEditModalOpen(false);
      alert("Employee salary updated successfully!");
    }
  };

  const handleDownloadPayslip = (employee: EmployeeSalary) => {
    alert(`Downloading payslip for ${employee.employeeName}`);
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
                            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Employee Name</th>
                            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Email</th>
                            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Department</th>
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
                                  <button onClick={() => handleEditClick(item)} className="text-[#6777ef] hover:bg-[#E0E1E3] p-1 rounded-full cursor-pointer" title="Edit">
                                    <Edit className="w-5 h-5" />
                                  </button>
                                  <button onClick={() => deleteSalary(item.id)} className="text-[#ff5200] hover:bg-[#E0E1E3] p-1 rounded-full cursor-pointer" title="Delete">
                                    <Trash2 className="w-5 h-5" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>

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

      {isEditModalOpen && editingSalary && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999]">
          <div className="bg-white rounded-lg shadow-lg w-[700px] max-w-[90%]">
            <div className="flex items-center justify-between border-b !border-gray-300 px-5 py-3">
              <div className="flex items-center space-x-3">
                <img className="w-10 h-10 rounded-full object-cover" src={editingSalary.avatar} alt={editingSalary.employeeName} />
                <h2 className="text-lg font-semibold">
                  Edit Salary - {editingSalary.employeeName}
                </h2>
              </div>
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="text-gray-600 hover:text-gray-900 text-xl font-bold"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleUpdateSalary} className="p-6 space-y-6 max-h-[500px] overflow-y-auto scrollbar-hide">
              <div className="grid grid-cols-2 gap-4">
                <div className="relative col-span-2">
                  <input
                    type="text"
                    id="employeeName"
                    value={editingSalary.employeeName}
                    onChange={(e) => setEditingSalary({ ...editingSalary, employeeName: e.target.value })}
                    placeholder=" "
                    required
                    className="peer w-full rounded-md border bg-white px-3 pt-5 pb-2 text-sm text-gray-800 focus:border-[#005CBB] focus:ring-2 focus:ring-[#005CBB] outline-none transition-all"
                  />
                  <label htmlFor="employeeName" className="absolute left-3 px-[4px] bg-white -top-2 text-xs text-[#005CBB]">
                    Employee Name*
                  </label>
                </div>

                <div className="relative col-span-2">
                  <input
                    type="email"
                    id="email"
                    value={editingSalary.email}
                    onChange={(e) => setEditingSalary({ ...editingSalary, email: e.target.value })}
                    placeholder=" "
                    required
                    className="peer w-full rounded-md border bg-white px-3 pt-5 pb-2 text-sm text-gray-800 focus:border-[#005CBB] focus:ring-2 focus:ring-[#005CBB] outline-none transition-all"
                  />
                  <label htmlFor="email" className="absolute left-3 px-[4px] bg-white -top-2 text-xs text-[#005CBB]">
                    Email*
                  </label>
                </div>

                <div className="relative col-span-2">
                  <input
                    type="text"
                    id="department"
                    value={editingSalary.department}
                    onChange={(e) => setEditingSalary({ ...editingSalary, department: e.target.value })}
                    placeholder=" "
                    required
                    className="peer w-full rounded-md border bg-white px-3 pt-5 pb-2 text-sm text-gray-800 focus:border-[#005CBB] focus:ring-2 focus:ring-[#005CBB] outline-none transition-all"
                  />
                  <label htmlFor="department" className="absolute left-3 px-[4px] bg-white -top-2 text-xs text-[#005CBB]">
                    Department*
                  </label>
                </div>

                <div className="relative">
                  <input
                    type="number"
                    id="salary"
                    value={editingSalary.salary}
                    onChange={(e) => setEditingSalary({ ...editingSalary, salary: parseInt(e.target.value) })}
                    placeholder=" "
                    required
                    className="peer w-full rounded-md border bg-white px-3 pt-5 pb-2 text-sm text-gray-800 focus:border-[#005CBB] focus:ring-2 focus:ring-[#005CBB] outline-none transition-all"
                  />
                  <label htmlFor="salary" className="absolute left-3 px-[4px] bg-white -top-2 text-xs text-[#005CBB]">
                    Salary*
                  </label>
                </div>

                <div className="relative">
                  <input
                    type="number"
                    id="bonus"
                    value={editingSalary.bonus}
                    onChange={(e) => setEditingSalary({ ...editingSalary, bonus: parseInt(e.target.value) })}
                    placeholder=" "
                    required
                    className="peer w-full rounded-md border bg-white px-3 pt-5 pb-2 text-sm text-gray-800 focus:border-[#005CBB] focus:ring-2 focus:ring-[#005CBB] outline-none transition-all"
                  />
                  <label htmlFor="bonus" className="absolute left-3 px-[4px] bg-white -top-2 text-xs text-[#005CBB]">
                    Bonus*
                  </label>
                </div>

                <div className="relative">
                  <input
                    type="number"
                    id="deductions"
                    value={editingSalary.deductions}
                    onChange={(e) => setEditingSalary({ ...editingSalary, deductions: parseInt(e.target.value) })}
                    placeholder=" "
                    required
                    className="peer w-full rounded-md border bg-white px-3 pt-5 pb-2 text-sm text-gray-800 focus:border-[#005CBB] focus:ring-2 focus:ring-[#005CBB] outline-none transition-all"
                  />
                  <label htmlFor="deductions" className="absolute left-3 px-[4px] bg-white -top-2 text-xs text-[#005CBB]">
                    Deductions*
                  </label>
                </div>

                <div className="relative">
                  <input
                    type="number"
                    id="netSalary"
                    value={editingSalary.salary + editingSalary.bonus - editingSalary.deductions}
                    readOnly
                    className="peer w-full rounded-md border bg-gray-100 px-3 pt-5 pb-2 text-sm text-gray-800 outline-none"
                  />
                  <label htmlFor="netSalary" className="absolute left-3 px-[4px] bg-gray-100 -top-2 text-xs text-gray-600">
                    Net Salary (Auto-calculated)
                  </label>
                </div>
              </div>

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