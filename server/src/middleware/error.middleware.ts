import type { NextFunction, Request, Response } from 'express';

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
  const message = err instanceof Error ? err.message : 'Internal server error';

  // Log the full error server-side; never leak stack traces to the client.
  console.error('[error]', err);

  res.status(500).json({
    success: false,
    message,
  });
}
