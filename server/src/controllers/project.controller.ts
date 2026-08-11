import type { NextFunction, Request, Response } from 'express';

import * as projectService from '../services/project.service.js';
import type { CreateProjectInput, UpdateProjectInput } from '../types/project.schema.js';

export async function createProject(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const project = await projectService.createProject(
      req.body as CreateProjectInput,
      String(req.user!._id),
    );
    res.status(201).json({ success: true, data: { project } });
  } catch (err) {
    next(err);
  }
}

export async function getProjects(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const projects = await projectService.getProjectsByOwner(String(req.user!._id));
    res.status(200).json({ success: true, data: { projects } });
  } catch (err) {
    next(err);
  }
}

export async function getProject(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const project = await projectService.getProjectById(req.params.id as string, String(req.user!._id));
    res.status(200).json({ success: true, data: { project } });
  } catch (err) {
    next(err);
  }
}

export async function updateProject(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const project = await projectService.updateProject(
      req.params.id as string,
      req.body as UpdateProjectInput,
      String(req.user!._id),
    );
    res.status(200).json({ success: true, data: { project } });
  } catch (err) {
    next(err);
  }
}

export async function deleteProject(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    await projectService.deleteProject(req.params.id as string, String(req.user!._id));
    res.status(200).json({ success: true, message: 'Project deleted' });
  } catch (err) {
    next(err);
  }
}
