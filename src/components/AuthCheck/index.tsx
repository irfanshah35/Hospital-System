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

      if (!isAuth && pathname !== "/login") {
        router.replace("/login");
      } else if (isAuth && pathname === "/login") {
        router.replace("/");
      }
    };

    checkAuth();
  }, [pathname, router]);

  if (isLoading) {
    return (
      <></>
    );
  }

  // Prevent rendering wrong content during redirect
  if (!isAuthenticated && pathname !== "/login") {
    return null;
  }

  if (isAuthenticated && pathname === "/login") {
    return null;
  }

  return <>{children}</>;
}
