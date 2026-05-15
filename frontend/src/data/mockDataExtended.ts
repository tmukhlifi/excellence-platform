// بيانات تجريبية موسّعة لمنصة التميز المؤسسي
// تشمل: المعايير الفرعية، النقاط الإرشادية، التدقيق، المستخدمين، الصلاحيات، التنبيهات، السجلات

import { departments, frameworks } from "./mockData";

// ===== المعايير الفرعية =====
export type SubCriterion = {
  id: string;
  frameworkId: string;
  parentCode: string; // كود المعيار الرئيسي
  parentName: string;
  code: string;
  name: string;
  description: string;
  weight: number;
  maxScore: number;
  ownerDeptId: string;
  contributorDeptIds: string[];
  requiredEvidences: number;
  availableEvidences: number;
  completion: number;
  lastAssessment: string;
  readiness: "عالية" | "متوسطة" | "منخفضة";
  currentScore: number;
  targetScore: number;
  maturityLevel: 1 | 2 | 3 | 4 | 5;
  notes: string;
};

const sc = (
  id: string, fwId: string, parentCode: string, parentName: string, code: string, name: string,
  desc: string, weight: number, owner: string, contribs: string[], req: number, avail: number,
  cur: number, tgt: number, ml: 1|2|3|4|5
): SubCriterion => ({
  id, frameworkId: fwId, parentCode, parentName, code, name, description: desc,
  weight, maxScore: 100, ownerDeptId: owner, contributorDeptIds: contribs,
  requiredEvidences: req, availableEvidences: avail,
  completion: Math.round((avail / req) * 100),
  lastAssessment: `2026-0${(parseInt(id.replace(/\D/g,"")) % 4) + 1}-15`,
  readiness: cur >= 75 ? "عالية" : cur >= 60 ? "متوسطة" : "منخفضة",
  currentScore: cur, targetScore: tgt, maturityLevel: ml,
  notes: "",
});

export const subCriteria: SubCriterion[] = [
  // EFQM - معيار 1
  sc("sc1","f1","1","الغرض والرؤية والاستراتيجية","1.1","تحديد الغرض والرؤية والقيم","صياغة واضحة للغرض والرؤية والقيم تعكس تطلعات الجهة وتنسجم مع رؤية 2030",35,"d7",["d1","d6"],6,5,72,85,3),
  sc("sc2","f1","1","الغرض والرؤية والاستراتيجية","1.2","تحديد ركائز النجاح الاستراتيجية","تحديد القدرات الجوهرية وعوامل النجاح الحرجة",30,"d7",["d12"],4,3,68,82,3),
  sc("sc3","f1","1","الغرض والرؤية والاستراتيجية","1.3","تطوير وتنفيذ الاستراتيجية","نشر الاستراتيجية وتحويلها إلى مبادرات ومشاريع",35,"d7",["d12","d3"],5,4,75,88,4),
  // EFQM - معيار 2
  sc("sc4","f1","2","ثقافة المؤسسة وقيادتها","2.1","رعاية ثقافة التميز والقيم","غرس قيم التميز في السلوك المؤسسي اليومي",30,"d2",["d1"],5,3,65,80,2),
  sc("sc5","f1","2","ثقافة المؤسسة وقيادتها","2.2","تمكين القيادة من خلق المستقبل","تطوير قادة قادرين على قيادة التحول",35,"d2",["d1","d7"],4,3,70,82,3),
  sc("sc6","f1","2","ثقافة المؤسسة وقيادتها","2.3","ضمان الاستجابة للتغيير","المرونة المؤسسية في التعامل مع التغيير",35,"d1",["d12"],4,2,68,80,3),
  // EFQM - معيار 3
  sc("sc7","f1","3","إشراك أصحاب العلاقة","3.1","المتعاملون والمستفيدون","فهم احتياجات المتعاملين وبناء علاقات",35,"d6",["d12"],5,4,72,85,3),
  sc("sc8","f1","3","إشراك أصحاب العلاقة","3.2","الموظفون","إشراك الموظفين وتمكينهم",30,"d2",[],4,3,68,80,3),
  sc("sc9","f1","3","إشراك أصحاب العلاقة","3.3","الشركاء والموردون والمجتمع","شراكات استراتيجية مستدامة",35,"d5",["d6"],5,4,70,82,3),
  // EFQM - معيار 4
  sc("sc10","f1","4","خلق قيمة مستدامة","4.1","تصميم القيمة وكيفية تقديمها","تصميم خدمات تعكس قيمة فعلية للمستفيدين",40,"d12",["d7"],4,3,75,85,3),
  sc("sc11","f1","4","خلق قيمة مستدامة","4.2","التواصل وبيع القيمة","ترويج القيمة وضمان فهمها",30,"d6",[],3,2,72,82,3),
  sc("sc12","f1","4","خلق قيمة مستدامة","4.3","تقديم القيمة والاستدامة","تقديم القيمة بكفاءة واستدامة",30,"d12",["d3"],4,4,78,88,4),
  // EFQM - معيار 5
  sc("sc13","f1","5","إدارة الأداء والتحول","5.1","قيادة الأداء وإدارة المخاطر","نظام شامل لإدارة الأداء والمخاطر",35,"d12",["d8"],5,4,73,85,3),
  sc("sc14","f1","5","إدارة الأداء والتحول","5.2","تحويل المؤسسة للمستقبل","قيادة برامج التحول الجوهري",30,"d1",["d7"],4,3,70,82,3),
  sc("sc15","f1","5","إدارة الأداء والتحول","5.3","قيادة الابتكار والتقنية","تبني الابتكار والتقنية كمحركات للتميز",35,"d4",[],5,3,75,85,3),
  // EFQM - معيار 6 (نتيجة)
  sc("sc16","f1","6","نتائج تصورات أصحاب العلاقة","6.1","نتائج المتعاملين","رضا وولاء المتعاملين",40,"d6",[],4,4,71,80,3),
  sc("sc17","f1","6","نتائج تصورات أصحاب العلاقة","6.2","نتائج الموظفين","رضا وارتباط الموظفين",30,"d2",[],3,3,68,78,3),
  sc("sc18","f1","6","نتائج تصورات أصحاب العلاقة","6.3","نتائج المجتمع والشركاء","الأثر المجتمعي وقوة الشراكات",30,"d6",["d5"],3,2,69,80,3),
  // EFQM - معيار 7 (نتيجة)
  sc("sc19","f1","7","نتائج الأداء الاستراتيجي والتشغيلي","7.1","تحقيق الأهداف الاستراتيجية","تحقيق المستهدفات الاستراتيجية",50,"d7",["d3"],4,4,76,85,4),
  sc("sc20","f1","7","نتائج الأداء الاستراتيجي والتشغيلي","7.2","الأداء التشغيلي والمالي","كفاءة العمليات والاستدامة المالية",50,"d3",["d12"],5,5,78,88,4),

  // KAQA - الممكنات (1-5)
  sc("sc21","f2","1","القيادة","1.1","التزام القيادة","تنمية ثقافة التميز ودعمها",30,"d1",[],4,3,72,85,3),
  sc("sc22","f2","1","القيادة","1.2","نشر القيم والمبادئ","غرس القيم في كل المستويات",35,"d1",["d2"],3,2,68,82,3),
  sc("sc23","f2","1","القيادة","1.3","التواصل القيادي","التواصل المفتوح مع كل الفئات",35,"d1",["d6"],3,3,70,82,3),
  sc("sc24","f2","2","الاستراتيجية","2.1","تطوير الاستراتيجية","صياغة استراتيجية قائمة على البيانات",50,"d7",[],4,3,73,85,3),
  sc("sc25","f2","2","الاستراتيجية","2.2","نشر الاستراتيجية","تحويل الاستراتيجية إلى مبادرات تشغيلية",50,"d7",["d12"],4,4,75,87,4),
  sc("sc26","f2","3","الموارد البشرية","3.1","تخطيط القوى العاملة","تخطيط مبني على احتياجات استراتيجية",30,"d2",[],3,2,65,80,2),
  sc("sc27","f2","3","الموارد البشرية","3.2","تطوير الكفاءات","برامج تطوير ممنهجة",40,"d2",[],4,3,68,82,3),
  sc("sc28","f2","3","الموارد البشرية","3.3","التحفيز والاحتفاظ","سياسات تحفيز فعّالة",30,"d2",[],3,2,62,78,2),
  sc("sc29","f2","4","الشراكات والموارد","4.1","إدارة الشراكات الخارجية","بناء شراكات استراتيجية",50,"d5",[],3,2,67,80,3),
  sc("sc30","f2","4","الشراكات والموارد","4.2","إدارة الموارد المالية والمعرفية","استخدام كفء للموارد",50,"d3",["d4"],4,3,69,82,3),
  sc("sc31","f2","5","العمليات والخدمات","5.1","تصميم العمليات","تصميم عمليات مبسطة",35,"d12",[],4,4,75,88,4),
  sc("sc32","f2","5","العمليات والخدمات","5.2","تنفيذ العمليات","تنفيذ منضبط بمؤشرات",35,"d12",[],4,3,76,88,4),
  sc("sc33","f2","5","العمليات والخدمات","5.3","تحسين العمليات","دورة تحسين مستمر",30,"d12",["d1"],3,2,73,86,3),

  // ISO 9001 (f3) - بنود مع متطلبات
  sc("sc34","f3","4","سياق المنظمة","4.1","فهم المنظمة وسياقها","تحديد القضايا الداخلية والخارجية",30,"d7",[],2,2,90,95,5),
  sc("sc35","f3","4","سياق المنظمة","4.2","الأطراف المعنية ومتطلباتها","تحديد الأطراف المعنية ومتطلباتها",30,"d7",[],2,2,88,95,4),
  sc("sc36","f3","4","سياق المنظمة","4.3","نطاق نظام إدارة الجودة","تحديد نطاق النظام",20,"d1",[],2,2,92,98,5),
  sc("sc37","f3","4","سياق المنظمة","4.4","نظام إدارة الجودة وعملياته","تحديد العمليات وتفاعلاتها",20,"d1",["d12"],3,2,86,95,4),
  sc("sc38","f3","6","التخطيط","6.1","المخاطر والفرص","تحديد المخاطر والفرص ومعالجتها",40,"d8",[],3,2,82,92,4),
  sc("sc39","f3","6","التخطيط","6.2","الأهداف وتخطيط تحقيقها","أهداف قابلة للقياس",30,"d7",[],3,3,87,95,4),
  sc("sc40","f3","6","التخطيط","6.3","تخطيط التغييرات","ضبط التغييرات على النظام",30,"d1",[],2,1,80,92,3),
  sc("sc41","f3","9","تقييم الأداء","9.1","المراقبة والقياس والتحليل","قياس فعّال للأداء",40,"d1",[],3,3,85,95,4),
  sc("sc42","f3","9","تقييم الأداء","9.2","التدقيق الداخلي","تدقيق دوري ممنهج",30,"d1",[],2,2,84,95,4),
  sc("sc43","f3","9","تقييم الأداء","9.3","مراجعة الإدارة","مراجعة دورية من القيادة",30,"d1",[],2,2,86,95,4),

  // KAQA - النتائج (6-9)
  sc("sc44","f2","6","نتائج المتعاملين","6.1","تصورات المتعاملين","قياس رضا وثقة المتعاملين",60,"d6",[],3,3,72,85,3),
  sc("sc45","f2","6","نتائج المتعاملين","6.2","مؤشرات أداء المتعاملين","مؤشرات داخلية لأداء الخدمة",40,"d6",[],3,3,74,86,3),
  sc("sc46","f2","7","نتائج الموارد البشرية","7.1","تصورات الموظفين","رضا وارتباط الموظفين",50,"d2",[],3,3,68,80,3),
  sc("sc47","f2","7","نتائج الموارد البشرية","7.2","مؤشرات أداء الموارد البشرية","مؤشرات داخلية كالدوران والإنتاجية",50,"d2",[],3,3,70,82,3),
  sc("sc48","f2","8","نتائج المجتمع","8.1","تصورات المجتمع","صورة الجهة لدى المجتمع",60,"d6",[],2,1,70,80,3),
  sc("sc49","f2","9","نتائج الأداء الرئيسية","9.1","النتائج الاستراتيجية","تحقيق الأهداف الاستراتيجية",60,"d7",[],4,4,76,88,4),
  sc("sc50","f2","9","نتائج الأداء الرئيسية","9.2","النتائج التشغيلية والمالية","الكفاءة التشغيلية والاستدامة",40,"d3",[],4,4,78,90,4),
];

