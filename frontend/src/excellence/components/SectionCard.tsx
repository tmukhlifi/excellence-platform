import { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function SectionCard({
  title, description, icon: Icon, action, children, className,
}: { title: string; description?: string; icon?: any; action?: ReactNode; children: ReactNode; className?: string }) {
  return (
    <div className={cn("gov-card", className)}>
      <div className="flex items-center justify-between p-4 border-b border-border/60">
        <div className="flex items-center gap-2">
          {Icon && <Icon className="w-4 h-4 text-primary" />}
          <div>
            <h3 className="text-sm font-bold text-foreground">{title}</h3>
            {description && <p className="text-xs text-muted-foreground mt-0.5">{description}</p>}
          </div>
        </div>
        {action}
      </div>
      <div className="p-4">{children}</div>
    </div>
  );
}