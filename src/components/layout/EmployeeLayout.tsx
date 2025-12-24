import { useState } from "react";
import { EmployeeSidebar } from "./EmployeeSidebar";
import { TopBar } from "./TopBar";
import { cn } from "@/lib/utils";

interface EmployeeLayoutProps {
  children: React.ReactNode;
}

export function EmployeeLayout({ children }: EmployeeLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <EmployeeSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        collapsed={collapsed}
        onCollapsedChange={setCollapsed}
      />

      <div
        className={cn(
          "transition-all duration-300 ease-in-out",
          collapsed ? "lg:pl-[72px]" : "lg:pl-64"
        )}
      >
        <TopBar onMenuClick={() => setSidebarOpen(true)} />
        <main className="p-6">{children}</main>
      </div>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}
