import { useState } from "react";
import TopBar from "./components/TopBar";
import SideNav from "./components/SideNav";
import BottomNav from "./components/BottomNav";
import { NAV_ADMIN, NAV_HR, NAV_MANAGER, NAV_STAFF } from "./data/constants";
import { getUserRole, getCurrentUserId, setCurrentUserId, clearCurrentUserId } from "./utils/roleUtils";

// Admin screens
import AdminDashboard from "./screens/admin/AdminDashboard";
import AdminEmployees from "./screens/admin/AdminEmployees";
import AdminAddEmployee from "./screens/admin/AdminAddEmployee";

// HR screens - import existing ones or create placeholders
import HREmployees from "./screens/hr/HREmployees";

// Manager screens
import ManagerCandidates from "./screens/manager/ManagerCandidates";

// Staff screens
import StaffAttendance from "./screens/staff/StaffAttendance";

// Shared components
import AskHR from "./components/AskHR";
import Login from "./screens/Login";

// Placeholder screens (to be created or imported from old file)
// For now, creating simple placeholders
function PlaceholderScreen({ title, children }) {
  return (
    <div className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700">
      <h2 className="text-lg font-semibold text-slate-700 dark:text-slate-100 mb-4">{title}</h2>
      {children || <p className="text-sm text-slate-500 dark:text-slate-400">Screen coming soon...</p>}
    </div>
  );
}

export default function App() {
  const [screen, setScreen] = useState("dashboard");
  const [dark, setDark] = useState(false);
  const [navOpen, setNavOpen] = useState(false);
  const [currentUserId, setCurrentUserIdState] = useState(getCurrentUserId());

  // If not logged in, show login screen
  if (!currentUserId) {
    return (
      <Login
        onLogin={(id) => {
          setCurrentUserId(id);
          setCurrentUserIdState(id);
        }}
      />
    );
  }

  const role = getUserRole(currentUserId);

  const getNav = () => {
    if (role === "admin") return NAV_ADMIN;
    if (role === "hr") return NAV_HR;
    if (role === "manager") return NAV_MANAGER;
    return NAV_STAFF;
  };

  const currentNav = getNav();
  const currentScreenLabel = currentNav.find(n => n.key === screen)?.label || "Dashboard";

  return (
    <div className={dark ? "dark min-h-screen w-full" : "min-h-screen w-full"}>
      <div className="min-h-screen w-full bg-slate-50 dark:bg-slate-900 grid grid-rows-[auto_1fr]">
        <TopBar
          dark={dark}
          setDark={setDark}
          onMenuToggle={() => setNavOpen(true)}
          role={role}
          currentUser={currentUserId}
          onLogout={() => {
            clearCurrentUserId();
            setCurrentUserIdState(null);
          }}
        />
        <div className="grid md:grid-cols-[240px_1fr] grid-cols-1 gap-0 h-full relative">
          {/* Desktop/Tablet sidebar */}
          <aside className="hidden md:block h-full">
            <SideNav current={screen} setCurrent={setScreen} role={role} />
          </aside>

          {/* Mobile drawer */}
          {navOpen && (
            <>
              <div
                className="md:hidden fixed inset-0 bg-black/40 z-40 opacity-100"
                onClick={() => setNavOpen(false)}
              />
              <div className="md:hidden fixed inset-y-0 left-0 w-64 z-50 shadow-xl transform transition-transform duration-200 translate-x-0">
                <div className="h-full">
                  <SideNav current={screen} setCurrent={(k) => { setScreen(k); setNavOpen(false); }} role={role} />
                </div>
              </div>
            </>
          )}

          <main className="p-4 pb-24 md:pb-6 overflow-auto space-y-4 scrollbar-thin max-w-screen-xl mx-auto w-full">
            <div className="flex items-start sm:items-center justify-between gap-2 flex-col sm:flex-row">
              <h1 className="text-xl sm:text-2xl font-semibold text-slate-800 dark:text-slate-100">{currentScreenLabel}</h1>
              <div className="text-xs text-slate-400 dark:text-slate-500">UI Prototype – Tailwind-only</div>
            </div>
            
            {/* Admin Portal Screens */}
            {role === "admin" && (
              <>
                {screen === "dashboard" && <AdminDashboard onQuickAction={setScreen} />}
                {screen === "employees" && <AdminEmployees />}
                {screen === "addEmployee" && <AdminAddEmployee />}
                {screen === "attendance" && <PlaceholderScreen title="Attendance Management" />}
                {screen === "payroll" && <PlaceholderScreen title="Payroll Management" />}
                {screen === "cognitive" && <PlaceholderScreen title="Cognitive AI" />}
                {screen === "askhr" && <AskHR />}
              </>
            )}

            {/* HR Portal Screens */}
            {role === "hr" && (
              <>
                {screen === "dashboard" && <PlaceholderScreen title="HR Dashboard" />}
                {screen === "employees" && <HREmployees />}
                {screen === "addEmployee" && <PlaceholderScreen title="Add Employee" />}
                {screen === "attendance" && <PlaceholderScreen title="Attendance" />}
                {screen === "payroll" && <PlaceholderScreen title="Payroll" />}
                {screen === "cognitive" && <PlaceholderScreen title="Cognitive AI" />}
                {screen === "askhr" && <AskHR />}
              </>
            )}

            {/* Manager Portal Screens */}
            {role === "manager" && (
              <>
                {screen === "dashboard" && <PlaceholderScreen title="Team Overview" />}
                {screen === "team" && <PlaceholderScreen title="My Team" />}
                {screen === "candidates" && <ManagerCandidates />}
                {screen === "attendance" && <PlaceholderScreen title="Team Attendance" />}
                {screen === "leaves" && <PlaceholderScreen title="Leave Approvals" />}
                {screen === "performance" && <PlaceholderScreen title="Team Performance" />}
                {screen === "askhr" && <AskHR />}
              </>
            )}

            {/* Staff Portal Screens */}
            {role === "staff" && (
              <>
                {screen === "dashboard" && <PlaceholderScreen title="My Dashboard" />}
                {screen === "attendance" && <StaffAttendance />}
                {screen === "leaves" && <PlaceholderScreen title="Leave Balance" />}
                {screen === "payslips" && <PlaceholderScreen title="My Payslips" />}
                {screen === "profile" && <PlaceholderScreen title="My Profile" />}
                {screen === "askhr" && <AskHR />}
              </>
            )}
          </main>
        </div>
        {/* Bottom mobile nav */}
        <BottomNav current={screen} setCurrent={setScreen} role={role} />
      </div>
    </div>
  );
}
