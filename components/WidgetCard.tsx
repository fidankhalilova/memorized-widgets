// Card shell

import type { ReactNode } from "react";

interface Props {
  title: string;
  renders: number;
  children: ReactNode;
}

export default function WidgetCard({ title, renders, children }: Props) {
  return (
    <section className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-900">
      <header className="mb-3 flex items-center justify-between">
        <h2 className="text-sm font-semibold text-gray-700 dark:text-gray-200">
          {title}
        </h2>
        <span
          suppressHydrationWarning
          className="rounded bg-gray-100 px-2 py-0.5 font-mono text-xs text-gray-500 dark:bg-gray-800 dark:text-gray-400"
        >
          renders: {renders}
        </span>
      </header>
      {children}
    </section>
  );
}
