// Show/hide buttons for each widget

import { memo } from "react";
import type { WidgetId } from "@/lib/types";

const IDS: WidgetId[] = ["traffic", "revenue", "latency", "events"];

interface Props {
  visible: Record<WidgetId, boolean>;
  onToggle: (id: WidgetId) => void;
}

function WidgetToggles({ visible, onToggle }: Props) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-sm text-gray-500 dark:text-gray-400">Widgets:</span>
      {IDS.map((id) => (
        <button
          key={id}
          onClick={() => onToggle(id)}
          aria-pressed={visible[id]}
          className={`rounded px-3 py-1 text-sm capitalize ${
            visible[id]
              ? "bg-blue-600 text-white"
              : "bg-gray-100 text-gray-500 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700"
          }`}
        >
          {id}
        </button>
      ))}
    </div>
  );
}

export default memo(WidgetToggles);
