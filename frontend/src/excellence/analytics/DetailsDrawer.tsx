import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { CATEGORY_LABELS } from "./AnalyticsContext";

export function DetailsDrawer({ open, onOpenChange, data }: { open: boolean; onOpenChange: (v: boolean) => void; data: any }) {
  if (!data) return null;
  const m = data.meta || {};
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="left" className="w-[420px] sm:max-w-[420px] overflow-y-auto">
        <SheetHeader>
          <Badge variant="secondary" className="w-fit text-[10px]">{CATEGORY_LABELS[data.type] || data.type}</Badge>
          <SheetTitle className="text-right text-base">{m.name || m.title || data.label}</SheetTitle>
          {m.description && <SheetDescription className="text-right">{m.description}</SheetDescription>}
        </SheetHeader>
        <div className="mt-5 space-y-3 text-sm">
          {Object.entries(m).filter(([k]) => !["id","name","title","description"].includes(k)).map(([k, v]) => (
            <div key={k} className="flex justify-between gap-2 border-b border-border/40 pb-2">
              <span className="text-muted-foreground text-xs">{k}</span>
              <span className="font-medium text-xs text-foreground text-left max-w-[60%] break-words">
                {Array.isArray(v) ? v.join(", ") || "—" : String(v) || "—"}
              </span>
            </div>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
}