import { Navigate, Outlet } from "react-router-dom";

import { useAuth } from "../hooks/useAuth";

/** Renders child routes only when authenticated; otherwise sends the user to Login. */
export function ProtectedRoute() {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}

/** Renders public auth routes; authenticated users are sent to the Dashboard. */
export function PublicRoute() {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
}
