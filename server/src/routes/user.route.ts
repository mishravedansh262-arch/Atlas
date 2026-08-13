import { Router } from 'express';

import { validate } from '../middleware/validate.middleware.js';
import { protect } from '../middleware/auth.middleware.js';
import { updateProfileSchema } from '../types/user.schema.js';
import * as userController from '../controllers/user.controller.js';

export const userRouter = Router();

// All user routes require authentication
userRouter.use(protect);

userRouter.get('/me', userController.getProfile);
userRouter.patch('/me', validate(updateProfileSchema), userController.updateProfile);
