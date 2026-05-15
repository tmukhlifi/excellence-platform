// بيانات افتراضية لأغراض العرض التجريبي - منصة التميز المؤسسي
// جميع الأرقام والأسماء افتراضية ولا تمثل بيانات رسمية

export type Department = {
  id: string;
  name: string;
  code: string;
  head: string;
  maturity: number;
  compliance: number;
  openGaps: number;
  openProjects: number;
  ownedStandards: number;
  evidenceCompletion: number;
};

export const departments: Department[] = [
  { id: "d1", name: "إدارة الجودة والتميز", code: "QMD", head: "أ. سلطان العتيبي", maturity: 78, compliance: 86, openGaps: 4, openProjects: 6, ownedStandards: 12, evidenceCompletion: 88 },
  { id: "d2", name: "الموارد البشرية", code: "HR", head: "أ. منى الزهراني", maturity: 71, compliance: 80, openGaps: 6, openProjects: 4, ownedStandards: 9, evidenceCompletion: 74 },
  { id: "d3", name: "الشؤون المالية", code: "FIN", head: "أ. خالد الدوسري", maturity: 74, compliance: 82, openGaps: 3, openProjects: 3, ownedStandards: 7, evidenceCompletion: 81 },
  { id: "d4", name: "تقنية المعلومات", code: "IT", head: "م. فهد القحطاني", maturity: 82, compliance: 90, openGaps: 5, openProjects: 7, ownedStandards: 14, evidenceCompletion: 91 },
  { id: "d5", name: "المشتريات والعقود", code: "PRC", head: "أ. عبدالله الحربي", maturity: 65, compliance: 72, openGaps: 8, openProjects: 3, ownedStandards: 6, evidenceCompletion: 67 },
  { id: "d6", name: "التواصل المؤسسي", code: "COM", head: "أ. ريم الشهري", maturity: 69, compliance: 76, openGaps: 4, openProjects: 2, ownedStandards: 5, evidenceCompletion: 72 },
  { id: "d7", name: "التخطيط الاستراتيجي", code: "STR", head: "د. ناصر الغامدي", maturity: 80, compliance: 88, openGaps: 3, openProjects: 5, ownedStandards: 10, evidenceCompletion: 86 },
  { id: "d8", name: "إدارة المخاطر", code: "RSK", head: "أ. هند المطيري", maturity: 73, compliance: 81, openGaps: 5, openProjects: 4, ownedStandards: 8, evidenceCompletion: 78 },
  { id: "d9", name: "الأمن السيبراني", code: "CYB", head: "م. ياسر العنزي", maturity: 84, compliance: 92, openGaps: 4, openProjects: 6, ownedStandards: 11, evidenceCompletion: 89 },
  { id: "d10", name: "الشؤون القانونية", code: "LEG", head: "أ. بدر السبيعي", maturity: 70, compliance: 84, openGaps: 3, openProjects: 2, ownedStandards: 5, evidenceCompletion: 80 },
  { id: "d11", name: "إدارة البيانات", code: "DAT", head: "م. لمى البقمي", maturity: 76, compliance: 83, openGaps: 5, openProjects: 4, ownedStandards: 7, evidenceCompletion: 82 },
  { id: "d12", name: "إدارة المشاريع", code: "PMO", head: "م. تركي العمري", maturity: 77, compliance: 85, openGaps: 4, openProjects: 9, ownedStandards: 8, evidenceCompletion: 84 },
];

export type FrameworkType = "EFQM" | "KAQA" | "ISO" | "CUSTOM";

export type Framework = {
  id: string;
  type: FrameworkType;
  name: string;
  shortName: string;
  mainCriteria: number;
  subCriteria: number;
  totalWeight: number;
  lastAssessment: string;
  completion: number;
  evidenceCount: number;
  gapsCount: number;
  readiness: "عالية" | "متوسطة" | "منخفضة";
  readinessScore: number;
  description: string;
};

export const frameworks: Framework[] = [
  { id: "f1", type: "EFQM", name: "نموذج التميز الأوروبي EFQM 2025", shortName: "EFQM", mainCriteria: 7, subCriteria: 23, totalWeight: 1000, lastAssessment: "2026-03-15", completion: 78, evidenceCount: 142, gapsCount: 18, readiness: "عالية", readinessScore: 74, description: "نموذج التميز الأوروبي القائم على الممكنات والنتائج ومنطق RADAR" },
  { id: "f2", type: "KAQA", name: "جائزة الملك عبدالعزيز للجودة", shortName: "KAQA", mainCriteria: 9, subCriteria: 32, totalWeight: 1000, lastAssessment: "2026-02-28", completion: 71, evidenceCount: 158, gapsCount: 22, readiness: "متوسطة", readinessScore: 68, description: "النموذج الوطني للجودة المعتمد على منطق إتقان وتقييم الممكنات والنتائج" },
  { id: "f3", type: "ISO", name: "ISO 9001:2015 - إدارة الجودة", shortName: "ISO 9001", mainCriteria: 10, subCriteria: 47, totalWeight: 100, lastAssessment: "2026-04-02", completion: 86, evidenceCount: 95, gapsCount: 7, readiness: "عالية", readinessScore: 86, description: "متطلبات نظام إدارة الجودة" },
  { id: "f4", type: "ISO", name: "ISO 14001:2015 - الإدارة البيئية", shortName: "ISO 14001", mainCriteria: 10, subCriteria: 41, totalWeight: 100, lastAssessment: "2026-03-20", completion: 74, evidenceCount: 68, gapsCount: 11, readiness: "متوسطة", readinessScore: 74, description: "متطلبات نظام الإدارة البيئية" },
  { id: "f5", type: "ISO", name: "ISO 45001:2018 - السلامة المهنية", shortName: "ISO 45001", mainCriteria: 10, subCriteria: 45, totalWeight: 100, lastAssessment: "2026-03-10", completion: 69, evidenceCount: 54, gapsCount: 13, readiness: "متوسطة", readinessScore: 69, description: "نظام إدارة الصحة والسلامة المهنية" },
  { id: "f6", type: "ISO", name: "ISO 27001:2022 - أمن المعلومات", shortName: "ISO 27001", mainCriteria: 10, subCriteria: 93, totalWeight: 100, lastAssessment: "2026-04-08", completion: 88, evidenceCount: 124, gapsCount: 6, readiness: "عالية", readinessScore: 88, description: "نظام إدارة أمن المعلومات" },
];

// معايير EFQM السبعة
export type CriterionType = "ممكن" | "نتيجة" | "بند";
export type Criterion = {
  id: string;
  frameworkId: string;
  code: string;
  name: string;
  type: CriterionType;
  weight: number;
  ownerDeptId: string;
  contributorDeptIds: string[];
  currentScore: number;
  targetScore: number;
  evidenceIds: string[];
  gaps: number;
  notes: string;
};

