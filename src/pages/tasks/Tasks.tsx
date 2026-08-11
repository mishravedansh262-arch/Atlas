import { useState } from "react";
import { CheckSquare, Plus } from "lucide-react";

import PageHeader from "../../components/ui/PageHeader";
import SectionCard from "../../components/ui/SectionCard";
import EmptyState from "../../components/ui/EmptyState";
import TaskItem from "../../components/tasks/TaskItem";
import TaskFilters, { type TaskView } from "../../components/tasks/TaskFilters";
import { mockTasks } from "../../data/tasks";

const TODAY = "2026-08-10";

function filterTasks(view: TaskView) {
  switch (view) {
    case "today":
      return mockTasks.filter((t) => t.dueDate === TODAY && t.status !== "completed");
    case "upcoming":
      return mockTasks.filter(
        (t) => t.dueDate && t.dueDate > TODAY && t.status !== "completed",
      );
    case "completed":
      return mockTasks.filter((t) => t.status === "completed");
    default:
      return mockTasks;
  }
}

export default function Tasks() {
  const [view, setView] = useState<TaskView>("all");
  const filtered = filterTasks(view);

  const counts: Record<TaskView, number> = {
    all: mockTasks.length,
    today: filterTasks("today").length,
    upcoming: filterTasks("upcoming").length,
    completed: filterTasks("completed").length,
  };

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <PageHeader
        title="Tasks"
        description="Stay on top of your daily work and long-term goals."
        action={
          <button className="inline-flex items-center gap-2 rounded-lg bg-brand-600 px-3.5 py-2 text-xs font-medium text-white transition-colors hover:bg-brand-700 active:scale-[0.97]">
            <Plus size={14} />
            Add Task
          </button>
        }
      />

      <TaskFilters active={view} onChange={setView} counts={counts} />

      {filtered.length === 0 ? (
        <EmptyState
          icon={CheckSquare}
          title="No tasks here"
          description={
            view === "completed"
              ? "You haven't completed any tasks yet. Keep going!"
              : "All caught up! Add a new task to continue progressing."
          }
          action={
            <button className="rounded-lg bg-brand-600 px-4 py-2 text-xs font-medium text-white hover:bg-brand-700">
              Add Task
            </button>
          }
        />
      ) : (
        <SectionCard noPadding>
          <div className="divide-y divide-border-secondary px-2 py-2">
            {filtered.map((task) => (
              <TaskItem key={task.id} task={task} />
            ))}
          </div>
        </SectionCard>
      )}
    </div>
  );
}
