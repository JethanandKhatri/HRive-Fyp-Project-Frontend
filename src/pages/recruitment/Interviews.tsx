import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Clock, Video, MapPin, Plus, Star, User, Search } from "lucide-react";

const upcomingInterviews = [
  {
    id: 1,
    candidate: "Omar Sheikh",
    role: "Senior Software Engineer",
    date: "Dec 23, 2024",
    time: "10:00 AM",
    type: "Technical",
    mode: "Video Call",
    interviewer: "Ali Hassan",
    status: "scheduled",
  },
  {
    id: 2,
    candidate: "Sana Malik",
    role: "UI/UX Designer",
    date: "Dec 23, 2024",
    time: "2:00 PM",
    type: "HR",
    mode: "In-person",
    interviewer: "Sarah Ahmed",
    status: "scheduled",
  },
  {
    id: 3,
    candidate: "Hassan Raza",
    role: "Senior Software Engineer",
    date: "Dec 24, 2024",
    time: "11:00 AM",
    type: "Technical",
    mode: "Video Call",
    interviewer: "Bilal Khan",
    status: "scheduled",
  },
];

const completedInterviews = [
  {
    id: 4,
    candidate: "Ayesha Baig",
    role: "Senior Software Engineer",
    date: "Dec 20, 2024",
    time: "10:00 AM",
    type: "Technical",
    mode: "Video Call",
    interviewer: "Ali Hassan",
    status: "completed",
    rating: 4,
    feedback: "Strong technical skills. Good problem-solving approach.",
    recommendation: "hire",
  },
  {
    id: 5,
    candidate: "Usman Tariq",
    role: "Product Manager",
    date: "Dec 19, 2024",
    time: "3:00 PM",
    type: "Managerial",
    mode: "In-person",
    interviewer: "Nadia Khan",
    status: "completed",
    rating: 2,
    feedback: "Lacks experience in stakeholder management.",
    recommendation: "reject",
  },
];

const interviewers = [
  { id: "1", name: "Ali Hassan", department: "Engineering" },
  { id: "2", name: "Sarah Ahmed", department: "HR" },
  { id: "3", name: "Bilal Khan", department: "Engineering" },
  { id: "4", name: "Nadia Khan", department: "Product" },
];

