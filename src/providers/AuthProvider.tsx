import { useEffect, type ReactNode } from "react";

import Spinner from "../components/ui/Spinner";
import { useAuth } from "../hooks/useAuth";

type AuthProviderProps = {
  children: ReactNode;
};

/**
 * Restores any existing session before the app renders.
 * Gating children on isRestoring prevents route guards from
 * redirecting a logged-in user to /login on a hard refresh.
 */
export default function AuthProvider({ children }: AuthProviderProps) {
  const { isRestoring, restoreSession } = useAuth();

  useEffect(() => {
    restoreSession();
    // Runs once at startup; restoreSession is stable for the app's lifetime.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isRestoring) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-950">
        <Spinner size={32} className="text-zinc-400" />
      </div>
    );
  }

  return children;
}
