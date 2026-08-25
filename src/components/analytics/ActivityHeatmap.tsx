import { useMemo } from "react";

import { cn } from "../../lib/cn";
import SectionCard from "../ui/SectionCard";
import {
  getCompletionCounts,
  shiftDayKey,
  todayKey,
  fromDayKey,
} from "../../lib/activity";
import type { Milestone, Task } from "../../types";

type Props = {
  tasks: Task[];
  milestones: Milestone[];
  /** Number of trailing weeks to render. */
  weeks?: number;
};

/**
 * Five intensity steps, ramping blue -> cyan so peak days read as hotter
 * rather than merely more opaque.
 */
function intensityClass(count: number): string {
  if (count === 0) return "bg-surface-track";
  if (count === 1) return "bg-brand-600/40";
  if (count === 2) return "bg-brand-500/65";
  if (count <= 4) return "bg-brand-400/85";
  return "bg-accent-cyan";
}

/** Peak days get a faint bloom so streaks are visible at a glance. */
function isPeak(count: number): boolean {
  return count >= 5;
}

const DAY_LABELS = ["S", "M", "T", "W", "T", "F", "S"];

/**
 * Contribution-style activity heatmap.
 *
 * Columns are weeks, rows are days of the week. Built entirely from real
 * `completedAt` timestamps — days with no recorded activity render as empty
 * track cells rather than invented values.
 */
export default function ActivityHeatmap({
  tasks,
  milestones,
  weeks = 18,
}: Props) {
  const { columns, total, activeDays, monthMarks } = useMemo(() => {
    const counts = getCompletionCounts(tasks, milestones);
    const today = todayKey();

    // Walk back to the Sunday that starts the earliest visible week.
    const todayDow = fromDayKey(today).getUTCDay();
    const lastColumnStart = shiftDayKey(today, -todayDow);
    const firstColumnStart = shiftDayKey(lastColumnStart, -(weeks - 1) * 7);

    const cols: { key: string; days: { key: string; count: number; future: boolean }[] }[] = [];
    const marks: { col: number; label: string }[] = [];
    let seenMonth = -1;
    let sum = 0;
    let active = 0;

    for (let w = 0; w < weeks; w++) {
      const colStart = shiftDayKey(firstColumnStart, w * 7);
      const days: { key: string; count: number; future: boolean }[] = [];

      for (let d = 0; d < 7; d++) {
        const key = shiftDayKey(colStart, d);
        const future = key > today;
        const count = future ? 0 : (counts.get(key) ?? 0);
        if (!future) {
          sum += count;
          if (count > 0) active++;
        }
        days.push({ key, count, future });
      }

      // Label a column when its month differs from the previous label.
      const month = fromDayKey(colStart).getUTCMonth();
      if (month !== seenMonth) {
        seenMonth = month;
        marks.push({
          col: w,
          label: fromDayKey(colStart).toLocaleDateString("en-US", {
            month: "short",
            timeZone: "UTC",
          }),
        });
      }

      cols.push({ key: colStart, days });
    }

    return { columns: cols, total: sum, activeDays: active, monthMarks: marks };
  }, [tasks, milestones, weeks]);

  const hasAny = total > 0;

  return (
    <SectionCard
      title="Activity"
      description={
        hasAny
          ? `${total} completions across ${activeDays} active ${activeDays === 1 ? "day" : "days"}`
          : "No recorded activity yet"
      }
    >
      {/* Horizontal scroll on narrow screens rather than shrinking cells */}
      <div className="-mx-1 overflow-x-auto px-1 pb-1">
        <div className="inline-flex min-w-full flex-col gap-1.5">
          {/* Month scale */}
          <div className="flex gap-[3px] pl-[18px]">
            {columns.map((col, i) => {
              const mark = monthMarks.find((m) => m.col === i);
              return (
                <div key={col.key} className="w-[11px] shrink-0">
                  {mark && (
                    <span className="meta-mono block whitespace-nowrap text-[9px] text-text-muted">
                      {mark.label}
                    </span>
                  )}
                </div>
              );
            })}
          </div>

          {/* Grid */}
          <div className="flex gap-[3px]">
            {/* Day-of-week scale */}
            <div className="mr-1 flex w-[14px] shrink-0 flex-col gap-[3px]">
              {DAY_LABELS.map((label, i) => (
                <div
                  key={i}
                  className="flex h-[11px] items-center justify-end"
                  aria-hidden="true"
                >
                  {i % 2 === 1 && (
                    <span className="meta-mono text-[8px] leading-none text-text-muted">
                      {label}
                    </span>
                  )}
                </div>
              ))}
            </div>

            {columns.map((col) => (
              <div key={col.key} className="flex shrink-0 flex-col gap-[3px]">
                {col.days.map((day) => (
                  <div
                    key={day.key}
                    title={
                      day.future
                        ? undefined
                        : `${day.count} ${day.count === 1 ? "completion" : "completions"} on ${day.key}`
                    }
                    className={cn(
                      "size-[11px] rounded-sm transition-transform duration-150 hover:scale-125",
                      day.future
                        ? "bg-transparent"
                        : intensityClass(day.count),
                      !day.future && isPeak(day.count) && "glow-cyan-sm",
                    )}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="mt-3 flex items-center justify-between gap-4">
        <p className="meta-mono text-[9px] text-text-muted">
          Last {weeks} weeks
        </p>
        <div className="flex items-center gap-1.5">
          <span className="meta-mono text-[9px] text-text-muted">Less</span>
          {[0, 1, 2, 3, 5].map((n) => (
            <span
              key={n}
              className={cn("size-[9px] rounded-sm", intensityClass(n))}
              aria-hidden="true"
            />
          ))}
          <span className="meta-mono text-[9px] text-text-muted">More</span>
        </div>
      </div>

      {!hasAny && (
        <p className="mt-3 text-center text-[11px] text-text-muted">
          Complete a task or milestone to start building your activity history.
        </p>
      )}
    </SectionCard>
  );
}
