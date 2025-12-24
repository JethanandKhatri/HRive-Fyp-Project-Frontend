import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  BarChart3,
  Download,
  FileText,
  TrendingUp,
  Users,
  Wallet,
  Clock,
  Calendar,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const attendanceData = [
  { month: "Jul", rate: 91 },
  { month: "Aug", rate: 93 },
  { month: "Sep", rate: 92 },
  { month: "Oct", rate: 91 },
  { month: "Nov", rate: 92 },
  { month: "Dec", rate: 94 },
];

const payrollData = [
  { month: "Jul", amount: 6.8 },
  { month: "Aug", amount: 7.1 },
  { month: "Sep", amount: 7.2 },
  { month: "Oct", amount: 7.3 },
  { month: "Nov", amount: 7.5 },
  { month: "Dec", amount: 8.2 },
];

const departmentData = [
  { name: "Engineering", value: 45, color: "hsl(221, 83%, 53%)" },
  { name: "Design", value: 18, color: "hsl(174, 62%, 47%)" },
  { name: "Product", value: 12, color: "hsl(38, 92%, 50%)" },
  { name: "HR", value: 8, color: "hsl(142, 71%, 45%)" },
  { name: "Finance", value: 10, color: "hsl(199, 89%, 48%)" },
  { name: "Marketing", value: 15, color: "hsl(0, 84%, 60%)" },
];

const hiringData = [
  { month: "Jul", hires: 3 },
  { month: "Aug", hires: 5 },
  { month: "Sep", hires: 4 },
  { month: "Oct", hires: 6 },
  { month: "Nov", hires: 2 },
  { month: "Dec", hires: 5 },
];

const Analytics = () => {
  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between animate-fade-in">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Analytics</h1>
            <p className="text-muted-foreground">Workforce analytics and reporting</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2">
              <Download className="h-4 w-4" />
              Export PDF
            </Button>
            <Button variant="outline" className="gap-2">
              <FileText className="h-4 w-4" />
              Export CSV
            </Button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card className="shadow-md animate-slide-up">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Headcount</p>
                  <p className="text-2xl font-bold">162</p>
                  <p className="text-xs text-success">+5.2% YoY</p>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <Users className="h-6 w-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-md animate-slide-up" style={{ animationDelay: "50ms" }}>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Avg Attendance</p>
                  <p className="text-2xl font-bold">92.5%</p>
                  <p className="text-xs text-success">+1.5% vs last quarter</p>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-success/10">
                  <Clock className="h-6 w-6 text-success" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-md animate-slide-up" style={{ animationDelay: "100ms" }}>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">YTD Payroll</p>
                  <p className="text-2xl font-bold">PKR 86.4M</p>
                  <p className="text-xs text-muted-foreground">12 months</p>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-warning/10">
                  <Wallet className="h-6 w-6 text-warning" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-md animate-slide-up" style={{ animationDelay: "150ms" }}>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">New Hires YTD</p>
                  <p className="text-2xl font-bold">25</p>
                  <p className="text-xs text-success">18 day avg time to hire</p>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent/10">
                  <TrendingUp className="h-6 w-6 text-accent" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <Tabs defaultValue="attendance" className="animate-slide-up" style={{ animationDelay: "200ms" }}>
          <TabsList>
            <TabsTrigger value="attendance">Attendance</TabsTrigger>
            <TabsTrigger value="payroll">Payroll</TabsTrigger>
            <TabsTrigger value="hiring">Hiring</TabsTrigger>
            <TabsTrigger value="department">Department</TabsTrigger>
          </TabsList>

          <TabsContent value="attendance" className="mt-4">
            <Card className="shadow-md">
              <CardHeader>
                <CardTitle>Attendance Trends (Last 6 Months)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={attendanceData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                      <YAxis domain={[85, 100]} stroke="hsl(var(--muted-foreground))" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "hsl(var(--card))",
                          border: "1px solid hsl(var(--border))",
                          borderRadius: "8px",
                        }}
                        formatter={(value) => [`${value}%`, "Attendance Rate"]}
                      />
                      <Line
                        type="monotone"
                        dataKey="rate"
                        stroke="hsl(var(--primary))"
                        strokeWidth={3}
                        dot={{ fill: "hsl(var(--primary))", strokeWidth: 2 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="payroll" className="mt-4">
            <Card className="shadow-md">
              <CardHeader>
                <CardTitle>Monthly Payroll (PKR Millions)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={payrollData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                      <YAxis stroke="hsl(var(--muted-foreground))" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "hsl(var(--card))",
                          border: "1px solid hsl(var(--border))",
                          borderRadius: "8px",
                        }}
                        formatter={(value) => [`PKR ${value}M`, "Payroll"]}
                      />
                      <Bar dataKey="amount" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="hiring" className="mt-4">
            <Card className="shadow-md">
              <CardHeader>
                <CardTitle>Monthly Hires</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={hiringData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                      <YAxis stroke="hsl(var(--muted-foreground))" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "hsl(var(--card))",
                          border: "1px solid hsl(var(--border))",
                          borderRadius: "8px",
                        }}
                        formatter={(value) => [value, "New Hires"]}
                      />
                      <Bar dataKey="hires" fill="hsl(var(--accent))" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="department" className="mt-4">
            <Card className="shadow-md">
              <CardHeader>
                <CardTitle>Headcount by Department</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80 flex items-center justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={departmentData}
                        cx="50%"
                        cy="50%"
                        innerRadius={80}
                        outerRadius={120}
                        paddingAngle={2}
                        dataKey="value"
                        label={({ name, value }) => `${name}: ${value}`}
                      >
                        {departmentData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "hsl(var(--card))",
                          border: "1px solid hsl(var(--border))",
                          borderRadius: "8px",
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default Analytics;



