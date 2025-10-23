"use client";
import { create } from "zustand";

type ThemeState = {
  sidebarTheme: "light" | "dark";
  toggleSidebarTheme: () => void;
  setSidebarTheme: (theme: "light" | "dark") => void;
};

export const useThemeStore = create<ThemeState>((set) => ({
  sidebarTheme:
    (typeof window !== "undefined" &&
      (localStorage.getItem("sidebarTheme") as "light" | "dark")) || "dark",

  toggleSidebarTheme: () =>
    set((state) => {
      const newTheme = state.sidebarTheme === "light" ? "dark" : "light";
      localStorage.setItem("sidebarTheme", newTheme);
      return { sidebarTheme: newTheme };
    }),

  setSidebarTheme: (theme) => {
    localStorage.setItem("sidebarTheme", theme);
    set({ sidebarTheme: theme });
  },
}));
