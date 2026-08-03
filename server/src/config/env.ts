import 'dotenv/config';

/**
 * Centralized, validated environment configuration.
 *
 * Every environment variable the server uses is read HERE and nowhere else.
 * The rest of the codebase imports the typed `env` object, so a missing or
 * misspelled variable fails loudly at startup instead of silently at runtime.
 */

interface Env {
  nodeEnv: 'development' | 'production' | 'test';
  port: number;
  clientOrigin: string;
  isProduction: boolean;
}

function requireNumber(name: string, fallback: number): number {
  const raw = process.env[name];
  if (raw === undefined || raw === '') return fallback;

  const parsed = Number(raw);
  if (!Number.isInteger(parsed) || parsed <= 0) {
    throw new Error(`Invalid environment variable ${name}: expected a positive integer, got "${raw}"`);
  }
  return parsed;
}

const nodeEnv = (process.env.NODE_ENV ?? 'development') as Env['nodeEnv'];

export const env: Env = {
  nodeEnv,
  port: requireNumber('PORT', 8000),
  clientOrigin: process.env.CLIENT_ORIGIN ?? 'http://localhost:5173',
  isProduction: nodeEnv === 'production',
};
