import { CheckCircle2, Circle, Clock, Lock } from "lucide-react";

import { cn } from "../../lib/cn";
import StatusBadge from "../ui/StatusBadge";
import type { LegacyMilestoneStatus, RoadmapMilestone, RoadmapStage } from "../../types";

type Props = {
  stages: RoadmapStage[];
};

const statusIcon: Record<LegacyMilestoneStatus, typeof CheckCircle2> = {
  completed: CheckCircle2,
  current: Clock,
  upcoming: Circle,
  locked: Lock,
};

const statusColor: Record<LegacyMilestoneStatus, string> = {
  completed: "text-success",
  current: "text-brand-400",
  upcoming: "text-text-muted",
  locked: "text-text-muted",
};

const categoryBadge: Record<string, { label: string; variant: "info" | "success" | "warning" | "muted" }> = {
  academics: { label: "Academics", variant: "info" },
  skills: { label: "Skills", variant: "success" },
  projects: { label: "Projects", variant: "warning" },
  career: { label: "Career", variant: "muted" },
};

function MilestoneRow({ milestone }: { milestone: RoadmapMilestone }) {
  const Icon = statusIcon[milestone.status];
  const badge = categoryBadge[milestone.category] ?? { label: milestone.category, variant: "muted" as const };

  return (
    <div
      className={cn(
        "group flex gap-3 rounded-lg px-3 py-3 transition-colors hover:bg-surface-tertiary",
        milestone.status === "locked" && "opacity-50",
      )}
    >
      <Icon size={16} className={cn("mt-0.5 shrink-0", statusColor[milestone.status])} />
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <p className={cn(
            "text-xs font-medium",
            milestone.status === "completed" ? "text-text-secondary line-through" : "text-text-primary",
          )}>
            {milestone.title}
          </p>
          <StatusBadge label={badge.label} variant={badge.variant} />
        </div>
        <p className="mt-0.5 text-[11px] text-text-tertiary">{milestone.description}</p>
        {milestone.skills.length > 0 && (
          <div className="mt-1.5 flex flex-wrap gap-1">
            {milestone.skills.map((skill) => (
              <span
                key={skill}
                className="rounded bg-surface-overlay px-1.5 py-0.5 text-[10px] text-text-muted"
              >
                {skill}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function RoadmapTimeline({ stages }: Props) {
  return (
    <div className="space-y-4">
      {stages.map((stage, idx) => {
        const completed = stage.milestones.filter((m) => m.status === "completed").length;
        const total = stage.milestones.length;

        return (
          <div
            key={stage.id}
            className={cn(
              "relative rounded-xl border bg-surface-secondary",
              stage.isCurrent
                ? "border-brand-500/30"
                : "border-border-secondary",
            )}
          >
            {/* Stage Header */}
            <div className="flex items-center justify-between border-b border-border-secondary px-5 py-4">
              <div className="flex items-center gap-3">
                <div
                  className={cn(
                    "flex size-8 items-center justify-center rounded-lg text-xs font-bold",
                    stage.isCurrent
                      ? "bg-brand-600 text-white"
                      : completed === total
                        ? "bg-success/10 text-success"
                        : "bg-surface-overlay text-text-muted",
                  )}
                >
                  {idx + 1}
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-text-primary">
                    {stage.title}
                  </h3>
                  <p className="text-[11px] text-text-tertiary">{stage.subtitle}</p>
                </div>
              </div>
              <span className="text-xs text-text-muted">
                {completed}/{total}
              </span>
            </div>

            {/* Milestones */}
            <div className="p-2">
              {stage.milestones.map((ms) => (
                <MilestoneRow key={ms.id} milestone={ms} />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
