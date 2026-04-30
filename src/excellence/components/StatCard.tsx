import { cn } from "@/lib/utils";
import { TrendingUp, TrendingDown } from "lucide-react";

export function StatCard({
  label, value, suffix, icon: Icon, trend, hint, accent = "primary",
}: {
  label: string;
  value: string | number;
  suffix?: string;
  icon?: any;
  trend?: { value: number; positive?: boolean };
  hint?: string;
  accent?: "primary" | "gold" | "success" | "warning" | "destructive" | "info";
}) {
  const accentMap: Record<string, string> = {
    primary: "bg-primary/10 text-primary",
    gold: "bg-gold/15 text-gold",
    success: "bg-success/15 text-success",
    warning: "bg-warning/15 text-warning",
    destructive: "bg-destructive/15 text-destructive",
    info: "bg-info/15 text-info",
  };
  return (
    <div className="stat-card">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-xs font-medium text-muted-foreground">{label}</p>
          <div className="mt-2 flex items-baseline gap-1">
            <span className="text-2xl font-bold text-foreground">{value}</span>
            {suffix && <span className="text-sm text-muted-foreground">{suffix}</span>}
          </div>
          {hint && <p className="text-[11px] text-muted-foreground mt-1">{hint}</p>}
          {trend && (
            <div className={cn("mt-2 inline-flex items-center gap-1 text-xs font-semibold",
              trend.positive !== false ? "text-success" : "text-destructive")}>
              {trend.positive !== false ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
              {trend.value > 0 ? `+${trend.value}` : trend.value}%
            </div>
          )}
        </div>
        {Icon && (
          <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center", accentMap[accent])}>
            <Icon className="w-5 h-5" />
          </div>
        )}
      </div>
    </div>
  );
}