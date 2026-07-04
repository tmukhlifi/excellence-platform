import { ReactNode, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useRole } from "@/excellence/RoleContext";
import { useI18n, useT } from "@/i18n/I18nProvider";
import { LanguageSwitcher } from "@/i18n/LanguageSwitcher";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import {
  LayoutDashboard, FileBarChart, ClipboardCheck, FolderCheck, AlertTriangle,
  Rocket, Network, Shield, Building2, FileText, Sparkles, BarChart3, Settings,
  Bell, Search, Menu, LogOut, UserCircle2, Award,
  Calendar, ClipboardList, ShieldCheck, Workflow, Activity, FileWarning,
  Wrench, CheckCircle2, ChevronDown,
} from "lucide-react";

import type { LucideIcon } from "lucide-react";

type NavItem = { to: string; icon: LucideIcon; label: string };

const navItems: NavItem[] = [
  { to: "/dashboard", icon: LayoutDashboard, label: "لوحة القيادة" },
  { to: "/frameworks", icon: FileBarChart, label: "نماذج التقييم" },
  { to: "/self-assessment", icon: ClipboardCheck, label: "التقييم الذاتي" },
  { to: "/evidences", icon: FolderCheck, label: "الشواهد" },
  { to: "/gaps", icon: AlertTriangle, label: "الفجوات والفرص" },
  { to: "/projects", icon: Rocket, label: "مشاريع التحسين" },
  { to: "/mapping", icon: Network, label: "التكامل بين النماذج" },
];

const isoAuditItems: NavItem[] = [
  { to: "/iso/program",            icon: Calendar,      label: "برنامج التدقيق السنوي" },
  { to: "/iso/plans",              icon: ClipboardList, label: "خطة التدقيق" },
  { to: "/iso/checklists",         icon: ShieldCheck,   label: "قوائم التحقق" },
  { to: "/iso/execution",          icon: Workflow,      label: "تنفيذ التدقيق" },
  { to: "/iso/results",            icon: Activity,      label: "نتائج التدقيق" },
  { to: "/iso/non-conformities",   icon: FileWarning,   label: "عدم المطابقة" },
  { to: "/iso/root-cause",         icon: Search,        label: "تحليل السبب الجذري" },
  { to: "/iso/corrective-actions", icon: Wrench,        label: "الإجراءات التصحيحية" },
  { to: "/iso/closure",            icon: CheckCircle2,  label: "التحقق من الفاعلية والإغلاق" },
];

const secondaryItems: NavItem[] = [
  { to: "/iso", icon: Shield, label: "ISO و IMS" },
  { to: "/departments", icon: Building2, label: "الإدارات والملاك" },
  { to: "/reports", icon: FileText, label: "التقارير التنفيذية" },
  { to: "/advisor", icon: Sparkles, label: "المستشار الذكي" },
  { to: "/benchmark", icon: BarChart3, label: "المقارنة المعيارية" },
  { to: "/analytics", icon: Network, label: "التحليلات التفاعلية" },
  { to: "/settings", icon: Settings, label: "الإعدادات" },
];

function SidebarContent({ onNavigate }: { onNavigate?: () => void }) {
  const { pathname } = useLocation();
  const t = useT();
  const inIsoAudit = pathname.startsWith("/iso/");
  const [isoOpen, setIsoOpen] = useState<boolean>(inIsoAudit);
  useEffect(() => { if (inIsoAudit) setIsoOpen(true); }, [inIsoAudit]);

  const renderItem = (item: NavItem) => {
    const isActive = pathname === item.to || (item.to !== "/dashboard" && pathname === item.to);
    return (
      <Link
        key={item.to}
        to={item.to}
        onClick={onNavigate}
        className={cn(
          "flex items-center gap-3 px-3 py-2.5 rounded-md text-sm transition-all",
          isActive
            ? "bg-sidebar-accent text-gold font-semibold ltr:border-l-2 rtl:border-r-2 border-gold"
            : "text-sidebar-foreground/80 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
        )}
      >
        <item.icon className="w-4 h-4 shrink-0" />
        <span>{t(item.label)}</span>
      </Link>
    );
  };

  return (
    <div className="h-full flex flex-col bg-sidebar text-sidebar-foreground">
      <div className="px-5 py-5 border-b border-sidebar-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gold flex items-center justify-center shadow-md">
            <Award className="w-5 h-5 text-gold-foreground" />
          </div>
          <div>
            <h1 className="text-base font-bold text-sidebar-foreground leading-tight">{t("منصة التميز")}</h1>
            <p className="text-xs text-sidebar-foreground/60">{t("المؤسسي والجودة")}</p>
          </div>
        </div>
      </div>
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
        {navItems.map(renderItem)}

        {/* ISO Audit group */}
        <div className="pt-2">
          <button
            onClick={() => setIsoOpen(o => !o)}
            className={cn(
              "w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-sm transition-all",
              inIsoAudit
                ? "bg-sidebar-accent/70 text-gold font-semibold"
                : "text-sidebar-foreground/80 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
            )}
          >
            <ShieldCheck className="w-4 h-4 shrink-0" />
            <span className="flex-1 text-start">{t("التدقيق الداخلي ISO")}</span>
            <ChevronDown className={cn("w-3.5 h-3.5 transition", isoOpen ? "" : "-rotate-90")} />
          </button>
          {isoOpen && (
            <div className="mt-1 ltr:ml-3 rtl:mr-3 ltr:pl-2 rtl:pr-2 ltr:border-l rtl:border-r border-sidebar-border/50 space-y-0.5">
              {isoAuditItems.map((item, i) => {
                const isActive = pathname === item.to;
                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    onClick={onNavigate}
                    className={cn(
                      "flex items-center gap-2 px-2.5 py-1.5 rounded-md text-[12px] transition-all",
                      isActive
                        ? "bg-gold/15 text-gold font-semibold"
                        : "text-sidebar-foreground/70 hover:bg-sidebar-accent/40 hover:text-sidebar-foreground"
                    )}
                  >
                    <span className={cn(
                      "w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-bold shrink-0",
                      isActive ? "bg-gold text-gold-foreground" : "bg-sidebar-foreground/15"
                    )}>{i + 1}</span>
                    <span className="truncate">{t(item.label)}</span>
                  </Link>
                );
              })}
            </div>
          )}
        </div>

        <div className="pt-2 mt-2 border-t border-sidebar-border/30">
          {secondaryItems.map(renderItem)}
        </div>
      </nav>
      <div className="px-4 py-3 border-t border-sidebar-border text-[11px] text-sidebar-foreground/50">
        {t("النسخة 1.1 - بيانات تجريبية")}
      </div>
    </div>
  );
}

