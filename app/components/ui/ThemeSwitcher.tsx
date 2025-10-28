"use client";

import { useTheme } from "@/app/contexts/ThemeContext";

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  const themes = [
    { id: "light", name: "Light", icon: "☀️" },
    { id: "dark", name: "Dark", icon: "🌙" },
    { id: "hacker", name: "Hacker", icon: "💻" },
  ] as const;

  return (
    <div className="flex gap-2 items-center">
      {themes.map((t) => (
        <button
          key={t.id}
          onClick={() => setTheme(t.id)}
          className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200 ${
            theme === t.id
              ? "bg-primary text-background shadow-lg scale-105"
              : "bg-background border-2 border-border text-foreground hover:border-primary"
          }`}
          title={t.name}
        >
          {t.icon}
        </button>
      ))}
    </div>
  );
}
