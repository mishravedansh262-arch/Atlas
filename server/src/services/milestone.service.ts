import { Milestone } from '../models/milestone.model.js';
import { AppError } from '../utils/appError.js';
import type { CreateMilestoneInput, UpdateMilestoneInput } from '../types/milestone.schema.js';

export async function createMilestone(input: CreateMilestoneInput, ownerId: string) {
  // Auto-assign order to end
  const count = await Milestone.countDocuments({ owner: ownerId });
  const milestone = await Milestone.create({ ...input, owner: ownerId, order: input.order ?? count });
  return milestone.populate('project', 'title');
}

export async function getMilestonesByOwner(ownerId: string) {
  return Milestone.find({ owner: ownerId }).populate('project', 'title').sort({ order: 1, createdAt: -1 });
}

export async function getMilestoneById(milestoneId: string, ownerId: string) {
  const milestone = await Milestone.findById(milestoneId).populate('project', 'title');
  if (!milestone) throw new AppError('Milestone not found', 404);
  if (milestone.owner.toString() !== ownerId) throw new AppError('Not authorized', 403);
  return milestone;
}

export async function updateMilestone(milestoneId: string, input: UpdateMilestoneInput, ownerId: string) {
  const milestone = await getMilestoneById(milestoneId, ownerId);

  if (input.status === 'completed' && milestone.status !== 'completed') {
    milestone.completedAt = new Date();
    milestone.progress = 100;
  } else if (input.status && input.status !== 'completed') {
    milestone.completedAt = undefined;
  }

  Object.assign(milestone, input);
  await milestone.save();
  return milestone.populate('project', 'title');
}

export async function deleteMilestone(milestoneId: string, ownerId: string) {
  const milestone = await getMilestoneById(milestoneId, ownerId);
  await milestone.deleteOne();
}
