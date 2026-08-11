import { useState } from "react";
import { FolderKanban, Plus } from "lucide-react";

import PageHeader from "../../components/ui/PageHeader";
import EmptyState from "../../components/ui/EmptyState";
import ProjectCard from "../../components/projects/ProjectCard";
import ProjectFilters from "../../components/projects/ProjectFilters";
import { mockProjects } from "../../data/projects";
import type { ProjectStatus } from "../../types";

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState<ProjectStatus | "all">("all");

  const filtered =
    activeFilter === "all"
      ? mockProjects
      : mockProjects.filter((p) => p.status === activeFilter);

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <PageHeader
        title="Projects"
        description="Track and manage all your projects in one place."
        action={
          <button className="inline-flex items-center gap-2 rounded-lg bg-brand-600 px-3.5 py-2 text-xs font-medium text-white transition-colors hover:bg-brand-700 active:scale-[0.97]">
            <Plus size={14} />
            New Project
          </button>
        }
      />

      <ProjectFilters activeStatus={activeFilter} onStatusChange={setActiveFilter} />

      {filtered.length === 0 ? (
        <EmptyState
          icon={FolderKanban}
          title="No projects found"
          description="No projects match the current filter. Try a different filter or create a new project."
          action={
            <button className="rounded-lg bg-brand-600 px-4 py-2 text-xs font-medium text-white hover:bg-brand-700">
              Create Project
            </button>
          }
        />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {filtered.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}
    </div>
  );
}
