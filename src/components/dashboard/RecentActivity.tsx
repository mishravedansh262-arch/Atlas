import { Link } from "react-router-dom";
import { CheckCircle2, FolderKanban } from "lucide-react";

import { useTasks } from "../../hooks/useTasks";
import { useProjects } from "../../hooks/useProjects";

type ActivityEntry = {
  id: string;
  title: string;
  type: "task" | "project";
  time: string;
};

export default function RecentActivity() {
  const { data: tasks } = useTasks();
  const { data: projects } = useProjects();

  // Build activity from recently completed tasks + recently created projects
  const entries: ActivityEntry[] = [];

  tasks
    ?.filter((t) => t.status === "completed" && t.completedAt)
    .slice(0, 3)
    .forEach((t) => {
      entries.push({
        id: t.id,
        title: `Completed: ${t.title}`,
        type: "task",
        time: new Date(t.completedAt!).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      });
    });

  projects
    ?.slice(0, 3)
    .forEach((p) => {
      entries.push({
        id: p.id,
        title: `Project: ${p.title}`,
        type: "project",
        time: new Date(p.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      });
    });

  // Sort by recency (newest first) - limit to 5
  const sorted = entries.slice(0, 5);

  return (
    <div className="rounded-xl border border-border-secondary bg-surface-secondary p-5">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-sm font-semibold text-text-primary">Recent Activity</h2>
        <Link
          to="/projects"
          className="text-[11px] font-medium text-text-tertiary transition-colors hover:text-text-secondary"
        >
          View projects →
        </Link>
      </div>

      {sorted.length === 0 ? (
        <p className="py-4 text-center text-xs text-text-muted">
          No activity yet. Create a project or complete a task to see updates here.
        </p>
      ) : (
        <div className="space-y-1">
          {sorted.map((entry) => (
            <div
              key={entry.id}
              className="flex items-start gap-3 rounded-lg px-2 py-2.5 transition-colors hover:bg-surface-tertiary"
            >
              {entry.type === "task" ? (
                <CheckCircle2 size={14} className="mt-0.5 shrink-0 text-success" />
              ) : (
                <FolderKanban size={14} className="mt-0.5 shrink-0 text-brand-400" />
              )}
              <div className="min-w-0 flex-1">
                <p className="truncate text-xs text-text-primary">{entry.title}</p>
              </div>
              <span className="shrink-0 text-[11px] text-text-muted">{entry.time}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
