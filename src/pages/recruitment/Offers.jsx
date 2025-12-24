import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  FileText,
  Plus,
  DollarSign,
  Calendar,
  CheckCircle,
  XCircle,
  Clock,
  Send,
  Eye,
  Download,
} from "lucide-react";

const offers = [
  {
    id: 1,
    candidate: "Zara Khan",
    role: "Senior Software Engineer",
    department: "Engineering",
    salary: "PKR 550,000",
    joiningDate: "Jan 15, 2025",
    status: "accepted",
    sentDate: "Dec 18, 2024",
    respondedDate: "Dec 20, 2024",
  },
  {
    id: 2,
    candidate: "Bilal Ahmed",
    role: "Senior Software Engineer",
    department: "Engineering",
    salary: "PKR 480,000",
    joiningDate: "Jan 10, 2025",
    status: "pending",
    sentDate: "Dec 21, 2024",
    respondedDate: null,
  },
  {
    id: 3,
    candidate: "Ayesha Baig",
    role: "UI/UX Designer",
    department: "Design",
    salary: "PKR 350,000",
    joiningDate: "Jan 20, 2025",
    status: "pending",
    sentDate: "Dec 22, 2024",
    respondedDate: null,
  },
  {
    id: 4,
    candidate: "Usman Tariq",
    role: "Product Manager",
    department: "Product",
    salary: "PKR 600,000",
    joiningDate: "Jan 5, 2025",
    status: "declined",
    sentDate: "Dec 15, 2024",
    respondedDate: "Dec 19, 2024",
  },
];

const statusStyles = {
  pending: { bg: "bg-warning/10", text: "text-warning", border: "border-warning/20", label: "Pending" },
  accepted: { bg: "bg-success/10", text: "text-success", border: "border-success/20", label: "Accepted" },
  declined: { bg: "bg-destructive/10", text: "text-destructive", border: "border-destructive/20", label: "Declined" },
};