export const criteria: Criterion[] = [
  // EFQM
  { id: "c1", frameworkId: "f1", code: "1", name: "الغرض والرؤية والاستراتيجية", type: "ممكن", weight: 100, ownerDeptId: "d7", contributorDeptIds: ["d1", "d12"], currentScore: 72, targetScore: 85, evidenceIds: ["e1", "e2", "e3"], gaps: 3, notes: "تحتاج الرؤية إلى تحديث ليشمل ركائز رؤية 2030 بشكل أعمق" },
  { id: "c2", frameworkId: "f1", code: "2", name: "ثقافة المؤسسة وقيادتها", type: "ممكن", weight: 100, ownerDeptId: "d2", contributorDeptIds: ["d1", "d7"], currentScore: 68, targetScore: 80, evidenceIds: ["e4", "e5"], gaps: 4, notes: "ضعف في مؤشرات قياس ثقافة التميز" },
  { id: "c3", frameworkId: "f1", code: "3", name: "إشراك أصحاب العلاقة", type: "ممكن", weight: 100, ownerDeptId: "d6", contributorDeptIds: ["d7", "d10"], currentScore: 70, targetScore: 82, evidenceIds: ["e6", "e7"], gaps: 2, notes: "تحتاج خرائط أصحاب العلاقة إلى تحديث" },
  { id: "c4", frameworkId: "f1", code: "4", name: "خلق قيمة مستدامة", type: "ممكن", weight: 100, ownerDeptId: "d7", contributorDeptIds: ["d3", "d12"], currentScore: 75, targetScore: 85, evidenceIds: ["e8"], gaps: 2, notes: "" },
  { id: "c5", frameworkId: "f1", code: "5", name: "إدارة الأداء والتحول", type: "ممكن", weight: 100, ownerDeptId: "d12", contributorDeptIds: ["d1", "d4"], currentScore: 73, targetScore: 85, evidenceIds: ["e9", "e10"], gaps: 3, notes: "" },
  { id: "c6", frameworkId: "f1", code: "6", name: "نتائج تصورات أصحاب العلاقة", type: "نتيجة", weight: 200, ownerDeptId: "d6", contributorDeptIds: ["d1"], currentScore: 71, targetScore: 80, evidenceIds: ["e11", "e12"], gaps: 2, notes: "" },
  { id: "c7", frameworkId: "f1", code: "7", name: "نتائج الأداء الاستراتيجي والتشغيلي", type: "نتيجة", weight: 200, ownerDeptId: "d7", contributorDeptIds: ["d3", "d12"], currentScore: 76, targetScore: 85, evidenceIds: ["e13", "e14"], gaps: 2, notes: "" },
  // KAQA - عينة
  { id: "c8", frameworkId: "f2", code: "1", name: "القيادة", type: "ممكن", weight: 100, ownerDeptId: "d1", contributorDeptIds: ["d7"], currentScore: 70, targetScore: 85, evidenceIds: ["e15"], gaps: 3, notes: "" },
  { id: "c9", frameworkId: "f2", code: "2", name: "الاستراتيجية", type: "ممكن", weight: 100, ownerDeptId: "d7", contributorDeptIds: ["d1"], currentScore: 73, targetScore: 85, evidenceIds: ["e16"], gaps: 2, notes: "" },
  { id: "c10", frameworkId: "f2", code: "3", name: "الموارد البشرية", type: "ممكن", weight: 90, ownerDeptId: "d2", contributorDeptIds: [], currentScore: 65, targetScore: 80, evidenceIds: ["e17"], gaps: 4, notes: "" },
  { id: "c11", frameworkId: "f2", code: "4", name: "الشراكات والموارد", type: "ممكن", weight: 90, ownerDeptId: "d5", contributorDeptIds: ["d3"], currentScore: 67, targetScore: 80, evidenceIds: ["e18"], gaps: 3, notes: "" },
  { id: "c12", frameworkId: "f2", code: "5", name: "العمليات والخدمات", type: "ممكن", weight: 110, ownerDeptId: "d12", contributorDeptIds: ["d4"], currentScore: 75, targetScore: 88, evidenceIds: ["e19"], gaps: 2, notes: "" },
  { id: "c13", frameworkId: "f2", code: "6", name: "نتائج المتعاملين", type: "نتيجة", weight: 150, ownerDeptId: "d6", contributorDeptIds: [], currentScore: 72, targetScore: 85, evidenceIds: ["e20"], gaps: 2, notes: "" },
  { id: "c14", frameworkId: "f2", code: "7", name: "نتائج الموارد البشرية", type: "نتيجة", weight: 100, ownerDeptId: "d2", contributorDeptIds: [], currentScore: 68, targetScore: 80, evidenceIds: ["e21"], gaps: 3, notes: "" },
  { id: "c15", frameworkId: "f2", code: "8", name: "نتائج المجتمع", type: "نتيجة", weight: 60, ownerDeptId: "d6", contributorDeptIds: [], currentScore: 70, targetScore: 80, evidenceIds: [], gaps: 1, notes: "" },
  { id: "c16", frameworkId: "f2", code: "9", name: "نتائج الأداء الرئيسية", type: "نتيجة", weight: 200, ownerDeptId: "d7", contributorDeptIds: ["d3"], currentScore: 74, targetScore: 88, evidenceIds: ["e22"], gaps: 2, notes: "" },
  // ISO 9001 - عينة بنود
  { id: "c17", frameworkId: "f3", code: "4", name: "سياق المنظمة", type: "بند", weight: 10, ownerDeptId: "d7", contributorDeptIds: [], currentScore: 90, targetScore: 95, evidenceIds: ["e23"], gaps: 1, notes: "" },
  { id: "c18", frameworkId: "f3", code: "5", name: "القيادة", type: "بند", weight: 10, ownerDeptId: "d1", contributorDeptIds: [], currentScore: 88, targetScore: 95, evidenceIds: ["e24"], gaps: 1, notes: "" },
  { id: "c19", frameworkId: "f3", code: "6", name: "التخطيط", type: "بند", weight: 10, ownerDeptId: "d7", contributorDeptIds: [], currentScore: 85, targetScore: 95, evidenceIds: ["e25"], gaps: 2, notes: "" },
  { id: "c20", frameworkId: "f3", code: "7", name: "الدعم", type: "بند", weight: 10, ownerDeptId: "d2", contributorDeptIds: ["d4"], currentScore: 82, targetScore: 95, evidenceIds: ["e26"], gaps: 1, notes: "" },
  { id: "c21", frameworkId: "f3", code: "8", name: "التشغيل", type: "بند", weight: 10, ownerDeptId: "d12", contributorDeptIds: [], currentScore: 86, targetScore: 95, evidenceIds: ["e27"], gaps: 1, notes: "" },
  { id: "c22", frameworkId: "f3", code: "9", name: "تقييم الأداء", type: "بند", weight: 10, ownerDeptId: "d1", contributorDeptIds: [], currentScore: 84, targetScore: 95, evidenceIds: ["e28"], gaps: 1, notes: "" },
  { id: "c23", frameworkId: "f3", code: "10", name: "التحسين", type: "بند", weight: 10, ownerDeptId: "d1", contributorDeptIds: [], currentScore: 88, targetScore: 95, evidenceIds: ["e29"], gaps: 0, notes: "" },
];

// الشواهد
export type EvidenceType = "سياسة" | "إجراء" | "تقرير" | "لوحة بيانات" | "محضر اجتماع" | "خطة" | "سجل" | "مؤشر أداء" | "تعميم";
export type EvidenceStatus = "مكتمل" | "يحتاج تحديث" | "ناقص" | "غير معتمد";
export type EvidenceStrength = "قوي" | "متوسط" | "ضعيف";

export type Evidence = {
  id: string;
  name: string;
  type: EvidenceType;
  frameworkIds: string[];
  criterionIds: string[];
  ownerDeptId: string;
  issueDate: string;
  lastReview: string;
  status: EvidenceStatus;
  strength: EvidenceStrength;
  reviewerNotes: string;
  fileLink: string;
};

const ev = (i: number, name: string, type: EvidenceType, fw: string[], cri: string[], dept: string, status: EvidenceStatus, strength: EvidenceStrength, notes = ""): Evidence => ({
  id: `e${i}`, name, type, frameworkIds: fw, criterionIds: cri, ownerDeptId: dept,
  issueDate: `2025-${String(((i % 12) + 1)).padStart(2,"0")}-${String(((i*3 % 27) + 1)).padStart(2,"0")}`,
  lastReview: `2026-0${(i % 4) + 1}-1${i % 9}`, status, strength, reviewerNotes: notes,
  fileLink: `#evidence/${i}`,
});

