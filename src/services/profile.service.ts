import { api } from "../lib/api";

export interface ProfileData {
  id: string;
  name: string;
  email: string;
  bio: string;
  branch: string;
  year: number | null;
  semester: number | null;
  university: string;
  skills: string[];
  interests: string[];
  createdAt: string;
}

export type UpdateProfilePayload = {
  name?: string;
  bio?: string;
  branch?: string;
  year?: number;
  semester?: number;
  university?: string;
  skills?: string[];
  interests?: string[];
};

interface ProfileResponse {
  success: boolean;
  data: { user: ProfileData };
}

export async function getProfile(): Promise<ProfileData> {
  const { data } = await api.get<ProfileResponse>("/users/me");
  return data.data.user;
}

export async function updateProfile(payload: UpdateProfilePayload): Promise<ProfileData> {
  const { data } = await api.patch<ProfileResponse>("/users/me", payload);
  return data.data.user;
}
