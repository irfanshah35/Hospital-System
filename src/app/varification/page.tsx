"use client";

import { Mail } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Varification() {

    const router = useRouter();

    useEffect(() => {
        console.log("Verification page mounted.");

        const checkToken = () => {
            const token = localStorage.getItem("authToken");
            if (token) {
                console.log("✅ Auth token found! Redirecting to /email-verified-page...");
                router.push("/email-verified-page");
            }
        };

        // Run initial check (in case token already exists)
        checkToken();

        // ✅ 1. Listen for localStorage changes (live updates)
        const handleStorageChange = (e: StorageEvent) => {
            if (e.key === "authToken" && e.newValue) {
                console.log("🔄 Token detected via storage event. Redirecting...");
                checkToken();
            }
        };
        window.addEventListener("storage", handleStorageChange);

        // ✅ 2. Fallback polling every 1s (for same-tab updates)
        const interval = setInterval(checkToken, 1000);

        return () => {
            window.removeEventListener("storage", handleStorageChange);
            clearInterval(interval);
        };
    }, [router]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="bg-white shadow-md rounded-xl p-10 text-center w-full max-w-md">
                <div className="flex justify-center mb-4">
                    <div className="bg-indigo-100 text-indigo-600 p-3 rounded-full">
                        <Mail size={32} />
                    </div>
                </div>
                <h1 className="text-2xl font-semibold text-gray-900">
                    Check your inbox
                </h1>
                <p className="text-gray-600 mt-3">
                    We’re glad that you’re with us! We’ve sent you a verification link to
                    your email address{" "}
                    <span className="text-indigo-600 font-medium"></span>.
                </p>
            </div>
        </div>
    );
}
