import { api } from "../lib/api";
import type { Project } from "../types";

/** API response shapes from the backend. */
interface ProjectListResponse {
  success: boolean;
  data: { projects: Project[] };
}

interface ProjectSingleResponse {
  success: boolean;
  data: { project: Project };
}

export type CreateProjectPayload = {
  title: string;
  description: string;
  status?: Project["status"];
  priority?: Project["priority"];
  progress?: number;
  technologies?: string[];
  type?: Project["type"];
  deadline?: string;
  milestone?: string;
};

export type UpdateProjectPayload = Partial<CreateProjectPayload>;

/** Maps backend document (_id, timestamps) to frontend Project type. */
function mapProject(raw: Record<string, unknown>): Project {
  return {
    id: (raw._id ?? raw.id) as string,
    title: raw.title as string,
    description: raw.description as string,
    status: raw.status as Project["status"],
    priority: raw.priority as Project["priority"],
    progress: (raw.progress as number) ?? 0,
    technologies: (raw.technologies as string[]) ?? [],
    type: raw.type as Project["type"],
    deadline: raw.deadline as string | undefined,
    milestone: raw.milestone as string | undefined,
    createdAt: raw.createdAt as string,
  };
}

export async function getProjects(): Promise<Project[]> {
  const { data } = await api.get<ProjectListResponse>("/projects");
  return data.data.projects.map((p) => mapProject(p as unknown as Record<string, unknown>));
}

export async function getProject(id: string): Promise<Project> {
  const { data } = await api.get<ProjectSingleResponse>(`/projects/${id}`);
  return mapProject(data.data.project as unknown as Record<string, unknown>);
}

export async function createProject(payload: CreateProjectPayload): Promise<Project> {
  const { data } = await api.post<ProjectSingleResponse>("/projects", payload);
  return mapProject(data.data.project as unknown as Record<string, unknown>);
}

export async function updateProject(id: string, payload: UpdateProjectPayload): Promise<Project> {
  const { data } = await api.patch<ProjectSingleResponse>(`/projects/${id}`, payload);
  return mapProject(data.data.project as unknown as Record<string, unknown>);
}

export async function deleteProject(id: string): Promise<void> {
  await api.delete(`/projects/${id}`);
}
