import type { NextFunction, Request, Response } from 'express';

import * as milestoneService from '../services/milestone.service.js';
import type { CreateMilestoneInput, UpdateMilestoneInput } from '../types/milestone.schema.js';

export async function createMilestone(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const milestone = await milestoneService.createMilestone(req.body as CreateMilestoneInput, String(req.user!._id));
    res.status(201).json({ success: true, data: { milestone } });
  } catch (err) { next(err); }
}

export async function getMilestones(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const milestones = await milestoneService.getMilestonesByOwner(String(req.user!._id));
    res.status(200).json({ success: true, data: { milestones } });
  } catch (err) { next(err); }
}

export async function getMilestone(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const milestone = await milestoneService.getMilestoneById(req.params.id as string, String(req.user!._id));
    res.status(200).json({ success: true, data: { milestone } });
  } catch (err) { next(err); }
}

export async function updateMilestone(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const milestone = await milestoneService.updateMilestone(req.params.id as string, req.body as UpdateMilestoneInput, String(req.user!._id));
    res.status(200).json({ success: true, data: { milestone } });
  } catch (err) { next(err); }
}

export async function deleteMilestone(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    await milestoneService.deleteMilestone(req.params.id as string, String(req.user!._id));
    res.status(200).json({ success: true, message: 'Milestone deleted' });
  } catch (err) { next(err); }
}
