import { z } from 'zod';

export const updateProfileSchema = z.object({
  name: z.string().trim().min(2).max(100).optional(),
  bio: z.string().trim().max(500).optional(),
  branch: z.string().trim().max(100).optional(),
  year: z.number().int().min(1).max(6).optional(),
  semester: z.number().int().min(1).max(12).optional(),
  university: z.string().trim().max(200).optional(),
  skills: z.array(z.string().trim().max(50)).max(20).optional(),
  interests: z.array(z.string().trim().max(50)).max(20).optional(),
});

export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;
