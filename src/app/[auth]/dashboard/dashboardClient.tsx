"use client";
import { useEffect, useState } from "react";
import PatientWelcomeSection from "@/components/patient-welcome-section";
import PatientStatsCards from "@/components/PatientStatsCards";
import PatientAppointmentsReports from "@/components/PatientAppointmentsReports";
import DoctorAppointmentsSection from "@/components/DoctorAppointmentsSection";
import UpcomingSurgeries from "@/components/UpcomingSurgeries";
import DoctorDashboardSection from "@/components/doctor-dashboard-section";
import Appointments from "@/components/appointments";
import StatsCard from "@/components/Stats-cards";
import DashboardRecords from "@/components/dashboard-records";
import HospitalSurvey from "@/components/hospital-survey";

interface DashboardClientProps {
  authParam?: string;
}
export default function DashboardClient({ authParam }: DashboardClientProps) {
  const [userRole, setUserRole] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const role = authParam || localStorage.getItem("userRole") || "admin";
      setUserRole(role);
      setIsLoading(false);
    }
  }, [authParam]);

  const renderAdminDashboard = () => (
    <div className="flex flex-col">
      <StatsCard/>
      <Appointments/>
      <HospitalSurvey/>
      <DashboardRecords/>
    </div>
  );

  const renderDoctorDashboard = () => (
    <div className="flex flex-col min-h-screen">
      <DoctorDashboardSection/>
      <DoctorAppointmentsSection/>
      <UpcomingSurgeries/>
    </div>
  );

  const renderPatientDashboard = () => (
    <div className="flex flex-col min-h-screen">
      <PatientWelcomeSection />
      <PatientStatsCards/>
      <PatientAppointmentsReports/>
    </div>
  );



  return (
    <div className="">
      {userRole === "admin" && renderAdminDashboard()}
      {userRole === "doctor" && renderDoctorDashboard()}
      {userRole === "patient" && renderPatientDashboard()}
      
    </div>
  );
}