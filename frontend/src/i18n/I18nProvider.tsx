import { createContext, useContext, useEffect, useMemo, useState, ReactNode } from "react";
import { enDict } from "./dictionary";

export type Lang = "ar" | "en";

interface I18nCtx {
  lang: Lang;
  dir: "rtl" | "ltr";
  setLang: (l: Lang) => void;
  toggle: () => void;
  t: (s: string) => string;
}

const Ctx = createContext<I18nCtx | null>(null);

function getInitial(): Lang {
  if (typeof window === "undefined") return "ar";
  const stored = localStorage.getItem("app_lang");
  if (stored === "ar" || stored === "en") return stored;
  return "ar";
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(getInitial);

  const setLang = (l: Lang) => {
    setLangState(l);
    if (typeof window !== "undefined") {
      localStorage.setItem("app_lang", l);
    }
  };

  const dir = lang === "ar" ? "rtl" : "ltr";

  // Sync HTML attributes
  useEffect(() => {
    if (typeof document === "undefined") return;
    document.documentElement.lang = lang;
    document.documentElement.dir = dir;
    document.body.dir = dir;
    document.body.classList.toggle("lang-en", lang === "en");
    document.body.classList.toggle("lang-ar", lang === "ar");
  }, [lang, dir]);

  const t = useMemo(() => {
    if (lang === "ar") {
      // No-op in Arabic — return Arabic key as-is
      return (s: string) => s;
    }
    return (s: string) => {
      if (s == null) return s;
      const key = String(s);
      // Direct lookup
      if (enDict[key]) return enDict[key];
      // Trim whitespace
      const trimmed = key.trim();
      if (trimmed !== key && enDict[trimmed]) return enDict[trimmed];
      // Fallback: return original (helpful while building translations)
      return key;
    };
  }, [lang]);

  const value: I18nCtx = {
    lang,
    dir,
    setLang,
    toggle: () => setLang(lang === "ar" ? "en" : "ar"),
    t,
  };

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useI18n() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useI18n must be used inside <I18nProvider>");
  return ctx;
}

/** Shorthand hook returning just the translation function */
export function useT() {
  return useI18n().t;
}
