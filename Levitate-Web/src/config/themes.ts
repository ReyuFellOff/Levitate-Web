// xoxo/Levitate-Web/src/config/themes.ts
// All site colour themes. The vars Record maps CSS custom-property names
// (without the leading --) to their raw values.  Gradient / shadow vars hold
// full CSS values; HSL base vars hold bare "H S% L%" tokens.

export interface Theme {
  id: string;
  name: string;
  /** CSS gradient string shown in the switcher circle */
  previewGradient: string;
  vars: Record<string, string>;
}

export const themes: Theme[] = [
  // ─────────────────────────────────────────────────────────────────────────
  // 1. Blue Indigo  ·  DEFAULT  (#3C467B / #50589C / #636CCB / #6E8CFB)
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'indigo',
    name: 'Blue Indigo',
    previewGradient: 'linear-gradient(135deg, #3C467B 0%, #636CCB 55%, #6E8CFB 100%)',
    vars: {
      'background':           '232 38% 17%',
      'foreground':           '228 40% 97%',
      'card':                 '232 34% 23%',
      'card-foreground':      '228 40% 97%',
      'popover':              '232 34% 23%',
      'popover-foreground':   '228 40% 97%',
      'primary':              '227 95% 71%',
      'primary-foreground':   '232 38% 12%',
      'primary-glow':         '230 90% 68%',
      'secondary':            '234 30% 32%',
      'secondary-foreground': '228 40% 97%',
      'muted':                '232 26% 26%',
      'muted-foreground':     '228 22% 72%',
      'accent':               '235 50% 59%',
      'accent-foreground':    '232 38% 12%',
      'destructive':          '0 70% 66%',
      'destructive-foreground':'228 40% 97%',
      'border':               '234 30% 37%',
      'input':                '234 30% 29%',
      'ring':                 '227 95% 71%',
      'glass-bg':             '232 32% 28%',
      'glass-border':         '227 55% 62%',
      'glass-shine':          '228 80% 96%',
      // aurora blob colours (bare HSL tokens)
      'aurora-blob-1':        '227 95% 71%',
      'aurora-blob-2':        '235 50% 59%',
      'aurora-blob-3':        '220 80% 75%',
      'aurora-blob-4':        '240 55% 65%',
      'aurora-blob-5':        '227 90% 68%',
      // gradients
      'gradient-aurora':      'linear-gradient(135deg, hsl(227 95% 71%), hsl(235 50% 59%) 50%, hsl(220 80% 75%))',
      'gradient-mesh':
        'radial-gradient(at 15% 25%, hsl(227 95% 71% / 0.28) 0px, transparent 52%),' +
        'radial-gradient(at 85% 10%, hsl(235 50% 59% / 0.22) 0px, transparent 52%),' +
        'radial-gradient(at 70% 85%, hsl(220 80% 72% / 0.20) 0px, transparent 52%),' +
        'radial-gradient(at 10% 90%, hsl(234 60% 62% / 0.16) 0px, transparent 50%)',
      'gradient-text':        'linear-gradient(135deg, hsl(228 60% 94%), hsl(227 95% 78%), hsl(235 60% 72%))',
      // shadows
      'shadow-glow':    '0 20px 60px -18px hsl(227 95% 71% / 0.6)',
      'shadow-glass':   '0 8px 32px hsl(232 40% 6% / 0.45), inset 0 1px 0 hsl(228 80% 96% / 0.10)',
      'shadow-elegant': '0 30px 80px -28px hsl(227 95% 71% / 0.45)',
      'shadow-card':    '0 4px 24px hsl(232 40% 6% / 0.35), inset 0 1px 0 hsl(228 80% 96% / 0.07)',
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 2. Lavender Dusk  ·  original palette
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'lavender',
    name: 'Lavender Dusk',
    previewGradient: 'linear-gradient(135deg, #1e1340 0%, #9b59cc 50%, #f07bc4 100%)',
    vars: {
      'background':           '256 40% 15%',
      'foreground':           '260 45% 98%',
      'card':                 '258 34% 20%',
      'card-foreground':      '260 45% 98%',
      'popover':              '258 34% 20%',
      'popover-foreground':   '260 45% 98%',
      'primary':              '265 88% 76%',
      'primary-foreground':   '256 40% 12%',
      'primary-glow':         '285 90% 72%',
      'secondary':            '258 26% 27%',
      'secondary-foreground': '260 45% 98%',
      'muted':                '258 24% 23%',
      'muted-foreground':     '260 20% 78%',
      'accent':               '326 82% 74%',
      'accent-foreground':    '256 40% 12%',
      'destructive':          '0 70% 66%',
      'destructive-foreground':'260 45% 98%',
      'border':               '258 32% 32%',
      'input':                '258 32% 27%',
      'ring':                 '265 88% 76%',
      'glass-bg':             '258 32% 26%',
      'glass-border':         '265 60% 68%',
      'glass-shine':          '262 95% 98%',
      // aurora blobs
      'aurora-blob-1':        '265 88% 76%',
      'aurora-blob-2':        '326 82% 74%',
      'aurora-blob-3':        '199 90% 70%',
      'aurora-blob-4':        '310 70% 72%',
      'aurora-blob-5':        '285 80% 72%',
      // gradients
      'gradient-aurora':      'linear-gradient(135deg, hsl(265 88% 76%), hsl(326 82% 74%) 50%, hsl(199 90% 70%))',
      'gradient-mesh':
        'radial-gradient(at 15% 25%, hsl(265 88% 70% / 0.30) 0px, transparent 52%),' +
        'radial-gradient(at 85% 10%, hsl(326 82% 70% / 0.24) 0px, transparent 52%),' +
        'radial-gradient(at 70% 85%, hsl(199 90% 65% / 0.22) 0px, transparent 52%),' +
        'radial-gradient(at 10% 90%, hsl(285 80% 68% / 0.18) 0px, transparent 50%)',
      'gradient-text':        'linear-gradient(135deg, hsl(262 70% 94%), hsl(265 88% 78%), hsl(326 82% 76%))',
      // shadows
      'shadow-glow':    '0 20px 60px -18px hsl(265 88% 76% / 0.6)',
      'shadow-glass':   '0 8px 32px hsl(258 40% 6% / 0.45), inset 0 1px 0 hsl(262 95% 98% / 0.10)',
      'shadow-elegant': '0 30px 80px -28px hsl(265 88% 76% / 0.45)',
      'shadow-card':    '0 4px 24px hsl(258 40% 6% / 0.35), inset 0 1px 0 hsl(262 95% 98% / 0.07)',
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 3. Midnight Ocean  ·  deep teal / cyan
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'ocean',
    name: 'Midnight Ocean',
    previewGradient: 'linear-gradient(135deg, #0d2233 0%, #1a7a8a 55%, #3ee8c4 100%)',
    vars: {
      'background':           '208 48% 11%',
      'foreground':           '195 40% 97%',
      'card':                 '208 42% 17%',
      'card-foreground':      '195 40% 97%',
      'popover':              '208 42% 17%',
      'popover-foreground':   '195 40% 97%',
      'primary':              '178 72% 60%',
      'primary-foreground':   '208 48% 8%',
      'primary-glow':         '185 75% 55%',
      'secondary':            '208 32% 24%',
      'secondary-foreground': '195 40% 97%',
      'muted':                '208 28% 19%',
      'muted-foreground':     '200 22% 68%',
      'accent':               '195 65% 52%',
      'accent-foreground':    '208 48% 8%',
      'destructive':          '0 70% 66%',
      'destructive-foreground':'195 40% 97%',
      'border':               '208 30% 30%',
      'input':                '208 30% 22%',
      'ring':                 '178 72% 60%',
      'glass-bg':             '208 36% 20%',
      'glass-border':         '178 50% 52%',
      'glass-shine':          '195 80% 96%',
      // aurora blobs
      'aurora-blob-1':        '178 72% 60%',
      'aurora-blob-2':        '195 65% 52%',
      'aurora-blob-3':        '165 60% 55%',
      'aurora-blob-4':        '210 55% 50%',
      'aurora-blob-5':        '185 70% 48%',
      // gradients
      'gradient-aurora':      'linear-gradient(135deg, hsl(178 72% 60%), hsl(195 65% 52%) 50%, hsl(165 60% 65%))',
      'gradient-mesh':
        'radial-gradient(at 15% 25%, hsl(178 72% 60% / 0.28) 0px, transparent 52%),' +
        'radial-gradient(at 85% 10%, hsl(195 65% 52% / 0.22) 0px, transparent 52%),' +
        'radial-gradient(at 70% 85%, hsl(165 60% 55% / 0.20) 0px, transparent 52%),' +
        'radial-gradient(at 10% 90%, hsl(210 55% 50% / 0.16) 0px, transparent 50%)',
      'gradient-text':        'linear-gradient(135deg, hsl(195 60% 94%), hsl(178 72% 72%), hsl(195 60% 68%))',
      // shadows
      'shadow-glow':    '0 20px 60px -18px hsl(178 72% 60% / 0.6)',
      'shadow-glass':   '0 8px 32px hsl(208 50% 5% / 0.50), inset 0 1px 0 hsl(195 80% 96% / 0.10)',
      'shadow-elegant': '0 30px 80px -28px hsl(178 72% 60% / 0.45)',
      'shadow-card':    '0 4px 24px hsl(208 50% 5% / 0.40), inset 0 1px 0 hsl(195 80% 96% / 0.07)',
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 4. Rose Noir  ·  deep rose / berry
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'rose',
    name: 'Rose Noir',
    previewGradient: 'linear-gradient(135deg, #2b0f1e 0%, #c4437a 55%, #f4a0bc 100%)',
    vars: {
      'background':           '340 38% 11%',
      'foreground':           '350 35% 97%',
      'card':                 '340 32% 17%',
      'card-foreground':      '350 35% 97%',
      'popover':              '340 32% 17%',
      'popover-foreground':   '350 35% 97%',
      'primary':              '338 78% 68%',
      'primary-foreground':   '340 38% 8%',
      'primary-glow':         '320 75% 64%',
      'secondary':            '340 24% 24%',
      'secondary-foreground': '350 35% 97%',
      'muted':                '340 20% 19%',
      'muted-foreground':     '345 18% 65%',
      'accent':               '14 72% 64%',
      'accent-foreground':    '340 38% 8%',
      'destructive':          '0 70% 66%',
      'destructive-foreground':'350 35% 97%',
      'border':               '340 26% 30%',
      'input':                '340 26% 22%',
      'ring':                 '338 78% 68%',
      'glass-bg':             '340 28% 20%',
      'glass-border':         '338 52% 58%',
      'glass-shine':          '350 80% 96%',
      // aurora blobs
      'aurora-blob-1':        '338 78% 68%',
      'aurora-blob-2':        '14 72% 64%',
      'aurora-blob-3':        '320 65% 62%',
      'aurora-blob-4':        '355 60% 58%',
      'aurora-blob-5':        '325 70% 60%',
      // gradients
      'gradient-aurora':      'linear-gradient(135deg, hsl(338 78% 68%), hsl(14 72% 64%) 50%, hsl(320 65% 72%))',
      'gradient-mesh':
        'radial-gradient(at 15% 25%, hsl(338 78% 68% / 0.28) 0px, transparent 52%),' +
        'radial-gradient(at 85% 10%, hsl(14 72% 64% / 0.22) 0px, transparent 52%),' +
        'radial-gradient(at 70% 85%, hsl(320 65% 62% / 0.20) 0px, transparent 52%),' +
        'radial-gradient(at 10% 90%, hsl(355 60% 58% / 0.16) 0px, transparent 50%)',
      'gradient-text':        'linear-gradient(135deg, hsl(350 50% 94%), hsl(338 78% 76%), hsl(14 68% 72%))',
      // shadows
      'shadow-glow':    '0 20px 60px -18px hsl(338 78% 68% / 0.6)',
      'shadow-glass':   '0 8px 32px hsl(340 40% 5% / 0.50), inset 0 1px 0 hsl(350 80% 96% / 0.10)',
      'shadow-elegant': '0 30px 80px -28px hsl(338 78% 68% / 0.45)',
      'shadow-card':    '0 4px 24px hsl(340 40% 5% / 0.40), inset 0 1px 0 hsl(350 80% 96% / 0.07)',
    },
  },
];

export const DEFAULT_THEME_ID = 'indigo';
