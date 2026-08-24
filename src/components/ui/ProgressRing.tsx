import { cn } from "../../lib/cn";

type ProgressRingProps = {
  /** 0-100 */
  value: number;
  size?: number;
  /** Stroke thickness in SVG user units (viewBox is 36x36). */
  thickness?: number;
  /** Tailwind text-* class driving the indicator colour. */
  color?: string;
  /** Large centred figure. Defaults to the rounded percentage. */
  label?: string;
  /** Small caption under the figure. */
  caption?: string;
  className?: string;
};

/**
 * Radial progress ring.
 *
 * Uses the arc geometry from the ATLAS design system: radius 15.9155 gives a
 * circumference of ~100, so `stroke-dasharray` can be set directly from the
 * percentage with no maths at the call site.
 */
export default function ProgressRing({
  value,
  size = 72,
  thickness = 3,
  color = "text-brand-500",
  label,
  caption,
  className,
}: ProgressRingProps) {
  const pct = Math.min(100, Math.max(0, Math.round(value)));
  const arc = "M18 2.0845a15.9155 15.9155 0 0 1 0 31.831a15.9155 15.9155 0 0 1 0-31.831";

  return (
    <div
      className={cn("relative shrink-0", className)}
      style={{ width: size, height: size }}
      role="img"
      aria-label={`${caption ? `${caption}: ` : ""}${pct}%`}
    >
      <svg viewBox="0 0 36 36" className="size-full -rotate-90">
        {/* Track */}
        <path
          d={arc}
          fill="none"
          stroke="currentColor"
          strokeWidth={thickness}
          className="text-surface-track"
        />
        {/* Indicator */}
        <path
          d={arc}
          fill="none"
          stroke="currentColor"
          strokeWidth={thickness}
          strokeLinecap="round"
          strokeDasharray={`${pct}, 100`}
          className={cn("transition-[stroke-dasharray] duration-700 ease-out", color)}
        />
      </svg>

      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-sm font-bold leading-none tracking-tight text-text-primary">
          {label ?? `${pct}%`}
        </span>
        {caption && (
          <span className="meta-mono mt-0.5 text-[9px] leading-none text-text-muted">
            {caption}
          </span>
        )}
      </div>
    </div>
  );
}
