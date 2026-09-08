import { cn } from "./cn";

/**
 * Shared form-control class builders.
 *
 * Mirrors `buttonStyles.ts`, and exists for the same reason: the input
 * appearance was previously hand-written inline (Profile carried its own
 * `inputClass` string that had already drifted from the auth fields — 2.5 vs
 * 2 vertical padding, and a different transition duration).
 *
 * Kept in `lib` rather than exported from a component so that both the
 * `FormField` wrapper and screens that need a bare `<textarea>` or a
 * `<select>` can share one definition, and so the module stays free of React
 * exports (which would break Fast Refresh).
 */
export function inputClasses(opts?: {
  error?: boolean;
  className?: string;
}): string {
  const { error = false, className } = opts ?? {};
  return cn(
    "w-full rounded-lg border bg-surface-tertiary px-3.5 py-2.5 text-sm text-text-primary outline-none transition-all duration-[var(--transition-fast)] placeholder:text-text-muted",
    error
      ? "border-error focus:border-error focus:shadow-[0_0_0_2px_rgb(239_68_68/0.2)]"
      : "border-border-primary hover:border-border-hover focus:border-brand-500 focus:shadow-[0_0_0_2px_rgb(59_130_246/0.2)]",
    className,
  );
}

/** Mono label sitting above a control. */
export function fieldLabelClasses(opts?: {
  error?: boolean;
  className?: string;
}): string {
  const { error = false, className } = opts ?? {};
  return cn(
    "label-mono mb-2 block",
    error ? "text-error" : "text-text-secondary",
    className,
  );
}
