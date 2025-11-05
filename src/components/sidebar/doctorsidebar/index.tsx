"use client";
import Link from "next/link";
import React, { useState } from "react";
import {
  LayoutDashboard,
  ClipboardList,
  UserCog,
  User,
  Settings,
  MessageSquare,
} from "lucide-react";
import { useThemeStore } from "@/store/store";

interface DoctorSideBarProps {
  isCollapsed: boolean;
  setIsCollapsed: (value: boolean) => void;
  isHovered: boolean;
  setIsHovered: (value: boolean) => void;
  isMobile?: boolean;
  isMobileMenuOpen?: boolean;
  setIsMobileMenuOpen?: (open: boolean) => void;
}

export default function DoctorSideBar({
  isCollapsed,
  setIsCollapsed,
  isHovered,
  setIsHovered,
  isMobile = false,
  isMobileMenuOpen = false,
  setIsMobileMenuOpen,
}: DoctorSideBarProps) {
  const [activePath, setActivePath] = useState("/doctor/dashboard");
  const { sidebarTheme, websiteTheme } = useThemeStore();

  // Only use hover state when sidebar is collapsed
  const shouldExpand = !isCollapsed || (isCollapsed && isHovered);

  // Check if we should use white text/icons (when sidebar is dark OR website is dark)
  const shouldUseWhiteTheme =
    sidebarTheme === "dark" || websiteTheme === "dark";

  const handleLinkClick = (path: string) => {
    if (path) {
      setActivePath(path);
      if (isMobile && setIsMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    }
  };

  const sidebarMenu = [
    {
      title: "Dashboard",
      icon: LayoutDashboard,
      path: "/doctor/dashboard",
    },
    {
      title: "Appointments",
      icon: ClipboardList,
      path: "/doctor/appointments",
    },
    {
      title: "Doctors",
      icon: UserCog,
      // path: "#/doctor/doctors",
    },
    {
      title: "Patients",
      icon: User,
      path: "/doctor/patient",
    },
    {
      title: "Settings",
      icon: Settings,
      path: "/doctor/settings",
    },
    {
      title: "Chat",
      icon: MessageSquare,
      path: "/doctor/chat",
    },
  ];

  // Mobile specific behavior
  if (isMobile) {
    return (
      <>
        {/* Backdrop */}
        {isMobileMenuOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 mt-[61px]"
            onClick={() => setIsMobileMenuOpen?.(false)}
          />
        )}

        {/* Mobile Sidebar */}
        <aside
          className={`fixed top-[61px] left-0 h-[calc(100vh-61px)] w-[260px] z-50 transition-transform duration-300 overflow-y-auto ${
            isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
          } ${sidebarTheme === "dark" ? "bg-[#1A202E]" : "bg-white"}`}
        >
          <div className="sidebar-scroll h-full overflow-y-auto overflow-x-hidden pb-2">
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
                <div
                  className={`text-center ${
                    shouldUseWhiteTheme ? "text-white" : "text-[#060606]"
                  }`}
                >
                  <div className="text-[14px] font-[roboto] font-medium">
                    Ashton Cox
                  </div>
                  <div className="font-[roboto] text-[11px]">DOCTOR</div>
                </div>
              </li>

              <li>
                <div
                  className={`mt-[45px] ml-[28px] mb-[5px] text-[12px] uppercase ${
                    shouldUseWhiteTheme ? "text-white" : "text-gray-700"
                  }`}
                >
                  Main
                </div>
              </li>

              {sidebarMenu.map((item, index) => {
                const isActive = activePath === item.path;
                return (
                  <li key={index}>
                    <Link
                      className={`relative flex items-center justify-content-center overflow-hidden ${
                        shouldUseWhiteTheme ? "text-white" : "text-black"
                      } text-[14px] leading-8 cursor-pointer
                    p-[9px] mt-[8px] mx-[13px] rounded-lg transition-all duration-300 ease-in-out ${
                        isActive
                          ? shouldUseWhiteTheme
                            ? "bg-[#2D3748]"
                            : "bg-[#f0f3fb]"
                          : shouldUseWhiteTheme
                          ? "hover:bg-[#2D3748]"
                          : "hover:bg-[#f0f3fb]"
                      }`}
                      href={item.path || "#"}
                      onClick={() => item.path && handleLinkClick(item.path)}
                    >
                      <item.icon
                        size={18}
                        strokeWidth={1.8}
                        className={
                          shouldUseWhiteTheme ? "text-white" : "text-black"
                        }
                      />
                      <span className="ml-3">{item.title}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </aside>
      </>
    );
  }

  // Desktop behavior (original code)
  return (
    <>
      <aside
        className={`${
          shouldExpand ? "w-[260px]" : "w-[60px]"
        } overflow-x-hidden overflow-y-hidden h-[calc(100dvh-68px)] fixed top-[68px] ${
          sidebarTheme === "dark" ? "bg-[#1A202E]" : "bg-white"
        } z-[9999] group transition-all duration-300`}
        onMouseEnter={() => {
          // Only allow hover expansion when sidebar is collapsed
          if (isCollapsed) {
            setIsHovered(true);
          }
        }}
        onMouseLeave={() => {
          // Only collapse on hover leave when sidebar is collapsed
          if (isCollapsed) {
            setIsHovered(false);
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
                <div
                  className={`text-center ${
                    shouldUseWhiteTheme ? "text-white" : "text-[#060606]"
                  }`}
                >
                  <div className="text-[14px] font-[roboto] font-medium">
                    Ashton Cox
                  </div>
                  <div className="font-[roboto] text-[11px]">DOCTOR</div>
                </div>
              </li>
            )}

            {shouldExpand && (
              <li>
                <div
                  className={`mt-[45px] ml-[28px] mb-[5px] text-[12px] uppercase ${
                    shouldUseWhiteTheme ? "text-white" : "text-gray-700"
                  }`}
                >
                  Main
                </div>
              </li>
            )}

            {sidebarMenu.map((item, index) => {
              const isActive = activePath === item.path;
              return (
                <li key={index}>
                  <Link
                    className={`relative flex items-center ${
                      shouldExpand
                        ? "justify-content-center"
                        : "justify-center px-0"
                    } overflow-hidden ${
                      shouldUseWhiteTheme ? "text-white" : "text-black"
                    } text-[14px] leading-8 cursor-pointer
                    p-[9px] mt-[8px] mx-[13px] rounded-lg transition-all duration-300 ease-in-out ${
                      isActive
                        ? shouldUseWhiteTheme
                          ? "bg-[#2D3748]"
                          : "bg-[#f0f3fb]"
                        : shouldUseWhiteTheme
                        ? "hover:bg-[#2D3748]"
                        : "hover:bg-[#f0f3fb]"
                    }`}
                    href={item.path || "#"}
                    onClick={() => item.path && setActivePath(item.path)}
                  >
                    <item.icon
                      size={18}
                      strokeWidth={1.8}
                      className={
                        shouldUseWhiteTheme ? "text-white" : "text-black"
                      }
                    />
                    {shouldExpand && <span className="ml-3">{item.title}</span>}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </aside>
    </>
  );
}