import DashboardHeader from "../../components/dashboard/DashboardHeader";
import QuickActions from "../../components/dashboard/QuickActions";
import ProgressOverview from "../../components/dashboard/ProgressOverview";
import RecentActivity from "../../components/dashboard/RecentActivity";
import UpcomingTasks from "../../components/dashboard/UpcomingTasks";
import StatsGrid from "../../components/dashboard/StatsGrid";
import NextAction from "../../components/dashboard/NextAction";

function Dashboard() {
  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <DashboardHeader />

      <NextAction />

      <StatsGrid />

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="space-y-4 lg:col-span-2">
          <UpcomingTasks />
          <RecentActivity />
        </div>

        <div className="space-y-4">
          <ProgressOverview />
          <QuickActions />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
