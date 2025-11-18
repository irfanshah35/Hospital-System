'use client';

import { CirclePlus, Download, Home, RotateCw, Trash2, Edit, Phone, MapPin, User, Receipt, Calendar, Car } from 'lucide-react';
import React, { useEffect, useState, useRef } from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

interface Ambulance {
  id: string;
  vehicleNumber: string;
  vehicleName: string;
  yearMade: string;
  driverName: string;
  driverLicenseNumber: string;
  driverNumber: string;
  vehicleType: string;
}

export default function AmbulanceListPage() {
  const [detailDropdown, setDetailDropdown] = useState(false);
  const detailref = useRef<HTMLDivElement | null>(null);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [ambulances, setAmbulances] = useState<Ambulance[]>([]);
  const [animate, setAnimate] = useState(false);
  const [loading, setLoading] = useState(true);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAmbulance, setEditingAmbulance] = useState<Ambulance | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);

  // Sample data for ambulances
  const sampleAmbulances: Ambulance[] = [
    {
      id: "1",
      vehicleNumber: "GJ88KW7845",
      vehicleName: "Toyota Innova",
      yearMade: "2009",
      driverName: "Ramona Freeman",
      driverLicenseNumber: "GT6456345645",
      driverNumber: "1234567890",
      vehicleType: "Contractual"
    },
    {
      id: "2",
      vehicleNumber: "GJ88KW7846",
      vehicleName: "Mahindra Bolero",
      yearMade: "2015",
      driverName: "John Smith",
      driverLicenseNumber: "GT6456345646",
      driverNumber: "1234567891",
      vehicleType: "Permanent"
    }
  ];

  // Fetch data from API
  const fetchAmbulances = async () => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setAmbulances(sampleAmbulances);
    } catch (error) {
      console.error("Failed to fetch ambulances:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAmbulances();
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
    fetchAmbulances().then(() => {
      setTimeout(() => setAnimate(false), 300);
    });
  };

  const handleDownloadXLSX = () => {
    const worksheet = XLSX.utils.json_to_sheet(
      ambulances.map((item) => ({
        "ID": item.id,
        "Vehicle Number": item.vehicleNumber,
        "Vehicle Name": item.vehicleName,
        "Year Made": item.yearMade,
        "Driver Name": item.driverName,
        "Driver License Number": item.driverLicenseNumber,
        "Driver Number": item.driverNumber,
        "Vehicle Type": item.vehicleType,
      }))
    );

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Ambulances");
    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(blob, "ambulances.xlsx");
  };

  const removeData = (id: string) => {
    if (window.confirm("Are you sure you want to delete this ambulance record?")) {
      try {
        setAmbulances(prev => prev.filter(ambulance => ambulance.id !== id));
        setSelectedIds(prev => prev.filter(selectedId => selectedId !== id));
      } catch (error) {
        console.error("Delete error:", error);
        alert("Error deleting ambulance record");
      }
    }
  };

  const handleDeleteSelected = async () => {
    if (selectedIds.length === 0) {
      alert("Please select at least one ambulance record to delete.");
      return;
    }
    if (window.confirm(`Delete ${selectedIds.length} ambulance record(s)?`)) {
      try {
        setAmbulances(prev => prev.filter(ambulance => !selectedIds.includes(ambulance.id)));
        setSelectedIds([]);
      } catch (error) {
        console.error("Delete error:", error);
        alert("Error deleting ambulance records");
      }
    }
  };

  const handleAddClick = () => {
    setEditingAmbulance({
      id: '',
      vehicleNumber: '',
      vehicleName: '',
      yearMade: new Date().getFullYear().toString(),
      driverName: '',
      driverLicenseNumber: '',
      driverNumber: '',
      vehicleType: 'Contractual'
    });
    setIsEditMode(false);
    setIsModalOpen(true);
  };

  const handleEditClick = (ambulance: Ambulance) => {
    setEditingAmbulance(ambulance);
    setIsEditMode(true);
    setIsModalOpen(true);
  };

  const handleModalSubmit = (formData: Ambulance) => {
    if (isEditMode && editingAmbulance?.id) {
      // Edit existing record
      setAmbulances(prev =>
        prev.map(ambulance =>
          ambulance.id === editingAmbulance.id ? { ...formData, id: editingAmbulance.id } : ambulance
        )
      );
    } else {
      // Add new record
      const newAmbulance = {
        ...formData,
        id: Math.random().toString(36).substr(2, 9)
      };
      setAmbulances(prev => [...prev, newAmbulance]);
    }
    setIsModalOpen(false);
    setEditingAmbulance(null);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditingAmbulance(null);
  };

  const handleCheckboxChange = (id: string) => {
    setSelectedIds(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const handleSelectAll = (checked: boolean) => {
    setSelectedIds(checked ? ambulances.map(ambulance => ambulance.id) : []);
  };

  useEffect(() => {
    const selectAllCheckbox = document.getElementById("selectAll") as HTMLInputElement;
    if (selectAllCheckbox) {
      selectAllCheckbox.indeterminate =
        selectedIds.length > 0 && selectedIds.length < ambulances.length;
    }
  }, [selectedIds, ambulances]);

  const checkboxItems = [
    { label: "Checkbox", checked: true },
    { label: "ID", checked: true },
    { label: "Vehicle Number", checked: true },
    { label: "Vehicle Name", checked: true },
    { label: "Year Made", checked: true },
    { label: "Driver Name", checked: true },
    { label: "Driver License Number", checked: true },
    { label: "Driver Number", checked: true },
    { label: "Vehicle Type", checked: true },
    { label: "Actions", checked: true },
  ];

  return (
    <>
      <div className='px-4 sm:px-6 py-[20px] mt-0'>
        <div className="flex items-center justify-between relative top-[-5px]">
          <div className="flex items-center flex-wrap space-x-2">
            <h1 className="text-[20px] font-semibold">Ambulance List</h1>
            <span className="text-[20px] font-bold">›</span>
            <Home size={18} />
            <span>›</span>
            <span className="text-sm">Ambulance</span>
            <span>›</span>
            <span className="text-sm">Ambulance List</span>
          </div>
        </div>

        <div className="h-auto mt-3">
          <div className="max-w-full">
            <div className="bg-[var(--tableHeaderBg)] rounded-t-xl shadow-md overflow-hidden">
              {/* Header */}
              <div className="pr-[15px] pl-[20px] py-[8px] border-b border-gray-200 flex max-[390px]:gap-2 items-center flex-wrap">
                <div className='flex items-center flex-[35%]'>
                  <h1 className="m-0 text-[17px] leading-[28px] pr-[10px] font-medium">Ambulance List</h1>
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
                      onClick={handleDeleteSelected}
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
                    title="Add New Ambulance"
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
                    <div className="p-8 text-center text-gray-500">Loading ambulances...</div>
                  ) : ambulances.length === 0 ? (
                    <div className="p-8 text-center text-gray-500">No ambulances found</div>
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
                            <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">ID</th>
                            <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Vehicle Number</th>
                            <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Vehicle Name</th>
                            <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Year Made</th>
                            <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Driver Name</th>
                            <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Driver License Number</th>
                            <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Driver Number</th>
                            <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Vehicle Type</th>
                            <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Actions</th>
                          </tr>
                        </thead>

                        <tbody className={`bg-white divide-y divide-gray-200 transition-all duration-500 ${animate ? "animate-slideDown" : ""}`}>
                          {ambulances.map((item) => (
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
                                <div className="text-sm font-medium text-gray-900">
                                  {item.id}
                                </div>
                              </td>

                              <td className="px-4 py-3 whitespace-nowrap">
                                <div className="flex items-center">
                                  <div className="h-[30px] w-[30px] rounded-full bg-gray-200 border-2 border-dashed border-gray-400" />
                                  <div className="ml-4">
                                    <div className="text-sm font-medium text-gray-900">
                                      {item.vehicleNumber}
                                    </div>
                                  </div>
                                </div>
                              </td>

                              <td className="px-4 py-3 text-sm whitespace-nowrap">
                                {item.vehicleName}
                              </td>

                              <td className="px-4 py-3 whitespace-nowrap">
                                <span className={`px-[10px] py-[2px] inline-flex text-xs leading-5 font-semibold rounded-[6px] bg-[#19875426] text-[#198754]`}>
                                  {item.yearMade}
                                </span>
                              </td>

                              <td className="px-4 py-3 text-sm whitespace-nowrap">
                                {item.driverName}
                              </td>

                              <td className="px-4 py-3 text-sm whitespace-nowrap">
                                {item.driverLicenseNumber}
                              </td>

                              <td className="px-4 py-3 text-sm whitespace-nowrap">
                                <div className="flex items-center">
                                  <Phone className="w-4 h-4 mr-1 text-gray-500" />
                                  {item.driverNumber}
                                </div>
                              </td>

                              <td className="px-4 py-3 text-sm whitespace-nowrap">
                                <span className={`px-[10px] py-[2px] inline-flex text-xs leading-5 font-semibold rounded-[6px] ${item.vehicleType === "Contractual" ? "bg-[#6f42c126] text-[#6f42c1]" : "bg-[#19875426] text-[#198754]"}`}>
                                  {item.vehicleType}
                                </span>
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
                                    onClick={() => removeData(item.id)}
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
                      <div className={`px-6 md:hidden shadow-sm bg-white transition-all duration-500 ${animate ? "animate-slideDown" : ""}`}>
                        {ambulances.map((item) => (
                          <div key={item.id} className="border-b border-gray-200 py-4">
                            <div className="flex items-center h-13 justify-start py-2 border-b border-[#dadada]">
                              <input
                                checked={selectedIds.includes(item.id)}
                                onChange={() => handleCheckboxChange(item.id)}
                                type="checkbox" className="w-4 h-4 text-blue-600 rounded" />
                            </div>
                            <div className="text-sm text-gray-800">
                              <div className="flex items-center h-13 space-x-3 border-b border-[#dadada] gap-4">
                                <span className="font-semibold">ID:</span>
                                <div className='flex items-center'>
                                  <Receipt className='w-5 h-5 text-blue-500' />
                                  <span className="ml-1">{item.id}</span>
                                </div>
                              </div>
                              <div className="flex items-center h-13 space-x-3 border-b border-[#dadada] gap-4">
                                <span className="font-semibold">Vehicle Number:</span>
                                <div className='flex items-center'>
                                  <Car className='w-5 h-5 text-green-500' />
                                  <span className="ml-1">{item.vehicleNumber}</span>
                                </div>
                              </div>
                              <div className="flex items-center h-13 space-x-3 border-b border-[#dadada] gap-4">
                                <span className="font-semibold">Vehicle Name:</span>
                                <div className='flex items-center'>
                                  <span className="ml-1">{item.vehicleName}</span>
                                </div>
                              </div>
                              <div className="flex items-center h-13 space-x-3 border-b border-[#dadada] gap-4">
                                <span className="font-semibold">Year Made:</span>
                                <div className='flex items-center'>
                                  <Calendar className='w-5 h-5 text-purple-500' />
                                  <span className="ml-1">{item.yearMade}</span>
                                </div>
                              </div>
                              <div className="flex items-center h-13 space-x-3 border-b border-[#dadada] gap-4">
                                <span className="font-semibold">Driver Name:</span>
                                <div className='flex items-center'>
                                  <User className='w-5 h-5 text-red-500' />
                                  <span className="ml-1">{item.driverName}</span>
                                </div>
                              </div>
                              <div className="flex items-center h-13 space-x-3 border-b border-[#dadada] gap-4">
                                <span className="font-semibold">Driver License Number:</span>
                                <div className='flex items-center'>
                                  <Receipt className='w-5 h-5 text-orange-500' />
                                  <span className="ml-1">{item.driverLicenseNumber}</span>
                                </div>
                              </div>
                              <div className="flex items-center h-13 space-x-3 border-b border-[#dadada] gap-4">
                                <span className="font-semibold">Driver Number:</span>
                                <div className='flex items-center'>
                                  <Phone className='w-5 h-5 text-green-500' />
                                  <span className="ml-1">{item.driverNumber}</span>
                                </div>
                              </div>
                              <div className="flex items-center h-13 space-x-3 border-b border-[#dadada] gap-4">
                                <span className="font-semibold">Vehicle Type:</span>
                                <div className='flex items-center'>
                                  <span className={`px-2 py-1 rounded-full text-xs ${item.vehicleType === "Contractual" ? "bg-purple-100 text-purple-800" : "bg-green-100 text-green-800"}`}>
                                    {item.vehicleType}
                                  </span>
                                </div>
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
                                    onClick={() => removeData(item.id)}
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
          <Paginator totalItems={ambulances.length} />
        </div>
      </div>

      {/* Ambulance Modal */}
      {isModalOpen && (
        <AmbulanceModal
          isOpen={isModalOpen}
          onClose={handleModalClose}
          onSubmit={handleModalSubmit}
          initialData={editingAmbulance}
          isEditMode={isEditMode}
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

// Reusable Floating Input Components
function FloatingInput({ label, name, value, onChange, type = "text", icon: Icon, required = false, error }: any) {
  return (
    <div className="relative">
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder=" "
        required={required}
        className={`peer w-full rounded-md border bg-white px-3 pt-4 pb-4 text-xs md:text-sm focus:border-blue-600 focus:ring-2 focus:ring-blue-600 outline-none transition-all  ${error ? 'border-red-500' : 'border-gray-300'}`}
      />
      <label className={`absolute left-3 px-1 bg-white transition-all duration-200 text-xs md:text-sm ${value ? "-top-2 text-xs text-blue-600" : "top-3.5 text-gray-500"} peer-focus:-top-2 peer-focus:text-xs peer-focus:text-blue-600`}>
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {Icon && <Icon className="absolute top-3.5 right-3 w-4 h-4 md:w-5 md:h-5 text-gray-500" />}
      {error && <span className="text-red-500 text-xs mt-1 block">{error}</span>}
    </div>
  )
}

function FloatingSelect({ label, name, value, onChange, options, required = false, error }: any) {
  return (
    <div className="relative">
      <select
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className={`peer w-full rounded-md border bg-white px-3 pt-4 pb-4 text-xs md:text-sm focus:border-blue-600 focus:ring-2 focus:ring-blue-600 outline-none transition-all appearance-none ${error ? 'border-red-500' : 'border-gray-300'}`}
      >
        <option value="">Select {label}</option>
        {options.map((option: string) => (
          <option key={option} value={option}>{option}</option>
        ))}
      </select>
      <label className={`absolute left-3 px-1 bg-white transition-all duration-200 text-xs md:text-sm ${value ? "-top-2 text-xs text-blue-600" : "top-3.5 text-gray-500"} peer-focus:-top-2 peer-focus:text-xs peer-focus:text-blue-600`}>
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="absolute right-3 top-3.5 pointer-events-none">
        <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
      {error && <span className="text-red-500 text-xs mt-1 block">{error}</span>}
    </div>
  )
}

// Modal Component
interface AmbulanceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (formData: Ambulance) => void;
  initialData?: Ambulance | null;
  isEditMode?: boolean;
}

const AmbulanceModal: React.FC<AmbulanceModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  isEditMode = false
}) => {
  const [formData, setFormData] = useState<Ambulance>({
    id: '',
    vehicleNumber: '',
    vehicleName: '',
    yearMade: new Date().getFullYear().toString(),
    driverName: '',
    driverLicenseNumber: '',
    driverNumber: '',
    vehicleType: 'Contractual'
  });

  const modalRef = useRef<HTMLDivElement>(null);

  const isFormValid =
    formData.vehicleNumber.trim() !== '' &&
    formData.vehicleName.trim() !== '' &&
    formData.yearMade.trim() !== '' &&
    formData.driverName.trim() !== '' &&
    formData.driverLicenseNumber.trim() !== '' &&
    formData.driverNumber.trim() !== '' &&
    formData.vehicleType.trim() !== '';

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      // Reset form when adding new
      setFormData({
        id: '',
        vehicleNumber: '',
        vehicleName: '',
        yearMade: new Date().getFullYear().toString(),
        driverName: '',
        driverLicenseNumber: '',
        driverNumber: '',
        vehicleType: 'Contractual'
      });
    }
  }, [initialData, isOpen]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
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
      <div ref={modalRef} className="bg-white rounded-lg shadow-lg w-full max-w-[646.8px] mx-4 max-h-[80vh] overflow-hidden">
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
            <h2 className="font-semibold leading-[35px]">
              {isEditMode ? 'Edit Ambulance' : 'New Ambulance'}
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
        <div className="py-5 px-6 max-h-[65vh] overflow-y-auto scrollbar-hide">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Vehicle Number */}
              <FloatingInput
                label="Vehicle Number"
                name="vehicleNumber"
                value={formData.vehicleNumber}
                onChange={handleInputChange}
                icon={Car}
                required
              />

              {/* Vehicle Name */}
              <FloatingInput
                label="Vehicle Name"
                name="vehicleName"
                value={formData.vehicleName}
                onChange={handleInputChange}
                icon={Car}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Year Made */}
              <FloatingInput
                label="Year Made"
                name="yearMade"
                value={formData.yearMade}
                onChange={handleInputChange}
                type="number"
                icon={Calendar}
                required
              />

              {/* Driver Name */}
              <FloatingInput
                label="Driver Name"
                name="driverName"
                value={formData.driverName}
                onChange={handleInputChange}
                icon={User}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Driver License Number */}
              <FloatingInput
                label="Driver License Number"
                name="driverLicenseNumber"
                value={formData.driverLicenseNumber}
                onChange={handleInputChange}
                icon={Receipt}
                required
              />

              {/* Driver Number */}
              <FloatingInput
                label="Driver Number"
                name="driverNumber"
                value={formData.driverNumber}
                onChange={handleInputChange}
                icon={Phone}
                type="tel"
                required
              />
            </div>

            {/* Vehicle Type */}
            <FloatingSelect
              label="Vehicle Type"
              name="vehicleType"
              value={formData.vehicleType}
              onChange={handleInputChange}
              options={['Contractual', 'Owned',]}
              required
            />

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