import jwt, { type SignOptions } from 'jsonwebtoken';

import { env } from '../config/env.js';

/**
 * JWT signing/verification. The token carries only the user id (`sub`) —
 * anything else belongs in the database, not the token.
 */

export function signToken(userId: string): string {
  return jwt.sign({}, env.jwtSecret, {
    subject: userId,
    expiresIn: env.jwtExpiresIn as SignOptions['expiresIn'],
  });
}

/** Returns the user id from a valid token; throws on invalid/expired tokens. */
export function verifyToken(token: string): string {
  const decoded = jwt.verify(token, env.jwtSecret);

  if (typeof decoded === 'string' || typeof decoded.sub !== 'string') {
    throw new jwt.JsonWebTokenError('Token payload missing subject');
  }

  return decoded.sub;
}
