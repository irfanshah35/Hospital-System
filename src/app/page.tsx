"use client";
import { useState } from "react";
import Appointments from "@/components/appointments";
import StatsCard from "@/components/Stats-cards";
import DashboardRecords from "@/components/dashboard-records";

export default function Home() {
  const [isCollapsed, setIsCollapsed] = useState(true);

  return (
    <>
      <div className="flex flex-col">
        <StatsCard />
        <Appointments />
        <DashboardRecords/>
      </div>
    </>
  );
}
