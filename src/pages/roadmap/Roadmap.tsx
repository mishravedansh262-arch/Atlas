import { useState } from "react";
import { Calendar, CheckCircle2, Circle, Clock, AlertTriangle, Map, Pencil, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";

import PageHeader from "../../components/ui/PageHeader";
import EmptyState from "../../components/ui/EmptyState";
import Spinner from "../../components/ui/Spinner";
import StatusBadge from "../../components/ui/StatusBadge";
import ProgressBar from "../../components/ui/ProgressBar";
import PriorityIndicator from "../../components/ui/PriorityIndicator";
import MilestoneFormDialog from "../../components/roadmap/MilestoneFormDialog";
import { useMilestones, useUpdateMilestone, useDeleteMilestone } from "../../hooks/useMilestones";
import { extractApiError } from "../../lib/api";
import { cn } from "../../lib/cn";
import type { Milestone, MilestoneStatus } from "../../types";

const statusConfig: Record<MilestoneStatus, { icon: typeof Circle; color: string; label: string; badge: "muted" | "info" | "success" | "error" }> = {
  not_started: { icon: Circle, color: "text-text-muted", label: "Not Started", badge: "muted" },
  in_progress: { icon: Clock, color: "text-brand-400", label: "In Progress", badge: "info" },
  completed: { icon: CheckCircle2, color: "text-success", label: "Completed", badge: "success" },
  blocked: { icon: AlertTriangle, color: "text-error", label: "Blocked", badge: "error" },
};

function isOverdue(ms: Milestone): boolean {
  if (!ms.targetDate || ms.status === "completed") return false;
  return new Date(ms.targetDate) < new Date();
}

export default function Roadmap() {
  const { data: milestones, isLoading, isError } = useMilestones();
  const updateMutation = useUpdateMilestone();
  const deleteMutation = useDeleteMilestone();
  const [formOpen, setFormOpen] = useState(false);
  const [editingMilestone, setEditingMilestone] = useState<Milestone | undefined>();

  function handleCreate() { setEditingMilestone(undefined); setFormOpen(true); }
  function handleEdit(ms: Milestone) { setEditingMilestone(ms); setFormOpen(true); }

  async function handleDelete(id: string) {
    if (!confirm("Delete this milestone?")) return;
    try { await deleteMutation.mutateAsync(id); toast.success("Milestone deleted."); }
    catch (e) { toast.error(extractApiError(e).message); }
  }

  async function handleStatusToggle(ms: Milestone) {
    const next: MilestoneStatus = ms.status === "completed" ? "in_progress" : "completed";
    try { await updateMutation.mutateAsync({ id: ms.id, payload: { status: next } }); }
    catch (e) { toast.error(extractApiError(e).message); }
  }

  const all = milestones ?? [];
  const inProgress = all.filter((m) => m.status === "in_progress");
  const completed = all.filter((m) => m.status === "completed");
  const completionRate = all.length > 0 ? Math.round((completed.length / all.length) * 100) : 0;

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <PageHeader title="Roadmap" description="Your journey milestones — plan, track, and achieve." action={
        <button onClick={handleCreate} className="inline-flex items-center gap-2 rounded-lg bg-brand-600 px-3.5 py-2 text-xs font-medium text-white transition-colors hover:bg-brand-700 active:scale-[0.97]">
          <Plus size={14} /> Add Milestone
        </button>
      } />

      {/* Summary */}
      {all.length > 0 && (
        <div className="grid gap-3 sm:grid-cols-3">
          <div className="rounded-lg border border-border-secondary bg-surface-secondary p-4">
            <p className="text-[11px] font-medium uppercase tracking-wider text-text-muted">Total</p>
            <p className="mt-1 text-xl font-bold text-text-primary">{all.length}</p>
          </div>
          <div className="rounded-lg border border-border-secondary bg-surface-secondary p-4">
            <p className="text-[11px] font-medium uppercase tracking-wider text-text-muted">In Progress</p>
            <p className="mt-1 text-xl font-bold text-brand-400">{inProgress.length}</p>
          </div>
          <div className="rounded-lg border border-border-secondary bg-surface-secondary p-4">
            <p className="text-[11px] font-medium uppercase tracking-wider text-text-muted">Completion</p>
            <div className="mt-1 flex items-center gap-2">
              <p className="text-xl font-bold text-success">{completionRate}%</p>
              <ProgressBar value={completionRate} color="bg-success" className="flex-1" />
            </div>
          </div>
        </div>
      )}

      {/* Milestones list */}
      {isLoading ? (
        <div className="flex justify-center py-16"><Spinner size={24} className="text-brand-400" /></div>
      ) : isError ? (
        <EmptyState icon={Map} title="Could not load milestones" description="Server may be unavailable. Try again later." />
      ) : all.length === 0 ? (
        <EmptyState icon={Map} title="No milestones yet" description="Add your first milestone to start tracking your journey." action={
          <button onClick={handleCreate} className="rounded-lg bg-brand-600 px-4 py-2 text-xs font-medium text-white hover:bg-brand-700">Create Milestone</button>
        } />
      ) : (
        <div className="space-y-2">
          {all.map((ms) => {
            const cfg = statusConfig[ms.status];
            const Icon = cfg.icon;
            const overdue = isOverdue(ms);
            return (
              <div key={ms.id} className={cn("group flex items-start gap-3 rounded-xl border bg-surface-secondary p-4 transition-colors hover:bg-surface-tertiary", overdue ? "border-error/30" : "border-border-secondary")}>
                <button onClick={() => handleStatusToggle(ms)} className={cn("mt-0.5 shrink-0 transition-colors", cfg.color)} aria-label="Toggle status">
                  <Icon size={18} />
                </button>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className={cn("text-sm font-medium", ms.status === "completed" ? "text-text-secondary line-through" : "text-text-primary")}>{ms.title}</p>
                    <StatusBadge label={cfg.label} variant={cfg.badge} />
                    {overdue && <StatusBadge label="Overdue" variant="error" />}
                    {ms.projectTitle && <StatusBadge label={ms.projectTitle} variant="info" />}
                  </div>
                  {ms.description && <p className="mt-0.5 text-xs text-text-tertiary">{ms.description}</p>}
                  <div className="mt-2 flex flex-wrap items-center gap-3">
                    <PriorityIndicator priority={ms.priority} showLabel />
                    <ProgressBar value={ms.progress} showLabel className="w-24" />
                    {ms.targetDate && (
                      <span className={cn("flex items-center gap-1 text-[11px]", overdue ? "text-error" : "text-text-muted")}>
                        <Calendar size={10} /> {new Date(ms.targetDate).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex shrink-0 items-center gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                  <button onClick={() => handleEdit(ms)} className="rounded p-1.5 text-text-muted hover:bg-surface-overlay hover:text-text-secondary" aria-label="Edit"><Pencil size={13} /></button>
                  <button onClick={() => handleDelete(ms.id)} className="rounded p-1.5 text-text-muted hover:bg-error/10 hover:text-error" aria-label="Delete"><Trash2 size={13} /></button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <MilestoneFormDialog open={formOpen} onClose={() => setFormOpen(false)} milestone={editingMilestone} />
    </div>
  );
}
