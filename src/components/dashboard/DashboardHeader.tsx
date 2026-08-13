import { useAuth } from "../../hooks/useAuth";

function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
}

function getDate(): string {
  return new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
}

export default function DashboardHeader() {
  const { user } = useAuth();
  const firstName = user?.name?.split(" ")[0] ?? "there";

  return (
    <div className="space-y-0.5">
      <p className="text-xs text-text-muted">{getDate()}</p>
      <h1 className="text-lg font-semibold tracking-tight text-text-primary lg:text-xl">
        {getGreeting()}, {firstName}
      </h1>
    </div>
  );
}
