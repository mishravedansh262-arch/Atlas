import type { UserProfile } from "../types";

export const mockProfile: UserProfile = {
  name: "Vedansh Mishra",
  email: "vedansh@atlas.app",
  avatar: "https://api.dicebear.com/9.x/initials/svg?seed=Vedansh%20Mishra",
  branch: "Computer Science & Engineering",
  year: 3,
  semester: 6,
  university: "University of Technology",
  bio: "B.Tech CSE student passionate about full-stack development, system design, and building tools that make developers more productive.",
  interests: [
    "Full-Stack Development",
    "System Design",
    "Open Source",
    "Machine Learning",
    "DevOps",
    "Technical Writing",
  ],
  skills: [
    "TypeScript",
    "React",
    "Node.js",
    "Python",
    "MongoDB",
    "C++",
    "Git",
    "Docker",
    "Tailwind CSS",
    "PostgreSQL",
  ],
  joinedAt: "2024-08-01",
  stats: {
    projectsCompleted: 5,
    tasksCompleted: 128,
    milestonesReached: 9,
    currentStreak: 12,
  },
};
