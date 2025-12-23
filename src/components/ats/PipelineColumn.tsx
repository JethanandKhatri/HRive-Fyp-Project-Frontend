import { cn } from "@/lib/utils";
import { CandidateCard, Candidate } from "./CandidateCard";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

interface PipelineColumnProps {
  title: string;
  candidates: Candidate[];
  color?: string;
  onCandidateClick?: (candidate: Candidate) => void;
  onDragStart?: (candidate: Candidate) => void;
  onDragEnd?: () => void;
  onDrop?: (candidate: Candidate) => void;
  isDragOver?: boolean;
}

const stageColors: Record<string, string> = {
  applied: "bg-muted-foreground",
  screening: "bg-info",
  shortlisted: "bg-primary",
  "interview-scheduled": "bg-warning",
  "interview-completed": "bg-accent",
  "offer-sent": "bg-success",
  "offer-accepted": "bg-success",
  hired: "bg-success",
  rejected: "bg-destructive",
};

export function PipelineColumn({
  title,
  candidates,
  color,
  onCandidateClick,
  onDragStart,
  onDragEnd,
  onDrop,
  isDragOver,
}: PipelineColumnProps) {
  const stageKey = title.toLowerCase().replace(/\s+/g, "-");
  const bgColor = color || stageColors[stageKey] || "bg-muted-foreground";

  return (
    <div
      className={cn(
        "flex flex-col w-64 md:w-72 min-w-[256px] md:min-w-72 bg-muted/30 rounded-lg transition-all shrink-0",
        isDragOver && "ring-2 ring-primary ring-offset-2"
      )}
      onDragOver={(e) => e.preventDefault()}
      onDrop={() => onDrop?.(candidates[0])}
    >
      <div className="p-3 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className={cn("w-2 h-2 rounded-full shrink-0", bgColor)} />
            <h3 className="font-semibold text-sm text-foreground truncate">{title}</h3>
          </div>
          <Badge variant="secondary" className="text-xs font-medium shrink-0">
            {candidates.length}
          </Badge>
        </div>
      </div>
      <ScrollArea className="flex-1 p-2">
        <div className="space-y-2">
          {candidates.map((candidate) => (
            <div
              key={candidate.id}
              draggable
              onDragStart={() => onDragStart?.(candidate)}
              onDragEnd={onDragEnd}
            >
              <CandidateCard
                candidate={candidate}
                onViewProfile={() => onCandidateClick?.(candidate)}
              />
            </div>
          ))}
          {candidates.length === 0 && (
            <div className="py-8 text-center text-sm text-muted-foreground">
              No candidates
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
