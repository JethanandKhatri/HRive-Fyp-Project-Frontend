import { useState } from "react";
import { EmployeeLayout } from "@/components/layout/EmployeeLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { LogIn, LogOut, Clock, CheckCircle2, XCircle, AlertTriangle } from "lucide-react";

const attendanceHistory = [
  { date: "Dec 20, 2024", checkIn: "09:02 AM", checkOut: "06:15 PM", status: "Present" },
  { date: "Dec 19, 2024", checkIn: "08:55 AM", checkOut: "06:00 PM", status: "Present" },
  { date: "Dec 18, 2024", checkIn: "09:32 AM", checkOut: "06:20 PM", status: "Late" },
  { date: "Dec 17, 2024", checkIn: "-", checkOut: "-", status: "Absent" },
  { date: "Dec 16, 2024", checkIn: "08:50 AM", checkOut: "06:05 PM", status: "Present" },
  { date: "Dec 13, 2024", checkIn: "09:00 AM", checkOut: "06:10 PM", status: "Present" },
  { date: "Dec 12, 2024", checkIn: "08:58 AM", checkOut: "06:00 PM", status: "Present" },
];

export default function EmployeeAttendance() {
  const [isCheckedIn, setIsCheckedIn] = useState(true);
  const currentTime = new Date().toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case "Present":
        return (
          <Badge className="bg-success/10 text-success border-success/20 gap-1">
            <CheckCircle2 className="h-3 w-3" />
            Present
          </Badge>
        );
      case "Late":
        return (
          <Badge className="bg-warning/10 text-warning border-warning/20 gap-1">
            <AlertTriangle className="h-3 w-3" />
            Late
          </Badge>
        );
      case "Absent":
        return (
          <Badge className="bg-destructive/10 text-destructive border-destructive/20 gap-1">
            <XCircle className="h-3 w-3" />
            Absent
          </Badge>
        );
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <EmployeeLayout>
      <div className="space-y-6 animate-fade-in">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-foreground">Attendance</h1>
          <p className="text-muted-foreground">Track your daily attendance</p>
        </div>

        {/* Check In/Out Card */}
        <Card className="shadow-card">
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="text-center md:text-left">
                <p className="text-sm text-muted-foreground">Current Time</p>
                <p className="text-4xl font-bold text-foreground">{currentTime}</p>
                <p className="text-sm text-muted-foreground mt-1">
                  {new Date().toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>

              <div className="flex flex-col items-center gap-3">
                <div className="flex items-center gap-2">
                  <div
                    className={`w-3 h-3 rounded-full ${
                      isCheckedIn ? "bg-success animate-pulse" : "bg-muted"
                    }`}
                  />
                  <span className="text-sm font-medium text-foreground">
                    {isCheckedIn ? "Currently Checked In" : "Not Checked In"}
                  </span>
                </div>
                {isCheckedIn && (
                  <p className="text-xs text-muted-foreground">Since 09:02 AM</p>
                )}
              </div>

              <Button
                size="lg"
                className={`gap-2 min-w-[160px] ${
                  isCheckedIn
                    ? "bg-destructive hover:bg-destructive/90"
                    : "gradient-primary border-0"
                }`}
                onClick={() => setIsCheckedIn(!isCheckedIn)}
              >
                {isCheckedIn ? (
                  <>
                    <LogOut className="h-5 w-5" />
                    Check Out
                  </>
                ) : (
                  <>
                    <LogIn className="h-5 w-5" />
                    Check In
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Today's Log */}
        <div className="grid md:grid-cols-3 gap-4">
          <Card className="shadow-card">
            <CardContent className="p-5">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-success/10 text-success">
                  <LogIn className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Check In</p>
                  <p className="text-lg font-semibold text-foreground">09:02 AM</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardContent className="p-5">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-muted text-muted-foreground">
                  <LogOut className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Check Out</p>
                  <p className="text-lg font-semibold text-foreground">--:-- --</p>
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
                  <p className="text-lg font-semibold text-foreground">In Progress</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Attendance History */}
        <Card className="shadow-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-semibold">Attendance History</CardTitle>
          </CardHeader>
          <CardContent>
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
                {attendanceHistory.map((record, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{record.date}</TableCell>
                    <TableCell>{record.checkIn}</TableCell>
                    <TableCell>{record.checkOut}</TableCell>
                    <TableCell>{getStatusBadge(record.status)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </EmployeeLayout>
  );
}



