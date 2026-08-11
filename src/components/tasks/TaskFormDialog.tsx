import { useState } from "react";
import { toast } from "sonner";

import Dialog from "../ui/Dialog";
import Spinner from "../ui/Spinner";
import { useCreateTask, useUpdateTask } from "../../hooks/useTasks";
import { useProjects } from "../../hooks/useProjects";
import { extractApiError } from "../../lib/api";
import type { Task } from "../../types";

type Props = {
  open: boolean;
  onClose: () => void;
  task?: Task; // If provided, we're editing
};

export default function TaskFormDialog({ open, onClose, task }: Props) {
  const isEditing = !!task;
  const createMutation = useCreateTask();
  const updateMutation = useUpdateTask();
  const { data: projects } = useProjects();
  const isPending = createMutation.isPending || updateMutation.isPending;

  const [title, setTitle] = useState(task?.title ?? "");
  const [description, setDescription] = useState(task?.description ?? "");
  const [priority, setPriority] = useState(task?.priority ?? "medium");
  const [category, setCategory] = useState(task?.category ?? "personal");
  const [dueDate, setDueDate] = useState(task?.dueDate?.split("T")[0] ?? "");
  const [projectId, setProjectId] = useState(task?.projectId ?? "");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const payload = {
      title,
      description: description || undefined,
      priority,
      category,
      dueDate: dueDate ? new Date(dueDate).toISOString() : undefined,
      project: projectId || undefined,
    };

    try {
      if (isEditing) {
        await updateMutation.mutateAsync({ id: task.id, payload });
        toast.success("Task updated!");
      } else {
        await createMutation.mutateAsync(payload);
        toast.success("Task created!");
      }
      onClose();
    } catch (error) {
      toast.error(extractApiError(error).message);
    }
  }

  const inputClass = "w-full rounded-lg border border-border-secondary bg-surface-tertiary px-3 py-2 text-sm text-text-primary outline-none transition-colors placeholder:text-text-muted focus:border-brand-500 focus:ring-1 focus:ring-brand-500";
  const labelClass = "mb-1.5 block text-xs font-medium text-text-secondary";

  return (
    <Dialog
      open={open}
      onClose={onClose}
      title={isEditing ? "Edit Task" : "New Task"}
      description={isEditing ? "Update task details." : "Add a task to track your progress."}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className={labelClass}>Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="What needs to be done?"
            required
            className={inputClass}
          />
        </div>

        <div>
          <label className={labelClass}>Description (optional)</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Additional details..."
            rows={2}
            className={inputClass + " resize-none"}
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className={labelClass}>Priority</label>
            <select value={priority} onChange={(e) => setPriority(e.target.value as Task["priority"])} className={inputClass}>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
              <option value="critical">Critical</option>
            </select>
          </div>
          <div>
            <label className={labelClass}>Category</label>
            <select value={category} onChange={(e) => setCategory(e.target.value as Task["category"])} className={inputClass}>
              <option value="personal">Personal</option>
              <option value="learning">Learning</option>
              <option value="project">Project</option>
              <option value="career">Career</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className={labelClass}>Due Date (optional)</label>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Project (optional)</label>
            <select value={projectId} onChange={(e) => setProjectId(e.target.value)} className={inputClass}>
              <option value="">None</option>
              {projects?.map((p) => (
                <option key={p.id} value={p.id}>{p.title}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex justify-end gap-2 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg px-4 py-2 text-xs font-medium text-text-secondary hover:text-text-primary"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isPending || !title.trim()}
            className="inline-flex items-center gap-2 rounded-lg bg-brand-600 px-4 py-2 text-xs font-medium text-white transition-colors hover:bg-brand-700 disabled:opacity-60"
          >
            {isPending && <Spinner />}
            {isEditing ? "Save Changes" : "Add Task"}
          </button>
        </div>
      </form>
    </Dialog>
  );
}
