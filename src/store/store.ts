"use client";
import { create } from "zustand";

type ThemeState = {
  sidebarTheme: "light" | "dark";
  headerColor: string;
  toggleSidebarTheme: () => void;
  setSidebarTheme: (theme: "light" | "dark") => void;
  setHeaderColor: (color: string) => void;
};

export const useThemeStore = create<ThemeState>((set) => ({
  sidebarTheme:
    (typeof window !== "undefined" &&
      (localStorage.getItem("sidebarTheme") as "light" | "dark")) ||
    "dark",

  headerColor:
    (typeof window !== "undefined" &&
      localStorage.getItem("headerColor")) ||
    "white",

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

  setHeaderColor: (color) => {
    localStorage.setItem("headerColor", color);
    set({ headerColor: color });
  },
}));