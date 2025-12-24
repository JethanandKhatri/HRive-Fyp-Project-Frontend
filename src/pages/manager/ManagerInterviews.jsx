import { useState } from "react";
import { LineManagerLayout } from "@/components/layout/LineManagerLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
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
  Video,
  Calendar,
  Clock,
  MapPin,
  User,
  Star,
  CheckCircle2,
  Send
} from "lucide-react";
import { toast } from "sonner";

const upcomingInterviews = [
  { 
    id: 1, 
    candidate: "Alex Thompson", 
    position: "Software Engineer",
    type: "Technical Round",
    date: "Dec 24, 2024",
    time: "2:00 PM - 3:00 PM",
    location: "Google Meet",
    status: "Scheduled"
  },
  { 
    id: 2, 
    candidate: "Lisa Wang", 
    position: "UI/UX Designer",
    type: "Portfolio Review",
    date: "Dec 25, 2024",
    time: "10:00 AM - 11:00 AM",
    location: "Zoom",
    status: "Scheduled"
  },
];

const pendingFeedback = [
  { 
    id: 3, 
    candidate: "Maria Garcia", 
    position: "Product Manager",
    type: "Behavioral Round",
    date: "Dec 22, 2024",
    interviewedAt: "Dec 22, 2024",
    status: "Feedback Pending"
  },
];

const completedInterviews = [
  { 
    id: 4, 
    candidate: "James Wilson", 
    position: "Backend Developer",
    type: "Technical Round",
    date: "Dec 20, 2024",
    recommendation: "Hire",
    submittedAt: "Dec 20, 2024"
  },
  { 
    id: 5, 
    candidate: "Emma Brown", 
    position: "Data Analyst",
    type: "Case Study",
    date: "Dec 18, 2024",
    recommendation: "Hold",
    submittedAt: "Dec 19, 2024"
  },
];

const RatingInput = ({ label, value, onChange }) => (
  <div className="space-y-2">
    <Label className="text-sm font-medium text-foreground">{label}</Label>
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((rating) => (
        <button
          key={rating}
          type="button"
          onClick={() => onChange(rating)}
          className={`p-1.5 rounded-md transition-colors ${
            rating <= value 
              ? 'text-warning' 
              : 'text-muted-foreground/30 hover:text-muted-foreground/50'
          }`}
        >
          <Star className="w-6 h-6 fill-current" />
        </button>
      ))}
    </div>
  </div>
);

