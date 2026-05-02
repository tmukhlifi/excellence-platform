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

type AgentMsg = { role: "user" | "assistant"; text: string; agent?: string };

const agents = [
  { id: "a1", name: "وكيل EFQM و KAQA", icon: "🏆",
    q: ["ما أعلى فجواتنا في معيار القيادة؟", "اقترح خطة تحسين لمعيار خلق القيمة المستدامة"],
    answer: () => {
      const efqmGaps = gaps.filter(g => g.frameworkId === "f1").sort((a,b) => b.impact - a.impact).slice(0,3);
      return `أعلى الفجوات في EFQM:\n\n${efqmGaps.map((g,i) => `${i+1}. ${g.title} — أثر ${g.impact}/5\n   التوصية: ${g.recommendation}`).join("\n\n")}\n\nمتوسط الجاهزية الحالي: ${frameworks[0].readinessScore}/100. أنصح بالتركيز على المعايير الممكنة قبل النتائج لتحقيق قفزة في الدورة القادمة.`;
    }},
  { id: "a2", name: "وكيل ISO و IMS", icon: "🛡️",
    q: ["ما البنود المشتركة بين معايير ISO؟", "ما حالات عدم المطابقة الجسيمة المفتوحة؟"],
    answer: () => {
      const major = nonconformities.filter(n => n.classification === "جسيمة" && n.status !== "مغلقة");
      return `حالات عدم المطابقة الجسيمة المفتوحة (${major.length}):\n\n${major.map(n => `• ${n.number} — ${getFramework(n.frameworkId)?.shortName} بند ${n.clause}\n  ${n.description}\n  المالك: ${getDept(n.ownerDeptId)?.name} | الاستحقاق: ${n.dueDate}`).join("\n\n")}\n\nيُنصح بعقد لجنة تصحيحية عاجلة خلال 7 أيام.`;
    }},
  { id: "a3", name: "وكيل تحليل الشواهد", icon: "📁",
    q: ["ما الشواهد التي تخدم عدة نماذج؟", "ما الشواهد الناقصة الأعلى أولوية؟"],
    answer: () => {
      const multi = evidences.filter(e => e.frameworkIds.length >= 3).slice(0,5);
      const weak = evidences.filter(e => e.status === "ناقص" || e.strength === "ضعيف");
      return `شواهد متعددة الاستخدام (تخدم 3+ نماذج):\n${multi.map(e => `• ${e.name} → ${e.frameworkIds.length} نماذج`).join("\n")}\n\nشواهد تحتاج معالجة عاجلة (${weak.length}):\n${weak.map(e => `• ${e.name} (${e.status}/${e.strength})`).join("\n")}`;
    }},
  { id: "a4", name: "وكيل فرص التحسين", icon: "💡",
    q: ["ما أعلى 5 فرص أثراً؟", "ما المكاسب السريعة المتاحة؟"],
    answer: () => {
      const quick = improvements.filter(i => i.category === "مكاسب سريعة").slice(0,5);
      return `المكاسب السريعة الموصى بتنفيذها فوراً:\n\n${quick.map((i,idx) => `${idx+1}. ${i.title}\n   الأثر المتوقع: ${i.expectedImpactDescription}\n   المالك: ${getDept(i.ownerDeptId)?.name}`).join("\n\n")}\n\nهذه الفرص يمكن تنفيذها خلال 60 يوماً وتحقيق أثر فوري.`;
    }},
  { id: "a5", name: "وكيل مشاريع التحسين", icon: "🚀",
    q: ["ما المشاريع المتأخرة؟", "ما أعلى مشروع أثراً؟"],
    answer: () => {
      const late = projects.filter(p => p.status === "متأخر");
      const inProg = projects.filter(p => p.status === "قيد التنفيذ");
      return `حالة المشاريع:\n• ${inProg.length} مشروع قيد التنفيذ (متوسط ${Math.round(inProg.reduce((s,p)=>s+p.progress,0)/inProg.length)}%)\n• ${late.length} مشروع متأخر\n\nالمشاريع المتأخرة:\n${late.map(p => `🔴 ${p.name} — ${p.progress}% (${p.ownerName})\n   القرار المطلوب: ${p.decisionsNeeded.join(", ") || "متابعة"}`).join("\n\n")}`;
    }},
  { id: "a6", name: "وكيل المقارنة المعيارية", icon: "📊",
    q: ["ما الإدارات الأعلى نضجاً؟", "ما الإدارات الأكثر تأخراً؟"],
    answer: () => {
      const sorted = [...departments].sort((a,b) => b.maturity - a.maturity);
      return `ترتيب الإدارات حسب النضج:\n\n🥇 الأعلى:\n${sorted.slice(0,3).map((d,i) => `${i+1}. ${d.name} — ${d.maturity}%`).join("\n")}\n\n🔻 الأدنى (تحتاج دعماً):\n${sorted.slice(-3).reverse().map((d,i) => `${i+1}. ${d.name} — ${d.maturity}% (${d.openGaps} فجوة مفتوحة)`).join("\n")}\n\nأنصح بإطلاق برنامج توأمة بين الإدارات الأعلى والأدنى نضجاً.`;
    }},
  { id: "a7", name: "وكيل التقارير التنفيذية", icon: "📑",
    q: ["لخّص جاهزيتنا للقيادة", "ما القرارات المطلوبة من القيادة؟"],
    answer: () => {
      const decisions = projects.flatMap(p => p.decisionsNeeded);
      return `ملخص تنفيذي للقيادة:\n\n📈 المؤشرات الرئيسية:\n• النضج المؤسسي: 74%\n• جاهزية EFQM: 74%\n• جاهزية KAQA: 68%\n• امتثال ISO: 79%\n\n⚠️ القرارات المطلوبة من القيادة:\n${decisions.slice(0,5).map((d,i) => `${i+1}. ${d}`).join("\n")}\n\n💼 التوصية الاستراتيجية: تخصيص لجنة قيادية أسبوعية لمتابعة المسار الحرج.`;
    }},
  { id: "a8", name: "وكيل المخاطر والانحرافات", icon: "⚠️",
    q: ["ما أعلى المخاطر الحرجة؟", "أين الانحرافات؟"],
    answer: () => {
      const critical = gaps.filter(g => g.priority === "حرجة");
      return `المخاطر الحرجة المرصودة (${critical.length}):\n\n${critical.map(g => `🔴 ${g.title}\n   الإدارة: ${getDept(g.ownerDeptId)?.name}\n   الخطر إن أُهمل: ${g.riskIfIgnored}\n   التوصية العاجلة: ${g.recommendation}`).join("\n\n")}`;
    }},
];

