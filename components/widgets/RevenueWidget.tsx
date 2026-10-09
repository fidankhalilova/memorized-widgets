// Revenue widget

import { memo, useMemo } from "react";
import WidgetCard from "../WidgetCard";
import { useRenderCount } from "@/hooks/useRenderCount";
import { computeTrend } from "@/lib/stats";
import type { Series } from "@/lib/types";

interface Props {
  series: Series;
}

function RevenueWidget({ series }: Props) {
  const renders = useRenderCount("Revenue");
  const trend = useMemo(() => computeTrend(series), [series]);
  const up = trend >= 0;

  return (
    <WidgetCard title="Revenue ($/h)" renders={renders}>
      <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">
        ${series[series.length - 1].toLocaleString()}
      </p>
      <p
        className={`mt-2 text-sm font-medium ${up ? "text-green-600" : "text-red-600"}`}
      >
        {up ? "▲" : "▼"} {Math.abs(trend).toFixed(1)}% vs previous 50
      </p>
    </WidgetCard>
  );
}

export default memo(RevenueWidget);
