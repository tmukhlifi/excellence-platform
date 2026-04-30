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
  { id: "d6", name: "التواصل المؤسسي", code: "COM", head: "أ.
