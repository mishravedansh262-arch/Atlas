import { Calendar, Trash2 } from "lucide-react";

import ProgressBar from "../ui/ProgressBar";
import StatusBadge from "../ui/StatusBadge";
import PriorityIndicator from "../ui/PriorityIndicator";
import type { Project, ProjectStatus } from "../../types";

type Props = {
  project: Project;
  onDelete?: (id: string) => void;
};

const statusBadge: Record<ProjectStatus, { label: string; variant: "success" | "info" | "warning" | "muted" }> = {
  "completed": { label: "Completed", variant: "success" },
  "in-progress": { label: "In Progress", variant: "info" },
  "planning": { label: "Planning", variant: "warning" },
  "on-hold": { label: "On Hold", variant: "muted" },
};

const typeLabel: Record<string, string> = {
  academic: "Academic",
  personal: "Personal",
  "open-source": "Open Source",
  freelance: "Freelance",
};

export default function ProjectCard({ project, onDelete }: Props) {
  const badge = statusBadge[project.status];

  return (
    <div className="group rounded-xl border border-border-secondary bg-surface-secondary p-5 transition-all duration-[var(--transition-base)] hover:border-border-hover hover:bg-surface-tertiary">
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="truncate text-sm font-semibold text-text-primary">
              {project.title}
            </h3>
            <StatusBadge label={badge.label} variant={badge.variant} />
          </div>
          <p className="mt-1 line-clamp-2 text-xs text-text-tertiary">
            {project.description}
          </p>
        </div>
        <div className="flex items-center gap-1.5">
          <PriorityIndicator priority={project.priority} />
          {onDelete && (
            <button
              onClick={() => onDelete(project.id)}
              className="rounded p-1 text-text-muted opacity-0 transition-all hover:bg-error/10 hover:text-error group-hover:opacity-100"
              aria-label="Delete project"
            >
              <Trash2 size={13} />
            </button>
          )}
        </div>
      </div>

      {/* Progress */}
      <div className="mt-4">
        <ProgressBar
          value={project.progress}
          showLabel
          color={project.status === "completed" ? "bg-success" : "bg-brand-500"}
        />
      </div>

      {/* Technologies */}
      {project.technologies.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1">
          {project.technologies.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="rounded bg-surface-overlay px-1.5 py-0.5 text-[10px] text-text-muted"
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 4 && (
            <span className="rounded bg-surface-overlay px-1.5 py-0.5 text-[10px] text-text-muted">
              +{project.technologies.length - 4}
            </span>
          )}
        </div>
      )}

      {/* Footer */}
      <div className="mt-4 flex items-center justify-between border-t border-border-secondary pt-3">
        <span className="text-[11px] text-text-muted">
          {typeLabel[project.type] ?? project.type}
        </span>
        {project.deadline && (
          <div className="flex items-center gap-1 text-[11px] text-text-muted">
            <Calendar size={11} />
            <span>{new Date(project.deadline).toLocaleDateString("en-US", { month: "short", day: "numeric" })}</span>
          </div>
        )}
      </div>
    </div>
  );
}
