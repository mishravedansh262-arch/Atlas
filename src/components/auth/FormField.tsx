import type { InputHTMLAttributes, ReactNode, Ref } from "react";

import { cn } from "../../lib/cn";

type FormFieldProps = {
  id: string;
  label: string;
  trailing?: ReactNode;
  error?: string;
  ref?: Ref<HTMLInputElement>;
} & InputHTMLAttributes<HTMLInputElement>;

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
        className="mb-2 block text-xs font-medium text-text-secondary"
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
              ? "border-error focus:border-error focus:ring-1 focus:ring-error"
              : "border-border-secondary hover:border-border-hover focus:border-brand-500 focus:ring-1 focus:ring-brand-500",
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
        <p id={errorId} role="alert" className="mt-1.5 text-xs text-error">
          {error}
        </p>
      )}
    </div>
  );
}
