import { useEffect, useMemo, useState } from "react";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Search, UserPlus, Mail, MoreHorizontal, Edit, Trash2, Key, CheckCircle2 } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const roles = ["Admin", "HR Manager", "Line Manager", "Employee"];

export default function UserManagement() {
  const { toast } = useToast();
  const [users, setUsers] = useState([]);
  const [isLoadingUsers, setIsLoadingUsers] = useState(true);
  const [usersError, setUsersError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEmployeeDialogOpen, setIsEmployeeDialogOpen] = useState(false);
  const [isCreatingUser, setIsCreatingUser] = useState(false);
  const [isCreatingEmployee, setIsCreatingEmployee] = useState(false);
  const [tempPassword, setTempPassword] = useState("");
  const [employeeEmails, setEmployeeEmails] = useState(new Set());
  const [departments, setDepartments] = useState([]);
  const [departmentsError, setDepartmentsError] = useState("");
  const [isLoadingDepartments, setIsLoadingDepartments] = useState(false);
  const [newUser, setNewUser] = useState({
    fullName: "",
    email: "",
    role: "",
    reportingManager: "",
    department: "",
  });
  const [newEmployee, setNewEmployee] = useState({
    fullName: "",
    email: "",
    department: "",
    designation: "",
    phone: "",
    joinDate: "",
  });
  const manageUsersFunction =
    import.meta.env.VITE_SUPABASE_EDGE_MANAGE_USERS_FUNCTION ||
    "create-user";
  const supabaseBaseUrl = import.meta.env.VITE_SUPABASE_URL;
  const createUserUrl =
    import.meta.env.VITE_SUPABASE_EDGE_CREATE_USER_URL ||
    (supabaseBaseUrl
      ? `${supabaseBaseUrl}/functions/v1/create-user`
      : "https://ruewgiljaznyllyqmrep.supabase.co/functions/v1/create-user");
  const departmentsUrl =
    import.meta.env.VITE_SUPABASE_EDGE_DEPARTMENTS_URL ||
    (supabaseBaseUrl
      ? `${supabaseBaseUrl}/functions/v1/departments`
      : "https://ruewgiljaznyllyqmrep.supabase.co/functions/v1/departments");
  const createEmployeeUrl =
    import.meta.env.VITE_SUPABASE_EDGE_CREATE_EMPLOYEE_URL ||
    (supabaseBaseUrl
      ? `${supabaseBaseUrl}/functions/v1/create-employee`
      : "https://ruewgiljaznyllyqmrep.supabase.co/functions/v1/create-employee");
  const anonKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

  const filteredUsers = useMemo(() => {
    if (!searchQuery) return users;
    const query = searchQuery.toLowerCase();
    return users.filter(
      (user) =>
        user.name.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query) ||
        user.role.toLowerCase().includes(query)
    );
  }, [searchQuery, users]);

  const availableEmployeeUsers = useMemo(() => {
    return users.filter(
      (user) => !employeeEmails.has(user.email?.toLowerCase())
    );
  }, [employeeEmails, users]);

  const normalizeRole = (roleLabel) => {
    switch (roleLabel) {
      case "Admin":
        return "ADMIN";
      case "HR Manager":
        return "HR";
      case "Line Manager":
        return "MANAGER";
      case "Employee":
        return "EMPLOYEE";
      default:
        return roleLabel?.toLowerCase?.() || "";
    }
  };

  const formatRoleLabel = (roleValue) => {
    switch (roleValue) {
      case "ADMIN":
        return "Admin";
      case "HR":
        return "HR Manager";
      case "MANAGER":
        return "Line Manager";
      case "EMPLOYEE":
        return "Employee";
      default:
        return roleValue || "Employee";
    }
  };

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

  const mapApiUser = (user) => ({
    id: user.id,
    name: buildDisplayName(user.email),
    email: user.email,
    role: formatRoleLabel(user.role),
    department: user.department || "Unassigned",
    status: user.is_active ? "Active" : "Inactive",
  });

  const fetchUsers = async () => {
    setIsLoadingUsers(true);
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
      setUsers(list.map(mapApiUser));
    } catch (error) {
      setUsersError(error?.message || "Unable to load users.");
    } finally {
      setIsLoadingUsers(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    const fetchDepartments = async () => {
      setDepartmentsError("");
      if (!departmentsUrl || !anonKey) {
        setDepartmentsError("Missing departments edge function configuration.");
        return;
      }
      setIsLoadingDepartments(true);
      try {
        const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
        if (sessionError) {
          throw sessionError;
        }
        const accessToken = sessionData?.session?.access_token;
        if (!accessToken) {
          throw new Error("Missing access token. Please sign in again.");
        }

        const response = await fetch(departmentsUrl, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            apikey: anonKey,
          },
        });
        const data = await response.json();
        if (!response.ok || data?.success === false) {
          throw new Error(data?.error || data?.message || "Unable to load departments.");
        }
        const list = Array.isArray(data?.departments) ? data.departments : data || [];
        const normalized = list
          .map((item) => (typeof item === "string" ? item : item?.name))
          .filter(Boolean);
        setDepartments(normalized);
      } catch (error) {
        setDepartmentsError(error?.message || "Unable to load departments.");
      } finally {
        setIsLoadingDepartments(false);
      }
    };

    fetchDepartments();
  }, [departmentsUrl, anonKey]);

  const handleCreateUser = async () => {
    if (!newUser.fullName || !newUser.email || !newUser.role) {
      toast({
        title: "Missing details",
        description: "Please fill in full name, email, and role.",
        variant: "destructive",
      });
      return;
    }

    const normalizedEmail = newUser.email.trim().toLowerCase();
    const existingUser = users.find(
      (user) => user.email?.toLowerCase() === normalizedEmail
    );
    if (existingUser) {
      toast({
        title: "User already exists",
        description: `${existingUser.email} is already in the system.`,
        variant: "destructive",
      });
      return;
    }

    if (!createUserUrl || !anonKey) {
      toast({
        title: "Configuration error",
        description: "Missing create-employee edge function configuration.",
        variant: "destructive",
      });
      return;
    }

    setIsCreatingUser(true);
    try {
      const payload = {
        full_name: newUser.fullName.trim(),
        email: normalizedEmail,
        role: normalizeRole(newUser.role),
        reporting_manager: newUser.reportingManager || null,
        department: newUser.department || null,
      };

      const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
      if (sessionError) {
        throw sessionError;
      }
      const accessToken = sessionData?.session?.access_token;
      if (!accessToken) {
        throw new Error("Missing access token. Please sign in again.");
      }

      const response = await fetch(createUserUrl, {
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
        const message = data?.error || data?.message || "Unable to create user.";
        const alreadyExists =
          typeof message === "string" && message.toLowerCase().includes("exist");
        toast({
          title: "Create user failed",
          description: message,
          variant: alreadyExists ? "default" : "destructive",
        });
        return;
      }

      const createdUser = data?.user;
      setTempPassword(data?.temp_password || "");
      if (createdUser) {
        setUsers((prev) => {
          const exists = prev.some((user) => user.email === createdUser.email);
          const mappedUser = {
            ...mapApiUser(createdUser),
            name: newUser.fullName || buildDisplayName(createdUser.email),
            department: "Unassigned",
          };
          if (exists) {
            return prev.map((user) =>
              user.email === createdUser.email ? mappedUser : user
            );
          }
          return [mappedUser, ...prev];
        });
      } else {
        await fetchUsers();
      }

      toast({
        title: "User created successfully",
        description: data?.temp_password
          ? `Temp password: ${data.temp_password}`
          : `User created for ${newUser.email}.`,
      });
      setNewUser({
        fullName: "",
        email: "",
        role: "",
        reportingManager: "",
        department: "",
      });
    } catch (error) {
      toast({
        title: "Create user failed",
        description: error?.message || "An unexpected error occurred.",
        variant: "destructive",
      });
    } finally {
      setIsCreatingUser(false);
    }
  };

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
    const existingUser = users.find(
      (user) => user.email?.toLowerCase() === normalizedEmail
    );
    if (!existingUser) {
      toast({
        title: "User not found",
        description: "Create the user first, then add them as an employee.",
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

      toast({
        title: "Employee created",
        description: `${newEmployee.fullName} is now an employee.`,
      });
      setEmployeeEmails((prev) => {
        const next = new Set(prev);
        next.add(normalizedEmail);
        return next;
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

  const handleCopyTempPassword = async () => {
    if (!tempPassword) {
      return;
    }
    try {
      await navigator.clipboard.writeText(tempPassword);
      toast({
        title: "Copied",
        description: "Temporary password copied to clipboard.",
      });
    } catch (error) {
      toast({
        title: "Copy failed",
        description: error?.message || "Unable to copy password.",
        variant: "destructive",
      });
    }
  };

  const getStatusBadge = (status) => {
    const styles = {
      Active: "bg-success/10 text-success border-success/20",
      Pending: "bg-warning/10 text-warning border-warning/20",
      Inactive: "bg-muted text-muted-foreground border-border",
    };
    return styles[status] || styles.Inactive;
  };

  const getRoleBadge = (role) => {
    const styles = {
      Admin: "bg-destructive/10 text-destructive border-destructive/20",
      "HR Manager": "bg-primary/10 text-primary border-primary/20",
      "Line Manager": "bg-info/10 text-info border-info/20",
      Employee: "bg-muted text-foreground border-border",
    };
    return styles[role] || styles.Employee;
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold text-foreground">User Management</h1>
            <p className="text-muted-foreground mt-1">Create and manage system users</p>
          </div>
          
          <div className="flex flex-wrap items-center gap-2">
            <Dialog
              open={isDialogOpen}
              onOpenChange={(open) => {
                setIsDialogOpen(open);
                if (!open) {
                  setTempPassword("");
                }
              }}
            >
              <DialogTrigger asChild>
                <Button className="gap-2">
                  <UserPlus className="h-4 w-4" />
                  Create User
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle>Create New User</DialogTitle>
                  <DialogDescription>
                    Add a new user to the system. They will receive credentials via email.
                  </DialogDescription>
                </DialogHeader>
                
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName" className="text-foreground">Full Name</Label>
                    <Input
                      id="fullName"
                      placeholder="Enter full name"
                      value={newUser.fullName}
                      onChange={(e) => setNewUser({ ...newUser, fullName: e.target.value })}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-foreground">Official Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="user@company.com"
                      value={newUser.email}
                      onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="role" className="text-foreground">Role</Label>
                      <Select
                        value={newUser.role}
                        onValueChange={(value) => setNewUser({ ...newUser, role: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select role" />
                        </SelectTrigger>
                        <SelectContent>
                          {roles.map((role) => (
                            <SelectItem key={role} value={role}>{role}</SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="tempPassword" className="text-foreground">Temporary Password</Label>
                    <Input
                        id="tempPassword"
                        placeholder="Generated after create"
                        value={tempPassword}
                        readOnly
                        onClick={handleCopyTempPassword}
                      className="cursor-pointer"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="userDepartment" className="text-foreground">Department</Label>
                  <Select
                    value={newUser.department}
                    onValueChange={(value) => setNewUser({ ...newUser, department: value })}
                    disabled={isLoadingDepartments || departments.length === 0}
                  >
                    <SelectTrigger id="userDepartment">
                      <SelectValue placeholder={isLoadingDepartments ? "Loading departments..." : "Select department"} />
                    </SelectTrigger>
                    <SelectContent>
                      {departments.map((department) => (
                        <SelectItem key={department} value={department}>
                          {department}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {departmentsError ? (
                    <p className="text-xs text-destructive">{departmentsError}</p>
                  ) : null}
                </div>

                {(newUser.role === "Employee" || newUser.role === "Line Manager") && (
                  <div className="space-y-2">
                    <Label htmlFor="manager" className="text-foreground">Reporting Manager</Label>
                    <Select
                        value={newUser.reportingManager}
                        onValueChange={(value) => setNewUser({ ...newUser, reportingManager: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select manager" />
                        </SelectTrigger>
                        <SelectContent>
                          {users.filter(u => u.role !== "Employee").map((user) => (
                            <SelectItem key={user.id} value={user.name}>{user.name}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  )}

                  {/* Info Box */}
                  <div className="p-3 rounded-lg bg-info/5 border border-info/20">
                    <div className="flex items-start gap-2">
                      <Mail className="h-4 w-4 text-info mt-0.5" />
                      <div className="text-sm">
                        <p className="font-medium text-foreground">Auto-generated credentials</p>
                        <p className="text-muted-foreground">
                          A temporary password will be generated and sent to the user's email. 
                          They will be required to reset it on first login.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button
                    onClick={handleCreateUser}
                    disabled={!newUser.fullName || !newUser.email || !newUser.role || isCreatingUser}
                  >
                    Create & Send Invite
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            <Dialog
              open={isEmployeeDialogOpen}
              onOpenChange={(open) => setIsEmployeeDialogOpen(open)}
            >
              <DialogTrigger asChild>
                <Button variant="outline" className="gap-2">
                  <CheckCircle2 className="h-4 w-4" />
                  Create Employee
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[520px]">
                <DialogHeader>
                  <DialogTitle>Create Employee</DialogTitle>
                  <DialogDescription>
                    Convert an existing user into an employee profile.
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
                      setNewEmployee({
                        ...newEmployee,
                        email: value,
                        fullName: newEmployee.fullName || buildDisplayName(value),
                      });
                    }}
                  >
                    <SelectTrigger id="employeeEmail">
                      <SelectValue placeholder="Select user email" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableEmployeeUsers.map((user) => (
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
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <Card className="border-border/50">
            <CardContent className="p-4">
              <p className="text-2xl font-bold text-foreground">{users.length}</p>
              <p className="text-sm text-muted-foreground">Total Users</p>
            </CardContent>
          </Card>
          <Card className="border-border/50">
            <CardContent className="p-4">
              <p className="text-2xl font-bold text-success">{users.filter(u => u.status === "Active").length}</p>
              <p className="text-sm text-muted-foreground">Active</p>
            </CardContent>
          </Card>
          <Card className="border-border/50">
            <CardContent className="p-4">
              <p className="text-2xl font-bold text-warning">0</p>
              <p className="text-sm text-muted-foreground">Pending</p>
            </CardContent>
          </Card>
          <Card className="border-border/50">
            <CardContent className="p-4">
              <p className="text-2xl font-bold text-muted-foreground">{users.filter(u => u.status === "Inactive").length}</p>
              <p className="text-sm text-muted-foreground">Inactive</p>
            </CardContent>
          </Card>
        </div>

        {/* Users Table */}
        <Card className="border-border/50">
          <CardHeader className="pb-3">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <CardTitle className="text-lg">All Users</CardTitle>
                <CardDescription>Manage user accounts and access</CardDescription>
              </div>
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search users..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 bg-background"
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {usersError && (
              <div className="mb-4 rounded-lg border border-destructive/20 bg-destructive/5 p-3 text-sm text-destructive">
                {usersError}
              </div>
            )}
            {isLoadingUsers ? (
              <div className="py-8 text-center text-sm text-muted-foreground">
                Loading users...
              </div>
            ) : null}
            {/* Desktop Table */}
            <div className="hidden md:block overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-border/50">
                    <TableHead className="text-foreground font-semibold">User</TableHead>
                    <TableHead className="text-foreground font-semibold">Role</TableHead>
                    <TableHead className="text-foreground font-semibold">Department</TableHead>
                    <TableHead className="text-foreground font-semibold">Status</TableHead>
                    <TableHead className="text-foreground font-semibold text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers.map((user) => (
                    <TableRow key={user.id} className="border-border/30">
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-9 w-9">
                            <AvatarFallback className="bg-primary/10 text-primary text-sm font-medium">
                              {user.name.split(" ").map(n => n[0]).join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium text-foreground">{user.name}</p>
                            <p className="text-sm text-muted-foreground">{user.email}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className={getRoleBadge(user.role)}>
                          {user.role}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-foreground">{user.department}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className={getStatusBadge(user.status)}>
                          {user.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem className="gap-2">
                              <Edit className="h-4 w-4" /> Edit User
                            </DropdownMenuItem>
                            <DropdownMenuItem className="gap-2">
                              <Key className="h-4 w-4" /> Reset Password
                            </DropdownMenuItem>
                            <DropdownMenuItem className="gap-2 text-destructive">
                              <Trash2 className="h-4 w-4" /> Deactivate
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Mobile Cards */}
            <div className="md:hidden space-y-3">
              {filteredUsers.map((user) => (
                <div
                  key={user.id}
                  className="p-4 rounded-lg bg-muted/30 border border-border/30"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback className="bg-primary/10 text-primary font-medium">
                          {user.name.split(" ").map(n => n[0]).join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-foreground">{user.name}</p>
                        <p className="text-sm text-muted-foreground">{user.email}</p>
                      </div>
                    </div>
                    <Badge variant="outline" className={getStatusBadge(user.status)}>
                      {user.status}
                    </Badge>
                  </div>
                  <div className="mt-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className={getRoleBadge(user.role)}>
                        {user.role}
                      </Badge>
                      <span className="text-sm text-muted-foreground">{user.department}</span>
                    </div>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}



