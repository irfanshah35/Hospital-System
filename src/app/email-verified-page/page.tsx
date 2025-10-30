"use client";

import { CheckCircle } from "lucide-react";
import { useEffect } from "react";

export default function EmailVerifiedPage() {
  useEffect(() => {
    console.log("Email Verified page mounted.");
  }, []);
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white shadow-md rounded-2xl p-10 text-center w-full max-w-md">
        <div className="flex justify-center mb-4">
          <div className="text-green-600">
            <CheckCircle size={64} strokeWidth={1.5} />
          </div>
        </div>
        <h1 className="text-2xl font-semibold text-gray-900">Email Verified</h1>
        <p className="text-gray-600 mt-2">
          Your email address was successfully verified.
        </p>
      </div>
    </div>
  );
}