// ===== النقاط الإرشادية / متطلبات التقييم =====
export type GuidancePoint = {
  id: string;
  subCriterionId: string;
  text: string;
  type: "منهجية" | "تطبيق" | "تقييم" | "نتيجة";
  satisfied: boolean;
};

const gp = (id: string, sub: string, text: string, type: GuidancePoint["type"], sat: boolean): GuidancePoint =>
  ({ id, subCriterionId: sub, text, type, satisfied: sat });

export const guidancePoints: GuidancePoint[] = [
  // sc1
  gp("gp1","sc1","صياغة الغرض بشكل واضح ومعتمد من القيادة","منهجية",true),
  gp("gp2","sc1","نشر الرؤية على جميع المستويات","تطبيق",true),
  gp("gp3","sc1","قياس مدى استيعاب الموظفين للرؤية","تقييم",false),
  gp("gp4","sc1","ربط الرؤية بمستهدفات رؤية المملكة 2030","منهجية",false),
  // sc2
  gp("gp5","sc2","تحليل القدرات الجوهرية للمنظمة","منهجية",true),
  gp("gp6","sc2","تحديد عوامل النجاح الحرجة بشكل موثق","منهجية",true),
  gp("gp7","sc2","تحديث القدرات الجوهرية دورياً","تقييم",false),
  // sc3
  gp("gp8","sc3","خطة استراتيجية معتمدة","منهجية",true),
  gp("gp9","sc3","تحويل الاستراتيجية إلى مبادرات تشغيلية","تطبيق",true),
  gp("gp10","sc3","نظام متابعة دوري للمبادرات","تطبيق",true),
  gp("gp11","sc3","قياس أثر المبادرات على المستهدفات","تقييم",false),
  // sc4
  gp("gp12","sc4","ميثاق قيم معتمد ومعلن","منهجية",true),
  gp("gp13","sc4","فعاليات دورية لتعزيز الثقافة","تطبيق",true),
  gp("gp14","sc4","قياس مؤشرات ثقافة التميز","تقييم",false),
  gp("gp15","sc4","ربط القيم بنظام الأداء","منهجية",false),
  // sc5
  gp("gp16","sc5","برامج تطوير قيادي ممنهجة","منهجية",true),
  gp("gp17","sc5","خطة إحلال للقيادات","منهجية",false),
  gp("gp18","sc5","تقييم 360 درجة للقيادات","تقييم",false),
  // sc6
  gp("gp19","sc6","منهجية إدارة التغيير معتمدة","منهجية",true),
  gp("gp20","sc6","تأهيل قادة التغيير","تطبيق",false),
  // sc7
  gp("gp21","sc7","خرائط رحلة المتعامل","منهجية",true),
  gp("gp22","sc7","قنوات تواصل متعددة","تطبيق",true),
  gp("gp23","sc7","قياس رضا المتعاملين دورياً","تقييم",true),
  gp("gp24","sc7","تحليل أسباب عدم الرضا والتحسين","تقييم",false),
  // sc8-sc20: نقاط إرشادية متنوعة
  gp("gp25","sc8","سياسة إشراك الموظفين","منهجية",true),
  gp("gp26","sc8","استبيانات نبض شهرية","تطبيق",false),
  gp("gp27","sc8","قنوات اقتراحات فعّالة","تطبيق",true),
  gp("gp28","sc9","سجل شركاء استراتيجي","منهجية",true),
  gp("gp29","sc9","تقييم دوري للشركاء","تقييم",true),
  gp("gp30","sc9","برنامج مسؤولية مجتمعية","تطبيق",true),
  gp("gp31","sc10","منهجية تصميم خدمات (Service Design)","منهجية",true),
  gp("gp32","sc10","اختبار خدمات مع مستخدمين فعليين","تطبيق",false),
  gp("gp33","sc11","استراتيجية تواصل مؤسسي","منهجية",true),
  gp("gp34","sc12","استدامة بيئية وموارد","تطبيق",true),
  gp("gp35","sc13","سجل مخاطر تنفيذي","منهجية",true),
  gp("gp36","sc13","لوحة قيادة المخاطر","تطبيق",false),
  gp("gp37","sc14","برنامج تحول مؤسسي","منهجية",true),
  gp("gp38","sc15","ميزانية ابتكار","تطبيق",true),
  gp("gp39","sc15","مختبر ابتكار","تطبيق",false),
  gp("gp40","sc16","نتائج رضا متعاملين بمؤشرات اتجاه","نتيجة",true),
  gp("gp41","sc16","مقارنات معيارية للنتائج","نتيجة",false),
  gp("gp42","sc17","نتائج رضا الموظفين","نتيجة",true),
  gp("gp43","sc18","نتائج أثر مجتمعي","نتيجة",false),
  gp("gp44","sc19","تحقيق المستهدفات الاستراتيجية","نتيجة",true),
  gp("gp45","sc20","نتائج مالية وتشغيلية إيجابية","نتيجة",true),
  // KAQA
  gp("gp46","sc21","ميثاق قيادي معتمد","منهجية",true),
  gp("gp47","sc21","تواصل قيادي دوري مع الموظفين","تطبيق",true),
  gp("gp48","sc22","نشر القيم في برامج التهيئة","تطبيق",true),
  gp("gp49","sc23","قنوات تواصل قيادي مفتوحة","تطبيق",true),
  gp("gp50","sc24","تحليل سياق ومنهجية تخطيط","منهجية",true),
  gp("gp51","sc25","KPIs مرتبطة بالاستراتيجية","تطبيق",true),
  gp("gp52","sc26","خطة قوى عاملة سنوية","منهجية",true),
  gp("gp53","sc27","خطة تطوير فردية لكل موظف","تطبيق",false),
  gp("gp54","sc28","نظام مكافآت وحوافز","منهجية",true),
  gp("gp55","sc29","سجل شركاء وتقييم سنوي","منهجية",true),
  gp("gp56","sc30","سياسة استدامة موارد","منهجية",true),
  gp("gp57","sc31","مخططات عمليات (BPM)","منهجية",true),
  gp("gp58","sc32","مؤشرات أداء العمليات","تطبيق",true),
  gp("gp59","sc33","حلقات تحسين مستمر","تطبيق",false),
  gp("gp60","sc44","استبيانات رضا متعاملين","نتيجة",true),
  gp("gp61","sc46","استبيانات رضا موظفين","نتيجة",true),
  gp("gp62","sc48","قياس صورة المؤسسة","نتيجة",false),
  gp("gp63","sc49","تحقيق المستهدفات","نتيجة",true),
  gp("gp64","sc50","الاستدامة المالية","نتيجة",true),
  // ISO 9001
  gp("gp65","sc34","تحليل SWOT/PESTLE موثق","منهجية",true),
  gp("gp66","sc34","مراجعة سنوية للسياق","تقييم",true),
  gp("gp67","sc35","سجل أطراف معنية ومتطلباتهم","منهجية",true),
  gp("gp68","sc36","وثيقة نطاق معتمدة","منهجية",true),
  gp("gp69","sc37","خرائط عمليات شاملة","منهجية",true),
  gp("gp70","sc37","ربط العمليات بالمالك والمؤشرات","تطبيق",false),
  gp("gp71","sc38","سجل مخاطر وفرص","منهجية",true),
  gp("gp72","sc38","خطة معالجة مخاطر","تطبيق",false),
  gp("gp73","sc39","أهداف SMART موثقة","منهجية",true),
  gp("gp74","sc40","إجراء ضبط التغييرات","منهجية",true),
  gp("gp75","sc41","تقارير دورية للمؤشرات","تطبيق",true),
  gp("gp76","sc42","خطة تدقيق سنوية معتمدة","منهجية",true),
  gp("gp77","sc42","قائمة مدققين مؤهلين","تطبيق",true),
  gp("gp78","sc43","محضر مراجعة الإدارة","منهجية",true),
  gp("gp79","sc43","قرارات مراجعة الإدارة موثقة","تطبيق",true),
  gp("gp80","sc43","متابعة قرارات مراجعة الإدارة","تقييم",false),
];

