import { Lightbulb } from "lucide-react";

import SectionCard from "../ui/SectionCard";
import type { Milestone, Project, Task } from "../../types";

type Props = {
  tasks: Task[];
  projects: Project[];
  milestones: Milestone[];
};

/**
 * Generates deterministic insights from real data.
 * Only returns insights supported by actual values.
 */
function generateInsights(tasks: Task[], projects: Project[], milestones: Milestone[]): string[] {
  const insights: string[] = [];
  const now = new Date();

  // Tasks completed this week
  const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  const tasksThisWeek = tasks.filter(
    (t) => t.completedAt && new Date(t.completedAt) >= weekAgo,
  ).length;
  if (tasksThisWeek > 0) {
    insights.push(`You completed ${tasksThisWeek} task${tasksThisWeek > 1 ? "s" : ""} this week.`);
  }

  // Most active project (by task count)
  const projectTaskCounts = new Map<string, number>();
  tasks.forEach((t) => {
    if (t.projectTitle) {
      projectTaskCounts.set(t.projectTitle, (projectTaskCounts.get(t.projectTitle) ?? 0) + 1);
    }
  });
  if (projectTaskCounts.size > 0) {
    const [topProject] = [...projectTaskCounts.entries()].sort((a, b) => b[1] - a[1])[0]!;
    insights.push(`Your most active project is "${topProject}".`);
  }

  // Overdue count
  const overdueTasks = tasks.filter(
    (t) => t.status !== "completed" && t.dueDate && new Date(t.dueDate) < now,
  ).length;
  const overdueMilestones = milestones.filter(
    (m) => m.status !== "completed" && m.targetDate && new Date(m.targetDate) < now,
  ).length;
  const totalOverdue = overdueTasks + overdueMilestones;
  if (totalOverdue > 0) {
    insights.push(`You have ${totalOverdue} overdue item${totalOverdue > 1 ? "s" : ""} that need attention.`);
  }

  // Completion rate
  const completionRate = tasks.length > 0 ? Math.round((tasks.filter((t) => t.status === "completed").length / tasks.length) * 100) : 0;
  if (tasks.length >= 5) {
    if (completionRate >= 75) {
      insights.push(`Strong completion rate at ${completionRate}%. Keep it up!`);
    } else if (completionRate < 40) {
      insights.push(`Your task completion rate is ${completionRate}%. Consider focusing on finishing existing tasks.`);
    }
  }

  // Milestone progress
  const completedMilestones = milestones.filter((m) => m.status === "completed").length;
  if (completedMilestones > 0) {
    insights.push(`You've reached ${completedMilestones} milestone${completedMilestones > 1 ? "s" : ""} on your roadmap.`);
  }

  // Active projects
  const activeProjects = projects.filter((p) => p.status === "in-progress").length;
  if (activeProjects > 3) {
    insights.push(`You have ${activeProjects} projects in progress. Consider focusing to complete some.`);
  }

  return insights.slice(0, 4); // Max 4 insights
}

export default function AnalyticsInsights({ tasks, projects, milestones }: Props) {
  const insights = generateInsights(tasks, projects, milestones);

  if (insights.length === 0) return null;

  return (
    <SectionCard title="Insights" description="Based on your real activity">
      <div className="space-y-2.5">
        {insights.map((insight, idx) => (
          <div key={idx} className="flex items-start gap-2.5">
            <Lightbulb size={13} className="mt-0.5 shrink-0 text-brand-400" />
            <p className="text-xs text-text-secondary">{insight}</p>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}
