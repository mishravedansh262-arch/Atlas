import { Router } from 'express';

import { validate } from '../middleware/validate.middleware.js';
import { protect } from '../middleware/auth.middleware.js';
import { createMilestoneSchema, updateMilestoneSchema } from '../types/milestone.schema.js';
import * as milestoneController from '../controllers/milestone.controller.js';

export const milestoneRouter = Router();

milestoneRouter.use(protect);

milestoneRouter.post('/', validate(createMilestoneSchema), milestoneController.createMilestone);
milestoneRouter.get('/', milestoneController.getMilestones);
milestoneRouter.get('/:id', milestoneController.getMilestone);
milestoneRouter.patch('/:id', validate(updateMilestoneSchema), milestoneController.updateMilestone);
milestoneRouter.delete('/:id', milestoneController.deleteMilestone);
