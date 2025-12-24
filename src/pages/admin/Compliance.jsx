import { useState } from "react";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Scale, Wallet, Calendar, Clock, Save, AlertCircle, CheckCircle2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Compliance() {
  const { toast } = useToast();
  const [saving, setSaving] = useState(false);

  // Payroll Compliance
  const [payrollRules, setPayrollRules] = useState({
    fbrEnabled: true,
    fbrRate: "12.5",
    eobiEnabled: true,
    eobiEmployerRate: "5",
    eobiEmployeeRate: "1",
    sessiEnabled: true,
    sessiRate: "6",
    overtimeMultiplier: "1.5",
    minWage: "32000",
  });

  // Leave Policies
  const [leavePolicies, setLeavePolicies] = useState({
    annualLeave: "20",
    sickLeave: "10",
    casualLeave: "7",
    maternityLeave: "90",
    paternityLeave: "7",
    carryForward: true,
    maxCarryForward: "5",
    encashmentAllowed: true,
  });

  // Attendance Rules
  const [attendanceRules, setAttendanceRules] = useState({
    gracePeriod: "15",
    halfDayThreshold: "4",
    fullDayThreshold: "8",
    lateMarkAfter: "3",
    autoDeductLeave: true,
    weekendPolicy: "saturday_half",
  });

  const handleSave = async () => {
    setSaving(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setSaving(false);
    toast({
      title: "Compliance rules saved",
      description: "All compliance configurations have been updated.",
    });
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold text-foreground">Compliance Settings</h1>
            <p className="text-muted-foreground mt-1">Configure payroll, leave, and attendance compliance rules</p>
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
                Save All
              </>
            )}
          </Button>
        </div>

        {/* Info Banner */}
        <Card className="border-info/30 bg-info/5">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-info/10">
                <AlertCircle className="h-5 w-5 text-info" />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">Configuration Only</p>
                <p className="text-sm text-muted-foreground mt-1">
                  These rules are configured by Admin and used by HR Manager for payroll processing, 
                  leave approvals, and attendance calculations.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="payroll" className="space-y-6">
          <TabsList className="bg-muted/50 p-1">
            <TabsTrigger value="payroll" className="gap-2 data-[state=active]:bg-background">
              <Wallet className="h-4 w-4" />
              Payroll Rules
            </TabsTrigger>
            <TabsTrigger value="leave" className="gap-2 data-[state=active]:bg-background">
              <Calendar className="h-4 w-4" />
              Leave Policies
            </TabsTrigger>
            <TabsTrigger value="attendance" className="gap-2 data-[state=active]:bg-background">
              <Clock className="h-4 w-4" />
              Attendance Rules
            </TabsTrigger>
          </TabsList>

          {/* Payroll Rules Tab */}
          <TabsContent value="payroll" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* FBR Compliance */}
              <Card className="border-border/50">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg">FBR Tax Compliance</CardTitle>
                      <CardDescription>Federal Board of Revenue tax settings</CardDescription>
                    </div>
                    <Switch
                      checked={payrollRules.fbrEnabled}
                      onCheckedChange={(checked) =>
                        setPayrollRules({ ...payrollRules, fbrEnabled: checked })
                      }
                    />
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label className="text-foreground">Tax Rate (%)</Label>
                    <Input
                      type="number"
                      value={payrollRules.fbrRate}
                      onChange={(e) =>
                        setPayrollRules({ ...payrollRules, fbrRate: e.target.value })
                      }
                      disabled={!payrollRules.fbrEnabled}
                      className="bg-background"
                    />
                  </div>
                  <Badge variant="outline" className="bg-success/10 text-success border-success/20">
                    <CheckCircle2 className="h-3 w-3 mr-1" />
                    Pakistan Tax Compliant
                  </Badge>
                </CardContent>
              </Card>

              {/* EOBI */}
              <Card className="border-border/50">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg">EOBI Contribution</CardTitle>
                      <CardDescription>Employees' Old-Age Benefits Institution</CardDescription>
                    </div>
                    <Switch
                      checked={payrollRules.eobiEnabled}
                      onCheckedChange={(checked) =>
                        setPayrollRules({ ...payrollRules, eobiEnabled: checked })
                      }
                    />
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-foreground">Employer Rate (%)</Label>
                      <Input
                        type="number"
                        value={payrollRules.eobiEmployerRate}
                        onChange={(e) =>
                          setPayrollRules({ ...payrollRules, eobiEmployerRate: e.target.value })
                        }
                        disabled={!payrollRules.eobiEnabled}
                        className="bg-background"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-foreground">Employee Rate (%)</Label>
                      <Input
                        type="number"
                        value={payrollRules.eobiEmployeeRate}
                        onChange={(e) =>
                          setPayrollRules({ ...payrollRules, eobiEmployeeRate: e.target.value })
                        }
                        disabled={!payrollRules.eobiEnabled}
                        className="bg-background"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* SESSI */}
              <Card className="border-border/50">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg">SESSI Contribution</CardTitle>
                      <CardDescription>Sindh Employees Social Security</CardDescription>
                    </div>
                    <Switch
                      checked={payrollRules.sessiEnabled}
                      onCheckedChange={(checked) =>
                        setPayrollRules({ ...payrollRules, sessiEnabled: checked })
                      }
                    />
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label className="text-foreground">Contribution Rate (%)</Label>
                    <Input
                      type="number"
                      value={payrollRules.sessiRate}
                      onChange={(e) =>
                        setPayrollRules({ ...payrollRules, sessiRate: e.target.value })
                      }
                      disabled={!payrollRules.sessiEnabled}
                      className="bg-background"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* General Payroll */}
              <Card className="border-border/50">
                <CardHeader>
                  <CardTitle className="text-lg">General Settings</CardTitle>
                  <CardDescription>Other payroll configurations</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label className="text-foreground">Overtime Multiplier</Label>
                    <Input
                      type="number"
                      step="0.1"
                      value={payrollRules.overtimeMultiplier}
                      onChange={(e) =>
                        setPayrollRules({ ...payrollRules, overtimeMultiplier: e.target.value })
                      }
                      className="bg-background"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-foreground">Minimum Wage (PKR)</Label>
                    <Input
                      type="number"
                      value={payrollRules.minWage}
                      onChange={(e) =>
                        setPayrollRules({ ...payrollRules, minWage: e.target.value })
                      }
                      className="bg-background"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Leave Policies Tab */}
          <TabsContent value="leave" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="border-border/50">
                <CardHeader>
                  <CardTitle className="text-lg">Leave Quotas (Days/Year)</CardTitle>
                  <CardDescription>Annual leave entitlements per category</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-foreground">Annual Leave</Label>
                      <Input
                        type="number"
                        value={leavePolicies.annualLeave}
                        onChange={(e) =>
                          setLeavePolicies({ ...leavePolicies, annualLeave: e.target.value })
                        }
                        className="bg-background"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-foreground">Sick Leave</Label>
                      <Input
                        type="number"
                        value={leavePolicies.sickLeave}
                        onChange={(e) =>
                          setLeavePolicies({ ...leavePolicies, sickLeave: e.target.value })
                        }
                        className="bg-background"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-foreground">Casual Leave</Label>
                      <Input
                        type="number"
                        value={leavePolicies.casualLeave}
                        onChange={(e) =>
                          setLeavePolicies({ ...leavePolicies, casualLeave: e.target.value })
                        }
                        className="bg-background"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-foreground">Maternity Leave</Label>
                      <Input
                        type="number"
                        value={leavePolicies.maternityLeave}
                        onChange={(e) =>
                          setLeavePolicies({ ...leavePolicies, maternityLeave: e.target.value })
                        }
                        className="bg-background"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-border/50">
                <CardHeader>
                  <CardTitle className="text-lg">Carry Forward & Encashment</CardTitle>
                  <CardDescription>End of year leave policies</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30 border border-border/30">
                    <div>
                      <p className="font-medium text-foreground">Allow Carry Forward</p>
                      <p className="text-sm text-muted-foreground">Unused leaves can be carried to next year</p>
                    </div>
                    <Switch
                      checked={leavePolicies.carryForward}
                      onCheckedChange={(checked) =>
                        setLeavePolicies({ ...leavePolicies, carryForward: checked })
                      }
                    />
                  </div>
                  {leavePolicies.carryForward && (
                    <div className="space-y-2">
                      <Label className="text-foreground">Max Carry Forward (Days)</Label>
                      <Input
                        type="number"
                        value={leavePolicies.maxCarryForward}
                        onChange={(e) =>
                          setLeavePolicies({ ...leavePolicies, maxCarryForward: e.target.value })
                        }
                        className="bg-background"
                      />
                    </div>
                  )}
                  <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30 border border-border/30">
                    <div>
                      <p className="font-medium text-foreground">Allow Encashment</p>
                      <p className="text-sm text-muted-foreground">Convert unused leaves to salary</p>
                    </div>
                    <Switch
                      checked={leavePolicies.encashmentAllowed}
                      onCheckedChange={(checked) =>
                        setLeavePolicies({ ...leavePolicies, encashmentAllowed: checked })
                      }
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Attendance Rules Tab */}
          <TabsContent value="attendance" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="border-border/50">
                <CardHeader>
                  <CardTitle className="text-lg">Time Thresholds</CardTitle>
                  <CardDescription>Define attendance calculation rules</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label className="text-foreground">Grace Period (Minutes)</Label>
                    <Input
                      type="number"
                      value={attendanceRules.gracePeriod}
                      onChange={(e) =>
                        setAttendanceRules({ ...attendanceRules, gracePeriod: e.target.value })
                      }
                      className="bg-background"
                    />
                    <p className="text-xs text-muted-foreground">Late arrival allowed without penalty</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-foreground">Half Day (Hours)</Label>
                      <Input
                        type="number"
                        value={attendanceRules.halfDayThreshold}
                        onChange={(e) =>
                          setAttendanceRules({ ...attendanceRules, halfDayThreshold: e.target.value })
                        }
                        className="bg-background"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-foreground">Full Day (Hours)</Label>
                      <Input
                        type="number"
                        value={attendanceRules.fullDayThreshold}
                        onChange={(e) =>
                          setAttendanceRules({ ...attendanceRules, fullDayThreshold: e.target.value })
                        }
                        className="bg-background"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-border/50">
                <CardHeader>
                  <CardTitle className="text-lg">Late Arrival Policy</CardTitle>
                  <CardDescription>How late arrivals are handled</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label className="text-foreground">Late Marks Before Action</Label>
                    <Input
                      type="number"
                      value={attendanceRules.lateMarkAfter}
                      onChange={(e) =>
                        setAttendanceRules({ ...attendanceRules, lateMarkAfter: e.target.value })
                      }
                      className="bg-background"
                    />
                    <p className="text-xs text-muted-foreground">Number of late arrivals before leave deduction</p>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30 border border-border/30">
                    <div>
                      <p className="font-medium text-foreground">Auto-Deduct Leave</p>
                      <p className="text-sm text-muted-foreground">Automatically deduct from casual leave</p>
                    </div>
                    <Switch
                      checked={attendanceRules.autoDeductLeave}
                      onCheckedChange={(checked) =>
                        setAttendanceRules({ ...attendanceRules, autoDeductLeave: checked })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-foreground">Weekend Policy</Label>
                    <Select
                      value={attendanceRules.weekendPolicy}
                      onValueChange={(value) =>
                        setAttendanceRules({ ...attendanceRules, weekendPolicy: value })
                      }
                    >
                      <SelectTrigger className="bg-background">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="saturday_half">Saturday Half Day</SelectItem>
                        <SelectItem value="saturday_off">Saturday Off</SelectItem>
                        <SelectItem value="saturday_full">Saturday Full Day</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
}



