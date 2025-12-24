import { LineManagerLayout } from "@/components/layout/LineManagerLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  Users, 
  Calendar, 
  ClipboardCheck, 
  Video,
  Clock,
  UserCheck,
  UserX,
  AlertCircle,
  CheckCircle2,
  ArrowRight
} from "lucide-react";
import { Link } from "react-router-dom";
import { AttendanceCheckIn } from "@/components/attendance/AttendanceCheckIn";

const stats = [
  { name: "Team Size", value: "12", icon: Users, color: "text-primary" },
  { name: "Today's Attendance", value: "92%", icon: Calendar, color: "text-accent" },
  { name: "Pending Requests", value: "3", icon: ClipboardCheck, color: "text-warning" },
];

const pendingActions = [
  { id: 1, type: "leave", employee: "Sarah Johnson", request: "Annual Leave", dates: "Dec 26-28", urgency: "normal" },
  { id: 2, type: "leave", employee: "Mike Chen", request: "Sick Leave", dates: "Dec 24", urgency: "urgent" },
  { id: 3, type: "leave", employee: "Emily Davis", request: "Personal Leave", dates: "Dec 30", urgency: "normal" },
  { id: 4, type: "interview", candidate: "Alex Thompson", position: "Software Engineer", time: "Today, 2:00 PM", urgency: "urgent" },
  { id: 5, type: "interview", candidate: "Lisa Wang", position: "UI/UX Designer", time: "Tomorrow, 10:00 AM", urgency: "normal" },
];

const recentActivity = [
  { id: 1, action: "Leave approved", detail: "John Smith - Annual Leave (Dec 20-22)", time: "2 hours ago", icon: CheckCircle2 },
  { id: 2, action: "Interview completed", detail: "Feedback submitted for Maria Garcia", time: "Yesterday", icon: Video },
  { id: 3, action: "Late check-in flagged", detail: "David Brown - 9:45 AM", time: "Yesterday", icon: AlertCircle },
  { id: 4, action: "Leave rejected", detail: "Tom Wilson - Insufficient balance", time: "2 days ago", icon: UserX },
];

export default function ManagerDashboard() {
  return (
    <LineManagerLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Good morning, Manager</h1>
          <p className="text-muted-foreground mt-1">Here's your team overview for today</p>
        </div>

        {/* Your Attendance + Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Personal Check-In Card */}
          <AttendanceCheckIn />

          {/* Stats Cards */}
          {stats.map((stat) => (
            <Card key={stat.name} className="border-border">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{stat.name}</p>
                    <p className="text-3xl font-bold text-foreground mt-1">{stat.value}</p>
                  </div>
                  <div className={`p-3 rounded-xl bg-muted ${stat.color}`}>
                    <stat.icon className="w-6 h-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Team Attendance Snapshot */}
        <Card className="border-border">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-semibold text-foreground">Today's Team Attendance</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-2">
              <Progress value={92} className="flex-1 h-3" />
              <span className="text-lg font-semibold text-foreground">92%</span>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="flex items-center gap-3 p-3 rounded-lg bg-accent/10">
                <UserCheck className="w-5 h-5 text-accent" />
                <div>
                  <p className="text-sm text-muted-foreground">Present</p>
                  <p className="text-xl font-bold text-foreground">11</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg bg-destructive/10">
                <UserX className="w-5 h-5 text-destructive" />
                <div>
                  <p className="text-sm text-muted-foreground">Absent</p>
                  <p className="text-xl font-bold text-foreground">0</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg bg-warning/10">
                <Clock className="w-5 h-5 text-warning" />
                <div>
                  <p className="text-sm text-muted-foreground">Late</p>
                  <p className="text-xl font-bold text-foreground">1</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Pending Actions */}
          <Card className="border-border">
            <CardHeader className="flex flex-row items-center justify-between pb-3">
              <CardTitle className="text-lg font-semibold text-foreground">Pending Actions</CardTitle>
              <Badge variant="secondary" className="bg-warning/10 text-warning border-warning/20">
                {pendingActions.length} pending
              </Badge>
            </CardHeader>
            <CardContent className="space-y-3">
              {pendingActions.map((action) => (
                <div 
                  key={action.id} 
                  className="flex items-center justify-between p-3 rounded-lg bg-muted/50 border border-border"
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${action.type === 'leave' ? 'bg-primary/10' : 'bg-accent/10'}`}>
                      {action.type === 'leave' ? (
                        <ClipboardCheck className={`w-4 h-4 ${action.type === 'leave' ? 'text-primary' : 'text-accent'}`} />
                      ) : (
                        <Video className="w-4 h-4 text-accent" />
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        {action.type === 'leave' ? action.employee : action.candidate}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {action.type === 'leave' ? `${action.request} • ${action.dates}` : `${action.position} • ${action.time}`}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {action.urgency === 'urgent' && (
                      <Badge variant="destructive" className="text-xs">Urgent</Badge>
                    )}
                    <Button size="sm" variant="outline" className="h-8">
                      {action.type === 'leave' ? 'Review' : 'Open'}
                    </Button>
                  </div>
                </div>
              ))}
              <Link to="/manager/leave">
                <Button variant="ghost" className="w-full mt-2 text-primary hover:text-primary">
                  View All Actions <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card className="border-border">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-semibold text-foreground">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={activity.id} className="flex gap-3">
                    <div className="relative">
                      <div className="p-2 rounded-lg bg-muted">
                        <activity.icon className="w-4 h-4 text-muted-foreground" />
                      </div>
                      {index < recentActivity.length - 1 && (
                        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-px h-6 bg-border" />
                      )}
                    </div>
                    <div className="flex-1 pb-4">
                      <p className="text-sm font-medium text-foreground">{activity.action}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{activity.detail}</p>
                      <p className="text-xs text-muted-foreground/70 mt-1">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </LineManagerLayout>
  );
}
