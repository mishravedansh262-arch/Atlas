import { Calendar, Check, Pencil, Trash2 } from "lucide-react";

import { cn } from "../../lib/cn";
import StatusBadge from "../ui/StatusBadge";
import ProgressBar from "../ui/ProgressBar";
import type { Milestone, MilestoneStatus } from "../../types";

type Props = {
  milestones: Milestone[];
  onToggle: (milestone: Milestone) => void;
  onEdit: (milestone: Milestone) => void;
  onDelete: (id: string) => void;
};

const statusMeta: Record<
  MilestoneStatus,
  { label: string; badge: "muted" | "info" | "success" | "error" }
> = {
  not_started: { label: "Not Started", badge: "muted" },
  in_progress: { label: "In Progress", badge: "info" },
  completed: { label: "Completed", badge: "success" },
  blocked: { label: "Blocked", badge: "error" },
};

const categoryLabel: Record<Milestone["category"], string> = {
  academics: "Academics",
  skills: "Skills",
  projects: "Projects",
  career: "Career",
};

const priorityDot: Record<Milestone["priority"], string> = {
  critical: "bg-error",
  high: "bg-warning",
  medium: "bg-brand-400",
  low: "bg-text-muted",
};

function isOverdue(ms: Milestone): boolean {
  if (!ms.targetDate || ms.status === "completed") return false;
  return new Date(ms.targetDate) < new Date();
}

/**
 * Node-based milestone timeline.
 *
 * A single vertical spine connects every milestone, with the node state
 * carrying status: filled for complete, ringed for in-progress, hollow for
 * not started, and error-toned when blocked. Reflects the design system's
 * "nodes along the track" treatment for milestone progress.
 */
export default function MilestoneTimeline({
  milestones,
  onToggle,
  onEdit,
  onDelete,
}: Props) {
  return (
    <ol className="relative">
      {milestones.map((ms, index) => {
        const meta = statusMeta[ms.status];
        const overdue = isOverdue(ms);
        const done = ms.status === "completed";
        const isLast = index === milestones.length - 1;

        return (
          <li key={ms.id} className="relative flex gap-4 pb-3 last:pb-0">
            {/* Spine + node */}
            <div className="relative flex w-5 shrink-0 justify-center">
              {/* Connector: stops at the last node */}
              {!isLast && (
                <span
                  className="absolute top-6 h-[calc(100%-1rem)] w-px bg-border-primary"
                  aria-hidden="true"
                />
              )}

              <button
                onClick={() => onToggle(ms)}
                aria-label={
                  done
                    ? `Reopen ${ms.title}`
                    : `Mark ${ms.title} as completed`
                }
                className={cn(
                  "relative z-10 mt-2.5 flex size-5 items-center justify-center rounded-full border-2 bg-surface-base transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 focus-visible:ring-offset-surface-base",
                  done
                    ? "border-success bg-success text-white"
                    : ms.status === "blocked"
                      ? "border-error text-error"
                      : ms.status === "in_progress"
                        ? "border-brand-500 text-brand-500"
                        : "border-border-hover text-transparent hover:border-brand-500",
                )}
              >
                {done ? (
                  <Check size={12} strokeWidth={3} />
                ) : ms.status === "in_progress" ? (
                  <span className="size-1.5 rounded-full bg-brand-500" />
                ) : ms.status === "blocked" ? (
                  <span className="size-1.5 rounded-full bg-error" />
                ) : null}
              </button>
            </div>

            {/* Card */}
            <div
              className={cn(
                "group relative min-w-0 flex-1 overflow-hidden rounded-xl border bg-surface-secondary p-4 transition-colors",
                overdue
                  ? "border-error/30 hover:border-error/50"
                  : "border-border-primary hover:border-border-hover",
              )}
            >
              {overdue && (
                <span
                  className="absolute inset-y-0 left-0 w-1 bg-error"
                  aria-hidden="true"
                />
              )}

              <div className={cn("flex items-start justify-between gap-3", overdue && "pl-1")}>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3
                      className={cn(
                        "text-sm font-medium",
                        done
                          ? "text-text-tertiary line-through"
                          : "text-text-primary",
                      )}
                    >
                      {ms.title}
                    </h3>
                    <StatusBadge label={meta.label} variant={meta.badge} />
                    {overdue && <StatusBadge label="Overdue" variant="error" />}
                  </div>

                  {ms.description && (
                    <p className="mt-1 text-xs leading-relaxed text-text-tertiary">
                      {ms.description}
                    </p>
                  )}

                  {/* Metadata */}
                  <div className="mt-2.5 flex flex-wrap items-center gap-x-3 gap-y-1.5">
                    <span className="meta-mono flex items-center gap-1.5 text-[10px] text-text-muted">
                      <span
                        className={cn(
                          "size-1.5 shrink-0 rounded-full",
                          priorityDot[ms.priority],
                        )}
                      />
                      {ms.priority}
                    </span>
                    <span className="meta-mono text-[10px] text-text-muted">
                      {categoryLabel[ms.category]}
                    </span>
                    {ms.projectTitle && (
                      <span className="meta-mono truncate text-[10px] text-text-tertiary">
                        {ms.projectTitle}
                      </span>
                    )}
                    {ms.targetDate && (
                      <span
                        className={cn(
                          "meta-mono flex items-center gap-1 text-[10px]",
                          overdue ? "text-error" : "text-text-muted",
                        )}
                      >
                        <Calendar size={12} strokeWidth={1.5} />
                        {new Date(ms.targetDate).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                        })}
                      </span>
                    )}
                  </div>

                  {/* Progress, only where it carries information */}
                  {!done && ms.progress > 0 && (
                    <ProgressBar
                      value={ms.progress}
                      showLabel
                      className="mt-3 max-w-[220px]"
                    />
                  )}
                </div>

                {/* Actions */}
                <div className="flex shrink-0 items-center gap-0.5 opacity-0 transition-opacity focus-within:opacity-100 group-hover:opacity-100">
                  <button
                    onClick={() => onEdit(ms)}
                    aria-label={`Edit ${ms.title}`}
                    className="rounded-lg p-1.5 text-text-muted transition-colors hover:bg-surface-overlay hover:text-text-secondary"
                  >
                    <Pencil size={14} strokeWidth={1.5} />
                  </button>
                  <button
                    onClick={() => onDelete(ms.id)}
                    aria-label={`Delete ${ms.title}`}
                    className="rounded-lg p-1.5 text-text-muted transition-colors hover:bg-error/10 hover:text-error"
                  >
                    <Trash2 size={14} strokeWidth={1.5} />
                  </button>
                </div>
              </div>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
