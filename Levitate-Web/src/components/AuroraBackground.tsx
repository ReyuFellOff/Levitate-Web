import { motion } from 'framer-motion';

/**
 * Full-viewport ambient aurora blobs that drift slowly behind content.
 * Blob colours use CSS custom properties so they update automatically
 * when the active colour theme changes.
 */
export default function AuroraBackground() {
  const blob = (varName: string) => `hsl(var(--${varName}))`;

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden -z-10" aria-hidden>
      <motion.div className="absolute -top-1/4 left-1/4 h-[70vh] w-[70vh] rounded-full"
        style={{ background: blob('aurora-blob-1'), opacity: 0.22, filter: 'blur(120px)' }}
        animate={{ x: [0, 40, 0], y: [0, 30, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }} />

      <motion.div className="absolute top-1/3 -right-1/4 h-[60vh] w-[60vh] rounded-full"
        style={{ background: blob('aurora-blob-2'), opacity: 0.20, filter: 'blur(115px)' }}
        animate={{ x: [0, -35, 0], y: [0, 40, 0] }}
        transition={{ duration: 26, repeat: Infinity, ease: 'easeInOut', delay: 5 }} />

      <motion.div className="absolute -bottom-1/4 left-1/3 h-[55vh] w-[55vh] rounded-full"
        style={{ background: blob('aurora-blob-3'), opacity: 0.16, filter: 'blur(115px)' }}
        animate={{ x: [0, 30, 0], y: [0, -25, 0] }}
        transition={{ duration: 30, repeat: Infinity, ease: 'easeInOut', delay: 9 }} />

      <motion.div className="absolute top-2/3 left-1/2 h-[40vh] w-[40vh] rounded-full"
        style={{ background: blob('aurora-blob-4'), opacity: 0.13, filter: 'blur(130px)' }}
        animate={{ x: [0, -20, 0], y: [0, 20, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut', delay: 14 }} />

      <motion.div className="absolute -top-1/3 right-1/3 h-[50vh] w-[50vh] rounded-full"
        style={{ background: blob('aurora-blob-5'), opacity: 0.17, filter: 'blur(105px)' }}
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
    </div>
  );
}
