'use client';
import { CircleCheck, CircleX, Edit, Home, Trash2 } from 'lucide-react';
import { useState } from 'react';

interface Appointment {
  id: number;
  doctorName: string;
  specialization: string;
  avatar: string;
  date: string;
  time: string;
  treatment: string;
  contactNumber: string;
  status: 'Confirm' | 'Cancelled' | 'Pending';
  location: string;
}

const appointments: Appointment[] = [
  {
    id: 1,
    doctorName: "Dr. Cara Stevens",
    specialization: "Radiologist",
    avatar: "/assets/patient-1.jpg",
    date: "12 June '20",
    time: "09:00-10:00",
    treatment: "CT scans",
    contactNumber: "+123 676545655",
    status: "Confirm",
    location: "Grand Plains Clinic"
  },
  {
    id: 2,
    doctorName: "Dr. John Doe",
    specialization: "Cardiologist",
    avatar: "/assets/patient-1.jpg",
    date: "12 June '20",
    time: "11:00-11:30",
    treatment: "heart checkup",
    contactNumber: "+123 434656764",
    status: "Cancelled",
    location: "Genesis Hospital"
  },
  {
    id: 3,
    doctorName: "Dr. Airi Satou",
    specialization: "Otolaryngologist",
    avatar: "/assets/patient-1.jpg",
    date: "12 June '20",
    time: "09:15-10:15",
    treatment: "Diseases Of The Ear",
    contactNumber: "+123 45345673",
    status: "Confirm",
    location: "Genesis Laboratory"
  },
  {
    id: 4,
    doctorName: "Dr. Angelica Ramos",
    specialization: "Dentist",
    avatar: "/assets/patient-1.jpg",
    date: "12 June '20",
    time: "11:00-12:00",
    treatment: "Root Canal",
    contactNumber: "+123 87654533",
    status: "Confirm",
    location: "Clemency Hospital"
  },
  {
    id: 5,
    doctorName: "Dr. Jens Brincker",
    specialization: "Endocrinologist",
    avatar: "/assets/patient-1.jpg",
    date: "12 June '20",
    time: "04:00-05:00",
    treatment: "Diabetes",
    contactNumber: "+123 45678345",
    status: "Cancelled",
    location: "Hopevale Clinic"
  },
  {
    id: 6,
    doctorName: "Dr. Jamie Blair",
    specialization: "Radiologist",
    avatar: "/assets/patient-1.jpg",
    date: "12 June '20",
    time: "05:00-05:30",
    treatment: "Diabetes",
    contactNumber: "+123 45678345",
    status: "Confirm",
    location: "Pinevale Medical Center"
  },
  {
    id: 7,
    doctorName: "Dr. Nikki Barton",
    specialization: "Endocrinologist",
    avatar: "/assets/patient-1.jpg",
    date: "12 June '20",
    time: "06:00-07:00",
    treatment: "X-Ray",
    contactNumber: "+123 45678345",
    status: "Pending",
    location: "Hopevale Clinic"
  }
];

export default function TodayAppointmentsPage() {
  const [appointmentsList, setAppointmentsList] = useState<Appointment[]>(appointments);

  const handleConfirm = (id: number) => {
    setAppointmentsList(prev =>
      prev.map(appointment =>
        appointment.id === id
          ? { ...appointment, status: 'Confirm' as const }
          : appointment
      )
    );
  };

  const handleCancel = (id: number) => {
    setAppointmentsList(prev =>
      prev.map(appointment =>
        appointment.id === id
          ? { ...appointment, status: 'Cancelled' as const }
          : appointment
      )
    );
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Confirm':
        return 'text-green-600 bg-green-100';
      case 'Cancelled':
        return 'text-red-600 bg-red-100';
      case 'Pending':
        return 'text-orange-600 bg-orange-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Breadcrumb */}
      <div className="flex items-center justify-between relative top-[-5px]">
        <div className="flex items-center flex-wrap space-x-2">
          <h1 className="text-[20px] font-semibold">Today</h1>
          <span className="text-[20px] font-bold">›</span>
          <Home size={18} />
          <span>›</span>
          <span className="text-sm">Appointments</span>
          <span>›</span>
          <span className="text-sm">Today</span>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 mt-3">
        {/* Header */}
        <div className="py-2 px-4 ">
          <h2 className="text-[16px] font-semibold text-gray-800">Today's Appointments</h2>
        </div>

        {/* Appointments List */}
        <div className="p-6">
          <div className="space-y-4">
            {appointmentsList.map((appointment) => (
              <div
                key={appointment.id}
                className="grid grid-cols-1 md:grid-cols-8 bg-[#F9F9F9] items-center gap-4 p-4  rounded-lg hover:bg-gray-50 transition-colors"
              >
                {/* Doctor Info */}
                <div className="flex items-center space-x-4 col-span-2">
                  <img
                    src={appointment.avatar}
                    alt={appointment.doctorName}
                    className="w-10 h-10 rounded-full object-cover flex-shrink-0"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="font-semibold text-gray-900 text-sm break-words whitespace-normal">
                      {appointment.doctorName}
                    </div>
                    <div className="text-gray-500 text-xs break-words whitespace-normal">
                      {appointment.specialization}
                    </div>
                  </div>
                </div>

                {/* Date & Time */}
                <div>
                  <div className="font-semibold text-gray-900 text-sm">{appointment.date}</div>
                  <div className="text-gray-500 text-xs">{appointment.time}</div>
                </div>

                {/* Treatment */}
                <div>
                  <div className="text-gray-500 text-xs">Treatment</div>
                  <div className="font-semibold text-gray-900 text-sm break-words whitespace-normal">
                    {appointment.treatment}
                  </div>
                </div>

                {/* Contact Number */}
                <div>
                  <div className="text-gray-500 text-xs">Contact Number</div>
                  <div className="font-semibold text-gray-900 text-sm break-words whitespace-normal">
                    {appointment.contactNumber}
                  </div>
                </div>

                {/* Status */}
                <div>
                  <div className="text-gray-500 text-xs">Status</div>
                  <span
                    className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                      appointment.status
                    )}`}
                  >
                    {appointment.status}
                  </span>
                </div>

                {/* Location */}
                <div>
                  <div className="text-gray-500 text-xs">Location</div>
                  <div className="font-semibold text-gray-900 text-sm break-words whitespace-normal">
                    {appointment.location}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center space-x-2 justify-end">
                  <button
                    onClick={() => handleConfirm(appointment.id)}
                    className="p-1 text-green-600 hover:bg-green-100 rounded-full transition-colors"
                    title="Confirm Appointment"
                  >
                    <CircleCheck className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleCancel(appointment.id)}
                    className="p-1 text-red-600 hover:bg-red-100 rounded-full transition-colors"
                    title="Cancel Appointment"
                  >
                    <CircleX className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}

          </div>
        </div>
      </div>
    </div>
  );
}