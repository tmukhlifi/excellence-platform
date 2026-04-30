import { ReactNode, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useRole } from "@/excellence/RoleContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import {
  LayoutDashboard, FileBarChart, ClipboardCheck, FolderCheck, AlertTriangle, Lightbulb,
  Rocket, Network, Shield, Building2, FileText, Sparkles, BarChart3, Settings,
  Bell, Search, Menu, LogOut, UserCircle2, Award,
} from "lucide-react";

const navItems = [
  { to: "/dashboard", icon: LayoutDashboard, label: "لوحة القيادة" },
  { to: "/frameworks", icon: FileBarChart, label: "نماذج التقييم" },
  { to: "/self-assessment", icon: ClipboardCheck, label: "التقييم الذاتي" },
  { to: "/evidences", icon: FolderCheck, label: "الشواهد" },
  { to: "/gaps", icon: AlertTriangle, label: "الفجوات والفرص" },
  { to: "/projects", icon: Rocket, label: "مشاريع التحسين" },
  { to: "/mapping", icon: Network, label: "التكامل بين النماذج" },
  { to: "/iso", icon: Shield, label: "ISO و IMS" },
  { to: "/departments", icon: Building2, label: "الإدارات والملاك" },
  { to: "/reports", icon: FileText, label: "التقارير التنفيذية" },
  { to: "/advisor", icon: Sparkles, label: "المستشار الذكي" },
  { to: "/benchmark", icon: BarChart3, label: "المقارنة المعيارية" },
  { to: "/settings", icon: Settings, label: "الإعدادات" },
];

function SidebarContent({ onNavigate }: { onNavigate?: () => void }) {
  const { pathname } = useLocation();
  return (
    <div className="h-full flex flex-col bg-sidebar text-sidebar-foreground">
      <div className="px-5 py-5 border-b border-sidebar-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gold flex items-center justify-center shadow-md">
            <Award className="w-5 h-5 text-gold-foreground" />
          </div>
          <div>
            <h1 className="text-base font-bold text-sidebar-foreground leading-tight">منصة التميز</h1>
            <p className="text-xs text-sidebar-foreground/60">المؤسسي والجودة</p>
          </div>
        </div>
      </div>
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.to || (item.to !== "/dashboard" && pathname.startsWith(item.to));
          return (
            <Link
              key={item.to}
              to={item.to}
              onClick={onNavigate}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-md text-sm transition-all",
                isActive
                  ? "bg-sidebar-accent text-gold font-semibold border-r-2 border-gold"
                  : "text-sidebar-foreground/80 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
              )}
            >
              <item.icon className="w-4 h-4 shrink-0" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
      <div className="px-4 py-3 border-t border-sidebar-border text-[11px] text-sidebar-foreground/50">
        النسخة 1.0 - بيانات تجريبية
      </div>
    </div>
  );
}

export function ExcellenceLayout({ children }: { children: ReactNode }) {
  const { role, setRole, roles } = useRole();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background flex" dir="rtl">
      {/* Desktop sidebar */}
      <aside className="hidden lg:block w-64 shrink-0 border-l border-sidebar-border">
        <div className="fixed top-0 right-0 w-64 h-screen">
          <SidebarContent />
        </div>
      </aside>

      {/* Mobile sheet */}
      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetContent side="right" className="p-0 w-72">
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
              <span className="font-medium text-foreground">الجهة الحكومية</span>
              <span className="text-muted-foreground/50">/</span>
              <span>إدارة التميز المؤسسي</span>
            </div>
            <div className="flex-1" />
            <div className="hidden md:flex items-center gap-2 bg-muted/60 rounded-md px-3 h-9 w-72 border border-border">
              <Search className="w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="ابحث في المعايير، الشواهد، المشاريع..."
                className="border-0 bg-transparent h-8 px-0 focus-visible:ring-0 text-sm"
              />
            </div>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="w-5 h-5" />
              <Badge className="absolute -top-1 -left-1 h-4 min-w-4 px-1 text-[10px] bg-gold text-gold-foreground">5</Badge>
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="gap-2 px-2">
                  <UserCircle2 className="w-7 h-7 text-primary" />
                  <div className="hidden md:flex flex-col items-end leading-tight">
                    <span className="text-sm font-semibold text-foreground">د. عبدالرحمن السهلي</span>
                    <span className="text-[11px] text-muted-foreground">{role}</span>
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-64">
                <DropdownMenuLabel>تبديل الدور (تجريبي)</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {roles.map((r) => (
                  <DropdownMenuItem
                    key={r}
                    onClick={() => setRole(r)}
                    className={cn("text-sm", role === r && "bg-accent text-accent-foreground font-semibold")}
                  >
                    {r}
                  </DropdownMenuItem>
                ))}
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate("/settings")}>
                  <Settings className="w-4 h-4 ml-2" /> الإعدادات
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate("/")}>
                  <LogOut className="w-4 h-4 ml-2" /> تسجيل الخروج
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