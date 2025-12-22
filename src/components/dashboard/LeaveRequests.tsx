import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Calendar, Check, X, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const leaveRequests = [
  {
    id: 1,
    name: "Ahmed Khan",
    avatar: "Ahmed",
    type: "Annual Leave",
    dates: "Dec 23 - Dec 25",
    days: 3,
    status: "pending",
  },
  {
    id: 2,
    name: "Fatima Ali",
    avatar: "Fatima",
    type: "Sick Leave",
    dates: "Dec 22",
    days: 1,
    status: "pending",
  },
  {
    id: 3,
    name: "Hassan Raza",
    avatar: "Hassan",
    type: "Personal Leave",
    dates: "Dec 26 - Dec 27",
    days: 2,
    status: "pending",
  },
];

export function LeaveRequests() {
  return (
    <Card className="shadow-md animate-slide-up" style={{ animationDelay: "200ms" }}>
      <CardHeader className="flex flex-row items-center justify-between pb-3">
        <CardTitle className="flex items-center gap-2 text-lg font-semibold">
          <Calendar className="h-5 w-5 text-primary" />
          Pending Leave Requests
        </CardTitle>
        <Badge variant="secondary" className="font-medium">
          {leaveRequests.length} pending
        </Badge>
      </CardHeader>
      <CardContent className="space-y-3">
        {leaveRequests.map((request) => (
          <div
            key={request.id}
            className="flex items-center justify-between rounded-lg border border-border bg-secondary/30 p-3 transition-colors hover:bg-secondary/50"
          >
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10">
                <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${request.avatar}`} />
                <AvatarFallback>{request.name.split(" ").map((n) => n[0]).join("")}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">{request.name}</p>
                <p className="text-xs text-muted-foreground">
                  {request.type} • {request.dates} ({request.days} {request.days === 1 ? "day" : "days"})
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-success hover:bg-success/10 hover:text-success">
                <Check className="h-4 w-4" />
              </Button>
              <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-destructive hover:bg-destructive/10 hover:text-destructive">
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}

        <Link to="/leave">
          <Button variant="ghost" className="w-full mt-2 text-primary hover:text-primary">
            View All Requests
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}
