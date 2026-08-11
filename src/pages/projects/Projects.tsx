import { useState } from "react";
import { FolderKanban, Plus } from "lucide-react";
import { toast } from "sonner";

import PageHeader from "../../components/ui/PageHeader";
import EmptyState from "../../components/ui/EmptyState";
import Spinner from "../../components/ui/Spinner";
import ProjectCard from "../../components/projects/ProjectCard";
import ProjectFilters from "../../components/projects/ProjectFilters";
import { useProjects, useCreateProject, useDeleteProject } from "../../hooks/useProjects";
import { extractApiError } from "../../lib/api";
import type { ProjectStatus } from "../../types";

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState<ProjectStatus | "all">("all");
  const { data: projects, isLoading, isError } = useProjects();
  const createMutation = useCreateProject();
  const deleteMutation = useDeleteProject();

  const filtered =
    !projects
      ? []
      : activeFilter === "all"
        ? projects
        : projects.filter((p) => p.status === activeFilter);

  async function handleCreateProject() {
    try {
      await createMutation.mutateAsync({
        title: "New Project",
        description: "Describe your project here...",
        status: "planning",
        priority: "medium",
      });
      toast.success("Project created!");
    } catch (error) {
      toast.error(extractApiError(error).message);
    }
  }

  async function handleDeleteProject(id: string) {
    try {
      await deleteMutation.mutateAsync(id);
      toast.success("Project deleted.");
    } catch (error) {
      toast.error(extractApiError(error).message);
    }
  }

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <PageHeader
        title="Projects"
        description="Track and manage all your projects in one place."
        action={
          <button
            onClick={handleCreateProject}
            disabled={createMutation.isPending}
            className="inline-flex items-center gap-2 rounded-lg bg-brand-600 px-3.5 py-2 text-xs font-medium text-white transition-colors hover:bg-brand-700 active:scale-[0.97] disabled:opacity-60"
          >
            <Plus size={14} />
            New Project
          </button>
        }
      />

      <ProjectFilters activeStatus={activeFilter} onStatusChange={setActiveFilter} />

      {isLoading ? (
        <div className="flex justify-center py-16">
          <Spinner size={24} className="text-brand-400" />
        </div>
      ) : isError ? (
        <EmptyState
          icon={FolderKanban}
          title="Could not load projects"
          description="The server may be unavailable. Please try again later."
        />
      ) : filtered.length === 0 ? (
        <EmptyState
          icon={FolderKanban}
          title="No projects found"
          description={
            activeFilter === "all"
              ? "Create your first project to get started."
              : "No projects match the current filter."
          }
          action={
            activeFilter === "all" ? (
              <button
                onClick={handleCreateProject}
                className="rounded-lg bg-brand-600 px-4 py-2 text-xs font-medium text-white hover:bg-brand-700"
              >
                Create Project
              </button>
            ) : undefined
          }
        />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {filtered.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onDelete={handleDeleteProject}
            />
          ))}
        </div>
      )}
    </div>
  );
}
