import { Router } from 'express';

import { validate } from '../middleware/validate.middleware.js';
import { protect } from '../middleware/auth.middleware.js';
import { createProjectSchema, updateProjectSchema } from '../types/project.schema.js';
import * as projectController from '../controllers/project.controller.js';

export const projectRouter = Router();

// All project routes require authentication
projectRouter.use(protect);

projectRouter.post('/', validate(createProjectSchema), projectController.createProject);
projectRouter.get('/', projectController.getProjects);
projectRouter.get('/:id', projectController.getProject);
projectRouter.patch('/:id', validate(updateProjectSchema), projectController.updateProject);
projectRouter.delete('/:id', projectController.deleteProject);
