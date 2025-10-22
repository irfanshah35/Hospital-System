"use client";

import { useState } from "react";

import DoctorAppointmentsSection from "@/components/DoctorAppointmentsSection";
import UpcomingSurgeries from "@/components/UpcomingSurgeries";

export default function DoctorDashboard() {
  const [isCollapsed, setIsCollapsed] = useState(true);
  
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
     
            <DoctorAppointmentsSection/>
            <UpcomingSurgeries/>

    </div>
  );
}