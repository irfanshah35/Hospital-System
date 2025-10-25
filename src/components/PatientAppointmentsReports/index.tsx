import React, { useState } from 'react';
import { FileText, Trash2, Download, Calendar, Clock, User } from 'lucide-react';

export default function PatientAppointmentsReports() {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past'>('upcoming');

  const upcomingAppointments = [
    { id: 1, doctor: 'Dr.Jens Brincker', specialty: 'Endocrinologist', date: '23 June \'20', time: '04:00-05:00', treatment: 'Diabetes', contact: '+123 45678345', image: '/assets/sidebar/patient.jpg' },
    { id: 2, doctor: 'Dr.John Doe', specialty: 'Cardiologist', date: '13 June \'20', time: '11:00-11:30', treatment: 'heart checkup', contact: '+123 434656764', image: '/assets/patient-1.jpg' },
    { id: 3, doctor: 'Dr.Cara Stevens', specialty: 'Radiologist', date: '12 June \'20', time: '09:00-10:00', treatment: 'CT scans', contact: '+123 676545655', image: '/assets/sidebar/patient.jpg' },
    { id: 4, doctor: 'Dr.Airi Satou', specialty: 'Otolaryngologist', date: '12 June \'20', time: '09:15-10:15', treatment: 'Diseases Of The Ear', contact: '+123 45345673', image: '/assets/patient-1.jpg' },
    { id: 5, doctor: 'Dr.Angelica Ramos', specialty: 'Dentist', date: '12 June \'20', time: '11:00-12:00', treatment: 'Root Canal', contact: '+123 87654533', image: '/assets/sidebar/patient.jpg' },
    { id: 6, doctor: 'Dr.John Doe', specialty: 'Cardiologist', date: '13 June \'20', time: '11:00-11:30', treatment: 'heart checkup', contact: '+123 434656764', image: '/assets/patient-1.jpg' }
  ];

  const pastAppointments = [
    { id: 1, doctor: 'Dr.Sarah Smith', specialty: 'General Physician', date: '05 June \'20', time: '10:00-11:00', treatment: 'Fever', contact: '+123 45678345', image: '/assets/sidebar/patient.jpg' },
    { id: 2, doctor: 'Dr.Michael Brown', specialty: 'Orthopedist', date: '01 June \'20', time: '14:00-15:00', treatment: 'Knee Pain', contact: '+123 434656764', image: '/assets/patient-1.jpg' }
  ];

  const documents = [
    { id: 1, name: 'Blood Report', icon: FileText, color: 'text-red-500', bgColor: 'bg-red-50' },
    { id: 2, name: 'Mediclaim Documents', icon: FileText, color: 'text-blue-500', bgColor: 'bg-blue-50' },
    { id: 3, name: 'Doctor Prescription', icon: FileText, color: 'text-gray-700', bgColor: 'bg-gray-50' },
    { id: 4, name: 'X-Ray Files', icon: FileText, color: 'text-purple-500', bgColor: 'bg-purple-50' },
    { id: 5, name: 'Urine Report', icon: FileText, color: 'text-red-500', bgColor: 'bg-red-50' },
    { id: 6, name: 'Scanned Documents', icon: FileText, color: 'text-teal-500', bgColor: 'bg-teal-50' }
  ];

  const appointments = activeTab === 'upcoming' ? upcomingAppointments : pastAppointments;

  return (
    <div className="min-h-screen  p-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Appointments Section */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg p-6 h-[700px] flex flex-col">
          {/* Tabs */}
          <div className="flex border-b border-gray-200 mb-6">
            <button
              onClick={() => setActiveTab('upcoming')}
              className={`flex-1 py-3 px-4 text-center font-semibold transition-colors relative ${
                activeTab === 'upcoming'
          
              }`}
            >
              Upcoming Appointment
              {activeTab === 'upcoming' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"></div>
              )}
            </button>
            <button
              onClick={() => setActiveTab('past')}
              className={`flex-1 py-3 px-4 text-center font-semibold transition-colors relative ${
                activeTab === 'past'
              
              }`}
            >
              Past Appointment
              {activeTab === 'past' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"></div>
              )}
            </button>
          </div>

          {/* Appointments List */}
          <div className="flex-1 overflow-y-hidden space-y">
            {appointments.map((apt) => (
              <div key={apt.id} className="flex items-center gap-4 py-4 border-b border-gray-100 last:border-0 hover:bg-gray-50 transition rounded-lg px-2">
                <img src={apt.image} alt={apt.doctor} className="w-14 h-14 rounded-full object-cover" />
                
                <div className="flex-1 grid grid-cols-2 gap-4">
                  <div>
                    <div className="font-semibold text-gray-800">{apt.doctor}</div>
                    <div className="text-sm text-gray-500">{apt.specialty}</div>
                  </div>
                  
                  <div>
                    <div className="text-sm text-gray-800 font-medium">{apt.date}</div>
                    <div className="text-sm text-gray-500">{apt.time}</div>
                  </div>
                </div>

                <div className="flex-1 grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-xs text-gray-400 uppercase mb-1">Treatment</div>
                    <div className="text-sm font-medium text-gray-800">{apt.treatment}</div>
                  </div>
                  
                  <div>
                    <div className="text-xs text-gray-400 uppercase mb-1">Contact Number</div>
                    <div className="text-sm text-gray-600">{apt.contact}</div>
                  </div>
                </div>

                <div className="flex items-center justify-center">
                  <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Reports/Documents Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6 h-[700px] flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-800">Reports/Documents</h2>
            <button className="text-blue-600 text-sm font-semibold hover:text-blue-700">View All</button>
          </div>

          <div className="flex-1 overflow-y-auto space-y-3">
            {documents.map((doc) => (
              <div key={doc.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-blue-300 transition group">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-lg ${doc.bgColor} flex items-center justify-center`}>
                    <doc.icon className={`w-5 h-5 ${doc.color}`} />
                  </div>
                  <span className="font-medium text-gray-800">{doc.name}</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <button className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition">
                    <Trash2 size={18} />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition">
                    <Download size={18} />
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