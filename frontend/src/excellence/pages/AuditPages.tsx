import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ExcellenceLayout } from "@/excellence/components/ExcellenceLayout";
import { PageHeader } from "@/excellence/components/PageHeader";
import { SectionCard } from "@/excellence/components/SectionCard";
import { StatusBadge } from "@/excellence/components/StatusBadge";
import { StatCard } from "@/excellence/components/StatCard";
import { ProgressBar } from "@/excellence/components/ProgressBar";
import { Breadcrumb } from "@/excellence/components/WorkflowStepper";
import {
  AuditWorkflowNav, AuditStageActions, AuditCrossLinks,
} from "@/excellence/components/AuditWorkflowNav";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import {
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid,
  PieChart, Pie, Cell, LineChart, Line, Legend,
} from "recharts";
import {
  Calendar, ClipboardList, ShieldCheck, Workflow, Activity, FileWarning,
  Search, Wrench, CheckCircle2, AlertOctagon, Plus, Download, Filter,
  TrendingUp, Target, Users, FileText, ArrowLeft, Lightbulb, Rocket,
  ChevronDown, Eye,
} from "lucide-react";
import {
  auditPlans, auditEngagements, checklistItems, correctiveActions,
  workflowStates,
} from "@/data/mockDataExtended";
import {
  departments, frameworks, getDept, getFramework, nonconformities, evidences,
  improvements, projects,
} from "@/data/mockData";

/* ===================================================================
 * Stage 1: Annual Audit Program (برنامج التدقيق السنوي)
 * =================================================================*/
