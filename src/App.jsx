import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";

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

// Employee Pages
import EmployeeDashboard from "./pages/employee/EmployeeDashboard";
import EmployeeAttendance from "./pages/employee/EmployeeAttendance";
import EmployeeLeave from "./pages/employee/EmployeeLeave";
import EmployeePayslips from "./pages/employee/EmployeePayslips";
import EmployeeAnnouncements from "./pages/employee/EmployeeAnnouncements";
import EmployeeAskHR from "./pages/employee/EmployeeAskHR";
import EmployeeSettings from "./pages/employee/EmployeeSettings";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            {/* Auth Routes */}
            <Route path="/auth/login" element={<SignIn />} />
            
            {/* Auth Landing */}
            <Route path="/" element={<Navigate to="/auth/login" replace />} />

            {/* HR Manager Portal Routes */}
            {/* Admin Portal Routes */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/organization"
              element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <Organization />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/users"
              element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <UserManagement />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/roles"
              element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <RolesPermissions />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/modules"
              element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <Modules />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/compliance"
              element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <Compliance />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/audit-logs"
              element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <AuditLogs />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/settings"
              element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <AdminSettings />
                </ProtectedRoute>
              }
            />

            {/* Legacy Admin Routes */}
            <Route path="/admin" element={<Navigate to="/dashboard" replace />} />
            <Route path="/admin/organization" element={<Navigate to="/dashboard/organization" replace />} />
            <Route path="/admin/users" element={<Navigate to="/dashboard/users" replace />} />
            <Route path="/admin/roles" element={<Navigate to="/dashboard/roles" replace />} />
            <Route path="/admin/modules" element={<Navigate to="/dashboard/modules" replace />} />
            <Route path="/admin/compliance" element={<Navigate to="/dashboard/compliance" replace />} />
            <Route path="/admin/audit-logs" element={<Navigate to="/dashboard/audit-logs" replace />} />
            <Route path="/admin/settings" element={<Navigate to="/dashboard/settings" replace />} />

            {/* HR Manager Portal Routes */}
            <Route
              path="/hr/dashboard"
              element={
                <ProtectedRoute allowedRoles={["hr_manager"]}>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/hr/core-hr"
              element={
                <ProtectedRoute allowedRoles={["hr_manager"]}>
                  <CoreHR />
                </ProtectedRoute>
              }
            />
            <Route
              path="/hr/attendance"
              element={
                <ProtectedRoute allowedRoles={["hr_manager"]}>
                  <Attendance />
                </ProtectedRoute>
              }
            />
            <Route
              path="/hr/leave"
              element={
                <ProtectedRoute allowedRoles={["hr_manager"]}>
                  <Leave />
                </ProtectedRoute>
              }
            />
            <Route
              path="/hr/payroll"
              element={
                <ProtectedRoute allowedRoles={["hr_manager"]}>
                  <Payroll />
                </ProtectedRoute>
              }
            />
            <Route
              path="/hr/cognitive-ai"
              element={
                <ProtectedRoute allowedRoles={["hr_manager"]}>
                  <CognitiveAI />
                </ProtectedRoute>
              }
            />
            <Route
              path="/hr/analytics"
              element={
                <ProtectedRoute allowedRoles={["hr_manager"]}>
                  <Analytics />
                </ProtectedRoute>
              }
            />
            <Route
              path="/hr/ask-hr"
              element={
                <ProtectedRoute allowedRoles={["hr_manager"]}>
                  <AskHR />
                </ProtectedRoute>
              }
            />
            <Route
              path="/hr/settings"
              element={
                <ProtectedRoute allowedRoles={["hr_manager"]}>
                  <Settings />
                </ProtectedRoute>
              }
            />
            
            {/* Recruitment / ATS Routes */}
            <Route
              path="/hr/recruitment"
              element={
                <ProtectedRoute allowedRoles={["hr_manager"]}>
                  <Recruitment />
                </ProtectedRoute>
              }
            />
            <Route
              path="/hr/recruitment/new-job"
              element={
                <ProtectedRoute allowedRoles={["hr_manager"]}>
                  <CreateJob />
                </ProtectedRoute>
              }
            />
            <Route
              path="/hr/recruitment/job/:jobId"
              element={
                <ProtectedRoute allowedRoles={["hr_manager"]}>
                  <JobDetail />
                </ProtectedRoute>
              }
            />
            <Route
              path="/hr/recruitment/job/:jobId/applicants"
              element={
                <ProtectedRoute allowedRoles={["hr_manager"]}>
                  <Applicants />
                </ProtectedRoute>
              }
            />
            <Route
              path="/hr/recruitment/pipeline"
              element={
                <ProtectedRoute allowedRoles={["hr_manager"]}>
                  <Pipeline />
                </ProtectedRoute>
              }
            />
            <Route
              path="/hr/recruitment/interviews"
              element={
                <ProtectedRoute allowedRoles={["hr_manager"]}>
                  <Interviews />
                </ProtectedRoute>
              }
            />
            <Route
              path="/hr/recruitment/offers"
              element={
                <ProtectedRoute allowedRoles={["hr_manager"]}>
                  <Offers />
                </ProtectedRoute>
              }
            />
            <Route
              path="/hr/recruitment/team"
              element={
                <ProtectedRoute allowedRoles={["hr_manager"]}>
                  <Team />
                </ProtectedRoute>
              }
            />

            {/* Legacy HR Manager Routes */}
            <Route path="/core-hr" element={<Navigate to="/hr/core-hr" replace />} />
            <Route path="/attendance" element={<Navigate to="/hr/attendance" replace />} />
            <Route path="/leave" element={<Navigate to="/hr/leave" replace />} />
            <Route path="/payroll" element={<Navigate to="/hr/payroll" replace />} />
            <Route path="/cognitive-ai" element={<Navigate to="/hr/cognitive-ai" replace />} />
            <Route path="/analytics" element={<Navigate to="/hr/analytics" replace />} />
            <Route path="/ask-hr" element={<Navigate to="/hr/ask-hr" replace />} />
            <Route path="/settings" element={<Navigate to="/hr/settings" replace />} />
            <Route path="/recruitment" element={<Navigate to="/hr/recruitment" replace />} />
            <Route path="/recruitment/new-job" element={<Navigate to="/hr/recruitment/new-job" replace />} />
            <Route path="/recruitment/job/:jobId" element={<Navigate to="/hr/recruitment/job/:jobId" replace />} />
            <Route path="/recruitment/job/:jobId/applicants" element={<Navigate to="/hr/recruitment/job/:jobId/applicants" replace />} />
            <Route path="/recruitment/pipeline" element={<Navigate to="/hr/recruitment/pipeline" replace />} />
            <Route path="/recruitment/interviews" element={<Navigate to="/hr/recruitment/interviews" replace />} />
            <Route path="/recruitment/offers" element={<Navigate to="/hr/recruitment/offers" replace />} />
            <Route path="/recruitment/team" element={<Navigate to="/hr/recruitment/team" replace />} />
            
            {/* Line Manager Portal Routes */}
            <Route
              path="/manager"
              element={
                <ProtectedRoute allowedRoles={["line_manager"]}>
                  <ManagerDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/manager/team"
              element={
                <ProtectedRoute allowedRoles={["line_manager"]}>
                  <MyTeam />
                </ProtectedRoute>
              }
            />
            <Route
              path="/manager/attendance"
              element={
                <ProtectedRoute allowedRoles={["line_manager"]}>
                  <TeamAttendance />
                </ProtectedRoute>
              }
            />
            <Route
              path="/manager/leave"
              element={
                <ProtectedRoute allowedRoles={["line_manager"]}>
                  <LeaveApprovals />
                </ProtectedRoute>
              }
            />
            <Route
              path="/manager/interviews"
              element={
                <ProtectedRoute allowedRoles={["line_manager"]}>
                  <ManagerInterviews />
                </ProtectedRoute>
              }
            />
            <Route
              path="/manager/insights"
              element={
                <ProtectedRoute allowedRoles={["line_manager"]}>
                  <TeamInsights />
                </ProtectedRoute>
              }
            />
            <Route
              path="/manager/ask-hr"
              element={
                <ProtectedRoute allowedRoles={["line_manager"]}>
                  <ManagerAskHR />
                </ProtectedRoute>
              }
            />
            <Route
              path="/manager/settings"
              element={
                <ProtectedRoute allowedRoles={["line_manager"]}>
                  <ManagerSettings />
                </ProtectedRoute>
              }
            />
            
            {/* Employee Portal Routes */}
            <Route
              path="/employee"
              element={
                <ProtectedRoute allowedRoles={["employee"]}>
                  <EmployeeDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/employee/attendance"
              element={
                <ProtectedRoute allowedRoles={["employee"]}>
                  <EmployeeAttendance />
                </ProtectedRoute>
              }
            />
            <Route
              path="/employee/leave"
              element={
                <ProtectedRoute allowedRoles={["employee"]}>
                  <EmployeeLeave />
                </ProtectedRoute>
              }
            />
            <Route
              path="/employee/payslips"
              element={
                <ProtectedRoute allowedRoles={["employee"]}>
                  <EmployeePayslips />
                </ProtectedRoute>
              }
            />
            <Route
              path="/employee/announcements"
              element={
                <ProtectedRoute allowedRoles={["employee"]}>
                  <EmployeeAnnouncements />
                </ProtectedRoute>
              }
            />
            <Route
              path="/employee/ask-hr"
              element={
                <ProtectedRoute allowedRoles={["employee"]}>
                  <EmployeeAskHR />
                </ProtectedRoute>
              }
            />
            <Route
              path="/employee/settings"
              element={
                <ProtectedRoute allowedRoles={["employee"]}>
                  <EmployeeSettings />
                </ProtectedRoute>
              }
            />
            
            {/* 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;



