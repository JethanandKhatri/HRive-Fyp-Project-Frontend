import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UserPlus, Briefcase, Wallet, FileText, CalendarClock, Zap } from "lucide-react";
import { Link } from "react-router-dom";

const actions = [
  {
    name: "Add Employee",
    icon: UserPlus,
    href: "/core-hr/new",
    color: "text-primary",
    bg: "bg-primary/10 hover:bg-primary/20 border-primary/20",
  },
  {
    name: "Post Job",
    icon: Briefcase,
    href: "/recruitment/new-job",
    color: "text-accent",
    bg: "bg-accent/10 hover:bg-accent/20 border-accent/20",
  },
  {
    name: "Run Payroll",
    icon: Wallet,
    href: "/payroll",
    color: "text-success",
    bg: "bg-success/10 hover:bg-success/20 border-success/20",
  },
  {
    name: "Generate Report",
    icon: FileText,
    href: "/analytics",
    color: "text-warning",
    bg: "bg-warning/10 hover:bg-warning/20 border-warning/20",
  },
  {
    name: "Schedule Interview",
    icon: CalendarClock,
    href: "/recruitment/interviews",
    color: "text-info",
    bg: "bg-info/10 hover:bg-info/20 border-info/20",
  },
];

export function QuickActions() {
  return (
    <Card className="shadow-md animate-slide-up border-border" style={{ animationDelay: "400ms" }}>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg font-semibold text-foreground">
          <Zap className="h-5 w-5 text-warning" />
          Quick Actions
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-3">
          {actions.map((action) => (
            <Link key={action.name} to={action.href}>
              <Button
                variant="ghost"
                className={`flex h-auto w-full flex-col items-center gap-2 py-4 border ${action.bg} transition-all rounded-lg`}
              >
                <action.icon className={`h-6 w-6 ${action.color}`} />
                <span className="text-xs font-semibold text-foreground">{action.name}</span>
              </Button>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
