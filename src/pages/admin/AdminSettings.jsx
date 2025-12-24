import { useState } from "react";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { 
  Settings, 
  Lock, 
  Clock, 
  Database, 
  Bell, 
  Save,
  Shield,
  AlertTriangle
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function AdminSettings() {
  const { toast } = useToast();
  const [saving, setSaving] = useState(false);

  // Password Policy
  const [passwordPolicy, setPasswordPolicy] = useState({
    minLength: 8,
    requireUppercase: true,
    requireLowercase: true,
    requireNumbers: true,
    requireSpecialChars: true,
    expiryDays: 90,
    preventReuse: 5,
  });

  // Session Settings
  const [sessionSettings, setSessionSettings] = useState({
    timeout: 60,
    maxConcurrent: 3,
    rememberMe: true,
    mfaEnabled: false,
  });

  // Data Retention
  const [dataRetention, setDataRetention] = useState({
    auditLogs: "365",
    backupFrequency: "daily",
    retentionPeriod: "7",
  });

  // Notifications
  const [notifications, setNotifications] = useState({
    emailAlerts: true,
    securityAlerts: true,
    systemUpdates: true,
    weeklyDigest: true,
  });

  const handleSave = async () => {
    setSaving(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setSaving(false);
    toast({
      title: "Settings saved",
      description: "System settings have been updated successfully.",
    });
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold text-foreground">System Settings</h1>
            <p className="text-muted-foreground mt-1">Configure global system and security settings</p>
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
                Save Settings
              </>
            )}
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Password Policy */}
          <Card className="border-border/50">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Lock className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-lg">Password Policy</CardTitle>
                  <CardDescription>Define password requirements</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label className="text-foreground">Minimum Length</Label>
                  <span className="text-sm font-medium text-primary">{passwordPolicy.minLength} characters</span>
                </div>
                <Slider
                  value={[passwordPolicy.minLength]}
                  onValueChange={([value]) =>
                    setPasswordPolicy({ ...passwordPolicy, minLength: value })
                  }
                  min={6}
                  max={16}
                  step={1}
                  className="w-full"
                />
              </div>

              <div className="space-y-3">
                {[
                  { key: "requireUppercase", label: "Require uppercase letters" },
                  { key: "requireLowercase", label: "Require lowercase letters" },
                  { key: "requireNumbers", label: "Require numbers" },
                  { key: "requireSpecialChars", label: "Require special characters" },
                ].map((item) => (
                  <div key={item.key} className="flex items-center justify-between p-2 rounded-lg bg-muted/30">
                    <Label className="text-foreground text-sm">{item.label}</Label>
                    <Switch
                      checked={passwordPolicy[item.key]}
                      onCheckedChange={(checked) =>
                        setPasswordPolicy({ ...passwordPolicy, [item.key]: checked })
                      }
                    />
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-foreground text-sm">Password Expiry (days)</Label>
                  <Input
                    type="number"
                    value={passwordPolicy.expiryDays}
                    onChange={(e) =>
                      setPasswordPolicy({ ...passwordPolicy, expiryDays: parseInt(e.target.value) })
                    }
                    className="bg-background"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-foreground text-sm">Prevent Reuse (last N)</Label>
                  <Input
                    type="number"
                    value={passwordPolicy.preventReuse}
                    onChange={(e) =>
                      setPasswordPolicy({ ...passwordPolicy, preventReuse: parseInt(e.target.value) })
                    }
                    className="bg-background"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Session Settings */}
          <Card className="border-border/50">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-info/10">
                  <Clock className="h-5 w-5 text-info" />
                </div>
                <div>
                  <CardTitle className="text-lg">Session Settings</CardTitle>
                  <CardDescription>Configure session behavior</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label className="text-foreground">Session Timeout</Label>
                  <span className="text-sm font-medium text-primary">{sessionSettings.timeout} minutes</span>
                </div>
                <Slider
                  value={[sessionSettings.timeout]}
                  onValueChange={([value]) =>
                    setSessionSettings({ ...sessionSettings, timeout: value })
                  }
                  min={15}
                  max={120}
                  step={15}
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-foreground text-sm">Max Concurrent Sessions</Label>
                <Select
                  value={sessionSettings.maxConcurrent.toString()}
                  onValueChange={(value) =>
                    setSessionSettings({ ...sessionSettings, maxConcurrent: parseInt(value) })
                  }
                >
                  <SelectTrigger className="bg-background">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 session</SelectItem>
                    <SelectItem value="3">3 sessions</SelectItem>
                    <SelectItem value="5">5 sessions</SelectItem>
                    <SelectItem value="0">Unlimited</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                {[
                  { key: "rememberMe", label: "Allow 'Remember Me'" },
                  { key: "mfaEnabled", label: "Require Multi-Factor Authentication" },
                ].map((item) => (
                  <div key={item.key} className="flex items-center justify-between p-2 rounded-lg bg-muted/30">
                    <Label className="text-foreground text-sm">{item.label}</Label>
                    <Switch
                      checked={sessionSettings[item.key]}
                      onCheckedChange={(checked) =>
                        setSessionSettings({ ...sessionSettings, [item.key]: checked })
                      }
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Data Retention */}
          <Card className="border-border/50">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-success/10">
                  <Database className="h-5 w-5 text-success" />
                </div>
                <div>
                  <CardTitle className="text-lg">Data Retention</CardTitle>
                  <CardDescription>Configure data storage policies</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label className="text-foreground">Audit Log Retention (days)</Label>
                <Select
                  value={dataRetention.auditLogs}
                  onValueChange={(value) =>
                    setDataRetention({ ...dataRetention, auditLogs: value })
                  }
                >
                  <SelectTrigger className="bg-background">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="90">90 days</SelectItem>
                    <SelectItem value="180">180 days</SelectItem>
                    <SelectItem value="365">1 year</SelectItem>
                    <SelectItem value="730">2 years</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-foreground">Backup Frequency</Label>
                <Select
                  value={dataRetention.backupFrequency}
                  onValueChange={(value) =>
                    setDataRetention({ ...dataRetention, backupFrequency: value })
                  }
                >
                  <SelectTrigger className="bg-background">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hourly">Hourly</SelectItem>
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-foreground">Backup Retention (days)</Label>
                <Select
                  value={dataRetention.retentionPeriod}
                  onValueChange={(value) =>
                    setDataRetention({ ...dataRetention, retentionPeriod: value })
                  }
                >
                  <SelectTrigger className="bg-background">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="7">7 days</SelectItem>
                    <SelectItem value="14">14 days</SelectItem>
                    <SelectItem value="30">30 days</SelectItem>
                    <SelectItem value="90">90 days</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Notification Settings */}
          <Card className="border-border/50">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-warning/10">
                  <Bell className="h-5 w-5 text-warning" />
                </div>
                <div>
                  <CardTitle className="text-lg">Notification Rules</CardTitle>
                  <CardDescription>Admin notification preferences</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { key: "emailAlerts", label: "Email Alerts", desc: "Receive important alerts via email" },
                { key: "securityAlerts", label: "Security Alerts", desc: "Failed logins, suspicious activity" },
                { key: "systemUpdates", label: "System Updates", desc: "Maintenance and update notifications" },
                { key: "weeklyDigest", label: "Weekly Digest", desc: "Summary of admin activities" },
              ].map((item) => (
                <div key={item.key} className="flex items-center justify-between p-3 rounded-lg bg-muted/30 border border-border/30">
                  <div>
                    <p className="font-medium text-foreground text-sm">{item.label}</p>
                    <p className="text-xs text-muted-foreground">{item.desc}</p>
                  </div>
                  <Switch
                    checked={notifications[item.key]}
                    onCheckedChange={(checked) =>
                      setNotifications({ ...notifications, [item.key]: checked })
                    }
                  />
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Security Warning */}
        <Card className="border-destructive/30 bg-destructive/5">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-destructive/10">
                <AlertTriangle className="h-5 w-5 text-destructive" />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">Security Notice</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Changes to password policy and session settings will affect all users. 
                  Existing sessions may be terminated. Ensure you communicate changes to your team.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}



