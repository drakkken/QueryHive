"use client";
import { Elsie_Swash_Caps } from "next/font/google";
import { createContext, useContext, useEffect, useState } from "react";

const themeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeContextType {
  mode: string;
  setMode: (mode: string) => void;
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState("");

  useEffect(() => {
    handleChange();
  }, [mode]);

  const handleChange = () => {
    if (localStorage.theme === "dark") {
      setMode("dark");
      document.documentElement.classList.add("dark");
    } else {
      setMode("light");
      document.documentElement.classList.remove("dark");
    }
  };

  return (
    <themeContext.Provider value={{ mode, setMode }}>
      {children}
    </themeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(themeContext);
  if (context === undefined) {
    throw new Error("use theme must be used within a theme provider");
  }
  return context;
}
