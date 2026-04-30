import { ExcellenceLayout } from "@/excellence/components/ExcellenceLayout";
import { PageHeader } from "@/excellence/components/PageHeader";
import { StatCard } from "@/excellence/components/StatCard";
import { SectionCard } from "@/excellence/components/SectionCard";
import { ProgressBar } from "@/excellence/components/ProgressBar";
import { StatusBadge } from "@/excellence/components/StatusBadge";
import { Button } from "@/components/ui/button";
import {
  Award, ShieldCheck, FolderCheck, AlertTriangle, Lightbulb, Rocket,
  Activity, ClipboardCheck, Building2, Target, FileBarChart, Download, Filter,
} from "lucide-react";
import {
  ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid,
  BarChart, Bar, PieChart, Pie, Cell, Legend, RadarChart, PolarGrid, PolarAngleAxis,
  PolarRadiusAxis, Radar,
} from "recharts";
import {
  overallMetrics, maturityTrend, topGaps, topImprovements, projects, departments,
  criteria, frameworks, getDept,
} from "@/data/mockData";

const projectStatusData = [
  { name: "لم يبدأ / مقترح", value: projects.filter(p => p.status === "مقترح").length, color: "hsl(220 10% 60%)" },
  { name: "معتمد", value: projects.filter(p => p.status === "معتمد").length, color: "hsl(42 75% 52%)" },
  { name: "قيد التنفيذ", value: projects.filter(p => p.status === "قيد التنفيذ").length, color: "hsl(210 75% 45%)" },
  { name: "متأخر", value: projects.filter(p => p.status === "متأخر").length, color: "hsl(0 70% 45%)" },
  { name: "مكتمل", value: projects.filter(p => p.status === "مكتمل").length, color: "hsl(152 60% 35%)" },
];

const efqmEnablersResults = criteria.filter(c => c.frameworkId === "f1").map(c => ({
  name: c.name.length > 18 ? c.name.slice(0, 16) + "…" : c.name,
  current: c.currentScore,
  target: c.targetScore,
  type: c.type,
}));

const departmentMaturity = departments.map(d => ({
  name: d.code,
  fullName: d.name,
  maturity: d.maturity,
  compliance: d.compliance,
}));

const heatmapDepts = departments.slice(0, 8);
const heatmapFrameworks = frameworks;

function heatColor(score: number) {
  if (score >= 85) return "bg-success/80 text-success-foreground";
  if (score >= 70) return "bg-success/40 text-foreground";
  if (score >= 55) return "bg-warning/50 text-foreground";
  return "bg-destructive/50 text-destructive-foreground";
}

