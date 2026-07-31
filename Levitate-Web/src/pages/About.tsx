import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Github } from 'lucide-react';
import { developerConfig } from '@/config/developer';

/* ─── Language badge icons ────────────────────────────────────────────────── */
function JavaScriptIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none">
      <rect width="24" height="24" rx="5" fill="#F7DF1E" />
      <path
        fill="#000"
        d="M16.32 16.6c.33.54.76.94 1.52.94.64 0 1.05-.32 1.05-.76 0-.53-.42-.72-1.12-1.02l-.38-.17c-1.11-.47-1.85-1.07-1.85-2.33 0-1.16.88-2.04 2.27-2.04.98 0 1.69.34 2.2 1.24l-1.2.78c-.27-.48-.56-.67-1-.67-.46 0-.75.29-.75.67 0 .47.29.66.94.94l.38.16c1.31.56 2.05 1.14 2.05 2.44 0 1.4-1.1 2.16-2.57 2.16-1.44 0-2.37-.68-2.83-1.58l1.29-.76ZM9.9 16.72c.24.43.46.79.98.79.5 0 .82-.2.82-.96v-5.2h1.65v5.22c0 1.71-1 2.49-2.46 2.49-1.32 0-2.08-.68-2.47-1.5l1.48-.84Z"
      />
    </svg>
  );
}

function TypeScriptIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none">
      <rect width="24" height="24" rx="5" fill="#3178C6" />
      <path
        fill="#fff"
        d="M12.86 12.28h2.7v-1.4H8.9v1.4h2.69v7.4h1.27v-7.4ZM17.6 19.5c-.5 0-.95-.08-1.34-.24a2.9 2.9 0 0 1-.98-.66 2.6 2.6 0 0 1-.55-.94l1.14-.5c.13.36.34.65.6.86.28.2.63.31 1.05.31.24 0 .45-.03.63-.1a1 1 0 0 0 .43-.29.7.7 0 0 0 .15-.45c0-.2-.06-.36-.19-.49a1.7 1.7 0 0 0-.5-.33 6.8 6.8 0 0 0-.68-.26l-.6-.21a4.3 4.3 0 0 1-.87-.42 1.94 1.94 0 0 1-.62-.63 1.76 1.76 0 0 1-.23-.93c0-.42.11-.78.32-1.08.22-.31.51-.54.88-.7a3.2 3.2 0 0 1 1.24-.24c.62 0 1.15.14 1.58.42.44.27.75.65.92 1.13l-1.1.5a1.4 1.4 0 0 0-.51-.63 1.4 1.4 0 0 0-.82-.23c-.22 0-.4.03-.56.1a.86.86 0 0 0-.37.27.68.68 0 0 0-.13.42c0 .2.08.36.24.5.16.13.4.25.72.36l.6.2c.4.14.75.3 1.07.48.32.19.57.41.75.68.19.27.28.6.28 1 0 .43-.12.8-.36 1.11-.23.32-.55.56-.96.73-.4.16-.86.24-1.36.24Z"
      />
    </svg>
  );
}

/* ─── Rotating gradient avatar ring ──────────────────────────────────────── */
function Avatar({
  src, fallbackChar, size = 'lg',
}: { src?: string; fallbackChar: string; size?: 'sm' | 'lg' }) {
  const dim  = size === 'lg' ? 'h-32 w-32' : 'h-20 w-20';
  const text = size === 'lg' ? 'text-4xl'  : 'text-2xl';
  const pad  = size === 'lg' ? 4             : 3;

  return (
    <div className={`relative ${dim} mx-auto`}>
      {/* Rotating aurora ring */}
      <motion.div
        className={`absolute inset-0 rounded-full bg-aurora`}
        style={{ padding: pad, backgroundSize: '300% 300%' }}
        animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
      />
      {/* Inner */}
      <div
        className="absolute rounded-full overflow-hidden bg-card"
        style={{ inset: pad }}
      >
        {src ? (
          <img src={src} alt={fallbackChar} className="h-full w-full object-cover" />
        ) : (
          <div className="h-full w-full bg-aurora grid place-items-center" style={{ backgroundSize: '300% 300%' }}>
            <span className={`font-display font-extrabold text-white select-none ${text}`}>
              {fallbackChar}
            </span>
          </div>
        )}
      </div>
      {/* Glow behind */}
      <div
        className="absolute inset-0 rounded-full bg-aurora opacity-30 blur-2xl -z-10 scale-125"
        style={{ backgroundSize: '300% 300%' }}
      />
    </div>
  );
}

