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
      className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-3 text-sm font-semibold text-white transition-all duration-200 hover:bg-blue-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-900 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60 disabled:active:scale-100"
    >
      {isSubmitting && <Spinner />}
      {isSubmitting ? loadingLabel : label}
    </button>
  );
}
