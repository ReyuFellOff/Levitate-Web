import { useMemo } from 'react';
import { motion } from 'framer-motion';

/**
 * A whimsical, site-wide layer of drifting emoji + twinkling stars.
 * Purely decorative — pointer-events disabled, low opacity, never blocks content.
 */
const SYMBOLS = ['✨', '🌙', '💜', '⭐', '🔮', '💫', '🦋', '🌸', '☁️', '🩵'];

function seededRandom(seed: number) {
  let s = seed;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

export default function FloatingEmojis({ count = 16 }: { count?: number }) {
  const items = useMemo(() => {
    const rand = seededRandom(42);
    return Array.from({ length: count }, (_, i) => {
      const symbol = SYMBOLS[Math.floor(rand() * SYMBOLS.length)];
      return {
        id: i,
        symbol,
        left: rand() * 100,
        top: rand() * 100,
        size: 14 + rand() * 20,
        duration: 10 + rand() * 14,
        delay: rand() * 8,
        drift: 30 + rand() * 60,
        opacity: 0.16 + rand() * 0.22,
      };
    });
  }, [count]);

  return (
    <div className="fixed inset-0 -z-[5] overflow-hidden pointer-events-none select-none">
      {items.map((item) => (
        <motion.span
          key={item.id}
          className="absolute sticker-color"
          style={{
            left: `${item.left}%`,
            top: `${item.top}%`,
            fontSize: item.size,
            opacity: item.opacity,
          }}
          animate={{
            y: [0, -item.drift, 0],
            x: [0, item.drift * 0.35, 0],
            rotate: [0, 8, -8, 0],
          }}
          transition={{
            duration: item.duration,
            delay: item.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          {item.symbol}
        </motion.span>
      ))}
    </div>
  );
}
