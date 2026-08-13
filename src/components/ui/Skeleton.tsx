import { cn } from "../../lib/cn";

type SkeletonProps = {
  className?: string;
};

/** Base skeleton pulse block. Compose with width/height utilities. */
export default function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-lg bg-surface-elevated",
        className,
      )}
    />
  );
}

/** Pre-composed card skeleton matching project/stat card geometry. */
export function CardSkeleton() {
  return (
    <div className="rounded-xl border border-border-secondary bg-surface-secondary p-5 space-y-3">
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-3 w-full" />
      <Skeleton className="h-3 w-1/2" />
      <Skeleton className="mt-3 h-2 w-full" />
    </div>
  );
}
