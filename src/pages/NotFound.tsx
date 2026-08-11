import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-surface-base px-6 text-center">
      <p className="text-6xl font-bold text-text-muted">404</p>
      <h1 className="mt-4 text-xl font-semibold text-text-primary">
        Page not found
      </h1>
      <p className="mt-2 text-sm text-text-secondary">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Link
        to="/"
        className="mt-6 inline-flex items-center gap-2 rounded-lg bg-surface-secondary px-4 py-2.5 text-sm font-medium text-text-primary transition-colors hover:bg-surface-tertiary"
      >
        <ArrowLeft size={16} />
        Back to home
      </Link>
    </div>
  );
}
