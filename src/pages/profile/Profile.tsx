import { Calendar, FolderKanban, CheckSquare, Target } from "lucide-react";

import PageHeader from "../../components/ui/PageHeader";
import SectionCard from "../../components/ui/SectionCard";
import { useAuth } from "../../hooks/useAuth";
import { useProjects } from "../../hooks/useProjects";
import { useTasks } from "../../hooks/useTasks";

export default function Profile() {
  const { user } = useAuth();
  const { data: projects } = useProjects();
  const { data: tasks } = useTasks();

  const completedProjects = projects?.filter((p) => p.status === "completed").length ?? 0;
  const completedTasks = tasks?.filter((t) => t.status === "completed").length ?? 0;
  const totalProjects = projects?.length ?? 0;

  // Derive unique technologies from projects
  const allTech = projects?.flatMap((p) => p.technologies) ?? [];
  const uniqueSkills = [...new Set(allTech)].slice(0, 12);

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <PageHeader title="Profile" />

      {/* Hero card */}
      <div className="rounded-xl border border-border-secondary bg-surface-secondary p-6">
        <div className="flex flex-col items-start gap-5 sm:flex-row sm:items-center">
          <img
            src={user?.avatar ?? ""}
            alt={user?.name ?? "User"}
            className="size-16 rounded-full ring-2 ring-border-secondary"
          />
          <div className="min-w-0 flex-1">
            <h2 className="text-lg font-semibold text-text-primary">{user?.name}</h2>
            <p className="text-sm text-text-secondary">{user?.email}</p>
          </div>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {[
          { icon: FolderKanban, label: "Projects", value: totalProjects },
          { icon: CheckSquare, label: "Tasks Done", value: completedTasks },
          { icon: Target, label: "Completed Projects", value: completedProjects },
        ].map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="flex items-center gap-3 rounded-xl border border-border-secondary bg-surface-secondary p-4"
            >
              <div className="rounded-lg bg-surface-elevated p-2 text-text-tertiary">
                <Icon size={16} />
              </div>
              <div>
                <p className="text-lg font-bold text-text-primary">{stat.value}</p>
                <p className="text-[11px] text-text-muted">{stat.label}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Skills from projects */}
      {uniqueSkills.length > 0 && (
        <SectionCard title="Skills" description="Technologies from your projects">
          <div className="flex flex-wrap gap-1.5">
            {uniqueSkills.map((skill) => (
              <span
                key={skill}
                className="rounded-md border border-border-secondary bg-surface-tertiary px-2.5 py-1 text-xs text-text-secondary"
              >
                {skill}
              </span>
            ))}
          </div>
        </SectionCard>
      )}

      {/* Journey info */}
      <SectionCard title="Journey">
        <div className="flex items-center gap-2 text-xs text-text-secondary">
          <Calendar size={13} className="text-text-muted" />
          <span>Using ATLAS to track {totalProjects} projects and {completedTasks} completed tasks.</span>
        </div>
      </SectionCard>
    </div>
  );
}