// ===== خطط التدقيق السنوية =====
export type AuditPlan = {
  id: string;
  number: string;
  year: number;
  scope: string;
  isoFrameworkId: string;
  departmentIds: string[];
  processes: string[];
  leadAuditor: string;
  auditors: string[];
  plannedDate: string;
  status: "مخطط" | "قيد التنفيذ" | "مكتمل" | "متأخر" | "مغلق";
  riskLevel: "عالٍ" | "متوسط" | "منخفض";
  priority: "عالية" | "متوسطة" | "منخفضة";
  notes: string;
};

export const auditPlans: AuditPlan[] = [
  { id: "ap1", number: "AP-2026-001", year: 2026, scope: "نظام إدارة الجودة - عمليات الخدمات", isoFrameworkId: "f3", departmentIds: ["d12","d6"], processes: ["تقديم الخدمة","معالجة الشكاوى"], leadAuditor: "أ. سلطان العتيبي", auditors: ["م. ياسر العنزي","أ. ريم الشهري"], plannedDate: "2026-05-15", status: "مخطط", riskLevel: "متوسط", priority: "عالية", notes: "تركيز على البنود 8 و 9" },
  { id: "ap2", number: "AP-2026-002", year: 2026, scope: "نظام أمن المعلومات - الوصول والتشفير", isoFrameworkId: "f6", departmentIds: ["d4","d9"], processes: ["إدارة الصلاحيات","النسخ الاحتياطي"], leadAuditor: "م. ياسر العنزي", auditors: ["م. فهد القحطاني"], plannedDate: "2026-05-28", status: "قيد التنفيذ", riskLevel: "عالٍ", priority: "عالية", notes: "إغلاق NC سابقة" },
  { id: "ap3", number: "AP-2026-003", year: 2026, scope: "نظام السلامة المهنية - المواقع التشغيلية", isoFrameworkId: "f5", departmentIds: ["d8","d2"], processes: ["تقييم المخاطر","تدريب السلامة"], leadAuditor: "أ. هند المطيري", auditors: ["أ. منى الزهراني"], plannedDate: "2026-06-10", status: "مخطط", riskLevel: "عالٍ", priority: "عالية", notes: "" },
  { id: "ap4", number: "AP-2026-004", year: 2026, scope: "نظام الإدارة البيئية - الجوانب البيئية", isoFrameworkId: "f4", departmentIds: ["d12","d8"], processes: ["تقييم الجوانب","الاستجابة للطوارئ"], leadAuditor: "م. تركي العمري", auditors: ["أ. هند المطيري"], plannedDate: "2026-06-25", status: "مخطط", riskLevel: "متوسط", priority: "متوسطة", notes: "" },
  { id: "ap5", number: "AP-2026-005", year: 2026, scope: "نظام إدارة الجودة - المشتريات", isoFrameworkId: "f3", departmentIds: ["d5","d3"], processes: ["تأهيل الموردين","العقود"], leadAuditor: "أ. سلطان العتيبي", auditors: ["أ. عبدالله الحربي"], plannedDate: "2026-07-15", status: "مخطط", riskLevel: "متوسط", priority: "متوسطة", notes: "" },
  { id: "ap6", number: "AP-2026-006", year: 2026, scope: "نظام أمن المعلومات - استمرارية الأعمال", isoFrameworkId: "f6", departmentIds: ["d9","d4"], processes: ["BCP","DR"], leadAuditor: "م. ياسر العنزي", auditors: ["م. لمى البقمي"], plannedDate: "2026-08-05", status: "مخطط", riskLevel: "عالٍ", priority: "عالية", notes: "" },
  { id: "ap7", number: "AP-2026-007", year: 2026, scope: "نظام إدارة الجودة - الموارد البشرية", isoFrameworkId: "f3", departmentIds: ["d2"], processes: ["التوظيف","التدريب"], leadAuditor: "أ. سلطان العتيبي", auditors: ["أ. منى الزهراني"], plannedDate: "2026-09-15", status: "مخطط", riskLevel: "منخفض", priority: "متوسطة", notes: "" },
  { id: "ap8", number: "AP-2026-008", year: 2026, scope: "تكامل ISO - مراجعة الإدارة", isoFrameworkId: "f3", departmentIds: ["d1","d7"], processes: ["مراجعة الإدارة","التحسين"], leadAuditor: "أ. سلطان العتيبي", auditors: ["م. ياسر العنزي","أ. هند المطيري"], plannedDate: "2026-11-10", status: "مخطط", riskLevel: "متوسط", priority: "عالية", notes: "تدقيق مشترك للأنظمة الأربعة" },
];

