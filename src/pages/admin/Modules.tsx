import { useState } from "react";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { 
  Briefcase, 
  Users, 
  Clock, 
  Calendar, 
  Wallet, 
  Brain, 
  BarChart3, 
  MessageSquare,
  CheckCircle2,
  AlertCircle
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Module {
  id: string;
  name: string;
  description: string;
  icon: React.ElementType;
  enabled: boolean;
  critical: boolean;
}

const initialModules: Module[] = [
  {
    id: "recruitment",
    name: "Recruitment",
    description: "Job postings, applicant tracking, and hiring pipeline management",
    icon: Briefcase,
    enabled: true,
    critical: false,
  },
  {
    id: "core_hr",
    name: "Core HR",
    description: "Employee database, organizational structure, and personnel records",
    icon: Users,
    enabled: true,
    critical: true,
  },
  {
    id: "attendance",
    name: "Attendance",
    description: "Time tracking, check-in/out, and attendance reports",
    icon: Clock,
    enabled: true,
    critical: false,
  },
  {
    id: "leave",
    name: "Leave Management",
    description: "Leave requests, approvals, and balance tracking",
    icon: Calendar,
    enabled: true,
    critical: false,
  },
  {
    id: "payroll",
    name: "Payroll",
    description: "Salary processing, deductions, and compliance calculations",
    icon: Wallet,
    enabled: true,
    critical: true,
  },
  {
    id: "cognitive_hr",
    name: "Cognitive HR",
    description: "AI-powered insights, burnout detection, and workforce analytics",
    icon: Brain,
    enabled: true,
    critical: false,
  },
  {
    id: "analytics",
    name: "Analytics",
    description: "Reports, dashboards, and business intelligence tools",
    icon: BarChart3,
    enabled: true,
    critical: false,
  },
  {
    id: "askhr",
    name: "AskHR",
    description: "AI chatbot for employee HR queries and self-service",
    icon: MessageSquare,
    enabled: true,
    critical: false,
  },
];

export default function Modules() {
  const { toast } = useToast();
  const [modules, setModules] = useState(initialModules);

  const toggleModule = (moduleId: string) => {
    const module = modules.find((m) => m.id === moduleId);
    
    if (module?.critical && module.enabled) {
      toast({
        title: "Cannot disable critical module",
        description: `${module.name} is a critical module and cannot be disabled.`,
        variant: "destructive",
      });
      return;
    }

    setModules((prev) =>
      prev.map((m) =>
        m.id === moduleId ? { ...m, enabled: !m.enabled } : m
      )
    );

    const updatedModule = modules.find((m) => m.id === moduleId);
    toast({
      title: `Module ${updatedModule?.enabled ? "disabled" : "enabled"}`,
      description: `${updatedModule?.name} has been ${updatedModule?.enabled ? "disabled" : "enabled"}.`,
    });
  };

  const enabledCount = modules.filter((m) => m.enabled).length;

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold text-foreground">Module Management</h1>
            <p className="text-muted-foreground mt-1">Enable or disable system modules globally</p>
          </div>
          <Badge variant="outline" className="bg-success/10 text-success border-success/20 px-3 py-1">
            <CheckCircle2 className="h-4 w-4 mr-1" />
            {enabledCount} of {modules.length} Enabled
          </Badge>
        </div>

        {/* Info Card */}
        <Card className="border-info/30 bg-info/5">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-info/10">
                <AlertCircle className="h-5 w-5 text-info" />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">Module Configuration</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Disabling a module will hide it from all users across the HR Manager and Employee portals.
                  Critical modules (Core HR, Payroll) cannot be disabled.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Module Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {modules.map((module) => (
            <Card
              key={module.id}
              className={`border-border/50 transition-all ${
                !module.enabled ? "opacity-60" : ""
              }`}
            >
              <CardContent className="p-5">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div
                      className={`p-3 rounded-xl ${
                        module.enabled
                          ? "bg-primary/10"
                          : "bg-muted"
                      }`}
                    >
                      <module.icon
                        className={`h-6 w-6 ${
                          module.enabled ? "text-primary" : "text-muted-foreground"
                        }`}
                      />
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-foreground">{module.name}</h3>
                        {module.critical && (
                          <Badge variant="outline" className="bg-destructive/10 text-destructive border-destructive/20 text-xs">
                            Critical
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {module.description}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-end gap-2">
                    <Switch
                      checked={module.enabled}
                      onCheckedChange={() => toggleModule(module.id)}
                      disabled={module.critical && module.enabled}
                    />
                    <Badge
                      variant="outline"
                      className={
                        module.enabled
                          ? "bg-success/10 text-success border-success/20"
                          : "bg-muted text-muted-foreground border-border"
                      }
                    >
                      {module.enabled ? "Enabled" : "Disabled"}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Summary */}
        <Card className="border-border/50">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Module Summary</CardTitle>
            <CardDescription>Overview of module activation status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="p-4 rounded-lg bg-muted/30 border border-border/30 text-center">
                <p className="text-3xl font-bold text-foreground">{modules.length}</p>
                <p className="text-sm text-muted-foreground">Total Modules</p>
              </div>
              <div className="p-4 rounded-lg bg-success/5 border border-success/20 text-center">
                <p className="text-3xl font-bold text-success">{enabledCount}</p>
                <p className="text-sm text-muted-foreground">Enabled</p>
              </div>
              <div className="p-4 rounded-lg bg-muted/30 border border-border/30 text-center">
                <p className="text-3xl font-bold text-muted-foreground">{modules.length - enabledCount}</p>
                <p className="text-sm text-muted-foreground">Disabled</p>
              </div>
              <div className="p-4 rounded-lg bg-destructive/5 border border-destructive/20 text-center">
                <p className="text-3xl font-bold text-destructive">{modules.filter((m) => m.critical).length}</p>
                <p className="text-sm text-muted-foreground">Critical</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
