"use client";

import { useState } from "react";

import DoctorAppointmentsSection from "@/components/DoctorAppointmentsSection";
import UpcomingSurgeries from "@/components/UpcomingSurgeries";
import DoctorDashboardSection from "@/components/doctor-dashboard-section";

export default function DoctorDashboard() {
  const [isCollapsed, setIsCollapsed] = useState(true);
  
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
     <DoctorDashboardSection/>
            <DoctorAppointmentsSection/>
            <UpcomingSurgeries/>

    </div>
  );
}