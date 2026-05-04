import { useEffect, useMemo, useRef, useState } from "react";
import * as d3 from "d3";
import { useAnalytics } from "../AnalyticsContext";

export function EdgeBundling() {
  const ref = useRef<SVGSVGElement | null>(null);
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const { filtered } = useAnalytics();
  const [hover, setHover] = useState<string | null>(null);

  const data = useMemo(() => {
    const depts = filtered.departments;
    const cris = filtered.criteria;
    const links: { src: string; dst: string; w: number }[] = [];
    cris.forEach(c => {
      links.push({ src: `D-${c.ownerDeptId}`, dst: `C-${c.id}`, w: 2 });
      c.contributorDeptIds.forEach(d => links.push({ src: `D-${d}`, dst: `C-${c.id}`, w: 1 }));
    });
    return { depts, cris, links };
  }, [filtered]);

  useEffect(() => {
    const svgEl = ref.current!;
    const wrap = wrapRef.current!;
    const W = wrap.clientWidth, H = wrap.clientHeight;
    const R = Math.min(W, H) / 2 - 80;
    const svg = d3.select(svgEl);
    svg.selectAll("*").remove();
    svg.attr("viewBox", `0 0 ${W} ${H}`);
    const g = svg.append("g").attr("transform", `translate(${W / 2},${H / 2})`);

    const root: any = { name: "root", children: [
      { name: "depts", children: data.depts.map(d => ({ name: `D-${d.id}`, label: d.name, type: "dept", meta: d })) },
      { name: "cris", children: data.cris.map(c => ({ name: `C-${c.id}`, label: `${c.code} - ${c.name.slice(0, 24)}`, type: "cri", meta: c })) },
    ]};

    const cluster = d3.cluster().size([360, R]);
    const hier = d3.hierarchy(root).sum(() => 1);
    cluster(hier as any);

    const leaves: any[] = (hier.leaves() as any);
    const map = new Map(leaves.map(l => [l.data.name, l]));

    const lineGen = d3.lineRadial<any>().curve(d3.curveBundle.beta(0.85))
      .radius((d: any) => d.y).angle((d: any) => d.x / 180 * Math.PI);

    const linkSel = g.append("g").attr("fill", "none").selectAll("path")
      .data(data.links).join("path")
      .attr("d", (l: any) => {
        const s = map.get(l.src), t = map.get(l.dst);
        if (!s || !t) return null;
        return lineGen(s.path(t));
      })
      .attr("stroke", "hsl(210 75% 45%)")
      .attr("stroke-opacity", (l: any) => 0.15 + l.w * 0.1)
      .attr("stroke-width", (l: any) => l.w * 0.8);

    const nodeSel = g.append("g").selectAll("g").data(leaves).join("g")
      .attr("transform", (d: any) => `rotate(${d.x - 90}) translate(${d.y},0)`);

    nodeSel.append("circle").attr("r", 4)
      .attr("fill", (d: any) => d.data.type === "dept" ? "hsl(25 75% 50%)" : "hsl(210 75% 45%)")
      .attr("cursor", "pointer");

    nodeSel.append("text")
      .attr("dy", "0.32em").attr("x", (d: any) => d.x < 180 ? 8 : -8)
      .attr("text-anchor", (d: any) => d.x < 180 ? "start" : "end")
      .attr("transform", (d: any) => d.x >= 180 ? "rotate(180)" : null)
      .style("font-size", "9px").style("font-family", "IBM Plex Sans Arabic")
      .attr("fill", "hsl(200 30% 18%)")
      .text((d: any) => d.data.label.slice(0, 20))
      .attr("cursor", "pointer");

    nodeSel.on("mouseover", (_e, d: any) => {
      setHover(d.data.name);
      const id = d.data.name;
      linkSel.attr("stroke", (l: any) => l.src === id || l.dst === id ? "hsl(42 75% 52%)" : "hsl(210 75% 45%)")
        .attr("stroke-opacity", (l: any) => l.src === id || l.dst === id ? 0.95 : 0.04)
        .attr("stroke-width", (l: any) => l.src === id || l.dst === id ? l.w * 1.6 : l.w * 0.6);
    }).on("mouseout", () => {
      setHover(null);
      linkSel.attr("stroke", "hsl(210 75% 45%)")
        .attr("stroke-opacity", (l: any) => 0.15 + l.w * 0.1)
        .attr("stroke-width", (l: any) => l.w * 0.8);
    });
  }, [data]);

  return (
    <div ref={wrapRef} className="relative w-full h-full">
      <svg ref={ref} className="w-full h-full" />
      {hover && (
        <div className="absolute bottom-2 right-2 text-[11px] bg-card border rounded px-2 py-1 shadow">
          <span className="text-muted-foreground">محدد: </span><span className="font-bold">{hover}</span>
        </div>
      )}
    </div>
  );
}