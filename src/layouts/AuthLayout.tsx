import { Outlet } from "react-router-dom";
import { BarChart3, CheckSquare, FolderKanban } from "lucide-react";

const features = [
  {
    name: "Project Management",
    description: "Organize your work into focused, trackable projects.",
    icon: FolderKanban,
  },
  {
    name: "Task Tracking",
    description: "Stay on top of every task with a clear daily overview.",
    icon: CheckSquare,
  },
  {
    name: "Productivity Analytics",
    description: "Understand your progress with meaningful insights.",
    icon: BarChart3,
  },
];

export default function AuthLayout() {
  return (
    <div className="flex min-h-screen bg-zinc-950 text-zinc-100">
      <aside className="hidden w-1/2 flex-col justify-between border-r border-zinc-800 p-12 lg:flex">
        <div>
          <h1 className="text-3xl font-bold tracking-wide text-white">
            🚀 ATLAS
          </h1>
          <p className="mt-1 text-sm text-zinc-400">AI Productivity OS</p>
        </div>

        <div className="max-w-md">
          <h2 className="text-2xl font-semibold text-white">
            Your work, organized in one place.
          </h2>
          <p className="mt-3 text-zinc-400">
            ATLAS brings your projects, tasks, and productivity insights
            together so you can focus on what matters.
          </p>

          <ul className="mt-10 space-y-6">
            {features.map((feature) => {
              const Icon = feature.icon;

              return (
                <li key={feature.name} className="flex items-start gap-4">
                  <div className="rounded-xl bg-zinc-900 p-2 text-blue-500">
                    <Icon size={20} aria-hidden="true" />
                  </div>

                  <div>
                    <p className="font-medium text-white">{feature.name}</p>
                    <p className="mt-1 text-sm text-zinc-400">
                      {feature.description}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>

        <p className="text-xs text-zinc-500">ATLAS v0.1.0</p>
      </aside>

      <main className="flex flex-1 items-center justify-center p-4 sm:p-6">
        <Outlet />
      </main>
    </div>
  );
}