export default function Offers() {
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const pendingOffers = offers.filter((o) => o.status === "pending");
  const acceptedOffers = offers.filter((o) => o.status === "accepted");
  const declinedOffers = offers.filter((o) => o.status === "declined");

  return (
    <MainLayout>
      <div className="space-y-4 md:space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 animate-fade-in">
          <div>
            <h1 className="text-xl md:text-2xl font-bold tracking-tight text-foreground">Offer Management</h1>
            <p className="text-sm text-muted-foreground">Create and track job offers</p>
          </div>
          <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2 gradient-primary border-0 w-full sm:w-auto">
                <Plus className="h-4 w-4" />
                Create Offer
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Create Job Offer</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 pt-4">
                <div className="space-y-2">
                  <Label>Candidate</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select candidate" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">Omar Sheikh - Senior Software Engineer</SelectItem>
                      <SelectItem value="2">Sana Malik - UI/UX Designer</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Position</Label>
                    <Input placeholder="Job title" />
                  </div>
                  <div className="space-y-2">
                    <Label>Department</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="engineering">Engineering</SelectItem>
                        <SelectItem value="design">Design</SelectItem>
                        <SelectItem value="product">Product</SelectItem>
                        <SelectItem value="hr">HR</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Salary (PKR)</Label>
                    <Input type="number" placeholder="Monthly salary" />
                  </div>
                  <div className="space-y-2">
                    <Label>Joining Date</Label>
                    <Input type="date" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Additional Benefits</Label>
                  <Textarea placeholder="Health insurance, bonuses, etc." />
                </div>
                <div className="space-y-2">
                  <Label>Offer Validity (Days)</Label>
                  <Select defaultValue="7">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="3">3 days</SelectItem>
                      <SelectItem value="5">5 days</SelectItem>
                      <SelectItem value="7">7 days</SelectItem>
                      <SelectItem value="14">14 days</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex flex-col-reverse sm:flex-row justify-end gap-2 pt-4">
                  <Button variant="outline" onClick={() => setIsCreateOpen(false)}>
                    Cancel
                  </Button>
                  <Button className="gap-2 gradient-primary border-0" onClick={() => setIsCreateOpen(false)}>
                    <Send className="h-4 w-4" />
                    Send Offer
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats */}
        <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3 md:gap-4">
                <div className="h-10 w-10 md:h-12 md:w-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <FileText className="h-5 w-5 md:h-6 md:w-6 text-primary" />
                </div>
                <div>
                  <p className="text-xl md:text-2xl font-bold text-foreground">{offers.length}</p>
                  <p className="text-xs md:text-sm text-muted-foreground">Total Offers</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3 md:gap-4">
                <div className="h-10 w-10 md:h-12 md:w-12 rounded-full bg-warning/10 flex items-center justify-center shrink-0">
                  <Clock className="h-5 w-5 md:h-6 md:w-6 text-warning" />
                </div>
                <div>
                  <p className="text-xl md:text-2xl font-bold text-foreground">{pendingOffers.length}</p>
                  <p className="text-xs md:text-sm text-muted-foreground">Pending</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3 md:gap-4">
                <div className="h-10 w-10 md:h-12 md:w-12 rounded-full bg-success/10 flex items-center justify-center shrink-0">
                  <CheckCircle className="h-5 w-5 md:h-6 md:w-6 text-success" />
                </div>
                <div>
                  <p className="text-xl md:text-2xl font-bold text-foreground">{acceptedOffers.length}</p>
                  <p className="text-xs md:text-sm text-muted-foreground">Accepted</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3 md:gap-4">
                <div className="h-10 w-10 md:h-12 md:w-12 rounded-full bg-destructive/10 flex items-center justify-center shrink-0">
                  <XCircle className="h-5 w-5 md:h-6 md:w-6 text-destructive" />
                </div>
                <div>
                  <p className="text-xl md:text-2xl font-bold text-foreground">{declinedOffers.length}</p>
                  <p className="text-xs md:text-sm text-muted-foreground">Declined</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Offers Tabs */}
        <Tabs defaultValue="all">
          <div className="overflow-x-auto -mx-4 px-4 md:mx-0 md:px-0">
            <TabsList className="w-max">
              <TabsTrigger value="all">All ({offers.length})</TabsTrigger>
              <TabsTrigger value="pending">Pending ({pendingOffers.length})</TabsTrigger>
              <TabsTrigger value="accepted">Accepted ({acceptedOffers.length})</TabsTrigger>
              <TabsTrigger value="declined">Declined ({declinedOffers.length})</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="all" className="mt-4">
            <div className="space-y-4">
              {offers.map((offer) => (
                <OfferCard key={offer.id} offer={offer} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="pending" className="mt-4">
            <div className="space-y-4">
              {pendingOffers.map((offer) => (
                <OfferCard key={offer.id} offer={offer} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="accepted" className="mt-4">
            <div className="space-y-4">
              {acceptedOffers.map((offer) => (
                <OfferCard key={offer.id} offer={offer} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="declined" className="mt-4">
            <div className="space-y-4">
              {declinedOffers.map((offer) => (
                <OfferCard key={offer.id} offer={offer} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
}

function OfferCard({ offer }) {
  const status = statusStyles[offer.status];

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardContent className="pt-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          {/* Candidate Info */}
          <div className="flex items-center gap-4">
            <Avatar className="h-12 w-12 shrink-0">
              <AvatarFallback className="bg-primary/10 text-primary">
                {offer.candidate.split(" ").map(n => n[0]).join("")}
              </AvatarFallback>
            </Avatar>
            <div className="min-w-0">
              <h3 className="font-semibold text-foreground truncate">{offer.candidate}</h3>
              <p className="text-sm text-muted-foreground truncate">{offer.role} • {offer.department}</p>
            </div>
          </div>
          
          {/* Offer Details */}
          <div className="flex flex-wrap items-center gap-3 lg:gap-6">
            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4">
              <div className="flex items-center gap-2 text-foreground font-semibold">
                <DollarSign className="h-4 w-4 text-muted-foreground shrink-0" />
                {offer.salary}
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4 shrink-0" />
                Join: {offer.joiningDate}
              </div>
            </div>
            <Badge variant="outline" className={`${status.bg} ${status.text} ${status.border}`}>
              {status.label}
            </Badge>
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <Button variant="outline" size="sm" className="gap-1 flex-1 sm:flex-none">
                <Eye className="h-4 w-4" />
                <span className="hidden sm:inline">View</span>
              </Button>
              <Button variant="outline" size="sm" className="gap-1 flex-1 sm:flex-none">
                <Download className="h-4 w-4" />
                <span className="hidden sm:inline">PDF</span>
              </Button>
            </div>
          </div>
        </div>
        <div className="mt-4 pt-4 border-t flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-sm text-muted-foreground">
          <span>Sent: {offer.sentDate}</span>
          {offer.respondedDate && <span>Responded: {offer.respondedDate}</span>}
        </div>
      </CardContent>
    </Card>
  );
}



