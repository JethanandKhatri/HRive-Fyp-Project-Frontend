import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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
import SignIn from "./pages/auth/SignIn";
import SignUp from "./pages/auth/SignUp";
import ForgotPassword from "./pages/auth/ForgotPassword";
import SelectRole from "./pages/auth/SelectRole";

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
          
          {/* App Routes */}
          <Route path="/" element={<Dashboard />} />
          <Route path="/recruitment" element={<Recruitment />} />
          <Route path="/recruitment/new-job" element={<CreateJob />} />
          <Route path="/recruitment/job/:jobId/applicants" element={<Applicants />} />
          <Route path="/core-hr" element={<CoreHR />} />
          <Route path="/attendance" element={<Attendance />} />
          <Route path="/leave" element={<Leave />} />
          <Route path="/payroll" element={<Payroll />} />
          <Route path="/cognitive-ai" element={<CognitiveAI />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/ask-hr" element={<AskHR />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;