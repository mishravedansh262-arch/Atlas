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
  { value: "completed", label: "Completed" },
];

export default function TaskFilters({ active, onChange, counts }: Props) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {filters.map((filter) => (
        <button
          key={filter.value}
          onClick={() => onChange(filter.value)}
          className={cn(
            "inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-all duration-[var(--transition-fast)]",
            active === filter.value
              ? "bg-brand-600 text-white"
              : "bg-surface-tertiary text-text-secondary hover:bg-surface-elevated hover:text-text-primary",
          )}
        >
          {filter.label}
          <span
            className={cn(
              "rounded-full px-1.5 py-0.5 text-[10px]",
              active === filter.value
                ? "bg-white/20"
                : "bg-surface-overlay",
            )}
          >
            {counts[filter.value]}
          </span>
        </button>
      ))}
    </div>
  );
}

export type { TaskView };
