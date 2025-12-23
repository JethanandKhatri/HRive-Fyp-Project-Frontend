import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Briefcase,
  Clock,
  Calendar,
  Wallet,
  Brain,
  BarChart3,
  MessageSquare,
  Settings,
  ChevronLeft,
  ChevronRight,
  UserPlus,
  FileText,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import hriveLogo from "@/assets/hrive-logo.png";

const navigation = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Recruitment", href: "/recruitment", icon: Briefcase },
  { name: "Pipeline", href: "/recruitment/pipeline", icon: Users },
  { name: "Interviews", href: "/recruitment/interviews", icon: Calendar },
  { name: "Offers", href: "/recruitment/offers", icon: FileText },
  { name: "Team", href: "/recruitment/team", icon: UserPlus },
  { name: "Core HR", href: "/core-hr", icon: Users },
  { name: "Attendance", href: "/attendance", icon: Clock },
  { name: "Leave", href: "/leave", icon: Calendar },
  { name: "Payroll PK", href: "/payroll", icon: Wallet },
  { name: "Cognitive AI", href: "/cognitive-ai", icon: Brain },
  { name: "Analytics", href: "/analytics", icon: BarChart3 },
  { name: "AskHR", href: "/ask-hr", icon: MessageSquare },
  { name: "Settings", href: "/settings", icon: Settings },
];

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  collapsed: boolean;
  onCollapsedChange: (collapsed: boolean) => void;
}

export function Sidebar({ isOpen, onClose, collapsed, onCollapsedChange }: SidebarProps) {
  const location = useLocation();

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-50 h-screen bg-sidebar transition-all duration-300 ease-in-out",
        // Mobile: slide in/out from left
        "lg:translate-x-0",
        isOpen ? "translate-x-0" : "-translate-x-full",
        // Desktop: respect collapsed state
        collapsed ? "lg:w-[72px]" : "lg:w-64",
        // Mobile: always full width when open
        "w-64"
      )}
    >
      {/* Logo */}
      <div className="flex h-16 items-center justify-between border-b border-sidebar-border px-4">
        <Link to="/" className="flex items-center gap-3" onClick={onClose}>
          <img
            src={hriveLogo}
            alt="HRive"
            className="h-9 w-9 object-contain"
          />
          {!collapsed && (
            <div className="flex flex-col">
              <span className="text-lg font-bold text-sidebar-foreground">HRive</span>
              <span className="text-[10px] text-sidebar-muted -mt-0.5">AI-Driven HR</span>
            </div>
          )}
        </Link>
        
        {/* Mobile close button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="h-8 w-8 text-sidebar-muted hover:text-sidebar-foreground hover:bg-sidebar-accent lg:hidden"
        >
          <X className="h-4 w-4" />
        </Button>
        
        {/* Desktop collapse button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onCollapsedChange(!collapsed)}
          className="h-8 w-8 text-sidebar-muted hover:text-sidebar-foreground hover:bg-sidebar-accent hidden lg:flex"
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col gap-1 p-3 overflow-y-auto max-h-[calc(100vh-8rem)]">
        {navigation.map((item) => {
          const isActive = location.pathname === item.href || 
            (item.href !== "/" && location.pathname.startsWith(item.href));
          
          const linkContent = (
            <Link
              key={item.name}
              to={item.href}
              onClick={onClose}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200",
                isActive
                  ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-glow"
                  : "text-sidebar-muted hover:bg-sidebar-accent hover:text-sidebar-foreground"
              )}
            >
              <item.icon className={cn("h-5 w-5 shrink-0", collapsed && "lg:mx-auto")} />
              <span className={cn(collapsed && "lg:hidden")}>{item.name}</span>
            </Link>
          );

          if (collapsed) {
            return (
              <Tooltip key={item.name} delayDuration={0}>
                <TooltipTrigger asChild>{linkContent}</TooltipTrigger>
                <TooltipContent side="right" className="font-medium hidden lg:block">
                  {item.name}
                </TooltipContent>
              </Tooltip>
            );
          }

          return linkContent;
        })}
      </nav>

      {/* HR Manager Badge */}
      {!collapsed && (
        <div className="absolute bottom-4 left-3 right-3">
          <div className="rounded-lg bg-sidebar-accent p-3">
            <p className="text-xs font-medium text-sidebar-muted">Logged in as</p>
            <p className="text-sm font-semibold text-sidebar-foreground">HR Manager</p>
          </div>
        </div>
      )}
    </aside>
  );
}