export const evidences: Evidence[] = [
  ev(1, "السياسة العامة لإدارة الجودة", "سياسة", ["f1","f2","f3"], ["c1","c8","c18"], "d1", "مكتمل", "قوي", "شاهد قوي يدعم 3 نماذج"),
  ev(2, "الخطة الاستراتيجية 2026-2030", "خطة", ["f1","f2"], ["c1","c9"], "d7", "مكتمل", "قوي"),
  ev(3, "تقرير الرؤية والرسالة المحدّثة", "تقرير", ["f1"], ["c1"], "d7", "يحتاج تحديث", "متوسط", "بحاجة لربط أوضح برؤية 2030"),
  ev(4, "محضر اجتماع لجنة الثقافة المؤسسية", "محضر اجتماع", ["f1"], ["c2"], "d2", "مكتمل", "متوسط"),
  ev(5, "مسح ثقافة التميز السنوي", "تقرير", ["f1","f2"], ["c2","c14"], "d2", "مكتمل", "قوي"),
  ev(6, "خريطة أصحاب العلاقة", "خطة", ["f1","f2"], ["c3","c13"], "d6", "يحتاج تحديث", "متوسط"),
  ev(7, "تقرير رضا المتعاملين Q1 2026", "تقرير", ["f1","f2","f3"], ["c6","c13"], "d6", "مكتمل", "قوي"),
  ev(8, "إطار خلق القيمة المستدامة", "سياسة", ["f1"], ["c4"], "d7", "مكتمل", "متوسط"),
  ev(9, "لوحة قيادة الأداء التشغيلي", "لوحة بيانات", ["f1","f2","f3"], ["c5","c16","c22"], "d12", "مكتمل", "قوي"),
  ev(10, "إجراءات إدارة التحول المؤسسي", "إجراء", ["f1"], ["c5"], "d12", "مكتمل", "متوسط"),
  ev(11, "تقرير تصورات المتعاملين السنوي", "تقرير", ["f1","f2"], ["c6","c13"], "d6", "مكتمل", "قوي"),
  ev(12, "نتائج مسح الموظفين", "تقرير", ["f1","f2"], ["c6","c14"], "d2", "مكتمل", "متوسط"),
  ev(13, "تقرير الأداء التنفيذي السنوي", "تقرير", ["f1","f2"], ["c7","c16"], "d7", "مكتمل", "قوي"),
  ev(14, "مؤشرات الأداء الاستراتيجية KPIs", "مؤشر أداء", ["f1","f2","f3"], ["c7","c16","c22"], "d7", "مكتمل", "قوي"),
  ev(15, "ميثاق القيادة التنفيذية", "سياسة", ["f2","f3"], ["c8","c18"], "d1", "مكتمل", "قوي"),
  ev(16, "وثيقة التوجهات الاستراتيجية", "خطة", ["f2"], ["c9"], "d7", "مكتمل", "قوي"),
  ev(17, "سياسة تطوير الموارد البشرية", "سياسة", ["f2","f3","f5"], ["c10","c20"], "d2", "يحتاج تحديث", "متوسط"),
  ev(18, "إطار إدارة الشراكات والموردين", "إجراء", ["f2","f3"], ["c11","c21"], "d5", "ناقص", "ضعيف", "إطار غير مكتمل ويفتقر لمعايير التقييم"),
  ev(19, "خرائط العمليات الرئيسية", "إجراء", ["f2","f3"], ["c12","c21"], "d12", "مكتمل", "قوي"),
  ev(20, "تقرير شكاوى المتعاملين", "تقرير", ["f2","f3"], ["c13"], "d6", "مكتمل", "متوسط"),
  ev(21, "تقرير معدل دوران الموظفين", "تقرير", ["f2"], ["c14"], "d2", "مكتمل", "متوسط"),
  ev(22, "نتائج الأداء المالي والتشغيلي", "تقرير", ["f2","f3"], ["c16"], "d3", "مكتمل", "قوي"),
  ev(23, "تحليل سياق المنظمة SWOT/PESTLE", "تقرير", ["f3","f4","f5","f6"], ["c17"], "d7", "مكتمل", "قوي"),
  ev(24, "إعلان التزام القيادة بالجودة", "تعميم", ["f3","f4","f5","f6"], ["c18"], "d1", "مكتمل", "قوي"),
  ev(25, "خطة إدارة المخاطر والفرص", "خطة", ["f3","f4","f5","f6"], ["c19"], "d8", "مكتمل", "قوي"),
  ev(26, "سجل الكفاءات والتدريب", "سجل", ["f3","f5"], ["c20"], "d2", "يحتاج تحديث", "متوسط"),
  ev(27, "إجراءات ضبط العمليات التشغيلية", "إجراء", ["f3"], ["c21"], "d12", "مكتمل", "قوي"),
  ev(28, "تقرير المراجعة الإدارية", "تقرير", ["f3","f4","f5","f6"], ["c22"], "d1", "مكتمل", "قوي"),
  ev(29, "سجل الإجراءات التصحيحية", "سجل", ["f3","f4","f5","f6"], ["c23"], "d1", "مكتمل", "قوي"),
  ev(30, "سياسة الإدارة البيئية", "سياسة", ["f4"], [], "d12", "ناقص", "ضعيف"),
  ev(31, "تقييم الجوانب البيئية", "تقرير", ["f4"], [], "d12", "يحتاج تحديث", "متوسط"),
  ev(32, "خطة الاستجابة للطوارئ", "خطة", ["f4","f5"], [], "d8", "مكتمل", "قوي"),
  ev(33, "سياسة السلامة والصحة المهنية", "سياسة", ["f5"], [], "d2", "مكتمل", "قوي"),
  ev(34, "تقييم مخاطر السلامة المهنية", "تقرير", ["f5"], [], "d8", "يحتاج تحديث", "متوسط"),
  ev(35, "سجل الحوادث والإصابات", "سجل", ["f5"], [], "d2", "مكتمل", "متوسط"),
  ev(36, "سياسة أمن المعلومات SoA", "سياسة", ["f6"], [], "d9", "مكتمل", "قوي"),
  ev(37, "تقييم مخاطر أمن المعلومات", "تقرير", ["f6"], [], "d9", "مكتمل", "قوي"),
  ev(38, "خطة استمرارية الأعمال BCP", "خطة", ["f6","f3"], [], "d9", "مكتمل", "قوي"),
  ev(39, "تقرير اختبار الاختراق", "تقرير", ["f6"], [], "d9", "مكتمل", "قوي"),
  ev(40, "سجل الحوادث الأمنية", "سجل", ["f6"], [], "d9", "غير معتمد", "ضعيف", "بحاجة لاعتماد رسمي من الإدارة العليا"),
];

// الفجوات
export type Gap = {
  id: string;
  title: string;
  description: string;
  frameworkId: string;
  criterionIds: string[];
  ownerDeptId: string;
  rootCause: string;
  impact: 1 | 2 | 3 | 4 | 5;
  effort: 1 | 2 | 3 | 4 | 5;
  priority: "حرجة" | "عالية" | "متوسطة" | "منخفضة";
  riskIfIgnored: string;
  recommendation: string;
  convertibleToProject: boolean;
  status: "مفتوحة" | "قيد المعالجة" | "تم تحويلها" | "مغلقة";
};

