import { api } from "../lib/api";
import type { Milestone } from "../types";

interface MilestoneListResponse {
  success: boolean;
  data: { milestones: MilestoneRaw[] };
}

interface MilestoneSingleResponse {
  success: boolean;
  data: { milestone: MilestoneRaw };
}

interface MilestoneRaw {
  _id?: string;
  id?: string;
  title: string;
  description?: string;
  status: Milestone["status"];
  category: Milestone["category"];
  priority: Milestone["priority"];
  progress: number;
  targetDate?: string;
  completedAt?: string;
  project?: { _id: string; title: string } | string | null;
  order: number;
  createdAt: string;
}

export type CreateMilestonePayload = {
  title: string;
  description?: string;
  status?: Milestone["status"];
  category?: Milestone["category"];
  priority?: Milestone["priority"];
  progress?: number;
  targetDate?: string;
  project?: string;
  order?: number;
};

export type UpdateMilestonePayload = Partial<CreateMilestonePayload>;

function mapMilestone(raw: MilestoneRaw): Milestone {
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
    category: raw.category,
    priority: raw.priority,
    progress: raw.progress,
    targetDate: raw.targetDate,
    completedAt: raw.completedAt,
    projectId,
    projectTitle,
    order: raw.order,
    createdAt: raw.createdAt,
  };
}

export async function getMilestones(): Promise<Milestone[]> {
  const { data } = await api.get<MilestoneListResponse>("/milestones");
  return data.data.milestones.map(mapMilestone);
}

export async function createMilestone(payload: CreateMilestonePayload): Promise<Milestone> {
  const { data } = await api.post<MilestoneSingleResponse>("/milestones", payload);
  return mapMilestone(data.data.milestone);
}

export async function updateMilestone(id: string, payload: UpdateMilestonePayload): Promise<Milestone> {
  const { data } = await api.patch<MilestoneSingleResponse>(`/milestones/${id}`, payload);
  return mapMilestone(data.data.milestone);
}

export async function deleteMilestone(id: string): Promise<void> {
  await api.delete(`/milestones/${id}`);
}
