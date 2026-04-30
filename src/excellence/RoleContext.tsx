import { createContext, useContext, useState, ReactNode } from "react";
import { AppRoleAr, allRoles } from "@/data/mockData";

type RoleContextType = {
  role: AppRoleAr;
  setRole: (r: AppRoleAr) => void;
  roles: AppRoleAr[];
  canEdit: boolean;
  canApprove: boolean;
  isExecutive: boolean;
  isAuditor: boolean;
};

const RoleContext = createContext<RoleContextType | undefined>(undefined);

export function RoleProvider({ children }: { children: ReactNode }) {
  const [role, setRole] = useState<AppRoleAr>("مدير إدارة الجودة والتميز");
  const canEdit = role !== "قيادة تنفيذية" && role !== "مدقق ISO";
  const canApprove = role === "مدير النظام" || role === "مدير إدارة الجودة والتميز" || role === "قيادة تنفيذية";
  const isExecutive = role === "قيادة تنفيذية";
  const isAuditor = role === "مدقق ISO";
  return (
    <RoleContext.Provider value={{ role, setRole, roles: allRoles, canEdit, canApprove, isExecutive, isAuditor }}>
      {children}
    </RoleContext.Provider>
  );
}

export const useRole = () => {
  const ctx = useContext(RoleContext);
  if (!ctx) throw new Error("useRole must be used within RoleProvider");
  return ctx;
};