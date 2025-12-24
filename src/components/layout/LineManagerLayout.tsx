import { useState } from "react";
import { LineManagerSidebar } from "./LineManagerSidebar";
import { TopBar } from "./TopBar";

interface LineManagerLayoutProps {
  children: React.ReactNode;
}

export function LineManagerLayout({ children }: LineManagerLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-foreground/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      
      <LineManagerSidebar 
        isOpen={sidebarOpen} 
        onClose={() => setSidebarOpen(false)}
        collapsed={sidebarCollapsed}
        onCollapsedChange={setSidebarCollapsed}
      />
      <TopBar 
        onMenuClick={() => setSidebarOpen(true)} 
        sidebarCollapsed={sidebarCollapsed}
      />
      <main 
        className={`pt-16 transition-all duration-300 ${sidebarCollapsed ? 'lg:ml-[72px]' : 'lg:ml-64'}`}
      >
        <div className="p-4 md:p-6">{children}</div>
      </main>
    </div>
  );
}
