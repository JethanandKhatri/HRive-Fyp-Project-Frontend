import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { StatCard } from "@/components/ui/stat-card";
import { Search, MoreVertical, Eye, Edit, Mail, Phone, Users, UserCheck, UserX, Clock } from "lucide-react";

const employees = [
  {
    id: "EMP001",
    name: "Ahmed Raza",
    email: "ahmed.raza@hrive.pk",
    phone: "+92 321 1234567",
    department: "Engineering",
    designation: "Senior Developer",
    status: "active",
    joinDate: "Jan 15, 2023",
  },
  {
    id: "EMP002",
    name: "Fatima Khan",
    email: "fatima.khan@hrive.pk",
    phone: "+92 333 2345678",
    department: "Design",
    designation: "UI/UX Lead",
    status: "active",
    joinDate: "Mar 20, 2023",
  },
  {
    id: "EMP003",
    name: "Bilal Saeed",
    email: "bilal.saeed@hrive.pk",
    phone: "+92 300 3456789",
    department: "Engineering",
    designation: "Software Engineer",
    status: "onboarding",
    joinDate: "Dec 20, 2024",
  },
  {
    id: "EMP004",
    name: "Aisha Mahmood",
    email: "aisha.mahmood@hrive.pk",
    phone: "+92 312 4567890",
    department: "Human Resources",
    designation: "HR Specialist",
    status: "active",
    joinDate: "Jun 10, 2022",
  },
  {
    id: "EMP005",
    name: "Hassan Ali",
    email: "hassan.ali@hrive.pk",
    phone: "+92 345 5678901",
    department: "Finance",
    designation: "Accountant",
    status: "on-leave",
    joinDate: "Sep 5, 2023",
  },
];

const statusStyles = {
  active: "bg-success/10 text-success border-success/20",
  "on-leave": "bg-warning/10 text-warning border-warning/20",
  onboarding: "bg-info/10 text-info border-info/20",
  terminated: "bg-destructive/10 text-destructive border-destructive/20",
};

const CoreHR = () => {
  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="animate-fade-in">
          <h1 className="text-2xl font-bold tracking-tight">Core HR</h1>
          <p className="text-muted-foreground">Manage your employee directory and profiles</p>
        </div>

        {/* KPI Cards */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard title="Total Employees" value="162" icon={Users} variant="primary" />
          <StatCard title="Active" value="155" icon={UserCheck} variant="success" />
          <StatCard title="On Leave" value="5" icon={Clock} variant="warning" />
          <StatCard title="Onboarding" value="2" icon={UserX} />
        </div>

        {/* Search */}
        <div className="flex gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search employees..." className="pl-10" />
          </div>
          <Button className="gap-2 gradient-primary border-0">
            Add Employee
          </Button>
        </div>

        {/* Employees Table */}
        <Card className="shadow-md animate-slide-up">
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Employee</TableHead>
                  <TableHead>ID</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Designation</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Join Date</TableHead>
                  <TableHead className="w-[80px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {employees.map((employee) => (
                  <TableRow key={employee.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-9 w-9">
                          <AvatarImage
                            src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${employee.name}`}
                          />
                          <AvatarFallback>
                            {employee.name.split(" ").map((n) => n[0]).join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{employee.name}</p>
                          <p className="text-sm text-muted-foreground">{employee.email}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="font-mono text-sm">{employee.id}</TableCell>
                    <TableCell>{employee.department}</TableCell>
                    <TableCell>{employee.designation}</TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={statusStyles[employee.status]}
                      >
                        {employee.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{employee.joinDate}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem className="gap-2">
                            <Eye className="h-4 w-4" />
                            View Profile
                          </DropdownMenuItem>
                          <DropdownMenuItem className="gap-2">
                            <Edit className="h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem className="gap-2">
                            <Mail className="h-4 w-4" />
                            Send Email
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default CoreHR;



