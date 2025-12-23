import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Building,
  Bell,
  Shield,
  Palette,
  Save,
  Key,
  Clock,
  GitBranch,
  Mail,
  Plug,
  GripVertical,
  Plus,
  Trash2,
  Eye,
  Calendar,
  MessageSquare,
  Zap,
} from "lucide-react";

// Pipeline stages data
const defaultStages = [
  { id: "1", name: "Applied", enabled: true, color: "bg-blue-500" },
  { id: "2", name: "Screening", enabled: true, color: "bg-purple-500" },
  { id: "3", name: "Shortlisted", enabled: true, color: "bg-cyan-500" },
  { id: "4", name: "Interview Scheduled", enabled: true, color: "bg-amber-500" },
  { id: "5", name: "Interview Completed", enabled: true, color: "bg-orange-500" },
  { id: "6", name: "Offer Sent", enabled: true, color: "bg-indigo-500" },
  { id: "7", name: "Offer Accepted", enabled: true, color: "bg-emerald-500" },
  { id: "8", name: "Hired", enabled: true, color: "bg-green-600" },
  { id: "9", name: "Rejected", enabled: false, color: "bg-red-500" },
];

// Email templates data
const emailTemplates = [
  {
    id: "application-received",
    name: "Application Received",
    subject: "Thank you for applying to {{job_title}} at {{company_name}}",
    body: "Dear {{candidate_name}},\n\nThank you for applying for the {{job_title}} position at {{company_name}}. We have received your application and will review it shortly.\n\nBest regards,\n{{company_name}} HR Team",
  },
  {
    id: "interview-scheduled",
    name: "Interview Scheduled",
    subject: "Interview Scheduled - {{job_title}} at {{company_name}}",
    body: "Dear {{candidate_name}},\n\nWe are pleased to inform you that your interview for {{job_title}} has been scheduled.\n\nDate: {{interview_date}}\nTime: {{interview_time}}\nLocation: {{interview_location}}\n\nPlease confirm your attendance by replying to this email.\n\nBest regards,\n{{company_name}} HR Team",
  },
  {
    id: "offer-sent",
    name: "Offer Letter",
    subject: "Job Offer - {{job_title}} at {{company_name}}",
    body: "Dear {{candidate_name}},\n\nWe are delighted to extend an offer for the position of {{job_title}} at {{company_name}}.\n\nPlease find the attached offer letter with complete details about compensation and benefits.\n\nBest regards,\n{{company_name}} HR Team",
  },
  {
    id: "rejection",
    name: "Application Rejected",
    subject: "Update on your application - {{company_name}}",
    body: "Dear {{candidate_name}},\n\nThank you for your interest in the {{job_title}} position at {{company_name}}.\n\nAfter careful consideration, we have decided to move forward with other candidates whose qualifications more closely match our current needs.\n\nWe appreciate your time and wish you success in your job search.\n\nBest regards,\n{{company_name}} HR Team",
  },
];

// Integrations data
const integrations = [
  {
    id: "google-calendar",
    name: "Google Calendar",
    description: "Sync interview schedules with Google Calendar",
    icon: Calendar,
    connected: false,
    category: "calendar",
  },
  {
    id: "outlook-calendar",
    name: "Outlook Calendar",
    description: "Sync interview schedules with Microsoft Outlook",
    icon: Calendar,
    connected: true,
    category: "calendar",
  },
  {
    id: "gmail",
    name: "Gmail",
    description: "Send emails directly from HRive using Gmail",
    icon: Mail,
    connected: true,
    category: "email",
  },
  {
    id: "slack",
    name: "Slack",
    description: "Get notifications and updates in Slack channels",
    icon: MessageSquare,
    connected: false,
    category: "communication",
  },
  {
    id: "zapier",
    name: "Zapier",
    description: "Connect HRive with 5000+ apps via Zapier",
    icon: Zap,
    connected: false,
    category: "automation",
  },
];

