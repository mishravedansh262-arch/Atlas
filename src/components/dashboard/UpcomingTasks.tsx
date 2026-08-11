import { Link } from "react-router-dom";
import { CheckCircle2, Circle, Clock } from "lucide-react";

import { cn } from "../../lib/cn";
import PriorityIndicator from "../ui/PriorityIndicator";
import { mockTasks } from "../../data/tasks";
import type { TaskStatus } from "../../types";

const statusIcon: Record<TaskStatus, typeof Circle> = {
  todo: Circle,
  "in-progress": Clock,
  completed: CheckCircle2,
};

const statusColor: Record<TaskStatus, string> = {
  todo: "text-text-muted",
  "in-progress": "text-brand-400",
  completed: "text-success",
};

export default function UpcomingTasks() {
  const tasks = mockTasks.filter((t) => t.status !== "completed").slice(0, 5);

  return (
    <div className="rounded-xl border border-border-secondary bg-surface-secondary p-5">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-sm font-semibold text-text-primary">Upcoming Tasks</h2>
        <Link
          to="/tasks"
          className="text-[11px] font-medium text-text-tertiary transition-colors hover:text-text-secondary"
        >
          View all →
        </Link>
      </div>

      <div className="space-y-1">
        {tasks.map((task) => {
          const Icon = statusIcon[task.status];
          return (
            <div
              key={task.id}
              className="flex items-center gap-3 rounded-lg px-2 py-2 transition-colors hover:bg-surface-tertiary"
            >
              <Icon size={14} className={cn("shrink-0", statusColor[task.status])} />
              <span className="min-w-0 flex-1 truncate text-xs text-text-primary">
                {task.title}
              </span>
              <PriorityIndicator priority={task.priority} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
