import { FolderKanban, CheckSquare, Target, Clock } from "lucide-react";

import StatCard from "./StatCard";
import { StatCardSkeleton } from "../ui/Skeleton";
import WidgetError from "../ui/WidgetError";
import { useProjects } from "../../hooks/useProjects";
import { useTasks } from "../../hooks/useTasks";
import { useMilestones } from "../../hooks/useMilestones";
import type { Task } from "../../types";

/**
 * Counts tasks past their due date.
 *
 * Kept outside the component so the clock read isn't an impure call during
 * render — the value is derived on demand from data the caller already holds.
 */
function countOverdue(tasks: Task[] | undefined): number {
  if (!tasks) return 0;
  const now = Date.now();
  return tasks.filter(
    (t) =>
      t.status !== "completed" &&
      t.dueDate &&
      new Date(t.dueDate).getTime() < now,
  ).length;
}

export default function StatsGrid() {
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

  // Skeletons reserve the exact card geometry, so nothing shifts on resolve.
  // `lg:grid-cols-4` closes the 1024–1279px gap where the grid previously
  // dropped to 2 columns and left a lot of dead horizontal space.
  if (isPending) {
    return (
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <StatCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  // Full-width so the message isn't squeezed into a single grid cell.
  if (isError) {
    return (
      <WidgetError
        variant="card"
        message="Couldn't load your stats."
        onRetry={() => {
          void refetchProjects();
          void refetchTasks();
          void refetchMilestones();
        }}
      />
    );
  }

  const totalProjects = projects?.length ?? 0;
  const activeProjects =
    projects?.filter((p) => p.status === "in-progress").length ?? 0;

  const totalTasks = tasks?.length ?? 0;
  const completedTasks =
    tasks?.filter((t) => t.status === "completed").length ?? 0;
  const pendingTasks = totalTasks - completedTasks;
  const completionRate =
    totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  // Real derived figure, replacing the previously hardcoded "Need attention".
  const overdueTasks = countOverdue(tasks);

  const totalMilestones = milestones?.length ?? 0;
  const completedMilestones =
    milestones?.filter((m) => m.status === "completed").length ?? 0;

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <StatCard
        title="Active Projects"
        value={String(activeProjects)}
        subtitle={totalProjects > 0 ? `${totalProjects} total` : "None yet"}
        icon={FolderKanban}
        accentColor="text-brand-400"
      />
      <StatCard
        title="Tasks Completed"
        value={String(completedTasks)}
        subtitle={totalTasks > 0 ? `of ${totalTasks} total` : "None yet"}
        icon={CheckSquare}
        trend={
          totalTasks > 0
            ? {
                value: `${completionRate}% done`,
                positive: completionRate >= 50,
              }
            : undefined
        }
        accentColor="text-success"
      />
      <StatCard
        title="Pending Tasks"
        value={String(pendingTasks)}
        subtitle={
          overdueTasks > 0
            ? `${overdueTasks} overdue`
            : pendingTasks > 0
              ? "On schedule"
              : "All clear"
        }
        icon={Clock}
        accentColor={overdueTasks > 0 ? "text-error" : "text-warning"}
      />
      {/*
        Replaces the old "Completion Rate" card, which restated the percentage
        already shown as the Tasks trend — two of four cards held the same
        number. Milestones are a first-class entity and were absent entirely.
      */}
      <StatCard
        title="Milestones"
        value={
          totalMilestones > 0
            ? `${completedMilestones}/${totalMilestones}`
            : "0"
        }
        subtitle={totalMilestones > 0 ? "Roadmap progress" : "None yet"}
        icon={Target}
        accentColor="text-brand-300"
      />
    </div>
  );
}
