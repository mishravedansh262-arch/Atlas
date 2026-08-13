import { Outlet } from "react-router-dom";
import { BarChart3, CheckSquare, FolderKanban, Map } from "lucide-react";

const capabilities = [
  {
    name: "Projects",
    description: "Track every project from planning through completion.",
    icon: FolderKanban,
  },
  {
    name: "Tasks",
    description: "Break work into actions with priority and due dates.",
    icon: CheckSquare,
  },
  {
    name: "Roadmap",
    description: "Plan milestones across your academic timeline.",
    icon: Map,
  },
  {
    name: "Analytics",
    description: "Understand your progress from real activity.",
    icon: BarChart3,
  },
];

export default function AuthLayout() {
  return (
    <div className="flex min-h-screen bg-surface-base text-text-primary">
      {/* Brand panel */}
      <aside className="hidden w-1/2 flex-col justify-between border-r border-border-primary bg-surface-primary p-10 lg:flex xl:p-12">
        <div className="flex items-center gap-2.5">
          <div className="flex size-8 items-center justify-center rounded-lg bg-brand-500 text-xs font-bold text-white">
            A
          </div>
          <div>
            <p className="text-sm font-bold tracking-tight text-text-primary">
              ATLAS
            </p>
            <p className="meta-mono text-[10px] text-text-muted">
              Command Center
            </p>
          </div>
        </div>

        <div className="max-w-sm">
          <h2 className="text-[32px] font-semibold leading-10 tracking-tight text-text-primary">
            Your B.Tech journey,
            <br />
            <span className="text-gradient">under control.</span>
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-text-secondary">
            Projects, tasks, milestones and progress — in one focused
            workspace built for how you actually work.
          </p>

          <ul className="mt-9 space-y-5">
            {capabilities.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.name} className="flex items-start gap-3">
                  <div className="rounded-lg border border-border-primary bg-surface-secondary p-2 text-brand-400">
                    <Icon size={15} strokeWidth={1.5} aria-hidden="true" />
                  </div>
                  <div>
                    <p className="label-mono text-text-primary">{item.name}</p>
                    <p className="mt-1 text-xs text-text-tertiary">
                      {item.description}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>

        <p className="meta-mono text-[10px] text-text-muted">v1.0.0</p>
      </aside>

      {/* Form panel */}
      <main className="flex flex-1 items-center justify-center p-4 sm:p-6">
        <Outlet />
      </main>
    </div>
  );
}
