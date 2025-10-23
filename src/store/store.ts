"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type ThemeState = {
  sidebarTheme: "light" | "dark";
  headerColor: string;
  websiteTheme: "light" | "dark";
  toggleSidebarTheme: () => void;
  setSidebarTheme: (theme: "light" | "dark") => void;
  setHeaderColor: (color: string) => void;
  toggleWebsiteTheme: () => void;
  setWebsiteTheme: (theme: "light" | "dark") => void;
};

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      sidebarTheme: "dark",
      headerColor: "white",
      websiteTheme: "light",

      toggleSidebarTheme: () =>
        set((state) => {
          const newTheme = state.sidebarTheme === "light" ? "dark" : "light";
          return { sidebarTheme: newTheme };
        }),

      setSidebarTheme: (theme) => {
        set({ sidebarTheme: theme });
      },

      setHeaderColor: (color) => {
        set({ headerColor: color });
      },

      toggleWebsiteTheme: () =>
        set((state) => {
          const newTheme = state.websiteTheme === "light" ? "dark" : "light";
          return { websiteTheme: newTheme };
        }),

      setWebsiteTheme: (theme) => {
        set({ websiteTheme: theme });
      },
    }),
    {
      name: "theme-storage",
    }
  )
);