import { cn } from "@/lib/utils";
import { statusColors } from "@/data/mockData";
import { useT } from "@/i18n/I18nProvider";

export function StatusBadge({ status, className }: { status: string; className?: string }) {
  const t = useT();
  const cls = statusColors[status] ?? "bg-muted text-muted-foreground border-border";
  return (
    <span className={cn("inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-semibold border", cls, className)}>
      {t(status)}
    </span>
  );
}
