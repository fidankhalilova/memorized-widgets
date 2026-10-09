// mock data: seeds 1000-point series and generates the next event

import type { EventItem, Series, SeriesId } from "./types";

export const SERIES_SIZE = 1000;
export const EVENTS_SIZE = 20;

interface Profile {
  base: number;
  amp: number; 
  period: number; 
  jitter: number; 
  seed: number;
}

const PROFILES: Record<SeriesId, Profile> = {
  traffic: { base: 500, amp: 200, period: 60, jitter: 80, seed: 1 },
  revenue: { base: 1200, amp: 300, period: 120, jitter: 50, seed: 2 },
  latency: { base: 120, amp: 30, period: 40, jitter: 40, seed: 3 },
};

// hash-based noise in [0, 1): same input, same output
function noise(n: number): number {
  const x = Math.sin(n * 12.9898) * 43758.5453;
  return x - Math.floor(x);
}

// value of a series at a given point index
export function valueAt(id: SeriesId, index: number): number {
  const { base, amp, period, jitter, seed } = PROFILES[id];
  const wave = amp * Math.sin((2 * Math.PI * index) / period);
  const rand = (noise(index + seed * 1000) - 0.5) * 2 * jitter;
  return Math.max(0, Math.round(base + wave + rand));
}

export function seedSeries(id: SeriesId): Series {
  return Array.from({ length: SERIES_SIZE }, (_, i) => valueAt(id, i));
}

// new array with the oldest point dropped and the next one appended
export function nextSeries(id: SeriesId, series: Series, index: number): Series {
  return series.slice(1).concat(valueAt(id, index));
}

const LEVELS: EventItem["level"][] = ["info", "info", "warn", "error"];
const MESSAGES = ["User signed in", "Payment processed", "Cache miss", "Request timed out"];

export function makeEvent(index: number): EventItem {
  return {
    id: `event-${index}`,
    message: MESSAGES[index % MESSAGES.length],
    level: LEVELS[Math.floor(noise(index) * LEVELS.length)],
  };
}

// initial list, newest first
export function seedEvents(): EventItem[] {
  return Array.from({ length: EVENTS_SIZE }, (_, i) =>
    makeEvent(EVENTS_SIZE - 1 - i)
  );
}

// prepends the newest event and drops the oldest
export function nextEvents(events: EventItem[], index: number): EventItem[] {
  return [makeEvent(index), ...events.slice(0, EVENTS_SIZE - 1)];
}