export const gaps: Gap[] = [
  { id: "g1", title: "ضعف ربط الرؤية برؤية 2030", description: "لا يوجد ربط واضح بين رؤية الجهة وركائز رؤية 2030", frameworkId: "f1", criterionIds: ["c1"], ownerDeptId: "d7", rootCause: "عدم تحديث الرؤية منذ 2022", impact: 5, effort: 2, priority: "حرجة", riskIfIgnored: "فقدان درجات في معيار الغرض والاستراتيجية", recommendation: "ورشة عمل تنفيذية لتحديث الرؤية والربط بمستهدفات 2030", convertibleToProject: true, status: "تم تحويلها" },
  { id: "g2", title: "غياب مؤشرات قياس ثقافة التميز", description: "لا توجد مؤشرات كمية لقياس ترسخ ثقافة التميز", frameworkId: "f1", criterionIds: ["c2"], ownerDeptId: "d2", rootCause: "غياب إطار قياس", impact: 4, effort: 3, priority: "عالية", riskIfIgnored: "ضعف الأدلة على ترسيخ القيم", recommendation: "تطوير إطار قياس ثقافة التميز ربع سنوي", convertibleToProject: true, status: "قيد المعالجة" },
  { id: "g3", title: "خرائط أصحاب العلاقة قديمة", description: "آخر تحديث للخرائط كان قبل 18 شهراً", frameworkId: "f1", criterionIds: ["c3"], ownerDeptId: "d6", rootCause: "عدم وجود دورة تحديث منتظمة", impact: 3, effort: 1, priority: "متوسطة", riskIfIgnored: "إغفال أصحاب علاقة جدد", recommendation: "تحديث سنوي إلزامي مع مراجعة ربع سنوية", convertibleToProject: true, status: "مفتوحة" },
  { id: "g4", title: "ضعف منهجية تقييم الموردين", description: "تقييم الموردين يتم بشكل يدوي وغير منهجي", frameworkId: "f2", criterionIds: ["c11"], ownerDeptId: "d5", rootCause: "غياب نظام آلي وإطار معايير", impact: 4, effort: 4, priority: "عالية", riskIfIgnored: "اختيار موردين غير مؤهلين", recommendation: "بناء منظومة تقييم موردين متكاملة", convertibleToProject: true, status: "تم تحويلها" },
  { id: "g5", title: "نقص في توثيق العمليات الفرعية", description: "30% من العمليات الفرعية غير موثقة", frameworkId: "f3", criterionIds: ["c21"], ownerDeptId: "d12", rootCause: "ضغط العمل وعدم التخصيص", impact: 4, effort: 3, priority: "عالية", riskIfIgnored: "عدم مطابقة في تدقيق ISO 9001", recommendation: "حملة توثيق عمليات شاملة خلال 6 أشهر", convertibleToProject: true, status: "قيد المعالجة" },
  { id: "g6", title: "ضعف في برامج التطوير القيادي", description: "غياب مسار تطوير ممنهج للقيادات الوسطى", frameworkId: "f2", criterionIds: ["c10"], ownerDeptId: "d2", rootCause: "غياب استراتيجية تطوير قيادي", impact: 4, effort: 4, priority: "عالية", riskIfIgnored: "ضعف في خط الإحلال", recommendation: "إطلاق أكاديمية القيادات", convertibleToProject: true, status: "تم تحويلها" },
  { id: "g7", title: "تأخر تحديث تقييم الجوانب البيئية", description: "آخر تقييم منذ أكثر من سنتين", frameworkId: "f4", criterionIds: [], ownerDeptId: "d12", rootCause: "عدم وجود مالك واضح للعملية", impact: 5, effort: 2, priority: "حرجة", riskIfIgnored: "عدم مطابقة جسيمة في ISO 14001", recommendation: "تكليف فريق وإعادة التقييم خلال 60 يوماً", convertibleToProject: true, status: "مفتوحة" },
  { id: "g8", title: "نقص في تدريبات السلامة", description: "أقل من 60% من الموظفين أكملوا التدريب الأساسي", frameworkId: "f5", criterionIds: [], ownerDeptId: "d2", rootCause: "ضعف في إنفاذ متطلبات التدريب", impact: 4, effort: 2, priority: "عالية", riskIfIgnored: "زيادة الحوادث والإصابات", recommendation: "حملة تدريب إلزامية خلال الربع القادم", convertibleToProject: true, status: "قيد المعالجة" },
  { id: "g9", title: "ضعف في إدارة وصول المستخدمين", description: "صلاحيات غير محدّثة لـ 15% من الحسابات", frameworkId: "f6", criterionIds: [], ownerDeptId: "d9", rootCause: "غياب مراجعة دورية", impact: 5, effort: 2, priority: "حرجة", riskIfIgnored: "ثغرات أمنية ومخالفة ISO 27001", recommendation: "أتمتة مراجعة الصلاحيات ربع سنوياً", convertibleToProject: true, status: "تم تحويلها" },
  { id: "g10", title: "غياب لوحة قيادة موحدة للأداء", description: "كل إدارة تستخدم لوحة منفصلة", frameworkId: "f1", criterionIds: ["c5"], ownerDeptId: "d12", rootCause: "غياب توحيد المنصات", impact: 4, effort: 4, priority: "عالية", riskIfIgnored: "ضعف القرار التنفيذي", recommendation: "بناء لوحة قيادة مؤسسية موحدة", convertibleToProject: true, status: "تم تحويلها" },
  { id: "g11", title: "ضعف في قياس رضا الموظفين", description: "المسح يتم سنوياً فقط", frameworkId: "f2", criterionIds: ["c14"], ownerDeptId: "d2", rootCause: "أداة قياس محدودة", impact: 3, effort: 2, priority: "متوسطة", riskIfIgnored: "تأخر اكتشاف مشكلات بيئة العمل", recommendation: "نبض شهري قصير + مسح سنوي", convertibleToProject: true, status: "مفتوحة" },
  { id: "g12", title: "نقص في توثيق دروس مستفادة", description: "لا توجد قاعدة معرفة مركزية", frameworkId: "f1", criterionIds: ["c5"], ownerDeptId: "d12", rootCause: "ثقافة عدم التوثيق", impact: 3, effort: 2, priority: "متوسطة", riskIfIgnored: "تكرار الأخطاء", recommendation: "إطلاق منصة دروس مستفادة", convertibleToProject: true, status: "مفتوحة" },
  { id: "g13", title: "ضعف في إدارة المخاطر السيبرانية للمشاريع", description: "لا يتم تقييم المخاطر السيبرانية في كل مشروع", frameworkId: "f6", criterionIds: [], ownerDeptId: "d9", rootCause: "غياب إجراء إلزامي", impact: 4, effort: 2, priority: "عالية", riskIfIgnored: "ثغرات في الأنظمة الجديدة", recommendation: "إلزام تقييم سيبراني لكل مشروع", convertibleToProject: true, status: "قيد المعالجة" },
  { id: "g14", title: "تأخر إغلاق الإجراءات التصحيحية", description: "متوسط زمن الإغلاق 95 يوماً", frameworkId: "f3", criterionIds: ["c23"], ownerDeptId: "d1", rootCause: "ضعف المتابعة", impact: 3, effort: 2, priority: "متوسطة", riskIfIgnored: "تكرار حالات عدم المطابقة", recommendation: "نظام متابعة آلي مع تنبيهات تصاعدية", convertibleToProject: true, status: "تم تحويلها" },
  { id: "g15", title: "ضعف في قياس أثر التدريب", description: "لا يتم قياس أثر التدريب على الأداء", frameworkId: "f2", criterionIds: ["c10"], ownerDeptId: "d2", rootCause: "غياب منهجية كيركباتريك", impact: 3, effort: 3, priority: "متوسطة", riskIfIgnored: "هدر موارد التدريب", recommendation: "تطبيق نموذج كيركباتريك للمستوى 3-4", convertibleToProject: true, status: "مفتوحة" },
  { id: "g16", title: "غياب خطة استمرارية محدّثة", description: "آخر اختبار للخطة قبل عام", frameworkId: "f6", criterionIds: [], ownerDeptId: "d9", rootCause: "عدم جدولة الاختبارات", impact: 5, effort: 3, priority: "حرجة", riskIfIgnored: "فشل في الاستجابة للأزمات", recommendation: "اختبار شامل ربع سنوي", convertibleToProject: true, status: "قيد المعالجة" },
  { id: "g17", title: "نقص في توعية الموظفين بأمن المعلومات", description: "نسبة الإكمال 55%", frameworkId: "f6", criterionIds: [], ownerDeptId: "d9", rootCause: "ضعف الإلزام", impact: 4, effort: 1, priority: "عالية", riskIfIgnored: "هندسة اجتماعية ناجحة", recommendation: "حملة توعية مع محاكاة تصيد", convertibleToProject: true, status: "مفتوحة" },
  { id: "g18", title: "ضعف في مؤشرات نتائج المجتمع", description: "غياب مؤشرات قياس الأثر المجتمعي", frameworkId: "f2", criterionIds: ["c15"], ownerDeptId: "d6", rootCause: "غياب إطار قياس مجتمعي", impact: 3, effort: 3, priority: "متوسطة", riskIfIgnored: "ضعف في معيار نتائج المجتمع", recommendation: "تطوير إطار قياس الأثر المجتمعي", convertibleToProject: true, status: "مفتوحة" },
  { id: "g19", title: "تأخر في رقمنة بعض الخدمات", description: "20% من الخدمات لا تزال يدوية", frameworkId: "f2", criterionIds: ["c12"], ownerDeptId: "d4", rootCause: "أولوية رقمنة منخفضة لبعض الخدمات", impact: 4, effort: 5, priority: "عالية", riskIfIgnored: "ضعف رضا المتعاملين", recommendation: "خارطة رقمنة شاملة 18 شهراً", convertibleToProject: true, status: "تم تحويلها" },
  { id: "g20", title: "ضعف في ربط المؤشرات بالاستراتيجية", description: "بعض KPIs غير مرتبطة بأهداف استراتيجية", frameworkId: "f1", criterionIds: ["c4","c7"], ownerDeptId: "d7", rootCause: "غياب مراجعة BSC", impact: 4, effort: 2, priority: "عالية", riskIfIgnored: "قرارات غير محاذية للاستراتيجية", recommendation: "مراجعة شاملة لخريطة BSC", convertibleToProject: true, status: "مفتوحة" },
  { id: "g21", title: "نقص في توثيق المخاطر التشغيلية", description: "سجل المخاطر يغطي 70% فقط", frameworkId: "f3", criterionIds: ["c19"], ownerDeptId: "d8", rootCause: "ورش تحديد مخاطر غير منتظمة", impact: 4, effort: 3, priority: "عالية", riskIfIgnored: "مفاجآت تشغيلية", recommendation: "ورش تقييم مخاطر ربع سنوية", convertibleToProject: true, status: "قيد المعالجة" },
  { id: "g22", title: "ضعف في مشاركة الموردين في الابتكار", description: "غياب برامج ابتكار مشترك", frameworkId: "f2", criterionIds: ["c11"], ownerDeptId: "d5", rootCause: "ثقافة شراكة تقليدية", impact: 3, effort: 4, priority: "متوسطة", riskIfIgnored: "ضعف ميزة تنافسية", recommendation: "إطلاق مختبر ابتكار مع موردين", convertibleToProject: true, status: "مفتوحة" },
  { id: "g23", title: "غياب لوحة مخاطر تنفيذية", description: "القيادة لا ترى صورة موحدة للمخاطر", frameworkId: "f1", criterionIds: ["c5"], ownerDeptId: "d8", rootCause: "غياب أداة تجميع", impact: 4, effort: 2, priority: "عالية", riskIfIgnored: "قرارات بدون رؤية مخاطر", recommendation: "بناء لوحة مخاطر تنفيذية", convertibleToProject: true, status: "مفتوحة" },
  { id: "g24", title: "ضعف في قياس تجربة المتعامل الرقمية", description: "لا يوجد قياس CX للقنوات الرقمية", frameworkId: "f2", criterionIds: ["c13"], ownerDeptId: "d6", rootCause: "غياب أدوات", impact: 4, effort: 3, priority: "عالية", riskIfIgnored: "تدهور تجربة المتعامل", recommendation: "تطبيق منصة CX رقمية", convertibleToProject: true, status: "مفتوحة" },
  { id: "g25", title: "نقص في الشواهد على المقارنات المعيارية", description: "لا توجد مقارنات منهجية مع جهات مماثلة", frameworkId: "f1", criterionIds: ["c7"], ownerDeptId: "d1", rootCause: "غياب برنامج Benchmarking", impact: 3, effort: 3, priority: "متوسطة", riskIfIgnored: "ضعف في معيار الاتجاهات والمقارنات", recommendation: "إطلاق برنامج مقارنات معيارية سنوي", convertibleToProject: true, status: "مفتوحة" },
];

// فرص التحسين
export type Improvement = {
  id: string;
  title: string;
  description: string;
  gapId: string | null;
  frameworkId: string;
  criterionIds: string[];
  ownerDeptId: string;
  impact: 1 | 2 | 3 | 4 | 5;
  effort: 1 | 2 | 3 | 4 | 5;
  category: "مكاسب سريعة" | "مشروع استراتيجي" | "تحسينات تشغيلية" | "يؤجل";
  status: "مقترحة" | "معتمدة" | "محوّلة لمشروع" | "مرفوضة";
  expectedImpactDescription: string;
};

