import React from "react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background border-t border-border mt-16 py-8">
      <div className="max-w-7xl mx-auto px-4 text-center text-sm text-foreground/60">
        <p>
          © {currentYear} 小胖工具箱 • Made with 💚
        </p>
      </div>
    </footer>
  );
}
