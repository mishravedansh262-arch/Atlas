import type { NextFunction, Request, Response } from 'express';

import { signToken } from '../utils/jwt.js';
import { setAuthCookie, clearAuthCookie } from '../utils/cookies.js';
import * as authService from '../services/auth.service.js';
import type { RegisterInput, LoginInput } from '../types/auth.schema.js';

/**
 * POST /api/auth/register
 *
 * Body has already been validated by the `validate(registerSchema)` middleware.
 */
export async function register(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const user = await authService.registerUser(req.body as RegisterInput);
    const token = signToken(String(user._id));
    setAuthCookie(res, token);

    res.status(201).json({
      success: true,
      data: {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
        },
      },
    });
  } catch (err) {
    next(err);
  }
}

/**
 * POST /api/auth/login
 *
 * Body has already been validated by the `validate(loginSchema)` middleware.
 */
export async function login(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const user = await authService.loginUser(req.body as LoginInput);
    const token = signToken(String(user._id));
    setAuthCookie(res, token);

    res.status(200).json({
      success: true,
      data: {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
        },
      },
    });
  } catch (err) {
    next(err);
  }
}

/**
 * POST /api/auth/logout
 *
 * Clears the auth cookie.
 */
export function logout(_req: Request, res: Response): void {
  clearAuthCookie(res);
  res.status(200).json({ success: true, message: 'Logged out' });
}

/**
 * GET /api/auth/me
 *
 * Returns the currently authenticated user.
 * Only reachable behind the `protect` middleware.
 */
export function getMe(req: Request, res: Response): void {
  const user = req.user!;

  res.status(200).json({
    success: true,
    data: {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    },
  });
}
