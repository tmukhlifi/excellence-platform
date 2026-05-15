import { useMemo, useState } from "react";
import { useAnalytics } from "../AnalyticsContext";

type Mode = "contribution" | "gap" | "evidence" | "readiness";

const MODES: { v: Mode; label: string }[] = [
  { v: "contribution", label: "المساهمة" },
  { v: "gap", label: "الفجوة" },
  { v: "evidence", label: "اكتمال الشواهد" },
  { v: "readiness", label: "الجاهزية" },
];

export function Heatmap({ onCellClick }: { onCellClick: (info: any) => void }) {
  const { filtered } = useAnalytics();
  const [mode, setMode] = useState<Mode>("contribution");

  const { matrix, depts, cris, max } = useMemo(() => {
    const depts = filtered.departments;
    const cris = filtered.criteria;
    const matrix: number[][] = depts.map(() => cris.map(() => 0));
    cris.forEach((c, ci) => {
      depts.forEach((d, di) => {
        let v = 0;
        if (c.ownerDeptId === d.id) v += 2;
        if (c.contributorDeptIds.includes(d.id)) v += 1;
        if (mode === "contribution") matrix[di][ci] = v;
        else if (mode === "gap" && v) matrix[di][ci] = c.gaps;
        else if (mode === "evidence" && v) matrix[di][ci] = c.evidenceIds.length;
        else if (mode === "readiness" && v) matrix[di][ci] = c.currentScore;
      });
    });
    const max = Math.max(1, ...matrix.flat());
    return { matrix, depts, cris, max };
  }, [filtered, mode]);

  const colorFor = (v: number) => {
    if (!v) return "hsl(210 20% 96%)";
    const t = v / max;
    const palette = mode === "gap"
      ? [[0,70,95],[0,70,75],[0,70,55],[0,70,40]]   // red scale
      : mode === "evidence"
      ? [[42,75,90],[42,75,72],[42,75,55],[42,75,40]]
      : mode === "readiness"
      ? [[152,55,90],[152,55,70],[152,55,50],[152,55,32]]
      : [[210,55,90],[210,65,72],[210,75,55],[210,80,38]];
    const idx = Math.min(3, Math.floor(t * 4));
    const [h,s,l] = palette[idx];
    return `hsl(${h} ${s}% ${l}%)`;
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex gap-1 mb-2 px-1">
        {MODES.map(m => (
          <button key={m.v} onClick={() => setMode(m.v)}
            className={`text-[11px] px-2.5 py-1 rounded border ${mode===m.v?"bg-primary text-primary-foreground border-primary":"bg-card text-muted-foreground border-border hover:bg-muted"}`}>
            {m.label}
          </button>
        ))}
      </div>
      <div className="flex-1 overflow-auto">
        <table className="text-[10px] border-separate border-spacing-0.5">
          <thead>
            <tr>
              <th className="sticky right-0 bg-card z-10 p-1"></th>
              {cris.map(c => (
                <th key={c.id} className="p-1 text-center font-medium text-muted-foreground" style={{ minWidth: 32 }}>
                  <div className="rotate-180" style={{ writingMode: "vertical-rl" }} title={c.name}>{c.code}-{c.name.slice(0,10)}</div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {depts.map((d, di) => (
              <tr key={d.id}>
                <td className="sticky right-0 bg-card z-10 p-1 font-semibold text-foreground whitespace-nowrap">{d.code}</td>
                {cris.map((c, ci) => {
                  const v = matrix[di][ci];
                  return (
                    <td key={c.id} className="p-0">
                      <button onClick={() => onCellClick({ dept: d, criterion: c, value: v, mode })}
                        className="w-7 h-7 rounded-sm hover:ring-2 hover:ring-gold transition-all"
                        style={{ background: colorFor(v) }}
                        title={`${d.name} × ${c.name} = ${v}`}>
                        <span className={`text-[9px] font-bold ${v/max>0.55?"text-white":"text-foreground/70"}`}>{v||""}</span>
                      </button>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}