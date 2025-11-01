"use client"
import Header from '@/components/header';
import RightSidebar from '@/components/right-sidebar';
import AdminSideBar from '@/components/sidebar/adminsidebar';
import DoctorSideBar from '@/components/sidebar/doctorsidebar';
import SideBar from '@/components/sidebar/patientsidebar';
import MobileHeader from '@/m-components/m-header';
import MobileSidebar from '@/m-components/m-sidebar';
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  const shouldExpand = !isCollapsed || (isCollapsed && isHovered);
  const { websiteTheme } = useThemeStore();
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const role = localStorage.getItem("userRole");
      setUserRole(role || "admin");
    }
  }, [pathname]);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

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
      {/* Mobile Layout (< 768px) */}
      {isMobile ? (
        <>
          <MobileHeader
            isMobileMenuOpen={isMobileMenuOpen}
            setIsMobileMenuOpen={setIsMobileMenuOpen}
          />
          <MobileSidebar 
            isOpen={isMobileMenuOpen}
            setIsOpen={setIsMobileMenuOpen}
            userRole={userRole || "admin"}
          />
          <div className="flex flex-col mt-[61px] w-full px-4">
            {children}
          </div>
        </>
      ) : (
        /* Desktop Layout (>= 768px) */
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
      )}
    </>
  )
}

export default Layout