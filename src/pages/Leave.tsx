import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { StatCard } from "@/components/ui/stat-card";
import { Calendar, Clock, Check, X, FileText } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const leaveRequests = [
  {
    id: 1,
    name: "Ahmed Khan",
    type: "Annual Leave",
    from: "Dec 23, 2024",
    to: "Dec 25, 2024",
    days: 3,
    reason: "Family vacation",
    status: "pending",
  },
  {
    id: 2,
    name: "Fatima Ali",
    type: "Sick Leave",
    from: "Dec 22, 2024",
    to: "Dec 22, 2024",
    days: 1,
    reason: "Not feeling well",
    status: "pending",
  },
  {
    id: 3,
    name: "Hassan Raza",
    type: "Personal Leave",
    from: "Dec 26, 2024",
    to: "Dec 27, 2024",
    days: 2,
    reason: "Personal matters",
    status: "pending",
  },
  {
    id: 4,
    name: "Aisha Mahmood",
    type: "Annual Leave",
    from: "Dec 20, 2024",
    to: "Dec 21, 2024",
    days: 2,
    reason: "Short trip",
    status: "approved",
  },
  {
    id: 5,
    name: "Bilal Saeed",
    type: "Sick Leave",
    from: "Dec 18, 2024",
    to: "Dec 18, 2024",
    days: 1,
    reason: "Medical appointment",
    status: "approved",
  },
];

const statusStyles = {
  pending: "bg-warning/10 text-warning border-warning/20",
  approved: "bg-success/10 text-success border-success/20",
  rejected: "bg-destructive/10 text-destructive border-destructive/20",
};

const Leave = () => {
  const pendingCount = leaveRequests.filter((r) => r.status === "pending").length;

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="animate-fade-in">
          <h1 className="text-2xl font-bold tracking-tight">Leave Management</h1>
          <p className="text-muted-foreground">Manage leave requests and balances</p>
        </div>

        {/* KPI Cards */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard title="Pending Requests" value={pendingCount} icon={Clock} variant="warning" />
          <StatCard title="Approved This Month" value="24" icon={Check} variant="success" />
          <StatCard title="On Leave Today" value="5" icon={Calendar} />
          <StatCard title="Avg Leave Balance" value="12 days" icon={FileText} />
        </div>

        {/* Tabs */}
        <Tabs defaultValue="pending" className="animate-slide-up">
          <TabsList>
            <TabsTrigger value="pending" className="gap-2">
              Pending
              <Badge variant="secondary" className="h-5 w-5 rounded-full p-0 text-xs">
                {pendingCount}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="approved">Approved</TabsTrigger>
            <TabsTrigger value="rejected">Rejected</TabsTrigger>
            <TabsTrigger value="all">All Requests</TabsTrigger>
          </TabsList>

          <TabsContent value="pending" className="mt-4">
            <Card className="shadow-md">
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Employee</TableHead>
                      <TableHead>Leave Type</TableHead>
                      <TableHead>Duration</TableHead>
                      <TableHead>Days</TableHead>
                      <TableHead>Reason</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="w-[120px]">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {leaveRequests
                      .filter((r) => r.status === "pending")
                      .map((request) => (
                        <TableRow key={request.id}>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <Avatar className="h-8 w-8">
                                <AvatarImage
                                  src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${request.name}`}
                                />
                                <AvatarFallback>
                                  {request.name.split(" ").map((n) => n[0]).join("")}
                                </AvatarFallback>
                              </Avatar>
                              <span className="font-medium">{request.name}</span>
                            </div>
                          </TableCell>
                          <TableCell>{request.type}</TableCell>
                          <TableCell className="text-sm text-muted-foreground">
                            {request.from} - {request.to}
                          </TableCell>
                          <TableCell>{request.days}</TableCell>
                          <TableCell className="max-w-[200px] truncate text-muted-foreground">
                            {request.reason}
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant="outline"
                              className={statusStyles[request.status as keyof typeof statusStyles]}
                            >
                              {request.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button
                                size="sm"
                                variant="ghost"
                                className="h-8 w-8 p-0 text-success hover:bg-success/10 hover:text-success"
                              >
                                <Check className="h-4 w-4" />
                              </Button>
                              <Button
                                size="sm"
                                variant="ghost"
                                className="h-8 w-8 p-0 text-destructive hover:bg-destructive/10 hover:text-destructive"
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="approved" className="mt-4">
            <Card className="shadow-md">
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Employee</TableHead>
                      <TableHead>Leave Type</TableHead>
                      <TableHead>Duration</TableHead>
                      <TableHead>Days</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {leaveRequests
                      .filter((r) => r.status === "approved")
                      .map((request) => (
                        <TableRow key={request.id}>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <Avatar className="h-8 w-8">
                                <AvatarImage
                                  src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${request.name}`}
                                />
                                <AvatarFallback>
                                  {request.name.split(" ").map((n) => n[0]).join("")}
                                </AvatarFallback>
                              </Avatar>
                              <span className="font-medium">{request.name}</span>
                            </div>
                          </TableCell>
                          <TableCell>{request.type}</TableCell>
                          <TableCell className="text-sm text-muted-foreground">
                            {request.from} - {request.to}
                          </TableCell>
                          <TableCell>{request.days}</TableCell>
                          <TableCell>
                            <Badge
                              variant="outline"
                              className={statusStyles[request.status as keyof typeof statusStyles]}
                            >
                              {request.status}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="rejected" className="mt-4">
            <Card className="shadow-md p-8 text-center">
              <X className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-muted-foreground">No rejected requests</p>
            </Card>
          </TabsContent>

          <TabsContent value="all" className="mt-4">
            <Card className="shadow-md">
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Employee</TableHead>
                      <TableHead>Leave Type</TableHead>
                      <TableHead>Duration</TableHead>
                      <TableHead>Days</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {leaveRequests.map((request) => (
                      <TableRow key={request.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar className="h-8 w-8">
                              <AvatarImage
                                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${request.name}`}
                              />
                              <AvatarFallback>
                                {request.name.split(" ").map((n) => n[0]).join("")}
                              </AvatarFallback>
                            </Avatar>
                            <span className="font-medium">{request.name}</span>
                          </div>
                        </TableCell>
                        <TableCell>{request.type}</TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          {request.from} - {request.to}
                        </TableCell>
                        <TableCell>{request.days}</TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className={statusStyles[request.status as keyof typeof statusStyles]}
                          >
                            {request.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default Leave;
