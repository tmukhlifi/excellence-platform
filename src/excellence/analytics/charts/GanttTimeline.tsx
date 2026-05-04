import { useMemo } from "react";
import { useAnalytics } from "../AnalyticsContext";

const STATUS_COLOR: Record<string, string> = {
  "مقترح": "hsl(210 30% 60%)", "معتمد": "hsl(210 75% 45%)",
  "قيد التنفيذ": "hsl(158 55% 32%)", "متأخر": "hsl(0 70% 50%)",
  "مكتمل": "hsl(152 60% 35%)", "مغلق بعد قياس الأثر": "hsl(280 55% 50%)",
};

export function GanttTimeline({ onClick }: { onClick: (p: any) => void }) {
  const { filtered } = useAnalytics();
  const data = filtered.projects;

  const { min, max, days } = useMemo(() => {
    if (!data.length) return { min: new Date(), max: new Date(), days: 1 };
    const all = data.flatMap(p => [new Date(p.startDate).getTime(), new Date(p.endDate).getTime()]);
    const mn = Math.min(...all), mx = Math.max(...all);
    return { min: new Date(mn), max: new Date(mx), days: (mx - mn) / 86400000 };
  }, [data]);

  const monthMarks = useMemo(() => {
    const marks: { left: number; label: string }[] = [];
    const cur = new Date(min.getFullYear(), min.getMonth(), 1);
    while (cur <= max) {
      const left = ((cur.getTime() - min.getTime()) / (max.getTime() - min.getTime())) * 100;
      marks.push({ left, label: `${cur.getMonth()+1}/${String(cur.getFullYear()).slice(2)}` });
      cur.setMonth(cur.getMonth() + 1);
    }
    return marks;
  }, [min, max]);

  const today = ((Date.now() - min.getTime()) / (max.getTime() - min.getTime())) * 100;

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <div className="flex border-b border-border/60 pb-1 mb-1 text-[10px] text-muted-foreground" style={{ paddingRight: 200 }}>
        <div className="relative w-full h-5">
          {monthMarks.map((m, i) => (
            <div key={i} className="absolute top-0" style={{ right: `${m.left}%` }}>
              <div className="border-r border-border/60 h-2.5" />
              <span className="text-[9px]">{m.label}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="flex-1 overflow-auto">
        {data.map((p) => {
          const s = new Date(p.startDate).getTime();
          const e = new Date(p.endDate).getTime();
          const left = ((s - min.getTime()) / (max.getTime() - min.getTime())) * 100;
          const width = ((e - s) / (max.getTime() - min.getTime())) * 100;
          const color = STATUS_COLOR[p.status] || "hsl(210 30% 50%)";
          const isLate = p.status === "متأخر";
          return (
            <div key={p.id} className="flex items-center group hover:bg-muted/40 cursor-pointer py-1.5 px-1" onClick={() => onClick(p)}>
              <div className="w-[200px] shrink-0 pr-2">
                <div className="text-xs font-semibold truncate text-foreground">{p.name}</div>
                <div className="text-[10px] text-muted-foreground truncate">{p.ownerName}</div>
              </div>
              <div className="relative flex-1 h-7">
                <div className="absolute top-0 h-7 rounded shadow-sm flex items-center px-2 transition-all group-hover:ring-2 group-hover:ring-gold"
                  style={{ right: `${left}%`, width: `${width}%`, background: color, opacity: 0.92 }}>
                  <div className="h-full bg-white/20 rounded-r" style={{ width: `${p.progress}%` }} />
                  <span className="absolute inset-0 flex items-center justify-center text-[10px] text-white font-bold">{p.progress}%</span>
                </div>
                {isLate && <div className="absolute top-0 h-7 rounded border-2 border-destructive border-dashed pointer-events-none" style={{ right: `${left}%`, width: `${width}%` }} />}
              </div>
            </div>
          );
        })}
      </div>
      <div className="text-[10px] text-muted-foreground pt-1 px-1 flex gap-3 border-t border-border/40 mt-1">
        {Object.entries(STATUS_COLOR).map(([k,v]) => (
          <div key={k} className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded" style={{background:v}}/>{k}</div>
        ))}
      </div>
    </div>
  );
}