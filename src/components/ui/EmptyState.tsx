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
    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border-secondary py-16 text-center">
      <div className="rounded-xl bg-surface-secondary p-3 text-text-muted">
        <Icon size={24} />
      </div>
      <h3 className="mt-4 text-sm font-medium text-text-primary">{title}</h3>
      <p className="mt-1 max-w-xs text-xs text-text-tertiary">{description}</p>
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}
