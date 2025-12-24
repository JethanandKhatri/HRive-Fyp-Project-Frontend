import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Main Pages
import Dashboard from "./pages/Dashboard";
import Recruitment from "./pages/Recruitment";
import CreateJob from "./pages/CreateJob";
import Applicants from "./pages/Applicants";
import CoreHR from "./pages/CoreHR";
import Attendance from "./pages/Attendance";
import Leave from "./pages/Leave";
import Payroll from "./pages/Payroll";
import CognitiveAI from "./pages/CognitiveAI";
import Analytics from "./pages/Analytics";
import AskHR from "./pages/AskHR";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

// Auth Pages
import SignIn from "./pages/auth/SignIn";
import SignUp from "./pages/auth/SignUp";
import ForgotPassword from "./pages/auth/ForgotPassword";
import SelectRole from "./pages/auth/SelectRole";

// ATS Pages
import Pipeline from "./pages/recruitment/Pipeline";
import JobDetail from "./pages/recruitment/JobDetail";
import Interviews from "./pages/recruitment/Interviews";
import Offers from "./pages/recruitment/Offers";
import Team from "./pages/recruitment/Team";

// Admin Pages
import AdminDashboard from "./pages/admin/AdminDashboard";
import Organization from "./pages/admin/Organization";
import UserManagement from "./pages/admin/UserManagement";
import RolesPermissions from "./pages/admin/RolesPermissions";
import Modules from "./pages/admin/Modules";
import Compliance from "./pages/admin/Compliance";
import AuditLogs from "./pages/admin/AuditLogs";
import AdminSettings from "./pages/admin/AdminSettings";

// Line Manager Pages
import ManagerDashboard from "./pages/manager/ManagerDashboard";
import MyTeam from "./pages/manager/MyTeam";
import TeamAttendance from "./pages/manager/TeamAttendance";
import LeaveApprovals from "./pages/manager/LeaveApprovals";
import ManagerInterviews from "./pages/manager/ManagerInterviews";
import TeamInsights from "./pages/manager/TeamInsights";
import ManagerAskHR from "./pages/manager/ManagerAskHR";
import ManagerSettings from "./pages/manager/ManagerSettings";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Auth Routes */}
          <Route path="/auth/signin" element={<SignIn />} />
          <Route path="/auth/signup" element={<SignUp />} />
          <Route path="/auth/forgot-password" element={<ForgotPassword />} />
          <Route path="/auth/select-role" element={<SelectRole />} />
          
          {/* Main App Routes */}
          <Route path="/" element={<Dashboard />} />
          <Route path="/core-hr" element={<CoreHR />} />
          <Route path="/attendance" element={<Attendance />} />
          <Route path="/leave" element={<Leave />} />
          <Route path="/payroll" element={<Payroll />} />
          <Route path="/cognitive-ai" element={<CognitiveAI />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/ask-hr" element={<AskHR />} />
          <Route path="/settings" element={<Settings />} />
          
          {/* Recruitment / ATS Routes */}
          <Route path="/recruitment" element={<Recruitment />} />
          <Route path="/recruitment/new-job" element={<CreateJob />} />
          <Route path="/recruitment/job/:jobId" element={<JobDetail />} />
          <Route path="/recruitment/job/:jobId/applicants" element={<Applicants />} />
          <Route path="/recruitment/pipeline" element={<Pipeline />} />
          <Route path="/recruitment/interviews" element={<Interviews />} />
          <Route path="/recruitment/offers" element={<Offers />} />
          <Route path="/recruitment/team" element={<Team />} />
          
          {/* Admin Portal Routes */}
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/organization" element={<Organization />} />
          <Route path="/admin/users" element={<UserManagement />} />
          <Route path="/admin/roles" element={<RolesPermissions />} />
          <Route path="/admin/modules" element={<Modules />} />
          <Route path="/admin/compliance" element={<Compliance />} />
          <Route path="/admin/audit-logs" element={<AuditLogs />} />
          <Route path="/admin/settings" element={<AdminSettings />} />
          
          {/* Line Manager Portal Routes */}
          <Route path="/manager" element={<ManagerDashboard />} />
          <Route path="/manager/team" element={<MyTeam />} />
          <Route path="/manager/attendance" element={<TeamAttendance />} />
          <Route path="/manager/leave" element={<LeaveApprovals />} />
          <Route path="/manager/interviews" element={<ManagerInterviews />} />
          <Route path="/manager/insights" element={<TeamInsights />} />
          <Route path="/manager/ask-hr" element={<ManagerAskHR />} />
          <Route path="/manager/settings" element={<ManagerSettings />} />
          
          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;