import type { ButtonHTMLAttributes, ReactNode } from "react";

import Spinner from "./Spinner";
import {
  buttonClasses,
  type ButtonSize,
  type ButtonVariant,
} from "../../lib/buttonStyles";

type ButtonProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Shows a spinner and disables the button. */
  isLoading?: boolean;
  /** Adds the focal accent bloom. Reserve for the single primary CTA. */
  glow?: boolean;
  children: ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;

/**
 * Standard button.
 * Styling lives in `lib/buttonStyles` so `<Link>` can share it verbatim.
 */
export default function Button({
  variant = "primary",
  size = "md",
  isLoading = false,
  glow = false,
  disabled,
  className,
  children,
  ...rest
}: ButtonProps) {
  return (
    <button
      {...rest}
      disabled={disabled ?? isLoading}
      aria-busy={isLoading || undefined}
      className={buttonClasses({ variant, size, glow, className })}
    >
      {isLoading && <Spinner />}
      {children}
    </button>
  );
}
