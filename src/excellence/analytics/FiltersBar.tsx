import { useAnalytics } from "./AnalyticsContext";
import { departments, frameworks, criteria } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Filter, X } from "lucide-react";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuTrigger, DropdownMenuCheckboxItem, DropdownMenuLabel, DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

function MultiSelect({ label, items, selected, onToggle }: { label: string; items: { id: string; label: string }[]; selected: string[]; onToggle: (id: string) => void }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="text-xs h-8 gap-1">
          {label}{selected.length > 0 && <span className="bg-primary text-primary-foreground rounded-full px-1.5 text-[10px]">{selected.length}</span>}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-60 max-h-72 overflow-y-auto">
        <DropdownMenuLabel className="text-xs">{label}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {items.map(it => (
          <DropdownMenuCheckboxItem key={it.id} checked={selected.includes(it.id)} onCheckedChange={() => onToggle(it.id)}
            onSelect={(e) => e.preventDefault()} className="text-xs">
            {it.label}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function FiltersBar() {
  const { filters, setFilters, reset } = useAnalytics();
  const toggle = (key: keyof typeof filters, val: string) => {
    const cur = filters[key] as string[];
    setFilters({ ...filters, [key]: cur.includes(val) ? cur.filter(v => v !== val) : [...cur, val] });
  };
  const activeCount = filters.frameworkIds.length + filters.departmentIds.length + filters.criterionIds.length
    + filters.gapPriority.length + filters.projectStatus.length;

  return (
    <div className="gov-card p-3 flex flex-wrap items-center gap-2 bg-gradient-to-l from-card to-secondary/30">
      <div className="flex items-center gap-1.5 text-xs text-muted-foreground pl-2 border-l border-border/60">
        <Filter className="w-3.5 h-3.5 text-primary" />
        <span className="font-semibold">فلاتر التحليل</span>
      </div>
      <MultiSelect label="النموذج" items={frameworks.map(f => ({ id: f.id, label: f.shortName }))} selected={filters.frameworkIds} onToggle={(id) => toggle("frameworkIds", id)} />
      <MultiSelect label="الإدارة" items={departments.map(d => ({ id: d.id, label: d.name }))} selected={filters.departmentIds} onToggle={(id) => toggle("departmentIds", id)} />
      <MultiSelect label="المعيار" items={criteria.map(c => ({ id: c.id, label: `${c.code} - ${c.name}` }))} selected={filters.criterionIds} onToggle={(id) => toggle("criterionIds", id)} />
      <MultiSelect label="أولوية الفجوة" items={["حرجة","عالية","متوسطة","منخفضة"].map(p => ({ id: p, label: p }))} selected={filters.gapPriority} onToggle={(id) => toggle("gapPriority", id)} />
      <MultiSelect label="حالة المشروع" items={["مقترح","معتمد","قيد التنفيذ","متأخر","مكتمل"].map(p => ({ id: p, label: p }))} selected={filters.projectStatus} onToggle={(id) => toggle("projectStatus", id)} />

      <select value={filters.period} onChange={(e) => setFilters({ ...filters, period: e.target.value as any })}
        className="text-xs h-8 px-2 rounded border border-border bg-card text-foreground">
        <option value="all">كل الفترات</option>
        <option value="q1">الربع الأول</option>
        <option value="q2">الربع الثاني</option>
        <option value="h1">النصف الأول</option>
        <option value="year">السنة الحالية</option>
      </select>

      <select value={filters.relationType} onChange={(e) => setFilters({ ...filters, relationType: e.target.value as any })}
        className="text-xs h-8 px-2 rounded border border-border bg-card text-foreground">
        <option value="all">كل العلاقات</option>
        <option value="ownership">ملكية</option>
        <option value="contribution">مساهمة</option>
        <option value="evidence">شواهد</option>
      </select>

      <div className="flex-1" />
      {activeCount > 0 && (
        <Button variant="ghost" size="sm" className="text-xs h-8 gap-1" onClick={reset}>
          <X className="w-3.5 h-3.5" /> مسح الفلاتر ({activeCount})
        </Button>
      )}
    </div>
  );
}