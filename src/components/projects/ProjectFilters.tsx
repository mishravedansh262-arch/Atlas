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
    <div className="flex flex-wrap gap-1.5">
      {filters.map((filter) => (
        <button
          key={filter.value}
          onClick={() => onStatusChange(filter.value)}
          className={cn(
            "rounded-lg px-3 py-1.5 text-xs font-medium transition-all duration-[var(--transition-fast)]",
            activeStatus === filter.value
              ? "bg-brand-600 text-white"
              : "bg-surface-tertiary text-text-secondary hover:bg-surface-elevated hover:text-text-primary",
          )}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
}
