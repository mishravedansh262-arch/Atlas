import type { NextFunction, Request, Response } from 'express';

import { AppError } from '../utils/appError.js';
import { verifyToken } from '../utils/jwt.js';
import { AUTH_COOKIE_NAME } from '../utils/cookies.js';
import { getUserById } from '../services/auth.service.js';

/**
 * Route-level middleware that gates access to authenticated users.
 *
 * 1. Reads the JWT from the `atlas_token` httpOnly cookie.
 * 2. Verifies and decodes it.
 * 3. Loads the user from the database.
 * 4. Attaches the user document to `req.user`.
 *
 * If any step fails, a 401 is returned.
 */
export async function protect(req: Request, _res: Response, next: NextFunction): Promise<void> {
  try {
    const token = req.cookies?.[AUTH_COOKIE_NAME] as string | undefined;

    if (!token) {
      next(new AppError('Not authenticated — please log in', 401));
      return;
    }

    let userId: string;
    try {
      userId = verifyToken(token);
    } catch {
      next(new AppError('Invalid or expired token — please log in again', 401));
      return;
    }

    const user = await getUserById(userId);
    if (!user) {
      next(new AppError('User belonging to this token no longer exists', 401));
      return;
    }

    req.user = user;
    next();
  } catch (err) {
    next(err);
  }
}
