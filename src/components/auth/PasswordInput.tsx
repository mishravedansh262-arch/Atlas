import { useState } from "react";
import type { InputHTMLAttributes, Ref } from "react";
import { Eye, EyeOff } from "lucide-react";

import FormField from "./FormField";

type PasswordInputProps = {
  id: string;
  label: string;
  error?: string;
  ref?: Ref<HTMLInputElement>;
} & Omit<InputHTMLAttributes<HTMLInputElement>, "type">;

export default function PasswordInput({
  id,
  label,
  error,
  ref,
  placeholder = "••••••••",
  autoComplete = "current-password",
  ...inputProps
}: PasswordInputProps) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <FormField
      id={id}
      label={label}
      error={error}
      ref={ref}
      type={isVisible ? "text" : "password"}
      placeholder={placeholder}
      autoComplete={autoComplete}
      trailing={
        <button
          type="button"
          onClick={() => setIsVisible((visible) => !visible)}
          aria-label={isVisible ? "Hide password" : "Show password"}
          className="text-zinc-500 transition hover:text-zinc-300"
        >
          {isVisible ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      }
      {...inputProps}
    />
  );
}
