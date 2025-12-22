import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Brain,
  AlertTriangle,
  TrendingDown,
  TrendingUp,
  Shield,
  Info,
  ChevronRight,
  Sparkles,
} from "lucide-react";

const burnoutRisk = [
  { name: "Usman Ali", department: "Engineering", risk: 85, factors: ["Long hours", "No breaks"] },
  { name: "Sana Fatima", department: "Design", risk: 72, factors: ["Deadline pressure", "Overload"] },
  { name: "Imran Shah", department: "Product", risk: 68, factors: ["Cross-team demands"] },
];

const attritionRisk = [
  { name: "Kamran Hussain", department: "Engineering", risk: 78, factors: ["Market salary gap", "Growth plateau"] },
  { name: "Zara Khan", department: "Marketing", risk: 65, factors: ["Role mismatch", "Recognition"] },
];

const positiveInsights = [
  { title: "Engineering Productivity Up", change: "+15%", description: "Sprint velocity increased consistently" },
  { title: "Design Team Engagement", change: "+22%", description: "Collaboration metrics improving" },
  { title: "Low Turnover Q4", change: "-40%", description: "Compared to industry average" },
];

const CognitiveAI = () => {
  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="animate-fade-in">
          <h1 className="text-2xl font-bold tracking-tight">Cognitive AI</h1>
          <p className="text-muted-foreground">
            AI-powered workforce insights with privacy-safe analysis
          </p>
        </div>

        {/* Privacy Notice */}
        <Card className="border-accent/30 bg-accent/5 shadow-md animate-slide-up">
          <CardContent className="flex items-center gap-4 py-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/10">
              <Shield className="h-5 w-5 text-accent" />
            </div>
            <div className="flex-1">
              <p className="font-medium">Privacy-First AI Analysis</p>
              <p className="text-sm text-muted-foreground">
                No raw personal data is stored. Insights are generated from aggregated patterns with SHAP explainability.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Risk Metrics */}
        <div className="grid gap-4 sm:grid-cols-3">
          <Card className="shadow-md border-l-4 border-l-warning animate-slide-up">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-warning/10">
                  <AlertTriangle className="h-6 w-6 text-warning" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Burnout Risk</p>
                  <p className="text-2xl font-bold">3 Employees</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-md border-l-4 border-l-destructive animate-slide-up" style={{ animationDelay: "50ms" }}>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10">
                  <TrendingDown className="h-6 w-6 text-destructive" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Attrition Risk</p>
                  <p className="text-2xl font-bold">2 Employees</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-md border-l-4 border-l-success animate-slide-up" style={{ animationDelay: "100ms" }}>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-success/10">
                  <TrendingUp className="h-6 w-6 text-success" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Positive Trends</p>
                  <p className="text-2xl font-bold">3 Insights</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Burnout Risk */}
          <Card className="shadow-md animate-slide-up" style={{ animationDelay: "150ms" }}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-warning" />
                High Burnout Risk
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {burnoutRisk.map((employee) => (
                <div
                  key={employee.name}
                  className="rounded-lg border border-warning/20 bg-warning/5 p-4"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage
                          src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${employee.name}`}
                        />
                        <AvatarFallback>
                          {employee.name.split(" ").map((n) => n[0]).join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{employee.name}</p>
                        <p className="text-sm text-muted-foreground">{employee.department}</p>
                      </div>
                    </div>
                    <Badge variant="outline" className="bg-warning/10 text-warning border-warning/30">
                      {employee.risk}% risk
                    </Badge>
                  </div>
                  <div className="mt-3 space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Risk Level</span>
                      <span className="font-medium">{employee.risk}%</span>
                    </div>
                    <Progress value={employee.risk} className="h-2" />
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {employee.factors.map((factor) => (
                      <Badge key={factor} variant="secondary" className="text-xs">
                        {factor}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Attrition Risk */}
          <Card className="shadow-md animate-slide-up" style={{ animationDelay: "200ms" }}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingDown className="h-5 w-5 text-destructive" />
                Attrition Risk Alert
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {attritionRisk.map((employee) => (
                <div
                  key={employee.name}
                  className="rounded-lg border border-destructive/20 bg-destructive/5 p-4"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage
                          src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${employee.name}`}
                        />
                        <AvatarFallback>
                          {employee.name.split(" ").map((n) => n[0]).join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{employee.name}</p>
                        <p className="text-sm text-muted-foreground">{employee.department}</p>
                      </div>
                    </div>
                    <Badge variant="outline" className="bg-destructive/10 text-destructive border-destructive/30">
                      {employee.risk}% risk
                    </Badge>
                  </div>
                  <div className="mt-3 space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Risk Level</span>
                      <span className="font-medium">{employee.risk}%</span>
                    </div>
                    <Progress value={employee.risk} className="h-2" />
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {employee.factors.map((factor) => (
                      <Badge key={factor} variant="secondary" className="text-xs">
                        {factor}
                      </Badge>
                    ))}
                  </div>
                  <Button variant="outline" size="sm" className="mt-3 w-full gap-2">
                    Schedule 1-on-1
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Positive Insights */}
        <Card className="shadow-md animate-slide-up" style={{ animationDelay: "250ms" }}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-success" />
              Positive Performance Insights
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              {positiveInsights.map((insight, index) => (
                <div
                  key={insight.title}
                  className="rounded-lg border border-success/20 bg-success/5 p-4"
                >
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-success" />
                    <span className="font-semibold text-success">{insight.change}</span>
                  </div>
                  <p className="mt-2 font-medium">{insight.title}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{insight.description}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default CognitiveAI;
