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
  // Decorative SVGs consume these semantic tokens, so their colours follow
  // every preset without duplicating artwork palettes in each component.
  root.style.setProperty('--decor-1', 'var(--primary)');
  root.style.setProperty('--decor-2', 'var(--accent)');
  root.style.setProperty('--decor-3', 'var(--primary-glow)');
  root.style.setProperty('--decor-4', 'var(--secondary)');
  root.style.setProperty('--decor-light', 'var(--foreground)');
  root.style.setProperty('--decor-dark', 'var(--background)');
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
