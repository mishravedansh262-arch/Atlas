import { cn } from "../../lib/cn";

type StatusBadgeProps = {
  label: string;
  variant?: "default" | "success" | "warning" | "error" | "info" | "muted";
  size?: "sm" | "md";
};

/**
 * Status badge — per the design spec: small, near-rectangular (2px radius),
 * 10% opacity semantic fill, 20% opacity border, full-opacity text, mono type.
 */
const variantStyles: Record<NonNullable<StatusBadgeProps["variant"]>, string> = {
  default: "bg-text-tertiary/10 text-text-secondary border-text-tertiary/20",
  success: "bg-success/10 text-success border-success/20",
  warning: "bg-warning/10 text-warning border-warning/20",
  error: "bg-error/10 text-error border-error/20",
  info: "bg-brand-500/10 text-brand-400 border-brand-500/20",
  muted: "bg-surface-overlay text-text-muted border-border-primary",
};

export default function StatusBadge({
  label,
  variant = "default",
  size = "sm",
}: StatusBadgeProps) {
  return (
    <span
      className={cn(
        "meta-mono inline-flex shrink-0 items-center whitespace-nowrap rounded-sm border uppercase",
        variantStyles[variant],
        size === "sm" ? "px-1.5 py-0.5 text-[10px]" : "px-2 py-1 text-[11px]",
      )}
    >
      {label}
    </span>
  );
}
