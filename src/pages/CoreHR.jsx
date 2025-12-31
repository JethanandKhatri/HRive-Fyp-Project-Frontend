import { useEffect, useMemo, useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
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
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const initialEmployees = [
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
  const { toast } = useToast();
  const [employees, setEmployees] = useState(initialEmployees);
  const [searchQuery, setSearchQuery] = useState("");
  const [isEmployeeDialogOpen, setIsEmployeeDialogOpen] = useState(false);
  const [isCreatingEmployee, setIsCreatingEmployee] = useState(false);
  const [users, setUsers] = useState([]);
  const [usersError, setUsersError] = useState("");
  const [newEmployee, setNewEmployee] = useState({
    fullName: "",
    email: "",
    department: "",
    designation: "",
    phone: "",
    joinDate: "",
  });

  const supabaseBaseUrl = import.meta.env.VITE_SUPABASE_URL;
  const manageUsersFunction =
    import.meta.env.VITE_SUPABASE_EDGE_MANAGE_USERS_FUNCTION ||
    "create-user";
  const createEmployeeUrl =
    import.meta.env.VITE_SUPABASE_EDGE_CREATE_EMPLOYEE_URL ||
    (supabaseBaseUrl
      ? `${supabaseBaseUrl}/functions/v1/create-employee`
      : "https://ruewgiljaznyllyqmrep.supabase.co/functions/v1/create-employee");
  const anonKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

  const buildDisplayName = (email) => {
    if (!email) return "Unknown";
    const base = email.split("@")[0] || email;
    return base
      .replace(/[._-]+/g, " ")
      .split(" ")
      .filter(Boolean)
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join(" ");
  };

  useEffect(() => {
    const fetchUsers = async () => {
      setUsersError("");
      try {
        const { data, error } = await supabase.functions.invoke(
          manageUsersFunction,
          { method: "GET" }
        );
        if (error) {
          throw error;
        }
        if (data?.success === false) {
          throw new Error(data?.error || "Failed to fetch users.");
        }
        const list = Array.isArray(data?.users) ? data.users : [];
        setUsers(
          list.map((user) => ({
            id: user.id,
            email: user.email,
            name: buildDisplayName(user.email),
          }))
        );
      } catch (error) {
        setUsersError(error?.message || "Unable to load users.");
      }
    };

    fetchUsers();
  }, [manageUsersFunction]);

  const filteredEmployees = useMemo(() => {
    if (!searchQuery) return employees;
    const query = searchQuery.toLowerCase();
    return employees.filter(
      (employee) =>
        employee.name.toLowerCase().includes(query) ||
        employee.email.toLowerCase().includes(query) ||
        employee.department.toLowerCase().includes(query)
    );
  }, [employees, searchQuery]);

  const availableUsers = useMemo(() => {
    const employeeEmails = new Set(
      employees.map((employee) => employee.email?.toLowerCase()).filter(Boolean)
    );
    return users.filter(
      (user) => !employeeEmails.has(user.email?.toLowerCase())
    );
  }, [employees, users]);

  const handleCreateEmployee = async () => {
    if (!newEmployee.fullName || !newEmployee.email) {
      toast({
        title: "Missing details",
        description: "Please fill in full name and email.",
        variant: "destructive",
      });
      return;
    }

    const normalizedEmail = newEmployee.email.trim().toLowerCase();
    const existingEmployee = employees.find(
      (employee) => employee.email?.toLowerCase() === normalizedEmail
    );
    if (existingEmployee) {
      toast({
        title: "Employee already exists",
        description: `${existingEmployee.email} is already in Core HR.`,
        variant: "destructive",
      });
      return;
    }

    if (!createEmployeeUrl || !anonKey) {
      toast({
        title: "Configuration error",
        description: "Missing create-employee edge function configuration.",
        variant: "destructive",
      });
      return;
    }

    setIsCreatingEmployee(true);
    try {
      const payload = {
        full_name: newEmployee.fullName.trim(),
        email: normalizedEmail,
        department: newEmployee.department?.trim() || null,
        designation: newEmployee.designation?.trim() || null,
        phone: newEmployee.phone?.trim() || null,
        join_date: newEmployee.joinDate || null,
      };

      const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
      if (sessionError) {
        throw sessionError;
      }
      const accessToken = sessionData?.session?.access_token;
      if (!accessToken) {
        throw new Error("Missing access token. Please sign in again.");
      }

      const response = await fetch(createEmployeeUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
          apikey: anonKey,
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      if (!response.ok || data?.success === false) {
        const message = data?.error || data?.message || "Unable to create employee.";
        const alreadyExists =
          typeof message === "string" && message.toLowerCase().includes("exist");
        toast({
          title: "Create employee failed",
          description: message,
          variant: alreadyExists ? "default" : "destructive",
        });
        return;
      }

      const createdEmployee = data?.employee;
      setEmployees((prev) => [
        {
          id: createdEmployee?.id || `EMP-${Date.now()}`,
          name: newEmployee.fullName.trim(),
          email: normalizedEmail,
          phone: newEmployee.phone || "-",
          department: newEmployee.department || "Unassigned",
          designation: newEmployee.designation || "Employee",
          status: "onboarding",
          joinDate: newEmployee.joinDate || "Today",
        },
        ...prev,
      ]);

      toast({
        title: "Employee created",
        description: `${newEmployee.fullName} is now an employee.`,
      });
      setNewEmployee({
        fullName: "",
        email: "",
        department: "",
        designation: "",
        phone: "",
        joinDate: "",
      });
      setIsEmployeeDialogOpen(false);
    } catch (error) {
      toast({
        title: "Create employee failed",
        description: error?.message || "An unexpected error occurred.",
        variant: "destructive",
      });
    } finally {
      setIsCreatingEmployee(false);
    }
  };

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
            <Input
              placeholder="Search employees..."
              className="pl-10"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
            />
          </div>
          <Dialog open={isEmployeeDialogOpen} onOpenChange={setIsEmployeeDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2 gradient-primary border-0">
                Add Employee
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[520px]">
              <DialogHeader>
                <DialogTitle>Add Employee</DialogTitle>
                <DialogDescription>
                  Create an employee profile for an existing user account.
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="employeeFullName" className="text-foreground">Full Name</Label>
                  <Input
                    id="employeeFullName"
                    placeholder="Enter full name"
                    value={newEmployee.fullName}
                    onChange={(e) => setNewEmployee({ ...newEmployee, fullName: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="employeeEmail" className="text-foreground">User Email</Label>
                  <Select
                    value={newEmployee.email}
                    onValueChange={(value) => {
                      const selectedUser = availableUsers.find((user) => user.email === value);
                      setNewEmployee({
                        ...newEmployee,
                        email: value,
                        fullName: newEmployee.fullName || selectedUser?.name || "",
                      });
                    }}
                  >
                    <SelectTrigger id="employeeEmail">
                      <SelectValue placeholder="Select user email" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableUsers.map((user) => (
                        <SelectItem key={user.id} value={user.email}>
                          {user.email}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {usersError ? (
                    <p className="text-xs text-destructive">{usersError}</p>
                  ) : null}
                  <p className="text-xs text-muted-foreground">
                    User must already exist (created by Admin).
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="employeeDepartment" className="text-foreground">Department</Label>
                    <Input
                      id="employeeDepartment"
                      placeholder="e.g. Engineering"
                      value={newEmployee.department}
                      onChange={(e) => setNewEmployee({ ...newEmployee, department: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="employeeDesignation" className="text-foreground">Designation</Label>
                    <Input
                      id="employeeDesignation"
                      placeholder="e.g. Software Engineer"
                      value={newEmployee.designation}
                      onChange={(e) => setNewEmployee({ ...newEmployee, designation: e.target.value })}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="employeePhone" className="text-foreground">Phone</Label>
                    <Input
                      id="employeePhone"
                      type="tel"
                      placeholder="+92 300 1234567"
                      value={newEmployee.phone}
                      onChange={(e) => setNewEmployee({ ...newEmployee, phone: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="employeeJoinDate" className="text-foreground">Join Date</Label>
                    <Input
                      id="employeeJoinDate"
                      type="date"
                      value={newEmployee.joinDate}
                      onChange={(e) => setNewEmployee({ ...newEmployee, joinDate: e.target.value })}
                    />
                  </div>
                </div>
              </div>

              <DialogFooter>
                <Button variant="outline" onClick={() => setIsEmployeeDialogOpen(false)}>
                  Cancel
                </Button>
                <Button
                  onClick={handleCreateEmployee}
                  disabled={!newEmployee.fullName || !newEmployee.email || isCreatingEmployee}
                >
                  Create Employee
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
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
                {filteredEmployees.map((employee) => (
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