// ===== عمليات التدقيق =====
export type AuditEngagement = {
  id: string;
  planId: string;
  name: string;
  isoFrameworkId: string;
  mainClause: string;
  subClause: string;
  auditedDeptId: string;
  startDate: string;
  endDate: string;
  leadAuditor: string;
  representative: string;
  status: "مخطط" | "قيد التنفيذ" | "مكتمل" | "متأخر" | "مغلق";
  progress: number;
  ncCount: number;
  observationCount: number;
};

export const auditEngagements: AuditEngagement[] = [
  { id: "ae1", planId: "ap1", name: "تدقيق عمليات تقديم الخدمة", isoFrameworkId: "f3", mainClause: "8", subClause: "8.5", auditedDeptId: "d12", startDate: "2026-05-15", endDate: "2026-05-17", leadAuditor: "أ. سلطان العتيبي", representative: "م. تركي العمري", status: "مخطط", progress: 0, ncCount: 0, observationCount: 0 },
  { id: "ae2", planId: "ap1", name: "تدقيق معالجة الشكاوى", isoFrameworkId: "f3", mainClause: "9", subClause: "9.1.2", auditedDeptId: "d6", startDate: "2026-05-18", endDate: "2026-05-19", leadAuditor: "أ. ريم الشهري", representative: "أ. ريم الشهري", status: "مخطط", progress: 0, ncCount: 0, observationCount: 0 },
  { id: "ae3", planId: "ap2", name: "تدقيق إدارة الصلاحيات", isoFrameworkId: "f6", mainClause: "A.5", subClause: "A.5.18", auditedDeptId: "d9", startDate: "2026-05-28", endDate: "2026-05-30", leadAuditor: "م. ياسر العنزي", representative: "م. ياسر العنزي", status: "قيد التنفيذ", progress: 65, ncCount: 1, observationCount: 3 },
  { id: "ae4", planId: "ap2", name: "تدقيق التشفير والنسخ الاحتياطي", isoFrameworkId: "f6", mainClause: "A.8", subClause: "A.8.24", auditedDeptId: "d4", startDate: "2026-06-01", endDate: "2026-06-03", leadAuditor: "م. ياسر العنزي", representative: "م. فهد القحطاني", status: "مخطط", progress: 0, ncCount: 0, observationCount: 0 },
  { id: "ae5", planId: "ap3", name: "تدقيق تقييم المخاطر المهنية", isoFrameworkId: "f5", mainClause: "6", subClause: "6.1.2", auditedDeptId: "d8", startDate: "2026-06-10", endDate: "2026-06-12", leadAuditor: "أ. هند المطيري", representative: "أ. هند المطيري", status: "مخطط", progress: 0, ncCount: 0, observationCount: 0 },
  { id: "ae6", planId: "ap3", name: "تدقيق برامج تدريب السلامة", isoFrameworkId: "f5", mainClause: "7", subClause: "7.2", auditedDeptId: "d2", startDate: "2026-06-13", endDate: "2026-06-14", leadAuditor: "أ. منى الزهراني", representative: "أ. منى الزهراني", status: "مخطط", progress: 0, ncCount: 0, observationCount: 0 },
  { id: "ae7", planId: "ap4", name: "تدقيق تقييم الجوانب البيئية", isoFrameworkId: "f4", mainClause: "6", subClause: "6.1.2", auditedDeptId: "d12", startDate: "2026-06-25", endDate: "2026-06-27", leadAuditor: "م. تركي العمري", representative: "م. تركي العمري", status: "مخطط", progress: 0, ncCount: 0, observationCount: 0 },
  { id: "ae8", planId: "ap5", name: "تدقيق تأهيل الموردين", isoFrameworkId: "f3", mainClause: "8", subClause: "8.4", auditedDeptId: "d5", startDate: "2026-07-15", endDate: "2026-07-17", leadAuditor: "أ. سلطان العتيبي", representative: "أ. عبدالله الحربي", status: "مخطط", progress: 0, ncCount: 0, observationCount: 0 },
  { id: "ae9", planId: "ap6", name: "تدقيق خطة استمرارية الأعمال", isoFrameworkId: "f6", mainClause: "A.5", subClause: "A.5.30", auditedDeptId: "d9", startDate: "2026-08-05", endDate: "2026-08-07", leadAuditor: "م. ياسر العنزي", representative: "م. ياسر العنزي", status: "مخطط", progress: 0, ncCount: 0, observationCount: 0 },
  { id: "ae10", planId: "ap7", name: "تدقيق التوظيف والتدريب", isoFrameworkId: "f3", mainClause: "7", subClause: "7.2", auditedDeptId: "d2", startDate: "2026-09-15", endDate: "2026-09-17", leadAuditor: "أ. سلطان العتيبي", representative: "أ. منى الزهراني", status: "مخطط", progress: 0, ncCount: 0, observationCount: 0 },
  { id: "ae11", planId: "ap8", name: "تدقيق مراجعة الإدارة المتكاملة", isoFrameworkId: "f3", mainClause: "9", subClause: "9.3", auditedDeptId: "d1", startDate: "2026-11-10", endDate: "2026-11-12", leadAuditor: "أ. سلطان العتيبي", representative: "أ. سلطان العتيبي", status: "مخطط", progress: 0, ncCount: 0, observationCount: 0 },
  { id: "ae12", planId: "ap8", name: "تدقيق التحسين المستمر للأنظمة", isoFrameworkId: "f3", mainClause: "10", subClause: "10.2", auditedDeptId: "d1", startDate: "2026-11-13", endDate: "2026-11-14", leadAuditor: "م. ياسر العنزي", representative: "أ. سلطان العتيبي", status: "مخطط", progress: 0, ncCount: 0, observationCount: 0 },
];

// ===== قوائم التحقق =====
export type ChecklistItem = {
  id: string;
  isoFrameworkId: string;
  mainClause: string;
  subClause: string;
  question: string;
  type: "نعم/لا" | "وصفي" | "تقييم";
  requiredEvidence: string;
  result: "مطابق" | "مطابق جزئياً" | "غير مطابق" | "لا ينطبق" | "—";
  notes: string;
  riskLevel: "عالٍ" | "متوسط" | "منخفض";
  hasNC: boolean;
  hasOpportunity: boolean;
  ownerDeptId: string;
  dueDate: string;
};

