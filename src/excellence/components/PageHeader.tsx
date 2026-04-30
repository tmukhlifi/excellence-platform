import { ReactNode } from "react";

export function PageHeader({
  title, subtitle, actions, icon: Icon,
}: { title: string; subtitle?: string; actions?: ReactNode; icon?: any }) {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6 pb-4 border-b border-border">
      <div className="flex items-start gap-3">
        {Icon && (
          <div className="w-11 h-11 rounded-lg gov-gradient flex items-center justify-center shrink-0 shadow-md">
            <Icon className="w-5 h-5 text-primary-foreground" />
          </div>
        )}
        <div>
          <h1 className="text-2xl font-bold text-foreground tracking-tight">{title}</h1>
          {subtitle && <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>}
        </div>
      </div>
      {actions && <div className="flex flex-wrap gap-2">{actions}</div>}
    </div>
  );
}