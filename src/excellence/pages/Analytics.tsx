import { useState } from "react";
import { ExcellenceLayout } from "@/excellence/components/ExcellenceLayout";
import { PageHeader } from "@/excellence/components/PageHeader";
import { AnalyticsProvider, useAnalytics } from "@/excellence/analytics/AnalyticsContext";
import { FiltersBar } from "@/excellence/analytics/FiltersBar";
import { ChartCard } from "@/excellence/analytics/ChartCard";
import { NetworkGraph } from "@/excellence/analytics/charts/NetworkGraph";
import { EdgeBundling } from "@/excellence/analytics/charts/EdgeBundling";
import { Heatmap } from "@/excellence/analytics/charts/Heatmap";
import { RadarCompare } from "@/excellence/analytics/charts/RadarCompare";
import { SankeyFlow } from "@/excellence/analytics/charts/SankeyFlow";
import { TreemapView } from "@/excellence/analytics/charts/TreemapView";
import { GanttTimeline } from "@/excellence/analytics/charts/GanttTimeline";
import { DetailsDrawer } from "@/excellence/analytics/DetailsDrawer";
import { BarChart3, AlertOctagon, Target } from "lucide-react";

function ObservationsAndPriorities() {
  const { filtered } = useAnalytics();
  const topGaps = [...filtered.gaps]
    .sort((a, b) => (b.impact * 6 - b.effort) - (a.impact * 6 - a.effort)).slice(0, 5);
  const topPriorities = [...filtered.improvements]
    .filter(i => i.status !== "مرفوضة")
    .sort((a, b) => (b.impact * 6 - b.effort) - (a.impact * 6 - a.effort)).slice(0, 5);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <div className="gov-card p-4">
        <div className="flex items-center gap-2 mb-3 pb-2 border-b border-border/50">
          <AlertOctagon className="w-4 h-4 text-destructive" />
          <h3 className="text-sm font-bold">أهم 5 ملاحظات تحليلية</h3>
        </div>
        <ol className="space-y-2.5">
          {topGaps.map((g, i) => (
            <li key={g.id} className="flex gap-3 text-xs">
              <span className="w-6 h-6 rounded-full bg-destructive/10 text-destructive font-bold flex items-center justify-center shrink-0">{i+1}</span>
              <div className="flex-1">
                <div className="font-semibold text-foreground">{g.title}</div>
                <div className="text-muted-foreground mt-0.5">أثر {g.impact}/5 • جهد {g.effort}/5 • {g.priority}</div>
              </div>
            </li>
          ))}
        </ol>
      </div>
      <div className="gov-card p-4">
        <div className="flex items-center gap-2 mb-3 pb-2 border-b border-border/50">
          <Target className="w-4 h-4 text-success" />
          <h3 className="text-sm font-bold">أهم 5 أولويات للتحسين</h3>
        </div>
        <ol className="space-y-2.5">
          {topPriorities.map((p, i) => (
            <li key={p.id} className="flex gap-3 text-xs">
              <span className="w-6 h-6 rounded-full bg-success/10 text-success font-bold flex items-center justify-center shrink-0">{i+1}</span>
              <div className="flex-1">
                <div className="font-semibold text-foreground">{p.title}</div>
                <div className="text-muted-foreground mt-0.5">{p.expectedImpactDescription} • {p.category}</div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

function AnalyticsInner() {
  const [drawer, setDrawer] = useState<any>(null);
  return (
    <>
      <PageHeader
        title="التحليلات التفاعلية المتقدمة"
        subtitle="رؤية بصرية متعددة الأبعاد لعلاقات النماذج والمعايير والإدارات والمشاريع — بأسلوب Vega"
        icon={BarChart3}
      />
      <div className="space-y-4">
        <FiltersBar />

        <ChartCard
          title="الرسم الشبكي للعلاقات المؤسسية"
          subtitle="Network Graph — تفاعلي وقابل للتكبير والسحب"
          purpose="فهم العلاقات بين النماذج والمعايير والشواهد والفجوات والمشاريع والإدارات في صورة واحدة."
          insight="انقر على أي عنصر لعرض تفاصيله، ومرّر الماوس لإبراز العلاقات. استخدم العجلة للتكبير."
          height={520}
        >
          <NetworkGraph onSelect={(d) => setDrawer(d)} />
        </ChartCard>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
          <ChartCard
            title="تشابك الإدارات والمعايير (Edge Bundling)"
            subtitle="رسم تجميعي يكشف الترابط المؤسسي"
            purpose="إبراز قوة العلاقة بين كل إدارة والمعايير المرتبطة بها لتحديد بؤر التركيز."
            insight="تشير الخطوط السميكة إلى ملكية المعيار والخطوط الأقل سُمكاً إلى المساهمة."
            height={500}
          >
            <EdgeBundling />
          </ChartCard>

          <ChartCard
            title="الخريطة الحرارية: الإدارات × المعايير"
            subtitle="تبدّل بين أربعة مقاييس"
            purpose="كشف الإدارات الأكثر مساهمة، الأعلى فجوات، أو الأكثر اكتمالاً للشواهد."
            insight="انقر على أي خلية لعرض تفاصيل تقاطع الإدارة مع المعيار في اللوحة الجانبية."
            height={500}
          >
            <Heatmap onCellClick={(c) => setDrawer({ id: `${c.dept.id}-${c.criterion.id}`, type: "criterion", label: `${c.dept.code} × ${c.criterion.code}`, meta: { الإدارة: c.dept.name, المعيار: c.criterion.name, القيمة: c.value, المقياس: c.mode, الفجوات: c.criterion.gaps, الجاهزية: c.criterion.currentScore } })} />
          </ChartCard>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
          <ChartCard
            title="الرادار: الحالي × المستهدف × الدورة السابقة"
            subtitle="مقارنة متعددة الأبعاد لكل نموذج"
            purpose="إبراز الفجوة بين الأداء الحالي والمستهدف عبر معايير النموذج المُختار."
            insight="المساحة الذهبية تمثل المستهدف. كلما اقتربت المساحة الخضراء منها زادت الجاهزية."
            height={460}
          >
            <RadarCompare />
          </ChartCard>

          <ChartCard
            title="تدفق القيمة: من المعيار إلى الأثر (Sankey)"
            subtitle="معيار → فجوة → فرصة → مشروع → أثر"
            purpose="تحويل نتائج التقييم إلى قرارات تنفيذية واضحة بمسار قابل للتتبع."
            insight="عرض الخط يعكس قوة الأثر المتوقع. ركّز على المسارات الأعرض في خطة التحسين."
            height={460}
          >
            <SankeyFlow />
          </ChartCard>
        </div>

        <ChartCard
          title="توزيع الفجوات (Treemap)"
          subtitle="بدّل التجميع بين النموذج والإدارة والأولوية"
          purpose="معرفة أين تتركز الفجوات لإعادة توزيع الموارد والاهتمام."
          insight="المربعات الأكبر تشير إلى تركّز أعلى للفجوات أو أثر أكبر مجمّع."
          height={420}
        >
          <TreemapView />
        </ChartCard>

        <ChartCard
          title="الجدول الزمني للمشاريع (Gantt)"
          subtitle="حالة، تقدم، مالك، تأخر"
          purpose="متابعة تنفيذ مشاريع التحسين، الكشف المبكر عن التأخر، وتحديد المسار الحرج."
          insight="المشاريع المُحاطة بإطار أحمر متقطع متأخرة عن جدولها الزمني وتحتاج تدخلاً تنفيذياً."
          height={460}
        >
          <GanttTimeline onClick={(p) => setDrawer({ id: p.id, type: "project", label: p.name, meta: p })} />
        </ChartCard>

        <ObservationsAndPriorities />
      </div>

      <DetailsDrawer open={!!drawer} onOpenChange={(v) => !v && setDrawer(null)} data={drawer} />
    </>
  );
}

export default function AnalyticsPage() {
  return (
    <ExcellenceLayout>
      <AnalyticsProvider>
        <AnalyticsInner />
      </AnalyticsProvider>
    </ExcellenceLayout>
  );
}