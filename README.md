# Profiling: Memoized Dashboard Widgets

Next.js (TS) + Tailwind. React.memo, useMemo and useCallback only; no state or chart libraries.

## How to reproduce
1. Build with profiling on: `npx next build --webpack`, then `npm start`.
   (`reactProductionProfiling: true` and `minimize = false` in next.config.ts keep the
   Profiler enabled and component names readable.)
2. Open React DevTools -> Profiler. In its settings, enable "Record why each component rendered".
3. Reload the page, click Start profiling.
4. Idle for 10 seconds without touching anything.
5. Click the latency filter 5 times, about 1s apart: 100 -> 1000 -> 500 -> 100 -> 1000.
6. Click Stop profiling, then export the JSON.
Both recordings used this exact script, in the same build mode.

## Baseline problems (before)
- Every tick re-rendered Dashboard, and with no memo all four widgets followed it.
- `FilterBar` received a new `onChange` arrow function on every render
  (flagged as a changed prop in all 50 commits).
- `downsample`, `computeTrend`, `aggregate` and the sorting `percentile`
  ran on every render, even when their data had not changed.

## Fixes (after)
- `React.memo` on the 4 widgets and on `FilterBar`.
- `useCallback` for the range handler (memo on FilterBar is useless without it).
- `useMemo` for `downsample`, `computeTrend`, `aggregate` and `percentile`.
- Each timer replaces only its own slice, so the other slices keep their reference.
- Stable keys (item ids), no object or function literals passed to memoized children.
- Not memoized on purpose: `WidgetCard` (receives `children`, a new element every render)
  and `Sparkline` (only renders when its parent already changed).

## Results (10s idle + 5 filter changes)
| Metric | Before | After | Change |
|---|---|---|---|
| Traffic renders | 50 | 22 | -56% |
| Revenue renders | 50 | 15 | -70% |
| Latency renders | 50 | 16 | -68% |
| Events renders | 50 | 12 | -76% |
| FilterBar renders | 50 | 5 | -90% |
| Total renders (5 components) | 250 | 70 | -72% |
| Wasted renders | 177 | 0 | -100% |
| Avg commit duration | 1.19 ms | 0.83 ms | -31% |
| Median commit duration | 1.20 ms | 0.75 ms | -38% |
| Total render time | 59.5 ms | 38.0 ms | -36% |
| Slowest commit | 1.9 ms | 2.5 ms | see notes |

After the fix, every component renders exactly as many times as its props changed.

## Notes and trade-offs
- Total commits (50 vs 46) is not a result: state still lives in Dashboard, so commits
  are unchanged by design. The second recording was just ~0.6s shorter.
- The slowest commit rose because one commit contained three timers firing together
  (Traffic + Latency + Events, all needed). At millisecond scale this is timer
  coincidence, so average and median are the fairer numbers.
- Absolute savings are small (~21 ms over 10 s) because each render was already cheap.
  The render-count reduction is the real gain, and it grows as widgets get heavier.
- `useMemo` is mostly insurance here: once a widget is memoized it only renders when its
  data changed, and then the value must be recomputed anyway.
- No custom `memo` comparators: a deep compare on 1,000-point arrays would cost more than
  the render it avoids.

## Bonus features
- Dark mode: toggles a class on `<html>`; no state, no context, no widget re-renders.
- Show/hide widgets: hidden widgets unmount (badge restarts at 1 when shown again).
- Lazy loading: each widget is a separate chunk via `next/dynamic`.