const Settings = () => {
  const [stages, setStages] = useState(defaultStages);
  const [selectedTemplate, setSelectedTemplate] = useState(emailTemplates[0]);
  const [templateSubject, setTemplateSubject] = useState(emailTemplates[0].subject);
  const [templateBody, setTemplateBody] = useState(emailTemplates[0].body);
  const [newStageName, setNewStageName] = useState("");

  const handleStageToggle = (stageId: string) => {
    setStages(stages.map(s => 
      s.id === stageId ? { ...s, enabled: !s.enabled } : s
    ));
  };

  const handleDeleteStage = (stageId: string) => {
    setStages(stages.filter(s => s.id !== stageId));
  };

  const handleAddStage = () => {
    if (newStageName.trim()) {
      setStages([...stages, {
        id: Date.now().toString(),
        name: newStageName.trim(),
        enabled: true,
        color: "bg-slate-500",
      }]);
      setNewStageName("");
    }
  };

  const handleTemplateChange = (templateId: string) => {
    const template = emailTemplates.find(t => t.id === templateId);
    if (template) {
      setSelectedTemplate(template);
      setTemplateSubject(template.subject);
      setTemplateBody(template.body);
    }
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="animate-fade-in">
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Settings</h1>
          <p className="text-muted-foreground">Manage your HRive system preferences</p>
        </div>

        <Tabs defaultValue="company" className="animate-slide-up">
          <TabsList className="grid w-full max-w-2xl grid-cols-6">
            <TabsTrigger value="company">Company</TabsTrigger>
            <TabsTrigger value="pipeline">Pipeline</TabsTrigger>
            <TabsTrigger value="emails">Emails</TabsTrigger>
            <TabsTrigger value="integrations">Integrations</TabsTrigger>
            <TabsTrigger value="notifications">Alerts</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
          </TabsList>

          {/* Company Settings */}
          <TabsContent value="company" className="mt-6 space-y-6">
            <Card className="shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-foreground">
                  <Building className="h-5 w-5 text-primary" />
                  Company Information
                </CardTitle>
                <CardDescription>
                  Basic information about your organization
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="company-name" className="text-foreground">Company Name</Label>
                    <Input id="company-name" defaultValue="TechCorp Pakistan" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="industry" className="text-foreground">Industry</Label>
                    <Select defaultValue="technology">
                      <SelectTrigger id="industry">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="technology">Technology</SelectItem>
                        <SelectItem value="finance">Finance</SelectItem>
                        <SelectItem value="healthcare">Healthcare</SelectItem>
                        <SelectItem value="manufacturing">Manufacturing</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-foreground">Company Email</Label>
                    <Input id="email" type="email" defaultValue="hr@techcorp.pk" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-foreground">Phone Number</Label>
                    <Input id="phone" defaultValue="+92 21 1234567" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address" className="text-foreground">Address</Label>
                  <Input id="address" defaultValue="Clifton, Karachi, Pakistan" />
                </div>
                <Button className="gap-2 gradient-primary border-0 text-white">
                  <Save className="h-4 w-4" />
                  Save Changes
                </Button>
              </CardContent>
            </Card>

            <Card className="shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-foreground">
                  <Clock className="h-5 w-5 text-primary" />
                  Working Hours
                </CardTitle>
                <CardDescription>
                  Configure default working hours and overtime settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-3">
                  <div className="space-y-2">
                    <Label className="text-foreground">Work Start Time</Label>
                    <Select defaultValue="09:00">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="08:00">08:00 AM</SelectItem>
                        <SelectItem value="09:00">09:00 AM</SelectItem>
                        <SelectItem value="10:00">10:00 AM</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-foreground">Work End Time</Label>
                    <Select defaultValue="18:00">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="17:00">05:00 PM</SelectItem>
                        <SelectItem value="18:00">06:00 PM</SelectItem>
                        <SelectItem value="19:00">07:00 PM</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-foreground">Grace Period (mins)</Label>
                    <Input type="number" defaultValue="15" />
                  </div>
                </div>
                <Button className="gap-2 gradient-primary border-0 text-white">
                  <Save className="h-4 w-4" />
                  Save Changes
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Pipeline Customization */}
          <TabsContent value="pipeline" className="mt-6">
            <Card className="shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-foreground">
                  <GitBranch className="h-5 w-5 text-primary" />
                  Pipeline Stages
                </CardTitle>
                <CardDescription>
                  Customize your hiring pipeline stages. Drag to reorder, toggle to enable/disable.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Add New Stage */}
                <div className="flex gap-3">
                  <Input
                    placeholder="Enter new stage name..."
                    value={newStageName}
                    onChange={(e) => setNewStageName(e.target.value)}
                    className="max-w-xs"
                  />
                  <Button onClick={handleAddStage} className="gap-2 gradient-primary border-0 text-white">
                    <Plus className="h-4 w-4" />
                    Add Stage
                  </Button>
                </div>

                {/* Stages List */}
                <div className="space-y-2">
                  {stages.map((stage, index) => (
                    <div
                      key={stage.id}
                      className={`flex items-center gap-4 p-4 rounded-lg border ${
                        stage.enabled ? 'bg-card' : 'bg-muted/50 opacity-60'
                      }`}
                    >
                      <GripVertical className="h-5 w-5 text-muted-foreground cursor-grab" />
                      <div className={`h-3 w-3 rounded-full ${stage.color}`} />
                      <span className="font-medium flex-1 text-foreground">{stage.name}</span>
                      <Badge variant="outline" className="text-xs">
                        Stage {index + 1}
                      </Badge>
                      <Switch
                        checked={stage.enabled}
                        onCheckedChange={() => handleStageToggle(stage.id)}
                      />
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-muted-foreground hover:text-destructive"
                        onClick={() => handleDeleteStage(stage.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>

                {/* Pipeline Preview */}
                <div className="pt-4 border-t">
                  <Label className="text-sm font-medium text-foreground mb-3 block">Pipeline Preview</Label>
                  <div className="flex gap-2 flex-wrap">
                    {stages.filter(s => s.enabled).map((stage, index) => (
                      <div key={stage.id} className="flex items-center gap-2">
                        <Badge className={`${stage.color} text-white`}>
                          {stage.name}
                        </Badge>
                        {index < stages.filter(s => s.enabled).length - 1 && (
                          <span className="text-muted-foreground">→</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <Button className="gap-2 gradient-primary border-0 text-white">
                  <Save className="h-4 w-4" />
                  Save Pipeline
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Email Templates */}
          <TabsContent value="emails" className="mt-6">
            <Card className="shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-foreground">
                  <Mail className="h-5 w-5 text-primary" />
                  Email Templates
                </CardTitle>
                <CardDescription>
                  Customize email templates for candidate communications
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Template List */}
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-foreground">Select Template</Label>
                    <div className="space-y-2">
                      {emailTemplates.map((template) => (
                        <div
                          key={template.id}
                          onClick={() => handleTemplateChange(template.id)}
                          className={`p-3 rounded-lg border cursor-pointer transition-all ${
                            selectedTemplate.id === template.id
                              ? 'border-primary bg-primary/5'
                              : 'hover:border-primary/50 hover:bg-muted/50'
                          }`}
                        >
                          <span className="font-medium text-foreground">{template.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Template Editor */}
                  <div className="lg:col-span-2 space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email-subject" className="text-foreground">Subject Line</Label>
                      <Input
                        id="email-subject"
                        value={templateSubject}
                        onChange={(e) => setTemplateSubject(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email-body" className="text-foreground">Email Body</Label>
                      <Textarea
                        id="email-body"
                        value={templateBody}
                        onChange={(e) => setTemplateBody(e.target.value)}
                        rows={12}
                        className="font-mono text-sm"
                      />
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span>Available variables:</span>
                      <Badge variant="outline">{"{{candidate_name}}"}</Badge>
                      <Badge variant="outline">{"{{job_title}}"}</Badge>
                      <Badge variant="outline">{"{{company_name}}"}</Badge>
                    </div>
                    <div className="flex gap-3">
                      <Button variant="outline" className="gap-2">
                        <Eye className="h-4 w-4" />
                        Preview
                      </Button>
                      <Button className="gap-2 gradient-primary border-0 text-white">
                        <Save className="h-4 w-4" />
                        Save Template
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Integrations */}
          <TabsContent value="integrations" className="mt-6">
            <Card className="shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-foreground">
                  <Plug className="h-5 w-5 text-primary" />
                  Integrations
                </CardTitle>
                <CardDescription>
                  Connect HRive with your favorite tools and services
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 sm:grid-cols-2">
                  {integrations.map((integration) => (
                    <div
                      key={integration.id}
                      className="flex items-center gap-4 p-4 rounded-lg border bg-card"
                    >
                      <div className="h-12 w-12 rounded-lg bg-muted flex items-center justify-center">
                        <integration.icon className="h-6 w-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-foreground">{integration.name}</span>
                          {integration.connected && (
                            <Badge className="bg-success text-white text-xs">Connected</Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">{integration.description}</p>
                      </div>
                      <Switch checked={integration.connected} />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notifications */}
          <TabsContent value="notifications" className="mt-6">
            <Card className="shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-foreground">
                  <Bell className="h-5 w-5 text-primary" />
                  Notification Preferences
                </CardTitle>
                <CardDescription>
                  Choose what notifications you want to receive
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-foreground">Leave Requests</Label>
                    <p className="text-sm text-muted-foreground">
                      Get notified when employees submit leave requests
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-foreground">New Applicants</Label>
                    <p className="text-sm text-muted-foreground">
                      Get notified when new applications are received
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-foreground">Payroll Reminders</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive reminders before payroll due dates
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-foreground">Cognitive AI Alerts</Label>
                    <p className="text-sm text-muted-foreground">
                      Get alerts for burnout and attrition risks
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-foreground">Email Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive notifications via email
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Security */}
          <TabsContent value="security" className="mt-6 space-y-6">
            <Card className="shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-foreground">
                  <Shield className="h-5 w-5 text-primary" />
                  Security Settings
                </CardTitle>
                <CardDescription>
                  Manage your account security and access
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-foreground">Two-Factor Authentication</Label>
                    <p className="text-sm text-muted-foreground">
                      Add an extra layer of security to your account
                    </p>
                  </div>
                  <Switch />
                </div>
                <Separator />
                <div className="space-y-4">
                  <Label className="text-foreground">Change Password</Label>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Input type="password" placeholder="Current password" />
                    <Input type="password" placeholder="New password" />
                  </div>
                  <Button variant="outline" className="gap-2">
                    <Key className="h-4 w-4" />
                    Update Password
                  </Button>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-foreground">Session Timeout</Label>
                    <p className="text-sm text-muted-foreground">
                      Automatically log out after inactivity
                    </p>
                  </div>
                  <Select defaultValue="30">
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="15">15 minutes</SelectItem>
                      <SelectItem value="30">30 minutes</SelectItem>
                      <SelectItem value="60">1 hour</SelectItem>
                      <SelectItem value="never">Never</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-foreground">
                  <Palette className="h-5 w-5 text-primary" />
                  Display Preferences
                </CardTitle>
                <CardDescription>
                  Customize your HRive experience
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-foreground">Language</Label>
                    <p className="text-sm text-muted-foreground">
                      Select your preferred language
                    </p>
                  </div>
                  <Select defaultValue="en">
                    <SelectTrigger className="w-40">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-foreground">Date Format</Label>
                    <p className="text-sm text-muted-foreground">
                      Choose how dates are displayed
                    </p>
                  </div>
                  <Select defaultValue="dmy">
                    <SelectTrigger className="w-40">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="dmy">DD/MM/YYYY</SelectItem>
                      <SelectItem value="mdy">MM/DD/YYYY</SelectItem>
                      <SelectItem value="ymd">YYYY-MM-DD</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-foreground">Currency Display</Label>
                    <p className="text-sm text-muted-foreground">
                      Format for monetary values
                    </p>
                  </div>
                  <Select defaultValue="pkr">
                    <SelectTrigger className="w-40">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pkr">PKR (Rs.)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-foreground">Compact Mode</Label>
                    <p className="text-sm text-muted-foreground">
                      Show more content with less spacing
                    </p>
                  </div>
                  <Switch />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default Settings;