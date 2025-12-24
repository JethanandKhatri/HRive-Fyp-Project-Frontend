import { useState } from "react";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Shield, Save, AlertTriangle, Users, Eye, Plus, Edit, CheckCircle, FileDown, Settings } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const roles = [
  { id: "admin", name: "Admin", description: "Full system access", userCount: 2, color: "bg-destructive/10 text-destructive" },
  { id: "hr_manager", name: "HR Manager", description: "HR operations and management", userCount: 18, color: "bg-primary/10 text-primary" },
  { id: "line_manager", name: "Line Manager", description: "Team management and approvals", userCount: 32, color: "bg-info/10 text-info" },
  { id: "employee", name: "Employee", description: "Self-service access only", userCount: 197, color: "bg-muted text-foreground" },
];

const modules = [
  "Recruitment",
  "Core HR",
  "Attendance",
  "Leave",
  "Payroll",
  "Cognitive HR",
  "Analytics",
  "AskHR",
];

const permissions = ["View", "Create", "Edit", "Approve", "Export", "Admin"];

// Initial permission matrix
const initialPermissionMatrix: Record<string, Record<string, string[]>> = {
  admin: {
    Recruitment: ["View", "Create", "Edit", "Approve", "Export", "Admin"],
    "Core HR": ["View", "Create", "Edit", "Approve", "Export", "Admin"],
    Attendance: ["View", "Create", "Edit", "Approve", "Export", "Admin"],
    Leave: ["View", "Create", "Edit", "Approve", "Export", "Admin"],
    Payroll: ["View", "Create", "Edit", "Approve", "Export", "Admin"],
    "Cognitive HR": ["View", "Create", "Edit", "Approve", "Export", "Admin"],
    Analytics: ["View", "Create", "Edit", "Approve", "Export", "Admin"],
    AskHR: ["View", "Create", "Edit", "Approve", "Export", "Admin"],
  },
  hr_manager: {
    Recruitment: ["View", "Create", "Edit", "Approve", "Export"],
    "Core HR": ["View", "Create", "Edit", "Export"],
    Attendance: ["View", "Create", "Edit", "Approve", "Export"],
    Leave: ["View", "Create", "Edit", "Approve", "Export"],
    Payroll: ["View", "Create", "Edit", "Approve", "Export"],
    "Cognitive HR": ["View", "Export"],
    Analytics: ["View", "Export"],
    AskHR: ["View", "Create"],
  },
  line_manager: {
    Recruitment: ["View"],
    "Core HR": ["View"],
    Attendance: ["View", "Approve"],
    Leave: ["View", "Approve"],
    Payroll: [],
    "Cognitive HR": [],
    Analytics: ["View"],
    AskHR: ["View", "Create"],
  },
  employee: {
    Recruitment: [],
    "Core HR": ["View"],
    Attendance: ["View"],
    Leave: ["View", "Create"],
    Payroll: ["View"],
    "Cognitive HR": [],
    Analytics: [],
    AskHR: ["View", "Create"],
  },
};

export default function RolesPermissions() {
  const { toast } = useToast();
  const [selectedRole, setSelectedRole] = useState("hr_manager");
  const [permissionMatrix, setPermissionMatrix] = useState(initialPermissionMatrix);
  const [hasChanges, setHasChanges] = useState(false);

  const togglePermission = (module: string, permission: string) => {
    if (selectedRole === "admin") {
      toast({
        title: "Cannot modify Admin",
        description: "Admin role has full access and cannot be modified.",
        variant: "destructive",
      });
      return;
    }

    setPermissionMatrix((prev) => {
      const rolePerms = { ...prev[selectedRole] };
      const modulePerms = rolePerms[module] || [];
      
      if (modulePerms.includes(permission)) {
        rolePerms[module] = modulePerms.filter((p) => p !== permission);
      } else {
        rolePerms[module] = [...modulePerms, permission];
      }
      
      return { ...prev, [selectedRole]: rolePerms };
    });
    setHasChanges(true);
  };

  const handleSave = () => {
    toast({
      title: "Permissions saved",
      description: "Role permissions have been updated successfully.",
    });
    setHasChanges(false);
  };

  const getPermissionIcon = (permission: string) => {
    const icons: Record<string, React.ElementType> = {
      View: Eye,
      Create: Plus,
      Edit: Edit,
      Approve: CheckCircle,
      Export: FileDown,
      Admin: Settings,
    };
    return icons[permission] || Eye;
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold text-foreground">Roles & Permissions</h1>
            <p className="text-muted-foreground mt-1">Configure role-based access control (RBAC)</p>
          </div>
          {hasChanges && (
            <Button onClick={handleSave} className="gap-2">
              <Save className="h-4 w-4" />
              Save Changes
            </Button>
          )}
        </div>

        {/* Role Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {roles.map((role) => (
            <Card
              key={role.id}
              className={`cursor-pointer transition-all border-2 ${
                selectedRole === role.id
                  ? "border-primary shadow-md"
                  : "border-border/50 hover:border-border"
              }`}
              onClick={() => setSelectedRole(role.id)}
            >
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${role.color}`}>
                      <Shield className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">{role.name}</p>
                      <p className="text-xs text-muted-foreground">{role.description}</p>
                    </div>
                  </div>
                </div>
                <div className="mt-3 flex items-center gap-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">{role.userCount} users</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Permission Matrix */}
        <Card className="border-border/50">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg flex items-center gap-2">
                  Permission Matrix
                  <Badge variant="outline" className="ml-2">
                    {roles.find((r) => r.id === selectedRole)?.name}
                  </Badge>
                </CardTitle>
                <CardDescription>
                  Configure what this role can do in each module
                </CardDescription>
              </div>
              {selectedRole === "admin" && (
                <Badge className="bg-destructive/10 text-destructive border-destructive/20">
                  Full Access (Locked)
                </Badge>
              )}
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-border/50">
                    <TableHead className="text-foreground font-semibold w-40">Module</TableHead>
                    {permissions.map((perm) => {
                      const Icon = getPermissionIcon(perm);
                      return (
                        <TableHead key={perm} className="text-center text-foreground font-semibold">
                          <div className="flex flex-col items-center gap-1">
                            <Icon className="h-4 w-4" />
                            <span className="text-xs">{perm}</span>
                          </div>
                        </TableHead>
                      );
                    })}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {modules.map((module) => (
                    <TableRow key={module} className="border-border/30">
                      <TableCell className="font-medium text-foreground">{module}</TableCell>
                      {permissions.map((perm) => {
                        const isChecked = permissionMatrix[selectedRole]?.[module]?.includes(perm);
                        const isDisabled = selectedRole === "admin";
                        return (
                          <TableCell key={perm} className="text-center">
                            <div className="flex justify-center">
                              <Checkbox
                                checked={isChecked}
                                disabled={isDisabled}
                                onCheckedChange={() => togglePermission(module, perm)}
                                className={isChecked ? "border-primary data-[state=checked]:bg-primary" : ""}
                              />
                            </div>
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Impact Warning */}
        {hasChanges && (
          <Card className="border-warning/30 bg-warning/5">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-warning/10">
                  <AlertTriangle className="h-5 w-5 text-warning" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">Unsaved Changes</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    You have modified permissions for the {roles.find((r) => r.id === selectedRole)?.name} role. 
                    These changes will affect {roles.find((r) => r.id === selectedRole)?.userCount} users.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </AdminLayout>
  );
}
