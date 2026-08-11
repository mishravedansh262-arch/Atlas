import { Flame, Target, TrendingUp, Zap } from "lucide-react";

import PageHeader from "../../components/ui/PageHeader";
import SectionCard from "../../components/ui/SectionCard";
import ProgressBar from "../../components/ui/ProgressBar";
import StatCard from "../../components/dashboard/StatCard";
import Spinner from "../../components/ui/Spinner";
import EmptyState from "../../components/ui/EmptyState";
import { useProjects } from "../../hooks/useProjects";
import { useTasks } from "../../hooks/useTasks";

export default function Analytics() {
  const { data: projects, isLoading: projLoading } = useProjects();
  const { data: tasks, isLoading: taskLoading } = useTasks();

  if (projLoading || taskLoading) {
    return (
      <div className="mx-auto max-w-7xl space-y-6">
        <PageHeader title="Analytics" description="Track your productivity and progress." />
        <div className="flex justify-center py-16">
          <Spinner size={24} className="text-brand-400" />
        </div>
      </div>
    );
  }

  const totalTasks = tasks?.length ?? 0;
  const completedTasks = tasks?.filter((t) => t.status === "completed").length ?? 0;
  const totalProjects = projects?.length ?? 0;
  const completedProjects = projects?.filter((p) => p.status === "completed").length ?? 0;
  const taskCompletion = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
  const projectCompletion = totalProjects > 0 ? Math.round((completedProjects / totalProjects) * 100) : 0;

  // Derive category distribution
  const categoryBreakdown = tasks
    ? ["learning", "project", "career", "personal"].map((cat) => {
        const count = tasks.filter((t) => t.category === cat).length;
        return { name: cat.charAt(0).toUpperCase() + cat.slice(1), count, total: totalTasks };
      })
    : [];

  // Derive project status breakdown
  const statusBreakdown = projects
    ? [
        { name: "In Progress", count: projects.filter((p) => p.status === "in-progress").length },
        { name: "Planning", count: projects.filter((p) => p.status === "planning").length },
        { name: "Completed", count: projects.filter((p) => p.status === "completed").length },
        { name: "On Hold", count: projects.filter((p) => p.status === "on-hold").length },
      ].filter((s) => s.count > 0)
    : [];

  const hasData = totalTasks > 0 || totalProjects > 0;

  if (!hasData) {
    return (
      <div className="mx-auto max-w-7xl space-y-6">
        <PageHeader title="Analytics" description="Track your productivity and progress." />
        <EmptyState
          icon={TrendingUp}
          title="No data yet"
          description="Complete some tasks or create projects to unlock meaningful analytics."
        />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <PageHeader
        title="Analytics"
        description="Track your productivity, completion rates, and overall progress."
      />

      {/* Summary Stats */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Tasks Completed"
          value={`${completedTasks}/${totalTasks}`}
          subtitle={`${taskCompletion}% completion rate`}
          icon={TrendingUp}
          accentColor="text-brand-400"
        />
        <StatCard
          title="Projects Done"
          value={`${completedProjects}/${totalProjects}`}
          subtitle={`${projectCompletion}% completion rate`}
          icon={Target}
          accentColor="text-success"
        />
        <StatCard
          title="Pending Tasks"
          value={String(totalTasks - completedTasks)}
          subtitle="Tasks remaining"
          icon={Flame}
          accentColor="text-warning"
        />
        <StatCard
          title="Total Output"
          value={String(completedTasks + completedProjects)}
          subtitle="Items completed"
          icon={Zap}
          accentColor="text-brand-300"
        />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        {/* Task categories */}
        <SectionCard title="Tasks by Category" description="Distribution across focus areas">
          <div className="space-y-4 pt-1">
            {categoryBreakdown.map((cat) => (
              <div key={cat.name} className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-text-secondary">{cat.name}</span>
                  <span className="text-[11px] font-medium text-text-primary">{cat.count}</span>
                </div>
                <ProgressBar
                  value={cat.total > 0 ? Math.round((cat.count / cat.total) * 100) : 0}
                  color="bg-brand-500"
                />
              </div>
            ))}
          </div>
        </SectionCard>

        {/* Project status */}
        <SectionCard title="Project Status" description="Current state of your projects">
          {statusBreakdown.length > 0 ? (
            <div className="space-y-3 pt-1">
              {statusBreakdown.map((item) => (
                <div key={item.name} className="flex items-center justify-between rounded-lg bg-surface-tertiary px-3 py-2.5">
                  <span className="text-xs text-text-secondary">{item.name}</span>
                  <span className="text-sm font-bold text-text-primary">{item.count}</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="py-4 text-center text-xs text-text-muted">No projects yet.</p>
          )}
        </SectionCard>
      </div>
    </div>
  );
}
