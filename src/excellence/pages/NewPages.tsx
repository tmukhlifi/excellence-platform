import { ExcellenceLayout } from "@/excellence/components/ExcellenceLayout";
import { PageHeader } from "@/excellence/components/PageHeader";
import { SectionCard } from "@/excellence/components/SectionCard";
import { StatusBadge } from "@/excellence/components/StatusBadge";
import { StatCard } from "@/excellence/components/StatCard";
import { ProgressBar } from "@/excellence/components/ProgressBar";
import { Breadcrumb, WorkflowStepper, EmptyState } from "@/excellence/components/WorkflowStepper";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "sonner";
import { useMemo, useState } from "react";
import {
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Legend,
  PieChart, Pie, Cell, LineChart, Line,
} from "recharts";
import {
  Calendar, ClipboardList, ShieldCheck, FileWarning, Wrench, Users, KeyRound,
  Activity, Bell, FileText, Plus, Filter, Download, CheckCircle2, AlertOctagon,
  Search, ChevronDown, ChevronLeft, Workflow,
} from "lucide-react";
import {
  auditPlans, auditEngagements, checklistItems, correctiveActions,
  extUsers, extendedRoles, matrixModules, allPermissions, defaultPermissionsByRole,
  notifications, activityLogs, subCriteria, subCriteriaOf, getSubCriterion, getGuidancePoints,
  getUser, extendedDashboardKpis, workflowStates,
} from "@/data/mockDataExtended";
import { departments, frameworks, getDept, getFramework, nonconformities } from "@/data/mockData";

