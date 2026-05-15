import { useEffect, useMemo, useRef } from "react";
import * as d3 from "d3";
import { sankey, sankeyLinkHorizontal, sankeyJustify } from "d3-sankey";
import { useAnalytics } from "../AnalyticsContext";

export function SankeyFlow() {
  const ref = useRef<SVGSVGElement | null>(null);
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const { filtered } = useAnalytics();

  const graph = useMemo(() => {
    const nodes: { name: string; cat: string }[] = [];
    const idx = new Map<string, number>();
    const add = (name: string, cat: string) => {
      if (!idx.has(name)) { idx.set(name, nodes.length); nodes.push({ name, cat }); }
      return idx.get(name)!;
    };
    const links: { source: number; target: number; value: number }[] = [];
    filtered.gaps.forEach(g => {
      const cName = filtered.criteria.find(c => c.id === g.criterionIds[0])?.name || "معيار غير محدد";
      const s = add(`معيار: ${cName.slice(0,20)}`, "criterion");
      const t = add(`فجوة: ${g.title.slice(0,18)}`, "gap");
      links.push({ source: s, target: t, value: g.impact });
      const im = filtered.improvements.find(i => i.gapId === g.id);
      if (im) {
        const u = add(`فرصة: ${im.title.slice(0,18)}`, "improvement");
        links.push({ source: t, target: u, value: g.impact });
        const pr = filtered.projects.find(p => p.improvementId === im.id);
        if (pr) {
          const v = add(`مشروع: ${pr.name.slice(0,18)}`, "project");
          links.push({ source: u, target: v, value: g.impact });
          const w = add(`أثر: ${im.expectedImpactDescription.slice(0,22)}`, "impact");
          links.push({ source: v, target: w, value: g.impact });
        }
      }
    });
    return { nodes, links };
  }, [filtered]);

  useEffect(() => {
    const svgEl = ref.current!;
    const wrap = wrapRef.current!;
    const W = wrap.clientWidth, H = wrap.clientHeight;
    const svg = d3.select(svgEl);
    svg.selectAll("*").remove();
    svg.attr("viewBox", `0 0 ${W} ${H}`);
    if (!graph.links.length) return;

    const sk = sankey<any, any>().nodeWidth(12).nodePadding(10)
      .nodeAlign(sankeyJustify).extent([[10, 10], [W - 10, H - 10]]);
    const { nodes, links } = sk({
      nodes: graph.nodes.map(n => ({ ...n })),
      links: graph.links.map(l => ({ ...l })),
    });

    const colors: Record<string,string> = {
      criterion: "hsl(210 75% 45%)", gap: "hsl(0 70% 50%)",
      improvement: "hsl(280 55% 50%)", project: "hsl(152 60% 35%)", impact: "hsl(42 75% 52%)",
    };

    svg.append("g").attr("fill", "none").selectAll("path").data(links).join("path")
      .attr("d", sankeyLinkHorizontal())
      .attr("stroke", (d: any) => colors[d.source.cat] || "#999")
      .attr("stroke-opacity", 0.35)
      .attr("stroke-width", (d: any) => Math.max(1, d.width))
      .on("mouseover", function() { d3.select(this).attr("stroke-opacity", 0.7); })
      .on("mouseout", function() { d3.select(this).attr("stroke-opacity", 0.35); })
      .append("title").text((d: any) => `${d.source.name} → ${d.target.name}\nالقيمة: ${d.value}`);

    const n = svg.append("g").selectAll("g").data(nodes).join("g");
    n.append("rect").attr("x", (d: any) => d.x0).attr("y", (d: any) => d.y0)
      .attr("height", (d: any) => Math.max(2, d.y1 - d.y0)).attr("width", (d: any) => d.x1 - d.x0)
      .attr("fill", (d: any) => colors[d.cat] || "#666").attr("rx", 2);
    n.append("text").attr("x", (d: any) => d.x0 < W / 2 ? d.x1 + 6 : d.x0 - 6)
      .attr("y", (d: any) => (d.y0 + d.y1) / 2).attr("dy", "0.35em")
      .attr("text-anchor", (d: any) => d.x0 < W / 2 ? "start" : "end")
      .style("font-size", "10px").style("font-family", "IBM Plex Sans Arabic")
      .attr("fill", "hsl(200 30% 18%)").text((d: any) => d.name);
  }, [graph]);

  return <div ref={wrapRef} className="w-full h-full"><svg ref={ref} className="w-full h-full" /></div>;
}