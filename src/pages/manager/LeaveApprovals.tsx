import { useState } from "react";
import { LineManagerLayout } from "@/components/layout/LineManagerLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Calendar,
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle,
  User
} from "lucide-react";
import { toast } from "sonner";

const pendingRequests = [
  { 
    id: 1, 
    employee: "Sarah Johnson", 
    role: "Senior Developer",
    type: "Annual Leave", 
    startDate: "Dec 26, 2024", 
    endDate: "Dec 28, 2024",
    days: 3,
    reason: "Family vacation during holiday season",
    balance: 12,
    submittedAt: "Dec 20, 2024"
  },
  { 
    id: 2, 
    employee: "Mike Chen", 
    role: "Frontend Developer",
    type: "Sick Leave", 
    startDate: "Dec 24, 2024", 
    endDate: "Dec 24, 2024",
    days: 1,
    reason: "Not feeling well, need rest",
    balance: 8,
    submittedAt: "Dec 23, 2024"
  },
  { 
    id: 3, 
    employee: "Emily Davis", 
    role: "UI/UX Designer",
    type: "Personal Leave", 
    startDate: "Dec 30, 2024", 
    endDate: "Dec 30, 2024",
    days: 1,
    reason: "Personal appointment",
    balance: 5,
    submittedAt: "Dec 22, 2024"
  },
];

const historyRequests = [
  { id: 4, employee: "John Smith", type: "Annual Leave", dates: "Dec 20-22, 2024", status: "Approved", actionDate: "Dec 18, 2024" },
  { id: 5, employee: "Tom Wilson", type: "Sick Leave", dates: "Dec 15, 2024", status: "Rejected", actionDate: "Dec 15, 2024" },
  { id: 6, employee: "Lisa Wang", type: "Personal Leave", dates: "Dec 10, 2024", status: "Approved", actionDate: "Dec 8, 2024" },
  { id: 7, employee: "David Brown", type: "Annual Leave", dates: "Dec 5-6, 2024", status: "Approved", actionDate: "Dec 3, 2024" },
];

const getLeaveTypeBadge = (type: string) => {
  switch (type) {
    case "Annual Leave":
      return <Badge className="bg-primary/10 text-primary border-primary/20">{type}</Badge>;
    case "Sick Leave":
      return <Badge className="bg-destructive/10 text-destructive border-destructive/20">{type}</Badge>;
    case "Personal Leave":
      return <Badge className="bg-warning/10 text-warning border-warning/20">{type}</Badge>;
    default:
      return <Badge variant="secondary">{type}</Badge>;
  }
};

