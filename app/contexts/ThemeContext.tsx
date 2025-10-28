"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

type ThemeType = "light" | "dark" | "hacker";

interface ThemeContextType {
  theme: ThemeType;
  setTheme: (theme: ThemeType) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<ThemeType>("light");
  const [mounted, setMounted] = useState(false);

  // 初始化主題（從 localStorage 或系統偏好）
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as ThemeType | null;

    if (savedTheme) {
      setThemeState(savedTheme);
      applyTheme(savedTheme);
    } else {
      // 檢查系統偏好
      if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
        setThemeState("dark");
        applyTheme("dark");
      } else {
        setThemeState("light");
        applyTheme("light");
      }
    }
    setMounted(true);
  }, []);

  const setTheme = (newTheme: ThemeType) => {
    setThemeState(newTheme);
    localStorage.setItem("theme", newTheme);
    applyTheme(newTheme);
  };

  const applyTheme = (themeToApply: ThemeType) => {
    const html = document.documentElement;
    html.setAttribute("data-theme", themeToApply);

    // 更新 prefers-color-scheme media query 適應性
    if (themeToApply === "light") {
      html.style.colorScheme = "light";
    } else if (themeToApply === "dark") {
      html.style.colorScheme = "dark";
    } else {
      // hacker 模式使用深色
      html.style.colorScheme = "dark";
    }
  };

  // 防止 hydration mismatch
  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    // 返回默認主題而不是拋出錯誤
    return {
      theme: "light" as ThemeType,
      setTheme: () => {},
    };
  }
  return context;
}
