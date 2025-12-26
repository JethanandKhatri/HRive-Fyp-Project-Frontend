import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ArrowLeft, Search, MoreVertical, FileText, Brain, UserCheck, Eye } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { Progress } from "@/components/ui/progress";

const applicants = [
  {
    id: 1,
    name: "Ali Hassan",
    email: "ali.hassan@email.com",
    experience: "5 years",
    cvUploaded: true,
    aiMatch: 92,
    status: "shortlisted",
  },
  {
    id: 2,
    name: "Sara Ahmed",
    email: "sara.ahmed@email.com",
    experience: "3 years",
    cvUploaded: true,
    aiMatch: 85,
    status: "screened",
  },
  {
    id: 3,
    name: "Usman Khan",
    email: "usman.khan@email.com",
    experience: "7 years",
    cvUploaded: true,
    aiMatch: 78,
    status: "interviewed",
  },
  {
    id: 4,
    name: "Ayesha Malik",
    email: "ayesha.malik@email.com",
    experience: "4 years",
    cvUploaded: true,
    aiMatch: 88,
    status: "new",
  },
  {
    id: 5,
    name: "Farhan Qureshi",
    email: "farhan.q@email.com",
    experience: "2 years",
    cvUploaded: false,
    aiMatch: null,
    status: "new",
  },
];

const statusStyles = {
  new: "bg-secondary text-secondary-foreground",
  screened: "bg-info/10 text-info",
  shortlisted: "bg-success/10 text-success",
  interviewed: "bg-warning/10 text-warning",
};

const Applicants = () => {
  const { jobId } = useParams();

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-center gap-4 animate-fade-in">
          <Link to="/hr/recruitment">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Senior Software Engineer</h1>
            <p className="text-muted-foreground">
              Engineering • Karachi • {applicants.length} applicants
            </p>
          </div>
        </div>

        {/* Search */}
        <div className="flex gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search applicants..." className="pl-10" />
          </div>
          <Button variant="outline" className="gap-2">
            <Brain className="h-4 w-4" />
            Bulk AI Screen
          </Button>
        </div>

        {/* Applicants Table */}
        <Card className="shadow-md animate-slide-up">
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Candidate</TableHead>
                  <TableHead>Experience</TableHead>
                  <TableHead>CV</TableHead>
                  <TableHead>AI Match</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="w-[100px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {applicants.map((applicant) => (
                  <TableRow key={applicant.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-9 w-9">
                          <AvatarImage
                            src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${applicant.name}`}
                          />
                          <AvatarFallback>
                            {applicant.name.split(" ").map((n) => n[0]).join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{applicant.name}</p>
                          <p className="text-sm text-muted-foreground">{applicant.email}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{applicant.experience}</TableCell>
                    <TableCell>
                      {applicant.cvUploaded ? (
                        <Button variant="ghost" size="sm" className="gap-1.5 text-primary">
                          <FileText className="h-4 w-4" />
                          View CV
                        </Button>
                      ) : (
                        <span className="text-muted-foreground">Not uploaded</span>
                      )}
                    </TableCell>
                    <TableCell>
                      {applicant.aiMatch !== null ? (
                        <div className="flex items-center gap-2 w-24">
                          <Progress value={applicant.aiMatch} className="h-2" />
                          <span className="text-sm font-medium">{applicant.aiMatch}%</span>
                        </div>
                      ) : (
                        <span className="text-muted-foreground">—</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="secondary"
                        className={statusStyles[applicant.status]}
                      >
                        {applicant.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem className="gap-2">
                            <Eye className="h-4 w-4" />
                            View Profile
                          </DropdownMenuItem>
                          <DropdownMenuItem className="gap-2">
                            <Brain className="h-4 w-4" />
                            AI Screening
                          </DropdownMenuItem>
                          <DropdownMenuItem className="gap-2 text-success">
                            <UserCheck className="h-4 w-4" />
                            Shortlist
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default Applicants;