const ck = (id: string, fw: string, mc: string, sc: string, q: string, ev: string, owner: string, result: ChecklistItem["result"] = "—", nc = false): ChecklistItem => ({
  id, isoFrameworkId: fw, mainClause: mc, subClause: sc, question: q, type: "نعم/لا",
  requiredEvidence: ev, result, notes: "", riskLevel: nc ? "عالٍ" : "متوسط", hasNC: nc,
  hasOpportunity: result === "مطابق جزئياً", ownerDeptId: owner, dueDate: "2026-06-30",
});

export const checklistItems: ChecklistItem[] = [
  // ISO 9001
  ck("cli1","f3","4","4.1","هل تم تحديد سياق المنظمة والأطراف المعنية ذات العلاقة؟","تحليل السياق + سجل الأطراف","d7","مطابق"),
  ck("cli2","f3","4","4.2","هل تم تحديد متطلبات الأطراف المعنية؟","سجل المتطلبات","d7","مطابق"),
  ck("cli3","f3","4","4.3","هل نطاق نظام الجودة محدد وموثق؟","وثيقة النطاق","d1","مطابق"),
  ck("cli4","f3","4","4.4","هل تم تحديد العمليات وتفاعلاتها؟","خرائط العمليات","d12","مطابق جزئياً"),
  ck("cli5","f3","5","5.1","هل توجد سياسة معتمدة ومعلنة لنظام الإدارة؟","السياسة المعتمدة","d1","مطابق"),
  ck("cli6","f3","5","5.2","هل تلتزم القيادة بنظام إدارة الجودة؟","محاضر مراجعة الإدارة","d1","مطابق"),
  ck("cli7","f3","5","5.3","هل تم تحديد المسؤوليات والصلاحيات؟","الهيكل التنظيمي + الوصف الوظيفي","d2","مطابق"),
  ck("cli8","f3","6","6.1","هل تم تحديد المخاطر والفرص المرتبطة بالبند؟","سجل المخاطر","d8","مطابق جزئياً"),
  ck("cli9","f3","6","6.2","هل توجد أهداف جودة قابلة للقياس؟","سجل الأهداف","d7","مطابق"),
  ck("cli10","f3","7","7.1","هل تتوفر الموارد اللازمة؟","تقرير الموارد","d3","مطابق"),
  ck("cli11","f3","7","7.2","هل الكفاءات محددة وموثقة؟","سجل الكفاءات","d2","مطابق جزئياً"),
  ck("cli12","f3","7","7.5","هل توجد ضوابط للمعلومات الموثقة؟","إجراء ضبط الوثائق","d1","مطابق جزئياً"),
  ck("cli13","f3","8","8.1","هل يتم تخطيط وضبط العمليات؟","خطط العمليات","d12","مطابق"),
  ck("cli14","f3","8","8.2","هل يتم تحديد متطلبات الخدمة بدقة؟","عقود الخدمة","d6","مطابق"),
  ck("cli15","f3","8","8.4","هل يتم ضبط العمليات الموردة من الخارج؟","تأهيل الموردين","d5","غير مطابق",true),
  ck("cli16","f3","8","8.5","هل توجد ضوابط لتقديم الخدمة؟","إجراءات تقديم الخدمة","d12","غير مطابق",true),
  ck("cli17","f3","9","9.1","هل توجد مؤشرات أداء لقياس فاعلية العملية؟","لوحة المؤشرات","d1","مطابق"),
  ck("cli18","f3","9","9.1.2","هل يتم قياس رضا المتعاملين؟","تقارير الرضا","d6","مطابق جزئياً"),
  ck("cli19","f3","9","9.2","هل توجد سجلات تثبت تنفيذ التدقيق الداخلي؟","تقارير التدقيق","d1","مطابق جزئياً"),
  ck("cli20","f3","9","9.3","هل تم تنفيذ مراجعة الإدارة؟","محضر المراجعة","d1","مطابق"),
  ck("cli21","f3","10","10.1","هل تتم متابعة فرص التحسين؟","سجل التحسين","d1","مطابق"),
  ck("cli22","f3","10","10.2","هل تم معالجة حالات عدم المطابقة السابقة؟","سجل CAPA","d1","مطابق جزئياً"),
  ck("cli23","f3","10","10.3","هل تم تقييم فاعلية الإجراءات التصحيحية؟","تقييم الفاعلية","d1","غير مطابق",true),
  // ISO 14001
  ck("cli24","f4","4","4.1","هل تم تحديد سياق بيئي؟","تحليل السياق البيئي","d12","مطابق"),
  ck("cli25","f4","6","6.1.2","هل تم تقييم الجوانب البيئية الهامة؟","سجل الجوانب البيئية","d12","غير مطابق",true),
  ck("cli26","f4","6","6.1.3","هل تم تحديد الالتزامات التشريعية البيئية؟","سجل المتطلبات","d10","مطابق جزئياً"),
  ck("cli27","f4","7","7.4","هل توجد منظومة تواصل بيئي؟","خطة التواصل","d6","مطابق"),
  ck("cli28","f4","8","8.1","هل تتم ضوابط تشغيلية بيئية؟","الإجراءات التشغيلية","d12","مطابق"),
  ck("cli29","f4","8","8.2","هل توجد خطة استجابة للطوارئ البيئية؟","خطة الطوارئ","d8","مطابق جزئياً"),
  ck("cli30","f4","9","9.1.1","هل يتم قياس الأداء البيئي؟","مؤشرات بيئية","d12","مطابق"),
  ck("cli31","f4","10","10.2","هل تم معالجة حالات عدم المطابقة البيئية؟","سجل CAPA البيئي","d12","مطابق جزئياً"),
  // ISO 45001
  ck("cli32","f5","4","4.2","هل تم تحديد العمال والأطراف المعنية بالسلامة؟","سجل الأطراف","d2","مطابق"),
  ck("cli33","f5","5","5.4","هل توجد آليات تشاور ومشاركة العاملين؟","لجان السلامة","d2","مطابق"),
  ck("cli34","f5","6","6.1.2","هل تم تقييم مخاطر السلامة المهنية؟","سجل المخاطر المهنية","d8","مطابق جزئياً"),
  ck("cli35","f5","7","7.2","هل توجد كفاءات موثقة للسلامة؟","سجل التدريب","d2","غير مطابق",true),
  ck("cli36","f5","8","8.1.2","هل توجد ضوابط لإزالة وتقليل المخاطر؟","ضوابط هرمية","d8","مطابق جزئياً"),
  ck("cli37","f5","8","8.2","هل توجد خطة استعداد للطوارئ؟","خطة الطوارئ","d8","مطابق"),
  ck("cli38","f5","9","9.1.1","هل يتم قياس أداء السلامة؟","تقارير KPIs","d2","مطابق"),
  ck("cli39","f5","10","10.2","هل تتم معالجة الحوادث وعدم المطابقة؟","سجل الحوادث","d2","مطابق جزئياً"),
  // ISO 27001
  ck("cli40","f6","4","4.3","هل نطاق ISMS محدد وموثق؟","وثيقة النطاق","d9","مطابق"),
  ck("cli41","f6","5","5.2","هل توجد سياسة أمن معلومات معتمدة؟","سياسة ISMS","d9","مطابق"),
  ck("cli42","f6","6","6.1.2","هل تم تقييم مخاطر أمن المعلومات؟","سجل المخاطر","d9","مطابق"),
  ck("cli43","f6","6","6.1.3","هل توجد خطة معالجة مخاطر معتمدة؟","RTP + SoA","d9","مطابق"),
  ck("cli44","f6","A.5","A.5.18","هل تتم مراجعة دورية لصلاحيات الوصول؟","تقارير المراجعة","d9","غير مطابق",true),
  ck("cli45","f6","A.5","A.5.30","هل تم اختبار خطة استمرارية الأعمال؟","تقرير الاختبار","d9","مطابق جزئياً"),
  ck("cli46","f6","A.6","A.6.3","هل توجد حملات توعية أمنية؟","سجل التوعية","d9","مطابق جزئياً"),
  ck("cli47","f6","A.8","A.8.7","هل توجد حماية من البرمجيات الضارة؟","تقارير الحماية","d9","مطابق"),
  ck("cli48","f6","A.8","A.8.13","هل توجد إجراءات نسخ احتياطي؟","سجل النسخ","d4","مطابق"),
  ck("cli49","f6","A.8","A.8.24","هل تم تطبيق ضوابط التشفير؟","سياسة التشفير","d9","مطابق"),
  ck("cli50","f6","9","9.2","هل يتم تنفيذ تدقيق ISMS الداخلي؟","تقارير التدقيق","d9","مطابق"),
];

