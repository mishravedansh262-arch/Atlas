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

export default function StatCard({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  accentColor = "text-brand-400",
}: StatCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-xl border border-border-secondary bg-surface-secondary p-5 transition-all duration-[var(--transition-base)] hover:border-border-hover hover:bg-surface-tertiary">
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <p className="text-xs font-medium uppercase tracking-wider text-text-tertiary">
            {title}
          </p>
          <p className="text-2xl font-bold tracking-tight text-text-primary">
            {value}
          </p>
          {subtitle && (
            <p className="text-xs text-text-muted">{subtitle}</p>
          )}
          {trend && (
            <p
              className={cn(
                "text-xs font-medium",
                trend.positive ? "text-success" : "text-error",
              )}
            >
              {trend.positive ? "↑" : "↓"} {trend.value}
            </p>
          )}
        </div>

        <div
          className={cn(
            "rounded-lg bg-surface-elevated p-2.5 transition-colors group-hover:bg-surface-overlay",
            accentColor,
          )}
        >
          <Icon size={20} />
        </div>
      </div>
    </div>
  );
}
