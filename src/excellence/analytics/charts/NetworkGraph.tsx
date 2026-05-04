import { useEffect, useMemo, useRef } from "react";
import * as d3 from "d3";
import { useAnalytics, CATEGORY_COLORS, CATEGORY_LABELS } from "../AnalyticsContext";

type N = { id: string; label: string; type: keyof typeof CATEGORY_COLORS; r: number; meta?: any };
type L = { source: string | N; target: string | N; weight: number };

export function NetworkGraph({ onSelect }: { onSelect: (n: { id: string; type: string; label: string; meta: any }) => void }) {
  const ref = useRef<SVGSVGElement | null>(null);
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const { filtered } = useAnalytics();

  const { nodes, links } = useMemo(() => {
    const nodes: N[] = [];
    const links: L[] = [];
    const add = (n: N) => { if (!nodes.find(x => x.id === n.id)) nodes.push(n); };

    filtered.frameworks.forEach(f => add({ id: `fw-${f.id}`, label: f.shortName, type: "framework", r: 22, meta: f }));
    filtered.departments.forEach(d => add({ id: `dp-${d.id}`, label: d.code, type: "department", r: 18, meta: d }));
    filtered.criteria.forEach(c => {
      add({ id: `cr-${c.id}`, label: c.name.slice(0, 18), type: "criterion", r: 12, meta: c });
      links.push({ source: `fw-${c.frameworkId}`, target: `cr-${c.id}`, weight: 2 });
      links.push({ source: `dp-${c.ownerDeptId}`, target: `cr-${c.id}`, weight: 1.5 });
      c.contributorDeptIds.forEach(d => links.push({ source: `dp-${d}`, target: `cr-${c.id}`, weight: 0.6 }));
    });
    filtered.evidences.slice(0, 30).forEach(e => {
      add({ id: `ev-${e.id}`, label: e.name.slice(0, 14), type: "evidence", r: 8, meta: e });
      e.criterionIds.forEach(c => links.push({ source: `cr-${c}`, target: `ev-${e.id}`, weight: 0.8 }));
    });
    filtered.gaps.forEach(g => {
      add({ id: `gp-${g.id}`, label: g.title.slice(0, 14), type: "gap", r: 9, meta: g });
      g.criterionIds.forEach(c => links.push({ source: `cr-${c}`, target: `gp-${g.id}`, weight: 1 }));
    });
    filtered.improvements.forEach(im => {
      add({ id: `im-${im.id}`, label: im.title.slice(0, 14), type: "improvement", r: 9, meta: im });
      if (im.gapId) links.push({ source: `gp-${im.gapId}`, target: `im-${im.id}`, weight: 1.2 });
    });
    filtered.projects.forEach(p => {
      add({ id: `pr-${p.id}`, label: p.name.slice(0, 14), type: "project", r: 11, meta: p });
      links.push({ source: `im-${p.improvementId}`, target: `pr-${p.id}`, weight: 1.4 });
    });

    const ids = new Set(nodes.map(n => n.id));
    const linksFiltered = links.filter(l => ids.has(l.source as string) && ids.has(l.target as string));
    return { nodes, links: linksFiltered };
  }, [filtered]);

  useEffect(() => {
    const svgEl = ref.current!;
    const wrap = wrapRef.current!;
    const W = wrap.clientWidth, H = wrap.clientHeight;
    const svg = d3.select(svgEl);
    svg.selectAll("*").remove();
    svg.attr("viewBox", `0 0 ${W} ${H}`);

    const g = svg.append("g");

    const sim = d3.forceSimulation(nodes as any)
      .force("link", d3.forceLink(links).id((d: any) => d.id).distance((d: any) => 90 / (d.weight || 1)).strength(0.4))
      .force("charge", d3.forceManyBody().strength(-180))
      .force("center", d3.forceCenter(W / 2, H / 2))
      .force("collide", d3.forceCollide().radius((d: any) => d.r + 4));

    const link = g.append("g").attr("stroke-opacity", 0.3).attr("stroke", "hsl(215 15% 50%)")
      .selectAll("line").data(links).join("line")
      .attr("stroke-width", (d: any) => Math.sqrt(d.weight) * 1.1);

    const node = g.append("g").selectAll("g").data(nodes).join("g")
      .attr("cursor", "pointer")
      .call(d3.drag<any, any>()
        .on("start", (event, d) => { if (!event.active) sim.alphaTarget(0.3).restart(); d.fx = d.x; d.fy = d.y; })
        .on("drag", (event, d) => { d.fx = event.x; d.fy = event.y; })
        .on("end", (event, d) => { if (!event.active) sim.alphaTarget(0); d.fx = null; d.fy = null; }));

    node.append("circle")
      .attr("r", (d: any) => d.r)
      .attr("fill", (d: any) => CATEGORY_COLORS[d.type])
      .attr("stroke", "white").attr("stroke-width", 1.5)
      .attr("filter", "drop-shadow(0 1px 2px rgba(0,0,0,.15))");

    node.append("text")
      .text((d: any) => d.label)
      .attr("font-size", 9).attr("text-anchor", "middle").attr("dy", (d: any) => d.r + 11)
      .attr("fill", "hsl(200 30% 18%)").attr("pointer-events", "none")
      .style("font-family", "IBM Plex Sans Arabic");

    // Tooltip
    const tip = d3.select(wrap).append("div")
      .attr("class", "pointer-events-none absolute z-50 bg-popover border border-border rounded-md shadow-lg px-3 py-2 text-[11px] text-popover-foreground opacity-0 transition-opacity")
      .style("max-width", "240px");

    node.on("mouseover", function (e, d: any) {
      d3.select(this).select("circle").attr("stroke", "hsl(42 75% 52%)").attr("stroke-width", 3);
      const connected = new Set<string>();
      links.forEach(l => {
        const s = (l.source as any).id, t = (l.target as any).id;
        if (s === d.id) connected.add(t);
        if (t === d.id) connected.add(s);
      });
      node.select("circle").attr("opacity", (n: any) => n.id === d.id || connected.has(n.id) ? 1 : 0.18);
      link.attr("stroke-opacity", (l: any) => (l.source.id === d.id || l.target.id === d.id) ? 0.9 : 0.05)
        .attr("stroke", (l: any) => (l.source.id === d.id || l.target.id === d.id) ? "hsl(42 75% 52%)" : "hsl(215 15% 50%)");
      tip.html(`<div class="font-bold mb-0.5">${d.meta?.name || d.meta?.title || d.label}</div><div class="text-muted-foreground">${CATEGORY_LABELS[d.type]}</div>`)
        .style("left", (e.offsetX + 12) + "px").style("top", (e.offsetY + 12) + "px").style("opacity", 1);
    }).on("mousemove", function (e) {
      tip.style("left", (e.offsetX + 12) + "px").style("top", (e.offsetY + 12) + "px");
    }).on("mouseout", function () {
      d3.select(this).select("circle").attr("stroke", "white").attr("stroke-width", 1.5);
      node.select("circle").attr("opacity", 1);
      link.attr("stroke-opacity", 0.3).attr("stroke", "hsl(215 15% 50%)");
      tip.style("opacity", 0);
    }).on("click", function (_e, d: any) {
      onSelect({ id: d.id, type: d.type, label: d.label, meta: d.meta });
    });

    sim.on("tick", () => {
      link.attr("x1", (d: any) => d.source.x).attr("y1", (d: any) => d.source.y)
        .attr("x2", (d: any) => d.target.x).attr("y2", (d: any) => d.target.y);
      node.attr("transform", (d: any) => `translate(${d.x},${d.y})`);
    });

    const zoom = d3.zoom<SVGSVGElement, unknown>().scaleExtent([0.3, 3])
      .on("zoom", (event) => g.attr("transform", event.transform.toString()));
    svg.call(zoom as any);

    return () => { sim.stop(); tip.remove(); };
  }, [nodes, links, onSelect]);

  return (
    <div ref={wrapRef} className="relative w-full h-full">
      <svg ref={ref} className="w-full h-full" />
      <div className="absolute top-2 right-2 bg-card/90 backdrop-blur border border-border rounded-md p-2 text-[10px] space-y-1 shadow-sm">
        {Object.entries(CATEGORY_LABELS).map(([k, l]) => (
          <div key={k} className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full" style={{ background: CATEGORY_COLORS[k] }} />
            <span className="text-muted-foreground">{l}</span>
          </div>
        ))}
      </div>
    </div>
  );
}