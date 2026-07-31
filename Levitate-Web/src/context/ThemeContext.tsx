import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from 'react';
import { themes, DEFAULT_THEME_ID, type Theme } from '@/config/themes';

// Apply a theme by writing its CSS variables directly to :root
function applyThemeVars(theme: Theme) {
  const root = document.documentElement;
  for (const [key, value] of Object.entries(theme.vars)) {
    root.style.setProperty(`--${key}`, value);
  }
}

interface ThemeCtx {
  theme: Theme;
  setTheme: (id: string) => void;
}

const ThemeContext = createContext<ThemeCtx | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [themeId, setThemeId] = useState<string>(() => {
    try { return localStorage.getItem('lev-theme') ?? DEFAULT_THEME_ID; }
    catch { return DEFAULT_THEME_ID; }
  });

  const theme = themes.find((t) => t.id === themeId) ?? themes[0]!;

  // Apply on mount + whenever theme changes
  useEffect(() => { applyThemeVars(theme); }, [theme]);

  const setTheme = useCallback((id: string) => {
    setThemeId(id);
    try { localStorage.setItem('lev-theme', id); } catch {}
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used inside ThemeProvider');
  return ctx;
}
