import { Target } from "lucide-react";

import StatusBadge from "../ui/StatusBadge";
import type { RoadmapStage } from "../../types";

type Props = {
  stage: RoadmapStage;
};

export default function RoadmapCurrentStage({ stage }: Props) {
  const currentMilestones = stage.milestones.filter((m) => m.status === "current");
  const completed = stage.milestones.filter((m) => m.status === "completed").length;
  const total = stage.milestones.length;

  return (
    <div className="rounded-xl border border-brand-500/20 bg-brand-600/5 p-5">
      <div className="flex items-start gap-3">
        <div className="rounded-lg bg-brand-600/10 p-2 text-brand-400">
          <Target size={20} />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <h2 className="text-sm font-semibold text-text-primary">
              Current Stage: {stage.title}
            </h2>
            <StatusBadge label={`Year ${stage.year}`} variant="info" />
          </div>
          <p className="mt-0.5 text-xs text-text-secondary">{stage.subtitle}</p>

          <div className="mt-3 flex flex-wrap gap-4 text-xs text-text-secondary">
            <span>
              <span className="font-medium text-text-primary">{completed}</span>/{total} milestones
            </span>
            <span>
              <span className="font-medium text-text-primary">{currentMilestones.length}</span> in progress
            </span>
          </div>

          {currentMilestones.length > 0 && (
            <div className="mt-3 space-y-1.5">
              {currentMilestones.map((ms) => (
                <p key={ms.id} className="text-xs text-text-secondary">
                  → {ms.title}
                </p>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
