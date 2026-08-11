import { Navigate, Outlet } from "react-router-dom";

import { useAuth } from "../hooks/useAuth";
import Spinner from "../components/ui/Spinner";

/**
 * Renders child routes only when authenticated; otherwise redirects to Login.
 * Shows a loading spinner while session restoration is in progress to prevent
 * premature redirects on hard refresh.
 */
export function ProtectedRoute() {
  const { isAuthenticated, isRestoring } = useAuth();

  if (isRestoring) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-surface-base">
        <Spinner size={24} className="text-brand-400" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}

/**
 * Renders public auth routes; authenticated users are redirected to Dashboard.
 * Shows a loading spinner while session restoration is in progress to prevent
 * flashing the auth page before redirecting an already-logged-in user.
 */
export function PublicRoute() {
  const { isAuthenticated, isRestoring } = useAuth();

  if (isRestoring) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-surface-base">
        <Spinner size={24} className="text-brand-400" />
      </div>
    );
  }

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
}
