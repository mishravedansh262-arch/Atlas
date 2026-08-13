/** Centralized React Query keys for cache consistency. */
export const queryKeys = {
  projects: ["projects"] as const,
  tasks: ["tasks"] as const,
  profile: ["profile"] as const,
  milestones: ["milestones"] as const,
} as const;
