import { cn } from "../../lib/cn";

type SkeletonProps = {
  className?: string;
};

/** Base skeleton block. Compose with width/height utilities. */
export default function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      className={cn("animate-pulse rounded-lg bg-surface-tertiary", className)}
    />
  );
}

/** Card skeleton matching the standard card geometry. */
export function CardSkeleton() {
  return (
    <div className="space-y-3 rounded-xl border border-border-primary bg-surface-secondary p-4">
      <Skeleton className="h-3 w-24" />
      <Skeleton className="h-6 w-16" />
      <Skeleton className="h-1 w-full" />
    </div>
  );
}
