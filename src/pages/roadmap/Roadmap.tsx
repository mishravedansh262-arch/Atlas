import PageHeader from "../../components/ui/PageHeader";
import RoadmapTimeline from "../../components/roadmap/RoadmapTimeline";
import RoadmapCurrentStage from "../../components/roadmap/RoadmapCurrentStage";
import { mockRoadmap } from "../../data/roadmap";

export default function Roadmap() {
  const currentStage = mockRoadmap.find((s) => s.isCurrent);

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <PageHeader
        title="Roadmap"
        description="Your B.Tech journey — milestones, skills, and career progression."
      />

      {currentStage && <RoadmapCurrentStage stage={currentStage} />}

      <RoadmapTimeline stages={mockRoadmap} />
    </div>
  );
}
