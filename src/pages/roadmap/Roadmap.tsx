import { useState } from "react";
import { Map, Plus } from "lucide-react";
import { toast } from "sonner";

import PageHeader from "../../components/ui/PageHeader";
import EmptyState from "../../components/ui/EmptyState";
import Spinner from "../../components/ui/Spinner";
import ProgressRing from "../../components/ui/ProgressRing";
import MilestoneTimeline from "../../components/roadmap/MilestoneTimeline";
import MilestoneFormDialog from "../../components/roadmap/MilestoneFormDialog";
import ConfirmDialog from "../../components/ui/ConfirmDialog";
import {
  useMilestones,
  useUpdateMilestone,
  useDeleteMilestone,
} from "../../hooks/useMilestones";
import { extractApiError } from "../../lib/api";
import type { Milestone, MilestoneStatus } from "../../types";
import PageContainer from "../../components/ui/PageContainer";
import { buttonClasses } from "../../lib/buttonStyles";

export default function Roadmap() {
  const { data: milestones, isLoading, isError } = useMilestones();
  const updateMutation = useUpdateMilestone();
  const deleteMutation = useDeleteMilestone();
  const [formOpen, setFormOpen] = useState(false);
  const [editingMilestone, setEditingMilestone] = useState<Milestone | undefined>();
  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);

  function handleCreate() {
    setEditingMilestone(undefined);
    setFormOpen(true);
  }

  function handleEdit(ms: Milestone) {
    setEditingMilestone(ms);
    setFormOpen(true);
  }

  function requestDelete(id: string) {
    setPendingDeleteId(id);
  }

  async function confirmDelete() {
    if (!pendingDeleteId) return;
    try {
      await deleteMutation.mutateAsync(pendingDeleteId);
      toast.success("Milestone deleted.");
    } catch (e) {
      toast.error(extractApiError(e).message);
    } finally {
      setPendingDeleteId(null);
    }
  }

  async function handleToggle(ms: Milestone) {
    const next: MilestoneStatus =
      ms.status === "completed" ? "in_progress" : "completed";
    try {
      await updateMutation.mutateAsync({ id: ms.id, payload: { status: next } });
    } catch (e) {
      toast.error(extractApiError(e).message);
    }
  }

  const all = milestones ?? [];
  const inProgress = all.filter((m) => m.status === "in_progress").length;
  const completed = all.filter((m) => m.status === "completed").length;
  const blocked = all.filter((m) => m.status === "blocked").length;
  const completionRate =
    all.length > 0 ? Math.round((completed / all.length) * 100) : 0;

  const pendingDeleteTitle =
    all.find((m) => m.id === pendingDeleteId)?.title ?? null;

  return (
    <PageContainer width="narrow">
      <PageHeader
        title="Roadmap"
        description="Your journey milestones — plan, track, and achieve."
        action={
          <button
            onClick={handleCreate}
            className={buttonClasses()}
          >
            <Plus size={14} strokeWidth={2} /> Add Milestone
          </button>
        }
      />

      {/* Journey summary */}
      {all.length > 0 && (
        <div className="flex items-center gap-5 rounded-xl border border-border-primary bg-surface-secondary p-4">
          <ProgressRing value={completionRate} size={80} caption="complete" />

          <div className="grid min-w-0 flex-1 grid-cols-2 gap-x-6 gap-y-3 sm:grid-cols-4">
            {[
              { label: "Total", value: all.length, tone: "text-text-primary" },
              { label: "Active", value: inProgress, tone: "text-brand-400" },
              { label: "Done", value: completed, tone: "text-success" },
              { label: "Blocked", value: blocked, tone: "text-error" },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="label-mono text-text-muted">{stat.label}</p>
                <p
                  className={`mt-1 text-xl font-bold leading-none tracking-tight ${stat.tone}`}
                >
                  {stat.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Timeline */}
      {isLoading ? (
        <div className="flex justify-center py-16">
          <Spinner size={24} className="text-brand-400" />
        </div>
      ) : isError ? (
        <EmptyState
          icon={Map}
          title="Could not load milestones"
          description="We couldn't reach the server. Check your connection and try again."
        />
      ) : all.length === 0 ? (
        <EmptyState
          icon={Map}
          title="Your roadmap starts here"
          description="Add your first milestone and start mapping the journey ahead."
          action={
            <button
              onClick={handleCreate}
              className={buttonClasses()}
            >
              Create Milestone
            </button>
          }
        />
      ) : (
        <MilestoneTimeline
          milestones={all}
          onToggle={handleToggle}
          onEdit={handleEdit}
          onDelete={requestDelete}
        />
      )}

      <MilestoneFormDialog
        open={formOpen}
        onClose={() => setFormOpen(false)}
        milestone={editingMilestone}
      />

      <ConfirmDialog
        open={pendingDeleteId !== null}
        title="Delete milestone"
        description={
          pendingDeleteTitle
            ? `"${pendingDeleteTitle}" will be removed from your roadmap. This cannot be undone.`
            : "This milestone will be permanently removed. This cannot be undone."
        }
        confirmLabel="Delete"
        isPending={deleteMutation.isPending}
        onConfirm={confirmDelete}
        onCancel={() => setPendingDeleteId(null)}
      />
    </PageContainer>
  );
}
