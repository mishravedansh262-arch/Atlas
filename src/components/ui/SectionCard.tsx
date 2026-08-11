import type { ReactNode } from "react";

import { cn } from "../../lib/cn";

type SectionCardProps = {
  title?: string;
  description?: string;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
  noPadding?: boolean;
};

export default function SectionCard({
  title,
  description,
  action,
  children,
  className,
  noPadding = false,
}: SectionCardProps) {
  return (
    <div
      className={cn(
        "rounded-xl border border-border-secondary bg-surface-secondary",
        !noPadding && "p-5",
        className,
      )}
    >
      {(title || action) && (
        <div className={cn("flex items-center justify-between", noPadding && "px-5 pt-5", title && "mb-4")}>
          <div>
            {title && (
              <h3 className="text-sm font-semibold text-text-primary">{title}</h3>
            )}
            {description && (
              <p className="mt-0.5 text-xs text-text-tertiary">{description}</p>
            )}
          </div>
          {action && <div className="shrink-0">{action}</div>}
        </div>
      )}
      {children}
    </div>
  );
}
