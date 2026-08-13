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

/**
 * Standard content card.
 * Spec: tonal surface + 1px ghost border, 6px radius, 16px internal padding,
 * mono uppercase header for a "system-info" feel.
 */
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
        "rounded-xl border border-border-primary bg-surface-secondary",
        !noPadding && "p-4",
        className,
      )}
    >
      {(title || action) && (
        <div
          className={cn(
            "flex items-start justify-between gap-3",
            noPadding && "px-4 pt-4",
            (title || description) && "mb-4",
          )}
        >
          <div className="min-w-0">
            {title && (
              <h3 className="label-mono text-text-secondary">{title}</h3>
            )}
            {description && (
              <p className="mt-1 text-xs text-text-tertiary">{description}</p>
            )}
          </div>
          {action && <div className="shrink-0">{action}</div>}
        </div>
      )}
      {children}
    </div>
  );
}
