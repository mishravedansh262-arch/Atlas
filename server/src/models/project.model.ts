import mongoose, { Schema, type Model, type Types } from 'mongoose';

export interface IProject {
  title: string;
  description: string;
  status: 'planning' | 'in-progress' | 'completed' | 'on-hold';
  priority: 'low' | 'medium' | 'high' | 'critical';
  progress: number;
  technologies: string[];
  type: 'academic' | 'personal' | 'open-source' | 'freelance';
  deadline?: Date;
  milestone?: string;
  owner: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

export type ProjectModel = Model<IProject>;

const projectSchema = new Schema<IProject, ProjectModel>(
  {
    title: { type: String, required: true, trim: true, maxlength: 200 },
    description: { type: String, required: true, trim: true, maxlength: 2000 },
    status: {
      type: String,
      enum: ['planning', 'in-progress', 'completed', 'on-hold'],
      default: 'planning',
    },
    priority: {
      type: String,
      enum: ['low', 'medium', 'high', 'critical'],
      default: 'medium',
    },
    progress: { type: Number, min: 0, max: 100, default: 0 },
    technologies: [{ type: String, trim: true }],
    type: {
      type: String,
      enum: ['academic', 'personal', 'open-source', 'freelance'],
      default: 'personal',
    },
    deadline: { type: Date },
    milestone: { type: String, trim: true, maxlength: 200 },
    owner: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  },
  { timestamps: true },
);

// Compound index for efficient owner-based queries
projectSchema.index({ owner: 1, createdAt: -1 });

export const Project = mongoose.model<IProject, ProjectModel>('Project', projectSchema);
