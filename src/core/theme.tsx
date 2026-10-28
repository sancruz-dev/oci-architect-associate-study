import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { readJSON, writeJSON } from './storage';

export type ThemeChoice = 'system' | 'light' | 'dark';

const THEME_KEY = 'oci-study:v1:theme';

interface ThemeApi {
  theme: ThemeChoice;
  setTheme(t: ThemeChoice): void;
}

const ThemeContext = createContext<ThemeApi | null>(null);

function loadTheme(): ThemeChoice {
  const saved = readJSON<unknown>(THEME_KEY, 'system');
  return saved === 'light' || saved === 'dark' ? saved : 'system';
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<ThemeChoice>(loadTheme);

  // "system" não escreve atributo: quem decide é o prefers-color-scheme do CSS.
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'system') delete root.dataset.theme;
    else root.dataset.theme = theme;
    writeJSON(THEME_KEY, theme);
  }, [theme]);

  const value = useMemo(() => ({ theme, setTheme }), [theme]);
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme(): ThemeApi {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme precisa estar dentro de <ThemeProvider>.');
  return ctx;
}
