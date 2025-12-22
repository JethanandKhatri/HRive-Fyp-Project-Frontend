import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Brain, AlertTriangle, TrendingDown, TrendingUp, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const insights = [
  {
    id: 1,
    type: "warning",
    icon: AlertTriangle,
    title: "High Burnout Risk",
    description: "3 employees showing signs of burnout based on work patterns",
    action: "Review workload distribution",
  },
  {
    id: 2,
    type: "danger",
    icon: TrendingDown,
    title: "Attrition Risk Alert",
    description: "2 high performers flagged for potential turnover",
    action: "Schedule 1-on-1 meetings",
  },
  {
    id: 3,
    type: "success",
    icon: TrendingUp,
    title: "Positive Performance",
    description: "Engineering team showing 15% productivity increase",
    action: "Consider recognition",
  },
];

const typeStyles = {
  warning: {
    bg: "bg-warning/10",
    icon: "text-warning",
    border: "border-warning/30",
  },
  danger: {
    bg: "bg-destructive/10",
    icon: "text-destructive",
    border: "border-destructive/30",
  },
  success: {
    bg: "bg-success/10",
    icon: "text-success",
    border: "border-success/30",
  },
};

export function CognitiveInsights() {
  return (
    <Card className="shadow-md animate-slide-up" style={{ animationDelay: "300ms" }}>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg font-semibold">
          <Brain className="h-5 w-5 text-accent" />
          Cognitive AI Insights
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {insights.map((insight) => {
          const styles = typeStyles[insight.type as keyof typeof typeStyles];
          const Icon = insight.icon;

          return (
            <div
              key={insight.id}
              className={`rounded-lg border p-3 ${styles.bg} ${styles.border} transition-all hover:shadow-sm`}
            >
              <div className="flex items-start gap-3">
                <div className={`mt-0.5 ${styles.icon}`}>
                  <Icon className="h-5 w-5" />
                </div>
                <div className="flex-1 space-y-1">
                  <p className="font-medium">{insight.title}</p>
                  <p className="text-sm text-muted-foreground">{insight.description}</p>
                  <p className="text-xs font-medium text-primary">{insight.action}</p>
                </div>
              </div>
            </div>
          );
        })}

        <Link to="/cognitive-ai">
          <Button variant="ghost" className="w-full mt-2 text-accent hover:text-accent">
            View Full Analysis
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}
