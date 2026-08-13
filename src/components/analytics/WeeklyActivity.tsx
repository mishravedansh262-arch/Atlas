import { cn } from "../../lib/cn";
import SectionCard from "../ui/SectionCard";
import type { Milestone, Task } from "../../types";

type Props = {
  tasks: Task[];
  milestones: Milestone[];
};

function getLast7Days(): { label: string; dateStr: string }[] {
  const days: { label: string; dateStr: string }[] = [];
  const labels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    d.setDate(d.getDate() - i);
    days.push({ label: labels[d.getDay()]!, dateStr: d.toISOString().split("T")[0]! });
  }
  return days;
}

export default function WeeklyActivity({ tasks, milestones }: Props) {
  const days = getLast7Days();

  // Count completions per day
  const dayCounts = days.map((day) => {
    const taskCount = tasks.filter((t) => t.completedAt?.startsWith(day.dateStr)).length;
    const milestoneCount = milestones.filter((m) => m.completedAt?.startsWith(day.dateStr)).length;
    return { ...day, count: taskCount + milestoneCount, taskCount, milestoneCount };
  });

  const max = Math.max(...dayCounts.map((d) => d.count), 1);
  const totalWeek = dayCounts.reduce((sum, d) => sum + d.count, 0);

  return (
    <SectionCard title="Weekly Activity" description={`${totalWeek} items completed in the last 7 days`}>
      <div className="flex items-end justify-between gap-2 pt-2" style={{ height: 130 }}>
        {dayCounts.map((day) => {
          const height = max > 0 ? (day.count / max) * 100 : 0;
          const isToday = day.dateStr === new Date().toISOString().split("T")[0];
          return (
            <div key={day.dateStr} className="flex flex-1 flex-col items-center gap-1.5">
              <span className="meta-mono text-[10px] text-text-secondary">{day.count || ""}</span>
              <div className="flex w-full justify-center">
                <div
                  className={cn(
                    "w-7 rounded-t transition-all duration-300",
                    day.count > 0 ? "bg-brand-500 hover:bg-brand-400" : "bg-surface-track",
                    isToday && "ring-1 ring-brand-500/50",
                  )}
                  style={{ height: `${Math.max(height, 6)}%` }}
                  title={`${day.count} completed on ${day.dateStr}`}
                />
              </div>
              <span className={cn("meta-mono text-[10px]", isToday ? "text-brand-400" : "text-text-muted")}>{day.label}</span>
            </div>
          );
        })}
      </div>
      {totalWeek === 0 && (
        <p className="mt-3 text-center text-[11px] text-text-muted">
          No completions this week. Complete a task or milestone to see activity here.
        </p>
      )}
    </SectionCard>
  );
}
