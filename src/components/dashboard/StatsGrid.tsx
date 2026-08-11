import { FolderKanban, CheckSquare, Target, TrendingUp } from "lucide-react";

import StatCard from "./StatCard";

export default function StatsGrid() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <StatCard
        title="Active Projects"
        value="4"
        subtitle="2 due this week"
        icon={FolderKanban}
        trend={{ value: "+1 this week", positive: true }}
        accentColor="text-brand-400"
      />
      <StatCard
        title="Tasks Completed"
        value="28"
        subtitle="of 41 total"
        icon={CheckSquare}
        trend={{ value: "68% completion", positive: true }}
        accentColor="text-success"
      />
      <StatCard
        title="Goals On Track"
        value="5"
        subtitle="3 milestones ahead"
        icon={Target}
        trend={{ value: "All on schedule", positive: true }}
        accentColor="text-warning"
      />
      <StatCard
        title="Productivity"
        value="87%"
        subtitle="Based on weekly targets"
        icon={TrendingUp}
        trend={{ value: "+12% vs last week", positive: true }}
        accentColor="text-brand-300"
      />
    </div>
  );
}
