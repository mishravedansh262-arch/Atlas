import { api } from "../lib/api";
import type { LoginCredentials, RegisterPayload, User } from "../types/Auth";

/**
 * Authentication service — the single integration point for auth IO.
 *
 * Communicates with the backend auth API. Authentication state is managed
 * via HTTP-only cookies set by the server — no tokens are stored client-side.
 */

/** Shape returned by the backend for user data. */
interface AuthApiResponse {
  success: boolean;
  data: {
    user: {
      id: string;
      name: string;
      email: string;
    };
  };
}

/** Generates a deterministic avatar URL from the user's name. */
function generateAvatarUrl(name: string): string {
  return `https://api.dicebear.com/9.x/initials/svg?seed=${encodeURIComponent(name)}`;
}

/** Maps the backend user payload to the frontend User type. */
function toUser(raw: AuthApiResponse["data"]["user"]): User {
  return {
    id: raw.id,
    name: raw.name,
    email: raw.email,
    avatar: generateAvatarUrl(raw.name),
  };
}

export async function login(credentials: LoginCredentials): Promise<User> {
  const { data } = await api.post<AuthApiResponse>("/auth/login", credentials);
  return toUser(data.data.user);
}

export async function register(payload: RegisterPayload): Promise<User> {
  const { data } = await api.post<AuthApiResponse>("/auth/register", payload);
  return toUser(data.data.user);
}

export async function logout(): Promise<void> {
  await api.post("/auth/logout");
}

/**
 * Restores the session by calling the protected /auth/me endpoint.
 * Returns the current user if a valid session cookie exists, or null otherwise.
 */
export async function getCurrentUser(): Promise<User | null> {
  try {
    const { data } = await api.get<AuthApiResponse>("/auth/me");
    return toUser(data.data.user);
  } catch {
    // 401 or network error — no active session
    return null;
  }
}
