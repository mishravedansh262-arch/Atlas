import { User } from '../models/user.model.js';
import { AppError } from '../utils/appError.js';
import type { UpdateProfileInput } from '../types/user.schema.js';

/**
 * Returns the full profile (excluding password) for a given user ID.
 */
export async function getProfile(userId: string) {
  const user = await User.findById(userId);
  if (!user) {
    throw new AppError('User not found', 404);
  }
  return user;
}

/**
 * Updates the authenticated user's profile fields.
 * Only allows safe, whitelisted fields.
 */
export async function updateProfile(userId: string, input: UpdateProfileInput) {
  const user = await User.findById(userId);
  if (!user) {
    throw new AppError('User not found', 404);
  }

  // Apply only provided fields
  if (input.name !== undefined) user.name = input.name;
  if (input.bio !== undefined) user.bio = input.bio;
  if (input.branch !== undefined) user.branch = input.branch;
  if (input.year !== undefined) user.year = input.year;
  if (input.semester !== undefined) user.semester = input.semester;
  if (input.university !== undefined) user.university = input.university;
  if (input.skills !== undefined) user.skills = input.skills;
  if (input.interests !== undefined) user.interests = input.interests;

  await user.save();
  return user;
}