export const improvements: Improvement[] = [
  { id: "i1", title: "تحديث الرؤية ومحاذاتها مع رؤية 2030", description: "ورشة تنفيذية لإعادة صياغة الرؤية", gapId: "g1", frameworkId: "f1", criterionIds: ["c1"], ownerDeptId: "d7", impact: 5, effort: 2, category: "مكاسب سريعة", status: "محوّلة لمشروع", expectedImpactDescription: "+12 نقطة في معيار الغرض والاستراتيجية" },
  { id: "i2", title: "إطار قياس ثقافة التميز", description: "تطوير 8 مؤشرات لقياس ترسخ القيم", gapId: "g2", frameworkId: "f1", criterionIds: ["c2"], ownerDeptId: "d2", impact: 4, effort: 3, category: "مشروع استراتيجي", status: "معتمدة", expectedImpactDescription: "+8 نقاط في معيار الثقافة" },
  { id: "i3", title: "تحديث خرائط أصحاب العلاقة سنوياً", description: "إجراء وتعميم لتحديث الخرائط", gapId: "g3", frameworkId: "f1", criterionIds: ["c3"], ownerDeptId: "d6", impact: 3, effort: 1, category: "مكاسب سريعة", status: "مقترحة", expectedImpactDescription: "+5 نقاط في معيار أصحاب العلاقة" },
  { id: "i4", title: "منظومة تقييم موردين رقمية", description: "أتمتة كاملة لتقييم الموردين", gapId: "g4", frameworkId: "f2", criterionIds: ["c11"], ownerDeptId: "d5", impact: 4, effort: 4, category: "مشروع استراتيجي", status: "محوّلة لمشروع", expectedImpactDescription: "+10 نقاط في الشراكات والموارد" },
  { id: "i5", title: "حملة توثيق عمليات شاملة", description: "توثيق 100% من العمليات الفرعية", gapId: "g5", frameworkId: "f3", criterionIds: ["c21"], ownerDeptId: "d12", impact: 4, effort: 3, category: "مشروع استراتيجي", status: "معتمدة", expectedImpactDescription: "إغلاق 8 ملاحظات ISO 9001" },
  { id: "i6", title: "أكاديمية القيادات", description: "برنامج تطوير قيادي ممنهج", gapId: "g6", frameworkId: "f2", criterionIds: ["c10"], ownerDeptId: "d2", impact: 4, effort: 4, category: "مشروع استراتيجي", status: "محوّلة لمشروع", expectedImpactDescription: "+12 نقطة في الموارد البشرية" },
  { id: "i7", title: "إعادة تقييم الجوانب البيئية", description: "تقييم شامل وفق ISO 14001", gapId: "g7", frameworkId: "f4", criterionIds: [], ownerDeptId: "d12", impact: 5, effort: 2, category: "مكاسب سريعة", status: "معتمدة", expectedImpactDescription: "إغلاق عدم مطابقة جسيمة" },
  { id: "i8", title: "حملة تدريب سلامة إلزامية", description: "تغطية 100% من الموظفين", gapId: "g8", frameworkId: "f5", criterionIds: [], ownerDeptId: "d2", impact: 4, effort: 2, category: "مكاسب سريعة", status: "معتمدة", expectedImpactDescription: "تخفيض الحوادث 40%" },
  { id: "i9", title: "أتمتة مراجعة الصلاحيات", description: "نظام مراجعة دورية للصلاحيات", gapId: "g9", frameworkId: "f6", criterionIds: [], ownerDeptId: "d9", impact: 5, effort: 2, category: "مكاسب سريعة", status: "محوّلة لمشروع", expectedImpactDescription: "إغلاق 6 ملاحظات ISO 27001" },
  { id: "i10", title: "لوحة قيادة مؤسسية موحدة", description: "تجميع كل لوحات الإدارات", gapId: "g10", frameworkId: "f1", criterionIds: ["c5"], ownerDeptId: "d12", impact: 4, effort: 4, category: "مشروع استراتيجي", status: "محوّلة لمشروع", expectedImpactDescription: "+10 نقاط في إدارة الأداء" },
  { id: "i11", title: "نبض الموظفين الشهري", description: "مسح قصير شهري + سنوي", gapId: "g11", frameworkId: "f2", criterionIds: ["c14"], ownerDeptId: "d2", impact: 3, effort: 2, category: "تحسينات تشغيلية", status: "مقترحة", expectedImpactDescription: "+5 نقاط في نتائج HR" },
  { id: "i12", title: "منصة الدروس المستفادة", description: "قاعدة معرفة مركزية", gapId: "g12", frameworkId: "f1", criterionIds: ["c5"], ownerDeptId: "d12", impact: 3, effort: 2, category: "تحسينات تشغيلية", status: "مقترحة", expectedImpactDescription: "تخفيض تكرار الأخطاء 30%" },
  { id: "i13", title: "تقييم سيبراني إلزامي للمشاريع", description: "بوابة سيبرانية في PMO", gapId: "g13", frameworkId: "f6", criterionIds: [], ownerDeptId: "d9", impact: 4, effort: 2, category: "مكاسب سريعة", status: "معتمدة", expectedImpactDescription: "تخفيض ثغرات المشاريع 60%" },
  { id: "i14", title: "أتمتة متابعة الإجراءات التصحيحية", description: "نظام تنبيهات تصاعدية", gapId: "g14", frameworkId: "f3", criterionIds: ["c23"], ownerDeptId: "d1", impact: 3, effort: 2, category: "تحسينات تشغيلية", status: "محوّلة لمشروع", expectedImpactDescription: "تخفيض زمن الإغلاق 50%" },
  { id: "i15", title: "قياس أثر التدريب وفق كيركباتريك", description: "تطبيق المستويات 3 و 4", gapId: "g15", frameworkId: "f2", criterionIds: ["c10"], ownerDeptId: "d2", impact: 3, effort: 3, category: "تحسينات تشغيلية", status: "مقترحة", expectedImpactDescription: "تحسين ROI التدريب 35%" },
  { id: "i16", title: "اختبار خطة الاستمرارية ربع سنوي", description: "محاكاة كاملة دورية", gapId: "g16", frameworkId: "f6", criterionIds: [], ownerDeptId: "d9", impact: 5, effort: 3, category: "مشروع استراتيجي", status: "معتمدة", expectedImpactDescription: "جاهزية شاملة للأزمات" },
  { id: "i17", title: "حملة توعية + محاكاة تصيد", description: "5 حملات سنوياً", gapId: "g17", frameworkId: "f6", criterionIds: [], ownerDeptId: "d9", impact: 4, effort: 1, category: "مكاسب سريعة", status: "معتمدة", expectedImpactDescription: "تخفيض حوادث التصيد 70%" },
  { id: "i18", title: "إطار قياس الأثر المجتمعي", description: "مؤشرات SROI للمبادرات", gapId: "g18", frameworkId: "f2", criterionIds: ["c15"], ownerDeptId: "d6", impact: 3, effort: 3, category: "تحسينات تشغيلية", status: "مقترحة", expectedImpactDescription: "+8 نقاط في نتائج المجتمع" },
  { id: "i19", title: "خارطة رقمنة الخدمات", description: "رقمنة 100% خلال 18 شهراً", gapId: "g19", frameworkId: "f2", criterionIds: ["c12"], ownerDeptId: "d4", impact: 4, effort: 5, category: "مشروع استراتيجي", status: "محوّلة لمشروع", expectedImpactDescription: "+15 نقطة في العمليات" },
  { id: "i20", title: "مراجعة شاملة لخريطة BSC", description: "محاذاة كل KPI مع هدف استراتيجي", gapId: "g20", frameworkId: "f1", criterionIds: ["c4","c7"], ownerDeptId: "d7", impact: 4, effort: 2, category: "مكاسب سريعة", status: "معتمدة", expectedImpactDescription: "+8 نقاط في النتائج الاستراتيجية" },
];

// مشاريع التحسين
export type ProjectStatus = "مقترح" | "معتمد" | "قيد التنفيذ" | "متأخر" | "مكتمل" | "مغلق بعد قياس الأثر";

export type ImprovementProject = {
  id: string;
  name: string;
  improvementId: string;
  frameworkIds: string[];
  criterionIds: string[];
  ownerName: string;
  ownerDeptId: string;
  contributorDeptIds: string[];
  startDate: string;
  endDate: string;
  status: ProjectStatus;
  progress: number;
  expectedImpact: string;
  achievedImpact: string;
  kpis: string[];
  risks: string[];
  decisionsNeeded: string[];
  lastUpdate: string;
};

