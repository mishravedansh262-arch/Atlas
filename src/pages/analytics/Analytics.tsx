import { TrendingUp } from "lucide-react";

import PageHeader from "../../components/ui/PageHeader";
import Spinner from "../../components/ui/Spinner";
import EmptyState from "../../components/ui/EmptyState";
import ProgressRing from "../../components/ui/ProgressRing";
import OverviewMetrics from "../../components/analytics/OverviewMetrics";
import ActivityHeatmap from "../../components/analytics/ActivityHeatmap";
import WeeklyActivity from "../../components/analytics/WeeklyActivity";
import StreakCard from "../../components/analytics/StreakCard";
import ProductivityBreakdown from "../../components/analytics/ProductivityBreakdown";
import AnalyticsInsights from "../../components/analytics/AnalyticsInsights";
import NeedsAttention from "../../components/analytics/NeedsAttention";
import { useProjects } from "../../hooks/useProjects";
import { useTasks } from "../../hooks/useTasks";
import { useMilestones } from "../../hooks/useMilestones";

export default function Analytics() {
  const { data: projects, isLoading: pL } = useProjects();
  const { data: tasks, isLoading: tL } = useTasks();
  const { data: milestones, isLoading: mL } = useMilestones();

  const isLoading = pL || tL || mL;

  if (isLoading) {
    return (
      <div className="mx-auto max-w-7xl space-y-6">
        <PageHeader
          title="Analytics"
          description="Track your productivity and progress."
        />
        <div className="flex justify-center py-16">
          <Spinner size={24} className="text-brand-400" />
        </div>
      </div>
    );
  }

  const allProjects = projects ?? [];
  const allTasks = tasks ?? [];
  const allMilestones = milestones ?? [];

  const hasData =
    allTasks.length > 0 || allProjects.length > 0 || allMilestones.length > 0;

  if (!hasData) {
    return (
      <div className="mx-auto max-w-7xl space-y-6">
        <PageHeader
          title="Analytics"
          description="Track your productivity and progress."
        />
        <EmptyState
          icon={TrendingUp}
          title="Not enough activity yet"
          description="Complete a few tasks to unlock meaningful insights about how you work."
        />
      </div>
    );
  }

  // Completion ratios, shown as rings for at-a-glance comparison.
  const taskRate =
    allTasks.length > 0
      ? (allTasks.filter((t) => t.status === "completed").length /
          allTasks.length) *
        100
      : 0;
  const projectRate =
    allProjects.length > 0
      ? (allProjects.filter((p) => p.status === "completed").length /
          allProjects.length) *
        100
      : 0;
  const milestoneRate =
    allMilestones.length > 0
      ? (allMilestones.filter((m) => m.status === "completed").length /
          allMilestones.length) *
        100
      : 0;

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <PageHeader
        title="Analytics"
        description="Your productivity intelligence — derived from real ATLAS activity."
      />

      <OverviewMetrics
        projects={allProjects}
        tasks={allTasks}
        milestones={allMilestones}
      />

      {/* Activity history — the widest view gets the most room */}
      <ActivityHeatmap tasks={allTasks} milestones={allMilestones} />

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <WeeklyActivity tasks={allTasks} milestones={allMilestones} />
        </div>
        <StreakCard tasks={allTasks} milestones={allMilestones} />
      </div>

      {/* Completion rings */}
      <div className="rounded-xl border border-border-primary bg-surface-secondary p-4">
        <h3 className="label-mono text-text-secondary">Completion</h3>
        <div className="mt-4 grid grid-cols-3 gap-4">
          {[
            { value: taskRate, caption: "tasks", tone: "accent" as const },
            { value: projectRate, caption: "projects", tone: "success" as const },
            { value: milestoneRate, caption: "roadmap", tone: "violet" as const },
          ].map((ring) => (
            <div key={ring.caption} className="flex justify-center">
              <ProgressRing
                value={ring.value}
                size={84}
                tone={ring.tone}
                caption={ring.caption}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <ProductivityBreakdown
          tasks={allTasks}
          projects={allProjects}
          milestones={allMilestones}
        />
        <NeedsAttention
          tasks={allTasks}
          milestones={allMilestones}
          projects={allProjects}
        />
      </div>

      <AnalyticsInsights
        tasks={allTasks}
        projects={allProjects}
        milestones={allMilestones}
      />
    </div>
  );
}
