import { useAuth } from "../../hooks/useAuth";

function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
}

export default function DashboardHeader() {
  const { user } = useAuth();
  const firstName = user?.name?.split(" ")[0] ?? "there";

  return (
    <div className="space-y-1">
      <h1 className="text-xl font-semibold tracking-tight text-text-primary lg:text-2xl">
        {getGreeting()}, {firstName}
      </h1>
      <p className="text-sm text-text-secondary">
        Here&apos;s an overview of your progress and upcoming tasks.
      </p>
    </div>
  );
}
