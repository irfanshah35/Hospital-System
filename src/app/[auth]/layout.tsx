"use client"
import Header from '@/components/header';
import RightSidebar from '@/components/right-sidebar';
import AdminSideBar from '@/components/sidebar/adminsidebar';
import DoctorSideBar from '@/components/sidebar/doctorsidebar';
import SideBar from '@/components/sidebar/patientsidebar';
import MobileHeader from '@/m-components/m-header';
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
            isCollapsed={isMobile ? false : isCollapsed}
            setIsCollapsed={setIsCollapsed}
            isHovered={isHovered}
            setIsHovered={setIsHovered}
            isMobile={isMobile}
            isMobileMenuOpen={isMobileMenuOpen}
            setIsMobileMenuOpen={setIsMobileMenuOpen}
          />
        );
      case "doctor":
        return (
          <DoctorSideBar
            isCollapsed={isMobile ? false : isCollapsed}
            setIsCollapsed={setIsCollapsed}
            isHovered={isHovered}
            setIsHovered={setIsHovered}
            isMobile={isMobile}
            isMobileMenuOpen={isMobileMenuOpen}
            setIsMobileMenuOpen={setIsMobileMenuOpen}
          />
        );
      case "patient":
        return (
          <SideBar
            isCollapsed={isMobile ? false : isCollapsed}
            setIsCollapsed={setIsCollapsed}
            isHovered={isHovered}
            setIsHovered={setIsHovered}
            isMobile={isMobile}
            isMobileMenuOpen={isMobileMenuOpen}
            setIsMobileMenuOpen={setIsMobileMenuOpen}
          />
        );
      default:
        return (
          <AdminSideBar
            isCollapsed={isMobile ? false : isCollapsed}
            setIsCollapsed={setIsCollapsed}
            isHovered={isHovered}
            setIsHovered={setIsHovered}
            isMobile={isMobile}
            isMobileMenuOpen={isMobileMenuOpen}
            setIsMobileMenuOpen={setIsMobileMenuOpen}
          />
        );
    }
  };

  return (
    <>
      {/* Conditional Header */}
      {isMobile ? (
        <MobileHeader
          isMobileMenuOpen={isMobileMenuOpen}
          setIsMobileMenuOpen={setIsMobileMenuOpen}
        />
      ) : (
        <Header
          isCollapsed={isCollapsed}
          setIsCollapsed={setIsCollapsed}
          shouldExpand={shouldExpand}
        />
      )}

      {/* Sidebar - same for both mobile and desktop */}
      <div className="flex flex-row">
        {renderSidebar()}
        
        <div
          className={`flex flex-col mt-[61px] w-full transition-all duration-300 ${
            isMobile 
              ? "pl-0" 
              : shouldExpand 
                ? "pl-[260px]" 
                : "pl-[60px]"
          }`}
        >
          {children}
        </div>
        
        {!isMobile && <RightSidebar />}
      </div>
    </>
  )
}

export default Layout