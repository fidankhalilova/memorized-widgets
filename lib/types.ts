// types for widgets, series data, events and the range filter

export type WidgetId = "traffic" | "revenue" | "latency" | "events";
export type SeriesId = Exclude<WidgetId, "events">; // widgets backed by a number series

export type Series = number[];
export type Range = 100 | 500 | 1000; // how many latest points a filter looks at

export interface EventItem {
  id: string;
  message: string;
  level: "info" | "warn" | "error";
}

export interface Stats {
  min: number;
  avg: number;
  max: number;
}