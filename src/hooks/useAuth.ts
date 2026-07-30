import { useAuthStore } from "../store/authStore";

/**
 * Single access point for authentication state and actions.
 * Pages and components should use this hook instead of
 * importing the Zustand store directly.
 */
export function useAuth() {
  const user = useAuthStore((state) => state.user);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const isLoading = useAuthStore((state) => state.isLoading);
  const login = useAuthStore((state) => state.login);
  const logout = useAuthStore((state) => state.logout);
  const setLoading = useAuthStore((state) => state.setLoading);

  return { user, isAuthenticated, isLoading, login, logout, setLoading };
}
