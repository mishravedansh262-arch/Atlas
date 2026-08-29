import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2, FolderKanban } from "lucide-react";

import SectionCard from "../ui/SectionCard";
import { ListRowSkeleton } from "../ui/Skeleton";
import WidgetError from "../ui/WidgetError";
import { useTasks } from "../../hooks/useTasks";
import { useProjects } from "../../hooks/useProjects";

const MAX_ENTRIES = 5;

type ActivityEntry = {
  id: string;
  title: string;
  type: "task" | "project";
  /** Epoch ms — the real sort key. */
  timestamp: number;
  label: string;
  fullDate: string;
};

/**
 * Safely parses an ISO string to epoch ms. Returns null for missing or
 * unparseable values so they can be excluded rather than sorted as NaN.
 */
function parseTimestamp(iso?: string): number | null {
  if (!iso) return null;
  const ms = new Date(iso).getTime();
  return Number.isNaN(ms) ? null : ms;
}

function formatShort(ms: number): string {
  return new Date(ms).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}

function formatFull(ms: number): string {
  return new Date(ms).toLocaleString("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

export default function RecentActivity() {
  const {
    data: tasks,
    isPending: tasksPending,
    isError: tasksError,
    refetch: refetchTasks,
  } = useTasks();
  const {
    data: projects,
    isPending: projectsPending,
    isError: projectsError,
    refetch: refetchProjects,
  } = useProjects();

  const isPending = tasksPending || projectsPending;
  const isError = tasksError || projectsError;

  /*
   * One timeline from two sources, sorted by real timestamp.
   *
   * Each entry keeps the verb matching the field it came from — tasks use
   * `completedAt` ("Completed"), projects use `createdAt` ("Created") — so a
   * row never implies an event that didn't happen. Entries with missing or
   * invalid dates are dropped rather than back-filled.
   */
  const entries: ActivityEntry[] = [];

  for (const t of tasks ?? []) {
    if (t.status !== "completed") continue;
    const ts = parseTimestamp(t.completedAt);
    if (ts === null) continue;
    entries.push({
      id: `task-${t.id}`,
      title: `Completed: ${t.title}`,
      type: "task",
      timestamp: ts,
      label: formatShort(ts),
      fullDate: formatFull(ts),
    });
  }

  for (const p of projects ?? []) {
    const ts = parseTimestamp(p.createdAt);
    if (ts === null) continue;
    entries.push({
      id: `project-${p.id}`,
      title: `Created: ${p.title}`,
      type: "project",
      timestamp: ts,
      label: formatShort(ts),
      fullDate: formatFull(ts),
    });
  }

  const recent = entries
    .sort((a, b) => b.timestamp - a.timestamp)
    .slice(0, MAX_ENTRIES);

  return (
    <SectionCard
      title="Recent Activity"
      action={
        <Link
          to="/projects"
          className="focus-ring meta-mono inline-flex items-center gap-1 rounded-lg px-1 py-0.5 text-[10px] text-text-tertiary transition-colors hover:text-text-secondary"
        >
          Projects
          <ArrowRight size={10} strokeWidth={2} aria-hidden="true" />
        </Link>
      }
    >
      {isPending ? (
        <div className="space-y-1">
          {Array.from({ length: 4 }).map((_, i) => (
            <ListRowSkeleton key={i} />
          ))}
        </div>
      ) : isError ? (
        <WidgetError
          message="Couldn't load recent activity."
          onRetry={() => {
            void refetchTasks();
            void refetchProjects();
          }}
        />
      ) : recent.length === 0 ? (
        <div className="py-4 text-center">
          <p className="text-xs text-text-secondary">No activity yet.</p>
          <p className="mt-1 text-[11px] text-text-muted">
            Completed tasks and new projects will appear here.
          </p>
        </div>
      ) : (
        <ul className="space-y-0.5">
          {recent.map((entry) => (
            <li
              key={entry.id}
              className="flex items-start gap-3 rounded-lg px-2 py-2 transition-colors hover:bg-surface-tertiary"
            >
              {entry.type === "task" ? (
                <CheckCircle2
                  size={14}
                  className="mt-0.5 shrink-0 text-success"
                  aria-hidden="true"
                />
              ) : (
                <FolderKanban
                  size={14}
                  className="mt-0.5 shrink-0 text-brand-400"
                  aria-hidden="true"
                />
              )}
              <p className="min-w-0 flex-1 truncate text-xs text-text-primary">
                {entry.title}
              </p>
              <time
                dateTime={new Date(entry.timestamp).toISOString()}
                title={entry.fullDate}
                className="meta-mono shrink-0 text-[10px] text-text-muted"
              >
                {entry.label}
              </time>
            </li>
          ))}
        </ul>
      )}
    </SectionCard>
  );
}
