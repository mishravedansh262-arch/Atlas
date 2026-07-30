type AuthSubmitButtonProps = {
  label: string;
};

export default function AuthSubmitButton({ label }: AuthSubmitButtonProps) {
  return (
    <button
      type="submit"
      className="w-full rounded-xl bg-blue-600 py-3 text-sm font-semibold text-white transition hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-zinc-900"
    >
      {label}
    </button>
  );
}