// إكمال 80 بنداً (نضيف 30 إضافياً متنوعاً)
for (let i = 51; i <= 80; i++) {
  const fw = ["f3","f4","f5","f6"][i % 4];
  const owner = ["d1","d12","d2","d9"][i % 4];
  const clauses: Record<string,[string,string]> = { f3:["7","7.4"], f4:["7","7.5"], f5:["7","7.4"], f6:["A.5","A.5.7"] };
  const [mc, sub] = clauses[fw];
  checklistItems.push(ck(`cli${i}`, fw, mc, sub, `هل توجد سجلات إضافية للتحقق رقم ${i - 50} في النظام؟`, "السجلات والوثائق", owner, ["مطابق","مطابق جزئياً","لا ينطبق"][i % 3] as any));
}

// ===== الإجراءات التصحيحية =====
export type CorrectiveAction = {
  id: string;
  ncId: string;
  number: string;
  description: string;
  preventiveAction: string;
  ownerName: string;
  ownerDeptId: string;
  dueDate: string;
  status: "مفتوحة" | "قيد التنفيذ" | "بانتظار التحقق" | "مغلقة" | "متأخرة";
  closingEvidence: string;
  effectiveness: "فعّال" | "غير فعّال" | "بانتظار التقييم";
  closeDate: string;
  fiveWhys: string[];
};

export const correctiveActions: CorrectiveAction[] = Array.from({length: 30}).map((_, i) => {
  const ncId = `nc${(i % 12) + 1}`;
  const statuses: CorrectiveAction["status"][] = ["مفتوحة","قيد التنفيذ","بانتظار التحقق","مغلقة","متأخرة"];
  const owners = ["د. عبدالرحمن السهلي","أ. سلطان العتيبي","م. ياسر العنزي","أ. منى الزهراني","م. تركي العمري"];
  const depts = ["d1","d2","d9","d12","d8"];
  return {
    id: `ca${i+1}`,
    ncId,
    number: `CA-2026-${String(i+1).padStart(3,"0")}`,
    description: `إجراء تصحيحي لمعالجة عدم المطابقة ${ncId}`,
    preventiveAction: i % 3 === 0 ? "مراجعة دورية ربع سنوية للوقاية من التكرار" : "",
    ownerName: owners[i % 5],
    ownerDeptId: depts[i % 5],
    dueDate: `2026-0${((i % 6) + 5)}-${String(((i*7) % 27) + 1).padStart(2,"0")}`,
    status: statuses[i % 5],
    closingEvidence: i % 5 === 3 ? "تقرير الإغلاق + شواهد التحقق" : "",
    effectiveness: i % 5 === 3 ? "فعّال" : "بانتظار التقييم",
    closeDate: i % 5 === 3 ? `2026-04-${String((i % 27)+1).padStart(2,"0")}` : "",
    fiveWhys: [
      "لماذا حدثت المشكلة؟ — ضعف في إجراء داخلي",
      "لماذا ضعف الإجراء؟ — لم يتم تحديثه منذ سنتين",
      "لماذا لم يحدث التحديث؟ — غياب دورة مراجعة دورية",
      "لماذا لا توجد دورة مراجعة؟ — لم تُسند المسؤولية",
      "لماذا لم تُسند؟ — قصور في حوكمة الوثائق",
    ],
  };
});

// ===== المستخدمون =====
export type Permission = "عرض" | "إضافة" | "تعديل" | "حذف" | "اعتماد" | "تصدير" | "إسناد" | "إغلاق";
export const allPermissions: Permission[] = ["عرض","إضافة","تعديل","حذف","اعتماد","تصدير","إسناد","إغلاق"];

export type ExtendedRole =
  | "مدير النظام" | "مدير إدارة الجودة والتميز" | "مقيم داخلي" | "مدقق ISO"
  | "قائد فريق تدقيق" | "مالك معيار" | "مالك شاهد" | "مالك مشروع تحسين"
  | "قائد تنفيذي" | "مستخدم للاطلاع فقط";

export const extendedRoles: ExtendedRole[] = [
  "مدير النظام","مدير إدارة الجودة والتميز","مقيم داخلي","مدقق ISO",
  "قائد فريق تدقيق","مالك معيار","مالك شاهد","مالك مشروع تحسين",
  "قائد تنفيذي","مستخدم للاطلاع فقط",
];

export type ExtUser = {
  id: string;
  name: string;
  email: string;
  deptId: string;
  position: string;
  role: ExtendedRole;
  status: "نشط" | "موقوف" | "بانتظار التفعيل";
  lastLogin: string;
  assignedTasks: number;
  assignedEvidences: number;
  overdueActions: number;
};

