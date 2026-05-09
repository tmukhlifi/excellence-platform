import { useMemo, useState } from "react";
import { ExcellenceLayout } from "@/excellence/components/ExcellenceLayout";
import { PageHeader } from "@/excellence/components/PageHeader";
import { SectionCard } from "@/excellence/components/SectionCard";
import { ProgressBar } from "@/excellence/components/ProgressBar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  ClipboardCheck, Rocket, Lightbulb, AlertTriangle, FolderCheck, Target,
  Sparkles, ChevronLeft, CheckCircle2, GitCompare, Save, Send, Plus,
} from "lucide-react";
import {
  ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar,
  Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid,
} from "recharts";
import { frameworks, evidences, getDept, departments } from "@/data/mockData";
import { subCriteria, type SubCriterion } from "@/data/mockDataExtended";
import { toast } from "sonner";

// ============================================================
// Types
// ============================================================
type ElementScore = {
  score: number;
  notes: string;
  evidenceIds: string[];
  strengths: string[];
  improvements: string[];
  confidence: 1 | 2 | 3 | 4 | 5;
  recommendation: string;
};

type Methodology = "RADAR" | "ITQAN";
type SubCriterionType = "ممكن" | "نتيجة";

const RADAR_ENABLER = ["المنهجية", "التطبيق", "التقييم والتحسين"] as const;
const RADAR_RESULT = [
  "الملاءمة والنطاق",
  "الأداء - الاتجاهات",
  "الأداء - المستهدفات",
  "الأداء - المقارنات",
  "الأداء - السببية والارتباط بالممكنات",
] as const;
const ITQAN_ENABLER = ["المنهجية", "التطبيق", "التعلم والتحسين", "التكامل"] as const;
const ITQAN_RESULT = [
  "الاتجاهات",
  "المستهدفات",
  "المقارنات",
  "السببية والارتباط بالممكنات",
  "نطاق وشمولية النتائج",
  "الاستدامة",
] as const;

function inferType(sc: SubCriterion): SubCriterionType {
  // EFQM: 1-5 enablers, 6-7 results | KAQA: 1-5 enablers, 6-9 results
  const code = parseInt(sc.parentCode, 10);
  if (sc.frameworkId === "f1") return code <= 5 ? "ممكن" : "نتيجة";
  if (sc.frameworkId === "f2") return code <= 5 ? "ممكن" : "نتيجة";
  return "ممكن";
}

function elementsFor(meth: Methodology, type: SubCriterionType): readonly string[] {
  if (meth === "RADAR") return type === "ممكن" ? RADAR_ENABLER : RADAR_RESULT;
  return type === "ممكن" ? ITQAN_ENABLER : ITQAN_RESULT;
}

function defaultElement(seed: number, baseline: number): ElementScore {
  const variation = ((seed * 13) % 25) - 12;
  return {
    score: Math.max(20, Math.min(95, baseline + variation)),
    notes: "",
    evidenceIds: [],
    strengths: [],
    improvements: [],
    confidence: ((seed % 3) + 3) as 3 | 4 | 5,
    recommendation: "",
  };
}

// Color helpers
function scoreColorClasses(s: number) {
  if (s >= 80) return "bg-success text-success-foreground";
  if (s >= 65) return "bg-warning/70 text-foreground";
  if (s >= 50) return "bg-warning text-warning-foreground";
  if (s > 0) return "bg-destructive text-destructive-foreground";
  return "bg-muted text-muted-foreground";
}
function scoreLabel(s: number) {
  if (s >= 80) return "قوي";
  if (s >= 65) return "جيد";
  if (s >= 50) return "يحتاج تحسين";
  if (s > 0) return "فجوة عالية";
  return "غير مقيم";
}

