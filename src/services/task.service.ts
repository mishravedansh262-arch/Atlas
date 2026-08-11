import { api } from "../lib/api";
import type { Task } from "../types";

/** API response shapes from the backend. */
interface TaskListResponse {
  success: boolean;
  data: { tasks: TaskRaw[] };
}

interface TaskSingleResponse {
  success: boolean;
  data: { task: TaskRaw };
}

interface TaskRaw {
  _id?: string;
  id?: string;
  title: string;
  description?: string;
  status: Task["status"];
  priority: Task["priority"];
  category: Task["category"];
  dueDate?: string;
  project?: { _id: string; title: string } | string | null;
  completedAt?: string;
  createdAt: string;
}

export type CreateTaskPayload = {
  title: string;
  description?: string;
  status?: Task["status"];
  priority?: Task["priority"];
  category?: Task["category"];
  dueDate?: string;
  project?: string;
};

export type UpdateTaskPayload = Partial<CreateTaskPayload>;

/** Maps backend document to frontend Task type. */
function mapTask(raw: TaskRaw): Task {
  const project = raw.project;
  let projectId: string | undefined;
  let projectTitle: string | undefined;

  if (project && typeof project === "object" && "_id" in project) {
    projectId = project._id;
    projectTitle = project.title;
  } else if (typeof project === "string") {
    projectId = project;
  }

  return {
    id: (raw._id ?? raw.id) as string,
    title: raw.title,
    description: raw.description,
    status: raw.status,
    priority: raw.priority,
    category: raw.category,
    dueDate: raw.dueDate,
    projectId,
    projectTitle,
    completedAt: raw.completedAt,
    createdAt: raw.createdAt,
  };
}

export async function getTasks(): Promise<Task[]> {
  const { data } = await api.get<TaskListResponse>("/tasks");
  return data.data.tasks.map(mapTask);
}

export async function getTask(id: string): Promise<Task> {
  const { data } = await api.get<TaskSingleResponse>(`/tasks/${id}`);
  return mapTask(data.data.task);
}

export async function createTask(payload: CreateTaskPayload): Promise<Task> {
  const { data } = await api.post<TaskSingleResponse>("/tasks", payload);
  return mapTask(data.data.task);
}

export async function updateTask(id: string, payload: UpdateTaskPayload): Promise<Task> {
  const { data } = await api.patch<TaskSingleResponse>(`/tasks/${id}`, payload);
  return mapTask(data.data.task);
}

export async function deleteTask(id: string): Promise<void> {
  await api.delete(`/tasks/${id}`);
}
