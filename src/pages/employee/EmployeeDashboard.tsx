import { EmployeeLayout } from "@/components/layout/EmployeeLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Clock,
  Calendar,
  Receipt,
  Bell,
  LogIn,
  LogOut,
  FileText,
  MessageCircle,
  CheckCircle2,
  AlertCircle,
  FileCheck,
} from "lucide-react";

const kpiCards = [
  {
    title: "Today's Status",
    value: "Checked In",
    subtitle: "09:02 AM",
    icon: Clock,
    variant: "success" as const,
  },
  {
    title: "Leave Balance",
    value: "18 days",
    subtitle: "12 Annual • 6 Sick",
    icon: Calendar,
    variant: "info" as const,
  },
  {
    title: "Last Payslip",
    value: "$4,850",
    subtitle: "November 2024",
    icon: Receipt,
    variant: "default" as const,
  },
  {
    title: "Announcements",
    value: "2 new",
    subtitle: "Unread messages",
    icon: Bell,
    variant: "warning" as const,
  },
];

const quickActions = [
  { label: "Check Out", icon: LogOut, variant: "default" as const },
  { label: "Request Leave", icon: Calendar, variant: "outline" as const },
  { label: "View Payslip", icon: FileText, variant: "outline" as const },
  { label: "Ask HR", icon: MessageCircle, variant: "outline" as const },
];

const recentActivity = [
  {
    icon: CheckCircle2,
    title: "Attendance marked",
    description: "You checked in at 09:02 AM",
    time: "Today",
    status: "success",
  },
  {
    icon: FileCheck,
    title: "Leave approved",
    description: "Annual leave for Dec 25-26 approved",
    time: "Yesterday",
    status: "success",
  },
  {
    icon: Receipt,
    title: "Payslip generated",
    description: "November 2024 payslip is ready",
    time: "2 days ago",
    status: "info",
  },
  {
    icon: Bell,
    title: "New announcement",
    description: "Holiday schedule for 2025 published",
    time: "3 days ago",
    status: "default",
  },
];

export default function EmployeeDashboard() {
  return (
    <EmployeeLayout>
      <div className="space-y-6 animate-fade-in">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-foreground">Welcome back!</h1>
          <p className="text-muted-foreground">Here's your daily overview</p>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {kpiCards.map((card) => (
            <Card key={card.title} className="shadow-card hover:shadow-card-hover transition-shadow">
              <CardContent className="p-5">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">{card.title}</p>
                    <p className="text-2xl font-bold text-foreground">{card.value}</p>
                    <p className="text-xs text-muted-foreground">{card.subtitle}</p>
                  </div>
                  <div
                    className={`p-2.5 rounded-xl ${
                      card.variant === "success"
                        ? "bg-success/10 text-success"
                        : card.variant === "info"
                        ? "bg-info/10 text-info"
                        : card.variant === "warning"
                        ? "bg-warning/10 text-warning"
                        : "bg-primary/10 text-primary"
                    }`}
                  >
                    <card.icon className="h-5 w-5" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <Card className="shadow-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-semibold">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {quickActions.map((action) => (
                <Button
                  key={action.label}
                  variant={action.variant}
                  className="h-auto py-4 flex-col gap-2"
                >
                  <action.icon className="h-5 w-5" />
                  <span className="text-sm font-medium">{action.label}</span>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="shadow-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-semibold">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div
                    className={`p-2 rounded-lg shrink-0 ${
                      activity.status === "success"
                        ? "bg-success/10 text-success"
                        : activity.status === "info"
                        ? "bg-info/10 text-info"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    <activity.icon className="h-4 w-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground">{activity.title}</p>
                    <p className="text-sm text-muted-foreground">{activity.description}</p>
                  </div>
                  <span className="text-xs text-muted-foreground shrink-0">{activity.time}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </EmployeeLayout>
  );
}
