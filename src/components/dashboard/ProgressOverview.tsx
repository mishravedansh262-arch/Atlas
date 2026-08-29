import SectionCard from "../ui/SectionCard";
import ProgressBar from "../ui/ProgressBar";
import { ProgressRowSkeleton } from "../ui/Skeleton";
import WidgetError from "../ui/WidgetError";
import { useProjects } from "../../hooks/useProjects";
import { useTasks } from "../../hooks/useTasks";
import { useMilestones } from "../../hooks/useMilestones";

/**
 * Completion ratios across the three tracked entities.
 *
 * Uses the shared `ProgressBar` primitive rather than an inline track, so the
 * indicator height (4px), track colour and gradient fill match every other
 * progress surface in the app.
 */
export default function ProgressOverview() {
  const {
    data: projects,
    isPending: projectsPending,
    isError: projectsError,
    refetch: refetchProjects,
  } = useProjects();
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

  const isPending = projectsPending || tasksPending || milestonesPending;
  const isError = projectsError || tasksError || milestonesError;

  const rows = [
    {
      label: "Projects",
      done: projects?.filter((p) => p.status === "completed").length ?? 0,
      total: projects?.length ?? 0,
      color: "fill-gradient-accent",
    },
    {
      label: "Tasks",
      done: tasks?.filter((t) => t.status === "completed").length ?? 0,
      total: tasks?.length ?? 0,
      color: "fill-gradient-success",
    },
    {
      label: "Milestones",
      done: milestones?.filter((m) => m.status === "completed").length ?? 0,
      total: milestones?.length ?? 0,
      color: "bg-warning",
    },
  ];

  const hasAnything = rows.some((r) => r.total > 0);

  return (
    <SectionCard title="Progress">
      {isPending ? (
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <ProgressRowSkeleton key={i} />
          ))}
        </div>
      ) : isError ? (
        <WidgetError
          message="Couldn't load progress."
          onRetry={() => {
            void refetchProjects();
            void refetchTasks();
            void refetchMilestones();
          }}
        />
      ) : !hasAnything ? (
        // Explicit empty state — three 0/0 bars would read as a stalled account.
        <p className="py-3 text-center text-xs text-text-muted">
          Nothing tracked yet. Progress appears once you add projects, tasks or
          milestones.
        </p>
      ) : (
        <div className="space-y-4">
          {rows.map((row) => (
            <div key={row.label} className="space-y-2">
              <div className="flex items-baseline justify-between gap-2">
                <span className="meta-mono text-[10px] text-text-tertiary">
                  {row.label}
                </span>
                <span className="meta-mono text-[10px] text-text-secondary">
                  {row.total > 0 ? `${row.done}/${row.total}` : "—"}
                </span>
              </div>
              <ProgressBar
                value={row.total > 0 ? (row.done / row.total) * 100 : 0}
                color={row.color}
              />
            </div>
          ))}
        </div>
      )}
    </SectionCard>
  );
}
