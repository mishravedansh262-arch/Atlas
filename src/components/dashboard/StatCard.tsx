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
 * Spec: mono lowercase label prefixed by a status dot, oversized numeral,
 * quiet supporting metadata. Tonal surface + ghost border, no icon chrome.
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
    <div className="rounded-xl border border-border-primary bg-surface-secondary p-4 transition-colors duration-[var(--transition-fast)] hover:border-border-hover">
      <div className="flex items-start justify-between gap-3">
        <span
          className={cn(
            "meta-mono flex min-w-0 items-center gap-2 text-text-tertiary",
            accentColor,
          )}
        >
          <span className="size-1.5 shrink-0 rounded-full bg-current" />
          <span className="truncate lowercase text-text-tertiary">{title}</span>
        </span>
        <Icon
          size={15}
          strokeWidth={1.5}
          className="shrink-0 text-text-muted"
          aria-hidden="true"
        />
      </div>

      <p className="mt-2 text-[28px] font-bold leading-9 tracking-[-0.01em] text-text-primary">
        {value}
      </p>

      {subtitle && (
        <p className="meta-mono mt-1 text-[10px] text-text-muted">{subtitle}</p>
      )}

      {trend && (
        <p
          className={cn(
            "meta-mono mt-1 text-[10px]",
            trend.positive ? "text-success" : "text-error",
          )}
        >
          {trend.positive ? "↑" : "↓"} {trend.value}
        </p>
      )}
    </div>
  );
}
