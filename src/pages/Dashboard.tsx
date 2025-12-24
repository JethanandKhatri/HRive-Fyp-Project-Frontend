import { MainLayout } from "@/components/layout/MainLayout";
import { StatCard } from "@/components/ui/stat-card";
import { TodaysAttendance } from "@/components/dashboard/TodaysAttendance";
import { LeaveRequests } from "@/components/dashboard/LeaveRequests";
import { CognitiveInsights } from "@/components/dashboard/CognitiveInsights";
import { QuickActions } from "@/components/dashboard/QuickActions";
import { RecentActivity } from "@/components/dashboard/RecentActivity";
import { Users, Briefcase, Clock, Wallet } from "lucide-react";
import { AttendanceCheckIn } from "@/components/attendance/AttendanceCheckIn";

const Dashboard = () => {
  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="animate-fade-in">
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">Dashboard</h1>
          <p className="text-muted-foreground mt-1">Welcome back, Sarah. Here's your workforce overview.</p>
        </div>

        {/* Attendance + KPI Cards */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {/* Personal Attendance Check-In */}
          <AttendanceCheckIn />
          
          <StatCard
            title="Total Employees"
            value="162"
            change="+5 this month"
            changeType="positive"
            icon={Users}
            variant="primary"
          />
          <StatCard
            title="Open Positions"
            value="8"
            change="3 urgent"
            changeType="neutral"
            icon={Briefcase}
            variant="default"
          />
          <StatCard
            title="Attendance Rate"
            value="94%"
            change="+2% vs last week"
            changeType="positive"
            icon={Clock}
            variant="success"
          />
          <StatCard
            title="Payroll This Month"
            value="PKR 8.2M"
            change="Due: Dec 25"
            changeType="neutral"
            icon={Wallet}
            variant="warning"
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
          {/* Column 1 */}
          <div className="space-y-6">
            <TodaysAttendance />
            <LeaveRequests />
          </div>

          {/* Column 2 */}
          <div className="space-y-6">
            <CognitiveInsights />
            <QuickActions />
          </div>

          {/* Column 3 */}
          <div className="lg:col-span-2 xl:col-span-1">
            <RecentActivity />
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Dashboard;
