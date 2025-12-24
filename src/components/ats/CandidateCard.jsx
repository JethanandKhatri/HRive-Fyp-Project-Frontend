import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MoreHorizontal, Mail, Calendar, Star, FileText } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

export function CandidateCard({ candidate, onViewProfile, onMoveStage, isDragging }) {
  const getMatchColor = (score) => {
    if (score >= 80) return "text-success bg-success/10 border-success/20";
    if (score >= 60) return "text-warning bg-warning/10 border-warning/20";
    return "text-destructive bg-destructive/10 border-destructive/20";
  };

  return (
    <Card
      className={cn(
        "p-3 cursor-pointer transition-all hover:shadow-lg group",
        isDragging && "shadow-xl rotate-2 scale-105"
      )}
      onClick={onViewProfile}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-start gap-3 min-w-0">
          <Avatar className="h-10 w-10 shrink-0">
            <AvatarFallback className="bg-primary/10 text-primary font-medium text-sm">
              {candidate.name.split(" ").map(n => n[0]).join("")}
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0">
            <h4 className="font-medium text-sm text-foreground truncate">{candidate.name}</h4>
            <p className="text-xs text-muted-foreground truncate">{candidate.role}</p>
          </div>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={(e) => { e.stopPropagation(); onViewProfile?.(); }}>
              <FileText className="h-4 w-4 mr-2" />
              View Profile
            </DropdownMenuItem>
            <DropdownMenuItem onClick={(e) => { e.stopPropagation(); }}>
              <Calendar className="h-4 w-4 mr-2" />
              Schedule Interview
            </DropdownMenuItem>
            <DropdownMenuItem onClick={(e) => { e.stopPropagation(); }}>
              <Mail className="h-4 w-4 mr-2" />
              Send Email
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="mt-3 flex items-center gap-2 flex-wrap">
        <Badge variant="outline" className={cn("text-xs", getMatchColor(candidate.matchScore))}>
          <Star className="h-3 w-3 mr-1" />
          {candidate.matchScore}% Match
        </Badge>
        <Badge variant="secondary" className="text-xs">
          {candidate.experience}
        </Badge>
      </div>

      <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
        <span>{candidate.source}</span>
        <span>{candidate.appliedDate}</span>
      </div>
    </Card>
  );
}



