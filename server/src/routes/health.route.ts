import { Router } from 'express';

/**
 * Health-check route — used by uptime monitors, load balancers, and the
 * frontend to confirm the API is reachable. Mounted at /api/health.
 */
export const healthRouter = Router();

healthRouter.get('/', (_req, res) => {
  res.status(200).json({
    success: true,
    message: 'ATLAS API is healthy',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});
