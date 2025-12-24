import { useState } from "react";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Building2, Globe, Clock, Calendar, Upload, Save, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const timezones = [
  { value: "PKT", label: "Pakistan Standard Time (PKT)" },
  { value: "IST", label: "Indian Standard Time (IST)" },
  { value: "GMT", label: "Greenwich Mean Time (GMT)" },
  { value: "EST", label: "Eastern Standard Time (EST)" },
  { value: "PST", label: "Pacific Standard Time (PST)" },
];

const industries = [
  "Technology",
  "Healthcare",
  "Finance & Banking",
  "Manufacturing",
  "Retail",
  "Education",
  "Consulting",
  "Other",
];

const weekDays = [
  { id: "mon", label: "Mon" },
  { id: "tue", label: "Tue" },
  { id: "wed", label: "Wed" },
  { id: "thu", label: "Thu" },
  { id: "fri", label: "Fri" },
  { id: "sat", label: "Sat" },
  { id: "sun", label: "Sun" },
];

export default function Organization() {
  const { toast } = useToast();
  const [saving, setSaving] = useState(false);
  
  const [formData, setFormData] = useState({
    companyName: "HRive Technologies Pvt Ltd",
    industry: "Technology",
    timezone: "PKT",
    workingDays: ["mon", "tue", "wed", "thu", "fri"],
    workStartTime: "09:00",
    workEndTime: "18:00",
    fiscalYearStart: "July",
  });

  const handleSave = async () => {
    setSaving(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setSaving(false);
    toast({
      title: "Settings saved",
      description: "Organization settings have been updated successfully.",
    });
  };

  const toggleWorkingDay = (dayId: string) => {
    setFormData((prev) => ({
      ...prev,
      workingDays: prev.workingDays.includes(dayId)
        ? prev.workingDays.filter((d) => d !== dayId)
        : [...prev.workingDays, dayId],
    }));
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold text-foreground">Organization Settings</h1>
            <p className="text-muted-foreground mt-1">
              Configure company-level settings that apply globally
            </p>
          </div>
          <Button onClick={handleSave} disabled={saving} className="gap-2">
            {saving ? (
              <>
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                Saving...
              </>
            ) : (
              <>
                <Save className="h-4 w-4" />
                Save Changes
              </>
            )}
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Company Information */}
          <Card className="border-border/50">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Building2 className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-lg">Company Information</CardTitle>
                  <CardDescription>Basic organization details</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="companyName" className="text-foreground">Company Name</Label>
                <Input
                  id="companyName"
                  value={formData.companyName}
                  onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                  className="bg-background"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="industry" className="text-foreground">Industry</Label>
                <Select
                  value={formData.industry}
                  onValueChange={(value) => setFormData({ ...formData, industry: value })}
                >
                  <SelectTrigger className="bg-background">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {industries.map((industry) => (
                      <SelectItem key={industry} value={industry}>
                        {industry}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-foreground">Company Logo</Label>
                <div className="flex items-center gap-4">
                  <div className="h-16 w-16 rounded-lg bg-muted flex items-center justify-center border-2 border-dashed border-border">
                    <Building2 className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <Button variant="outline" className="gap-2">
                    <Upload className="h-4 w-4" />
                    Upload Logo
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">PNG, JPG up to 2MB. Recommended 200x200px</p>
              </div>
            </CardContent>
          </Card>

          {/* Timezone & Region */}
          <Card className="border-border/50">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-info/10">
                  <Globe className="h-5 w-5 text-info" />
                </div>
                <div>
                  <CardTitle className="text-lg">Timezone & Region</CardTitle>
                  <CardDescription>Regional configuration settings</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="timezone" className="text-foreground">Timezone</Label>
                <Select
                  value={formData.timezone}
                  onValueChange={(value) => setFormData({ ...formData, timezone: value })}
                >
                  <SelectTrigger className="bg-background">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {timezones.map((tz) => (
                      <SelectItem key={tz.value} value={tz.value}>
                        {tz.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="fiscalYear" className="text-foreground">Fiscal Year Starts</Label>
                <Select
                  value={formData.fiscalYearStart}
                  onValueChange={(value) => setFormData({ ...formData, fiscalYearStart: value })}
                >
                  <SelectTrigger className="bg-background">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {["January", "April", "July", "October"].map((month) => (
                      <SelectItem key={month} value={month}>
                        {month}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="p-3 rounded-lg bg-muted/50 border border-border/50">
                <div className="flex items-center gap-2 text-sm">
                  <Check className="h-4 w-4 text-success" />
                  <span className="text-foreground font-medium">Current fiscal year:</span>
                  <span className="text-muted-foreground">Jul 2024 - Jun 2025</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Working Hours */}
          <Card className="border-border/50">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-success/10">
                  <Clock className="h-5 w-5 text-success" />
                </div>
                <div>
                  <CardTitle className="text-lg">Working Hours</CardTitle>
                  <CardDescription>Define standard work hours</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="startTime" className="text-foreground">Start Time</Label>
                  <Input
                    id="startTime"
                    type="time"
                    value={formData.workStartTime}
                    onChange={(e) => setFormData({ ...formData, workStartTime: e.target.value })}
                    className="bg-background"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="endTime" className="text-foreground">End Time</Label>
                  <Input
                    id="endTime"
                    type="time"
                    value={formData.workEndTime}
                    onChange={(e) => setFormData({ ...formData, workEndTime: e.target.value })}
                    className="bg-background"
                  />
                </div>
              </div>

              <div className="p-3 rounded-lg bg-muted/50 border border-border/50">
                <p className="text-sm text-foreground font-medium">Total Working Hours</p>
                <p className="text-2xl font-bold text-primary mt-1">9 hours/day</p>
              </div>
            </CardContent>
          </Card>

          {/* Working Days */}
          <Card className="border-border/50">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-warning/10">
                  <Calendar className="h-5 w-5 text-warning" />
                </div>
                <div>
                  <CardTitle className="text-lg">Working Days</CardTitle>
                  <CardDescription>Select standard working days</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {weekDays.map((day) => {
                  const isSelected = formData.workingDays.includes(day.id);
                  return (
                    <button
                      key={day.id}
                      onClick={() => toggleWorkingDay(day.id)}
                      className={`
                        px-4 py-2 rounded-lg text-sm font-medium transition-all
                        ${isSelected
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground hover:bg-muted/80"
                        }
                      `}
                    >
                      {day.label}
                    </button>
                  );
                })}
              </div>

              <div className="p-3 rounded-lg bg-muted/50 border border-border/50">
                <p className="text-sm text-foreground font-medium">Work Week Summary</p>
                <p className="text-lg font-bold text-foreground mt-1">
                  {formData.workingDays.length} days × 9 hours = {formData.workingDays.length * 9} hours/week
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Impact Notice */}
        <Card className="border-warning/30 bg-warning/5">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-warning/10">
                <Building2 className="h-5 w-5 text-warning" />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">Global Impact Notice</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Changes made here will apply to the HR Manager Portal and Employee Portal. 
                  Attendance calculations, leave policies, and payroll settings will be affected.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