export const extUsers: ExtUser[] = [
  { id: "u1", name: "د. عبدالرحمن السهلي", email: "a.alsahli@gov.sa", deptId: "d1", position: "مدير عام التميز", role: "مدير النظام", status: "نشط", lastLogin: "2026-04-26 09:12", assignedTasks: 12, assignedEvidences: 8, overdueActions: 1 },
  { id: "u2", name: "أ. سلطان العتيبي", email: "s.alotaibi@gov.sa", deptId: "d1", position: "مدير الجودة", role: "مدير إدارة الجودة والتميز", status: "نشط", lastLogin: "2026-04-26 08:30", assignedTasks: 24, assignedEvidences: 18, overdueActions: 3 },
  { id: "u3", name: "د. ناصر الغامدي", email: "n.alghamdi@gov.sa", deptId: "d7", position: "مدير التخطيط", role: "مالك معيار", status: "نشط", lastLogin: "2026-04-25 14:20", assignedTasks: 9, assignedEvidences: 14, overdueActions: 0 },
  { id: "u4", name: "م. ياسر العنزي", email: "y.alanzi@gov.sa", deptId: "d9", position: "مدير الأمن السيبراني", role: "قائد فريق تدقيق", status: "نشط", lastLogin: "2026-04-26 10:45", assignedTasks: 18, assignedEvidences: 22, overdueActions: 2 },
  { id: "u5", name: "أ. منى الزهراني", email: "m.alzahrani@gov.sa", deptId: "d2", position: "مدير الموارد البشرية", role: "مالك مشروع تحسين", status: "نشط", lastLogin: "2026-04-26 07:55", assignedTasks: 15, assignedEvidences: 11, overdueActions: 1 },
  { id: "u6", name: "أ. ريم الشهري", email: "r.alshehri@gov.sa", deptId: "d6", position: "مدير التواصل", role: "مقيم داخلي", status: "نشط", lastLogin: "2026-04-25 11:10", assignedTasks: 8, assignedEvidences: 6, overdueActions: 0 },
  { id: "u7", name: "أ. خالد الدوسري", email: "k.aldosari@gov.sa", deptId: "d3", position: "مدير المالية", role: "مالك شاهد", status: "نشط", lastLogin: "2026-04-24 16:30", assignedTasks: 6, assignedEvidences: 12, overdueActions: 1 },
  { id: "u8", name: "م. فهد القحطاني", email: "f.alqahtani@gov.sa", deptId: "d4", position: "مدير تقنية المعلومات", role: "مالك معيار", status: "نشط", lastLogin: "2026-04-26 11:25", assignedTasks: 14, assignedEvidences: 16, overdueActions: 0 },
  { id: "u9", name: "أ. عبدالله الحربي", email: "a.alharbi@gov.sa", deptId: "d5", position: "مدير المشتريات", role: "مالك معيار", status: "نشط", lastLogin: "2026-04-23 13:15", assignedTasks: 7, assignedEvidences: 9, overdueActions: 2 },
  { id: "u10", name: "أ. هند المطيري", email: "h.almutairi@gov.sa", deptId: "d8", position: "مدير المخاطر", role: "مدقق ISO", status: "نشط", lastLogin: "2026-04-26 09:00", assignedTasks: 11, assignedEvidences: 8, overdueActions: 1 },
  { id: "u11", name: "م. تركي العمري", email: "t.alamri@gov.sa", deptId: "d12", position: "مدير المشاريع", role: "مالك مشروع تحسين", status: "نشط", lastLogin: "2026-04-26 12:00", assignedTasks: 22, assignedEvidences: 13, overdueActions: 4 },
  { id: "u12", name: "م. لمى البقمي", email: "l.albagmi@gov.sa", deptId: "d11", position: "مدير البيانات", role: "مالك شاهد", status: "نشط", lastLogin: "2026-04-25 10:30", assignedTasks: 5, assignedEvidences: 7, overdueActions: 0 },
  { id: "u13", name: "أ. بدر السبيعي", email: "b.alsubaei@gov.sa", deptId: "d10", position: "مدير الشؤون القانونية", role: "مستخدم للاطلاع فقط", status: "نشط", lastLogin: "2026-04-22 15:00", assignedTasks: 2, assignedEvidences: 3, overdueActions: 0 },
  { id: "u14", name: "د. سامي القرني", email: "s.alqarni@gov.sa", deptId: "d1", position: "مستشار التميز", role: "قائد تنفيذي", status: "نشط", lastLogin: "2026-04-26 08:15", assignedTasks: 4, assignedEvidences: 2, overdueActions: 0 },
  { id: "u15", name: "أ. أمل الدوسري", email: "a.dosari@gov.sa", deptId: "d6", position: "مسؤول جودة", role: "مستخدم للاطلاع فقط", status: "بانتظار التفعيل", lastLogin: "—", assignedTasks: 0, assignedEvidences: 0, overdueActions: 0 },
];

// ===== مصفوفة الصلاحيات =====
export const matrixModules = [
  "لوحة القيادة","نماذج التقييم","التقييم الذاتي","المعايير الفرعية",
  "الشواهد","الفجوات","فرص التحسين","مشاريع التحسين",
  "برنامج التدقيق ISO","قوائم التحقق","عدم المطابقة","الإجراءات التصحيحية",
  "التقارير","المستخدمون والصلاحيات","الإعدادات",
];

// كل دور → قائمة افتراضية من الصلاحيات لكل وحدة
export const defaultPermissionsByRole: Record<ExtendedRole, Record<string, Permission[]>> = (() => {
  const all: Permission[] = [...allPermissions];
  const view: Permission[] = ["عرض"];
  const viewExp: Permission[] = ["عرض","تصدير"];
  const editor: Permission[] = ["عرض","إضافة","تعديل","تصدير"];
  const owner: Permission[] = ["عرض","إضافة","تعديل","إسناد","تصدير"];
  const approver: Permission[] = ["عرض","إضافة","تعديل","اعتماد","إسناد","تصدير","إغلاق"];
  const result: Record<ExtendedRole, Record<string, Permission[]>> = {} as any;
  for (const r of extendedRoles) {
    result[r] = {};
    for (const m of matrixModules) {
      let perms: Permission[];
      if (r === "مدير النظام") perms = all;
      else if (r === "مدير إدارة الجودة والتميز") perms = approver;
      else if (r === "قائد تنفيذي") perms = viewExp;
      else if (r === "مستخدم للاطلاع فقط") perms = view;
      else if (r === "مدقق ISO" || r === "قائد فريق تدقيق") {
        perms = ["برنامج التدقيق ISO","قوائم التحقق","عدم المطابقة","الإجراءات التصحيحية","التقارير"].includes(m) ? approver : view;
      } else if (r === "مالك معيار" || r === "مالك مشروع تحسين" || r === "مالك شاهد") {
        perms = owner;
      } else perms = editor;
      result[r][m] = perms;
    }
  }
  return result;
})();

// ===== التنبيهات والمهام =====
export type Notification = {
  id: string;
  title: string;
  description: string;
  type: "شاهد" | "تقييم" | "فرصة" | "مشروع" | "إجراء" | "تدقيق" | "عدم مطابقة" | "اعتماد";
  priority: "حرجة" | "عالية" | "متوسطة" | "منخفضة";
  ownerUserId: string;
  dueDate: string;
  status: "جديد" | "مفتوح" | "قيد التنفيذ" | "مغلق";
  link: string;
};

