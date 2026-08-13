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
    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border-primary py-14 text-center">
      <div className="rounded-lg bg-surface-secondary p-2.5 text-text-muted">
        <Icon size={20} />
      </div>
      <h3 className="mt-3 text-sm font-medium text-text-primary">{title}</h3>
      <p className="mt-1 max-w-[260px] text-xs leading-relaxed text-text-tertiary">{description}</p>
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}
