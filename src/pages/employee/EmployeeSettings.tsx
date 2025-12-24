import { useState } from "react";
import { EmployeeLayout } from "@/components/layout/EmployeeLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, Bell, Lock, Mail, Phone, Building, Briefcase } from "lucide-react";

export default function EmployeeSettings() {
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    leaveUpdates: true,
    payslipAlerts: true,
    announcements: true,
  });

  const profileInfo = {
    name: "John Doe",
    email: "john.doe@company.com",
    phone: "+1 (555) 123-4567",
    department: "Engineering",
    position: "Software Developer",
    joinDate: "March 15, 2022",
    employeeId: "EMP-2024-0042",
  };

  return (
    <EmployeeLayout>
      <div className="space-y-6 animate-fade-in max-w-4xl">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-foreground">Settings</h1>
          <p className="text-muted-foreground">Manage your profile and preferences</p>
        </div>

        {/* Profile Information */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <User className="h-5 w-5 text-primary" />
              Profile Information
            </CardTitle>
            <CardDescription>Your personal details (read-only)</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center gap-6">
              <Avatar className="h-20 w-20">
                <AvatarImage src="/placeholder.svg" />
                <AvatarFallback className="text-lg bg-primary text-primary-foreground">
                  JD
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="text-xl font-semibold text-foreground">{profileInfo.name}</h3>
                <p className="text-sm text-muted-foreground">{profileInfo.position}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Employee ID: {profileInfo.employeeId}
                </p>
              </div>
            </div>

            <Separator />

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label className="text-muted-foreground flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  Email
                </Label>
                <p className="text-sm font-medium text-foreground">{profileInfo.email}</p>
              </div>

              <div className="space-y-2">
                <Label className="text-muted-foreground flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  Phone
                </Label>
                <p className="text-sm font-medium text-foreground">{profileInfo.phone}</p>
              </div>

              <div className="space-y-2">
                <Label className="text-muted-foreground flex items-center gap-2">
                  <Building className="h-4 w-4" />
                  Department
                </Label>
                <p className="text-sm font-medium text-foreground">{profileInfo.department}</p>
              </div>

              <div className="space-y-2">
                <Label className="text-muted-foreground flex items-center gap-2">
                  <Briefcase className="h-4 w-4" />
                  Position
                </Label>
                <p className="text-sm font-medium text-foreground">{profileInfo.position}</p>
              </div>
            </div>

            <p className="text-xs text-muted-foreground">
              To update your profile information, please contact HR.
            </p>
          </CardContent>
        </Card>

        {/* Notification Preferences */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <Bell className="h-5 w-5 text-primary" />
              Notification Preferences
            </CardTitle>
            <CardDescription>Choose how you want to be notified</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-foreground">Email Notifications</p>
                  <p className="text-xs text-muted-foreground">
                    Receive updates via email
                  </p>
                </div>
                <Switch
                  checked={notifications.email}
                  onCheckedChange={(checked) =>
                    setNotifications({ ...notifications, email: checked })
                  }
                />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-foreground">Push Notifications</p>
                  <p className="text-xs text-muted-foreground">
                    Receive in-app notifications
                  </p>
                </div>
                <Switch
                  checked={notifications.push}
                  onCheckedChange={(checked) =>
                    setNotifications({ ...notifications, push: checked })
                  }
                />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-foreground">Leave Updates</p>
                  <p className="text-xs text-muted-foreground">
                    Get notified about leave request status
                  </p>
                </div>
                <Switch
                  checked={notifications.leaveUpdates}
                  onCheckedChange={(checked) =>
                    setNotifications({ ...notifications, leaveUpdates: checked })
                  }
                />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-foreground">Payslip Alerts</p>
                  <p className="text-xs text-muted-foreground">
                    Get notified when new payslips are available
                  </p>
                </div>
                <Switch
                  checked={notifications.payslipAlerts}
                  onCheckedChange={(checked) =>
                    setNotifications({ ...notifications, payslipAlerts: checked })
                  }
                />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-foreground">Announcements</p>
                  <p className="text-xs text-muted-foreground">
                    Get notified about company announcements
                  </p>
                </div>
                <Switch
                  checked={notifications.announcements}
                  onCheckedChange={(checked) =>
                    setNotifications({ ...notifications, announcements: checked })
                  }
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Change Password */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <Lock className="h-5 w-5 text-primary" />
              Change Password
            </CardTitle>
            <CardDescription>Update your account password</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="currentPassword">Current Password</Label>
              <Input id="currentPassword" type="password" placeholder="Enter current password" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="newPassword">New Password</Label>
              <Input id="newPassword" type="password" placeholder="Enter new password" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm New Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="Confirm new password"
              />
            </div>

            <Button className="gradient-primary border-0">Update Password</Button>
          </CardContent>
        </Card>
      </div>
    </EmployeeLayout>
  );
}
