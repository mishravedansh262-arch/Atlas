import type { NextFunction, Request, Response } from 'express';

import * as taskService from '../services/task.service.js';
import type { CreateTaskInput, UpdateTaskInput } from '../types/task.schema.js';

export async function createTask(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const task = await taskService.createTask(
      req.body as CreateTaskInput,
      String(req.user!._id),
    );
    res.status(201).json({ success: true, data: { task } });
  } catch (err) {
    next(err);
  }
}

export async function getTasks(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const tasks = await taskService.getTasksByOwner(String(req.user!._id));
    res.status(200).json({ success: true, data: { tasks } });
  } catch (err) {
    next(err);
  }
}

export async function getTask(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const task = await taskService.getTaskById(req.params.id as string, String(req.user!._id));
    res.status(200).json({ success: true, data: { task } });
  } catch (err) {
    next(err);
  }
}

export async function updateTask(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const task = await taskService.updateTask(
      req.params.id as string,
      req.body as UpdateTaskInput,
      String(req.user!._id),
    );
    res.status(200).json({ success: true, data: { task } });
  } catch (err) {
    next(err);
  }
}

export async function deleteTask(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    await taskService.deleteTask(req.params.id as string, String(req.user!._id));
    res.status(200).json({ success: true, message: 'Task deleted' });
  } catch (err) {
    next(err);
  }
}
