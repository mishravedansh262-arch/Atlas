import type { InputHTMLAttributes, ReactNode, Ref } from "react";

import { inputClasses, fieldLabelClasses } from "../../lib/inputStyles";

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
      <label htmlFor={id} className={fieldLabelClasses({ error: !!error })}>
        {label}
      </label>

      <div className="relative">
        <input
          id={id}
          ref={ref}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : undefined}
          className={inputClasses({ error: !!error })}
          {...inputProps}
        />

        {trailing && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-3">
            {trailing}
          </div>
        )}
      </div>

      {error && (
        <p id={errorId} role="alert" className="meta-mono mt-1.5 text-error">
          {error}
        </p>
      )}
    </div>
  );
}
