import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { StatCard } from "@/components/ui/stat-card";
import {
  Clock,
  UserCheck,
  UserX,
  UserMinus,
  Calendar,
  Search,
  Download,
  Filter,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const attendanceToday = [
  { name: "Ahmed Raza", checkIn: "09:02 AM", checkOut: "06:15 PM", status: "present", hours: "9h 13m" },
  { name: "Fatima Khan", checkIn: "08:55 AM", checkOut: "—", status: "present", hours: "—" },
  { name: "Bilal Saeed", checkIn: "09:35 AM", checkOut: "—", status: "late", hours: "—" },
  { name: "Aisha Mahmood", checkIn: "—", checkOut: "—", status: "absent", hours: "—" },
  { name: "Hassan Ali", checkIn: "08:45 AM", checkOut: "05:30 PM", status: "present", hours: "8h 45m" },
];

const statusStyles = {
  present: "bg-success/10 text-success",
  absent: "bg-destructive/10 text-destructive",
  late: "bg-warning/10 text-warning",
  "half-day": "bg-info/10 text-info",
};

const Attendance = () => {
  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between animate-fade-in">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Attendance</h1>
            <p className="text-muted-foreground">Track and manage employee attendance</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2">
              <Download className="h-4 w-4" />
              Export
            </Button>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard title="Present Today" value="142" icon={UserCheck} variant="success" />
          <StatCard title="Absent" value="8" icon={UserX} variant="danger" />
          <StatCard title="Late Arrivals" value="12" icon={UserMinus} variant="warning" />
          <StatCard title="Avg. Work Hours" value="8.5h" icon={Clock} />
        </div>

        {/* Attendance Rate Card */}
        <Card className="shadow-md animate-slide-up">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Monthly Attendance Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-3">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">December 2024</span>
                  <span className="font-medium">94%</span>
                </div>
                <Progress value={94} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">November 2024</span>
                  <span className="font-medium">92%</span>
                </div>
                <Progress value={92} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">October 2024</span>
                  <span className="font-medium">91%</span>
                </div>
                <Progress value={91} className="h-2" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabs */}
        <Tabs defaultValue="today" className="animate-slide-up" style={{ animationDelay: "100ms" }}>
          <TabsList>
            <TabsTrigger value="today">Today</TabsTrigger>
            <TabsTrigger value="weekly">Weekly</TabsTrigger>
            <TabsTrigger value="monthly">Monthly</TabsTrigger>
          </TabsList>

          <TabsContent value="today" className="mt-4">
            <Card className="shadow-md">
              <CardHeader className="flex flex-row items-center justify-between pb-3">
                <CardTitle className="text-lg">Today's Attendance - Dec 22, 2024</CardTitle>
                <div className="relative w-64">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input placeholder="Search..." className="pl-10 h-9" />
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Employee</TableHead>
                      <TableHead>Check In</TableHead>
                      <TableHead>Check Out</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Working Hours</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {attendanceToday.map((record, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{record.name}</TableCell>
                        <TableCell>{record.checkIn}</TableCell>
                        <TableCell>{record.checkOut}</TableCell>
                        <TableCell>
                          <Badge className={statusStyles[record.status]}>
                            {record.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{record.hours}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="weekly">
            <Card className="shadow-md p-8 text-center">
              <Calendar className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-muted-foreground">Weekly attendance view coming soon</p>
            </Card>
          </TabsContent>

          <TabsContent value="monthly">
            <Card className="shadow-md p-8 text-center">
              <Calendar className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-muted-foreground">Monthly attendance view coming soon</p>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default Attendance;



