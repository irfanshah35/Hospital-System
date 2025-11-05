"use client";
import React, { useEffect, useState, useRef } from "react";
import { useThemeStore } from "@/store/store";
import { useRouter } from "next/navigation";

interface HeaderProps {
  isCollapsed: boolean;
  setIsCollapsed: (value: boolean) => void;
  shouldExpand: boolean;
}

export default function Header({
  isCollapsed,
  setIsCollapsed,
  shouldExpand,
}: HeaderProps) {
  const [profileDropdown, setProfileDropdown] = useState(false);
  const [countryDropdown, setCountryDropdown] = useState(false);
  const [notificationDropdown, setNotificationDropdown] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState({
    flag: "/assets/header/us.svg",
    language: "English",
    code: "en",
  });
  const { sidebarTheme } = useThemeStore();
  const { headerColor } = useThemeStore();
const router = useRouter();

  // User data state
  const [userData, setUserData] = useState({
    name: "Ella Jones",
    photo:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWcoY3z1q3i7fyiX5wMAE7pxRFoAAWySeQWIZE2U_rG1sdbqQcK8Eci_QvIn-YxmccpBw&usqp=CAU",
    email: "",
  });

  const ref = useRef<HTMLDivElement | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  // Load user data from localStorage
  useEffect(() => {
    const username = localStorage.getItem("username");
    const userPicture = localStorage.getItem("userPicture");
    const userEmail = localStorage.getItem("userEmail");

    if (username) {
      setUserData({
        name: username,
        photo:
          userPicture ||
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWcoY3z1q3i7fyiX5wMAE7pxRFoAAWySeQWIZE2U_rG1sdbqQcK8Eci_QvIn-YxmccpBw&usqp=CAU",
        email: userEmail || "",
      });
    }
  }, []);

 const handleLogout = () => {
    // Clear all auth-related items from localStorage
    localStorage.removeItem("authToken");
    localStorage.removeItem("userRole");
    localStorage.removeItem("username");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userPicture");
    localStorage.removeItem("loginMethod");
    
    // Clear ALL cookies (must match the cookies set during login)
    const cookiesToClear = [
      "authToken",
      "userRole", 
      "username",
      "userEmail",
      "userPicture",
      "loginMethod"
    ];
    
    cookiesToClear.forEach(cookieName => {
      // Clear with all possible paths and attributes to ensure removal
      document.cookie = `${cookieName}=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT; SameSite=Strict`;
      document.cookie = `${cookieName}=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
    });
    
    // Close any dropdowns
    setProfileDropdown(false);
    
    // Use window.location for a hard redirect (ensures middleware runs)
    window.location.href = "/";
  };

  // Language change function
  const changeLanguage = (langCode: string) => {
    console.log("Attempting to change language to:", langCode);

    // Method 1: Direct Google Translate API
    if (window.google && window.google.translate) {
      const selectField = document.querySelector(
        ".goog-te-combo"
      ) as HTMLSelectElement;
      if (selectField) {
        selectField.value = langCode;
        selectField.dispatchEvent(new Event("change"));
        console.log("Language changed via Google Translate");
        return;
      }
    }

    // Method 2: Try to find the iframe
    const translateFrame = document.querySelector(
      ".goog-te-menu-frame"
    ) as HTMLIFrameElement;
    if (translateFrame && translateFrame.contentDocument) {
      const iframeSelect = translateFrame.contentDocument.querySelector(
        ".goog-te-combo"
      ) as HTMLSelectElement;
      if (iframeSelect) {
        iframeSelect.value = langCode;
        iframeSelect.dispatchEvent(new Event("change"));
        console.log("Language changed via iframe");
        return;
      }
    }

    // Method 3: Use Google Translate cookie method
    setGoogleTranslateCookie(langCode);
    window.location.reload();
  };

  // Set Google Translate cookie directly
  const setGoogleTranslateCookie = (langCode: string) => {
    const domain = window.location.hostname;
    const cookieValue = `googtrans=/auto/${langCode}`;
    document.cookie = `${cookieValue}; path=/; domain=${domain}`;
    console.log("Translation cookie set:", cookieValue);
  };

  const countries = [
    {
      language: "English",
      flag: "/assets/header/us.svg",
      code: "en",
    },
    {
      language: "Spanish",
      flag: "/assets/header/spain.svg",
      code: "es",
    },
    {
      language: "German",
      flag: "/assets/header/germany.svg",
      code: "de",
    },
    {
      language: "اردو",
      flag: "/assets/pak.png",
      code: "ur",
    },
  ];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Node;
      if (dropdownRef.current && !dropdownRef.current.contains(target)) {
        setCountryDropdown(false);
      }
      if (profileRef.current && !profileRef.current.contains(target)) {
        setProfileDropdown(false);
      }
      if (ref.current && !ref.current.contains(target)) {
        setNotificationDropdown(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ✅ Dynamic header background based on selected color
  const getHeaderBgClass = () => {
    switch (headerColor) {
      case "white":
        return "bg-white";
      case "black":
        return "bg-black";
      case "purple":
        return "bg-purple-600";
      case "orange":
        return "bg-orange-500";
      case "cyan":
        return "bg-cyan-500";
      case "green":
        return "bg-green-500";
      case "blue":
        return "bg-blue-600";
      default:
        return "bg-white";
    }
  };

  // ✅ Adjust text color based on background
  const getTextColorClass = () => {
    return headerColor === "white" ? "text-gray-700" : "text-white";
  };

  // Check if Google Translate is loaded
  const isTranslateLoaded = () => {
    return !!(window.google && window.google.translate);
  };

  return (
    <>
      <nav
        className={`fixed top-0 h-auto left-0 z-50 w-full ${getHeaderBgClass()} shadow-[3px_0_10px_#b7c0ce33] font-['Roboto',_sans-serif] transition-colors duration-300`}
      >
        <div className={`flex items-center w-full mx-auto`}>
          {/* Logo Section */}
          <div
            className={`p-[8px] py-[12px] !pr-0 flex items-center ${
              sidebarTheme === "dark"
                ? "bg-[#1A202E] text-white"
                : "bg-white text-gray-800"
            }`}
          >
            <button
              className={`${getTextColorClass()} hover:opacity-80 w-[48px] h-[48px] flex justify-center items-center lg:hidden`}
              onClick={() => setIsCollapsed(!isCollapsed)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 relative left-[2px] top-[1px]"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M3 6h18v2H3V6zm0 5h18v2H3v-2zm0 5h18v2H3v-2z" />
              </svg>
            </button>

           <div
  onClick={() => router.push("/admin/dashboard")}
  className={`flex items-center gap-[10px] px-[10px] cursor-pointer hover:opacity-80 ${
    shouldExpand
      ? "w-[236px] justify-center !mr-4"
      : "px-0 justify-center mr-[3px]"
  } transition-normal duration-300`}
>
  <img
    src="/assets/header/logo.png"
    alt="Cliniva Logo"
    className="h-8 w-8"
  />
  {shouldExpand && (
    <span
      className={`text-[24px] font-[400] ${
        sidebarTheme === "dark" ? "text-white" : "text-gray-800"
      }`}
    >
      Cliniva
    </span>
  )}
</div>

          </div>

          {/* Main Header Content */}
          <div className="flex items-center justify-between w-full pl-[8px]">
            {/* Collapse Button for Desktop */}
            <button
              className={`${getTextColorClass()} hover:opacity-80 w-[48px] h-[48px] flex justify-center items-center`}
              aria-label="Toggle Menu"
              onClick={() => setIsCollapsed(!isCollapsed)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 relative left-[2px] top-[1px]"
                viewBox="0 0 24 24"
                fill="var(--tableHeadertext)"
              >
                <path d="M3 6h18v2H3V6zm0 5h18v2H3v-2zm0 5h18v2H3v-2z" />
              </svg>
            </button>

            {/* Header Icons */}
            <div className="flex items-center">
              {/* Fullscreen Toggle */}
              <button
                onClick={() => {
                  if (!document.fullscreenElement) {
                    document.documentElement.requestFullscreen();
                  } else {
                    document.exitFullscreen();
                  }
                }}
                className={`relative ${getTextColorClass()} hover:opacity-80 flex justify-center items-center w-[48px] h-[48px] cursor-pointer`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-[24px] h-6"
                  fill="var(--tableHeadertext)"
                >
                  <path d="M4 4h6v2H6v4H4V4zm14 0v6h-2V6h-4V4h6zm-6 16h6v-6h-2v4h-4v2zM4 20h6v-2H6v-4H4v6z" />
                </svg>
              </button>

              {/* Notifications */}
              <div ref={ref}>
                <button
                  onClick={() => setNotificationDropdown(!notificationDropdown)}
                  className={`relative ${getTextColorClass()} hover:opacity-80 flex justify-center items-center w-[48px] h-[48px] cursor-pointer`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="var(--tableHeadertext)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" />
                    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                  </svg>
                  <span className="absolute top-1 right-[12px] bg-red-500 text-white text-[10px] font-semibold rounded-full px-[5px] py-[1px]">
                    3
                  </span>
                </button>

                {notificationDropdown && (
                  <div className="absolute top-0 right-0 z-10">
                    <Notification />
                  </div>
                )}
              </div>

              {/* Language Selector */}
              <div ref={dropdownRef}>
                <button
                  onClick={() => setCountryDropdown(!countryDropdown)}
                  className={`gap-2 ${getTextColorClass()} hover:opacity-80 flex justify-center items-center w-[48px] h-[48px] cursor-pointer`}
                  aria-label="Language"
                >
                  <img
                    src={selectedCountry.flag}
                    alt={selectedCountry.language}
                    className="h-4 w-auto"
                  />
                </button>
                {countryDropdown && (
                  <div className="absolute top-[50px] right-0 z-10">
                    <div className="noti-list bg-white shadow-lg rounded-[8px] w-[180px] overflow-hidden border border-gray-200">
                      <div className="menu">
                        <div className="user_dw_menu flex flex-col">
                          {countries.map((country, i) => (
                            <button
                              key={i}
                              onClick={() => {
                                setSelectedCountry(country);
                                setCountryDropdown(false);
                                changeLanguage(country.code);
                              }}
                              className={`flex items-center gap-3 h-[48px] px-4 py-2 hover:bg-gray-100 transition-colors text-gray-700 text-sm font-medium cursor-pointer ${
                                selectedCountry.code === country.code
                                  ? "bg-blue-50 text-blue-600"
                                  : ""
                              }`}
                            >
                              <img
                                src={country.flag}
                                alt={country.language}
                                className="h-4 w-auto"
                              />
                              <span
                                className={
                                  country.code === "ur"
                                    ? "text-right flex-1"
                                    : ""
                                }
                              >
                                {country.language}
                              </span>
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Profile Dropdown */}
              <div ref={profileRef}>
                <div
                  onClick={() => setProfileDropdown(!profileDropdown)}
                  className="w-auto max-w-[150px] h-[48px] flex justify-center items-center gap-2 cursor-pointer px-2"
                >
                  <span
                    className={`text-sm font-medium ${getTextColorClass()} truncate`}
                  style={{ color: 'var(--tableHeadertext)' }}>
                    {userData.name}
                  </span>
                  <img
                    src={userData.photo}
                    alt={userData.name}
                    className="w-8 h-8 rounded-full border border-gray-300 object-cover"
                    onError={(e) => {
                      e.currentTarget.src =
                        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWcoY3z1q3i7fyiX5wMAE7pxRFoAAWySeQWIZE2U_rG1sdbqQcK8Eci_QvIn-YxmccpBw&usqp=CAU";
                    }}
                  />
                </div>

                {profileDropdown && (
                  <div className="absolute top-[50px] right-0 z-10">
                    <div className="noti-list bg-white shadow-lg rounded-[8px] w-[200px] overflow-hidden border border-gray-200">
                      <div className="menu">
                        <div className="user_dw_menu flex flex-col">
                          <button className="flex items-center gap-3 h-[48px] px-4 py-2 hover:bg-gray-100 transition-colors text-gray-700 text-sm font-medium cursor-pointer">
                            <svg
                              className="w-[18px] h-[18px] text-gray-600"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                            >
                              <path d="M20 22H18V20C18 18.3431 16.6569 17 15 17H9C7.34315 17 6 18.3431 6 20V22H4V20C4 17.2386 6.23858 15 9 15H15C17.7614 15 20 17.2386 20 20V22ZM12 13C8.68629 13 6 10.3137 6 7C6 3.68629 8.68629 1 12 1C15.3137 1 18 3.68629 18 7C18 10.3137 15.3137 13 12 13ZM12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z"></path>
                            </svg>
                            Account
                          </button>

                          <button className="flex items-center gap-3 h-[48px] px-4 py-2 hover:bg-gray-100 transition-colors text-gray-700 text-sm font-medium cursor-pointer">
                            <svg
                              className="w-[18px] h-[18px] text-gray-600"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                            >
                              <path d="M3 3H21C21.5523 3 22 3.44772 22 4V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V4C2 3.44772 2.44772 3 3 3ZM20 7.23792L12.0718 14.338L4 7.21594V19H20V7.23792ZM4.51146 5L12.0619 11.662L19.501 5H4.51146Z"></path>
                            </svg>
                            Inbox
                          </button>

                          <button className="flex items-center gap-3 h-[48px] px-4 py-2 hover:bg-gray-100 transition-colors text-gray-700 text-sm font-medium cursor-pointer">
                            <svg
                              className="w-[18px] h-[18px] text-gray-600"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                            >
                              <path d="M2.21232 14.0601C1.91928 12.6755 1.93115 11.2743 2.21316 9.94038C3.32308 10.0711 4.29187 9.7035 4.60865 8.93871C4.92544 8.17392 4.50032 7.22896 3.62307 6.53655C4.3669 5.3939 5.34931 4.39471 6.53554 3.62289C7.228 4.50059 8.17324 4.92601 8.93822 4.60914C9.7032 4.29227 10.0708 3.32308 9.93979 2.21281C11.3243 1.91977 12.7255 1.93164 14.0595 2.21364C13.9288 3.32356 14.2964 4.29235 15.0612 4.60914C15.8259 4.92593 16.7709 4.5008 17.4633 3.62356C18.606 4.36739 19.6052 5.3498 20.377 6.53602C19.4993 7.22849 19.0739 8.17373 19.3907 8.93871C19.7076 9.70369 20.6768 10.0713 21.7871 9.94028C22.0801 11.3248 22.0682 12.726 21.7862 14.06C20.6763 13.9293 19.7075 14.2969 19.3907 15.0616C19.0739 15.8264 19.4991 16.7714 20.3763 17.4638C19.6325 18.6064 18.6501 19.6056 17.4638 20.3775C16.7714 19.4998 15.8261 19.0743 15.0612 19.3912C14.2962 19.7081 13.9286 20.6773 14.0596 21.7875C12.675 22.0806 11.2738 22.0687 9.93989 21.7867C10.0706 20.6768 9.70301 19.708 8.93822 19.3912C8.17343 19.0744 7.22848 19.4995 6.53606 20.3768C5.39341 19.633 4.39422 18.6506 3.62241 17.4643C4.5001 16.7719 4.92552 15.8266 4.60865 15.0616C4.29179 14.2967 3.32259 13.9291 2.21232 14.0601Z"></path>
                            </svg>
                            Settings
                          </button>

                          <div className="border-t border-gray-200"></div>

                          <button
                            onClick={handleLogout}
                            className="flex items-center gap-3 h-[48px] px-4 py-2 hover:bg-red-50 transition-colors text-red-600 text-sm font-medium cursor-pointer"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="w-5 h-5 text-red-600"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H7a2 2 0 01-2-2V5a2 2 0 012-2h4a2 2 0 012 2v1"
                              />
                            </svg>
                            Logout
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

// Notification Component
const Notification = () => {
  const notifications = [
    {
      title: "Please check your mail",
      time: "14 mins ago",
      action: "View",
    },
    {
      title: "Your leave is approved!",
      time: "3 hours ago",
      action: "View",
    },
    {
      title: "Patient report generated",
      time: "1 hour ago",
      action: "Download",
    },
    {
      title: "New message received",
      time: "2 hours ago",
      action: "Read",
    },
    {
      title: "Appointment reminder",
      time: "5 hours ago",
      action: "View",
    },
  ];

  return (
    <>
      <div className="absolute top-[50px] right-[10px] w-[325px] bg-white shadow-xl rounded-[8px] border border-gray-200 overflow-hidden">
        <div className="flex justify-between items-center px-[15px] py-[18px] bg-[#6777ef] text-white">
          <h6 className="text-[16px] font-medium">Notifications</h6>
          <button className="text-[12px] cursor-pointer font-medium hover:underline">
            Mark all as read
          </button>
        </div>

        <div className="max-h-[350px] overflow-y-auto">
          <div className="divide-y divide-gray-100">
            {notifications.map((item, i) => (
              <div
                key={i}
                className="flex items-center gap-[15px] p-[12px] px-[18px] hover:bg-gray-50 transition-colors cursor-pointer"
              >
                <span className="flex items-center justify-center w-9 h-9 rounded-full bg-blue-100 text-blue-600">
                  <svg
                    className="w-5 h-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M3 3H21C21.5523 3 22 3.44772 22 4V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V4C2 3.44772 2.44772 3 3 3ZM20 7.23792L12.0718 14.338L4 7.21594V19H20V7.23792ZM4.51146 5L12.0619 11.662L19.501 5H4.51146Z"></path>
                  </svg>
                </span>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-800">
                    {item.title}
                  </p>
                  <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                    <svg
                      className="w-3 h-3"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20ZM13 12H17V14H11V7H13V12Z"></path>
                    </svg>
                    {item.time}
                  </p>
                  <button className="mt-2 text-[11px] border border-gray-300 text-blue-600 px-3 py-1 rounded-full hover:bg-blue-50 transition-colors cursor-pointer">
                    {item.action}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="px-[15px] py-[12px] bg-gray-50 text-center border-t border-gray-200">
          <button className="cursor-pointer text-blue-600 text-[14px] font-medium hover:underline">
            View All Notifications
          </button>
        </div>
      </div>
    </>
  );
};
