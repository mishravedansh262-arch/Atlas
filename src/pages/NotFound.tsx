import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-surface-base px-6 text-center">
      <p className="label-mono text-text-muted">Error 404</p>
      <h1 className="mt-4 text-2xl font-semibold tracking-tight text-text-primary">
        Page not found
      </h1>
      <p className="mt-2 max-w-xs text-sm leading-relaxed text-text-secondary">
        This route doesn&apos;t exist, or it has moved somewhere else.
      </p>
      <Link
        to="/"
        className="label-mono mt-7 inline-flex items-center gap-2 rounded-lg border border-border-primary bg-surface-secondary px-4 py-2.5 text-text-secondary transition-colors hover:border-border-hover hover:text-text-primary"
      >
        <ArrowLeft size={14} strokeWidth={1.5} />
        Back to home
      </Link>
    </div>
  );
}
