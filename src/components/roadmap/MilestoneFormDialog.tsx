import { useState } from "react";
import { toast } from "sonner";

import Dialog from "../ui/Dialog";
import Spinner from "../ui/Spinner";
import { useCreateMilestone, useUpdateMilestone } from "../../hooks/useMilestones";
import { useProjects } from "../../hooks/useProjects";
import { extractApiError } from "../../lib/api";
import type { Milestone } from "../../types";

type Props = {
  open: boolean;
  onClose: () => void;
  milestone?: Milestone;
};

export default function MilestoneFormDialog({ open, onClose, milestone }: Props) {
  const isEditing = !!milestone;
  const createMutation = useCreateMilestone();
  const updateMutation = useUpdateMilestone();
  const { data: projects } = useProjects();
  const isPending = createMutation.isPending || updateMutation.isPending;

  const [title, setTitle] = useState(milestone?.title ?? "");
  const [description, setDescription] = useState(milestone?.description ?? "");
  const [status, setStatus] = useState(milestone?.status ?? "not_started");
  const [category, setCategory] = useState(milestone?.category ?? "skills");
  const [priority, setPriority] = useState(milestone?.priority ?? "medium");
  const [progress, setProgress] = useState(String(milestone?.progress ?? 0));
  const [targetDate, setTargetDate] = useState(milestone?.targetDate?.split("T")[0] ?? "");
  const [projectId, setProjectId] = useState(milestone?.projectId ?? "");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const payload = {
      title,
      description: description || undefined,
      status,
      category,
      priority,
      progress: Number(progress),
      targetDate: targetDate ? new Date(targetDate).toISOString() : undefined,
      project: projectId || undefined,
    };

    try {
      if (isEditing) {
        await updateMutation.mutateAsync({ id: milestone.id, payload });
        toast.success("Milestone updated!");
      } else {
        await createMutation.mutateAsync(payload);
        toast.success("Milestone created!");
      }
      onClose();
    } catch (error) {
      toast.error(extractApiError(error).message);
    }
  }

  const inputClass = "w-full rounded-lg border border-border-primary bg-surface-tertiary px-3 py-2 text-sm text-text-primary outline-none transition-all placeholder:text-text-muted hover:border-border-hover focus:border-brand-500 focus:shadow-[0_0_0_2px_rgb(59_130_246/0.2)]";
  const labelClass = "label-mono mb-1.5 block text-text-secondary";

  return (
    <Dialog open={open} onClose={onClose} title={isEditing ? "Edit Milestone" : "New Milestone"} description={isEditing ? "Update milestone details." : "Add a milestone to your roadmap."}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className={labelClass}>Title</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Master React & TypeScript" required className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Description (optional)</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="What does completing this milestone mean?" rows={2} className={inputClass + " resize-none"} />
        </div>
        <div className="grid grid-cols-3 gap-3">
          <div>
            <label className={labelClass}>Status</label>
            <select value={status} onChange={(e) => setStatus(e.target.value as Milestone["status"])} className={inputClass}>
              <option value="not_started">Not Started</option>
              <option value="in_progress">In Progress</option>
              <option value="completed">Completed</option>
              <option value="blocked">Blocked</option>
            </select>
          </div>
          <div>
            <label className={labelClass}>Category</label>
            <select value={category} onChange={(e) => setCategory(e.target.value as Milestone["category"])} className={inputClass}>
              <option value="academics">Academics</option>
              <option value="skills">Skills</option>
              <option value="projects">Projects</option>
              <option value="career">Career</option>
            </select>
          </div>
          <div>
            <label className={labelClass}>Priority</label>
            <select value={priority} onChange={(e) => setPriority(e.target.value as Milestone["priority"])} className={inputClass}>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
              <option value="critical">Critical</option>
            </select>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-3">
          <div>
            <label className={labelClass}>Progress (%)</label>
            <input type="number" min={0} max={100} value={progress} onChange={(e) => setProgress(e.target.value)} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Target Date</label>
            <input type="date" value={targetDate} onChange={(e) => setTargetDate(e.target.value)} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Project (optional)</label>
            <select value={projectId} onChange={(e) => setProjectId(e.target.value)} className={inputClass}>
              <option value="">None</option>
              {projects?.map((p) => (<option key={p.id} value={p.id}>{p.title}</option>))}
            </select>
          </div>
        </div>
        <div className="flex justify-end gap-2 pt-2">
          <button type="button" onClick={onClose} className="rounded-lg px-4 py-2 text-xs font-medium text-text-secondary hover:text-text-primary">Cancel</button>
          <button type="submit" disabled={isPending || !title.trim()} className="inline-flex items-center gap-2 rounded-lg bg-brand-500 px-4 py-2 text-xs font-medium text-white transition-colors hover:bg-brand-600 disabled:opacity-60">
            {isPending && <Spinner />}
            {isEditing ? "Save Changes" : "Create Milestone"}
          </button>
        </div>
      </form>
    </Dialog>
  );
}
