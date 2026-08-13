import { TrendingUp } from "lucide-react";

import PageHeader from "../../components/ui/PageHeader";
import Spinner from "../../components/ui/Spinner";
import EmptyState from "../../components/ui/EmptyState";
import OverviewMetrics from "../../components/analytics/OverviewMetrics";
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
        <PageHeader title="Analytics" description="Track your productivity and progress." />
        <div className="flex justify-center py-16">
          <Spinner size={24} className="text-brand-400" />
        </div>
      </div>
    );
  }

  const hasData = (tasks?.length ?? 0) > 0 || (projects?.length ?? 0) > 0 || (milestones?.length ?? 0) > 0;

  if (!hasData) {
    return (
      <div className="mx-auto max-w-7xl space-y-6">
        <PageHeader title="Analytics" description="Track your productivity and progress." />
        <EmptyState
          icon={TrendingUp}
          title="Not enough activity yet"
          description="Complete your first task or create a project to start building your productivity history."
        />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <PageHeader title="Analytics" description="Your productivity intelligence — derived from real ATLAS activity." />

      <OverviewMetrics projects={projects ?? []} tasks={tasks ?? []} milestones={milestones ?? []} />

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <WeeklyActivity tasks={tasks ?? []} milestones={milestones ?? []} />
        </div>
        <StreakCard tasks={tasks ?? []} milestones={milestones ?? []} />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <ProductivityBreakdown tasks={tasks ?? []} projects={projects ?? []} milestones={milestones ?? []} />
        <NeedsAttention tasks={tasks ?? []} milestones={milestones ?? []} projects={projects ?? []} />
      </div>

      <AnalyticsInsights tasks={tasks ?? []} projects={projects ?? []} milestones={milestones ?? []} />
    </div>
  );
}
