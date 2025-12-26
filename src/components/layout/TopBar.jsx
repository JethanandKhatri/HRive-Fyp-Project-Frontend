import { Bell, Search, ChevronDown, Menu, LogOut, User } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export function TopBar({ onMenuClick, sidebarCollapsed }) {
  const { user, role, signOut } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut();
      toast.success("Logged out successfully");
      navigate("/auth/login", { replace: true });
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Failed to log out");
    }
  };

  // Get display name from user metadata or email
  const displayName = user?.user_metadata?.full_name || user?.email?.split("@")[0] || "User";
  const initials = displayName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  // Format role for display
  const formatRole = (r) => {
    if (!r) return "User";
    return r
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  return (
    <header 
      className={cn(
        "fixed right-0 top-0 z-30 flex h-16 items-center justify-between border-b border-border bg-card px-4 md:px-6 transition-all duration-300",
        "left-0 lg:left-64",
        sidebarCollapsed && "lg:left-[72px]"
      )}
    >
      {/* Mobile menu button + Search */}
      <div className="flex items-center gap-3 flex-1">
        <Button
          variant="ghost"
          size="icon"
          onClick={onMenuClick}
          className="lg:hidden shrink-0 text-foreground"
        >
          <Menu className="h-5 w-5" />
        </Button>
        
        <div className="relative w-full max-w-md hidden sm:block">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search employees, jobs, reports..."
            className="h-10 pl-10 bg-muted/50 border-border focus-visible:ring-1 focus-visible:ring-primary text-foreground placeholder:text-muted-foreground"
          />
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-2 md:gap-3">
        {/* Mobile search */}
        <Button variant="ghost" size="icon" className="sm:hidden text-foreground">
          <Search className="h-5 w-5" />
        </Button>
        
        {/* Notifications */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative text-foreground hover:bg-muted">
              <Bell className="h-5 w-5" />
              {/* Notification Badge - Properly positioned and sized */}
              <span className="absolute top-1.5 right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-semibold text-primary-foreground">
                3
              </span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80 bg-card border-border">
            <DropdownMenuLabel className="text-foreground font-semibold">Notifications</DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-border" />
            <DropdownMenuItem className="flex flex-col items-start gap-1 py-3 cursor-pointer hover:bg-muted">
              <span className="font-medium text-foreground">New leave request</span>
              <span className="text-xs text-muted-foreground">Ahmed Khan requested 3 days leave</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="flex flex-col items-start gap-1 py-3 cursor-pointer hover:bg-muted">
              <span className="font-medium text-foreground">Interview scheduled</span>
              <span className="text-xs text-muted-foreground">Technical interview for Senior Developer</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="flex flex-col items-start gap-1 py-3 cursor-pointer hover:bg-muted">
              <span className="font-medium text-foreground">Payroll reminder</span>
              <span className="text-xs text-muted-foreground">December payroll due in 3 days</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Profile */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center gap-2 px-2 hover:bg-muted">
              <Avatar className="h-8 w-8 border-2 border-primary/20">
                <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${displayName}`} />
                <AvatarFallback className="bg-primary/10 text-primary font-medium">{initials}</AvatarFallback>
              </Avatar>
              <div className="hidden flex-col items-start text-left md:flex">
                <span className="text-sm font-medium text-foreground">{displayName}</span>
                <span className="text-xs text-muted-foreground">{formatRole(role)}</span>
              </div>
              <ChevronDown className="h-4 w-4 text-muted-foreground hidden md:block" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 bg-card border-border">
            <DropdownMenuLabel className="text-foreground font-semibold">My Account</DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-border" />
            <DropdownMenuItem className="text-foreground cursor-pointer hover:bg-muted gap-2">
              <User className="h-4 w-4" />
              Profile Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-border" />
            <DropdownMenuItem 
              className="text-destructive cursor-pointer hover:bg-destructive/10 gap-2"
              onClick={handleLogout}
            >
              <LogOut className="h-4 w-4" />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}



