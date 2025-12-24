import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { HRiveLogo } from "@/components/HRiveLogo";
import {
  LayoutDashboard,
  Users,
  Calendar,
  ClipboardCheck,
  Video,
  TrendingUp,
  MessageCircle,
  Settings,
  ChevronLeft,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

const navigation = [
  { name: "Dashboard", href: "/manager", icon: LayoutDashboard },
  { name: "My Team", href: "/manager/team", icon: Users },
  { name: "Attendance", href: "/manager/attendance", icon: Calendar },
  { name: "Leave Approvals", href: "/manager/leave", icon: ClipboardCheck, badge: 3 },
  { name: "Interviews", href: "/manager/interviews", icon: Video, badge: 2 },
  { name: "Insights", href: "/manager/insights", icon: TrendingUp },
  { name: "AskHR", href: "/manager/ask-hr", icon: MessageCircle },
  { name: "Settings", href: "/manager/settings", icon: Settings },
];

export function LineManagerSidebar({ isOpen, onClose, collapsed, onCollapsedChange }) {
  const location = useLocation();

  const isItemActive = (href) => {
    if (href === "/manager") {
      return location.pathname === "/manager";
    }
    return location.pathname.startsWith(href);
  };

  return (
    <aside
      className={cn(
        "fixed inset-y-0 left-0 z-50 flex flex-col bg-card border-r border-border transition-all duration-300",
        collapsed ? "w-[72px]" : "w-64",
        isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      )}
    >
      {/* Logo */}
      <div className={cn(
        "flex items-center h-16 border-b border-border px-4",
        collapsed ? "justify-center" : "justify-between"
      )}>
        {!collapsed && <HRiveLogo />}
        {collapsed && (
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-sm">H</span>
          </div>
        )}
        <button
          onClick={() => onCollapsedChange(!collapsed)}
          className="hidden lg:flex items-center justify-center w-6 h-6 rounded-md hover:bg-muted transition-colors"
        >
          <ChevronLeft className={cn("w-4 h-4 text-muted-foreground transition-transform", collapsed && "rotate-180")} />
        </button>
      </div>

      {/* Portal Badge */}
      <div className={cn("px-4 py-3 border-b border-border", collapsed && "px-2")}>
        {!collapsed ? (
          <Badge variant="secondary" className="w-full justify-center bg-accent/10 text-accent border-accent/20">
            Line Manager Portal
          </Badge>
        ) : (
          <Badge variant="secondary" className="w-full justify-center bg-accent/10 text-accent border-accent/20 text-xs px-1">
            LM
          </Badge>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4">
        <ul className="space-y-1 px-3">
          {navigation.map((item) => {
            const isActive = isItemActive(item.href);
            return (
              <li key={item.name}>
                <Link
                  to={item.href}
                  onClick={onClose}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
                    isActive
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "text-foreground hover:bg-muted"
                  )}
                >
                  <item.icon className={cn("w-5 h-5 flex-shrink-0", collapsed && "mx-auto")} />
                  {!collapsed && (
                    <>
                      <span className="flex-1">{item.name}</span>
                      {item.badge && (
                        <Badge 
                          variant="destructive" 
                          className="h-5 min-w-[20px] text-xs px-1.5"
                        >
                          {item.badge}
                        </Badge>
                      )}
                    </>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* User Badge */}
      {!collapsed && (
        <div className="p-4 border-t border-border">
          <div className="rounded-lg bg-accent/10 p-3 border border-accent/20">
            <p className="text-xs font-medium text-muted-foreground">Logged in as</p>
            <p className="text-sm font-semibold text-accent">Line Manager</p>
          </div>
        </div>
      )}
    </aside>
  );
}



