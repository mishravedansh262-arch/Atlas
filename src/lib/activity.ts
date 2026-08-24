import type { Milestone, Task } from "../types";

/**
 * Shared completion-activity derivation.
 *
 * `completedAt` is stored as an ISO-8601 UTC string, so all day bucketing
 * here is done in UTC. Keeping this in one module means the streak card,
 * the weekly chart and the heatmap can never disagree about what counts
 * as an "active day".
 */

/** Formats a Date to a UTC day key (YYYY-MM-DD). */
export function toDayKey(date: Date): string {
  return date.toISOString().slice(0, 10);
}

/** Parses a UTC day key back into a Date at UTC midnight. */
export function fromDayKey(key: string): Date {
  return new Date(`${key}T00:00:00.000Z`);
}

/** Shifts a day key by a whole number of days. */
export function shiftDayKey(key: string, days: number): string {
  const d = fromDayKey(key);
  d.setUTCDate(d.getUTCDate() + days);
  return toDayKey(d);
}

/** Today's UTC day key. */
export function todayKey(): string {
  return toDayKey(new Date());
}

export type CompletionCounts = Map<string, number>;

/**
 * Buckets every completed task and milestone into a day -> count map.
 * A day is "active" when it has at least one completion.
 */
export function getCompletionCounts(
  tasks: Task[],
  milestones: Milestone[],
): CompletionCounts {
  const counts: CompletionCounts = new Map();

  const add = (iso?: string) => {
    if (!iso) return;
    const key = iso.slice(0, 10);
    counts.set(key, (counts.get(key) ?? 0) + 1);
  };

  tasks.forEach((t) => {
    if (t.status === "completed") add(t.completedAt);
  });
  milestones.forEach((m) => {
    if (m.status === "completed") add(m.completedAt);
  });

  return counts;
}

/**
 * Current and longest consecutive-day streaks.
 *
 * The current streak is allowed to start at yesterday as well as today, so
 * that it doesn't read as "broken" simply because the user hasn't completed
 * anything yet this morning.
 */
export function calculateStreaks(counts: CompletionCounts): {
  current: number;
  longest: number;
} {
  if (counts.size === 0) return { current: 0, longest: 0 };

  const today = todayKey();
  const yesterday = shiftDayKey(today, -1);

  let current = 0;
  let cursor: string | null = null;

  if (counts.has(today)) cursor = today;
  else if (counts.has(yesterday)) cursor = yesterday;

  while (cursor && counts.has(cursor)) {
    current++;
    cursor = shiftDayKey(cursor, -1);
  }

  const ordered = [...counts.keys()].sort();
  let longest = 1;
  let run = 1;

  for (let i = 1; i < ordered.length; i++) {
    if (shiftDayKey(ordered[i - 1]!, 1) === ordered[i]!) {
      run++;
    } else {
      longest = Math.max(longest, run);
      run = 1;
    }
  }
  longest = Math.max(longest, run);

  return { current, longest };
}

/** Total completions inside the trailing `days` window (inclusive of today). */
export function countInWindow(counts: CompletionCounts, days: number): number {
  let total = 0;
  let key = todayKey();
  for (let i = 0; i < days; i++) {
    total += counts.get(key) ?? 0;
    key = shiftDayKey(key, -1);
  }
  return total;
}

/**
 * Number of days with at least one completion inside the trailing window.
 * Distinct from `countInWindow`, which sums volume rather than days.
 */
export function activeDaysInWindow(
  counts: CompletionCounts,
  days: number,
): number {
  let active = 0;
  let key = todayKey();
  for (let i = 0; i < days; i++) {
    if ((counts.get(key) ?? 0) > 0) active++;
    key = shiftDayKey(key, -1);
  }
  return active;
}
