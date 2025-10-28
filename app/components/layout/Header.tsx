"use client";

import React from "react";
import { ThemeSwitcher } from "../ui/ThemeSwitcher";

export function Header() {
  return (
    <header className="bg-background border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <span className="text-2xl">🧰</span>
          <span className="text-lg font-semibold text-foreground">小胖工具箱</span>
        </div>

        {/* Theme Switcher */}
        <ThemeSwitcher />
      </div>
    </header>
  );
}
