import StatCard from "./StatCard";

export default function StatsGrid() {
  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
      <StatCard title="Projects" value="12" />
      <StatCard title="Tasks" value="87" />
      <StatCard title="Completed" value="41" />
      <StatCard title="Productivity" value="91%" />
    </div>
  );
}