export default function ExcellenceDashboard() {
  return (
    <ExcellenceLayout>
      <PageHeader
        title="لوحة القيادة التنفيذية"
        subtitle="نظرة شاملة على جاهزية التميز والامتثال وأثر مشاريع التحسين"
        icon={Activity}
        actions={
          <>
            <Button variant="outline" size="sm" className="gap-2"><Filter className="w-4 h-4" /> تصفية</Button>
            <Button size="sm" className="gap-2"><Download className="w-4 h-4" /> تصدير التقرير التنفيذي</Button>
          </>
        }
      />

      {/* المؤشرات الرئيسية */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-6">
        <StatCard label="النضج المؤسسي" value={overallMetrics.organizationalMaturity} suffix="%" icon={Activity} accent="primary" trend={{ value: 6, positive: true }} hint="مقابل الربع السابق" />
        <StatCard label="جاهزية KAQA" value={overallMetrics.kaqaReadiness} suffix="%" icon={Award} accent="gold" trend={{ value: 4, positive: true }} />
        <StatCard label="جاهزية EFQM" value={overallMetrics.efqmReadiness} suffix="%" icon={Target} accent="info" trend={{ value: 5, positive: true }} />
        <StatCard label="امتثال ISO" value={overallMetrics.isoCompliance} suffix="%" icon={ShieldCheck} accent="success" trend={{ value: 3, positive: true }} />
        <StatCard label="الشواهد المكتملة" value={`${overallMetrics.evidenceCompleted}/40`} icon={FolderCheck} accent="primary" hint={`${overallMetrics.evidencePending} ناقصة`} />
        <StatCard label="إغلاق الإجراءات التصحيحية" value={overallMetrics.correctiveActionClosureRate} suffix="%" icon={ClipboardCheck} accent="success" />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        <StatCard label="فرص التحسين" value={overallMetrics.totalImprovements} icon={Lightbulb} accent="gold" />
        <StatCard label="مشاريع التحسين" value={overallMetrics.totalProjects} icon={Rocket} accent="info" hint={`${projects.filter(p => p.status === "متأخر").length} متأخر`} />
        <StatCard label="حالات عدم المطابقة" value={overallMetrics.nonconformities} icon={AlertTriangle} accent="warning" />
        <StatCard label="الفجوات الحرجة" value={topGaps.filter(g => g.priority === "حرجة").length} icon={AlertTriangle} accent="destructive" />
      </div>

      {/* Charts row 1 */}
      <div className="grid lg:grid-cols-3 gap-4 mb-6">
        <SectionCard title="اتجاه النضج المؤسسي" description="آخر 7 أشهر" icon={Activity} className="lg:col-span-2">
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={maturityTrend} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" tick={{ fontSize: 11 }} />
                <YAxis stroke="hsl(var(--muted-foreground))" tick={{ fontSize: 11 }} domain={[50, 100]} />
                <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8, fontSize: 12 }} />
                <Line type="monotone" dataKey="value" stroke="hsl(var(--primary))" strokeWidth={3} dot={{ r: 4, fill: "hsl(var(--gold))" }} name="درجة النضج" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </SectionCard>

        <SectionCard title="حالة مشاريع التحسين" icon={Rocket}>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={projectStatusData} dataKey="value" nameKey="name" innerRadius={45} outerRadius={75} paddingAngle={2}>
                  {projectStatusData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                </Pie>
                <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8, fontSize: 12 }} />
                <Legend wrapperStyle={{ fontSize: 11 }} iconSize={8} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </SectionCard>
      </div>

      {/* Charts row 2 */}
      <div className="grid lg:grid-cols-2 gap-4 mb-6">
        <SectionCard title="ممكنات ونتائج EFQM" description="المقارنة بين الدرجة الحالية والمستهدفة" icon={Target}>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={efqmEnablersResults} layout="vertical" margin={{ left: 0, right: 10 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis type="number" domain={[0, 100]} stroke="hsl(var(--muted-foreground))" tick={{ fontSize: 10 }} />
                <YAxis type="category" dataKey="name" stroke="hsl(var(--muted-foreground))" tick={{ fontSize: 10 }} width={110} />
                <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8, fontSize: 12 }} />
                <Legend wrapperStyle={{ fontSize: 11 }} />
                <Bar dataKey="current" fill="hsl(var(--primary))" name="الحالي" radius={[0, 4, 4, 0]} />
                <Bar dataKey="target" fill="hsl(var(--gold))" name="المستهدف" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </SectionCard>

        <SectionCard title="نضج وامتثال الإدارات" icon={Building2}>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={departmentMaturity}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" tick={{ fontSize: 10 }} />
                <YAxis stroke="hsl(var(--muted-foreground))" tick={{ fontSize: 10 }} />
                <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8, fontSize: 12 }} />
                <Legend wrapperStyle={{ fontSize: 11 }} />
                <Bar dataKey="maturity" fill="hsl(var(--primary))" name="النضج" radius={[4,4,0,0]} />
                <Bar dataKey="compliance" fill="hsl(var(--info))" name="الامتثال" radius={[4,4,0,0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </SectionCard>
      </div>

      {/* Heatmap الإدارات × النماذج */}
      <SectionCard title="خريطة حرارية: الإدارات × النماذج" description="نسبة الامتثال الافتراضية بين كل إدارة ونموذج تقييم" icon={Building2} className="mb-6">
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr>
                <th className="text-right p-2 font-semibold text-muted-foreground sticky right-0 bg-card">الإدارة</th>
                {heatmapFrameworks.map((f) => (
                  <th key={f.id} className="p-2 font-semibold text-muted-foreground text-center min-w-[90px]">{f.shortName}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {heatmapDepts.map((d) => (
                <tr key={d.id} className="border-t border-border">
                  <td className="p-2 font-medium text-foreground sticky right-0 bg-card whitespace-nowrap">{d.name}</td>
                  {heatmapFrameworks.map((f) => {
                    const score = Math.max(40, Math.min(98, d.compliance + ((f.id.charCodeAt(1) + d.id.charCodeAt(1)) % 18) - 9));
                    return (
                      <td key={f.id} className="p-1.5 text-center">
                        <div className={`rounded-md px-2 py-1.5 font-semibold ${heatColor(score)}`}>{score}%</div>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionCard>

      {/* Top gaps + improvements */}
      <div className="grid lg:grid-cols-2 gap-4 mb-6">
        <SectionCard title="أعلى 5 فجوات أثراً" icon={AlertTriangle}
          action={<Button variant="ghost" size="sm" className="text-xs">عرض الكل</Button>}>
          <div className="space-y-3">
            {topGaps.map((g) => (
              <div key={g.id} className="flex items-start gap-3 p-3 rounded-lg border border-border hover:border-primary/30 hover:bg-muted/30 transition-all">
                <div className="w-8 h-8 rounded-md bg-destructive/10 text-destructive flex items-center justify-center text-sm font-bold shrink-0">{g.impact}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <h4 className="text-sm font-semibold text-foreground truncate">{g.title}</h4>
                    <StatusBadge status={g.priority} />
                  </div>
                  <p className="text-xs text-muted-foreground mt-1 line-clamp-1">{g.description}</p>
                  <div className="text-[11px] text-muted-foreground mt-1">
                    {getDept(g.ownerDeptId)?.name} · أثر {g.impact}/5 · جهد {g.effort}/5
                  </div>
                </div>
              </div>
            ))}
          </div>
        </SectionCard>

        <SectionCard title="أعلى 5 فرص تحسين أثراً" icon={Lightbulb}
          action={<Button variant="ghost" size="sm" className="text-xs">عرض الكل</Button>}>
          <div className="space-y-3">
            {topImprovements.map((i) => (
              <div key={i.id} className="flex items-start gap-3 p-3 rounded-lg border border-border hover:border-gold/40 hover:bg-accent/30 transition-all">
                <div className="w-8 h-8 rounded-md bg-gold/15 text-gold flex items-center justify-center text-sm font-bold shrink-0">{i.impact}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <h4 className="text-sm font-semibold text-foreground truncate">{i.title}</h4>
                    <StatusBadge status={i.category} />
                  </div>
                  <p className="text-xs text-muted-foreground mt-1 line-clamp-1">{i.expectedImpactDescription}</p>
                  <div className="text-[11px] text-muted-foreground mt-1">
                    {getDept(i.ownerDeptId)?.name} · {i.status}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>

      {/* Frameworks readiness summary */}
      <SectionCard title="جاهزية النماذج المعتمدة" description="النسبة الحالية للجاهزية لكل نموذج تقييم" icon={FileBarChart}>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
          {frameworks.map((f) => (
            <div key={f.id} className="p-4 rounded-lg border border-border bg-muted/20 hover:bg-muted/40 transition-all">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-sm font-bold text-foreground">{f.shortName}</h4>
                <StatusBadge status={f.readiness} />
              </div>
              <p className="text-[11px] text-muted-foreground mb-3 line-clamp-1">{f.name}</p>
              <ProgressBar value={f.readinessScore} color={f.readinessScore >= 80 ? "success" : f.readinessScore >= 65 ? "primary" : "warning"} />
              <div className="flex justify-between text-[11px] text-muted-foreground mt-2">
                <span>{f.evidenceCount} شاهد</span>
                <span>{f.gapsCount} فجوة</span>
              </div>
            </div>
          ))}
        </div>
      </SectionCard>
    </ExcellenceLayout>
  );
}