import { cn } from "../../lib/cn";
import type { ProjectStatus } from "../../types";

type Props = {
  activeStatus: ProjectStatus | "all";
  onStatusChange: (status: ProjectStatus | "all") => void;
};

const filters: { value: ProjectStatus | "all"; label: string }[] = [
  { value: "all", label: "All" },
  { value: "in-progress", label: "In Progress" },
  { value: "planning", label: "Planning" },
  { value: "completed", label: "Completed" },
  { value: "on-hold", label: "On Hold" },
];

export default function ProjectFilters({ activeStatus, onStatusChange }: Props) {
  return (
    <div
      className="-mx-1 flex gap-1.5 overflow-x-auto px-1 pb-1"
      role="group"
      aria-label="Filter projects by status"
    >
      {filters.map((filter) => {
        const isActive = activeStatus === filter.value;
        return (
          <button
            key={filter.value}
            onClick={() => onStatusChange(filter.value)}
            aria-pressed={isActive}
            className={cn(
              "label-mono shrink-0 rounded-lg border px-3 py-1.5 transition-colors duration-[var(--transition-fast)]",
              isActive
                ? "border-brand-500/40 bg-brand-500/10 text-brand-400"
                : "border-border-primary bg-surface-secondary text-text-tertiary hover:border-border-hover hover:text-text-secondary",
            )}
          >
            {filter.label}
          </button>
        );
      })}
    </div>
  );
}
