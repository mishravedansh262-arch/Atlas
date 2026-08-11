// ─── Shared enums / types ───

export type Priority = "low" | "medium" | "high" | "critical";
export type ProjectStatus = "planning" | "in-progress" | "completed" | "on-hold";
export type TaskStatus = "todo" | "in-progress" | "completed";
export type MilestoneStatus = "completed" | "current" | "upcoming" | "locked";

// ─── Project ───

export interface Project {
  id: string;
  title: string;
  description: string;
  status: ProjectStatus;
  priority: Priority;
  progress: number; // 0-100
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

// ─── Roadmap ───

export interface RoadmapMilestone {
  id: string;
  title: string;
  description: string;
  status: MilestoneStatus;
  year: number;
  semester: number;
  skills: string[];
  category: "academics" | "skills" | "projects" | "career";
}

export interface RoadmapStage {
  id: string;
  title: string;
  subtitle: string;
  year: number;
  semester: number;
  isCurrent: boolean;
  milestones: RoadmapMilestone[];
}

// ─── Analytics ───

export interface WeeklyActivity {
  day: string;
  tasks: number;
  hours: number;
}

export interface SkillProgress {
  name: string;
  level: number; // 0-100
  category: string;
}

export interface AnalyticsSummary {
  totalProjects: number;
  completedProjects: number;
  totalTasks: number;
  completedTasks: number;
  currentStreak: number;
  longestStreak: number;
  weeklyActivity: WeeklyActivity[];
  skillProgress: SkillProgress[];
}

// ─── Profile ───

export interface UserProfile {
  name: string;
  email: string;
  avatar: string;
  branch: string;
  year: number;
  semester: number;
  university: string;
  bio: string;
  interests: string[];
  skills: string[];
  joinedAt: string;
  stats: {
    projectsCompleted: number;
    tasksCompleted: number;
    milestonesReached: number;
    currentStreak: number;
  };
}
