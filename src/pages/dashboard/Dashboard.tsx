import DashboardHeader from "../../components/dashboard/DashboardHeader";
import QuickActions from "../../components/dashboard/QuickActions";
import RecentActivity from "../../components/dashboard/RecentActivity";
import StatsGrid from "../../components/dashboard/StatsGrid";

function Dashboard() {
  return (
    <div className="space-y-8">
      <DashboardHeader />

      <StatsGrid />

      <div className="grid gap-6 lg:grid-cols-2">
        <RecentActivity />

        <QuickActions />
      </div>
    </div>
  );
}

export default Dashboard;