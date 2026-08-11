import { cn } from "../../lib/cn";

type ProgressBarProps = {
  value: number; // 0-100
  size?: "sm" | "md";
  color?: string;
  showLabel?: boolean;
};

export default function ProgressBar({
  value,
  size = "sm",
  color = "bg-brand-500",
  showLabel = false,
}: ProgressBarProps) {
  const clamped = Math.min(100, Math.max(0, value));

  return (
    <div className="flex items-center gap-2">
      <div
        className={cn(
          "flex-1 overflow-hidden rounded-full bg-surface-overlay",
          size === "sm" && "h-1.5",
          size === "md" && "h-2",
        )}
        role="progressbar"
        aria-valuenow={clamped}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div
          className={cn("h-full rounded-full transition-all duration-500", color)}
          style={{ width: `${clamped}%` }}
        />
      </div>
      {showLabel && (
        <span className="shrink-0 text-xs font-medium text-text-secondary">
          {clamped}%
        </span>
      )}
    </div>
  );
}
