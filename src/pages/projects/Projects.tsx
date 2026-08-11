import { useState } from "react";
import { FolderKanban, Plus } from "lucide-react";
import { toast } from "sonner";

import PageHeader from "../../components/ui/PageHeader";
import EmptyState from "../../components/ui/EmptyState";
import Spinner from "../../components/ui/Spinner";
import ProjectCard from "../../components/projects/ProjectCard";
import ProjectFilters from "../../components/projects/ProjectFilters";
import ProjectFormDialog from "../../components/projects/ProjectFormDialog";
import { useProjects, useDeleteProject } from "../../hooks/useProjects";
import { extractApiError } from "../../lib/api";
import type { Project, ProjectStatus } from "../../types";

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState<ProjectStatus | "all">("all");
  const [formOpen, setFormOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | undefined>();
  const { data: projects, isLoading, isError } = useProjects();
  const deleteMutation = useDeleteProject();

  const filtered =
    !projects
      ? []
      : activeFilter === "all"
        ? projects
        : projects.filter((p) => p.status === activeFilter);

  function handleEdit(project: Project) {
    setEditingProject(project);
    setFormOpen(true);
  }

  function handleCreate() {
    setEditingProject(undefined);
    setFormOpen(true);
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this project? This action cannot be undone.")) return;
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
            onClick={handleCreate}
            className="inline-flex items-center gap-2 rounded-lg bg-brand-600 px-3.5 py-2 text-xs font-medium text-white transition-colors hover:bg-brand-700 active:scale-[0.97]"
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
                onClick={handleCreate}
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
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

      <ProjectFormDialog
        open={formOpen}
        onClose={() => setFormOpen(false)}
        project={editingProject}
      />
    </div>
  );
}
