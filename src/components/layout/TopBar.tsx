import { Bell, Search, ChevronDown, Menu } from "lucide-react";
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
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface TopBarProps {
  onMenuClick: () => void;
  sidebarCollapsed: boolean;
}

export function TopBar({ onMenuClick, sidebarCollapsed }: TopBarProps) {
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
          className="lg:hidden shrink-0"
        >
          <Menu className="h-5 w-5" />
        </Button>
        
        <div className="relative w-full max-w-md hidden sm:block">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search employees, jobs, reports..."
            className="h-10 pl-10 bg-secondary border-0 focus-visible:ring-1 focus-visible:ring-primary"
          />
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-2 md:gap-4">
        {/* Mobile search */}
        <Button variant="ghost" size="icon" className="sm:hidden">
          <Search className="h-5 w-5 text-muted-foreground" />
        </Button>
        
        {/* Notifications */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5 text-muted-foreground" />
              <Badge className="absolute -right-1 -top-1 h-5 w-5 rounded-full p-0 text-xs gradient-primary border-0">
                3
              </Badge>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <DropdownMenuLabel>Notifications</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="flex flex-col items-start gap-1 py-3">
              <span className="font-medium">New leave request</span>
              <span className="text-xs text-muted-foreground">Ahmed Khan requested 3 days leave</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="flex flex-col items-start gap-1 py-3">
              <span className="font-medium">Interview scheduled</span>
              <span className="text-xs text-muted-foreground">Technical interview for Senior Developer</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="flex flex-col items-start gap-1 py-3">
              <span className="font-medium">Payroll reminder</span>
              <span className="text-xs text-muted-foreground">December payroll due in 3 days</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Profile */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center gap-2 px-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah" />
                <AvatarFallback>SM</AvatarFallback>
              </Avatar>
              <div className="hidden flex-col items-start text-left md:flex">
                <span className="text-sm font-medium text-foreground">Sarah Malik</span>
                <span className="text-xs text-muted-foreground">HR Manager</span>
              </div>
              <ChevronDown className="h-4 w-4 text-muted-foreground hidden md:block" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile Settings</DropdownMenuItem>
            <DropdownMenuItem>Preferences</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive">Log out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
