import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { announcements } from '@/config/announcements';

/**
 * Persistent, non-dismissable corner badge that cycles through the
 * messages configured in `src/config/announcements.ts`.
 */
export default function AnnouncementBadge() {
  const { messages, intervalMs } = announcements;
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (messages.length < 2) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % messages.length);
    }, intervalMs);
    return () => clearInterval(id);
  }, [messages.length, intervalMs]);

  if (messages.length === 0) return null;

  return (
    <div className="fixed bottom-4 left-4 z-40 pointer-events-none hidden sm:block max-w-[calc(100vw-2rem)]">
      <div
        className="liquid-glass rounded-full pl-3 pr-4 py-2 flex items-center gap-2 shadow-[var(--shadow-glow)] max-w-[420px]"
        style={{ boxShadow: '0 8px 30px hsl(227 70% 68% / 0.18), 0 0 0 1px hsl(var(--border) / 0.4)' }}
      >
        <span
          className="h-6 w-6 rounded-full grid place-items-center flex-shrink-0 bg-aurora animate-aurora"
          style={{ backgroundSize: '300% 300%' }}
        >
          <Sparkles className="h-3 w-3 text-white" />
        </span>
        <div className="relative h-4 overflow-hidden text-xs font-medium text-foreground/90 whitespace-nowrap text-ellipsis min-w-0">
          <AnimatePresence mode="wait">
            <motion.span
              key={index}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
              className="block overflow-hidden text-ellipsis whitespace-nowrap"
            >
              {messages[index].slice(0, 100)}
            </motion.span>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
