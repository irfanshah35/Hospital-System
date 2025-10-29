"use client";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";

export default function AuthCheck({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("authToken");
      const isAuth = !!token;

      setIsAuthenticated(isAuth);
      setIsLoading(false);

      // If not authenticated and not on login page (which is now "/")
      if (!isAuth && pathname !== "/" && pathname !== "/signup") {
        router.replace("/");
      } 
      // If authenticated and on login page ("/")
      else if (isAuth && pathname === "/" ) {
        router.replace("/admin/dashboard");
      }
   
    };

    checkAuth();
  }, [pathname, router]);


  // Prevent rendering wrong content during redirect
 if (!isAuthenticated && pathname !== "/" && pathname !== "/signup") return null;
  if (isAuthenticated && (pathname === "/" || pathname === "/signup")) return null;

  return <>{children}</>;
}