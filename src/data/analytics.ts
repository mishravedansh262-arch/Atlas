import type { AnalyticsSummary } from "../types";

export const mockAnalytics: AnalyticsSummary = {
  totalProjects: 6,
  completedProjects: 2,
  totalTasks: 47,
  completedTasks: 28,
  currentStreak: 12,
  longestStreak: 23,
  weeklyActivity: [
    { day: "Mon", tasks: 4, hours: 3.5 },
    { day: "Tue", tasks: 6, hours: 5.0 },
    { day: "Wed", tasks: 3, hours: 2.5 },
    { day: "Thu", tasks: 5, hours: 4.0 },
    { day: "Fri", tasks: 7, hours: 5.5 },
    { day: "Sat", tasks: 2, hours: 1.5 },
    { day: "Sun", tasks: 3, hours: 2.0 },
  ],
  skillProgress: [
    { name: "React / TypeScript", level: 82, category: "Frontend" },
    { name: "Node.js / Express", level: 70, category: "Backend" },
    { name: "Data Structures", level: 75, category: "CS Fundamentals" },
    { name: "System Design", level: 45, category: "Architecture" },
    { name: "Python / ML", level: 60, category: "Data Science" },
    { name: "DevOps / CI-CD", level: 35, category: "Infrastructure" },
  ],
};