export default function Interviews() {
  const [isScheduleOpen, setIsScheduleOpen] = useState(false);
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between animate-fade-in">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground">Interview Management</h1>
            <p className="text-muted-foreground">Schedule and track candidate interviews</p>
          </div>
          <Dialog open={isScheduleOpen} onOpenChange={setIsScheduleOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2 gradient-primary border-0">
                <Plus className="h-4 w-4" />
                Schedule Interview
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-lg">
              <DialogHeader>
                <DialogTitle>Schedule Interview</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 pt-4">
                <div className="space-y-2">
                  <Label>Candidate</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select candidate" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">Omar Sheikh - Senior Software Engineer</SelectItem>
                      <SelectItem value="2">Sana Malik - UI/UX Designer</SelectItem>
                      <SelectItem value="3">Hassan Raza - Senior Software Engineer</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Date</Label>
                    <Input type="date" />
                  </div>
                  <div className="space-y-2">
                    <Label>Time</Label>
                    <Input type="time" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Interview Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="technical">Technical</SelectItem>
                      <SelectItem value="hr">HR</SelectItem>
                      <SelectItem value="managerial">Managerial</SelectItem>
                      <SelectItem value="cultural">Cultural Fit</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Mode</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select mode" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="video">Video Call</SelectItem>
                      <SelectItem value="in-person">In-person</SelectItem>
                      <SelectItem value="phone">Phone</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Interviewer</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select interviewer" />
                    </SelectTrigger>
                    <SelectContent>
                      {interviewers.map((interviewer) => (
                        <SelectItem key={interviewer.id} value={interviewer.id}>
                          {interviewer.name} - {interviewer.department}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex justify-end gap-2 pt-4">
                  <Button variant="outline" onClick={() => setIsScheduleOpen(false)}>
                    Cancel
                  </Button>
                  <Button className="gradient-primary border-0" onClick={() => setIsScheduleOpen(false)}>
                    Schedule
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats */}
        <div className="grid gap-4 sm:grid-cols-3">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Calendar className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{upcomingInterviews.length}</p>
                  <p className="text-sm text-muted-foreground">Upcoming Interviews</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-success/10 flex items-center justify-center">
                  <Star className="h-6 w-6 text-success" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{completedInterviews.length}</p>
                  <p className="text-sm text-muted-foreground">Completed This Week</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-accent/10 flex items-center justify-center">
                  <User className="h-6 w-6 text-accent" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{interviewers.length}</p>
                  <p className="text-sm text-muted-foreground">Active Interviewers</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Interview Tabs */}
        <Tabs defaultValue="upcoming">
          <TabsList>
            <TabsTrigger value="upcoming">Upcoming ({upcomingInterviews.length})</TabsTrigger>
            <TabsTrigger value="completed">Completed ({completedInterviews.length})</TabsTrigger>
            <TabsTrigger value="calendar">Calendar View</TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming" className="mt-4 space-y-4">
            {upcomingInterviews.map((interview) => (
              <Card key={interview.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <Avatar className="h-12 w-12">
                        <AvatarFallback className="bg-primary/10 text-primary">
                          {interview.candidate.split(" ").map(n => n[0]).join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold text-foreground">{interview.candidate}</h3>
                        <p className="text-sm text-muted-foreground">{interview.role}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="text-right">
                        <div className="flex items-center gap-2 text-sm text-foreground">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          {interview.date}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Clock className="h-4 w-4" />
                          {interview.time}
                        </div>
                      </div>
                      <Badge variant="secondary">{interview.type}</Badge>
                      <Badge variant="outline" className="gap-1">
                        {interview.mode === "Video Call" ? (
                          <Video className="h-3 w-3" />
                        ) : (
                          <MapPin className="h-3 w-3" />
                        )}
                        {interview.mode}
                      </Badge>
                      <div className="text-sm text-muted-foreground">
                        <span className="text-foreground">{interview.interviewer}</span>
                      </div>
                      <Button variant="outline" size="sm">
                        Reschedule
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="completed" className="mt-4 space-y-4">
            {completedInterviews.map((interview) => (
              <Card key={interview.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <Avatar className="h-12 w-12">
                        <AvatarFallback className="bg-primary/10 text-primary">
                          {interview.candidate.split(" ").map(n => n[0]).join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold text-foreground">{interview.candidate}</h3>
                        <p className="text-sm text-muted-foreground">{interview.role}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`h-4 w-4 ${
                              star <= interview.rating
                                ? "text-warning fill-warning"
                                : "text-muted-foreground"
                            }`}
                          />
                        ))}
                      </div>
                      <Badge
                        variant="outline"
                        className={
                          interview.recommendation === "hire"
                            ? "bg-success/10 text-success border-success/20"
                            : "bg-destructive/10 text-destructive border-destructive/20"
                        }
                      >
                        {interview.recommendation === "hire" ? "Recommend Hire" : "Recommend Reject"}
                      </Badge>
                      <Dialog open={isFeedbackOpen} onOpenChange={setIsFeedbackOpen}>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm">
                            View Feedback
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Interview Feedback</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4 pt-4">
                            <div>
                              <p className="text-sm text-muted-foreground">Candidate</p>
                              <p className="font-medium text-foreground">{interview.candidate}</p>
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground">Interviewer</p>
                              <p className="font-medium text-foreground">{interview.interviewer}</p>
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground">Rating</p>
                              <div className="flex items-center gap-1 mt-1">
                                {[1, 2, 3, 4, 5].map((star) => (
                                  <Star
                                    key={star}
                                    className={`h-5 w-5 ${
                                      star <= interview.rating
                                        ? "text-warning fill-warning"
                                        : "text-muted-foreground"
                                    }`}
                                  />
                                ))}
                              </div>
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground">Feedback</p>
                              <p className="text-foreground mt-1">{interview.feedback}</p>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="calendar" className="mt-4">
            <Card>
              <CardContent className="pt-6">
                <div className="h-96 flex items-center justify-center text-muted-foreground">
                  <div className="text-center">
                    <Calendar className="h-16 w-16 mx-auto mb-4 text-muted-foreground/50" />
                    <p className="font-medium text-foreground">Calendar View</p>
                    <p className="text-sm text-muted-foreground">Coming soon - Full calendar integration</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
}
