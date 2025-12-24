import { useNavigate } from "react-router-dom";
import { HRiveLogo } from "@/components/HRiveLogo";
import { Card, CardContent } from "@/components/ui/card";
import { UserCog, Users, Shield, ArrowRight } from "lucide-react";

const roles = [
  {
    id: "recruiter",
    title: "Recruiter",
    description: "Manage job postings, screen candidates, and coordinate interviews",
    icon: Users,
    color: "bg-primary/10 text-primary",
  },
  {
    id: "hiring-manager",
    title: "Hiring Manager",
    description: "Review candidates, conduct interviews, and make hiring decisions",
    icon: UserCog,
    color: "bg-accent/10 text-accent",
  },
  {
    id: "admin",
    title: "Admin",
    description: "Full system access with user management and configuration rights",
    icon: Shield,
    color: "bg-warning/10 text-warning",
  },
];

export default function SelectRole() {
  const navigate = useNavigate();

  const handleRoleSelect = (roleId) => {
    // Store selected role and navigate to dashboard
    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-8">
      <div className="w-full max-w-xl space-y-8 animate-fade-in">
        <div className="flex justify-center">
          <HRiveLogo size="md" />
        </div>

        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold tracking-tight">Select your role</h2>
          <p className="text-muted-foreground">
            Choose how you'll be using HRive today
          </p>
        </div>

        <div className="space-y-4">
          {roles.map((role, index) => (
            <Card
              key={role.id}
              className="cursor-pointer border-2 border-transparent hover:border-primary/50 transition-all duration-200 hover:shadow-lg animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
              onClick={() => handleRoleSelect(role.id)}
            >
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className={`h-12 w-12 rounded-lg ${role.color} flex items-center justify-center`}>
                    <role.icon className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">{role.title}</h3>
                    <p className="text-sm text-muted-foreground">{role.description}</p>
                  </div>
                  <ArrowRight className="h-5 w-5 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <p className="text-center text-sm text-muted-foreground">
          You can switch roles anytime from settings
        </p>
      </div>
    </div>
  );
}


