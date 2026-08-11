import { Router } from 'express';

import { validate } from '../middleware/validate.middleware.js';
import { protect } from '../middleware/auth.middleware.js';
import { createTaskSchema, updateTaskSchema } from '../types/task.schema.js';
import * as taskController from '../controllers/task.controller.js';

export const taskRouter = Router();

// All task routes require authentication
taskRouter.use(protect);

taskRouter.post('/', validate(createTaskSchema), taskController.createTask);
taskRouter.get('/', taskController.getTasks);
taskRouter.get('/:id', taskController.getTask);
taskRouter.patch('/:id', validate(updateTaskSchema), taskController.updateTask);
taskRouter.delete('/:id', taskController.deleteTask);
