"use client"
import Header from '@/components/header';
import RightSidebar from '@/components/right-sidebar';
import AdminSideBar from '@/components/sidebar/adminsidebar';
import DoctorSideBar from '@/components/sidebar/doctorsidebar';
import SideBar from '@/components/sidebar/patientsidebar';
import { useThemeStore } from '@/store/store';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {

     const [isCollapsed, setIsCollapsed] = useState(true);
      const [isHovered, setIsHovered] = useState(false);
      const [userRole, setUserRole] = useState<string | null>(null);
      const shouldExpand = !isCollapsed || (isCollapsed && isHovered);
      const { websiteTheme } = useThemeStore();
        const pathname = usePathname();


     useEffect(() => {
        if (typeof window !== "undefined") {
          const role = localStorage.getItem("userRole");
          setUserRole(role || "admin");
        }
      }, [pathname]);
    
      const renderSidebar = () => {
        switch (userRole) {
          case "admin":
            return (
              <AdminSideBar
                isCollapsed={isCollapsed}
                setIsCollapsed={setIsCollapsed}
                isHovered={isHovered}
                setIsHovered={setIsHovered}
              />
            );
          case "doctor":
            return (
              <DoctorSideBar
                isCollapsed={isCollapsed}
                setIsCollapsed={setIsCollapsed}
                isHovered={isHovered}
                setIsHovered={setIsHovered}
              />
            );
          case "patient":
            return (
              <SideBar
                isCollapsed={isCollapsed}
                setIsCollapsed={setIsCollapsed}
                isHovered={isHovered}
                setIsHovered={setIsHovered}
              />
            );
          default:
            return (
              <AdminSideBar
                isCollapsed={isCollapsed}
                setIsCollapsed={setIsCollapsed}
                isHovered={isHovered}
                setIsHovered={setIsHovered}
              />
            );
        }
      };
  return (
   <>
              <Header
                isCollapsed={isCollapsed}
                setIsCollapsed={setIsCollapsed}
                shouldExpand={shouldExpand}
              />
              <div className="flex flex-row">
                {renderSidebar()}
                <div
                  className={`flex flex-col mt-[61px] w-full transition-all duration-300 ${
                    shouldExpand ? "pl-[260px]" : "pl-[60px]"
                  }`}
                >
                  {children}
                </div>
                <RightSidebar />
              </div>
            </>
  )
}

export default Layout
