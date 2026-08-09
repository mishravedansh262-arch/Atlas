import { z } from 'zod';

/**
 * Request-body schemas for /api/auth. These are the single source of truth
 * for what the API accepts — controllers only ever see parsed, typed data.
 */

export const registerSchema = z.object({
  fullName: z
    .string({ error: 'Full name is required' })
    .trim()
    .min(2, 'Full name must be at least 2 characters')
    .max(100, 'Full name must be at most 100 characters'),
  email: z.email({ error: 'Enter a valid email address' }).toLowerCase(),
  password: z
    .string({ error: 'Password is required' })
    .min(8, 'Password must be at least 8 characters')
    .max(128, 'Password must be at most 128 characters'),
});

export const loginSchema = z.object({
  email: z.email({ error: 'Enter a valid email address' }).toLowerCase(),
  password: z.string({ error: 'Password is required' }).min(1, 'Password is required'),
});

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
