import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { PipelineColumn } from "@/components/ats/PipelineColumn";
import { CandidateProfile } from "@/components/ats/CandidateProfile";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Search, Filter, RefreshCw, Users } from "lucide-react";
import { Candidate } from "@/components/ats/CandidateCard";

const mockCandidates: Candidate[] = [
  { id: "1", name: "Ahmed Khan", email: "ahmed@email.com", role: "Senior Software Engineer", experience: "5 years", matchScore: 92, appliedDate: "Dec 18", source: "LinkedIn", stage: "applied" },
  { id: "2", name: "Fatima Ali", email: "fatima@email.com", role: "Senior Software Engineer", experience: "7 years", matchScore: 88, appliedDate: "Dec 17", source: "Indeed", stage: "applied" },
  { id: "3", name: "Hassan Raza", email: "hassan@email.com", role: "Senior Software Engineer", experience: "4 years", matchScore: 75, appliedDate: "Dec 19", source: "Referral", stage: "screening" },
  { id: "4", name: "Sana Malik", email: "sana@email.com", role: "Senior Software Engineer", experience: "6 years", matchScore: 85, appliedDate: "Dec 15", source: "LinkedIn", stage: "shortlisted" },
  { id: "5", name: "Omar Sheikh", email: "omar@email.com", role: "Senior Software Engineer", experience: "8 years", matchScore: 90, appliedDate: "Dec 12", source: "Company Website", stage: "interview-scheduled" },
  { id: "6", name: "Ayesha Baig", email: "ayesha@email.com", role: "Senior Software Engineer", experience: "5 years", matchScore: 82, appliedDate: "Dec 10", source: "Indeed", stage: "interview-completed" },
  { id: "7", name: "Bilal Ahmed", email: "bilal@email.com", role: "Senior Software Engineer", experience: "6 years", matchScore: 78, appliedDate: "Dec 8", source: "LinkedIn", stage: "offer-sent" },
  { id: "8", name: "Zara Khan", email: "zara@email.com", role: "Senior Software Engineer", experience: "9 years", matchScore: 95, appliedDate: "Dec 5", source: "Referral", stage: "offer-accepted" },
  { id: "9", name: "Usman Tariq", email: "usman@email.com", role: "Senior Software Engineer", experience: "3 years", matchScore: 65, appliedDate: "Dec 16", source: "Indeed", stage: "rejected" },
];

const stages = [
  { key: "applied", title: "Applied" },
  { key: "screening", title: "Screening" },
  { key: "shortlisted", title: "Shortlisted" },
  { key: "interview-scheduled", title: "Interview Scheduled" },
  { key: "interview-completed", title: "Interview Completed" },
  { key: "offer-sent", title: "Offer Sent" },
  { key: "offer-accepted", title: "Offer Accepted" },
  { key: "hired", title: "Hired" },
  { key: "rejected", title: "Rejected" },
];

export default function Pipeline() {
  const [candidates, setCandidates] = useState(mockCandidates);
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedJob, setSelectedJob] = useState("all");

  const filteredCandidates = candidates.filter(
    (c) => c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
           c.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getCandidatesByStage = (stage: string) =>
    filteredCandidates.filter((c) => c.stage === stage);

  const handleMoveStage = (candidateId: string, newStage: string) => {
    setCandidates((prev) =>
      prev.map((c) => (c.id === candidateId ? { ...c, stage: newStage.toLowerCase().replace(/\s+/g, "-") } : c))
    );
  };

  return (
    <MainLayout>
      <div className="flex flex-col h-[calc(100vh-4rem)]">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-6 animate-fade-in">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground">Candidate Pipeline</h1>
            <p className="text-muted-foreground">Drag and drop candidates between stages</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search candidates..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-64"
              />
            </div>
            <Select value={selectedJob} onValueChange={setSelectedJob}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by job" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Jobs</SelectItem>
                <SelectItem value="1">Senior Software Engineer</SelectItem>
                <SelectItem value="2">UI/UX Designer</SelectItem>
                <SelectItem value="3">Product Manager</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="icon">
              <RefreshCw className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="flex items-center gap-6 mb-4 p-3 bg-muted/50 rounded-lg">
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-foreground">Total: {candidates.length}</span>
          </div>
          {stages.slice(0, 5).map((stage) => (
            <div key={stage.key} className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">{stage.title}:</span>
              <span className="text-sm font-medium text-foreground">{getCandidatesByStage(stage.key).length}</span>
            </div>
          ))}
        </div>

        {/* Pipeline Board */}
        <div className="flex-1 overflow-x-auto pb-4">
          <div className="flex gap-4 h-full min-w-max">
            {stages.map((stage) => (
              <PipelineColumn
                key={stage.key}
                title={stage.title}
                candidates={getCandidatesByStage(stage.key)}
                onCandidateClick={(candidate) => setSelectedCandidate(candidate)}
                onDrop={(candidate) => handleMoveStage(candidate.id, stage.key)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Candidate Profile Drawer */}
      <Sheet open={!!selectedCandidate} onOpenChange={() => setSelectedCandidate(null)}>
        <SheetContent className="w-full sm:max-w-2xl p-0 overflow-hidden">
          {selectedCandidate && (
            <CandidateProfile
              candidate={{
                ...selectedCandidate,
                phone: "+92 300 1234567",
                location: "Karachi, Pakistan",
                skills: ["React", "TypeScript", "Node.js", "PostgreSQL", "AWS"],
              }}
              onClose={() => setSelectedCandidate(null)}
              onMoveStage={(newStage) => {
                handleMoveStage(selectedCandidate.id, newStage);
                setSelectedCandidate(null);
              }}
            />
          )}
        </SheetContent>
      </Sheet>
    </MainLayout>
  );
}
