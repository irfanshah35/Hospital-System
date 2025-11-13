"use client";
import Link from "next/link";
import React, { useState } from "react";
import {
  LayoutDashboard,
  ClipboardList,
  Users,
  UserCog,
  User,
  Hotel,
  FileText,
  Ambulance,
  Pill,
  Droplet,
  DollarSign,
  Building2,
  Package,
  UserCheck,
  Shield,
  LogOut,
  Plus,
  Minus,
  ClipboardCheck,
  Star,
  BookUser,
} from "lucide-react";
import { useThemeStore } from "@/store/store";

interface AdminSideBarProps {
  isCollapsed: boolean;
  setIsCollapsed: (value: boolean) => void;
  isHovered: boolean;
  setIsHovered: (value: boolean) => void;
  isMobile?: boolean;
  isMobileMenuOpen?: boolean;
  setIsMobileMenuOpen?: (open: boolean) => void;
}

export default function AdminSideBar({
  isCollapsed,
  setIsCollapsed,
  isHovered,
  setIsHovered,
  isMobile = false,
  isMobileMenuOpen = false,
  setIsMobileMenuOpen,
}: AdminSideBarProps) {
  const [openDropdowns, setOpenDropdowns] = useState<string[]>(["Dashboard"]);
  const [activeChild, setActiveChild] = useState("/admin/dashboard");
  const { sidebarTheme, websiteTheme } = useThemeStore();

  // Only use hover state when sidebar is collapsed
  const shouldExpand = !isCollapsed || (isCollapsed && isHovered);

  // Check if we should use white text/icons (when sidebar is dark OR website is dark)
  const shouldUseWhiteTheme =
    sidebarTheme === "dark" || websiteTheme === "dark";

  const toggleDropdown = (title: string) => {
    if (openDropdowns.includes(title)) {
      setOpenDropdowns(openDropdowns.filter((item) => item !== title));
    } else {
      setOpenDropdowns([...openDropdowns, title]);
    }
  };

  const handleLinkClick = (path: string) => {
    if (path) {
      setActiveChild(path);
      if (isMobile && setIsMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    }
  };

  const sidebarMenu = [
    {
      section: "Main",
      items: [
        {
          title: "Dashboard",
          icon: LayoutDashboard,
          path: "/admin/dashboard",
        },
        {
          title: "Appointments",
          icon: ClipboardList,
          children: [
            {
              title: "Appointment Calendar",
              path: "/admin/appointment/appointment-calendar",
            },
            {
              title: "View Appointment",
              path: "/admin/appointment/view-appointment",
            },
            {
              title: "Book Appointment",
              path: "/admin/appointment/book-appointment",
            },
            {
              title: "Edit Appointment",
              path: "/admin/appointment/edit-appointment",
            },
          ],
        },
        {
          title: "Doctors",
          icon: UserCog,
          children: [
            {
              title: "All Doctors",
              path: "/admin/doctors/all-doctors"
            },
            {
              title: "Assign Department",
              path: "/admin/doctors/assign-department",
            },
            {
              title: "Shift Management",
              path: "/admin/doctors/shift-management",
            },
            
          ],
        },
        {
          title: "Staff",
          icon: Users,
          children: [
            {
              title: "All Staff",
              path: "/admin/staff/all-staff"
            },
            {
              title: "Add Staff",
              path: "/admin/staff/add-staff"
            },
            {
              title: "Edit Staff",
              path: "/admin/staff/edit-staff"
            },
            {
              title: "Staff Profile",
              path: "/admin/staff/staff-profile"
            },
          ],
        },
        {
          title: "Patients",
          icon: User,
          children: [
            {
              title: "All Patients",
              path: "/admin/patients/all-patient"
            },
            {
              title: "Add Patient",
              path: "/admin/patients/add-patient"
            },
            {
              title: "Edit Patient",
              path: "/admin/patients/edit-patient"
            },
            {
              title: "Patient Records",
              path: "/admin/patients/patient-records",
            },
            {
              title: "Patient Profile",
              path: "/admin/patients/patient-profile",
            },
          ],
        },
        {
          title: "Room Allotment",
          icon: Hotel,
          children: [
            {
              title: "Alloted Rooms",
              path: "/admin/rooms/alloted-rooms"
            },
            {
              title: "New Allotment",
              path: "/admin/rooms/add-allotment"
            },
            {
              title: "Edit Allotment",
              path: "/admin/rooms/edit-allotment"
            },
            {
              title: "Rooms By Department",
              path: "/admin/rooms/rooms-by-department",
            },
            {
              title: "Add Room",
              path: "/admin/rooms/add-room"
            },
          ],
        },
        {
          title: "Records",
          icon: FileText,
          children: [
            {
              title: "Birth Records",
              path: "/admin/records/birth-records"
            },
            {
              title: "Death Records",
              path: "/admin/records/death-records"
            },
          ],
        },
        {
          title: "Ambulance",
          icon: Ambulance,
          children: [
            {
              title: "Ambulance Call List",
              path: "/admin/ambulance/call-list",
            },
            {
              title: "Ambulance List",
              path: "/admin/ambulance/list"
            },
          ],
        },
        {
          title: "Pharmacy",
          icon: Pill,
          children: [
            {
              title: "Medicine List",
              path: "/admin/pharmacy/medicine-list"
            },
            {
              title: "Add Medicine",
              path: "/admin/pharmacy/add-medicine"
            },
          ],
        },
        {
          title: "Blood Bank",
          icon: Droplet,
          children: [
            {
              title: "Blood Stock",
              path: "/admin/blood-bank/blood-stock"
            },
            {
              title: "Blood Donor",
              path: "/admin/blood-bank/blood-donor"
            },
            {
              title: "Blood Issued",
              path: "/admin/blood-bank/blood-issued"
            },
          ],
        },
        {
          title: "Accounts",
          icon: DollarSign,
          children: [
            {
              title: "Bill List",
              path: "/admin/accounts/bill-list"
            },
            {
              title: "Add Bill",
              path: "/admin/accounts/add-bill"
            },
            {
              title: "Income",
              path: "/admin/accounts/income"
            },
            {
              title: "Expenses",
              path: "/admin/accounts/expenses"
            },
            {
              title: "Income Report",
              path: "/admin/accounts/income-report"
            },
            {
              title: "Invoice",
              path: "/admin/accounts/invoice"
            },
          ],
        },
        {
          title: "Departments",
          icon: Building2,
          children: [
            {
              title: "Department List",
              path: "/admin/departments/department-list",
            },
            {
              title: "Add Department",
              path: "/admin/departments/add-department",
            },
          ],
        },
        {
          title: "Inventory",
          icon: Package,
          children: [
            {
              title: "Item Stock List",
              path: "/admin/Inventory/item-stock-list",
            },
            {
              title: "Issued Items",
              path: "/admin/Inventory/issued-items"
            },
          ],
        },
        {
          title: "Human Resources",
          icon: UserCheck,
          children: [
            {
              title: "Leave Requests",
              path: "/admin/human-resources/leave-requests",
            },
            {
              title: "Leave Balance",
              path: "/admin/human-resources/leave-balance",
            },
            {
              title: "Leave Types",
              path: "/admin/human-resources/leave-types",
            },
            {
              title: "Holidays",
              path: "/admin/human-resources/holidays"
            },
            {
              title: "Today's Attendance",
              path: "/admin/human-resources/todays-attendance",
            },
            {
              title: "Employee Attendance",
              path: "/admin/human-resources/employee-attendance",
            },
            {
              title: "Attendance Sheet",
              path: "/admin/human-resources/attendance-sheet",
            },
            {
              title: "Employee Salary",
              path: "/admin/human-resources/employee-salary",
            },
            {
              title: "Payslip",
              path: "/admin/human-resources/payslip"
            },
          ],
        },
        {
          title: "Insurance",
          icon: Shield,
          children: [
            {
              title: "Patient Insurance",
              path: "/admin/insurance/patient-insurance",
            },
            {
              title: "New Claim",
              path: "/admin/insurance/new-claim"
            },
            {
              title: "Claim Status",
              path: "/admin/insurance/claim-status"
            },
            {
              title: "Insurance Provider",
              path: "/admin/insurance/insurance-provider",
            },
          ],
        },
      ],
      section2: "Apps",
      Apps: [
        {
          title: "Task",
          icon: ClipboardCheck,
          path: "/admin/tasks",
        },
        {
          title: "Contacts",
          icon: BookUser,
          path: "/admin/contacts",
        },
        {
          title: "More Apps",
          icon: Star,
          amount: 4,
          children: [
            {
              title: "Chat",
              path: "/admin/apps/chat"
            },
            {
              title: "Contact Grid",
              path: "/admin/apps/contact-grid"
            },
            {
              title: "Drag Drop",
              path: "/admin/apps/dragdrop"
            },
            {
              title: "Support",
              path: "/admin/apps/support",
            },
          ],
        },
      ],

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
          className={`fixed top-[61px] left-0 h-[calc(100vh-61px)] w-[260px] z-50 transition-transform duration-300 overflow-y-auto ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
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
                  className={`text-center ${shouldUseWhiteTheme ? "text-white" : "text-[#060606]"
                    }`}
                >
                  <div className="text-[14px] font-[roboto] font-medium">
                    Sarah Smith{" "}
                  </div>
                  <div className="font-[roboto] text-[11px]">ADMIN </div>
                </div>
              </li>

              {sidebarMenu.map((section, sectionIndex) => (
                <React.Fragment key={sectionIndex}>
                  <li>
                    <div
                      className={`mt-[45px] ml-[28px] mb-[5px] text-[12px] uppercase ${shouldUseWhiteTheme ? "text-white" : "text-black"
                        }`}
                    >
                      {section.section}
                    </div>
                  </li>

                  {section.items.map((item, index) => (
                    <li key={index}>
                      {item.children ? (
                        <>
                          <button
                            onClick={() => toggleDropdown(item.title)}
                            className={`relative flex items-center justify-between overflow-hidden pe-6 text-[14px] leading-8 cursor-pointer font-semibold
p-[9px] mt-[8px] mx-[13px] rounded-lg transition-all duration-300 ease-in-out
${shouldUseWhiteTheme
                                ? "text-white hover:bg-[#2D3748]"
                                : "text-gray-800 hover:bg-[#f0f3fb]"
                              } w-full`}
                          >
                            <div className="flex items-center gap-2">
                              <item.icon
                                size={18}
                                strokeWidth={1.8}
                                className={
                                  shouldUseWhiteTheme
                                    ? "text-white"
                                    : "text-gray-800"
                                }
                              />
                              <span>{item.title}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              {(item as any).badge && (
                                <span
                                  className={`${(item as any).badge.color
                                    } text-white text-[10px] font-semibold rounded-full px-[6px] py-[1px]`}
                                >
                                  {(item as any).badge.text}
                                </span>
                              )}
                              {openDropdowns.includes(item.title) ? (
                                <Minus
                                  size={16}
                                  className={
                                    shouldUseWhiteTheme
                                      ? "text-white"
                                      : "text-gray-600"
                                  }
                                />
                              ) : (
                                <Plus
                                  size={16}
                                  className={
                                    shouldUseWhiteTheme
                                      ? "text-white"
                                      : "text-gray-600"
                                  }
                                />
                              )}
                            </div>
                          </button>

                          {openDropdowns.includes(item.title) && (
                            <ul className="ml-6 mt-1 mb-2">
                              {item.children.map((child: any, i) => {
                                const isActive = activeChild === child.path;
                                return (
                                  <li key={i} className="relative">
                                    <Link
                                      href={child.path || "#"}
                                      onClick={() => handleLinkClick(child.path)}
                                      className={`flex items-center gap-2 rounded-[8px] py-2 px-4 text-[13px] transition-colors duration-200
              ${isActive
                                          ? shouldUseWhiteTheme
                                            ? "text-white bg-[#2D3748]"
                                            : "text-black bg-[#f0f3fb]"
                                          : shouldUseWhiteTheme
                                            ? "text-gray-300 hover:bg-[#2D3748] hover:text-white"
                                            : "text-gray-700 hover:text-blue-500 hover:bg-[#F5F7FA]"
                                        }`}
                                    >
                                      <span
                                        className={`text-base transition-opacity ${isActive ? "opacity-100" : "opacity-0"
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
                          className={`relative flex items-center justify-between overflow-hidden text-[14px] leading-8 cursor-pointer
                          p-[9px] mt-[8px] mx-[13px] rounded-lg transition-all duration-300 ease-in-out ${shouldUseWhiteTheme
                              ? "text-white hover:bg-[#2D3748]"
                              : "text-black hover:bg-[#f0f3fb]"
                            }`}
                          href={(item as any).path || "#"}
                          onClick={() => handleLinkClick((item as any).path)}
                        >
                          <div className="flex items-center gap-2">
                            <item.icon
                              size={18}
                              strokeWidth={1.8}
                              className={
                                shouldUseWhiteTheme ? "text-white" : "text-black"
                              }
                            />
                            <span>{item.title}</span>
                          </div>
                          {(item as any).badge && (
                            <span
                              className={`${(item as any).badge.color
                                } text-white text-[10px] font-semibold rounded-full px-[6px] py-[1px]`}
                            >
                              {(item as any).badge.text}
                            </span>
                          )}
                        </Link>
                      )}
                    </li>
                  ))}
                </React.Fragment>
              ))}

              {sidebarMenu.map((section, sectionIndex) => (
                <React.Fragment key={sectionIndex}>
                  {shouldExpand && (
                    <li>
                      <div
                        className={`mt-[45px] ml-[28px] mb-[5px] text-[12px] uppercase ${shouldUseWhiteTheme ? "text-white" : "text-black"
                          }`}
                      >
                        {section.section2}
                      </div>
                    </li>
                  )}

                  {section.Apps.map((item, index) => (
                    <li key={index}>
                      {item.children && shouldExpand ? (
                        <>
                          <button
                            onClick={() => toggleDropdown(item.title)}
                            className={`relative flex items-center justify-between overflow-hidden pe-6 text-[14px] leading-8 cursor-pointer font-semibold
p-[9px] mt-[8px] mx-[13px] rounded-lg transition-all duration-300 ease-in-out
${shouldUseWhiteTheme
                                ? "text-white hover:bg-[#2D3748]"
                                : "text-gray-800 hover:bg-[#f0f3fb]"
                              } w-full`}
                          >
                            <div className="flex items-center gap-2">
                              <item.icon
                                size={18}
                                strokeWidth={1.8}
                                className={
                                  shouldUseWhiteTheme
                                    ? "text-white"
                                    : "text-gray-800"
                                }
                              />
                              <span>{item.title}</span>
                            </div>
                            <div className="flex items-center gap-2 relative">
                              {(item as any).badge && (
                                <span
                                  className={`${(item as any).badge.color
                                    } text-white text-[10px] font-semibold rounded-full px-[6px] py-[1px]`}
                                >
                                  {(item as any).badge.text}
                                </span>
                              )}
                              {item.amount ? (
                                <span className="rounded-full h-[18px] w-[18px] text-white bg-[#FD7E14] flex justify-center items-center">4</span>
                              ) : ('')}
                              {openDropdowns.includes(item.title) ? (
                                <Minus
                                  size={16}
                                  className={
                                    shouldUseWhiteTheme
                                      ? "text-white"
                                      : "text-gray-600"
                                  }
                                />
                              ) : (
                                <Plus
                                  size={16}
                                  className={
                                    shouldUseWhiteTheme
                                      ? "text-white"
                                      : "text-gray-600"
                                  }
                                />
                              )}
                            </div>
                          </button>

                          {openDropdowns.includes(item.title) && (
                            <ul className="ml-6 mt-1 mb-2">
                              {item.children.map((child: any, i) => {
                                const isActive = activeChild === child.path;
                                return (
                                  <li key={i} className="relative">
                                    <Link
                                      href={child.path || "#"}
                                      onClick={() => child.path && setActiveChild(child.path)}
                                      className={`flex items-center gap-2 rounded-[8px] py-2 px-4 text-[13px] transition-colors duration-200
              ${isActive
                                          ? shouldUseWhiteTheme
                                            ? "text-white bg-[#2D3748]"
                                            : "text-black bg-[#f0f3fb]"
                                          : shouldUseWhiteTheme
                                            ? "text-gray-300 hover:bg-[#2D3748] hover:text-white"
                                            : "text-gray-700 hover:text-blue-500 hover:bg-[#F5F7FA]"
                                        }`}
                                    >
                                      <span
                                        className={`text-base transition-opacity ${isActive ? "opacity-100" : "opacity-0"
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
                          className={`relative flex items-center ${shouldExpand
                            ? "justify-between"
                            : "justify-center px-0"
                            } overflow-hidden text-[14px] leading-8 cursor-pointer
                          p-[9px] mt-[8px] mx-[13px] rounded-lg transition-all duration-300 ease-in-out ${shouldUseWhiteTheme
                              ? "text-white hover:bg-[#2D3748]"
                              : "text-black hover:bg-[#f0f3fb]"
                            }`}
                          href={(item as any).path || "#"}
                        >
                          <div className="flex items-center gap-2">
                            <item.icon
                              size={18}
                              strokeWidth={1.8}
                              className={
                                shouldUseWhiteTheme ? "text-white" : "text-black"
                              }
                            />
                            {shouldExpand && <span>{item.title}</span>}
                          </div>
                          {shouldExpand && (item as any).badge && (
                            <span
                              className={`${(item as any).badge.color
                                } text-white text-[10px] font-semibold rounded-full px-[6px] py-[1px]`}
                            >
                              {(item as any).badge.text}
                            </span>
                          )}
                        </Link>
                      )}
                    </li>
                  ))}
                </React.Fragment>
              ))}

              <li>
                <Link
                  className="relative flex items-center justify-center overflow-hidden text-white text-[14px] leading-8 cursor-pointer
                  p-[9px] mt-[8px] mx-[13px] rounded-lg transition-all duration-300 ease-in-out bg-[#f44336] hover:bg-[#ea1c0d]"
                  href="/logout"
                  onClick={() => handleLinkClick("/logout")}
                >
                  <LogOut size={18} strokeWidth={1.8} />
                  <span className="ml-3">Logout</span>
                </Link>
              </li>
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
        className={`${shouldExpand ? "w-[260px]" : "w-[60px]"
          } overflow-x-hidden overflow-y-hidden h-[calc(100dvh-56px)] fixed top-[56px] z-[9999] group transition-all duration-300    ${sidebarTheme === "dark" ? "bg-[#1A202E]" : "bg-white"
          }`}
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
                  className={`text-center ${shouldUseWhiteTheme ? "text-white" : "text-[#060606]"
                    }`}
                >
                  <div className="text-[14px] font-[roboto] font-medium">
                    Sarah Smith{" "}
                  </div>
                  <div className="font-[roboto] text-[11px]">ADMIN </div>
                </div>
              </li>
            )}

            {sidebarMenu.map((section, sectionIndex) => (
              <React.Fragment key={sectionIndex}>
                {shouldExpand && (
                  <li>
                    <div
                      className={`mt-[45px] ml-[28px] mb-[5px] text-[12px] uppercase ${shouldUseWhiteTheme ? "text-white" : "text-black"
                        }`}
                    >
                      {section.section}
                    </div>
                  </li>
                )}

                {section.items.map((item, index) => (
                  <li key={index}>
                    {item.children && shouldExpand ? (
                      <>
                        <button
                          onClick={() => toggleDropdown(item.title)}
                          className={`relative flex items-center justify-between overflow-hidden pe-6 text-[14px] leading-8 cursor-pointer font-semibold
p-[9px] mt-[8px] mx-[13px] rounded-lg transition-all duration-300 ease-in-out
${shouldUseWhiteTheme
                              ? "text-white hover:bg-[#2D3748]"
                              : "text-gray-800 hover:bg-[#f0f3fb]"
                            } w-full`}
                        >
                          <div className="flex items-center gap-2">
                            <item.icon
                              size={18}
                              strokeWidth={1.8}
                              className={
                                shouldUseWhiteTheme
                                  ? "text-white"
                                  : "text-gray-800"
                              }
                            />
                            <span>{item.title}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            {(item as any).badge && (
                              <span
                                className={`${(item as any).badge.color
                                  } text-white text-[10px] font-semibold rounded-full px-[6px] py-[1px]`}
                              >
                                {(item as any).badge.text}
                              </span>
                            )}
                            {openDropdowns.includes(item.title) ? (
                              <Minus
                                size={16}
                                className={
                                  shouldUseWhiteTheme
                                    ? "text-white"
                                    : "text-gray-600"
                                }
                              />
                            ) : (
                              <Plus
                                size={16}
                                className={
                                  shouldUseWhiteTheme
                                    ? "text-white"
                                    : "text-gray-600"
                                }
                              />
                            )}
                          </div>
                        </button>

                        {openDropdowns.includes(item.title) && (
                          <ul className="ml-6 mt-1 mb-2">
                            {item.children.map((child: any, i) => {
                              const isActive = activeChild === child.path;
                              return (
                                <li key={i} className="relative">
                                  <Link
                                    href={child.path || "#"}
                                    onClick={() => child.path && setActiveChild(child.path)}
                                    className={`flex items-center gap-2 rounded-[8px] py-2 px-4 text-[13px] transition-colors duration-200
              ${isActive
                                        ? shouldUseWhiteTheme
                                          ? "text-white bg-[#2D3748]"
                                          : "text-black bg-[#f0f3fb]"
                                        : shouldUseWhiteTheme
                                          ? "text-gray-300 hover:bg-[#2D3748] hover:text-white"
                                          : "text-gray-700 hover:text-blue-500 hover:bg-[#F5F7FA]"
                                      }`}
                                  >
                                    <span
                                      className={`text-base transition-opacity ${isActive ? "opacity-100" : "opacity-0"
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
                        className={`relative flex items-center ${shouldExpand
                          ? "justify-between"
                          : "justify-center px-0"
                          } overflow-hidden text-[14px] leading-8 cursor-pointer
                          p-[9px] mt-[8px] mx-[13px] rounded-lg transition-all duration-300 ease-in-out ${shouldUseWhiteTheme
                            ? "text-white hover:bg-[#2D3748]"
                            : "text-black hover:bg-[#f0f3fb]"
                          }`}
                        href={(item as any).path || "#"}
                      >
                        <div className="flex items-center gap-2">
                          <item.icon
                            size={18}
                            strokeWidth={1.8}
                            className={
                              shouldUseWhiteTheme ? "text-white" : "text-black"
                            }
                          />
                          {shouldExpand && <span>{item.title}</span>}
                        </div>
                        {shouldExpand && (item as any).badge && (
                          <span
                            className={`${(item as any).badge.color
                              } text-white text-[10px] font-semibold rounded-full px-[6px] py-[1px]`}
                          >
                            {(item as any).badge.text}
                          </span>
                        )}
                      </Link>
                    )}
                  </li>
                ))}
              </React.Fragment>
            ))}


            {sidebarMenu.map((section, sectionIndex) => (
              <React.Fragment key={sectionIndex}>
                {shouldExpand && (
                  <li>
                    <div
                      className={`mt-[45px] ml-[28px] mb-[5px] text-[12px] uppercase ${shouldUseWhiteTheme ? "text-white" : "text-black"
                        }`}
                    >
                      {section.section2}
                    </div>
                  </li>
                )}

                {section.Apps.map((item, index) => (
                  <li key={index}>
                    {item.children && shouldExpand ? (
                      <>
                        <button
                          onClick={() => toggleDropdown(item.title)}
                          className={`relative flex items-center justify-between overflow-hidden pe-6 text-[14px] leading-8 cursor-pointer font-semibold
p-[9px] mt-[8px] mx-[13px] rounded-lg transition-all duration-300 ease-in-out
${shouldUseWhiteTheme
                              ? "text-white hover:bg-[#2D3748]"
                              : "text-gray-800 hover:bg-[#f0f3fb]"
                            } w-full`}
                        >
                          <div className="flex items-center gap-2">
                            <item.icon
                              size={18}
                              strokeWidth={1.8}
                              className={
                                shouldUseWhiteTheme
                                  ? "text-white"
                                  : "text-gray-800"
                              }
                            />
                            <span>{item.title}</span>
                          </div>
                          <div className="flex items-center gap-2 relative">
                            {(item as any).badge && (
                              <span
                                className={`${(item as any).badge.color
                                  } text-white text-[10px] font-semibold rounded-full px-[6px] py-[1px]`}
                              >
                                {(item as any).badge.text}
                              </span>
                            )}
                            {item.amount ? (
                              <span className="rounded-full h-[18px] w-[18px] text-white bg-[#FD7E14] flex justify-center items-center">4</span>
                            ) : ('')}
                            {openDropdowns.includes(item.title) ? (
                              <Minus
                                size={16}
                                className={
                                  shouldUseWhiteTheme
                                    ? "text-white"
                                    : "text-gray-600"
                                }
                              />
                            ) : (
                              <Plus
                                size={16}
                                className={
                                  shouldUseWhiteTheme
                                    ? "text-white"
                                    : "text-gray-600"
                                }
                              />
                            )}
                          </div>
                        </button>

                        {openDropdowns.includes(item.title) && (
                          <ul className="ml-6 mt-1 mb-2">
                            {item.children.map((child: any, i) => {
                              const isActive = activeChild === child.path;
                              return (
                                <li key={i} className="relative">
                                  <Link
                                    href={child.path || "#"}
                                    onClick={() => child.path && setActiveChild(child.path)}
                                    className={`flex items-center gap-2 rounded-[8px] py-2 px-4 text-[13px] transition-colors duration-200
              ${isActive
                                        ? shouldUseWhiteTheme
                                          ? "text-white bg-[#2D3748]"
                                          : "text-black bg-[#f0f3fb]"
                                        : shouldUseWhiteTheme
                                          ? "text-gray-300 hover:bg-[#2D3748] hover:text-white"
                                          : "text-gray-700 hover:text-blue-500 hover:bg-[#F5F7FA]"
                                      }`}
                                  >
                                    <span
                                      className={`text-base transition-opacity ${isActive ? "opacity-100" : "opacity-0"
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
                        className={`relative flex items-center ${shouldExpand
                          ? "justify-between"
                          : "justify-center px-0"
                          } overflow-hidden text-[14px] leading-8 cursor-pointer
                          p-[9px] mt-[8px] mx-[13px] rounded-lg transition-all duration-300 ease-in-out ${shouldUseWhiteTheme
                            ? "text-white hover:bg-[#2D3748]"
                            : "text-black hover:bg-[#f0f3fb]"
                          }`}
                        href={(item as any).path || "#"}
                      >
                        <div className="flex items-center gap-2">
                          <item.icon
                            size={18}
                            strokeWidth={1.8}
                            className={
                              shouldUseWhiteTheme ? "text-white" : "text-black"
                            }
                          />
                          {shouldExpand && <span>{item.title}</span>}
                        </div>
                        {shouldExpand && (item as any).badge && (
                          <span
                            className={`${(item as any).badge.color
                              } text-white text-[10px] font-semibold rounded-full px-[6px] py-[1px]`}
                          >
                            {(item as any).badge.text}
                          </span>
                        )}
                      </Link>
                    )}
                  </li>
                ))}
              </React.Fragment>
            ))}

            <li>
              <Link
                className="relative flex items-center justify-center overflow-hidden text-white text-[14px] leading-8 cursor-pointer
                  p-[9px] mt-[8px] mx-[13px] rounded-lg transition-all duration-300 ease-in-out bg-[#f44336] hover:bg-[#ea1c0d]"
                href="/logout"
              >
                <LogOut size={18} strokeWidth={1.8} />
                {shouldExpand && <span className="ml-3">Logout</span>}
              </Link>
            </li>
          </ul>
        </div>
      </aside>
    </>
  );
}