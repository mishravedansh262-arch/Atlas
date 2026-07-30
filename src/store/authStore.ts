import { create } from "zustand";

import type { AuthState, AuthStore, User } from "../types/Auth";

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
};

export const useAuthStore = create<AuthStore>((set) => ({
  ...initialState,

  login: (user: User) =>
    set({ user, isAuthenticated: true, isLoading: false }),

  logout: () => set(initialState),

  setLoading: (isLoading: boolean) => set({ isLoading }),
}));
