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
  Minus,
} from "lucide-react";

interface SideBarProps {
  isCollapsed: boolean;
  setIsCollapsed: (value: boolean) => void;
}

export default function SideBar({ isCollapsed, setIsCollapsed }: SideBarProps) {
  const [openDropdown, setOpenDropdown] = useState(false);
  const [activeChild, setActiveChild] = useState(
    "#/patient/appointments/upcoming"
  );
  const [isHovered, setIsHovered] = useState(false);

  // Determine if sidebar should be shown as expanded
  const shouldExpand = !isCollapsed || isHovered;

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
      <aside
        className={`${
          shouldExpand ? "w-[260px]" : "w-[60px]"
        } overflow-x-hidden overflow-y-hidden h-[calc(100dvh-68px)] fixed top-[68px] bg-white z-[9999] group transition-all duration-300`}
        onMouseEnter={() => {
          setIsHovered(true);
          if (isCollapsed) {
            setIsCollapsed(false);
          }
        }}
        onMouseLeave={() => {
          setIsHovered(false);
          if (!isCollapsed) {
            setIsCollapsed(true);
          }
        }}
      >
        <div className="sidebar-scroll h-full overflow-y-auto overflow-x-hidden pb-2">
          <ul>
            {shouldExpand && (
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
            )}

            {shouldExpand && (
              <li>
                <div className="mt-[45px] ml-[28px] mb-[5px] text-[12px] uppercase">
                  Main
                </div>
              </li>
            )}

            {sidebarMenu.map((item, index) => (
              <li key={index}>
                {/* Dropdown for Appointments  */}
                {item.children && shouldExpand ? (
                  <>
                    <button
                      onClick={() => setOpenDropdown(!openDropdown)}
                      className={`relative flex items-center justify-between overflow-hidden pe-6 text-black text-[14px] leading-8 cursor-pointer
  p-[9px] mt-[8px] mx-[13px] rounded-lg transition-all duration-300 ease-in-out hover:bg-[#f0f3fb] w-full`}
                    >
                      <div className="flex items-center gap-2">
                        <item.icon size={18} strokeWidth={1.8} />
                        <span>{item.title}</span>
                      </div>
                      {openDropdown ? (
                        <Minus size={16} className="text-gray-600" />
                      ) : (
                        <Plus size={16} className="text-gray-600" />
                      )}
                    </button>

                    {openDropdown && (
                      <ul className="ml-6 mt-1 mb-2">
                        {item.children.map((child, i) => {
                          const isActive = activeChild === child.path;
                          return (
                            <li key={i} className="relative">
                              <Link
                                href={child.path}
                                onClick={() => setActiveChild(child.path)}
                                className={`flex items-center gap-2 py-2 px-4 text-[13px] transition-colors ${
                                  isActive
                                    ? "text-[#2196f3]"
                                    : "text-gray-700 hover:text-[#2196f3]"
                                }`}
                              >
                                <span
                                  className={`text-base ${
                                    isActive ? "opacity-100" : "opacity-0"
                                  }`}
                                >
                                  ›
                                </span>
                                <span>{child.title}</span>
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    )}
                  </>
                ) : (
                  <Link
                    className={`relative flex items-center ${
                      shouldExpand
                        ? "justify-content-center"
                        : "justify-center px-0"
                    } overflow-hidden text-black text-[14px] leading-8 cursor-pointer
                    p-[9px] mt-[8px] mx-[13px] rounded-lg transition-all duration-300 ease-in-out  ${
                      item.title === "Logout"
                        ? "bg-[#f44336] text-white hover:bg-[#ea1c0d]"
                        : "hover:bg-[#f0f3fb]"
                    }`}
                    href={item.path || item.children?.[0]?.path || "#"}
                  >
                    <item.icon size={18} strokeWidth={1.8} />
                    {shouldExpand && <span className="ml-3">{item.title}</span>}
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
