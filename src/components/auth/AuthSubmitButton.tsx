import Spinner from "../ui/Spinner";

type AuthSubmitButtonProps = {
  label: string;
  loadingLabel: string;
  isSubmitting: boolean;
};

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
      className="label-mono glow-accent-sm flex w-full items-center justify-center gap-2 rounded-lg bg-brand-500 py-3 text-white transition-all duration-[var(--transition-fast)] hover:bg-brand-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 focus-visible:ring-offset-surface-secondary active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60 disabled:shadow-none disabled:active:scale-100"
    >
      {isSubmitting && <Spinner />}
      {isSubmitting ? loadingLabel : label}
    </button>
  );
}
