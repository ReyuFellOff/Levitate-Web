import { motion, useScroll, useTransform } from 'framer-motion';

/**
 * Full-viewport ambient aurora blobs that drift slowly behind content.
 * Blob colours use CSS custom properties so they update automatically
 * when the active colour theme changes.
 *
 * Scroll-based parallax: the whole aurora field shifts subtly as the
 * user scrolls, giving a sense of depth behind the content layer.
 */
export default function AuroraBackground() {
  const blob = (varName: string) => `hsl(var(--${varName}))`;

  const { scrollY } = useScroll();
  // Whole-field drift: −60 px over the first 2 000 px of scroll
  const fieldY    = useTransform(scrollY, [0, 2000], [0, -60]);
  // Individual blob extra parallax (different rates for depth illusion)
  const blob1Y    = useTransform(scrollY, [0, 2000], [0, -30]);
  const blob2Y    = useTransform(scrollY, [0, 2000], [0,  20]);
  const blob3Y    = useTransform(scrollY, [0, 2000], [0, -18]);
  const blob4Y    = useTransform(scrollY, [0, 2000], [0,  28]);
  const blob5Y    = useTransform(scrollY, [0, 2000], [0, -24]);
  const blob1X    = useTransform(scrollY, [0, 2000], [0,  16]);
  const blob2X    = useTransform(scrollY, [0, 2000], [0, -12]);
  const blob3X    = useTransform(scrollY, [0, 2000], [0,  10]);

  return (
    <motion.div
      className="pointer-events-none fixed inset-0 overflow-hidden -z-10"
      aria-hidden
      style={{ y: fieldY }}
    >
      <motion.div className="absolute -top-1/4 left-1/4 h-[70vh] w-[70vh] rounded-full"
        style={{ background: blob('aurora-blob-1'), opacity: 0.22, filter: 'blur(120px)', y: blob1Y, x: blob1X }}
        animate={{ x: [0, 40, 0], y: [0, 30, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }} />

      <motion.div className="absolute top-1/3 -right-1/4 h-[60vh] w-[60vh] rounded-full"
        style={{ background: blob('aurora-blob-2'), opacity: 0.20, filter: 'blur(115px)', y: blob2Y, x: blob2X }}
        animate={{ x: [0, -35, 0], y: [0, 40, 0] }}
        transition={{ duration: 26, repeat: Infinity, ease: 'easeInOut', delay: 5 }} />

      <motion.div className="absolute -bottom-1/4 left-1/3 h-[55vh] w-[55vh] rounded-full"
        style={{ background: blob('aurora-blob-3'), opacity: 0.16, filter: 'blur(115px)', y: blob3Y, x: blob3X }}
        animate={{ x: [0, 30, 0], y: [0, -25, 0] }}
        transition={{ duration: 30, repeat: Infinity, ease: 'easeInOut', delay: 9 }} />

      <motion.div className="absolute top-2/3 left-1/2 h-[40vh] w-[40vh] rounded-full"
        style={{ background: blob('aurora-blob-4'), opacity: 0.13, filter: 'blur(130px)', y: blob4Y }}
        animate={{ x: [0, -20, 0], y: [0, 20, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut', delay: 14 }} />

      <motion.div className="absolute -top-1/3 right-1/3 h-[50vh] w-[50vh] rounded-full"
        style={{ background: blob('aurora-blob-5'), opacity: 0.17, filter: 'blur(105px)', y: blob5Y }}
        animate={{ x: [0, 25, 0], y: [0, 35, 0] }}
        transition={{ duration: 24, repeat: Infinity, ease: 'easeInOut', delay: 7 }} />

      {/* Subtle dot-grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: 'radial-gradient(circle, hsl(var(--glass-shine) / 0.14) 1px, transparent 1px)',
          backgroundSize:  '32px 32px',
        }}
      />
    </motion.div>
  );
}
