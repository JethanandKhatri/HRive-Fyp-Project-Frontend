import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Plus,
  Users,
  Shield,
  MoreVertical,
  Mail,
  Edit,
  Trash2,
  UserPlus,
  Briefcase,
  User,
} from "lucide-react";

const teamMembers = [
  {
    id: 1,
    name: "Sarah Ahmed",
    email: "sarah.ahmed@techcorp.pk",
    role: "Admin",
    department: "HR",
    status: "active",
    jobsAssigned: 5,
    candidatesManaged: 42,
  },
  {
    id: 2,
    name: "Ali Hassan",
    email: "ali.hassan@techcorp.pk",
    role: "Hiring Manager",
    department: "Engineering",
    status: "active",
    jobsAssigned: 3,
    candidatesManaged: 28,
  },
  {
    id: 3,
    name: "Nadia Khan",
    email: "nadia.khan@techcorp.pk",
    role: "Recruiter",
    department: "HR",
    status: "active",
    jobsAssigned: 8,
    candidatesManaged: 65,
  },
  {
    id: 4,
    name: "Bilal Khan",
    email: "bilal.khan@techcorp.pk",
    role: "Hiring Manager",
    department: "Engineering",
    status: "active",
    jobsAssigned: 2,
    candidatesManaged: 15,
  },
  {
    id: 5,
    name: "Amna Riaz",
    email: "amna.riaz@techcorp.pk",
    role: "Recruiter",
    department: "HR",
    status: "invited",
    jobsAssigned: 0,
    candidatesManaged: 0,
  },
];

const roleStyles = {
  Admin: { bg: "bg-destructive/10", text: "text-destructive", border: "border-destructive/20" },
  "Hiring Manager": { bg: "bg-primary/10", text: "text-primary", border: "border-primary/20" },
  Recruiter: { bg: "bg-accent/10", text: "text-accent", border: "border-accent/20" },
};

const rolePermissions = {
  Admin: ["Full system access", "Manage users", "Delete candidates", "Export data", "System settings"],
  "Hiring Manager": ["View assigned jobs", "Interview candidates", "Submit feedback", "Approve offers"],
  Recruiter: ["Post jobs", "Screen candidates", "Schedule interviews", "Manage pipeline", "Send offers"],
};

