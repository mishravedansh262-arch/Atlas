import { useAuthStore } from "../store/authStore";
import * as authService from "../services/auth.service";
import type { LoginCredentials, RegisterPayload } from "../types/Auth";

/**
 * Single access point for authentication state and actions.
 * Orchestrates the auth service and the store so pages only
 * coordinate UI (toasts, navigation) around these calls.
 */
export function useAuth() {
  const user = useAuthStore((state) => state.user);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const setUser = useAuthStore((state) => state.setUser);
  const clearUser = useAuthStore((state) => state.clearUser);

  async function login(credentials: LoginCredentials) {
    const authenticatedUser = await authService.login(credentials);
    setUser(authenticatedUser);
  }

  async function register(payload: RegisterPayload) {
    const registeredUser = await authService.register(payload);
    setUser(registeredUser);
  }

  async function logout() {
    await authService.logout();
    clearUser();
  }

  return { user, isAuthenticated, login, register, logout };
}
