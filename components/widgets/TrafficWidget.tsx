// Traffic widget

import { memo, useMemo } from "react";
import WidgetCard from "../WidgetCard";
import Sparkline from "../Sparkline";
import { useRenderCount } from "@/hooks/useRenderCount";
import { downsample } from "@/lib/stats";
import type { Series } from "@/lib/types";

interface Props {
  series: Series;
}

function TrafficWidget({ series }: Props) {
  const renders = useRenderCount("Traffic");
  const bars = useMemo(() => downsample(series), [series]);

  return (
    <WidgetCard title="Traffic (req/s)" renders={renders}>
      <p className="mb-3 text-3xl font-bold text-gray-900 dark:text-gray-100">
        {series[series.length - 1]}
      </p>
      <Sparkline values={bars} />
    </WidgetCard>
  );
}

export default memo(TrafficWidget);
