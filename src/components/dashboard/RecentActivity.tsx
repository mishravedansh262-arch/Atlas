import { CheckCircle2, Circle, Clock, GitBranch } from "lucide-react";

import { cn } from "../../lib/cn";

type ActivityItem = {
  id: string;
  title: string;
  description: string;
  time: string;
  type: "completed" | "started" | "pending" | "milestone";
};

const activities: ActivityItem[] = [
  {
    id: "1",
    title: "Completed Database Setup",
    description: "MongoDB schema and connection configured",
    time: "2h ago",
    type: "completed",
  },
  {
    id: "2",
    title: "Auth Integration",
    description: "Connected frontend to backend auth API",
    time: "5h ago",
    type: "completed",
  },
  {
    id: "3",
    title: "Dashboard Redesign",
    description: "UI/UX overhaul in progress",
    time: "Today",
    type: "started",
  },
  {
    id: "4",
    title: "API Error Handling",
    description: "Standardized error responses",
    time: "Yesterday",
    type: "completed",
  },
  {
    id: "5",
    title: "Route Guards",
    description: "Protected route middleware setup",
    time: "Yesterday",
    type: "completed",
  },
];

const typeConfig = {
  completed: { icon: CheckCircle2, color: "text-success" },
  started: { icon: Clock, color: "text-brand-400" },
  pending: { icon: Circle, color: "text-text-muted" },
  milestone: { icon: GitBranch, color: "text-warning" },
};

export default function RecentActivity() {
  return (
    <div className="rounded-xl border border-border-secondary bg-surface-secondary p-5">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-sm font-semibold text-text-primary">
          Recent Activity
        </h2>
        <button className="text-xs font-medium text-text-tertiary transition-colors hover:text-text-secondary">
          View all
        </button>
      </div>

      <div className="space-y-1">
        {activities.map((item) => {
          const config = typeConfig[item.type];
          const Icon = config.icon;

          return (
            <div
              key={item.id}
              className="flex items-start gap-3 rounded-lg px-2 py-2.5 transition-colors hover:bg-surface-tertiary"
            >
              <Icon size={16} className={cn("mt-0.5 shrink-0", config.color)} />
              <div className="min-w-0 flex-1">
                <p className="truncate text-xs font-medium text-text-primary">
                  {item.title}
                </p>
                <p className="truncate text-[11px] text-text-tertiary">
                  {item.description}
                </p>
              </div>
              <span className="shrink-0 text-[11px] text-text-muted">
                {item.time}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
