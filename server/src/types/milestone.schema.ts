import { z } from 'zod';

export const createMilestoneSchema = z.object({
  title: z.string({ error: 'Title is required' }).trim().min(1, 'Title is required').max(200),
  description: z.string().trim().max(1000).optional(),
  status: z.enum(['not_started', 'in_progress', 'completed', 'blocked']).optional(),
  category: z.enum(['academics', 'skills', 'projects', 'career']).optional(),
  priority: z.enum(['low', 'medium', 'high', 'critical']).optional(),
  progress: z.number().int().min(0).max(100).optional(),
  targetDate: z.string().datetime().optional(),
  project: z.string().optional(),
  order: z.number().int().min(0).optional(),
});

export const updateMilestoneSchema = createMilestoneSchema.partial();

export type CreateMilestoneInput = z.infer<typeof createMilestoneSchema>;
export type UpdateMilestoneInput = z.infer<typeof updateMilestoneSchema>;
