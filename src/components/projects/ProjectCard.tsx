import { Link } from "react-router-dom";
import { Calendar, CheckSquare, Pencil, Trash2 } from "lucide-react";

import { cn } from "../../lib/cn";
import ProgressBar from "../ui/ProgressBar";
import StatusBadge from "../ui/StatusBadge";
import type { Project, ProjectStatus } from "../../types";

type Props = {
  project: Project;
  taskCount?: number;
  completedTaskCount?: number;
  onEdit?: (project: Project) => void;
  onDelete?: (id: string) => void;
};

const statusBadge: Record<
  ProjectStatus,
  { label: string; variant: "success" | "info" | "warning" | "muted" }
> = {
  completed: { label: "Completed", variant: "success" },
  "in-progress": { label: "In Progress", variant: "info" },
  planning: { label: "Planning", variant: "warning" },
  "on-hold": { label: "On Hold", variant: "muted" },
};

const typeLabel: Record<Project["type"], string> = {
  academic: "Academic",
  personal: "Personal",
  "open-source": "Open Source",
  freelance: "Freelance",
};

const priorityDot: Record<Project["priority"], string> = {
  critical: "bg-error",
  high: "bg-warning",
  medium: "bg-brand-400",
  low: "bg-text-muted",
};

/**
 * Compact project workspace card.
 *
 * Spec: dense card on a tonal surface with a ghost border. Primary
 * information (name, status, progress) leads; metadata is mono and quiet.
 */
export default function ProjectCard({
  project,
  taskCount,
  completedTaskCount,
  onEdit,
  onDelete,
}: Props) {
  const badge = statusBadge[project.status];
  const overdue =
    project.deadline &&
    project.status !== "completed" &&
    new Date(project.deadline) < new Date();

  return (
    <div className="group flex flex-col rounded-xl border border-border-primary bg-surface-secondary p-4 transition-colors duration-[var(--transition-fast)] hover:border-border-hover">
      {/* Header */}
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0 flex-1">
          <Link
            to={`/projects/${project.id}`}
            className="block truncate text-sm font-semibold text-text-primary transition-colors hover:text-brand-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 focus-visible:ring-offset-surface-secondary"
          >
            {project.title}
          </Link>
          <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
            <StatusBadge label={badge.label} variant={badge.variant} />
            <span className="meta-mono flex items-center gap-1.5 text-[10px] text-text-muted">
              <span
                className={cn(
                  "size-1.5 shrink-0 rounded-full",
                  priorityDot[project.priority],
                )}
              />
              {project.priority}
            </span>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-0.5 opacity-0 transition-opacity focus-within:opacity-100 group-hover:opacity-100">
          {onEdit && (
            <button
              onClick={() => onEdit(project)}
              aria-label={`Edit ${project.title}`}
              className="rounded-lg p-1.5 text-text-muted transition-colors hover:bg-surface-overlay hover:text-text-secondary"
            >
              <Pencil size={13} strokeWidth={1.5} />
            </button>
          )}
          {onDelete && (
            <button
              onClick={() => onDelete(project.id)}
              aria-label={`Delete ${project.title}`}
              className="rounded-lg p-1.5 text-text-muted transition-colors hover:bg-error/10 hover:text-error"
            >
              <Trash2 size={13} strokeWidth={1.5} />
            </button>
          )}
        </div>
      </div>

      {/* Description */}
      <p className="mt-2.5 line-clamp-2 text-xs leading-relaxed text-text-tertiary">
        {project.description}
      </p>

      {/* Progress */}
      <div className="mt-3.5">
        <ProgressBar
          value={project.progress}
          showLabel
          color={project.status === "completed" ? "bg-success" : "bg-brand-500"}
        />
      </div>

      {/* Technologies */}
      {project.technologies.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1">
          {project.technologies.slice(0, 3).map((tech) => (
            <span
              key={tech}
              className="meta-mono rounded-sm border border-border-primary bg-surface-tertiary px-1.5 py-0.5 text-[10px] text-text-tertiary"
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 3 && (
            <span className="meta-mono rounded-sm border border-border-primary bg-surface-tertiary px-1.5 py-0.5 text-[10px] text-text-muted">
              +{project.technologies.length - 3}
            </span>
          )}
        </div>
      )}

      {/* Footer */}
      <div className="mt-auto flex items-center justify-between gap-2 border-t border-border-secondary pt-3">
        <span className="meta-mono text-[10px] text-text-muted">
          {typeLabel[project.type]}
        </span>

        <div className="flex items-center gap-3">
          {taskCount !== undefined && taskCount > 0 && (
            <span className="meta-mono flex items-center gap-1 text-[10px] text-text-muted">
              <CheckSquare size={10} strokeWidth={1.5} />
              {completedTaskCount ?? 0}/{taskCount}
            </span>
          )}
          {project.deadline && (
            <span
              className={cn(
                "meta-mono flex items-center gap-1 text-[10px]",
                overdue ? "text-error" : "text-text-muted",
              )}
            >
              <Calendar size={10} strokeWidth={1.5} />
              {new Date(project.deadline).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              })}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
