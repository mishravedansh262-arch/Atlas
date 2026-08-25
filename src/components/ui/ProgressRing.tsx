import { useId } from "react";

import { cn } from "../../lib/cn";

type ProgressRingProps = {
  /** 0-100 */
  value: number;
  size?: number;
  /** Stroke thickness in SVG user units (viewBox is 36x36). */
  thickness?: number;
  /** Gradient identity for the indicator arc. */
  tone?: "accent" | "success" | "warning" | "violet";
  /** Large centred figure. Defaults to the rounded percentage. */
  label?: string;
  /** Small caption under the figure. */
  caption?: string;
  /** Soft bloom behind the arc. Reserve for focal rings. */
  glow?: boolean;
  className?: string;
};

/** Gradient stops per tone. Semantic tones stay recognisable. */
const TONES: Record<
  NonNullable<ProgressRingProps["tone"]>,
  { from: string; to: string; glow: string }
> = {
  accent: { from: "#2563eb", to: "#22d3ee", glow: "rgb(59 130 246 / 0.35)" },
  success: { from: "#059669", to: "#34d399", glow: "rgb(16 185 129 / 0.3)" },
  warning: { from: "#d97706", to: "#fbbf24", glow: "rgb(245 158 11 / 0.3)" },
  violet: { from: "#6d28d9", to: "#a78bfa", glow: "rgb(139 92 246 / 0.32)" },
};

/**
 * Radial progress ring.
 *
 * Arc geometry from the ATLAS design system: radius 15.9155 gives a
 * circumference of ~100, so `stroke-dasharray` takes the percentage directly.
 * The indicator uses a gradient stroke; the optional bloom is sized to the
 * ring so it reads as emitted light rather than a drop shadow.
 */
export default function ProgressRing({
  value,
  size = 72,
  thickness = 3,
  tone = "accent",
  label,
  caption,
  glow = true,
  className,
}: ProgressRingProps) {
  const gradientId = useId();
  const pct = Math.min(100, Math.max(0, Math.round(value)));
  const arc =
    "M18 2.0845a15.9155 15.9155 0 0 1 0 31.831a15.9155 15.9155 0 0 1 0-31.831";
  const { from, to, glow: glowColor } = TONES[tone];

  return (
    <div
      className={cn("relative shrink-0", className)}
      style={{ width: size, height: size }}
      role="img"
      aria-label={`${caption ? `${caption}: ` : ""}${pct} percent`}
    >
      {/* Emitted bloom, scaled to the ring */}
      {glow && pct > 0 && (
        <div
          className="pointer-events-none absolute inset-[15%] rounded-full blur-xl"
          style={{ background: glowColor }}
          aria-hidden="true"
        />
      )}

      <svg viewBox="0 0 36 36" className="relative size-full -rotate-90">
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={from} />
            <stop offset="100%" stopColor={to} />
          </linearGradient>
        </defs>

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
          stroke={`url(#${gradientId})`}
          strokeWidth={thickness}
          strokeLinecap="round"
          strokeDasharray={`${pct}, 100`}
          className="transition-[stroke-dasharray] duration-700 ease-out"
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
