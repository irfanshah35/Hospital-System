"use client";
import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { CalendarDays } from "lucide-react";

const data = [
  { name: "Dengue", value: 22, color: "#748CF1" },
  { name: "Malaria", value: 20, color: "#5C6BC0" },
  { name: "Cold", value: 18, color: "#B0BEC5" },
  { name: "Typhoid", value: 15, color: "#F4A261" },
];

export default function Appointments() {
  const [time, setTime] = useState<number>(Date.now());

  useEffect(() => {
    setTime(Date.now());
  }, []);

  return (
    <div className={`grid grid-cols-1 md:grid-cols-3 gap-6 p-6 rounded-xl shadow-sm `}>
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-lg font-semibold mb-4">Patient Chart</h2>
        <div className="flex justify-center gap-8 text-sm mb-6">
          <button className="font-medium text-blue-500">Daily</button>
          <button className="text-blue-500">Weekly</button>
          <button className="text-blue-500">Monthly</button>
        </div>
        <div className="flex justify-center relative">
          <ResponsiveContainer width={240} height={240}>
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                innerRadius={70}
                outerRadius={95}
                paddingAngle={2}
                labelLine={false}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="text-center text-3xl font-semibold -mt-36 mb-12">
          75
          <div className="text-sm text-gray-500 font-normal mt-1">
            Total People
          </div>
        </div>

        <div
          className="grid grid-cols-2 gap-x-12 mt-[85px] gap-y-4 text-sm mx-auto"
          style={{ maxWidth: "280px" }}
        >
          {data.map((d) => (
            <div key={d.name} className="flex items-center gap-3">
              <span
                className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: d.color }}
              >
                <span className="text-white text-lg">❄️</span>
              </span>
              <div>
                <div className="font-medium  text-sm">
                  {d.name}
                </div>
                <div className="text-sm">{d.value}%</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow p-6">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-lg font-semibold">Appointments</h2>
          <span className="text-sm ">October 2025</span>
        </div>

        <p className="text-sm text-orange-500 font-medium mb-3">
          6 appointments today
        </p>

        <div className="space-y-3">
          {[
            {
              name: "Eva Green",
              task: "Task",
              doctor: "Dr. Mehta",
              time: "09:00 AM",
            },
            {
              name: "Bob Johnson",
              task: "Meeting",
              doctor: "Dr. Mehta",
              time: "10:00 AM",
            },
            {
              name: "John Doe",
              task: "Follow-Up Visit",
              doctor: "Dr. Verma",
              time: "11:00 AM",
            },
          ].map((a, i) => (
            <div
              key={i}
              className="flex justify-between items-center border rounded-lg p-3  transition"
            >
              <div>
                <h3 className="font-medium">{a.name}</h3>
                <p className="text-sm text-blue-500">{a.task}</p>
                <p className="text-xs">👨‍⚕️ {a.doctor}</p>
              </div>
              <div className="text-sm font-semibold text-gray-600">
                {a.time}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow p-6">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-lg font-semibold">October 2025</h2>
          <CalendarDays className="w-5 h-5" />
        </div>

        <div className="grid grid-cols-7 text-center text-sm mb-2">
          <span>M</span>
          <span>T</span>
          <span>W</span>
          <span>T</span>
          <span>F</span>
          <span>S</span>
          <span>S</span>
        </div>

        <div className="grid grid-cols-7 gap-2 text-center ">
          {Array.from({ length: 31 }, (_, i) => (
            <div
              key={i}
              className={`py-2 rounded-lg ${i + 1 === 16
                  ? "border border-blue-500 text-blue-600"
                  : ""
                }`}
            >
              {i + 1}
            </div>
          ))}
        </div>

        <div className="flex gap-4 text-sm mt-4 justify-center">
          <div className="flex items-center gap-1">
            <span className="w-3 h-3 bg-blue-500 rounded-full"></span> Surgery
          </div>
          <div className="flex items-center gap-1">
            <span className="w-3 h-3 bg-red-500 rounded-full"></span> Polyclinic
          </div>
          <div className="flex items-center gap-1">
            <span className="w-3 h-3 bg-green-500 rounded-full"></span>{" "}
            Evaluation
          </div>
        </div>
      </div>
    </div>
  );
}
