import express, { type Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';

import { env } from './config/env.js';
import { healthRouter } from './routes/health.route.js';
import { authRouter } from './routes/auth.route.js';
import { projectRouter } from './routes/project.route.js';
import { taskRouter } from './routes/task.route.js';
import { userRouter } from './routes/user.route.js';
import { errorHandler, notFoundHandler } from './middleware/error.middleware.js';

/**
 * Builds and configures the Express application.
 *
 * This file deliberately contains NO server-listening logic — that lives in
 * index.ts. Keeping app creation separate makes the app importable in tests
 * (e.g. supertest) without opening a network port.
 */
export function createApp(): Application {
  const app = express();

  // --- Security & infrastructure middleware -------------------------------
  app.use(helmet());
  app.use(
    cors({
      origin: env.clientOrigin,
      credentials: true, // allow cookies from the frontend (needed for auth later)
    }),
  );

  // --- Logging -------------------------------------------------------------
  app.use(morgan(env.isProduction ? 'combined' : 'dev'));

  // --- Body & cookie parsing ------------------------------------------------
  app.use(express.json({ limit: '10kb' }));
  app.use(express.urlencoded({ extended: true, limit: '10kb' }));
  app.use(cookieParser());

  // --- Routes ---------------------------------------------------------------
  app.use('/api/health', healthRouter);
  app.use('/api/auth', authRouter);
  app.use('/api/projects', projectRouter);
  app.use('/api/tasks', taskRouter);
  app.use('/api/users', userRouter);

  // --- 404 + error handling (must come last) --------------------------------
  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
}
