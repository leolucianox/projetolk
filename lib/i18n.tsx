"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { getContent, type Lang } from "@/lib/data";

type LanguageState = {
  lang: Lang;
  setLang: (l: Lang) => void;
  toggle: () => void;
};

const LanguageContext = createContext<LanguageState | null>(null);

const STORAGE_KEY = "lw-lang";

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>("pt");

  // Restore the saved preference on mount (PT is the default).
  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved === "pt" || saved === "en") setLang(saved);
  }, []);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, lang);
    document.documentElement.lang = lang === "pt" ? "pt-BR" : "en";
  }, [lang]);

  const toggle = useCallback(() => setLang((l) => (l === "pt" ? "en" : "pt")), []);

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggle }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLang must be used within a LanguageProvider");
  return ctx;
}

/** Localized content for the active language. */
export function useContent() {
  const { lang } = useLang();
  return getContent(lang);
}

export type { Lang };
