import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
  Wallet,
  Calculator,
  FileText,
  Download,
  Play,
  Building,
  Shield,
  AlertCircle,
} from "lucide-react";
import { Progress } from "@/components/ui/progress";

const payrollSummary = [
  { label: "Basic Salary", amount: "5,850,000" },
  { label: "Allowances", amount: "1,420,000" },
  { label: "Overtime", amount: "185,000" },
  { label: "Deductions", amount: "-750,000" },
  { label: "FBR Tax", amount: "-520,000" },
  { label: "EOBI", amount: "-81,000" },
  { label: "SESSI", amount: "-48,500" },
];

const recentPayrolls = [
  { month: "November 2024", employees: 160, gross: "7,455,000", net: "6,055,500", status: "completed" },
  { month: "October 2024", employees: 158, gross: "7,312,000", net: "5,945,800", status: "completed" },
  { month: "September 2024", employees: 155, gross: "7,180,000", net: "5,836,200", status: "completed" },
];

const statusStyles = {
  completed: "bg-success/10 text-success",
  pending: "bg-warning/10 text-warning",
  processing: "bg-info/10 text-info",
};

const Payroll = () => {
  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between animate-fade-in">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Payroll PK</h1>
            <p className="text-muted-foreground">
              Pakistan-compliant payroll management with FBR, EOBI & SESSI
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2">
              <Download className="h-4 w-4" />
              Export Bank File
            </Button>
            <Button className="gap-2 gradient-primary border-0">
              <Play className="h-4 w-4" />
              Run Payroll
            </Button>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="December Payroll"
            value="PKR 8.2M"
            change="Due: Dec 25"
            icon={Wallet}
            variant="primary"
          />
          <StatCard
            title="Total Employees"
            value="162"
            icon={Building}
          />
          <StatCard
            title="FBR Tax Liability"
            value="PKR 520K"
            icon={Calculator}
            variant="warning"
          />
          <StatCard
            title="Compliance Status"
            value="100%"
            icon={Shield}
            variant="success"
          />
        </div>

        {/* Compliance Notice */}
        <Card className="border-info/30 bg-info/5 shadow-md animate-slide-up">
          <CardContent className="flex items-center gap-4 py-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-info/10">
              <AlertCircle className="h-5 w-5 text-info" />
            </div>
            <div className="flex-1">
              <p className="font-medium">Pakistan Compliance Ready</p>
              <p className="text-sm text-muted-foreground">
                FBR tax slabs, EOBI (5%), and SESSI (3%) contributions are auto-calculated based on current regulations.
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Payroll Breakdown */}
          <Card className="shadow-md animate-slide-up" style={{ animationDelay: "100ms" }}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="h-5 w-5 text-primary" />
                December 2024 Breakdown
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {payrollSummary.map((item, index) => (
                <div
                  key={item.label}
                  className="flex items-center justify-between border-b border-border pb-3 last:border-0 last:pb-0"
                >
                  <span className={item.amount.startsWith("-") ? "text-destructive" : ""}>
                    {item.label}
                  </span>
                  <span
                    className={`font-mono font-medium ${
                      item.amount.startsWith("-") ? "text-destructive" : ""
                    }`}
                  >
                    PKR {item.amount}
                  </span>
                </div>
              ))}
              <div className="flex items-center justify-between border-t-2 border-border pt-4">
                <span className="font-semibold">Net Payable</span>
                <span className="font-mono text-lg font-bold text-primary">PKR 6,055,500</span>
              </div>
            </CardContent>
          </Card>

          {/* Processing Status */}
          <Card className="shadow-md animate-slide-up" style={{ animationDelay: "150ms" }}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                Processing Status
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Salary Calculation</span>
                  <span className="font-medium text-success">Complete</span>
                </div>
                <Progress value={100} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Tax Deduction (FBR)</span>
                  <span className="font-medium text-success">Complete</span>
                </div>
                <Progress value={100} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>EOBI Contribution</span>
                  <span className="font-medium text-success">Complete</span>
                </div>
                <Progress value={100} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>SESSI Contribution</span>
                  <span className="font-medium text-success">Complete</span>
                </div>
                <Progress value={100} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Bank File Generation</span>
                  <span className="font-medium text-muted-foreground">Pending</span>
                </div>
                <Progress value={0} className="h-2" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Payrolls */}
        <Card className="shadow-md animate-slide-up" style={{ animationDelay: "200ms" }}>
          <CardHeader>
            <CardTitle>Recent Payroll History</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Month</TableHead>
                  <TableHead>Employees</TableHead>
                  <TableHead>Gross Amount</TableHead>
                  <TableHead>Net Payable</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="w-[100px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentPayrolls.map((payroll) => (
                  <TableRow key={payroll.month}>
                    <TableCell className="font-medium">{payroll.month}</TableCell>
                    <TableCell>{payroll.employees}</TableCell>
                    <TableCell className="font-mono">PKR {payroll.gross}</TableCell>
                    <TableCell className="font-mono">PKR {payroll.net}</TableCell>
                    <TableCell>
                      <Badge className={statusStyles[payroll.status]}>
                        {payroll.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm" className="gap-2">
                        <FileText className="h-4 w-4" />
                        Payslips
                      </Button>
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

export default Payroll;



