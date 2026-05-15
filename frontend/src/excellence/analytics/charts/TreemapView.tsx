import { useEffect, useMemo, useRef, useState } from "react";
import * as d3 from "d3";
import { useAnalytics } from "../AnalyticsContext";

type Group = "framework" | "department" | "priority";
const GROUPS: { v: Group; label: string }[] = [
  { v: "framework", label: "حسب النموذج" },
  { v: "department", label: "حسب الإدارة" },
  { v: "priority", label: "حسب الأولوية" },
];

export function TreemapView() {
  const ref = useRef<SVGSVGElement | null>(null);
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const { filtered } = useAnalytics();
  const [group, setGroup] = useState<Group>("framework");

  const root = useMemo(() => {
    const fwName = (id: string) => filtered.frameworks.find(f => f.id === id)?.shortName || id;
    const dpName = (id: string) => filtered.departments.find(d => d.id === id)?.name || id;
    const buckets: Record<string, { name: string; value: number; items: string[] }> = {};
    filtered.gaps.forEach(g => {
      const key = group === "framework" ? fwName(g.frameworkId)
        : group === "department" ? dpName(g.ownerDeptId) : g.priority;
      buckets[key] = buckets[key] || { name: key, value: 0, items: [] };
      buckets[key].value += g.impact;
      buckets[key].items.push(g.title);
    });
    return { name: "root", children: Object.values(buckets) };
  }, [filtered, group]);

  useEffect(() => {
    const wrap = wrapRef.current!;
    const W = wrap.clientWidth, H = wrap.clientHeight;
    const svg = d3.select(ref.current!);
    svg.selectAll("*").remove();
    svg.attr("viewBox", `0 0 ${W} ${H}`);
    const h = d3.hierarchy(root as any).sum((d: any) => d.value || 0).sort((a, b) => (b.value!) - (a.value!));
    d3.treemap().size([W, H]).padding(3).round(true)(h as any);
    const color = d3.scaleSequential([0, h.children?.length || 1], d3.interpolateRgbBasis(["hsl(158 55% 32%)","hsl(210 75% 45%)","hsl(280 55% 50%)","hsl(0 70% 50%)","hsl(42 75% 52%)"]));
    const g = svg.append("g");
    const n = g.selectAll("g").data(h.leaves()).join("g")
      .attr("transform", (d: any) => `translate(${d.x0},${d.y0})`);
    n.append("rect").attr("width", (d: any) => d.x1 - d.x0).attr("height", (d: any) => d.y1 - d.y0)
      .attr("fill", (_d, i) => color(i) as string).attr("rx", 4)
      .attr("stroke", "white").attr("stroke-width", 2)
      .style("cursor", "pointer")
      .append("title").text((d: any) => `${d.data.name}\nالقيمة: ${d.value}\nالعدد: ${d.data.items.length}`);
    n.append("text").attr("x", 8).attr("y", 18).style("font-size", "12px").style("font-weight", "bold")
      .style("font-family", "IBM Plex Sans Arabic").attr("fill", "white").text((d: any) => d.data.name);
    n.append("text").attr("x", 8).attr("y", 34).style("font-size", "10px")
      .attr("fill", "white").attr("fill-opacity", 0.85).text((d: any) => `${d.data.items.length} فجوة • قيمة ${d.value}`);
  }, [root]);

  return (
    <div className="flex flex-col h-full">
      <div className="flex gap-1 mb-2 px-1">
        {GROUPS.map(g => (
          <button key={g.v} onClick={() => setGroup(g.v)}
            className={`text-[11px] px-2.5 py-1 rounded border ${group===g.v?"bg-primary text-primary-foreground border-primary":"bg-card text-muted-foreground border-border hover:bg-muted"}`}>
            {g.label}
          </button>
        ))}
      </div>
      <div ref={wrapRef} className="flex-1"><svg ref={ref} className="w-full h-full" /></div>
    </div>
  );
}