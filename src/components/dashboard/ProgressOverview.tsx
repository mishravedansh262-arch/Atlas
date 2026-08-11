import { cn } from "../../lib/cn";

type ProgressItem = {
  label: string;
  value: number;
  max: number;
  color: string;
};

const progressItems: ProgressItem[] = [
  { label: "Semester Progress", value: 67, max: 100, color: "bg-brand-500" },
  { label: "Current Sprint", value: 8, max: 12, color: "bg-success" },
  { label: "Weekly Goals", value: 4, max: 6, color: "bg-warning" },
];

export default function ProgressOverview() {
  return (
    <div className="rounded-xl border border-border-secondary bg-surface-secondary p-5">
      <h2 className="mb-4 text-sm font-semibold text-text-primary">
        Progress Overview
      </h2>

      <div className="space-y-4">
        {progressItems.map((item) => {
          const percentage = Math.round((item.value / item.max) * 100);

          return (
            <div key={item.label} className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs text-text-secondary">
                  {item.label}
                </span>
                <span className="text-xs font-medium text-text-primary">
                  {item.value}/{item.max}
                </span>
              </div>
              <div className="h-1.5 overflow-hidden rounded-full bg-surface-overlay">
                <div
                  className={cn("h-full rounded-full transition-all duration-500", item.color)}
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
