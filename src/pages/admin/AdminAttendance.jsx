import { useEffect, useMemo, useState } from "react";
import { AdminLayout } from "@/components/layout/AdminLayout";
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
  Search,
  Download,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { fetchAttendanceRecords } from "@/lib/attendanceApi";
import { format } from "date-fns";

const statusStyles = {
  present: "bg-success/10 text-success",
  absent: "bg-destructive/10 text-destructive",
  late: "bg-warning/10 text-warning",
  "half-day": "bg-info/10 text-info",
};

export default function AdminAttendance() {
  const [todayRecords, setTodayRecords] = useState([]);
  const [monthRecords, setMonthRecords] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMonth, setSelectedMonth] = useState(format(new Date(), "yyyy-MM"));

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

  const calcHours = (checkIn, checkOut) => {
    if (!checkIn || !checkOut) return "--";
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const diff = Math.max(0, end - start);
    const hours = Math.floor(diff / 3600000);
    const minutes = Math.floor((diff % 3600000) / 60000);
    return `${hours}h ${minutes}m`;
  };

  const filteredTodayRecords = useMemo(() => {
    if (!searchQuery) return todayRecords;
    const query = searchQuery.toLowerCase();
    return todayRecords.filter(
      (record) =>
        record.name.toLowerCase().includes(query) ||
        record.email.toLowerCase().includes(query)
    );
  }, [searchQuery, todayRecords]);

  const filteredMonthRecords = useMemo(() => {
    if (!searchQuery) return monthRecords;
    const query = searchQuery.toLowerCase();
    return monthRecords.filter(
      (record) =>
        record.name.toLowerCase().includes(query) ||
        record.email.toLowerCase().includes(query)
    );
  }, [searchQuery, monthRecords]);

  const stats = useMemo(() => {
    const total = todayRecords.length;
    const present = todayRecords.filter((record) => record.status === "present").length;
    const late = todayRecords.filter((record) => record.status === "late").length;
    const absent = todayRecords.filter((record) => record.status === "absent").length;
    const avgHours = (() => {
      const withHours = todayRecords.filter((record) => record.checkInTime && record.checkOutTime);
      if (withHours.length === 0) return "--";
      const totalMinutes = withHours.reduce((sum, record) => {
        const start = new Date(record.checkInTime);
        const end = new Date(record.checkOutTime);
        return sum + Math.max(0, Math.floor((end - start) / 60000));
      }, 0);
      const avg = Math.round(totalMinutes / withHours.length);
      const hours = Math.floor(avg / 60);
      const minutes = avg % 60;
      return `${hours}h ${minutes}m`;
    })();

    return { total, present, late, absent, avgHours };
  }, [todayRecords]);

  useEffect(() => {
    const loadToday = async () => {
      setIsLoading(true);
      setError("");
      try {
        const today = format(new Date(), "yyyy-MM-dd");
        const data = await fetchAttendanceRecords({ date: today, scope: "all" });
        setTodayRecords(data);
      } catch (error) {
        setError(error?.message || "Unable to load attendance.");
      } finally {
        setIsLoading(false);
      }
    };
    loadToday();
  }, []);

  useEffect(() => {
    const loadMonth = async () => {
      setIsLoading(true);
      setError("");
      try {
        const data = await fetchAttendanceRecords({ month: selectedMonth, scope: "all" });
        setMonthRecords(data);
      } catch (error) {
        setError(error?.message || "Unable to load attendance.");
      } finally {
        setIsLoading(false);
      }
    };
    loadMonth();
  }, [selectedMonth]);

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-foreground">Attendance</h1>
            <p className="text-muted-foreground mt-1">Company-wide attendance overview</p>
          </div>
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard title="Present Today" value={String(stats.present)} icon={UserCheck} variant="success" />
          <StatCard title="Absent" value={String(stats.absent)} icon={UserX} variant="danger" />
          <StatCard title="Late Arrivals" value={String(stats.late)} icon={UserMinus} variant="warning" />
          <StatCard title="Avg. Work Hours" value={stats.avgHours} icon={Clock} />
        </div>

        <Card className="shadow-md">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Attendance Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-3">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">This Month</span>
                  <span className="font-medium">
                    {stats.total ? `${Math.round((stats.present / stats.total) * 100)}%` : "--"}
                  </span>
                </div>
                <Progress value={stats.total ? (stats.present / stats.total) * 100 : 0} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Late Arrivals</span>
                  <span className="font-medium">{stats.late}</span>
                </div>
                <Progress value={stats.total ? (stats.late / stats.total) * 100 : 0} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Absent</span>
                  <span className="font-medium">{stats.absent}</span>
                </div>
                <Progress value={stats.total ? (stats.absent / stats.total) * 100 : 0} className="h-2" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="today">
          <TabsList>
            <TabsTrigger value="today">Today</TabsTrigger>
            <TabsTrigger value="monthly">Monthly</TabsTrigger>
          </TabsList>

          <TabsContent value="today" className="mt-4">
            <Card className="shadow-md">
              <CardHeader className="flex flex-row items-center justify-between pb-3">
                <CardTitle className="text-lg">Today's Attendance</CardTitle>
                <div className="relative w-64">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Search..."
                    className="pl-10 h-9"
                    value={searchQuery}
                    onChange={(event) => setSearchQuery(event.target.value)}
                  />
                </div>
              </CardHeader>
              <CardContent className="p-0">
                {error ? (
                  <div className="m-4 rounded-lg border border-destructive/20 bg-destructive/5 p-3 text-sm text-destructive">
                    {error}
                  </div>
                ) : null}
                {isLoading ? (
                  <div className="py-8 text-center text-sm text-muted-foreground">
                    Loading attendance...
                  </div>
                ) : (
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
                      {filteredTodayRecords.map((record) => (
                        <TableRow key={record.id}>
                          <TableCell className="font-medium">
                            <div className="flex flex-col">
                              <span>{record.name}</span>
                              <span className="text-xs text-muted-foreground">{record.email}</span>
                            </div>
                          </TableCell>
                          <TableCell>{formatTime(record.checkInTime)}</TableCell>
                          <TableCell>{formatTime(record.checkOutTime)}</TableCell>
                          <TableCell>
                            <Badge className={statusStyles[record.status] || statusStyles.present}>
                              {record.status}
                            </Badge>
                          </TableCell>
                          <TableCell>{calcHours(record.checkInTime, record.checkOutTime)}</TableCell>
                        </TableRow>
                      ))}
                      {filteredTodayRecords.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={5} className="text-center text-muted-foreground">
                            No attendance records for today.
                          </TableCell>
                        </TableRow>
                      ) : null}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="monthly">
            <Card className="shadow-md">
              <CardHeader className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between pb-3">
                <CardTitle className="text-lg">Monthly Attendance</CardTitle>
                <div className="flex items-center gap-3">
                  <Input
                    type="month"
                    value={selectedMonth}
                    onChange={(event) => setSelectedMonth(event.target.value)}
                    className="h-9 w-40"
                  />
                  <div className="relative w-56">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      placeholder="Search..."
                      className="pl-10 h-9"
                      value={searchQuery}
                      onChange={(event) => setSearchQuery(event.target.value)}
                    />
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                {error ? (
                  <div className="m-4 rounded-lg border border-destructive/20 bg-destructive/5 p-3 text-sm text-destructive">
                    {error}
                  </div>
                ) : null}
                {isLoading ? (
                  <div className="py-8 text-center text-sm text-muted-foreground">
                    Loading attendance...
                  </div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Employee</TableHead>
                        <TableHead>Check In</TableHead>
                        <TableHead>Check Out</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Working Hours</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredMonthRecords.map((record) => (
                        <TableRow key={record.id}>
                          <TableCell>{formatDate(record.date)}</TableCell>
                          <TableCell className="font-medium">
                            <div className="flex flex-col">
                              <span>{record.name}</span>
                              <span className="text-xs text-muted-foreground">{record.email}</span>
                            </div>
                          </TableCell>
                          <TableCell>{formatTime(record.checkInTime)}</TableCell>
                          <TableCell>{formatTime(record.checkOutTime)}</TableCell>
                          <TableCell>
                            <Badge className={statusStyles[record.status] || statusStyles.present}>
                              {record.status}
                            </Badge>
                          </TableCell>
                          <TableCell>{calcHours(record.checkInTime, record.checkOutTime)}</TableCell>
                        </TableRow>
                      ))}
                      {filteredMonthRecords.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={6} className="text-center text-muted-foreground">
                            No attendance records for this month.
                          </TableCell>
                        </TableRow>
                      ) : null}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
}
