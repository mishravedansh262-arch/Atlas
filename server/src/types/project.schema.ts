import { z } from 'zod';

export const createProjectSchema = z.object({
  title: z
    .string({ error: 'Title is required' })
    .trim()
    .min(1, 'Title is required')
    .max(200, 'Title must be at most 200 characters'),
  description: z
    .string({ error: 'Description is required' })
    .trim()
    .min(1, 'Description is required')
    .max(2000, 'Description must be at most 2000 characters'),
  status: z.enum(['planning', 'in-progress', 'completed', 'on-hold']).optional(),
  priority: z.enum(['low', 'medium', 'high', 'critical']).optional(),
  progress: z.number().int().min(0).max(100).optional(),
  technologies: z.array(z.string().trim().max(50)).max(20).optional(),
  type: z.enum(['academic', 'personal', 'open-source', 'freelance']).optional(),
  deadline: z.string().datetime().optional(),
  milestone: z.string().trim().max(200).optional(),
});

export const updateProjectSchema = createProjectSchema.partial();

export type CreateProjectInput = z.infer<typeof createProjectSchema>;
export type UpdateProjectInput = z.infer<typeof updateProjectSchema>;
