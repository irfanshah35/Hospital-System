import { ReceiptText } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function SideBar() {
  const sidebarMenu = [
    {
      user: {
        name: "Cara Stevens",
        role: "PATIENT",
        image: "./assets/images/user/patient.jpg",
      },
    },
    {
      header: "Main",
    },
    {
      title: "Dashboard",
      icon: "space_dashboard",
      path: "#/patient/dashboard",
    },
    {
      title: "Appointments",
      icon: "assignment",
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
      icon: "receipt_long",
      path: "#/patient/prescriptions",
    },
    {
      title: "Medical Record",
      icon: "restore_page",
      path: "#/patient/records",
    },
    {
      title: "Billing",
      icon: "receipt",
      path: "#/patient/billing",
    },
    {
      title: "Chat",
      icon: "chat",
      path: "#/apps/chat",
    },
    {
      title: "Settings",
      icon: "settings",
      path: "#/patient/settings",
    },
    {
      title: "Logout",
      icon: "power_settings_new",
      path: "#/logout", // optional
    },
  ];

  return (
    <>
      <aside className="w-[260px] overflow-hidden h-[calc(100dvh - 60px] fixed top-[60px] bg-white z-[9999]">
        <div className="h-full overflow-y-auto min-w-full min-h-full">
          <ul>
            <li className="sidebar-user-panel">
              <div className="pt-[25px] pb-[10px] w-full">
                <div className="w-[35%]  max-w-[75px] mx-auto">
                  <img
                    alt="User Image"
                    className="max-w-full rounded-[15%] shadow-[0_5px_25px_#0003] bg-white p-[2px]"
                    src="https://www.einfosoft.com/templates/admin/cliniva/source/light/assets/images/user/patient.jpg"
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

            <li>
              <Link
                className="relative flex items-center justify-content-center overflow-hidden text-black text-[14px] leading-8 cursor-pointer
                p-[9px] mt-[8px] mx-[13px] rounded-lg transition-all duration-300 ease-in-ou t"
                href="#">
                {/* <i className="material-icons-outlined">receipt_long</i> */}
                <ReceiptText size={20} />
                <span className="hide-menu">Prescriptions </span>
              </Link>
            </li>
          </ul>
        </div>
      </aside>
    </>
  );
}
