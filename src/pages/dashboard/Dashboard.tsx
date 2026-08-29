import PageContainer from "../../components/ui/PageContainer";
import DashboardHeader from "../../components/dashboard/DashboardHeader";
import NextAction from "../../components/dashboard/NextAction";
import StatsGrid from "../../components/dashboard/StatsGrid";
import UpcomingTasks from "../../components/dashboard/UpcomingTasks";
import RecentActivity from "../../components/dashboard/RecentActivity";
import ProgressOverview from "../../components/dashboard/ProgressOverview";
import QuickActions from "../../components/dashboard/QuickActions";

/**
 * Command Center.
 *
 * Hierarchy runs in three bands, loudest first:
 *   1. Orientation — who you are, what to do next, headline numbers
 *   2. The work    — the task queue and what recently happened
 *   3. Context     — progress ratios and section shortcuts
 *
 * Band 2/3 are separated by a hairline rule and larger gap rather than more
 * cards, so the drop in importance is legible without adding chrome.
 */
function Dashboard() {
  return (
    <PageContainer>
      {/* Band 1 — orientation */}
      <DashboardHeader />
      <NextAction />
      <StatsGrid />

      {/* Bands 2 + 3 */}
      <div className="border-t border-border-secondary pt-6">
        <div className="grid gap-4 lg:grid-cols-3">
          {/* The work — widest column, primary reading order */}
          <div className="space-y-4 lg:col-span-2">
            <UpcomingTasks />
            <RecentActivity />
          </div>

          {/* Context — narrower, quieter */}
          <div className="space-y-4">
            <ProgressOverview />
            <QuickActions />
          </div>
        </div>
      </div>
    </PageContainer>
  );
}

export default Dashboard;
