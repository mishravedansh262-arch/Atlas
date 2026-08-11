import { z } from 'zod';

export const createTaskSchema = z.object({
  title: z
    .string({ error: 'Title is required' })
    .trim()
    .min(1, 'Title is required')
    .max(300, 'Title must be at most 300 characters'),
  description: z.string().trim().max(2000).optional(),
  status: z.enum(['todo', 'in-progress', 'completed']).optional(),
  priority: z.enum(['low', 'medium', 'high', 'critical']).optional(),
  category: z.enum(['learning', 'project', 'career', 'personal']).optional(),
  dueDate: z.string().datetime().optional(),
  project: z.string().optional(),
});

export const updateTaskSchema = createTaskSchema.partial();

export type CreateTaskInput = z.infer<typeof createTaskSchema>;
export type UpdateTaskInput = z.infer<typeof updateTaskSchema>;
