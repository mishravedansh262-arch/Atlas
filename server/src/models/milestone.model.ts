import mongoose, { Schema, type Model, type Types } from 'mongoose';

export interface IMilestone {
  title: string;
  description?: string;
  status: 'not_started' | 'in_progress' | 'completed' | 'blocked';
  category: 'academics' | 'skills' | 'projects' | 'career';
  priority: 'low' | 'medium' | 'high' | 'critical';
  progress: number;
  targetDate?: Date;
  completedAt?: Date;
  project?: Types.ObjectId;
  order: number;
  owner: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

export type MilestoneModel = Model<IMilestone>;

const milestoneSchema = new Schema<IMilestone, MilestoneModel>(
  {
    title: { type: String, required: true, trim: true, maxlength: 200 },
    description: { type: String, trim: true, maxlength: 1000 },
    status: {
      type: String,
      enum: ['not_started', 'in_progress', 'completed', 'blocked'],
      default: 'not_started',
    },
    category: {
      type: String,
      enum: ['academics', 'skills', 'projects', 'career'],
      default: 'skills',
    },
    priority: {
      type: String,
      enum: ['low', 'medium', 'high', 'critical'],
      default: 'medium',
    },
    progress: { type: Number, min: 0, max: 100, default: 0 },
    targetDate: { type: Date },
    completedAt: { type: Date },
    project: { type: Schema.Types.ObjectId, ref: 'Project' },
    order: { type: Number, default: 0 },
    owner: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  },
  { timestamps: true },
);

milestoneSchema.index({ owner: 1, order: 1 });

export const Milestone = mongoose.model<IMilestone, MilestoneModel>('Milestone', milestoneSchema);
