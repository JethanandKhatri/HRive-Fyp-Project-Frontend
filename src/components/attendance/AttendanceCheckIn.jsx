import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LogIn, LogOut, Clock } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
import { format } from "date-fns";
import { checkInAttendance, checkOutAttendance, fetchAttendanceRecords } from "@/lib/attendanceApi";

export function AttendanceCheckIn() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [todayRecord, setTodayRecord] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update current time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Fetch today's attendance record
  useEffect(() => {
    if (user) {
      fetchTodayAttendance();
    }
  }, [user]);

  const fetchTodayAttendance = async () => {
    if (!user) return;

    const today = format(new Date(), "yyyy-MM-dd");
    try {
      const records = await fetchAttendanceRecords({ date: today, user_id: user.id });
      setTodayRecord(records[0] || null);
    } catch (error) {
      console.error("Error fetching attendance:", error);
    }
  };

  const handleCheckIn = async () => {
    if (!user) return;
    setLoading(true);

    try {
      const now = new Date();
      const today = format(now, "yyyy-MM-dd");
      const record = await checkInAttendance(today);
      if (!record) {
        toast.error("Unable to check in. Please try again.");
        return;
      }
      setTodayRecord(record);
      toast.success(`Checked in at ${format(now, "hh:mm a")}`);
    } catch (error) {
      console.error("Check-in error:", error);
      toast.error("Failed to check in. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCheckOut = async () => {
    if (!user || !todayRecord) return;
    setLoading(true);

    try {
      const now = new Date();
      const record = await checkOutAttendance(format(new Date(), "yyyy-MM-dd"));
      if (!record) {
        toast.error("Unable to check out. Please try again.");
        return;
      }
      setTodayRecord(record);
      toast.success(`Checked out at ${format(now, "hh:mm a")}`);
    } catch (error) {
      console.error("Check-out error:", error);
      toast.error("Failed to check out. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const isCheckedIn = todayRecord?.checkInTime && !todayRecord?.checkOutTime;
  const isCheckedOut = todayRecord?.checkInTime && todayRecord?.checkOutTime;

  const getStatusText = () => {
    if (isCheckedOut) {
      return `Completed for today`;
    }
    if (isCheckedIn && todayRecord?.checkInTime) {
      return `Checked in at ${format(new Date(todayRecord.checkInTime), "hh:mm a")}`;
    }
    return "Not checked in yet";
  };

  const getButtonState = () => {
    if (isCheckedOut) {
      return {
        label: "Attendance Complete",
        icon: Clock,
        disabled: true,
        variant: "outline",
      };
    }
    if (isCheckedIn) {
      return {
        label: "Check Out",
        icon: LogOut,
        disabled: false,
        variant: "default",
        action: handleCheckOut,
      };
    }
    return {
      label: "Check In",
      icon: LogIn,
      disabled: false,
      variant: "default",
      action: handleCheckIn,
    };
  };

  const buttonState = getButtonState();

  return (
    <Card className="shadow-card border-border overflow-hidden">
      <CardContent className="p-6">
        <div className="flex flex-col items-center text-center space-y-4">
          {/* Current Time Display */}
          <div className="space-y-1">
            <p className="text-3xl font-bold text-foreground tabular-nums">
              {format(currentTime, "hh:mm:ss a")}
            </p>
            <p className="text-sm text-muted-foreground">
              {format(currentTime, "EEEE, MMMM d, yyyy")}
            </p>
          </div>

          {/* Check In/Out Button */}
          <Button
            size="lg"
            variant={buttonState.variant}
            onClick={buttonState.action}
            disabled={buttonState.disabled || loading}
            className="w-full max-w-[200px] h-12 rounded-xl font-semibold text-base gap-2"
          >
            <buttonState.icon className="h-5 w-5" />
            {loading ? "Processing..." : buttonState.label}
          </Button>

          {/* Status Text */}
          <p className="text-sm text-muted-foreground">{getStatusText()}</p>

          {/* Show check-out time if completed */}
          {isCheckedOut && todayRecord?.checkOutTime && (
            <div className="w-full pt-3 border-t border-border">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Check Out</span>
                <span className="font-medium text-foreground">
                  {format(new Date(todayRecord.checkOutTime), "hh:mm a")}
                </span>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}



