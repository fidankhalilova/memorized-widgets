// Latency widget

import { memo, useMemo } from "react";
import WidgetCard from "../WidgetCard";
import { useRenderCount } from "@/hooks/useRenderCount";
import { aggregate, percentile } from "@/lib/stats";
import type { Range, Series } from "@/lib/types";

interface Props {
  series: Series;
  range: Range;
}

function LatencyWidget({ series, range }: Props) {
  const renders = useRenderCount("Latency");
  const { min, avg, max } = useMemo(
    () => aggregate(series, range),
    [series, range],
  );
  const p95 = useMemo(() => percentile(series, range, 95), [series, range]);

  const cells = [
    ["Min", min],
    ["Avg", Math.round(avg)],
    ["Max", max],
    ["p95", p95],
  ] as const;

  return (
    <WidgetCard title={`Latency (ms, last ${range})`} renders={renders}>
      <dl className="grid grid-cols-4 gap-2 text-center">
        {cells.map(([label, value]) => (
          <div key={label}>
            <dt className="text-xs text-gray-500">{label}</dt>
            <dd className="text-xl font-semibold text-gray-900 dark:text-gray-100">
              {value}
            </dd>
          </div>
        ))}
      </dl>
    </WidgetCard>
  );
}

export default memo(LatencyWidget);
