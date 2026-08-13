import { Link } from "react-router-dom";
import { ArrowRight, BarChart3, CheckSquare, Map, Target } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    icon: Target,
    title: "Projects & Goals",
    description: "Track every project from planning to completion with clear progress indicators.",
  },
  {
    icon: CheckSquare,
    title: "Tasks & Actions",
    description: "Break work into manageable tasks with priorities, deadlines, and categories.",
  },
  {
    icon: Map,
    title: "Roadmap & Milestones",
    description: "Plan your B.Tech journey with milestones mapped to your academic timeline.",
  },
  {
    icon: BarChart3,
    title: "Analytics & Insights",
    description: "Understand your productivity patterns with real activity-based intelligence.",
  },
];

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-surface-base text-text-primary">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-5 lg:px-12">
        <div className="flex items-center gap-2">
          <div className="flex size-7 items-center justify-center rounded-md bg-brand-600 text-xs font-bold text-white">
            A
          </div>
          <span className="text-sm font-semibold tracking-tight">ATLAS</span>
        </div>

        <div className="flex items-center gap-2">
          <Link
            to="/login"
            className="rounded-lg px-3.5 py-1.5 text-sm font-medium text-text-secondary transition-colors hover:text-text-primary"
          >
            Log in
          </Link>
          <Link
            to="/register"
            className="rounded-lg bg-brand-600 px-3.5 py-1.5 text-sm font-medium text-white transition-all hover:bg-brand-700 active:scale-[0.98]"
          >
            Get started
          </Link>
        </div>
      </header>

      {/* Hero */}
      <main className="flex flex-1 flex-col items-center justify-center px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="max-w-xl"
        >
          <h1 className="text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
            Your personal
            <br />
            <span className="text-gradient">command center.</span>
          </h1>

          <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-text-secondary sm:text-base">
            ATLAS helps you organize projects, track tasks, set milestones,
            and understand your progress through your B.Tech journey.
          </p>

          <div className="mt-7 flex flex-col items-center gap-2.5 sm:flex-row sm:justify-center">
            <Link
              to="/register"
              className="inline-flex items-center gap-2 rounded-lg bg-brand-600 px-5 py-2.5 text-sm font-medium text-white transition-all hover:bg-brand-700 active:scale-[0.98]"
            >
              Enter ATLAS
              <ArrowRight size={15} />
            </Link>
            <Link
              to="/login"
              className="inline-flex items-center gap-2 rounded-lg border border-border-primary px-5 py-2.5 text-sm font-medium text-text-secondary transition-all hover:border-border-hover hover:text-text-primary"
            >
              I have an account
            </Link>
          </div>
        </motion.div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15, ease: "easeOut" }}
          className="mx-auto mt-16 grid max-w-2xl gap-4 sm:grid-cols-2 lg:mt-20"
        >
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="rounded-xl border border-border-secondary bg-surface-secondary p-4 text-left transition-colors hover:border-border-hover"
              >
                <div className="mb-2.5 inline-flex rounded-md bg-surface-elevated p-1.5 text-brand-400">
                  <Icon size={15} />
                </div>
                <h3 className="text-[13px] font-medium text-text-primary">
                  {feature.title}
                </h3>
                <p className="mt-1 text-xs leading-relaxed text-text-tertiary">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="px-6 py-5 text-center">
        <p className="text-[11px] text-text-muted">ATLAS — Built with purpose.</p>
      </footer>
    </div>
  );
}
