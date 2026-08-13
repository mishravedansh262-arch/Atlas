import { cn } from "../../lib/cn";

type ProgressBarProps = {
  value: number; // 0-100
  size?: "sm" | "md";
  color?: string;
  showLabel?: boolean;
  className?: string;
};

/**
 * Linear progress indicator.
 * Spec: 4px height, dedicated dark track, accent indicator, mono label.
 */
export default function ProgressBar({
  value,
  size = "sm",
  color = "bg-brand-500",
  showLabel = false,
  className,
}: ProgressBarProps) {
  const clamped = Math.min(100, Math.max(0, Math.round(value)));

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div
        className={cn(
          "flex-1 overflow-hidden rounded-full bg-surface-track",
          size === "sm" ? "h-1" : "h-1.5",
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
        <span className="meta-mono shrink-0 text-[10px] text-text-secondary">
          {clamped}%
        </span>
      )}
    </div>
  );
}
