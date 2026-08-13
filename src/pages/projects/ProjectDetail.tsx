import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { ArrowLeft, Calendar, Pencil, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";

import SectionCard from "../../components/ui/SectionCard";
import Spinner from "../../components/ui/Spinner";
import EmptyState from "../../components/ui/EmptyState";
import ProgressBar from "../../components/ui/ProgressBar";
import StatusBadge from "../../components/ui/StatusBadge";
import PriorityIndicator from "../../components/ui/PriorityIndicator";
import TaskItem from "../../components/tasks/TaskItem";
import ProjectFormDialog from "../../components/projects/ProjectFormDialog";
import TaskFormDialog from "../../components/tasks/TaskFormDialog";
import { useProjects, useDeleteProject } from "../../hooks/useProjects";
import { useTasks, useUpdateTask, useDeleteTask } from "../../hooks/useTasks";
import { extractApiError } from "../../lib/api";
import type { ProjectStatus, Task } from "../../types";

const statusBadge: Record<ProjectStatus, { label: string; variant: "success" | "info" | "warning" | "muted" }> = {
  completed: { label: "Completed", variant: "success" },
  "in-progress": { label: "In Progress", variant: "info" },
  planning: { label: "Planning", variant: "warning" },
  "on-hold": { label: "On Hold", variant: "muted" },
};

export default function ProjectDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: projects, isLoading } = useProjects();
  const { data: tasks } = useTasks();
  const deleteMutation = useDeleteProject();
  const updateTaskMutation = useUpdateTask();
  const deleteTaskMutation = useDeleteTask();

  const [editOpen, setEditOpen] = useState(false);
  const [taskFormOpen, setTaskFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | undefined>();

  const project = projects?.find((p) => p.id === id);
  const relatedTasks = tasks?.filter((t) => t.projectId === id) ?? [];

  async function handleDelete() {
    if (!project) return;
    if (!confirm(`Delete "${project.title}"? This cannot be undone.`)) return;
    try {
      await deleteMutation.mutateAsync(project.id);
      toast.success("Project deleted.");
      navigate("/projects", { replace: true });
    } catch (error) {
      toast.error(extractApiError(error).message);
    }
  }

  async function handleTaskToggle(task: Task) {
    const newStatus = task.status === "completed" ? "todo" : "completed";
    try {
      await updateTaskMutation.mutateAsync({ id: task.id, payload: { status: newStatus } });
    } catch (error) {
      toast.error(extractApiError(error).message);
    }
  }

  async function handleTaskDelete(taskId: string) {
    try {
      await deleteTaskMutation.mutateAsync(taskId);
      toast.success("Task deleted.");
    } catch (error) {
      toast.error(extractApiError(error).message);
    }
  }

  function handleTaskEdit(task: Task) {
    setEditingTask(task);
    setTaskFormOpen(true);
  }

  function handleAddTask() {
    setEditingTask(undefined);
    setTaskFormOpen(true);
  }

  if (isLoading) {
    return (
      <div className="mx-auto max-w-7xl space-y-6">
        <div className="flex justify-center py-16"><Spinner size={24} className="text-brand-400" /></div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="mx-auto max-w-7xl space-y-6">
        <EmptyState
          icon={Trash2}
          title="Project not found"
          description="This project doesn't exist or you don't have access to it."
          action={
            <Link to="/projects" className="inline-flex items-center gap-2 rounded-lg bg-brand-600 px-4 py-2 text-xs font-medium text-white hover:bg-brand-700">
              <ArrowLeft size={14} /> Back to Projects
            </Link>
          }
        />
      </div>
    );
  }

  const badge = statusBadge[project.status];
  const completedRelated = relatedTasks.filter((t) => t.status === "completed").length;

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-text-muted">
        <Link to="/projects" className="transition-colors hover:text-text-secondary">Projects</Link>
        <span>/</span>
        <span className="text-text-secondary">{project.title}</span>
      </nav>

      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="text-xl font-semibold tracking-tight text-text-primary lg:text-2xl">{project.title}</h1>
            <StatusBadge label={badge.label} variant={badge.variant} size="md" />
          </div>
          <p className="text-sm leading-relaxed text-text-secondary">{project.description}</p>
        </div>
        <div className="flex shrink-0 gap-2">
          <button onClick={() => setEditOpen(true)} className="inline-flex items-center gap-1.5 rounded-lg border border-border-secondary bg-surface-tertiary px-3 py-2 text-xs font-medium text-text-secondary transition-colors hover:border-border-hover hover:text-text-primary">
            <Pencil size={12} /> Edit
          </button>
          <button onClick={handleDelete} className="inline-flex items-center gap-1.5 rounded-lg border border-error/30 bg-error/5 px-3 py-2 text-xs font-medium text-error transition-colors hover:bg-error/10">
            <Trash2 size={12} /> Delete
          </button>
        </div>
      </div>

      {/* Project info */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <InfoItem label="Priority"><PriorityIndicator priority={project.priority} showLabel /></InfoItem>
        <InfoItem label="Type">{project.type.charAt(0).toUpperCase() + project.type.slice(1)}</InfoItem>
        <InfoItem label="Progress"><ProgressBar value={project.progress} showLabel /></InfoItem>
        {project.deadline && (
          <InfoItem label="Deadline">
            <span className="flex items-center gap-1">
              <Calendar size={12} />
              {new Date(project.deadline).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
            </span>
          </InfoItem>
        )}
      </div>

      {/* Technologies */}
      {project.technologies.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {project.technologies.map((tech) => (
            <span key={tech} className="rounded-md border border-border-secondary bg-surface-tertiary px-2.5 py-1 text-xs text-text-secondary">{tech}</span>
          ))}
        </div>
      )}

      {/* Related Tasks */}
      <SectionCard
        title="Tasks"
        description={relatedTasks.length > 0 ? `${completedRelated}/${relatedTasks.length} completed` : undefined}
        action={
          <button onClick={handleAddTask} className="inline-flex items-center gap-1.5 rounded-lg bg-brand-600 px-3 py-1.5 text-[11px] font-medium text-white transition-colors hover:bg-brand-700">
            <Plus size={12} /> Add Task
          </button>
        }
        noPadding={relatedTasks.length > 0}
      >
        {relatedTasks.length === 0 ? (
          <p className="py-6 text-center text-xs text-text-muted">
            No tasks yet. Add a task to track work for this project.
          </p>
        ) : (
          <div className="divide-y divide-border-secondary px-2 py-2">
            {relatedTasks.map((task) => (
              <TaskItem key={task.id} task={task} onToggle={handleTaskToggle} onEdit={handleTaskEdit} onDelete={handleTaskDelete} />
            ))}
          </div>
        )}
      </SectionCard>

      {/* Dialogs */}
      <ProjectFormDialog open={editOpen} onClose={() => setEditOpen(false)} project={project} />
      <TaskFormDialog open={taskFormOpen} onClose={() => setTaskFormOpen(false)} task={editingTask} defaultProjectId={id} />
    </div>
  );
}

function InfoItem({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="rounded-lg border border-border-secondary bg-surface-secondary p-3">
      <p className="mb-1 text-[11px] font-medium uppercase tracking-wider text-text-muted">{label}</p>
      <div className="text-xs text-text-primary">{children}</div>
    </div>
  );
}
