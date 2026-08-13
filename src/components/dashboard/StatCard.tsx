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
    <div className="rounded-xl border border-border-secondary bg-surface-secondary p-4 transition-colors duration-[var(--transition-fast)] hover:border-border-hover">
      <div className="flex items-start justify-between">
        <div className="space-y-1.5">
          <p className="text-[11px] font-medium uppercase tracking-wider text-text-muted">
            {title}
          </p>
          <p className="text-xl font-bold tracking-tight text-text-primary">
            {value}
          </p>
          {subtitle && (
            <p className="text-[11px] text-text-tertiary">{subtitle}</p>
          )}
          {trend && (
            <p
              className={cn(
                "text-[11px] font-medium",
                trend.positive ? "text-success" : "text-error",
              )}
            >
              {trend.positive ? "↑" : "↓"} {trend.value}
            </p>
          )}
        </div>

        <div className={cn("rounded-lg bg-surface-elevated p-2", accentColor)}>
          <Icon size={16} />
        </div>
      </div>
    </div>
  );
}
