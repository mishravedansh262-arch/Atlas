import { cn } from "../../lib/cn";

type SkeletonProps = {
  className?: string;
};

/**
 * Base skeleton block.
 *
 * Uses `motion-safe:animate-pulse` rather than bare `animate-pulse`: Tailwind
 * does NOT gate animation utilities behind `prefers-reduced-motion` on its
 * own, so the explicit variant is what keeps reduced-motion users from getting
 * a pulsing screen. The block still reserves identical space either way.
 */
export default function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      className={cn(
        "rounded-lg bg-surface-tertiary motion-safe:animate-pulse",
        className,
      )}
      aria-hidden="true"
    />
  );
}

/** Generic card skeleton — used by the Projects grid. */
export function CardSkeleton() {
  return (
    <div className="space-y-3 rounded-xl border border-border-primary bg-surface-secondary p-4">
      <Skeleton className="h-3 w-24" />
      <Skeleton className="h-6 w-16" />
      <Skeleton className="h-1 w-full" />
    </div>
  );
}

/** Matches StatCard geometry: label row, oversized numeral, metadata line. */
export function StatCardSkeleton() {
  return (
    <div className="rounded-xl border border-border-primary bg-surface-secondary p-4">
      <div className="flex items-start justify-between gap-3">
        <Skeleton className="h-3 w-24 rounded-sm" />
        <Skeleton className="size-4 rounded-sm" />
      </div>
      <Skeleton className="mt-3 h-7 w-14" />
      <Skeleton className="mt-2 h-2.5 w-20 rounded-sm" />
    </div>
  );
}

/** Matches the icon + title + trailing-meta row used by list widgets. */
export function ListRowSkeleton({ className }: SkeletonProps) {
  return (
    <div className={cn("flex items-center gap-3 px-2 py-2", className)}>
      <Skeleton className="size-3.5 shrink-0 rounded-full" />
      <Skeleton className="h-3 flex-1 rounded-sm" />
      <Skeleton className="h-2.5 w-10 shrink-0 rounded-sm" />
    </div>
  );
}

/** Matches a ProgressOverview row: label + count, then the track. */
export function ProgressRowSkeleton() {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <Skeleton className="h-2.5 w-20 rounded-sm" />
        <Skeleton className="h-2.5 w-10 rounded-sm" />
      </div>
      <Skeleton className="h-1.5 w-full rounded-full" />
    </div>
  );
}
