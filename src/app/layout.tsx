"use client";
import { usePathname } from "next/navigation";
import { Roboto } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import AdminSideBar from "@/components/sidebar/adminsidebar";
import { useState } from "react";
import AuthCheck from "@/components/AuthCheck";

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
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const shouldExpand = !isCollapsed || (isCollapsed && isHovered);

  const noLayoutPages = ["/login"];
  const showLayout = !noLayoutPages.includes(pathname);

  return (
    <html lang="en">
      <body className={`${roboto.variable} font-roboto antialiased`}>
        <AuthCheck>
          {showLayout ? (
            <>
              <Header
                isCollapsed={isCollapsed}
                setIsCollapsed={setIsCollapsed}
                shouldExpand={shouldExpand}
              />
              <div className="flex flex-row">
                <AdminSideBar
                  isCollapsed={isCollapsed}
                  setIsCollapsed={setIsCollapsed}
                  isHovered={isHovered}
                  setIsHovered={setIsHovered}
                />
                <div
                  className={`flex flex-col mt-[68px] w-full transition-all duration-300 ${
                    shouldExpand ? "pl-[260px]" : "pl-[60px]"
                  }`}
                >
                  {children}
                </div>
              </div>
            </>
          ) : (
            children
          )}
        </AuthCheck>
      </body>
    </html>
  );
}
