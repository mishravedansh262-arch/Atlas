import { Router } from 'express';

import { validate } from '../middleware/validate.middleware.js';
import { protect } from '../middleware/auth.middleware.js';
import { registerSchema, loginSchema } from '../types/auth.schema.js';
import * as authController from '../controllers/auth.controller.js';

/**
 * /api/auth routes
 */
export const authRouter = Router();

authRouter.post('/register', validate(registerSchema), authController.register);
authRouter.post('/login', validate(loginSchema), authController.login);
authRouter.post('/logout', authController.logout);
authRouter.get('/me', protect, authController.getMe);