/* ─── Page ──────────────────────────────────────────────────────────────── */
export default function About() {
  useEffect(() => { document.title = `About | Levitate`; }, []);

  return (
    <section className="container max-w-3xl pt-8 pb-28">

      {/* ── Header ── */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <span className="text-xs font-semibold uppercase tracking-widest text-primary">About</span>
        <h1 className="mt-3 font-display font-extrabold text-5xl md:text-6xl tracking-tight">
          One developer.{' '}
          <span
            style={{
              background:           'var(--gradient-text)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor:  'transparent',
              backgroundClip:       'text',
            }}
          >
            One vision.
          </span>
        </h1>
      </motion.div>

      {/* ── Developer card ── */}
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.97 }}
        animate={{ opacity: 1, y: 0,  scale: 1 }}
        transition={{ duration: 0.7, delay: 0.15, ease: [0.34, 1.56, 0.64, 1] }}
        className="liquid-glass rounded-3xl p-10 text-center relative overflow-hidden"
      >
        {/* Ambient glow behind card */}
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{ background: 'var(--gradient-aurora)', backgroundSize: '300% 300%' }}
        />

        {/* Top shimmer line */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 h-px w-3/4 opacity-40"
          style={{ background: 'var(--gradient-aurora)', backgroundSize: '300% 100%' }}
        />

        <Avatar
          src={developerConfig.avatar || undefined}
          fallbackChar={developerConfig.name[0]}
          size="lg"
        />

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="mt-6"
        >
          <h2 className="font-display font-bold text-3xl">{developerConfig.name}</h2>
          <div className="mt-2 badge-lavender inline-block">Creator & Developer</div>
          <p className="mt-5 text-muted-foreground text-sm leading-relaxed max-w-sm mx-auto">
            {developerConfig.description}
          </p>
        </motion.div>

        {/* Social links */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
          className="mt-7 flex items-center justify-center gap-3 max-w-sm mx-auto"
        >
          <span className="flex-1 inline-flex items-center justify-center gap-2 liquid-glass px-5 py-2.5 rounded-full text-sm font-medium">
            <svg className="h-4 w-4 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057.101 18.08.112 18.1.13 18.115a19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z"/>
            </svg>
            @{developerConfig.discordUsername}
          </span>
          <a
            href={developerConfig.githubUrl}
            target="_blank"
            rel="noreferrer"
            className="flex-1 inline-flex items-center justify-center gap-2 liquid-glass px-5 py-2.5 rounded-full text-sm font-medium hover:scale-105 transition-transform"
          >
            <Github className="h-4 w-4 flex-shrink-0" />
            GitHub
          </a>
        </motion.div>

        {/* Languages */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-3 flex items-center justify-center gap-3 max-w-md mx-auto"
        >
          {developerConfig.languages.map((lang) => (
            <div
              key={lang.id}
              className="flex-1 liquid-glass rounded-2xl px-4 py-3 flex items-center justify-center gap-2.5"
            >
              {lang.id === 'javascript' ? (
                <JavaScriptIcon className="h-6 w-6 rounded flex-shrink-0" />
              ) : (
                <TypeScriptIcon className="h-6 w-6 rounded flex-shrink-0" />
              )}
              <span className="text-sm font-medium">{lang.label}</span>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
