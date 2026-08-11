import { Outlet } from "react-router-dom";
import { BarChart3, CheckSquare, FolderKanban, Sparkles } from "lucide-react";

const features = [
  {
    name: "Project Management",
    description: "Organize your work into focused, trackable projects.",
    icon: FolderKanban,
  },
  {
    name: "Smart Task Tracking",
    description: "Stay on top of every task with a clear daily overview.",
    icon: CheckSquare,
  },
  {
    name: "Productivity Insights",
    description: "Understand your progress with meaningful analytics.",
    icon: BarChart3,
  },
  {
    name: "AI-Powered Guidance",
    description: "Get personalized recommendations for your B.Tech journey.",
    icon: Sparkles,
  },
];

export default function AuthLayout() {
  return (
    <div className="flex min-h-screen bg-surface-base text-text-primary">
      {/* Left branding panel */}
      <aside className="hidden w-1/2 flex-col justify-between border-r border-border-secondary bg-surface-primary p-10 lg:flex xl:p-12">
        <div className="flex items-center gap-2.5">
          <div className="flex size-9 items-center justify-center rounded-lg bg-brand-600 text-sm font-bold text-white">
            A
          </div>
          <div>
            <h1 className="text-base font-semibold tracking-tight text-text-primary">
              ATLAS
            </h1>
            <p className="text-xs text-text-tertiary">Productivity OS</p>
          </div>
        </div>

        <div className="max-w-sm">
          <h2 className="text-2xl font-semibold leading-tight tracking-tight text-text-primary">
            Your B.Tech journey,
            <br />
            <span className="text-gradient">organized and on track.</span>
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-text-secondary">
            ATLAS brings your projects, tasks, and productivity insights
            together so you can focus on what matters.
          </p>

          <ul className="mt-8 space-y-5">
            {features.map((feature) => {
              const Icon = feature.icon;

              return (
                <li key={feature.name} className="flex items-start gap-3">
                  <div className="rounded-lg border border-border-secondary bg-surface-secondary p-2 text-brand-400">
                    <Icon size={16} aria-hidden="true" />
                  </div>

                  <div>
                    <p className="text-sm font-medium text-text-primary">
                      {feature.name}
                    </p>
                    <p className="mt-0.5 text-xs text-text-tertiary">
                      {feature.description}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>

        <p className="text-xs text-text-muted">ATLAS v0.1.0</p>
      </aside>

      {/* Right form area */}
      <main className="flex flex-1 items-center justify-center p-4 sm:p-6">
        <Outlet />
      </main>
    </div>
  );
}
