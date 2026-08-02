/** Authenticated user as exposed to the UI. */
export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
}

/** Payload sent to the auth service when logging in. */
export interface LoginCredentials {
  email: string;
  password: string;
}

/** Payload sent to the auth service when registering. */
export interface RegisterPayload {
  fullName: string;
  email: string;
  password: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}

export interface AuthActions {
  setUser: (user: User) => void;
  clearUser: () => void;
}

export type AuthStore = AuthState & AuthActions;
