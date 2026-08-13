import { cn } from "../../lib/cn";

type TaskView = "all" | "today" | "upcoming" | "completed";

type Props = {
  active: TaskView;
  onChange: (view: TaskView) => void;
  counts: Record<TaskView, number>;
};

const filters: { value: TaskView; label: string }[] = [
  { value: "all", label: "All" },
  { value: "today", label: "Today" },
  { value: "upcoming", label: "Upcoming" },
  { value: "completed", label: "Done" },
];

export default function TaskFilters({ active, onChange, counts }: Props) {
  return (
    <div
      className="-mx-1 flex gap-1.5 overflow-x-auto px-1 pb-1"
      role="group"
      aria-label="Filter tasks"
    >
      {filters.map((filter) => {
        const isActive = active === filter.value;
        return (
          <button
            key={filter.value}
            onClick={() => onChange(filter.value)}
            aria-pressed={isActive}
            className={cn(
              "label-mono inline-flex shrink-0 items-center gap-2 rounded-lg border px-3 py-1.5 transition-colors duration-[var(--transition-fast)]",
              isActive
                ? "border-brand-500/40 bg-brand-500/10 text-brand-400"
                : "border-border-primary bg-surface-secondary text-text-tertiary hover:border-border-hover hover:text-text-secondary",
            )}
          >
            {filter.label}
            <span
              className={cn(
                "rounded-sm px-1 text-[10px]",
                isActive
                  ? "bg-brand-500/20 text-brand-300"
                  : "bg-surface-overlay text-text-muted",
              )}
            >
              {counts[filter.value]}
            </span>
          </button>
        );
      })}
    </div>
  );
}

export type { TaskView };
