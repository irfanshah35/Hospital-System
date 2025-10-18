"use client";
import { useState } from "react";
import Appointments from "@/components/appointments";
import Header from "@/components/header";
import SideBar from "@/components/sidebar";
import StatsCard from "@/components/Stats-cards";

export default function Home() {
  const [isCollapsed, setIsCollapsed] = useState(true);

  return (
    <>
      <Header isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      <div className="flex flex-row">
        <div
          className={`${
            isCollapsed ? "w-[60px]" : "w-[260px]"
          } transition-all duration-300`}
        >
          <SideBar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
        </div>
        <div
          className={`flex flex-col ${
            isCollapsed ? "w-[calc(100vw-60px)]" : "w-[calc(100vw-260px)]"
          } transition-all duration-500`}
        >
          <StatsCard />
          <Appointments />
        </div>
      </div>
    </>
  );
}
