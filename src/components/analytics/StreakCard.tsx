import { Flame } from "lucide-react";

import ProgressRing from "../ui/ProgressRing";
import {
  calculateStreaks,
  getCompletionCounts,
  countInWindow,
  activeDaysInWindow,
} from "../../lib/activity";
import type { Milestone, Task } from "../../types";

type Props = {
  tasks: Task[];
  milestones: Milestone[];
};

/**
 * Activity streak.
 * Consistency is expressed as active days out of the trailing 30, shown as a
 * ring so it reads at a glance next to the raw streak figures.
 */
export default function StreakCard({ tasks, milestones }: Props) {
  const counts = getCompletionCounts(tasks, milestones);
  const { current, longest } = calculateStreaks(counts);
  const hasActivity = counts.size > 0;

  // Consistency = days active out of the trailing 30, not raw volume.
  const consistency = Math.round((activeDaysInWindow(counts, 30) / 30) * 100);
  const last30 = countInWindow(counts, 30);

  return (
    <div className="rounded-xl border border-border-primary bg-surface-secondary p-4">
      <div className="flex items-center gap-2">
        <Flame size={15} strokeWidth={1.5} className="text-warning" />
        <h3 className="label-mono text-text-secondary">Streak</h3>
      </div>

      {hasActivity ? (
        <div className="mt-4 flex items-center gap-4">
          <ProgressRing
            value={consistency}
            size={68}
            tone="warning"
            caption="30d"
          />
          <div className="min-w-0 space-y-2.5">
            <div>
              <p className="text-xl font-bold leading-none tracking-tight text-text-primary">
                {current}
                <span className="meta-mono ml-1 text-[10px] font-medium text-text-muted">
                  day{current === 1 ? "" : "s"}
                </span>
              </p>
              <p className="meta-mono mt-1 text-[9px] text-text-muted">
                Current streak
              </p>
            </div>
            <div>
              <p className="text-sm font-semibold leading-none text-text-secondary">
                {longest}
                <span className="meta-mono ml-1 text-[10px] font-medium text-text-muted">
                  best
                </span>
              </p>
              <p className="meta-mono mt-1 text-[9px] text-text-muted">
                {last30} done in 30d
              </p>
            </div>
          </div>
        </div>
      ) : (
        <p className="mt-4 text-xs leading-relaxed text-text-muted">
          Complete a task or milestone to start building your streak.
        </p>
      )}
    </div>
  );
}
