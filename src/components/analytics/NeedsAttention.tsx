import { AlertCircle, Calendar, Target } from "lucide-react";
import { Link } from "react-router-dom";

import { cn } from "../../lib/cn";
import SectionCard from "../ui/SectionCard";
import type { Milestone, Project, Task } from "../../types";

type Props = {
  tasks: Task[];
  milestones: Milestone[];
  projects: Project[];
};

type AttentionItem = {
  id: string;
  icon: typeof AlertCircle;
  title: string;
  reason: string;
  color: string;
  href: string;
};

export default function NeedsAttention({ tasks, milestones, projects }: Props) {
  const now = new Date();
  const items: AttentionItem[] = [];

  // Overdue tasks
  tasks
    .filter((t) => t.status !== "completed" && t.dueDate && new Date(t.dueDate) < now)
    .slice(0, 3)
    .forEach((t) => {
      items.push({
        id: `task-${t.id}`,
        icon: AlertCircle,
        title: t.title,
        reason: `Overdue since ${new Date(t.dueDate!).toLocaleDateString("en-US", { month: "short", day: "numeric" })}`,
        color: "text-error",
        href: "/tasks",
      });
    });

  // Overdue milestones
  milestones
    .filter((m) => m.status !== "completed" && m.targetDate && new Date(m.targetDate) < now)
    .slice(0, 2)
    .forEach((m) => {
      items.push({
        id: `ms-${m.id}`,
        icon: Target,
        title: m.title,
        reason: `Target date passed`,
        color: "text-warning",
        href: "/roadmap",
      });
    });

  // Projects approaching deadline (within 7 days)
  const weekFromNow = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
  projects
    .filter((p) => p.status !== "completed" && p.deadline && new Date(p.deadline) < weekFromNow && new Date(p.deadline) > now)
    .slice(0, 2)
    .forEach((p) => {
      items.push({
        id: `proj-${p.id}`,
        icon: Calendar,
        title: p.title,
        reason: `Deadline ${new Date(p.deadline!).toLocaleDateString("en-US", { month: "short", day: "numeric" })}`,
        color: "text-brand-400",
        href: `/projects/${p.id}`,
      });
    });

  return (
    <SectionCard title="Needs Attention" description={items.length > 0 ? `${items.length} items` : undefined}>
      {items.length === 0 ? (
        <p className="py-4 text-center text-xs text-text-muted">
          Nothing requires immediate attention. Great work!
        </p>
      ) : (
        <div className="space-y-1">
          {items.map((item) => {
            const Icon = item.icon;
            return (
              <Link key={item.id} to={item.href} className="flex items-start gap-3 rounded-lg px-2 py-2.5 transition-colors hover:bg-surface-tertiary">
                <Icon size={14} className={cn("mt-0.5 shrink-0", item.color)} />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-xs font-medium text-text-primary">{item.title}</p>
                  <p className="text-[11px] text-text-tertiary">{item.reason}</p>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </SectionCard>
  );
}
