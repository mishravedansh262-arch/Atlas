type AuthHeaderProps = {
  title: string;
  subtitle: string;
};

export default function AuthHeader({ title, subtitle }: AuthHeaderProps) {
  return (
    <div className="mb-8 text-center">
      <p className="text-xl font-bold tracking-wide text-white lg:hidden">
        🚀 ATLAS
      </p>

      <h1 className="mt-4 text-2xl font-bold text-white lg:mt-0">{title}</h1>

      <p className="mt-2 text-sm text-zinc-400">{subtitle}</p>
    </div>
  );
}
