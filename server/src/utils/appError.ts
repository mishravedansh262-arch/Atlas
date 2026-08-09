/**
 * Operational error with an HTTP status code.
 *
 * Throw (or `next()`) an AppError anywhere in a route/service and the global
 * error handler will turn it into a proper HTTP response. Anything that is
 * NOT an AppError is treated as an unexpected failure (500).
 */
export class AppError extends Error {
  constructor(
    message: string,
    public readonly statusCode: number,
  ) {
    super(message);
    this.name = 'AppError';
  }
}
