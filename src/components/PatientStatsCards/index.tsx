"use client";

import dynamic from "next/dynamic";
import { ApexOptions } from "apexcharts";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const PatientStatsCards = () => {
  // Resting Heart Rate Chart Options
  const restingHeartRateOptions: ApexOptions = {
    chart: {
      type: "line",
      height: 320,
      toolbar: { show: false },
      zoom: { enabled: false },
      sparkline: { enabled: false },
    },
    stroke: {
      curve: "smooth",
      width: 3,
      colors: ["#FFA726"],
    },
    markers: {
      size: 0,
      colors: ["#FFA726"],
      strokeColors: "#fff",
      strokeWidth: 2,
      hover: { size: 8 },
    },
    dataLabels: {
      enabled: true,
      background: {
        enabled: true,
        foreColor: "#FFA726",
        borderRadius: 4,
        padding: 4,
        borderWidth: 0,
      },
      style: {
        fontSize: "11px",
        fontWeight: "bold",
        colors: ["#FFA726"],
      },
      offsetY: -15,
    },
    xaxis: {
      categories: ["Mon", "Tue", "Wed", "Thu"],
      labels: {
        style: { colors: "#9E9E9E", fontSize: "12px" },
      },
      axisBorder: { show: false },
      axisTicks: { show: false },
      title: {
        text: "Weekday",
        style: { color: "#9E9E9E", fontSize: "12px", fontWeight: 400 },
        offsetY: 10,
      },
    },
    yaxis: {
      min: 65,
      max: 90,
      tickAmount: 5,
      labels: {
        style: { colors: "#9E9E9E", fontSize: "11px" },
      },
      title: {
        text: "Heart Rate",
        style: { color: "#9E9E9E", fontSize: "11px", fontWeight: 400 },
        rotate: -90,
      },
    },
    grid: {
      borderColor: "#E8E8E8",
      strokeDashArray: 3,
      xaxis: { lines: { show: false } },
      yaxis: { lines: { show: true } },
      padding: {
        top: 0,
        right: 20,
        bottom: 0,
        left: 10,
      },
    },
    tooltip: {
      enabled: true,
      y: { formatter: (val) => `${val} bpm` },
    },
  };

  const restingHeartRateData = [{ name: "Heart Rate", data: [75, 72, 69, 75] }];

  // Performance Heart Rate Chart Options
  const performanceHeartRateOptions: ApexOptions = {
    chart: {
      type: "line",
      height: 320,
      toolbar: { show: false },
      zoom: { enabled: false },
      sparkline: { enabled: false },
    },
    stroke: {
      curve: "smooth",
      width: 3,
      colors: ["#616161"],
    },
    markers: {
      size: 0,
      colors: ["#616161"],
      strokeColors: "#fff",
      strokeWidth: 2,
      hover: { size: 8 },
    },
    dataLabels: {
      enabled: true,
      background: {
        enabled: true,
        foreColor: "#616161",
        borderRadius: 4,
        padding: 4,
        borderWidth: 0,
      },
      style: {
        fontSize: "11px",
        fontWeight: "bold",
        colors: ["#616161"],
      },
      offsetY: -15,
    },
    xaxis: {
      categories: ["Tue", "Wed"],
      labels: {
        style: { colors: "#9E9E9E", fontSize: "12px" },
      },
      axisBorder: { show: false },
      axisTicks: { show: false },
      title: {
        text: "Weekday",
        style: { color: "#9E9E9E", fontSize: "12px", fontWeight: 400 },
        offsetY: 10,
      },
    },
    yaxis: {
      min: 110,
      max: 135,
      tickAmount: 5,
      labels: {
        style: { colors: "#9E9E9E", fontSize: "11px" },
      },
      title: {
        text: "Heart Rate",
        style: { color: "#9E9E9E", fontSize: "11px", fontWeight: 400 },
        rotate: -90,
      },
    },
    grid: {
      borderColor: "#E8E8E8",
      strokeDashArray: 3,
      xaxis: { lines: { show: false } },
      yaxis: { lines: { show: true } },
      padding: {
        top: 0,
        right: 20,
        bottom: 0,
        left: 10,
      },
    },
    tooltip: {
      enabled: true,
      y: { formatter: (val) => `${val} bpm` },
    },
  };

  const performanceHeartRateData = [{ name: "Heart Rate", data: [130, 120] }];

  const medications = [
    {
      name: "Econochlor (chloramphenicol-oral)",
      dosage: "1 - 0 - 1",
      icon: "💊",
      iconColor: "text-teal-500",
    },
    {
      name: "Desmopressin tabs",
      dosage: "1 - 1 - 1",
      icon: "💊",
      iconColor: "text-red-500",
    },
    {
      name: "Abciximab-injection",
      dosage: "1 Daily",
      icon: "💉",
      iconColor: "text-blue-500",
    },
    {
      name: "Kevzara sarilumab",
      dosage: "0 - 0 - 1",
      icon: "💊",
      iconColor: "text-orange-500",
    },
    {
      name: "Gentamicin-topical",
      dosage: "1 - 0 - 1",
      icon: "💊",
      iconColor: "text-purple-500",
    },
    {
      name: "Paliperidone palmitate",
      dosage: "1 - 1 - 1",
      icon: "💊",
      iconColor: "text-teal-500",
    },
    {
      name: "Sermorelin-",
      dosage: "1 Daily",
      icon: "💉",
      iconColor: "text-blue-500",
    },
  ];

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Resting Heart Rate Card */}
        <div className="bg-white rounded-2xl shadow-sm p-6 flex flex-col h-[450px]">
          <h3 className="text-lg font-bold text-gray-900 mb-1">
            Resting Heart Rate
          </h3>
          <p className="text-gray-900 mb-4">
            <span className="text-base font-semibold">72 bmp</span>{" "}
            <span className="text-xs text-gray-400">(Average)</span>
          </p>
          <div className="flex-1 -mx-3">
            <Chart
              options={restingHeartRateOptions}
              series={restingHeartRateData}
              type="line"
              height="100%"
            />
          </div>
        </div>

        {/* Performance Heart Rate Card */}
        <div className="bg-white rounded-2xl shadow-sm p-6 flex flex-col h-[450px]">
          <h3 className="text-lg font-bold text-gray-900 mb-1">
            Performance Heart Rate
          </h3>
          <p className="text-gray-900 mb-4">
            <span className="text-base font-semibold">129 bmp</span>{" "}
            <span className="text-xs text-gray-400">(Average)</span>
          </p>
          <div className="flex-1 -mx-3">
            <Chart
              options={performanceHeartRateOptions}
              series={performanceHeartRateData}
              type="line"
              height="100%"
            />
          </div>
        </div>

        {/* Medications Card */}
        <div className="bg-white rounded-2xl shadow-sm p-6 flex flex-col h-[450px]">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-900">Medications</h3>
            <button className="text-blue-600 text-sm font-semibold hover:text-blue-700">
              View All
            </button>
          </div>

          {/* Table Header */}
          <div className="grid grid-cols-2 pb-3 mb-3 border-b border-gray-200">
            <span className="text-sm font-semibold text-gray-900">
              Medicine
            </span>
            <span className="text-sm font-semibold text-gray-900 text-right">
              Dosage
            </span>
          </div>

          {/* Medications List */}
          <div className="flex-1 overflow-y-auto medication-scroll pr-2">
            <div className="space-y-3">
              {medications.map((med, index) => (
                <div
                  key={index}
                  className="grid grid-cols-2 items-center gap-4"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-md">{med.icon}</span>
                    <span className="text-xs text-gray-700 leading-tight">
                      {med.name}
                    </span>
                  </div>
                  <span className="text-xs text-gray-700 text-right">
                    {med.dosage}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientStatsCards;