export function AdvisorPage() {
  const [activeAgent, setActiveAgent] = useState(agents[0]);
  const [messages, setMessages] = useState<AgentMsg[]>([
    { role: "assistant", text: "أهلاً بك في المستشار الذكي للتميز. اختر وكيلاً متخصصاً من القائمة، ثم اطرح سؤالك أو اختر من الأسئلة المقترحة." }
  ]);
  const [input, setInput] = useState("");

  const ask = (question: string) => {
    if (!question.trim()) return;
    const agent = activeAgent;
    setMessages(m => [...m, { role: "user", text: question }]);
    setInput("");
    setTimeout(() => {
      setMessages(m => [...m, { role: "assistant", text: agent.answer(), agent: agent.name }]);
    }, 500);
  };

  return (
    <ExcellenceLayout>
      <PageHeader title="المستشار الذكي للتميز" subtitle="وكلاء متخصصون لتحليل بياناتك وإعطاء توصيات تنفيذية" icon={Sparkles} />
      <div className="grid lg:grid-cols-3 gap-4">
        <div className="lg:col-span-1 space-y-2">
          <div className="text-xs font-bold text-muted-foreground mb-2">الوكلاء المتخصصون ({agents.length})</div>
          {agents.map(a => (
            <button
              key={a.id}
              onClick={() => setActiveAgent(a)}
              className={`w-full text-right gov-card p-3 transition-all ${activeAgent.id === a.id ? "border-primary border-2 bg-primary/5" : "hover:border-primary"}`}
            >
              <div className="flex items-center gap-2">
                <span className="text-lg">{a.icon}</span>
                <span className="font-semibold text-sm flex-1">{a.name}</span>
                {activeAgent.id === a.id && <Sparkles className="w-3 h-3 text-gold" />}
              </div>
            </button>
          ))}
        </div>
        <div className="lg:col-span-2 gov-card flex flex-col min-h-[600px]">
          <div className="border-b border-border p-3 flex items-center gap-2">
            <span className="text-xl">{activeAgent.icon}</span>
            <div>
              <div className="font-bold text-sm">{activeAgent.name}</div>
              <div className="text-[11px] text-muted-foreground">متصل · مدعوم بتحليل بيانات المنصة</div>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((m, i) => (
              <div key={i} className={`flex gap-2 ${m.role === "user" ? "flex-row-reverse" : ""}`}>
                <Avatar className="w-8 h-8 shrink-0">
                  <AvatarFallback className={m.role === "user" ? "bg-primary text-primary-foreground text-xs" : "bg-gold/20 text-gold text-sm"}>
                    {m.role === "user" ? "أ" : "🤖"}
                  </AvatarFallback>
                </Avatar>
                <div className={`rounded-lg p-3 max-w-[85%] text-sm whitespace-pre-line ${m.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted/50 border border-border"}`}>
                  {m.agent && <div className="text-[10px] font-bold text-gold mb-1">{m.agent}</div>}
                  {m.text}
                </div>
              </div>
            ))}
          </div>
          <div className="border-t border-border p-3 space-y-2">
            <div className="flex flex-wrap gap-1">
              {activeAgent.q.map((q, i) => (
                <button key={i} onClick={() => ask(q)} className="text-[11px] px-2 py-1 rounded-full bg-primary/10 text-primary hover:bg-primary/20 border border-primary/20">
                  {q}
                </button>
              ))}
            </div>
            <div className="flex gap-2">
              <Input
                value={input} onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === "Enter" && ask(input)}
                placeholder={`اسأل ${activeAgent.name}...`} className="flex-1"
              />
              <Button className="gap-2" onClick={() => ask(input)}><Send className="w-4 h-4" /> إرسال</Button>
            </div>
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
      <PageHeader title="الإعدادات" subtitle="إدارة المستخدمين، الأدوار، النماذج، والتفضيلات العامة" icon={Settings} />
      <Tabs defaultValue="users" dir="rtl" className="w-full">
        <TabsList className="grid grid-cols-2 md:grid-cols-5 w-full h-auto">
          <TabsTrigger value="users">المستخدمون والأدوار</TabsTrigger>
          <TabsTrigger value="frameworks">النماذج والأوزان</TabsTrigger>
          <TabsTrigger value="orgs">الإدارات</TabsTrigger>
          <TabsTrigger value="notifications">التنبيهات</TabsTrigger>
          <TabsTrigger value="general">عامة</TabsTrigger>
        </TabsList>

        <TabsContent value="users" className="mt-4">
          <SectionCard title="المستخدمون والأدوار" icon={Settings} action={<Button size="sm" className="gap-1"><Plus className="w-3 h-3" /> مستخدم جديد</Button>}>
            <table className="w-full text-xs">
              <thead><tr className="bg-muted/50">{["الاسم","البريد","الدور","الإدارة","الحالة"].map(h => <th key={h} className="text-right p-2 font-semibold text-muted-foreground">{h}</th>)}</tr></thead>
              <tbody>
                {[
                  { n: "د. عبدالرحمن السهلي", e: "a.alsahli@gov.sa", r: "مدير النظام", d: "إدارة الجودة والتميز", s: "نشط" },
                  { n: "أ. سلطان العتيبي", e: "s.alotaibi@gov.sa", r: "مدير إدارة الجودة والتميز", d: "إدارة الجودة والتميز", s: "نشط" },
                  { n: "د. ناصر الغامدي", e: "n.alghamdi@gov.sa", r: "مالك معيار", d: "التخطيط الاستراتيجي", s: "نشط" },
                  { n: "م. ياسر العنزي", e: "y.alanzi@gov.sa", r: "مدقق ISO", d: "الأمن السيبراني", s: "نشط" },
                  { n: "أ. منى الزهراني", e: "m.alzahrani@gov.sa", r: "مالك مشروع تحسين", d: "الموارد البشرية", s: "نشط" },
                  { n: "أ. ريم الشهري", e: "r.alshehri@gov.sa", r: "مقيم داخلي", d: "التواصل المؤسسي", s: "معلق" },
                ].map((u,i) => (
                  <tr key={i} className="border-t border-border">
                    <td className="p-2 font-medium">{u.n}</td>
                    <td className="p-2 text-muted-foreground">{u.e}</td>
                    <td className="p-2"><span className="text-[10px] px-1.5 py-0.5 rounded bg-primary/10 text-primary">{u.r}</span></td>
                    <td className="p-2 text-muted-foreground">{u.d}</td>
                    <td className="p-2"><StatusBadge status={u.s === "نشط" ? "مكتمل" : "قيد المعالجة"} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </SectionCard>
        </TabsContent>

        <TabsContent value="frameworks" className="mt-4">
          <SectionCard title="أوزان معايير النماذج" icon={FileBarChart} description="ضبط أوزان المعايير لكل نموذج تقييم">
            <div className="space-y-3">
              {frameworks.map(f => (
                <div key={f.id} className="p-3 border border-border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <span className="font-bold text-sm">{f.shortName}</span>
                      <span className="text-[11px] text-muted-foreground mr-2">إجمالي الوزن: {f.totalWeight}</span>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="grid md:grid-cols-3 gap-2 text-[11px]">
                    <div><Label className="text-muted-foreground">حد أدنى للاجتياز</Label><Input type="number" defaultValue={60} className="h-7 mt-1" /></div>
                    <div><Label className="text-muted-foreground">حد التميز</Label><Input type="number" defaultValue={75} className="h-7 mt-1" /></div>
                    <div><Label className="text-muted-foreground">دورة التقييم (شهر)</Label><Input type="number" defaultValue={6} className="h-7 mt-1" /></div>
                  </div>
                </div>
              ))}
            </div>
          </SectionCard>
        </TabsContent>

        <TabsContent value="orgs" className="mt-4">
          <SectionCard title="الإدارات والملاك" icon={Building2}>
            <table className="w-full text-xs">
              <thead><tr className="bg-muted/50">{["الكود","الإدارة","المدير","المعايير المملوكة"].map(h => <th key={h} className="text-right p-2 font-semibold text-muted-foreground">{h}</th>)}</tr></thead>
              <tbody>
                {departments.map(d => (
                  <tr key={d.id} className="border-t border-border">
                    <td className="p-2 font-bold">{d.code}</td>
                    <td className="p-2">{d.name}</td>
                    <td className="p-2 text-muted-foreground">{d.head}</td>
                    <td className="p-2 text-center">{d.ownedStandards}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </SectionCard>
        </TabsContent>

        <TabsContent value="notifications" className="mt-4">
          <SectionCard title="إعدادات التنبيهات" icon={Settings}>
            <div className="space-y-3">
              {[
                { t: "تنبيه عند فجوة جديدة حرجة", d: "إرسال بريد لمالك المعيار والإدارة" },
                { t: "تنبيه عند تأخر مشروع تحسين", d: "إشعار يومي للمدير عند تجاوز الموعد" },
                { t: "تنبيه قرب موعد تدقيق ISO", d: "تذكير قبل 30 و 14 و 7 أيام" },
                { t: "تنبيه عدم مطابقة جسيمة", d: "إشعار فوري للقيادة التنفيذية" },
                { t: "تقرير أسبوعي للقيادة", d: "ملخص تلقائي كل يوم أحد" },
                { t: "تنبيه شواهد منتهية الصلاحية", d: "قبل 60 و 30 يوماً من انتهاء الصلاحية" },
              ].map((n,i) => (
                <div key={i} className="flex items-center justify-between p-3 border border-border rounded-lg">
                  <div><div className="font-semibold text-sm">{n.t}</div><div className="text-[11px] text-muted-foreground">{n.d}</div></div>
                  <Switch defaultChecked={i < 4} />
                </div>
              ))}
            </div>
          </SectionCard>
        </TabsContent>

        <TabsContent value="general" className="mt-4">
          <SectionCard title="إعدادات عامة" icon={Settings}>
            <div className="grid md:grid-cols-2 gap-4">
              <div><Label>اسم الجهة</Label><Input defaultValue="الجهة الحكومية" className="mt-1" /></div>
              <div><Label>السنة المالية</Label><Input defaultValue="2026" className="mt-1" /></div>
              <div><Label>اللغة الافتراضية</Label>
                <select className="w-full h-10 mt-1 border border-input rounded-md px-3 text-sm bg-background"><option>العربية</option><option>English</option></select>
              </div>
              <div><Label>المنطقة الزمنية</Label>
                <select className="w-full h-10 mt-1 border border-input rounded-md px-3 text-sm bg-background"><option>توقيت الرياض (GMT+3)</option></select>
              </div>
              <div className="md:col-span-2"><Label>سياسة الجودة المعتمدة</Label>
                <Textarea rows={4} defaultValue="نلتزم بترسيخ ثقافة التميز المؤسسي وتحقيق أعلى معايير الجودة في جميع خدماتنا، بما يعزز الثقة ويحقق رضا المتعاملين." className="mt-1" />
              </div>
              <div className="md:col-span-2 flex justify-end"><Button onClick={() => toast.success("تم حفظ الإعدادات")}>حفظ التغييرات</Button></div>
            </div>
          </SectionCard>
        </TabsContent>
      </Tabs>
    </ExcellenceLayout>
  );
}