export const projects: ImprovementProject[] = [
  { id: "p1", name: "إعادة صياغة الرؤية والمحاذاة مع 2030", improvementId: "i1", frameworkIds: ["f1","f2"], criterionIds: ["c1","c9"], ownerName: "د. ناصر الغامدي", ownerDeptId: "d7", contributorDeptIds: ["d1","d6"], startDate: "2026-02-01", endDate: "2026-05-30", status: "قيد التنفيذ", progress: 65, expectedImpact: "+12 نقطة في الجاهزية", achievedImpact: "+7 نقاط حتى الآن", kpis: ["نسبة الموظفين المدركين للرؤية", "ربط الأهداف الاستراتيجية"], risks: ["تأخر اعتماد القيادة"], decisionsNeeded: ["اعتماد الصياغة النهائية"], lastUpdate: "2026-04-22" },
  { id: "p2", name: "أكاديمية القيادات الحكومية", improvementId: "i6", frameworkIds: ["f1","f2"], criterionIds: ["c2","c10"], ownerName: "أ. منى الزهراني", ownerDeptId: "d2", contributorDeptIds: ["d1"], startDate: "2026-01-15", endDate: "2026-09-30", status: "قيد التنفيذ", progress: 42, expectedImpact: "+12 نقطة في HR", achievedImpact: "5 برامج مطلقة", kpis: ["عدد القادة المؤهلين", "نسبة الإحلال"], risks: ["محدودية الميزانية"], decisionsNeeded: ["زيادة المخصص المالي"], lastUpdate: "2026-04-25" },
  { id: "p3", name: "منظومة تقييم الموردين الرقمية", improvementId: "i4", frameworkIds: ["f2","f3"], criterionIds: ["c11"], ownerName: "أ. عبدالله الحربي", ownerDeptId: "d5", contributorDeptIds: ["d4","d3"], startDate: "2025-11-01", endDate: "2026-04-30", status: "متأخر", progress: 78, expectedImpact: "+10 نقاط في الشراكات", achievedImpact: "تقييم 60% من الموردين", kpis: ["نسبة الموردين المُقيّمين", "متوسط الجودة"], risks: ["تأخر التكامل التقني"], decisionsNeeded: ["تمديد الجدول الزمني"], lastUpdate: "2026-04-20" },
  { id: "p4", name: "حملة توثيق العمليات الشاملة", improvementId: "i5", frameworkIds: ["f3"], criterionIds: ["c21"], ownerName: "م. تركي العمري", ownerDeptId: "d12", contributorDeptIds: ["d1"], startDate: "2026-02-15", endDate: "2026-08-15", status: "قيد التنفيذ", progress: 55, expectedImpact: "إغلاق 8 ملاحظات", achievedImpact: "وثقت 110 عملية", kpis: ["عدد العمليات الموثقة", "نسبة المراجعة"], risks: ["مقاومة بعض الإدارات"], decisionsNeeded: [], lastUpdate: "2026-04-26" },
  { id: "p5", name: "أتمتة مراجعة صلاحيات الوصول", improvementId: "i9", frameworkIds: ["f6"], criterionIds: [], ownerName: "م. ياسر العنزي", ownerDeptId: "d9", contributorDeptIds: ["d4"], startDate: "2026-01-10", endDate: "2026-03-30", status: "مكتمل", progress: 100, expectedImpact: "إغلاق 6 ملاحظات", achievedImpact: "إغلاق 6 ملاحظات + تخفيض 80% في الصلاحيات الزائدة", kpis: ["دورية المراجعة", "زمن المراجعة"], risks: [], decisionsNeeded: [], lastUpdate: "2026-04-01" },
  { id: "p6", name: "لوحة قيادة مؤسسية موحدة", improvementId: "i10", frameworkIds: ["f1"], criterionIds: ["c5","c7"], ownerName: "م. لمى البقمي", ownerDeptId: "d11", contributorDeptIds: ["d4","d12"], startDate: "2026-03-01", endDate: "2026-10-30", status: "قيد التنفيذ", progress: 30, expectedImpact: "+10 نقاط في إدارة الأداء", achievedImpact: "بنية تحتية جاهزة", kpis: ["عدد المؤشرات المركزية", "زمن إعداد التقارير"], risks: ["تكامل البيانات"], decisionsNeeded: ["اختيار حوكمة البيانات"], lastUpdate: "2026-04-23" },
  { id: "p7", name: "أتمتة متابعة الإجراءات التصحيحية", improvementId: "i14", frameworkIds: ["f3","f4","f5","f6"], criterionIds: ["c23"], ownerName: "أ. سلطان العتيبي", ownerDeptId: "d1", contributorDeptIds: ["d4"], startDate: "2026-03-15", endDate: "2026-06-30", status: "قيد التنفيذ", progress: 50, expectedImpact: "تخفيض زمن الإغلاق 50%", achievedImpact: "نظام تنبيهات يعمل", kpis: ["متوسط زمن الإغلاق", "نسبة الإغلاق في الموعد"], risks: [], decisionsNeeded: [], lastUpdate: "2026-04-24" },
  { id: "p8", name: "خارطة رقمنة الخدمات الحكومية", improvementId: "i19", frameworkIds: ["f2"], criterionIds: ["c12"], ownerName: "م. فهد القحطاني", ownerDeptId: "d4", contributorDeptIds: ["d12","d6"], startDate: "2026-01-01", endDate: "2027-06-30", status: "قيد التنفيذ", progress: 22, expectedImpact: "+15 نقطة في العمليات", achievedImpact: "رقمنة 4 خدمات", kpis: ["عدد الخدمات الرقمية", "رضا المستخدمين"], risks: ["تعقيد الأنظمة القديمة"], decisionsNeeded: ["استثمار بنية تحتية"], lastUpdate: "2026-04-25" },
  { id: "p9", name: "حملة توعية أمن المعلومات + محاكاة تصيد", improvementId: "i17", frameworkIds: ["f6"], criterionIds: [], ownerName: "م. ياسر العنزي", ownerDeptId: "d9", contributorDeptIds: ["d2","d6"], startDate: "2026-04-01", endDate: "2026-12-31", status: "قيد التنفيذ", progress: 18, expectedImpact: "تخفيض حوادث التصيد 70%", achievedImpact: "حملة أولى مكتملة", kpis: ["نسبة الإكمال", "معدل النقر على التصيد"], risks: [], decisionsNeeded: [], lastUpdate: "2026-04-26" },
  { id: "p10", name: "إطار قياس ثقافة التميز", improvementId: "i2", frameworkIds: ["f1"], criterionIds: ["c2"], ownerName: "أ. منى الزهراني", ownerDeptId: "d2", contributorDeptIds: ["d1"], startDate: "2026-04-15", endDate: "2026-09-30", status: "معتمد", progress: 8, expectedImpact: "+8 نقاط في معيار الثقافة", achievedImpact: "—", kpis: ["مؤشرات الثقافة الثمانية"], risks: [], decisionsNeeded: ["تكليف مزود خارجي"], lastUpdate: "2026-04-20" },
  { id: "p11", name: "تقييم الجوانب البيئية الشامل", improvementId: "i7", frameworkIds: ["f4"], criterionIds: [], ownerName: "م. تركي العمري", ownerDeptId: "d12", contributorDeptIds: ["d8"], startDate: "2026-04-10", endDate: "2026-06-15", status: "قيد التنفيذ", progress: 35, expectedImpact: "إغلاق عدم مطابقة جسيمة", achievedImpact: "تقييم 12 موقعاً", kpis: ["عدد المواقع المُقيّمة"], risks: [], decisionsNeeded: [], lastUpdate: "2026-04-25" },
  { id: "p12", name: "حملة تدريب السلامة المهنية الإلزامية", improvementId: "i8", frameworkIds: ["f5"], criterionIds: [], ownerName: "أ. منى الزهراني", ownerDeptId: "d2", contributorDeptIds: ["d8"], startDate: "2026-03-01", endDate: "2026-06-30", status: "قيد التنفيذ", progress: 70, expectedImpact: "تخفيض الحوادث 40%", achievedImpact: "تدريب 1450 موظف", kpis: ["نسبة التغطية", "معدل الحوادث"], risks: [], decisionsNeeded: [], lastUpdate: "2026-04-26" },
  { id: "p13", name: "بوابة التقييم السيبراني للمشاريع", improvementId: "i13", frameworkIds: ["f6"], criterionIds: [], ownerName: "م. ياسر العنزي", ownerDeptId: "d9", contributorDeptIds: ["d12"], startDate: "2026-02-20", endDate: "2026-05-30", status: "قيد التنفيذ", progress: 60, expectedImpact: "تخفيض ثغرات المشاريع 60%", achievedImpact: "تطبيق على 8 مشاريع", kpis: ["نسبة المشاريع المُقيّمة"], risks: [], decisionsNeeded: [], lastUpdate: "2026-04-22" },
  { id: "p14", name: "اختبارات خطة استمرارية الأعمال الدورية", improvementId: "i16", frameworkIds: ["f6","f3"], criterionIds: [], ownerName: "م. ياسر العنزي", ownerDeptId: "d9", contributorDeptIds: ["d12","d8"], startDate: "2026-05-01", endDate: "2026-12-31", status: "معتمد", progress: 5, expectedImpact: "جاهزية شاملة للأزمات", achievedImpact: "—", kpis: ["عدد الاختبارات", "زمن التعافي"], risks: [], decisionsNeeded: [], lastUpdate: "2026-04-18" },
  { id: "p15", name: "مراجعة خريطة BSC المؤسسية", improvementId: "i20", frameworkIds: ["f1"], criterionIds: ["c4","c7"], ownerName: "د. ناصر الغامدي", ownerDeptId: "d7", contributorDeptIds: ["d1","d12"], startDate: "2026-04-20", endDate: "2026-07-15", status: "قيد التنفيذ", progress: 15, expectedImpact: "+8 نقاط في النتائج", achievedImpact: "—", kpis: ["نسبة KPIs المرتبطة", "وضوح الأهداف"], risks: [], decisionsNeeded: [], lastUpdate: "2026-04-26" },
];

// حالات عدم المطابقة
export type Nonconformity = {
  id: string;
  number: string;
  frameworkId: string;
  clause: string;
  description: string;
  classification: "جسيمة" | "بسيطة" | "ملاحظة";
  rootCause: string;
  correctiveAction: string;
  ownerDeptId: string;
  dueDate: string;
  status: "مفتوحة" | "قيد المعالجة" | "بانتظار التحقق" | "مغلقة";
  closingEvidence: string;
};

