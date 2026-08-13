import { Check, Pencil, Trash2 } from "lucide-react";

import { cn } from "../../lib/cn";
import StatusBadge from "../ui/StatusBadge";
import type { Task } from "../../types";

type Props = {
  task: Task;
  onToggle?: (task: Task) => void;
  onEdit?: (task: Task) => void;
  onDelete?: (id: string) => void;
};

const categoryLabel: Record<Task["category"], string> = {
  learning: "Learning",
  project: "Project",
  career: "Career",
  personal: "Personal",
};

const priorityDot: Record<Task["priority"], string> = {
  critical: "bg-error",
  high: "bg-warning",
  medium: "bg-brand-400",
  low: "bg-text-muted",
};

function isOverdue(task: Task): boolean {
  if (!task.dueDate || task.status === "completed") return false;
  return new Date(task.dueDate) < new Date();
}

function overdueDays(task: Task): number {
  if (!task.dueDate) return 0;
  return Math.floor(
    (Date.now() - new Date(task.dueDate).getTime()) / 86_400_000,
  );
}

/**
 * Action-focused task row.
 *
 * Spec: checkbox-led row on a tonal surface with a ghost border, mono
 * metadata, and a 4px left accent stripe when the task is overdue.
 * Row actions reveal on hover but stay reachable via keyboard focus.
 */
export default function TaskItem({ task, onToggle, onEdit, onDelete }: Props) {
  const overdue = isOverdue(task);
  const done = task.status === "completed";
  const days = overdue ? overdueDays(task) : 0;

  return (
    <div
      className={cn(
        "group relative flex items-start gap-3 overflow-hidden rounded-xl border bg-surface-secondary p-3 transition-colors duration-[var(--transition-fast)]",
        overdue
          ? "border-error/30 hover:border-error/50"
          : "border-border-primary hover:border-border-hover",
        done && "opacity-60",
      )}
    >
      {/* Overdue accent stripe */}
      {overdue && (
        <span
          className="absolute inset-y-0 left-0 w-1 bg-error"
          aria-hidden="true"
        />
      )}

      {/* Completion checkbox */}
      <button
        onClick={() => onToggle?.(task)}
        aria-label={done ? "Mark as incomplete" : "Mark as complete"}
        className={cn(
          "mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-sm border-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 focus-visible:ring-offset-surface-secondary",
          done
            ? "border-success bg-success text-white"
            : task.status === "in-progress"
              ? "border-brand-500 text-brand-500"
              : "border-border-hover text-transparent hover:border-brand-500 hover:text-brand-500/40",
          overdue && !done && "ml-1",
        )}
      >
        {task.status === "in-progress" && !done ? (
          <span className="size-2 rounded-sm bg-brand-500" />
        ) : (
          <Check size={12} strokeWidth={3} />
        )}
      </button>

      {/* Content */}
      <div className="min-w-0 flex-1">
        <p
          className={cn(
            "text-sm leading-snug",
            done
              ? "text-text-tertiary line-through"
              : task.priority === "critical" || task.priority === "high"
                ? "font-semibold text-text-primary"
                : "text-text-primary",
          )}
        >
          {task.title}
        </p>

        {task.description && (
          <p className="mt-0.5 line-clamp-1 text-xs text-text-tertiary">
            {task.description}
          </p>
        )}

        <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1.5">
          <span className="meta-mono flex items-center gap-1.5 text-[10px] text-text-muted">
            <span
              className={cn(
                "size-1.5 shrink-0 rounded-full",
                priorityDot[task.priority],
              )}
            />
            {task.priority}
          </span>

          <span className="meta-mono text-[10px] text-text-muted">
            {categoryLabel[task.category]}
          </span>

          {task.projectTitle && (
            <span className="meta-mono truncate text-[10px] text-text-tertiary">
              {task.projectTitle}
            </span>
          )}

          {task.dueDate && !overdue && (
            <span className="meta-mono text-[10px] text-text-muted">
              {new Date(task.dueDate).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              })}
            </span>
          )}

          {overdue && (
            <StatusBadge
              label={days > 0 ? `Overdue ${days}d` : "Due today"}
              variant="error"
            />
          )}
        </div>
      </div>

      {/* Row actions */}
      <div className="flex shrink-0 items-center gap-0.5 opacity-0 transition-opacity focus-within:opacity-100 group-hover:opacity-100">
        {onEdit && (
          <button
            onClick={() => onEdit(task)}
            aria-label={`Edit ${task.title}`}
            className="rounded-lg p-1.5 text-text-muted transition-colors hover:bg-surface-overlay hover:text-text-secondary"
          >
            <Pencil size={13} strokeWidth={1.5} />
          </button>
        )}
        {onDelete && (
          <button
            onClick={() => onDelete(task.id)}
            aria-label={`Delete ${task.title}`}
            className="rounded-lg p-1.5 text-text-muted transition-colors hover:bg-error/10 hover:text-error"
          >
            <Trash2 size={13} strokeWidth={1.5} />
          </button>
        )}
      </div>
    </div>
  );
}
