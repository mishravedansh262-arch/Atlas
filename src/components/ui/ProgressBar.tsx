import { cn } from "../../lib/cn";

type ProgressBarProps = {
  value: number; // 0-100
  size?: "sm" | "md";
  /**
   * Tailwind background class. Defaults to the accent gradient.
   * Pass a flat class (e.g. "bg-success") to opt out of the gradient.
   */
  color?: string;
  showLabel?: boolean;
  /** Animated sweep across the fill — signals actively-in-progress work. */
  animated?: boolean;
  className?: string;
};

/**
 * Linear progress indicator.
 * 4px track per the design system. The fill carries a gradient so progress
 * reads as energy rather than a flat block; `animated` adds a slow sweep for
 * in-progress items (suppressed under prefers-reduced-motion).
 */
export default function ProgressBar({
  value,
  size = "sm",
  color = "fill-gradient-accent",
  showLabel = false,
  animated = false,
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
          className={cn(
            "h-full rounded-full transition-[width] duration-700 ease-out",
            color,
            animated && clamped > 0 && clamped < 100 && "shimmer",
          )}
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