export function AuditProgramPage() {
  const [yearFilter, setYearFilter] = useState("2026");
  const [statusFilter, setStatusFilter] = useState("الكل");
  const [fwFilter, setFwFilter] = useState("الكل");

  const filtered = auditPlans.filter(p =>
    String(p.year) === yearFilter &&
    (statusFilter === "الكل" || p.status === statusFilter) &&
    (fwFilter === "الكل" || p.isoFrameworkId === fwFilter)
  );

  const totalEngagements = auditEngagements.length;
  const completedEng = auditEngagements.filter(e => e.status === "مكتمل").length;
  const inProgressEng = auditEngagements.filter(e => e.status === "قيد التنفيذ").length;

  return (
    <ExcellenceLayout>
      <Breadcrumb items={[
        { label: "الرئيسية", href: "/" },
        { label: "التدقيق الداخلي ISO" },
        { label: "برنامج التدقيق السنوي" },
      ]} />
      <PageHeader
        title="برنامج التدقيق السنوي"
        subtitle="إدارة برنامج التدقيق الداخلي السنوي لمعايير ISO المعتمدة"
        icon={Calendar}
        actions={
          <>
            <Button variant="outline" className="gap-2" onClick={() => toast.success("تم تصدير البرنامج السنوي")}>
              <Download className="w-4 h-4" /> تصدير
            </Button>
            <Button className="gap-2" onClick={() => toast.success("تم فتح نموذج إضافة عملية تدقيق")}>
              <Plus className="w-4 h-4" /> عملية تدقيق جديدة
            </Button>
          </>
        }
      />
      <AuditCrossLinks />
      <AuditWorkflowNav current="program" />

      <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-3 mb-4">
        <StatCard label="إجمالي العمليات" value={auditPlans.length} icon={Calendar} accent="primary" />
        <StatCard label="مخططة" value={auditPlans.filter(a => a.status === "مخطط").length} icon={ClipboardList} accent="info" />
        <StatCard label="قيد التنفيذ" value={auditPlans.filter(a => a.status === "قيد التنفيذ").length} icon={Activity} accent="warning" />
        <StatCard label="مكتملة" value={auditPlans.filter(a => a.status === "مكتمل").length} icon={CheckCircle2} accent="success" />
        <StatCard label="معايير ISO المغطاة" value={4} icon={ShieldCheck} accent="gold" />
      </div>

      {/* Filters */}
      <div className="bg-card border border-border rounded-lg p-3 mb-4 flex flex-wrap items-end gap-3">
        <div className="flex-1 min-w-[140px]">
          <Label className="text-[11px] text-muted-foreground mb-1 block">السنة</Label>
          <Select value={yearFilter} onValueChange={setYearFilter}>
            <SelectTrigger className="h-9 text-xs"><SelectValue /></SelectTrigger>
            <SelectContent>
              {["2024","2025","2026","2027"].map(y => <SelectItem key={y} value={y}>{y}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
        <div className="flex-1 min-w-[160px]">
          <Label className="text-[11px] text-muted-foreground mb-1 block">معيار ISO</Label>
          <Select value={fwFilter} onValueChange={setFwFilter}>
            <SelectTrigger className="h-9 text-xs"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="الكل">جميع المعايير</SelectItem>
              {frameworks.filter(f => f.type === "ISO").map(f => (
                <SelectItem key={f.id} value={f.id}>{f.shortName}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex-1 min-w-[140px]">
          <Label className="text-[11px] text-muted-foreground mb-1 block">حالة التدقيق</Label>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="h-9 text-xs"><SelectValue /></SelectTrigger>
            <SelectContent>
              {["الكل","مخطط","قيد التنفيذ","مكتمل","متأخر","مغلق"].map(s =>
                <SelectItem key={s} value={s}>{s}</SelectItem>
              )}
            </SelectContent>
          </Select>
        </div>
        <Button variant="outline" size="sm" className="gap-1 h-9" onClick={() => { setYearFilter("2026"); setStatusFilter("الكل"); setFwFilter("الكل"); }}>
          <Filter className="w-3.5 h-3.5" /> إعادة الفلاتر
        </Button>
      </div>

      {/* Timeline */}
      <SectionCard title={`الجدول الزمني للتدقيق ${yearFilter}`} icon={Calendar} className="mb-4">
        <div className="space-y-2">
          {filtered.map(p => {
            const month = parseInt(p.plannedDate.slice(5, 7)) - 1;
            return (
              <div key={p.id} className="flex items-center gap-3 text-xs">
                <div className="w-28 font-semibold truncate">{p.number}</div>
                <div className="flex-1 relative h-7 bg-muted/40 rounded">
                  <div
                    className="absolute h-full rounded bg-primary/70 flex items-center px-2 text-[10px] text-primary-foreground font-bold"
                    style={{ right: `${(month / 12) * 100}%`, width: "11%" }}
                  >
                    {p.plannedDate.slice(5)}
                  </div>
                </div>
                <span className="text-[10px] text-muted-foreground hidden md:inline">
                  {getFramework(p.isoFrameworkId)?.shortName}
                </span>
                <StatusBadge status={p.status} />
              </div>
            );
          })}
          {filtered.length === 0 && (
            <div className="text-center text-xs text-muted-foreground py-6">
              لا توجد عمليات تدقيق ضمن الفلاتر المختارة
            </div>
          )}
          <div className="grid grid-cols-12 gap-1 text-[10px] text-muted-foreground mt-3 pt-2 border-t border-border">
            {["يناير","فبراير","مارس","أبريل","مايو","يونيو","يوليو","أغسطس","سبتمبر","أكتوبر","نوفمبر","ديسمبر"].map(m =>
              <div key={m} className="text-center truncate">{m}</div>
            )}
          </div>
        </div>
      </SectionCard>

      {/* Table */}
      <SectionCard title={`عمليات التدقيق السنوية (${filtered.length})`} icon={ClipboardList}>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead className="bg-muted/40">
              <tr>
                {["الرقم","النطاق","المعيار","الإدارات","قائد الفريق","التاريخ","المخاطر","الأولوية","الحالة","انتقال"].map(h =>
                  <th key={h} className="p-2 text-right font-semibold text-muted-foreground">{h}</th>
                )}
              </tr>
            </thead>
            <tbody>
              {filtered.map(p => (
                <tr key={p.id} className="border-t border-border hover:bg-muted/30">
                  <td className="p-2 font-bold">{p.number}</td>
                  <td className="p-2 max-w-[200px] truncate">{p.scope}</td>
                  <td className="p-2 text-muted-foreground">{getFramework(p.isoFrameworkId)?.shortName}</td>
                  <td className="p-2 text-muted-foreground text-[10px]">{p.departmentIds.map(d => getDept(d)?.code).join(", ")}</td>
                  <td className="p-2 text-muted-foreground">{p.leadAuditor}</td>
                  <td className="p-2 text-muted-foreground">{p.plannedDate}</td>
                  <td className="p-2"><StatusBadge status={p.riskLevel === "عالٍ" ? "حرجة" : p.riskLevel === "متوسط" ? "متوسطة" : "منخفضة"} /></td>
                  <td className="p-2"><StatusBadge status={p.priority} /></td>
                  <td className="p-2"><StatusBadge status={p.status} /></td>
                  <td className="p-2">
                    <Button asChild size="sm" variant="outline" className="h-6 text-[10px] gap-1">
                      <Link to="/iso/plans">
                        خطة التدقيق <ArrowLeft className="w-3 h-3" />
                      </Link>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionCard>

      <AuditStageActions current="program" />
    </ExcellenceLayout>
  );
}

/* ===================================================================
 * Stage 2: Audit Plan (خطة التدقيق التفصيلية)
 * =================================================================*/
export function AuditPlanPage() {
  const [selectedId, setSelectedId] = useState(auditEngagements[2].id);
  const eng = auditEngagements.find(e => e.id === selectedId)!;
  const plan = auditPlans.find(p => p.id === eng.planId);
  const relatedChecklist = checklistItems.filter(c => c.isoFrameworkId === eng.isoFrameworkId).slice(0, 8);

  return (
    <ExcellenceLayout>
      <Breadcrumb items={[
        { label: "الرئيسية", href: "/" },
        { label: "التدقيق الداخلي ISO" },
        { label: "خطة التدقيق" },
      ]} />
      <PageHeader
        title="خطة التدقيق التفصيلية"
        subtitle="خطة تفصيلية لكل عملية تدقيق: الأهداف، النطاق، الفريق، الوثائق"
        icon={ClipboardList}
        actions={
          <Button className="gap-2" onClick={() => toast.success("تم اعتماد خطة التدقيق")}>
            <CheckCircle2 className="w-4 h-4" /> اعتماد الخطة
          </Button>
        }
      />
      <AuditCrossLinks />
      <AuditWorkflowNav current="plans" />

      <div className="grid lg:grid-cols-4 gap-4">
        {/* Left: list of engagements */}
        <div className="lg:col-span-1 space-y-2">
          <div className="text-xs font-bold text-muted-foreground mb-1">عمليات التدقيق</div>
          {auditEngagements.slice(0, 8).map(e => (
            <button
              key={e.id}
              onClick={() => setSelectedId(e.id)}
              className={`w-full text-right gov-card p-3 transition ${selectedId === e.id ? "border-primary border-2 bg-primary/5" : "hover:border-primary/40"}`}
            >
              <div className="font-semibold text-sm leading-tight">{e.name}</div>
              <div className="text-[11px] text-muted-foreground mt-1 flex items-center gap-1.5">
                <span>{getFramework(e.isoFrameworkId)?.shortName}</span>
                <span>·</span>
                <span>{e.subClause}</span>
              </div>
              <div className="mt-2 flex items-center justify-between">
                <StatusBadge status={e.status} />
                <span className="text-[10px] text-muted-foreground">{e.startDate}</span>
              </div>
            </button>
          ))}
        </div>

        {/* Right: details */}
        <div className="lg:col-span-3 space-y-3">
          <SectionCard
            title={eng.name}
            icon={ClipboardList}
            description={`${plan?.number ?? "—"} · ${eng.startDate} → ${eng.endDate}`}
            action={<StatusBadge status={eng.status} />}
          >
            <div className="grid md:grid-cols-2 gap-4 text-xs">
              <div>
                <div className="text-muted-foreground mb-1">هدف التدقيق</div>
                <div className="font-medium">التحقق من تطبيق متطلبات البند {eng.subClause} وفاعليتها وتوافقها مع متطلبات {getFramework(eng.isoFrameworkId)?.shortName}.</div>
              </div>
              <div>
                <div className="text-muted-foreground mb-1">نطاق التدقيق</div>
                <div className="font-medium">{plan?.scope}</div>
              </div>
              <div>
                <div className="text-muted-foreground mb-1">معيار ISO</div>
                <div className="font-medium">{getFramework(eng.isoFrameworkId)?.name}</div>
              </div>
              <div>
                <div className="text-muted-foreground mb-1">البنود محل التدقيق</div>
                <div className="font-medium">البند الرئيسي {eng.mainClause} / الفرعي {eng.subClause}</div>
              </div>
              <div>
                <div className="text-muted-foreground mb-1">الإدارة محل التدقيق</div>
                <div className="font-medium">{getDept(eng.auditedDeptId)?.name}</div>
              </div>
              <div>
                <div className="text-muted-foreground mb-1">قائد فريق التدقيق</div>
                <div className="font-medium">{eng.leadAuditor}</div>
              </div>
              <div>
                <div className="text-muted-foreground mb-1">ممثل الإدارة</div>
                <div className="font-medium">{eng.representative}</div>
              </div>
              <div>
                <div className="text-muted-foreground mb-1">المدققون</div>
                <div className="font-medium">{plan?.auditors.join("، ")}</div>
              </div>
            </div>
          </SectionCard>

          <div className="grid md:grid-cols-2 gap-3">
            <SectionCard title="جدول التدقيق" icon={Calendar}>
              <ol className="space-y-2 text-xs">
                {[
                  { d: eng.startDate, t: "08:30", a: "اجتماع افتتاحي مع ممثل الإدارة" },
                  { d: eng.startDate, t: "09:30", a: "مراجعة الوثائق والسجلات" },
                  { d: eng.startDate, t: "13:00", a: "مقابلات ميدانية ومعاينة" },
                  { d: eng.endDate, t: "10:00", a: "تحقق ميداني من العمليات" },
                  { d: eng.endDate, t: "14:00", a: "اجتماع ختامي وعرض النتائج الأولية" },
                ].map((s, i) => (
                  <li key={i} className="flex items-start gap-2 p-2 border border-border rounded">
                    <div className="text-[10px] bg-primary/10 text-primary font-bold rounded px-1.5 py-0.5 shrink-0">{s.d}</div>
                    <div className="text-[10px] bg-muted text-muted-foreground rounded px-1.5 py-0.5 shrink-0">{s.t}</div>
                    <div className="text-xs flex-1">{s.a}</div>
                  </li>
                ))}
              </ol>
            </SectionCard>

            <SectionCard title="الوثائق المطلوبة من الإدارة" icon={FileText}>
              <ul className="space-y-1.5 text-xs">
                {[
                  "السياسة المعتمدة للعملية",
                  "سجل الإجراءات التشغيلية",
                  "سجلات تقييم المخاطر",
                  "تقارير المؤشرات السنوية",
                  "محاضر مراجعة الإدارة",
                  "سجل عدم المطابقة السابقة",
                ].map((d, i) => (
                  <li key={i} className="flex items-center gap-2 p-1.5 bg-muted/30 rounded">
                    <FileText className="w-3.5 h-3.5 text-info shrink-0" />
                    <span>{d}</span>
                  </li>
                ))}
              </ul>
            </SectionCard>
          </div>

          <SectionCard
            title={`بنود قائمة التحقق المرتبطة (${relatedChecklist.length})`}
            icon={ShieldCheck}
            action={
              <Button asChild size="sm" variant="outline" className="gap-1 h-7 text-[11px]">
                <Link to="/iso/checklists">عرض قائمة التحقق كاملة <ArrowLeft className="w-3 h-3" /></Link>
              </Button>
            }
          >
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead className="bg-muted/40"><tr>
                  {["البند","السؤال","الشاهد المطلوب","المالك"].map(h =>
                    <th key={h} className="p-2 text-right font-semibold text-muted-foreground">{h}</th>
                  )}
                </tr></thead>
                <tbody>
                  {relatedChecklist.map(c => (
                    <tr key={c.id} className="border-t border-border hover:bg-muted/20">
                      <td className="p-2 font-medium">{c.subClause}</td>
                      <td className="p-2 max-w-[350px]">{c.question}</td>
                      <td className="p-2 text-muted-foreground text-[11px]">{c.requiredEvidence}</td>
                      <td className="p-2 text-muted-foreground">{getDept(c.ownerDeptId)?.code}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </SectionCard>

          <SectionCard title="ملاحظات أولية" icon={Lightbulb}>
            <Textarea
              placeholder="أضف أي ملاحظات أولية أو مخاطر مرتبطة بالتدقيق..."
              defaultValue={plan?.notes || ""}
              className="text-xs"
              rows={3}
            />
            <div className="mt-2 flex justify-end gap-2">
              <Button size="sm" variant="outline" onClick={() => toast.success("تم حفظ الملاحظات")}>حفظ</Button>
              <Button asChild size="sm" className="gap-1">
                <Link to="/iso/checklists">إعداد قوائم التحقق <ArrowLeft className="w-3 h-3" /></Link>
              </Button>
            </div>
          </SectionCard>
        </div>
      </div>

      <AuditStageActions current="plans" />
    </ExcellenceLayout>
  );
}

/* ===================================================================
 * Stage 3: Checklists (قوائم التحقق)
 * =================================================================*/
export function ChecklistsPageV2() {
  const [fw, setFw] = useState("f3");
  const [results, setResults] = useState<Record<string, string>>({});
  const [clauseFilter, setClauseFilter] = useState("الكل");

  const items = checklistItems.filter(c => c.isoFrameworkId === fw);
  const clauses = Array.from(new Set(items.map(i => i.mainClause)));
  const visibleItems = clauseFilter === "الكل" ? items : items.filter(i => i.mainClause === clauseFilter);

  const stats = {
    total: items.length,
    matched: items.filter(i => i.result === "مطابق").length,
    partial: items.filter(i => i.result === "مطابق جزئياً").length,
    nonMatched: items.filter(i => i.result === "غير مطابق").length,
    na: items.filter(i => i.result === "لا ينطبق").length,
  };

  return (
    <ExcellenceLayout>
      <Breadcrumb items={[
        { label: "الرئيسية", href: "/" },
        { label: "التدقيق الداخلي ISO" },
        { label: "قوائم التحقق" },
      ]} />
      <PageHeader
        title="قوائم التحقق التفاعلية"
        subtitle="قوائم تحقق متخصصة لمعايير ISO 9001 / 14001 / 45001 / 27001"
        icon={ShieldCheck}
        actions={
          <Button size="sm" className="gap-1" onClick={() => toast.success("تم حفظ التقدم")}>
            <CheckCircle2 className="w-3 h-3" /> حفظ التقدم
          </Button>
        }
      />
      <AuditCrossLinks />
      <AuditWorkflowNav current="checklists" />

      {/* Framework selector */}
      <div className="grid md:grid-cols-4 gap-2 mb-4">
        {["f3","f4","f5","f6"].map(id => {
          const f = getFramework(id)!;
          const cnt = checklistItems.filter(c => c.isoFrameworkId === id).length;
          return (
            <button
              key={id}
              onClick={() => { setFw(id); setClauseFilter("الكل"); }}
              className={`gov-card p-3 text-right transition ${fw === id ? "border-primary border-2 bg-primary/5" : "hover:border-primary/40"}`}
            >
              <div className="font-bold text-sm">{f.shortName}</div>
              <div className="text-[11px] text-muted-foreground">{cnt} بند تحقق</div>
              <div className="mt-1 text-[10px] text-info">{f.name.split(" - ")[1] ?? ""}</div>
            </button>
          );
        })}
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-5 gap-3 mb-4">
        <StatCard label="إجمالي البنود" value={stats.total} icon={ClipboardList} accent="primary" />
        <StatCard label="مطابق" value={stats.matched} icon={CheckCircle2} accent="success" />
        <StatCard label="مطابق جزئياً" value={stats.partial} icon={Activity} accent="warning" />
        <StatCard label="غير مطابق" value={stats.nonMatched} icon={AlertOctagon} accent="destructive" />
        <StatCard label="لا ينطبق" value={stats.na} icon={FileText} accent="info" />
      </div>

      {/* Clause filter */}
      <div className="bg-card border border-border rounded-lg p-3 mb-3 flex flex-wrap items-center gap-2">
        <Label className="text-xs">البند الرئيسي:</Label>
        <div className="flex flex-wrap gap-1">
          {["الكل", ...clauses].map(c => (
            <button
              key={c}
              onClick={() => setClauseFilter(c)}
              className={`text-[11px] px-2 py-1 rounded border ${clauseFilter === c ? "bg-primary text-primary-foreground border-primary" : "bg-muted/40 text-muted-foreground border-border hover:bg-muted"}`}
            >
              البند {c}
            </button>
          ))}
        </div>
      </div>

      <SectionCard
        title={`بنود التحقق - ${getFramework(fw)?.shortName} (${visibleItems.length})`}
        icon={ShieldCheck}
      >
        <div className="space-y-2 max-h-[600px] overflow-y-auto pr-1">
          {visibleItems.map(it => {
            const r = results[it.id] ?? it.result;
            return (
              <div key={it.id} className="p-3 border border-border rounded-lg hover:border-primary/30 transition">
                <div className="flex items-start justify-between gap-2 mb-2 flex-wrap">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 mb-1 flex-wrap">
                      <span className="text-[10px] bg-primary/10 text-primary font-bold rounded px-1.5 py-0.5">
                        {it.mainClause} / {it.subClause}
                      </span>
                      <span className="text-[10px] text-muted-foreground">المالك: {getDept(it.ownerDeptId)?.name}</span>
                      <span className="text-[10px] text-muted-foreground">·</span>
                      <span className="text-[10px] text-muted-foreground">استحقاق: {it.dueDate}</span>
                    </div>
                    <div className="text-sm font-medium">{it.question}</div>
                    <div className="text-[11px] text-muted-foreground mt-1">
                      <span className="font-semibold">الشاهد المطلوب:</span> {it.requiredEvidence}
                    </div>
                  </div>
                  <div className="flex flex-col gap-1 items-end">
                    <Select value={r} onValueChange={(v) => setResults(s => ({ ...s, [it.id]: v }))}>
                      <SelectTrigger className="h-7 w-32 text-[11px]"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        {["—","مطابق","مطابق جزئياً","غير مطابق","لا ينطبق"].map(o =>
                          <SelectItem key={o} value={o}>{o}</SelectItem>
                        )}
                      </SelectContent>
                    </Select>
                    <div className="flex gap-1">
                      <StatusBadge status={it.riskLevel === "عالٍ" ? "حرجة" : it.riskLevel === "متوسط" ? "متوسطة" : "منخفضة"} />
                      {it.hasNC && <StatusBadge status="جسيمة" />}
                      {it.hasOpportunity && <StatusBadge status="ملاحظة" />}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </SectionCard>

      <AuditStageActions current="checklists" />
    </ExcellenceLayout>
  );
}

/* ===================================================================
 * Stage 4: Audit Execution (تنفيذ التدقيق)
 * =================================================================*/
export function AuditExecutionPageV2() {
  const [selected, setSelected] = useState(auditEngagements[2].id);
  const eng = auditEngagements.find(e => e.id === selected)!;
  const items = checklistItems.filter(c => c.isoFrameworkId === eng.isoFrameworkId).slice(0, 10);
  const [progressMap, setProgressMap] = useState<Record<string, string>>({});

  const handleAssess = (id: string, val: string) => {
    setProgressMap(s => ({ ...s, [id]: val }));
  };

  const completedCount = Object.keys(progressMap).length;
  const completionPct = Math.round((completedCount / items.length) * 100);

  return (
    <ExcellenceLayout>
      <Breadcrumb items={[
        { label: "الرئيسية", href: "/" },
        { label: "التدقيق الداخلي ISO" },
        { label: "تنفيذ التدقيق" },
      ]} />
      <PageHeader
        title="تنفيذ التدقيق"
        subtitle="شاشة تنفيذ تفاعلية لإدخال نتائج التدقيق وربط الشواهد والملاحظات"
        icon={Workflow}
        actions={
          <>
            <Button variant="outline" onClick={() => toast.success("تم حفظ المسودة")}>حفظ مسودة</Button>
            <Button onClick={() => toast.success("تم إنهاء التدقيق وإصدار النتائج الأولية")}>إنهاء التدقيق</Button>
          </>
        }
      />
      <AuditCrossLinks />
      <AuditWorkflowNav current="execution" />

      <div className="grid lg:grid-cols-4 gap-4">
        <div className="lg:col-span-1 space-y-2">
          <div className="text-xs font-bold text-muted-foreground">عمليات التدقيق المتاحة</div>
          {auditEngagements.slice(0, 6).map(e => (
            <button
              key={e.id}
              onClick={() => { setSelected(e.id); setProgressMap({}); }}
              className={`w-full text-right gov-card p-3 transition ${selected === e.id ? "border-primary border-2 bg-primary/5" : "hover:border-primary/40"}`}
            >
              <div className="font-semibold text-sm">{e.name}</div>
              <div className="text-[11px] text-muted-foreground">{getFramework(e.isoFrameworkId)?.shortName} · {e.subClause}</div>
              <div className="mt-1.5">
                <ProgressBar value={e.progress} size="sm" showValue={false} />
              </div>
              <div className="mt-1 flex justify-between text-[10px]">
                <StatusBadge status={e.status} />
                <span className="text-muted-foreground">{e.progress}%</span>
              </div>
            </button>
          ))}
        </div>

        <div className="lg:col-span-3 space-y-3">
          <SectionCard
            title={eng.name}
            icon={Workflow}
            description={`${eng.startDate} → ${eng.endDate} · القائد: ${eng.leadAuditor} · الممثل: ${eng.representative}`}
            action={<StatusBadge status={eng.status} />}
          >
            <div className="grid md:grid-cols-4 gap-3 text-xs">
              <div>
                <div className="text-muted-foreground mb-1">المعيار</div>
                <div className="font-bold">{getFramework(eng.isoFrameworkId)?.shortName}</div>
              </div>
              <div>
                <div className="text-muted-foreground mb-1">البند</div>
                <div className="font-bold">{eng.mainClause} / {eng.subClause}</div>
              </div>
              <div>
                <div className="text-muted-foreground mb-1">الإدارة</div>
                <div className="font-bold">{getDept(eng.auditedDeptId)?.name}</div>
              </div>
              <div>
                <div className="text-muted-foreground mb-1">نسبة الإنجاز الحالية</div>
                <ProgressBar value={completionPct} size="sm" />
              </div>
            </div>
          </SectionCard>

          <SectionCard title="بنود التحقق - إدخال النتائج" icon={ClipboardList}>
            <div className="space-y-3">
              {items.map((it, idx) => {
                const assessment = progressMap[it.id];
                return (
                  <div key={it.id} className="p-3 border border-border rounded-lg">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div className="flex-1">
                        <div className="text-[10px] text-muted-foreground mb-0.5">السؤال {idx + 1} · البند {it.subClause}</div>
                        <div className="text-sm font-medium">{it.question}</div>
                        <div className="text-[11px] text-muted-foreground mt-1">الشاهد المطلوب: {it.requiredEvidence}</div>
                      </div>
                      {assessment && <StatusBadge status={assessment === "مطابقة" ? "مكتمل" : assessment === "عدم مطابقة جسيمة" ? "جسيمة" : assessment === "عدم مطابقة بسيطة" ? "بسيطة" : "ملاحظة"} />}
                    </div>
                    <div className="grid md:grid-cols-3 gap-2">
                      <Select value={assessment ?? ""} onValueChange={(v) => handleAssess(it.id, v)}>
                        <SelectTrigger className="h-8 text-xs"><SelectValue placeholder="تصنيف النتيجة" /></SelectTrigger>
                        <SelectContent>
                          {["مطابقة","ملاحظة تحسين","فرصة تحسين","عدم مطابقة بسيطة","عدم مطابقة جسيمة"].map(o =>
                            <SelectItem key={o} value={o}>{o}</SelectItem>
                          )}
                        </SelectContent>
                      </Select>
                      <Select defaultValue="متوسط">
                        <SelectTrigger className="h-8 text-xs"><SelectValue /></SelectTrigger>
                        <SelectContent>
                          {["عالٍ","متوسط","منخفض"].map(o => <SelectItem key={o} value={o}>مخاطر {o}</SelectItem>)}
                        </SelectContent>
                      </Select>
                      <Button size="sm" variant="outline" className="h-8 gap-1" onClick={() => toast.success("تم ربط الشاهد بنجاح")}>
                        <FileText className="w-3 h-3" /> ربط شاهد
                      </Button>
                    </div>
                    <Textarea placeholder="ملاحظة المدقق..." className="mt-2 text-xs" rows={2} />
                  </div>
                );
              })}
            </div>
          </SectionCard>
        </div>
      </div>

      <AuditStageActions current="execution" />
    </ExcellenceLayout>
  );
}

/* ===================================================================
 * Stage 5: Audit Results (نتائج التدقيق)
 * =================================================================*/
export function AuditResultsPageV2() {
  const totalNC = nonconformities.length;
  const major = nonconformities.filter(n => n.classification === "جسيمة").length;
  const minor = nonconformities.filter(n => n.classification === "بسيطة").length;
  const obs = nonconformities.filter(n => n.classification === "ملاحظة").length;

  const byDept = departments.slice(0, 8).map(d => ({
    name: d.code,
    NC: nonconformities.filter(n => n.ownerDeptId === d.id).length,
  }));

  const byClauseMap: Record<string, number> = {};
  nonconformities.forEach(n => {
    const c = n.clause.split(".")[0];
    byClauseMap[c] = (byClauseMap[c] || 0) + 1;
  });
  const byClause = Object.entries(byClauseMap).map(([clause, count]) => ({ clause, count }));

  const closurePieData = [
    { name: "مغلقة", value: nonconformities.filter(n => n.status === "مغلقة").length, color: "hsl(var(--success))" },
    { name: "بانتظار التحقق", value: nonconformities.filter(n => n.status === "بانتظار التحقق").length, color: "hsl(var(--info))" },
    { name: "قيد المعالجة", value: nonconformities.filter(n => n.status === "قيد المعالجة").length, color: "hsl(var(--warning))" },
    { name: "مفتوحة", value: nonconformities.filter(n => n.status === "مفتوحة").length, color: "hsl(var(--destructive))" },
  ];

  const trend = [
    { m: "ديسمبر", مفتوحة: 12, مغلقة: 4 },
    { m: "يناير", مفتوحة: 14, مغلقة: 6 },
    { m: "فبراير", مفتوحة: 11, مغلقة: 8 },
    { m: "مارس", مفتوحة: 9, مغلقة: 12 },
    { m: "أبريل", مفتوحة: 8, مغلقة: 14 },
  ];

  const avgClosureDays = 68;
  const overdueCAs = correctiveActions.filter(c => c.status === "متأخرة").length;
  const completionRate = Math.round(auditEngagements.reduce((s, e) => s + e.progress, 0) / auditEngagements.length);

  // Top clauses
  const topClauses = Object.entries(byClauseMap).sort((a, b) => b[1] - a[1]).slice(0, 3);
  const topDelayedDepts = [...departments].sort((a, b) => b.openGaps - a.openGaps).slice(0, 3);

  return (
    <ExcellenceLayout>
      <Breadcrumb items={[
        { label: "الرئيسية", href: "/" },
        { label: "التدقيق الداخلي ISO" },
        { label: "نتائج التدقيق" },
      ]} />
      <PageHeader
        title="نتائج التدقيق"
        subtitle="لوحة شاملة لمؤشرات أداء التدقيق الداخلي وعدم المطابقة"
        icon={Activity}
        actions={
          <Button variant="outline" className="gap-2" onClick={() => toast.success("تم تصدير تقرير النتائج")}>
            <Download className="w-4 h-4" /> تصدير التقرير
          </Button>
        }
      />
      <AuditCrossLinks />
      <AuditWorkflowNav current="results" />

      <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-3 mb-4">
        <StatCard label="تدقيقات مخططة" value={auditPlans.length} icon={ClipboardList} accent="primary" />
        <StatCard label="مكتملة" value={auditPlans.filter(p => p.status === "مكتمل").length + 2} icon={CheckCircle2} accent="success" />
        <StatCard label="نسبة الإنجاز" value={completionRate} suffix="%" icon={Activity} accent="info" />
        <StatCard label="عدم مطابقة بسيطة" value={minor} icon={FileWarning} accent="warning" />
        <StatCard label="عدم مطابقة جسيمة" value={major} icon={AlertOctagon} accent="destructive" />
        <StatCard label="ملاحظات تحسين" value={obs} icon={Wrench} accent="gold" />
      </div>

      <div className="grid lg:grid-cols-2 gap-4 mb-4">
        <SectionCard title="حالات عدم المطابقة حسب الإدارة" icon={Activity}>
          <div className="h-64">
            <ResponsiveContainer>
              <BarChart data={byDept}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="name" tick={{ fontSize: 10 }} />
                <YAxis tick={{ fontSize: 10 }} />
                <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", fontSize: 12 }} />
                <Bar dataKey="NC" fill="hsl(var(--destructive))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </SectionCard>

        <SectionCard title="عدم المطابقة حسب البند الرئيسي" icon={Activity}>
          <div className="h-64">
            <ResponsiveContainer>
              <BarChart data={byClause}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="clause" tick={{ fontSize: 10 }} />
                <YAxis tick={{ fontSize: 10 }} />
                <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", fontSize: 12 }} />
                <Bar dataKey="count" fill="hsl(var(--warning))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </SectionCard>

        <SectionCard title="حالة عدم المطابقة" icon={CheckCircle2}>
          <div className="h-64">
            <ResponsiveContainer>
              <PieChart>
                <Pie data={closurePieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label={(d: { name: string; value: number }) => `${d.name}: ${d.value}`}>
                  {closurePieData.map((d, i) => <Cell key={i} fill={d.color} />)}
                </Pie>
                <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", fontSize: 12 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </SectionCard>

        <SectionCard title="اتجاه فتح/إغلاق عدم المطابقة" icon={TrendingUp}>
          <div className="h-64">
            <ResponsiveContainer>
              <LineChart data={trend}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="m" tick={{ fontSize: 10 }} />
                <YAxis tick={{ fontSize: 10 }} />
                <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", fontSize: 12 }} />
                <Legend />
                <Line type="monotone" dataKey="مفتوحة" stroke="hsl(var(--destructive))" strokeWidth={2} />
                <Line type="monotone" dataKey="مغلقة" stroke="hsl(var(--success))" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </SectionCard>
      </div>

      <div className="grid lg:grid-cols-3 gap-3 mb-4">
        <SectionCard title="أكثر البنود تكراراً في عدم المطابقة" icon={AlertOctagon}>
          <ul className="space-y-2 text-xs">
            {topClauses.map(([c, n], i) => (
              <li key={c} className="flex items-center justify-between p-2 bg-muted/30 rounded">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 bg-destructive text-destructive-foreground font-bold rounded text-[11px] flex items-center justify-center">{i + 1}</span>
                  <span>البند {c}</span>
                </div>
                <span className="font-bold text-destructive">{n} حالات</span>
              </li>
            ))}
          </ul>
        </SectionCard>

        <SectionCard title="أكثر الإدارات تأخراً في الإغلاق" icon={Users}>
          <ul className="space-y-2 text-xs">
            {topDelayedDepts.map((d, i) => (
              <li key={d.id} className="flex items-center justify-between p-2 bg-muted/30 rounded">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 bg-warning text-warning-foreground font-bold rounded text-[11px] flex items-center justify-center">{i + 1}</span>
                  <span>{d.name}</span>
                </div>
                <span className="font-bold text-warning">{d.openGaps} مفتوحة</span>
              </li>
            ))}
          </ul>
        </SectionCard>

        <SectionCard title="مؤشرات الإغلاق" icon={CheckCircle2}>
          <div className="space-y-3 text-xs">
            <div>
              <div className="text-muted-foreground mb-1">نسبة إغلاق الإجراءات التصحيحية</div>
              <ProgressBar value={72} color="success" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-muted/30 p-2 rounded">
                <div className="text-[11px] text-muted-foreground">متوسط مدة الإغلاق</div>
                <div className="text-2xl font-bold text-foreground">{avgClosureDays}<span className="text-xs text-muted-foreground mr-1">يوم</span></div>
              </div>
              <div className="bg-destructive/10 p-2 rounded">
                <div className="text-[11px] text-muted-foreground">حالات متأخرة</div>
                <div className="text-2xl font-bold text-destructive">{overdueCAs}</div>
              </div>
            </div>
          </div>
        </SectionCard>
      </div>

      <SectionCard
        title="الأثر على التميز المؤسسي"
        icon={Target}
        action={
          <Button asChild size="sm" variant="outline" className="gap-1 h-7 text-[11px]">
            <Link to="/dashboard">عرض لوحة القيادة <ArrowLeft className="w-3 h-3" /></Link>
          </Button>
        }
      >
        <table className="w-full text-xs">
          <thead className="bg-muted/40"><tr>
            {["مجال الأثر","قبل","بعد","التغير","ملاحظات"].map(h =>
              <th key={h} className="p-2 text-right font-semibold text-muted-foreground">{h}</th>
            )}
          </tr></thead>
          <tbody>
            {[
              ["جاهزية EFQM",74,71,-3,"NC جسيمة في البند 8.5"],
              ["جاهزية KAQA",68,64,-4,"ضعف في الممكنات"],
              ["النضج المؤسسي",74,72,-2,"تأخر إغلاق NC"],
              ["جودة الشواهد",78,73,-5,"شواهد مرفوضة في التدقيق"],
              ["فرص التحسين المُحددة",30,38,8,"8 فرص جديدة من التدقيق"],
              ["مشاريع التحسين المنبثقة",12,15,3,"3 مشاريع جديدة"],
            ].map((r, i) => (
              <tr key={i} className="border-t border-border">
                <td className="p-2 font-medium">{r[0]}</td>
                <td className="p-2 text-muted-foreground">{r[1]}</td>
                <td className="p-2 font-bold">{r[2]}</td>
                <td className={`p-2 font-bold ${Number(r[3]) > 0 ? "text-success" : "text-destructive"}`}>
                  {Number(r[3]) > 0 ? "+" : ""}{r[3]}
                </td>
                <td className="p-2 text-muted-foreground text-[11px]">{r[4]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </SectionCard>

      <AuditStageActions current="results" />
    </ExcellenceLayout>
  );
}

/* ===================================================================
 * Stage 6: Non-Conformities (عدم المطابقة)
 * =================================================================*/
export function NonConformitiesPageV2() {
  const [classFilter, setClassFilter] = useState("الكل");
  const [statusFilter, setStatusFilter] = useState("الكل");
  const [fwFilter, setFwFilter] = useState("الكل");

  const filtered = nonconformities.filter(n =>
    (classFilter === "الكل" || n.classification === classFilter) &&
    (statusFilter === "الكل" || n.status === statusFilter) &&
    (fwFilter === "الكل" || n.frameworkId === fwFilter)
  );

  return (
    <ExcellenceLayout>
      <Breadcrumb items={[
        { label: "الرئيسية", href: "/" },
        { label: "التدقيق الداخلي ISO" },
        { label: "عدم المطابقة" },
      ]} />
      <PageHeader
        title="سجل حالات عدم المطابقة"
        subtitle="سجل شامل لجميع حالات عدم المطابقة الناتجة عن التدقيق الداخلي"
        icon={FileWarning}
        actions={
          <Button className="gap-2" onClick={() => toast.success("تم إضافة حالة عدم مطابقة جديدة")}>
            <Plus className="w-4 h-4" /> حالة جديدة
          </Button>
        }
      />
      <AuditCrossLinks />
      <AuditWorkflowNav current="non-conformities" />

      <div className="grid md:grid-cols-5 gap-3 mb-4">
        <StatCard label="إجمالي الحالات" value={nonconformities.length} icon={FileWarning} accent="primary" />
        <StatCard label="جسيمة" value={nonconformities.filter(n => n.classification === "جسيمة").length} icon={AlertOctagon} accent="destructive" />
        <StatCard label="بسيطة" value={nonconformities.filter(n => n.classification === "بسيطة").length} icon={FileWarning} accent="warning" />
        <StatCard label="ملاحظات" value={nonconformities.filter(n => n.classification === "ملاحظة").length} icon={Lightbulb} accent="info" />
        <StatCard label="مغلقة" value={nonconformities.filter(n => n.status === "مغلقة").length} icon={CheckCircle2} accent="success" />
      </div>

      {/* Filters */}
      <div className="bg-card border border-border rounded-lg p-3 mb-3 flex flex-wrap items-end gap-3">
        <div className="flex-1 min-w-[140px]">
          <Label className="text-[11px] text-muted-foreground mb-1 block">التصنيف</Label>
          <Select value={classFilter} onValueChange={setClassFilter}>
            <SelectTrigger className="h-9 text-xs"><SelectValue /></SelectTrigger>
            <SelectContent>{["الكل","جسيمة","بسيطة","ملاحظة"].map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
          </Select>
        </div>
        <div className="flex-1 min-w-[140px]">
          <Label className="text-[11px] text-muted-foreground mb-1 block">الحالة</Label>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="h-9 text-xs"><SelectValue /></SelectTrigger>
            <SelectContent>{["الكل","مفتوحة","قيد المعالجة","بانتظار التحقق","مغلقة"].map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
          </Select>
        </div>
        <div className="flex-1 min-w-[160px]">
          <Label className="text-[11px] text-muted-foreground mb-1 block">المعيار</Label>
          <Select value={fwFilter} onValueChange={setFwFilter}>
            <SelectTrigger className="h-9 text-xs"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="الكل">جميع المعايير</SelectItem>
              {frameworks.filter(f => f.type === "ISO").map(f => <SelectItem key={f.id} value={f.id}>{f.shortName}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
      </div>

      <SectionCard title={`السجل (${filtered.length})`} icon={FileWarning}>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead className="bg-muted/40"><tr>
              {["الرقم","المصدر","المعيار","البند","الوصف","التصنيف","المالك","الاستحقاق","الحالة","إجراءات"].map(h =>
                <th key={h} className="p-2 text-right font-semibold text-muted-foreground">{h}</th>
              )}
            </tr></thead>
            <tbody>
              {filtered.map(n => (
                <tr key={n.id} className="border-t border-border hover:bg-muted/30">
                  <td className="p-2 font-bold">{n.number}</td>
                  <td className="p-2 text-muted-foreground text-[11px]">تدقيق داخلي</td>
                  <td className="p-2">{getFramework(n.frameworkId)?.shortName}</td>
                  <td className="p-2 text-muted-foreground">{n.clause}</td>
                  <td className="p-2 max-w-[280px]"><div className="line-clamp-2">{n.description}</div></td>
                  <td className="p-2"><StatusBadge status={n.classification} /></td>
                  <td className="p-2 text-muted-foreground">{getDept(n.ownerDeptId)?.name}</td>
                  <td className="p-2 text-muted-foreground">{n.dueDate}</td>
                  <td className="p-2"><StatusBadge status={n.status} /></td>
                  <td className="p-2">
                    <div className="flex gap-1 flex-wrap">
                      <Button asChild size="sm" variant="outline" className="h-6 text-[10px] gap-0.5">
                        <Link to={`/iso/root-cause?nc=${n.id}`}>
                          <Search className="w-2.5 h-2.5" /> سبب جذري
                        </Link>
                      </Button>
                      <Button
                        size="sm"
                        className="h-6 text-[10px] gap-0.5"
                        onClick={() => toast.success(`تم تحويل ${n.number} إلى مشروع تحسين`)}
                      >
                        <Rocket className="w-2.5 h-2.5" /> مشروع
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionCard>

      <AuditStageActions current="non-conformities" />
    </ExcellenceLayout>
  );
}

/* ===================================================================
 * Stage 7: Root Cause Analysis (تحليل السبب الجذري)
 * =================================================================*/
export function RootCauseAnalysisPage() {
  const [selectedNC, setSelectedNC] = useState(nonconformities[0].id);
  const nc = nonconformities.find(n => n.id === selectedNC)!;
  const ca = correctiveActions.find(c => c.ncId === nc.id) ?? correctiveActions[0];

  // 5-Whys editable mock
  const [whys, setWhys] = useState<string[]>(ca.fiveWhys);

  // Ishikawa categories
  const ishikawa = [
    { cat: "الأشخاص (People)", items: ["نقص في التدريب", "غياب الوعي بالإجراء", "ضعف الإشراف"] },
    { cat: "العمليات (Process)", items: ["إجراء قديم منذ سنتين", "غياب نقاط التحقق", "عدم وضوح المسؤوليات"] },
    { cat: "الأنظمة (Systems)", items: ["نقص في نظام التتبع", "تكامل ضعيف بين الأنظمة"] },
    { cat: "البيئة (Environment)", items: ["ضغط الأعمال", "أولويات متضاربة"] },
    { cat: "القياس (Measurement)", items: ["غياب مؤشر إنذار مبكر", "تأخر التقارير"] },
    { cat: "المواد/الموارد (Materials)", items: ["نقص في الموارد المخصصة"] },
  ];

  return (
    <ExcellenceLayout>
      <Breadcrumb items={[
        { label: "الرئيسية", href: "/" },
        { label: "التدقيق الداخلي ISO" },
        { label: "تحليل السبب الجذري" },
      ]} />
      <PageHeader
        title="تحليل السبب الجذري"
        subtitle="تحليل عميق للأسباب الجذرية باستخدام 5 لماذا ومخطط إيشيكاوا"
        icon={Search}
        actions={
          <Button className="gap-2" onClick={() => toast.success("تم حفظ تحليل السبب الجذري")}>
            <CheckCircle2 className="w-4 h-4" /> حفظ التحليل
          </Button>
        }
      />
      <AuditCrossLinks />
      <AuditWorkflowNav current="root-cause" />

      <div className="grid lg:grid-cols-4 gap-4">
        {/* Left: NC list */}
        <div className="lg:col-span-1 space-y-2">
          <div className="text-xs font-bold text-muted-foreground">حالات عدم المطابقة</div>
          {nonconformities.slice(0, 10).map(n => (
            <button
              key={n.id}
              onClick={() => setSelectedNC(n.id)}
              className={`w-full text-right gov-card p-3 transition ${selectedNC === n.id ? "border-primary border-2 bg-primary/5" : "hover:border-primary/40"}`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-bold text-xs">{n.number}</span>
                <StatusBadge status={n.classification} />
              </div>
              <div className="text-[11px] text-muted-foreground line-clamp-2">{n.description}</div>
              <div className="text-[10px] mt-1 text-info">{getFramework(n.frameworkId)?.shortName} · {n.clause}</div>
            </button>
          ))}
        </div>

        {/* Right: Analysis */}
        <div className="lg:col-span-3 space-y-3">
          <SectionCard
            title={`${nc.number} - تفاصيل عدم المطابقة`}
            icon={FileWarning}
            action={<StatusBadge status={nc.classification} />}
          >
            <div className="grid md:grid-cols-2 gap-3 text-xs">
              <div>
                <div className="text-muted-foreground mb-1">الوصف</div>
                <div className="font-medium">{nc.description}</div>
              </div>
              <div>
                <div className="text-muted-foreground mb-1">البند</div>
                <div className="font-medium">{getFramework(nc.frameworkId)?.shortName} - {nc.clause}</div>
              </div>
              <div>
                <div className="text-muted-foreground mb-1">المالك</div>
                <div className="font-medium">{getDept(nc.ownerDeptId)?.name}</div>
              </div>
              <div>
                <div className="text-muted-foreground mb-1">تاريخ الاستحقاق</div>
                <div className="font-medium">{nc.dueDate}</div>
              </div>
            </div>
          </SectionCard>

          <Tabs defaultValue="fivewhys" dir="rtl">
            <TabsList>
              <TabsTrigger value="fivewhys">تحليل 5 لماذا</TabsTrigger>
              <TabsTrigger value="ishikawa">مخطط إيشيكاوا (السبب والأثر)</TabsTrigger>
              <TabsTrigger value="conclusion">السبب الجذري النهائي</TabsTrigger>
            </TabsList>

            <TabsContent value="fivewhys" className="mt-3">
              <SectionCard title="تحليل 5 لماذا (5 Whys)" icon={Search} description="اطرح سؤال 'لماذا؟' خمس مرات للوصول إلى الجذور">
                <div className="space-y-2">
                  {whys.map((w, i) => (
                    <div key={i} className="flex items-start gap-2 p-3 border border-border rounded-lg bg-muted/20">
                      <div className="w-7 h-7 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-xs shrink-0">
                        {i + 1}
                      </div>
                      <div className="flex-1">
                        <Label className="text-[11px] text-muted-foreground">لماذا {i + 1}؟</Label>
                        <Input
                          value={w}
                          onChange={(e) => setWhys(prev => prev.map((x, idx) => idx === i ? e.target.value : x))}
                          className="text-xs mt-0.5"
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-3 p-3 bg-gold/10 border border-gold/30 rounded">
                  <div className="text-[11px] text-muted-foreground mb-0.5">النتيجة (السبب الجذري المستخلص):</div>
                  <div className="font-bold text-sm text-gold-foreground">{whys[whys.length - 1]?.split("—")[1]?.trim() ?? "قصور في حوكمة الوثائق"}</div>
                </div>
              </SectionCard>
            </TabsContent>

            <TabsContent value="ishikawa" className="mt-3">
              <SectionCard title="مخطط إيشيكاوا (Fishbone Diagram)" icon={Search} description="تصنيف الأسباب المحتملة في فئات 6M">
                <div className="grid md:grid-cols-2 gap-3">
                  {ishikawa.map((g, i) => (
                    <div key={i} className="border border-border rounded-lg p-3">
                      <div className="font-bold text-xs text-primary mb-2 flex items-center gap-1">
                        <span className="w-5 h-5 bg-primary/10 rounded-full text-[10px] flex items-center justify-center">{i + 1}</span>
                        {g.cat}
                      </div>
                      <ul className="space-y-1 text-xs">
                        {g.items.map((it, j) => (
                          <li key={j} className="flex items-start gap-1.5">
                            <span className="w-1 h-1 rounded-full bg-info mt-1.5 shrink-0" />
                            <span>{it}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </SectionCard>
            </TabsContent>

            <TabsContent value="conclusion" className="mt-3">
              <SectionCard title="السبب الجذري النهائي والتوصية" icon={Lightbulb}>
                <div className="space-y-3 text-xs">
                  <div>
                    <Label className="text-xs font-bold">السبب الجذري الرئيسي</Label>
                    <Textarea
                      defaultValue="قصور في حوكمة الوثائق وغياب دورة مراجعة منتظمة للإجراءات التشغيلية مع ضعف في إسناد المسؤولية."
                      className="text-xs mt-1"
                      rows={2}
                    />
                  </div>
                  <div>
                    <Label className="text-xs font-bold">الأسباب المساهمة</Label>
                    <Textarea
                      defaultValue="• نقص في التدريب الدوري للموظفين المعنيين&#10;• غياب نظام تنبيهات لتحديث الإجراءات&#10;• ضغط الأعمال على المالك الحالي"
                      className="text-xs mt-1"
                      rows={3}
                    />
                  </div>
                  <div>
                    <Label className="text-xs font-bold">التوصية للإجراء التصحيحي</Label>
                    <Textarea
                      defaultValue="بناء نظام حوكمة وثائق مع تنبيهات تصاعدية لكل وثيقة، وإسناد مالك واضح، وتدريب ربع سنوي إلزامي."
                      className="text-xs mt-1"
                      rows={3}
                    />
                  </div>
                  <div className="flex gap-2 justify-end pt-2">
                    <Button variant="outline" size="sm" onClick={() => toast.success("تم حفظ التحليل")}>حفظ كمسودة</Button>
                    <Button asChild size="sm" className="gap-1">
                      <Link to="/iso/corrective-actions">
                        إنشاء إجراء تصحيحي <ArrowLeft className="w-3 h-3" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </SectionCard>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <AuditStageActions current="root-cause" />
    </ExcellenceLayout>
  );
}

/* ===================================================================
 * Stage 8: Corrective Actions (الإجراءات التصحيحية)
 * =================================================================*/
export function CorrectiveActionsPage() {
  const [statusFilter, setStatusFilter] = useState("الكل");
  const [effectFilter, setEffectFilter] = useState("الكل");

  const filtered = correctiveActions.filter(c =>
    (statusFilter === "الكل" || c.status === statusFilter) &&
    (effectFilter === "الكل" || c.effectiveness === effectFilter)
  );

  const stats = {
    total: correctiveActions.length,
    open: correctiveActions.filter(c => c.status === "مفتوحة" || c.status === "قيد التنفيذ").length,
    overdue: correctiveActions.filter(c => c.status === "متأخرة").length,
    waiting: correctiveActions.filter(c => c.status === "بانتظار التحقق").length,
    closed: correctiveActions.filter(c => c.status === "مغلقة").length,
  };

  return (
    <ExcellenceLayout>
      <Breadcrumb items={[
        { label: "الرئيسية", href: "/" },
        { label: "التدقيق الداخلي ISO" },
        { label: "الإجراءات التصحيحية" },
      ]} />
      <PageHeader
        title="الإجراءات التصحيحية"
        subtitle="إدارة شاملة للإجراءات التصحيحية والوقائية المرتبطة بحالات عدم المطابقة"
        icon={Wrench}
        actions={
          <Button className="gap-2" onClick={() => toast.success("تم إضافة إجراء تصحيحي")}>
            <Plus className="w-4 h-4" /> إجراء جديد
          </Button>
        }
      />
      <AuditCrossLinks />
      <AuditWorkflowNav current="corrective-actions" />

      <div className="grid md:grid-cols-5 gap-3 mb-4">
        <StatCard label="إجمالي الإجراءات" value={stats.total} icon={Wrench} accent="primary" />
        <StatCard label="مفتوحة" value={stats.open} icon={Activity} accent="info" />
        <StatCard label="متأخرة" value={stats.overdue} icon={AlertOctagon} accent="destructive" />
        <StatCard label="بانتظار التحقق" value={stats.waiting} icon={Eye} accent="warning" />
        <StatCard label="مغلقة" value={stats.closed} icon={CheckCircle2} accent="success" />
      </div>

      {/* Filters */}
      <div className="bg-card border border-border rounded-lg p-3 mb-3 flex flex-wrap items-end gap-3">
        <div className="flex-1 min-w-[160px]">
          <Label className="text-[11px] text-muted-foreground mb-1 block">حالة الإجراء</Label>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="h-9 text-xs"><SelectValue /></SelectTrigger>
            <SelectContent>
              {["الكل","مفتوحة","قيد التنفيذ","بانتظار التحقق","مغلقة","متأخرة"].map(s =>
                <SelectItem key={s} value={s}>{s}</SelectItem>
              )}
            </SelectContent>
          </Select>
        </div>
        <div className="flex-1 min-w-[160px]">
          <Label className="text-[11px] text-muted-foreground mb-1 block">الفاعلية</Label>
          <Select value={effectFilter} onValueChange={setEffectFilter}>
            <SelectTrigger className="h-9 text-xs"><SelectValue /></SelectTrigger>
            <SelectContent>
              {["الكل","فعّال","غير فعّال","بانتظار التقييم"].map(s =>
                <SelectItem key={s} value={s}>{s}</SelectItem>
              )}
            </SelectContent>
          </Select>
        </div>
      </div>

      <SectionCard title={`سجل الإجراءات التصحيحية (${filtered.length})`} icon={Wrench}>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead className="bg-muted/40"><tr>
              {["الرقم","عدم المطابقة","الإجراء التصحيحي","المالك","الاستحقاق","الحالة","الفاعلية","تاريخ الإغلاق","انتقال"].map(h =>
                <th key={h} className="p-2 text-right font-semibold text-muted-foreground">{h}</th>
              )}
            </tr></thead>
            <tbody>
              {filtered.slice(0, 25).map(c => (
                <tr key={c.id} className="border-t border-border hover:bg-muted/30">
                  <td className="p-2 font-bold">{c.number}</td>
                  <td className="p-2 text-muted-foreground">{c.ncId}</td>
                  <td className="p-2 max-w-[260px]"><div className="line-clamp-2">{c.description}</div></td>
                  <td className="p-2 text-muted-foreground">{c.ownerName}</td>
                  <td className="p-2 text-muted-foreground">{c.dueDate}</td>
                  <td className="p-2"><StatusBadge status={c.status === "متأخرة" ? "متأخر" : c.status} /></td>
                  <td className="p-2">
                    <span className={`text-[10px] px-1.5 py-0.5 rounded border ${c.effectiveness === "فعّال" ? "bg-success/15 text-success border-success/30" : c.effectiveness === "غير فعّال" ? "bg-destructive/15 text-destructive border-destructive/30" : "bg-muted text-muted-foreground border-border"}`}>
                      {c.effectiveness}
                    </span>
                  </td>
                  <td className="p-2 text-muted-foreground">{c.closeDate || "—"}</td>
                  <td className="p-2">
                    <Button asChild size="sm" variant="outline" className="h-6 text-[10px] gap-1">
                      <Link to="/iso/closure">
                        التحقق <ArrowLeft className="w-3 h-3" />
                      </Link>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionCard>

      <SectionCard title="الإجراءات الوقائية المرتبطة" icon={Lightbulb} className="mt-4">
        <div className="grid md:grid-cols-3 gap-3 text-xs">
          {correctiveActions.filter(c => c.preventiveAction).slice(0, 6).map(c => (
            <div key={c.id} className="p-3 border border-info/30 bg-info/5 rounded-lg">
              <div className="font-bold text-info mb-1">{c.number}</div>
              <div className="text-[11px] mb-1.5">{c.preventiveAction}</div>
              <div className="text-[10px] text-muted-foreground">المالك: {c.ownerName}</div>
            </div>
          ))}
        </div>
      </SectionCard>

      <AuditStageActions current="corrective-actions" />
    </ExcellenceLayout>
  );
}

/* ===================================================================
 * Stage 9: Effectiveness Verification & Closure (التحقق من الفاعلية والإغلاق)
 * =================================================================*/
export function AuditClosurePage() {
  const [selectedCA, setSelectedCA] = useState(correctiveActions.find(c => c.status === "بانتظار التحقق")?.id ?? correctiveActions[0].id);
  const ca = correctiveActions.find(c => c.id === selectedCA)!;
  const nc = nonconformities.find(n => n.id === ca.ncId);

  const effective = correctiveActions.filter(c => c.effectiveness === "فعّال").length;
  const ineffective = correctiveActions.filter(c => c.effectiveness === "غير فعّال").length;
  const pending = correctiveActions.filter(c => c.effectiveness === "بانتظار التقييم").length;
  const closedCount = correctiveActions.filter(c => c.status === "مغلقة").length;
  const closureRate = Math.round((closedCount / correctiveActions.length) * 100);
  const effectivenessRate = effective + ineffective > 0 ? Math.round((effective / (effective + ineffective)) * 100) : 0;

  return (
    <ExcellenceLayout>
      <Breadcrumb items={[
        { label: "الرئيسية", href: "/" },
        { label: "التدقيق الداخلي ISO" },
        { label: "التحقق من الفاعلية والإغلاق" },
      ]} />
      <PageHeader
        title="التحقق من الفاعلية والإغلاق"
        subtitle="التحقق النهائي من فاعلية الإجراءات التصحيحية وإغلاق الحالات بشكل رسمي"
        icon={CheckCircle2}
        actions={
          <Button className="gap-2" onClick={() => toast.success("تم إغلاق الحالة رسمياً")}>
            <CheckCircle2 className="w-4 h-4" /> إغلاق الحالة
          </Button>
        }
      />
      <AuditCrossLinks />
      <AuditWorkflowNav current="closure" />

      <div className="grid md:grid-cols-5 gap-3 mb-4">
        <StatCard label="نسبة الإغلاق الكلية" value={closureRate} suffix="%" icon={CheckCircle2} accent="success" />
        <StatCard label="فاعل" value={effective} icon={CheckCircle2} accent="success" />
        <StatCard label="غير فاعل" value={ineffective} icon={AlertOctagon} accent="destructive" />
        <StatCard label="بانتظار التقييم" value={pending} icon={Eye} accent="warning" />
        <StatCard label="معدل الفاعلية" value={effectivenessRate} suffix="%" icon={Target} accent="primary" />
      </div>

      <div className="grid lg:grid-cols-4 gap-4">
        {/* Left: list of CAs awaiting verification */}
        <div className="lg:col-span-1 space-y-2">
          <div className="text-xs font-bold text-muted-foreground">إجراءات بانتظار التحقق</div>
          {correctiveActions.filter(c => c.status === "بانتظار التحقق" || c.status === "مغلقة").slice(0, 8).map(c => (
            <button
              key={c.id}
              onClick={() => setSelectedCA(c.id)}
              className={`w-full text-right gov-card p-3 transition ${selectedCA === c.id ? "border-primary border-2 bg-primary/5" : "hover:border-primary/40"}`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-bold text-xs">{c.number}</span>
                <StatusBadge status={c.status} />
              </div>
              <div className="text-[11px] text-muted-foreground line-clamp-2">{c.description}</div>
              <div className="text-[10px] mt-1 text-info">{c.ownerName}</div>
            </button>
          ))}
        </div>

        {/* Right: verification details */}
        <div className="lg:col-span-3 space-y-3">
          <SectionCard
            title={`${ca.number} - تفاصيل التحقق`}
            icon={Eye}
            action={<StatusBadge status={ca.status} />}
          >
            <div className="grid md:grid-cols-2 gap-3 text-xs mb-3">
              <div>
                <div className="text-muted-foreground mb-1">الإجراء التصحيحي</div>
                <div className="font-medium">{ca.description}</div>
              </div>
              <div>
                <div className="text-muted-foreground mb-1">عدم المطابقة المرتبطة</div>
                <div className="font-medium">{ca.ncId} — {nc?.description.slice(0, 60)}...</div>
              </div>
              <div>
                <div className="text-muted-foreground mb-1">المالك</div>
                <div className="font-medium">{ca.ownerName}</div>
              </div>
              <div>
                <div className="text-muted-foreground mb-1">تاريخ التنفيذ</div>
                <div className="font-medium">{ca.closeDate || ca.dueDate}</div>
              </div>
            </div>
          </SectionCard>

          <SectionCard title="معايير التحقق من الفاعلية" icon={Target}>
            <div className="space-y-2 text-xs">
              {[
                { label: "هل تم تنفيذ الإجراء بالكامل وفق ما تم الاتفاق عليه؟", default: "نعم" },
                { label: "هل تم رفع جميع الشواهد المطلوبة لإثبات التنفيذ؟", default: "نعم" },
                { label: "هل تم تدريب المعنيين على الإجراء الجديد/المُحدّث؟", default: "نعم" },
                { label: "هل تكررت عدم المطابقة بعد تطبيق الإجراء؟", default: "لا" },
                { label: "هل تحققت النتائج المتوقعة من الإجراء؟", default: "نعم" },
                { label: "هل قام صاحب الإجراء بمراجعة المخاطر بعد التطبيق؟", default: "نعم" },
              ].map((q, i) => (
                <div key={i} className="flex items-center justify-between gap-2 p-2 border border-border rounded bg-muted/20">
                  <span className="flex-1">{i + 1}. {q.label}</span>
                  <Select defaultValue={q.default}>
                    <SelectTrigger className="h-7 w-24 text-[11px]"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {["نعم","جزئياً","لا"].map(o => <SelectItem key={o} value={o}>{o}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
              ))}
            </div>
          </SectionCard>

          <SectionCard title="دليل الإغلاق والشواهد" icon={FileText}>
            <div className="grid md:grid-cols-2 gap-3 text-xs">
              <div>
                <Label className="text-xs">شاهد الإغلاق</Label>
                <Textarea
                  defaultValue={ca.closingEvidence || "تقرير الإغلاق + شواهد التطبيق + سجل التدريب"}
                  className="text-xs mt-1"
                  rows={3}
                />
              </div>
              <div>
                <Label className="text-xs">تقييم الفاعلية النهائي</Label>
                <Select defaultValue={ca.effectiveness}>
                  <SelectTrigger className="h-8 text-xs mt-1"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {["فعّال","غير فعّال","بانتظار التقييم"].map(o => <SelectItem key={o} value={o}>{o}</SelectItem>)}
                  </SelectContent>
                </Select>
                <Label className="text-xs mt-2 block">تاريخ الإغلاق</Label>
                <Input type="date" defaultValue={ca.closeDate || "2026-05-15"} className="h-8 text-xs mt-1" />
              </div>
            </div>
          </SectionCard>

          <SectionCard title="الأثر بعد الإغلاق" icon={TrendingUp}>
            <div className="grid md:grid-cols-3 gap-3 text-xs">
              <div className="p-3 bg-success/10 border border-success/30 rounded">
                <div className="text-[11px] text-muted-foreground">حالة عدم المطابقة الأصلية</div>
                <div className="font-bold text-success mt-1">مغلقة بنجاح</div>
              </div>
              <div className="p-3 bg-info/10 border border-info/30 rounded">
                <div className="text-[11px] text-muted-foreground">فرص التحسين الناشئة</div>
                <div className="font-bold text-info mt-1">3 فرص جديدة</div>
                <Button asChild size="sm" variant="link" className="h-auto p-0 text-[10px] mt-1">
                  <Link to="/gaps">عرض في فرص التحسين <ArrowLeft className="w-3 h-3" /></Link>
                </Button>
              </div>
              <div className="p-3 bg-gold/10 border border-gold/30 rounded">
                <div className="text-[11px] text-muted-foreground">تحسن النضج المؤسسي</div>
                <div className="font-bold text-gold-foreground mt-1">+2 نقطة</div>
              </div>
            </div>
          </SectionCard>

          <SectionCard title="قرار الإغلاق" icon={CheckCircle2}>
            <Textarea
              placeholder="ملاحظات قائد فريق التدقيق على عملية الإغلاق..."
              defaultValue="تم التحقق من فاعلية الإجراء التصحيحي بشكل ميداني وموثق، ولم تتكرر عدم المطابقة. تم الإغلاق رسمياً مع توصية بمتابعة دورية للوقاية."
              className="text-xs"
              rows={3}
            />
            <div className="mt-3 flex justify-end gap-2">
              <Button variant="outline" size="sm">حفظ كمسودة</Button>
              <Button size="sm" className="gap-1" onClick={() => toast.success("تم الإغلاق النهائي وتحديث لوحة القيادة")}>
                <CheckCircle2 className="w-4 h-4" /> إغلاق نهائي ورسمي
              </Button>
            </div>
          </SectionCard>
        </div>
      </div>

      <AuditStageActions current="closure" />
    </ExcellenceLayout>
  );
}
