import mongoose, { Schema, type Model, type Types } from 'mongoose';

export interface ITask {
  title: string;
  description?: string;
  status: 'todo' | 'in-progress' | 'completed';
  priority: 'low' | 'medium' | 'high' | 'critical';
  category: 'learning' | 'project' | 'career' | 'personal';
  dueDate?: Date;
  project?: Types.ObjectId;
  completedAt?: Date;
  owner: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

export type TaskModel = Model<ITask>;

const taskSchema = new Schema<ITask, TaskModel>(
  {
    title: { type: String, required: true, trim: true, maxlength: 300 },
    description: { type: String, trim: true, maxlength: 2000 },
    status: {
      type: String,
      enum: ['todo', 'in-progress', 'completed'],
      default: 'todo',
    },
    priority: {
      type: String,
      enum: ['low', 'medium', 'high', 'critical'],
      default: 'medium',
    },
    category: {
      type: String,
      enum: ['learning', 'project', 'career', 'personal'],
      default: 'personal',
    },
    dueDate: { type: Date },
    project: { type: Schema.Types.ObjectId, ref: 'Project' },
    completedAt: { type: Date },
    owner: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  },
  { timestamps: true },
);

// Compound index for efficient owner-based queries
taskSchema.index({ owner: 1, status: 1, createdAt: -1 });

export const Task = mongoose.model<ITask, TaskModel>('Task', taskSchema);
