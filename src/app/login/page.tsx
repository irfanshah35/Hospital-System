"use client";
import React, { useState, useEffect, useRef } from "react";
import { Eye, EyeOff } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

// Extend Window interface for Google
declare global {
  interface Window {
    google: any;
  }
}

export default function LoginPage() {
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState("admin");
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("admin");
  const [password, setPassword] = useState("password123");
  const [isGoogleLoaded, setIsGoogleLoaded] = useState(false);

  // Update username when role changes
  useEffect(() => {
    setUsername(selectedRole);
  }, [selectedRole]);

  useEffect(() => {
    if (document.getElementById("google-signin-script")) {
      return;
    }

    const script = document.createElement("script");
    script.id = "google-signin-script";
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    script.onload = () => {
      setIsGoogleLoaded(true);
      initializeGoogleSignIn();
    };
    document.body.appendChild(script);

    return () => {
      const existingScript = document.getElementById("google-signin-script");
      if (existingScript) {
        document.body.removeChild(existingScript);
      }
    };
  }, []);

  const initializeGoogleSignIn = () => {
    if (window.google) {
      window.google.accounts.id.initialize({
        client_id:
          "887906251931-h5unlhh9rkjcdailipjkotgugls25gs9.apps.googleusercontent.com",
        callback: handleGoogleCallback,
      });
    }
  };

  const navigateBasedOnRole = (role: string) => {
    switch (role) {
      case "admin":
        router.push("/");
        break;
      case "patient":
        router.push("/patient-dashboard");
        break;
      case "doctor":
        router.push("/doctor-dashboard");
        break;
      default:
        router.push("/");
    }
  };

  const handleGoogleCallback = (response: any) => {
    try {
      // Decode JWT token to get user info
      const base64Url = response.credential.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split("")
          .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
          .join("")
      );

      const userData = JSON.parse(jsonPayload);

      // Store user data
      localStorage.setItem("authToken", response.credential);
      localStorage.setItem("userRole", selectedRole);
      localStorage.setItem("username", userData.name || userData.email);
      localStorage.setItem("userEmail", userData.email);
      localStorage.setItem("userPicture", userData.picture || "");
      localStorage.setItem("loginMethod", "google");

      console.log("Google login successful:", userData);

      navigateBasedOnRole(selectedRole);
    } catch (error) {
      console.error("Error processing Google login:", error);
    }
  };

  const createFakeGoogleWrapper = () => {
    if (!window.google) {
      console.error("Google Sign-In not loaded");
      return null;
    }

    const googleLoginWrapper = document.createElement("div");
    googleLoginWrapper.style.display = "none";
    googleLoginWrapper.classList.add("custom-google-button");
    document.body.appendChild(googleLoginWrapper);

    window.google.accounts.id.renderButton(googleLoginWrapper, {
      type: "icon",
      width: 200,
    });

    const googleLoginWrapperButton = googleLoginWrapper.querySelector(
      'div[role="button"]'
    ) as HTMLElement;

    return {
      click: () => {
        googleLoginWrapperButton?.click();
      },
    };
  };

  const handleGoogleLogin = () => {
    if (!isGoogleLoaded) {
      console.error("Google Sign-In not loaded yet");
      return;
    }

    const googleWrapper = createFakeGoogleWrapper();
    if (googleWrapper) {
      googleWrapper.click();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Create a dummy token and store in localStorage
      const dummyToken = `token_${Date.now()}_${Math.random()
        .toString(36)
        .substr(2, 9)}`;
      localStorage.setItem("authToken", dummyToken);
      localStorage.setItem("userRole", selectedRole);
      localStorage.setItem("username", username);
      localStorage.setItem("loginMethod", "credentials");

      navigateBasedOnRole(selectedRole);
    } catch (error) {
      console.error("Error storing auth data:", error);
    }
  };

  return (
    <div className="h-screen bg-[#CFE1EC] flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl overflow-hidden max-w-3xl w-full grid grid-cols-1 lg:grid-cols-6">
        <div className="lg:col-span-3 p-6 lg:p-12">
          <div className="max-w-md mx-auto">
            <h1 className="text-2xl font-bold text-gray-900 mb-1">Sign in</h1>
            <p className="text-gray-600 mb-6 text-sm">
              Enter your credentials to log in
            </p>

            <div className="flex justify-between mb-6">
              <button
                type="button"
                onClick={() => setSelectedRole("admin")}
                className={`px-4 py-2 rounded-full font-semibold text-white transition text-sm ${
                  selectedRole === "admin" ? "bg-[#458E21]" : "bg-[#458E21]/70"
                }`}
              >
                Admin
              </button>
              <button
                type="button"
                onClick={() => setSelectedRole("doctor")}
                className={`px-4 py-2 rounded-full font-semibold text-white transition text-sm ${
                  selectedRole === "doctor" ? "bg-[#EB872B]" : "bg-[#EB872B]/70"
                }`}
              >
                Doctor
              </button>
              <button
                type="button"
                onClick={() => setSelectedRole("patient")}
                className={`px-4 py-2 rounded-full font-semibold text-white transition text-sm ${
                  selectedRole === "patient"
                    ? "bg-[#3C6EFD]"
                    : "bg-[#3C6EFD]/70"
                }`}
              >
                Patient
              </button>
            </div>

            <form onSubmit={handleSubmit}>
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

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-[#807160] via-[#796D7B] to-[#806B8D] text-white font-semibold py-3.5 rounded-lg hover:opacity-90 transition mb-5 text-sm"
              >
                Login
              </button>

              <p className="text-center text-gray-600 mb-5 text-sm">
                Don't have an account?{" "}
                <a
                  href="#"
                  className="text-gray-900 font-semibold hover:underline"
                >
                  Sign up
                </a>
              </p>

              <div className="flex items-center justify-center gap-2 mb-4">
                <div className="flex-1 h-px bg-gray-300"></div>
                <span className="text-gray-500 text-sm">OR</span>
                <div className="flex-1 h-px bg-gray-300"></div>
              </div>

              <div className="flex justify-center gap-3">
                <button
                  type="button"
                  onClick={handleGoogleLogin}
                  disabled={!isGoogleLoaded}
                  className="w-10 h-10 rounded-full bg-gray-50 hover:bg-gray-100 flex items-center justify-center transition disabled:opacity-50 disabled:cursor-not-allowed"
                  title="Sign in with Google"
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
                  title="Sign in with Facebook"
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
                  title="Sign in with Apple"
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