/* ============== ISO Audit Plans ============== */
export function AuditPlansPage() {
  const [filter, setFilter] = useState("الكل");
  const filtered = filter === "الكل" ? auditPlans : auditPlans.filter(a => a.status === filter);
  return (
    <ExcellenceLayout>
      <Breadcrumb items={[{label:"الرئيسية",href:"/"},{label:"برنامج التدقيق ISO"},{label:"خطة التدقيق السنوية"}]} />
      <PageHeader title="خطة التدقيق السنوية" subtitle="إدارة خطط التدقيق المعتمدة لمعايير ISO وعرضها على شريط زمني"
        icon={Calendar}
        actions={<><Button variant="outline" className="gap-2"><Download className="w-4 h-4"/>تصدير</Button><Button className="gap-2"><Plus className="w-4 h-4"/>خطة جديدة</Button></>} />
      <div className="grid md:grid-cols-4 gap-3 mb-4">
        <StatCard label="إجمالي الخطط" value={auditPlans.length} icon={Calendar} accent="primary" />
        <StatCard label="مخططة" value={auditPlans.filter(a=>a.status==="مخطط").length} icon={ClipboardList} accent="info" />
        <StatCard label="قيد التنفيذ" value={auditPlans.filter(a=>a.status==="قيد التنفيذ").length} icon={Activity} accent="warning" />
        <StatCard label="مكتملة" value={auditPlans.filter(a=>a.status==="مكتمل").length} icon={CheckCircle2} accent="success" />
      </div>
      <SectionCard title="الجدول الزمني للتدقيق 2026" icon={Calendar} className="mb-4">
        <div className="space-y-2">
          {auditPlans.map(p => {
            const month = parseInt(p.plannedDate.slice(5,7)) - 1;
            return (
              <div key={p.id} className="flex items-center gap-3 text-xs">
                <div className="w-32 font-semibold truncate">{p.number}</div>
                <div className="flex-1 relative h-7 bg-muted/40 rounded">
                  <div className="absolute h-full rounded bg-primary/70 flex items-center px-2 text-[10px] text-primary-foreground font-bold"
                    style={{ right: `${(month/12)*100}%`, width: "11%" }}>
                    {p.plannedDate.slice(5)}
                  </div>
                </div>
                <StatusBadge status={p.status} />
              </div>
            );
          })}
          <div className="grid grid-cols-12 gap-1 text-[10px] text-muted-foreground mt-2">
            {["1","2","3","4","5","6","7","8","9","10","11","12"].map(m => <div key={m} className="text-center">{m}</div>)}
          </div>
        </div>
      </SectionCard>
      <SectionCard title={`خطط التدقيق (${filtered.length})`} icon={ClipboardList}
        action={<Select value={filter} onValueChange={setFilter}><SelectTrigger className="h-8 w-32 text-xs"><SelectValue/></SelectTrigger><SelectContent>{["الكل","مخطط","قيد التنفيذ","مكتمل","متأخر","مغلق"].map(s=><SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent></Select>}>
        <div className="overflow-x-auto"><table className="w-full text-xs">
          <thead className="bg-muted/40"><tr>{["الرقم","النطاق","المعيار","الإدارات","قائد الفريق","التاريخ","المخاطر","الأولوية","الحالة"].map(h=><th key={h} className="p-2 text-right font-semibold text-muted-foreground">{h}</th>)}</tr></thead>
          <tbody>{filtered.map(p=>(
            <tr key={p.id} className="border-t border-border hover:bg-muted/30">
              <td className="p-2 font-bold">{p.number}</td>
              <td className="p-2">{p.scope}</td>
              <td className="p-2 text-muted-foreground">{getFramework(p.isoFrameworkId)?.shortName}</td>
              <td className="p-2 text-muted-foreground text-[10px]">{p.departmentIds.map(d=>getDept(d)?.code).join(", ")}</td>
              <td className="p-2 text-muted-foreground">{p.leadAuditor}</td>
              <td className="p-2 text-muted-foreground">{p.plannedDate}</td>
              <td className="p-2"><StatusBadge status={p.riskLevel === "عالٍ" ? "حرجة" : p.riskLevel === "متوسط" ? "متوسطة" : "منخفضة"} /></td>
              <td className="p-2"><StatusBadge status={p.priority} /></td>
              <td className="p-2"><StatusBadge status={p.status} /></td>
            </tr>))}</tbody></table></div>
      </SectionCard>
    </ExcellenceLayout>
  );
}

/* ============== ISO Audit Engagements ============== */
export function AuditEngagementsPage() {
  return (
    <ExcellenceLayout>
      <Breadcrumb items={[{label:"الرئيسية",href:"/"},{label:"برنامج التدقيق ISO"},{label:"عمليات التدقيق"}]} />
      <PageHeader title="جدولة عمليات التدقيق" subtitle="إدارة عمليات التدقيق التفصيلية المرتبطة بالخطط السنوية"
        icon={ClipboardList}
        actions={<Button className="gap-2"><Plus className="w-4 h-4"/>عملية تدقيق جديدة</Button>} />
      <SectionCard title={`عمليات التدقيق (${auditEngagements.length})`} icon={ClipboardList}>
        <div className="overflow-x-auto"><table className="w-full text-xs">
          <thead className="bg-muted/40"><tr>{["العملية","المعيار","البند","الإدارة","البداية","النهاية","المدقق","الحالة","الإنجاز","ملاحظات"].map(h=><th key={h} className="p-2 text-right font-semibold text-muted-foreground">{h}</th>)}</tr></thead>
          <tbody>{auditEngagements.map(e=>(
            <tr key={e.id} className="border-t border-border hover:bg-muted/30">
              <td className="p-2 font-medium">{e.name}</td>
              <td className="p-2">{getFramework(e.isoFrameworkId)?.shortName}</td>
              <td className="p-2 text-muted-foreground">{e.mainClause} / {e.subClause}</td>
              <td className="p-2 text-muted-foreground">{getDept(e.auditedDeptId)?.name}</td>
              <td className="p-2 text-muted-foreground">{e.startDate}</td>
              <td className="p-2 text-muted-foreground">{e.endDate}</td>
              <td className="p-2 text-muted-foreground">{e.leadAuditor}</td>
              <td className="p-2"><StatusBadge status={e.status} /></td>
              <td className="p-2"><div className="w-20"><ProgressBar value={e.progress} showValue={false} size="sm" /></div></td>
              <td className="p-2 text-[10px] text-muted-foreground">NC: {e.ncCount} · ملاحظات: {e.observationCount}</td>
            </tr>))}</tbody></table></div>
      </SectionCard>
    </ExcellenceLayout>
  );
}

/* ============== ISO Checklists ============== */
export function ChecklistsPage() {
  const [fw, setFw] = useState("f3");
  const items = checklistItems.filter(c => c.isoFrameworkId === fw);
  const [results, setResults] = useState<Record<string,string>>({});
  return (
    <ExcellenceLayout>
      <Breadcrumb items={[{label:"الرئيسية",href:"/"},{label:"برنامج التدقيق ISO"},{label:"قوائم التحقق"}]} />
      <PageHeader title="قوائم التحقق ISO" subtitle="قوائم تحقق تفاعلية لمعايير ISO 9001/14001/45001/27001" icon={ShieldCheck} />
      <div className="grid md:grid-cols-4 gap-2 mb-4">
        {["f3","f4","f5","f6"].map(id => {
          const f = getFramework(id)!;
          const cnt = checklistItems.filter(c=>c.isoFrameworkId===id).length;
          return <button key={id} onClick={()=>setFw(id)} className={`gov-card p-3 text-right ${fw===id?"border-primary border-2 bg-primary/5":""}`}>
            <div className="font-bold text-sm">{f.shortName}</div>
            <div className="text-[11px] text-muted-foreground">{cnt} بند تحقق</div>
          </button>;
        })}
      </div>
      <SectionCard title={`بنود التحقق - ${getFramework(fw)?.shortName} (${items.length})`} icon={ShieldCheck}
        action={<Button size="sm" className="gap-1" onClick={()=>toast.success("تم حفظ التقدم")}><CheckCircle2 className="w-3 h-3"/>حفظ التقدم</Button>}>
        <div className="space-y-2 max-h-[600px] overflow-y-auto">
          {items.map(it => {
            const r = results[it.id] ?? it.result;
            return (
              <div key={it.id} className="p-3 border border-border rounded-lg hover:border-primary/30">
                <div className="flex items-start justify-between gap-2 mb-2 flex-wrap">
                  <div className="flex-1 min-w-0">
                    <div className="text-[10px] text-muted-foreground mb-1">البند {it.mainClause} / {it.subClause} · المالك: {getDept(it.ownerDeptId)?.name}</div>
                    <div className="text-sm font-medium">{it.question}</div>
                    <div className="text-[11px] text-muted-foreground mt-1">الشاهد المطلوب: {it.requiredEvidence}</div>
                  </div>
                  <div className="flex flex-col gap-1 items-end">
                    <Select value={r} onValueChange={(v)=>setResults(s=>({...s,[it.id]:v}))}>
                      <SelectTrigger className="h-7 w-32 text-[11px]"><SelectValue/></SelectTrigger>
                      <SelectContent>{["—","مطابق","مطابق جزئياً","غير مطابق","لا ينطبق"].map(o=><SelectItem key={o} value={o}>{o}</SelectItem>)}</SelectContent>
                    </Select>
                    {it.hasNC && <StatusBadge status="جسيمة" />}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </SectionCard>
    </ExcellenceLayout>
  );
}

/* ============== Audit Execution ============== */
export function AuditExecutionPage() {
  const [selected, setSelected] = useState(auditEngagements[2].id);
  const eng = auditEngagements.find(e=>e.id===selected)!;
  const items = checklistItems.filter(c=>c.isoFrameworkId===eng.isoFrameworkId).slice(0, 12);
  return (
    <ExcellenceLayout>
      <Breadcrumb items={[{label:"الرئيسية",href:"/"},{label:"برنامج التدقيق ISO"},{label:"تنفيذ التدقيق"}]} />
      <PageHeader title="تنفيذ التدقيق" subtitle="شاشة تنفيذ تدقيق تفاعلية لإدخال نتائج كل بند مع الملاحظات والشواهد" icon={Workflow}
        actions={<><Button variant="outline" onClick={()=>toast.success("تم حفظ المسودة")}>حفظ مسودة</Button><Button onClick={()=>toast.success("تم إنهاء التدقيق وإرسال النتائج")}>إنهاء التدقيق</Button></>} />
      <div className="grid lg:grid-cols-4 gap-4">
        <div className="lg:col-span-1 space-y-2">
          <div className="text-xs font-bold text-muted-foreground">عمليات التدقيق</div>
          {auditEngagements.slice(0,6).map(e=>(
            <button key={e.id} onClick={()=>setSelected(e.id)} className={`w-full text-right gov-card p-3 ${selected===e.id?"border-primary border-2":""}`}>
              <div className="font-semibold text-sm">{e.name}</div>
              <div className="text-[11px] text-muted-foreground">{getFramework(e.isoFrameworkId)?.shortName} · {e.subClause}</div>
              <ProgressBar value={e.progress} size="sm" showValue={false} />
            </button>
          ))}
        </div>
        <div className="lg:col-span-3 space-y-3">
          <SectionCard title={eng.name} icon={Workflow} description={`${eng.startDate} → ${eng.endDate} · ${eng.leadAuditor}`}>
            <WorkflowStepper steps={workflowStates.audit} current="مراجعة قائد التدقيق" />
          </SectionCard>
          <SectionCard title="بنود التحقق - إدخال النتائج" icon={ClipboardList}>
            <div className="space-y-3">
              {items.map(it=>(
                <div key={it.id} className="p-3 border border-border rounded-lg">
                  <div className="text-sm font-medium mb-2">[{it.subClause}] {it.question}</div>
                  <div className="grid md:grid-cols-3 gap-2">
                    <Select defaultValue="مطابق"><SelectTrigger className="h-8 text-xs"><SelectValue/></SelectTrigger>
                      <SelectContent>{["مطابقة","ملاحظة تحسين","عدم مطابقة بسيطة","عدم مطابقة جسيمة"].map(o=><SelectItem key={o} value={o}>{o}</SelectItem>)}</SelectContent></Select>
                    <Select defaultValue="متوسط"><SelectTrigger className="h-8 text-xs"><SelectValue/></SelectTrigger>
                      <SelectContent>{["عالٍ","متوسط","منخفض"].map(o=><SelectItem key={o} value={o}>مخاطر {o}</SelectItem>)}</SelectContent></Select>
                    <Button size="sm" variant="outline" className="h-8">رفع شاهد</Button>
                  </div>
                  <Textarea placeholder="ملاحظة المدقق..." className="mt-2 text-xs" rows={2} />
                </div>
              ))}
            </div>
          </SectionCard>
        </div>
      </div>
    </ExcellenceLayout>
  );
}

/* ============== Audit Results ============== */
export function AuditResultsPage() {
  const totalNC = nonconformities.length;
  const major = nonconformities.filter(n=>n.classification==="جسيمة").length;
  const minor = nonconformities.filter(n=>n.classification==="بسيطة").length;
  const obs = nonconformities.filter(n=>n.classification==="ملاحظة").length;
  const byDept = departments.slice(0,8).map(d => ({ name: d.code, NC: Math.max(0, ((d.id.charCodeAt(1)*3) % 8)) }));
  const byClause = ["4","5","6","7","8","9","10"].map(c=>({clause:c, count: 1 + (parseInt(c)*2)%6}));
  return (
    <ExcellenceLayout>
      <Breadcrumb items={[{label:"الرئيسية",href:"/"},{label:"برنامج التدقيق ISO"},{label:"نتائج التدقيق"}]} />
      <PageHeader title="نتائج التدقيق" subtitle="لوحة شاملة لنتائج عمليات التدقيق ومؤشرات الأداء" icon={Activity} />
      <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-3 mb-4">
        <StatCard label="إجمالي التدقيقات" value={auditEngagements.length} icon={ClipboardList} accent="primary" />
        <StatCard label="نسبة الإنجاز" value={Math.round(auditEngagements.reduce((s,e)=>s+e.progress,0)/auditEngagements.length)} suffix="%" icon={Activity} accent="info" />
        <StatCard label="حالات مطابقة" value={142} icon={CheckCircle2} accent="success" />
        <StatCard label="عدم مطابقة بسيطة" value={minor} icon={FileWarning} accent="warning" />
        <StatCard label="عدم مطابقة جسيمة" value={major} icon={AlertOctagon} accent="destructive" />
        <StatCard label="ملاحظات تحسين" value={obs} icon={Wrench} accent="gold" />
      </div>
      <div className="grid lg:grid-cols-2 gap-4 mb-4">
        <SectionCard title="حالات عدم المطابقة حسب الإدارة" icon={Activity}>
          <div className="h-64"><ResponsiveContainer><BarChart data={byDept}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="name" tick={{fontSize:10}} /><YAxis tick={{fontSize:10}} />
            <Tooltip contentStyle={{background:"hsl(var(--card))",border:"1px solid hsl(var(--border))",fontSize:12}} />
            <Bar dataKey="NC" fill="hsl(var(--destructive))" radius={[4,4,0,0]} />
          </BarChart></ResponsiveContainer></div>
        </SectionCard>
        <SectionCard title="عدم المطابقة حسب البند" icon={Activity}>
          <div className="h-64"><ResponsiveContainer><BarChart data={byClause}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="clause" tick={{fontSize:10}} /><YAxis tick={{fontSize:10}} />
            <Tooltip contentStyle={{background:"hsl(var(--card))",border:"1px solid hsl(var(--border))",fontSize:12}} />
            <Bar dataKey="count" fill="hsl(var(--warning))" radius={[4,4,0,0]} />
          </BarChart></ResponsiveContainer></div>
        </SectionCard>
      </div>
      <SectionCard title="مؤشرات الإغلاق" icon={CheckCircle2}>
        <div className="grid md:grid-cols-3 gap-4">
          <div><div className="text-xs text-muted-foreground mb-1">نسبة إغلاق الإجراءات التصحيحية</div><ProgressBar value={72} color="success" /></div>
          <div><div className="text-xs text-muted-foreground mb-1">متوسط مدة الإغلاق</div><div className="text-2xl font-bold">68 <span className="text-sm text-muted-foreground">يوم</span></div></div>
          <div><div className="text-xs text-muted-foreground mb-1">حالات متأخرة</div><div className="text-2xl font-bold text-destructive">{correctiveActions.filter(c=>c.status==="متأخرة").length}</div></div>
        </div>
      </SectionCard>
    </ExcellenceLayout>
  );
}

/* ============== Non-Conformities + CAPA ============== */
export function NonConformitiesPage() {
  const [selected, setSelected] = useState<string|null>(null);
  const sel = selected ? nonconformities.find(n=>n.id===selected) : null;
  return (
    <ExcellenceLayout>
      <Breadcrumb items={[{label:"الرئيسية",href:"/"},{label:"برنامج التدقيق ISO"},{label:"عدم المطابقة والإجراءات التصحيحية"}]} />
      <PageHeader title="عدم المطابقة والإجراءات التصحيحية" subtitle="سجل شامل مع تحليل الأسباب الجذرية (5 لماذا) وتتبع الإجراءات" icon={FileWarning} />
      <div className="grid md:grid-cols-4 gap-3 mb-4">
        <StatCard label="إجمالي NC" value={nonconformities.length} icon={FileWarning} accent="warning" />
        <StatCard label="جسيمة مفتوحة" value={nonconformities.filter(n=>n.classification==="جسيمة" && n.status!=="مغلقة").length} icon={AlertOctagon} accent="destructive" />
        <StatCard label="إجراءات تصحيحية" value={correctiveActions.length} icon={Wrench} accent="info" />
        <StatCard label="متأخرة" value={correctiveActions.filter(c=>c.status==="متأخرة").length} icon={AlertOctagon} accent="destructive" />
      </div>
      <Tabs defaultValue="nc" dir="rtl">
        <TabsList><TabsTrigger value="nc">حالات عدم المطابقة</TabsTrigger><TabsTrigger value="ca">الإجراءات التصحيحية</TabsTrigger></TabsList>
        <TabsContent value="nc" className="mt-3">
          <SectionCard title="السجل" icon={FileWarning}>
            <div className="overflow-x-auto"><table className="w-full text-xs">
              <thead className="bg-muted/40"><tr>{["الرقم","المصدر","المعيار","البند","الوصف","التصنيف","المالك","الاستحقاق","الحالة","إجراء"].map(h=><th key={h} className="p-2 text-right font-semibold text-muted-foreground">{h}</th>)}</tr></thead>
              <tbody>{nonconformities.map(n=>(
                <tr key={n.id} className="border-t border-border hover:bg-muted/30">
                  <td className="p-2 font-bold">{n.number}</td>
                  <td className="p-2 text-muted-foreground">تدقيق داخلي</td>
                  <td className="p-2">{getFramework(n.frameworkId)?.shortName}</td>
                  <td className="p-2 text-muted-foreground">{n.clause}</td>
                  <td className="p-2 max-w-xs">{n.description}</td>
                  <td className="p-2"><StatusBadge status={n.classification} /></td>
                  <td className="p-2 text-muted-foreground">{getDept(n.ownerDeptId)?.name}</td>
                  <td className="p-2 text-muted-foreground">{n.dueDate}</td>
                  <td className="p-2"><StatusBadge status={n.status} /></td>
                  <td className="p-2"><div className="flex gap-1">
                    <Button size="sm" variant="outline" className="h-6 text-[10px]" onClick={()=>setSelected(n.id)}>تفاصيل</Button>
                    <Button size="sm" className="h-6 text-[10px]" onClick={()=>toast.success("تم تحويلها إلى مشروع تحسين")}>حوّل لمشروع</Button>
                  </div></td>
                </tr>))}</tbody></table></div>
          </SectionCard>
        </TabsContent>
        <TabsContent value="ca" className="mt-3">
          <SectionCard title={`الإجراءات التصحيحية (${correctiveActions.length})`} icon={Wrench}>
            <div className="overflow-x-auto"><table className="w-full text-xs">
              <thead className="bg-muted/40"><tr>{["الرقم","عدم المطابقة","الإجراء","المالك","الاستحقاق","الحالة","الفاعلية","تاريخ الإغلاق"].map(h=><th key={h} className="p-2 text-right font-semibold text-muted-foreground">{h}</th>)}</tr></thead>
              <tbody>{correctiveActions.slice(0,20).map(c=>(
                <tr key={c.id} className="border-t border-border">
                  <td className="p-2 font-bold">{c.number}</td>
                  <td className="p-2 text-muted-foreground">{c.ncId}</td>
                  <td className="p-2 max-w-xs">{c.description}</td>
                  <td className="p-2 text-muted-foreground">{c.ownerName}</td>
                  <td className="p-2 text-muted-foreground">{c.dueDate}</td>
                  <td className="p-2"><StatusBadge status={c.status==="متأخرة"?"متأخر":c.status} /></td>
                  <td className="p-2 text-muted-foreground">{c.effectiveness}</td>
                  <td className="p-2 text-muted-foreground">{c.closeDate || "—"}</td>
                </tr>))}</tbody></table></div>
          </SectionCard>
        </TabsContent>
      </Tabs>
      <Dialog open={!!selected} onOpenChange={(o)=>!o&&setSelected(null)}>
        <DialogContent className="max-w-2xl" dir="rtl">
          <DialogHeader><DialogTitle>{sel?.number} - تحليل السبب الجذري</DialogTitle></DialogHeader>
          {sel && <div className="space-y-3 text-sm">
            <div><b>الوصف:</b> {sel.description}</div>
            <div><b>التصنيف:</b> <StatusBadge status={sel.classification} /></div>
            <div className="bg-muted/40 p-3 rounded">
              <div className="font-bold mb-2">5 لماذا:</div>
              <ol className="space-y-1 text-xs list-decimal mr-4">
                {(correctiveActions[0].fiveWhys).map((w,i)=><li key={i}>{w}</li>)}
              </ol>
            </div>
            <div><b>الإجراء التصحيحي:</b> {sel.correctiveAction}</div>
          </div>}
        </DialogContent>
      </Dialog>
    </ExcellenceLayout>
  );
}

/* ============== Impact on Excellence ============== */
export function ImpactOnExcellencePage() {
  return (
    <ExcellenceLayout>
      <Breadcrumb items={[{label:"الرئيسية",href:"/"},{label:"برنامج التدقيق ISO"},{label:"الأثر على التميز المؤسسي"}]} />
      <PageHeader title="أثر تدقيق ISO على التميز المؤسسي" subtitle="كيف تنعكس نتائج التدقيق على جاهزية EFQM وKAQA والنضج المؤسسي" icon={Activity} />
      <div className="grid md:grid-cols-3 gap-3 mb-4">
        <StatCard label="الأثر على EFQM" value={-3} suffix=" نقطة" icon={Activity} accent="warning" hint="بسبب 3 NC جسيمة" />
        <StatCard label="الأثر على KAQA" value={-4} suffix=" نقطة" icon={Activity} accent="warning" />
        <StatCard label="جودة الشواهد" value={-5} suffix="%" icon={FileWarning} accent="destructive" />
      </div>
      <SectionCard title="مصفوفة الأثر" icon={Activity}>
        <table className="w-full text-xs">
          <thead className="bg-muted/40"><tr>{["مجال الأثر","قبل","بعد","الاتجاه","ملاحظات"].map(h=><th key={h} className="p-2 text-right font-semibold text-muted-foreground">{h}</th>)}</tr></thead>
          <tbody>
            {[
              ["جاهزية EFQM",74,71,"تراجع","NC جسيمة في 8.5"],
              ["جاهزية KAQA",68,64,"تراجع","ضعف في الممكنات"],
              ["النضج المؤسسي",74,72,"تراجع","تأخر إغلاق NC"],
              ["جودة الشواهد",78,73,"تراجع","شواهد مرفوضة"],
              ["فرص التحسين الجديدة",30,38,"تحسن","8 فرص جديدة من التدقيق"],
              ["المخاطر التشغيلية",38,45,"تصاعد","مخاطر إضافية"],
            ].map((r,i)=>(
              <tr key={i} className="border-t border-border">
                <td className="p-2 font-medium">{r[0]}</td>
                <td className="p-2 text-muted-foreground">{r[1]}</td>
                <td className="p-2 font-bold">{r[2]}</td>
                <td className="p-2"><StatusBadge status={r[3]==="تحسن"?"مكتمل":"متأخر"} /></td>
                <td className="p-2 text-muted-foreground">{r[4]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </SectionCard>
    </ExcellenceLayout>
  );
}

/* ============== Users ============== */
export function UsersListPage() {
  return (
    <ExcellenceLayout>
      <Breadcrumb items={[{label:"الرئيسية",href:"/"},{label:"المستخدمون والصلاحيات"},{label:"إدارة المستخدمين"}]} />
      <PageHeader title="إدارة المستخدمين" subtitle="إدارة المستخدمين وأدوارهم وحالتهم" icon={Users}
        actions={<Button className="gap-2" onClick={()=>toast.success("نموذج إضافة مستخدم")}><Plus className="w-4 h-4"/>مستخدم جديد</Button>} />
      <div className="grid md:grid-cols-4 gap-3 mb-4">
        <StatCard label="إجمالي المستخدمين" value={extUsers.length} icon={Users} accent="primary" />
        <StatCard label="نشط" value={extUsers.filter(u=>u.status==="نشط").length} icon={CheckCircle2} accent="success" />
        <StatCard label="بانتظار التفعيل" value={extUsers.filter(u=>u.status==="بانتظار التفعيل").length} icon={Bell} accent="warning" />
        <StatCard label="مهام متأخرة" value={extUsers.reduce((s,u)=>s+u.overdueActions,0)} icon={AlertOctagon} accent="destructive" />
      </div>
      <SectionCard title="المستخدمون" icon={Users}>
        <div className="overflow-x-auto"><table className="w-full text-xs">
          <thead className="bg-muted/40"><tr>{["الاسم","البريد","الإدارة","المسمى","الدور","الحالة","آخر دخول","المهام","الشواهد","المتأخرة","إجراء"].map(h=><th key={h} className="p-2 text-right font-semibold text-muted-foreground">{h}</th>)}</tr></thead>
          <tbody>{extUsers.map(u=>(
            <tr key={u.id} className="border-t border-border hover:bg-muted/30">
              <td className="p-2 font-medium">{u.name}</td>
              <td className="p-2 text-muted-foreground text-[10px]">{u.email}</td>
              <td className="p-2 text-muted-foreground">{getDept(u.deptId)?.name}</td>
              <td className="p-2 text-muted-foreground">{u.position}</td>
              <td className="p-2"><span className="text-[10px] px-1.5 py-0.5 rounded bg-primary/10 text-primary">{u.role}</span></td>
              <td className="p-2"><StatusBadge status={u.status==="نشط"?"مكتمل":u.status==="موقوف"?"متأخر":"قيد المعالجة"} /></td>
              <td className="p-2 text-muted-foreground text-[10px]">{u.lastLogin}</td>
              <td className="p-2 text-center font-bold">{u.assignedTasks}</td>
              <td className="p-2 text-center">{u.assignedEvidences}</td>
              <td className="p-2 text-center text-destructive font-bold">{u.overdueActions}</td>
              <td className="p-2"><div className="flex gap-1">
                <Button size="sm" variant="ghost" className="h-6 text-[10px]" onClick={()=>toast.success("تم إعادة تعيين كلمة المرور")}>إعادة تعيين</Button>
                <Button size="sm" variant="ghost" className="h-6 text-[10px]" onClick={()=>toast.success("تم تعديل المستخدم")}>تعديل</Button>
              </div></td>
            </tr>))}</tbody></table></div>
      </SectionCard>
    </ExcellenceLayout>
  );
}

export function RolesPage() {
  return (
    <ExcellenceLayout>
      <Breadcrumb items={[{label:"الرئيسية",href:"/"},{label:"المستخدمون والصلاحيات"},{label:"الأدوار"}]} />
      <PageHeader title="الأدوار في النظام" subtitle="عشرة أدوار محددة بصلاحيات افتراضية قابلة للتخصيص" icon={KeyRound} />
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
        {extendedRoles.map(r => {
          const cnt = extUsers.filter(u=>u.role===r).length;
          return (
            <div key={r} className="gov-card p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-bold text-sm">{r}</h3>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-primary/10 text-primary">{cnt} مستخدم</span>
              </div>
              <div className="text-[11px] text-muted-foreground">
                صلاحيات افتراضية على {Object.values(defaultPermissionsByRole[r]).flat().length} عملية
              </div>
            </div>
          );
        })}
      </div>
    </ExcellenceLayout>
  );
}

export function PermissionsMatrixPage() {
  const [matrix, setMatrix] = useState(() => {
    const m: Record<string, Record<string, Record<string, boolean>>> = {};
    for (const role of extendedRoles) {
      m[role] = {};
      for (const mod of matrixModules) {
        m[role][mod] = {};
        for (const p of allPermissions) {
          m[role][mod][p] = defaultPermissionsByRole[role][mod].includes(p);
        }
      }
    }
    return m;
  });
  const [role, setRole] = useState(extendedRoles[1]);
  return (
    <ExcellenceLayout>
      <Breadcrumb items={[{label:"الرئيسية",href:"/"},{label:"المستخدمون والصلاحيات"},{label:"مصفوفة الصلاحيات"}]} />
      <PageHeader title="مصفوفة الصلاحيات" subtitle="صلاحيات تفصيلية لكل دور على كل وحدة في النظام" icon={KeyRound}
        actions={<Button className="gap-2" onClick={()=>toast.success("تم حفظ المصفوفة")}><CheckCircle2 className="w-4 h-4"/>حفظ التغييرات</Button>} />
      <div className="mb-3 flex items-center gap-2">
        <Label className="text-xs">عرض الدور:</Label>
        <Select value={role} onValueChange={(v:any)=>setRole(v)}>
          <SelectTrigger className="h-8 w-64 text-xs"><SelectValue/></SelectTrigger>
          <SelectContent>{extendedRoles.map(r=><SelectItem key={r} value={r}>{r}</SelectItem>)}</SelectContent>
        </Select>
      </div>
      <SectionCard title={`مصفوفة صلاحيات: ${role}`} icon={KeyRound}>
        <div className="overflow-x-auto"><table className="w-full text-xs">
          <thead className="bg-muted/40"><tr><th className="p-2 text-right font-semibold text-muted-foreground sticky right-0 bg-muted/40">الوحدة</th>
            {allPermissions.map(p=><th key={p} className="p-2 text-center font-semibold text-muted-foreground">{p}</th>)}</tr></thead>
          <tbody>{matrixModules.map(m=>(
            <tr key={m} className="border-t border-border">
              <td className="p-2 font-medium sticky right-0 bg-card">{m}</td>
              {allPermissions.map(p=>(
                <td key={p} className="p-2 text-center">
                  <Switch checked={matrix[role][m][p]} onCheckedChange={(v)=>setMatrix(s=>({...s,[role]:{...s[role],[m]:{...s[role][m],[p]:v}}}))} />
                </td>
              ))}
            </tr>))}</tbody></table></div>
      </SectionCard>
    </ExcellenceLayout>
  );
}

export function ActivityLogPage() {
  const [search, setSearch] = useState("");
  const filtered = activityLogs.filter(l => !search || l.userName.includes(search) || l.action.includes(search) || l.module.includes(search));
  return (
    <ExcellenceLayout>
      <Breadcrumb items={[{label:"الرئيسية",href:"/"},{label:"المستخدمون والصلاحيات"},{label:"سجل النشاطات"}]} />
      <PageHeader title="سجل النشاطات (Audit Trail)" subtitle={`${activityLogs.length} عملية مسجلة`} icon={Activity} />
      <SectionCard title="السجل" icon={Activity}
        action={<div className="flex items-center gap-2"><Search className="w-4 h-4 text-muted-foreground" /><Input value={search} onChange={e=>setSearch(e.target.value)} placeholder="بحث..." className="h-8 w-48 text-xs" /></div>}>
        <div className="max-h-[600px] overflow-y-auto"><table className="w-full text-xs">
          <thead className="bg-muted/40 sticky top-0"><tr>{["المستخدم","العملية","الوحدة","النوع","الوقت","قبل","بعد","IP","الحالة"].map(h=><th key={h} className="p-2 text-right font-semibold text-muted-foreground">{h}</th>)}</tr></thead>
          <tbody>{filtered.slice(0,50).map(l=>(
            <tr key={l.id} className="border-t border-border">
              <td className="p-2 font-medium">{l.userName}</td>
              <td className="p-2">{l.action}</td>
              <td className="p-2 text-muted-foreground">{l.module}</td>
              <td className="p-2"><span className="text-[10px] px-1.5 py-0.5 rounded bg-primary/10 text-primary">{l.changeType}</span></td>
              <td className="p-2 text-muted-foreground text-[10px]">{l.timestamp}</td>
              <td className="p-2 text-muted-foreground text-[10px]">{l.before}</td>
              <td className="p-2 text-muted-foreground text-[10px]">{l.after}</td>
              <td className="p-2 text-muted-foreground text-[10px]">{l.ip}</td>
              <td className="p-2"><StatusBadge status={l.status==="ناجح"?"مكتمل":"متأخر"} /></td>
            </tr>))}</tbody></table></div>
      </SectionCard>
    </ExcellenceLayout>
  );
}

/* ============== Notifications ============== */
export function NotificationsPage() {
  const [filter, setFilter] = useState("الكل");
  const filtered = filter === "الكل" ? notifications : notifications.filter(n=>n.priority===filter);
  return (
    <ExcellenceLayout>
      <Breadcrumb items={[{label:"الرئيسية",href:"/"},{label:"التنبيهات والمهام"}]} />
      <PageHeader title="التنبيهات والمهام" subtitle="مركز موحد لجميع التنبيهات وطلبات الاعتماد والمهام المسندة" icon={Bell} />
      <div className="grid md:grid-cols-4 gap-3 mb-4">
        <StatCard label="إجمالي التنبيهات" value={notifications.length} icon={Bell} accent="primary" />
        <StatCard label="حرجة" value={notifications.filter(n=>n.priority==="حرجة").length} icon={AlertOctagon} accent="destructive" />
        <StatCard label="عالية" value={notifications.filter(n=>n.priority==="عالية").length} icon={Bell} accent="warning" />
        <StatCard label="بانتظار اعتماد" value={notifications.filter(n=>n.type==="اعتماد").length} icon={CheckCircle2} accent="info" />
      </div>
      <SectionCard title="القائمة" icon={Bell}
        action={<Select value={filter} onValueChange={setFilter}><SelectTrigger className="h-8 w-32 text-xs"><SelectValue/></SelectTrigger><SelectContent>{["الكل","حرجة","عالية","متوسطة","منخفضة"].map(s=><SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent></Select>}>
        <div className="space-y-2">
          {filtered.map(n=>(
            <a key={n.id} href={n.link} className="block p-3 border border-border rounded-lg hover:border-primary/40 hover:bg-muted/20">
              <div className="flex items-center justify-between gap-2 mb-1 flex-wrap">
                <div className="flex items-center gap-2">
                  <StatusBadge status={n.priority} />
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-muted text-muted-foreground">{n.type}</span>
                  <h4 className="font-semibold text-sm">{n.title}</h4>
                </div>
                <div className="text-[11px] text-muted-foreground">{n.dueDate}</div>
              </div>
              <p className="text-xs text-muted-foreground">{n.description}</p>
              <div className="text-[11px] text-muted-foreground mt-1">المسؤول: {getUser(n.ownerUserId)?.name}</div>
            </a>
          ))}
        </div>
      </SectionCard>
    </ExcellenceLayout>
  );
}

/* ============== Sub-criteria detail (used by Frameworks tab) ============== */
export function SubCriteriaManagementPage() {
  const [fw, setFw] = useState("f1");
  const [expanded, setExpanded] = useState<Record<string,boolean>>({});
  const fwSubs = subCriteriaOf(fw);
  const groupedByParent = useMemo(() => {
    const map: Record<string, typeof fwSubs> = {};
    fwSubs.forEach(s => { (map[s.parentCode] = map[s.parentCode] || []).push(s); });
    return map;
  }, [fwSubs]);
  return (
    <ExcellenceLayout>
      <Breadcrumb items={[{label:"الرئيسية",href:"/"},{label:"نماذج التقييم"},{label:"إدارة المعايير والمعايير الفرعية"}]} />
      <PageHeader title="إدارة المعايير والمعايير الفرعية" subtitle="هيكل هرمي تفاعلي للنماذج والمعايير الفرعية والنقاط الإرشادية" icon={ClipboardList} />
      <div className="grid md:grid-cols-4 gap-2 mb-4">
        {frameworks.slice(0,4).map(f=>(
          <button key={f.id} onClick={()=>setFw(f.id)} className={`gov-card p-3 text-right ${fw===f.id?"border-primary border-2 bg-primary/5":""}`}>
            <div className="font-bold text-sm">{f.shortName}</div>
            <div className="text-[11px] text-muted-foreground">{subCriteriaOf(f.id).length} معيار فرعي</div>
          </button>
        ))}
      </div>
      <SectionCard title={`الهيكل الهرمي - ${getFramework(fw)?.shortName}`} icon={ClipboardList}>
        <div className="overflow-x-auto"><table className="w-full text-xs">
          <thead className="bg-muted/40"><tr>{["","المعيار","الكود","الوزن","الدرجة القصوى","المالك","الشواهد المطلوبة/المتوفرة","الاكتمال","آخر تقييم","الجاهزية"].map(h=><th key={h} className="p-2 text-right font-semibold text-muted-foreground">{h}</th>)}</tr></thead>
          <tbody>
            {Object.entries(groupedByParent).map(([parent, subs]) => {
              const open = expanded[parent] !== false;
              const totalAvail = subs.reduce((s,c)=>s+c.availableEvidences,0);
              const totalReq = subs.reduce((s,c)=>s+c.requiredEvidences,0);
              const avgComp = Math.round(subs.reduce((s,c)=>s+c.completion,0)/subs.length);
              return (
                <>
                  <tr key={parent} className="border-t-2 border-primary/30 bg-primary/5 font-bold cursor-pointer" onClick={()=>setExpanded(s=>({...s,[parent]:!open}))}>
                    <td className="p-2"><ChevronDown className={`w-4 h-4 transition ${open?"":"-rotate-90"}`} /></td>
                    <td className="p-2 text-primary">{subs[0].parentName}</td>
                    <td className="p-2">{parent}</td>
                    <td className="p-2">{subs.reduce((s,c)=>s+c.weight,0)}</td>
                    <td className="p-2">100</td>
                    <td className="p-2 text-muted-foreground">—</td>
                    <td className="p-2 text-center">{totalReq}/{totalAvail}</td>
                    <td className="p-2"><div className="w-20 inline-block"><ProgressBar value={avgComp} size="sm" showValue={false} /></div></td>
                    <td className="p-2"></td>
                    <td className="p-2"></td>
                  </tr>
                  {open && subs.map(s=>(
                    <tr key={s.id} className="border-t border-border hover:bg-muted/20">
                      <td className="p-2"></td>
                      <td className="p-2 pr-6 text-foreground">{s.name}</td>
                      <td className="p-2 text-muted-foreground">{s.code}</td>
                      <td className="p-2">{s.weight}</td>
                      <td className="p-2">{s.maxScore}</td>
                      <td className="p-2 text-muted-foreground text-[10px]">{getDept(s.ownerDeptId)?.name}</td>
                      <td className="p-2 text-center">{s.requiredEvidences}/{s.availableEvidences}</td>
                      <td className="p-2"><div className="w-20"><ProgressBar value={s.completion} size="sm" showValue={false} /></div></td>
                      <td className="p-2 text-muted-foreground text-[10px]">{s.lastAssessment}</td>
                      <td className="p-2"><StatusBadge status={s.readiness} /></td>
                    </tr>
                  ))}
                  {open && subs.map(s=>{
                    const gps = getGuidancePoints(s.id);
                    if (gps.length === 0) return null;
                    return (
                      <tr key={s.id+"_gps"} className="bg-muted/10">
                        <td className="p-2"></td>
                        <td colSpan={9} className="p-2 pr-12">
                          <div className="text-[10px] text-muted-foreground mb-1">النقاط الإرشادية للمعيار {s.code}:</div>
                          <div className="flex flex-wrap gap-1">
                            {gps.map(g=>(
                              <span key={g.id} className={`text-[10px] px-2 py-0.5 rounded border ${g.satisfied?"bg-success/10 text-success border-success/30":"bg-muted text-muted-foreground border-border"}`}>
                                {g.satisfied?"✓":"○"} {g.text}
                              </span>
                            ))}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </>
              );
            })}
          </tbody></table></div>
      </SectionCard>
    </ExcellenceLayout>
  );
}