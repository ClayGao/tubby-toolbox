import { ToolGroup } from "../types/tool";

/**
 * 工具分類配置
 */
export const TOOL_GROUPS: ToolGroup[] = [
  {
    category: "life",
    categoryName: "生活實用",
    categoryEmoji: "🛠️",
    description: "日常生活中實用的工具",
    tools: [
      {
        id: "time-calculator",
        name: "時間加總計算機",
        description: "輸入多個時間（HH:MM），自動加總",
        category: "life",
        icon: "⏱️",
        path: "/time-calculator",
        comingSoon: false,
      },
    ],
  },
];

/**
 * 顏色配置
 */
export const COLORS = {
  primary: "#10b981",
  secondary: "#f59e0b",
  accent: "#06b6d4",
  background: "#0f172a",
  foreground: "#e2e8f0",
  cardBg: "#1e293b",
  border: "#334155",
} as const;

/**
 * 分類對應的主題顏色
 */
export const CATEGORY_COLORS: Record<string, string> = {
  dev: "#06b6d4", // 青色 - 開發
  text: "#f59e0b", // 琥珀色 - 文字
  life: "#10b981", // 綠色 - 生活
} as const;

/**
 * 應用程式配置
 */
export const APP_CONFIG = {
  name: "小胖工具箱",
  nameEn: "Tubby Toolbox",
  version: "1.0.0",
  description: "簡單、實用的線上工具集合",
  author: "Tubby Dev",
} as const;
