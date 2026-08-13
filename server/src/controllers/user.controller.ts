import type { NextFunction, Request, Response } from 'express';

import * as userService from '../services/user.service.js';
import type { UpdateProfileInput } from '../types/user.schema.js';

/**
 * GET /api/users/me — returns the authenticated user's full profile.
 */
export async function getProfile(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const user = await userService.getProfile(String(req.user!._id));
    res.status(200).json({
      success: true,
      data: {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          bio: user.bio ?? '',
          branch: user.branch ?? '',
          year: user.year ?? null,
          semester: user.semester ?? null,
          university: user.university ?? '',
          skills: user.skills ?? [],
          interests: user.interests ?? [],
          createdAt: user.createdAt,
        },
      },
    });
  } catch (err) {
    next(err);
  }
}

/**
 * PATCH /api/users/me — updates the authenticated user's profile.
 */
export async function updateProfile(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const user = await userService.updateProfile(
      String(req.user!._id),
      req.body as UpdateProfileInput,
    );
    res.status(200).json({
      success: true,
      data: {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          bio: user.bio ?? '',
          branch: user.branch ?? '',
          year: user.year ?? null,
          semester: user.semester ?? null,
          university: user.university ?? '',
          skills: user.skills ?? [],
          interests: user.interests ?? [],
          createdAt: user.createdAt,
        },
      },
    });
  } catch (err) {
    next(err);
  }
}
