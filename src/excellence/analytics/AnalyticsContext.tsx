import { createContext, ReactNode, useContext, useMemo, useState } from "react";
import {
  departments, frameworks, criteria, gaps, projects, evidences, improvements,
} from "@/data/mockData";

export type AnalyticsFilters = {
  frameworkIds: string[];
  departmentIds: string[];
  criterionIds: string[];
  gapPriority: string[]; // حرجة | عالية | متوسطة | منخفضة
  projectStatus: string[];
  period: "all" | "q1" | "q2" | "h1" | "year";
  relationType: "all" | "ownership" | "contribution" | "evidence";
};

const defaultFilters: AnalyticsFilters = {
  frameworkIds: [],
  departmentIds: [],
  criterionIds: [],
  gapPriority: [],
  projectStatus: [],
  period: "all",
  relationType: "all",
};

type Ctx = {
  filters: AnalyticsFilters;
  setFilters: (f: AnalyticsFilters) => void;
  reset: () => void;
  selectedNodeId: string | null;
  setSelectedNodeId: (id: string | null) => void;
  filtered: ReturnType<typeof computeFiltered>;
};

function computeFiltered(f: AnalyticsFilters) {
  const matchFw = (id?: string) => !f.frameworkIds.length || (id ? f.frameworkIds.includes(id) : false);
  const matchFwArr = (ids?: string[]) => !f.frameworkIds.length || (ids || []).some(i => f.frameworkIds.includes(i));
  const matchDept = (id?: string) => !f.departmentIds.length || (id ? f.departmentIds.includes(id) : false);
  const matchCri = (ids?: string[]) => !f.criterionIds.length || (ids || []).some(i => f.criterionIds.includes(i));

  const fFrameworks = frameworks.filter(x => !f.frameworkIds.length || f.frameworkIds.includes(x.id));
  const fDepartments = departments.filter(x => !f.departmentIds.length || f.departmentIds.includes(x.id));
  const fCriteria = criteria.filter(x =>
    matchFw(x.frameworkId) && (matchDept(x.ownerDeptId) || x.contributorDeptIds.some(matchDept))
    && (!f.criterionIds.length || f.criterionIds.includes(x.id))
  );
  const fGaps = gaps.filter(x =>
    matchFw(x.frameworkId) && matchDept(x.ownerDeptId) && matchCri(x.criterionIds)
    && (!f.gapPriority.length || f.gapPriority.includes(x.priority))
  );
  const fImprovements = improvements.filter(x =>
    matchFw(x.frameworkId) && matchDept(x.ownerDeptId) && matchCri(x.criterionIds)
  );
  const fProjects = projects.filter(x =>
    matchFwArr(x.frameworkIds) && (matchDept(x.ownerDeptId) || x.contributorDeptIds.some(matchDept))
    && matchCri(x.criterionIds)
    && (!f.projectStatus.length || f.projectStatus.includes(x.status))
  );
  const fEvidences = evidences.filter(x =>
    matchFwArr(x.frameworkIds) && matchDept(x.ownerDeptId) && matchCri(x.criterionIds)
  );

  return {
    frameworks: fFrameworks, departments: fDepartments, criteria: fCriteria,
    gaps: fGaps, improvements: fImprovements, projects: fProjects, evidences: fEvidences,
  };
}

const AnalyticsCtx = createContext<Ctx | null>(null);

export function AnalyticsProvider({ children }: { children: ReactNode }) {
  const [filters, setFilters] = useState<AnalyticsFilters>(defaultFilters);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const filtered = useMemo(() => computeFiltered(filters), [filters]);
  return (
    <AnalyticsCtx.Provider value={{
      filters, setFilters, reset: () => setFilters(defaultFilters),
      selectedNodeId, setSelectedNodeId, filtered,
    }}>{children}</AnalyticsCtx.Provider>
  );
}

export function useAnalytics() {
  const ctx = useContext(AnalyticsCtx);
  if (!ctx) throw new Error("useAnalytics must be inside AnalyticsProvider");
  return ctx;
}

// Category color palette (reusable)
export const CATEGORY_COLORS: Record<string, string> = {
  framework: "hsl(158 55% 22%)",
  criterion: "hsl(210 75% 45%)",
  subcriterion: "hsl(195 70% 50%)",
  evidence: "hsl(42 75% 52%)",
  gap: "hsl(0 70% 50%)",
  improvement: "hsl(280 55% 50%)",
  project: "hsl(152 60% 35%)",
  department: "hsl(25 75% 50%)",
};

export const CATEGORY_LABELS: Record<string, string> = {
  framework: "نموذج",
  criterion: "معيار رئيسي",
  subcriterion: "معيار فرعي",
  evidence: "شاهد",
  gap: "فجوة",
  improvement: "فرصة تحسين",
  project: "مشروع تحسين",
  department: "إدارة",
};