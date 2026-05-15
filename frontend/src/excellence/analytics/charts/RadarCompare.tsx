import { useMemo, useState } from "react";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { useAnalytics } from "../AnalyticsContext";
import { frameworks as allFw } from "@/data/mockData";

export function RadarCompare() {
  const { filtered } = useAnalytics();
  const fws = filtered.frameworks.length ? filtered.frameworks : allFw;
  const [fwId, setFwId] = useState(fws[0].id);
  const data = useMemo(() => {
    return filtered.criteria.filter(c => c.frameworkId === fwId).map(c => ({
      name: `${c.code}. ${c.name.slice(0,16)}`,
      حالي: c.currentScore,
      مستهدف: c.targetScore,
      "الدورة السابقة": Math.max(40, c.currentScore - 6 - Math.round(Math.random()*5)),
    }));
  }, [filtered, fwId]);

  return (
    <div className="flex flex-col h-full">
      <div className="flex gap-1 mb-2 px-1 flex-wrap">
        {fws.map(f => (
          <button key={f.id} onClick={() => setFwId(f.id)}
            className={`text-[11px] px-2.5 py-1 rounded border ${fwId===f.id?"bg-primary text-primary-foreground border-primary":"bg-card text-muted-foreground border-border hover:bg-muted"}`}>
            {f.shortName}
          </button>
        ))}
      </div>
      <div className="flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart data={data} outerRadius="78%">
            <PolarGrid stroke="hsl(210 20% 80%)" />
            <PolarAngleAxis dataKey="name" tick={{ fontSize: 10, fill: "hsl(200 30% 25%)" }} />
            <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fontSize: 9 }} />
            <Radar name="الدورة السابقة" dataKey="الدورة السابقة" stroke="hsl(210 30% 55%)" fill="hsl(210 30% 55%)" fillOpacity={0.18} strokeDasharray="4 3" />
            <Radar name="حالي" dataKey="حالي" stroke="hsl(158 55% 32%)" fill="hsl(158 55% 32%)" fillOpacity={0.45} />
            <Radar name="مستهدف" dataKey="مستهدف" stroke="hsl(42 75% 52%)" fill="hsl(42 75% 52%)" fillOpacity={0.15} strokeWidth={2} />
            <Tooltip contentStyle={{ background: "hsl(0 0% 100%)", border: "1px solid hsl(210 20% 88%)", borderRadius: 6, fontSize: 11 }} />
            <Legend wrapperStyle={{ fontSize: 11 }} />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}