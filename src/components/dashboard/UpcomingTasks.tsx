import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2, Circle, Clock } from "lucide-react";

import { cn } from "../../lib/cn";
import SectionCard from "../ui/SectionCard";
import PriorityIndicator from "../ui/PriorityIndicator";
import { ListRowSkeleton } from "../ui/Skeleton";
import WidgetError from "../ui/WidgetError";
import { useTasks } from "../../hooks/useTasks";
import type { TaskStatus } from "../../types";

const statusIcon: Record<TaskStatus, typeof Circle> = {
  todo: Circle,
  "in-progress": Clock,
  completed: CheckCircle2,
};

const statusColor: Record<TaskStatus, string> = {
  todo: "text-text-muted",
  "in-progress": "text-brand-400",
  completed: "text-success",
};

export default function UpcomingTasks() {
  const { data: tasks, isPending, isError, refetch } = useTasks();

  const pending =
    tasks?.filter((t) => t.status !== "completed").slice(0, 5) ?? [];

  return (
    <SectionCard
      title="Up Next"
      action={
        <Link
          to="/tasks"
          className="focus-ring meta-mono inline-flex items-center gap-1 rounded-lg px-1 py-0.5 text-[10px] text-text-tertiary transition-colors hover:text-text-secondary"
        >
          View all
          <ArrowRight size={10} strokeWidth={2} aria-hidden="true" />
        </Link>
      }
    >
      {isPending ? (
        <div className="space-y-1">
          {Array.from({ length: 4 }).map((_, i) => (
            <ListRowSkeleton key={i} />
          ))}
        </div>
      ) : isError ? (
        <WidgetError
          message="Couldn't load your tasks."
          onRetry={() => void refetch()}
        />
      ) : pending.length === 0 ? (
        <div className="py-4 text-center">
          <p className="text-xs text-text-secondary">Nothing on your plate.</p>
          <p className="mt-1 text-[11px] text-text-muted">
            Add a task when you&apos;re ready.
          </p>
        </div>
      ) : (
        <ul className="space-y-0.5">
          {pending.map((task) => (
            <li
              key={task.id}
              className="flex items-center gap-3 rounded-lg px-2 py-2 transition-colors hover:bg-surface-tertiary"
            >
              {(() => {
                const Icon = statusIcon[task.status];
                return (
                  <Icon
                    size={14}
                    className={cn("shrink-0", statusColor[task.status])}
                    aria-hidden="true"
                  />
                );
              })()}
              <span className="min-w-0 flex-1 truncate text-xs text-text-primary">
                {task.title}
              </span>
              <PriorityIndicator priority={task.priority} />
            </li>
          ))}
        </ul>
      )}
    </SectionCard>
  );
}
