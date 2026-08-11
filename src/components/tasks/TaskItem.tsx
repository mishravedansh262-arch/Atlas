import { CheckCircle2, Circle, Clock, Calendar } from "lucide-react";

import { cn } from "../../lib/cn";
import PriorityIndicator from "../ui/PriorityIndicator";
import type { Task, TaskStatus } from "../../types";

type Props = {
  task: Task;
  onToggle?: (id: string) => void;
};

const statusIcon: Record<TaskStatus, typeof Circle> = {
  todo: Circle,
  "in-progress": Clock,
  completed: CheckCircle2,
};

const statusColor: Record<TaskStatus, string> = {
  todo: "text-text-muted hover:text-brand-400",
  "in-progress": "text-brand-400",
  completed: "text-success",
};

const categoryLabel: Record<string, string> = {
  learning: "Learning",
  project: "Project",
  career: "Career",
  personal: "Personal",
};

export default function TaskItem({ task, onToggle }: Props) {
  const Icon = statusIcon[task.status];

  return (
    <div
      className={cn(
        "group flex items-start gap-3 rounded-lg px-3 py-3 transition-colors hover:bg-surface-tertiary",
        task.status === "completed" && "opacity-60",
      )}
    >
      <button
        onClick={() => onToggle?.(task.id)}
        className={cn("mt-0.5 shrink-0 transition-colors", statusColor[task.status])}
        aria-label={task.status === "completed" ? "Mark as incomplete" : "Mark as complete"}
      >
        <Icon size={16} />
      </button>

      <div className="min-w-0 flex-1">
        <p
          className={cn(
            "text-xs font-medium",
            task.status === "completed"
              ? "text-text-tertiary line-through"
              : "text-text-primary",
          )}
        >
          {task.title}
        </p>

        {task.description && (
          <p className="mt-0.5 line-clamp-1 text-[11px] text-text-tertiary">
            {task.description}
          </p>
        )}

        <div className="mt-1.5 flex flex-wrap items-center gap-2">
          {task.projectTitle && (
            <span className="rounded bg-surface-overlay px-1.5 py-0.5 text-[10px] text-text-muted">
              {task.projectTitle}
            </span>
          )}
          <span className="text-[10px] text-text-muted">
            {categoryLabel[task.category]}
          </span>
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-2">
        <PriorityIndicator priority={task.priority} />
        {task.dueDate && (
          <div className="flex items-center gap-1 text-[11px] text-text-muted">
            <Calendar size={10} />
            <span>
              {new Date(task.dueDate).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              })}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
