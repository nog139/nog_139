import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import type { Lang } from "./content";

type Theme = "dark" | "light";
type Prefs = {
  lang: Lang;
  theme: Theme;
  setLang: (lang: Lang) => void;
  toggleTheme: () => void;
  tr: (entry: Record<Lang, string>) => string;
};

const PrefsContext = createContext<Prefs | null>(null);

function read(key: string) {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

function write(key: string, value: string) {
  try {
    localStorage.setItem(key, value);
  } catch {}
}

export function PrefsProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => {
    const saved = read("lang");
    if (saved === "pt" || saved === "en") return saved;
    return navigator.language.toLowerCase().startsWith("pt") ? "pt" : "en";
  });
  const [theme, setTheme] = useState<Theme>(() => (read("theme") === "light" ? "light" : "dark"));

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", theme === "dark");
    root.dataset.theme = theme;
    write("theme", theme);
  }, [theme]);

  useEffect(() => {
    document.documentElement.lang = lang === "pt" ? "pt-BR" : "en";
    write("lang", lang);
  }, [lang]);

  const tr = useCallback((entry: Record<Lang, string>) => entry[lang], [lang]);

  return (
    <PrefsContext.Provider
      value={{
        lang,
        theme,
        setLang: setLangState,
        toggleTheme: () => setTheme((t) => (t === "dark" ? "light" : "dark")),
        tr,
      }}
    >
      {children}
    </PrefsContext.Provider>
  );
}

export function usePrefs() {
  const ctx = useContext(PrefsContext);
  if (!ctx) throw new Error("usePrefs must be used inside PrefsProvider");
  return ctx;
}
