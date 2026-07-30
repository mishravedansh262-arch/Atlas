import type { User } from "../types/Auth";

/**
 * Builds a mock authenticated user until the real backend
 * arrives in a later milestone.
 */
export function createMockUser(overrides: Partial<User> = {}): User {
  return {
    id: "usr_mock_001",
    name: "Vedansh Mishra",
    email: "vedansh@atlas.app",
    avatar: "https://api.dicebear.com/9.x/initials/svg?seed=Vedansh%20Mishra",
    ...overrides,
  };
}
