import { useState } from "react";
import { FolderKanban, Plus } from "lucide-react";
import { toast } from "sonner";

import PageHeader from "../../components/ui/PageHeader";
import EmptyState from "../../components/ui/EmptyState";
import { CardSkeleton } from "../../components/ui/Skeleton";
import ProjectCard from "../../components/projects/ProjectCard";
import ProjectFilters from "../../components/projects/ProjectFilters";
import ProjectFormDialog from "../../components/projects/ProjectFormDialog";
import ConfirmDialog from "../../components/ui/ConfirmDialog";
import { useProjects, useDeleteProject } from "../../hooks/useProjects";
import { useTasks } from "../../hooks/useTasks";
import { extractApiError } from "../../lib/api";
import type { Project, ProjectStatus } from "../../types";
import PageContainer from "../../components/ui/PageContainer";
import { buttonClasses } from "../../lib/buttonStyles";

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState<ProjectStatus | "all">("all");
  const [formOpen, setFormOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | undefined>();
  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);
  const { data: projects, isLoading, isError } = useProjects();
  const { data: tasks } = useTasks();
  const deleteMutation = useDeleteProject();

  const filtered = !projects
    ? []
    : activeFilter === "all"
      ? projects
      : projects.filter((p) => p.status === activeFilter);

  const pendingDeleteTitle =
    projects?.find((p) => p.id === pendingDeleteId)?.title ?? null;

  function handleEdit(project: Project) {
    setEditingProject(project);
    setFormOpen(true);
  }

  function handleCreate() {
    setEditingProject(undefined);
    setFormOpen(true);
  }

  function requestDelete(id: string) {
    setPendingDeleteId(id);
  }

  async function confirmDelete() {
    if (!pendingDeleteId) return;
    try {
      await deleteMutation.mutateAsync(pendingDeleteId);
      toast.success("Project deleted.");
      setPendingDeleteId(null);
    } catch (error) {
      toast.error(extractApiError(error).message);
      setPendingDeleteId(null);
    }
  }

  return (
    <PageContainer>
      <PageHeader
        title="Projects"
        description="Track and manage all your projects in one place."
        action={
          <button
            onClick={handleCreate}
            className={buttonClasses()}
          >
            <Plus size={14} strokeWidth={2} />
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
                className={buttonClasses()}
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
                onDelete={requestDelete}
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

      <ConfirmDialog
        open={pendingDeleteId !== null}
        title="Delete project"
        description={
          pendingDeleteTitle
            ? `"${pendingDeleteTitle}" and its link to any related tasks will be removed. This cannot be undone.`
            : "This project will be permanently removed. This cannot be undone."
        }
        confirmLabel="Delete"
        isPending={deleteMutation.isPending}
        onConfirm={confirmDelete}
        onCancel={() => setPendingDeleteId(null)}
      />
    </PageContainer>
  );

}
