import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "./contexts/ThemeContext";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "小胖工具箱 - Tubby Toolbox | 簡單實用的線上工具集合",
  description: "小胖工具箱是一個簡單實用的線上工具集合。提供開發工具、文字處理、生活實用工具，幫助你提高效率。",
  keywords: ["工具", "在線工具", "JSON格式化", "Base64", "顏色轉換", "計算機"],
  authors: [{ name: "Tubby Dev" }],
  openGraph: {
    title: "小胖工具箱 - Tubby Toolbox",
    description: "簡單實用的線上工具集合",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-TW">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
