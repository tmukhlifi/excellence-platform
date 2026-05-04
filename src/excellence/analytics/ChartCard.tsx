import { ReactNode, useState } from "react";
import { Maximize2, Download, Info, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

type Props = {
  title: string;
  subtitle?: string;
  purpose?: string; // الهدف الإداري
  insight?: string; // توصية تحليلية
  children: ReactNode;
  className?: string;
  height?: number;
  rightAction?: ReactNode;
};

export function ChartCard({ title, subtitle, purpose, insight, children, className, height = 420, rightAction }: Props) {
  const [full, setFull] = useState(false);
  const handleExport = () => {
    toast.success("جارٍ تجهيز الرسم للتصدير", { description: "سيتم تصدير الرسم كصورة PNG ضمن التقرير التنفيذي." });
  };
  const inner = (collapsedHeight: number) => (
    <div className="flex-1 w-full" style={{ height: collapsedHeight }}>
      {children}
    </div>
  );
  return (
    <>
      <div className={cn("gov-card overflow-hidden flex flex-col bg-gradient-to-b from-card to-card/60", className)}>
        <div className="px-5 pt-4 pb-3 border-b border-border/50">
          <div className="flex items-start justify-between gap-3 mb-1">
            <div className="min-w-0">
              <h3 className="text-base font-bold text-foreground tracking-tight">{title}</h3>
              {subtitle && <p className="text-xs text-muted-foreground mt-0.5">{subtitle}</p>}
            </div>
            <div className="flex items-center gap-1 shrink-0">
              {rightAction}
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={handleExport} title="تصدير">
                <Download className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setFull(true)} title="عرض كامل">
                <Maximize2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
          {purpose && (
            <div className="flex items-start gap-1.5 text-[11px] text-muted-foreground bg-muted/40 rounded px-2 py-1 mt-1.5">
              <Info className="w-3 h-3 mt-0.5 text-info shrink-0" />
              <span>{purpose}</span>
            </div>
          )}
        </div>
        {inner(height)}
        {insight && (
          <div className="border-t border-border/50 px-4 py-2.5 bg-accent/30 flex items-start gap-2">
            <Lightbulb className="w-3.5 h-3.5 text-gold mt-0.5 shrink-0" />
            <p className="text-[11px] text-accent-foreground/90 leading-relaxed"><span className="font-bold">توصية تحليلية: </span>{insight}</p>
          </div>
        )}
      </div>

      <Dialog open={full} onOpenChange={setFull}>
        <DialogContent className="max-w-[95vw] w-[95vw] h-[90vh] flex flex-col p-0 gap-0">
          <DialogTitle className="px-6 py-4 border-b text-lg">{title}</DialogTitle>
          <div className="flex-1 p-4 overflow-auto">
            {inner(window.innerHeight - 180)}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}