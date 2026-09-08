import { Link } from "react-router-dom";
import { AlertCircle, ArrowRight, Calendar, Target } from "lucide-react";

import { cn } from "../../lib/cn";
import StatusBadge from "../ui/StatusBadge";
import Skeleton from "../ui/Skeleton";
import WidgetError from "../ui/WidgetError";
import { useTasks } from "../../hooks/useTasks";
import { useMilestones } from "../../hooks/useMilestones";
import { buttonClasses } from "../../lib/buttonStyles";

type Action = {
  kind: "overdue" | "priority" | "milestone";
  title: string;
  detail: string;
  meta: string;
  href: string;
};

/**
 * "Next Action" hero card.
 *
 * Spec: the dominant card on the dashboard — answers "what do I do next?"
 * with a status badge, due metadata, a headline, supporting detail, and a
 * primary action anchored bottom-right.
 *
 * Recommendation is deterministic: overdue work, then high-priority work,
 * then the active roadmap milestone.
 */
export default function NextAction() {
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

  // Skeleton mirrors the loaded hero block so the card doesn't jump height.
  if (tasksPending || milestonesPending) {
    return (
      <div className="rounded-xl border border-border-primary bg-surface-secondary p-4 sm:p-5">
        <div className="flex items-center gap-2">
          <Skeleton className="size-1.5 rounded-full" />
          <Skeleton className="h-3 w-24 rounded-sm" />
          <Skeleton className="h-4 w-20 rounded-sm" />
        </div>
        <Skeleton className="mt-3 h-6 w-2/3" />
        <Skeleton className="mt-2 h-3 w-full rounded-sm" />
        <Skeleton className="mt-1.5 h-3 w-4/5 rounded-sm" />
        <div className="mt-4 flex items-center justify-between border-t border-border-secondary pt-3">
          <Skeleton className="size-4 rounded-sm" />
          <Skeleton className="h-8 w-28" />
        </div>
      </div>
    );
  }

  if (tasksError || milestonesError) {
    return (
      <WidgetError
        variant="card"
        message="Couldn't work out your next action."
        onRetry={() => {
          void refetchTasks();
          void refetchMilestones();
        }}
      />
    );
  }

  const now = new Date();

  const overdue = (tasks ?? [])
    .filter((t) => t.status !== "completed" && t.dueDate && new Date(t.dueDate) < now)
    .sort(
      (a, b) => new Date(a.dueDate!).getTime() - new Date(b.dueDate!).getTime(),
    );

  const highPriority = (tasks ?? []).filter(
    (t) =>
      t.status !== "completed" &&
      (t.priority === "critical" || t.priority === "high"),
  );

  const activeMilestone = (milestones ?? []).filter(
    (m) => m.status === "in_progress",
  );

  let action: Action | null = null;

  if (overdue.length > 0) {
    const t = overdue[0]!;
    const days = Math.floor(
      (now.getTime() - new Date(t.dueDate!).getTime()) / 86_400_000,
    );
    action = {
      kind: "overdue",
      title: t.title,
      detail:
        t.description ??
        "This task is past its due date. Clear it to get back on track.",
      meta: days > 0 ? `Overdue ${days}d` : "Due today",
      href: "/tasks",
    };
  } else if (highPriority.length > 0) {
    const t = highPriority[0]!;
    action = {
      kind: "priority",
      title: t.title,
      detail:
        t.description ??
        "Flagged as high priority. Best tackled while you have momentum.",
      meta: t.dueDate
        ? `Due ${new Date(t.dueDate).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
          })}`
        : "No due date",
      href: "/tasks",
    };
  } else if (activeMilestone.length > 0) {
    const m = activeMilestone[0]!;
    action = {
      kind: "milestone",
      title: m.title,
      detail:
        m.description ??
        "Your active roadmap milestone. Keep chipping away at it.",
      meta: `${m.progress}% complete`,
      href: "/roadmap",
    };
  }

  if (!action) return null;

  const isUrgent = action.kind === "overdue";
  const Icon =
    action.kind === "overdue"
      ? AlertCircle
      : action.kind === "milestone"
        ? Target
        : Calendar;

  const badge =
    action.kind === "overdue"
      ? { label: "Overdue", variant: "error" as const }
      : action.kind === "priority"
        ? { label: "High Priority", variant: "warning" as const }
        : { label: "In Progress", variant: "info" as const };

  return (
    <div
      className={cn(
        "hud-frame edge-lit relative overflow-hidden rounded-xl border bg-surface-secondary p-4 sm:p-5",
        isUrgent ? "border-error/30" : "border-border-primary",
      )}
      style={
        {
          "--hud-color": isUrgent
            ? "rgb(239 68 68 / 0.55)"
            : "rgb(59 130 246 / 0.5)",
        } as React.CSSProperties
      }
    >
      {/* Ambient bloom — communicates urgency without a loud border */}
      <div
        className={cn(
          "pointer-events-none absolute -right-20 -top-24 size-60 rounded-full blur-3xl",
          isUrgent ? "bg-error/[0.09]" : "bg-brand-500/[0.09]",
        )}
        aria-hidden="true"
      />
      <div
        className={cn(
          "pointer-events-none absolute -bottom-28 left-1/3 size-52 rounded-full blur-3xl",
          isUrgent ? "bg-error/[0.05]" : "bg-accent-cyan/[0.06]",
        )}
        aria-hidden="true"
      />

      <div className="relative">
        {/* Meta row */}
        <div className="flex flex-wrap items-center gap-2">
          <span
            className={cn(
              "size-1.5 rounded-full pulse-soft",
              isUrgent ? "bg-error" : "bg-brand-500",
            )}
            aria-hidden="true"
          />
          <span className="label-mono text-text-muted">Next Action</span>
          <span className="text-text-muted">·</span>
          <StatusBadge label={badge.label} variant={badge.variant} />
          <span className="meta-mono text-[10px] text-text-tertiary">
            {action.meta}
          </span>
        </div>

        {/* Headline */}
        <h2 className="mt-3 text-lg font-semibold leading-snug tracking-tight text-text-primary sm:text-xl">
          {action.title}
        </h2>
        <p className="mt-1.5 max-w-2xl text-xs leading-relaxed text-text-secondary sm:text-sm">
          {action.detail}
        </p>

        {/* Action */}
        <div className="mt-4 flex items-center justify-between border-t border-border-secondary pt-3">
          <Icon
            size={16}
            strokeWidth={1.5}
            className={cn(isUrgent ? "text-error" : "text-brand-400")}
            aria-hidden="true"
          />
          <Link
            to={action.href}
            className={buttonClasses({ glow: true })}
          >
            Start Work
            <ArrowRight size={14} strokeWidth={2} />
          </Link>
        </div>
      </div>
    </div>
  );
}
