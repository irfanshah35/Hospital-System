"use client";

import { useState } from "react";
import PatientWelcomeSection from "../../components/patient-welcome-section";
import PatientStatsCards from "../../components/PatientStatsCards"
import PatientAppointmentsReports from "@/components/PatientAppointmentsReports";
;

export default function PatientDashboard() {
  const [isCollapsed, setIsCollapsed] = useState(true);

  return (
    <div className="flex flex-col min-h-screen">
      <PatientWelcomeSection />
      <PatientStatsCards />
      <PatientAppointmentsReports />
    </div>
  );
}