export default function Team() {
  const [isInviteOpen, setIsInviteOpen] = useState(false);

  const admins = teamMembers.filter((m) => m.role === "Admin").length;
  const hiringManagers = teamMembers.filter((m) => m.role === "Hiring Manager").length;
  const recruiters = teamMembers.filter((m) => m.role === "Recruiter").length;

  return (
    <MainLayout>
      <div className="space-y-4 md:space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 animate-fade-in">
          <div>
            <h1 className="text-xl md:text-2xl font-bold tracking-tight text-foreground">Team & Roles</h1>
            <p className="text-sm text-muted-foreground">Manage hiring team members and permissions</p>
          </div>
          <Dialog open={isInviteOpen} onOpenChange={setIsInviteOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2 gradient-primary border-0 w-full sm:w-auto">
                <UserPlus className="h-4 w-4" />
                Invite Member
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Invite Team Member</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 pt-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>First Name</Label>
                    <Input placeholder="Enter first name" />
                  </div>
                  <div className="space-y-2">
                    <Label>Last Name</Label>
                    <Input placeholder="Enter last name" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Email Address</Label>
                  <Input type="email" placeholder="colleague@company.com" />
                </div>
                <div className="space-y-2">
                  <Label>Role</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="admin">Admin</SelectItem>
                      <SelectItem value="hiring-manager">Hiring Manager</SelectItem>
                      <SelectItem value="recruiter">Recruiter</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Department</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hr">HR</SelectItem>
                      <SelectItem value="engineering">Engineering</SelectItem>
                      <SelectItem value="design">Design</SelectItem>
                      <SelectItem value="product">Product</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex flex-col-reverse sm:flex-row justify-end gap-2 pt-4">
                  <Button variant="outline" onClick={() => setIsInviteOpen(false)}>
                    Cancel
                  </Button>
                  <Button className="gap-2 gradient-primary border-0" onClick={() => setIsInviteOpen(false)}>
                    <Mail className="h-4 w-4" />
                    Send Invite
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats */}
        <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3 md:gap-4">
                <div className="h-10 w-10 md:h-12 md:w-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <Users className="h-5 w-5 md:h-6 md:w-6 text-primary" />
                </div>
                <div>
                  <p className="text-xl md:text-2xl font-bold text-foreground">{teamMembers.length}</p>
                  <p className="text-xs md:text-sm text-muted-foreground">Total Members</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3 md:gap-4">
                <div className="h-10 w-10 md:h-12 md:w-12 rounded-full bg-destructive/10 flex items-center justify-center shrink-0">
                  <Shield className="h-5 w-5 md:h-6 md:w-6 text-destructive" />
                </div>
                <div>
                  <p className="text-xl md:text-2xl font-bold text-foreground">{admins}</p>
                  <p className="text-xs md:text-sm text-muted-foreground">Admins</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3 md:gap-4">
                <div className="h-10 w-10 md:h-12 md:w-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <Briefcase className="h-5 w-5 md:h-6 md:w-6 text-primary" />
                </div>
                <div>
                  <p className="text-xl md:text-2xl font-bold text-foreground">{hiringManagers}</p>
                  <p className="text-xs md:text-sm text-muted-foreground">Hiring Mgrs</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3 md:gap-4">
                <div className="h-10 w-10 md:h-12 md:w-12 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                  <User className="h-5 w-5 md:h-6 md:w-6 text-accent" />
                </div>
                <div>
                  <p className="text-xl md:text-2xl font-bold text-foreground">{recruiters}</p>
                  <p className="text-xs md:text-sm text-muted-foreground">Recruiters</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Team Members - Card Layout for Mobile, Table for Desktop */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Team Members</CardTitle>
          </CardHeader>
          <CardContent>
            {/* Mobile Card View */}
            <div className="space-y-4 lg:hidden">
              {teamMembers.map((member) => {
                const roleStyle = roleStyles[member.role];
                return (
                  <div key={member.id} className="p-4 border rounded-lg">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3 min-w-0">
                        <Avatar className="h-10 w-10 shrink-0">
                          <AvatarFallback className="bg-primary/10 text-primary text-sm">
                            {member.name.split(" ").map(n => n[0]).join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="min-w-0">
                          <p className="font-medium text-foreground truncate">{member.name}</p>
                          <p className="text-sm text-muted-foreground truncate">{member.email}</p>
                        </div>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem className="gap-2">
                            <Edit className="h-4 w-4" />
                            Edit Role
                          </DropdownMenuItem>
                          <DropdownMenuItem className="gap-2 text-destructive">
                            <Trash2 className="h-4 w-4" />
                            Remove
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                    <div className="mt-3 flex flex-wrap items-center gap-2">
                      <Badge variant="outline" className={`${roleStyle.bg} ${roleStyle.text} ${roleStyle.border}`}>
                        {member.role}
                      </Badge>
                      <Badge variant="outline" className="text-foreground">
                        {member.department}
                      </Badge>
                      <Badge
                        variant="outline"
                        className={
                          member.status === "active"
                            ? "bg-success/10 text-success border-success/20"
                            : "bg-warning/10 text-warning border-warning/20"
                        }
                      >
                        {member.status === "active" ? "Active" : "Invited"}
                      </Badge>
                    </div>
                    <div className="mt-3 pt-3 border-t flex items-center justify-between text-sm text-muted-foreground">
                      <span>{member.jobsAssigned} jobs</span>
                      <span>{member.candidatesManaged} candidates</span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Desktop Table View */}
            <div className="hidden lg:block overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">Member</th>
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">Role</th>
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">Department</th>
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">Status</th>
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">Jobs</th>
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">Candidates</th>
                    <th className="w-12 py-3 px-4"></th>
                  </tr>
                </thead>
                <tbody>
                  {teamMembers.map((member) => {
                    const roleStyle = roleStyles[member.role];
                    return (
                      <tr key={member.id} className="border-b last:border-0">
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-3">
                            <Avatar className="h-9 w-9">
                              <AvatarFallback className="bg-primary/10 text-primary text-sm">
                                {member.name.split(" ").map(n => n[0]).join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium text-foreground">{member.name}</p>
                              <p className="text-sm text-muted-foreground">{member.email}</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <Badge variant="outline" className={`${roleStyle.bg} ${roleStyle.text} ${roleStyle.border}`}>
                            {member.role}
                          </Badge>
                        </td>
                        <td className="py-3 px-4 text-foreground">{member.department}</td>
                        <td className="py-3 px-4">
                          <Badge
                            variant="outline"
                            className={
                              member.status === "active"
                                ? "bg-success/10 text-success border-success/20"
                                : "bg-warning/10 text-warning border-warning/20"
                            }
                          >
                            {member.status === "active" ? "Active" : "Invited"}
                          </Badge>
                        </td>
                        <td className="py-3 px-4 text-foreground">{member.jobsAssigned}</td>
                        <td className="py-3 px-4 text-foreground">{member.candidatesManaged}</td>
                        <td className="py-3 px-4">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem className="gap-2">
                                <Edit className="h-4 w-4" />
                                Edit Role
                              </DropdownMenuItem>
                              <DropdownMenuItem className="gap-2 text-destructive">
                                <Trash2 className="h-4 w-4" />
                                Remove
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Role Permissions */}
        <div className="grid gap-4 md:gap-6 grid-cols-1 md:grid-cols-3">
          {Object.entries(rolePermissions).map(([role, permissions]) => {
            const roleStyle = roleStyles[role];
            return (
              <Card key={role}>
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className={`${roleStyle.bg} ${roleStyle.text} ${roleStyle.border}`}>
                      {role}
                    </Badge>
                  </div>
                  <CardTitle className="text-base text-foreground">{role} Permissions</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {permissions.map((permission) => (
                      <li key={permission} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <div className="h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                        {permission}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </MainLayout>
  );
}



