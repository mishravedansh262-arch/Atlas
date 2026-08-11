import { Task } from '../models/task.model.js';
import { AppError } from '../utils/appError.js';
import type { CreateTaskInput, UpdateTaskInput } from '../types/task.schema.js';

/**
 * Creates a new task owned by the given user.
 */
export async function createTask(input: CreateTaskInput, ownerId: string) {
  const task = await Task.create({ ...input, owner: ownerId });
  return task.populate('project', 'title');
}

/**
 * Returns all tasks belonging to the given owner, sorted newest first.
 * Populates the project reference with its title.
 */
export async function getTasksByOwner(ownerId: string) {
  return Task.find({ owner: ownerId })
    .populate('project', 'title')
    .sort({ createdAt: -1 });
}

/**
 * Returns a single task by ID. Throws 404 if not found, 403 if not owned.
 */
export async function getTaskById(taskId: string, ownerId: string) {
  const task = await Task.findById(taskId).populate('project', 'title');
  if (!task) {
    throw new AppError('Task not found', 404);
  }
  if (task.owner.toString() !== ownerId) {
    throw new AppError('Not authorized to access this task', 403);
  }
  return task;
}

/**
 * Updates a task. Validates ownership before mutation.
 * Handles completedAt timestamp logic.
 */
export async function updateTask(taskId: string, input: UpdateTaskInput, ownerId: string) {
  const task = await getTaskById(taskId, ownerId);

  // Auto-set completedAt when marking as completed
  if (input.status === 'completed' && task.status !== 'completed') {
    task.completedAt = new Date();
  } else if (input.status && input.status !== 'completed') {
    task.completedAt = undefined;
  }

  Object.assign(task, input);
  await task.save();
  return task.populate('project', 'title');
}

/**
 * Deletes a task. Validates ownership before deletion.
 */
export async function deleteTask(taskId: string, ownerId: string) {
  const task = await getTaskById(taskId, ownerId);
  await task.deleteOne();
}
