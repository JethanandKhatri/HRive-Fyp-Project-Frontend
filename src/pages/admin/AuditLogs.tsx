import { useState } from "react";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  Search, 
  Filter, 
  Download, 
  User, 
  Shield, 
  Settings, 
  Users, 
  Building2,
  Boxes,
  Scale,
  Clock
} from "lucide-react";

const auditLogs = [
  {
    id: 1,
    timestamp: "2024-01-15 14:32:18",
    user: "Admin",
    action: "Created user",
    module: "User Management",
    details: "Created new HR Manager: Sarah Ahmed",
    icon: Users,
  },
  {
    id: 2,
    timestamp: "2024-01-15 14:28:45",
    user: "Admin",
    action: "Modified permissions",
    module: "Roles & Permissions",
    details: "Updated Line Manager role: Added 'Approve' for Leave",
    icon: Shield,
  },
  {
    id: 3,
    timestamp: "2024-01-15 13:15:22",
    user: "Admin",
    action: "Updated settings",
    module: "Organization",
    details: "Changed working hours: 09:00 - 18:00",
    icon: Building2,
  },
  {
    id: 4,
    timestamp: "2024-01-15 11:45:00",
    user: "Admin",
    action: "Disabled module",
    module: "Modules",
    details: "Temporarily disabled Cognitive HR module",
    icon: Boxes,
  },
  {
    id: 5,
    timestamp: "2024-01-15 10:30:15",
    user: "Admin",
    action: "Updated compliance",
    module: "Compliance",
    details: "Changed annual leave quota: 20 → 22 days",
    icon: Scale,
  },
  {
    id: 6,
    timestamp: "2024-01-14 16:22:33",
    user: "Admin",
    action: "Reset password",
    module: "User Management",
    details: "Reset password for user: Ali Hassan",
    icon: Users,
  },
  {
    id: 7,
    timestamp: "2024-01-14 15:10:00",
    user: "Admin",
    action: "Updated settings",
    module: "System Settings",
    details: "Changed session timeout: 30 → 60 minutes",
    icon: Settings,
  },
  {
    id: 8,
    timestamp: "2024-01-14 14:00:45",
    user: "Admin",
    action: "Enabled module",
    module: "Modules",
    details: "Re-enabled Cognitive HR module",
    icon: Boxes,
  },
  {
    id: 9,
    timestamp: "2024-01-14 11:30:22",
    user: "Admin",
    action: "Created role",
    module: "Roles & Permissions",
    details: "Created new custom role: Department Head",
    icon: Shield,
  },
  {
    id: 10,
    timestamp: "2024-01-13 09:15:00",
    user: "Admin",
    action: "Deactivated user",
    module: "User Management",
    details: "Deactivated user: Usman Malik (resigned)",
    icon: Users,
  },
];

const modules = [
  "All Modules",
  "User Management",
  "Roles & Permissions",
  "Organization",
  "Modules",
  "Compliance",
  "System Settings",
];

export default function AuditLogs() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedModule, setSelectedModule] = useState("All Modules");
  const [dateRange, setDateRange] = useState("last7days");

  const filteredLogs = auditLogs.filter((log) => {
    const matchesSearch =
      log.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.details.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.user.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesModule =
      selectedModule === "All Modules" || log.module === selectedModule;

    return matchesSearch && matchesModule;
  });

  const getActionBadgeColor = (action: string) => {
    if (action.includes("Created") || action.includes("Enabled")) {
      return "bg-success/10 text-success border-success/20";
    }
    if (action.includes("Disabled") || action.includes("Deactivated")) {
      return "bg-destructive/10 text-destructive border-destructive/20";
    }
    if (action.includes("Updated") || action.includes("Modified")) {
      return "bg-info/10 text-info border-info/20";
    }
    return "bg-muted text-foreground border-border";
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold text-foreground">Audit Logs</h1>
            <p className="text-muted-foreground mt-1">Track all administrative actions and changes</p>
          </div>
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Export Logs
          </Button>
        </div>

        {/* Filters */}
        <Card className="border-border/50">
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search actions, users, or details..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 bg-background"
                />
              </div>
              <Select value={selectedModule} onValueChange={setSelectedModule}>
                <SelectTrigger className="w-full sm:w-48 bg-background">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {modules.map((module) => (
                    <SelectItem key={module} value={module}>
                      {module}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={dateRange} onValueChange={setDateRange}>
                <SelectTrigger className="w-full sm:w-40 bg-background">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="last7days">Last 7 Days</SelectItem>
                  <SelectItem value="last30days">Last 30 Days</SelectItem>
                  <SelectItem value="all">All Time</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Logs Table */}
        <Card className="border-border/50">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg">Activity Log</CardTitle>
                <CardDescription>{filteredLogs.length} entries found</CardDescription>
              </div>
              <Badge variant="outline" className="bg-muted">
                Read-only
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            {/* Desktop Table */}
            <div className="hidden md:block overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-border/50">
                    <TableHead className="text-foreground font-semibold w-44">Timestamp</TableHead>
                    <TableHead className="text-foreground font-semibold">User</TableHead>
                    <TableHead className="text-foreground font-semibold">Action</TableHead>
                    <TableHead className="text-foreground font-semibold">Module</TableHead>
                    <TableHead className="text-foreground font-semibold">Details</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredLogs.map((log) => (
                    <TableRow key={log.id} className="border-border/30">
                      <TableCell className="text-muted-foreground font-mono text-sm">
                        <div className="flex items-center gap-2">
                          <Clock className="h-3 w-3" />
                          {log.timestamp}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="h-7 w-7 rounded-full bg-primary/10 flex items-center justify-center">
                            <User className="h-4 w-4 text-primary" />
                          </div>
                          <span className="font-medium text-foreground">{log.user}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className={getActionBadgeColor(log.action)}>
                          {log.action}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <log.icon className="h-4 w-4 text-muted-foreground" />
                          <span className="text-foreground">{log.module}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-muted-foreground max-w-xs truncate">
                        {log.details}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Mobile Cards */}
            <div className="md:hidden space-y-3">
              {filteredLogs.map((log) => (
                <div
                  key={log.id}
                  className="p-4 rounded-lg bg-muted/30 border border-border/30"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <User className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{log.user}</p>
                        <p className="text-xs text-muted-foreground">{log.timestamp}</p>
                      </div>
                    </div>
                    <Badge variant="outline" className={getActionBadgeColor(log.action)}>
                      {log.action}
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <log.icon className="h-4 w-4 text-muted-foreground" />
                      <span className="text-foreground">{log.module}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{log.details}</p>
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
