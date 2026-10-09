// Dark mode toggle

"use client";

export default function ThemeToggle() {
  const toggle = () => {
    const isDark = document.documentElement.classList.toggle("dark");
    try {
      localStorage.setItem("theme", isDark ? "dark" : "light");
    } catch {}
  };

  return (
    <button
      onClick={toggle}
      className="rounded bg-gray-100 px-3 py-1 text-sm text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700">
      <span className="dark:hidden">🌙 Dark mode</span>
      <span className="hidden dark:inline">☀️ Light mode</span>
    </button>
  );
}
