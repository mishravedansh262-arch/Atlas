import { Flame } from "lucide-react";

import type { Milestone, Task } from "../../types";

type Props = {
  tasks: Task[];
  milestones: Milestone[];
};

/**
 * Calculates current and longest streak from completion dates.
 * A day is "active" if at least one task or milestone was completed.
 */
function calculateStreaks(tasks: Task[], milestones: Milestone[]): { current: number; longest: number } {
  // Collect all completion dates as date strings (YYYY-MM-DD)
  const dates = new Set<string>();
  tasks.forEach((t) => { if (t.completedAt) dates.add(t.completedAt.split("T")[0]!); });
  milestones.forEach((m) => { if (m.completedAt) dates.add(m.completedAt.split("T")[0]!); });

  if (dates.size === 0) return { current: 0, longest: 0 };

  // Calculate current streak (from today backwards)
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const checkDate = new Date(today);

  const todayStr = checkDate.toISOString().split("T")[0]!;
  const yesterdayDate = new Date(checkDate);
  yesterdayDate.setDate(yesterdayDate.getDate() - 1);
  const yesterdayStr = yesterdayDate.toISOString().split("T")[0]!;

  let current = 0;

  if (dates.has(todayStr)) {
    current = 1;
    checkDate.setDate(checkDate.getDate() - 1);
    while (dates.has(checkDate.toISOString().split("T")[0]!)) {
      current++;
      checkDate.setDate(checkDate.getDate() - 1);
    }
  } else if (dates.has(yesterdayStr)) {
    current = 1;
    checkDate.setDate(checkDate.getDate() - 2); // skip to day before yesterday
    while (dates.has(checkDate.toISOString().split("T")[0]!)) {
      current++;
      checkDate.setDate(checkDate.getDate() - 1);
    }
  }

  // Calculate longest streak
  let longest = 0;
  let streak = 1;
  const ascending = [...dates].sort();
  for (let i = 1; i < ascending.length; i++) {
    const prev = new Date(ascending[i - 1]!);
    const curr = new Date(ascending[i]!);
    const diffDays = (curr.getTime() - prev.getTime()) / (1000 * 60 * 60 * 24);
    if (diffDays === 1) {
      streak++;
    } else {
      longest = Math.max(longest, streak);
      streak = 1;
    }
  }
  longest = Math.max(longest, streak);

  return { current, longest };
}

export default function StreakCard({ tasks, milestones }: Props) {
  const { current, longest } = calculateStreaks(tasks, milestones);

  const hasActivity = tasks.some((t) => t.completedAt) || milestones.some((m) => m.completedAt);

  return (
    <div className="rounded-xl border border-border-secondary bg-surface-secondary p-5">
      <div className="flex items-center gap-2">
        <div className="rounded-lg bg-warning/10 p-2 text-warning">
          <Flame size={18} />
        </div>
        <h3 className="text-sm font-semibold text-text-primary">Activity Streak</h3>
      </div>

      {hasActivity ? (
        <div className="mt-4 grid grid-cols-2 gap-4">
          <div>
            <p className="text-2xl font-bold text-text-primary">{current}</p>
            <p className="text-[11px] text-text-muted">Current streak (days)</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-text-primary">{longest}</p>
            <p className="text-[11px] text-text-muted">Longest streak (days)</p>
          </div>
        </div>
      ) : (
        <p className="mt-4 text-xs text-text-muted">
          Complete a task or milestone to start building your streak.
        </p>
      )}

      {current > 0 && (
        <p className="mt-3 text-[11px] text-success">
          You&apos;re on a {current}-day streak. Keep it going!
        </p>
      )}
    </div>
  );
}