export default function LeaveApprovals() {
  const [selectedRequest, setSelectedRequest] = useState<typeof pendingRequests[0] | null>(null);
  const [actionType, setActionType] = useState<'approve' | 'reject' | null>(null);
  const [remarks, setRemarks] = useState("");

  const handleAction = (type: 'approve' | 'reject') => {
    toast.success(`Leave request ${type === 'approve' ? 'approved' : 'rejected'} successfully`);
    setSelectedRequest(null);
    setActionType(null);
    setRemarks("");
  };

  return (
    <LineManagerLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Leave Approvals</h1>
          <p className="text-muted-foreground mt-1">Review and manage team leave requests</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card className="border-border">
            <CardContent className="p-4 flex items-center gap-4">
              <div className="p-3 rounded-xl bg-warning/10">
                <Clock className="w-5 h-5 text-warning" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{pendingRequests.length}</p>
                <p className="text-sm text-muted-foreground">Pending</p>
              </div>
            </CardContent>
          </Card>
          <Card className="border-border">
            <CardContent className="p-4 flex items-center gap-4">
              <div className="p-3 rounded-xl bg-accent/10">
                <CheckCircle2 className="w-5 h-5 text-accent" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">12</p>
                <p className="text-sm text-muted-foreground">Approved (This Month)</p>
              </div>
            </CardContent>
          </Card>
          <Card className="border-border">
            <CardContent className="p-4 flex items-center gap-4">
              <div className="p-3 rounded-xl bg-destructive/10">
                <XCircle className="w-5 h-5 text-destructive" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">2</p>
                <p className="text-sm text-muted-foreground">Rejected (This Month)</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="pending" className="space-y-4">
          <TabsList>
            <TabsTrigger value="pending" className="gap-2">
              Pending
              <Badge variant="secondary" className="ml-1">{pendingRequests.length}</Badge>
            </TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
          </TabsList>

          <TabsContent value="pending" className="space-y-4">
            {pendingRequests.map((request) => (
              <Card key={request.id} className="border-border">
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                    {/* Employee Info */}
                    <div className="flex items-start gap-4">
                      <Avatar className="w-12 h-12">
                        <AvatarFallback className="bg-primary/10 text-primary font-medium">
                          {request.employee.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold text-foreground">{request.employee}</h3>
                        <p className="text-sm text-muted-foreground">{request.role}</p>
                        <div className="flex items-center gap-2 mt-2">
                          {getLeaveTypeBadge(request.type)}
                          <span className="text-sm text-muted-foreground">• {request.days} day(s)</span>
                        </div>
                      </div>
                    </div>

                    {/* Leave Details */}
                    <div className="flex-1 lg:max-w-md">
                      <div className="grid grid-cols-2 gap-3 text-sm">
                        <div>
                          <p className="text-muted-foreground">Start Date</p>
                          <p className="font-medium text-foreground">{request.startDate}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">End Date</p>
                          <p className="font-medium text-foreground">{request.endDate}</p>
                        </div>
                        <div className="col-span-2">
                          <p className="text-muted-foreground">Reason</p>
                          <p className="font-medium text-foreground">{request.reason}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Balance After</p>
                          <p className="font-medium text-foreground">{request.balance - request.days} days</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Submitted</p>
                          <p className="font-medium text-foreground">{request.submittedAt}</p>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2 lg:flex-col">
                      <Button 
                        className="flex-1 lg:flex-none gap-2 bg-accent hover:bg-accent/90"
                        onClick={() => {
                          setSelectedRequest(request);
                          setActionType('approve');
                        }}
                      >
                        <CheckCircle2 className="w-4 h-4" />
                        Approve
                      </Button>
                      <Button 
                        variant="outline" 
                        className="flex-1 lg:flex-none gap-2 text-destructive border-destructive/30 hover:bg-destructive/10"
                        onClick={() => {
                          setSelectedRequest(request);
                          setActionType('reject');
                        }}
                      >
                        <XCircle className="w-4 h-4" />
                        Reject
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="history">
            <Card className="border-border">
              <CardContent className="p-0">
                <div className="divide-y divide-border">
                  {historyRequests.map((request) => (
                    <div key={request.id} className="p-4 flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <Avatar className="w-10 h-10">
                          <AvatarFallback className="bg-muted text-muted-foreground text-sm">
                            {request.employee.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-foreground">{request.employee}</p>
                          <p className="text-sm text-muted-foreground">{request.type} • {request.dates}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge 
                          className={request.status === 'Approved' 
                            ? 'bg-accent/10 text-accent border-accent/20' 
                            : 'bg-destructive/10 text-destructive border-destructive/20'
                          }
                        >
                          {request.status}
                        </Badge>
                        <p className="text-xs text-muted-foreground mt-1">{request.actionDate}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Confirmation Dialog */}
        <Dialog open={!!selectedRequest && !!actionType} onOpenChange={() => {
          setSelectedRequest(null);
          setActionType(null);
          setRemarks("");
        }}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {actionType === 'approve' ? 'Approve' : 'Reject'} Leave Request
              </DialogTitle>
              <DialogDescription>
                {actionType === 'approve' 
                  ? `You are about to approve ${selectedRequest?.employee}'s leave request.`
                  : `You are about to reject ${selectedRequest?.employee}'s leave request.`
                }
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="p-4 rounded-lg bg-muted/50">
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <p className="text-muted-foreground">Type:</p>
                  <p className="font-medium text-foreground">{selectedRequest?.type}</p>
                  <p className="text-muted-foreground">Dates:</p>
                  <p className="font-medium text-foreground">{selectedRequest?.startDate} - {selectedRequest?.endDate}</p>
                  <p className="text-muted-foreground">Days:</p>
                  <p className="font-medium text-foreground">{selectedRequest?.days}</p>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-foreground">Remarks (Optional)</label>
                <Textarea 
                  placeholder="Add any comments..."
                  value={remarks}
                  onChange={(e) => setRemarks(e.target.value)}
                  className="mt-2"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => {
                setSelectedRequest(null);
                setActionType(null);
                setRemarks("");
              }}>
                Cancel
              </Button>
              <Button 
                onClick={() => handleAction(actionType!)}
                className={actionType === 'approve' 
                  ? 'bg-accent hover:bg-accent/90' 
                  : 'bg-destructive hover:bg-destructive/90'
                }
              >
                {actionType === 'approve' ? 'Confirm Approval' : 'Confirm Rejection'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </LineManagerLayout>
  );
}
