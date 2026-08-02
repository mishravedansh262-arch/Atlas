import type { LoginCredentials, RegisterPayload, User } from "../types/Auth";

/**
 * Authentication service — the single integration point for auth IO.
 *
 * Currently mock-backed; each function simulates a network round-trip.
 * When the real backend arrives, only this file needs to change —
 * the hook, store, and pages stay untouched.
 */

const MOCK_REQUEST_DELAY_MS = 1500;

function simulateRequest(): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, MOCK_REQUEST_DELAY_MS));
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
  return createMockUser({ email: credentials.email });
}

export async function register(payload: RegisterPayload): Promise<User> {
  await simulateRequest();
  return createMockUser({ name: payload.fullName, email: payload.email });
}

export async function logout(): Promise<void> {
  // No server session to invalidate yet.
}

/** Restores the session user. Always null until session persistence exists. */
export async function getCurrentUser(): Promise<User | null> {
  return null;
}
