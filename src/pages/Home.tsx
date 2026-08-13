import { Link } from "react-router-dom";
import { ArrowRight, BarChart3, CheckSquare, Map, Target } from "lucide-react";
import { motion } from "framer-motion";

const capabilities = [
  {
    icon: Target,
    title: "Projects",
    description:
      "Every project with status, priority, progress and deadline in one view.",
  },
  {
    icon: CheckSquare,
    title: "Tasks",
    description:
      "Break projects into actions. Priorities, categories and due dates.",
  },
  {
    icon: Map,
    title: "Roadmap",
    description:
      "Milestones mapped across your degree, with real progress tracking.",
  },
  {
    icon: BarChart3,
    title: "Analytics",
    description:
      "Streaks, completion rates and insights derived from real activity.",
  },
];

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-surface-base text-text-primary">
      {/* Header */}
      <header className="flex items-center justify-between border-b border-border-primary px-5 py-4 lg:px-12">
        <div className="flex items-center gap-2.5">
          <div className="flex size-7 items-center justify-center rounded-lg bg-brand-500 text-[11px] font-bold text-white">
            A
          </div>
          <span className="label-mono text-text-secondary">Atlas</span>
        </div>

        <div className="flex items-center gap-2">
          <Link
            to="/login"
            className="label-mono rounded-lg px-3 py-2 text-text-tertiary transition-colors hover:text-text-primary"
          >
            Log in
          </Link>
          <Link
            to="/register"
            className="label-mono rounded-lg bg-brand-500 px-3.5 py-2 text-white transition-colors hover:bg-brand-600 active:scale-[0.98]"
          >
            Get started
          </Link>
        </div>
      </header>

      {/* Hero */}
      <main className="flex flex-1 flex-col items-center justify-center px-5 py-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="max-w-2xl"
        >
          <p className="label-mono text-text-muted">
            Personal Productivity Platform
          </p>

          <h1 className="mt-5 text-4xl font-bold leading-[1.1] tracking-[-0.02em] sm:text-5xl lg:text-6xl">
            Your personal
            <br />
            <span className="text-gradient">command center.</span>
          </h1>

          <p className="mx-auto mt-5 max-w-md text-sm leading-relaxed text-text-secondary sm:text-base">
            ATLAS keeps your projects, tasks, milestones and progress in one
            focused workspace — so you always know what to work on next.
          </p>

          <div className="mt-8 flex flex-col items-center gap-2.5 sm:flex-row sm:justify-center">
            <Link
              to="/register"
              className="label-mono inline-flex w-full items-center justify-center gap-2 rounded-lg bg-brand-500 px-5 py-3 text-white transition-colors hover:bg-brand-600 active:scale-[0.98] sm:w-auto"
            >
              Enter ATLAS
              <ArrowRight size={14} strokeWidth={2} />
            </Link>
            <Link
              to="/login"
              className="label-mono inline-flex w-full items-center justify-center rounded-lg border border-border-primary px-5 py-3 text-text-secondary transition-colors hover:border-border-hover hover:text-text-primary sm:w-auto"
            >
              I have an account
            </Link>
          </div>
        </motion.div>

        {/* Capabilities */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.12, ease: "easeOut" }}
          className="mx-auto mt-20 grid w-full max-w-3xl gap-3 sm:grid-cols-2"
        >
          {capabilities.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="rounded-xl border border-border-primary bg-surface-secondary p-4 text-left transition-colors hover:border-border-hover"
              >
                <div className="flex items-center gap-2.5">
                  <Icon
                    size={15}
                    strokeWidth={1.5}
                    className="text-brand-400"
                    aria-hidden="true"
                  />
                  <h2 className="label-mono text-text-primary">{item.title}</h2>
                </div>
                <p className="mt-2 text-xs leading-relaxed text-text-tertiary">
                  {item.description}
                </p>
              </div>
            );
          })}
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border-primary px-5 py-5 text-center">
        <p className="meta-mono text-[10px] text-text-muted">
          ATLAS v1.0.0 — Built with purpose.
        </p>
      </footer>
    </div>
  );
}
