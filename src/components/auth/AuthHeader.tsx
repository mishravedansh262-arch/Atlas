type AuthHeaderProps = {
  title: string;
  subtitle: string;
};

export default function AuthHeader({ title, subtitle }: AuthHeaderProps) {
  return (
    <div className="mb-8 text-center">
      <div className="mx-auto mb-5 flex size-10 items-center justify-center rounded-xl bg-brand-500 text-sm font-bold text-white lg:hidden">
        A
      </div>

      <h1 className="text-xl font-semibold tracking-tight text-text-primary">
        {title}
      </h1>

      <p className="mt-2 text-sm text-text-secondary">{subtitle}</p>
    </div>
  );
}
