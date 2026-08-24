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
};

const DAY_LABELS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function WeeklyActivity({ tasks, milestones }: Props) {
  const counts = getCompletionCounts(tasks, milestones);
  const today = todayKey();

  const days = Array.from({ length: 7 }, (_, i) => {
    const key = shiftDayKey(today, -(6 - i));
    return {
      key,
      label: DAY_LABELS[fromDayKey(key).getUTCDay()]!,
      count: counts.get(key) ?? 0,
      isToday: key === today,
    };
  });

  const max = Math.max(...days.map((d) => d.count), 1);
  const total = days.reduce((sum, d) => sum + d.count, 0);

  return (
    <SectionCard
      title="This Week"
      description={`${total} completed in the last 7 days`}
    >
      <div className="flex items-end justify-between gap-2 pt-1" style={{ height: 128 }}>
        {days.map((day) => (
          <div key={day.key} className="flex flex-1 flex-col items-center gap-1.5">
            <span className="meta-mono text-[10px] text-text-secondary">
              {day.count || ""}
            </span>
            <div className="flex w-full flex-1 items-end justify-center">
              <div
                className={cn(
                  "w-7 rounded-t transition-all duration-500",
                  day.count > 0
                    ? "bg-brand-500 hover:bg-brand-400"
                    : "bg-surface-track",
                  day.isToday && "ring-1 ring-brand-500/50",
                )}
                style={{ height: `${Math.max((day.count / max) * 100, 4)}%` }}
                title={`${day.count} completed on ${day.key}`}
              />
            </div>
            <span
              className={cn(
                "meta-mono text-[10px]",
                day.isToday ? "text-brand-400" : "text-text-muted",
              )}
            >
              {day.label}
            </span>
          </div>
        ))}
      </div>

      {total === 0 && (
        <p className="mt-3 text-center text-[11px] text-text-muted">
          No completions this week yet.
        </p>
      )}
    </SectionCard>
  );
}