export const nonconformities: Nonconformity[] = [
  { id: "nc1", number: "NC-2026-001", frameworkId: "f3", clause: "8.5.1", description: "عدم وجود ضوابط موثقة لعملية حرجة", classification: "جسيمة", rootCause: "نقص في إجراءات التشغيل", correctiveAction: "توثيق الإجراء + تدريب المعنيين", ownerDeptId: "d12", dueDate: "2026-05-30", status: "قيد المعالجة", closingEvidence: "" },
  { id: "nc2", number: "NC-2026-002", frameworkId: "f3", clause: "9.2.2", description: "تأخر تنفيذ التدقيق الداخلي السنوي", classification: "بسيطة", rootCause: "ضغط عمل في إدارة الجودة", correctiveAction: "إعادة جدولة + تكليف مدققين إضافيين", ownerDeptId: "d1", dueDate: "2026-05-15", status: "قيد المعالجة", closingEvidence: "" },
  { id: "nc3", number: "NC-2026-003", frameworkId: "f4", clause: "6.1.2", description: "عدم اكتمال تقييم الجوانب البيئية", classification: "جسيمة", rootCause: "غياب مالك واضح", correctiveAction: "تكليف فريق + إعادة التقييم", ownerDeptId: "d12", dueDate: "2026-06-15", status: "قيد المعالجة", closingEvidence: "" },
  { id: "nc4", number: "NC-2026-004", frameworkId: "f4", clause: "8.2", description: "ضعف في خطة الاستجابة للطوارئ البيئية", classification: "بسيطة", rootCause: "خطة قديمة", correctiveAction: "تحديث الخطة + تدريب", ownerDeptId: "d8", dueDate: "2026-06-30", status: "مفتوحة", closingEvidence: "" },
  { id: "nc5", number: "NC-2026-005", frameworkId: "f5", clause: "7.2", description: "نقص في تدريب السلامة الإلزامي", classification: "جسيمة", rootCause: "ضعف الإنفاذ", correctiveAction: "حملة تدريب شاملة", ownerDeptId: "d2", dueDate: "2026-06-30", status: "قيد المعالجة", closingEvidence: "" },
  { id: "nc6", number: "NC-2026-006", frameworkId: "f5", clause: "8.1.2", description: "ضوابط غير كافية لمخاطر مهنية محددة", classification: "بسيطة", rootCause: "تقييم مخاطر غير محدّث", correctiveAction: "إعادة تقييم + ضوابط جديدة", ownerDeptId: "d8", dueDate: "2026-07-15", status: "مفتوحة", closingEvidence: "" },
  { id: "nc7", number: "NC-2026-007", frameworkId: "f6", clause: "A.5.18", description: "صلاحيات وصول غير مراجعة لـ 15% من الحسابات", classification: "جسيمة", rootCause: "غياب مراجعة دورية", correctiveAction: "أتمتة المراجعة الربع سنوية", ownerDeptId: "d9", dueDate: "2026-04-30", status: "بانتظار التحقق", closingEvidence: "تقرير الأتمتة" },
  { id: "nc8", number: "NC-2026-008", frameworkId: "f6", clause: "A.5.30", description: "خطة استمرارية لم تختبر منذ سنة", classification: "بسيطة", rootCause: "غياب جدولة", correctiveAction: "اختبار شامل ربع سنوي", ownerDeptId: "d9", dueDate: "2026-07-30", status: "قيد المعالجة", closingEvidence: "" },
  { id: "nc9", number: "NC-2026-009", frameworkId: "f6", clause: "A.6.3", description: "نسبة إكمال التوعية الأمنية 55%", classification: "ملاحظة", rootCause: "ضعف الإلزام", correctiveAction: "حملة توعية + متابعة", ownerDeptId: "d9", dueDate: "2026-08-15", status: "قيد المعالجة", closingEvidence: "" },
  { id: "nc10", number: "NC-2026-010", frameworkId: "f3", clause: "10.2", description: "تأخر إغلاق إجراءات تصحيحية سابقة", classification: "بسيطة", rootCause: "ضعف المتابعة", correctiveAction: "نظام تنبيهات تصاعدية", ownerDeptId: "d1", dueDate: "2026-06-15", status: "قيد المعالجة", closingEvidence: "" },
  { id: "nc11", number: "NC-2026-011", frameworkId: "f3", clause: "7.5", description: "ضعف في ضبط الوثائق المُتقادمة", classification: "ملاحظة", rootCause: "غياب دورة مراجعة", correctiveAction: "نظام إدارة وثائق مع تنبيهات", ownerDeptId: "d1", dueDate: "2026-07-30", status: "مفتوحة", closingEvidence: "" },
  { id: "nc12", number: "NC-2025-018", frameworkId: "f3", clause: "9.1.2", description: "ضعف قياس رضا المتعاملين الرقمي", classification: "بسيطة", rootCause: "أدوات محدودة", correctiveAction: "منصة CX رقمية", ownerDeptId: "d6", dueDate: "2026-05-30", status: "قيد المعالجة", closingEvidence: "" },
];

// تقارير تنفيذية
export type ExecutiveReport = {
  id: string;
  title: string;
  type: string;
  date: string;
  summary: string;
  topFindings: string[];
  topRisks: string[];
  topGaps: string[];
  recommendations: string[];
  decisionsNeeded: string[];
};

export const executiveReports: ExecutiveReport[] = [
  { id: "r1", title: "تقرير الجاهزية للتميز المؤسسي - الربع الأول 2026", type: "جاهزية تميز", date: "2026-04-15", summary: "تحسن النضج المؤسسي العام بنسبة 6% مقارنة بالربع السابق، مع جاهزية متوسطة للتقدم لجائزة الملك عبدالعزيز للجودة.", topFindings: ["ارتفاع نسبة الشواهد المكتملة إلى 78%", "إغلاق 14 إجراء تصحيحي", "إطلاق 4 مشاريع تحسين استراتيجية"], topRisks: ["تأخر مشروع تقييم الموردين", "ضعف خطة الاستمرارية"], topGaps: ["محاذاة الرؤية مع 2030", "قياس ثقافة التميز"], recommendations: ["تسريع مشاريع المسار الحرج", "تخصيص ميزانية لأكاديمية القيادات"], decisionsNeeded: ["اعتماد الميزانية الإضافية", "إقرار حوكمة البيانات"] },
  { id: "r2", title: "تقرير فجوات نموذج EFQM", type: "فجوات EFQM", date: "2026-03-30", summary: "أعلى الفجوات تتركز في معايير الثقافة وأصحاب العلاقة. النتائج تتقدم بشكل أفضل من الممكنات.", topFindings: ["الممكنات: 71%", "النتائج: 76%", "أعلى ممكن: خلق القيمة المستدامة"], topRisks: ["فجوة الممكنات-النتائج قد تتسع"], topGaps: ["18 فجوة موزعة على 7 معايير"], recommendations: ["برنامج تطوير ممكنات شامل"], decisionsNeeded: ["تكليف فريق EFQM متفرغ"] },
  { id: "r3", title: "تقرير جاهزية جائزة الملك عبدالعزيز للجودة", type: "جاهزية KAQA", date: "2026-03-25", summary: "الجاهزية الحالية 68% وتحتاج إلى 6 أشهر إضافية للوصول لمستوى التقدم الفعلي.", topFindings: ["الممكنات أقوى من النتائج", "العمليات والاستراتيجية في وضع جيد"], topRisks: ["نقص شواهد المجتمع"], topGaps: ["نتائج المجتمع", "الموارد البشرية"], recommendations: ["برنامج Benchmarking مع الفائزين السابقين"], decisionsNeeded: ["إعتماد التقدم 2027"] },
  { id: "r4", title: "تقرير الامتثال لمعايير ISO الأربعة", type: "امتثال ISO", date: "2026-04-10", summary: "متوسط الامتثال 79%. ISO 27001 الأعلى، ISO 45001 الأدنى ويحتاج اهتماماً عاجلاً.", topFindings: ["ISO 9001: 86%", "ISO 14001: 74%", "ISO 45001: 69%", "ISO 27001: 88%"], topRisks: ["3 حالات عدم مطابقة جسيمة مفتوحة"], topGaps: ["السلامة المهنية", "الإدارة البيئية"], recommendations: ["تسريع إغلاق NC الجسيمة"], decisionsNeeded: ["اعتماد ميزانية تأهيل ISO 45001"] },
  { id: "r5", title: "تقرير مشاريع التحسين النشطة", type: "مشاريع تحسين", date: "2026-04-26", summary: "15 مشروعاً نشطاً، 11 قيد التنفيذ، 1 متأخر، 1 مكتمل.", topFindings: ["متوسط الإنجاز 42%", "أعلى أثر: لوحة قيادة مؤسسية"], topRisks: ["مشروع تقييم الموردين متأخر 18 يوماً"], topGaps: ["نقص موارد بعض المشاريع"], recommendations: ["إعادة جدولة المشروع المتأخر"], decisionsNeeded: ["تمديد جدول p3", "تخصيص فريق إضافي"] },
  { id: "r6", title: "تقرير الشواهد ومستوى قوتها", type: "شواهد", date: "2026-04-20", summary: "40 شاهداً موثقاً، 70% قوي، 22% متوسط، 8% ضعيف أو ناقص.", topFindings: ["28 شاهد قوي", "9 يحتاج تحديث", "3 ناقص"], topRisks: ["الشواهد البيئية الأضعف"], topGaps: ["شواهد ISO 14001 الناقصة"], recommendations: ["خطة تأهيل شواهد لمدة 90 يوماً"], decisionsNeeded: [] },
  { id: "r7", title: "تقرير المخاطر التشغيلية والاستراتيجية", type: "مخاطر", date: "2026-04-18", summary: "إجمالي 47 مخاطرة فعالة، 8 منها بمستوى عالٍ، تتطلب تدخلاً إدارياً.", topFindings: ["68% من المخاطر عالية معالجة", "3 مخاطر بدون مالك واضح"], topRisks: ["مخاطر استمرارية الأعمال", "مخاطر سيبرانية للأنظمة الجديدة"], topGaps: ["لوحة مخاطر تنفيذية"], recommendations: ["بناء لوحة مخاطر تنفيذية فورية"], decisionsNeeded: ["تعيين ملاك للمخاطر بدون مالك"] },
  { id: "r8", title: "تقرير أداء الإدارات في التميز", type: "إدارات", date: "2026-04-22", summary: "أعلى الإدارات نضجاً: الأمن السيبراني، تقنية المعلومات، التخطيط. الأدنى: المشتريات والعقود.", topFindings: ["نضج الإدارات بين 65 و 84", "5 إدارات فوق 75%"], topRisks: ["تأخر المشتريات قد يؤثر على نتائج KAQA"], topGaps: ["برنامج تأهيل المشتريات"], recommendations: ["برنامج دعم متخصص للإدارات الأقل نضجاً"], decisionsNeeded: [] },
];

