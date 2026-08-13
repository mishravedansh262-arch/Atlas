import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

type EmptyStateProps = {
  icon: LucideIcon;
  title: string;
  description: string;
  action?: ReactNode;
};

export default function EmptyState({
  icon: Icon,
  title,
  description,
  action,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border-primary bg-surface-secondary/40 px-6 py-14 text-center">
      <div className="rounded-lg border border-border-primary bg-surface-tertiary p-2.5 text-text-muted">
        <Icon size={20} strokeWidth={1.5} />
      </div>
      <h3 className="mt-4 text-sm font-medium text-text-primary">{title}</h3>
      <p className="mt-1.5 max-w-[280px] text-xs leading-relaxed text-text-tertiary">
        {description}
      </p>
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}
