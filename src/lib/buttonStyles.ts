import { cn } from "./cn";

export type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";
export type ButtonSize = "sm" | "md";

const base =
  "label-mono inline-flex shrink-0 items-center justify-center gap-2 rounded-lg transition-all duration-[var(--transition-fast)] focus-ring active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60 disabled:shadow-none disabled:active:scale-100";

const variants: Record<ButtonVariant, string> = {
  primary: "bg-brand-500 text-white hover:bg-brand-400",
  secondary:
    "border border-border-primary bg-surface-tertiary text-text-secondary hover:border-border-hover hover:text-text-primary",
  ghost: "text-text-tertiary hover:bg-surface-tertiary hover:text-text-primary",
  danger:
    "border border-error/30 bg-error/5 text-error hover:border-error/50 hover:bg-error/10",
};

const sizes: Record<ButtonSize, string> = {
  // Fixed heights keep every control on the same vertical rhythm whether it
  // holds an icon, text, or both.
  sm: "h-8 px-3",
  md: "h-9 px-3.5",
};

/**
 * Shared button class builder.
 *
 * Lives in `lib` rather than beside the component so anchor-like elements
 * (`<Link>`) can adopt identical interaction styling without a polymorphic
 * component, and so the module stays free of React component exports (which
 * would break Fast Refresh).
 *
 * This is what keeps hover / active / disabled / focus behaviour identical
 * across the app — the same class string was previously hand-copied to 17 call
 * sites, which is how a dead `hover:bg-brand-500` state slipped in unnoticed.
 */
export function buttonClasses(opts?: {
  variant?: ButtonVariant;
  size?: ButtonSize;
  glow?: boolean;
  className?: string;
}): string {
  const {
    variant = "primary",
    size = "md",
    glow = false,
    className,
  } = opts ?? {};

  return cn(
    base,
    variants[variant],
    sizes[size],
    glow && variant === "primary" && "glow-accent-sm",
    className,
  );
}
