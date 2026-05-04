import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { RoleProvider } from "@/excellence/RoleContext";

import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import NotFound from "./pages/NotFound";
import ExcellenceDashboard from "@/excellence/pages/Dashboard";
import AnalyticsPage from "@/excellence/pages/Analytics";
import {
  FrameworksPage, SelfAssessmentPage, EvidencesPage, GapsPage, ProjectsPage,
  MappingPage, IsoPage, DepartmentsPage, ReportsPage, AdvisorPage, BenchmarkPage,
  ExcellenceSettingsPage,
} from "@/excellence/pages/Placeholder";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <RoleProvider>
            <Routes>
              <Route path="/" element={<ExcellenceDashboard />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/reset-password" element={<ResetPassword />} />
              <Route path="/dashboard" element={<ExcellenceDashboard />} />
              <Route path="/frameworks" element={<FrameworksPage />} />
              <Route path="/self-assessment" element={<SelfAssessmentPage />} />
              <Route path="/evidences" element={<EvidencesPage />} />
              <Route path="/gaps" element={<GapsPage />} />
              <Route path="/projects" element={<ProjectsPage />} />
              <Route path="/mapping" element={<MappingPage />} />
              <Route path="/iso" element={<IsoPage />} />
              <Route path="/departments" element={<DepartmentsPage />} />
              <Route path="/reports" element={<ReportsPage />} />
              <Route path="/advisor" element={<AdvisorPage />} />
              <Route path="/benchmark" element={<BenchmarkPage />} />
              <Route path="/analytics" element={<AnalyticsPage />} />
              <Route path="/settings" element={<ExcellenceSettingsPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </RoleProvider>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
