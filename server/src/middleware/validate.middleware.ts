import type { NextFunction, Request, Response } from 'express';
import type { ZodType } from 'zod';

import { AppError } from '../utils/appError.js';

/**
 * Schema map — callers specify which parts of the request to validate.
 * Every key is optional; only the keys that are provided are validated.
 */
interface ValidationSchemas {
  body?: ZodType;
  params?: ZodType;
  query?: ZodType;
}

/**
 * Validates request data against Zod schemas.
 *
 * Accepts either a single schema (validates `req.body` — backward-compatible)
 * or a `{ body?, params?, query? }` map to validate multiple sources.
 *
 * On failure, forwards a 400 with the first issue's message.
 */
export function validate(
  schemaOrMap: ZodType | ValidationSchemas,
): (req: Request, res: Response, next: NextFunction) => void {
  // Normalise: a bare ZodType means body-only validation.
  const schemas: ValidationSchemas =
    'safeParse' in schemaOrMap ? { body: schemaOrMap } : schemaOrMap;

  return (req: Request, _res: Response, next: NextFunction) => {
    const targets: Array<{ source: 'body' | 'params' | 'query'; schema: ZodType }> = [];

    if (schemas.body) targets.push({ source: 'body', schema: schemas.body });
    if (schemas.params) targets.push({ source: 'params', schema: schemas.params });
    if (schemas.query) targets.push({ source: 'query', schema: schemas.query });

    for (const { source, schema } of targets) {
      const result = schema.safeParse(req[source]);

      if (!result.success) {
        next(new AppError(result.error.issues[0]?.message ?? `Invalid ${source}`, 400));
        return;
      }

      // Replace with parsed (and potentially transformed) data.
      // eslint-disable-next-line @typescript-eslint/no-explicit-any -- Express types req.body/params/query as any
      (req as Record<string, any>)[source] = result.data;
    }

    next();
  };
}
