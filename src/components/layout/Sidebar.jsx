import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
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
  ChevronDown,
  UserPlus,
  FileText,
  X,
  Kanban,
  Video,
  UserCheck,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import hriveLogo from "@/assets/hrive-logo.png";

const navigation = [
  { name: "Dashboard", href: "/hr/dashboard", icon: LayoutDashboard },
  {
    name: "Recruitment",
    href: "/hr/recruitment",
    icon: Briefcase,
    children: [
      { name: "ATS", href: "/hr/recruitment", icon: Briefcase },
      { name: "Interviews", href: "/hr/recruitment/interviews", icon: Video },
      { name: "Add Candidate", href: "/hr/recruitment/new-candidate", icon: UserPlus },
      { name: "Pipeline", href: "/hr/recruitment/pipeline", icon: Kanban },
      { name: "Jobs", href: "/hr/recruitment/offers", icon: FileText },
    ],
  },
  {
    name: "Core HR",
    href: "/hr/core-hr",
    icon: Users,
    children: [
      { name: "Employees", href: "/hr/core-hr", icon: Users },
      { name: "Attendance", href: "/hr/attendance", icon: Clock },
      { name: "Leave", href: "/hr/leave", icon: Calendar },
    ],
  },
  { name: "Payroll", href: "/hr/payroll", icon: Wallet },
  { name: "Analytics", href: "/hr/analytics", icon: BarChart3 },
  { name: "Cognitive HR", href: "/hr/cognitive-ai", icon: Brain },
  { name: "AskHR", href: "/hr/ask-hr", icon: MessageSquare },
  { name: "Settings", href: "/hr/settings", icon: Settings },
];

export function Sidebar({ isOpen, onClose, collapsed, onCollapsedChange }) {
  const location = useLocation();
  const [openGroups, setOpenGroups] = useState(["Recruitment", "Core HR"]);

  const toggleGroup = (name) => {
    setOpenGroups((prev) =>
      prev.includes(name) ? prev.filter((g) => g !== name) : [...prev, name]
    );
  };

  const isItemActive = (href) => {
    if (href === "/hr/dashboard") return location.pathname === "/hr/dashboard";
    return location.pathname === href || location.pathname.startsWith(href + "/");
  };

  const isGroupActive = (item) => {
    if (item.children) {
      return item.children.some((child) => isItemActive(child.href));
    }
    return isItemActive(item.href);
  };

  const renderNavItem = (item) => {
    const hasChildren = item.children && item.children.length > 0;
    const isActive = isGroupActive(item);
    const isOpen = openGroups.includes(item.name);

    if (hasChildren) {
      return (
        <Collapsible key={item.name} open={isOpen && !collapsed} onOpenChange={() => toggleGroup(item.name)}>
          <CollapsibleTrigger asChild>
            <button
              className={cn(
                "flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200",
                isActive
                  ? "bg-sidebar-accent text-sidebar-foreground"
                  : "text-sidebar-muted hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
              )}
            >
              <div className="flex items-center gap-3">
                <item.icon className={cn("h-5 w-5 shrink-0", collapsed && "lg:mx-auto")} />
                <span className={cn(collapsed && "lg:hidden")}>{item.name}</span>
              </div>
              {!collapsed && (
                <ChevronDown
                  className={cn(
                    "h-4 w-4 transition-transform duration-200",
                    isOpen && "rotate-180"
                  )}
                />
              )}
            </button>
          </CollapsibleTrigger>
          <CollapsibleContent className="pl-4 mt-1 space-y-0.5">
            {item.children?.map((child) => {
              const childActive = isItemActive(child.href);
              return (
                <Link
                  key={child.name}
                  to={child.href}
                  onClick={onClose}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all duration-200",
                    childActive
                      ? "bg-sidebar-primary text-sidebar-primary-foreground font-medium"
                      : "text-sidebar-muted hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
                  )}
                >
                  <child.icon className="h-4 w-4 shrink-0" />
                  <span>{child.name}</span>
                </Link>
              );
            })}
          </CollapsibleContent>
        </Collapsible>
      );
    }

    const linkContent = (
      <Link
        key={item.name}
        to={item.href}
        onClick={onClose}
        className={cn(
          "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200",
          isActive
            ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-glow"
            : "text-sidebar-muted hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
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
        <Link to="/hr/dashboard" className="flex items-center gap-3" onClick={onClose}>
          <img
            src={hriveLogo}
            alt="HRive"
            className="h-9 w-9 object-contain"
          />
          {!collapsed && (
            <div className="flex flex-col">
              <span className="text-lg font-semibold text-sidebar-foreground tracking-tight">HRive</span>
              <span className="text-[10px] text-sidebar-muted -mt-0.5 font-medium">AI-Driven HR</span>
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

      {/* HR Manager Badge */}
      {!collapsed && (
        <div className="absolute bottom-4 left-3 right-3">
          <div className="rounded-lg bg-sidebar-accent/60 p-3 border border-sidebar-border">
            <p className="text-xs font-medium text-sidebar-muted">Logged in as</p>
            <p className="text-sm font-semibold text-sidebar-foreground">HR Manager</p>
          </div>
        </div>
      )}
    </aside>
  );
}



