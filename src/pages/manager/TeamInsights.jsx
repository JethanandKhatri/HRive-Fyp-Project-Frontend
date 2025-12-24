import { LineManagerLayout } from "@/components/layout/LineManagerLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  TrendingUp, 
  TrendingDown,
  Users,
  Calendar,
  AlertTriangle,
  Activity,
  Info
} from "lucide-react";

const attendanceTrends = [
  { month: "Sep", rate: 94 },
  { month: "Oct", rate: 92 },
  { month: "Nov", rate: 95 },
  { month: "Dec", rate: 91 },
];

const workloadData = [
  { name: "Sarah Johnson", workload: 85, status: "high" },
  { name: "Mike Chen", workload: 60, status: "normal" },
  { name: "Emily Davis", workload: 75, status: "normal" },
  { name: "John Smith", workload: 90, status: "high" },
  { name: "David Brown", workload: 45, status: "low" },
  { name: "Lisa Wang", workload: 70, status: "normal" },
];

export default function TeamInsights() {
  const avgAttendance = Math.round(attendanceTrends.reduce((a, b) => a + b.rate, 0) / attendanceTrends.length);
  const highWorkloadCount = workloadData.filter(w => w.status === "high").length;

  return (
    <LineManagerLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Team Insights</h1>
          <p className="text-muted-foreground mt-1">High-level overview of your team's performance</p>
        </div>

        {/* Privacy Banner */}
        <Card className="border-border bg-primary/5 border-primary/20">
          <CardContent className="p-4 flex items-start gap-3">
            <div className="p-2 rounded-lg bg-primary/10 mt-0.5">
              <Info className="w-4 h-4 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">Privacy Protected Insights</p>
              <p className="text-sm text-muted-foreground mt-0.5">
                Individual AI analysis data is visible only to HR Manager. You see aggregate team metrics only.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="border-border">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Avg. Attendance</p>
                  <p className="text-3xl font-bold text-foreground mt-1">{avgAttendance}%</p>
                </div>
                <div className="p-3 rounded-xl bg-accent/10">
                  <Calendar className="w-6 h-6 text-accent" />
                </div>
              </div>
              <div className="flex items-center gap-1 mt-3 text-sm">
                <TrendingDown className="w-4 h-4 text-destructive" />
                <span className="text-destructive font-medium">-3%</span>
                <span className="text-muted-foreground">vs last quarter</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Team Utilization</p>
                  <p className="text-3xl font-bold text-foreground mt-1">78%</p>
                </div>
                <div className="p-3 rounded-xl bg-primary/10">
                  <Activity className="w-6 h-6 text-primary" />
                </div>
              </div>
              <div className="flex items-center gap-1 mt-3 text-sm">
                <TrendingUp className="w-4 h-4 text-accent" />
                <span className="text-accent font-medium">+5%</span>
                <span className="text-muted-foreground">vs last month</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">High Workload</p>
                  <p className="text-3xl font-bold text-foreground mt-1">{highWorkloadCount}</p>
                </div>
                <div className="p-3 rounded-xl bg-warning/10">
                  <AlertTriangle className="w-6 h-6 text-warning" />
                </div>
              </div>
              <p className="text-sm text-muted-foreground mt-3">
                Team members at capacity
              </p>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Burnout Risk</p>
                  <p className="text-3xl font-bold text-warning mt-1">Low</p>
                </div>
                <div className="p-3 rounded-xl bg-accent/10">
                  <Users className="w-6 h-6 text-accent" />
                </div>
              </div>
              <p className="text-sm text-muted-foreground mt-3">
                Aggregate team level
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Attendance Trends */}
          <Card className="border-border">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-semibold text-foreground">Attendance Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {attendanceTrends.map((item) => (
                  <div key={item.month} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">{item.month} 2024</span>
                      <span className="font-medium text-foreground">{item.rate}%</span>
                    </div>
                    <Progress value={item.rate} className="h-2" />
                  </div>
                ))}
              </div>
              <div className="mt-6 p-4 rounded-lg bg-muted/50">
                <p className="text-sm text-muted-foreground">
                  <span className="font-medium text-foreground">Insight:</span> December shows a slight dip in attendance, 
                  likely due to holiday season. Consider adjusting expectations.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Workload Balance */}
          <Card className="border-border">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-semibold text-foreground">Workload Balance</CardTitle>
                <Badge variant="secondary">Last 30 days</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {workloadData.map((member) => (
                  <div key={member.name} className="flex items-center gap-4">
                    <div className="w-28 text-sm font-medium text-foreground truncate">{member.name.split(' ')[0]}</div>
                    <div className="flex-1">
                      <Progress 
                        value={member.workload} 
                        className={`h-2 ${
                          member.status === 'high' 
                            ? '[&>div]:bg-warning' 
                            : member.status === 'low' 
                            ? '[&>div]:bg-muted-foreground' 
                            : ''
                        }`}
                      />
                    </div>
                    <div className="w-12 text-right">
                      <span className={`text-sm font-medium ${
                        member.status === 'high' 
                          ? 'text-warning' 
                          : member.status === 'low' 
                          ? 'text-muted-foreground' 
                          : 'text-foreground'
                      }`}>
                        {member.workload}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-4 mt-6 text-xs text-muted-foreground">
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-warning" />
                  <span>High</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-accent" />
                  <span>Normal</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-muted-foreground" />
                  <span>Low</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Aggregate Burnout Risk */}
        <Card className="border-border">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-semibold text-foreground">Team Wellbeing Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-4 rounded-lg bg-accent/5 border border-accent/20">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 rounded-lg bg-accent/10">
                    <Activity className="w-5 h-5 text-accent" />
                  </div>
                  <p className="font-medium text-foreground">Work-Life Balance</p>
                </div>
                <p className="text-2xl font-bold text-accent">Good</p>
                <p className="text-sm text-muted-foreground mt-1">85% within normal hours</p>
              </div>

              <div className="p-4 rounded-lg bg-warning/5 border border-warning/20">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 rounded-lg bg-warning/10">
                    <AlertTriangle className="w-5 h-5 text-warning" />
                  </div>
                  <p className="font-medium text-foreground">Overtime Trend</p>
                </div>
                <p className="text-2xl font-bold text-warning">Moderate</p>
                <p className="text-sm text-muted-foreground mt-1">2 members with 10+ extra hours</p>
              </div>

              <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <TrendingUp className="w-5 h-5 text-primary" />
                  </div>
                  <p className="font-medium text-foreground">Team Morale</p>
                </div>
                <p className="text-2xl font-bold text-primary">Positive</p>
                <p className="text-sm text-muted-foreground mt-1">Based on engagement metrics</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </LineManagerLayout>
  );
}



