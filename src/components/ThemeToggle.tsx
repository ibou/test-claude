"use client";

import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState<boolean | null>(null);

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains("dark"));
  }, []);

  function toggle() {
    const next = !document.documentElement.classList.contains("dark");
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch (_) {}
    setIsDark(next);
  }

  if (isDark === null) {
    return (
      <button
        aria-label="Basculer le thème"
        className="w-9 h-9 rounded-lg flex items-center justify-center text-gray-400 dark:text-gray-500"
      />
    );
  }

  return (
    <button
      onClick={toggle}
      aria-label={isDark ? "Activer le thème clair" : "Activer le thème sombre"}
      className="w-9 h-9 rounded-lg flex items-center justify-center text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
    >
      <span aria-hidden="true" className="text-base">
        {isDark ? "☀" : "☾"}
      </span>
    </button>
  );
}
