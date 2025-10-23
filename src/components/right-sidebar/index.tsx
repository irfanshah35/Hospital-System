"use client";

import React, { useState } from "react";
import { Check, Settings } from "lucide-react";
import { useThemeStore } from "@/store/store";

const RightSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [layout, setLayout] = useState("light");
  const [rtl, setRtl] = useState(false);

  const { sidebarTheme, setSidebarTheme, headerColor, setHeaderColor } = useThemeStore();

  const themes = [
    { name: "white", color: "bg-white border-2" },
    { name: "black", color: "bg-black" },
    { name: "purple", color: "bg-purple-600" },
    { name: "orange", color: "bg-orange-500" },
    { name: "cyan", color: "bg-cyan-500" },
    { name: "green", color: "bg-green-500" },
    { name: "blue", color: "bg-blue-600" },
  ];

  return (
    <>
      <div
        className={`fixed top-[60px] z-[9999] right-0 h-screen bg-white border-l border-gray-200 transition-all duration-300 ease-in-out ${
          isOpen ? "w-[245px] h-auto" : "w-0"
        } overflow-auto scrollbar-hide shadow-lg`}
      >
        <div className="fade show active bg-white text-gray-800 w-full">
          {/* --- Title --- */}
          <div className="flex items-center justify-center px-5 py-[18px] text-[#3f4254] text-[16px] font-medium tracking-[0.3px] border-b border-black/5 bg-gradient-to-r from-[#f8f9fa] to-[#f1f2f6] shadow-[0_1px_3px_#0000000d] relative">
            Setting Panel
          </div>

          {/* --- Layout Select --- */}
          <div className="p-4 border-b border-[#dee2e6]">
            <p className="font-medium text-[14px] pb-2 mb-3 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:top-7 after:w-[40px] after:h-[2px] after:bg-[#6777ef] after:rounded-[2px]">
              Select Layout
            </p>
            <div className="flex flex-col justify-center items-center gap-4">
              {/* Light Layout */}
              <div className="flex flex-col items-center w-[180px]">
                <label>
                  <input
                    type="radio"
                    name="layout"
                    value="light"
                    checked={layout === "light"}
                    onChange={() => setLayout("light")}
                    className="hidden peer"
                  />
                  <img
                    src="/assets/rightSidebar/light.png"
                    alt="Light Layout"
                    className="cursor-pointer rounded-md border border-gray-200 peer-checked:ring-2 peer-checked:ring-blue-500"
                  />
                </label>
                <div className="mt-1 text-sm font-medium text-center">Light</div>
              </div>

              {/* Dark Layout */}
              <div className="flex flex-col items-center w-[180px]">
                <label>
                  <input
                    type="radio"
                    name="layout"
                    value="dark"
                    checked={layout === "dark"}
                    onChange={() => setLayout("dark")}
                    className="hidden peer"
                  />
                  <img
                    src="/assets/rightSidebar/dark.png"
                    alt="Dark Layout"
                    className="cursor-pointer rounded-md border border-gray-200 peer-checked:ring-2 peer-checked:ring-blue-500"
                  />
                </label>
                <div className="mt-1 text-sm font-medium text-center">Dark</div>
              </div>
            </div>
          </div>

          {/* ✅ Sidebar Menu Color */}
          <div className="px-[25px] pt-[20px] pb-[15px] border-b border-[#dee2e6]">
            <p className="font-medium text-[14px] pb-2 mb-3 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:top-7 after:w-[40px] after:h-[2px] after:bg-[#6777ef] after:rounded-[2px]">
              Sidebar Menu Color
            </p>
            <div className="flex">
              <button
                onClick={() => setSidebarTheme("light")}
                className={`px-4 py-2 flex outline-none rounded-l-md text-sm ${
                  sidebarTheme === "light"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-700"
                } transition`}
              >
                {sidebarTheme === "light" && (
                  <Check className="w-5 h-5 mr-2 text-white" />
                )}
                Light
              </button>
              <button
                onClick={() => setSidebarTheme("dark")}
                className={`px-4 py-2 flex outline-none rounded-r-md text-sm ${
                  sidebarTheme === "dark"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-700"
                } transition`}
              >
                {sidebarTheme === "dark" && (
                  <Check className="w-5 h-5 mr-2 !text-white" />
                )}
                Dark
              </button>
            </div>
          </div>

          {/* ✅ NEW: Header Color Theme */}
          <div className="p-4 border-b border-[#dee2e6]">
            <p className="font-medium text-[14px] pb-2 mb-3 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:top-7 after:w-[40px] after:h-[2px] after:bg-[#6777ef] after:rounded-[2px]">
              Header Color
            </p>
            <ul className="flex flex-wrap gap-3">
              {themes.map((t) => (
                <li
                  key={t.name}
                  className={`w-8 h-8 rounded-full shadow-md cursor-pointer border-2 transition-all ${
                    headerColor === t.name
                      ? "border-blue-600 scale-110"
                      : "border-gray-300"
                  } ${t.color}`}
                  onClick={() => setHeaderColor(t.name)}
                ></li>
              ))}
            </ul>
          </div>

          {/* RTL Layout */}
          <div className="p-4 mb-[50px]">
            <p className="font-medium text-[14px] pb-2 mb-3 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:top-7 after:w-[40px] after:h-[2px] after:bg-[#6777ef] after:rounded-[2px]">
              RTL Layout
            </p>
            <div className="flex flex-col gap-3">
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={rtl}
                  onChange={() => setRtl(!rtl)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-300 rounded-full peer peer-checked:bg-blue-600 transition"></div>
                <div className="absolute left-0.5 top-0.5 bg-white w-5 h-5 rounded-full transition-all peer-checked:translate-x-5"></div>
              </label>
              <div className="flex gap-2 text-sm">
                <span
                  className={`${
                    !rtl ? "text-blue-600 font-medium" : "text-gray-600"
                  }`}
                >
                  LTR
                </span>
                <span
                  className={`${
                    rtl ? "text-blue-600 font-medium" : "text-gray-600"
                  }`}
                >
                  RTL
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed top-[40%] transition-all duration-300 ease-in-out flex items-center justify-center text-white rounded-l-[12px] shadow-[0_3px_10px_#00000026]
          bg-gradient-to-br from-[#6777ef] to-[#4e66e8] p-[15px] outline-none text-[14px] no-underline
          ${isOpen ? "right-[245px]" : "right-0"}
          w-[42px] h-[42px]
          hover:opacity-90 p-0`}
      >
        <Settings className="min-w-[22px] min-h-[22px]" />
      </button>
    </>
  );
};

export default RightSidebar;