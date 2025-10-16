"use client";
import Link from "next/link";
import React, { useState } from "react";
import {
  LayoutDashboard,
  ClipboardList,
  FileText,
  FileArchive,
  Receipt,
  MessageSquare,
  Settings,
  LogOut,
  Plus,
} from "lucide-react";

export default function SideBar() {
  const [openDropdown, setOpenDropdown] = useState(false);

  const sidebarMenu = [
    {
      title: "Dashboard",
      icon: LayoutDashboard,
      path: "#/patient/dashboard",
    },
    {
      title: "Appointments",
      icon: ClipboardList,
      children: [
        { title: "Book Appointment", path: "#/patient/appointments/book" },
        { title: "Today Appointments", path: "#/patient/appointments/today" },
        {
          title: "Upcoming Appointments",
          path: "#/patient/appointments/upcoming",
        },
        { title: "Past Appointments", path: "#/patient/appointments/past" },
      ],
    },
    {
      title: "Prescriptions",
      icon: FileText,
      path: "#/patient/prescriptions",
    },
    {
      title: "Medical Record",
      icon: FileArchive,
      path: "#/patient/records",
    },
    {
      title: "Billing",
      icon: Receipt,
      path: "#/patient/billing",
    },
    {
      title: "Chat",
      icon: MessageSquare,
      path: "#/apps/chat",
    },
    {
      title: "Settings",
      icon: Settings,
      path: "#/patient/settings",
    },
    {
      title: "Logout",
      icon: LogOut,
      path: "#/logout",
    },
  ];

  return (
    <>
      <aside className="w-[260px] overflow-hidden h-[calc(100dvh-60px)] fixed top-[60px] bg-white z-[9999]">
        <div className="h-dvh overflow-y-auto min-w-full min-h-full">
          <ul>
            <li className="sidebar-user-panel">
              <div className="pt-[25px] pb-[10px] w-full">
                <div className="w-[35%] max-w-[75px] mx-auto">
                  <img
                    alt="User Image"
                    className="max-w-full rounded-[15%] shadow-[0_5px_25px_#0003] bg-white p-[2px]"
                    src="/assets/sidebar/patient.jpg"
                  />
                </div>
              </div>
              <div className="text-center text-[#060606]">
                <div className="text-[14px] font-[roboto] font-medium">
                  Cara Stevens{" "}
                </div>
                <div className="font-[roboto] text-[11px]">PATIENT </div>
              </div>
            </li>

            <li>
              <div className="mt-[45px] ml-[28px] mb-[5px] text-[12px] uppercase">
                Main
              </div>
            </li>

            {sidebarMenu.map((item, index) => (
              <li key={index}>
                {/* Dropdown for Appointments */}
                {item.children ? (
                  <>
                    <button
                      onClick={() => setOpenDropdown(!openDropdown)}
                      className="relative flex items-center justify-between overflow-hidden text-black text-[14px] leading-8 cursor-pointer
                      p-[9px] mt-[8px] mx-[13px] rounded-lg transition-all duration-300 ease-in-out hover:bg-[#f0f3fb] w-full">
                      <div className="flex items-center">
                        <item.icon size={18} strokeWidth={1.8} />
                        <span className="ml-3">{item.title}</span>

                        <Plus
                          size={16}
                          className={`transition-transform duration-300 ${
                            openDropdown
                              ? "rotate-45 "
                              : "text-gray-600"
                          }`}
                        />
                      </div>
                    </button>

                    {openDropdown && (
                      <ul className="ml-8 mt-1 space-y-1">
                        {item.children.map((child, i) => (
                          <li key={i}>
                            <Link
                              href={child.path}
                              className="block text-[13px] text-gray-600 hover:text-blue-600 transition-colors">
                              {child.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </>
                ) : (
                  <Link
                    className={`relative flex items-center justify-content-center overflow-hidden text-black text-[14px] leading-8 cursor-pointer
                    p-[9px] mt-[8px] mx-[13px] rounded-lg transition-all duration-300 ease-in-out  ${
                      item.title === "Logout"
                        ? "bg-[#f44336] hover:bg-[#ea1c0d]"
                        : "hover:bg-[#f0f3fb]"
                    }`}
                    href={item.path || "#"}>
                    <item.icon size={18} strokeWidth={1.8} />
                    <span className="ml-3">{item.title}</span>
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </>
  );
}
