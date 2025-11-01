"use client";

import { User, Scissors, UserPlus, DollarSign, Home, CalendarDays } from "lucide-react";
import dynamic from "next/dynamic";
import { ApexOptions } from "apexcharts";
import Link from "next/link";
import { useThemeStore } from "@/store/store";


const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const StatsCard = () => {
  const { websiteTheme } = useThemeStore();
  const stats = [
    {
      title: "Appointments",
      count: 650,
      color: "purple",
      icon: <User className="text-white w-6 h-6" />,
      chartData: [50, 80, 50, 78, 52, 45, 52, 30, 45, 55, 30, 40, 93, 50],
    },
    {
      title: "Operations",
      count: 54,
      color: "orange",
      icon: <Scissors className="text-white w-6 h-6" />,
      chartData: [50, 80, 50, 78, 52, 45, 52, 30, 45, 55, 30, 40, 93, 50],
    },
    {
      title: "New Patients",
      count: 129,
      color: "green",
      icon: <UserPlus className="text-white w-6 h-6" />,
      chartData: [50, 80, 50, 78, 52, 45, 52, 30, 45, 55, 30, 40, 93, 50],
    },
    {
      title: "Earning",
      count: "20,125",
      color: "blue",
      icon: <DollarSign className="text-white w-6 h-6" />,
      chartData: [50, 80, 50, 78, 52, 45, 52, 30, 45, 55, 30, 40, 93, 50],
    },
  ];

  const colorClasses = {
    purple: { bg: "bg-purple-100", iconBg: "bg-purple-600", chartColor: "#9333ea" },
    orange: { bg: "bg-orange-100", iconBg: "bg-orange-600", chartColor: "#ea580c" },
    green: { bg: "bg-green-100", iconBg: "bg-green-600", chartColor: "#16a34a" },
    blue: { bg: "bg-blue-100", iconBg: "bg-blue-600", chartColor: "#2563eb" },
  };

  const getChartOptions = (color: string): ApexOptions => ({
    
    chart: {
      type: "area",
      height: 80,
      sparkline: {
        enabled: true,
      },
      toolbar: {
        show: false,
      },
      animations: {
        enabled: true,
        speed: 800,
        animateGradually: {
          enabled: true,
          delay: 150,
        },
      },
    },
    stroke: {
      curve: "smooth",
      width: 3,
      lineCap: "round",
    },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.5,
        opacityTo: 0.05,
        stops: [0, 100],
      },
    },
    colors: [color],
    tooltip: {
      enabled: true,
      theme: "dark",
      fixed: {
        enabled: false,
      },
      x: {
        show: false,
      },
      y: {
        title: {
          formatter: (seriesName: string) => "",
        },
        formatter: (value: number) => `${value}`,
      },
      marker: {
        show: true,
      },
      style: {
        fontSize: "12px",
        fontFamily: "inherit",
      },
    },
    markers: {
      size: 0,
      hover: {
        size: 6,
        sizeOffset: 3,
      },
    },
    grid: {
      show: false,
      padding: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
      },
    },
    xaxis: {
      labels: {
        show: false,
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      labels: {
        show: false,
      },
    },
  });

  return (
    <div>
    <div className={`flex flex-col md:flex-row md:items-center md:justify-between px-4 md:px-6 py-3 mt-8 gap-3 md:gap-0 ${websiteTheme === 'dark' ? 'text-[#96A2B4]' : 'light-theme'}`}>
      {/* Breadcrumb Section */}
      <div className="flex items-center space-x-2">
        <h1 className="text-base md:text-lg font-semibold">Dashboard</h1>
        <span className="hidden sm:inline">›</span>
        <Home size={18} className="text-gray-500 hidden sm:block" />
        <span className="hidden sm:inline">›</span>
        <span className="hidden sm:inline">Dashboard</span>
      </div>

      {/* Action Buttons Section */}
      <div className="flex items-center gap-3 md:gap-6 font-medium flex-wrap">
        <Link href="/add-patient" className="flex items-center space-x-1 hover:text-blue-800 transition">
          <UserPlus size={18} />
          <span className="text-blue-600 text-sm md:text-base">Add Patient</span>
        </Link>
        <Link href="/appointment/appointment-calendar" className="flex items-center space-x-1 hover:text-blue-800 transition cursor-pointer">
          <CalendarDays size={18} />
          <span className="text-blue-600 text-sm md:text-base">Appointment</span>
        </Link>
      </div>
    </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-6">
        {stats.map((item, index) => {
          const selectedColor = colorClasses[item.color as keyof typeof colorClasses] || colorClasses.purple;

          return (
            <div
              key={index}
              className={`relative ${selectedColor.bg} rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden h-[180px]`}
            >
              {/* Content */}
              <div className="relative z-10 p-4">
                <div className="flex justify-between items-start mb-3">
                  {/* Icon */}
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center ${selectedColor.iconBg} shadow-md`}
                  >
                    {item.icon}
                  </div>

                  {/* Title & Count */}
                  <div className="flex flex-col items-end">
                    <span className="text-gray-700 text-sm font-medium">
                      {item.title}
                    </span>
                    <span className="text-gray-900 text-3xl font-bold mt-1">
                      {item.count}
                    </span>
                  </div>
                </div>
              </div>

              <div className="absolute bottom-0 left-0 right-0 h-[80px] w-full">
                <Chart
                  options={getChartOptions(selectedColor.chartColor)}
                  series={[{ name: item.title, data: item.chartData }]}
                  type="area"
                  height={80}
                  width="100%"
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StatsCard;