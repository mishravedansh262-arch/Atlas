import { useMemo } from "react";

import { cn } from "../../lib/cn";
import SectionCard from "../ui/SectionCard";
import ProgressRing from "../ui/ProgressRing";
import WidgetError from "../ui/WidgetError";
import Skeleton from "../ui/Skeleton";
import { useTasks } from "../../hooks/useTasks";
import { useMilestones } from "../../hooks/useMilestones";
import {
  activeDaysInWindow,
  calculateStreaks,
  getCompletionCounts,
  shiftDayKey,
  todayKey,
  fromDayKey,
} from "../../lib/activity";
import { intensityClass, isPeak, LEGEND_STEPS } from "../../lib/activityScale";

/** Trailing weeks shown. Matches the Analytics heatmap so both agree. */
const WEEKS = 18;

/** Window used for the consistency ring. */
const CONSISTENCY_DAYS = 30;

/**
 * Momentum — the Command Center's answer to "am I keeping this up?".
 *
 * The dashboard previously carried no sense of *time*: StatsGrid gives counts
 * and ProgressOverview gives ratios, but nothing showed consistency, so a user
 * on a four-week streak and one who did everything in a single burst looked
 * identical. Activity history was only reachable from /analytics.
 *
 * This is a summary, not a replica of that screen. The month and day-of-week
 * scales, per-day tooltips at full size and volume figures stay on Analytics;
 * here the grid is compressed to a strip that fills the column, paired with
 * the consistency ratio and the current streak.
 *
 * Cells flex rather than sitting at a fixed 11px, so the strip fills the
 * context column at any breakpoint instead of leaving a ragged right edge.
 * The ring uses the accent tone deliberately: it shares the blue -> cyan ramp
 * with the grid, so the two read as one measurement rather than two widgets.
 */
export default function MomentumCard() {
  const {
    data: tasks,
    isPending: tasksPending,
    isError: tasksError,
    refetch: refetchTasks,
  } = useTasks();
  const {
    data: milestones,
    isPending: milestonesPending,
    isError: milestonesError,
    refetch: refetchMilestones,
  } = useMilestones();

  const isPending = tasksPending || milestonesPending;
  const isError = tasksError || milestonesError;

  const { columns, current, longest, consistency, activeDays, hasAny } =
    useMemo(() => {
      const counts = getCompletionCounts(tasks ?? [], milestones ?? []);
      const today = todayKey();

      // Walk back to the Sunday opening the earliest visible week, so columns
      // are aligned weeks rather than arbitrary 7-day slices.
      const lastColumnStart = shiftDayKey(today, -fromDayKey(today).getUTCDay());
      const firstColumnStart = shiftDayKey(lastColumnStart, -(WEEKS - 1) * 7);

      const cols: {
        key: string;
        days: { key: string; count: number; future: boolean }[];
      }[] = [];

      for (let w = 0; w < WEEKS; w++) {
        const colStart = shiftDayKey(firstColumnStart, w * 7);
        const days = [];
        for (let d = 0; d < 7; d++) {
          const key = shiftDayKey(colStart, d);
          const future = key > today;
          days.push({
            key,
            count: future ? 0 : (counts.get(key) ?? 0),
            future,
          });
        }
        cols.push({ key: colStart, days });
      }

      const streaks = calculateStreaks(counts);
      const active = activeDaysInWindow(counts, CONSISTENCY_DAYS);

      return {
        columns: cols,
        current: streaks.current,
        longest: streaks.longest,
        // Consistency is active days, not volume: ten tasks in one sitting is
        // not the same behaviour as one a day for ten days.
        consistency: Math.round((active / CONSISTENCY_DAYS) * 100),
        activeDays: active,
        hasAny: counts.size > 0,
      };
    }, [tasks, milestones]);

  return (
    <SectionCard
      title="Momentum"
      description={
        isPending || isError
          ? undefined
          : hasAny
            ? `${activeDays} active ${activeDays === 1 ? "day" : "days"} in the last ${CONSISTENCY_DAYS}`
            : "No recorded activity yet"
      }
    >
      {isPending ? (
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <Skeleton className="size-[68px] rounded-full" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-5 w-24" />
              <Skeleton className="h-3 w-16" />
            </div>
          </div>
          <Skeleton className="h-[92px] w-full rounded-lg" />
        </div>
      ) : isError ? (
        <WidgetError
          message="Couldn't load activity."
          onRetry={() => {
            void refetchTasks();
            void refetchMilestones();
          }}
        />
      ) : !hasAny ? (
        // An all-empty grid plus a 0% ring would read as a broken widget
        // rather than a new account, so say it in words instead.
        <p className="py-3 text-center text-xs leading-relaxed text-text-muted">
          Complete a task or milestone to start building your activity history.
        </p>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <ProgressRing
              value={consistency}
              size={68}
              tone="accent"
              caption={`${CONSISTENCY_DAYS}d`}
            />
            <div className="min-w-0 space-y-2.5">
              <div>
                <p className="text-xl font-bold leading-none tracking-tight text-text-primary">
                  {current}
                  <span className="meta-mono ml-1 font-medium text-text-muted">
                    day{current === 1 ? "" : "s"}
                  </span>
                </p>
                <p className="meta-mono mt-1 text-nano text-text-tertiary">
                  Current streak
                </p>
              </div>
              <div>
                <p className="text-sm font-semibold leading-none text-text-secondary">
                  {longest}
                  <span className="meta-mono ml-1 font-medium text-text-muted">
                    best
                  </span>
                </p>
                <p className="meta-mono mt-1 text-nano text-text-tertiary">
                  Longest streak
                </p>
              </div>
            </div>
          </div>

          {/* Compact strip. Summarised for assistive tech as a single image:
              126 individually-labelled cells would be noise, and the full
              per-day breakdown is available on Analytics. */}
          <div
            className="flex gap-[3px]"
            role="img"
            aria-label={`Activity over the last ${WEEKS} weeks: ${activeDays} active days in the last ${CONSISTENCY_DAYS}.`}
          >
            {columns.map((col) => (
              <div key={col.key} className="flex flex-1 flex-col gap-[3px]">
                {col.days.map((day) => (
                  <div
                    key={day.key}
                    title={
                      day.future
                        ? undefined
                        : `${day.count} ${day.count === 1 ? "completion" : "completions"} on ${day.key}`
                    }
                    aria-hidden="true"
                    className={cn(
                      "aspect-square rounded-sm",
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

          <div className="flex items-center justify-between gap-4">
            <p className="meta-mono text-nano text-text-tertiary">
              Last {WEEKS} weeks
            </p>
            <div className="flex items-center gap-1.5" aria-hidden="true">
              <span className="meta-mono text-nano text-text-tertiary">
                Less
              </span>
              {LEGEND_STEPS.map((n) => (
                <span
                  key={n}
                  className={cn("size-[9px] rounded-sm", intensityClass(n))}
                />
              ))}
              <span className="meta-mono text-nano text-text-tertiary">
                More
              </span>
            </div>
          </div>
        </div>
      )}
    </SectionCard>
  );
}
