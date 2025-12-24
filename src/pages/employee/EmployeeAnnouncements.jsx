import { EmployeeLayout } from "@/components/layout/EmployeeLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bell, Calendar, Megaphone, PartyPopper, AlertTriangle } from "lucide-react";

const announcements = [
  {
    id: 1,
    title: "Holiday Schedule for 2025",
    description:
      "The official holiday schedule for 2025 has been published. Please review the calendar for planned company holidays and ensure your leave requests are submitted accordingly.",
    date: "Dec 18, 2024",
    category: "General",
    isNew: true,
    icon: Calendar,
  },
  {
    id: 2,
    title: "End of Year Celebration",
    description:
      "Join us for our annual end-of-year celebration on December 22nd at 5 PM in the main conference room. Food, drinks, and entertainment will be provided.",
    date: "Dec 15, 2024",
    category: "Event",
    isNew: true,
    icon: PartyPopper,
  },
  {
    id: 3,
    title: "New Health Insurance Provider",
    description:
      "Starting January 1st, 2025, we will be transitioning to a new health insurance provider. Please complete your enrollment by December 31st.",
    date: "Dec 10, 2024",
    category: "Important",
    isNew: false,
    icon: AlertTriangle,
  },
  {
    id: 4,
    title: "Office Renovation Notice",
    description:
      "The 3rd floor will undergo renovation starting January 15th. Affected employees will be temporarily relocated to the 4th floor.",
    date: "Dec 5, 2024",
    category: "General",
    isNew: false,
    icon: Megaphone,
  },
  {
    id: 5,
    title: "Q4 Performance Reviews",
    description:
      "Performance reviews for Q4 will begin on January 8th. Please ensure your self-assessments are completed by January 5th.",
    date: "Dec 1, 2024",
    category: "HR",
    isNew: false,
    icon: Bell,
  },
];

export default function EmployeeAnnouncements() {
  const getCategoryBadge = (category) => {
    switch (category) {
      case "Important":
        return (
          <Badge className="bg-destructive/10 text-destructive border-destructive/20">
            Important
          </Badge>
        );
      case "Event":
        return (
          <Badge className="bg-success/10 text-success border-success/20">
            Event
          </Badge>
        );
      case "HR":
        return (
          <Badge className="bg-info/10 text-info border-info/20">
            HR
          </Badge>
        );
      default:
        return (
          <Badge className="bg-muted text-muted-foreground">
            General
          </Badge>
        );
    }
  };

  return (
    <EmployeeLayout>
      <div className="space-y-6 animate-fade-in">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-foreground">Announcements</h1>
          <p className="text-muted-foreground">Stay updated with company news</p>
        </div>

        {/* Announcements List */}
        <div className="space-y-4">
          {announcements.map((announcement) => (
            <Card
              key={announcement.id}
              className={`shadow-card hover:shadow-card-hover transition-shadow ${
                announcement.isNew ? "border-primary/30 bg-primary/5" : ""
              }`}
            >
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div
                    className={`p-3 rounded-xl shrink-0 ${
                      announcement.category === "Important"
                        ? "bg-destructive/10 text-destructive"
                        : announcement.category === "Event"
                        ? "bg-success/10 text-success"
                        : announcement.category === "HR"
                        ? "bg-info/10 text-info"
                        : "bg-primary/10 text-primary"
                    }`}
                  >
                    <announcement.icon className="h-5 w-5" />
                  </div>

                  <div className="flex-1 min-w-0 space-y-2">
                    <div className="flex items-start justify-between gap-4 flex-wrap">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-foreground">
                          {announcement.title}
                        </h3>
                        {announcement.isNew && (
                          <Badge className="bg-primary text-primary-foreground text-xs">
                            New
                          </Badge>
                        )}
                      </div>
                      {getCategoryBadge(announcement.category)}
                    </div>

                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {announcement.description}
                    </p>

                    <p className="text-xs text-muted-foreground">
                      Posted on {announcement.date}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </EmployeeLayout>
  );
}



