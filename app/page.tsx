// Home page

import Dashboard from "@/components/Dashboard";
import ThemeToggle from "@/components/ThemeToggle";

export default function Home() {
  return (
    <main className="mx-auto w-full max-w-4xl p-6">
      <header className="mb-4 flex items-center justify-between">
        <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">
          Live Dashboard
        </h1>
        <ThemeToggle />
      </header>
      <Dashboard />
    </main>
  );
}
