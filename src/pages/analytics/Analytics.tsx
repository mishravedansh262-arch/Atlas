import { Flame, Target, TrendingUp, Zap } from "lucide-react";

import PageHeader from "../../components/ui/PageHeader";
import SectionCard from "../../components/ui/SectionCard";
import ProgressBar from "../../components/ui/ProgressBar";
import StatCard from "../../components/dashboard/StatCard";
import { mockAnalytics } from "../../data/analytics";

export default function Analytics() {
  const { completedTasks, totalTasks, completedProjects, totalProjects, currentStreak, longestStreak, weeklyActivity, skillProgress } = mockAnalytics;

  const taskCompletion = Math.round((completedTasks / totalTasks) * 100);
  const projectCompletion = Math.round((completedProjects / totalProjects) * 100);
  const maxTasks = Math.max(...weeklyActivity.map((d) => d.tasks));

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <PageHeader
        title="Analytics"
        description="Track your productivity, skill development, and overall progress."
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
          title="Current Streak"
          value={`${currentStreak} days`}
          subtitle={`Longest: ${longestStreak} days`}
          icon={Flame}
          accentColor="text-warning"
        />
        <StatCard
          title="Weekly Output"
          value={`${weeklyActivity.reduce((a, d) => a + d.tasks, 0)}`}
          subtitle="Tasks this week"
          icon={Zap}
          accentColor="text-brand-300"
        />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        {/* Weekly Activity */}
        <SectionCard title="Weekly Activity" description="Tasks completed each day">
          <div className="flex items-end justify-between gap-2 pt-2" style={{ height: 120 }}>
            {weeklyActivity.map((day) => {
              const height = maxTasks > 0 ? (day.tasks / maxTasks) * 100 : 0;
              return (
                <div key={day.day} className="flex flex-1 flex-col items-center gap-1">
                  <span className="text-[10px] font-medium text-text-secondary">{day.tasks}</span>
                  <div className="flex w-full justify-center">
                    <div
                      className="w-6 rounded-t bg-brand-500/80 transition-all duration-300 hover:bg-brand-400"
                      style={{ height: `${Math.max(height, 4)}%` }}
                    />
                  </div>
                  <span className="text-[10px] text-text-muted">{day.day}</span>
                </div>
              );
            })}
          </div>
        </SectionCard>

        {/* Skill Progress */}
        <SectionCard title="Skill Development" description="Proficiency across key areas">
          <div className="space-y-4 pt-1">
            {skillProgress.map((skill) => (
              <div key={skill.name} className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-text-secondary">{skill.name}</span>
                  <span className="text-[11px] font-medium text-text-primary">{skill.level}%</span>
                </div>
                <ProgressBar
                  value={skill.level}
                  color={skill.level >= 70 ? "bg-success" : skill.level >= 50 ? "bg-brand-500" : "bg-warning"}
                />
              </div>
            ))}
          </div>
        </SectionCard>
      </div>
    </div>
  );
}
