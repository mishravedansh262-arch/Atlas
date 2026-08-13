import { Link } from "react-router-dom";
import { AlertCircle, ArrowRight, Calendar, Target } from "lucide-react";

import { cn } from "../../lib/cn";
import { useTasks } from "../../hooks/useTasks";
import { useMilestones } from "../../hooks/useMilestones";

/**
 * Deterministic next-action recommendation.
 * Priority: overdue tasks → high-priority active tasks → upcoming deadlines → active milestones.
 */
export default function NextAction() {
  const { data: tasks } = useTasks();
  const { data: milestones } = useMilestones();

  const now = new Date();

  // Overdue tasks
  const overdueTasks = (tasks ?? [])
    .filter((t) => t.status !== "completed" && t.dueDate && new Date(t.dueDate) < now)
    .sort((a, b) => new Date(a.dueDate!).getTime() - new Date(b.dueDate!).getTime());

  // High-priority pending tasks
  const highPriority = (tasks ?? [])
    .filter((t) => t.status !== "completed" && (t.priority === "critical" || t.priority === "high"))
    .slice(0, 1);

  // Active milestones
  const activeMilestones = (milestones ?? []).filter((m) => m.status === "in_progress").slice(0, 1);

  let action: { type: "overdue" | "task" | "milestone"; title: string; subtitle: string; href: string } | null = null;

  if (overdueTasks.length > 0) {
    const t = overdueTasks[0]!;
    action = { type: "overdue", title: t.title, subtitle: `Overdue since ${new Date(t.dueDate!).toLocaleDateString("en-US", { month: "short", day: "numeric" })}`, href: "/tasks" };
  } else if (highPriority.length > 0) {
    const t = highPriority[0]!;
    action = { type: "task", title: t.title, subtitle: "High priority — needs attention", href: "/tasks" };
  } else if (activeMilestones.length > 0) {
    const m = activeMilestones[0]!;
    action = { type: "milestone", title: m.title, subtitle: `${m.progress}% complete`, href: "/roadmap" };
  }

  if (!action) return null;

  return (
    <Link
      to={action.href}
      className={cn(
        "flex items-center gap-3 rounded-xl border p-4 transition-colors hover:bg-surface-tertiary",
        action.type === "overdue" ? "border-error/30 bg-error/5" : "border-brand-500/20 bg-brand-600/5",
      )}
    >
      <div className={cn("rounded-lg p-2", action.type === "overdue" ? "bg-error/10 text-error" : "bg-brand-600/10 text-brand-400")}>
        {action.type === "overdue" ? <AlertCircle size={18} /> : action.type === "milestone" ? <Target size={18} /> : <Calendar size={18} />}
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-[11px] font-medium uppercase tracking-wider text-text-muted">Next Action</p>
        <p className="mt-0.5 truncate text-sm font-medium text-text-primary">{action.title}</p>
        <p className="text-[11px] text-text-tertiary">{action.subtitle}</p>
      </div>
      <ArrowRight size={16} className="shrink-0 text-text-muted" />
    </Link>
  );
}
