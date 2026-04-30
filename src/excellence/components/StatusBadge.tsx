import { cn } from "@/lib/utils";
import { statusColors } from "@/data/mockData";

export function StatusBadge({ status, className }: { status: string; className?: string }) {
  const cls = statusColors[status] ?? "bg-muted text-muted-foreground border-border";
  return (
    <span className={cn("inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-semibold border", cls, className)}>
      {status}
    </span>
  );
}
