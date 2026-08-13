import { useAuth } from "../../hooks/useAuth";

function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
}

/**
 * Command-center greeting.
 * Spec: display-lg on desktop (48px), headline-lg-mobile (24px) on small
 * screens, with a mono system line above for date context.
 */
export default function DashboardHeader() {
  const { user } = useAuth();
  const firstName = user?.name?.split(" ")[0] ?? "there";

  const date = new Date()
    .toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    })
    .toUpperCase();

  return (
    <div>
      <p className="label-mono text-text-muted">{date}</p>
      <h1 className="mt-2 text-2xl font-bold tracking-tight text-text-primary sm:text-[32px] sm:leading-10 lg:text-5xl lg:leading-[3.5rem] lg:tracking-[-0.02em]">
        {getGreeting()}, {firstName}.
      </h1>
      <p className="mt-2 text-sm text-text-secondary lg:text-base">
        Here&apos;s what needs your attention today.
      </p>
    </div>
  );
}
