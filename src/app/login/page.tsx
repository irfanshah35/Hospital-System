"use client";
import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import Image from "next/image";

export default function LoginPage() {
  const [selectedRole, setSelectedRole] = useState("admin");
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("clinivaAdmin");
  const [password, setPassword] = useState("password123");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login submitted", { username, password, role: selectedRole });
  };

  return (
    <div className="h-screen bg-[#CFE1EC] flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl overflow-hidden max-w-3xl w-full grid grid-cols-1 lg:grid-cols-6">
        {/* Left Side - Form (3/5 width) */}
        <div className="lg:col-span-3 p-6 lg:p-12">
          <div className="max-w-md mx-auto">
            <h1 className="text-2xl font-bold text-gray-900 mb-1">Sign in</h1>
            <p className="text-gray-600 mb-6 text-sm">
              Enter your credentials to log in
            </p>

            {/* Role Selection Buttons */}
            <div className="flex justify-between mb-6">
              <button
                onClick={() => setSelectedRole("admin")}
                className={`px-4 py-2 bg-[#458E21] rounded-full font-semibold text-white transition text-sm ${
                  selectedRole === "admin"
                }`}
              >
                Admin
              </button>
              <button
                onClick={() => setSelectedRole("doctor")}
                className={`px-4 py-2 bg-[#EB872B] rounded-full font-semibold text-white transition text-sm ${
                  selectedRole === "doctor"
                }`}
              >
                Doctor
              </button>
              <button
                onClick={() => setSelectedRole("patient")}
                className={`px-4 py-2 bg-[#3C6EFD] rounded-full font-semibold text-white transition text-sm ${
                  selectedRole === "patient"
                }`}
              >
                Patient
              </button>
            </div>

            {/* Login Form */}
            <form onSubmit={handleSubmit}>
              {/* Username Field */}
              <fieldset className="border border-gray-300 rounded-lg p-3 mb-4">
                <legend className="text-xs text-gray-600 px-2">
                  Username*
                </legend>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full outline-none text-gray-900 text-sm"
                  required
                />
              </fieldset>

              {/* Password Field */}
              <fieldset className="border border-gray-300 rounded-lg p-3 mb-4 relative">
                <legend className="text-xs text-gray-600 px-2">
                  Password*
                </legend>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full outline-none text-gray-900 pr-10 text-sm"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-800"
                >
                  {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                </button>
              </fieldset>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between mb-5">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    className="w-3.5 h-3.5 border-2 border-gray-400 rounded cursor-pointer"
                  />
                  <span className="text-gray-700 text-sm">Remember me</span>
                </label>
                <a
                  href="#"
                  className="text-gray-600 hover:text-gray-800 text-sm"
                >
                  Forgot Password?
                </a>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-[#807160] via-[#796D7B] to-[#806B8D] text-white font-semibold py-3.5 rounded-lg hover:opacity-90 transition mb-5 text-sm"
              >
                Login
              </button>

              {/* Sign Up Link */}
              <p className="text-center text-gray-600 mb-5 text-sm">
                Don't have an account?{" "}
                <a
                  href="#"
                  className="text-gray-900 font-semibold hover:underline"
                >
                  Sign up
                </a>
              </p>

              {/* Social Login */}
              <div className="flex justify-center gap-3">
                <button
                  type="button"
                  className="w-10 h-10 rounded-full bg-gray-50 hover:bg-gray-100 flex items-center justify-center transition"
                >
                  <Image
                    src="/assets/google.png"
                    alt="Google"
                    width={20}
                    height={20}
                  />
                </button>

                <button
                  type="button"
                  className="w-10 h-10 rounded-full bg-gray-50 hover:bg-gray-100 flex items-center justify-center transition"
                >
                  <Image
                    src="/assets/facebook.jpg"
                    alt="Facebook"
                    width={20}
                    height={20}
                  />
                </button>

                <button
                  type="button"
                  className="w-10 h-10 rounded-full bg-gray-50 hover:bg-gray-100 flex items-center justify-center transition"
                >
                  <Image
                    src="/assets/apple.png"
                    alt="Apple"
                    width={20}
                    height={20}
                  />
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Right Side - Image (2/5 width) */}
        <div className="lg:col-span-3 relative flex items-center justify-center w-full h-full overflow-hidden">
          <Image
            src="/assets/bg-01.png"
            alt="Sailing illustration"
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>
    </div>
  );
}
