import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, UserPlus, Calendar, Check, Wallet, Briefcase } from "lucide-react";

const activities = [
  {
    id: 1,
    icon: UserPlus,
    title: "New employee onboarded",
    description: "Bilal Saeed joined as Software Engineer",
    time: "10 minutes ago",
    color: "text-success",
    bg: "bg-success/10",
  },
  {
    id: 2,
    icon: Calendar,
    title: "Interview scheduled",
    description: "Technical round for UI/UX Designer position",
    time: "1 hour ago",
    color: "text-info",
    bg: "bg-info/10",
  },
  {
    id: 3,
    icon: Check,
    title: "Leave approved",
    description: "Aisha Mahmood's annual leave request",
    time: "2 hours ago",
    color: "text-primary",
    bg: "bg-primary/10",
  },
  {
    id: 4,
    icon: Wallet,
    title: "Payroll generated",
    description: "November 2024 payroll completed for 162 employees",
    time: "Yesterday",
    color: "text-warning",
    bg: "bg-warning/10",
  },
  {
    id: 5,
    icon: Briefcase,
    title: "Job posted",
    description: "Senior Backend Developer position is now live",
    time: "Yesterday",
    color: "text-accent",
    bg: "bg-accent/10",
  },
];

export function RecentActivity() {
  return (
    <Card className="shadow-md animate-slide-up border-border" style={{ animationDelay: "500ms" }}>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg font-semibold text-foreground">
          <Activity className="h-5 w-5 text-primary" />
          Recent Activity
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative space-y-4">
          {/* Timeline line */}
          <div className="absolute bottom-0 left-5 top-0 w-px bg-border" />

          {activities.map((activity) => (
            <div key={activity.id} className="relative flex gap-4">
              <div
                className={`relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${activity.bg} border border-border`}
              >
                <activity.icon className={`h-4 w-4 ${activity.color}`} />
              </div>
              <div className="flex-1 pb-4">
                <p className="font-semibold text-foreground">{activity.title}</p>
                <p className="text-sm text-muted-foreground">{activity.description}</p>
                <p className="mt-1 text-xs font-medium text-muted-foreground">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
