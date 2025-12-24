import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Clock,
  Calendar,
  Receipt,
  Bell,
  MessageCircle,
  Settings,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import hriveLogo from "@/assets/hrive-logo.png";

const navigation = [
  { name: "Dashboard", href: "/employee", icon: LayoutDashboard },
  { name: "Attendance", href: "/employee/attendance", icon: Clock },
  { name: "Leave", href: "/employee/leave", icon: Calendar },
  { name: "Payslips", href: "/employee/payslips", icon: Receipt },
  { name: "Announcements", href: "/employee/announcements", icon: Bell, badge: 2 },
  { name: "AskHR", href: "/employee/ask-hr", icon: MessageCircle },
  { name: "Settings", href: "/employee/settings", icon: Settings },
];

export function EmployeeSidebar({ isOpen, onClose, collapsed, onCollapsedChange }) {
  const location = useLocation();

  const isItemActive = (href) => {
    if (href === "/employee") return location.pathname === "/employee";
    return location.pathname === href || location.pathname.startsWith(href + "/");
  };

  const renderNavItem = (item) => {
    const isActive = isItemActive(item.href);

    const linkContent = (
      <Link
        key={item.name}
        to={item.href}
        onClick={onClose}
        className={cn(
          "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200 relative",
          isActive
            ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-glow"
            : "text-sidebar-muted hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
        )}
      >
        <item.icon className={cn("h-5 w-5 shrink-0", collapsed && "lg:mx-auto")} />
        <span className={cn(collapsed && "lg:hidden")}>{item.name}</span>
        {item.badge && !collapsed && (
          <span className="ml-auto flex h-5 min-w-[20px] items-center justify-center rounded-full bg-destructive text-xs font-medium text-destructive-foreground px-1.5">
            {item.badge}
          </span>
        )}
      </Link>
    );

    if (collapsed) {
      return (
        <Tooltip key={item.name} delayDuration={0}>
          <TooltipTrigger asChild>{linkContent}</TooltipTrigger>
          <TooltipContent side="right" className="font-medium hidden lg:block">
            {item.name}
            {item.badge && <span className="ml-2 text-destructive">({item.badge})</span>}
          </TooltipContent>
        </Tooltip>
      );
    }

    return linkContent;
  };

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-50 h-screen bg-sidebar transition-all duration-300 ease-in-out",
        "lg:translate-x-0",
        isOpen ? "translate-x-0" : "-translate-x-full",
        collapsed ? "lg:w-[72px]" : "lg:w-64",
        "w-64"
      )}
    >
      {/* Logo */}
      <div className="flex h-16 items-center justify-between border-b border-sidebar-border px-4">
        <Link to="/employee" className="flex items-center gap-3" onClick={onClose}>
          <img
            src={hriveLogo}
            alt="HRive"
            className="h-9 w-9 object-contain"
          />
          {!collapsed && (
            <div className="flex flex-col">
              <span className="text-lg font-semibold text-sidebar-foreground tracking-tight">HRive</span>
              <span className="text-[10px] text-sidebar-muted -mt-0.5 font-medium">Employee Portal</span>
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
        {navigation.map((item) => renderNavItem(item))}
      </nav>

      {/* Employee Badge */}
      {!collapsed && (
        <div className="absolute bottom-4 left-3 right-3">
          <div className="rounded-lg bg-primary/10 p-3 border border-primary/20">
            <p className="text-xs font-medium text-sidebar-muted">Logged in as</p>
            <p className="text-sm font-semibold text-primary">Employee</p>
          </div>
        </div>
      )}
    </aside>
  );
}



