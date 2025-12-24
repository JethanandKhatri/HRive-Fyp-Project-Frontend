import { MainLayout } from "@/components/layout/MainLayout";
import { StatCard } from "@/components/ui/stat-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Briefcase,
  Users,
  Calendar,
  Timer,
  Plus,
  Search,
  MoreVertical,
  MapPin,
  Building,
  Eye,
  Brain,
  XCircle,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link } from "react-router-dom";

const jobs = [
  {
    id: 1,
    title: "Senior Software Engineer",
    department: "Engineering",
    location: "Karachi",
    type: "Full-time",
    applicants: 24,
    status: "active",
    postedDate: "Dec 10, 2024",
  },
  {
    id: 2,
    title: "UI/UX Designer",
    department: "Design",
    location: "Lahore",
    type: "Full-time",
    applicants: 18,
    status: "urgent",
    postedDate: "Dec 15, 2024",
  },
  {
    id: 3,
    title: "Product Manager",
    department: "Product",
    location: "Islamabad",
    type: "Full-time",
    applicants: 12,
    status: "active",
    postedDate: "Dec 12, 2024",
  },
  {
    id: 4,
    title: "DevOps Engineer",
    department: "Engineering",
    location: "Remote",
    type: "Contract",
    applicants: 8,
    status: "active",
    postedDate: "Dec 18, 2024",
  },
  {
    id: 5,
    title: "HR Coordinator",
    department: "Human Resources",
    location: "Karachi",
    type: "Full-time",
    applicants: 31,
    status: "draft",
    postedDate: "Dec 20, 2024",
  },
];

const statusStyles = {
  active: "bg-success/10 text-success border-success/20",
  urgent: "bg-destructive/10 text-destructive border-destructive/20",
  draft: "bg-muted text-muted-foreground border-border",
};

const Recruitment = () => {
  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between animate-fade-in">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Recruitment</h1>
            <p className="text-muted-foreground">Manage your hiring pipeline and applicants</p>
          </div>
          <Link to="/recruitment/new-job">
            <Button className="gap-2 gradient-primary border-0">
              <Plus className="h-4 w-4" />
              Post New Job
            </Button>
          </Link>
        </div>

        {/* KPI Cards */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard title="Active Jobs" value="8" icon={Briefcase} variant="primary" />
          <StatCard title="Total Applicants" value="93" change="+12 this week" changeType="positive" icon={Users} />
          <StatCard title="Interviews Scheduled" value="6" icon={Calendar} variant="success" />
          <StatCard title="Avg. Time to Hire" value="18 days" change="-3 days vs avg" changeType="positive" icon={Timer} />
        </div>

        {/* Search & Filters */}
        <div className="flex gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search jobs..." className="pl-10" />
          </div>
        </div>

        {/* Jobs Grid */}
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {jobs.map((job, index) => (
            <Card
              key={job.id}
              className="shadow-md transition-all hover:shadow-lg animate-slide-up"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <CardTitle className="text-lg">{job.title}</CardTitle>
                    <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Building className="h-3.5 w-3.5" />
                        {job.department}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3.5 w-3.5" />
                        {job.location}
                      </span>
                    </div>
                  </div>
                  <Badge
                    variant="outline"
                    className={statusStyles[job.status]}
                  >
                    {job.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">{job.type}</p>
                    <p className="text-sm">
                      <span className="font-semibold text-primary">{job.applicants}</span> applicants
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Link to={`/recruitment/job/${job.id}/applicants`}>
                      <Button size="sm" variant="secondary" className="gap-1.5">
                        <Eye className="h-3.5 w-3.5" />
                        View
                      </Button>
                    </Link>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem className="gap-2">
                          <Brain className="h-4 w-4" />
                          AI Screen
                        </DropdownMenuItem>
                        <DropdownMenuItem className="gap-2 text-destructive">
                          <XCircle className="h-4 w-4" />
                          Close Job
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default Recruitment;



