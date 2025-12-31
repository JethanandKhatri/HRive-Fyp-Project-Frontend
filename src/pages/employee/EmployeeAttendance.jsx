import { useEffect, useMemo, useState } from "react";
import { EmployeeLayout } from "@/components/layout/EmployeeLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Clock, CheckCircle2, XCircle, AlertTriangle } from "lucide-react";
import { AttendanceCheckIn } from "@/components/attendance/AttendanceCheckIn";
import { fetchAttendanceRecords } from "@/lib/attendanceApi";
import { useAuth } from "@/hooks/useAuth";
import { format } from "date-fns";

export default function EmployeeAttendance() {
  const { user } = useAuth();
  const [records, setRecords] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedMonth, setSelectedMonth] = useState(format(new Date(), "yyyy-MM"));

  const getStatusBadge = (status) => {
    switch (status) {
      case "present":
      case "Present":
        return (
          <Badge className="bg-success/10 text-success border-success/20 gap-1">
            <CheckCircle2 className="h-3 w-3" />
            {status === "present" ? "Present" : status}
          </Badge>
        );
      case "late":
      case "Late":
        return (
          <Badge className="bg-warning/10 text-warning border-warning/20 gap-1">
            <AlertTriangle className="h-3 w-3" />
            {status === "late" ? "Late" : status}
          </Badge>
        );
      case "absent":
      case "Absent":
        return (
          <Badge className="bg-destructive/10 text-destructive border-destructive/20 gap-1">
            <XCircle className="h-3 w-3" />
            {status === "absent" ? "Absent" : status}
          </Badge>
        );
      default:
        return <Badge variant="secondary">{status || "Unknown"}</Badge>;
    }
  };

  const formatTime = (iso) => {
    if (!iso) return "--:--";
    const date = new Date(iso);
    return date.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
  };

  const formatDate = (value) => {
    if (!value) return "-";
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return value;
    return date.toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" });
  };

  const todayRecord = useMemo(() => {
    const today = format(new Date(), "yyyy-MM-dd");
    return records.find((record) => record.date === today);
  }, [records]);

  useEffect(() => {
    if (!user) return;
    const loadRecords = async () => {
      setIsLoading(true);
      setError("");
      try {
        const data = await fetchAttendanceRecords({
          month: selectedMonth,
          user_id: user.id,
        });
        setRecords(data);
      } catch (error) {
        setError(error?.message || "Unable to load attendance.");
      } finally {
        setIsLoading(false);
      }
    };
    loadRecords();
  }, [selectedMonth, user]);

  return (
    <EmployeeLayout>
      <div className="space-y-6 animate-fade-in">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-foreground">Attendance</h1>
          <p className="text-muted-foreground">Track your daily attendance</p>
        </div>

        {/* Check In/Out Card */}
        <AttendanceCheckIn />

        {/* Today's Log */}
        <div className="grid md:grid-cols-3 gap-4">
          <Card className="shadow-card">
            <CardContent className="p-5">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-success/10 text-success">
                  <Clock className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Check In</p>
                  <p className="text-lg font-semibold text-foreground">
                    {formatTime(todayRecord?.checkInTime)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardContent className="p-5">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-muted text-muted-foreground">
                  <Clock className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Check Out</p>
                  <p className="text-lg font-semibold text-foreground">
                    {formatTime(todayRecord?.checkOutTime)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardContent className="p-5">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-info/10 text-info">
                  <Clock className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Hours Today</p>
                  <p className="text-lg font-semibold text-foreground">
                    {todayRecord?.checkInTime && todayRecord?.checkOutTime
                      ? "Completed"
                      : todayRecord?.checkInTime
                        ? "In Progress"
                        : "--"}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Attendance History */}
        <Card className="shadow-card">
          <CardHeader className="pb-3 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <CardTitle className="text-lg font-semibold">Attendance History</CardTitle>
            <div className="flex items-center gap-2">
              <Label htmlFor="attendanceMonth" className="text-sm text-muted-foreground">
                Month
              </Label>
              <Input
                id="attendanceMonth"
                type="month"
                value={selectedMonth}
                onChange={(event) => setSelectedMonth(event.target.value)}
                className="h-9 w-40"
              />
            </div>
          </CardHeader>
          <CardContent>
            {error ? (
              <div className="mb-4 rounded-lg border border-destructive/20 bg-destructive/5 p-3 text-sm text-destructive">
                {error}
              </div>
            ) : null}
            {isLoading ? (
              <div className="py-6 text-center text-sm text-muted-foreground">
                Loading attendance...
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Check In</TableHead>
                    <TableHead>Check Out</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {records.map((record) => (
                    <TableRow key={record.id}>
                      <TableCell className="font-medium">
                        {formatDate(record.date)}
                      </TableCell>
                      <TableCell>{formatTime(record.checkInTime)}</TableCell>
                      <TableCell>{formatTime(record.checkOutTime)}</TableCell>
                      <TableCell>{getStatusBadge(record.status)}</TableCell>
                    </TableRow>
                  ))}
                  {records.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center text-muted-foreground">
                        No attendance records for this month.
                      </TableCell>
                    </TableRow>
                  ) : null}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </EmployeeLayout>
  );
}
