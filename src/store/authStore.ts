import { create } from "zustand";

import type { AuthState, AuthStore, User } from "../types/Auth";

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
};

/**
 * Holds authentication state only. Business logic lives in
 * useAuth() and the auth service — actions here just mutate state.
 */
export const useAuthStore = create<AuthStore>((set) => ({
  ...initialState,

  setUser: (user: User) => set({ user, isAuthenticated: true }),

  clearUser: () => set(initialState),
}));
