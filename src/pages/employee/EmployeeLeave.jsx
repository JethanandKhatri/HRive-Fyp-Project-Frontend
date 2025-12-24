import { useState } from "react";
import { EmployeeLayout } from "@/components/layout/EmployeeLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { Calendar, Plus, Clock, CheckCircle2, XCircle, Loader2 } from "lucide-react";

const leaveBalances = [
  { type: "Annual Leave", used: 7, total: 20, color: "primary" },
  { type: "Sick Leave", used: 2, total: 10, color: "info" },
  { type: "Casual Leave", used: 3, total: 5, color: "warning" },
  { type: "Compensatory", used: 0, total: 2, color: "success" },
];

const leaveRequests = [
  {
    id: 1,
    type: "Annual Leave",
    startDate: "Dec 25, 2024",
    endDate: "Dec 26, 2024",
    days: 2,
    reason: "Christmas holiday",
    status: "Approved",
  },
  {
    id: 2,
    type: "Sick Leave",
    startDate: "Dec 10, 2024",
    endDate: "Dec 10, 2024",
    days: 1,
    reason: "Medical appointment",
    status: "Approved",
  },
  {
    id: 3,
    type: "Casual Leave",
    startDate: "Jan 2, 2025",
    endDate: "Jan 3, 2025",
    days: 2,
    reason: "Personal work",
    status: "Pending",
  },
];

export default function EmployeeLeave() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const getStatusBadge = (status) => {
    switch (status) {
      case "Approved":
        return (
          <Badge className="bg-success/10 text-success border-success/20 gap-1">
            <CheckCircle2 className="h-3 w-3" />
            Approved
          </Badge>
        );
      case "Pending":
        return (
          <Badge className="bg-warning/10 text-warning border-warning/20 gap-1">
            <Clock className="h-3 w-3" />
            Pending
          </Badge>
        );
      case "Rejected":
        return (
          <Badge className="bg-destructive/10 text-destructive border-destructive/20 gap-1">
            <XCircle className="h-3 w-3" />
            Rejected
          </Badge>
        );
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <EmployeeLayout>
      <div className="space-y-6 animate-fade-in">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Leave Management</h1>
            <p className="text-muted-foreground">View balance and request leave</p>
          </div>

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2 gradient-primary border-0">
                <Plus className="h-4 w-4" />
                Request Leave
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Request Leave</DialogTitle>
                <DialogDescription>
                  Submit a new leave request for approval
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 pt-4">
                <div className="space-y-2">
                  <Label htmlFor="leaveType">Leave Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select leave type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="annual">Annual Leave</SelectItem>
                      <SelectItem value="sick">Sick Leave</SelectItem>
                      <SelectItem value="casual">Casual Leave</SelectItem>
                      <SelectItem value="compensatory">Compensatory Leave</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="startDate">Start Date</Label>
                    <Input id="startDate" type="date" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="endDate">End Date</Label>
                    <Input id="endDate" type="date" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="reason">Reason (Optional)</Label>
                  <Textarea
                    id="reason"
                    placeholder="Provide a brief reason for your leave request"
                    rows={3}
                  />
                </div>

                <div className="flex justify-end gap-3 pt-4">
                  <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button className="gradient-primary border-0" onClick={() => setIsDialogOpen(false)}>
                    Submit Request
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Leave Balance Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {leaveBalances.map((balance) => {
            const remaining = balance.total - balance.used;
            const percentage = (balance.used / balance.total) * 100;

            return (
              <Card key={balance.type} className="shadow-card">
                <CardContent className="p-5">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-foreground">{balance.type}</p>
                      <div
                        className={`p-1.5 rounded-lg ${
                          balance.color === "primary"
                            ? "bg-primary/10 text-primary"
                            : balance.color === "info"
                            ? "bg-info/10 text-info"
                            : balance.color === "warning"
                            ? "bg-warning/10 text-warning"
                            : "bg-success/10 text-success"
                        }`}
                      >
                        <Calendar className="h-4 w-4" />
                      </div>
                    </div>

                    <div>
                      <p className="text-2xl font-bold text-foreground">{remaining}</p>
                      <p className="text-xs text-muted-foreground">
                        of {balance.total} days remaining
                      </p>
                    </div>

                    <Progress
                      value={percentage}
                      className="h-2"
                    />

                    <p className="text-xs text-muted-foreground">
                      {balance.used} days used
                    </p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Leave Requests */}
        <Card className="shadow-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-semibold">Leave Requests</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {leaveRequests.map((request) => (
                <div
                  key={request.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-lg border border-border bg-card"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-2.5 rounded-xl bg-primary/10 text-primary shrink-0">
                      <Calendar className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{request.type}</p>
                      <p className="text-sm text-muted-foreground">
                        {request.startDate} - {request.endDate} ({request.days} days)
                      </p>
                      <p className="text-sm text-muted-foreground mt-1">{request.reason}</p>
                    </div>
                  </div>
                  {getStatusBadge(request.status)}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </EmployeeLayout>
  );
}



