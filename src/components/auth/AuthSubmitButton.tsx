import { buttonClasses } from "../../lib/buttonStyles";
import Spinner from "../ui/Spinner";

type AuthSubmitButtonProps = {
  label: string;
  loadingLabel: string;
  isSubmitting: boolean;
};

/**
 * Full-width auth submit.
 * Adopts the shared primary-button styling, overriding only the geometry it
 * genuinely needs: full width and a 44px height for comfortable tapping.
 */
export default function AuthSubmitButton({
  label,
  loadingLabel,
  isSubmitting,
}: AuthSubmitButtonProps) {
  return (
    <button
      type="submit"
      disabled={isSubmitting}
      aria-busy={isSubmitting}
      className={buttonClasses({ glow: true, className: "h-11 w-full" })}
    >
      {isSubmitting && <Spinner />}
      {isSubmitting ? loadingLabel : label}
    </button>
  );
}