// Mapping بين النماذج
export type FrameworkMapping = {
  efqmCode: string;
  efqmName: string;
  kaqaCode: string;
  kaqaName: string;
  iso9001: string;
  iso14001: string;
  iso45001: string;
  iso27001: string;
  sharedEvidenceCount: number;
  relationStrength: "عالية" | "متوسطة" | "منخفضة";
};

export const frameworkMappings: FrameworkMapping[] = [
  { efqmCode: "1", efqmName: "الغرض والاستراتيجية", kaqaCode: "2", kaqaName: "الاستراتيجية", iso9001: "4.1, 5.1, 6.2", iso14001: "4.1, 6.2", iso45001: "4.1, 6.2", iso27001: "4.1, 5.2", sharedEvidenceCount: 8, relationStrength: "عالية" },
  { efqmCode: "2", efqmName: "الثقافة والقيادة", kaqaCode: "1", kaqaName: "القيادة", iso9001: "5.1, 5.2, 5.3", iso14001: "5.1, 5.2", iso45001: "5.1, 5.2", iso27001: "5.1, 5.2", sharedEvidenceCount: 6, relationStrength: "عالية" },
  { efqmCode: "3", efqmName: "إشراك أصحاب العلاقة", kaqaCode: "4,6", kaqaName: "الشراكات + المتعاملين", iso9001: "4.2, 8.2", iso14001: "4.2, 7.4", iso45001: "4.2, 5.4", iso27001: "4.2", sharedEvidenceCount: 7, relationStrength: "متوسطة" },
  { efqmCode: "4", efqmName: "خلق قيمة مستدامة", kaqaCode: "5,9", kaqaName: "العمليات + النتائج الرئيسية", iso9001: "8.1, 8.5", iso14001: "8.1", iso45001: "8.1", iso27001: "8.1", sharedEvidenceCount: 5, relationStrength: "متوسطة" },
  { efqmCode: "5", efqmName: "إدارة الأداء والتحول", kaqaCode: "9", kaqaName: "نتائج الأداء", iso9001: "9.1, 9.3, 10", iso14001: "9.1, 9.3, 10", iso45001: "9.1, 9.3, 10", iso27001: "9.1, 9.3, 10", sharedEvidenceCount: 9, relationStrength: "عالية" },
  { efqmCode: "6", efqmName: "نتائج تصورات أصحاب العلاقة", kaqaCode: "6,7,8", kaqaName: "نتائج المتعاملين والموظفين والمجتمع", iso9001: "9.1.2", iso14001: "—", iso45001: "—", iso27001: "—", sharedEvidenceCount: 4, relationStrength: "متوسطة" },
  { efqmCode: "7", efqmName: "نتائج الأداء الاستراتيجي", kaqaCode: "9", kaqaName: "نتائج الأداء الرئيسية", iso9001: "9.1.3", iso14001: "9.1.1", iso45001: "9.1.1", iso27001: "9.1", sharedEvidenceCount: 6, relationStrength: "عالية" },
];

// IMS - بنود مشتركة بين ISO
export type IMSClause = {
  clause: string;
  title: string;
  iso9001: boolean;
  iso14001: boolean;
  iso45001: boolean;
  iso27001: boolean;
  sharedEvidenceCount: number;
  ownerDeptId: string;
};

export const imsClauses: IMSClause[] = [
  { clause: "4", title: "سياق المنظمة", iso9001: true, iso14001: true, iso45001: true, iso27001: true, sharedEvidenceCount: 4, ownerDeptId: "d7" },
  { clause: "5", title: "القيادة", iso9001: true, iso14001: true, iso45001: true, iso27001: true, sharedEvidenceCount: 5, ownerDeptId: "d1" },
  { clause: "6", title: "التخطيط", iso9001: true, iso14001: true, iso45001: true, iso27001: true, sharedEvidenceCount: 6, ownerDeptId: "d7" },
  { clause: "7", title: "الدعم", iso9001: true, iso14001: true, iso45001: true, iso27001: true, sharedEvidenceCount: 7, ownerDeptId: "d2" },
  { clause: "8", title: "التشغيل", iso9001: true, iso14001: true, iso45001: true, iso27001: true, sharedEvidenceCount: 5, ownerDeptId: "d12" },
  { clause: "9", title: "تقييم الأداء", iso9001: true, iso14001: true, iso45001: true, iso27001: true, sharedEvidenceCount: 8, ownerDeptId: "d1" },
  { clause: "10", title: "التحسين", iso9001: true, iso14001: true, iso45001: true, iso27001: true, sharedEvidenceCount: 6, ownerDeptId: "d1" },
];

// مؤشرات الجاهزية الإجمالية
export const overallMetrics = {
  organizationalMaturity: 74,
  kaqaReadiness: 68,
  efqmReadiness: 74,
  isoCompliance: 79,
  evidenceCompleted: 28,
  evidencePending: 12,
  totalImprovements: improvements.length,
  totalProjects: projects.length,
  nonconformities: nonconformities.length,
  correctiveActionClosureRate: 72,
};

// اتجاه النضج عبر الزمن
export const maturityTrend = [
  { month: "أكتوبر", value: 64 },
  { month: "نوفمبر", value: 66 },
  { month: "ديسمبر", value: 68 },
  { month: "يناير", value: 70 },
  { month: "فبراير", value: 71 },
  { month: "مارس", value: 73 },
  { month: "أبريل", value: 74 },
];

// أعلى 5 فجوات أثراً
export const topGaps = [...gaps].sort((a, b) => b.impact - a.impact).slice(0, 5);
export const topImprovements = [...improvements].sort((a, b) => b.impact - a.impact).slice(0, 5);

// مصفوفة الأدوار
export type AppRoleAr =
  | "مدير النظام"
  | "مدير إدارة الجودة والتميز"
  | "مقيم داخلي"
  | "مالك معيار"
  | "مالك مشروع تحسين"
  | "قيادة تنفيذية"
  | "مدقق ISO";

export const allRoles: AppRoleAr[] = [
  "مدير النظام",
  "مدير إدارة الجودة والتميز",
  "مقيم داخلي",
  "مالك معيار",
  "مالك مشروع تحسين",
  "قيادة تنفيذية",
  "مدقق ISO",
];

// مساعدات
export const getDept = (id: string) => departments.find((d) => d.id === id);
export const getFramework = (id: string) => frameworks.find((f) => f.id === id);
export const getCriterion = (id: string) => criteria.find((c) => c.id === id);

// ألوان الحالات
export const statusColors: Record<string, string> = {
  "مفتوحة": "bg-warning/15 text-warning border-warning/30",
  "قيد المعالجة": "bg-info/15 text-info border-info/30",
  "تم تحويلها": "bg-primary/15 text-primary border-primary/30",
  "محوّلة لمشروع": "bg-primary/15 text-primary border-primary/30",
  "مغلقة": "bg-success/15 text-success border-success/30",
  "مكتمل": "bg-success/15 text-success border-success/30",
  "مغلق بعد قياس الأثر": "bg-success/15 text-success border-success/30",
  "متأخر": "bg-destructive/15 text-destructive border-destructive/30",
  "قيد التنفيذ": "bg-info/15 text-info border-info/30",
  "معتمد": "bg-accent text-accent-foreground border-gold/30",
  "معتمدة": "bg-accent text-accent-foreground border-gold/30",
  "مقترح": "bg-muted text-muted-foreground border-border",
  "مقترحة": "bg-muted text-muted-foreground border-border",
  "مرفوضة": "bg-destructive/15 text-destructive border-destructive/30",
  "مكتمل ": "bg-success/15 text-success border-success/30",
  "يحتاج تحديث": "bg-warning/15 text-warning border-warning/30",
  "ناقص": "bg-destructive/15 text-destructive border-destructive/30",
  "غير معتمد": "bg-muted text-muted-foreground border-border",
  "بانتظار التحقق": "bg-info/15 text-info border-info/30",
  "حرجة": "bg-destructive/15 text-destructive border-destructive/30",
  "عالية": "bg-warning/15 text-warning border-warning/30",
  "متوسطة": "bg-info/15 text-info border-info/30",
  "منخفضة": "bg-muted text-muted-foreground border-border",
  "جسيمة": "bg-destructive/15 text-destructive border-destructive/30",
  "بسيطة": "bg-warning/15 text-warning border-warning/30",
  "ملاحظة": "bg-info/15 text-info border-info/30",
  "قوي": "bg-success/15 text-success border-success/30",
  "متوسط": "bg-warning/15 text-warning border-warning/30",
  "ضعيف": "bg-destructive/15 text-destructive border-destructive/30",
};