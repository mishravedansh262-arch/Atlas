import type { NextFunction, Request, Response } from 'express';
import { Error as MongooseError } from 'mongoose';

import { env } from '../config/env.js';
import { AppError } from '../utils/appError.js';

/**
 * 404 handler — runs when no route matched the request.
 * Registered after all routes in app.ts.
 */
export function notFoundHandler(req: Request, res: Response): void {
  res.status(404).json({
    success: false,
    message: `Route ${req.method} ${req.originalUrl} not found`,
  });
}

/** MongoDB duplicate-key errors carry `code: 11000` but no dedicated class. */
function isDuplicateKeyError(err: unknown): boolean {
  return (
    typeof err === 'object' &&
    err !== null &&
    'code' in err &&
    (err as { code: unknown }).code === 11000
  );
}

/**
 * Global error handler — the single place where thrown/forwarded errors
 * become HTTP responses. Express identifies it by its 4-argument signature,
 * so `next` must stay in the parameter list even though it is unused.
 */
export function errorHandler(
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
): void {
  // Expected, operational errors — safe to expose the message.
  if (err instanceof AppError) {
    res.status(err.statusCode).json({ success: false, message: err.message });
    return;
  }

  if (err instanceof MongooseError.ValidationError) {
    res.status(400).json({ success: false, message: err.message });
    return;
  }

  if (isDuplicateKeyError(err)) {
    res.status(409).json({ success: false, message: 'A record with that value already exists' });
    return;
  }

  // Unexpected failure — log fully server-side, never leak details in production.
  console.error('[error]', err);

  const message =
    !env.isProduction && err instanceof Error ? err.message : 'Internal server error';

  res.status(500).json({ success: false, message });
}
