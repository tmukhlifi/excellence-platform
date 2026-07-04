import { useI18n } from "@/i18n/I18nProvider";
import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";
import { cn } from "@/lib/utils";

export function LanguageSwitcher({ compact = false }: { compact?: boolean }) {
  const { lang, toggle } = useI18n();
  if (compact) {
    return (
      <Button
        variant="ghost"
        size="icon"
        onClick={toggle}
        title={lang === "ar" ? "Switch to English" : "التبديل إلى العربية"}
        className="text-foreground/80 hover:text-foreground"
      >
        <Globe className="w-4 h-4" />
        <span className="text-[10px] font-bold absolute bottom-0 right-0.5">
          {lang === "ar" ? "EN" : "ع"}
        </span>
      </Button>
    );
  }
  return (
    <div className="inline-flex items-center bg-muted/40 rounded-md border border-border p-0.5 text-xs">
      <button
        onClick={() => lang !== "ar" && toggle()}
        className={cn(
          "px-2.5 py-1 rounded-sm font-semibold transition",
          lang === "ar" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
        )}
      >
        العربية
      </button>
      <button
        onClick={() => lang !== "en" && toggle()}
        className={cn(
          "px-2.5 py-1 rounded-sm font-semibold transition",
          lang === "en" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
        )}
      >
        EN
      </button>
    </div>
  );
}
