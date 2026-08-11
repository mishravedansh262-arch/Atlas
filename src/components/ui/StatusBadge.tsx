import { cn } from "../../lib/cn";

type StatusBadgeProps = {
  label: string;
  variant?: "default" | "success" | "warning" | "error" | "info" | "muted";
  size?: "sm" | "md";
};

const variantStyles: Record<NonNullable<StatusBadgeProps["variant"]>, string> = {
  default: "bg-surface-overlay text-text-secondary",
  success: "bg-success/10 text-success",
  warning: "bg-warning/10 text-warning",
  error: "bg-error/10 text-error",
  info: "bg-brand-500/10 text-brand-400",
  muted: "bg-surface-tertiary text-text-muted",
};

export default function StatusBadge({
  label,
  variant = "default",
  size = "sm",
}: StatusBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md font-medium",
        variantStyles[variant],
        size === "sm" && "px-2 py-0.5 text-[11px]",
        size === "md" && "px-2.5 py-1 text-xs",
      )}
    >
      {label}
    </span>
  );
}