export default function ManagerInterviews() {
  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const [selectedInterview, setSelectedInterview] = useState(null);
  const [feedback, setFeedback] = useState({
    skills: 0,
    communication: 0,
    culturalFit: 0,
    remarks: "",
    recommendation: ""
  });

  const handleSubmitFeedback = () => {
    if (!feedback.recommendation) {
      toast.error("Please select a recommendation");
      return;
    }
    if (feedback.skills === 0 || feedback.communication === 0 || feedback.culturalFit === 0) {
      toast.error("Please provide all ratings");
      return;
    }
    toast.success("Interview feedback submitted successfully");
    setFeedbackOpen(false);
    setFeedback({ skills: 0, communication: 0, culturalFit: 0, remarks: "", recommendation: "" });
  };

  return (
    <LineManagerLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Interviews</h1>
          <p className="text-muted-foreground mt-1">Conduct interviews and submit feedback</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card className="border-border">
            <CardContent className="p-4 flex items-center gap-4">
              <div className="p-3 rounded-xl bg-primary/10">
                <Calendar className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{upcomingInterviews.length}</p>
                <p className="text-sm text-muted-foreground">Upcoming</p>
              </div>
            </CardContent>
          </Card>
          <Card className="border-border">
            <CardContent className="p-4 flex items-center gap-4">
              <div className="p-3 rounded-xl bg-warning/10">
                <Clock className="w-5 h-5 text-warning" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{pendingFeedback.length}</p>
                <p className="text-sm text-muted-foreground">Feedback Pending</p>
              </div>
            </CardContent>
          </Card>
          <Card className="border-border">
            <CardContent className="p-4 flex items-center gap-4">
              <div className="p-3 rounded-xl bg-accent/10">
                <CheckCircle2 className="w-5 h-5 text-accent" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{completedInterviews.length}</p>
                <p className="text-sm text-muted-foreground">Completed</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Info Banner */}
        <Card className="border-border bg-muted/30">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <User className="w-5 h-5 text-primary" />
            </div>
            <p className="text-sm text-muted-foreground">
              <span className="font-medium text-foreground">Interviews are assigned by HR Manager.</span> Submit feedback after each interview to help with hiring decisions.
            </p>
          </CardContent>
        </Card>

        <Tabs defaultValue="upcoming" className="space-y-4">
          <TabsList>
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="pending" className="gap-2">
              Pending Feedback
              {pendingFeedback.length > 0 && (
                <Badge variant="destructive" className="ml-1">{pendingFeedback.length}</Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming" className="space-y-4">
            {upcomingInterviews.map((interview) => (
              <Card key={interview.id} className="border-border">
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <Avatar className="w-12 h-12">
                        <AvatarFallback className="bg-primary/10 text-primary font-medium">
                          {interview.candidate.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold text-foreground">{interview.candidate}</h3>
                        <p className="text-sm text-muted-foreground">{interview.position}</p>
                        <Badge variant="secondary" className="mt-2">{interview.type}</Badge>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>{interview.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        <span>{interview.time}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        <span>{interview.location}</span>
                      </div>
                    </div>

                    <Button className="gap-2">
                      <Video className="w-4 h-4" />
                      Join Interview
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
            {upcomingInterviews.length === 0 && (
              <Card className="border-border">
                <CardContent className="p-12 text-center">
                  <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">No upcoming interviews scheduled</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="pending" className="space-y-4">
            {pendingFeedback.map((interview) => (
              <Card key={interview.id} className="border-border border-l-4 border-l-warning">
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <Avatar className="w-12 h-12">
                        <AvatarFallback className="bg-warning/10 text-warning font-medium">
                          {interview.candidate.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold text-foreground">{interview.candidate}</h3>
                        <p className="text-sm text-muted-foreground">{interview.position}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <Badge variant="secondary">{interview.type}</Badge>
                          <Badge className="bg-warning/10 text-warning border-warning/20">Feedback Pending</Badge>
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-sm text-muted-foreground">
                      <p>Interviewed on: {interview.interviewedAt}</p>
                    </div>

                    <Button 
                      className="gap-2 bg-accent hover:bg-accent/90"
                      onClick={() => {
                        setSelectedInterview(interview);
                        setFeedbackOpen(true);
                      }}
                    >
                      <Send className="w-4 h-4" />
                      Submit Feedback
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="completed" className="space-y-4">
            <Card className="border-border">
              <CardContent className="p-0">
                <div className="divide-y divide-border">
                  {completedInterviews.map((interview) => (
                    <div key={interview.id} className="p-4 flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <Avatar className="w-10 h-10">
                          <AvatarFallback className="bg-muted text-muted-foreground text-sm">
                            {interview.candidate.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-foreground">{interview.candidate}</p>
                          <p className="text-sm text-muted-foreground">{interview.position} • {interview.type}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge 
                          className={
                            interview.recommendation === 'Hire' 
                              ? 'bg-accent/10 text-accent border-accent/20' 
                              : interview.recommendation === 'Reject'
                              ? 'bg-destructive/10 text-destructive border-destructive/20'
                              : 'bg-warning/10 text-warning border-warning/20'
                          }
                        >
                          {interview.recommendation}
                        </Badge>
                        <p className="text-xs text-muted-foreground mt-1">Submitted: {interview.submittedAt}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Feedback Dialog */}
        <Dialog open={feedbackOpen} onOpenChange={setFeedbackOpen}>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Submit Interview Feedback</DialogTitle>
              <DialogDescription>
                Provide your assessment for {selectedInterview?.candidate}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-6 py-4">
              <div className="p-4 rounded-lg bg-muted/50">
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <p className="text-muted-foreground">Candidate:</p>
                  <p className="font-medium text-foreground">{selectedInterview?.candidate}</p>
                  <p className="text-muted-foreground">Position:</p>
                  <p className="font-medium text-foreground">{selectedInterview?.position}</p>
                  <p className="text-muted-foreground">Round:</p>
                  <p className="font-medium text-foreground">{selectedInterview?.type}</p>
                </div>
              </div>

              <div className="space-y-4">
                <RatingInput 
                  label="Technical/Domain Skills" 
                  value={feedback.skills} 
                  onChange={(v) => setFeedback(prev => ({ ...prev, skills: v }))} 
                />
                <RatingInput 
                  label="Communication" 
                  value={feedback.communication} 
                  onChange={(v) => setFeedback(prev => ({ ...prev, communication: v }))} 
                />
                <RatingInput 
                  label="Cultural Fit" 
                  value={feedback.culturalFit} 
                  onChange={(v) => setFeedback(prev => ({ ...prev, culturalFit: v }))} 
                />
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium text-foreground">Remarks</Label>
                <Textarea 
                  placeholder="Additional comments about the candidate..."
                  value={feedback.remarks}
                  onChange={(e) => setFeedback(prev => ({ ...prev, remarks: e.target.value }))}
                />
              </div>

              <div className="space-y-3">
                <Label className="text-sm font-medium text-foreground">Recommendation</Label>
                <RadioGroup 
                  value={feedback.recommendation}
                  onValueChange={(v) => setFeedback(prev => ({ ...prev, recommendation: v }))}
                  className="flex gap-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="hire" id="hire" />
                    <Label htmlFor="hire" className="text-accent font-medium cursor-pointer">Hire</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="hold" id="hold" />
                    <Label htmlFor="hold" className="text-warning font-medium cursor-pointer">Hold</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="reject" id="reject" />
                    <Label htmlFor="reject" className="text-destructive font-medium cursor-pointer">Reject</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setFeedbackOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSubmitFeedback} className="bg-accent hover:bg-accent/90">
                Submit Feedback
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </LineManagerLayout>
  );
}



