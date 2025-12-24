import { LineManagerLayout } from "@/components/layout/LineManagerLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { 
  Search, 
  User,
  Calendar,
  MoreVertical
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const teamMembers = [
  { 
    id: 1, 
    name: "Sarah Johnson", 
    role: "Senior Developer", 
    email: "sarah.johnson@company.com",
    status: "Active", 
    attendance: "Present",
    avatar: null
  },
  { 
    id: 2, 
    name: "Mike Chen", 
    role: "Frontend Developer", 
    email: "mike.chen@company.com",
    status: "On Leave", 
    attendance: "On Leave",
    avatar: null
  },
  { 
    id: 3, 
    name: "Emily Davis", 
    role: "UI/UX Designer", 
    email: "emily.davis@company.com",
    status: "Active", 
    attendance: "Present",
    avatar: null
  },
  { 
    id: 4, 
    name: "John Smith", 
    role: "Backend Developer", 
    email: "john.smith@company.com",
    status: "Active", 
    attendance: "Present",
    avatar: null
  },
  { 
    id: 5, 
    name: "David Brown", 
    role: "DevOps Engineer", 
    email: "david.brown@company.com",
    status: "Active", 
    attendance: "Late",
    avatar: null
  },
  { 
    id: 6, 
    name: "Lisa Wang", 
    role: "QA Engineer", 
    email: "lisa.wang@company.com",
    status: "Active", 
    attendance: "Present",
    avatar: null
  },
  { 
    id: 7, 
    name: "Tom Wilson", 
    role: "Junior Developer", 
    email: "tom.wilson@company.com",
    status: "Active", 
    attendance: "Present",
    avatar: null
  },
  { 
    id: 8, 
    name: "Anna Martinez", 
    role: "Product Manager", 
    email: "anna.martinez@company.com",
    status: "Active", 
    attendance: "Present",
    avatar: null
  },
];

const getStatusBadge = (status: string) => {
  switch (status) {
    case "Active":
      return <Badge className="bg-accent/10 text-accent border-accent/20 hover:bg-accent/20">Active</Badge>;
    case "On Leave":
      return <Badge className="bg-warning/10 text-warning border-warning/20 hover:bg-warning/20">On Leave</Badge>;
    default:
      return <Badge variant="secondary">{status}</Badge>;
  }
};

const getAttendanceBadge = (attendance: string) => {
  switch (attendance) {
    case "Present":
      return <Badge variant="outline" className="text-accent border-accent/30">Present</Badge>;
    case "Late":
      return <Badge variant="outline" className="text-warning border-warning/30">Late</Badge>;
    case "On Leave":
      return <Badge variant="outline" className="text-muted-foreground">On Leave</Badge>;
    default:
      return <Badge variant="outline">{attendance}</Badge>;
  }
};

export default function MyTeam() {
  return (
    <LineManagerLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold text-foreground">My Team</h1>
            <p className="text-muted-foreground mt-1">Manage your direct reports</p>
          </div>
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Search team members..." className="pl-10" />
          </div>
        </div>

        {/* Team Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <Card className="border-border">
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-foreground">{teamMembers.length}</p>
              <p className="text-sm text-muted-foreground">Total Members</p>
            </CardContent>
          </Card>
          <Card className="border-border">
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-accent">{teamMembers.filter(m => m.status === "Active").length}</p>
              <p className="text-sm text-muted-foreground">Active</p>
            </CardContent>
          </Card>
          <Card className="border-border">
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-warning">{teamMembers.filter(m => m.status === "On Leave").length}</p>
              <p className="text-sm text-muted-foreground">On Leave</p>
            </CardContent>
          </Card>
          <Card className="border-border">
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-foreground">{teamMembers.filter(m => m.attendance === "Late").length}</p>
              <p className="text-sm text-muted-foreground">Late Today</p>
            </CardContent>
          </Card>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {teamMembers.map((member) => (
            <Card key={member.id} className="border-border hover:shadow-md transition-shadow">
              <CardContent className="p-5">
                <div className="flex items-start justify-between mb-4">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={member.avatar || undefined} />
                    <AvatarFallback className="bg-primary/10 text-primary font-medium">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <User className="w-4 h-4 mr-2" />
                        View Profile
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Calendar className="w-4 h-4 mr-2" />
                        Attendance Summary
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                
                <div className="space-y-2">
                  <h3 className="font-semibold text-foreground">{member.name}</h3>
                  <p className="text-sm text-muted-foreground">{member.role}</p>
                  <p className="text-xs text-muted-foreground truncate">{member.email}</p>
                </div>

                <div className="flex items-center gap-2 mt-4">
                  {getStatusBadge(member.status)}
                  {getAttendanceBadge(member.attendance)}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </LineManagerLayout>
  );
}
