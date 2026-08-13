import { useState } from "react";
import { FolderKanban, Plus } from "lucide-react";
import { toast } from "sonner";

import PageHeader from "../../components/ui/PageHeader";
import EmptyState from "../../components/ui/EmptyState";
import { CardSkeleton } from "../../components/ui/Skeleton";
import ProjectCard from "../../components/projects/ProjectCard";
import ProjectFilters from "../../components/projects/ProjectFilters";
import ProjectFormDialog from "../../components/projects/ProjectFormDialog";
import { useProjects, useDeleteProject } from "../../hooks/useProjects";
import { useTasks } from "../../hooks/useTasks";
import { extractApiError } from "../../lib/api";
import type { Project, ProjectStatus } from "../../types";

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState<ProjectStatus | "all">("all");
  const [formOpen, setFormOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | undefined>();
  const { data: projects, isLoading, isError } = useProjects();
  const { data: tasks } = useTasks();
  const deleteMutation = useDeleteProject();

  const filtered = !projects
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
            className="label-mono inline-flex items-center gap-2 rounded-lg bg-brand-500 px-3.5 py-2 text-white transition-colors hover:bg-brand-500 active:scale-[0.98]"
          >
            <Plus size={13} strokeWidth={2} />
            New Project
          </button>
        }
      />

      <ProjectFilters
        activeStatus={activeFilter}
        onStatusChange={setActiveFilter}
      />

      {isLoading ? (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <CardSkeleton key={i} />
          ))}
        </div>
      ) : isError ? (
        <EmptyState
          icon={FolderKanban}
          title="Could not load projects"
          description="We couldn't reach the server. Check your connection and try again."
        />
      ) : filtered.length === 0 ? (
        <EmptyState
          icon={FolderKanban}
          title={
            activeFilter === "all"
              ? "Your workspace is empty"
              : "Nothing matches this filter"
          }
          description={
            activeFilter === "all"
              ? "Create your first project and start building."
              : "Try a different status filter to see more projects."
          }
          action={
            activeFilter === "all" ? (
              <button
                onClick={handleCreate}
                className="label-mono rounded-lg bg-brand-500 px-4 py-2 text-white transition-colors hover:bg-brand-500"
              >
                Create Project
              </button>
            ) : undefined
          }
        />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {filtered.map((project) => {
            const projectTasks = tasks?.filter((t) => t.projectId === project.id);
            return (
              <ProjectCard
                key={project.id}
                project={project}
                taskCount={projectTasks?.length}
                completedTaskCount={
                  projectTasks?.filter((t) => t.status === "completed").length
                }
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            );
          })}
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
