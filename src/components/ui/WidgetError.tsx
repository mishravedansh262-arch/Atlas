import { AlertTriangle, RotateCw } from "lucide-react";

import { cn } from "../../lib/cn";

type WidgetErrorProps = {
  /** Short, human message. Never pass a raw API/exception string. */
  message?: string;
  onRetry?: () => void;
  /** `inline` sits inside an existing card; `card` brings its own surface. */
  variant?: "inline" | "card";
  className?: string;
};

/**
 * Compact per-widget error state.
 *
 * Deliberately scoped to a single widget so one failed query degrades only
 * its own panel rather than blanking the dashboard. Distinct from
 * `EmptyState` on purpose: an API failure must never look like an empty
 * account.
 *
 * Copy is intentionally generic — technical detail stays in the console.
 */
export default function WidgetError({
  message = "Couldn't load this data.",
  onRetry,
  variant = "inline",
  className,
}: WidgetErrorProps) {
  return (
    <div
      role="alert"
      className={cn(
        "flex flex-col items-center justify-center gap-2.5 px-4 py-6 text-center",
        variant === "card" &&
          "rounded-xl border border-error/25 bg-surface-secondary",
        className,
      )}
    >
      <AlertTriangle
        size={16}
        strokeWidth={1.5}
        className="text-error"
        aria-hidden="true"
      />

      <div className="space-y-0.5">
        <p className="text-xs font-medium text-text-primary">{message}</p>
        <p className="meta-mono text-[10px] text-text-muted">
          This isn&apos;t an empty account — the request failed.
        </p>
      </div>

      {onRetry && (
        <button
          onClick={onRetry}
          className="focus-ring label-mono mt-0.5 inline-flex items-center gap-1.5 rounded-lg border border-border-primary bg-surface-tertiary px-2.5 py-1.5 text-text-secondary transition-colors hover:border-border-hover hover:text-text-primary"
        >
          <RotateCw size={12} strokeWidth={2} aria-hidden="true" />
          Retry
        </button>
      )}
    </div>
  );
}