export const notifications: Notification[] = [
  { id: "n1", title: "شاهد بحاجة لمراجعة عاجلة", description: "السياسة العامة لإدارة الجودة - مر عليها 90 يوماً بدون تحديث", type: "شاهد", priority: "عالية", ownerUserId: "u2", dueDate: "2026-05-05", status: "جديد", link: "/evidences" },
  { id: "n2", title: "تقييم بانتظار الاعتماد", description: "تقييم EFQM للربع الأول جاهز للاعتماد التنفيذي", type: "اعتماد", priority: "عالية", ownerUserId: "u14", dueDate: "2026-05-02", status: "مفتوح", link: "/self-assessment" },
  { id: "n3", title: "فرصة تحسين لم تُحوَّل لمشروع", description: "إطار قياس الأثر المجتمعي مقترحة منذ 45 يوماً", type: "فرصة", priority: "متوسطة", ownerUserId: "u6", dueDate: "2026-05-10", status: "مفتوح", link: "/gaps" },
  { id: "n4", title: "مشروع متأخر", description: "منظومة تقييم الموردين الرقمية متأخرة 18 يوماً", type: "مشروع", priority: "حرجة", ownerUserId: "u9", dueDate: "2026-04-30", status: "قيد التنفيذ", link: "/projects" },
  { id: "n5", title: "إجراء تصحيحي متأخر", description: "CA-2026-005 تجاوز الموعد المحدد", type: "إجراء", priority: "حرجة", ownerUserId: "u2", dueDate: "2026-04-25", status: "قيد التنفيذ", link: "/iso/non-conformities" },
  { id: "n6", title: "تدقيق قريب موعده", description: "تدقيق ISO 27001 - إدارة الصلاحيات بعد 5 أيام", type: "تدقيق", priority: "عالية", ownerUserId: "u4", dueDate: "2026-05-01", status: "جديد", link: "/iso/engagements" },
  { id: "n7", title: "عدم مطابقة جسيمة بانتظار الإغلاق", description: "NC-2026-003 تقييم الجوانب البيئية", type: "عدم مطابقة", priority: "حرجة", ownerUserId: "u11", dueDate: "2026-06-15", status: "قيد التنفيذ", link: "/iso/non-conformities" },
  { id: "n8", title: "طلب اعتماد فرصة تحسين", description: "إطار قياس ثقافة التميز يحتاج لاعتماد القيادة", type: "اعتماد", priority: "متوسطة", ownerUserId: "u14", dueDate: "2026-05-08", status: "مفتوح", link: "/gaps" },
  { id: "n9", title: "شاهد منتهي الصلاحية قريباً", description: "تقرير الرؤية والرسالة المحدّثة - ينتهي بعد 30 يوماً", type: "شاهد", priority: "متوسطة", ownerUserId: "u3", dueDate: "2026-05-20", status: "جديد", link: "/evidences" },
  { id: "n10", title: "تقييم EFQM ربع سنوي مستحق", description: "موعد تقييم الممكنات للربع الثاني", type: "تقييم", priority: "عالية", ownerUserId: "u2", dueDate: "2026-06-01", status: "جديد", link: "/self-assessment" },
  { id: "n11", title: "تدقيق السلامة المهنية مجدول", description: "ISO 45001 - تقييم المخاطر بعد 10 أيام", type: "تدقيق", priority: "متوسطة", ownerUserId: "u10", dueDate: "2026-06-10", status: "جديد", link: "/iso/engagements" },
  { id: "n12", title: "عدم مطابقة بسيطة لم تُغلق", description: "NC-2026-008 خطة استمرارية", type: "عدم مطابقة", priority: "متوسطة", ownerUserId: "u4", dueDate: "2026-07-30", status: "قيد التنفيذ", link: "/iso/non-conformities" },
  { id: "n13", title: "مشروع لم يُحدّث منذ 14 يوماً", description: "خارطة رقمنة الخدمات الحكومية", type: "مشروع", priority: "متوسطة", ownerUserId: "u8", dueDate: "2026-05-10", status: "مفتوح", link: "/projects" },
  { id: "n14", title: "اعتماد قائمة تحقق ISO 14001", description: "5 بنود بحاجة للاعتماد قبل التدقيق", type: "اعتماد", priority: "عالية", ownerUserId: "u11", dueDate: "2026-06-20", status: "مفتوح", link: "/iso/checklists" },
  { id: "n15", title: "تقرير المراجعة الإدارية مستحق", description: "موعد تقديم تقرير الربع الأول للقيادة", type: "تقييم", priority: "عالية", ownerUserId: "u2", dueDate: "2026-05-15", status: "مفتوح", link: "/reports" },
  { id: "n16", title: "فرصة تحسين معتمدة بحاجة لمشروع", description: "حملة توعية أمن المعلومات معتمدة وبانتظار التحويل", type: "فرصة", priority: "عالية", ownerUserId: "u4", dueDate: "2026-05-05", status: "مفتوح", link: "/gaps" },
  { id: "n17", title: "شاهد ISO 45001 ناقص", description: "سجل الكفاءات والتدريب يحتاج إكمال", type: "شاهد", priority: "عالية", ownerUserId: "u5", dueDate: "2026-05-25", status: "قيد التنفيذ", link: "/evidences" },
  { id: "n18", title: "تنبيه: 3 مدققين لم يعتمدوا قائمة التحقق", description: "تدقيق إدارة الصلاحيات ISO 27001", type: "تدقيق", priority: "متوسطة", ownerUserId: "u4", dueDate: "2026-04-29", status: "مفتوح", link: "/iso/checklists" },
  { id: "n19", title: "إجراء تصحيحي بحاجة لتحقق فاعلية", description: "CA-2026-014 تم الإغلاق - يحتاج تحقق", type: "إجراء", priority: "متوسطة", ownerUserId: "u2", dueDate: "2026-05-12", status: "بانتظار التفعيل" as any, link: "/iso/non-conformities" },
  { id: "n20", title: "اعتماد خطة تدقيق سنوية", description: "خطة 2026 جاهزة للاعتماد التنفيذي", type: "اعتماد", priority: "عالية", ownerUserId: "u14", dueDate: "2026-05-03", status: "مفتوح", link: "/iso/plans" },
];

// ===== سجل النشاطات =====
export type ActivityLog = {
  id: string;
  userId: string;
  userName: string;
  action: string;
  module: string;
  timestamp: string;
  changeType: "إنشاء" | "تعديل" | "حذف" | "اعتماد" | "إغلاق" | "إسناد" | "تصدير" | "دخول";
  before: string;
  after: string;
  ip: string;
  status: "ناجح" | "فاشل";
};

const actionsBank = [
  ["إنشاء","إنشاء شاهد جديد","الشواهد"],
  ["تعديل","تعديل تقييم معيار فرعي","التقييم الذاتي"],
  ["اعتماد","اعتماد فرصة تحسين","فرص التحسين"],
  ["إغلاق","إغلاق إجراء تصحيحي","الإجراءات التصحيحية"],
  ["إسناد","إسناد مشروع تحسين","مشاريع التحسين"],
  ["تصدير","تصدير تقرير تنفيذي","التقارير"],
  ["تعديل","تحديث قائمة تحقق ISO","قوائم التحقق"],
  ["إنشاء","إنشاء خطة تدقيق","التدقيق ISO"],
  ["دخول","تسجيل الدخول","النظام"],
  ["تعديل","تعديل صلاحيات مستخدم","المستخدمون والصلاحيات"],
] as const;

export const activityLogs: ActivityLog[] = Array.from({length: 100}).map((_, i) => {
  const u = extUsers[i % extUsers.length];
  const [ct, action, mod] = actionsBank[i % actionsBank.length];
  const day = ((i * 3) % 27) + 1;
  const month = ((i % 4) + 1);
  return {
    id: `al${i+1}`,
    userId: u.id,
    userName: u.name,
    action,
    module: mod,
    timestamp: `2026-0${month}-${String(day).padStart(2,"0")} ${String(8 + (i%10)).padStart(2,"0")}:${String((i*7)%60).padStart(2,"0")}`,
    changeType: ct as ActivityLog["changeType"],
    before: i % 4 === 1 ? "قيمة سابقة - ${i}" : "—",
    after: i % 4 === 1 ? `قيمة جديدة - ${i}` : "—",
    ip: `10.20.${(i % 200) + 10}.${(i*3) % 250 + 1}`,
    status: i % 17 === 0 ? "فاشل" : "ناجح",
  };
});

// ===== سير العمل =====
export const workflowStates = {
  assessment: ["مسودة","مقدم للمراجعة","تحت المراجعة","معاد للتعديل","معتمد","مغلق"],
  evidence: ["مرفوع","قيد المراجعة","يحتاج تحديث","مقبول","مرفوض","معتمد"],
  improvement: ["مقترحة","تحت الدراسة","معتمدة","محولة إلى مشروع","مغلقة"],
  project: ["مقترح","معتمد","قيد التنفيذ","متأخر","مكتمل","تم قياس الأثر","مغلق"],
  audit: ["مسودة","مراجعة قائد التدقيق","مراجعة الإدارة محل التدقيق","معتمد","مغلق"],
};

// ===== مساعدات =====
export const getUser = (id: string) => extUsers.find(u => u.id === id);
export const getSubCriterion = (id: string) => subCriteria.find(s => s.id === id);
export const getGuidancePoints = (subId: string) => guidancePoints.filter(g => g.subCriterionId === subId);
export const subCriteriaOf = (fwId: string) => subCriteria.filter(s => s.frameworkId === fwId);
export const subCriteriaOfParent = (fwId: string, parentCode: string) =>
  subCriteria.filter(s => s.frameworkId === fwId && s.parentCode === parentCode);

// مؤشرات إضافية للوحة القيادة
export const extendedDashboardKpis = {
  subCriteriaCompletion: Math.round(subCriteria.reduce((s, c) => s + c.completion, 0) / subCriteria.length),
  topGapSubCriteria: [...subCriteria].sort((a,b) => (b.targetScore - b.currentScore) - (a.targetScore - a.currentScore)).slice(0, 5),
  plannedAudits: auditPlans.filter(a => a.status === "مخطط").length,
  completedAudits: auditPlans.filter(a => a.status === "مكتمل").length,
  completedChecklists: checklistItems.filter(c => c.result !== "—").length,
  openNCs: 8,
  overdueCAs: correctiveActions.filter(c => c.status === "متأخرة").length,
  evidenceCompletion: 78,
  improvementClosureRate: 64,
  projectCompletionRate: 47,
  overallRiskIndex: 38,
  awardReadinessIndex: 71,
};

export { departments, frameworks };