// ============================================================
// Main Page
// ============================================================
export default function SelfAssessmentPage() {
  const [frameworkId, setFrameworkId] = useState<"f1" | "f2">("f1");
  const methodology: Methodology = frameworkId === "f1" ? "RADAR" : "ITQAN";
  const fw = frameworks.find((f) => f.id === frameworkId)!;

  // Group sub-criteria by parent
  const fwSubs = useMemo(() => subCriteria.filter((s) => s.frameworkId === frameworkId), [frameworkId]);
  const groupedByParent = useMemo(() => {
    const map = new Map<string, SubCriterion[]>();
    fwSubs.forEach((s) => {
      const k = `${s.parentCode}|${s.parentName}`;
      if (!map.has(k)) map.set(k, []);
      map.get(k)!.push(s);
    });
    return Array.from(map.entries()).map(([k, list]) => {
      const [code, name] = k.split("|");
      return { code, name, subs: list };
    });
  }, [fwSubs]);

  const [activeMain, setActiveMain] = useState<string>(groupedByParent[0]?.code ?? "1");
  const [activeSubId, setActiveSubId] = useState<string>(
    groupedByParent[0]?.subs[0]?.id ?? "sc1"
  );

  // Reset when framework changes
  const onFrameworkChange = (id: "f1" | "f2") => {
    setFrameworkId(id);
    const firstGroup = subCriteria.filter((s) => s.frameworkId === id);
    const firstParent = firstGroup[0]?.parentCode ?? "1";
    setActiveMain(firstParent);
    setActiveSubId(firstGroup.find((s) => s.parentCode === firstParent)?.id ?? firstGroup[0]?.id ?? "");
  };

  const currentSub = useMemo(() => fwSubs.find((s) => s.id === activeSubId) ?? fwSubs[0], [fwSubs, activeSubId]);
  const currentMainSubs = useMemo(
    () => fwSubs.filter((s) => s.parentCode === activeMain),
    [fwSubs, activeMain]
  );

  // Scores state: { [subId]: { [elementName]: ElementScore } }
  const [scores, setScores] = useState<Record<string, Record<string, ElementScore>>>(() => {
    const init: Record<string, Record<string, ElementScore>> = {};
    subCriteria.forEach((sc) => {
      const meth: Methodology = sc.frameworkId === "f1" ? "RADAR" : sc.frameworkId === "f2" ? "ITQAN" : "RADAR";
      const type = inferType(sc);
      const els = elementsFor(meth, type);
      const seed = parseInt(sc.id.replace(/\D/g, ""), 10);
      init[sc.id] = Object.fromEntries(els.map((e, i) => [e, defaultElement(seed + i, sc.currentScore)]));
    });
    return init;
  });

  function updateElement(subId: string, element: string, patch: Partial<ElementScore>) {
    setScores((prev) => ({
      ...prev,
      [subId]: { ...prev[subId], [element]: { ...prev[subId][element], ...patch } },
    }));
  }

  function calcSubScore(subId: string, fwIdLocal?: string): number {
    const sub = subCriteria.find((s) => s.id === subId);
    if (!sub) return 0;
    const fid = fwIdLocal ?? sub.frameworkId;
    const meth: Methodology = fid === "f1" ? "RADAR" : "ITQAN";
    const type = inferType(sub);
    const els = elementsFor(meth, type);
    const obj = scores[subId] ?? {};
    const vals = els.map((e) => obj[e]?.score ?? 0);
    if (!vals.length) return 0;
    return Math.round(vals.reduce((a, b) => a + b, 0) / vals.length);
  }

  function calcMainScore(parentCode: string): number {
    const list = fwSubs.filter((s) => s.parentCode === parentCode);
    if (!list.length) return 0;
    const totalW = list.reduce((s, c) => s + c.weight, 0);
    const sum = list.reduce((s, c) => s + calcSubScore(c.id) * c.weight, 0);
    return Math.round(sum / totalW);
  }

  function calcFrameworkScore(): number {
    if (!fwSubs.length) return 0;
    const totalW = fwSubs.reduce((s, c) => s + c.weight, 0);
    const sum = fwSubs.reduce((s, c) => s + calcSubScore(c.id) * c.weight, 0);
    return Math.round(sum / totalW);
  }

  const overallScore = calcFrameworkScore();
  const overallTarget = useMemo(() => {
    const tw = fwSubs.reduce((s, c) => s + c.weight, 0);
    return Math.round(fwSubs.reduce((s, c) => s + c.targetScore * c.weight, 0) / Math.max(1, tw));
  }, [fwSubs]);
  const completedCount = fwSubs.filter((s) => calcSubScore(s.id) > 0).length;

  // Auto-generated gaps from low scores
  const generatedGaps = useMemo(() => {
    const result: {
      subId: string; subName: string; parentName: string; element: string;
      current: number; target: number; gap: number; priority: string;
      missingEvidences: number; recommendation: string;
    }[] = [];
    fwSubs.forEach((sub) => {
      const meth: Methodology = sub.frameworkId === "f1" ? "RADAR" : "ITQAN";
      const type = inferType(sub);
      const els = elementsFor(meth, type);
      els.forEach((el) => {
        const sc = scores[sub.id]?.[el]?.score ?? 0;
        if (sc < 70) {
          const gap = sub.targetScore - sc;
          result.push({
            subId: sub.id,
            subName: sub.name,
            parentName: sub.parentName,
            element: el,
            current: sc,
            target: sub.targetScore,
            gap,
            priority: gap >= 25 ? "حرجة" : gap >= 15 ? "عالية" : gap >= 8 ? "متوسطة" : "منخفضة",
            missingEvidences: Math.max(0, sub.requiredEvidences - sub.availableEvidences),
            recommendation:
              el.includes("الاتجاهات") || el.includes("الأداء")
                ? "تعزيز جمع وتحليل البيانات والمقارنات المعيارية"
                : el.includes("التطبيق")
                ? "توسيع نطاق التطبيق وضمان الاتساق عبر الإدارات"
                : el.includes("المنهجية")
                ? "تطوير المنهجية وتوثيقها واعتمادها رسمياً"
                : "إجراء مراجعة دورية للتعلم والتحسين",
          });
        }
      });
    });
    return result.sort((a, b) => b.gap - a.gap);
  }, [fwSubs, scores]);

  const linkedEvidences = useMemo(
    () => evidences.filter((e) => e.criterionIds.length > 0 || e.frameworkIds.includes(frameworkId)),
    [frameworkId]
  );

  return (
    <ExcellenceLayout>
      <PageHeader
        title="التقييم الذاتي على مستوى المعايير الفرعية"
        subtitle={`نموذج ${fw.shortName} · منهجية ${methodology === "RADAR" ? "RADAR" : "إتقان"} · تقييم تفصيلي يدعم اتخاذ القرار`}
        icon={ClipboardCheck}
        actions={
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => toast.success("تم حفظ المسودة")}> <Save className="w-4 h-4" /> حفظ مسودة</Button>
            <Button onClick={() => toast.success(`تم إرسال التقييم للاعتماد - النتيجة ${overallScore}/100`)}>
              <Send className="w-4 h-4" /> إرسال للاعتماد
            </Button>
          </div>
        }
      />

      {/* Framework switcher */}
      <div className="grid md:grid-cols-2 gap-3 mb-4">
        {(["f1", "f2"] as const).map((id) => {
          const f = frameworks.find((x) => x.id === id)!;
          const isActive = frameworkId === id;
          return (
            <button
              key={id}
              onClick={() => onFrameworkChange(id)}
              className={`gov-card p-4 text-right transition-all ${
                isActive ? "border-primary border-2 bg-primary/5" : "hover:border-primary/40"
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs text-muted-foreground">{f.type}</div>
                  <div className="font-bold mt-1">{f.shortName}</div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {id === "f1" ? "منهجية التقييم: RADAR" : "منهجية التقييم: إتقان"}
                  </div>
                </div>
                {isActive && <CheckCircle2 className="w-6 h-6 text-primary" />}
              </div>
            </button>
          );
        })}
      </div>

      {/* KPI summary */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-4">
        <KpiBox label="الدرجة العامة" value={`${overallScore}`} suffix="/100" tone={overallScore >= 75 ? "success" : "warning"} />
        <KpiBox label="المستهدفة" value={`${overallTarget}`} suffix="/100" tone="primary" />
        <KpiBox label="الفجوة الكلية" value={`${Math.max(0, overallTarget - overallScore)}`} tone="destructive" />
        <KpiBox label="معايير فرعية مقيمة" value={`${completedCount}/${fwSubs.length}`} tone="info" />
        <KpiBox label="فجوات تقييمية ناتجة" value={`${generatedGaps.length}`} tone="warning" />
      </div>

      <Tabs defaultValue="assess" className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 mb-4">
          <TabsTrigger value="assess">التقييم التفصيلي</TabsTrigger>
          <TabsTrigger value="visuals">العرض البصري</TabsTrigger>
          <TabsTrigger value="gaps">الفجوات الناتجة</TabsTrigger>
          <TabsTrigger value="compare">مقارنة المنهجيات</TabsTrigger>
          <TabsTrigger value="summary">ملخص النموذج</TabsTrigger>
        </TabsList>

        {/* ============ Tab: Detailed Assessment ============ */}
        <TabsContent value="assess" className="m-0">
          <div className="grid lg:grid-cols-[260px_1fr] gap-4">
            {/* Right column: Main + Sub criteria list */}
            <aside className="gov-card p-3 space-y-1 max-h-[80vh] overflow-y-auto">
              <div className="text-xs font-bold text-muted-foreground px-2 py-1.5">المعايير الرئيسية</div>
              {groupedByParent.map((g) => {
                const mainScore = calcMainScore(g.code);
                const isOpen = activeMain === g.code;
                return (
                  <div key={g.code}>
                    <button
                      onClick={() => setActiveMain(g.code)}
                      className={`w-full text-right px-2.5 py-2 rounded-md text-xs flex items-center justify-between transition ${
                        isOpen ? "bg-primary/10 text-primary font-bold" : "hover:bg-muted"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="font-mono">{g.code}.</span>
                        <span className="line-clamp-1">{g.name}</span>
                      </div>
                      <span className={`text-[10px] px-1.5 py-0.5 rounded ${scoreColorClasses(mainScore)}`}>{mainScore}</span>
                    </button>
                    {isOpen && (
                      <div className="mr-3 border-r border-border pr-2 mt-1 space-y-0.5">
                        {g.subs.map((s) => {
                          const sc = calcSubScore(s.id);
                          return (
                            <button
                              key={s.id}
                              onClick={() => setActiveSubId(s.id)}
                              className={`w-full text-right px-2 py-1.5 rounded text-[11px] flex items-center justify-between gap-1 ${
                                activeSubId === s.id ? "bg-gold/15 text-foreground font-semibold" : "hover:bg-muted/60 text-muted-foreground"
                              }`}
                            >
                              <span className="line-clamp-1">{s.code} - {s.name}</span>
                              <span className={`text-[9px] px-1 rounded ${scoreColorClasses(sc)}`}>{sc}</span>
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </aside>

            {/* Center: assessment editor */}
            <div className="space-y-4 min-w-0">
              {currentSub && (
                <SubCriterionAssessment
                  sub={currentSub}
                  methodology={methodology}
                  scoresMap={scores[currentSub.id] ?? {}}
                  linkedEvidences={linkedEvidences}
                  onUpdate={(el, patch) => updateElement(currentSub.id, el, patch)}
                  computedScore={calcSubScore(currentSub.id)}
                  mainScore={calcMainScore(currentSub.parentCode)}
                  totalSubsInMain={currentMainSubs.length}
                />
              )}
            </div>
          </div>
        </TabsContent>

        {/* ============ Tab: Visualizations ============ */}
        <TabsContent value="visuals" className="m-0 space-y-4">
          <VisualizationsView
            methodology={methodology}
            mainGroups={groupedByParent}
            calcMainScore={calcMainScore}
            fwSubs={fwSubs}
            calcSubScore={calcSubScore}
            scores={scores}
            generatedGaps={generatedGaps}
          />
        </TabsContent>

        {/* ============ Tab: Generated Gaps ============ */}
        <TabsContent value="gaps" className="m-0">
          <SectionCard
            title={`الفجوات التقييمية الناتجة (${generatedGaps.length})`}
            description="تنشأ تلقائياً عند انخفاض درجة أي عنصر تقييم تحت 70"
            icon={AlertTriangle}
          >
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead className="bg-muted/50">
                  <tr>
                    {["المعيار الرئيسي","المعيار الفرعي","عنصر التقييم","الحالية","المستهدفة","الفجوة","الأولوية","شواهد ناقصة","التوصية","إجراء"].map((h) => (
                      <th key={h} className="text-right p-2 font-semibold text-muted-foreground">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {generatedGaps.slice(0, 60).map((g, i) => (
                    <tr key={i} className="border-t border-border hover:bg-muted/30">
                      <td className="p-2">{g.parentName}</td>
                      <td className="p-2 font-medium">{g.subName}</td>
                      <td className="p-2"><Badge variant="outline" className="text-[10px]">{g.element}</Badge></td>
                      <td className="p-2"><span className={`px-1.5 py-0.5 rounded ${scoreColorClasses(g.current)}`}>{g.current}</span></td>
                      <td className="p-2 font-bold">{g.target}</td>
                      <td className="p-2 text-destructive font-bold">{g.gap}</td>
                      <td className="p-2"><Badge className={
                        g.priority === "حرجة" ? "bg-destructive text-destructive-foreground"
                        : g.priority === "عالية" ? "bg-warning text-warning-foreground"
                        : "bg-muted text-foreground"
                      }>{g.priority}</Badge></td>
                      <td className="p-2 text-center">{g.missingEvidences}</td>
                      <td className="p-2 text-muted-foreground line-clamp-2 max-w-[260px]">{g.recommendation}</td>
                      <td className="p-2 whitespace-nowrap">
                        <Button size="sm" variant="outline" className="h-6 text-[10px] gap-1 ml-1"
                          onClick={() => toast.success(`تم تحويل الفجوة "${g.element} - ${g.subName}" إلى فرصة تحسين`)}>
                          <Lightbulb className="w-3 h-3" /> فرصة
                        </Button>
                        <Button size="sm" className="h-6 text-[10px] gap-1"
                          onClick={() => toast.success(`تم إنشاء مشروع تحسين مرتبط بـ "${g.subName}"`)}>
                          <Rocket className="w-3 h-3" /> مشروع
                        </Button>
                      </td>
                    </tr>
                  ))}
                  {generatedGaps.length === 0 && (
                    <tr><td colSpan={10} className="p-6 text-center text-muted-foreground">لا توجد فجوات - جميع العناصر بدرجات قوية</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </SectionCard>
        </TabsContent>

        {/* ============ Tab: Compare Methodologies ============ */}
        <TabsContent value="compare" className="m-0">
          <CompareMethodologiesView />
        </TabsContent>

        {/* ============ Tab: Framework Summary ============ */}
        <TabsContent value="summary" className="m-0">
          <FrameworkSummary
            fwShort={fw.shortName}
            methodology={methodology}
            mainGroups={groupedByParent}
            calcMainScore={calcMainScore}
            overallScore={overallScore}
            overallTarget={overallTarget}
          />
        </TabsContent>
      </Tabs>
    </ExcellenceLayout>
  );
}

// ============================================================
// KPI Box
// ============================================================
function KpiBox({ label, value, suffix, tone }: { label: string; value: string; suffix?: string; tone: "success" | "warning" | "destructive" | "primary" | "info" }) {
  const toneCls: Record<string, string> = {
    success: "text-success", warning: "text-warning", destructive: "text-destructive",
    primary: "text-primary", info: "text-info",
  };
  return (
    <div className="gov-card p-3">
      <div className="text-[11px] text-muted-foreground">{label}</div>
      <div className={`text-2xl font-bold mt-1 ${toneCls[tone]}`}>
        {value}
        {suffix && <span className="text-xs text-muted-foreground mr-1">{suffix}</span>}
      </div>
    </div>
  );
}

// ============================================================
// Sub-criterion Assessment Editor
// ============================================================
function SubCriterionAssessment({
  sub, methodology, scoresMap, linkedEvidences, onUpdate, computedScore, mainScore, totalSubsInMain,
}: {
  sub: SubCriterion;
  methodology: Methodology;
  scoresMap: Record<string, ElementScore>;
  linkedEvidences: typeof evidences;
  onUpdate: (el: string, patch: Partial<ElementScore>) => void;
  computedScore: number;
  mainScore: number;
  totalSubsInMain: number;
}) {
  const type = inferType(sub);
  const elements = elementsFor(methodology, type);
  const gap = Math.max(0, sub.targetScore - computedScore);

  return (
    <>
      {/* Header */}
      <div className="gov-card p-4">
        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
          <span>{sub.parentCode}. {sub.parentName}</span>
          <ChevronLeft className="w-3 h-3" />
          <span className="text-foreground font-semibold">{sub.code} {sub.name}</span>
          <Badge variant="outline" className="mr-auto text-[10px]">{type}</Badge>
          <Badge className="bg-primary/10 text-primary text-[10px]">منهجية {methodology === "RADAR" ? "RADAR" : "إتقان"}</Badge>
        </div>
        <h3 className="text-lg font-bold">{sub.name}</h3>
        <p className="text-xs text-muted-foreground mt-1">{sub.description}</p>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mt-4">
          <MiniBox label="الدرجة المحتسبة" value={`${computedScore}`} cls={scoreColorClasses(computedScore)} />
          <MiniBox label="المستهدفة" value={`${sub.targetScore}`} cls="bg-primary/10 text-primary" />
          <MiniBox label="الفجوة" value={`${gap}`} cls={gap > 15 ? "bg-destructive/10 text-destructive" : "bg-muted text-foreground"} />
          <MiniBox label="نتيجة المعيار الرئيسي" value={`${mainScore}`} cls={scoreColorClasses(mainScore)} />
          <MiniBox label="عناصر التقييم" value={`${elements.length}`} cls="bg-muted text-foreground" />
        </div>
        <div className="mt-3 text-[11px] text-muted-foreground flex items-center gap-3 flex-wrap">
          <span>الإدارة المالكة: <b className="text-foreground">{getDept(sub.ownerDeptId)?.name}</b></span>
          <span>الشواهد: {sub.availableEvidences}/{sub.requiredEvidences}</span>
          <span>اكتمال: {sub.completion}%</span>
          <span>الجاهزية: {sub.readiness}</span>
          <span>وزن: {sub.weight}</span>
        </div>
      </div>

      {/* Elements */}
      <SectionCard
        title={`عناصر التقييم - ${methodology === "RADAR" ? "RADAR" : "إتقان"} (${type === "ممكن" ? "ممكنات" : "نتائج"})`}
        icon={Target}
        description="قيّم كل عنصر مستقلاً، وستحتسب الدرجة الإجمالية للمعيار الفرعي تلقائياً"
      >
        <div className="space-y-3">
          {elements.map((el) => {
            const v = scoresMap[el] ?? defaultElement(0, sub.currentScore);
            return (
              <ElementEditor
                key={el}
                element={el}
                value={v}
                evidencesPool={linkedEvidences}
                onChange={(patch) => onUpdate(el, patch)}
              />
            );
          })}
        </div>
      </SectionCard>
    </>
  );
}

function MiniBox({ label, value, cls }: { label: string; value: string; cls: string }) {
  return (
    <div className="rounded-md border border-border p-2">
      <div className="text-[10px] text-muted-foreground">{label}</div>
      <div className={`text-lg font-bold mt-0.5 px-2 py-0.5 rounded inline-block ${cls}`}>{value}</div>
    </div>
  );
}

// ============================================================
// Single element editor
// ============================================================
function ElementEditor({
  element, value, evidencesPool, onChange,
}: {
  element: string;
  value: ElementScore;
  evidencesPool: typeof evidences;
  onChange: (patch: Partial<ElementScore>) => void;
}) {
  const [strengthInput, setStrengthInput] = useState("");
  const [improvementInput, setImprovementInput] = useState("");

  const addStrength = () => {
    if (!strengthInput.trim()) return;
    onChange({ strengths: [...value.strengths, strengthInput.trim()] });
    setStrengthInput("");
  };
  const addImprovement = () => {
    if (!improvementInput.trim()) return;
    onChange({ improvements: [...value.improvements, improvementInput.trim()] });
    setImprovementInput("");
  };
  const toggleEvidence = (id: string) => {
    const has = value.evidenceIds.includes(id);
    onChange({ evidenceIds: has ? value.evidenceIds.filter((x) => x !== id) : [...value.evidenceIds, id] });
  };

  const isResult = element.includes("الاتجاهات") || element.includes("المستهدفات") ||
    element.includes("المقارنات") || element.includes("السببية") ||
    element.includes("الأداء") || element.includes("النطاق") || element.includes("الاستدامة") || element.includes("الملاءمة");

  return (
    <div className="border border-border rounded-lg p-4 hover:border-primary/40 transition">
      <div className="flex items-center justify-between gap-3 flex-wrap mb-3">
        <div className="flex items-center gap-2">
          <Badge className="bg-primary/10 text-primary border-primary/30">{element}</Badge>
          {isResult && <Badge variant="outline" className="text-[10px]">نتيجة</Badge>}
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] text-muted-foreground">الثقة:</span>
          {[1,2,3,4,5].map((n) => (
            <button key={n} onClick={() => onChange({ confidence: n as 1|2|3|4|5 })}
              className={`w-5 h-5 rounded-full text-[10px] font-bold ${value.confidence >= n ? "bg-gold text-gold-foreground" : "bg-muted text-muted-foreground"}`}>
              {n}
            </button>
          ))}
        </div>
      </div>

      {/* Score slider */}
      <div className="grid md:grid-cols-[1fr_120px] gap-3 items-center mb-3">
        <input type="range" min={0} max={100} value={value.score}
          onChange={(e) => onChange({ score: Number(e.target.value) })}
          className="w-full accent-primary" />
        <div className={`text-center rounded-md px-3 py-2 ${scoreColorClasses(value.score)}`}>
          <div className="text-2xl font-bold">{value.score}</div>
          <div className="text-[10px]">{scoreLabel(value.score)}</div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-3">
        <div>
          <label className="text-[11px] font-semibold text-muted-foreground block mb-1">ملاحظات المقيم</label>
          <Textarea rows={3} value={value.notes} onChange={(e) => onChange({ notes: e.target.value })}
            placeholder="أضف ملاحظتك التفصيلية حول هذا العنصر..." className="text-xs" />
        </div>
        <div>
          <label className="text-[11px] font-semibold text-muted-foreground block mb-1">توصية لرفع الدرجة</label>
          <Textarea rows={3} value={value.recommendation} onChange={(e) => onChange({ recommendation: e.target.value })}
            placeholder="مثال: توثيق المنهجية رسمياً وتعميمها..." className="text-xs" />
        </div>
      </div>

      {/* Strengths & Improvements */}
      <div className="grid md:grid-cols-2 gap-3 mt-3">
        <div className="border border-success/30 bg-success/5 rounded-md p-2">
          <div className="text-[11px] font-bold text-success mb-1.5">نقاط القوة</div>
          <div className="space-y-1 mb-2">
            {value.strengths.map((s, i) => (
              <div key={i} className="text-[11px] bg-card border border-border rounded px-2 py-1">{s}</div>
            ))}
            {value.strengths.length === 0 && <div className="text-[10px] text-muted-foreground">لا توجد نقاط قوة مسجلة</div>}
          </div>
          <div className="flex gap-1">
            <Input value={strengthInput} onChange={(e) => setStrengthInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addStrength()}
              placeholder="أضف نقطة قوة..." className="h-7 text-xs" />
            <Button size="sm" variant="outline" className="h-7" onClick={addStrength}><Plus className="w-3 h-3" /></Button>
          </div>
        </div>
        <div className="border border-warning/30 bg-warning/5 rounded-md p-2">
          <div className="text-[11px] font-bold text-warning mb-1.5">فرص التحسين</div>
          <div className="space-y-1 mb-2">
            {value.improvements.map((s, i) => (
              <div key={i} className="flex items-center justify-between gap-2 text-[11px] bg-card border border-border rounded px-2 py-1">
                <span>{s}</span>
                <Button size="sm" variant="ghost" className="h-5 px-1.5 text-[9px] gap-1"
                  onClick={() => toast.success(`تم تحويل "${s}" إلى مشروع تحسين`)}>
                  <Rocket className="w-3 h-3" /> مشروع
                </Button>
              </div>
            ))}
            {value.improvements.length === 0 && <div className="text-[10px] text-muted-foreground">لا توجد فرص مسجلة</div>}
          </div>
          <div className="flex gap-1">
            <Input value={improvementInput} onChange={(e) => setImprovementInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addImprovement()}
              placeholder="أضف فرصة تحسين..." className="h-7 text-xs" />
            <Button size="sm" variant="outline" className="h-7" onClick={addImprovement}><Plus className="w-3 h-3" /></Button>
          </div>
        </div>
      </div>

      {/* Evidence linking */}
      <div className="mt-3">
        <div className="text-[11px] font-semibold text-muted-foreground mb-1.5 flex items-center gap-1.5">
          <FolderCheck className="w-3.5 h-3.5" /> الشواهد المرتبطة ({value.evidenceIds.length})
        </div>
        <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto">
          {evidencesPool.slice(0, 20).map((ev) => {
            const sel = value.evidenceIds.includes(ev.id);
            return (
              <button key={ev.id} onClick={() => toggleEvidence(ev.id)}
                className={`text-[10px] px-2 py-1 rounded border transition ${
                  sel ? "bg-primary text-primary-foreground border-primary" : "bg-card border-border hover:border-primary/40"
                }`}>
                {ev.name}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ============================================================
// Visualizations Tab
// ============================================================
function VisualizationsView({
  methodology, mainGroups, calcMainScore, fwSubs, calcSubScore, scores, generatedGaps,
}: {
  methodology: Methodology;
  mainGroups: { code: string; name: string; subs: SubCriterion[] }[];
  calcMainScore: (c: string) => number;
  fwSubs: SubCriterion[];
  calcSubScore: (id: string) => number;
  scores: Record<string, Record<string, ElementScore>>;
  generatedGaps: { element: string; gap: number; subName: string }[];
}) {
  const radarData = mainGroups.map((g) => ({
    name: g.name.length > 14 ? g.name.slice(0, 12) + "…" : g.name,
    current: calcMainScore(g.code),
    target: Math.round(g.subs.reduce((s, x) => s + x.targetScore, 0) / g.subs.length),
  }));

  // Top element gaps aggregated
  const elementGapAgg = useMemo(() => {
    const m = new Map<string, { total: number; count: number }>();
    generatedGaps.forEach((g) => {
      const cur = m.get(g.element) ?? { total: 0, count: 0 };
      m.set(g.element, { total: cur.total + g.gap, count: cur.count + 1 });
    });
    return Array.from(m.entries())
      .map(([el, v]) => ({ element: el, avgGap: Math.round(v.total / v.count), occurrences: v.count }))
      .sort((a, b) => b.avgGap - a.avgGap);
  }, [generatedGaps]);

  return (
    <>
      <div className="grid lg:grid-cols-2 gap-4">
        <SectionCard title="رادار المعايير الرئيسية" icon={Target} description="مقارنة الدرجة الحالية بالمستهدفة">
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarData}>
                <PolarGrid stroke="hsl(var(--border))" />
                <PolarAngleAxis dataKey="name" tick={{ fontSize: 10 }} />
                <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fontSize: 9 }} />
                <Radar name="الحالية" dataKey="current" stroke="hsl(var(--primary))" fill="hsl(var(--primary))" fillOpacity={0.45} />
                <Radar name="المستهدفة" dataKey="target" stroke="hsl(var(--gold))" fill="hsl(var(--gold))" fillOpacity={0.2} />
                <Legend wrapperStyle={{ fontSize: 11 }} />
                <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8, fontSize: 12 }} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </SectionCard>

        <SectionCard title="أعلى الفجوات حسب عناصر التقييم" icon={AlertTriangle} description={`فجوات ${methodology === "RADAR" ? "RADAR" : "إتقان"} مرتبة من الأعلى`}>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={elementGapAgg} layout="vertical" margin={{ left: 10, right: 10 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis type="number" stroke="hsl(var(--muted-foreground))" tick={{ fontSize: 10 }} />
                <YAxis type="category" dataKey="element" stroke="hsl(var(--muted-foreground))" tick={{ fontSize: 10 }} width={150} />
                <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8, fontSize: 12 }} />
                <Bar dataKey="avgGap" fill="hsl(var(--destructive))" name="متوسط الفجوة" radius={[0, 4, 4, 0]} />
                <Bar dataKey="occurrences" fill="hsl(var(--warning))" name="عدد التكرارات" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </SectionCard>
      </div>

      <SectionCard title="خريطة حرارية للمعايير الفرعية" icon={Sparkles} description="درجات المعايير الفرعية مع لون الحالة">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
          {fwSubs.map((s) => {
            const sc = calcSubScore(s.id);
            return (
              <div key={s.id} className={`rounded-md p-2.5 border ${scoreColorClasses(sc)} border-transparent`}>
                <div className="text-[10px] opacity-90">{s.code}</div>
                <div className="text-[11px] font-semibold line-clamp-2 leading-tight">{s.name}</div>
                <div className="text-2xl font-bold mt-1">{sc}</div>
                <div className="text-[10px] opacity-80">/ {s.targetScore}</div>
              </div>
            );
          })}
        </div>
      </SectionCard>

      <SectionCard title="جدول تفصيلي للدرجات حسب المعيار الفرعي" icon={ClipboardCheck}>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead className="bg-muted/50">
              <tr>
                {["المعيار الفرعي","النوع","الدرجة","المستهدفة","الفجوة","التقدم"].map((h) => (
                  <th key={h} className="text-right p-2 font-semibold text-muted-foreground">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {fwSubs.map((s) => {
                const cur = calcSubScore(s.id);
                const gap = Math.max(0, s.targetScore - cur);
                return (
                  <tr key={s.id} className="border-t border-border">
                    <td className="p-2"><div className="font-medium">{s.code} {s.name}</div><div className="text-[10px] text-muted-foreground">{s.parentName}</div></td>
                    <td className="p-2"><Badge variant="outline" className="text-[10px]">{inferType(s)}</Badge></td>
                    <td className="p-2"><span className={`px-1.5 py-0.5 rounded ${scoreColorClasses(cur)}`}>{cur}</span></td>
                    <td className="p-2 font-bold">{s.targetScore}</td>
                    <td className={`p-2 font-bold ${gap > 15 ? "text-destructive" : gap > 5 ? "text-warning" : "text-success"}`}>{gap}</td>
                    <td className="p-2 min-w-[140px]"><ProgressBar value={cur} size="sm" showValue={false} color={cur >= 75 ? "success" : "primary"} /></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </SectionCard>
    </>
  );
}

// ============================================================
// Compare Methodologies
// ============================================================
function CompareMethodologiesView() {
  const rows = [
    { f: "النموذج المستخدم", radar: "EFQM 2025 (الأوروبي)", itqan: "جائزة الملك عبدالعزيز للجودة" },
    { f: "نوع المعايير", radar: "ممكنات (1-5) ونتائج (6-7)", itqan: "ممكنات (1-5) ونتائج (6-9)" },
    { f: "عناصر تقييم الممكنات", radar: "المنهجية، التطبيق، التقييم والتحسين", itqan: "المنهجية، التطبيق، التعلم والتحسين، التكامل" },
    { f: "عناصر تقييم النتائج", radar: "الملاءمة والنطاق + الأداء (الاتجاهات/المستهدفات/المقارنات/السببية)", itqan: "الاتجاهات، المستهدفات، المقارنات، السببية، نطاق وشمولية، الاستدامة" },
    { f: "طريقة احتساب الدرجة", radar: "متوسط عناصر RADAR لكل معيار فرعي ثم ترجيح بأوزان المعيار الرئيسي", itqan: "متوسط عناصر إتقان لكل معيار فرعي ثم ترجيح حسب أوزان النموذج" },
    { f: "نوع الشواهد المطلوبة", radar: "وثائق منهجية، أدلة تطبيق، نتائج مراجعة وتحسين", itqan: "وثائق منهجية، أدلة تطبيق، نتائج تعلم وتكامل، نتائج كمية ومقارنات" },
    { f: "نوع الملاحظات", radar: "ملاحظات على RADAR لكل عنصر مع توصية محددة", itqan: "ملاحظات على إتقان مع وصف مستوى النضج لكل عنصر" },
    { f: "استخراج فرص التحسين", radar: "فرص محددة لكل عنصر RADAR منخفض الدرجة", itqan: "فرص مرتبطة بمحاور النضج (منهجية/تطبيق/تعلم/تكامل) ومحاور النتائج" },
    { f: "أعلى الدرجات في الحالة الحالية", radar: "ممكنات استراتيجية واضحة", itqan: "نتائج تشغيلية ومالية" },
    { f: "السياق الأنسب", radar: "تميز مؤسسي شامل وتحول مؤسسي", itqan: "جوائز تميز وطنية وقياس النضج المؤسسي" },
  ];

  return (
    <SectionCard title="مقارنة منهجيات التقييم: RADAR مقابل إتقان" icon={GitCompare} description="مرجع سريع لاختيار المنهجية المناسبة لكل مرحلة من مراحل التميز">
      <div className="overflow-x-auto">
        <table className="w-full text-xs border-collapse">
          <thead>
            <tr className="bg-primary/10">
              <th className="text-right p-3 font-bold text-primary border border-border w-1/4">العنصر المقارن</th>
              <th className="text-right p-3 font-bold text-primary border border-border">منهجية RADAR (EFQM)</th>
              <th className="text-right p-3 font-bold text-primary border border-border">منهجية إتقان (KAQA)</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={i} className={i % 2 === 0 ? "bg-card" : "bg-muted/30"}>
                <td className="p-3 font-bold border border-border">{r.f}</td>
                <td className="p-3 border border-border text-muted-foreground">{r.radar}</td>
                <td className="p-3 border border-border text-muted-foreground">{r.itqan}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </SectionCard>
  );
}

// ============================================================
// Framework Summary Tab
// ============================================================
function FrameworkSummary({
  fwShort, methodology, mainGroups, calcMainScore, overallScore, overallTarget,
}: {
  fwShort: string; methodology: Methodology;
  mainGroups: { code: string; name: string; subs: SubCriterion[] }[];
  calcMainScore: (c: string) => number;
  overallScore: number; overallTarget: number;
}) {
  return (
    <>
      <div className="grid md:grid-cols-3 gap-3 mb-4">
        <div className="gov-card p-5 col-span-2">
          <div className="text-xs text-muted-foreground mb-1">النتيجة العامة لنموذج {fwShort}</div>
          <div className="flex items-end gap-3">
            <div className="text-5xl font-bold text-primary">{overallScore}</div>
            <div className="text-sm text-muted-foreground mb-2">/100 · المستهدفة {overallTarget}</div>
          </div>
          <ProgressBar value={overallScore} color={overallScore >= 75 ? "success" : "warning"} />
          <div className="text-xs text-muted-foreground mt-2">منهجية التقييم: <b className="text-foreground">{methodology === "RADAR" ? "RADAR" : "إتقان"}</b></div>
        </div>
        <div className="gov-card p-5">
          <div className="text-xs text-muted-foreground mb-2">توزيع المعايير</div>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs"><span>إجمالي المعايير الرئيسية</span><b>{mainGroups.length}</b></div>
            <div className="flex items-center justify-between text-xs"><span>إجمالي المعايير الفرعية</span><b>{mainGroups.reduce((s, g) => s + g.subs.length, 0)}</b></div>
            <div className="flex items-center justify-between text-xs"><span>عناصر تقييم الممكن</span><b>{methodology === "RADAR" ? RADAR_ENABLER.length : ITQAN_ENABLER.length}</b></div>
            <div className="flex items-center justify-between text-xs"><span>عناصر تقييم النتيجة</span><b>{methodology === "RADAR" ? RADAR_RESULT.length : ITQAN_RESULT.length}</b></div>
          </div>
        </div>
      </div>

      <SectionCard title="نتائج المعايير الرئيسية" icon={Target}>
        <div className="space-y-3">
          {mainGroups.map((g) => {
            const cur = calcMainScore(g.code);
            const tgt = Math.round(g.subs.reduce((s, x) => s + x.targetScore, 0) / g.subs.length);
            return (
              <div key={g.code} className="border border-border rounded-lg p-3">
                <div className="flex items-center justify-between mb-2 flex-wrap gap-2">
                  <div className="font-bold text-sm">{g.code}. {g.name}</div>
                  <div className="flex items-center gap-2">
                    <Badge className={scoreColorClasses(cur)}>الحالية {cur}</Badge>
                    <Badge variant="outline">المستهدفة {tgt}</Badge>
                    <Badge variant="outline" className={cur >= tgt ? "text-success" : "text-destructive"}>
                      فجوة {Math.max(0, tgt - cur)}
                    </Badge>
                  </div>
                </div>
                <ProgressBar value={cur} color={cur >= 75 ? "success" : cur >= 60 ? "primary" : "warning"} />
                <div className="text-[11px] text-muted-foreground mt-2">{g.subs.length} معيار فرعي</div>
              </div>
            );
          })}
        </div>
      </SectionCard>
    </>
  );
}