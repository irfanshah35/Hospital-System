import React from "react";
import { useThemeStore } from "@/store/store";

export default function UpcomingSurgeries() {
  const { websiteTheme } = useThemeStore();

  const todoItems = [
    {
      id: 1,
      task: "Review patient charts",
      priority: "High",
      priorityColor: "text-orange-500",
      icon: "↑",
    },
    {
      id: 2,
      task: "Complete patient prescr...",
      priority: "High",
      priorityColor: "text-orange-500",
      icon: "↑",
    },
    {
      id: 3,
      task: "Follow-up with patients ...",
      priority: "Normal",
      priorityColor: "text-gray-500",
      icon: "—",
    },
    {
      id: 4,
      task: "Consult with specialists...",
      priority: "High",
      priorityColor: "text-orange-500",
      icon: "↑",
    },
    {
      id: 5,
      task: "Organize medical suppli...",
      priority: "Low",
      priorityColor: "text-green-500",
      icon: "↓",
    },
    {
      id: 6,
      task: "Check and update patie...",
      priority: "High",
      priorityColor: "text-orange-500",
      icon: "↑",
    },
  ];

  const doctorStatus = [
    {
      id: 1,
      name: "Dr.Jay Soni",
      degree: "(MBBS,MD)",
      status: "Available",
      statusColor:
        "bg-teal-100 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300",
      image: "/assets/patient-1.jpg",
    },
    {
      id: 2,
      name: "Dr.Sarah Smith",
      degree: "(BDS,MDS)",
      status: "Absent",
      statusColor:
        "bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-300",
      image: "/assets/sidebar/patient.jpg",
    },
    {
      id: 3,
      name: "Dr.Megha Trivi",
      degree: "(BHMS)",
      status: "Available",
      statusColor:
        "bg-teal-100 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300",
      image: "/assets/patient-1.jpg",
    },
    {
      id: 4,
      name: "Dr.John Deo",
      degree: "(MBBS,MS)",
      status: "Available",
      statusColor:
        "bg-teal-100 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300",
      image: "/assets/sidebar/patient.jpg",
    },
    {
      id: 5,
      name: "Dr.Jacob Ryan",
      degree: "(MBBS,MD)",
      status: "Absent",
      statusColor:
        "bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-300",
      image: "/assets/patient-1.jpg",
    },
    {
      id: 6,
      name: "Dr.Jay Soni",
      degree: "(MBBS)",
      status: "Available",
      statusColor:
        "bg-teal-100 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300",
      image: "/assets/sidebar/patient.jpg",
    },
  ];

  const patientData = {
    days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    male: [45, 58, 62, 58, 65, 62],
    female: [75, 85, 100, 98, 85, 105],
  };

  const surgeries = [
    {
      id: 1,
      patient: "John Smith",
      patientId: "ID: PT-0025",
      surgery: "Cardiac Bypass",
      dateTime: "15 June 2024 | 09:00-11:30",
      doctor: "Dr. Sarah Johnson",
      status: "Scheduled",
      statusColor:
        "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300",
      image: "/assets/patient-1.jpg",
    },
    {
      id: 2,
      patient: "Emily Davis",
      patientId: "ID: PT-0078",
      surgery: "Appendectomy",
      dateTime: "15 June 2024 | 13:00-14:30",
      doctor: "Dr. Michael Chen",
      status: "Urgent",
      statusColor:
        "bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-300",
      image: "/assets/sidebar/patient.jpg",
    },
    {
      id: 3,
      patient: "Robert Wilson",
      patientId: "ID: PT-0036",
      surgery: "Knee Replacement",
      dateTime: "16 June 2024 | 10:00-12:30",
      doctor: "Dr. James Miller",
      status: "Scheduled",
      statusColor:
        "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300",
      image: "/assets/patient-1.jpg",
    },
    {
      id: 4,
      patient: "Maria Garcia",
      patientId: "ID: PT-0042",
      surgery: "Cataract Removal",
      dateTime: "16 June 2024 | 14:00-15:00",
      doctor: "Dr. Lisa Wong",
      status: "Delayed",
      statusColor:
        "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-300",
      image: "/assets/sidebar/patient.jpg",
    },
    {
      id: 5,
      patient: "Daniel Thompson",
      patientId: "ID: PT-0084",
      surgery: "Hip Replacement",
      dateTime: "17 June 2024 | 08:30-11:00",
      doctor: "Dr. Angela Roberts",
      status: "Scheduled",
      statusColor:
        "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300",
      image: "/assets/patient-1.jpg",
    },
    {
      id: 6,
      patient: "Sophia Martinez",
      patientId: "ID: PT-0091",
      surgery: "Tonsillectomy",
      dateTime: "17 June 2024 | 12:00-13:30",
      doctor: "Dr. Kevin Patel",
      status: "Urgent",
      statusColor:
        "bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-300",
      image: "/assets/sidebar/patient.jpg",
    },
  ];

  const maxPatients = 120;

  return (
    <div
      className={`min-h-screen max-[767px]:mt-4 max-[767px]:px-[9px] md:p-6 ${
        websiteTheme === "dark" ? "dark-theme" : "light-theme"
      }`}
      style={{
        backgroundColor: "var(--background)",
        color: "var(--text-primary)",
      }}
    >
      {/* Top Three Cards */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
        {/* Todo List Card */}
        <div className="bg-[var(--header-bg)] rounded-2xl shadow-lg p-5 border border-[var(--border-color)]">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-base font-bold text-[var(--text-primary)]">
              Todo List
            </h3>
            <button className="text-blue-600 text-sm font-semibold hover:text-blue-700">
              View All
            </button>
          </div>

          <div className="space-y-0">
            {todoItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-3 py-6 border-b border-[var(--border-color)] last:border-0"
              >
                <svg
                  className="w-5 h-5 text-[var(--text-secondary)]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 8h16M4 16h16"
                  />
                </svg>
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-[var(--border-color)] bg-[var(--header-bg)]"
                />
                <span className="text-sm text-[var(--text-primary)] flex-1">
                  {item.task}
                </span>
                <span
                  className={`text-sm font-semibold ${item.priorityColor} flex items-center gap-1`}
                >
                  <span>{item.icon}</span>
                  {item.priority}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Doctor Status Card */}
        <div className="bg-[var(--header-bg)] rounded-2xl shadow-lg p-5 border border-[var(--border-color)]">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-base font-bold text-[var(--text-primary)]">
              Doctor Status
            </h3>
            <button className="text-blue-600 text-sm font-semibold hover:text-blue-700">
              View All
            </button>
          </div>

          <div className="space-y-0">
            <div className="flex items-center py-3 border-b border-[var(--border-color)]">
              <span className="text-xs font-semibold text-[var(--text-primary)] flex-1">
                Doctor Name
              </span>
              <span className="text-xs font-semibold text-[var(--text-primary)]">
                Status
              </span>
            </div>
            {doctorStatus.map((doctor) => (
              <div
                key={doctor.id}
                className="flex items-center gap-3 py-3 border-b border-[var(--border-color)] last:border-0"
              >
                <img
                  src={doctor.image}
                  alt={doctor.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div className="flex-1">
                  <div className="text-sm font-semibold text-blue-600">
                    {doctor.name}
                  </div>
                  <div className="text-xs text-[var(--text-secondary)]">
                    {doctor.degree}
                  </div>
                </div>
                <span
                  className={`px-3 py-1 rounded-md text-xs font-medium ${doctor.statusColor}`}
                >
                  {doctor.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Number Of Patients Card */}
        <div className="bg-[var(--header-bg)] rounded-2xl shadow-lg p-5 border border-[var(--border-color)]">
          <h3 className="text-base font-bold text-[var(--text-primary)] mb-4">
            Number Of Patients
          </h3>

          <div className="relative h-64">
            {/* Y-axis labels */}
            <div className="absolute left-0 top-0 bottom-8 flex flex-col justify-between text-xs text-[var(--text-secondary)]">
              <span>120</span>
              <span>100</span>
              <span>80</span>
              <span>60</span>
              <span>40</span>
              <span>20</span>
              <span>0</span>
            </div>

            {/* Chart area */}
            <div className="ml-8 h-full flex items-end justify-around pb-8 border-l border-b border-[var(--border-color)]">
              {patientData.days.map((day, index) => (
                <div
                  key={day}
                  className="flex flex-col items-center gap-1 flex-1"
                >
                  <div
                    className="relative w-full flex justify-center gap-1 items-end"
                    style={{ height: "200px" }}
                  >
                    {/* Male bar */}
                    <div
                      className="w-3 bg-indigo-500 rounded-t"
                      style={{
                        height: `${
                          (patientData.male[index] / maxPatients) * 100
                        }%`,
                      }}
                    ></div>
                    {/* Female bar */}
                    <div
                      className="w-3 bg-gray-400 rounded-t"
                      style={{
                        height: `${
                          (patientData.female[index] / maxPatients) * 100
                        }%`,
                      }}
                    ></div>
                  </div>
                  <span className="text-xs text-[var(--text-secondary)] mt-2">
                    {day}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Legend */}
          <div className="flex justify-center gap-6 mt-2">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-indigo-500 rounded"></div>
              <span className="text-xs text-[var(--text-primary)]">Male</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-gray-400 rounded"></div>
              <span className="text-xs text-[var(--text-primary)]">Female</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section - Table and Feedback Card */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Upcoming Surgeries Table */}
        <div className="lg:col-span-2 bg-[var(--header-bg)] rounded-2xl shadow-lg p-5 border border-[var(--border-color)]">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-base font-bold text-[var(--text-primary)]">
              Upcoming Surgeries & Procedures
            </h3>
            <button className="text-blue-600 text-sm font-semibold hover:text-blue-700">
              View All
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[var(--border-color)]">
                  <th className="text-left py-3 px-3 text-xs font-semibold text-[var(--text-primary)]">
                    Patient
                  </th>
                  <th className="text-left py-3 px-3 text-xs font-semibold text-[var(--text-primary)]">
                    Surgery Type
                  </th>
                  <th className="text-left py-3 px-3 text-xs font-semibold text-[var(--text-primary)]">
                    Date & Time
                  </th>
                  <th className="text-left py-3 px-3 text-xs font-semibold text-[var(--text-primary)]">
                    Doctor
                  </th>
                  <th className="text-center py-3 px-3 text-xs font-semibold text-[var(--text-primary)]">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {surgeries.map((surgery) => (
                  <tr
                    key={surgery.id}
                    className="border-b border-[var(--border-color)] hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                  >
                    <td className="py-2 px-3">
                      <div className="flex items-center gap-2">
                        <img
                          src={surgery.image}
                          alt={surgery.patient}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <div>
                          <div className="text-sm font-semibold text-[var(--text-primary)]">
                            {surgery.patient}
                          </div>
                          <div className="text-xs text-[var(--text-secondary)]">
                            {surgery.patientId}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-3 text-sm text-[var(--text-primary)]">
                      {surgery.surgery}
                    </td>
                    <td className="py-3 px-3 text-sm text-[var(--text-primary)]">
                      {surgery.dateTime}
                    </td>
                    <td className="py-3 px-3 text-sm text-[var(--text-primary)]">
                      {surgery.doctor}
                    </td>
                    <td className="py-3 px-3">
                      <div className="flex justify-center">
                        <span
                          className={`px-3 py-1 rounded-md text-xs font-medium ${surgery.statusColor}`}
                        >
                          {surgery.status}
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Patient Feedback Card */}
        <div className="bg-[var(--header-bg)] rounded-2xl shadow-lg p-5 flex flex-col border border-[var(--border-color)]">
          <h3 className="text-base font-bold text-[var(--text-primary)] mb-6">
            Patient Feedback
          </h3>

          {/* Rating Display */}
          <div className="flex flex-col items-center mb-6">
            <div className="text-5xl font-bold text-green-500 mb-2">4.8</div>
            <div className="flex gap-1 mb-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <svg
                  key={star}
                  className={`w-6 h-6 ${
                    star === 5
                      ? "text-gray-300 dark:text-gray-600"
                      : "text-yellow-400"
                  }`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <div className="text-sm text-[var(--text-secondary)]">
              Overall Rating
            </div>
          </div>

          {/* Donut Chart */}
          <div className="flex-1 flex items-center justify-center mb-6">
            <div className="relative w-56 h-56">
              <svg viewBox="0 0 200 200" className="transform -rotate-90">
                {/* Background circle */}
                <circle
                  cx="100"
                  cy="100"
                  r="70"
                  fill="none"
                  stroke="#f0f0f0"
                  strokeWidth="28"
                />

                {/* Green arc - Excellent (58.4%) */}
                <circle
                  cx="100"
                  cy="100"
                  r="70"
                  fill="none"
                  stroke="#10B981"
                  strokeWidth="28"
                  strokeDasharray="257 440"
                  // strokeLinecap="round"
                />

                {/* Yellow arc - Good (33.0%) */}
                <circle
                  cx="100"
                  cy="100"
                  r="70"
                  fill="none"
                  stroke="#F59E0B"
                  strokeWidth="28"
                  strokeDasharray="145 440"
                  strokeDashoffset="-257"
                  // strokeLinecap="round"
                />

                {/* Red arc - Poor (8.6%) */}
                <circle
                  cx="100"
                  cy="100"
                  r="70"
                  fill="none"
                  stroke="#EF4444"
                  strokeWidth="28"
                  strokeDasharray="38 440"
                  strokeDashoffset="-402"
                  // strokeLinecap="round"
                />
              </svg>

              {/* Percentage labels */}
              <div className="absolute top-24 right-4 text-xs font-semibold text-[var(--text-primary)]">
                58.4%
              </div>
              <div className="absolute top-24 left-5 text-xs font-semibold text-[var(--text-primary)]">
                33.0%
              </div>
              <div className="absolute top-8 left-20 text-xs font-semibold text-[var(--text-primary)]">
                8.6%
              </div>
            </div>
          </div>

          {/* Legend */}
          <div className="flex justify-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-xs text-[var(--text-primary)]">
                Excellent
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <span className="text-xs text-[var(--text-primary)]">Good</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <span className="text-xs text-[var(--text-primary)]">Poor</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
