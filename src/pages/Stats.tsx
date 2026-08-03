import { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Server, Users, Hash, Terminal, RefreshCw, PowerOff } from 'lucide-react';

// ─── Types ────────────────────────────────────────────────────────────────────

interface BotStats {
  servers:          number;
  members:          number;
  channels:         number;
  commandsExecuted: number;
}

type Phase = 'loading' | 'online' | 'offline';

// ─── Config ───────────────────────────────────────────────────────────────────

// Always use a relative path — in dev Vite proxies /api → api-server.mjs,
// in production Vercel routes /api → the serverless function.
// No VITE_STATS_API_URL needed.
const INTERVAL = 5_000;

// ─── Helpers ──────────────────────────────────────────────────────────────────

function fmtNum(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000)     return `${(n / 1_000).toFixed(1)}K`;
  return n.toLocaleString();
}

// ─── Cards config ─────────────────────────────────────────────────────────────

const CARDS = [
  { key: 'servers',          icon: Server,   label: 'Servers'      },
  { key: 'members',          icon: Users,    label: 'Members'      },
  { key: 'channels',         icon: Hash,     label: 'Channels'     },
  { key: 'commandsExecuted', icon: Terminal, label: 'Commands Run' },
] as const;

// ─── Sub-components ───────────────────────────────────────────────────────────

function StatCard({ icon: Icon, label, value }: { icon: React.ElementType; label: string; value: string }) {
  return (
    <motion.div
      layout
      className="liquid-glass rounded-2xl p-6 flex flex-col gap-2"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="flex items-center gap-2 text-muted-foreground">
        <Icon className="h-3.5 w-3.5" />
        <span className="text-xs font-semibold uppercase tracking-widest">{label}</span>
      </div>
      <motion.p
        key={value}
        className="font-display font-extrabold text-3xl tracking-tight"
        initial={{ opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
      >
        {value}
      </motion.p>
    </motion.div>
  );
}

function SkeletonCard() {
  return (
    <div className="liquid-glass rounded-2xl p-6 flex flex-col gap-3 animate-pulse">
      <div className="h-3 w-20 rounded bg-muted-foreground/20" />
      <div className="h-8 w-16 rounded bg-muted-foreground/20" />
    </div>
  );
}

function OfflineCard() {
  return (
    <div className="liquid-glass rounded-2xl p-12 flex flex-col items-center gap-5 text-center">
      {/* PowerOff icon — immediately readable as "turned off", no red, muted primary glow */}
      <motion.div
        animate={{ opacity: [0.38, 0.72, 0.38] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        style={{ filter: 'drop-shadow(0 0 12px hsl(var(--primary) / 0.28))' }}
      >
        <PowerOff className="h-11 w-11 text-primary/55" strokeWidth={1.4} />
      </motion.div>
      <div>
        <p className="font-display font-semibold">Offline</p>
        <p className="text-sm text-muted-foreground mt-1 max-w-[220px] mx-auto">
          Stats are unavailable right now. Check back shortly.
        </p>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Stats() {
  const [phase, setPhase] = useState<Phase>('loading');
  const [data,  setData]  = useState<BotStats | null>(null);

  const fetchStats = useCallback(async () => {
    try {
      const res = await fetch('/api/stats', { signal: AbortSignal.timeout(8_000) });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json = (await res.json()) as BotStats;
      setData(json);
      setPhase('online');
    } catch {
      setPhase(prev => (prev === 'loading' ? 'offline' : prev === 'online' ? 'offline' : prev));
    }
  }, []);

  useEffect(() => {
    fetchStats();
    const id = setInterval(fetchStats, INTERVAL);
    return () => clearInterval(id);
  }, [fetchStats]);

  return (
    <section className="container max-w-3xl pt-8 pb-28 space-y-8">

      {/* ── Header ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55 }}
        className="flex items-center justify-between gap-4 flex-wrap"
      >
        <div>
          <span className="text-xs font-semibold uppercase tracking-widest text-primary">Live Stats</span>
          <h1 className="mt-1 font-display font-extrabold text-4xl md:text-5xl tracking-tight">
            Bot Statistics
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <AnimatePresence mode="wait">
            {phase === 'loading' ? (
              <motion.div key="loading"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="liquid-glass px-4 py-2 rounded-full flex items-center gap-2 text-sm text-muted-foreground">
                <span className="h-2 w-2 rounded-full bg-muted-foreground animate-pulse" />
                Connecting...
              </motion.div>
            ) : phase === 'online' ? (
              <motion.div key="online"
                initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
                className="liquid-glass px-4 py-2 rounded-full flex items-center gap-2 text-sm font-medium">
                <span className="relative h-2 w-2">
                  <span className="absolute inset-0 rounded-full bg-emerald-500 animate-ping opacity-60" />
                  <span className="relative h-2 w-2 rounded-full bg-emerald-500 block" />
                </span>
                Live
              </motion.div>
            ) : (
              <motion.div key="offline"
                initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
                className="liquid-glass px-4 py-2 rounded-full flex items-center gap-2 text-sm font-medium text-muted-foreground">
                {/* Hollow ring — contrasts the filled green Live dot */}
                <span className="h-2 w-2 rounded-full border border-primary/60 block opacity-70" />
                Offline
              </motion.div>
            )}
          </AnimatePresence>

          <button
            onClick={fetchStats}
            className="liquid-glass h-9 w-9 rounded-full grid place-items-center hover:scale-105 transition-transform"
            aria-label="Refresh"
          >
            <RefreshCw className="h-3.5 w-3.5" />
          </button>
        </div>
      </motion.div>

      {/* ── Content ── */}
      <AnimatePresence mode="wait">

        {phase === 'loading' && (
          <motion.div key="skeleton" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="grid grid-cols-2 gap-3">
            {Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)}
          </motion.div>
        )}

        {phase === 'offline' && (
          <motion.div key="offline" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <OfflineCard />
          </motion.div>
        )}

        {phase === 'online' && data && (
          <motion.div key="stats" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="grid grid-cols-2 gap-3">
              {CARDS.map(({ key, icon, label }) => (
                <StatCard key={key} icon={icon} label={label} value={fmtNum(data[key])} />
              ))}
            </div>
          </motion.div>
        )}

      </AnimatePresence>
    </section>
  );
}
