import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import {
  ArrowLeft,
  Edit,
  Users,
  MapPin,
  Building,
  Clock,
  Calendar,
  DollarSign,
  Briefcase,
  Eye,
  UserPlus,
  MoreVertical,
} from "lucide-react";

const jobData = {
  id: 1,
  title: "Senior Software Engineer",
  department: "Engineering",
  location: "Karachi",
  type: "Full-time",
  experience: "5-8 years",
  salary: "PKR 400,000 - 600,000",
  status: "active",
  postedDate: "Dec 10, 2024",
  closingDate: "Jan 10, 2025",
  description: `We are looking for a Senior Software Engineer to join our growing engineering team. You will be responsible for developing and maintaining our core platform using modern web technologies.

Key Responsibilities:
• Design, develop, and maintain scalable web applications
• Collaborate with product and design teams
• Mentor junior developers
• Participate in code reviews and architectural decisions

Requirements:
• 5+ years of experience with React, TypeScript, and Node.js
• Strong understanding of software design patterns
• Experience with cloud services (AWS/GCP)
• Excellent communication skills`,
  applicants: 24,
  interviewed: 6,
  offered: 2,
  hired: 0,
  team: [
    { name: "Sarah Ahmed", role: "Hiring Manager", avatar: "SA" },
    { name: "Ali Hassan", role: "Interviewer", avatar: "AH" },
    { name: "Nadia Khan", role: "Recruiter", avatar: "NK" },
  ],
  pipelineStats: [
    { stage: "Applied", count: 24 },
    { stage: "Screening", count: 18 },
    { stage: "Shortlisted", count: 10 },
    { stage: "Interview", count: 6 },
    { stage: "Offer", count: 2 },
  ],
};

export default function JobDetail() {
  const { id } = useParams();

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Back Button & Header */}
        <div className="flex items-center justify-between animate-fade-in">
          <div className="flex items-center gap-4">
            <Link to="/recruitment">
              <Button variant="ghost" size="icon" className="h-9 w-9">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-2xl font-bold tracking-tight text-foreground">{jobData.title}</h1>
                <Badge className="bg-success/10 text-success border-success/20">Active</Badge>
              </div>
              <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Building className="h-4 w-4" />
                  {jobData.department}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  {jobData.location}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {jobData.type}
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Link to={`/recruitment/job/${id}/applicants`}>
              <Button variant="outline" className="gap-2">
                <Eye className="h-4 w-4" />
                View Applicants
              </Button>
            </Link>
            <Button className="gap-2 gradient-primary border-0">
              <Edit className="h-4 w-4" />
              Edit Job
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Applicants</p>
                  <p className="text-3xl font-bold text-foreground">{jobData.applicants}</p>
                </div>
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Users className="h-6 w-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Interviewed</p>
                  <p className="text-3xl font-bold text-foreground">{jobData.interviewed}</p>
                </div>
                <div className="h-12 w-12 rounded-full bg-accent/10 flex items-center justify-center">
                  <Calendar className="h-6 w-6 text-accent" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Offers Sent</p>
                  <p className="text-3xl font-bold text-foreground">{jobData.offered}</p>
                </div>
                <div className="h-12 w-12 rounded-full bg-success/10 flex items-center justify-center">
                  <Briefcase className="h-6 w-6 text-success" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Hired</p>
                  <p className="text-3xl font-bold text-foreground">{jobData.hired}</p>
                </div>
                <div className="h-12 w-12 rounded-full bg-warning/10 flex items-center justify-center">
                  <UserPlus className="h-6 w-6 text-warning" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            <Tabs defaultValue="description">
              <TabsList>
                <TabsTrigger value="description">Description</TabsTrigger>
                <TabsTrigger value="pipeline">Pipeline</TabsTrigger>
              </TabsList>

              <TabsContent value="description" className="mt-4">
                <Card>
                  <CardContent className="pt-6">
                    <div className="prose prose-sm max-w-none">
                      <pre className="whitespace-pre-wrap font-sans text-sm text-foreground leading-relaxed">
                        {jobData.description}
                      </pre>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="pipeline" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Hiring Pipeline</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {jobData.pipelineStats.map((stage, index) => (
                      <div key={stage.stage} className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-foreground">{stage.stage}</span>
                          <span className="font-medium text-foreground">{stage.count}</span>
                        </div>
                        <Progress
                          value={(stage.count / jobData.applicants) * 100}
                          className="h-2"
                        />
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          <div className="space-y-6">
            {/* Job Details Card */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Job Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Experience</span>
                  <span className="text-sm font-medium text-foreground">{jobData.experience}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Salary Range</span>
                  <span className="text-sm font-medium text-foreground">{jobData.salary}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Posted Date</span>
                  <span className="text-sm font-medium text-foreground">{jobData.postedDate}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Closing Date</span>
                  <span className="text-sm font-medium text-foreground">{jobData.closingDate}</span>
                </div>
              </CardContent>
            </Card>

            {/* Hiring Team Card */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Hiring Team</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {jobData.team.map((member) => (
                  <div key={member.name} className="flex items-center gap-3">
                    <Avatar className="h-9 w-9">
                      <AvatarFallback className="bg-primary/10 text-primary text-sm">
                        {member.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium text-foreground">{member.name}</p>
                      <p className="text-xs text-muted-foreground">{member.role}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}



