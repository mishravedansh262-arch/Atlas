import { useState } from "react";
import { CheckSquare, Plus } from "lucide-react";
import { toast } from "sonner";

import PageHeader from "../../components/ui/PageHeader";
import SectionCard from "../../components/ui/SectionCard";
import EmptyState from "../../components/ui/EmptyState";
import Spinner from "../../components/ui/Spinner";
import TaskItem from "../../components/tasks/TaskItem";
import TaskFilters, { type TaskView } from "../../components/tasks/TaskFilters";
import TaskFormDialog from "../../components/tasks/TaskFormDialog";
import { useTasks, useUpdateTask, useDeleteTask } from "../../hooks/useTasks";
import { extractApiError } from "../../lib/api";
import type { Task } from "../../types";

function isToday(dateStr?: string): boolean {
  if (!dateStr) return false;
  const d = new Date(dateStr);
  const now = new Date();
  return d.toDateString() === now.toDateString();
}

function isUpcoming(dateStr?: string): boolean {
  if (!dateStr) return false;
  return new Date(dateStr) > new Date();
}

function filterTasks(tasks: Task[], view: TaskView): Task[] {
  switch (view) {
    case "today":
      return tasks.filter((t) => isToday(t.dueDate) && t.status !== "completed");
    case "upcoming":
      return tasks.filter((t) => isUpcoming(t.dueDate) && t.status !== "completed");
    case "completed":
      return tasks.filter((t) => t.status === "completed");
    default:
      return tasks;
  }
}

export default function Tasks() {
  const [view, setView] = useState<TaskView>("all");
  const [formOpen, setFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | undefined>();
  const { data: tasks, isLoading, isError } = useTasks();
  const updateMutation = useUpdateTask();
  const deleteMutation = useDeleteTask();

  const allTasks = tasks ?? [];
  const filtered = filterTasks(allTasks, view);

  const counts: Record<TaskView, number> = {
    all: allTasks.length,
    today: filterTasks(allTasks, "today").length,
    upcoming: filterTasks(allTasks, "upcoming").length,
    completed: filterTasks(allTasks, "completed").length,
  };

  function handleCreate() {
    setEditingTask(undefined);
    setFormOpen(true);
  }

  function handleEdit(task: Task) {
    setEditingTask(task);
    setFormOpen(true);
  }

  async function handleToggle(task: Task) {
    const newStatus = task.status === "completed" ? "todo" : "completed";
    try {
      await updateMutation.mutateAsync({ id: task.id, payload: { status: newStatus } });
    } catch (error) {
      toast.error(extractApiError(error).message);
    }
  }

  async function handleDelete(id: string) {
    try {
      await deleteMutation.mutateAsync(id);
      toast.success("Task deleted.");
    } catch (error) {
      toast.error(extractApiError(error).message);
    }
  }

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <PageHeader
        title="Tasks"
        description="Stay on top of your daily work and long-term goals."
        action={
          <button
            onClick={handleCreate}
            className="inline-flex items-center gap-2 rounded-lg bg-brand-600 px-3.5 py-2 text-xs font-medium text-white transition-colors hover:bg-brand-700 active:scale-[0.97]"
          >
            <Plus size={14} />
            Add Task
          </button>
        }
      />

      <TaskFilters active={view} onChange={setView} counts={counts} />

      {isLoading ? (
        <div className="flex justify-center py-16">
          <Spinner size={24} className="text-brand-400" />
        </div>
      ) : isError ? (
        <EmptyState
          icon={CheckSquare}
          title="Could not load tasks"
          description="The server may be unavailable. Please try again later."
        />
      ) : filtered.length === 0 ? (
        <EmptyState
          icon={CheckSquare}
          title="No tasks here"
          description={
            view === "completed"
              ? "You haven't completed any tasks yet. Keep going!"
              : view === "all"
                ? "Create your first task to start tracking progress."
                : "All caught up for this view!"
          }
          action={
            view === "all" ? (
              <button onClick={handleCreate} className="rounded-lg bg-brand-600 px-4 py-2 text-xs font-medium text-white hover:bg-brand-700">
                Add Task
              </button>
            ) : undefined
          }
        />
      ) : (
        <SectionCard noPadding>
          <div className="divide-y divide-border-secondary px-2 py-2">
            {filtered.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                onToggle={handleToggle}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </div>
        </SectionCard>
      )}

      <TaskFormDialog
        open={formOpen}
        onClose={() => setFormOpen(false)}
        task={editingTask}
      />
    </div>
  );
}
