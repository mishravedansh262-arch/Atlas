import { FolderKanban, CheckSquare, TrendingUp, Clock } from "lucide-react";

import StatCard from "./StatCard";
import { useProjects } from "../../hooks/useProjects";
import { useTasks } from "../../hooks/useTasks";

export default function StatsGrid() {
  const { data: projects } = useProjects();
  const { data: tasks } = useTasks();

  const totalProjects = projects?.length ?? 0;
  const activeProjects = projects?.filter((p) => p.status === "in-progress").length ?? 0;
  const totalTasks = tasks?.length ?? 0;
  const completedTasks = tasks?.filter((t) => t.status === "completed").length ?? 0;
  const pendingTasks = totalTasks - completedTasks;
  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <StatCard
        title="Active Projects"
        value={String(activeProjects)}
        subtitle={`${totalProjects} total`}
        icon={FolderKanban}
        accentColor="text-brand-400"
      />
      <StatCard
        title="Tasks Completed"
        value={String(completedTasks)}
        subtitle={`of ${totalTasks} total`}
        icon={CheckSquare}
        trend={totalTasks > 0 ? { value: `${completionRate}% done`, positive: completionRate >= 50 } : undefined}
        accentColor="text-success"
      />
      <StatCard
        title="Pending Tasks"
        value={String(pendingTasks)}
        subtitle="Need attention"
        icon={Clock}
        accentColor="text-warning"
      />
      <StatCard
        title="Completion Rate"
        value={`${completionRate}%`}
        subtitle="Overall progress"
        icon={TrendingUp}
        accentColor="text-brand-300"
      />
    </div>
  );
}
