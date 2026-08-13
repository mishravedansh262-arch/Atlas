import { cn } from "../../lib/cn";
import { useProjects } from "../../hooks/useProjects";
import { useTasks } from "../../hooks/useTasks";
import { useMilestones } from "../../hooks/useMilestones";

export default function ProgressOverview() {
  const { data: projects } = useProjects();
  const { data: tasks } = useTasks();
  const { data: milestones } = useMilestones();

  const totalProjects = projects?.length ?? 0;
  const completedProjects = projects?.filter((p) => p.status === "completed").length ?? 0;
  const totalTasks = tasks?.length ?? 0;
  const completedTasks = tasks?.filter((t) => t.status === "completed").length ?? 0;
  const totalMilestones = milestones?.length ?? 0;
  const completedMilestones = milestones?.filter((m) => m.status === "completed").length ?? 0;

  const progressItems = [
    { label: "Projects", value: completedProjects, max: Math.max(totalProjects, 1), color: "bg-brand-500" },
    { label: "Tasks", value: completedTasks, max: Math.max(totalTasks, 1), color: "bg-success" },
    { label: "Milestones", value: completedMilestones, max: Math.max(totalMilestones, 1), color: "bg-warning" },
  ];

  return (
    <div className="rounded-xl border border-border-secondary bg-surface-secondary p-5">
      <h2 className="mb-4 text-sm font-semibold text-text-primary">Progress Overview</h2>
      <div className="space-y-4">
        {progressItems.map((item) => {
          const percentage = Math.round((item.value / item.max) * 100);
          return (
            <div key={item.label} className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs text-text-secondary">{item.label}</span>
                <span className="text-xs font-medium text-text-primary">{item.value}/{item.max}</span>
              </div>
              <div className="h-1.5 overflow-hidden rounded-full bg-surface-overlay">
                <div className={cn("h-full rounded-full transition-all duration-500", item.color)} style={{ width: `${percentage}%` }} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
