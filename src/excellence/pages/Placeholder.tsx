import { ExcellenceLayout } from "@/excellence/components/ExcellenceLayout";
import { PageHeader } from "@/excellence/components/PageHeader";
import { SectionCard } from "@/excellence/components/SectionCard";
import { StatusBadge } from "@/excellence/components/StatusBadge";
import { ProgressBar } from "@/excellence/components/ProgressBar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  frameworks, evidences, gaps, improvements, projects, nonconformities,
  departments, executiveReports, frameworkMappings, imsClauses, getDept, getFramework, criteria,
} from "@/data/mockData";
import {
  FileBarChart, ClipboardCheck, FolderCheck, AlertTriangle, Rocket, Network,
  Shield, Building2, FileText, Sparkles, BarChart3, Settings, Upload, Plus, Send,
} from "lucide-react";
import { useMemo, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { toast } from "sonner";

export function FrameworksPage() {
  return (
    <ExcellenceLayout>
      <PageHeader title="نماذج التقييم" subtitle="إدارة النماذج المعتمدة (EFQM، KAQA، ISO) ورفع نماذج مخصصة"
        icon={FileBarChart}
        actions={<Button className="gap-2"><Upload className="w-4 h-4" /> رفع نموذج تقييم</Button>} />
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {frameworks.map((f) => (
          <div key={f.id} className="gov-card p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold px-2 py-0.5 rounded bg-primary/10 text-primary">{f.type}</span>
              <StatusBadge status={f.readiness} />
            </div>
            <h3 className="text-base font-bold text-foreground mb-1">{f.shortName}</h3>
            <p className="text-xs text-muted-foreground mb-4 line-clamp-2">{f.description}</p>
            <div className="grid grid-cols-2 gap-2 text-xs mb-4">
              <div><span className="text-muted-foreground">المعايير الرئيسية:</span> <span className="font-bold">{f.mainCriteria}</span></div>
              <div><span className="text-muted-foreground">الفرعية:</span> <span className="font-bold">{f.subCriteria}</span></div>
              <div><span className="text-muted-foreground">الشواهد:</span> <span className="font-bold">{f.evidenceCount}</span></div>
              <div><span className="text-muted-foreground">الفجوات:</span> <span className="font-bold text-destructive">{f.gapsCount}</span></div>
            </div>
            <ProgressBar value={f.completion} label="نسبة الاكتمال" color="primary" />
            <div className="text-[11px] text-muted-foreground mt-3">آخر تقييم: {f.lastAssessment}</div>
          </div>
        ))}
      </div>
    </ExcellenceLayout>
  );
}

export function SelfAssessmentPage() {
  const [selectedFw, setSelectedFw] = useState("f1");
  const fwCriteria = useMemo(() => criteria.filter(c => c.frameworkId === selectedFw), [selectedFw]);
  const [scores, setScores] = useState<Record<string, number>>(() =>
    Object.fromEntries(criteria.map(c => [c.id, c.currentScore]))
  );

  const fw = frameworks.find(f => f.id === selectedFw)!;
  const totalWeight = fwCriteria.reduce((s, c) => s + c.weight, 0) || 1;
  const weightedScore = Math.round(
    fwCriteria.reduce((s, c) => s + (scores[c.id] ?? 0) * c.weight, 0) / totalWeight
  );
  const enablers = fwCriteria.filter(c => c.type === "ممكن");
  const results = fwCriteria.filter(c => c.type === "نتيجة");
  const enablersAvg = enablers.length ? Math.round(enablers.reduce((s, c) => s + (scores[c.id] ?? 0), 0) / enablers.length) : 0;
  const resultsAvg = results.length ? Math.round(results.reduce((s, c) => s + (scores[c.id] ?? 0), 0) / results.length) : 0;

  const handleSave = () => toast.success("تم حفظ التقييم بنجاح (وضع تجريبي)");
  const handleSubmit = () => toast.success(`تم إرسال التقييم للاعتماد - الدرجة الإجمالية ${weightedScore}/100`);

  return (
    <ExcellenceLayout>
      <PageHeader
        title="التقييم الذاتي"
        subtitle="تقييم منهجي وفق RADAR لـ EFQM، إتقان لـ KAQA، والامتثال لـ ISO"
        icon={ClipboardCheck}
        actions={
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleSave}>حفظ مسودة</Button>
            <Button onClick={handleSubmit}>إرسال للاعتماد</Button>
          </div>
        }
      />
      <div className="grid lg:grid-cols-3 gap-3 mb-4">
        {frameworks.slice(0, 6).map((f) => (
          <button
            key={f.id}
            onClick={() => setSelectedFw(f.id)}
            className={`gov-card p-4 text-right transition-all ${selectedFw === f.id ? "border-primary border-2 bg-primary/5" : "hover:border-primary"}`}
          >
            <div className="text-xs text-muted-foreground">{f.type}</div>
            <div className="font-bold mt-1">{f.shortName}</div>
            <div className="text-xs text-muted-foreground mt-2">{f.mainCriteria} معيار · {f.subCriteria} فرعي</div>
          </button>
        ))}
      </div>

      <div className="grid md:grid-cols-4 gap-3 mb-4">
        <div className="gov-card p-4">
          <div className="text-xs text-muted-foreground">الدرجة الإجمالية المرجّحة</div>
          <div className="text-3xl font-bold text-primary mt-1">{weightedScore}<span className="text-sm text-muted-foreground">/100</span></div>
          <ProgressBar value={weightedScore} color={weightedScore >= 75 ? "success" : "warning"} showValue={false} />
        </div>
        <div className="gov-card p-4">
          <div className="text-xs text-muted-foreground">متوسط الممكنات</div>
          <div className="text-3xl font-bold mt-1">{enablersAvg}</div>
          <div className="text-[11px] text-muted-foreground">{enablers.length} معيار ممكن</div>
        </div>
        <div className="gov-card p-4">
          <div className="text-xs text-muted-foreground">متوسط النتائج</div>
          <div className="text-3xl font-bold mt-1">{resultsAvg}</div>
          <div className="text-[11px] text-muted-foreground">{results.length} معيار نتيجة</div>
        </div>
        <div className="gov-card p-4">
          <div className="text-xs text-muted-foreground">فجوة الممكنات-النتائج</div>
          <div className={`text-3xl font-bold mt-1 ${Math.abs(enablersAvg - resultsAvg) > 10 ? "text-warning" : "text-success"}`}>
            {enablersAvg - resultsAvg > 0 ? "+" : ""}{enablersAvg - resultsAvg}
          </div>
          <div className="text-[11px] text-muted-foreground">{Math.abs(enablersAvg - resultsAvg) > 10 ? "تحتاج محاذاة" : "متوازنة"}</div>
        </div>
      </div>

      <SectionCard title={`معايير ${fw.shortName} - تقييم تفاعلي`} icon={ClipboardCheck} description="حرّك المؤشر لتحديث الدرجة الحالية - تتم إعادة الحساب فوراً">
        <div className="space-y-3">
          {fwCriteria.map((c) => {
            const val = scores[c.id] ?? c.currentScore;
            return (
              <div key={c.id} className="p-3 border border-border rounded-lg hover:border-primary/40 transition">
                <div className="flex items-center justify-between mb-2 flex-wrap gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs px-2 py-0.5 rounded bg-muted font-semibold">{c.type}</span>
                    <span className="font-semibold text-sm">{c.code}. {c.name}</span>
                    <span className="text-[10px] text-muted-foreground">وزن {c.weight}</span>
                  </div>
                  <span className="text-xs text-muted-foreground">{getDept(c.ownerDeptId)?.name}</span>
                </div>
                <div className="grid md:grid-cols-[1fr_auto_auto] gap-3 items-center">
                  <input
                    type="range" min={0} max={100} value={val}
                    onChange={(e) => setScores(s => ({ ...s, [c.id]: Number(e.target.value) }))}
                    className="w-full accent-primary"
                  />
                  <div className="text-center min-w-[80px]">
                    <div className={`text-2xl font-bold ${val >= 75 ? "text-success" : val >= 50 ? "text-warning" : "text-destructive"}`}>{val}</div>
                    <div className="text-[10px] text-muted-foreground">من {c.targetScore}</div>
                  </div>
                  <div className="text-[11px] text-muted-foreground min-w-[90px] text-center">
                    فجوة <b className="text-foreground">{Math.max(0, c.targetScore - val)}</b><br/>
                    {c.gaps} فجوة موثقة
                  </div>
                </div>
                {c.notes && <p className="text-[11px] text-muted-foreground mt-2 italic">ملاحظة: {c.notes}</p>}
              </div>
            );
          })}
        </div>
      </SectionCard>
    </ExcellenceLayout>
  );
}

