"use client";

import { XCircle } from "lucide-react";
import { useEffect } from "react";

export default function VerificationErrorPage() {
  useEffect(() => {
    console.log("Verification error page mounted.");
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white shadow-md rounded-2xl p-10 text-center w-full max-w-md">
        <div className="flex justify-center mb-4">
          <div className="text-red-600">
            <XCircle size={64} strokeWidth={1.5} />
          </div>
        </div>
        <h1 className="text-2xl font-semibold text-gray-900">Verification Failed</h1>
        <p className="text-gray-600 mt-2">
          We couldn’t verify your email address. The link may have expired or is invalid.
        </p>
        <button
          onClick={() => (window.location.href = "/signup")}
          className="mt-6 bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-all"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}
