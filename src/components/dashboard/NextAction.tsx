import { Link } from "react-router-dom";
import { AlertCircle, ArrowRight, Calendar, Target } from "lucide-react";

import { cn } from "../../lib/cn";
import StatusBadge from "../ui/StatusBadge";
import { useTasks } from "../../hooks/useTasks";
import { useMilestones } from "../../hooks/useMilestones";

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
  const { data: tasks } = useTasks();
  const { data: milestones } = useMilestones();

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
        "relative overflow-hidden rounded-xl border bg-surface-secondary p-4 sm:p-5",
        isUrgent ? "border-error/30" : "border-border-primary",
      )}
    >
      {/* Ambient tint — communicates urgency without a loud border */}
      <div
        className={cn(
          "pointer-events-none absolute -right-24 -top-24 size-56 rounded-full blur-3xl",
          isUrgent ? "bg-error/[0.07]" : "bg-brand-500/[0.06]",
        )}
        aria-hidden="true"
      />

      <div className="relative">
        {/* Meta row */}
        <div className="flex flex-wrap items-center gap-2">
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
            size={15}
            strokeWidth={1.5}
            className={cn(isUrgent ? "text-error" : "text-brand-400")}
            aria-hidden="true"
          />
          <Link
            to={action.href}
            className="label-mono inline-flex items-center gap-2 rounded-lg bg-brand-500 px-3.5 py-2 text-white transition-colors hover:bg-brand-500 active:scale-[0.98]"
          >
            Start Work
            <ArrowRight size={13} strokeWidth={2} />
          </Link>
        </div>
      </div>
    </div>
  );
}
