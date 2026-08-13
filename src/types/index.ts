// ─── Shared enums / types ───

export type Priority = "low" | "medium" | "high" | "critical";
export type ProjectStatus = "planning" | "in-progress" | "completed" | "on-hold";
export type TaskStatus = "todo" | "in-progress" | "completed";
export type MilestoneStatus = "not_started" | "in_progress" | "completed" | "blocked";

// ─── Milestone ───

export interface Milestone {
  id: string;
  title: string;
  description?: string;
  status: MilestoneStatus;
  category: "academics" | "skills" | "projects" | "career";
  priority: Priority;
  progress: number;
  targetDate?: string;
  completedAt?: string;
  projectId?: string;
  projectTitle?: string;
  order: number;
  createdAt: string;
}

// ─── Project ───

export interface Project {
  id: string;
  title: string;
  description: string;
  status: ProjectStatus;
  priority: Priority;
  progress: number;
  technologies: string[];
  type: "academic" | "personal" | "open-source" | "freelance";
  deadline?: string;
  milestone?: string;
  createdAt: string;
}

// ─── Task ───

export interface Task {
  id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  priority: Priority;
  category: "learning" | "project" | "career" | "personal";
  dueDate?: string;
  projectId?: string;
  projectTitle?: string;
  completedAt?: string;
  createdAt: string;
}
