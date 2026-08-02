import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { themes } from '@/config/themes';
import { useTheme } from '@/context/ThemeContext';

export default function ThemeSwitcher() {
  const { theme: active, setTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const show = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setOpen(true);
  };
  const hide = () => {
    timeoutRef.current = setTimeout(() => setOpen(false), 120);
  };

  const darkThemes  = themes.filter(t => t.mode === 'dark');
  const lightThemes = themes.filter(t => t.mode === 'light');

  const ThemeRow = ({ t }: { t: (typeof themes)[0] }) => {
    const isActive = t.id === active.id;
    return (
      <button
        key={t.id}
        onClick={() => { setTheme(t.id); }}
        className="flex items-center gap-3 px-2 py-1.5 rounded-xl hover:bg-white/8 transition-colors duration-150 text-left group w-full"
      >
        {/* Colour circle */}
        <span
          className="h-6 w-6 rounded-full flex-shrink-0 transition-transform duration-200 group-hover:scale-110"
          style={{
            background:  t.previewGradient,
            boxShadow:   isActive
              ? '0 0 0 2.5px hsl(var(--foreground) / 0.85)'
              : '0 0 0 1.5px hsl(var(--border) / 0.5)',
          }}
        />
        {/* Label */}
        <span
          className={`text-xs font-medium transition-colors ${
            isActive ? 'text-foreground' : 'text-muted-foreground group-hover:text-foreground'
          }`}
        >
          {t.name}
        </span>

        {/* Active dot */}
        {isActive && (
          <motion.span
            layoutId="theme-active-dot"
            className="ml-auto h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0"
          />
        )}
      </button>
    );
  };

  return (
    <div
      className="relative flex items-center"
      onMouseEnter={show}
      onMouseLeave={hide}
    >
      {/* Trigger — flat rounded-square colour chip */}
      <button
        aria-label="Switch colour theme"
        className="h-7 w-7 rounded-lg flex-shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40 transition-transform duration-200 hover:scale-110 ring-1 ring-white/15 hover:ring-white/35"
        style={{ background: active.previewGradient }}
      />

      {/* Dropdown */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.95 }}
            animate={{ opacity: 1, y: 0,  scale: 1 }}
            exit={{   opacity: 0, y: -6,  scale: 0.95 }}
            transition={{ duration: 0.18, ease: [0.4, 0, 0.2, 1] }}
            className="absolute top-full right-0 mt-2.5 z-[60]"
            style={{ transformOrigin: 'top right' }}
          >
            {/* Panel */}
            <div
              className="liquid-glass rounded-2xl p-3 flex flex-col gap-1 min-w-[168px]"
              style={{
                boxShadow: 'var(--shadow-glass)',
                background: 'hsl(var(--glass-bg) / 0.92)',
              }}
              onMouseEnter={show}
              onMouseLeave={hide}
            >
              {/* Dark section */}
              <p className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground px-2 pt-0.5 pb-1">
                Dark
              </p>
              {darkThemes.map(t => <ThemeRow key={t.id} t={t} />)}

              {/* Divider */}
              <div className="my-1.5 border-t border-border/30" />

              {/* Light section */}
              <p className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground px-2 pb-1">
                Light
              </p>
              {lightThemes.map(t => <ThemeRow key={t.id} t={t} />)}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
