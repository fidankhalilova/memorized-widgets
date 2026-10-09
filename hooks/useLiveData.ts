// owns all live data, with one timer per widget updating only its own slice

import { useEffect, useState } from "react";
import type { EventItem, Series, SeriesId } from "../lib/types";
import {
  EVENTS_SIZE,
  SERIES_SIZE,
  nextEvents,
  nextSeries,
  seedEvents,
  seedSeries,
} from "@/lib/dataGen";

export interface LiveData {
  traffic: Series;
  revenue: Series;
  latency: Series;
  events: EventItem[];
}

const SERIES_INTERVALS: Record<SeriesId, number> = {
  traffic: 500,
  revenue: 700,
  latency: 1000,
};
const EVENTS_INTERVAL = 900;

export function useLiveData(): LiveData {
  const [data, setData] = useState<LiveData>(() => ({
    traffic: seedSeries("traffic"),
    revenue: seedSeries("revenue"),
    latency: seedSeries("latency"),
    events: seedEvents(),
  }));

  useEffect(() => {
    const ids = Object.keys(SERIES_INTERVALS) as SeriesId[];

    const timers = ids.map((id) => {
      let index = SERIES_SIZE;
      return setInterval(() => {
        const i = index++;
        setData((prev) => ({ ...prev, [id]: nextSeries(id, prev[id], i) }));
      }, SERIES_INTERVALS[id]);
    });

    let eventIndex = EVENTS_SIZE;
    timers.push(
      setInterval(() => {
        const i = eventIndex++;
        setData((prev) => ({ ...prev, events: nextEvents(prev.events, i) }));
      }, EVENTS_INTERVAL)
    );

    return () => timers.forEach(clearInterval);
  }, []);

  return data;
}