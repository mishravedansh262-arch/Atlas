import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

import FormField from "./FormField";

type PasswordInputProps = {
  id: string;
  label: string;
  placeholder?: string;
  autoComplete?: string;
};

export default function PasswordInput({
  id,
  label,
  placeholder = "••••••••",
  autoComplete = "current-password",
}: PasswordInputProps) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <FormField
      id={id}
      label={label}
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
    />
  );
}
