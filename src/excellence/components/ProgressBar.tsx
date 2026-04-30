import { cn } from "@/lib/utils";

export function ProgressBar({
  value, label, showValue = true, color = "primary", size = "md",
}: { value: number; label?: string; showValue?: boolean; color?: "primary" | "success" | "warning" | "destructive" | "gold" | "info"; size?: "sm" | "md" }) {
  const colorMap: Record<string, string> = {
    primary: "bg-primary", success: "bg-success", warning: "bg-warning",
    destructive: "bg-destructive", gold: "bg-gold", info: "bg-info",
  };
  return (
    <div className="w-full">
      {(label || showValue) && (
        <div className="flex items-center justify-between mb-1">
          {label && <span className="text-xs text-muted-foreground">{label}</span>}
          {showValue && <span className="text-xs font-semibold text-foreground">{value}%</span>}
        </div>
      )}
      <div className={cn("w-full bg-muted rounded-full overflow-hidden", size === "sm" ? "h-1.5" : "h-2")}>
        <div className={cn("h-full rounded-full transition-all", colorMap[color])} style={{ width: `${Math.min(100, value)}%` }} />
      </div>
    </div>
  );
}
