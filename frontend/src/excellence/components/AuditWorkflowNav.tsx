import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useT } from "@/i18n/I18nProvider";
import {
  Calendar, ClipboardList, ShieldCheck, Workflow, Activity,
  FileWarning, Search, Wrench, CheckCircle2, ChevronLeft, ChevronRight, Check,
} from "lucide-react";

export const AUDIT_STAGES = [
  { id: 1, key: "program",            label: "برنامج التدقيق السنوي",      to: "/iso/program",            icon: Calendar },
  { id: 2, key: "plans",              label: "خطة التدقيق",                 to: "/iso/plans",              icon: ClipboardList },
  { id: 3, key: "checklists",         label: "قوائم التحقق",                to: "/iso/checklists",         icon: ShieldCheck },
  { id: 4, key: "execution",          label: "تنفيذ التدقيق",               to: "/iso/execution",          icon: Workflow },
  { id: 5, key: "results",            label: "نتائج التدقيق",               to: "/iso/results",            icon: Activity },
  { id: 6, key: "non-conformities",   label: "عدم المطابقة",                to: "/iso/non-conformities",   icon: FileWarning },
  { id: 7, key: "root-cause",         label: "تحليل السبب الجذري",          to: "/iso/root-cause",         icon: Search },
  { id: 8, key: "corrective-actions", label: "الإجراءات التصحيحية",         to: "/iso/corrective-actions", icon: Wrench },
  { id: 9, key: "closure",            label: "التحقق من الفاعلية والإغلاق", to: "/iso/closure",            icon: CheckCircle2 },
] as const;

export type AuditStageKey = typeof AUDIT_STAGES[number]["key"];

export function AuditWorkflowNav({ current }: { current: AuditStageKey }) {
  const t = useT();
  const idx = AUDIT_STAGES.findIndex(s => s.key === current);
  return (
    <div className="bg-card border border-border rounded-lg p-3 mb-4 shadow-sm">
      <div className="flex items-center justify-between mb-2.5">
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-bold text-primary bg-primary/10 px-2 py-0.5 rounded">
            {t("مسار التدقيق الداخلي ISO")}
          </span>
          <span className="text-[11px] text-muted-foreground">
            {t("المرحلة")} {idx + 1} {t("من")} {AUDIT_STAGES.length}
          </span>
        </div>
        <div className="text-[11px] text-muted-foreground hidden md:block">
          {t("من برنامج التدقيق السنوي إلى الإغلاق")}
        </div>
      </div>
      <div className="flex items-stretch gap-1 overflow-x-auto pb-1">
        {AUDIT_STAGES.map((s, i) => {
          const done = i < idx;
          const active = i === idx;
          const Icon = s.icon;
          return (
            <Link
              key={s.key}
              to={s.to}
              className={cn(
                "flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-[11px] border whitespace-nowrap transition-all shrink-0",
                done && "bg-success/10 text-success border-success/30 hover:bg-success/20",
                active && "bg-primary text-primary-foreground border-primary font-bold shadow-sm",
                !done && !active && "bg-muted/40 text-muted-foreground border-border hover:bg-muted hover:text-foreground"
              )}
            >
              <span className={cn(
                "w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-bold shrink-0",
                done && "bg-success text-success-foreground",
                active && "bg-primary-foreground text-primary",
                !done && !active && "bg-muted-foreground/20"
              )}>
                {done ? <Check className="w-2.5 h-2.5" /> : s.id}
              </span>
              <Icon className="w-3 h-3" />
              <span>{t(s.label)}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export function AuditStageActions({ current }: { current: AuditStageKey }) {
  const t = useT();
  const idx = AUDIT_STAGES.findIndex(s => s.key === current);
  const prev = idx > 0 ? AUDIT_STAGES[idx - 1] : null;
  const next = idx < AUDIT_STAGES.length - 1 ? AUDIT_STAGES[idx + 1] : null;
  return (
    <div className="mt-6 pt-4 border-t border-border flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2">
      <div>
        {prev ? (
          <Button asChild variant="outline" className="gap-1 w-full sm:w-auto">
            <Link to={prev.to}>
              <ChevronRight className="w-4 h-4" />
              <span className="text-xs">{t("المرحلة السابقة:")}</span>
              <span className="font-semibold text-xs">{t(prev.label)}</span>
            </Link>
          </Button>
        ) : (
          <div className="text-[11px] text-muted-foreground px-2">{t("— بداية المسار —")}</div>
        )}
      </div>
      <div className="text-[11px] text-muted-foreground text-center hidden sm:block">
        {t("المرحلة الحالية:")} <b className="text-foreground">{t(AUDIT_STAGES[idx].label)}</b>
      </div>
      <div>
        {next ? (
          <Button asChild className="gap-1 w-full sm:w-auto">
            <Link to={next.to}>
              <span className="text-xs">{t("المرحلة التالية:")}</span>
              <span className="font-semibold text-xs">{t(next.label)}</span>
              <ChevronLeft className="w-4 h-4" />
            </Link>
          </Button>
        ) : (
          <Button variant="outline" disabled className="gap-1 w-full sm:w-auto">
            <CheckCircle2 className="w-4 h-4 text-success" />
            <span className="text-xs">{t("اكتمل مسار التدقيق")}</span>
          </Button>
        )}
      </div>
    </div>
  );
}

/** Cross-module quick links shown at the top of every audit page */
export function AuditCrossLinks() {
  const t = useT();
  const links = [
    { to: "/dashboard",    label: "لوحة القيادة",          color: "bg-primary/10 text-primary border-primary/30" },
    { to: "/evidences",    label: "الشواهد",                color: "bg-info/10 text-info border-info/30" },
    { to: "/gaps",         label: "فرص التحسين",            color: "bg-gold/10 text-gold border-gold/30" },
    { to: "/projects",     label: "مشاريع التحسين",         color: "bg-success/10 text-success border-success/30" },
  ];
  return (
    <div className="flex flex-wrap gap-1.5 mb-3">
      <span className="text-[11px] text-muted-foreground self-center ml-1">{t("روابط متصلة:")}</span>
      {links.map(l => (
        <Link
          key={l.to}
          to={l.to}
          className={cn("text-[11px] px-2 py-0.5 rounded-full border hover:opacity-80 transition", l.color)}
        >
          {t(l.label)}
        </Link>
      ))}
    </div>
  );
}
