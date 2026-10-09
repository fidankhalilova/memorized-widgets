// Events widget

import { memo } from "react";
import WidgetCard from "../WidgetCard";
import { useRenderCount } from "@/hooks/useRenderCount";
import type { EventItem } from "@/lib/types";

const LEVEL_STYLES: Record<EventItem["level"], string> = {
  info: "bg-blue-100 text-blue-700",
  warn: "bg-yellow-100 text-yellow-700",
  error: "bg-red-100 text-red-700",
};

interface Props {
  events: EventItem[];
}

function EventsWidget({ events }: Props) {
  const renders = useRenderCount("Events");

  return (
    <WidgetCard title="Recent events" renders={renders}>
      <ul className="max-h-40 space-y-1 overflow-hidden">
        {events.map((e) => (
          <li
            key={e.id}
            className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300"
          >
            <span
              className={`rounded px-1.5 py-0.5 text-xs ${LEVEL_STYLES[e.level]}`}
            >
              {e.level}
            </span>
            {e.message}
          </li>
        ))}
      </ul>
    </WidgetCard>
  );
}

export default memo(EventsWidget);
