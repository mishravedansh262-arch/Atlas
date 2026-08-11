import { useState } from "react";
import { toast } from "sonner";

import Dialog from "../ui/Dialog";
import Spinner from "../ui/Spinner";
import { useCreateProject, useUpdateProject } from "../../hooks/useProjects";
import { extractApiError } from "../../lib/api";
import type { Project } from "../../types";

type Props = {
  open: boolean;
  onClose: () => void;
  project?: Project; // If provided, we're editing
};

export default function ProjectFormDialog({ open, onClose, project }: Props) {
  const isEditing = !!project;
  const createMutation = useCreateProject();
  const updateMutation = useUpdateProject();
  const isPending = createMutation.isPending || updateMutation.isPending;

  const [title, setTitle] = useState(project?.title ?? "");
  const [description, setDescription] = useState(project?.description ?? "");
  const [status, setStatus] = useState(project?.status ?? "planning");
  const [priority, setPriority] = useState(project?.priority ?? "medium");
  const [type, setType] = useState(project?.type ?? "personal");
  const [technologies, setTechnologies] = useState(project?.technologies.join(", ") ?? "");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const techArray = technologies.split(",").map((t) => t.trim()).filter(Boolean);

    try {
      if (isEditing) {
        await updateMutation.mutateAsync({
          id: project.id,
          payload: { title, description, status, priority, type, technologies: techArray },
        });
        toast.success("Project updated!");
      } else {
        await createMutation.mutateAsync({
          title,
          description,
          status,
          priority,
          type,
          technologies: techArray,
        });
        toast.success("Project created!");
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
      title={isEditing ? "Edit Project" : "New Project"}
      description={isEditing ? "Update your project details." : "Create a new project to track."}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className={labelClass}>Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Project title"
            required
            className={inputClass}
          />
        </div>

        <div>
          <label className={labelClass}>Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="What is this project about?"
            required
            rows={3}
            className={inputClass + " resize-none"}
          />
        </div>

        <div className="grid grid-cols-3 gap-3">
          <div>
            <label className={labelClass}>Status</label>
            <select value={status} onChange={(e) => setStatus(e.target.value as Project["status"])} className={inputClass}>
              <option value="planning">Planning</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
              <option value="on-hold">On Hold</option>
            </select>
          </div>
          <div>
            <label className={labelClass}>Priority</label>
            <select value={priority} onChange={(e) => setPriority(e.target.value as Project["priority"])} className={inputClass}>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
              <option value="critical">Critical</option>
            </select>
          </div>
          <div>
            <label className={labelClass}>Type</label>
            <select value={type} onChange={(e) => setType(e.target.value as Project["type"])} className={inputClass}>
              <option value="personal">Personal</option>
              <option value="academic">Academic</option>
              <option value="open-source">Open Source</option>
              <option value="freelance">Freelance</option>
            </select>
          </div>
        </div>

        <div>
          <label className={labelClass}>Technologies (comma-separated)</label>
          <input
            type="text"
            value={technologies}
            onChange={(e) => setTechnologies(e.target.value)}
            placeholder="React, TypeScript, Node.js"
            className={inputClass}
          />
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
            disabled={isPending || !title.trim() || !description.trim()}
            className="inline-flex items-center gap-2 rounded-lg bg-brand-600 px-4 py-2 text-xs font-medium text-white transition-colors hover:bg-brand-700 disabled:opacity-60"
          >
            {isPending && <Spinner />}
            {isEditing ? "Save Changes" : "Create Project"}
          </button>
        </div>
      </form>
    </Dialog>
  );
}
