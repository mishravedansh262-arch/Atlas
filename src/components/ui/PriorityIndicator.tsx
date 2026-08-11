import { cn } from "../../lib/cn";
import type { Priority } from "../../types";

type PriorityIndicatorProps = {
  priority: Priority;
  showLabel?: boolean;
};

const config: Record<Priority, { color: string; label: string }> = {
  critical: { color: "bg-error", label: "Critical" },
  high: { color: "bg-warning", label: "High" },
  medium: { color: "bg-brand-400", label: "Medium" },
  low: { color: "bg-text-muted", label: "Low" },
};

export default function PriorityIndicator({
  priority,
  showLabel = false,
}: PriorityIndicatorProps) {
  const { color, label } = config[priority];

  return (
    <div className="flex items-center gap-1.5">
      <span className={cn("size-2 rounded-full", color)} />
      {showLabel && (
        <span className="text-[11px] font-medium text-text-secondary">
          {label}
        </span>
      )}
    </div>
  );
}
