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
  FrameworksPage, EvidencesPage, GapsPage, ProjectsPage,
  MappingPage, IsoPage, DepartmentsPage, ReportsPage, AdvisorPage, BenchmarkPage,
  ExcellenceSettingsPage,
} from "@/excellence/pages/Placeholder";
import SelfAssessmentPage from "@/excellence/pages/SelfAssessment";
import {
  AuditProgramPage, AuditPlanPage, ChecklistsPageV2, AuditExecutionPageV2,
  AuditResultsPageV2, NonConformitiesPageV2, RootCauseAnalysisPage,
  CorrectiveActionsPage, AuditClosurePage,
} from "@/excellence/pages/AuditPages";

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
              <Route path="/iso/program" element={<AuditProgramPage />} />
              <Route path="/iso/plans" element={<AuditPlanPage />} />
              <Route path="/iso/checklists" element={<ChecklistsPageV2 />} />
              <Route path="/iso/execution" element={<AuditExecutionPageV2 />} />
              <Route path="/iso/results" element={<AuditResultsPageV2 />} />
              <Route path="/iso/non-conformities" element={<NonConformitiesPageV2 />} />
              <Route path="/iso/root-cause" element={<RootCauseAnalysisPage />} />
              <Route path="/iso/corrective-actions" element={<CorrectiveActionsPage />} />
              <Route path="/iso/closure" element={<AuditClosurePage />} />
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
