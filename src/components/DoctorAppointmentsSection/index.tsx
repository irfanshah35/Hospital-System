import React from "react";
import { FileText } from "lucide-react";
import { useThemeStore } from "@/store/store";

export default function DoctorAppointmentsSection() {

  const { websiteTheme } = useThemeStore();
  const taskHours = [
    { name: "Patient Diagnosis", completed: 33, color: "bg-red-500" },
    { name: "Surgical Procedure", completed: 25, color: "bg-blue-500" },
    { name: "Prescription Management", completed: 12, color: "bg-gray-800" },
    { name: "Patient Monitoring", completed: 10, color: "bg-purple-500" },
    { name: "Medical Research", completed: 7, color: "bg-green-500" },
    { name: "Consultation Scheduling", completed: 13, color: "bg-cyan-500" },
  ];

  const appointments = [
    {
      id: 1,
      name: "Cara Stevens",
      condition: "Fever",
      date: "12 June '20",
      time: "09:00-10:00",
      image: "/assets/sidebar/patient.jpg",
    },
    {
      id: 2,
      name: "Airi Satou",
      condition: "Cholera",
      date: "13 June '20",
      time: "11:00-12:00",
      image: "/assets/patient-1.jpg",
    },
    {
      id: 3,
      name: "Jens Brincker",
      condition: "Jaundice",
      date: "15 June '20",
      time: "09:30-10:30",
      image: "/assets/sidebar/patient.jpg",
    },
    {
      id: 4,
      name: "Angelica Ramos",
      condition: "Typhoid",
      date: "16 June '20",
      time: "14:00-15:00",
      image: "/assets/patient-1.jpg",
    },
    {
      id: 5,
      name: "Cara Stevens",
      condition: "Malaria",
      date: "18 June '20",
      time: "11:00-12:30",
      image: "/assets/sidebar/patient.jpg",
    },
    {
      id: 6,
      name: "Jacob Ryan",
      condition: "Infection",
      date: "22 June '20",
      time: "13:00-14:15",
      image: "/assets/patient-1.jpg",
    },
  ];

  const emergencyCases = [
    {
      id: 1,
      name: "John Doe",
      condition: "Cardiac Arrest",
      time: "10 min ago",
      bgColor: "bg-red-50 dark:bg-red-900/20",
      textColor: "text-red-600",
    },
    {
      id: 2,
      name: "Sarah Smith",
      condition: "Severe Trauma",
      time: "25 min ago",
      bgColor: "bg-orange-50 dark:bg-orange-900/20",
      textColor: "text-orange-600",
    },
    {
      id: 3,
      name: "Mike Johnson",
      condition: "Stroke",
      time: "45 min ago",
      bgColor: "bg-red-50 dark:bg-red-900/20",
      textColor: "text-red-600",
    },
    {
      id: 4,
      name: "Emily Davis",
      condition: "Severe Burns",
      time: "1 hr ago",
      bgColor: "bg-orange-50 dark:bg-orange-900/20",
      textColor: "text-orange-600",
    },
    {
      id: 5,
      name: "David Wilson",
      condition: "Multiple Fractures",
      time: "1 hr 20 min ago",
      bgColor: "bg-red-50 dark:bg-red-900/20",
      textColor: "text-red-600",
    },
  ];

  const patientAppointments = [
    {
      id: 1,
      name: "John Doe",
      gender: "Male",
      lastVisit: "12/05/2016",
      disease: "Fever",
      diseaseColor: "border-red-500 text-red-600",
      image: "/assets/patient-1.jpg",
    },
    {
      id: 2,
      name: "Sarah S...",
      gender: "Female",
      lastVisit: "12/05/2016",
      disease: "Cholera",
      diseaseColor: "border-green-500 text-green-600",
      image: "/assets/sidebar/patient.jpg",
    },
    {
      id: 3,
      name: "Airi Satou",
      gender: "Male",
      lastVisit: "12/05/2016",
      disease: "Jaundice",
      diseaseColor: "border-blue-500 text-blue-600",
      image: "/assets/patient-1.jpg",
    },
    {
      id: 4,
      name: "Angelica ...",
      gender: "Female",
      lastVisit: "12/05/2016",
      disease: "Typhoid",
      diseaseColor: "border-purple-500 text-purple-600",
      image: "/assets/sidebar/patient.jpg",
    },
    {
      id: 5,
      name: "Ashton C...",
      gender: "Female",
      lastVisit: "12/05/2016",
      disease: "Malaria",
      diseaseColor: "border-orange-500 text-orange-600",
      image: "/assets/patient-1.jpg",
    },
    {
      id: 6,
      name: "Cara Ste...",
      gender: "Male",
      lastVisit: "12/05/2016",
      disease: "Infection",
      diseaseColor: "border-cyan-500 text-cyan-600",
      image: "/assets/sidebar/patient.jpg",
    },
    {
      id: 7,
      name: "Michael ...",
      gender: "Male",
      lastVisit: "12/06/2016",
      disease: "Flu",
      diseaseColor: "border-blue-500 text-blue-600",
      image: "/assets/patient-1.jpg",
    },
  ];

  const totalHours = 3487;
  const expectedHours = 10000;

  return (
    <div className={`min-h-screen max-[767px]:px-[9px] md:p-6 ${websiteTheme === 'dark' ? 'dark-theme' : 'light-theme'}`}
    style={{ backgroundColor: 'var(--background)', color: 'var(--text-primary)' }}>
      {/* Top Three Cards */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
        {/* Task Hours Card */}
        <div className="bg-[var(--header-bg)] rounded-2xl shadow-lg p-5 border border-[var(--border-color)]">
          <h3 className="text-lg font-bold text-[var(--text-primary)] mb-4">Task Hours</h3>

          <div className="mb-6">
            <div className="flex justify-between mb-2">
              <span className="text-sm font-semibold text-[var(--text-primary)]">
                {totalHours} Hours
              </span>
              <span className="text-sm text-[var(--text-secondary)]">
                Expected: {expectedHours}
              </span>
            </div>
            <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden flex">
              {taskHours.map((task, index) => (
                <div
                  key={index}
                  className={task.color}
                  style={{ width: `${task.completed}%` }}
                ></div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex justify-between pb-2 border-b border-[var(--border-color)]">
              <span className="text-sm font-semibold text-[var(--text-primary)]">
                Task Name
              </span>
              <span className="text-sm font-semibold text-[var(--text-primary)]">
                Completed
              </span>
            </div>
            {taskHours.map((task, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${task.color}`}></div>
                  <span className="text-sm text-[var(--text-primary)]">{task.name}</span>
                </div>
                <span className="text-sm font-semibold text-[var(--text-primary)]">
                  {task.completed}%
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Appointments Card */}
        <div className="bg-[var(--header-bg)] rounded-2xl shadow-lg p-5 border border-[var(--border-color)]">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold text-[var(--text-primary)]">Appointments</h3>
            <button className="text-blue-600 text-sm font-semibold hover:text-blue-700">
              View All
            </button>
          </div>

          <div className="space-y-4">
            {appointments.map((apt) => (
              <div
                key={apt.id}
                className="flex items-center gap-3 pb-3 border-b border-[var(--border-color)] last:border-0"
              >
                <img
                  src={apt.image}
                  alt={apt.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="flex-1">
                  <div className="font-semibold text-[var(--text-primary)] text-sm">
                    {apt.name}
                  </div>
                  <div className="text-xs text-[var(--text-secondary)]">{apt.condition}</div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-[var(--text-primary)]">
                    {apt.date}
                  </div>
                  <div className="text-xs text-[var(--text-secondary)]">{apt.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Emergency Cases Card */}
        <div className="bg-[var(--header-bg)] rounded-2xl shadow-lg overflow-hidden relative border border-[var(--border-color)]">
          <div className="flex justify-between items-center p-5 border-b border-red-100 dark:border-red-900/30">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 bg-red-500 rounded-lg flex items-center justify-center">
                <svg
                  className="w-4 h-4 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <h3 className="text-base font-bold text-[var(--text-primary)]">
                Emergency Cases
              </h3>
            </div>
            <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-bold">5</span>
            </div>
          </div>

          <div className="p-5 space-y-3">
            {emergencyCases.map((emergency) => (
              <div
                key={emergency.id}
                className="flex items-start justify-between"
              >
                <div>
                  <div className="font-semibold text-[var(--text-primary)] text-sm mb-1">
                    {emergency.name}
                  </div>
                  <div
                    className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${emergency.bgColor} ${emergency.textColor}`}
                  >
                    {emergency.condition}
                  </div>
                </div>
                <span className="text-xs text-[var(--text-secondary)]">{emergency.time}</span>
              </div>
            ))}
          </div>

          <button className="w-full mt-4 text-blue-600 text-sm font-semibold hover:text-blue-700 p-4">
            View All Emergency Cases
          </button>
        </div>
      </div>

      {/* Bottom Section - Table and Chart */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Appointments Table */}
        <div className="lg:col-span-2 bg-[var(--header-bg)] rounded-2xl shadow-lg p-5 border border-[var(--border-color)]">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-[var(--text-primary)]">Appointments</h3>
            <button className="text-blue-600 text-sm font-semibold hover:text-blue-700">
              View All
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[var(--border-color)]">
                  <th className="text-left py-4 px-3 text-sm font-semibold text-[var(--text-primary)]">
                    Patient Name
                  </th>
                  <th className="text-left py-4 px-3 text-sm font-semibold text-[var(--text-primary)]">
                    Gender
                  </th>
                  <th className="text-left py-4 px-3 text-sm font-semibold text-[var(--text-primary)]">
                    Last Visit
                  </th>
                  <th className="text-left py-4 px-3 text-sm font-semibold text-[var(--text-primary)]">
                    Diseases
                  </th>
                  <th className="text-center py-4 px-3 text-sm font-semibold text-[var(--text-primary)]">
                    Report
                  </th>
                  <th className="text-center py-4 px-3 text-sm font-semibold text-[var(--text-primary)]">
                    Details
                  </th>
                </tr>
              </thead>
              <tbody>
                {patientAppointments.map((patient) => (
                  <tr
                    key={patient.id}
                    className="border-b border-[var(--border-color)] hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                  >
                    <td className="py-1 px-3">
                      <div className="flex items-center gap-3">
                        <img
                          src={patient.image}
                          alt={patient.name}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <span className="text-sm text-[var(--text-primary)]">
                          {patient.name}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-3 text-sm text-[var(--text-primary)]">
                      {patient.gender}
                    </td>
                    <td className="py-4 px-3 text-sm text-[var(--text-primary)]">
                      {patient.lastVisit}
                    </td>
                    <td className="py-4 px-3">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium border ${patient.diseaseColor}`}
                      >
                        {patient.disease}
                      </span>
                    </td>
                    <td className="py-4 px-3">
                      <div className="flex justify-center">
                        <button className="text-red-500 hover:text-red-600 transition">
                          <FileText size={20} />
                        </button>
                      </div>
                    </td>
                    <td className="py-4 px-3">
                      <div className="flex justify-center">
                        <button className="text-blue-600 text-sm font-semibold hover:text-blue-700">
                          Details
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Appointment Review Card */}
        <div className="bg-[var(--header-bg)] rounded-2xl shadow-lg p-5 flex flex-col border border-[var(--border-color)]">
          <h3 className="text-base font-bold text-[var(--text-primary)] mb-4">
            Appointment Review
          </h3>

          <div className="flex-1 flex items-center justify-center py-2">
            <div className="relative w-48 h-48">
              <svg viewBox="0 0 200 200" className="transform -rotate-90">
                {/* Background circles */}
                <circle
                  cx="100"
                  cy="100"
                  r="70"
                  fill="none"
                  stroke="#f0f0f0"
                  strokeWidth="20"
                />
                <circle
                  cx="100"
                  cy="100"
                  r="70"
                  fill="none"
                  stroke="#f0f0f0"
                  strokeWidth="20"
                />
                <circle
                  cx="100"
                  cy="100"
                  r="70"
                  fill="none"
                  stroke="#f0f0f0"
                  strokeWidth="20"
                />

                {/* Orange arc - Face To Face */}
                <circle
                  cx="100"
                  cy="100"
                  r="70"
                  fill="none"
                  stroke="#F59E0B"
                  strokeWidth="20"
                  strokeDasharray="150 440"
                  strokeLinecap="round"
                />

                {/* Blue arc - E-Consult */}
                <circle
                  cx="100"
                  cy="100"
                  r="70"
                  fill="none"
                  stroke="#3B82F6"
                  strokeWidth="20"
                  strokeDasharray="120 440"
                  strokeDashoffset="-150"
                  strokeLinecap="round"
                />

                {/* Green arc - Available */}
                <circle
                  cx="100"
                  cy="100"
                  r="70"
                  fill="none"
                  stroke="#10B981"
                  strokeWidth="20"
                  strokeDasharray="100 440"
                  strokeDashoffset="-270"
                  strokeLinecap="round"
                />
              </svg>

              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-xs text-[var(--text-secondary)] mb-1">Total</span>
                <span className="text-3xl font-bold text-[var(--text-primary)]">249</span>
              </div>
            </div>
          </div>

          <div className="flex justify-center gap-4 mb-4">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-orange-500"></div>
              <span className="text-xs text-[var(--text-primary)]">Face To Face</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-blue-500"></div>
              <span className="text-xs text-[var(--text-primary)]">E-Consult</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
              <span className="text-xs text-[var(--text-primary)]">Available</span>
            </div>
          </div>

          <button className="w-full py-2 border-2 border-blue-600 text-blue-600 rounded-full font-semibold text-sm hover:bg-blue-50 dark:hover:bg-blue-900/20 transition">
            Modify Availability
          </button>
        </div>
      </div>
    </div>
  );
}