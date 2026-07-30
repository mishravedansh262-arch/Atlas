export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface AuthActions {
  login: (user: User) => void;
  logout: () => void;
  setLoading: (isLoading: boolean) => void;
}

export type AuthStore = AuthState & AuthActions;
