import type { HydratedDocument } from 'mongoose';

import type { RegisterInput, LoginInput } from '../types/auth.schema.js';
import { User, type IUser } from '../models/user.model.js';
import { AppError } from '../utils/appError.js';

/** Plain user object from Mongoose, never including password or hash. */
function toPublicUserObject(user: HydratedDocument<IUser>) {
  const { password, ...publicUser } = user.toObject();
  void password;
  return publicUser;
}

/**
 * Creates a new user. Throws 409 if the email is already registered.
 * Returns the user document **without** the password field.
 */
export async function registerUser(input: RegisterInput) {
  const existing = await User.findOne({ email: input.email });
  if (existing) {
    throw new AppError('An account with this email already exists', 409);
  }

  const user = await User.create({
    name: input.fullName,
    email: input.email,
    password: input.password,
  });

  // password has `select: false`, but `.create()` still includes it on the returned doc.
  return toPublicUserObject(user);
}

/**
 * Authenticates a user by email + password.
 * Throws 401 on invalid credentials (deliberately vague for security).
 */
export async function loginUser(input: LoginInput) {
  // Explicitly select `password` — it's excluded by default.
  const user = await User.findOne({ email: input.email }).select('+password');

  if (!user || !(await user.comparePassword(input.password))) {
    throw new AppError('Invalid email or password', 401);
  }

  return toPublicUserObject(user);
}

/** Fetches a user by ID. Returns null if not found. */
export async function getUserById(id: string) {
  return User.findById(id);
}
