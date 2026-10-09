// pure stats helpers: aggregate, percentile, trend and downsampling

import type { Range, Series, Stats } from "./types";

function average(values: number[]): number {
  return values.length ? values.reduce((sum, v) => sum + v, 0) / values.length : 0;
}

// min / avg / max of the latest `range` points in one pass
export function aggregate(series: Series, range: Range): Stats {
  let min = Infinity;
  let max = -Infinity;
  let sum = 0;
  const from = Math.max(0, series.length - range);
  for (let i = from; i < series.length; i++) {
    const v = series[i];
    if (v < min) min = v;
    if (v > max) max = v;
    sum += v;
  }
  const count = series.length - from;
  return count ? { min, avg: sum / count, max } : { min: 0, avg: 0, max: 0 };
}

// p-th percentile of the latest `range` points
export function percentile(series: Series, range: Range, p: number): number {
  const sorted = series.slice(-range).sort((a, b) => a - b);
  return sorted.length ? sorted[Math.ceil((p / 100) * sorted.length) - 1] : 0;
}

// % change between the latest `size` points and the `size` before them
export function computeTrend(series: Series, size = 50): number {
  const recent = average(series.slice(-size));
  const previous = average(series.slice(-size * 2, -size));
  return previous === 0 ? 0 : ((recent - previous) / previous) * 100;
}

// buckets a series into `buckets` averaged values for the sparkline
export function downsample(series: Series, buckets = 60): number[] {
  const step = series.length / buckets;
  return Array.from({ length: buckets }, (_, b) => {
    const from = Math.floor(b * step);
    const to = Math.max(Math.floor((b + 1) * step), from + 1);
    return average(series.slice(from, to));
  });
}