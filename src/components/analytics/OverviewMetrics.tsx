import { CheckSquare, FolderKanban, Target, TrendingUp } from "lucide-react";

import StatCard from "../dashboard/StatCard";
import type { Milestone, Project, Task } from "../../types";

type Props = {
  projects: Project[];
  tasks: Task[];
  milestones: Milestone[];
};

export default function OverviewMetrics({ projects, tasks, milestones }: Props) {
  const completedTasks = tasks.filter((t) => t.status === "completed").length;
  const completedProjects = projects.filter((p) => p.status === "completed").length;
  const completedMilestones = milestones.filter((m) => m.status === "completed").length;
  const taskRate = tasks.length > 0 ? Math.round((completedTasks / tasks.length) * 100) : 0;

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <StatCard title="Tasks" value={`${completedTasks}/${tasks.length}`} subtitle={`${taskRate}% done`} icon={CheckSquare} accentColor="text-brand-400" />
      <StatCard title="Projects" value={`${completedProjects}/${projects.length}`} subtitle={`${projects.filter((p) => p.status === "in-progress").length} active`} icon={FolderKanban} accentColor="text-success" />
      <StatCard title="Milestones" value={`${completedMilestones}/${milestones.length}`} subtitle={`${milestones.filter((m) => m.status === "in_progress").length} in progress`} icon={Target} accentColor="text-warning" />
      <StatCard title="Completion Rate" value={`${taskRate}%`} subtitle="Overall task completion" icon={TrendingUp} accentColor="text-brand-300" />
    </div>
  );
}
