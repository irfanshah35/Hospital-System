"use client"
import { Home } from 'lucide-react';
import React, { useState } from 'react'

export default function DoctorAppointment() {
    const [currentDate, setCurrentDate] = useState(new Date(2025, 9, 1)); 
    const [view, setView] = useState('month');

    // Sample appointment data
    const appointments = [
        {
            id: 1,
            date: "2025-10-02",
            doctor: "Dr. Rajesh",
            patient: "Cara Stevens",
            startTime: "9:00 AM",
            endTime: "9:30 AM",
            description: "Patient has a history of allergies.",
            status: "Pending",
            avatar: "/api/placeholder/24/24"
        },
        {
            id: 2,
            date: "2025-10-05",
            doctor: "Dr. Sarah Smith",
            patient: "John Doe",
            startTime: "11:30 AM",
            endTime: "12:00 PM",
            description: "Patient is sensitive to penicillin.",
            status: "Cancelled",
            avatar: "/api/placeholder/24/24"
        },
        {
            id: 3,
            date: "2025-10-12",
            doctor: "Dr. Jay Soni",
            patient: "Alice Johnson",
            startTime: "9:45 AM",
            endTime: "10:15 AM",
            description: "No known allergies.",
            status: "Confirmed",
            avatar: "/api/placeholder/24/24"
        },
        {
            id: 4,
            date: "2025-10-16",
            doctor: "Dr. Pooja Patel",
            patient: "Bob Brown",
            startTime: "1:15 PM",
            endTime: "1:45 PM",
            description: "Patient recently moved.",
            status: "Cancelled",
            avatar: "/api/placeholder/24/24"
        },
        {
            id: 5,
            date: "2025-10-20",
            doctor: "Dr. Jayesh Shah",
            patient: "Sara Lee",
            startTime: "10:30 AM",
            endTime: "11:00 AM",
            description: "Patient has a history of asthma.",
            status: "Completed",
            avatar: "/api/placeholder/24/24"
        }
    ];

    // Navigation functions
    const navigateDate = (direction: any) => {
        const newDate = new Date(currentDate);
        if (view === 'month') {
            newDate.setMonth(newDate.getMonth() + direction);
        } else if (view === 'week') {
            newDate.setDate(newDate.getDate() + (direction * 7));
        } else {
            newDate.setDate(newDate.getDate() + direction);
        }
        setCurrentDate(newDate);
    };

    const goToToday = () => {
        setCurrentDate(new Date());
    };

    const generateCalendarDays = () => {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();

        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const daysInMonth = lastDay.getDate();
        const startingDay = firstDay.getDay();

        const days = [];
        const today = new Date();


        const prevMonthLastDay = new Date(year, month, 0).getDate();
        for (let i = startingDay - 1; i >= 0; i--) {
            const day = prevMonthLastDay - i;
            const dateStr = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
            days.push({ day, type: 'other', date: dateStr });
        }

        for (let day = 1; day <= daysInMonth; day++) {
            const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
            const dateObj = new Date(dateStr);
            const isToday = today.toDateString() === dateObj.toDateString();
            // const isPast = dateObj < new Date().setHours(0, 0, 0, 0);

            let type = 'future';
            if (isToday) type = 'today';
            // else if (isPast) type = 'past';

            days.push({ day, type, date: dateStr });
        }


        const totalCells = 42;
        const remainingCells = totalCells - (startingDay + daysInMonth);
        for (let day = 1; day <= remainingCells; day++) {
            const dateStr = `${year}-${String(month + 2).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
            days.push({ day, type: 'other', date: dateStr });
        }

        return days;
    };

    const calendarDays = generateCalendarDays();

    const getAppointmentsForDate = (date: any) => {
        return appointments.filter(apt => apt.date === date);
    };

    const getStatusColor = (status: any) => {
        const colors: any = {
            Pending: '!bg-[#2196f3]',
            Confirmed: '!bg-[#fa8007]',
            Cancelled: '!bg-[#e14b59]',
            Completed: '!bg-[#1ec947]'
        };
        return colors[status] || 'border-l-gray-500';
    };

    const getDayBgColor = (type: any) => {
        const colors: any = {
            past: 'bg-gray-50',
            today: 'bg-blue-50',
            future: 'bg-white',
            other: 'bg-gray-100'
        };
        // return colors[type] || 'bg-white';
    };
    return (


        <div className='px-4 sm:px-6 lg:px-8 py-3 '>
            <div className="flex items-center justify-between pb-3">
      <div className="flex items-center space-x-2 flex-wrap text-sm md:text-base">
        <h1 className="text-base md:text-lg font-semibold">Appointment Calendar</h1>
        <span className="hidden sm:inline">›</span>
        <Home size={18} className="hidden sm:block" />
        <span className="hidden sm:inline">›</span>
        <span className="hidden sm:inline">Appointment</span>
        <span className="hidden sm:inline">›</span>
        <span className="hidden sm:inline">Calendar</span>
      </div>
    </div>


            <div className="min-h-screen ">
                <div className="max-w-full ">
                    <div className="bg-white rounded-xl shadow-md overflow-hidden">
                        {/* Header */}
                        <div className="px-[15px] py-[10px] border-b border-gray-200">
                            <h1 className="m-0 text-[17px] leading-[28px] pr-[10px] font-medium">Doctor Appointment Schedule</h1>
                        </div>

                        {/* Calendar Controls */}
                        <div className="px-6 py-4 border-b border-gray-200">
                            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                                <div className="flex items-center space-x-2">
                                    <div className="flex rounded-md gap-2">
                                        <button onClick={() => navigateDate(-1)} className="px-3 py-2 rounded-l-md hover:bg-[#e1e0e0] hover:text-[#868181] transition-colors cursor-pointer border-1 border-[#eee]">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="w-4 h-4"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                            >
                                                <path strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                                            </svg>

                                        </button>
                                        <button onClick={() => navigateDate(1)} className="px-3 py-2 hover:bg-[#e1e0e0] hover:text-[#868181] rounded-r-md transition-colors cursor-pointer border-1 border-[#eee]">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="w-4 h-4"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                            >
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                                            </svg>

                                        </button>
                                    </div>
                                    <button
                                        onClick={goToToday}
                                        className="px-4 py-2 bg-[#6777ef] text-white rounded-md hover:bg-[#e1e0e0] hover:text-[#868181] transition-colors text-sm cursor-pointer">
                                        Today
                                    </button>
                                </div>

                                <h2 className="text-[1.75em] font-[500] text-[#212529]">
                                    {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                                </h2>

                                <div className="flex gap-2">
                                    <button
                                        onClick={() => setView('month')}
                                        className={`px-4 py-2 text-sm cursor-pointer ${view === 'month'
                                            ? 'bg-[#6777ef] text-white'
                                            : ' hover:bg-[#e1e0e0] hover:text-[#868181] border-1 !border-[#eee]'
                                            } rounded-[4px] transition-colors`}
                                    >
                                        Month
                                    </button>
                                    <button
                                        onClick={() => setView('week')}
                                        className={`px-4 py-2 text-sm cursor-pointer ${view === 'week'
                                            ? 'bg-blue-600 text-white'
                                            : ' hover:bg-[#e1e0e0] hover:text-[#868181] border-1 border-[#eee]'
                                            } transition-colors rounded-[4px]`}
                                    >
                                        Week
                                    </button>
                                    <button
                                        onClick={() => setView('day')}
                                        className={`px-4 py-2 text-sm cursor-pointer ${view === 'day'
                                            ? 'bg-blue-600 text-white'
                                            : ' hover:bg-[#e1e0e0] hover:text-[#868181] border-1 border-[#eee]'
                                            } rounded-[4px] transition-colors`}
                                    >
                                        Day
                                    </button>
                                </div>
                            </div>
                        </div>

                        {view === 'month' && (

                            <div className="p-4">
                                <div className="grid grid-cols-7 gap-0 border border-gray-200 overflow-hidden">
                                    {/* Weekday Headers */}
                                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                                        <div
                                            key={day}
                                            className=" p-[15px] text-center text-sm font-medium border-r border-gray-200 last:border-r-0"
                                        >
                                            <span className='p-[2px] px-1'>{day}</span>
                                        </div>
                                    ))}

                                    {/* Calendar Days */}
                                    {calendarDays.map((dayInfo, index) => {
                                        const dayAppointments = getAppointmentsForDate(dayInfo.date);

                                        return (
                                            <div
                                                key={index}
                                                className={`min-h-[80px] p-2 border border-gray-200 ${getDayBgColor(dayInfo.type)}`}
                                            >
                                                {/* Day Number */}
                                                <div className="text-center mb-1">
                                                    <span
                                                        className={`inline-flex items-center justify-center w-7 h-7 rounded-full text-sm ${dayInfo.type === 'today'
                                                            ? 'bg-blue-600 text-white'
                                                            : dayInfo.type === 'other'
                                                                ? 'text-gray-700'
                                                                : 'text-gray-400'
                                                            }`}
                                                    >
                                                        {dayInfo.day}
                                                    </span>
                                                </div>

                                                {/* Appointments */}
                                                <div className="space-y-1 !bg-white shadow-[0_4px_25px_rgba(0,0,0,0.1)]">
                                                    {dayAppointments.map((appointment) => (
                                                        <div
                                                            key={appointment.id}
                                                            className={`text-xs p-1 w-auto rounded-full cursor-pointer ${getStatusColor(
                                                                appointment.status
                                                            )} bg-white`}
                                                            title={`Doctor: ${appointment.doctor}\nPatient: ${appointment.patient}\nTime: ${appointment.startTime} - ${appointment.endTime}\nStatus: ${appointment.status}\nNotes: ${appointment.description}`}
                                                        >
                                                            <div className="flex items-center">
                                                                <div className="w-4 h-4 bg-gray-300 rounded-full mr-2 flex-shrink-0"></div>
                                                                <span className="truncate font-medium">{appointment.patient}</span>
                                                            </div>
                                                            {/* <div className="text-xs text-gray-500 truncate mt-1">
                                                            {appointment.startTime} • {appointment.doctor}
                                                        </div> */}
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        )}

                        {view === 'week' && (
                            <WeekViewCalendar />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}



const WeekViewCalendar = () => {
    const [currentWeek, setCurrentWeek] = useState(new Date(2025, 8, 28)); // Starting from Sept 28, 2025

    // Sample appointment data for week view
    const appointments = [
        {
            id: 1,
            date: "2025-10-02",
            doctor: "Dr. Rajesh",
            patient: "Cara Stevens",
            startTime: "09:00:00",
            endTime: "09:30:00",
            description: "Patient has a history of allergies.",
            status: "Pending",
            avatar: "/api/placeholder/24/24"
        },
        {
            id: 2,
            date: "2025-10-02",
            doctor: "Dr. Sarah Smith",
            patient: "John Doe",
            startTime: "14:00:00",
            endTime: "15:00:00",
            description: "Regular checkup",
            status: "Confirmed",
            avatar: "/api/placeholder/24/24"
        },
        {
            id: 3,
            date: "2025-10-01",
            doctor: "Dr. Jay Soni",
            patient: "Alice Johnson",
            startTime: "11:00:00",
            endTime: "12:00:00",
            description: "No known allergies.",
            status: "Confirmed",
            avatar: "/api/placeholder/24/24"
        },
        {
            id: 4,
            date: "2025-09-29",
            doctor: "Dr. Pooja Patel",
            patient: "Bob Brown",
            startTime: "16:00:00",
            endTime: "17:00:00",
            description: "Patient recently moved.",
            status: "Cancelled",
            avatar: "/api/placeholder/24/24"
        }
    ];

    // Generate time slots from 12am to 11pm
    const timeSlots = Array.from({ length: 24 }, (_, i) => {
        const hour = i % 12 || 12;
        const period = i < 12 ? 'am' : 'pm';
        return {
            time: `${i}:00`,
            label: i === 0 ? '12am' : i === 12 ? '12pm' : `${hour}${period}`,
            minorTime: `${i}:30`
        };
    });

    // Generate week days
    const generateWeekDays = () => {
        const startDate = new Date(currentWeek);
        const days = [];

        for (let i = 0; i < 7; i++) {
            const date = new Date(startDate);
            date.setDate(startDate.getDate() + i);

            days.push({
                date: date.toISOString().split('T')[0],
                label: date.toLocaleDateString('en-US', { weekday: 'short', month: 'numeric', day: 'numeric' }),
                fullDate: date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' }),
                // isPast: date < new Date().setHours(0, 0, 0, 0)
            });
        }

        return days;
    };

    const weekDays = generateWeekDays();

    // Navigation functions
    const navigateWeek = (direction: any) => {
        const newDate = new Date(currentWeek);
        newDate.setDate(newDate.getDate() + (direction * 7));
        setCurrentWeek(newDate);
    };

    const goToToday = () => {
        setCurrentWeek(new Date());
    };

    // Get appointments for specific date and time
    const getAppointmentsForDateTime = (date: any, time: any) => {
        return appointments.filter(apt =>
            apt.date === date &&
            apt.startTime.startsWith(time)
        );
    };

    const getStatusColor = (status: any) => {
        const colors: any = {
            Pending: 'border-l-amber-500 bg-amber-50',
            Confirmed: 'border-l-emerald-500 bg-emerald-50',
            Cancelled: 'border-l-rose-500 bg-rose-50',
            Completed: 'border-l-blue-500 bg-blue-50'
        };
        return colors[status] || 'border-l-gray-500 bg-gray-50';
    };

    const getEventPosition = (startTime: any) => {
        const [hours, minutes] = startTime.split(':').map(Number);
        return (hours * 60 + minutes) * 0.8; // 0.8px per minute for visual scaling
    };

    const getEventHeight = (startTime: any, endTime: any) => {
        const [startHours, startMinutes] = startTime.split(':').map(Number);
        const [endHours, endMinutes] = endTime.split(':').map(Number);
        const duration = (endHours * 60 + endMinutes) - (startHours * 60 + startMinutes);
        return Math.max(duration * 0.8, 20); // Minimum height of 20px
    };

    return (

        <>
            <div className="p-4">
                <div className="border border-gray-200 overflow-hidden">
                    
                    <div className="grid grid-cols-8 border-b border-gray-200">
                        <div className="p-3 border-r border-gray-200"></div>
                        {weekDays.map((day, index) => (
                            <div
                                key={day.date}
                                className={`p-[15px] text-center text-sm h-[55px] font-medium text-gray-700 border-r border-gray-200 last:border-r-0 `}
                            >
                                <span className='py-[2px] px-1'>{day.label}</span>
                            </div>
                        ))}
                    </div>

                    {/* All-day section */}
                    <div className="grid grid-cols-8 border-b border-gray-200">
                        <div className="p-2 border-r border-gray-200 text-sm text-gray-500 font-medium">
                            all-day
                        </div>
                        {weekDays.map((day) => (
                            <div
                                key={day.date}
                                className="min-h-12 p-2 border-r border-gray-200 last:border-r-0 bg-white"
                            >
                                {/* All-day events would go here */}
                            </div>
                        ))}
                    </div>

                    {/* Time Grid */}
                    <div className="relative">
                        {/* Time Slots */}
                        <div className="grid grid-cols-8">
                            {/* Time Labels */}
                            <div className="border-r border-gray-200">
                                {timeSlots.map((slot, index) => (
                                    <div key={slot.time} className="relative">
                                        <div className="h-12 border-b border-gray-100 flex items-start justify-end pr-2 pt-1">
                                            <span className="text-xs text-gray-500">{slot.label}</span>
                                        </div>
                                        {/* Minor time slot (half hour) */}
                                        <div className="h-12 border-b border-gray-50">
                                            <div className="h-6 border-b border-gray-50"></div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Day Columns */}
                            {weekDays.map((day) => (
                                <div
                                    key={day.date}
                                    className="border-r border-gray-200 last:border-r-0 relative"
                                >
                                    {/* Time slot backgrounds */}
                                    {timeSlots.map((slot) => (
                                        <div key={slot.time} className="relative">
                                            <div className="h-12 border-b border-gray-100"></div>
                                            <div className="h-12 border-b border-gray-50">
                                                <div className="h-6 border-b border-gray-50"></div>
                                            </div>
                                        </div>
                                    ))}

                                    {/* Events */}
                                    <div className="absolute inset-0 pointer-events-none">
                                        {appointments
                                            .filter(apt => apt.date === day.date)
                                            .map((appointment) => {
                                                const top = getEventPosition(appointment.startTime);
                                                const height = getEventHeight(appointment.startTime, appointment.endTime);

                                                return (
                                                    <div
                                                        key={appointment.id}
                                                        className={`absolute left-1 right-1 rounded border-l-4 p-2 shadow-sm pointer-events-auto cursor-pointer ${getStatusColor(
                                                            appointment.status
                                                        )}`}
                                                        style={{
                                                            top: `${top}px`,
                                                            height: `${height}px`,
                                                            zIndex: 10
                                                        }}
                                                        title={`Doctor: ${appointment.doctor}\nPatient: ${appointment.patient}\nTime: ${appointment.startTime} - ${appointment.endTime}\nStatus: ${appointment.status}\nNotes: ${appointment.description}`}
                                                    >
                                                        <div className="flex items-center mb-1">
                                                            <div className="w-3 h-3 bg-gray-400 rounded-full mr-2 flex-shrink-0"></div>
                                                            <span className="text-xs font-medium truncate">
                                                                {appointment.patient}
                                                            </span>
                                                        </div>
                                                        <div className="text-xs text-gray-600 truncate">
                                                            {appointment.startTime.slice(0, 5)} • {appointment.doctor}
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Current time indicator */}
                        <div
                            className="absolute left-0 right-0 h-0.5 bg-red-500 z-20"
                            style={{
                                top: `${getEventPosition(`${new Date().getHours()}:${new Date().getMinutes()}`)}px`
                            }}
                        >
                            <div className="w-3 h-3 bg-red-500 rounded-full -ml-1.5 -mt-1.5"></div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Legend */}
            <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
                <div className="flex flex-wrap items-center gap-4 text-sm">
                    <span className="font-medium text-gray-700">Status:</span>
                    <div className="flex items-center space-x-1">
                        <div className="w-3 h-3 border-l-4 border-l-amber-500 bg-amber-50"></div>
                        <span>Pending</span>
                    </div>
                    <div className="flex items-center space-x-1">
                        <div className="w-3 h-3 border-l-4 border-l-emerald-500 bg-emerald-50"></div>
                        <span>Confirmed</span>
                    </div>
                    <div className="flex items-center space-x-1">
                        <div className="w-3 h-3 border-l-4 border-l-rose-500 bg-rose-50"></div>
                        <span>Cancelled</span>
                    </div>
                    <div className="flex items-center space-x-1">
                        <div className="w-3 h-3 border-l-4 border-l-blue-500 bg-blue-50"></div>
                        <span>Completed</span>
                    </div>
                </div>
            </div>
        </>
    );
};


