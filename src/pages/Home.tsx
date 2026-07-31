import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  motion,
  useMotionValue, useSpring, useTransform, useInView,
  AnimatePresence,
} from 'framer-motion';
import { ExternalLink, ArrowRight, Terminal, ChevronDown, ChevronUp } from 'lucide-react';
import { site } from '@/config/site';
import starSticker from '@/assets/stickers/star.png';
import moonSticker from '@/assets/stickers/moon.png';
import cloudSticker from '@/assets/stickers/cloud.png';
import shieldSticker from '@/assets/stickers/shield.png';
import orbSticker from '@/assets/stickers/orb.png';

/** A floating, gently bobbing decorative sticker image. */
function FloatingSticker({
  src, alt, className, size = 56, duration = 5, delay = 0, rotate = 8,
}: {
  src: string; alt: string; className?: string; size?: number;
  duration?: number; delay?: number; rotate?: number;
}) {
  return (
    <motion.img
      src={src}
      alt={alt}
      draggable={false}
      className={`pointer-events-none select-none drop-shadow-[0_8px_24px_hsl(227_95%_71%/0.45)] ${className ?? ''}`}
      style={{ width: size, height: size }}
      animate={{ y: [0, -14, 0], rotate: [-rotate, rotate, -rotate] }}
      transition={{ duration, delay, repeat: Infinity, ease: 'easeInOut' }}
    />
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   Shared primitives
───────────────────────────────────────────────────────────────────────────── */

/**
 * Gradient-filled reveal for a single word.
 *
 * Deliberately NOT split into per-character spans: `-webkit-background-clip:
 * text` on a wrapper breaks (renders fully invisible) as soon as a *child*
 * gets its own transform/opacity animation, because that promotes the child
 * to its own compositing layer and the clip no longer paints through. The
 * whole word must carry both the clip and the motion together.
 */
function GradientReveal({
  text, delay = 0, className,
}: { text: string; delay?: number; className?: string }) {
  return (
    <motion.span
      className={`whitespace-nowrap ${className ?? ''}`}
      style={{
        background:           'var(--gradient-aurora)',
        backgroundSize:       '300% 300%',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor:  'transparent',
        backgroundClip:       'text',
      }}
      initial={{ opacity: 0, y: 24 }}
      animate={{
        opacity: 1, y: 0,
        backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
      }}
      transition={{
        opacity: { duration: 0.6, delay, ease: [0.4, 0, 0.2, 1] },
        y:       { duration: 0.6, delay, ease: [0.4, 0, 0.2, 1] },
        backgroundPosition: { duration: 7, repeat: Infinity, ease: 'linear' },
      }}
    >
      {text}
    </motion.span>
  );
}

/** Spring-driven count-up that starts when element enters viewport */
function AnimatedNumber({ to, suffix = '' }: { to: number; suffix?: string }) {
  const ref    = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const spring = useSpring(0, { mass: 1, stiffness: 36, damping: 16 });
  const display = useTransform(spring, (v) => `${Math.floor(v)}${suffix}`);

  useEffect(() => { if (inView) spring.set(to); }, [inView, to, spring]);

  return <motion.span ref={ref}>{display}</motion.span>;
}

/** 3-D tilt card with live shine overlay */
function TiltCard({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const px  = useMotionValue(0.5);
  const py  = useMotionValue(0.5);
  const rx  = useTransform(py, [0, 1], [9,  -9]);
  const ry  = useTransform(px, [0, 1], [-9,  9]);

  const shineX = useTransform(px, [0, 1], ['0%',   '100%']);
  const shineY = useTransform(py, [0, 1], ['0%',   '100%']);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    px.set((e.clientX - r.left) / r.width);
    py.set((e.clientY - r.top)  / r.height);
  };
  const onLeave = () => { px.set(0.5); py.set(0.5); };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ rotateX: rx, rotateY: ry, transformStyle: 'preserve-3d', perspective: 900 }}
      className={`relative group ${className ?? ''}`}
    >
      {/* Shine overlay — follows cursor */}
      <motion.div
        className="absolute inset-0 rounded-2xl pointer-events-none z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle at ${shineX} ${shineY},
            hsl(228 80% 96% / 0.13) 0%,
            transparent 58%)`,
        }}
      />
      {children}
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   Hero
───────────────────────────────────────────────────────────────────────────── */
function Hero() {
  const stageRef = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0); const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 70, damping: 15, mass: 0.5 });
  const sy = useSpring(my, { stiffness: 70, damping: 15, mass: 0.5 });

  const glowX  = useTransform(sx, (v) => v * 18);
  const glowY  = useTransform(sy, (v) => v * 18);
  const cardAX = useTransform(sx, (v) => v * -20);
  const cardAY = useTransform(sy, (v) => v * -20);
  const cardBX = useTransform(sx, (v) => v * 22);
  const cardBY = useTransform(sy, (v) => v * 22);

  const onMove  = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = stageRef.current?.getBoundingClientRect();
    if (!r) return;
    mx.set((e.clientX - r.left) / r.width  - 0.5);
    my.set((e.clientY - r.top)  / r.height - 0.5);
  };
  const onLeave = () => { mx.set(0); my.set(0); };

  return (
    <section className="container max-w-5xl pt-6 pb-28 relative">
      <div className="grid lg:grid-cols-2 gap-14 items-center">

        {/* Left */}
        <motion.div
          initial={{ opacity: 0, x: -32 }}
          animate={{ opacity: 1,  x: 0 }}
          transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1,  y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 liquid-glass rounded-full px-4 py-1.5 text-xs font-medium"
          >
            ✨ Moderation · Antinuke · Utility
          </motion.div>

          {/* Headline */}
          <h1 className="mt-6 font-display font-extrabold text-5xl md:text-6xl lg:text-[5rem] leading-[1.02] tracking-tight">
            Meet{' '}
            <GradientReveal text="Levitate" delay={0.25} />
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1 }}
            className="mt-3 font-display text-xl font-medium text-muted-foreground"
          >
            {site.bot.tagline}
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.25 }}
            className="mt-5 text-base text-muted-foreground leading-relaxed max-w-lg"
          >
            {site.bot.description}
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1,  y: 0 }}
            transition={{ delay: 1.35, ease: [0.34, 1.56, 0.64, 1] }}
            className="mt-8 flex flex-wrap gap-3"
          >
            <a
              href={site.bot.inviteUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 bg-aurora text-white font-bold px-7 py-3.5 rounded-full shadow-[var(--shadow-glow)] hover:opacity-90 hover:scale-[1.04] transition-all [transition-duration:300ms]"
              style={{ animation: 'aurora 3s linear infinite' }}
            >
              Add to Discord <ExternalLink className="h-4 w-4" />
            </a>
            <a
              href={site.bot.supportUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 liquid-glass font-semibold px-7 py-3.5 rounded-full hover:scale-[1.03] transition-all duration-300 text-sm"
            >
              Support Server
            </a>
          </motion.div>

          {/* Stats */}
          <div className="mt-10 flex gap-4 flex-wrap">
            {[
              { label: 'Commands', to: site.bot.commandCount, suffix: '+' },
              { label: 'Uptime',   to: 99,                    suffix: '.9%' },
              { label: 'Prefix',   to: null,                  literal: site.bot.prefix },
            ].map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1,  y: 0 }}
                transition={{ delay: 1.45 + i * 0.12, ease: [0.34, 1.56, 0.64, 1] }}
                className="liquid-glass rounded-2xl px-5 py-4 text-center min-w-[90px]"
              >
                <div
                  className="text-2xl font-display font-bold"
                  style={{
                    background:           'var(--gradient-text)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor:  'transparent',
                    backgroundClip:       'text',
                  }}
                >
                  {s.to !== null
                    ? <AnimatedNumber to={s.to} suffix={s.suffix} />
                    : s.literal
                  }
                </div>
                <div className="text-xs text-muted-foreground mt-1">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Right — parallax stage */}
        <motion.div
          initial={{ opacity: 0, scale: 0.88 }}
          animate={{ opacity: 1,  scale: 1 }}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.34, 1.56, 0.64, 1] }}
          className="relative flex items-center justify-center"
        >
          <div
            ref={stageRef}
            onMouseMove={onMove}
            onMouseLeave={onLeave}
            className="relative w-full max-w-sm aspect-square"
            style={{ perspective: 1000 }}
          >
            {/* Glow */}
            <motion.div
              className="absolute inset-10 rounded-full blur-3xl opacity-55 animate-pulse-glow"
              style={{
                background:     'var(--gradient-aurora)',
                backgroundSize: '300% 300%',
                x: glowX, y: glowY,
              }}
            />
            {/* Central logo */}
            <div className="absolute inset-0 grid place-items-center">
              <motion.div
                animate={{ y: [0, -18, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                className="h-44 w-44 rounded-[2.5rem] bg-aurora animate-aurora shadow-[0_30px_80px_hsl(262_70%_73%/0.6)] grid place-items-center relative overflow-hidden"
              >
                {/* Inner shimmer */}
                <motion.div
                  className="absolute inset-0"
                  style={{ background: 'linear-gradient(135deg, hsl(228 80% 96% / 0.25) 0%, transparent 50%)' }}
                  animate={{ opacity: [0.4, 0.9, 0.4] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                />
                {site.bot.botAvatar ? (
                  <img src={site.bot.botAvatar} alt={site.bot.name} className="h-full w-full object-cover" />
                ) : (
                  <span className="relative font-display font-extrabold text-white text-7xl select-none">
                    L
                  </span>
                )}
              </motion.div>
            </div>

            {/* Card A */}
            <motion.div
              className="absolute top-4 right-0 liquid-glass rounded-2xl px-4 py-3 text-sm"
              style={{ x: cardAX, y: cardAY }}
            >
              <div className="text-xs text-muted-foreground">Protection</div>
              <div
                className="font-display font-bold"
                style={{ background: 'var(--gradient-text)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}
              >
                11 Modules
              </div>
            </motion.div>

            {/* Card B */}
            <motion.div
              className="absolute bottom-8 left-0 liquid-glass rounded-2xl px-4 py-3 text-sm"
              style={{ x: cardBX, y: cardBY }}
            >
              <div className="text-xs text-muted-foreground">Commands</div>
              <div
                className="font-display font-bold"
                style={{ background: 'var(--gradient-text)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}
              >
                {site.bot.commandCount}+
              </div>
            </motion.div>

            {/* Floating cute stickers */}
            <FloatingSticker src={starSticker}   alt="" className="absolute -top-6 left-6 z-20"     size={52} duration={4.5} delay={0}   rotate={10} />
            <FloatingSticker src={moonSticker}   alt="" className="absolute top-1/3 -right-8 z-20"  size={48} duration={5.5} delay={0.6} rotate={8} />
            <FloatingSticker src={cloudSticker}  alt="" className="absolute -bottom-4 right-1/4 z-20" size={58} duration={6} delay={1.1} rotate={6} />
            <FloatingSticker src={orbSticker}    alt="" className="absolute bottom-1/4 -left-10 z-20" size={44} duration={5} delay={1.6} rotate={12} />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   Features
───────────────────────────────────────────────────────────────────────────── */
function Features() {
  return (
    <section className="container max-w-5xl py-20 relative">
      <FloatingSticker src={shieldSticker} alt="" className="absolute -top-4 right-4 md:right-16 hidden sm:block" size={64} duration={5.5} rotate={7} />
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center max-w-2xl mx-auto"
      >
        <span className="text-xs font-semibold uppercase tracking-widest text-primary">✨ What it does</span>
        <h2 className="mt-3 font-display font-bold text-4xl md:text-5xl tracking-tight">
          Everything your server needs
        </h2>
        <p className="mt-4 text-muted-foreground max-w-md mx-auto text-sm">
          Every command built tight. Every interaction refined and shipped as Components V2.
        </p>
      </motion.div>

      <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-5" style={{ perspective: 1200 }}>
        {site.features.map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.55, delay: i * 0.07 }}
          >
            <TiltCard className="liquid-glass rounded-2xl p-7 h-full cursor-default">
              <motion.div
                className="h-12 w-12 rounded-xl bg-aurora grid place-items-center mb-5 shadow-[var(--shadow-glow)] group-hover:rotate-6 transition-transform [transition-duration:500ms]"
                style={{ animation: 'aurora 3s linear infinite' }}
                whileHover={{ rotate: 8, scale: 1.1 }}
                transition={{ type: 'spring', stiffness: 300, damping: 18 }}
              >
                <f.icon className="h-5 w-5 text-white" />
              </motion.div>
              <h3 className="font-display font-semibold text-[17px] mb-2">{f.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{f.description}</p>
            </TiltCard>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="mt-12 text-center"
      >
        <Link
          to="/commands"
          className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline underline-offset-4 transition-colors"
        >
          Browse all {site.bot.commandCount}+ commands <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </motion.div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   Command preview strip
───────────────────────────────────────────────────────────────────────────── */
function CommandStrip() {
  const snippets = [
    { cmd: '$antinuke enable',       note: 'Activate antinuke protection' },
    { cmd: '$ban @user spamming',    note: 'Ban with reason, DMs target' },
    { cmd: '$timeout @user 30m',     note: 'Timeout for 30 minutes' },
    { cmd: '$log modlog #mod-logs',  note: 'Send modlogs to a channel' },
    { cmd: '$birthday set 15 April', note: 'Set your global birthday' },
    { cmd: '$ship @alice @bob',      note: 'Generate compatibility image' },
    { cmd: '$sticky set text …',     note: 'Sticky message in channel' },
    { cmd: '$whoping',               note: 'See who last pinged you' },
  ];

  return (
    <section className="py-20">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="container max-w-5xl text-center mb-12"
      >
        <span className="text-xs font-semibold uppercase tracking-widest text-primary">At a glance</span>
        <h2 className="mt-3 font-display font-bold text-3xl md:text-4xl tracking-tight">
          Powerful. Concise. Instant.
        </h2>
      </motion.div>

      <div className="container max-w-5xl grid sm:grid-cols-2 gap-3">
        {snippets.map((s, i) => (
          <motion.div
            key={s.cmd}
            initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-30px' }}
            transition={{ delay: i * 0.06, duration: 0.45 }}
            whileHover={{ scale: 1.018, transition: { type: 'spring', stiffness: 300, damping: 20 } }}
            className="liquid-glass rounded-xl px-5 py-4 flex items-start gap-4 cursor-default"
          >
            <div className="mt-0.5 h-8 w-8 rounded-lg bg-primary/12 border border-primary/20 grid place-items-center flex-shrink-0">
              <Terminal className="h-3.5 w-3.5 text-primary" />
            </div>
            <div>
              <code className="font-mono text-sm font-semibold text-primary">{s.cmd}</code>
              <p className="text-xs text-muted-foreground mt-0.5">{s.note}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   FAQ
───────────────────────────────────────────────────────────────────────────── */
function Faq() {
  const [open, setOpen] = useState<number | null>(null);
  const toggle = (i: number) => setOpen(open === i ? null : i);

  return (
    <section className="container max-w-3xl py-20">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center"
      >
        <span className="text-xs font-semibold uppercase tracking-widest text-primary">FAQ</span>
        <h2 className="mt-3 font-display font-bold text-4xl md:text-5xl tracking-tight">
          Questions, answered
        </h2>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.15 }}
        className="mt-12 liquid-glass rounded-3xl overflow-hidden divide-y divide-border/40"
      >
        {site.faqs.map((f, i) => (
          <div key={i}>
            <button
              onClick={() => toggle(i)}
              className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left hover:bg-muted/20 transition-colors"
            >
              <span className="font-display font-semibold text-[15px]">{f.q}</span>
              <motion.span
                animate={{ rotate: open === i ? 180 : 0 }}
                transition={{ duration: 0.3 }}
                className="flex-shrink-0 text-muted-foreground"
              >
                <ChevronDown className="h-4 w-4" />
              </motion.span>
            </button>
            <AnimatePresence initial={false}>
              {open === i && (
                <motion.div
                  key="content"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                  style={{ overflow: 'hidden' }}
                >
                  <p className="px-6 pb-6 text-sm text-muted-foreground leading-relaxed">{f.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </motion.div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   CTA
───────────────────────────────────────────────────────────────────────────── */
function Cta() {
  return (
    <section className="container max-w-5xl py-10 pb-8">
      <motion.div
        initial={{ opacity: 0, y: 32, scale: 0.95 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: [0.34, 1.56, 0.64, 1] }}
        className="relative overflow-hidden rounded-3xl px-8 md:px-16 py-16 text-center"
        style={{ background: 'var(--gradient-aurora)', backgroundSize: '300% 300%', animation: 'aurora 24s linear infinite' }}
      >
        <FloatingSticker src={orbSticker}  alt="" className="absolute top-4 right-8 hidden sm:block" size={50} duration={5} rotate={10} />
        <FloatingSticker src={starSticker} alt="" className="absolute bottom-6 left-8 hidden sm:block" size={46} duration={4.5} delay={0.4} rotate={12} />
        {/* Floating orbs inside CTA */}
        <motion.div
          className="absolute -top-14 -left-14 h-48 w-48 rounded-full bg-white/10 blur-3xl pointer-events-none"
          animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute -bottom-14 -right-14 h-48 w-48 rounded-full bg-white/10 blur-3xl pointer-events-none"
          animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 2.5 }}
        />
        {/* Top shimmer line */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 h-px w-1/2 bg-white/30" />

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative font-display font-extrabold text-4xl md:text-5xl text-white tracking-tight leading-tight"
        >
          Want Levitate on<br className="hidden sm:block" /> your server?
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          className="relative mt-4 text-white/75 max-w-md mx-auto text-base"
        >
          Add Levitate in seconds. No setup needed. Protection and utility start working the moment you add it.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.25, ease: [0.34, 1.56, 0.64, 1] }}
          className="relative mt-9 flex flex-wrap items-center justify-center gap-3"
        >
          <a
            href={site.bot.inviteUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 bg-white text-[hsl(232,60%,28%)] font-bold px-9 py-4 rounded-full shadow-lg hover:opacity-93 hover:scale-[1.04] transition-all duration-300 text-sm"
          >
            Add to Discord <ExternalLink className="h-4 w-4" />
          </a>
          <a
            href={site.bot.supportUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 border-2 border-white/40 text-white font-semibold px-9 py-4 rounded-full hover:bg-white/12 hover:scale-[1.04] transition-all duration-300 text-sm"
          >
            Support Server
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   Page
───────────────────────────────────────────────────────────────────────────── */
export default function Home() {
  useEffect(() => { document.title = `Levitate | ${site.bot.tagline}`; }, []);
  return (
    <>
      <Hero />
      <Features />
      <CommandStrip />
      <Faq />
      <Cta />
    </>
  );
}
