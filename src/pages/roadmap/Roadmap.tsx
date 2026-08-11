import PageHeader from "../../components/ui/PageHeader";
import SectionCard from "../../components/ui/SectionCard";
import RoadmapTimeline from "../../components/roadmap/RoadmapTimeline";
import RoadmapCurrentStage from "../../components/roadmap/RoadmapCurrentStage";
import { mockRoadmap } from "../../data/roadmap";
import { useProjects } from "../../hooks/useProjects";
import { useTasks } from "../../hooks/useTasks";

export default function Roadmap() {
  const currentStage = mockRoadmap.find((s) => s.isCurrent);
  const { data: projects } = useProjects();
  const { data: tasks } = useTasks();

  const completedProjects = projects?.filter((p) => p.status === "completed").length ?? 0;
  const completedTasks = tasks?.filter((t) => t.status === "completed").length ?? 0;

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <PageHeader
        title="Roadmap"
        description="Your B.Tech journey — milestones, skills, and career progression."
      />

      {/* Real progress summary */}
      <SectionCard title="Your Progress">
        <div className="flex flex-wrap gap-6 text-xs text-text-secondary">
          <span>
            <span className="font-semibold text-text-primary">{completedProjects}</span> projects completed
          </span>
          <span>
            <span className="font-semibold text-text-primary">{completedTasks}</span> tasks done
          </span>
          <span>
            <span className="font-semibold text-text-primary">{projects?.length ?? 0}</span> total projects tracked
          </span>
        </div>
      </SectionCard>

      {currentStage && <RoadmapCurrentStage stage={currentStage} />}

      <RoadmapTimeline stages={mockRoadmap} />
    </div>
  );
}
