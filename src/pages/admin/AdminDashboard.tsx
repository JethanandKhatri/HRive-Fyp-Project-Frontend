import { AdminLayout } from "@/components/layout/AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Shield, Boxes, CheckCircle2, AlertTriangle, Clock, User, Settings, Building2 } from "lucide-react";

const kpiCards = [
  {
    title: "Total Users",
    value: "247",
    change: "+12 this month",
    icon: Users,
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    title: "Active Roles",
    value: "4",
    change: "Admin, HR, Manager, Employee",
    icon: Shield,
    color: "text-success",
    bgColor: "bg-success/10",
  },
  {
    title: "Enabled Modules",
    value: "8/8",
    change: "All modules active",
    icon: Boxes,
    color: "text-info",
    bgColor: "bg-info/10",
  },
  {
    title: "Compliance Health",
    value: "96%",
    change: "2 items need attention",
    icon: CheckCircle2,
    color: "text-success",
    bgColor: "bg-success/10",
  },
];

const recentActions = [
  {
    action: "Created new user",
    target: "Sarah Ahmed (HR Manager)",
    user: "Admin",
    time: "10 minutes ago",
    icon: User,
  },
  {
    action: "Updated role permissions",
    target: "Line Manager role",
    user: "Admin",
    time: "1 hour ago",
    icon: Shield,
  },
  {
    action: "Modified compliance rule",
    target: "Leave Policy - Annual Leave Cap",
    user: "Admin",
    time: "2 hours ago",
    icon: Settings,
  },
  {
    action: "Disabled module",
    target: "Cognitive HR (temporarily)",
    user: "Admin",
    time: "Yesterday",
    icon: Boxes,
  },
  {
    action: "Updated organization settings",
    target: "Working hours changed",
    user: "Admin",
    time: "2 days ago",
    icon: Building2,
  },
];

const systemStatus = [
  { name: "Database", status: "Operational", healthy: true },
  { name: "Authentication", status: "Operational", healthy: true },
  { name: "Email Service", status: "Operational", healthy: true },
  { name: "File Storage", status: "Degraded", healthy: false },
  { name: "Analytics Engine", status: "Operational", healthy: true },
];

export default function AdminDashboard() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Admin Dashboard</h1>
          <p className="text-muted-foreground mt-1">System overview and configuration status</p>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {kpiCards.map((card) => (
            <Card key={card.title} className="border-border/50">
              <CardContent className="p-5">
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-muted-foreground">{card.title}</p>
                    <p className="text-3xl font-bold text-foreground">{card.value}</p>
                    <p className="text-xs text-muted-foreground">{card.change}</p>
                  </div>
                  <div className={`p-3 rounded-xl ${card.bgColor}`}>
                    <card.icon className={`h-6 w-6 ${card.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Admin Actions */}
          <Card className="lg:col-span-2 border-border/50">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-semibold text-foreground">Recent Admin Actions</CardTitle>
              <CardDescription>Latest configuration changes and user management activities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActions.map((action, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-4 p-3 rounded-lg bg-muted/30 border border-border/30"
                  >
                    <div className="p-2 rounded-lg bg-primary/10">
                      <action.icon className="h-4 w-4 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground">{action.action}</p>
                      <p className="text-sm text-muted-foreground truncate">{action.target}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-xs text-muted-foreground">{action.user}</p>
                      <p className="text-xs text-muted-foreground flex items-center gap-1 justify-end">
                        <Clock className="h-3 w-3" />
                        {action.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* System Status */}
          <Card className="border-border/50">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-semibold text-foreground">System Status</CardTitle>
              <CardDescription>Service health overview</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {systemStatus.map((service) => (
                  <div
                    key={service.name}
                    className="flex items-center justify-between p-3 rounded-lg bg-muted/30 border border-border/30"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`h-2.5 w-2.5 rounded-full ${
                          service.healthy ? "bg-success" : "bg-warning"
                        }`}
                      />
                      <span className="text-sm font-medium text-foreground">{service.name}</span>
                    </div>
                    <Badge
                      variant={service.healthy ? "default" : "secondary"}
                      className={service.healthy ? "bg-success/10 text-success border-success/20" : "bg-warning/10 text-warning border-warning/20"}
                    >
                      {service.status}
                    </Badge>
                  </div>
                ))}
              </div>

              {/* Overall Status */}
              <div className="mt-4 p-4 rounded-lg bg-success/5 border border-success/20">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-success" />
                  <span className="text-sm font-semibold text-foreground">System Healthy</span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  4 of 5 services operating normally
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Stats Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card className="border-border/50">
            <CardContent className="p-5">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-primary/10">
                  <Users className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">18</p>
                  <p className="text-sm text-muted-foreground">HR Managers</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-border/50">
            <CardContent className="p-5">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-info/10">
                  <Users className="h-5 w-5 text-info" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">32</p>
                  <p className="text-sm text-muted-foreground">Line Managers</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-border/50">
            <CardContent className="p-5">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-success/10">
                  <Users className="h-5 w-5 text-success" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">197</p>
                  <p className="text-sm text-muted-foreground">Employees</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
}
