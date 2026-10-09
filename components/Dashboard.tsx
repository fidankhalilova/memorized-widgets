// Dashboard

"use client";

import { useCallback, useState } from "react";
import dynamic from "next/dynamic";
import FilterBar from "./FilterBar";
import WidgetToggles from "./WidgetToggles";
import WidgetSkeleton from "./WidgetSkeleton";
import { useLiveData } from "@/hooks/useLiveData";
import type { Range, WidgetId } from "@/lib/types";

const TrafficWidget = dynamic(() => import("./widgets/TrafficWidget"), {
  loading: WidgetSkeleton,
});
const RevenueWidget = dynamic(() => import("./widgets/RevenueWidget"), {
  loading: WidgetSkeleton,
});
const LatencyWidget = dynamic(() => import("./widgets/LatencyWidget"), {
  loading: WidgetSkeleton,
});
const EventsWidget = dynamic(() => import("./widgets/EventsWidget"), {
  loading: WidgetSkeleton,
});

const ALL_VISIBLE: Record<WidgetId, boolean> = {
  traffic: true,
  revenue: true,
  latency: true,
  events: true,
};

export default function Dashboard() {
  const data = useLiveData();
  const [range, setRange] = useState<Range>(500);
  const [visible, setVisible] = useState(ALL_VISIBLE);

  const handleRange = useCallback((r: Range) => setRange(r), []);
  const toggleWidget = useCallback(
    (id: WidgetId) => setVisible((v) => ({ ...v, [id]: !v[id] })),
    [],
  );

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <FilterBar value={range} onChange={handleRange} />
        <WidgetToggles visible={visible} onToggle={toggleWidget} />
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {visible.traffic && <TrafficWidget series={data.traffic} />}
        {visible.revenue && <RevenueWidget series={data.revenue} />}
        {visible.latency && (
          <LatencyWidget series={data.latency} range={range} />
        )}
        {visible.events && <EventsWidget events={data.events} />}
      </div>
    </div>
  );
}
