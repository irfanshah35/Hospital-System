"use client"
import React from 'react'
import { useRouter } from 'next/navigation'

interface MobileSidebarProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  userRole: string;
}

const MobileSidebar = ({ isOpen, setIsOpen, userRole }: MobileSidebarProps) => {
  const router = useRouter();

  const handleNavigation = (path: string) => {
    router.push(path);
    setIsOpen(false);
  };

  const getMenuItems = () => {
    switch (userRole) {
      case "admin":
        return [
          { label: "Dashboard", path: "/admin/dashboard" },
          { label: "Users", path: "/admin/users" },
          { label: "Settings", path: "/admin/settings" },
        ];
      case "doctor":
        return [
          { label: "Dashboard", path: "/doctor/dashboard" },
          { label: "Patients", path: "/doctor/patients" },
          { label: "Appointments", path: "/doctor/appointments" },
        ];
      case "patient":
        return [
          { label: "Dashboard", path: "/patient/dashboard" },
          { label: "Appointments", path: "/patient/appointments" },
          { label: "Medical Records", path: "/patient/records" },
        ];
      default:
        return [];
    }
  };

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 mt-[61px]"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-[61px] left-0 h-[calc(100vh-61px)] w-[280px] bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 z-50 transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <nav className="p-4">
          <div className="mb-4">
            <p className="text-sm text-gray-500 dark:text-gray-400 uppercase mb-2">
              {userRole} Menu
            </p>
          </div>
          <ul className="space-y-2">
            {getMenuItems().map((item, index) => (
              <li key={index}>
                <button
                  onClick={() => handleNavigation(item.path)}
                  className="w-full text-left px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  )
}

export default MobileSidebar