export function EvidencesPage() {
  return (
    <ExcellenceLayout>
      <PageHeader title="سجل الشواهد" subtitle="إدارة الشواهد المرتبطة بالمعايير وقوتها وحالتها" icon={FolderCheck}
        actions={<Button className="gap-2"><Plus className="w-4 h-4" /> إضافة شاهد</Button>} />
      <div className="gov-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead className="bg-muted/50">
              <tr>
                {["الشاهد","النوع","النماذج","الإدارة المالكة","الحالة","القوة","آخر مراجعة"].map(h => <th key={h} className="text-right p-3 font-semibold text-muted-foreground">{h}</th>)}
              </tr>
            </thead>
            <tbody>
              {evidences.map((e) => (
                <tr key={e.id} className="border-t border-border hover:bg-muted/30">
                  <td className="p-3 font-medium text-foreground">{e.name}</td>
                  <td className="p-3 text-muted-foreground">{e.type}</td>
                  <td className="p-3"><div className="flex gap-1 flex-wrap">{e.frameworkIds.map(fid => <span key={fid} className="text-[10px] px-1.5 py-0.5 rounded bg-primary/10 text-primary">{getFramework(fid)?.shortName}</span>)}</div></td>
                  <td className="p-3 text-muted-foreground">{getDept(e.ownerDeptId)?.name}</td>
                  <td className="p-3"><StatusBadge status={e.status} /></td>
                  <td className="p-3"><StatusBadge status={e.strength} /></td>
                  <td className="p-3 text-muted-foreground">{e.lastReview}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </ExcellenceLayout>
  );
}

export function GapsPage() {
  const [priority, setPriority] = useState<string>("الكل");
  const [dept, setDept] = useState<string>("الكل");
  const filteredGaps = gaps.filter(g =>
    (priority === "الكل" || g.priority === priority) &&
    (dept === "الكل" || g.ownerDeptId === dept)
  );
  return (
    <ExcellenceLayout>
      <PageHeader title="الفجوات وفرص التحسين" subtitle="تحليل الفجوات بمصفوفة الأثر والجهد وتحويلها إلى مشاريع" icon={AlertTriangle} />
      <SectionCard title="مصفوفة الأثر / الجهد" description="تصنيف الفرص حسب الأولوية" className="mb-6">
        <div className="grid grid-cols-2 gap-2 h-72">
          <div className="bg-success/10 border border-success/30 rounded-lg p-3 flex flex-col"><div className="text-xs font-bold text-success mb-2">مكاسب سريعة (أثر عالٍ، جهد منخفض)</div><div className="flex-1 overflow-auto space-y-1">{improvements.filter(i => i.category === "مكاسب سريعة").map(i => <div key={i.id} className="text-[11px] p-1.5 bg-card rounded">{i.title}</div>)}</div></div>
          <div className="bg-gold/10 border border-gold/30 rounded-lg p-3 flex flex-col"><div className="text-xs font-bold text-gold mb-2">مشاريع استراتيجية (أثر عالٍ، جهد عالٍ)</div><div className="flex-1 overflow-auto space-y-1">{improvements.filter(i => i.category === "مشروع استراتيجي").map(i => <div key={i.id} className="text-[11px] p-1.5 bg-card rounded">{i.title}</div>)}</div></div>
          <div className="bg-info/10 border border-info/30 rounded-lg p-3 flex flex-col"><div className="text-xs font-bold text-info mb-2">تحسينات تشغيلية (أثر منخفض، جهد منخفض)</div><div className="flex-1 overflow-auto space-y-1">{improvements.filter(i => i.category === "تحسينات تشغيلية").map(i => <div key={i.id} className="text-[11px] p-1.5 bg-card rounded">{i.title}</div>)}</div></div>
          <div className="bg-muted border border-border rounded-lg p-3 flex flex-col"><div className="text-xs font-bold text-muted-foreground mb-2">يؤجل (أثر منخفض، جهد عالٍ)</div><div className="flex-1 overflow-auto space-y-1">{improvements.filter(i => i.category === "يؤجل").map(i => <div key={i.id} className="text-[11px] p-1.5 bg-card rounded">{i.title}</div>)}</div></div>
        </div>
      </SectionCard>
      <SectionCard
        title={`الفجوات (${filteredGaps.length} من ${gaps.length})`}
        icon={AlertTriangle}
        action={
          <div className="flex flex-wrap gap-2">
            <select value={priority} onChange={e => setPriority(e.target.value)} className="h-8 text-xs border border-input rounded-md px-2 bg-background">
              {["الكل","حرجة","عالية","متوسطة","منخفضة"].map(p => <option key={p}>{p}</option>)}
            </select>
            <select value={dept} onChange={e => setDept(e.target.value)} className="h-8 text-xs border border-input rounded-md px-2 bg-background">
              <option value="الكل">كل الإدارات</option>
              {departments.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
            </select>
          </div>
        }
      >
        <div className="space-y-2">
          {filteredGaps.length === 0 && <div className="text-center text-sm text-muted-foreground py-8">لا توجد فجوات تطابق الفلترة</div>}
          {filteredGaps.map(g => (
            <div key={g.id} className="p-3 border border-border rounded-lg hover:border-primary/30">
              <div className="flex items-center justify-between mb-1 gap-2 flex-wrap">
                <h4 className="font-semibold text-sm">{g.title}</h4>
                <div className="flex gap-1 items-center">
                  <StatusBadge status={g.priority} />
                  <StatusBadge status={g.status} />
                  {g.convertibleToProject && g.status !== "تم تحويلها" && (
                    <Button size="sm" variant="outline" className="h-6 text-[11px] gap-1" onClick={() => toast.success(`تم تحويل "${g.title}" إلى مشروع تحسين`)}>
                      <Rocket className="w-3 h-3" /> حوّل لمشروع
                    </Button>
                  )}
                </div>
              </div>
              <p className="text-xs text-muted-foreground mb-2">{g.description}</p>
              <div className="text-[11px] text-muted-foreground">السبب الجذري: {g.rootCause} · أثر {g.impact}/5 · جهد {g.effort}/5 · {getDept(g.ownerDeptId)?.name}</div>
              <div className="text-[11px] mt-1 text-primary">التوصية: {g.recommendation}</div>
            </div>
          ))}
        </div>
      </SectionCard>
    </ExcellenceLayout>
  );
}

export function ProjectsPage() {
  const cols = ["مقترح","معتمد","قيد التنفيذ","متأخر","مكتمل","مغلق بعد قياس الأثر"] as const;
  return (
    <ExcellenceLayout>
      <PageHeader title="مشاريع التحسين" subtitle="عرض Kanban لمتابعة المشاريع وتحقيق الأثر" icon={Rocket}
        actions={<Button className="gap-2"><Plus className="w-4 h-4" /> مشروع جديد</Button>} />
      <div className="grid grid-cols-2 lg:grid-cols-6 gap-3">
        {cols.map(col => (
          <div key={col} className="bg-muted/30 rounded-lg p-2 min-h-[200px]">
            <div className="flex items-center justify-between mb-2 px-1">
              <h4 className="text-xs font-bold">{col}</h4>
              <span className="text-[10px] bg-card px-1.5 py-0.5 rounded">{projects.filter(p => p.status === col).length}</span>
            </div>
            <div className="space-y-2">
              {projects.filter(p => p.status === col).map(p => (
                <div key={p.id} className="bg-card border border-border rounded-md p-2 hover:border-primary/40 cursor-pointer">
                  <div className="text-xs font-semibold line-clamp-2">{p.name}</div>
                  <div className="text-[10px] text-muted-foreground mt-1">{p.ownerName}</div>
                  <ProgressBar value={p.progress} size="sm" showValue={false} color={p.status === "متأخر" ? "destructive" : "primary"} />
                  <div className="text-[10px] text-muted-foreground mt-1">{p.progress}% · {p.endDate}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </ExcellenceLayout>
  );
}

export function MappingPage() {
  return (
    <ExcellenceLayout>
      <PageHeader title="التكامل بين النماذج" subtitle="جدول Mapping بين EFQM و KAQA و ISO" icon={Network} />
      <div className="gov-card overflow-x-auto">
        <table className="w-full text-xs">
          <thead className="bg-muted/50">
            <tr>{["EFQM","KAQA","ISO 9001","ISO 14001","ISO 45001","ISO 27001","شواهد مشتركة","قوة العلاقة"].map(h => <th key={h} className="p-2 text-right font-semibold text-muted-foreground">{h}</th>)}</tr>
          </thead>
          <tbody>
            {frameworkMappings.map((m, i) => (
              <tr key={i} className="border-t border-border">
                <td className="p-2"><div className="font-bold">{m.efqmCode}</div><div className="text-[10px] text-muted-foreground">{m.efqmName}</div></td>
                <td className="p-2"><div className="font-bold">{m.kaqaCode}</div><div className="text-[10px] text-muted-foreground">{m.kaqaName}</div></td>
                <td className="p-2 text-muted-foreground">{m.iso9001}</td>
                <td className="p-2 text-muted-foreground">{m.iso14001}</td>
                <td className="p-2 text-muted-foreground">{m.iso45001}</td>
                <td className="p-2 text-muted-foreground">{m.iso27001}</td>
                <td className="p-2 font-bold text-center">{m.sharedEvidenceCount}</td>
                <td className="p-2"><StatusBadge status={m.relationStrength} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </ExcellenceLayout>
  );
}

export function IsoPage() {
  return (
    <ExcellenceLayout>
      <PageHeader title="ISO ونظام الإدارة المتكامل IMS" subtitle="البنود المشتركة، حالات عدم المطابقة، والإجراءات التصحيحية" icon={Shield} />
      <SectionCard title="البنود المشتركة بين معايير ISO" icon={Shield} className="mb-6">
        <table className="w-full text-xs">
          <thead><tr>{["البند","العنوان","9001","14001","45001","27001","شواهد","المالك"].map(h => <th key={h} className="text-right p-2 font-semibold text-muted-foreground">{h}</th>)}</tr></thead>
          <tbody>
            {imsClauses.map(c => (
              <tr key={c.clause} className="border-t border-border">
                <td className="p-2 font-bold">{c.clause}</td>
                <td className="p-2">{c.title}</td>
                {[c.iso9001, c.iso14001, c.iso45001, c.iso27001].map((v, i) => <td key={i} className="p-2 text-center">{v ? "✓" : "—"}</td>)}
                <td className="p-2 text-center font-bold">{c.sharedEvidenceCount}</td>
                <td className="p-2 text-muted-foreground">{getDept(c.ownerDeptId)?.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </SectionCard>
      <SectionCard title="سجل عدم المطابقة" icon={AlertTriangle}>
        <table className="w-full text-xs">
          <thead><tr>{["الرقم","المعيار","البند","الوصف","التصنيف","المالك","الاستحقاق","الحالة"].map(h => <th key={h} className="text-right p-2 font-semibold text-muted-foreground">{h}</th>)}</tr></thead>
          <tbody>
            {nonconformities.map(n => (
              <tr key={n.id} className="border-t border-border">
                <td className="p-2 font-bold">{n.number}</td>
                <td className="p-2">{getFramework(n.frameworkId)?.shortName}</td>
                <td className="p-2 text-muted-foreground">{n.clause}</td>
                <td className="p-2 max-w-xs">{n.description}</td>
                <td className="p-2"><StatusBadge status={n.classification} /></td>
                <td className="p-2 text-muted-foreground">{getDept(n.ownerDeptId)?.name}</td>
                <td className="p-2 text-muted-foreground">{n.dueDate}</td>
                <td className="p-2"><StatusBadge status={n.status} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </SectionCard>
    </ExcellenceLayout>
  );
}

export function DepartmentsPage() {
  return (
    <ExcellenceLayout>
      <PageHeader title="الإدارات والملاك" subtitle="نضج كل إدارة وعلاقاتها بالمعايير" icon={Building2} />
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
        {departments.map(d => (
          <div key={d.id} className="gov-card p-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-bold text-sm">{d.name}</h3>
              <span className="text-xs text-muted-foreground">{d.code}</span>
            </div>
            <p className="text-xs text-muted-foreground mb-3">{d.head}</p>
            <ProgressBar value={d.maturity} label="النضج" color={d.maturity >= 75 ? "success" : "primary"} />
            <ProgressBar value={d.compliance} label="الامتثال" color="info" />
            <ProgressBar value={d.evidenceCompletion} label="إكمال الشواهد" color="gold" />
            <div className="grid grid-cols-3 gap-2 mt-3 text-[11px] text-center">
              <div className="bg-muted/40 rounded p-1.5"><div className="font-bold">{d.ownedStandards}</div><div className="text-muted-foreground">معيار</div></div>
              <div className="bg-muted/40 rounded p-1.5"><div className="font-bold text-warning">{d.openGaps}</div><div className="text-muted-foreground">فجوة</div></div>
              <div className="bg-muted/40 rounded p-1.5"><div className="font-bold text-info">{d.openProjects}</div><div className="text-muted-foreground">مشروع</div></div>
            </div>
          </div>
        ))}
      </div>
    </ExcellenceLayout>
  );
}

export function ReportsPage() {
  return (
    <ExcellenceLayout>
      <PageHeader title="التقارير التنفيذية" subtitle="تقارير جاهزة للقيادة قابلة للتصدير" icon={FileText} />
      <div className="grid md:grid-cols-2 gap-4">
        {executiveReports.map(r => (
          <div key={r.id} className="gov-card p-5">
            <div className="flex items-start justify-between mb-2">
              <div><span className="text-[10px] px-1.5 py-0.5 rounded bg-primary/10 text-primary">{r.type}</span>
                <h3 className="font-bold text-sm mt-1">{r.title}</h3></div>
              <Button size="sm" variant="outline" className="gap-1 text-xs"><FileText className="w-3 h-3" /> PDF</Button>
            </div>
            <p className="text-xs text-muted-foreground mb-3">{r.summary}</p>
            <div className="text-[11px] space-y-1">
              <div><b className="text-foreground">أبرز النتائج:</b> <span className="text-muted-foreground">{r.topFindings.join(" · ")}</span></div>
              <div><b className="text-foreground">التوصيات:</b> <span className="text-muted-foreground">{r.recommendations.join(" · ")}</span></div>
            </div>
            <div className="text-[10px] text-muted-foreground mt-2">{r.date}</div>
          </div>
        ))}
      </div>
    </ExcellenceLayout>
  );
}

const agents = [
  { id: "a1", name: "وكيل EFQM و KAQA", q: ["ما أعلى فجواتنا في معيار القيادة؟", "اقترح خطة تحسين لمعيار خلق القيمة المستدامة"] },
  { id: "a2", name: "وكيل ISO و IMS", q: ["ما البنود المشتركة بين ISO 9001 و ISO 14001؟", "ما حالات عدم المطابقة الجسيمة المفتوحة؟"] },
  { id: "a3", name: "وكيل تحليل الشواهد", q: ["ما الشواهد التي يمكن استخدامها لأكثر من معيار؟", "ما الشواهد الناقصة الأعلى أولوية؟"] },
  { id: "a4", name: "وكيل فرص التحسين", q: ["ما أعلى 5 فرص أثراً؟", "ما المكاسب السريعة المتاحة؟"] },
  { id: "a5", name: "وكيل مشاريع التحسين", q: ["ما المشاريع المتأخرة؟", "ما أعلى مشروع أثراً على الجاهزية؟"] },
  { id: "a6", name: "وكيل المقارنة المعيارية", q: ["قارن نضج إدارتنا بالمستوى المرجعي", "ما الإدارات الأكثر تأخراً؟"] },
  { id: "a7", name: "وكيل التقارير التنفيذية", q: ["لخّص جاهزيتنا للقيادة", "ما القرارات المطلوبة من القيادة؟"] },
  { id: "a8", name: "وكيل المخاطر والانحرافات", q: ["ما أعلى المخاطر؟", "أين الانحرافات الحرجة؟"] },
];

export function AdvisorPage() {
  return (
    <ExcellenceLayout>
      <PageHeader title="المستشار الذكي للتميز" subtitle="وكلاء متخصصون لتحليل بياناتك وإعطاء توصيات تنفيذية" icon={Sparkles} />
      <div className="grid lg:grid-cols-3 gap-4">
        <div className="lg:col-span-1 space-y-2">
          {agents.map(a => (
            <button key={a.id} className="w-full text-right gov-card p-3 hover:border-primary transition-all">
              <div className="flex items-center gap-2"><Sparkles className="w-4 h-4 text-gold" /><span className="font-semibold text-sm">{a.name}</span></div>
            </button>
          ))}
        </div>
        <div className="lg:col-span-2 gov-card p-4 flex flex-col min-h-[500px]">
          <div className="flex-1 space-y-3">
            <div className="bg-muted/40 rounded-lg p-3 text-sm">
              <b>المستشار الذكي:</b> أهلاً بك. اختر وكيلاً متخصصاً، أو اختر سؤالاً جاهزاً لبدء التحليل.
            </div>
            <div className="bg-primary/5 border border-primary/20 rounded-lg p-3 text-sm">
              <b className="text-primary">أمثلة على الأسئلة:</b>
              <ul className="mt-2 space-y-1 text-xs list-disc pr-5">
                {agents[0].q.concat(agents[1].q, agents[3].q).map((q, i) => <li key={i}>{q}</li>)}
              </ul>
            </div>
            <div className="bg-card border border-border rounded-lg p-3 text-sm">
              <b className="text-foreground">إجابة تجريبية:</b>
              <p className="text-xs text-muted-foreground mt-1">بناءً على آخر تقييم، أعلى الفجوات في معيار القيادة هي: ضعف في برامج التطوير القيادي، وغياب مؤشرات قياس ثقافة التميز. التوصية المقترحة: إطلاق أكاديمية القيادات (مشروع نشط)، وتطوير إطار قياس ثقافي ربع سنوي.</p>
            </div>
          </div>
          <div className="flex gap-2 mt-4">
            <Input placeholder="اكتب سؤالك للمستشار الذكي..." className="flex-1" />
            <Button className="gap-2"><Send className="w-4 h-4" /> إرسال</Button>
          </div>
        </div>
      </div>
    </ExcellenceLayout>
  );
}

export function BenchmarkPage() {
  return (
    <ExcellenceLayout>
      <PageHeader title="المقارنة المعيارية" subtitle="مقارنات بين الإدارات والدورات والمستهدفات" icon={BarChart3} />
      <div className="grid lg:grid-cols-2 gap-4">
        <SectionCard title="مقارنة نضج الإدارات" icon={Building2}>
          <div className="space-y-2">{departments.map(d => (
            <div key={d.id} className="flex items-center gap-3"><span className="text-xs w-32 truncate">{d.name}</span><div className="flex-1"><ProgressBar value={d.maturity} color="primary" /></div></div>
          ))}</div>
        </SectionCard>
        <SectionCard title="مقارنة جاهزية النماذج" icon={FileBarChart}>
          <div className="space-y-2">{frameworks.map(f => (
            <div key={f.id} className="flex items-center gap-3"><span className="text-xs w-24">{f.shortName}</span><div className="flex-1"><ProgressBar value={f.readinessScore} color="gold" /></div></div>
          ))}</div>
        </SectionCard>
      </div>
    </ExcellenceLayout>
  );
}

export function ExcellenceSettingsPage() {
  return (
    <ExcellenceLayout>
      <PageHeader title="الإعدادات" subtitle="إدارة المستخدمين، الأدوار، النماذج، والإعدادات العامة" icon={Settings} />
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
        {["إدارة المستخدمين","إدارة الأدوار","إدارة النماذج","إدارة الإدارات","إدارة الحالات","إدارة الأوزان","إدارة الأولويات","قوالب التقارير","إعدادات اللغة","إعدادات التنبيهات"].map(s => (
          <div key={s} className="gov-card p-4 hover:border-primary cursor-pointer">
            <div className="flex items-center gap-2"><Settings className="w-4 h-4 text-primary" /><span className="font-semibold text-sm">{s}</span></div>
            <p className="text-xs text-muted-foreground mt-1">إعدادات تجريبية</p>
          </div>
        ))}
      </div>
    </ExcellenceLayout>
  );
}