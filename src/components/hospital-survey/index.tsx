import React from "react";
import { Settings, TrendingUp } from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

export default function HospitalSurvey() {
  const surveyData = [
    { date: "Apr '24", newPatients: 52, oldPatients: 32 },
    { date: "15 Apr", newPatients: 48, oldPatients: 30 },
    { date: "May '24", newPatients: 45, oldPatients: 28 },
    { date: "15 May", newPatients: 65, oldPatients: 38 },
    { date: "Jun '24", newPatients: 82, oldPatients: 52 },
    { date: "15 Jun", newPatients: 78, oldPatients: 45 },
  ];

  const revenueData = [
    { value: 45 },
    { value: 52 },
    { value: 48 },
    { value: 68 },
    { value: 58 },
    { value: 62 },
    { value: 48 },
    { value: 42 },
    { value: 38 },
    { value: 72 },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">
      {/* Hospital Survey Chart - Takes 2 columns */}
      <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg p-6 h-fit">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800">Hospital Survey</h2>
          <select className="px-4 py-2 border border-gray-200 rounded-lg text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>Monthly</option>
            <option>Weekly</option>
            <option>Yearly</option>
          </select>
        </div>

        <div className="h-[240px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={surveyData}
              margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorNew" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1} />
                </linearGradient>
                <linearGradient id="colorOld" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f97316" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#f97316" stopOpacity={0.1} />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="0"
                stroke="#e5e7eb"
                vertical={false}
              />
              <XAxis
                dataKey="date"
                tick={{ fill: "#9ca3af", fontSize: 13 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fill: "#9ca3af", fontSize: 13 }}
                axisLine={false}
                tickLine={false}
                ticks={[0, 20, 40, 60, 80, 100]}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1f2937",
                  border: "none",
                  borderRadius: "8px",
                  color: "#fff",
                  padding: "8px 12px",
                }}
                labelStyle={{ color: "#fff", marginBottom: "4px" }}
              />
              <Legend
                verticalAlign="top"
                height={50}
                iconType="circle"
                wrapperStyle={{ paddingBottom: "20px" }}
              />
              <Area
                type="monotone"
                dataKey="newPatients"
                stroke="#3b82f6"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#colorNew)"
                name="New Patients"
              />
              <Area
                type="monotone"
                dataKey="oldPatients"
                stroke="#f97316"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#colorOld)"
                name="Old Patients"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Right Side Cards - Takes 1 column */}
      <div className="space-y-6">
        {/* Total Appointments Card */}
        <div className="bg-white rounded-2xl shadow-lg p-6 relative">
          <h3 className="text-md font-semibold text-gray-800 mb-6 text-center">
            Total Appointments
          </h3>

          <div className="text-4xl font-bold text-center mb-8 text-gray-900">
            128
          </div>

          <div className="grid grid-cols-2 gap-20">
            <div className="bg-blue-500 rounded-xl p-3 text-center">
              <div className="text-2xl font-bold text-white mb-2">73</div>
              <div className="text-sm text-white font-medium">Completed</div>
            </div>
            <div className="bg-orange-500 rounded-xl p-3 text-center">
              <div className="text-2xl font-bold text-white mb-2">55</div>
              <div className="text-sm text-white font-medium">Upcomming</div>
            </div>
          </div>
        </div>

        {/* Revenue Card */}
        <div className="bg-white rounded-2xl shadow-lg p-6">

          <div className="flex items-end justify-between gap-6">
            {/* Left side - Revenue details */}
            <div className="flex flex-col gap-2">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Revenue</h3>

              <span className="text-xl font-bold text-gray-900">$4,589</span>
              <span className="flex items-center gap-1 text-sm font-semibold text-blue-600">
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="8 12 12 8 16 12" />
                  <line x1="12" y1="16" x2="12" y2="8" />
                </svg>
                +7.5%
              </span>
            </div>

            {/* Right side - Bar chart */}
            <div className="flex items-end h-20 gap-1.5 flex-1">
              {revenueData.map((item, index) => (
                <div
                  key={index}
                  className="bg-blue-500 rounded-md flex-1 transition-all hover:bg-blue-600"
                  style={{ height: `${item.value}%` }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
