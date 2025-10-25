"use client";
import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import AdminSideBar from "@/components/sidebar/adminsidebar";
import DoctorSideBar from "@/components/sidebar/doctorsidebar";
import SideBar from "@/components/sidebar/patientsidebar";
import AuthCheck from "@/components/AuthCheck";
import RightSidebar from "@/components/right-sidebar";
import { useThemeStore } from "@/store/store";
import { useGoogleTranslate } from "@/useGoogleTranslate";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-roboto",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null);
  const shouldExpand = !isCollapsed || (isCollapsed && isHovered);
  const { websiteTheme } = useThemeStore();

  const pathname = usePathname();
  const isAuthPage =
    pathname === "/login" || pathname === "/register" || pathname === "/signup";

  // Initialize Google Translate for non-auth pages
  useGoogleTranslate();

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
    <html lang="en" className={websiteTheme}>
      <head>
        <style>{`
          /* Prevent Google Translate layout shifts */
          .goog-te-banner-frame {
            display: none !important;
          }
          .skiptranslate {
            display: none !important;
          }
          body {
            top: 0px !important;
          }
          /* Hide the language selector dropdown that Google adds */
          .goog-te-gadget {
            display: none !important;
          }
          .goog-te-combo {
            display: none !important;
          }
        `}</style>
      </head>
      <body
        className={`${roboto.variable} font-roboto antialiased ${
          websiteTheme === "dark" ? "dark-theme" : "light-theme"
        }`}
      >
        {/* Hidden Google Translate Element - MUST be outside any conditional rendering */}
        <div
          id="google_translate_element"
          style={{
            display: "none",
            position: "absolute",
            zIndex: -1,
            opacity: 0,
          }}
        ></div>

        <AuthCheck>
          {isAuthPage ? (
            <div className="min-h-screen">{children}</div>
          ) : (
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
        </AuthCheck>

        {/* Load the config script */}
        <script src="/lang-config.js" async />
      </body>
    </html>
  );
}
