import { Project } from '../models/project.model.js';
import { AppError } from '../utils/appError.js';
import type { CreateProjectInput, UpdateProjectInput } from '../types/project.schema.js';

/**
 * Creates a new project owned by the given user.
 */
export async function createProject(input: CreateProjectInput, ownerId: string) {
  const project = await Project.create({ ...input, owner: ownerId });
  return project;
}

/**
 * Returns all projects belonging to the given owner, sorted newest first.
 */
export async function getProjectsByOwner(ownerId: string) {
  return Project.find({ owner: ownerId }).sort({ createdAt: -1 });
}

/**
 * Returns a single project by ID. Throws 404 if not found, 403 if not owned.
 */
export async function getProjectById(projectId: string, ownerId: string) {
  const project = await Project.findById(projectId);
  if (!project) {
    throw new AppError('Project not found', 404);
  }
  if (project.owner.toString() !== ownerId) {
    throw new AppError('Not authorized to access this project', 403);
  }
  return project;
}

/**
 * Updates a project. Validates ownership before mutation.
 */
export async function updateProject(projectId: string, input: UpdateProjectInput, ownerId: string) {
  const project = await getProjectById(projectId, ownerId);
  Object.assign(project, input);
  await project.save();
  return project;
}

/**
 * Deletes a project. Validates ownership before deletion.
 */
export async function deleteProject(projectId: string, ownerId: string) {
  const project = await getProjectById(projectId, ownerId);
  await project.deleteOne();
}
