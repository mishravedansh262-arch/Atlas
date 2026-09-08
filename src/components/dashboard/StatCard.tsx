import type { LucideIcon } from "lucide-react";

import { cn } from "../../lib/cn";

type StatCardProps = {
  title: string;
  value: string;
  subtitle?: string;
  icon: LucideIcon;
  trend?: { value: string; positive: boolean };
  accentColor?: string;
};

/**
 * Metric card.
 *
 * Mono lowercase label prefixed by a status dot, oversized numeral, quiet
 * supporting metadata. The dot is the only coloured element — the surface
 * stays neutral so a grid of these reads as data, not as decoration.
 */
export default function StatCard({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  accentColor = "text-brand-400",
}: StatCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-xl border border-border-primary bg-surface-secondary p-4 transition-colors duration-[var(--transition-base)] hover:border-border-hover">
      {/* Corner bloom, revealed on hover — rewards interaction without shouting */}
      <div
        className={cn(
          "pointer-events-none absolute -right-12 -top-12 size-28 rounded-full bg-brand-500/[0.07] opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100",
        )}
        aria-hidden="true"
      />

      <div className="relative">
        <div className="flex items-start justify-between gap-3">
          <span
            className={cn(
              "meta-mono flex min-w-0 items-center gap-2",
              accentColor,
            )}
          >
            <span className="size-1.5 shrink-0 rounded-full bg-current" />
            <span className="truncate lowercase text-text-tertiary">
              {title}
            </span>
          </span>
          <Icon
            size={16}
            strokeWidth={1.5}
            className="shrink-0 text-text-muted transition-colors group-hover:text-text-tertiary"
            aria-hidden="true"
          />
        </div>

        <p className="mt-2 text-stat text-text-primary">
          {value}
        </p>

        {subtitle && (
          <p className="meta-mono mt-1 text-text-muted">
            {subtitle}
          </p>
        )}

        {trend && (
          <p
            className={cn(
              "meta-mono mt-1",
              trend.positive ? "text-success" : "text-error",
            )}
          >
            {trend.positive ? "↑" : "↓"} {trend.value}
          </p>
        )}
      </div>
    </div>
  );
}
