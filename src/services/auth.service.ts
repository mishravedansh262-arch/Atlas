import type { LoginCredentials, RegisterPayload, User } from "../types/Auth";

/**
 * Authentication service — the single integration point for auth IO.
 *
 * Currently mock-backed; each function simulates a network round-trip.
 * When the real backend arrives, only this file needs to change —
 * the hook, store, and pages stay untouched.
 */

const MOCK_REQUEST_DELAY_MS = 1500;

/**
 * localStorage key for the mock session. A real backend would use an
 * httpOnly cookie instead; this key (and the read/write helpers below)
 * disappear when that backend arrives.
 */
const SESSION_STORAGE_KEY = "atlas.session";

function simulateRequest(): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, MOCK_REQUEST_DELAY_MS));
}

function persistSession(user: User): void {
  localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(user));
}

function readSession(): User | null {
  const raw = localStorage.getItem(SESSION_STORAGE_KEY);

  if (!raw) {
    return null;
  }

  try {
    return JSON.parse(raw) as User;
  } catch {
    // Corrupted entry — discard it rather than crash session restore.
    localStorage.removeItem(SESSION_STORAGE_KEY);
    return null;
  }
}

function createMockUser(overrides: Partial<User> = {}): User {
  return {
    id: "usr_mock_001",
    name: "Vedansh Mishra",
    email: "vedansh@atlas.app",
    avatar: "https://api.dicebear.com/9.x/initials/svg?seed=Vedansh%20Mishra",
    ...overrides,
  };
}

export async function login(credentials: LoginCredentials): Promise<User> {
  await simulateRequest();

  const user = createMockUser({ email: credentials.email });
  persistSession(user);
  return user;
}

export async function register(payload: RegisterPayload): Promise<User> {
  await simulateRequest();

  const user = createMockUser({ name: payload.fullName, email: payload.email });
  persistSession(user);
  return user;
}

export async function logout(): Promise<void> {
  localStorage.removeItem(SESSION_STORAGE_KEY);
}

/** Restores the session user, or null when no session exists. */
export async function getCurrentUser(): Promise<User | null> {
  return readSession();
}
