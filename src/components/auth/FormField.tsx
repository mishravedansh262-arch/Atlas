import type { InputHTMLAttributes, ReactNode, Ref } from "react";

import { cn } from "../../lib/cn";

type FormFieldProps = {
  id: string;
  label: string;
  trailing?: ReactNode;
  error?: string;
  ref?: Ref<HTMLInputElement>;
} & InputHTMLAttributes<HTMLInputElement>;

/**
 * Labelled text input.
 * Spec: mono label, tonal input surface, ghost border, blue focus border
 * with a subtle outer glow.
 */
export default function FormField({
  id,
  label,
  trailing,
  error,
  ref,
  ...inputProps
}: FormFieldProps) {
  const errorId = `${id}-error`;

  return (
    <div>
      <label
        htmlFor={id}
        className={cn(
          "label-mono mb-2 block",
          error ? "text-error" : "text-text-secondary",
        )}
      >
        {label}
      </label>

      <div className="relative">
        <input
          id={id}
          ref={ref}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : undefined}
          className={cn(
            "w-full rounded-lg border bg-surface-tertiary px-3.5 py-2.5 text-sm text-text-primary outline-none transition-all duration-[var(--transition-fast)] placeholder:text-text-muted",
            error
              ? "border-error focus:border-error focus:shadow-[0_0_0_2px_rgb(239_68_68/0.2)]"
              : "border-border-primary hover:border-border-hover focus:border-brand-500 focus:shadow-[0_0_0_2px_rgb(59_130_246/0.2)]",
          )}
          {...inputProps}
        />

        {trailing && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-3">
            {trailing}
          </div>
        )}
      </div>

      {error && (
        <p id={errorId} role="alert" className="meta-mono mt-1.5 text-[10px] text-error">
          {error}
        </p>
      )}
    </div>
  );
}
