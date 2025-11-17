"use client"
import React, { useState } from 'react';
import { Home, Settings, ChevronDown } from 'lucide-react';

const AttendanceSheetComponent = () => {
  const [selectedYear, setSelectedYear] = useState('2024');
  const [selectedMonth, setSelectedMonth] = useState('November');

  const employees = [
    {
      id: 1,
      name: 'Jacob Ryan',
      avatar: 'https://i.pravatar.cc/150?img=12',
      attendance: [
        'present', 'present', 'weekend', 'holiday', 'present', 'present', 'weekend',
        'present', 'leave', 'present', 'present', 'weekend', 'weekend', 'present',
        'present', 'present', 'leave', 'weekend', 'weekend', 'present', 'present', 'present',
        'weekend', 'holiday', 'present', 'present', 'weekend', 'present', 'leave', 'present'
      ]
    },
    {
      id: 2,
      name: 'Angelica Ramos',
      avatar: 'https://i.pravatar.cc/150?img=5',
      attendance: [
        'present', 'present', 'weekend', 'present', 'leave', 'present', 'weekend',
        'present', 'present', 'holiday', 'present', 'weekend', 'weekend', 'present',
        'present', 'present', 'present', 'weekend', 'weekend', 'present', 'leave', 'present',
        'weekend', 'present', 'present', 'leave', 'weekend', 'present', 'present', 'holiday'
      ]
    },
    {
      id: 3,
      name: 'Jens Brincker',
      avatar: 'https://i.pravatar.cc/150?img=13',
      attendance: [
        'present', 'leave', 'weekend', 'present', 'present', 'present', 'weekend',
        'holiday', 'present', 'present', 'leave', 'weekend', 'weekend', 'present',
        'present', 'present', 'present', 'weekend', 'weekend', 'holiday', 'present', 'present',
        'weekend', 'present', 'present', 'present', 'weekend', 'leave', 'present', 'present'
      ]
    },
    {
      id: 4,
      name: 'Mark Hay',
      avatar: 'https://i.pravatar.cc/150?img=8',
      attendance: [
        'holiday', 'present', 'weekend', 'present', 'present', 'leave', 'weekend',
        'present', 'present', 'present', 'present', 'weekend', 'weekend', 'holiday',
        'present', 'leave', 'present', 'weekend', 'weekend', 'present', 'present', 'present',
        'weekend', 'present', 'leave', 'present', 'weekend', 'present', 'present', 'present'
      ]
    }
  ];

  const getDaysInMonth = () => {
    const days = [];
    for (let i = 1; i <= 30; i++) {
      days.push(i);
    }
    return days;
  };

  const getStatusIcon = (status: any) => {
    switch (status) {
      case 'present':
        return (
          <div className="flex items-center justify-center w-full h-full">
            <div className="w-5 h-5 rounded-full border-2 border-[#22c55e] flex items-center justify-center">
              <svg className="w-3 h-3 text-[#22c55e]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
        );
      case 'leave':
        return (
          <div className="flex items-center justify-center w-full h-full">
            <div className="w-5 h-5 rounded-full border-2 border-[#ef4444] flex items-center justify-center">
              <svg className="w-2.5 h-2.5 text-[#ef4444]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
          </div>
        );
      case 'weekend':
        return (
          <div className="flex items-center justify-center w-full h-full">
            <div className="w-5 h-5 rounded-full border-2 border-gray-400 flex items-center justify-center">
              <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
            </div>
          </div>
        );
      case 'holiday':
        return (
          <div className="flex items-center justify-center w-full h-full">
            <svg className="w-5 h-5 text-[#fbbf24]" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2l2.4 7.4h7.6l-6 4.6 2.3 7-6.3-4.6-6.3 4.6 2.3-7-6-4.6h7.6z" />
            </svg>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f5f5] p-3 sm:p-6">
      {/* Breadcrumb */}
      <div className="mb-4 sm:mb-6">
        <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4 flex-wrap">
          <span className="font-semibold text-gray-900 text-base sm:text-lg">Attendance Sheet</span>
          <span className="text-base sm:text-lg">›</span>
          <Home className="w-3 h-3 sm:w-4 sm:h-4" />
          <span>›</span>
          <span>Attendance</span>
          <span>›</span>
          <span>Sheet</span>
        </div>
      </div>

      {/* Main Container */}
      <div className="bg-white rounded-lg shadow-sm">
        {/* Header Section */}
        <div className="p-4 sm:p-6 border-b border-gray-200">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4 sm:mb-6">Attendance Sheet</h2>

          {/* Filters */}
          <div className="flex items-end gap-3 sm:gap-4 flex-wrap">
            {/* Year Dropdown */}
            <div className="flex-1 min-w-[200px] sm:min-w-[280px]">
              <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
                Select Year*
              </label>
              <div className="relative">
                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 pr-8 sm:pr-10 text-sm sm:text-base text-gray-900 bg-white border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer"
                >
                  <option value="2024">2024</option>
                  <option value="2023">2023</option>
                  <option value="2022">2022</option>
                </select>
                <ChevronDown className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-500 pointer-events-none" />
              </div>
            </div>

            {/* Month Dropdown */}
            <div className="flex-1 min-w-[200px] sm:min-w-[280px]">
              <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
                Select Month*
              </label>
              <div className="relative">
                <select
                  value={selectedMonth}
                  onChange={(e) => setSelectedMonth(e.target.value)}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 pr-8 sm:pr-10 text-sm sm:text-base text-gray-900 bg-white border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer"
                >
                  <option value="November">November</option>
                  <option value="October">October</option>
                  <option value="September">September</option>
                </select>
                <ChevronDown className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-500 pointer-events-none" />
              </div>
            </div>

            {/* Search Button */}
            <button className="w-full sm:w-auto px-6 sm:px-8 py-2 sm:py-3 text-sm sm:text-base bg-white text-[#3f51b5] border-2 border-[#3f51b5] rounded-md font-medium hover:bg-[#3f51b5] hover:text-white transition-colors">
              Search
            </button>
          </div>
        </div>

        {/* Filter Info and Legend */}
        <div className="px-4 sm:px-6 py-3 sm:py-4 bg-gray-50 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
            <p className="text-xs sm:text-sm text-gray-600">
              Filtered by: <span className="font-medium">Year: 2024 | Month: November</span>
            </p>

            {/* Legend */}
            <div className="flex items-center gap-3 sm:gap-6 text-xs sm:text-sm flex-wrap">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full border-2 border-gray-400 flex items-center justify-center flex-shrink-0">
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gray-400 rounded-full"></div>
                </div>
                <span className="font-medium text-gray-700">Weekend</span>
              </div>
              <div className="flex items-center gap-1.5 sm:gap-2">
                <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full border-2 border-[#22c55e] flex items-center justify-center flex-shrink-0">
                  <svg className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 text-[#22c55e]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="font-medium text-gray-700">Present</span>
              </div>
              <div className="flex items-center gap-1.5 sm:gap-2">
                <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full border-2 border-[#ef4444] flex items-center justify-center flex-shrink-0">
                  <svg className="w-2 h-2 sm:w-3 sm:h-3 text-[#ef4444]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
                <span className="font-medium text-gray-700">Leave</span>
              </div>
              <div className="flex items-center gap-1.5 sm:gap-2">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-[#fbbf24] flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l2.4 7.4h7.6l-6 4.6 2.3 7-6.3-4.6-6.3 4.6 2.3-7-6-4.6h7.6z" />
                </svg>
                <span className="font-medium text-gray-700">Holiday</span>
              </div>
            </div>
          </div>
        </div>

        {/* Attendance Table - Desktop */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-white border-b-2 border-gray-200">
                <th className="sticky left-0 bg-white z-10 px-4 py-3 text-left text-xs font-semibold text-gray-900 border-r border-gray-200 min-w-[160px]">
                  Employee Name
                </th>
                {getDaysInMonth().map((day) => (
                  <th key={day} className="px-2 py-3 text-center text-xs font-semibold text-gray-900 min-w-[40px] border-r border-gray-100">
                    {day}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {employees.map((employee) => (
                <tr key={employee.id} className="hover:bg-gray-50 transition-colors">
                  <td className="sticky left-0 bg-white z-10 px-4 py-3 border-r border-gray-200">
                    <div className="flex items-center gap-2">
                      <img
                        src={employee.avatar}
                        alt={employee.name}
                        className="w-8 h-8 rounded-full object-cover flex-shrink-0"
                      />
                      <span className="text-sm font-medium text-gray-900">{employee.name}</span>
                    </div>
                  </td>
                  {employee.attendance.map((status, index) => (
                    <td key={index} className="px-2 py-3 text-center border-r border-gray-100">
                      {getStatusIcon(status)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Attendance Cards - Mobile */}
        <div className="md:hidden divide-y divide-gray-200">
          {employees.map((employee) => (
            <div key={employee.id} className="p-4">
              <div className="flex items-center gap-3 mb-4">
                <img
                  src={employee.avatar}
                  alt={employee.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <span className="font-semibold text-gray-900">{employee.name}</span>
              </div>

              <div className="grid grid-cols-7 gap-2">
                {employee.attendance.map((status, index) => (
                  <div key={index} className="flex flex-col items-center gap-1">
                    <span className="text-xs font-medium text-gray-600">{index + 1}</span>
                    <div className="w-8 h-8 flex items-center justify-center">
                      {getStatusIcon(status)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="px-4 sm:px-6 py-3 sm:py-4 border-t border-gray-200 bg-white flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs sm:text-sm text-gray-600">Showing 4 employees</p>
          <p className="text-xs sm:text-sm text-gray-600">
            <span className="font-medium">1-30</span> of <span className="font-medium">30</span> days
          </p>
        </div>
      </div>

      {/* Settings Button */}
      <button className="fixed bottom-6 right-6 w-12 h-12 sm:w-14 sm:h-14 bg-[#3f51b5] text-white rounded-full shadow-lg hover:bg-[#303f9f] transition flex items-center justify-center z-50">
        <Settings className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>
    </div>
  );
};

export default AttendanceSheetComponent;