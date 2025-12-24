import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import {
  Mail,
  Phone,
  MapPin,
  Calendar,
  FileText,
  Star,
  Clock,
  CheckCircle,
  XCircle,
  ArrowRight,
  Download,
  MessageSquare,
  Send,
  Briefcase,
  GraduationCap,
} from "lucide-react";
import { cn } from "@/lib/utils";

export function CandidateProfile({ candidate, onClose, onMoveStage, onReject, onHire }) {
  const getMatchColor = (score) => {
    if (score >= 80) return "text-success";
    if (score >= 60) return "text-warning";
    return "text-destructive";
  };

  const stages = [
    "Applied",
    "Screening",
    "Shortlisted",
    "Interview Scheduled",
    "Interview Completed",
    "Offer Sent",
    "Offer Accepted",
    "Hired",
  ];

  const currentStageIndex = stages.findIndex(
    (s) => s.toLowerCase().replace(/\s+/g, "-") === candidate.stage.toLowerCase().replace(/\s+/g, "-")
  );

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-6 border-b bg-card">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-4">
            <Avatar className="h-16 w-16">
              <AvatarFallback className="bg-primary/10 text-primary font-semibold text-xl">
                {candidate.name.split(" ").map(n => n[0]).join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-xl font-bold text-foreground">{candidate.name}</h2>
              <p className="text-muted-foreground">{candidate.role}</p>
              <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Mail className="h-4 w-4" />
                  {candidate.email}
                </span>
                {candidate.phone && (
                  <span className="flex items-center gap-1">
                    <Phone className="h-4 w-4" />
                    {candidate.phone}
                  </span>
                )}
                {candidate.location && (
                  <span className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    {candidate.location}
                  </span>
                )}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className={cn("text-lg px-3 py-1", getMatchColor(candidate.matchScore))}>
              <Star className="h-4 w-4 mr-1" />
              {candidate.matchScore}%
            </Badge>
          </div>
        </div>

        {/* Stage Progress */}
        <div className="mt-6">
          <div className="flex items-center gap-1">
            {stages.map((stage, index) => (
              <div key={stage} className="flex items-center">
                <div
                  className={cn(
                    "h-2 rounded-full transition-all",
                    index === 0 ? "w-8" : "w-12",
                    index <= currentStageIndex ? "bg-success" : "bg-muted"
                  )}
                />
                {index < stages.length - 1 && (
                  <div className={cn("w-1 h-2", index < currentStageIndex ? "bg-success" : "bg-muted")} />
                )}
              </div>
            ))}
          </div>
          <p className="text-sm text-muted-foreground mt-2">
            Current Stage: <span className="font-medium text-foreground">{stages[currentStageIndex] || candidate.stage}</span>
          </p>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 mt-4">
          <Button className="gap-2 gradient-primary border-0" onClick={() => onMoveStage?.(stages[currentStageIndex + 1])}>
            Move to Next Stage
            <ArrowRight className="h-4 w-4" />
          </Button>
          <Button variant="outline" className="gap-2">
            <Calendar className="h-4 w-4" />
            Schedule Interview
          </Button>
          <Button variant="outline" className="gap-2 text-destructive hover:text-destructive" onClick={onReject}>
            <XCircle className="h-4 w-4" />
            Reject
          </Button>
          <Button variant="secondary" className="gap-2 ml-auto">
            <Download className="h-4 w-4" />
            Download CV
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto">
        <Tabs defaultValue="overview" className="h-full">
          <div className="border-b px-6">
            <TabsList className="h-12">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="resume">Resume</TabsTrigger>
              <TabsTrigger value="timeline">Timeline</TabsTrigger>
              <TabsTrigger value="notes">Notes</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="overview" className="p-6 space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2">
                    <Briefcase className="h-4 w-4 text-primary" />
                    Experience
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="font-medium text-foreground">{candidate.experience}</p>
                  <p className="text-sm text-muted-foreground mt-1">Applied on {candidate.appliedDate}</p>
                  <p className="text-sm text-muted-foreground">Source: {candidate.source}</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2">
                    <GraduationCap className="h-4 w-4 text-primary" />
                    Education
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="font-medium text-foreground">{candidate.education || "Bachelor's in Computer Science"}</p>
                  <p className="text-sm text-muted-foreground mt-1">University of Karachi</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Skills</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {(candidate.skills || ["React", "TypeScript", "Node.js", "PostgreSQL", "AWS"]).map((skill) => (
                    <Badge key={skill} variant="secondary" className="text-foreground">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="resume" className="p-6">
            <Card className="h-[500px] flex items-center justify-center">
              <div className="text-center space-y-4">
                <FileText className="h-16 w-16 text-muted-foreground mx-auto" />
                <div>
                  <p className="font-medium text-foreground">Resume Preview</p>
                  <p className="text-sm text-muted-foreground">Click to view full resume</p>
                </div>
                <Button variant="outline" className="gap-2">
                  <Download className="h-4 w-4" />
                  Download PDF
                </Button>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="timeline" className="p-6">
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  {(candidate.timeline || [
                    { action: "Applied for Senior Software Engineer", date: "Dec 20, 2024", user: "System" },
                    { action: "Resume screened by AI", date: "Dec 20, 2024", user: "AI Screening" },
                    { action: "Moved to Shortlisted", date: "Dec 21, 2024", user: "Sarah Ahmed" },
                  ]).map((item, index) => (
                    <div key={index} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className="w-2 h-2 rounded-full bg-primary" />
                        {index < 2 && <div className="w-px h-full bg-border" />}
                      </div>
                      <div className="pb-4">
                        <p className="font-medium text-sm text-foreground">{item.action}</p>
                        <p className="text-xs text-muted-foreground">
                          {item.date} • {item.user}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notes" className="p-6 space-y-4">
            <Card>
              <CardContent className="pt-6 space-y-4">
                <div className="flex gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="text-xs">SA</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <Textarea placeholder="Add a note about this candidate..." className="min-h-20" />
                    <div className="flex justify-end mt-2">
                      <Button size="sm" className="gap-2">
                        <Send className="h-4 w-4" />
                        Add Note
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-3">
              {(candidate.notes || [
                { user: "Sarah Ahmed", text: "Strong technical background. Recommend for technical interview.", date: "Dec 21, 2024" },
                { user: "AI Screening", text: "85% match score. Key skills: React, TypeScript, Node.js", date: "Dec 20, 2024" },
              ]).map((note, index) => (
                <Card key={index}>
                  <CardContent className="pt-4">
                    <div className="flex gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="text-xs bg-primary/10 text-primary">
                          {note.user.split(" ").map(n => n[0]).join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-sm text-foreground">{note.user}</span>
                          <span className="text-xs text-muted-foreground">{note.date}</span>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">{note.text}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}



