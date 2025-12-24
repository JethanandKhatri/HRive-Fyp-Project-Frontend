import { LineManagerLayout } from "@/components/layout/LineManagerLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar, Search, Download, Filter } from "lucide-react";

const attendanceData = [
  { id: 1, name: "Sarah Johnson", date: "2024-12-24", checkIn: "09:00 AM", checkOut: "06:00 PM", status: "Present", hours: "9h 0m" },
  { id: 2, name: "Mike Chen", date: "2024-12-24", checkIn: "-", checkOut: "-", status: "On Leave", hours: "-" },
  { id: 3, name: "Emily Davis", date: "2024-12-24", checkIn: "08:55 AM", checkOut: "05:45 PM", status: "Present", hours: "8h 50m" },
  { id: 4, name: "John Smith", date: "2024-12-24", checkIn: "09:02 AM", checkOut: "06:15 PM", status: "Present", hours: "9h 13m" },
  { id: 5, name: "David Brown", date: "2024-12-24", checkIn: "09:45 AM", checkOut: "06:30 PM", status: "Late", hours: "8h 45m" },
  { id: 6, name: "Lisa Wang", date: "2024-12-24", checkIn: "08:58 AM", checkOut: "05:55 PM", status: "Present", hours: "8h 57m" },
  { id: 7, name: "Tom Wilson", date: "2024-12-24", checkIn: "09:00 AM", checkOut: "06:00 PM", status: "Present", hours: "9h 0m" },
  { id: 8, name: "Anna Martinez", date: "2024-12-24", checkIn: "08:50 AM", checkOut: "05:50 PM", status: "Present", hours: "9h 0m" },
  { id: 9, name: "Sarah Johnson", date: "2024-12-23", checkIn: "09:05 AM", checkOut: "06:10 PM", status: "Present", hours: "9h 5m" },
  { id: 10, name: "Mike Chen", date: "2024-12-23", checkIn: "09:00 AM", checkOut: "06:00 PM", status: "Present", hours: "9h 0m" },
];

const getStatusBadge = (status) => {
  switch (status) {
    case "Present":
      return <Badge className="bg-accent/10 text-accent border-accent/20">Present</Badge>;
    case "Late":
      return <Badge className="bg-warning/10 text-warning border-warning/20">Late</Badge>;
    case "Absent":
      return <Badge className="bg-destructive/10 text-destructive border-destructive/20">Absent</Badge>;
    case "On Leave":
      return <Badge className="bg-muted text-muted-foreground">On Leave</Badge>;
    default:
      return <Badge variant="secondary">{status}</Badge>;
  }
};

export default function TeamAttendance() {
  return (
    <LineManagerLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold text-foreground">Team Attendance</h1>
            <p className="text-muted-foreground mt-1">Monitor your team's attendance records</p>
          </div>
          <Button variant="outline" className="gap-2">
            <Download className="w-4 h-4" />
            Export
          </Button>
        </div>

        {/* Info Banner */}
        <Card className="border-border bg-muted/30">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <Calendar className="w-5 h-5 text-primary" />
            </div>
            <p className="text-sm text-muted-foreground">
              <span className="font-medium text-foreground">View only access.</span> Attendance records are maintained by HR Manager.
            </p>
          </CardContent>
        </Card>

        {/* Filters */}
        <Card className="border-border">
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input placeholder="Search by name..." className="pl-10" />
              </div>
              <Select defaultValue="all">
                <SelectTrigger className="w-full sm:w-40">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="present">Present</SelectItem>
                  <SelectItem value="absent">Absent</SelectItem>
                  <SelectItem value="late">Late</SelectItem>
                  <SelectItem value="leave">On Leave</SelectItem>
                </SelectContent>
              </Select>
              <Select defaultValue="today">
                <SelectTrigger className="w-full sm:w-40">
                  <SelectValue placeholder="Date" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="yesterday">Yesterday</SelectItem>
                  <SelectItem value="week">This Week</SelectItem>
                  <SelectItem value="month">This Month</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Attendance Table */}
        <Card className="border-border">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-semibold text-foreground">Attendance Records</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent">
                    <TableHead className="font-semibold text-foreground">Employee</TableHead>
                    <TableHead className="font-semibold text-foreground">Date</TableHead>
                    <TableHead className="font-semibold text-foreground">Check In</TableHead>
                    <TableHead className="font-semibold text-foreground">Check Out</TableHead>
                    <TableHead className="font-semibold text-foreground">Hours</TableHead>
                    <TableHead className="font-semibold text-foreground">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {attendanceData.map((record) => (
                    <TableRow key={record.id}>
                      <TableCell className="font-medium text-foreground">{record.name}</TableCell>
                      <TableCell className="text-muted-foreground">{record.date}</TableCell>
                      <TableCell className="text-muted-foreground">{record.checkIn}</TableCell>
                      <TableCell className="text-muted-foreground">{record.checkOut}</TableCell>
                      <TableCell className="text-muted-foreground">{record.hours}</TableCell>
                      <TableCell>{getStatusBadge(record.status)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </LineManagerLayout>
  );
}