export function ExcellenceLayout({ children }: { children: ReactNode }) {
  const { role, setRole, roles } = useRole();
  const { dir } = useI18n();
  const t = useT();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background flex" dir={dir}>
      {/* Desktop sidebar */}
      <aside className={cn("hidden lg:block w-64 shrink-0", dir === "rtl" ? "border-l" : "border-r", "border-sidebar-border")}>
        <div className={cn("fixed top-0 w-64 h-screen", dir === "rtl" ? "right-0" : "left-0")}>
          <SidebarContent />
        </div>
      </aside>

      {/* Mobile sheet */}
      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetContent side={dir === "rtl" ? "right" : "left"} className="p-0 w-72">
          <SidebarContent onNavigate={() => setMobileOpen(false)} />
        </SheetContent>
      </Sheet>

      <div className="flex-1 min-w-0">
        {/* Top bar */}
        <header className="sticky top-0 z-30 bg-card/95 backdrop-blur border-b border-border">
          <div className="flex items-center gap-3 px-4 lg:px-6 h-14">
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setMobileOpen(true)}
            >
              <Menu className="w-5 h-5" />
            </Button>
            <div className="hidden md:flex items-center gap-2 text-xs text-muted-foreground">
              <Building2 className="w-4 h-4 text-primary" />
              <span className="font-medium text-foreground">{t("الجهة الحكومية")}</span>
              <span className="text-muted-foreground/50">/</span>
              <span>{t("إدارة التميز المؤسسي")}</span>
            </div>
            <div className="flex-1" />
            <div className="hidden md:flex items-center gap-2 bg-muted/60 rounded-md px-3 h-9 w-72 border border-border">
              <Search className="w-4 h-4 text-muted-foreground" />
              <Input
                placeholder={t("ابحث في المعايير، الشواهد، المشاريع...")}
                className="border-0 bg-transparent h-8 px-0 focus-visible:ring-0 text-sm"
              />
            </div>
            <LanguageSwitcher />
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="w-5 h-5" />
              <Badge className={cn("absolute -top-1 h-4 min-w-4 px-1 text-[10px] bg-gold text-gold-foreground", dir === "rtl" ? "-left-1" : "-right-1")}>5</Badge>
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="gap-2 px-2">
                  <UserCircle2 className="w-7 h-7 text-primary" />
                  <div className="hidden md:flex flex-col items-end leading-tight">
                    <span className="text-sm font-semibold text-foreground">{t("د. عبدالرحمن السهلي")}</span>
                    <span className="text-[11px] text-muted-foreground">{t(role)}</span>
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-64">
                <DropdownMenuLabel>{t("تبديل الدور (تجريبي)")}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {roles.map((r) => (
                  <DropdownMenuItem
                    key={r}
                    onClick={() => setRole(r)}
                    className={cn("text-sm", role === r && "bg-accent text-accent-foreground font-semibold")}
                  >
                    {t(r)}
                  </DropdownMenuItem>
                ))}
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate("/settings")}>
                  <Settings className={cn("w-4 h-4", dir === "rtl" ? "ml-2" : "mr-2")} /> {t("الإعدادات")}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate("/")}>
                  <LogOut className={cn("w-4 h-4", dir === "rtl" ? "ml-2" : "mr-2")} /> {t("تسجيل الخروج")}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        <main className="p-4 lg:p-6 max-w-[1600px] mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}