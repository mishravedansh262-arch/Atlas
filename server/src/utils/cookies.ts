import type { CookieOptions, Response } from 'express';

import { env } from '../config/env.js';

export const AUTH_COOKIE_NAME = 'atlas_token';

const SEVEN_DAYS_MS = 7 * 24 * 60 * 60 * 1000;

/**
 * Cookie options must be IDENTICAL between set and clear —
 * res.clearCookie silently fails to remove a cookie whose
 * attributes don't match. Hence the shared constant.
 */
const baseOptions: CookieOptions = {
  httpOnly: true,
  secure: env.isProduction,
  sameSite: 'lax',
  path: '/',
};

export function setAuthCookie(res: Response, token: string): void {
  res.cookie(AUTH_COOKIE_NAME, token, { ...baseOptions, maxAge: SEVEN_DAYS_MS });
}

export function clearAuthCookie(res: Response): void {
  res.clearCookie(AUTH_COOKIE_NAME, baseOptions);
}
