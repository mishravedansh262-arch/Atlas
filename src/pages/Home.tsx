import { Link } from "react-router-dom";
import { ArrowRight, BarChart3, CheckSquare, Target } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    icon: Target,
    title: "Goal Tracking",
    description: "Set and track milestones across your entire B.Tech journey.",
  },
  {
    icon: CheckSquare,
    title: "Task Management",
    description: "Break down goals into actionable daily tasks.",
  },
  {
    icon: BarChart3,
    title: "Progress Analytics",
    description: "Visualize your productivity and growth over time.",
  },
];

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-surface-base text-text-primary">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 lg:px-10">
        <div className="flex items-center gap-2.5">
          <div className="flex size-8 items-center justify-center rounded-lg bg-brand-600 text-sm font-bold text-white">
            A
          </div>
          <span className="text-sm font-semibold tracking-tight">ATLAS</span>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/login"
            className="rounded-lg px-4 py-2 text-sm font-medium text-text-secondary transition-colors hover:text-text-primary"
          >
            Log in
          </Link>
          <Link
            to="/register"
            className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-medium text-white transition-all hover:bg-brand-700 active:scale-[0.97]"
          >
            Get started
          </Link>
        </div>
      </header>

      {/* Hero */}
      <main className="flex flex-1 flex-col items-center justify-center px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="max-w-2xl"
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border-secondary bg-surface-secondary px-3 py-1.5">
            <span className="size-2 rounded-full bg-brand-500" />
            <span className="text-xs font-medium text-text-secondary">
              Built for B.Tech students
            </span>
          </div>

          <h1 className="text-4xl font-bold leading-tight tracking-tight md:text-5xl lg:text-6xl">
            Your academic journey,
            <br />
            <span className="text-gradient">designed to succeed.</span>
          </h1>

          <p className="mx-auto mt-5 max-w-lg text-base leading-relaxed text-text-secondary md:text-lg">
            ATLAS is a productivity platform that helps you organize projects,
            track progress, and stay on top of your B.Tech goals.
          </p>

          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link
              to="/register"
              className="inline-flex items-center gap-2 rounded-xl bg-brand-600 px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-brand-700 active:scale-[0.97]"
            >
              Start for free
              <ArrowRight size={16} />
            </Link>
            <Link
              to="/login"
              className="inline-flex items-center gap-2 rounded-xl border border-border-secondary px-6 py-3 text-sm font-medium text-text-secondary transition-all hover:border-border-hover hover:text-text-primary"
            >
              I have an account
            </Link>
          </div>
        </motion.div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
          className="mx-auto mt-20 grid max-w-3xl gap-6 sm:grid-cols-3"
        >
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="rounded-xl border border-border-secondary bg-surface-secondary p-5 text-left transition-colors hover:border-border-hover"
              >
                <div className="mb-3 inline-flex rounded-lg border border-border-secondary bg-surface-tertiary p-2 text-brand-400">
                  <Icon size={18} />
                </div>
                <h3 className="text-sm font-medium text-text-primary">
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
      <footer className="px-6 py-6 text-center">
        <p className="text-xs text-text-muted">
          ATLAS v0.1.0 — Built with purpose.
        </p>
      </footer>
    </div>
  );
}
