"use client";
import { Roboto } from "next/font/google";
import "./globals.css";
import { useState, useEffect, Suspense } from "react";
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
  const { websiteTheme } = useThemeStore();

  // Initialize Google Translate for non-auth pages
  useGoogleTranslate();

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
        <Suspense fallback={<div>Loading...</div>}>
          {/* Hidden Google Translate Element */}
          <div
            id="google_translate_element"
            style={{
              display: "none",
              position: "absolute",
              zIndex: -1,
              opacity: 0,
            }}
          ></div>

          {/* Remove AuthCheck wrapper - middleware handles authentication */}
          <div className="min-h-screen">{children}</div>

          {/* Load the config script */}
          <script src="/lang-config.js" async />
        </Suspense>
      </body>
    </html>
  );
}
