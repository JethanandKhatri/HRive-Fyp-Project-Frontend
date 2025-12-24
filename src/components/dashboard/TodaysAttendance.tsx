import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, Users, UserCheck, UserX, UserMinus } from "lucide-react";

export function TodaysAttendance() {
  const stats = {
    present: 142,
    absent: 8,
    late: 12,
    total: 162,
  };

  const attendanceRate = Math.round((stats.present / stats.total) * 100);

  return (
    <Card className="shadow-md animate-slide-up border-border" style={{ animationDelay: "100ms" }}>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg font-semibold text-foreground">
          <Clock className="h-5 w-5 text-primary" />
          Today's Attendance
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-muted-foreground">Attendance Rate</span>
          <span className="text-2xl font-bold text-primary">{attendanceRate}%</span>
        </div>
        <Progress value={attendanceRate} className="h-2" />

        <div className="grid grid-cols-3 gap-3 pt-2">
          <div className="flex flex-col items-center rounded-lg bg-success/10 p-3 border border-success/20">
            <UserCheck className="mb-1 h-5 w-5 text-success" />
            <span className="text-lg font-bold text-foreground">{stats.present}</span>
            <span className="text-xs font-medium text-muted-foreground">Present</span>
          </div>
          <div className="flex flex-col items-center rounded-lg bg-destructive/10 p-3 border border-destructive/20">
            <UserX className="mb-1 h-5 w-5 text-destructive" />
            <span className="text-lg font-bold text-foreground">{stats.absent}</span>
            <span className="text-xs font-medium text-muted-foreground">Absent</span>
          </div>
          <div className="flex flex-col items-center rounded-lg bg-warning/10 p-3 border border-warning/20">
            <UserMinus className="mb-1 h-5 w-5 text-warning" />
            <span className="text-lg font-bold text-foreground">{stats.late}</span>
            <span className="text-xs font-medium text-muted-foreground">Late</span>
          </div>
        </div>

        <div className="flex items-center justify-center gap-2 pt-2 text-sm text-muted-foreground">
          <Users className="h-4 w-4" />
          <span>Total Employees: <strong className="text-foreground">{stats.total}</strong></span>
        </div>
      </CardContent>
    </Card>
  );
}
