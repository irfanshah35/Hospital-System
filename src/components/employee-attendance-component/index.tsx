"use client"
import React, { useState, useRef, useEffect } from 'react';
import { Settings, Edit2, Trash2, Home, Download, RotateCw, CirclePlus, User } from 'lucide-react';

const EmployeeAttendanceComponent = () => {
  const [activeTab, setActiveTab] = useState('details');
  const [detailDropdown, setDetailDropdown] = useState(false);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [animate, setAnimate] = useState(false);
  const detailref = useRef<HTMLDivElement | null>(null);

  const attendanceData = [
    { id: 1, date: '10-02-2018', checkIn: '10:28', checkOut: '19:32', workingHours: '08:04', shift: 'Shift 1', status: 'Present', checkInColor: 'text-green-600', checkOutColor: 'text-green-600', workingHoursColor: 'text-green-600' },
    { id: 2, date: '11-02-2018', checkIn: '10:32', checkOut: '19:32', workingHours: '08:00', shift: 'Shift 1', status: 'Present', checkInColor: 'text-red-500', checkOutColor: 'text-green-600', workingHoursColor: 'text-green-600' },
    { id: 3, date: '12-02-2018', checkIn: '-', checkOut: '-', workingHours: '-', shift: 'Shift 1', status: 'Leave', checkInColor: 'text-gray-700', checkOutColor: 'text-gray-700', workingHoursColor: 'text-gray-700' },
    { id: 4, date: '13-02-2018', checkIn: '10:35', checkOut: '19:31', workingHours: '07:56', shift: 'Shift 1', status: 'Present', checkInColor: 'text-red-500', checkOutColor: 'text-green-600', workingHoursColor: 'text-red-500' },
    { id: 5, date: '14-02-2018', checkIn: '10:25', checkOut: '19:29', workingHours: '08:04', shift: 'Shift 1', status: 'Present', checkInColor: 'text-green-600', checkOutColor: 'text-red-500', workingHoursColor: 'text-green-600' },
    { id: 6, date: '15-02-2018', checkIn: '-', checkOut: '-', workingHours: '-', shift: 'Shift 1', status: 'Weekend', checkInColor: 'text-gray-700', checkOutColor: 'text-gray-700', workingHoursColor: 'text-gray-700' },
    { id: 7, date: '16-02-2018', checkIn: '-', checkOut: '-', workingHours: '-', shift: 'Shift 1', status: 'Weekend', checkInColor: 'text-gray-700', checkOutColor: 'text-gray-700', workingHoursColor: 'text-gray-700' },
    { id: 8, date: '17-02-2018', checkIn: '10:28', checkOut: '19:35', workingHours: '08:07', shift: 'Shift 1', status: 'Present', checkInColor: 'text-green-600', checkOutColor: 'text-green-600', workingHoursColor: 'text-green-600' },
  ];

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

  const handleCheckboxChange = (id: number) => {
    setSelectedIds(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const handleSelectAll = (checked: boolean) => {
    setSelectedIds(checked ? attendanceData.map(p => p.id) : []);
  };

  useEffect(() => {
    const selectAllCheckbox = document.getElementById("selectAll") as HTMLInputElement;
    if (selectAllCheckbox) {
      selectAllCheckbox.indeterminate =
        selectedIds.length > 0 && selectedIds.length < attendanceData.length;
    }
  }, [selectedIds, attendanceData]);

  const removeData = () => {
    if (selectedIds.length === 0) {
      alert("Please select at least one record to delete.");
      return;
    }
    if (window.confirm(`Delete ${selectedIds.length} record(s)?`)) {
      setSelectedIds([]);
    }
  };

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'Present':
        return 'bg-[#19875426] text-[#198754]';
      case 'Leave':
        return 'bg-[#dc354526] text-[#dc3545]';
      case 'Weekend':
        return 'bg-[#0dcaf026] text-[#0dcaf0]';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  const checkboxItems = [
    { label: "Checkbox", checked: true },
    { label: "Date", checked: true },
    { label: "Check In", checked: true },
    { label: "Check Out", checked: true },
    { label: "Working Hours", checked: true },
    { label: "Shift", checked: true },
    { label: "Status", checked: true },
    { label: "Actions", checked: true },
  ];

  return (
    <div className="min-h-screen bg-gray-100 px-4 sm:px-6 py-[20px] mt-0">
      {/* Breadcrumb */}
      <div className="flex items-center justify-between relative top-[-5px] mb-3">
        <div className="flex items-center flex-wrap space-x-2">
          <h1 className="text-[20px] font-semibold">Employee Attendance</h1>
          <span className="text-[20px] font-bold">›</span>
          <Home size={18} />
          <span>›</span>
          <span className="text-sm">Attendance</span>
          <span>›</span>
          <span className="text-sm">Employee Attendance</span>
        </div>
      </div>

      {/* Main Container */}
      <div className="h-auto mt-3">
        <div className="max-w-full">
          <div className="bg-[#f8f9fa] rounded-t-xl shadow-md overflow-hidden">
            {/* Header */}
            <div className="pr-[15px] pl-[20px] py-[8px] border-b border-gray-200 flex max-[390px]:gap-2 items-center justify-between flex-wrap">
              <h2 className="m-0 text-[17px] leading-[28px] pr-[10px] font-medium">Employee Attendance</h2>
              
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

                <button className="flex justify-center items-center w-10 h-10 rounded-full text-[#2196f3] hover:bg-[#CED5E6] transition cursor-pointer" title="Download">
                  <Download className='w-[20px] h-[20px]' />
                </button>
              </div>
            </div>

            {/* Tabs */}
            <div className="border-b border-gray-200 bg-white">
              <div className="flex w-full">
                <button
                  onClick={() => setActiveTab('details')}
                  className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                    activeTab === 'details'
                      ? 'border-blue-600 text-blue-600'
                      : 'border-transparent text-gray-600 hover:text-gray-800'
                  }`}
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                    <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
                  </svg>
                  Details
                </button>
                <button
                  onClick={() => setActiveTab('chart')}
                  className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                    activeTab === 'chart'
                      ? 'border-blue-600 text-blue-600'
                      : 'border-transparent text-gray-600 hover:text-gray-800'
                  }`}
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                  </svg>
                  Chart
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-4 sm:p-6 bg-white">
              {activeTab === 'details' ? (
                <>
                  {/* Employee Info */}
                  <div className="flex items-start gap-4 mb-6 pb-6 border-b border-gray-200">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0 overflow-hidden">
                      <User className="w-8 h-8 sm:w-10 sm:h-10 text-gray-400" />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 flex-1">
                      <div>
                        <p className="text-sm font-semibold text-gray-900 mb-0.5">Maria Smith</p>
                        <p className="text-xs text-gray-600">Gynecologist</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600 mb-0.5">Employee ID</p>
                        <p className="text-sm font-medium text-gray-900">IM062587UT</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600 mb-0.5">Joining Date</p>
                        <p className="text-sm font-medium text-gray-900">12 January 2015</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600 mb-0.5">Department</p>
                        <p className="text-sm font-medium text-gray-900">Gynecology</p>
                      </div>
                    </div>
                  </div>

                  {/* Statistics */}
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                    <div className="text-center">
                      <p className="text-2xl sm:text-3xl font-bold text-green-600 mb-1">08:00</p>
                      <p className="text-xs sm:text-sm text-gray-600">Average Working Hours</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl sm:text-3xl font-bold text-green-600 mb-1">10:30 AM</p>
                      <p className="text-xs sm:text-sm text-gray-600">Average In Time</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl sm:text-3xl font-bold text-green-600 mb-1">07:30 PM</p>
                      <p className="text-xs sm:text-sm text-gray-600">Average Out Time</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl sm:text-3xl font-bold text-green-600 mb-1">01:00</p>
                      <p className="text-xs sm:text-sm text-gray-600">Average Break Time</p>
                    </div>
                  </div>

                  {/* Attendance Table - Desktop */}
              <div className='overflow-auto scrollbar-hide'>
                <table className="min-w-full divide-y divide-gray-200 hidden md:table">
                  <thead className="bg-white">
                    <tr>
                      <th scope="col" className="px-4 py-3 pl-[20px] text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        <input
                          type="checkbox"
                          id="selectAll"
                          onChange={(e) => handleSelectAll(e.target.checked)}
                          className="h-[18px] w-[18px] rounded-[2px] border-[2px] border-[#1a1b1f]"
                        />
                      </th>
                      <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Date</th>
                      <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Check In</th>
                      <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Check Out</th>
                      <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Working Hours</th>
                      <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Shift</th>
                      <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Status</th>
                      <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>

                  <tbody className={`bg-white divide-y divide-gray-200 transition-all duration-500 ${animate ? "animate-slideDown" : ""}`}>
                    {attendanceData.map((record) => (
                      <tr key={record.id} className="transition-colors duration-150 hover:bg-gray-50">
                        <td className="px-4 py-3 pl-[20px]">
                          <input
                            type="checkbox"
                            checked={selectedIds.includes(record.id)}
                            onChange={() => handleCheckboxChange(record.id)}
                            className="h-[18px] w-[18px] rounded-[2px] border-[2px] border-[#1a1b1f]"
                          />
                        </td>
                        <td className="px-4 py-3 text-sm whitespace-nowrap text-gray-900">{record.date}</td>
                        <td className={`px-4 py-3 text-sm font-medium whitespace-nowrap ${record.checkInColor}`}>{record.checkIn}</td>
                        <td className={`px-4 py-3 text-sm font-medium whitespace-nowrap ${record.checkOutColor}`}>{record.checkOut}</td>
                        <td className={`px-4 py-3 text-sm font-medium whitespace-nowrap ${record.workingHoursColor}`}>{record.workingHours}</td>
                        <td className="px-4 py-3 text-sm whitespace-nowrap text-gray-900">{record.shift}</td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <span className={`px-[10px] py-[2px] inline-flex text-xs leading-5 font-semibold rounded-[6px] ${getStatusStyle(record.status)}`}>
                            {record.status}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-sm font-medium">
                          <div className="flex space-x-2">
                            <button className="text-[#6777ef] hover:bg-[#E0E1E3] p-1 rounded-full cursor-pointer">
                              <Edit2 className="w-5 h-5" />
                            </button>
                            <button className="text-[#ff5200] hover:bg-[#E0E1E3] p-1 rounded-full cursor-pointer">
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
                  {attendanceData.map((record) => (
                    <div key={record.id} className="border-b border-gray-200 py-4">
                      {/* Checkbox Row */}
                      <div className="flex items-center h-13 justify-start py-2 border-b border-[#dadada]">
                        <input
                          checked={selectedIds.includes(record.id)}
                          onChange={() => handleCheckboxChange(record.id)}
                          type="checkbox"
                          className="w-4 h-4 text-blue-600 rounded"
                        />
                      </div>

                      {/* Record Info */}
                      <div className="text-sm text-gray-800">
                        <div className="flex items-center h-13 space-x-3 border-b border-[#dadada] gap-4">
                          <span className="font-semibold w-32">Date:</span>
                          <span className="ml-1">{record.date}</span>
                        </div>

                        <div className="flex items-center h-13 space-x-3 border-b border-[#dadada] gap-4">
                          <span className="font-semibold w-32">Check In:</span>
                          <span className={`ml-1 font-medium ${record.checkInColor}`}>{record.checkIn}</span>
                        </div>

                        <div className="flex items-center h-13 space-x-3 border-b border-[#dadada] gap-4">
                          <span className="font-semibold w-32">Check Out:</span>
                          <span className={`ml-1 font-medium ${record.checkOutColor}`}>{record.checkOut}</span>
                        </div>

                        <div className="flex items-center h-13 space-x-3 border-b border-[#dadada] gap-4">
                          <span className="font-semibold w-32">Working Hours:</span>
                          <span className={`ml-1 font-medium ${record.workingHoursColor}`}>{record.workingHours}</span>
                        </div>

                        <div className="flex items-center h-13 space-x-3 border-b border-[#dadada] gap-4">
                          <span className="font-semibold w-32">Shift:</span>
                          <span className="ml-1">{record.shift}</span>
                        </div>

                        <div className="flex items-center h-13 space-x-3 border-b border-[#dadada] gap-4">
                          <span className="font-semibold w-32">Status:</span>
                          <span className={`ml-1 py-1 px-2 rounded-[4px] text-xs font-semibold ${getStatusStyle(record.status)}`}>
                            {record.status}
                          </span>
                        </div>

                        <div className="flex items-center h-13 space-x-3 border-b border-[#dadada] gap-4">
                          <div className="flex space-x-2">
                            <button className="text-[#6777ef] hover:bg-[#E0E1E3] p-1 rounded-full cursor-pointer">
                              <Edit2 className="w-5 h-5" />
                            </button>
                            <button className="text-[#ff5200] hover:bg-[#E0E1E3] p-1 rounded-full cursor-pointer">
                              <Trash2 className="w-5 h-5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
                </>
              ) : (
                /* Chart View */
                <div className="py-8">
                  <h3 className="text-lg font-semibold text-gray-800 mb-8">Attendance Report</h3>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Pie Chart */}
                    <div className="flex flex-col items-center">
                      <svg viewBox="0 0 400 400" className="w-full max-w-[350px]">
                        {/* Pie slices */}
                        <circle cx="200" cy="200" r="120" fill="none" stroke="#8b5cf6" strokeWidth="80" strokeDasharray="565 565" transform="rotate(-90 200 200)" />
                        <circle cx="200" cy="200" r="120" fill="none" stroke="#3b82f6" strokeWidth="80" strokeDasharray="35 565" strokeDashoffset="-565" transform="rotate(-90 200 200)" />
                        <circle cx="200" cy="200" r="120" fill="none" stroke="#ef4444" strokeWidth="80" strokeDasharray="25 565" strokeDashoffset="-600" transform="rotate(-90 200 200)" />
                        <circle cx="200" cy="200" r="120" fill="none" stroke="#f97316" strokeWidth="80" strokeDasharray="15 565" strokeDashoffset="-625" transform="rotate(-90 200 200)" />
                        <circle cx="200" cy="200" r="120" fill="none" stroke="#10b981" strokeWidth="80" strokeDasharray="10 565" strokeDashoffset="-640" transform="rotate(-90 200 200)" />
                        
                        {/* Labels */}
                        <text x="80" y="120" fontSize="12" fill="#6b7280">Holiday Le...</text>
                        <text x="80" y="135" fontSize="12" fill="#6b7280">Absent</text>
                        <text x="180" y="100" fontSize="12" fill="#6b7280">Paid Leave</text>
                        <text x="90" y="300" fontSize="12" fill="#6b7280">On Duty</text>
                        <text x="280" y="320" fontSize="12" fill="#6b7280">Present</text>
                      </svg>
                      
                      {/* Legend */}
                      <div className="mt-4 flex flex-wrap gap-4 justify-center text-xs">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-sm bg-[#8b5cf6]"></div>
                          <span className="text-gray-600">Present</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-sm bg-[#3b82f6]"></div>
                          <span className="text-gray-600">On Duty</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-sm bg-[#ef4444]"></div>
                          <span className="text-gray-600">Paid Leave</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-sm bg-[#f97316]"></div>
                          <span className="text-gray-600">Absent</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-sm bg-[#10b981]"></div>
                          <span className="text-gray-600">Holiday Leave</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-sm bg-[#8b5cf6]"></div>
                          <span className="text-gray-600">Weekend</span>
                        </div>
                      </div>
                    </div>

                    {/* Donut Charts Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
                      {/* Present */}
                      <div className="flex flex-col items-center">
                        <svg viewBox="0 0 120 120" className="w-28 h-28">
                          <circle cx="60" cy="60" r="50" fill="none" stroke="#e5e7eb" strokeWidth="12" />
                          <circle cx="60" cy="60" r="50" fill="none" stroke="#8b5cf6" strokeWidth="12" strokeDasharray="314 314" strokeDashoffset="78.5" transform="rotate(-90 60 60)" className="transition-all duration-500" />
                          <text x="60" y="55" textAnchor="middle" fontSize="18" fontWeight="bold" fill="#8b5cf6">79%</text>
                          <text x="60" y="72" textAnchor="middle" fontSize="10" fill="#6b7280">Present</text>
                        </svg>
                        <p className="text-xs text-gray-500 mt-2">Total: 42</p>
                      </div>

                      {/* On Duty */}
                      <div className="flex flex-col items-center">
                        <svg viewBox="0 0 120 120" className="w-28 h-28">
                          <circle cx="60" cy="60" r="50" fill="none" stroke="#e5e7eb" strokeWidth="12" />
                          <circle cx="60" cy="60" r="50" fill="none" stroke="#3b82f6" strokeWidth="12" strokeDasharray="314 314" strokeDashoffset="302.1" transform="rotate(-90 60 60)" className="transition-all duration-500" />
                          <text x="60" y="55" textAnchor="middle" fontSize="18" fontWeight="bold" fill="#3b82f6">3.8%</text>
                          <text x="60" y="72" textAnchor="middle" fontSize="10" fill="#6b7280">On Duty</text>
                        </svg>
                        <p className="text-xs text-gray-500 mt-2">Total: 2</p>
                      </div>

                      {/* Paid Leave */}
                      <div className="flex flex-col items-center">
                        <svg viewBox="0 0 120 120" className="w-28 h-28">
                          <circle cx="60" cy="60" r="50" fill="none" stroke="#e5e7eb" strokeWidth="12" />
                          <circle cx="60" cy="60" r="50" fill="none" stroke="#ef4444" strokeWidth="12" strokeDasharray="314 314" strokeDashoffset="284.4" transform="rotate(-90 60 60)" className="transition-all duration-500" />
                          <text x="60" y="55" textAnchor="middle" fontSize="18" fontWeight="bold" fill="#ef4444">9.4%</text>
                          <text x="60" y="72" textAnchor="middle" fontSize="9" fill="#6b7280">Paid Leave</text>
                        </svg>
                        <p className="text-xs text-gray-500 mt-2">Total: 5</p>
                      </div>

                      {/* Absent */}
                      <div className="flex flex-col items-center">
                        <svg viewBox="0 0 120 120" className="w-28 h-28">
                          <circle cx="60" cy="60" r="50" fill="none" stroke="#e5e7eb" strokeWidth="12" />
                          <circle cx="60" cy="60" r="50" fill="none" stroke="#f97316" strokeWidth="12" strokeDasharray="314 314" strokeDashoffset="308" transform="rotate(-90 60 60)" className="transition-all duration-500" />
                          <text x="60" y="55" textAnchor="middle" fontSize="18" fontWeight="bold" fill="#f97316">1.9%</text>
                          <text x="60" y="72" textAnchor="middle" fontSize="10" fill="#6b7280">Absent</text>
                        </svg>
                        <p className="text-xs text-gray-500 mt-2">Total: 1</p>
                      </div>

                      {/* Holiday Leave */}
                      <div className="flex flex-col items-center">
                        <svg viewBox="0 0 120 120" className="w-28 h-28">
                          <circle cx="60" cy="60" r="50" fill="none" stroke="#e5e7eb" strokeWidth="12" />
                          <circle cx="60" cy="60" r="50" fill="none" stroke="#10b981" strokeWidth="12" strokeDasharray="314 314" strokeDashoffset="296.1" transform="rotate(-90 60 60)" className="transition-all duration-500" />
                          <text x="60" y="55" textAnchor="middle" fontSize="18" fontWeight="bold" fill="#10b981">5.7%</text>
                          <text x="60" y="72" textAnchor="middle" fontSize="9" fill="#6b7280">Holiday Leave</text>
                        </svg>
                        <p className="text-xs text-gray-500 mt-2">Total: 3</p>
                      </div>

                      {/* Weekend */}
                      <div className="flex flex-col items-center">
                        <svg viewBox="0 0 120 120" className="w-28 h-28">
                          <circle cx="60" cy="60" r="50" fill="none" stroke="#e5e7eb" strokeWidth="12" />
                          <circle cx="60" cy="60" r="50" fill="none" stroke="#8b5cf6" strokeWidth="12" strokeDasharray="314 314" strokeDashoffset="314" transform="rotate(-90 60 60)" className="transition-all duration-500" />
                          <text x="60" y="55" textAnchor="middle" fontSize="18" fontWeight="bold" fill="#8b5cf6">0%</text>
                          <text x="60" y="72" textAnchor="middle" fontSize="10" fill="#6b7280">Weekend</text>
                        </svg>
                        <p className="text-xs text-gray-500 mt-2">Total: 0</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Paginator */}
          <div className="flex items-center justify-end gap-8 border-t border-gray-200 bg-white px-4 py-3 text-sm text-gray-700 rounded-b-xl shadow-sm">
            <div className="font-medium">1 – 8 of 8</div>
            <div className="flex items-center space-x-2">
              <button disabled className="w-9 h-9 rounded-full flex items-center justify-center opacity-50 cursor-not-allowed">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
              </button>
              <button disabled className="w-9 h-9 rounded-full flex items-center justify-center opacity-50 cursor-not-allowed">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </button>
            </div>
          </div>
        </div>
      </div>


      <style jsx>{`
        @keyframes slideDown {
          0% { transform: translateY(-20px); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }
        .animate-slideDown { animation: slideDown 0.4s ease-in-out; }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};

export default EmployeeAttendanceComponent;