import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { useT } from "@/i18n/I18nProvider";

export function WorkflowStepper({ steps, current }: { steps: string[]; current: string }) {
  const t = useT();
  const idx = steps.indexOf(current);
  return (
    <div className="flex items-center gap-1 overflow-x-auto py-2">
      {steps.map((s, i) => {
        const done = i < idx;
        const active = i === idx;
        return (
          <div key={s} className="flex items-center shrink-0">
            <div className={cn(
              "flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] border whitespace-nowrap",
              done && "bg-success/15 text-success border-success/30",
              active && "bg-primary text-primary-foreground border-primary font-bold",
              !done && !active && "bg-muted text-muted-foreground border-border"
            )}>
              {done && <Check className="w-3 h-3" />}
              <span>{t(s)}</span>
            </div>
            {i < steps.length - 1 && <div className="w-3 h-px bg-border mx-0.5" />}
          </div>
        );
      })}
    </div>
  );
}

export function Breadcrumb({ items }: { items: { label: string; href?: string }[] }) {
  const t = useT();
  return (
    <nav className="flex items-center gap-1.5 text-xs text-muted-foreground mb-2 flex-wrap">
      {items.map((it, i) => (
        <span key={i} className="flex items-center gap-1.5">
          {it.href ? <a href={it.href} className="hover:text-primary">{t(it.label)}</a> : <span className="text-foreground font-medium">{t(it.label)}</span>}
          {i < items.length - 1 && <span>/</span>}
        </span>
      ))}
    </nav>
  );
}

export function EmptyState({ icon: Icon, title, description, action }: { icon: any; title: string; description?: string; action?: React.ReactNode }) {
  const t = useT();
  return (
    <div className="text-center py-12 px-4">
      <div className="w-14 h-14 rounded-full bg-muted/50 mx-auto flex items-center justify-center mb-3">
        <Icon className="w-6 h-6 text-muted-foreground" />
      </div>
      <h3 className="text-sm font-bold text-foreground mb-1">{t(title)}</h3>
      {description && <p className="text-xs text-muted-foreground mb-3 max-w-md mx-auto">{t(description)}</p>}
      {action}
    </div>
  );
}