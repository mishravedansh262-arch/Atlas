import SectionCard from "../ui/SectionCard";
import ProgressBar from "../ui/ProgressBar";
import type { Milestone, Project, Task } from "../../types";

type Props = {
  tasks: Task[];
  projects: Project[];
  milestones: Milestone[];
};

export default function ProductivityBreakdown({ tasks, projects, milestones }: Props) {
  const totalTasks = tasks.length;

  // Tasks by category
  const taskCategories = ["learning", "project", "career", "personal"].map((cat) => ({
    name: cat.charAt(0).toUpperCase() + cat.slice(1),
    count: tasks.filter((t) => t.category === cat).length,
    completed: tasks.filter((t) => t.category === cat && t.status === "completed").length,
  })).filter((c) => c.count > 0);

  // Milestones by category
  const milestoneCategories = ["academics", "skills", "projects", "career"].map((cat) => ({
    name: cat.charAt(0).toUpperCase() + cat.slice(1),
    count: milestones.filter((m) => m.category === cat).length,
    completed: milestones.filter((m) => m.category === cat && m.status === "completed").length,
  })).filter((c) => c.count > 0);

  // Project status
  const projectStatuses = [
    { name: "In Progress", count: projects.filter((p) => p.status === "in-progress").length, color: "bg-brand-500" },
    { name: "Planning", count: projects.filter((p) => p.status === "planning").length, color: "bg-warning" },
    { name: "Completed", count: projects.filter((p) => p.status === "completed").length, color: "bg-success" },
    { name: "On Hold", count: projects.filter((p) => p.status === "on-hold").length, color: "bg-text-muted" },
  ].filter((s) => s.count > 0);

  return (
    <SectionCard title="Productivity Breakdown" description="How your work is distributed">
      <div className="space-y-5">
        {/* Tasks by category */}
        {taskCategories.length > 0 && (
          <div>
            <p className="mb-2 text-[11px] font-medium uppercase tracking-wider text-text-muted">Tasks by Category</p>
            <div className="space-y-2.5">
              {taskCategories.map((cat) => (
                <div key={cat.name} className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-text-secondary">{cat.name}</span>
                    <span className="text-[11px] text-text-muted">{cat.completed}/{cat.count}</span>
                  </div>
                  <ProgressBar value={totalTasks > 0 ? Math.round((cat.count / totalTasks) * 100) : 0} color="bg-brand-500" />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Projects by status */}
        {projectStatuses.length > 0 && (
          <div>
            <p className="mb-2 text-[11px] font-medium uppercase tracking-wider text-text-muted">Projects by Status</p>
            <div className="space-y-2">
              {projectStatuses.map((item) => (
                <div key={item.name} className="flex items-center justify-between rounded-lg bg-surface-tertiary px-3 py-2">
                  <span className="text-xs text-text-secondary">{item.name}</span>
                  <span className="text-xs font-bold text-text-primary">{item.count}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Milestones by category */}
        {milestoneCategories.length > 0 && (
          <div>
            <p className="mb-2 text-[11px] font-medium uppercase tracking-wider text-text-muted">Milestones by Category</p>
            <div className="space-y-2">
              {milestoneCategories.map((cat) => (
                <div key={cat.name} className="flex items-center justify-between rounded-lg bg-surface-tertiary px-3 py-2">
                  <span className="text-xs text-text-secondary">{cat.name}</span>
                  <span className="text-[11px] text-text-muted">{cat.completed}/{cat.count}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </SectionCard>
  );
}
