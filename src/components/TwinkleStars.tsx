import { useMemo } from 'react';

/** Scattered twinkling star-dots for a dreamy night-sky feel. Purely decorative. */
function seededRandom(seed: number) {
  let s = seed;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

export default function TwinkleStars({ count = 40 }: { count?: number }) {
  const stars = useMemo(() => {
    const rand = seededRandom(7);
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      left: rand() * 100,
      top: rand() * 100,
      size: 1.5 + rand() * 2.5,
      delay: rand() * 3,
      duration: 2 + rand() * 3,
    }));
  }, [count]);

  return (
    <div className="fixed inset-0 -z-[6] overflow-hidden pointer-events-none select-none">
      {stars.map((s) => (
        <span
          key={s.id}
          className="absolute rounded-full bg-white animate-twinkle"
          style={{
            left: `${s.left}%`,
            top: `${s.top}%`,
            width: s.size,
            height: s.size,
            animationDelay: `${s.delay}s`,
            animationDuration: `${s.duration}s`,
            boxShadow: '0 0 6px 1px hsl(227 95% 80% / 0.8)',
          }}
        />
      ))}
    </div>
  );
}
