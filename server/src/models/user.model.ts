import bcrypt from 'bcryptjs';
import mongoose, { Schema, type Model } from 'mongoose';

/** Persisted user document shape. */
export interface IUser {
  name: string;
  email: string;
  /** bcrypt hash — excluded from queries by default (`select: false`). */
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IUserMethods {
  comparePassword(candidate: string): Promise<boolean>;
}

export type UserModel = Model<IUser, Record<string, never>, IUserMethods>;

const BCRYPT_ROUNDS = 12;

const userSchema = new Schema<IUser, UserModel, IUserMethods>(
  {
    name: { type: String, required: true, trim: true, maxlength: 100 },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    password: { type: String, required: true, select: false },
  },
  { timestamps: true },
);

// Hash on create and whenever the password field changes.
userSchema.pre('save', async function () {
  if (!this.isModified('password')) return;
  this.password = await bcrypt.hash(this.password, BCRYPT_ROUNDS);
});

userSchema.method('comparePassword', function (candidate: string): Promise<boolean> {
  return bcrypt.compare(candidate, this.password);
});

export const User = mongoose.model<IUser, UserModel>('User', userSchema);
