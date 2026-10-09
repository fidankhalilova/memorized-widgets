// Range filter

import { memo } from "react";
import type { Range } from "@/lib/types";

const RANGES: Range[] = [100, 500, 1000];

interface Props {
  value: Range;
  onChange: (range: Range) => void;
}

function FilterBar({ value, onChange }: Props) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-gray-500 dark:text-gray-400">
        Latency range:
      </span>
      {RANGES.map((r) => (
        <button
          key={r}
          onClick={() => onChange(r)}
          className={`rounded px-3 py-1 text-sm ${
            r === value
              ? "bg-blue-600 text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
          }`}
        >
          {r} pts
        </button>
      ))}
    </div>
  );
}

export default memo(FilterBar);
