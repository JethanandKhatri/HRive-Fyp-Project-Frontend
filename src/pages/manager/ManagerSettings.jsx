import { LineManagerLayout } from "@/components/layout/LineManagerLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { 
  User,
  Bell,
  Lock,
  Mail,
  Phone,
  Building,
  Save,
  Info
} from "lucide-react";
import { toast } from "sonner";

export default function ManagerSettings() {
  const handleSave = () => {
    toast.success("Settings saved successfully");
  };

  return (
    <LineManagerLayout>
      <div className="space-y-6 max-w-4xl">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Settings</h1>
          <p className="text-muted-foreground mt-1">Manage your personal preferences</p>
        </div>

        {/* Info Banner */}
        <Card className="border-border bg-muted/30">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <Info className="w-4 h-4 text-primary" />
            </div>
            <p className="text-sm text-muted-foreground">
              <span className="font-medium text-foreground">Profile only access.</span> System-wide settings are managed by the Admin.
            </p>
          </CardContent>
        </Card>

        {/* Profile Section */}
        <Card className="border-border">
          <CardHeader>
            <div className="flex items-center gap-2">
              <User className="w-5 h-5 text-primary" />
              <CardTitle className="text-lg font-semibold text-foreground">Profile Information</CardTitle>
            </div>
            <CardDescription>Your personal details (read-only)</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center gap-6">
              <Avatar className="w-20 h-20">
                <AvatarImage src="/placeholder.svg" />
                <AvatarFallback className="text-lg bg-primary/10 text-primary">JD</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="text-lg font-semibold text-foreground">John Doe</h3>
                <p className="text-muted-foreground">Line Manager</p>
              </div>
            </div>

            <Separator />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label className="text-muted-foreground flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  Email
                </Label>
                <Input value="john.doe@company.com" disabled className="bg-muted" />
              </div>
              <div className="space-y-2">
                <Label className="text-muted-foreground flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  Phone
                </Label>
                <Input value="+92 300 1234567" disabled className="bg-muted" />
              </div>
              <div className="space-y-2">
                <Label className="text-muted-foreground flex items-center gap-2">
                  <Building className="w-4 h-4" />
                  Department
                </Label>
                <Input value="Engineering" disabled className="bg-muted" />
              </div>
              <div className="space-y-2">
                <Label className="text-muted-foreground flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Employee ID
                </Label>
                <Input value="EMP-2024-001" disabled className="bg-muted" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Password Section */}
        <Card className="border-border">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Lock className="w-5 h-5 text-primary" />
              <CardTitle className="text-lg font-semibold text-foreground">Change Password</CardTitle>
            </div>
            <CardDescription>Update your password for security</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Current Password</Label>
              <Input type="password" placeholder="Enter current password" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>New Password</Label>
                <Input type="password" placeholder="Enter new password" />
              </div>
              <div className="space-y-2">
                <Label>Confirm New Password</Label>
                <Input type="password" placeholder="Confirm new password" />
              </div>
            </div>
            <Button className="gap-2">
              <Lock className="w-4 h-4" />
              Update Password
            </Button>
          </CardContent>
        </Card>

        {/* Notification Preferences */}
        <Card className="border-border">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Bell className="w-5 h-5 text-primary" />
              <CardTitle className="text-lg font-semibold text-foreground">Notification Preferences</CardTitle>
            </div>
            <CardDescription>Control how you receive notifications</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">Leave Request Notifications</p>
                <p className="text-sm text-muted-foreground">Get notified when team members request leave</p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">Interview Reminders</p>
                <p className="text-sm text-muted-foreground">Receive reminders before scheduled interviews</p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">Team Attendance Alerts</p>
                <p className="text-sm text-muted-foreground">Get alerts for late check-ins or absences</p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">Email Notifications</p>
                <p className="text-sm text-muted-foreground">Receive notifications via email</p>
              </div>
              <Switch />
            </div>
          </CardContent>
        </Card>

        {/* Save Button */}
        <div className="flex justify-end">
          <Button onClick={handleSave} className="gap-2">
            <Save className="w-4 h-4" />
            Save Changes
          </Button>
        </div>
      </div>
    </LineManagerLayout>
  );
}



